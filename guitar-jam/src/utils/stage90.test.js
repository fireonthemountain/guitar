import { describe, expect, it, vi } from 'vitest';
import {
  STAGE90_BACKUP_KEY,
  STAGE90_KEY,
  STAGE90_SCHEMA_VERSION,
  STAGE90_STORAGE_EVENT,
  loadStage90,
  normalizeStage90,
  writeStage90,
} from './stage90';

const progress = (completed = [1]) => ({
  startDate: '2026-09-01',
  gigDate: '2026-12-01',
  assessments: {},
  program: { completed, blocks: {}, notes: {}, activity: {} },
  set: [],
  setruns: [],
  jams: [],
});

describe('stage90 persistence', () => {
  it('normalizes legacy and partially missing data without losing progress', () => {
    const state = normalizeStage90({ startDate: '2026-09-01', program: { completed: [1, 2] } });
    expect(state._schemaVersion).toBe(STAGE90_SCHEMA_VERSION);
    expect(state.program.completed).toEqual([1, 2]);
    expect(state.program.blocks).toEqual({});
    expect(state.set).toEqual([]);
  });

  it('migrates a legacy blob and creates a recoverable backup', () => {
    const legacy = progress([1, 2]);
    localStorage.setItem(STAGE90_KEY, JSON.stringify(legacy));

    const result = writeStage90(legacy);
    const stored = JSON.parse(localStorage.getItem(STAGE90_KEY));

    expect(result.ok).toBe(true);
    expect(result.changed).toBe(true);
    expect(stored._schemaVersion).toBe(STAGE90_SCHEMA_VERSION);
    expect(stored._revision).toBe(1);
    expect(stored._updatedAt).toEqual(expect.any(Number));
    expect(JSON.parse(localStorage.getItem(STAGE90_BACKUP_KEY))).toEqual(legacy);
  });

  it('does not rewrite or sync unchanged current-schema state on mount', () => {
    const first = writeStage90(progress([1]));
    const second = writeStage90(first.state);

    expect(second.ok).toBe(true);
    expect(second.changed).toBe(false);
    expect(second.state._revision).toBe(first.state._revision);
    expect(second.state._updatedAt).toBe(first.state._updatedAt);
  });

  it('recovers from a corrupt primary without overwriting the valid backup', () => {
    const backup = { ...progress([1, 2, 3]), _schemaVersion: 2, _revision: 7, _updatedAt: 123, _deviceId: 'mac' };
    localStorage.setItem(STAGE90_KEY, '{broken');
    localStorage.setItem(STAGE90_BACKUP_KEY, JSON.stringify(backup));

    const loaded = loadStage90();

    expect(loaded.program.completed).toEqual([1, 2, 3]);
    expect(JSON.parse(localStorage.getItem(STAGE90_KEY)).program.completed).toEqual([1, 2, 3]);
    expect(JSON.parse(localStorage.getItem(STAGE90_BACKUP_KEY))).toEqual(backup);
  });

  it('reports a failed primary write instead of silently claiming success', () => {
    const events = [];
    window.addEventListener(STAGE90_STORAGE_EVENT, (event) => events.push(event.detail), { once: true });
    const original = localStorage.setItem.bind(localStorage);
    vi.spyOn(localStorage, 'setItem').mockImplementation((key, value) => {
      if (key === STAGE90_KEY) throw new DOMException('Quota exceeded', 'QuotaExceededError');
      return original(key, value);
    });

    const result = writeStage90(progress([1]));

    expect(result.ok).toBe(false);
    expect(events[0]).toMatchObject({ status: 'error', message: 'Quota exceeded' });
  });
});
