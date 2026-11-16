// Practice engine — the rules behind the Train tab. Pure functions, no I/O.
//
// Three ideas, each chosen because it is what actually moves technique:
//   1. Tempo ladder (progressive overload): the metronome only climbs after N
//      clean passes in a row, and drops after two misses. The rung you are on
//      is always a tempo you can really play.
//   2. Benchmarks: best clean BPM per exercise against a target, so progress
//      is a number that goes up, not a feeling.
//   3. Spaced review: finished exercises come back on a widening schedule, and
//      weak ones come back sooner, so gains are kept instead of re-learned.
//
// State lives under `gym` in the Stage Ready blob, so it rides the existing
// local persistence, export/import, and cloud sync.

export const GYM_LOG_LIMIT = 1500;
export const GYM_SESSION_LIMIT = 400;
export const MINUTES_PER_ITEM = 5;
export const RESULTS = ['clean', 'shaky', 'miss'];

const MISSES_TO_DROP = 2;
const MIN_EASE = 1.3;
const MAX_EASE = 2.8;
const DEFAULT_EASE = 2.2;

export const emptyGym = () => ({ instrument: 'both', minutes: 30, items: {}, log: [], sessions: [] });

export function normalizeGym(value) {
  const g = value && typeof value === 'object' ? value : {};
  return {
    instrument: ['electric', 'acoustic', 'both'].includes(g.instrument) ? g.instrument : 'both',
    minutes: [15, 30, 45, 60].includes(g.minutes) ? g.minutes : 30,
    items: g.items && typeof g.items === 'object' ? g.items : {},
    log: Array.isArray(g.log) ? g.log.slice(-GYM_LOG_LIMIT) : [],
    sessions: Array.isArray(g.sessions) ? g.sessions.slice(-GYM_SESSION_LIMIT) : [],
  };
}

// --- dates -------------------------------------------------------------------

// Local-calendar day key. (toISOString would roll to tomorrow in the evening
// for US time zones, which breaks "due today".)
export function localDateKey(date = new Date()) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export function addDaysKey(key, n) {
  const [y, m, d] = key.split('-').map(Number);
  return localDateKey(new Date(y, m - 1, d + n));
}

export function daysBetweenKeys(from, to) {
  const parse = (k) => { const [y, m, d] = k.split('-').map(Number); return Date.UTC(y, m - 1, d); };
  return Math.round((parse(to) - parse(from)) / 86400000);
}

// --- catalog -----------------------------------------------------------------

// Flatten courses → one ordered list of exercises with their place in the tree.
export function flattenExercises(curriculum) {
  const out = [];
  for (const course of curriculum.courses) {
    for (const module of course.modules) {
      let indexInModule = 0;
      for (const lesson of module.lessons) {
        for (const exercise of lesson.exercises) {
          out.push({
            ...exercise,
            courseId: course.id,
            courseTitle: course.title,
            instrument: course.instrument || 'both',
            moduleId: module.id,
            moduleTitle: module.title,
            lessonId: lesson.id,
            lessonTitle: lesson.title,
            indexInModule,
            order: out.length,
          });
          indexInModule += 1;
        }
      }
    }
  }
  return out;
}

export const hasLadder = (exercise) => Boolean(exercise.tempo?.startBpm && exercise.tempo?.targetBpm);
export const targetBpm = (exercise) => exercise.mastery?.minimumBpm || exercise.tempo?.targetBpm || null;
export const repsToClimb = (exercise) => Math.max(1, exercise.mastery?.cleanRepetitions || 3);

export function newItem(exercise) {
  return {
    bpm: exercise.tempo?.startBpm || null,
    bestCleanBpm: null,
    cleanStreak: 0,
    missStreak: 0,
    reps: 0,
    cleanReps: 0,
    ease: DEFAULT_EASE,
    intervalDays: 0,
    dueDate: null,
    lastPracticed: null,
    masteredAt: null,
    history: [], // [[dateKey, bestCleanBpm that day]]
  };
}

// --- 1. tempo ladder ---------------------------------------------------------

