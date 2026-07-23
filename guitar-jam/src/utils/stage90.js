// Stage Ready 90 — program state, week math, and scoring.
// One localStorage key holds everything so export/import stays a single blob.

import { ASSESSMENT_WEEKS, GIG_TEMPO_TARGET, TEMPO_FLOOR, RATING_KEYS } from '../data/assessmentPlan';

export const STAGE90_KEY = 'stage90';
export const PROGRAM_WEEKS = 13; // weeks 1–13 after the week-0 placement

const EMPTY = { startDate: null, gigDate: null, assessments: {} };

export function loadStage90() {
  try {
    const s = localStorage.getItem(STAGE90_KEY);
    if (s) return { ...EMPTY, ...JSON.parse(s) };
  } catch {}
  return { ...EMPTY };
}

export function saveStage90(state) {
  try { localStorage.setItem(STAGE90_KEY, JSON.stringify(state)); } catch {}
}

export const dateKey = (d) => d.toISOString().slice(0, 10);

export function addDays(iso, n) {
  const d = new Date(iso + 'T00:00:00');
  d.setDate(d.getDate() + n);
  return dateKey(d);
}

export function daysBetween(fromIso, toIso) {
  return Math.round((new Date(toIso + 'T00:00:00') - new Date(fromIso + 'T00:00:00')) / 86400000);
}

// Week 0 runs from startDate for 7 days; week N ends on day 7*(N+1)-1.
export function currentWeek(startDate, todayIso = dateKey(new Date())) {
  const days = daysBetween(startDate, todayIso);
  return Math.max(0, Math.min(PROGRAM_WEEKS, Math.floor(days / 7)));
}

export function daysToGig(gigDate, todayIso = dateKey(new Date())) {
  return daysBetween(todayIso, gigDate);
}

export const planForWeek = (w) => ASSESSMENT_WEEKS.find((p) => p.week === w) || null;

// --- Scoring ---------------------------------------------------------------

export const CRIT_VALUE = { pass: 1, marginal: 0.5, fail: 0 };

export function criteriaRate(record, plan) {
  const ids = plan.criteria.map((c) => c.id);
  if (!ids.length) return 0;
  const total = ids.reduce((sum, id) => sum + (CRIT_VALUE[record.criteria?.[id]] ?? 0), 0);
  return total / ids.length;
}

export function ratingsAvg(record) {
  const vals = RATING_KEYS.map(([k]) => record.ratings?.[k]).filter((v) => v >= 1);
  if (!vals.length) return 0;
  return vals.reduce((a, b) => a + b, 0) / vals.length / 5;
}

export function tempoNorm(bpm) {
  if (!bpm) return 0;
  return Math.max(0, Math.min(1, (bpm - TEMPO_FLOOR) / (GIG_TEMPO_TARGET - TEMPO_FLOOR)));
}

// Weekly score 0–100: what you passed (50%), how it felt (30%), how fast you can go (20%).
export function assessmentScore(record, plan) {
  return Math.round(100 * (0.5 * criteriaRate(record, plan) + 0.3 * ratingsAvg(record) + 0.2 * tempoNorm(record.maxCleanBpm)));
}

// Gig readiness: the latest weekly score, nudged by trend so an improving week
// counts a little more than a static one.
export function gigReadiness(assessments) {
  const done = Object.values(assessments)
    .filter((a) => a && typeof a.score === 'number')
    .sort((a, b) => a.week - b.week);
  if (!done.length) return null;
  const latest = done.at(-1);
  const prev = done.length > 1 ? done.at(-2) : null;
  const trend = prev ? Math.max(-10, Math.min(10, (latest.score - prev.score) / 2)) : 0;
  return Math.max(0, Math.min(100, Math.round(latest.score + trend)));
}

// Everything the latest assessment failed (or marked marginal), with its fix —
// this is next week's injected focus list.
export function remediationFor(record, plan) {
  if (!record || !plan) return [];
  return plan.criteria
    .filter((c) => record.criteria?.[c.id] === 'fail' || record.criteria?.[c.id] === 'marginal')
    .map((c) => ({ ...c, result: record.criteria[c.id] }));
}
