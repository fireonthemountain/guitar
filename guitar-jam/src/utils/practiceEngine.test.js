import { describe, expect, it } from 'vitest';
import {
  addDaysKey, applyBoutEnd, applyRep, applySessionEnd, benchmarkRows, buildSession, dailyActivity,
  daysBetweenKeys, emptyGym, flattenExercises, instrumentSummary, isDue, localDateKey, moduleSummaries,
  normalizeGym, progressOf, recordRep, scheduleReview, streakDays, weakness, GYM_LOG_LIMIT,
} from './practiceEngine';
import { SKILL_TRACKS } from '../data/skillTracks';

const TODAY = '2026-11-15';
const exercises = flattenExercises(SKILL_TRACKS);
const byId = (id) => exercises.find((e) => e.id === id);
const picking = byId('e-ap-single-string'); // 60 → 120, step 4, 3 clean reps per rung
const capo = byId('a-ch-capo-transposition'); // no tempo, 4 clean reps

const repeat = (item, exercise, result, times, today = TODAY) => {
  let current = item;
  let event;
  for (let i = 0; i < times; i++) ({ item: current, event } = recordRep(current, exercise, result, today));
  return { item: current, event };
};

describe('dates', () => {
  it('uses the local calendar day, including late evening', () => {
    expect(localDateKey(new Date(2026, 10, 15, 23, 30))).toBe('2026-11-15');
    expect(addDaysKey('2026-12-30', 3)).toBe('2027-01-02');
    expect(daysBetweenKeys('2026-10-31', '2026-11-02')).toBe(2); // across the DST change
  });
});

describe('tempo ladder', () => {
  it('climbs one step only after the required clean reps in a row', () => {
    let { item, event } = repeat(undefined, picking, 'clean', 2);
    expect(item.bpm).toBe(60);
    expect(event).toBe('held');
    ({ item, event } = recordRep(item, picking, 'clean', TODAY));
    expect(event).toBe('climbed');
    expect(item.bpm).toBe(64);
    expect(item.bestCleanBpm).toBe(60);
    expect(item.history).toEqual([[TODAY, 60]]);
  });

  it('a shaky rep breaks the streak without dropping the tempo', () => {
    let { item } = repeat(undefined, picking, 'clean', 2);
    ({ item } = recordRep(item, picking, 'shaky', TODAY));
    ({ item } = repeat(item, picking, 'clean', 2));
    expect(item.bpm).toBe(60);
    expect(item.bestCleanBpm).toBeNull();
  });

  it('drops a step after two misses, but never below the floor', () => {
    let { item } = repeat(undefined, picking, 'clean', 6); // now at 68
    expect(item.bpm).toBe(68);
    let event;
    ({ item, event } = repeat(item, picking, 'miss', 2));
    expect(event).toBe('dropped');
    expect(item.bpm).toBe(64);
    expect(item.bestCleanBpm).toBe(64); // the benchmark never goes down
    ({ item } = repeat(item, picking, 'miss', 40));
    expect(item.bpm).toBe(48); // floor = start − 3 steps
  });

  it('marks mastery at the target tempo and stops climbing', () => {
    let item = { bpm: 120 };
    let event;
    ({ item, event } = repeat(item, picking, 'clean', 3));
    expect(event).toBe('mastered');
    expect(item.masteredAt).toBe(TODAY);
    expect(item.bpm).toBe(120);
    ({ item, event } = repeat(item, picking, 'clean', 3, '2026-11-20'));
    expect(event).toBe('held');
    expect(item.masteredAt).toBe(TODAY);
  });

  it('never steps past the target', () => {
    const { item } = repeat({ bpm: 118 }, picking, 'clean', 3);
    expect(item.bpm).toBe(120);
  });

  it('masters tempo-less exercises on clean reps alone', () => {
    const { item, event } = repeat(undefined, capo, 'clean', 4);
    expect(event).toBe('mastered');
    expect(item.bpm).toBeNull();
  });

  it('rejects unknown results', () => {
    expect(() => recordRep(undefined, picking, 'perfect', TODAY)).toThrow();
  });
});

