import { describe, expect, it, vi } from 'vitest';
import { STAGE90_BACKUP_KEY, STAGE90_KEY, writeStage90 } from './stage90';
import { getLastSyncStatus, getSyncConfig, getSyncConflict, pullNow, pushNow, setSyncConfig } from './syncClient';

const configured = () => setSyncConfig({
  url: 'https://example.test/api',
  token: '12345678901234567890123456789012',
  enabled: true,
  lastPush: null,
  lastPull: null,
});

const progress = (completed, updatedAt) => ({
  startDate: '2026-09-01',
  gigDate: null,
  assessments: {},
  program: { completed, blocks: {}, notes: {}, activity: {} },
  set: [],
  setruns: [],
  jams: [],
  _schemaVersion: 2,
  _revision: completed.length,
  _updatedAt: updatedAt,
  _deviceId: 'test-device',
});

describe('cloud pull safety', () => {
  it('aborts a timed-out pull so it cannot mutate storage later', async () => {
    configured();
    const local = writeStage90(progress([1], 200), { preserveMetadata: true }).state;
    vi.stubGlobal('fetch', vi.fn((_url, { signal }) => new Promise((_resolve, reject) => {
      signal.addEventListener('abort', () => reject(new DOMException('Aborted', 'AbortError')));
    })));

    const result = await pullNow({ timeoutMs: 5 });

    expect(result).toBe('timeout');
    expect(JSON.parse(localStorage.getItem(STAGE90_KEY)).program.completed).toEqual(local.program.completed);
  });

  it('keeps newer local progress', async () => {
    configured();
    writeStage90(progress([1, 2], 300), { preserveMetadata: true });
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true,
      json: async () => progress([1], 200),
    }));

    expect(await pullNow()).toBe('local-newer');
    expect(JSON.parse(localStorage.getItem(STAGE90_KEY)).program.completed).toEqual([1, 2]);
  });

  it('applies newer cloud progress and keeps the prior local blob as backup', async () => {
    configured();
    writeStage90(progress([1], 200), { preserveMetadata: true });
    setSyncConfig({ ...getSyncConfig(), lastPush: 200 });
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true,
      json: async () => progress([1, 2], 300),
    }));

    expect(await pullNow()).toBe('applied');
    expect(JSON.parse(localStorage.getItem(STAGE90_KEY)).program.completed).toEqual([1, 2]);
    expect(JSON.parse(localStorage.getItem(STAGE90_BACKUP_KEY)).program.completed).toEqual([1]);
  });
});

const reply = (body, status = 200, etag = '"test-version"') => new Response(JSON.stringify(body), { status, headers: { ETag: etag } });
const snapshot = () => Object.fromEntries(Array.from({ length: localStorage.length }, (_, i) => {
  const key = localStorage.key(i);
  return [key, localStorage.getItem(key)];
}));
const activate = (saved) => {
  localStorage.clear();
  for (const [key, value] of Object.entries(saved)) localStorage.setItem(key, value);
};

