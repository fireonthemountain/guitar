import { getAudioCtx, getMaster } from './audioEngine';

/* An in-browser APPROXIMATION of a Mustang preset. NOT Fender's amp-model DSP,
   but it renders the whole signal chain so presets actually differ:
     · REAL clean electric-guitar DI (FluidR3 samples, MIT)
     · stomp box: overdrive / fuzz / wah / compressor / boost   (DSP 6)
     · amp: per-model voicing + tube-style drive + tone stack
     · REAL guitar cabinet impulse response (Greenback, CC0)
     · modulation: chorus / flanger / tremolo / phaser / vibratone (DSP 7)
     · delay (DSP 8) and reverb voiced by type (DSP 9)
   Signal order mirrors the real rig: stomp → amp → cab → mod → delay → verb. */

const n = (b) => Math.max(0, Math.min(1, (b || 0) / 255)); // 0–255 byte → 0–1
const BASE = import.meta.env.BASE_URL || '/';
const NOTE_FILE = { 40: 'E2', 47: 'B2', 52: 'E3', 55: 'G3', 57: 'A3', 59: 'B3' };
const PHRASE = [
  [40, 0.00, 1.9], [47, 0.04, 1.9], [52, 0.08, 1.9],
  [52, 0.95, 0.30], [55, 1.22, 0.30], [57, 1.48, 0.32], [59, 1.74, 0.62],
  [40, 2.45, 1.6], [47, 2.49, 1.6], [52, 2.53, 1.6],
];

// ── effect model id sets ────────────────────────────────────────────
const OD = new Set([0x3c, 0xba, 0x110, 0x111]);   // overdrive-ish
const BOOST = new Set([0x103]);                    // ranger boost
const FUZZ = new Set([0x1a, 0x1c, 0x10f]);         // fuzz / big fuzz / fuzz-wah
const WAH = new Set([0x49, 0x4a, 0x1c, 0xf4, 0xf5]); // wah / touch wah
const COMP = new Set([0x07, 0x88]);                // compressor
const CHORUS = new Set([0x12, 0x13, 0x2d]);        // chorus / vibratone
const FLANGER = new Set([0x18, 0x19]);             // flanger
const PHASER = new Set([0x4f, 0x29]);              // phaser / step filter
const TREMOLO = new Set([0x40, 0x41]);             // tremolo
// reverb decay [seconds, decayPow] by model
const VERB = {
  0x24: [1.0, 3], 0x26: [0.8, 3], 0x4e: [1.0, 3], 0x3b: [1.6, 2.4], 0x4b: [1.5, 2.4],
  0x3a: [2.4, 2], 0x4c: [2.2, 2], 0x4d: [2.9, 1.8], 0x21: [0.9, 2.6], 0x0b: [1.0, 2.6],
};

// per-amp voicing: [gainMult, brightDb, tightHz, headroom(0–1 clean)]
function ampVoice(model) {
  const clean = new Set([0x67, 0x64, 0x7c, 0x53, 0x6a, 0x75, 0xf6]); // Fender-y
  const brit = new Set([0x61, 0x79, 0x5e, 0xfc, 0xff, 0x72]);        // British / Super-Sonic
  const hi = new Set([0x5d, 0x6d]);                                  // American '90s / Metal 2000
  if (clean.has(model)) return [0.7, 3, 70, 0.6];
  if (hi.has(model)) return [1.5, -2, 130, 0.15];
  if (brit.has(model)) return [1.1, 1, 95, 0.35];
  return [0.9, 0, 90, 0.4];
}

let cabBuf = null;
const noteBufs = {};
let loading = null;
function loadAssets(ctx) {
  if (loading) return loading;
  const load = async (u) => ctx.decodeAudioData(await (await fetch(u)).arrayBuffer());
  loading = Promise.all([
    load(`${BASE}mustang-audio/cab.wav`).then((b) => { cabBuf = b; }),
    ...Object.entries(NOTE_FILE).map(([m, name]) => load(`${BASE}mustang-audio/gtr/${name}.mp3`).then((b) => { noteBufs[m] = b; })),
  ]);
  return loading;
}

// clip curves: soft rational for overdrive, hard tanh for fuzz
function curve(kind, amt) {
  const len = 1024;
  const c = new Float32Array(len);
  if (kind === 'fuzz') {
    const g = 4 + amt * 40;
    for (let i = 0; i < len; i++) { const x = (i / len) * 2 - 1; c[i] = Math.tanh(g * x); }
  } else {
    const k = amt * 110;
    for (let i = 0; i < len; i++) { const x = (i / len) * 2 - 1; c[i] = ((1 + k) * x) / (1 + k * Math.abs(x)); }
  }
  return c;
}
function makeImpulse(ctx, sec, decay) {
  const len = Math.floor(ctx.sampleRate * sec);
  const buf = ctx.createBuffer(2, len, ctx.sampleRate);
  for (let ch = 0; ch < 2; ch++) {
    const d = buf.getChannelData(ch);
    for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, decay);
  }
  return buf;
}

