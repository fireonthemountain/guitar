import { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { Plug, Upload, Send, Save, Download, X, Search, Radio, ChevronRight, ChevronDown, Play, Square } from 'lucide-react';
import {
  FENDER_VID, GEN1_PIDS, AMPS, FX, hex,
  pktInit, pktRequestState, pktExecute, pktSelectBank, pktSaveName,
  pktAmp, pktUsbGain, pktEffect, parseFuse, toFuseXml,
} from '../utils/mustangProtocol';
import { loadBundledPresets, loadCommunityPresets, loadCuratedPresets } from '../data/mustangPresets';
import { previewPreset, stopPreview } from '../utils/mustangPreview';

const LIB_KEY = 'guitar-jam-mustang-lib';
const RENDER_CAP = 300; // cap visible rows; the community set is ~1,100 presets
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const fxNames = (p) => p.effects.map((f) => FX[f.model]?.n).filter(Boolean).join(', ') || 'no effects';
const isV2 = (p) => AMPS[p.amp.model]?.v2 || p.effects.some((f) => FX[f.model]?.v2);
const to10 = (b) => (Math.round((b / 255) * 100) / 10).toFixed(1); // amp byte 0–255 → 0.0–10.0
const DSP_LABEL = { 6: 'Stomp', 7: 'Mod', 8: 'Delay', 9: 'Reverb' };
const DSP_STYLE = {
  6: 'bg-amber-900/40 text-amber-200 border-amber-700/40',
  7: 'bg-sky-900/40 text-sky-200 border-sky-700/40',
  8: 'bg-blue-900/40 text-blue-200 border-blue-700/40',
  9: 'bg-purple-900/40 text-purple-200 border-purple-700/40',
};

/* A rotary amp knob: tick-mark dial, cream pointer, orange value arc.
   `value` is a 0–255 amp byte, mapped across a 270° sweep. */
function Knob({ label, value }) {
  const C = 28;
  const pol = (r, deg) => { const a = (deg * Math.PI) / 180; return [C + r * Math.sin(a), C - r * Math.cos(a)]; };
  const frac = Math.max(0, Math.min(1, value / 255));
  const ang = -135 + frac * 270;
  const ticks = [];
  for (let t = 0; t <= 10; t++) {
    const d = -135 + t * 27; const maj = t % 5 === 0;
    const [x1, y1] = pol(maj ? 18.5 : 20, d); const [x2, y2] = pol(23.5, d);
    ticks.push(<line key={t} x1={x1.toFixed(1)} y1={y1.toFixed(1)} x2={x2.toFixed(1)} y2={y2.toFixed(1)} stroke={maj ? '#9ca3af' : '#4b5563'} strokeWidth={maj ? 1.6 : 1} />);
  }
  const [sx, sy] = pol(23.5, -135);
  const [ex, ey] = pol(23.5, ang);
  const large = frac * 270 > 180 ? 1 : 0;
  const [tx, ty] = pol(15, ang); const [bx, by] = pol(3, ang);
  return (
    <div className="text-center" style={{ flex: 1, minWidth: 46 }}>
      <svg width="54" height="54" viewBox="0 0 56 56" className="mx-auto block">
        {ticks}
        {frac > 0.001 && <path d={`M${sx.toFixed(1)} ${sy.toFixed(1)} A23.5 23.5 0 ${large} 1 ${ex.toFixed(1)} ${ey.toFixed(1)}`} fill="none" stroke="#f97316" strokeWidth="2.5" strokeLinecap="round" />}
        <circle cx="28" cy="28" r="16" fill="#242320" stroke="rgba(255,255,255,.14)" strokeWidth="1" />
        <circle cx="28" cy="28" r="10.5" fill="#332f2b" />
        <line x1={bx.toFixed(1)} y1={by.toFixed(1)} x2={tx.toFixed(1)} y2={ty.toFixed(1)} stroke="#f4ede0" strokeWidth="2.6" strokeLinecap="round" />
        <circle cx="28" cy="28" r="2.4" fill="#4a4038" />
      </svg>
      <div className="text-[10px] text-gray-500 -mt-0.5">{label}</div>
      <div className="text-[11px] text-gray-300 font-medium tabular-nums">{to10(value)}</div>
    </div>
  );
}

/* Expandable per-preset detail: rotary amp panel + a left-to-right signal chain */
function PresetDetails({ p }) {
  const a = p.amp;
  const ampKnobs = [
    ['Gain', a.gain], ['Vol', a.volume], ['Treble', a.treble], ['Middle', a.middle],
    ['Bass', a.bass], ['Presence', a.presence], ['Master', a.master],
  ];
  const chain = [6, 7, 8, 9].map((dsp) => p.effects.find((f) => f.dsp === dsp)).filter(Boolean);
  return (
    <div className="bg-gray-900/60 border border-gray-700 rounded-xl px-4 py-3 space-y-3">
      <div>
        <div className="text-[10px] uppercase tracking-wide text-orange-400 font-bold mb-1">Amp · {AMPS[a.model]?.name}</div>
        <div className="flex gap-1 justify-between flex-wrap">{ampKnobs.map(([l, v]) => <Knob key={l} label={l} value={v} />)}</div>
      </div>
      <div>
        <div className="text-[10px] uppercase tracking-wide text-orange-400 font-bold mb-1.5">Signal chain</div>
        {chain.length === 0 ? <div className="text-gray-500 text-xs">Clean — no effects.</div> : (
          <div className="flex items-center gap-2 flex-wrap">
            {chain.map((f, i) => (
              <div key={i} className="flex items-center gap-2">
                {i > 0 && <ChevronRight size={14} className="text-gray-600" />}
                <div className={`border rounded-lg px-2.5 py-1.5 ${DSP_STYLE[f.dsp]}`}>
                  <div className="text-xs font-semibold">{FX[f.model]?.n || `0x${f.model.toString(16)}`} <span className="opacity-60 font-normal">· {DSP_LABEL[f.dsp]}</span></div>
                  <div className="text-[9px] opacity-70 tabular-nums mt-0.5">{f.knobs.slice(0, 6).map((k) => to10(k)).join(' · ')}</div>
                </div>
              </div>
            ))}
          </div>
        )}
        {p.usbGain != null && <div className="text-[11px] text-gray-500 mt-2">USB gain: {to10(p.usbGain)}</div>}
      </div>
    </div>
  );
}

/* ── WebHID amp connection ──────────────────────────────────── */
function useMustangAmp() {
  const deviceRef = useRef(null);
  const [connected, setConnected] = useState(false);
  const [status, setStatus] = useState('No amp connected');
  const [banks, setBanks] = useState({}); // { slotIndex: name }
  const [log, setLog] = useState([]); // [{ t, cls }]
  const banksRef = useRef({});

  const supported = typeof navigator !== 'undefined' && !!navigator.hid;

  const addLog = useCallback((t, cls = '') => {
    setLog((prev) => [...prev.slice(-250), { t, cls }]);
  }, []);

  const send = useCallback(async (p, label) => {
    addLog(`→ ${label}: ${hex(p.slice(0, 16))} …`, 'tx');
    await deviceRef.current.sendReport(0, p);
    await sleep(15); // amp needs breathing room between packets
  }, [addLog]);

  const onReport = useCallback((e) => {
    const d = new Uint8Array(e.data.buffer, e.data.byteOffset, e.data.byteLength);
    // Preset-name packets: 1c 01 04, byte3==0 (knob-preset names use 1/2 there)
    if (d[0] === 0x1c && d[1] === 0x01 && d[2] === 0x04 && d[3] === 0x00) {
      const slot = d[4];
      let name = '';
      for (let i = 16; i < 48 && d[i]; i++) name += String.fromCharCode(d[i]);
      if (name.trim()) {
        banksRef.current = { ...banksRef.current, [slot]: name.trim() };
        setBanks(banksRef.current);
      }
    }
    addLog(`← ${hex(d.slice(0, 16))}`, 'rx');
  }, [addLog]);

  const connect = useCallback(async () => {
    try {
      const devs = await navigator.hid.requestDevice({ filters: [{ vendorId: FENDER_VID }] });
      if (!devs.length) return;
      const device = devs[0];
      await device.open();
      device.addEventListener('inputreport', onReport);
      deviceRef.current = device;
      const model = GEN1_PIDS[device.productId] || device.productName || 'Fender device';
      setConnected(true);
      setStatus(`${model} — connected`);
      addLog(`Connected: ${model} (PID 0x${device.productId.toString(16)})`, 'ok');
      const [i0, i1] = pktInit();
      await send(i0, 'init 1'); await send(i1, 'init 2');
      banksRef.current = {}; setBanks({});
      await send(pktRequestState(), 'request state');
    } catch (err) {
      addLog('Connect failed: ' + err.message, 'err');
    }
  }, [onReport, send, addLog]);

  const disconnect = useCallback(async () => {
    const device = deviceRef.current;
    if (device) { try { device.removeEventListener('inputreport', onReport); await device.close(); } catch (_) { /* ignore */ } }
    deviceRef.current = null;
    setConnected(false);
    setStatus('No amp connected');
  }, [onReport]);

  useEffect(() => () => { disconnect(); }, [disconnect]);

  /* Send a full preset to the amp (live, unsaved) */
  const applyPreset = useCallback(async (p) => {
    if (!deviceRef.current) throw new Error('Connect the amp first');
    await send(pktAmp(p.amp), 'amp settings'); await send(pktExecute(), 'execute');
    for (const dsp of [6, 7, 8, 9]) {
      const fx = p.effects.find((f) => f.dsp === dsp) || { model: 0, dsp, pos: 0, knobs: [] };
      await send(pktEffect(fx), fx.model ? `fx ${FX[fx.model].n}` : `clear dsp ${dsp}`);
      await send(pktExecute(), 'execute');
    }
    if (p.usbGain != null) { await send(pktUsbGain(p.usbGain), 'usb gain'); await send(pktExecute(), 'execute'); }
    addLog(`Preset "${p.name}" applied ✓`, 'ok');
  }, [send, addLog]);

  const saveToBank = useCallback(async (p, slot, name) => {
    if (!deviceRef.current) throw new Error('Connect the amp first');
    await applyPreset(p); // make sure DSPs hold this preset
    await send(pktSaveName(slot, name), 'save to bank ' + (slot + 1));
    await send(pktSelectBank(slot), 'select bank');
    banksRef.current = { ...banksRef.current, [slot]: name };
    setBanks(banksRef.current);
    addLog(`Saved to bank ${slot + 1} as "${name}" ✓`, 'ok');
  }, [applyPreset, send, addLog]);

  return { supported, connected, status, banks, log, connect, disconnect, applyPreset, saveToBank, clearLog: () => setLog([]) };
}

/* ── Save-to-bank modal ─────────────────────────────────────── */
function SaveDialog({ preset, banks, onCancel, onSave }) {
  const [slot, setSlot] = useState(0);
  const [name, setName] = useState(preset.name.slice(0, 32));
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4" onClick={onCancel}>
      <div className="bg-gray-800 border border-gray-600 rounded-2xl p-5 w-full max-w-md" onClick={(e) => e.stopPropagation()}>
        <h3 className="text-white font-bold text-lg" style={{ fontFamily: 'ui-serif, Georgia, serif' }}>Save to amp memory</h3>
        <p className="text-gray-400 text-xs mt-1">This overwrites the chosen bank on the amp.</p>
        <label className="block text-[11px] font-bold text-gray-300 mt-4 mb-1">BANK</label>
        <select value={slot} onChange={(e) => setSlot(Number(e.target.value))} className="w-full bg-gray-900 border border-gray-600 rounded-lg px-3 py-2 text-sm text-white">
          {Array.from({ length: 24 }, (_, i) => (
            <option key={i} value={i}>{`Bank ${String(i + 1).padStart(2, '0')} — ${banks[i] || '(empty)'}`}</option>
          ))}
        </select>
        <label className="block text-[11px] font-bold text-gray-300 mt-3 mb-1">NAME (max 32 chars)</label>
        <input value={name} maxLength={32} onChange={(e) => setName(e.target.value)} className="w-full bg-gray-900 border border-gray-600 rounded-lg px-3 py-2 text-sm text-white" />
        <div className="flex justify-end gap-2 mt-5">
          <button onClick={onCancel} className="px-4 py-2 rounded-lg text-sm font-semibold bg-gray-700 text-gray-200 hover:bg-gray-600">Cancel</button>
          <button onClick={() => onSave(slot, name || 'Preset')} className="px-4 py-2 rounded-lg text-sm font-semibold bg-teal-600 text-white hover:bg-teal-500">Save to Amp</button>
        </div>
      </div>
    </div>
  );
}