describe('sync upload and concurrent-device safety', () => {
  it('rejects non-progress JSON instead of replacing saved progress with defaults', async () => {
    configured();
    writeStage90(progress([1], 200), { preserveMetadata: true });
    setSyncConfig({ ...getSyncConfig(), lastPush: 200 });
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(reply({ error: 'wrong endpoint' })));
    expect(await pullNow()).toBe('error');
    expect(JSON.parse(localStorage.getItem(STAGE90_KEY)).program.completed).toEqual([1]);
  });
  it('retains local and cloud copies when neither has a shared sync baseline', async () => {
    configured();
    const local = writeStage90(progress([1], 200), { preserveMetadata: true }).state;
    const remote = progress([2], 300);
    const fetcher = vi.fn().mockResolvedValue(reply(remote));
    vi.stubGlobal('fetch', fetcher);
    expect(await pushNow()).toMatchObject({ ok: false, reason: 'conflict' });
    expect(fetcher).toHaveBeenCalledTimes(1);
    expect(JSON.parse(localStorage.getItem(STAGE90_KEY))).toEqual(local);
    expect(getSyncConflict()).toMatchObject({ local: { program: { completed: [1] } }, remote: { program: { completed: [2] } } });
  });
  it('does not overwrite unsent progress with a newer cloud copy', async () => {
    configured();
    writeStage90(progress([1], 200), { preserveMetadata: true });
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(reply(progress([2], 300))));
    expect(await pullNow()).toBe('conflict');
    expect(JSON.parse(localStorage.getItem(STAGE90_KEY)).program.completed).toEqual([1]);
  });
  it('retains progress edited while a cloud check is in flight', async () => {
    configured();
    writeStage90(progress([1], 200), { preserveMetadata: true });
    let release;
    vi.stubGlobal('fetch', vi.fn(() => new Promise((resolve) => { release = resolve; })));
    const pending = pullNow();
    writeStage90(progress([1, 3], 250), { preserveMetadata: true });
    release(reply(progress([2], 300)));
    expect(await pending).toBe('local-changed');
    expect(JSON.parse(localStorage.getItem(STAGE90_KEY)).program.completed).toEqual([1, 3]);
  });
  it('ignores the result of a check after sync configuration changes', async () => {
    configured();
    let release;
    vi.stubGlobal('fetch', vi.fn(() => new Promise((resolve) => { release = resolve; })));
    const pending = pullNow();
    setSyncConfig({ ...getSyncConfig(), enabled: false });
    release(reply(progress([2], 300)));
    expect(await pending).toBe('off');
    expect(localStorage.getItem(STAGE90_KEY)).toBeNull();
  });
  it('cancels a timed-out upload and leaves its local copy intact', async () => {
    configured();
    writeStage90(progress([1], 200), { preserveMetadata: true });
    vi.stubGlobal('fetch', vi.fn((_url, { signal }) => new Promise((_resolve, reject) => {
      signal.addEventListener('abort', () => reject(new DOMException('Aborted', 'AbortError')));
    })));
    expect(await pushNow({ timeoutMs: 5 })).toMatchObject({ ok: false, reason: 'timeout' });
    expect(JSON.parse(localStorage.getItem(STAGE90_KEY)).program.completed).toEqual([1]);
    expect(getLastSyncStatus().status).toBe('timeout');
  });
  it('does not label unsent local progress as synced', async () => {
    configured();
    writeStage90(progress([1, 2], 300), { preserveMetadata: true });
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(reply(progress([1], 200))));
    expect(await pullNow()).toBe('local-newer');
    expect(getLastSyncStatus().status).toBe('pending');
  });
  it('uses the server version and preserves local progress on a rejected upload', async () => {
    configured();
    writeStage90(progress([1], 200), { preserveMetadata: true });
    const fetcher = vi.fn().mockResolvedValueOnce(reply(null, 200, '"empty-version"')).mockResolvedValueOnce(reply({ error: 'changed' }, 409)).mockResolvedValueOnce(reply(progress([2], 300)));
    vi.stubGlobal('fetch', fetcher);
    expect(await pushNow()).toMatchObject({ ok: false, reason: 'conflict' });
    expect(fetcher.mock.calls[1][1].headers['If-Match']).toBe('"empty-version"');
    expect(JSON.parse(localStorage.getItem(STAGE90_KEY)).program.completed).toEqual([1]);
    expect(getSyncConflict().remote.program.completed).toEqual([2]);
  });
  it('backs up the latest local edits if they occur during an upload preflight', async () => {
    configured();
    writeStage90(progress([1], 200), { preserveMetadata: true });
    let release;
    vi.stubGlobal('fetch', vi.fn(() => new Promise((resolve) => { release = resolve; })));
    const pending = pushNow();
    writeStage90(progress([1, 3], 250), { preserveMetadata: true });
    release(reply(progress([2], 300)));
    expect(await pending).toMatchObject({ ok: false, reason: 'conflict' });
    expect(getSyncConflict().local.program.completed).toEqual([1, 3]);
  });
  it('supports three device-to-device round trips, including equal timestamps', async () => {
    let cloud = null;
    let version = 0;
    vi.stubGlobal('fetch', vi.fn(async (_url, options = {}) => {
      if (options.method === 'PUT') {
        if (options.headers['If-Match'] !== `"${version}"`) return reply(null, 409);
        cloud = JSON.parse(options.body);
        version += 1;
      }
      return reply(cloud, 200, `"${version}"`);
    }));
    configured();
    writeStage90(progress([1], 200), { preserveMetadata: true });
    expect((await pushNow()).ok).toBe(true);
    let deviceA = snapshot();
    localStorage.clear();
    configured();
    expect(await pullNow()).toBe('applied');
    let deviceB = snapshot();
    for (let turn = 0; turn < 3; turn += 1) {
      activate(deviceA);
      const currentA = JSON.parse(localStorage.getItem(STAGE90_KEY));
      writeStage90({ ...currentA, _revision: 2 + turn * 2, _deviceId: 'A', _updatedAt: 500, program: { ...currentA.program, completed: [...currentA.program.completed, 2 + turn * 2] } }, { preserveMetadata: true });
      expect((await pushNow()).ok).toBe(true);
      deviceA = snapshot();
      activate(deviceB);
      expect(await pullNow()).toBe('applied');
      const currentB = JSON.parse(localStorage.getItem(STAGE90_KEY));
      writeStage90({ ...currentB, _revision: 3 + turn * 2, _deviceId: 'B', _updatedAt: 500, program: { ...currentB.program, completed: [...currentB.program.completed, 3 + turn * 2] } }, { preserveMetadata: true });
      expect((await pushNow()).ok).toBe(true);
      deviceB = snapshot();
      activate(deviceA);
      expect(await pullNow()).toBe('applied');
      deviceA = snapshot();
    }
    expect(JSON.parse(localStorage.getItem(STAGE90_KEY)).program.completed).toEqual([1, 2, 3, 4, 5, 6, 7]);
  });
});