let active = null;
const lfos = [];
export function stopPreview() {
  lfos.forEach((o) => { try { o.stop(); } catch { /* noop */ } });
  lfos.length = 0;
  if (!active) return;
  active.srcs.forEach((s) => { try { s.stop(); } catch { /* noop */ } });
  try { active.out.disconnect(); } catch { /* noop */ }
  active = null;
}

// wet/dry modulation insert; returns the mixed output node
function insertMod(ctx, src, f) {
  const out = ctx.createGain();
  const m = f.model;
  if (TREMOLO.has(m)) { // amplitude LFO — no delay
    const depth = 0.25 + n(f.knobs[1]) * 0.35;
    const trem = ctx.createGain(); trem.gain.value = 1 - depth;
    const lfo = ctx.createOscillator(); lfo.frequency.value = 3 + n(f.knobs[0]) * 6;
    const lg = ctx.createGain(); lg.gain.value = depth;
    lfo.connect(lg); lg.connect(trem.gain); lfo.start(); lfos.push(lfo);
    src.connect(trem); trem.connect(out);
    return out;
  }
  if (PHASER.has(m)) { // sweeping all-pass stack
    let node = src; const stages = [];
    for (let i = 0; i < 4; i++) { const ap = ctx.createBiquadFilter(); ap.type = 'allpass'; ap.frequency.value = 500 + i * 400; node.connect(ap); node = ap; stages.push(ap); }
    const lfo = ctx.createOscillator(); lfo.frequency.value = 0.3 + n(f.knobs[0]) * 1.5;
    const lg = ctx.createGain(); lg.gain.value = 700;
    lfo.connect(lg); stages.forEach((ap) => lg.connect(ap.frequency)); lfo.start(); lfos.push(lfo);
    src.connect(out); node.connect(out); // dry + phased
    return out;
  }
  // chorus / flanger — modulated short delay
  const flange = FLANGER.has(m);
  const base = flange ? 0.003 : 0.022;
  const sweep = flange ? 0.002 : 0.006;
  const dl = ctx.createDelay(0.1); dl.delayTime.value = base;
  const lfo = ctx.createOscillator(); lfo.frequency.value = flange ? (0.2 + n(f.knobs[0]) * 1.2) : (0.6 + n(f.knobs[0]) * 2);
  const lg = ctx.createGain(); lg.gain.value = sweep;
  lfo.connect(lg); lg.connect(dl.delayTime); lfo.start(); lfos.push(lfo);
  const wet = ctx.createGain(); wet.gain.value = 0.5;
  const dry = ctx.createGain(); dry.gain.value = 0.6;
  if (flange) { const fb = ctx.createGain(); fb.gain.value = 0.4; dl.connect(fb); fb.connect(dl); }
  src.connect(dl); dl.connect(wet); wet.connect(out); src.connect(dry); dry.connect(out);
  return out;
}