/* ── Page ───────────────────────────────────────────────────── */
export default function MustangPage() {
  const amp = useMustangAmp();
  const [imported, setImported] = useState(() => {
    try { return JSON.parse(localStorage.getItem(LIB_KEY) || '[]'); } catch (_) { return []; }
  });
  const [query, setQuery] = useState('');
  const [sourceFilter, setSourceFilter] = useState('all'); // all | blues-jam-picks | full-collection | imported
  const [expanded, setExpanded] = useState(null); // key of the open preset
  const [playingKey, setPlayingKey] = useState(null); // key of the previewing preset
  const [saveTarget, setSaveTarget] = useState(null);
  const previewTimer = useRef(null);
  const [toast, setToast] = useState('');
  const [dragOver, setDragOver] = useState(false);
  const fileRef = useRef(null);
  const logRef = useRef(null);

  const bundled = useMemo(() => loadBundledPresets(), []);
  const [community, setCommunity] = useState([]);
  const [curated, setCurated] = useState([]);
  const showToast = useCallback((m) => { setToast(m); setTimeout(() => setToast(''), 2600); }, []);

  useEffect(() => {
    let live = true;
    loadCommunityPresets().then((c) => { if (live) setCommunity(c); }).catch(() => {});
    loadCuratedPresets().then((c) => { if (live) setCurated(c); }).catch(() => {});
    return () => { live = false; };
  }, []);

  useEffect(() => {
    try { localStorage.setItem(LIB_KEY, JSON.stringify(imported)); } catch (_) { /* ignore */ }
  }, [imported]);

  useEffect(() => { if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight; }, [amp.log]);

  const library = useMemo(() => {
    const imp = imported.map((p) => ({ ...p, source: 'imported', sourceLabel: 'Imported', bundled: false }));
    return [...imp, ...bundled, ...community];
  }, [imported, bundled, community]);

  const filtered = useMemo(() => {
    // "Curated" is a separate lens over the community set, not part of "All"
    const base = sourceFilter === 'curated'
      ? curated
      : library.filter((p) => sourceFilter === 'all' || p.source === sourceFilter);
    const q = query.toLowerCase();
    if (!q) return base;
    return base.filter((p) =>
      p.name.toLowerCase().includes(q)
      || (AMPS[p.amp.model]?.name || '').toLowerCase().includes(q)
      || (p.tag || '').toLowerCase().includes(q));
  }, [library, curated, query, sourceFilter]);

  const counts = useMemo(() => ({
    all: library.length,
    'blues-jam-picks': library.filter((p) => p.source === 'blues-jam-picks').length,
    'full-collection': library.filter((p) => p.source === 'full-collection').length,
    curated: curated.length,
    'fuse-community': community.length,
    imported: imported.length,
  }), [library, curated, community, imported]);

  const tagChips = useMemo(() => {
    const c = {};
    curated.forEach((p) => { if (p.tag) c[p.tag] = (c[p.tag] || 0) + 1; });
    return Object.entries(c).sort((x, y) => y[1] - x[1]).slice(0, 12);
  }, [curated]);

  const importFiles = useCallback(async (files) => {
    let ok = 0, fail = 0;
    const next = [];
    for (const f of files) {
      try { next.push(parseFuse(await f.text(), f.name.replace(/\.(fuse|xml)$/i, ''))); ok++; }
      catch (_) { fail++; }
    }
    if (next.length) setImported((prev) => [...next, ...prev]);
    showToast(`Imported ${ok} preset${ok !== 1 ? 's' : ''}${fail ? `, ${fail} failed` : ''}`);
  }, [showToast]);

  const onSend = useCallback(async (p) => {
    if (!amp.connected) { showToast('Connect the amp first'); return; }
    try { await amp.applyPreset(p); showToast(`"${p.name}" is live — Save to a bank to keep it`); }
    catch (err) { showToast('Send failed — see log'); void err; }
  }, [amp, showToast]);

  const preview = useCallback((p, key) => {
    if (previewTimer.current) clearTimeout(previewTimer.current);
    if (playingKey === key) { stopPreview(); setPlayingKey(null); return; }
    setPlayingKey(key);
    previewPreset(p)
      .then((dur) => { previewTimer.current = setTimeout(() => setPlayingKey(null), dur * 1000 + 500); })
      .catch(() => setPlayingKey(null));
  }, [playingKey]);

  useEffect(() => () => { stopPreview(); if (previewTimer.current) clearTimeout(previewTimer.current); }, []);

  const onSaveConfirm = useCallback(async (slot, name) => {
    const p = saveTarget; setSaveTarget(null);
    try { await amp.saveToBank(p, slot, name); showToast(`Saved to bank ${slot + 1}`); }
    catch (err) { showToast('Save failed — see log'); void err; }
  }, [saveTarget, amp, showToast]);

  const exportPreset = useCallback((p) => {
    const blob = new Blob([toFuseXml(p)], { type: 'text/xml' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = p.name.replace(/[^\w\- ]/g, '') + '.fuse';
    a.click();
    URL.revokeObjectURL(a.href);
  }, []);

  const removeImported = useCallback((p) => {
    setImported((prev) => prev.filter((x) => x !== p));
  }, []);

  const FILTERS = [
    ['all', 'All'],
    ['curated', 'Curated'],
    ['blues-jam-picks', 'Blues Jam'],
    ['full-collection', 'Full Collection'],
    ['fuse-community', 'Community'],
    ['imported', 'Imported'],
  ];

  return (
    <div className="space-y-6">
      {/* Amp panel header */}
      <div className="rounded-2xl p-5 flex items-center gap-4 flex-wrap bg-gradient-to-b from-gray-800 to-gray-900 border border-gray-700">
        <span className={`w-4 h-4 rounded-full flex-none transition-all ${amp.connected ? 'bg-orange-500 shadow-[0_0_14px_3px_rgba(249,115,22,0.7)]' : 'bg-red-900'}`} />
        <div className="min-w-0">
          <h2 className="text-2xl font-bold text-white" style={{ fontFamily: 'ui-serif, Georgia, serif' }}>Mustang Preset Loader</h2>
          <div className="text-[11px] uppercase tracking-wider text-gray-400 mt-0.5">{amp.status}</div>
        </div>
        <div className="flex-1" />
        <button
          onClick={() => (amp.connected ? amp.disconnect() : amp.connect())}
          disabled={!amp.supported}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold bg-orange-600 text-white hover:bg-orange-500 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <Plug size={16} />{amp.connected ? 'Disconnect' : 'Connect Amp'}
        </button>
      </div>

      {!amp.supported && (
        <div className="bg-orange-900/30 border-l-4 border-orange-500 rounded-r-lg px-4 py-3 text-sm text-orange-200">
          ⚠️ WebHID isn't available here. Open guitar-jam in <b>Chrome</b> or <b>Edge</b> on your Mac (Safari and Firefox don't support WebHID) to talk to the amp. You can still browse, import, and export presets.
        </div>
      )}

      {/* Preset library */}
      <section>
        <h3 className="text-lg font-bold text-white mb-1" style={{ fontFamily: 'ui-serif, Georgia, serif' }}>Preset Library</h3>
        <p className="text-gray-400 text-xs mb-3"><span className="text-teal-300">▶ Preview</span> any tone in your browser (an approximation), send it to your Mustang, save to a memory bank, or export as <code className="text-teal-400">.fuse</code>.</p>

        <div
          onClick={() => fileRef.current?.click()}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(e) => { e.preventDefault(); setDragOver(false); importFiles(e.dataTransfer.files); }}
          className={`border-2 border-dashed rounded-xl py-6 text-center cursor-pointer transition-colors ${dragOver ? 'border-teal-500 bg-teal-900/20' : 'border-gray-600 text-gray-400 hover:border-gray-500'}`}
        >
          <Upload size={20} className="inline mr-2 -mt-1" />
          Drop <b className="text-teal-400">.fuse</b> files here — or click to browse
          <input ref={fileRef} type="file" accept=".fuse,.xml" multiple hidden onChange={(e) => importFiles(e.target.files)} />
        </div>

        <div className="flex flex-wrap items-center gap-2 mt-4">
          <div className="relative flex-1 min-w-[180px]">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Filter presets…" className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-9 pr-3 py-2 text-sm text-white" />
          </div>
          {FILTERS.map(([id, label]) => (
            <button key={id} onClick={() => setSourceFilter(id)} className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${sourceFilter === id ? 'bg-teal-600 text-white' : 'bg-gray-800 text-gray-400 hover:text-gray-200'}`}>
              {label} <span className="opacity-60">{counts[id]}</span>
            </button>
          ))}
        </div>

        {sourceFilter === 'curated' && tagChips.length > 0 && (
          <div className="flex flex-wrap items-center gap-1.5 mt-2">
            <span className="text-[11px] text-gray-500">Browse:</span>
            {tagChips.map(([tag, n]) => (
              <button key={tag} onClick={() => setQuery(query === tag ? '' : tag)} className={`px-2 py-1 rounded-md text-[11px] ${query === tag ? 'bg-teal-600 text-white' : 'bg-gray-800 text-gray-400 hover:text-gray-200'}`}>
                {tag} <span className="opacity-60">{n}</span>
              </button>
            ))}
          </div>
        )}

        <div className="mt-3 space-y-2">
          {filtered.length === 0 && (
            <div className="text-gray-500 text-sm px-1 py-2">No matches.</div>
          )}
          {filtered.slice(0, RENDER_CAP).map((p, i) => {
            const key = `${p.source}-${p.name}-${i}`;
            const open = expanded === key;
            const toggle = () => setExpanded(open ? null : key);
            return (
              <div key={key} className="bg-gray-800 border border-gray-700 rounded-xl">
                <div className="flex items-center gap-3 flex-wrap px-3 py-2.5">
                  <button onClick={toggle} title={open ? 'Hide details' : 'Show details'} aria-expanded={open} className="text-gray-500 hover:text-gray-200 flex-none">
                    {open ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                  </button>
                  <div className="flex-1 min-w-[160px] cursor-pointer" onClick={toggle}>
                    <div className="text-white font-bold text-sm flex items-center gap-2 flex-wrap">
                      {p.name}
                      {p.tag && <span className="text-[9px] bg-teal-900/50 text-teal-300 rounded px-1.5 py-0.5 font-bold tracking-wide">{p.tag}</span>}
                      {isV2(p) && <span className="text-[9px] bg-orange-900/40 text-orange-300 rounded px-1.5 py-0.5 font-bold tracking-wide">V2 MODELS</span>}
                    </div>
                    <div className="text-gray-400 text-[11px]">{AMPS[p.amp.model]?.name} · {fxNames(p)} <span className="text-gray-600">· {p.sourceLabel}</span></div>
                  </div>
                  <button onClick={() => preview(p, key)} title="Preview tone (browser approximation)" aria-label="Preview tone" className={`flex items-center gap-1 text-xs font-semibold rounded-md px-2.5 py-1.5 ${playingKey === key ? 'bg-teal-600 text-white' : 'bg-gray-700 text-teal-300 hover:bg-gray-600'}`}>{playingKey === key ? <Square size={13} /> : <Play size={13} />}</button>
                  <button onClick={() => onSend(p)} disabled={!amp.connected} title={amp.connected ? '' : 'Connect the amp first'} className="flex items-center gap-1 text-xs font-semibold bg-orange-600 text-white rounded-md px-2.5 py-1.5 hover:bg-orange-500 disabled:opacity-40 disabled:cursor-not-allowed"><Send size={13} />Send</button>
                  <button onClick={() => (amp.connected ? setSaveTarget(p) : showToast('Connect the amp first'))} disabled={!amp.connected} className="flex items-center gap-1 text-xs font-semibold bg-gray-700 text-gray-200 rounded-md px-2.5 py-1.5 hover:bg-gray-600 disabled:opacity-40 disabled:cursor-not-allowed"><Save size={13} />Bank…</button>
                  <button onClick={() => exportPreset(p)} className="flex items-center gap-1 text-xs font-semibold bg-gray-700 text-gray-200 rounded-md px-2.5 py-1.5 hover:bg-gray-600"><Download size={13} />Export</button>
                  {p.source === 'imported' && (
                    <button onClick={() => removeImported(p)} className="text-gray-500 hover:text-red-400 rounded-md px-1.5 py-1.5"><X size={14} /></button>
                  )}
                </div>
                {open && <div className="px-3 pb-3"><PresetDetails p={p} /></div>}
              </div>
            );
          })}
          {filtered.length > RENDER_CAP && (
            <div className="text-gray-500 text-xs px-1 py-2">Showing {RENDER_CAP} of {filtered.length} — refine your search to narrow the list.</div>
          )}
        </div>
      </section>

      {/* Amp banks */}
      <section>
        <h3 className="text-lg font-bold text-white mb-1" style={{ fontFamily: 'ui-serif, Georgia, serif' }}>On the Amp</h3>
        <p className="text-gray-400 text-xs mb-3">The 24 memory banks stored in your Mustang (read on connect).</p>
        {!amp.connected ? (
          <div className="bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-gray-500 text-sm">Connect the amp to read its presets.</div>
        ) : (
          <div className="grid gap-2" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))' }}>
            {Array.from({ length: 24 }, (_, i) => (
              <div key={i} className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-xs">
                <span className="block text-[10px] font-bold text-orange-400">BANK {String(i + 1).padStart(2, '0')}</span>
                {amp.banks[i] || <span className="text-gray-600">—</span>}
              </div>
            ))}
          </div>
        )}
      </section>

      {/* USB traffic log */}
      <section>
        <details>
          <summary className="cursor-pointer font-bold text-sm text-gray-300 flex items-center gap-2"><Radio size={14} />USB Traffic Log</summary>
          <div ref={logRef} className="mt-2 bg-black/70 rounded-lg px-3 py-2.5 text-[11px] max-h-56 overflow-auto whitespace-pre-wrap break-all font-mono">
            {amp.log.length === 0 ? <span className="text-gray-600">No traffic yet.</span> : amp.log.map((l, i) => (
              <div key={i} className={l.cls === 'tx' ? 'text-orange-300' : l.cls === 'rx' ? 'text-lime-400' : l.cls === 'err' ? 'text-red-400' : l.cls === 'ok' ? 'text-emerald-300' : 'text-gray-300'}>{l.t}</div>
            ))}
          </div>
        </details>
      </section>

      {saveTarget && <SaveDialog preset={saveTarget} banks={amp.banks} onCancel={() => setSaveTarget(null)} onSave={onSaveConfirm} />}
      {toast && (
        <div className="fixed bottom-5 left-1/2 -translate-x-1/2 bg-gray-950 text-gray-100 border border-gray-700 px-4 py-2.5 rounded-xl text-sm shadow-lg z-50">{toast}</div>
      )}
    </div>
  );
}
