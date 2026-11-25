import { beforeEach, describe, expect, it, vi } from 'vitest';
import { IDBFactory } from 'fake-indexeddb';

beforeEach(() => { vi.resetModules(); vi.stubGlobal('indexedDB', new IDBFactory()); });
const legacy = { completed: [1], notes: { 2: 'legacy note' }, blocks: { 2: [0] }, activity: {} };

describe('legacy course integration', () => {
  it('imports the legacy course without removing its original copy or existing progress', async () => {
    const { emptyStage90, initializeStage90Storage, loadStage90 } = await import('./stage90');
    localStorage.setItem('stage90', JSON.stringify({ ...emptyStage90(), program: { completed: [3] }, _updatedAt: 100, _revision: 1 }));
    localStorage.setItem('dead90', JSON.stringify(legacy));
    await initializeStage90Storage();
    expect(loadStage90().dead90).toEqual(legacy);
    expect(loadStage90().program.completed).toEqual([3]);
    expect(JSON.parse(localStorage.getItem('dead90'))).toEqual(legacy);
  });
  it('does not replace an existing shared course with an older compatibility copy', async () => {
    const { emptyStage90, initializeStage90Storage, loadStage90 } = await import('./stage90');
    const shared = { ...legacy, completed: [1, 2] };
    localStorage.setItem('stage90', JSON.stringify({ ...emptyStage90(), dead90: shared }));
    localStorage.setItem('dead90', JSON.stringify(legacy));
    await initializeStage90Storage();
    expect(loadStage90().dead90).toEqual(shared);
  });
  it('recovers the IndexedDB copy before adding the older course', async () => {
    const { emptyStage90, initializeStage90Storage, loadStage90 } = await import('./stage90');
    const { queueStage90Snapshot } = await import('./stage90IndexedDb');
    await queueStage90Snapshot({ ...emptyStage90(), program: { completed: [4] }, _updatedAt: 500, _revision: 4 }, { pending: false });
    localStorage.setItem('stage90', '{broken');
    localStorage.setItem('dead90', JSON.stringify(legacy));
    await initializeStage90Storage();
    expect(loadStage90().program.completed).toEqual([4]);
    expect(loadStage90().dead90).toEqual(legacy);
  });
  it('retains an invalid legacy copy without uploading it as empty progress', async () => {
    const { initializeStage90Storage, loadStage90 } = await import('./stage90');
    localStorage.setItem('dead90', '[]');
    await initializeStage90Storage();
    expect(loadStage90().dead90).toBeUndefined();
    expect(localStorage.getItem('dead90')).toBe('[]');
  });
});