export async function previewPreset(p) {
  const ctx = getAudioCtx();
  if (ctx.state === 'suspended') await ctx.resume();
  await loadAssets(ctx);
  stopPreview();

  const a = p.amp;
  const [gMult, brightDb, tightHz, head] = ampVoice(a.model);
  const fx = {}; p.effects.forEach((f) => { fx[f.dsp] = f; });

  const input = ctx.createGain();
  let node = input;

  // ── STOMP (DSP 6): comp → wah → overdrive/fuzz/boost ──
  const stomp = fx[6];
  let stompDrive = 0; let stompKind = 'od';
  if (stomp) {
    const m = stomp.model;
    if (COMP.has(m)) { const comp = ctx.createDynamicsCompressor(); comp.threshold.value = -28; comp.ratio.value = 8; comp.attack.value = 0.003; comp.release.value = 0.15; node.connect(comp); node = comp; }
    if (WAH.has(m)) { const w = ctx.createBiquadFilter(); w.type = 'peaking'; w.frequency.value = 620; w.Q.value = 6; w.gain.value = 14; node.connect(w); node = w; }
    if (OD.has(m)) { stompDrive = 0.45 + n(stomp.knobs[1]) * 0.4; stompKind = 'od'; }
    else if (BOOST.has(m)) { stompDrive = 0.3 + n(stomp.knobs[0]) * 0.3; stompKind = 'od'; }
    else if (FUZZ.has(m)) { stompDrive = 0.8 + n(stomp.knobs[1]) * 0.2; stompKind = 'fuzz'; }
    if (stompDrive > 0) {
      const sg = ctx.createGain(); sg.gain.value = 1 + stompDrive * 8;
      const sh = ctx.createWaveShaper(); sh.curve = curve(stompKind, stompDrive); sh.oversample = '4x';
      const lvl = ctx.createGain(); lvl.gain.value = 0.6 / (1 + stompDrive);
      if (m === 0xba) { const ts = ctx.createBiquadFilter(); ts.type = 'peaking'; ts.frequency.value = 720; ts.Q.value = 0.9; ts.gain.value = 6; node.connect(sg); sg.connect(ts); ts.connect(sh); } // greenbox mid hump
      else { node.connect(sg); sg.connect(sh); }
      sh.connect(lvl); node = lvl;
    }
  }

  // ── AMP: tighten → pre-gain → tube clip → tone stack ──
  const hp = ctx.createBiquadFilter(); hp.type = 'highpass'; hp.frequency.value = tightHz;
  const gain = n(a.gain) * gMult;
  const ampDrive = Math.min(1, gain * (1 - head) + (stompKind === 'fuzz' ? 0.15 : 0));
  const pre = ctx.createGain(); pre.gain.value = 1 + gain * (6 + (1 - head) * 6);
  const shaper = ctx.createWaveShaper(); shaper.curve = curve('od', ampDrive); shaper.oversample = '4x';

  const bass = ctx.createBiquadFilter(); bass.type = 'lowshelf'; bass.frequency.value = 180; bass.gain.value = (n(a.bass) - 0.5) * 22;
  const mid = ctx.createBiquadFilter(); mid.type = 'peaking'; mid.frequency.value = 720; mid.Q.value = 0.8; mid.gain.value = (n(a.middle) - 0.5) * 18;
  const treble = ctx.createBiquadFilter(); treble.type = 'highshelf'; treble.frequency.value = 2600; treble.gain.value = (n(a.treble) - 0.5) * 20 + brightDb;
  const presence = ctx.createBiquadFilter(); presence.type = 'highshelf'; presence.frequency.value = 4800; presence.gain.value = (n(a.presence) - 0.5) * 14;

  const cabinet = ctx.createConvolver(); cabinet.buffer = cabBuf;
  const makeup = ctx.createGain(); makeup.gain.value = 6;

  node.connect(hp); hp.connect(pre); pre.connect(shaper);
  shaper.connect(bass); bass.connect(mid); mid.connect(treble); treble.connect(presence);
  presence.connect(cabinet); cabinet.connect(makeup);

  // ── POST: mod → out (+ delay/reverb sends) ──
  let postNode = makeup;
  if (fx[7]) postNode = insertMod(ctx, makeup, fx[7]);

  const out = ctx.createGain();
  out.gain.value = (0.4 + n(a.volume) * 0.5) / (1 + ampDrive * 1.5 + stompDrive);
  postNode.connect(out);

  if (fx[8]) { // delay
    const d = fx[8]; const delay = ctx.createDelay(2.0);
    delay.delayTime.value = 0.14 + n(d.knobs[0]) * 0.55;
    const fb = ctx.createGain(); fb.gain.value = Math.min(0.6, 0.2 + n(d.knobs[1]) * 0.45);
    const damp = ctx.createBiquadFilter(); damp.type = 'lowpass'; damp.frequency.value = d.model === 0x2b || d.model === 0x2a ? 2600 : 6000; // tape delays darker
    const wet = ctx.createGain(); wet.gain.value = 0.22 + n(d.knobs[2]) * 0.3;
    postNode.connect(delay); delay.connect(damp); damp.connect(fb); fb.connect(delay); damp.connect(wet); wet.connect(out);
  }
  if (fx[9]) { // reverb voiced by type
    const [sec, decay] = VERB[fx[9].model] || [1.6, 2.3];
    const conv = ctx.createConvolver(); conv.buffer = makeImpulse(ctx, sec, decay);
    const wet = ctx.createGain(); wet.gain.value = 0.15 + n(fx[9].knobs[0]) * 0.3;
    postNode.connect(conv); conv.connect(wet); wet.connect(out);
  }

  out.connect(getMaster());

  const t0 = ctx.currentTime + 0.06;
  const srcs = [];
  PHRASE.forEach(([midi, at, dur]) => {
    const buf = noteBufs[midi]; if (!buf) return;
    const s = ctx.createBufferSource(); s.buffer = buf;
    const g = ctx.createGain();
    g.gain.setValueAtTime(1, t0 + at);
    g.gain.setValueAtTime(1, t0 + at + dur - 0.06);
    g.gain.exponentialRampToValueAtTime(0.001, t0 + at + dur);
    s.connect(g); g.connect(input); s.start(t0 + at); s.stop(t0 + at + dur + 0.05);
    srcs.push(s);
  });
  active = { out, srcs };
  return 4.3;
}
