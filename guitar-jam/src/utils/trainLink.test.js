import { describe, expect, it } from 'vitest';
import { SKILL_TRACKS } from '../data/skillTracks';
import { applyBoutEnd, applyRep, emptyGym, flattenExercises, repsToClimb } from './practiceEngine';
import { normalizeStage90 } from './stage90';
import {
  todayTrainPlan, trainActiveDays, trainBudgetMinutes, trainReportLine, weeklyTrainReport,
} from './trainLink';

const EXERCISES = flattenExercises(SKILL_TRACKS);
const electric = EXERCISES.filter((e) => e.instrument === 'electric' && e.tempo?.startBpm);
const acoustic = EXERCISES.filter((e) => e.instrument === 'acoustic' && e.tempo?.startBpm);
const E1 = electric[0];
const A1 = acoustic[0];

// Grade `results` on one exercise on one day, then close the sitting.
function sit(gym, exercise, day, results) {
  let next = gym;
  for (const r of results) next = applyRep(next, exercise, r, { today: day, at: 1 }).gym;
  return applyBoutEnd(next, exercise, { clean: results.filter((r) => r === 'clean').length, total: results.length }, day);
}
const cleans = (exercise, climbs = 1) => Array(repsToClimb(exercise) * climbs).fill('clean');

describe('trainBudgetMinutes', () => {
  it('fills what is left of the hour, between two and four exercises', () => {
    expect(trainBudgetMinutes(40)).toBe(20);
    expect(trainBudgetMinutes(45)).toBe(15);
    expect(trainBudgetMinutes(50)).toBe(10);
    expect(trainBudgetMinutes(60)).toBe(10); // long program day: still two exercises
    expect(trainBudgetMinutes(20)).toBe(20); // assessment day: capped at four
  });

  it('never exceeds the session length chosen in Train', () => {
    expect(trainBudgetMinutes(40, 15)).toBe(15);
    expect(trainBudgetMinutes(40, 60)).toBe(20);
    expect(trainBudgetMinutes(undefined, undefined)).toBe(20);
  });
});

