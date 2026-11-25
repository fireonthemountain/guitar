import { ASSESSMENT_WEEKS } from '../data/assessmentPlan';
import { buildSession, localDateKey, MINUTES_PER_ITEM } from './practiceEngine';

// Route only criteria that have a matching technique exercise. Song memory,
// repertoire and logistics still use their assessment's written remediation.
export const ASSESSMENT_EXERCISES = {
  'w0-open': 'a-ch-two-beat-changes',
  'w0-change': 'a-ch-two-beat-changes',
  'w0-metro': 'a-st-accented-sixteenths',
  'w0-barre': 'a-ch-f-barre-in-context',
  'w1-five': 'a-ch-two-beat-changes',
  'w1-change': 'a-ch-two-beat-changes',
  'w1-strum': 'a-st-accented-sixteenths',
  'w2-change': 'a-ch-two-beat-changes',
  'w3-dyn': 'a-st-volume-ladder',
  'w3-barre': 'a-ch-f-barre-in-context',
  'w4-change': 'a-ch-two-beat-changes',
  'w4-tempo': 'a-ch-two-beat-changes',
  'w5-pick': 'a-fs-pima-em',
  'w8-fill': 'a-vl-walk-ups',
};

export function assessmentFocus({ assessments = {}, exercises, items = {}, instrument = 'both', today = localDateKey() }) {
  const latest = Object.values(assessments || {})
    .filter((record) => record && Number.isInteger(record.week) && Number.isFinite(record.score)
      && ASSESSMENT_WEEKS[record.week] && (!record.date || record.date <= today))
    .sort((a, b) => b.week - a.week)[0];
  if (!latest) return [];
  const byId = new Map(exercises.map((exercise) => [exercise.id, exercise]));
  const entries = new Map();
  for (const criterion of ASSESSMENT_WEEKS[latest.week].criteria) {
    if (!['fail', 'marginal'].includes(latest.criteria?.[criterion.id])) continue;
    const exercise = byId.get(ASSESSMENT_EXERCISES[criterion.id]);
    if (!exercise || (instrument !== 'both' && exercise.instrument !== instrument)) continue;
    if (!entries.has(exercise.id)) {
      entries.set(exercise.id, {
        exercise, kind: 'focus', minutes: MINUTES_PER_ITEM,
        bpm: items[exercise.id]?.bpm || exercise.tempo?.startBpm || null,
        criteria: [],
      });
    }
    entries.get(exercise.id).criteria.push(criterion.label);
  }
  return [...entries.values()].map((entry) => ({
    ...entry,
    reason: `Week ${latest.week} assessment focus: ${entry.criteria.join('; ')}.`,
  }));
}

export function buildAssessmentSession({ assessments = {}, gym, exercises, minutes = gym.minutes, today = localDateKey() }) {
  const slots = Math.max(1, Math.floor(minutes / MINUTES_PER_ITEM));
  const practicedToday = new Set(gym.log.filter((entry) => entry?.d === today).map((entry) => entry.id));
  const focus = assessmentFocus({ assessments, exercises, items: gym.items, instrument: gym.instrument, today })
    .filter((entry) => !practicedToday.has(entry.exercise.id));
  const focusedIds = new Set(focus.map((entry) => entry.exercise.id));
  const normal = buildSession({
    exercises, items: gym.items, instrument: gym.instrument,
    minutes: (slots + focus.length) * MINUTES_PER_ITEM, today,
  }).filter((entry) => !focusedIds.has(entry.exercise.id));
  return [...focus, ...normal].slice(0, slots);
}
