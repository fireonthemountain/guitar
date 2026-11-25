// @vitest-environment node
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { createHash } from 'node:crypto';
import handler from '../../api/sync/[token].js';

const token = 'a'.repeat(48);
const etag = (raw) => `"${createHash('sha1').update(raw).digest('hex')}"`;
const response = () => ({
  headers: {}, code: 200, body: null,
  setHeader(name, value) { this.headers[name] = value; },
  status(code) { this.code = code; return this; },
  json(body) { this.body = body; return this; },
  send(body) { this.body = body; return this; },
  end() { return this; },
});
beforeEach(() => {
  vi.stubEnv('KV_REST_API_URL', 'https://redis.example.test');
  vi.stubEnv('KV_REST_API_TOKEN', 'test-only');
});
afterEach(() => vi.unstubAllEnvs());

describe('built-in sync protocol', () => {
  it('returns an exposed version for the empty cloud copy', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true, json: async () => ({ result: null }) }));
    const res = response();
    await handler({ method: 'GET', query: { token } }, res);
    expect(res.code).toBe(200);
    expect(res.body).toBe('null');
    expect(res.headers.ETag).toBe(etag('null'));
    expect(res.headers['Access-Control-Expose-Headers']).toContain('ETag');
    expect(res.headers['Cache-Control']).toBe('no-store');
  });
  it('requires a checked cloud version before writing', async () => {
    const fetcher = vi.fn();
    vi.stubGlobal('fetch', fetcher);
    const res = response();
    await handler({ method: 'PUT', query: { token }, headers: {}, body: { startDate: null } }, res);
    expect(res.code).toBe(428);
    expect(fetcher).not.toHaveBeenCalled();
  });
  it('uses a single atomic comparison/write and rejects a stale version', async () => {
    const fetcher = vi.fn().mockResolvedValue({ ok: true, json: async () => ({ result: 0 }) });
    vi.stubGlobal('fetch', fetcher);
    const res = response();
    await handler({ method: 'PUT', query: { token }, headers: { 'if-match': etag('null') }, body: { startDate: '2026-11-24' } }, res);
    expect(res.code).toBe(409);
    const command = JSON.parse(fetcher.mock.calls[0][1].body);
    expect(command[0]).toBe('EVAL');
    expect(command.slice(2, 5)).toEqual([1, `blob:${token}`, etag('null').slice(1, -1)]);
    expect(fetcher).toHaveBeenCalledTimes(1);
  });
  it('acknowledges a successful conditional upload with its new version', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true, json: async () => ({ result: 1 }) }));
    const body = { startDate: '2026-11-24', program: { completed: [1] } };
    const res = response();
    await handler({ method: 'PUT', query: { token }, headers: { 'if-match': etag('null') }, body }, res);
    expect(res.code).toBe(200);
    expect(res.headers.ETag).toBe(etag(JSON.stringify(body)));
  });
  it('rejects malformed data and checks the UTF-8 byte limit', async () => {
    for (const body of ['{broken', 'null', '[]']) {
      const res = response();
      await handler({ method: 'PUT', query: { token }, body }, res);
      expect(res.code).toBe(400);
    }
    const res = response();
    await handler({ method: 'PUT', query: { token }, body: { notes: '🎸'.repeat(140000) } }, res);
    expect(res.code).toBe(413);
  });
  it('does not report Redis command errors as successful writes', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true, json: async () => ({ error: 'command failed' }) }));
    const res = response();
    await handler({ method: 'PUT', query: { token }, headers: { 'if-match': etag('null') }, body: { startDate: null } }, res);
    expect(res.code).toBe(502);
  });
});