describe('spaced review', () => {
  it('keeps un-mastered work on a short leash', () => {
    let item = scheduleReview({ reps: 5 }, picking, { clean: 5, total: 5 }, TODAY);
    expect(item.intervalDays).toBe(1);
    item = scheduleReview(item, picking, { clean: 5, total: 5 }, TODAY);
    expect(item.intervalDays).toBe(2);
    item = scheduleReview(item, picking, { clean: 5, total: 5 }, TODAY);
    expect(item.intervalDays).toBe(2);
  });

  it('spaces mastered work out further each clean review', () => {
    let item = { masteredAt: TODAY, reps: 9, cleanReps: 9 };
    const intervals = [];
    for (let i = 0; i < 4; i++) {
      item = scheduleReview(item, picking, { clean: 4, total: 4 }, TODAY);
      intervals.push(item.intervalDays);
    }
    expect(intervals[0]).toBe(3);
    expect(intervals).toEqual([...intervals].sort((a, b) => a - b));
    expect(new Set(intervals).size).toBe(4);
    expect(intervals[3]).toBeGreaterThan(20);
    expect(item.dueDate).toBe(addDaysKey(TODAY, intervals[3]));
  });

  it('brings a failed review back tomorrow and lowers its ease', () => {
    const before = { masteredAt: TODAY, intervalDays: 15, ease: 2.4, reps: 9, cleanReps: 9 };
    const after = scheduleReview(before, picking, { clean: 1, total: 5 }, TODAY);
    expect(after.intervalDays).toBe(1);
    expect(after.ease).toBeLessThan(2.4);
    expect(isDue(after, addDaysKey(TODAY, 1))).toBe(true);
    expect(isDue(after, TODAY)).toBe(false);
  });

  it('halves the interval on a mixed review', () => {
    const after = scheduleReview({ masteredAt: TODAY, intervalDays: 16, reps: 9, cleanReps: 9 }, picking, { clean: 3, total: 5 }, TODAY);
    expect(after.intervalDays).toBe(8);
  });

  it('does nothing for an empty bout', () => {
    expect(scheduleReview({ reps: 1 }, picking, { clean: 0, total: 0 }, TODAY).dueDate).toBeNull();
  });
});

describe('weakness', () => {
  it('ranks slow, unreliable, overdue items above solid ones', () => {
    const weak = { reps: 10, cleanReps: 2, bestCleanBpm: 60, dueDate: addDaysKey(TODAY, -5) };
    const solid = { reps: 10, cleanReps: 9, bestCleanBpm: 116, dueDate: addDaysKey(TODAY, 2) };
    expect(weakness(weak, picking, TODAY)).toBeGreaterThan(weakness(solid, picking, TODAY));
    expect(weakness(undefined, picking, TODAY)).toBe(0);
  });
});