// Record one repetition and return the updated item plus what happened.
//   result: 'clean' | 'shaky' | 'miss'
//   event:  'climbed' | 'dropped' | 'mastered' | 'held'
export function recordRep(itemIn, exercise, result, today = localDateKey()) {
  if (!RESULTS.includes(result)) throw new Error(`Unknown result "${result}"`);
  const item = { ...newItem(exercise), ...itemIn, history: [...(itemIn?.history || [])] };
  const ladder = hasLadder(exercise);
  const step = exercise.tempo?.stepBpm || 4;
  const target = targetBpm(exercise);
  const floor = ladder ? Math.max(30, exercise.tempo.startBpm - 3 * step) : null;
  let event = 'held';

  item.reps += 1;
  item.lastPracticed = today;

  if (result === 'clean') {
    item.cleanReps += 1;
    item.cleanStreak += 1;
    item.missStreak = 0;
    if (item.cleanStreak >= repsToClimb(exercise)) {
      item.cleanStreak = 0;
      if (ladder) {
        const played = item.bpm;
        item.bestCleanBpm = Math.max(item.bestCleanBpm || 0, played);
        const last = item.history.at(-1);
        if (last && last[0] === today) last[1] = Math.max(last[1], played);
        else item.history.push([today, played]);
        if (played >= target) {
          if (!item.masteredAt) { item.masteredAt = today; event = 'mastered'; }
        } else {
          item.bpm = Math.min(target, played + step);
          event = 'climbed';
        }
      } else if (!item.masteredAt) {
        item.masteredAt = today;
        event = 'mastered';
      }
    }
  } else if (result === 'shaky') {
    // Not a failure, but it breaks the streak: "clean" has to mean clean.
    item.cleanStreak = 0;
  } else {
    item.cleanStreak = 0;
    item.missStreak += 1;
    if (ladder && item.missStreak >= MISSES_TO_DROP) {
      item.missStreak = 0;
      const lower = Math.max(floor, item.bpm - step);
      if (lower < item.bpm) { item.bpm = lower; event = 'dropped'; }
    }
  }
  return { item, event };
}

// --- 3. spaced review --------------------------------------------------------

// Call once when the player leaves an exercise for the day.
//   bout: { clean, total } repetitions in this sitting.
// Un-mastered work stays on a short leash (it is the day-to-day ladder work);
// mastered work spaces out 3 → 7 → 15 → 33 … days while it stays clean.
export function scheduleReview(itemIn, exercise, bout, today = localDateKey()) {
  const item = { ...newItem(exercise), ...itemIn };
  const total = Math.max(0, bout?.total || 0);
  if (!total) return item;
  const ratio = (bout.clean || 0) / total;
  const mastered = Boolean(item.masteredAt);
  let interval = item.intervalDays || 0;
  let ease = item.ease || DEFAULT_EASE;

  if (ratio >= 0.75) {
    ease = Math.min(MAX_EASE, ease + 0.1);
    if (!mastered) interval = interval >= 1 ? 2 : 1;
    else interval = interval < 3 ? 3 : Math.round(interval * ease);
  } else if (ratio >= 0.4) {
    interval = mastered ? Math.max(2, Math.round(interval * 0.5)) : 1;
  } else {
    ease = Math.max(MIN_EASE, ease - 0.2);
    interval = 1;
  }
  interval = Math.min(interval, 120);
  return { ...item, ease: Math.round(ease * 100) / 100, intervalDays: interval, dueDate: addDaysKey(today, interval) };
}

export function isDue(item, today = localDateKey()) {
  return Boolean(item?.dueDate) && daysBetweenKeys(item.dueDate, today) >= 0;
}

// 0 = at target and reliable … higher = needs work sooner.
export function weakness(item, exercise, today = localDateKey()) {
  if (!item || !item.reps) return 0;
  const target = targetBpm(exercise);
  const start = exercise.tempo?.startBpm || 0;
  const gap = target && target > start
    ? 1 - Math.max(0, Math.min(1, ((item.bestCleanBpm || start) - start) / (target - start)))
    : (item.masteredAt ? 0 : 1);
  const unreliable = 1 - item.cleanReps / item.reps;
  const overdue = item.dueDate ? Math.max(0, daysBetweenKeys(item.dueDate, today)) : 0;
  return Math.round((gap + unreliable + Math.min(overdue, 14) / 7) * 100) / 100;
}

// --- session builder ---------------------------------------------------------

const matchesInstrument = (exercise, instrument) =>
  instrument === 'both' || exercise.instrument === 'both' || exercise.instrument === instrument;

// An exercise unlocks once the one before it in its module has been practiced.
function isUnlocked(exercise, all, items) {
  if (exercise.indexInModule === 0) return true;
  const prev = all.find((e) => e.moduleId === exercise.moduleId && e.courseId === exercise.courseId && e.indexInModule === exercise.indexInModule - 1);
  return Boolean(prev && items[prev.id]?.reps > 0);
}

// Interleave so "both" gives each instrument a fair share instead of one
// course swallowing the session.
function balance(list) {
  const byInstrument = new Map();
  for (const entry of list) {
    const key = entry.exercise.instrument;
    if (!byInstrument.has(key)) byInstrument.set(key, []);
    byInstrument.get(key).push(entry);
  }
  const queues = [...byInstrument.values()];
  const out = [];
  while (queues.some((q) => q.length)) for (const q of queues) if (q.length) out.push(q.shift());
  return out;
}

