// @vitest-environment node

import 'fake-indexeddb/auto';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
  clearPendingStage90Sync,
  initializeStage90IndexedDb,
  queueStage90Snapshot,
  readPendingStage90Sync,
  readStage90Snapshot,
  resetStage90IndexedDbForTests,
} from './stage90IndexedDb';

const state = (revision, updatedAt, completed = [1]) => ({
  _schemaVersion: 2,
  _revision: revision,
  _updatedAt: updatedAt,
  _deviceId: 'test-device',
  startDate: '2026-09-01',
  program: { completed, blocks: {}, notes: {}, activity: {} },
});

beforeEach(async () => {
  await resetStage90IndexedDbForTests();
});

describe('IndexedDB stage90 persistence', () => {
  it('stores a durable snapshot and pending-sync copy for local changes', async () => {
    const saved = state(3, 300, [1, 2, 3]);
    await queueStage90Snapshot(saved);

    expect(await readStage90Snapshot()).toEqual(saved);
    expect(await readPendingStage90Sync()).toEqual(saved);
  });

  it('does not clear a newer pending revision after an older upload completes', async () => {
    await queueStage90Snapshot(state(5, 500));

    expect(await clearPendingStage90Sync(4)).toBe(false);
    expect((await readPendingStage90Sync())._revision).toBe(5);
    expect(await clearPendingStage90Sync(5)).toBe(true);
    expect(await readPendingStage90Sync()).toBeNull();
  });

  it('migrates an existing compatibility copy when IndexedDB is empty', async () => {
    const local = state(2, 200, [1, 2]);
    const result = await initializeStage90IndexedDb(local, vi.fn());

    expect(result.status).toBe('migrated-local');
    expect(await readStage90Snapshot()).toEqual(local);
    expect(await readPendingStage90Sync()).toBeNull();
  });

  it('restores a newer IndexedDB snapshot into the compatibility layer', async () => {
    const indexed = state(8, 800, [1, 2, 3, 4]);
    await queueStage90Snapshot(indexed, { pending: false });
    const apply = vi.fn(() => ({ ok: true, state: indexed }));

    const result = await initializeStage90IndexedDb(state(7, 700), apply);

    expect(result.status).toBe('restored-indexeddb');
    expect(apply).toHaveBeenCalledWith(indexed);
  });
});