describe('session builder', () => {
  it('starts a brand-new player on the first step of several modules, with reasons', () => {
    const session = buildSession({ exercises, items: {}, instrument: 'both', minutes: 30, today: TODAY });
    expect(session).toHaveLength(6);
    expect(session.every((s) => s.kind === 'new' && s.exercise.indexInModule === 0)).toBe(true);
    expect(session.every((s) => s.reason.startsWith('New:'))).toBe(true);
    const instruments = session.map((s) => s.exercise.instrument);
    expect(instruments.filter((i) => i === 'electric')).toHaveLength(3);
    expect(instruments.filter((i) => i === 'acoustic')).toHaveLength(3);
  });

  it('respects the instrument filter and the session length', () => {
    const electric = buildSession({ exercises, items: {}, instrument: 'electric', minutes: 15, today: TODAY });
    expect(electric).toHaveLength(3);
    expect(electric.every((s) => s.exercise.instrument === 'electric')).toBe(true);
    const acoustic = buildSession({ exercises, items: {}, instrument: 'acoustic', minutes: 45, today: TODAY });
    expect(acoustic.every((s) => s.exercise.instrument === 'acoustic')).toBe(true);
    expect(new Set(acoustic.map((s) => s.exercise.id)).size).toBe(acoustic.length);
  });

  it('keeps a slot for in-progress work in a short session instead of filling it with new material', () => {
    const started = recordRep(null, picking, 'shaky', '2026-11-14').item;
    const session = buildSession({ exercises, items: { [picking.id]: started }, instrument: 'both', minutes: 10, today: TODAY });
    expect(session).toHaveLength(2);
    expect(session.filter((s) => s.kind === 'ladder').map((s) => s.exercise.id)).toEqual([picking.id]);
    expect(session.filter((s) => s.kind === 'new')).toHaveLength(1);
  });

  it('does not offer a locked exercise until the one before it has been practiced', () => {
    const before = buildSession({ exercises, items: {}, instrument: 'electric', minutes: 60, today: TODAY });
    expect(before.some((s) => s.exercise.id === 'e-ap-string-crossing')).toBe(false);
    const items = { 'e-ap-single-string': { reps: 3, cleanReps: 3, bpm: 64, bestCleanBpm: 60, dueDate: addDaysKey(TODAY, 1) } };
    const after = buildSession({ exercises, items, instrument: 'electric', minutes: 60, today: TODAY });
    expect(after.some((s) => s.exercise.id === 'e-ap-string-crossing')).toBe(true);
  });

  it('puts due reviews and in-progress ladders ahead of new material', () => {
    const items = {
      'e-ap-single-string': { reps: 30, cleanReps: 28, bpm: 120, bestCleanBpm: 120, masteredAt: '2026-11-01', dueDate: addDaysKey(TODAY, -2) },
      'e-leg-trill': { reps: 12, cleanReps: 5, bpm: 70, bestCleanBpm: 65, dueDate: TODAY },
      'e-bend-whole-step': { reps: 8, cleanReps: 7, bpm: 75, bestCleanBpm: 70, dueDate: TODAY },
    };
    const session = buildSession({ exercises, items, instrument: 'electric', minutes: 30, today: TODAY });
    expect(session[0].kind).toBe('review');
    expect(session[0].reason).toMatch(/2 days overdue/);
    const ladders = session.filter((s) => s.kind === 'ladder');
    expect(ladders.map((s) => s.exercise.id)).toEqual(['e-leg-trill', 'e-bend-whole-step']); // weakest first
    expect(ladders[0].reason).toMatch(/best clean 65 BPM, target 110/);
    expect(ladders[0].bpm).toBe(70);
    expect(session.filter((s) => s.kind === 'new').length).toBeGreaterThan(0);
    expect(session.findIndex((s) => s.kind === 'new')).toBeGreaterThan(session.findIndex((s) => s.kind === 'ladder'));
  });

  it('leaves mastered items out until they are due', () => {
    const items = { 'e-ap-single-string': { reps: 30, cleanReps: 28, bpm: 120, bestCleanBpm: 120, masteredAt: '2026-11-01', dueDate: addDaysKey(TODAY, 4) } };
    const session = buildSession({ exercises, items, instrument: 'electric', minutes: 60, today: TODAY });
    expect(session.some((s) => s.exercise.id === 'e-ap-single-string')).toBe(false);
  });

  it('caps new material when there is plenty of ladder work', () => {
    const items = {};
    for (const e of exercises.filter((x) => x.instrument === 'acoustic')) items[e.id] = { reps: 6, cleanReps: 3, bpm: e.tempo?.startBpm || null, dueDate: TODAY };
    delete items['a-vl-walk-ups'];
    delete items['a-vl-descending-bass'];
    delete items['a-vl-anchored-changes'];
    const session = buildSession({ exercises, items, instrument: 'acoustic', minutes: 30, today: TODAY });
    expect(session.filter((s) => s.kind === 'new')).toHaveLength(1);
    expect(session.filter((s) => s.kind === 'ladder')).toHaveLength(5);
  });
});

