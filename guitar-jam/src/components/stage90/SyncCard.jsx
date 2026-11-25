import { useEffect, useState } from 'react';
import { getLastSyncStatus, getSyncConfig, getSyncConflict, setSyncConfig, generateToken, pushNow, pullNow, STAGE90_SYNC_EVENT } from '../../utils/syncClient';

const ago = (t) => {
  if (!t) return 'never';
  const m = Math.round((Date.now() - t) / 60000);
  return m < 1 ? 'just now' : m < 60 ? `${m} min ago` : `${Math.round(m / 60)} h ago`;
};

// Cloud sync settings — pairs with sync-worker/ (Cloudflare Worker + KV).
export default function SyncCard() {
  const [cfg, setCfg] = useState(getSyncConfig);
  const [status, setStatus] = useState('');
  const [busy, setBusy] = useState(false);
  const recoveryCopies = getSyncConflict();

  const save = (next) => { setSyncConfig(next); setCfg(getSyncConfig()); };
  useEffect(() => {
    const changed = (event) => { setCfg(getSyncConfig()); setStatus(event.detail?.message || ''); };
    window.addEventListener(STAGE90_SYNC_EVENT, changed);
    return () => window.removeEventListener(STAGE90_SYNC_EVENT, changed);
  }, []);

  const downloadCopy = (which) => {
    const copy = getSyncConflict()?.[which];
    if (!copy) return;
    const url = URL.createObjectURL(new Blob([JSON.stringify(copy, null, 2)], { type: 'application/json' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = `guitar-progress-${which}.json`;
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  const doPush = async (force = false) => {
    if (force && !confirm('Use this device’s progress for the cloud copy? Both copies are backed up in this browser. Download them first if you want an additional recovery copy.')) return;
    setBusy(true);
    try {
      const r = await pushNow({ force });
      setStatus(getLastSyncStatus()?.message || (r.ok ? 'Progress uploaded.' : `Upload failed: ${r.reason}`));
    } catch { setStatus('Unable to upload. Your local copy is retained.'); }
    finally { setBusy(false); setCfg(getSyncConfig()); }
  };

  const doPull = async () => {
    if (!confirm('Use the cloud copy on this device? It replaces this device’s progress. Both copies will be backed up in this browser first.')) return;
    setBusy(true);
    try {
      const r = await pullNow({ force: true });
      if (r === 'applied') { window.location.reload(); return; }
      setStatus(r === 'empty' ? 'Cloud is empty — upload from your main device first.' : getLastSyncStatus()?.message || `Cloud check: ${r}`);
    } catch { setStatus('Unable to restore. Your local copy is retained.'); }
    finally { setBusy(false); setCfg(getSyncConfig()); }
  };

  const ready = /^https?:\/\//.test(cfg.url) && cfg.token.length >= 32;

  return (
    <div className="bg-gray-800 rounded-2xl p-4 space-y-2.5">
      <div className="flex items-center justify-between">
        <div className="text-gray-500 text-[10px] font-bold tracking-[2px]">CLOUD SYNC</div>
        <button
          onClick={() => save({ ...cfg, enabled: !cfg.enabled })}
          disabled={!ready}
          className={`px-2.5 py-1 rounded text-[11px] font-bold ${cfg.enabled && ready ? 'bg-emerald-900/50 text-emerald-300 border border-emerald-600' : 'bg-gray-700 text-gray-400'} disabled:opacity-50`}
        >
          {cfg.enabled && ready ? 'ON' : 'OFF'}
        </button>
      </div>

      <div className="flex gap-1.5">
        <input
          value={cfg.url}
          aria-label="Cloud sync URL"
          onChange={(e) => save({ ...cfg, url: e.target.value.trim() })}
          placeholder="Sync URL (tap 'This site' to use the built-in one)"
          className="flex-1 min-w-0 bg-gray-950 border border-gray-700 rounded-lg px-3 py-2 text-gray-200 text-xs"
        />
        <button
          onClick={() => { save({ ...cfg, url: `${window.location.origin}/api` }); setStatus('Using this site\'s built-in sync.'); }}
          className="px-2.5 py-1.5 rounded-lg text-[11px] font-bold bg-gray-700 text-gray-300 hover:bg-gray-600 flex-shrink-0"
        >
          This site
        </button>
      </div>
      <div className="flex gap-1.5">
        <input
          value={cfg.token}
          aria-label="Private sync code"
          onChange={(e) => save({ ...cfg, token: e.target.value.trim() })}
          placeholder="Sync token (same on every device)"
          className="flex-1 min-w-0 bg-gray-950 border border-gray-700 rounded-lg px-3 py-2 text-gray-200 text-xs font-mono"
        />
        <button
          onClick={() => { const t = generateToken(); save({ ...cfg, token: t }); setStatus('Token generated — copy it to your other devices.'); }}
          className="px-2.5 py-1.5 rounded-lg text-[11px] font-bold bg-gray-700 text-gray-300 hover:bg-gray-600 flex-shrink-0"
        >
          Generate
        </button>
      </div>

      {cfg.enabled && ready && (
        <div className="flex items-center gap-2">
          <button onClick={() => doPush(false)} disabled={busy} className="flex-1 py-1.5 rounded-lg text-xs font-bold bg-teal-700 hover:bg-teal-600 text-white disabled:opacity-50">
            ↑ Push now
          </button>
          <button onClick={doPull} disabled={busy} className="flex-1 py-1.5 rounded-lg text-xs font-bold bg-gray-700 hover:bg-gray-600 text-gray-200 disabled:opacity-50">
            ↓ Pull from cloud
          </button>
        </div>
      )}

      {cfg.hasConflict && <div role="alert" className="space-y-2 rounded-lg border border-amber-700 bg-amber-950/30 p-3 text-xs text-amber-100">
        <p>These devices have different progress. Your local progress is safe. Download the saved copies before choosing which one to continue with.</p>
        <div className="flex flex-wrap gap-2">
          <button type="button" disabled={busy} onClick={() => doPush(true)} className="rounded bg-teal-700 px-3 py-2 disabled:opacity-50">Use this device</button>
          <button type="button" disabled={busy} onClick={doPull} className="rounded bg-gray-700 px-3 py-2 disabled:opacity-50">Use cloud copy</button>
        </div>
      </div>}

      {recoveryCopies && <div className="space-y-2 text-xs text-gray-300" aria-label="Sync recovery copies">
        <p>Last sync recovery copies — retained even after choosing a copy.</p>
        <div className="flex flex-wrap gap-2">
          {recoveryCopies.local && <button type="button" onClick={() => downloadCopy('local')} className="rounded border border-gray-600 px-3 py-2">Download this device’s copy</button>}
          {recoveryCopies.remote && <button type="button" onClick={() => downloadCopy('remote')} className="rounded border border-gray-600 px-3 py-2">Download cloud copy</button>}
        </div>
      </div>}

      <div className="text-gray-600 text-[10px] leading-snug">
        {cfg.enabled && ready
          ? <>Auto: uploads after changes and checks the cloud at launch. Last successful upload {ago(cfg.lastPush)} · cloud check {ago(cfg.lastPull)}. Different copies require a choice; older custom sync services support one active device at a time.</>
          : <>Sync across phone / iPad / Mac. Easiest: tap "This site" (needs the free database linked once in Vercel — see <span className="font-mono">sync-worker/README.md</span>), Generate a token, and use the same token on every device.</>}
      </div>
      {status && <div className="text-teal-400 text-[11px]">{status}</div>}
    </div>
  );
}