// Build today's queue. Every entry says WHY it is there.
//   kind: 'review' (mastered, due) | 'ladder' (in progress) | 'new'
export function buildSession({ exercises, items = {}, instrument = 'both', minutes = 30, today = localDateKey() }) {
  const slots = Math.max(1, Math.floor(minutes / MINUTES_PER_ITEM));
  const pool = exercises.filter((e) => matchesInstrument(e, instrument));

  const reviews = [];
  const ladders = [];
  const fresh = [];
  for (const exercise of pool) {
    const item = items[exercise.id];
    if (!item || !item.reps) {
      if (isUnlocked(exercise, exercises, items)) fresh.push({ exercise, kind: 'new' });
      continue;
    }
    const score = weakness(item, exercise, today);
    if (item.masteredAt) {
      if (isDue(item, today)) reviews.push({ exercise, kind: 'review', score });
    } else {
      ladders.push({ exercise, kind: 'ladder', score, due: !item.dueDate || isDue(item, today) });
    }
  }

  reviews.sort((a, b) => b.score - a.score);
  // Due ladder work first, then weakest first.
  ladders.sort((a, b) => Number(b.due) - Number(a.due) || b.score - a.score);
  fresh.sort((a, b) => a.exercise.indexInModule - b.exercise.indexInModule || a.exercise.order - b.exercise.order);

  const reviewQ = balance(reviews);
  const ladderQ = balance(ladders);
  const freshQ = balance(fresh);

  // Reviews are cheap and protect old gains: up to a third of the session.
  // In-progress ladders get the bulk. New material is capped so it cannot
  // crowd out consolidation — two new things a day is plenty.
  const picked = [];
  const take = (queue, n) => { while (n-- > 0 && queue.length && picked.length < slots) picked.push(queue.shift()); };
  take(reviewQ, Math.max(1, Math.floor(slots / 3)));
  const newCap = ladderQ.length >= slots ? 1 : 2;
  // Work already in progress always keeps at least one slot: in a short session
  // (Today's 10–15 minute technique block) new material must not starve it.
  take(ladderQ, Math.max(ladderQ.length ? 1 : 0, slots - picked.length - Math.min(newCap, freshQ.length)));
  take(freshQ, newCap);
  // Fill any slack from whatever is left, most useful first.
  take(ladderQ, slots);
  take(reviewQ, slots);
  take(freshQ, slots);

  return picked.map(({ exercise, kind, score }) => {
    const item = items[exercise.id];
    const target = targetBpm(exercise);
    let reason;
    if (kind === 'new') {
      reason = exercise.indexInModule === 0
        ? `New: first step in ${exercise.moduleTitle}.`
        : `New: unlocked by the previous ${exercise.moduleTitle} exercise.`;
    } else if (kind === 'review') {
      const late = daysBetweenKeys(item.dueDate, today);
      reason = late > 0 ? `Review, ${late} day${late === 1 ? '' : 's'} overdue: keep what you earned.` : 'Review due today: keep what you earned.';
    } else if (hasLadder(exercise)) {
      const best = item.bestCleanBpm;
      reason = best
        ? `Ladder: best clean ${best} BPM, target ${target}. Today starts at ${item.bpm}.`
        : `Ladder: not clean at ${item.bpm} BPM yet. Target ${target}.`;
    } else {
      reason = `In progress: ${item.cleanReps} clean of ${item.reps} reps so far.`;
    }
    return {
      exercise,
      kind,
      reason,
      weakness: score ?? 0,
      minutes: MINUTES_PER_ITEM,
      bpm: item?.bpm || exercise.tempo?.startBpm || null,
    };
  });
}

// --- 2. benchmarks -----------------------------------------------------------

// 0–1 progress toward the target tempo (or mastery, for exercises with no tempo).
export function progressOf(item, exercise) {
  if (!item || !item.reps) return 0;
  if (item.masteredAt) return 1;
  if (!hasLadder(exercise)) return Math.min(0.9, item.cleanReps / (repsToClimb(exercise) * 2));
  const start = exercise.tempo.startBpm;
  const target = targetBpm(exercise);
  // Starting rung counts for something: clean at the start tempo is real progress.
  const floor = start - (exercise.tempo.stepBpm || 4);
  if (!item.bestCleanBpm) return 0.02;
  return Math.max(0.02, Math.min(0.99, (item.bestCleanBpm - floor) / (target - floor)));
}