describe('todayTrainPlan', () => {
  it('queues new work with reasons for a first-time player', () => {
    const plan = todayTrainPlan({ gym: emptyGym(), exercises: EXERCISES, budgetMinutes: 15, today: '2026-11-16' });
    expect(plan.budgetMinutes).toBe(15);
    expect(plan.upcoming).toHaveLength(3);
    expect(plan.done).toHaveLength(0);
    expect(plan.started).toBe(false);
    expect(plan.complete).toBe(false);
    expect(plan.upcoming.every((e) => e.kind === 'new' && e.reason.startsWith('New:'))).toBe(true);
    expect(plan.counts).toEqual({ review: 0, ladder: 0, new: 3 });
  });

  it('puts a due review first and says why', () => {
    // Master E1 a while ago so its review is overdue today.
    let gym = emptyGym();
    const climbs = Math.ceil((E1.tempo.targetBpm - E1.tempo.startBpm) / (E1.tempo.stepBpm || 4)) + 1;
    gym = sit(gym, E1, '2026-11-01', cleans(E1, climbs));
    expect(gym.items[E1.id].masteredAt).toBe('2026-11-01');
    const plan = todayTrainPlan({ gym, exercises: EXERCISES, budgetMinutes: 15, today: '2026-11-16' });
    expect(plan.dueReviews).toBe(1);
    expect(plan.upcoming[0].exercise.id).toBe(E1.id);
    expect(plan.upcoming[0].kind).toBe('review');
    expect(plan.upcoming[0].reason).toMatch(/Review, \d+ days overdue/);
  });

  it('counts reps done today toward the budget and stops re-queuing them', () => {
    let gym = emptyGym();
    gym = sit(gym, E1, '2026-11-16', ['clean', 'shaky', 'clean']);
    let plan = todayTrainPlan({ gym, exercises: EXERCISES, budgetMinutes: 15, today: '2026-11-16' });
    expect(plan.done.map((d) => d.exercise.id)).toEqual([E1.id]);
    expect(plan.done[0]).toMatchObject({ reps: 3, clean: 2, done: true });
    expect(plan.done[0].reason).toBe('Done today: 2 clean of 3 passes.');
    expect(plan.upcoming).toHaveLength(2);
    expect(plan.upcoming.some((e) => e.exercise.id === E1.id)).toBe(false);
    expect(plan).toMatchObject({ started: true, complete: false, repsToday: 3, cleanToday: 2, doneCount: 1 });

    const [second, third] = plan.upcoming.map((e) => e.exercise);
    gym = sit(gym, second, '2026-11-16', ['clean']);
    gym = sit(gym, third, '2026-11-16', ['miss']);
    plan = todayTrainPlan({ gym, exercises: EXERCISES, budgetMinutes: 15, today: '2026-11-16' });
    expect(plan.complete).toBe(true);
    expect(plan.upcoming).toHaveLength(0);
    expect(plan.entries).toHaveLength(3);
  });

  it('starts fresh the next day', () => {
    const gym = sit(emptyGym(), E1, '2026-11-15', ['clean']);
    const plan = todayTrainPlan({ gym, exercises: EXERCISES, budgetMinutes: 10, today: '2026-11-16' });
    expect(plan.done).toHaveLength(0);
    expect(plan.started).toBe(false);
    expect(plan.upcoming).toHaveLength(2);
    expect(plan.upcoming.some((e) => e.exercise.id === E1.id && e.kind === 'ladder')).toBe(true);
  });

  it('respects the instrument chosen in Train', () => {
    const plan = todayTrainPlan({ gym: { ...emptyGym(), instrument: 'acoustic' }, exercises: EXERCISES, budgetMinutes: 20, today: '2026-11-16' });
    expect(plan.upcoming).toHaveLength(4);
    expect(plan.upcoming.every((e) => e.exercise.instrument === 'acoustic')).toBe(true);
  });

  it('lists the days Train was practiced', () => {
    let gym = sit(emptyGym(), E1, '2026-11-14', ['clean']);
    gym = sit(gym, E1, '2026-11-16', ['miss']);
    expect([...trainActiveDays(gym)].sort()).toEqual(['2026-11-14', '2026-11-16']);
    expect(trainActiveDays(undefined).size).toBe(0);
  });
});

