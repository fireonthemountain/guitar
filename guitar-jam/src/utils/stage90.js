// Stage Ready 90 — program state, week math, and scoring.
// One localStorage key holds everything so export/import stays a single blob.

import { ASSESSMENT_WEEKS, GIG_TEMPO_TARGET, TEMPO_FLOOR, RATING_KEYS } from '../data/assessmentPlan';
import { initializeStage90IndexedDb, queueStage90Snapshot } from './stage90IndexedDb';
import { emptyGym, normalizeGym } from './practiceEngine';

export const STAGE90_KEY = 'stage90';
export const STAGE90_BACKUP_KEY = 'stage90-backup';
export const STAGE90_STORAGE_EVENT = 'stage90-storage-status';
export const STAGE90_SCHEMA_VERSION = 2;
export const PROGRAM_WEEKS = 13; // weeks 1–13 after the week-0 placement

const EMPTY = {
  startDate: null,
  gigDate: null,
  assessments: {},
  program: { completed: [], blocks: {}, notes: {}, activity: {} },
  set: [],      // My Set: [{id, title, chords, bpm, minutes}]
  setruns: [],  // Set Runner logs
  jams: [],     // Jam Along library
  gym: emptyGym(), // Train tab: tempo ladders, benchmarks, spaced review
};

export const emptyStage90 = () => JSON.parse(JSON.stringify(EMPTY));

export function normalizeDead90(value) {
  const state = value && typeof value === 'object' && !Array.isArray(value) ? value : {};
  return {
    completed: Array.isArray(state.completed) ? state.completed : [],
    blocks: state.blocks && typeof state.blocks === 'object' ? state.blocks : {},
    notes: state.notes && typeof state.notes === 'object' ? state.notes : {},
    activity: state.activity && typeof state.activity === 'object' ? state.activity : {},
  };
}

const storageStatus = (detail) => {
  if (typeof window !== 'undefined' && typeof window.dispatchEvent === 'function') {
    window.dispatchEvent(new CustomEvent(STAGE90_STORAGE_EVENT, { detail }));
  }
};

export function normalizeStage90(value) {
  const parsed = value && typeof value === 'object' ? value : {};
  const program = parsed.program && typeof parsed.program === 'object' ? parsed.program : {};
  return {
    ...EMPTY,
    ...parsed,
    _schemaVersion: STAGE90_SCHEMA_VERSION,
    assessments: parsed.assessments && typeof parsed.assessments === 'object' ? parsed.assessments : {},
    program: {
      ...EMPTY.program,
      ...program,
      completed: Array.isArray(program.completed) ? program.completed : [],
      blocks: program.blocks && typeof program.blocks === 'object' ? program.blocks : {},
      notes: program.notes && typeof program.notes === 'object' ? program.notes : {},
      activity: program.activity && typeof program.activity === 'object' ? program.activity : {},
    },
    set: Array.isArray(parsed.set) ? parsed.set : [],
    setruns: Array.isArray(parsed.setruns) ? parsed.setruns : [],
    jams: Array.isArray(parsed.jams) ? parsed.jams : [],
    gym: normalizeGym(parsed.gym),
  };
}

function parseStored(raw) {
  if (!raw) return null;
  return normalizeStage90(JSON.parse(raw));
}

function comparable(state) {
  const { _updatedAt, _revision, _deviceId, ...content } = normalizeStage90(state);
  return JSON.stringify(content);
}

export function getDeviceId() {
  const key = 'stage90-device-id';
  try {
    const existing = localStorage.getItem(key);
    if (existing) return existing;
    const id = globalThis.crypto?.randomUUID?.() || `device-${Date.now()}-${Math.random().toString(36).slice(2)}`;
    localStorage.setItem(key, id);
    return id;
  } catch {
    return 'device-unavailable';
  }
}