export function benchmarkRows(exercises, items = {}, today = localDateKey()) {
  return exercises.map((exercise) => {
    const item = items[exercise.id] || null;
    return {
      id: exercise.id,
      title: exercise.title,
      instrument: exercise.instrument,
      moduleId: exercise.moduleId,
      moduleTitle: exercise.moduleTitle,
      startBpm: exercise.tempo?.startBpm || null,
      targetBpm: targetBpm(exercise),
      currentBpm: item?.bpm || null,
      bestCleanBpm: item?.bestCleanBpm || null,
      reps: item?.reps || 0,
      cleanRate: item?.reps ? Math.round((item.cleanReps / item.reps) * 100) : null,
      progress: progressOf(item, exercise),
      mastered: Boolean(item?.masteredAt),
      due: isDue(item, today),
      dueDate: item?.dueDate || null,
      lastPracticed: item?.lastPracticed || null,
      history: item?.history || [],
      weakness: weakness(item, exercise, today),
    };
  });
}

// Roll rows up per module, for the dashboard bars.
export function moduleSummaries(rows) {
  const map = new Map();
  for (const row of rows) {
    const key = `${row.instrument}:${row.moduleId}`;
    if (!map.has(key)) map.set(key, { key, instrument: row.instrument, moduleId: row.moduleId, title: row.moduleTitle, total: 0, started: 0, mastered: 0, progressSum: 0 });
    const m = map.get(key);
    m.total += 1;
    if (row.reps) m.started += 1;
    if (row.mastered) m.mastered += 1;
    m.progressSum += row.progress;
  }
  return [...map.values()].map((m) => ({ ...m, progress: m.total ? m.progressSum / m.total : 0 }));
}

export function instrumentSummary(rows, instrument) {
  const mine = rows.filter((r) => r.instrument === instrument);
  const total = mine.length;
  return {
    instrument,
    total,
    started: mine.filter((r) => r.reps).length,
    mastered: mine.filter((r) => r.mastered).length,
    due: mine.filter((r) => r.due).length,
    progress: total ? mine.reduce((sum, r) => sum + r.progress, 0) / total : 0,
  };
}

// Practice minutes and clean rate per day for the last `days` days (oldest first).
export function dailyActivity(gym, days = 28, today = localDateKey()) {
  const out = [];
  for (let i = days - 1; i >= 0; i--) {
    const key = addDaysKey(today, -i);
    const reps = gym.log.filter((entry) => entry.d === key);
    const minutes = gym.sessions.filter((s) => s.d === key).reduce((sum, s) => sum + (s.minutes || 0), 0);
    out.push({
      date: key,
      reps: reps.length,
      clean: reps.filter((entry) => entry.r === 'clean').length,
      minutes: Math.round(minutes),
    });
  }
  return out;
}

export function streakDays(gym, today = localDateKey()) {
  const days = new Set(gym.log.map((entry) => entry.d));
  let n = 0;
  let cursor = days.has(today) ? today : addDaysKey(today, -1);
  while (days.has(cursor)) { n += 1; cursor = addDaysKey(cursor, -1); }
  return n;
}

// --- state transitions (gym in → gym out) -----------------------------------

export function applyRep(gymIn, exercise, result, { today = localDateKey(), at = Date.now(), measured } = {}) {
  const gym = normalizeGym(gymIn);
  const bpmPlayed = gym.items[exercise.id]?.bpm ?? exercise.tempo?.startBpm ?? null;
  const { item, event } = recordRep(gym.items[exercise.id], exercise, result, today);
  const entry = { d: today, t: at, id: exercise.id, bpm: bpmPlayed, r: result };
  if (measured && typeof measured === 'object') entry.m = measured;
  return {
    gym: { ...gym, items: { ...gym.items, [exercise.id]: item }, log: [...gym.log, entry].slice(-GYM_LOG_LIMIT) },
    event,
    item,
  };
}

export function applyBoutEnd(gymIn, exercise, bout, today = localDateKey()) {
  const gym = normalizeGym(gymIn);
  if (!bout?.total || !gym.items[exercise.id]) return gym;
  return { ...gym, items: { ...gym.items, [exercise.id]: scheduleReview(gym.items[exercise.id], exercise, bout, today) } };
}

export function applySessionEnd(gymIn, summary, today = localDateKey()) {
  const gym = normalizeGym(gymIn);
  if (!summary?.total) return gym;
  const session = {
    d: today,
    t: summary.at || Date.now(),
    minutes: Math.round((summary.minutes || 0) * 10) / 10,
    items: summary.items || 0,
    clean: summary.clean || 0,
    total: summary.total,
    instrument: summary.instrument || gym.instrument,
  };
  return { ...gym, sessions: [...gym.sessions, session].slice(-GYM_SESSION_LIMIT) };
}
