// Cloud sync for the stage90 blob — talks to the sync-worker (Cloudflare
// Worker + KV). Config lives in its own localStorage key so it never rides
// along in the synced blob itself. Model: push after every save (debounced),
// pull once at app startup; last write wins.

import { STAGE90_KEY } from './stage90';

const CONFIG_KEY = 'stage90-sync';
const PUSH_DEBOUNCE_MS = 3000;

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

// --- Push -------------------------------------------------------------------

let pushTimer = null;

export async function pushNow() {
  const cfg = getSyncConfig();
  if (!isConfigured(cfg)) return { ok: false, reason: 'not configured' };
  const raw = localStorage.getItem(STAGE90_KEY);
  if (!raw) return { ok: false, reason: 'nothing to push' };
  try {
    const blob = JSON.parse(raw);
    blob._updatedAt = Date.now();
    const res = await fetch(endpoint(cfg), {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(blob),
    });
    if (!res.ok) return { ok: false, reason: `server ${res.status}` };
    localStorage.setItem(STAGE90_KEY, JSON.stringify(blob)); // persist the timestamp we sent
    setSyncConfig({ ...getSyncConfig(), lastPush: Date.now() });
    return { ok: true };
  } catch {
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
export async function pullNow({ force = false } = {}) {
  const cfg = getSyncConfig();
  if (!isConfigured(cfg)) return 'off';
  try {
    const res = await fetch(endpoint(cfg), { cache: 'no-store' });
    if (!res.ok) return 'error';
    const remote = await res.json();
    if (!remote || !remote.startDate) return 'empty';
    const localRaw = localStorage.getItem(STAGE90_KEY);
    const local = localRaw ? JSON.parse(localRaw) : null;
    if (!force && local?._updatedAt && remote._updatedAt && remote._updatedAt <= local._updatedAt) {
      return 'local-newer';
    }
    localStorage.setItem(STAGE90_KEY, JSON.stringify(remote));
    setSyncConfig({ ...getSyncConfig(), lastPull: Date.now() });
    return 'applied';
  } catch {
    return 'error';
  }
}

// Startup pull with a hard timeout so a dead worker never blocks the app.
export async function pullOnStartup(timeoutMs = 2500) {
  if (!isConfigured(getSyncConfig())) return 'off';
  return Promise.race([
    pullNow(),
    new Promise((resolve) => setTimeout(() => resolve('timeout'), timeoutMs)),
  ]);
}
