// Train ↔ Today ↔ weekly assessment. Pure functions, no I/O.
//
// Everything here is DERIVED from the existing `gym` state (items, log,
// sessions). Nothing new is stored for Today, so blobs saved before this
// existed load unchanged. The weekly assessment record gains one optional
// field, `train` (the report below, frozen at save time); records without it
// are still valid.

import {
  addDaysKey, benchmarkRows, buildSession, daysBetweenKeys, localDateKey,
  MINUTES_PER_ITEM, normalizeGym,
} from './practiceEngine';

// A whole practice day (program blocks + technique) aims at about an hour.
export const DAY_MINUTES_GOAL = 60;
export const TRAIN_MIN_MINUTES = 10;
export const TRAIN_MAX_MINUTES = 20;
// Same line scheduleReview draws: at or above it the review interval grows.
export const REVIEW_PASS_RATIO = 0.75;
export const TRAIN_INSTRUMENTS = ['electric', 'acoustic'];

// Technique time for Today: whatever is left of the hour after the program
// blocks, never less than two exercises or more than four, and never more
// than the session length the player chose in Train.
export function trainBudgetMinutes(programMinutes = 0, gymMinutes = 30) {
  const left = DAY_MINUTES_GOAL - Math.max(0, Number(programMinutes) || 0);
  const clamped = Math.max(TRAIN_MIN_MINUTES, Math.min(TRAIN_MAX_MINUTES, left));
  const capped = Math.min(clamped, Math.max(TRAIN_MIN_MINUTES, Number(gymMinutes) || 30));
  return Math.floor(capped / MINUTES_PER_ITEM) * MINUTES_PER_ITEM;
}

// Days with at least one graded Train rep, as local day keys.
export function trainActiveDays(gymIn) {
  return new Set(normalizeGym(gymIn).log.map((entry) => entry?.d).filter(Boolean));
}

// The Train part of today's plan: what is already done today plus what is
// still queued (due reviews → weakest ladders → new), each with its reason.
export function todayTrainPlan({ gym: gymIn, exercises, budgetMinutes = 15, today = localDateKey() }) {
  const gym = normalizeGym(gymIn);
  const byId = new Map(exercises.map((e) => [e.id, e]));
  const slots = Math.max(1, Math.floor(budgetMinutes / MINUTES_PER_ITEM));

  const doneMap = new Map();
  for (const entry of gym.log) {
    if (!entry || entry.d !== today || !byId.has(entry.id)) continue;
    if (!doneMap.has(entry.id)) doneMap.set(entry.id, { reps: 0, clean: 0 });
    const d = doneMap.get(entry.id);
    d.reps += 1;
    if (entry.r === 'clean') d.clean += 1;
  }
  const done = [...doneMap.entries()].map(([id, counts]) => {
    const exercise = byId.get(id);
    const item = gym.items[id] || {};
    return {
      exercise,
      kind: item.masteredAt && item.masteredAt < today ? 'review' : 'ladder',
      done: true,
      reps: counts.reps,
      clean: counts.clean,
      bpm: item.bpm || null,
      bestCleanBpm: item.bestCleanBpm || null,
      minutes: MINUTES_PER_ITEM,
      reason: `Done today: ${counts.clean} clean of ${counts.reps} pass${counts.reps === 1 ? '' : 'es'}.`,
    };
  });

  // Ask for enough to cover the slots even after today's work is filtered out.
  const remaining = Math.max(0, slots - done.length);
  const upcoming = remaining
    ? buildSession({ exercises, items: gym.items, instrument: gym.instrument, minutes: (slots + done.length) * MINUTES_PER_ITEM, today })
      .filter((entry) => !doneMap.has(entry.exercise.id))
      .slice(0, remaining)
      .map((entry) => ({ ...entry, done: false }))
    : [];

  const repsToday = done.reduce((sum, d) => sum + d.reps, 0);
  const counts = { review: 0, ladder: 0, new: 0 };
  for (const entry of upcoming) counts[entry.kind] = (counts[entry.kind] || 0) + 1;
  const dueReviews = exercises.filter((e) => {
    const item = gym.items[e.id];
    return item?.masteredAt && item.dueDate && daysBetweenKeys(item.dueDate, today) >= 0;
  }).length;

  return {
    today,
    budgetMinutes: slots * MINUTES_PER_ITEM,
    slots,
    instrument: gym.instrument,
    done,
    upcoming,
    entries: [...done, ...upcoming],
    doneCount: done.length,
    repsToday,
    cleanToday: done.reduce((sum, d) => sum + d.clean, 0),
    minutesToday: Math.round(gym.sessions.filter((s) => s?.d === today).reduce((sum, s) => sum + (s.minutes || 0), 0)),
    counts,
    dueReviews,
    started: repsToday > 0,
    // The budget is met, or something was practiced and nothing else is queued.
    complete: done.length >= slots || (done.length > 0 && upcoming.length === 0),
  };
}

const bestIn = (history, test) => {
  let best = null;
  for (const row of history || []) {
    if (!Array.isArray(row) || typeof row[1] !== 'number' || !test(row[0])) continue;
    if (best === null || row[1] > best) best = row[1];
  }
  return best;
};

