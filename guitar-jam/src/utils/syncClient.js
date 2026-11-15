// Cloud sync for the stage90 blob — talks to the sync-worker (Cloudflare
// Worker + KV). Config lives in its own localStorage key so it never rides
// along in the synced blob itself. Model: push after every save (debounced),
// pull once at app startup; last write wins.

import { STAGE90_KEY, writeStage90 } from './stage90';
import { clearPendingStage90Sync, readPendingStage90Sync } from './stage90IndexedDb';

const CONFIG_KEY = 'stage90-sync';
const PUSH_DEBOUNCE_MS = 3000;
export const STAGE90_SYNC_EVENT = 'stage90-sync-status';

let lastSyncStatus = null;

const syncStatus = (status, message = '') => {
  lastSyncStatus = { status, message, at: Date.now() };
  if (typeof window !== 'undefined' && typeof window.dispatchEvent === 'function') {
    window.dispatchEvent(new CustomEvent(STAGE90_SYNC_EVENT, { detail: lastSyncStatus }));
  }
};

export const getLastSyncStatus = () => lastSyncStatus;

export function getSyncConfig() {
  try {
    const s = localStorage.getItem(CONFIG_KEY);
    if (s) return JSON.parse(s);
  } catch {}
  return { url: '', token: '', enabled: false, lastPush: null, lastPull: null };
}

export function setSyncConfig(cfg) {
  try { localStorage.setItem(CONFIG_KEY, JSON.stringify(cfg)); } catch {}
}

export function generateToken() {
  const bytes = new Uint8Array(24);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('');
}

const endpoint = (cfg) => `${cfg.url.replace(/\/+$/, '')}/sync/${cfg.token}`;
const isConfigured = (cfg) => cfg.enabled && /^https?:\/\//.test(cfg.url) && cfg.token.length >= 32;
export const isSyncConfigured = () => isConfigured(getSyncConfig());

// --- Push -------------------------------------------------------------------

let pushTimer = null;

export async function pushNow() {
  const cfg = getSyncConfig();
  if (!isConfigured(cfg)) return { ok: false, reason: 'not configured' };
  syncStatus('syncing');
  try {
    const raw = localStorage.getItem(STAGE90_KEY);
    if (!raw) return { ok: false, reason: 'nothing to push' };
    const blob = JSON.parse(raw);
    if (!blob._updatedAt) {
      const saved = writeStage90(blob);
      if (!saved.ok) {
        syncStatus('error', 'Local progress could not be prepared for sync.');
        return { ok: false, reason: 'local storage' };
      }
      Object.assign(blob, saved.state);
    }
    const res = await fetch(endpoint(cfg), {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(blob),
    });
    if (!res.ok) {
      syncStatus('error', `Cloud sync returned ${res.status}. Your local copy is retained.`);
      return { ok: false, reason: `server ${res.status}` };
    }
    setSyncConfig({ ...getSyncConfig(), lastPush: Date.now() });
    await clearPendingStage90Sync(blob._revision || null);
    syncStatus('synced');
    return { ok: true };
  } catch {
    syncStatus('error', 'Cloud sync is unavailable. Your local copy is retained and the next change will retry.');
    return { ok: false, reason: 'network' };
  }
}

// Called from saveStage90 on every state write — cheap no-op when sync is off.
export function schedulePush() {
  if (!isConfigured(getSyncConfig())) return;
  clearTimeout(pushTimer);
  pushTimer = setTimeout(pushNow, PUSH_DEBOUNCE_MS);
}

// --- Pull -------------------------------------------------------------------

// Fetch the remote blob and apply it if it's newer than what's on this device.
// Returns 'applied' | 'local-newer' | 'empty' | 'error' | 'off'.
export async function pullNow({ force = false, timeoutMs = 10000 } = {}) {
  const cfg = getSyncConfig();
  if (!isConfigured(cfg)) return 'off';
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  syncStatus('pulling');
  try {
    const res = await fetch(endpoint(cfg), { cache: 'no-store', signal: controller.signal });
    if (!res.ok) {
      syncStatus('error', `Cloud restore returned ${res.status}. Using local progress.`);
      return 'error';
    }
    const remote = await res.json();
    if (!remote || !remote.startDate) {
      syncStatus('empty');
      return 'empty';
    }
    const localRaw = localStorage.getItem(STAGE90_KEY);
    const local = localRaw ? JSON.parse(localRaw) : null;
    if (!force && local?._updatedAt && remote._updatedAt && remote._updatedAt <= local._updatedAt) {
      syncStatus('synced', 'Local progress is current.');
      return 'local-newer';
    }
    const saved = writeStage90(remote, { source: 'cloud', preserveMetadata: true });
    if (!saved.ok) {
      syncStatus('error', 'Cloud progress arrived but could not be saved locally.');
      return 'error';
    }
    setSyncConfig({ ...getSyncConfig(), lastPull: Date.now() });
    syncStatus('restored');
    return 'applied';
  } catch (error) {
    const result = error?.name === 'AbortError' ? 'timeout' : 'error';
    syncStatus(result, result === 'timeout'
      ? 'Cloud restore timed out. Using local progress; the timed-out request was cancelled.'
      : 'Cloud restore failed. Using local progress.');
    return result;
  } finally {
    clearTimeout(timeout);
  }
}

// Startup pull with a hard timeout so a dead worker never blocks the app.
export async function pullOnStartup(timeoutMs = 2500) {
  if (!isConfigured(getSyncConfig())) return 'off';
  return pullNow({ timeoutMs });
}

export async function retryPendingPush() {
  if (!isConfigured(getSyncConfig())) return { ok: false, reason: 'not configured' };
  const pending = await readPendingStage90Sync().catch(() => null);
  if (!pending) return { ok: true, reason: 'nothing pending' };
  return pushNow();
}
