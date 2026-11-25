// Progress sync keeps the local copy until a remote write is acknowledged.
// The built-in Redis endpoint uses If-Match for atomic conflict protection.
// Legacy workers retain the preflight check but require one active device.
import { STAGE90_KEY, normalizeStage90, writeStage90 } from './stage90';
import { clearPendingStage90Sync, readPendingStage90Sync } from './stage90IndexedDb';

const CONFIG_KEY = 'stage90-sync';
const CONFLICT_KEY = 'stage90-sync-conflict';
const PUSH_DEBOUNCE_MS = 3000;
export const STAGE90_SYNC_EVENT = 'stage90-sync-status';
let lastSyncStatus = null;
let pushTimer = null;
let activePush = null;
let generation = 0;

const syncStatus = (status, message = '') => {
  lastSyncStatus = { status, message, at: Date.now() };
  if (typeof window !== 'undefined' && typeof window.dispatchEvent === 'function') {
    window.dispatchEvent(new CustomEvent(STAGE90_SYNC_EVENT, { detail: lastSyncStatus }));
  }
};
export const getLastSyncStatus = () => lastSyncStatus;
export function getSyncConfig() {
  const defaults = { url: '', token: '', enabled: false, lastPush: null, lastPull: null };
  try {
    const raw = localStorage.getItem(CONFIG_KEY);
    const parsed = raw ? JSON.parse(raw) : null;
    if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) return {
      ...defaults, ...parsed,
      url: typeof parsed.url === 'string' ? parsed.url : '',
      token: typeof parsed.token === 'string' ? parsed.token : '',
      enabled: parsed.enabled === true,
    };
  } catch {}
  return defaults;
}
const connection = (cfg) => JSON.stringify([cfg.url, cfg.token, Boolean(cfg.enabled)]);
export function setSyncConfig(cfg) {
  const previous = getSyncConfig();
  const changed = connection(previous) !== connection(cfg);
  if (changed) {
    generation += 1;
    clearTimeout(pushTimer);
    cfg = { ...cfg, remoteSignature: null, syncedLocalSignature: null, hasConflict: false, lastPush: null, lastPull: null };
  }
  try { localStorage.setItem(CONFIG_KEY, JSON.stringify(cfg)); } catch {}
  if (changed) syncStatus(cfg.enabled ? 'ready' : 'local', cfg.enabled ? 'Cloud sync is ready to check.' : 'Progress is saved on this device.');
}
export function generateToken() {
  const bytes = new Uint8Array(24);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('');
}
const endpoint = (cfg) => `${cfg.url.replace(/\/+$/, '')}/sync/${cfg.token}`;
const isConfigured = (cfg) => Boolean(cfg?.enabled && /^https?:\/\//.test(cfg.url || '') && /^[A-Za-z0-9_-]{32,128}$/.test(cfg.token || ''));
export const isSyncConfigured = () => isConfigured(getSyncConfig());
const signature = (state) => state ? JSON.stringify([state._deviceId, state._revision, state._updatedAt]) : null;
const validRemote = (state) => state === null || Boolean(state && typeof state === 'object' && !Array.isArray(state)
  && ('startDate' in state || 'gym' in state || 'dead90' in state));
const content = (state) => {
  const { _deviceId, _revision, _updatedAt, ...rest } = normalizeStage90(state);
  return JSON.stringify(rest);
};
const meaningful = (state) => Boolean(state && (state.startDate || state.gym?.log?.length || state.program?.completed?.length || Object.keys(state.assessments || {}).length || state.set?.length || state.setruns?.length || state.jams?.length || state.dead90?.completed?.length || Object.keys(state.dead90?.notes || {}).length || Object.keys(state.dead90?.blocks || {}).length));
const unsent = (local, cfg) => meaningful(local) && (cfg.syncedLocalSignature
  ? signature(local) !== cfg.syncedLocalSignature
  : !cfg.lastPush || local._updatedAt > cfg.lastPush);
export function getSyncConflict() {
  try { return JSON.parse(localStorage.getItem(CONFLICT_KEY) || 'null'); } catch { return null; }
}
function saveConflict(local, remote) {
  const current = localStorage.getItem(STAGE90_KEY);
  if (current) local = JSON.parse(current);
  const raw = JSON.stringify({ local, remote, at: Date.now() });
  localStorage.setItem(CONFLICT_KEY, raw);
  if (localStorage.getItem(CONFLICT_KEY) !== raw) throw new Error('conflict backup failed');
}
function conflict(local, remote) {
  try { saveConflict(local, remote); } catch {
    syncStatus('error', 'Copies differ and a recovery backup could not be saved. Neither copy was replaced.');
    return 'error';
  }
  setSyncConfig({ ...getSyncConfig(), hasConflict: true });
  syncStatus('conflict', 'This device and the cloud have different progress. Both copies are retained. Choose a copy in Cloud Sync.');
  return 'conflict';
}

async function performPush({ timeoutMs = 10000, force = false } = {}) {
  const cfg = getSyncConfig();
  if (!isConfigured(cfg)) return { ok: false, reason: 'not configured' };
  const raw = localStorage.getItem(STAGE90_KEY);
  if (!raw) {
    syncStatus('local', 'There is no progress to upload yet.');
    return { ok: false, reason: 'nothing to push' };
  }
  const started = generation;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  syncStatus('syncing');
  try {
    let local = JSON.parse(raw);
    if (!local._updatedAt) {
      const saved = writeStage90(local);
      if (!saved.ok) throw new Error('local storage');
      local = saved.state;
    }
    const sentRaw = JSON.stringify(local);
    const check = await fetch(endpoint(cfg), { cache: 'no-store', signal: controller.signal });
    if (started !== generation) return { ok: false, reason: 'configuration changed' };
    if (!check.ok) {
      syncStatus('error', check.status === 503 ? 'Cloud storage is unavailable or not connected yet. Your local copy is retained.' : `Cloud sync returned ${check.status}. Your local copy is retained.`);
      return { ok: false, reason: `server ${check.status}` };
    }
    const remote = await check.json();
    if (started !== generation) return { ok: false, reason: 'configuration changed' };
    if (!validRemote(remote)) throw new Error('invalid cloud data');
    const same = remote && content(local) === content(remote);
    if (!same && remote && signature(remote) !== cfg.remoteSignature && !force) {
      return { ok: false, reason: conflict(local, remote) };
    }
    if (!same) {
      if (force && remote) saveConflict(local, remote);
      const etag = check.headers?.get('ETag');
      const res = await fetch(endpoint(cfg), {
        method: 'PUT', signal: controller.signal,
        headers: { 'Content-Type': 'application/json', ...(etag ? { 'If-Match': etag } : {}) },
        body: sentRaw,
      });
      if (started !== generation) return { ok: false, reason: 'configuration changed' };
      if (res.status === 409 || res.status === 412) {
        // A writer raced the preflight. Capture the actual current cloud copy,
        // not the snapshot that was already stale when the upload was rejected.
        const latest = await fetch(endpoint(cfg), { cache: 'no-store', signal: controller.signal });
        if (!latest.ok) throw new Error('conflict refresh failed');
        const currentRemote = await latest.json();
        if (started !== generation) return { ok: false, reason: 'configuration changed' };
        if (!validRemote(currentRemote)) throw new Error('invalid cloud data');
        return { ok: false, reason: conflict(local, currentRemote) };
      }
      if (!res.ok) {
        syncStatus('error', `Cloud sync returned ${res.status}. Your local copy is retained.`);
        return { ok: false, reason: `server ${res.status}` };
      }
    }
    setSyncConfig({ ...getSyncConfig(), lastPush: Date.now(), remoteSignature: signature(same ? remote : local), syncedLocalSignature: signature(local), hasConflict: false });
    // IndexedDB is an optional outbox; its failure does not undo a confirmed
    // remote write, and the localStorage progress copy remains available.
    await clearPendingStage90Sync(local._revision || null).catch(() => {});
    if (started !== generation) return { ok: false, reason: 'configuration changed' };
    if (localStorage.getItem(STAGE90_KEY) !== sentRaw) {
      syncStatus('pending', 'Your latest changes are saved here and waiting to upload.');
      schedulePush();
    } else {
      syncStatus('synced', check.headers?.get('ETag') ? 'Progress uploaded with conflict protection.' : 'Progress uploaded. This older sync service supports one active device at a time.');
    }
    return { ok: true };
  } catch (error) {
    if (started !== generation) return { ok: false, reason: 'configuration changed' };
    const timedOut = error?.name === 'AbortError';
    syncStatus(timedOut ? 'timeout' : 'error', timedOut
      ? 'Cloud upload timed out. Local progress is retained; reconnect or change progress to retry.'
      : 'Cloud sync is unavailable. Your local copy is retained; reconnect or change progress to retry.');
    return { ok: false, reason: timedOut ? 'timeout' : 'network' };
  } finally { clearTimeout(timeout); }
}
export function pushNow(options = {}) {
  if (activePush) return activePush;
  activePush = performPush(options).finally(() => { activePush = null; });
  return activePush;
}
export function schedulePush() {
  if (!isConfigured(getSyncConfig())) return;
  clearTimeout(pushTimer);
  syncStatus('pending', 'Saved on this device; waiting to upload.');
  pushTimer = setTimeout(() => { pushTimer = null; pushNow(); }, PUSH_DEBOUNCE_MS);
}

export async function pullNow({ force = false, timeoutMs = 10000 } = {}) {
  const cfg = getSyncConfig();
  if (!isConfigured(cfg)) return 'off';
  const started = generation;
  const localRaw = localStorage.getItem(STAGE90_KEY);
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  syncStatus('pulling');
  try {
    const res = await fetch(endpoint(cfg), { cache: 'no-store', signal: controller.signal });
    if (started !== generation) return 'off';
    if (!res.ok) {
      syncStatus('error', res.status === 503 ? 'Cloud storage is unavailable or not connected yet. Using local progress.' : `Cloud restore returned ${res.status}. Using local progress.`);
      return 'error';
    }
    const remote = await res.json();
    if (started !== generation) return 'off';
    if (localStorage.getItem(STAGE90_KEY) !== localRaw) {
      syncStatus('pending', 'Progress changed while checking the cloud. Your current local copy is retained.');
      return 'local-changed';
    }
    if (remote === null) {
      setSyncConfig({ ...getSyncConfig(), remoteSignature: null });
      syncStatus('empty');
      return 'empty';
    }
    if (!validRemote(remote)) throw new Error('invalid cloud data');
    const local = localRaw ? JSON.parse(localRaw) : null;
    if (local && content(local) === content(remote)) {
      setSyncConfig({ ...getSyncConfig(), lastPull: Date.now(), remoteSignature: signature(remote), syncedLocalSignature: signature(local), hasConflict: false });
      syncStatus('synced', 'This device matches the cloud copy.');
      return 'current';
    }
    if (!force && unsent(local, cfg)) {
      if (remote._updatedAt <= local._updatedAt || signature(remote) === cfg.remoteSignature) {
        syncStatus('pending', 'Newer local progress is waiting to upload.');
        return 'local-newer';
      }
      return conflict(local, remote);
    }
    if (!force && !cfg.remoteSignature && local?._updatedAt && remote._updatedAt && remote._updatedAt <= local._updatedAt) {
      syncStatus('pending', 'Local progress is waiting to upload.');
      return 'local-newer';
    }
    if (force && meaningful(local)) saveConflict(local, remote);
    const saved = writeStage90(remote, { source: 'cloud', preserveMetadata: true });
    if (!saved.ok) {
      syncStatus('error', 'Cloud progress arrived but could not be saved locally.');
      return 'error';
    }
    setSyncConfig({ ...getSyncConfig(), lastPull: Date.now(), remoteSignature: signature(remote), syncedLocalSignature: signature(saved.state), hasConflict: false });
    syncStatus('restored');
    return 'applied';
  } catch (error) {
    if (started !== generation) return 'off';
    const result = error?.name === 'AbortError' ? 'timeout' : 'error';
    syncStatus(result, result === 'timeout' ? 'Cloud restore timed out. Using local progress.' : 'Cloud restore failed. Using local progress.');
    return result;
  } finally { clearTimeout(timeout); }
}
export async function pullOnStartup(timeoutMs = 2500) {
  return pullNow({ timeoutMs });
}
export async function retryPendingPush() {
  if (!isConfigured(getSyncConfig())) return { ok: false, reason: 'not configured' };
  const pending = await readPendingStage90Sync().catch(() => null);
  if (!pending) return { ok: true, reason: 'nothing pending' };
  return pushNow();
}