describe('weeklyTrainReport', () => {
  const step = (e) => e.tempo.stepBpm || 4;

  it('reports best clean BPM against last week, per instrument', () => {
    let gym = emptyGym();
    // Last week: E1 benchmarked at its start tempo.
    gym = sit(gym, E1, '2026-11-05', cleans(E1));
    // This week: E1 climbs twice more; A1 gets its first benchmark.
    gym = sit(gym, E1, '2026-11-12', cleans(E1, 2));
    gym = sit(gym, A1, '2026-11-14', [...cleans(A1), 'miss']);
    const report = weeklyTrainReport({ gym, exercises: EXERCISES, today: '2026-11-16' });

    expect(report).toMatchObject({ from: '2026-11-10', to: '2026-11-16', daysPracticed: 2 });
    expect(report.reps).toBe(repsToClimb(E1) * 2 + repsToClimb(A1) + 1);

    const e = report.instruments.electric;
    expect(e).toMatchObject({ practiced: 1, improved: 1, firstBenchmarks: 0, gainedBpm: 2 * step(E1) });
    expect(e.changes).toEqual([{
      id: E1.id, title: E1.title, before: E1.tempo.startBpm, after: E1.tempo.startBpm + 2 * step(E1), delta: 2 * step(E1), target: E1.tempo.targetBpm,
    }]);

    const a = report.instruments.acoustic;
    expect(a).toMatchObject({ practiced: 1, improved: 0, firstBenchmarks: 1, gainedBpm: 0 });
    expect(a.changes[0]).toMatchObject({ id: A1.id, before: null, after: A1.tempo.startBpm, delta: null });
    expect(a.reps).toBe(repsToClimb(A1) + 1);
  });

  it('leaves out benchmarks that did not move this week', () => {
    let gym = sit(emptyGym(), E1, '2026-11-05', cleans(E1));
    gym = sit(gym, E1, '2026-11-13', ['shaky', 'miss']);
    const report = weeklyTrainReport({ gym, exercises: EXERCISES, today: '2026-11-16' });
    expect(report.instruments.electric).toMatchObject({ practiced: 1, improved: 0, gainedBpm: 0, changes: [] });
    expect(report.cleanRate).toBe(0);
  });

  it('counts reviews passed and failed on mastered work only', () => {
    let gym = emptyGym();
    const toTarget = (e) => Math.ceil((e.tempo.targetBpm - e.tempo.startBpm) / step(e)) + 1;
    gym = sit(gym, E1, '2026-11-01', cleans(E1, toTarget(E1)));
    gym = sit(gym, A1, '2026-11-02', cleans(A1, toTarget(A1)));
    expect(gym.items[E1.id].masteredAt).toBe('2026-11-01');
    expect(gym.items[A1.id].masteredAt).toBe('2026-11-02');
    gym = sit(gym, E1, '2026-11-12', ['clean', 'clean', 'clean', 'shaky']); // 75%: pass
    gym = sit(gym, A1, '2026-11-13', ['clean', 'miss', 'miss']); // fail
    gym = sit(gym, electric[1], '2026-11-13', ['clean', 'miss']); // not mastered: ladder work, not a review

    const report = weeklyTrainReport({ gym, exercises: EXERCISES, today: '2026-11-16' });
    expect(report.reviews.passed).toBe(1);
    expect(report.reviews.failed).toBe(1);
    expect(report.reviews.failedItems).toEqual([{ id: A1.id, title: A1.title, instrument: 'acoustic', date: '2026-11-13', clean: 1, total: 3 }]);
    expect(report.instruments.electric.atTarget).toBe(1);
    expect(report.instruments.electric.newlyAtTarget).toBe(0);
  });

  it('does not count the sitting that reached the target as a review', () => {
    const toTarget = Math.ceil((E1.tempo.targetBpm - E1.tempo.startBpm) / step(E1)) + 1;
    const gym = sit(emptyGym(), E1, '2026-11-14', [...cleans(E1, toTarget), 'clean']);
    const report = weeklyTrainReport({ gym, exercises: EXERCISES, today: '2026-11-16' });
    expect(report.reviews).toMatchObject({ passed: 0, failed: 0 });
    expect(report.instruments.electric).toMatchObject({ atTarget: 1, newlyAtTarget: 1 });
  });

  it('names the weakest started items', () => {
    let gym = sit(emptyGym(), E1, '2026-11-12', cleans(E1, 2));
    gym = sit(gym, A1, '2026-11-12', ['miss', 'miss', 'shaky']);
    const report = weeklyTrainReport({ gym, exercises: EXERCISES, today: '2026-11-16' });
    expect(report.weakest.length).toBeGreaterThanOrEqual(2);
    expect(report.weakest[0]).toMatchObject({ id: A1.id, instrument: 'acoustic', cleanRate: 0 });
    expect(report.weakest.every((w, i, all) => i === 0 || all[i - 1].weakness >= w.weakness)).toBe(true);
  });

  it('ignores work outside the window and log entries for exercises that no longer exist', () => {
    let gym = sit(emptyGym(), E1, '2026-11-01', cleans(E1));
    gym = { ...gym, log: [...gym.log, { d: '2026-11-15', t: 1, id: 'retired-exercise', bpm: 80, r: 'clean' }] };
    const report = weeklyTrainReport({ gym, exercises: EXERCISES, today: '2026-11-16' });
    expect(report.reps).toBe(0);
    expect(report.instruments.electric.changes).toEqual([]);
    expect(trainReportLine(report)).toBeNull();
  });

  it('summarizes a report in one line', () => {
    let gym = sit(emptyGym(), E1, '2026-11-05', cleans(E1));
    gym = sit(gym, E1, '2026-11-12', cleans(E1));
    gym = sit(gym, A1, '2026-11-12', cleans(A1));
    const line = trainReportLine(weeklyTrainReport({ gym, exercises: EXERCISES, today: '2026-11-16' }));
    expect(line).toBe(`electric +${step(E1)} BPM · acoustic 1 first benchmark`);
    expect(trainReportLine(undefined)).toBeNull();
    expect(trainReportLine({})).toBeNull();
  });
});

