import { useState } from 'react';
import { getSyncConfig, setSyncConfig, generateToken, pushNow, pullNow } from '../../utils/syncClient';

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

  const save = (next) => { setCfg(next); setSyncConfig(next); };

  const doPush = async () => {
    setBusy(true);
    const r = await pushNow();
    setBusy(false);
    setStatus(r.ok ? '✓ Pushed to cloud' : `Push failed: ${r.reason}`);
    setCfg(getSyncConfig());
  };

  const doPull = async () => {
    if (!confirm('Pull from cloud? If the cloud copy is newer it replaces this device\'s progress.')) return;
    setBusy(true);
    const r = await pullNow({ force: true });
    setBusy(false);
    if (r === 'applied') { window.location.reload(); return; }
    setStatus(r === 'empty' ? 'Cloud is empty — push from your main device first.' : `Pull: ${r}`);
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
          <button onClick={doPush} disabled={busy} className="flex-1 py-1.5 rounded-lg text-xs font-bold bg-teal-700 hover:bg-teal-600 text-white disabled:opacity-50">
            ↑ Push now
          </button>
          <button onClick={doPull} disabled={busy} className="flex-1 py-1.5 rounded-lg text-xs font-bold bg-gray-700 hover:bg-gray-600 text-gray-200 disabled:opacity-50">
            ↓ Pull from cloud
          </button>
        </div>
      )}

      <div className="text-gray-600 text-[10px] leading-snug">
        {cfg.enabled && ready
          ? <>Auto: pushes after every change, pulls at app launch. Last push {ago(cfg.lastPush)} · last pull {ago(cfg.lastPull)}. Last write wins — practice on one device at a time.</>
          : <>Sync across phone / iPad / Mac. Easiest: tap "This site" (needs the free database linked once in Vercel — see <span className="font-mono">sync-worker/README.md</span>), Generate a token, and use the same token on every device.</>}
      </div>
      {status && <div className="text-teal-400 text-[11px]">{status}</div>}
    </div>
  );
}