// What Train produced in the `days` days ending `today`, against where things
// stood before that window ("last week").
//   changes:  best clean BPM before → now, per exercise that moved
//   reviews:  sittings on already-mastered exercises, passed or failed
//   weakest:  what to put first next week
export function weeklyTrainReport({ gym: gymIn, exercises, today = localDateKey(), days = 7 }) {
  const gym = normalizeGym(gymIn);
  const from = addDaysKey(today, -(days - 1));
  const inWindow = (d) => typeof d === 'string' && d >= from && d <= today;
  const byId = new Map(exercises.map((e) => [e.id, e]));
  const log = gym.log.filter((entry) => entry && inWindow(entry.d) && byId.has(entry.id));

  const instruments = Object.fromEntries(TRAIN_INSTRUMENTS.map((name) => [name, {
    practiced: 0, reps: 0, clean: 0, improved: 0, firstBenchmarks: 0, gainedBpm: 0, atTarget: 0, newlyAtTarget: 0, changes: [],
  }]));
  const practicedIds = new Set(log.map((entry) => entry.id));

  for (const exercise of exercises) {
    const bucket = instruments[exercise.instrument];
    if (!bucket) continue;
    const item = gym.items[exercise.id];
    if (!item) continue;
    if (practicedIds.has(exercise.id)) bucket.practiced += 1;
    if (item.masteredAt && item.masteredAt <= today) {
      bucket.atTarget += 1;
      if (inWindow(item.masteredAt)) bucket.newlyAtTarget += 1;
    }
    const before = bestIn(item.history, (d) => d < from);
    const after = bestIn(item.history, (d) => d <= today);
    if (after === null || (before !== null && after <= before)) continue;
    const delta = before === null ? null : after - before;
    if (delta === null) bucket.firstBenchmarks += 1;
    else { bucket.improved += 1; bucket.gainedBpm += delta; }
    bucket.changes.push({ id: exercise.id, title: exercise.title, before, after, delta, target: exercise.mastery?.minimumBpm || exercise.tempo?.targetBpm || null });
  }
  for (const entry of log) {
    const bucket = instruments[byId.get(entry.id).instrument];
    if (!bucket) continue;
    bucket.reps += 1;
    if (entry.r === 'clean') bucket.clean += 1;
  }
  // Biggest gains first; first-ever benchmarks after the measured gains.
  for (const bucket of Object.values(instruments)) bucket.changes.sort((a, b) => (b.delta ?? -1) - (a.delta ?? -1) || b.after - a.after);

  // A review = a sitting (one exercise, one day) on work mastered before that day.
  const sittings = new Map();
  for (const entry of log) {
    const item = gym.items[entry.id];
    if (!item?.masteredAt || !(item.masteredAt < entry.d)) continue;
    const key = `${entry.id}|${entry.d}`;
    if (!sittings.has(key)) sittings.set(key, { id: entry.id, date: entry.d, clean: 0, total: 0 });
    const s = sittings.get(key);
    s.total += 1;
    if (entry.r === 'clean') s.clean += 1;
  }
  const reviews = { passed: 0, failed: 0, failedItems: [] };
  for (const s of sittings.values()) {
    if (s.clean / s.total >= REVIEW_PASS_RATIO) reviews.passed += 1;
    else {
      reviews.failed += 1;
      const exercise = byId.get(s.id);
      reviews.failedItems.push({ id: s.id, title: exercise.title, instrument: exercise.instrument, date: s.date, clean: s.clean, total: s.total });
    }
  }

  const weakest = benchmarkRows(exercises, gym.items, today)
    .filter((row) => row.reps > 0 && row.weakness > 0)
    .sort((a, b) => b.weakness - a.weakness)
    .slice(0, 3)
    .map((row) => ({ id: row.id, title: row.title, instrument: row.instrument, weakness: row.weakness, bestCleanBpm: row.bestCleanBpm, targetBpm: row.targetBpm, cleanRate: row.cleanRate, due: row.due }));

  const clean = log.filter((entry) => entry.r === 'clean').length;
  return {
    from,
    to: today,
    days,
    reps: log.length,
    clean,
    cleanRate: log.length ? Math.round((clean / log.length) * 100) : null,
    daysPracticed: new Set(log.map((entry) => entry.d)).size,
    minutes: Math.round(gym.sessions.filter((s) => s && inWindow(s.d)).reduce((sum, s) => sum + (s.minutes || 0), 0)),
    instruments,
    reviews,
    weakest,
  };
}

// One-line summary for history rows; tolerates records saved without `train`.
export function trainReportLine(report) {
  if (!report || typeof report !== 'object' || !report.reps) return null;
  const parts = [];
  for (const name of TRAIN_INSTRUMENTS) {
    const b = report.instruments?.[name];
    if (!b) continue;
    if (b.gainedBpm > 0) parts.push(`${name} +${b.gainedBpm} BPM`);
    else if (b.firstBenchmarks > 0) parts.push(`${name} ${b.firstBenchmarks} first benchmark${b.firstBenchmarks === 1 ? '' : 's'}`);
  }
  const reviewed = (report.reviews?.passed || 0) + (report.reviews?.failed || 0);
  if (reviewed) parts.push(`reviews ${report.reviews.passed}/${reviewed}`);
  return parts.length ? parts.join(' · ') : `${report.reps} technique reps`;
}