export function writeStage90(state, { source = 'local', preserveMetadata = false, mirrorToIndexedDb = true } = {}) {
  let current = null;
  let normalized = normalizeStage90(state);
  try {
    const currentRaw = localStorage.getItem(STAGE90_KEY);
    let currentSource = null;
    try {
      currentSource = currentRaw ? JSON.parse(currentRaw) : null;
      current = currentSource ? normalizeStage90(currentSource) : null;
    } catch {
      currentSource = null;
    }
    const isCurrentSchema = currentSource?._schemaVersion === STAGE90_SCHEMA_VERSION;
    const hasMetadata = Number.isFinite(currentSource?._updatedAt) && Number.isInteger(currentSource?._revision);

    if (source === 'local' && current && isCurrentSchema && hasMetadata && comparable(current) === comparable(normalized)) {
      return { ok: true, changed: false, state: current };
    }

    const next = {
      ...normalized,
      _updatedAt: preserveMetadata && Number.isFinite(normalized._updatedAt) ? normalized._updatedAt : Date.now(),
      _revision: preserveMetadata && Number.isInteger(normalized._revision)
        ? normalized._revision
        : (current?._revision || 0) + 1,
      _deviceId: preserveMetadata && normalized._deviceId ? normalized._deviceId : getDeviceId(),
    };
    const nextRaw = JSON.stringify(next);

    if (currentRaw && source !== 'recovery') localStorage.setItem(STAGE90_BACKUP_KEY, currentRaw);
    localStorage.setItem(STAGE90_KEY, nextRaw);
    if (localStorage.getItem(STAGE90_KEY) !== nextRaw) throw new Error('storage verification failed');
    if (mirrorToIndexedDb) {
      queueStage90Snapshot(next, { pending: source === 'local' }).catch((error) => {
        storageStatus({ status: 'error', at: Date.now(), message: error?.message || 'IndexedDB write failed' });
      });
    }
    storageStatus({ status: source === 'cloud' ? 'restored' : 'saved', at: Date.now() });
    return { ok: true, changed: true, state: next };
  } catch (error) {
    storageStatus({ status: 'error', at: Date.now(), message: error?.message || 'storage write failed' });
    return { ok: false, changed: false, state: current || normalized, error };
  }
}

export function loadStage90() {
  let primaryFailed = false;
  try {
    const primary = parseStored(localStorage.getItem(STAGE90_KEY));
    if (primary) return primary;
  } catch {
    primaryFailed = true;
  }
  try {
    const backup = parseStored(localStorage.getItem(STAGE90_BACKUP_KEY));
    if (backup) {
      const restored = writeStage90(backup, { source: 'recovery', preserveMetadata: true });
      if (restored.ok) storageStatus({ status: 'recovered', at: Date.now() });
      return restored.state;
    }
  } catch {
    primaryFailed = true;
  }
  if (primaryFailed) storageStatus({ status: 'error', at: Date.now(), message: 'primary and backup progress are unreadable' });
  return normalizeStage90(EMPTY);
}

export function saveStage90(state) {
  const result = writeStage90(state);
  if (!result.ok || !result.changed) return result;
  // Lazy import avoids a cycle (syncClient imports STAGE90_KEY from here).
  import('./syncClient').then((m) => m.schedulePush()).catch(() => {});
  return result;
}

export async function initializeStage90Storage() {
  const local = loadStage90();
  const result = await initializeStage90IndexedDb(
    local,
    (indexedState) => writeStage90(indexedState, {
      source: 'recovery',
      preserveMetadata: true,
      mirrorToIndexedDb: false,
    }),
  );
  if (result.status === 'restored-indexeddb') {
    storageStatus({ status: 'recovered', at: Date.now(), message: 'Recovered progress from the local IndexedDB copy.' });
  } else if (result.status === 'unavailable') {
    storageStatus({ status: 'error', at: Date.now(), message: 'IndexedDB is unavailable; using the compatibility localStorage copy.' });
  }
  // Recover the main store first, then migrate the separate legacy course.
  // Keep its original key intact until the user has verified the new copy.
  try {
    const current = loadStage90();
    const legacy = localStorage.getItem('dead90');
    if (!current.dead90 && legacy) {
      const parsed = JSON.parse(legacy);
      if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) throw new Error('invalid legacy course');
      writeStage90({ ...current, dead90: normalizeDead90(parsed) });
    }
  } catch {
    storageStatus({ status: 'error', at: Date.now(), message: 'The older Dead 90 copy could not be imported; its original copy is retained.' });
  }
  return result;
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