describe('progress saved before Train was connected', () => {
  // A blob as written before the gym existed at all (schema 1, no `gym`).
  const preTrain = {
    _schemaVersion: 1,
    startDate: '2026-09-01',
    gigDate: '2026-12-08',
    assessments: { 0: { week: 0, date: '2026-09-07', criteria: { a: 'pass' }, maxCleanBpm: 72, ratings: { clean: 3 }, notes: '', score: 61 } },
    program: { completed: [1, 2, 3], blocks: { 3: [0, 1] }, notes: { 2: 'G to C drags' }, activity: { '2026-09-03': 2 } },
    set: [{ id: 's1', title: 'Song', chords: 'G C D', bpm: 90, minutes: 3 }],
  };

  it('loads untouched and yields a first-day plan and an empty week', () => {
    const state = normalizeStage90(JSON.parse(JSON.stringify(preTrain)));
    expect(state.assessments).toEqual(preTrain.assessments);
    expect(state.program).toEqual(preTrain.program);
    expect(state.set).toEqual(preTrain.set);
    expect(state.assessments[0].train).toBeUndefined();

    const plan = todayTrainPlan({ gym: state.gym, exercises: EXERCISES, budgetMinutes: 15, today: '2026-11-16' });
    expect(plan.upcoming).toHaveLength(3);
    const report = weeklyTrainReport({ gym: state.gym, exercises: EXERCISES, today: '2026-11-16' });
    expect(report).toMatchObject({ reps: 0, cleanRate: null, daysPracticed: 0, minutes: 0, weakest: [] });
    expect(report.reviews).toEqual({ passed: 0, failed: 0, failedItems: [] });
  });

  it('reads a gym saved by the first Train release (items without newer fields)', () => {
    // Early items: no history array, no masteredAt, log entries without `m`.
    const gym = {
      instrument: 'electric',
      minutes: 30,
      items: { [E1.id]: { bpm: 68, bestCleanBpm: 64, reps: 9, cleanReps: 6, dueDate: '2026-11-15', lastPracticed: '2026-11-14' } },
      log: [{ d: '2026-11-14', t: 1, id: E1.id, bpm: 64, r: 'clean' }, null, { d: '2026-11-14' }],
      sessions: [{ d: '2026-11-14', minutes: 12.4, total: 9 }],
    };
    const state = normalizeStage90({ ...preTrain, gym });
    expect(state.gym.items[E1.id]).toEqual(gym.items[E1.id]); // not rewritten

    const plan = todayTrainPlan({ gym: state.gym, exercises: EXERCISES, budgetMinutes: 15, today: '2026-11-16' });
    expect(plan.upcoming[0]).toMatchObject({ kind: 'ladder', bpm: 68 });
    expect(plan.upcoming[0].exercise.id).toBe(E1.id);

    const report = weeklyTrainReport({ gym: state.gym, exercises: EXERCISES, today: '2026-11-16' });
    expect(report).toMatchObject({ reps: 1, clean: 1, minutes: 12, daysPracticed: 1 });
    expect(report.instruments.electric).toMatchObject({ practiced: 1, changes: [] }); // no history: no invented change
    expect(report.weakest[0].id).toBe(E1.id);
  });
});
