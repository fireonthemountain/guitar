import { describe, expect, it, vi } from 'vitest';
import { STAGE90_BACKUP_KEY, STAGE90_KEY, writeStage90 } from './stage90';
import { pullNow, setSyncConfig } from './syncClient';

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
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true,
      json: async () => progress([1, 2], 300),
    }));

    expect(await pullNow()).toBe('applied');
    expect(JSON.parse(localStorage.getItem(STAGE90_KEY)).program.completed).toEqual([1, 2]);
    expect(JSON.parse(localStorage.getItem(STAGE90_BACKUP_KEY)).program.completed).toEqual([1]);
  });
});
