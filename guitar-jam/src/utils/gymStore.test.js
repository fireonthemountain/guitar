import { describe, expect, it } from 'vitest';
import { loadGym, updateGym } from './gymStore';
import { STAGE90_KEY, loadStage90, normalizeStage90, writeStage90 } from './stage90';
import { applyRep, emptyGym, flattenExercises } from './practiceEngine';
import { SKILL_TRACKS } from '../data/skillTracks';

const exercise = flattenExercises(SKILL_TRACKS)[0];

describe('gym storage inside the Stage Ready blob', () => {
  it('adds an empty gym to existing progress without touching it', () => {
    const legacy = { startDate: '2026-09-01', program: { completed: [1, 2, 3] }, assessments: { 1: { week: 1, score: 70 } } };
    const state = normalizeStage90(legacy);
    expect(state.gym).toEqual(emptyGym());
    expect(state.program.completed).toEqual([1, 2, 3]);
    expect(state.assessments[1].score).toBe(70);
  });

  it('saves reps alongside program progress and reads them back', () => {
    writeStage90({ startDate: '2026-09-01', program: { completed: [4] } });
    const { ok } = updateGym((gym) => applyRep(gym, exercise, 'clean', { today: '2026-11-15', at: 1 }).gym);
    expect(ok).toBe(true);
    const stored = JSON.parse(localStorage.getItem(STAGE90_KEY));
    expect(stored.program.completed).toEqual([4]);
    expect(stored.gym.log).toHaveLength(1);
    expect(loadGym().items[exercise.id].reps).toBe(1);
  });

  it('does not clobber progress saved by another page between updates', () => {
    updateGym((gym) => ({ ...gym, instrument: 'electric' }));
    const other = loadStage90();
    writeStage90({ ...other, program: { ...other.program, completed: [9] } });
    updateGym((gym) => ({ ...gym, minutes: 45 }));
    const state = loadStage90();
    expect(state.program.completed).toEqual([9]);
    expect(state.gym).toMatchObject({ instrument: 'electric', minutes: 45 });
  });

  it('repairs a damaged gym instead of crashing', () => {
    localStorage.setItem(STAGE90_KEY, JSON.stringify({ gym: 'corrupt', program: { completed: [1] } }));
    expect(loadGym()).toEqual(emptyGym());
    expect(loadStage90().program.completed).toEqual([1]);
  });
});