describe('benchmarks', () => {
  it('reports progress toward the target tempo', () => {
    expect(progressOf(undefined, picking)).toBe(0);
    expect(progressOf({ reps: 3, cleanReps: 0 }, picking)).toBeCloseTo(0.02);
    const half = progressOf({ reps: 30, cleanReps: 20, bestCleanBpm: 88 }, picking);
    expect(half).toBeGreaterThan(0.4);
    expect(half).toBeLessThan(0.6);
    expect(progressOf({ reps: 30, cleanReps: 20, bestCleanBpm: 120, masteredAt: TODAY }, picking)).toBe(1);
  });

  it('rolls rows up per module and per instrument', () => {
    const items = {
      'e-ap-single-string': { reps: 30, cleanReps: 28, bpm: 120, bestCleanBpm: 120, masteredAt: TODAY, dueDate: TODAY },
      'e-ap-string-crossing': { reps: 6, cleanReps: 3, bpm: 64, bestCleanBpm: 60, dueDate: addDaysKey(TODAY, 1) },
    };
    const rows = benchmarkRows(exercises, items, TODAY);
    expect(rows).toHaveLength(exercises.length);
    const row = rows.find((r) => r.id === 'e-ap-string-crossing');
    expect(row).toMatchObject({ bestCleanBpm: 60, targetBpm: 108, cleanRate: 50, mastered: false, due: false });
    const mod = moduleSummaries(rows).find((m) => m.moduleId === 'alternate-picking');
    expect(mod).toMatchObject({ total: 3, started: 2, mastered: 1 });
    expect(mod.progress).toBeGreaterThan(0.33);
    const electric = instrumentSummary(rows, 'electric');
    expect(electric).toMatchObject({ started: 2, mastered: 1, due: 1 });
    expect(instrumentSummary(rows, 'acoustic')).toMatchObject({ started: 0, mastered: 0, progress: 0 });
  });
});

describe('gym state', () => {
  it('normalizes missing or damaged state', () => {
    expect(normalizeGym(undefined)).toEqual(emptyGym());
    expect(normalizeGym({ instrument: 'banjo', minutes: 7, log: 'x' })).toEqual(emptyGym());
    expect(normalizeGym({ instrument: 'acoustic', minutes: 45 })).toMatchObject({ instrument: 'acoustic', minutes: 45 });
  });

  it('logs each rep with the tempo it was played at and caps the log', () => {
    let gym = emptyGym();
    let event;
    for (let i = 0; i < 3; i++) ({ gym, event } = applyRep(gym, picking, 'clean', { today: TODAY, at: 1000 + i, measured: { spreadMs: 11 } }));
    expect(event).toBe('climbed');
    expect(gym.log).toHaveLength(3);
    expect(gym.log[2]).toEqual({ d: TODAY, t: 1002, id: 'e-ap-single-string', bpm: 60, r: 'clean', m: { spreadMs: 11 } });
    expect(gym.items['e-ap-single-string'].bpm).toBe(64);
    for (let i = 0; i < GYM_LOG_LIMIT + 20; i++) ({ gym } = applyRep(gym, picking, 'shaky', { today: TODAY, at: i }));
    expect(gym.log).toHaveLength(GYM_LOG_LIMIT);
  });

  it('schedules the next review when a bout ends, and records the session', () => {
    let { gym } = applyRep(emptyGym(), picking, 'clean', { today: TODAY });
    gym = applyBoutEnd(gym, picking, { clean: 1, total: 1 }, TODAY);
    expect(gym.items[picking.id].dueDate).toBe(addDaysKey(TODAY, 1));
    gym = applySessionEnd(gym, { minutes: 12.34, items: 1, clean: 1, total: 1, at: 5 }, TODAY);
    expect(gym.sessions).toEqual([{ d: TODAY, t: 5, minutes: 12.3, items: 1, clean: 1, total: 1, instrument: 'both' }]);
    expect(applySessionEnd(gym, { total: 0 }, TODAY).sessions).toHaveLength(1);
  });

  it('summarizes daily activity and the practice streak', () => {
    let gym = emptyGym();
    for (const day of [addDaysKey(TODAY, -2), addDaysKey(TODAY, -1), TODAY]) {
      ({ gym } = applyRep(gym, picking, 'clean', { today: day }));
      ({ gym } = applyRep(gym, picking, 'miss', { today: day }));
      gym = applySessionEnd(gym, { minutes: 10, items: 1, clean: 1, total: 2 }, day);
    }
    const activity = dailyActivity(gym, 7, TODAY);
    expect(activity).toHaveLength(7);
    expect(activity.at(-1)).toEqual({ date: TODAY, reps: 2, clean: 1, minutes: 10 });
    expect(activity[0].reps).toBe(0);
    expect(streakDays(gym, TODAY)).toBe(3);
    expect(streakDays(gym, addDaysKey(TODAY, 1))).toBe(3); // not broken until a full day is missed
    expect(streakDays(gym, addDaysKey(TODAY, 2))).toBe(0);
  });
});
