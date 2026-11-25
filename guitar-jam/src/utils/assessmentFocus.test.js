import { describe, expect, it } from 'vitest';
import { ASSESSMENT_WEEKS } from '../data/assessmentPlan';
import { SKILL_TRACKS } from '../data/skillTracks';
import { emptyGym, flattenExercises } from './practiceEngine';
import { assessmentFocus, ASSESSMENT_EXERCISES, buildAssessmentSession } from './assessmentFocus';
import { todayTrainPlan } from './trainLink';

const exercises = flattenExercises(SKILL_TRACKS);
const today = '2026-11-24';
const record = (week, criteria) => ({ week, criteria, score: 40, date: today });

describe('assessment-driven practice', () => {
  it('maps only real criteria to real exercises', () => {
    const criteria = ASSESSMENT_WEEKS.flatMap((plan) => plan.criteria.map((c) => c.id));
    for (const [criterion, exercise] of Object.entries(ASSESSMENT_EXERCISES)) {
      expect(criteria).toContain(criterion);
      expect(exercises.some((e) => e.id === exercise)).toBe(true);
    }
  });
  it('puts failed and marginal technique criteria first, without duplicates', () => {
    const gym = emptyGym();
    const assessments = { 0: record(0, { 'w0-open': 'fail', 'w0-change': 'marginal', 'w0-metro': 'pass' }) };
    const queue = buildAssessmentSession({ gym, exercises, assessments, today, minutes: 15 });
    expect(queue[0]).toMatchObject({ kind: 'focus', exercise: { id: 'a-ch-two-beat-changes' } });
    expect(queue[0].reason).toContain('Week 0 assessment focus');
    expect(queue[0].criteria).toHaveLength(2);
    expect(queue).toHaveLength(3);
    expect(new Set(queue.map((e) => e.exercise.id)).size).toBe(queue.length);
  });
  it('does not invent technique work for repertoire and logistics failures', () => {
    expect(assessmentFocus({ assessments: { 2: record(2, { 'w2-songs': 'fail', 'w2-verse': 'marginal' }) }, exercises, today })).toEqual([]);
  });
  it('uses the latest completed assessment and respects the chosen instrument', () => {
    const assessments = { 0: record(0, { 'w0-barre': 'fail' }), 1: record(1, { 'w1-change': 'pass' }) };
    expect(assessmentFocus({ assessments, exercises, today })).toEqual([]);
    expect(assessmentFocus({ assessments: { 0: assessments[0] }, exercises, today, instrument: 'electric' })).toEqual([]);
  });
  it('ignores malformed and future assessments', () => {
    expect(assessmentFocus({ exercises, today, assessments: { a: null, b: { week: 999, score: 1 }, c: { ...record(0, { 'w0-metro': 'fail' }), date: '2027-01-01' } } })).toEqual([]);
  });
  it('does not re-inject the focus after practice today and keeps Today consistent', () => {
    const gym = emptyGym();
    const assessments = { 0: record(0, { 'w0-change': 'fail' }) };
    const before = todayTrainPlan({ gym, exercises, assessments, today, budgetMinutes: 15 });
    expect(before.upcoming[0].kind).toBe('focus');
    gym.log.push({ d: today, id: 'a-ch-two-beat-changes', r: 'clean' });
    const after = todayTrainPlan({ gym, exercises, assessments, today, budgetMinutes: 15 });
    expect(after.done.map((e) => e.exercise.id)).toContain('a-ch-two-beat-changes');
    expect(after.upcoming.map((e) => e.exercise.id)).not.toContain('a-ch-two-beat-changes');
  });
});
