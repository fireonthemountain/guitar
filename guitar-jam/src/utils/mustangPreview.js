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

// Style-matched demo phrases, all in E so they work with the 6 sampled notes.
// Each: { dur (total s), attack (s), notes: [midi, start, dur] }
const PHRASES = {
  rock: { dur: 3.9, attack: 0.005, notes: [
    [40, 0, 0.6], [47, 0.03, 0.6], [52, 0.06, 0.6],
    [40, 0.75, 0.5], [47, 0.78, 0.5], [52, 0.81, 0.5],
    [40, 1.45, 0.8], [47, 1.48, 0.8], [52, 1.51, 0.8],
    [40, 2.4, 1.3], [47, 2.43, 1.3], [52, 2.46, 1.3],
  ] },
  metal: { dur: 3.5, attack: 0.004, notes: [
    [40, 0.00, 0.12], [40, 0.16, 0.10], [40, 0.28, 0.10],
    [40, 0.44, 0.12], [40, 0.60, 0.10], [40, 0.72, 0.10],
    [40, 0.90, 0.30], [47, 0.90, 0.30],
    [40, 1.25, 0.12], [40, 1.41, 0.10], [40, 1.53, 0.10],
    [40, 1.70, 0.12], [40, 1.86, 0.10],
    [40, 2.05, 0.6], [47, 2.05, 0.6], [52, 2.05, 0.6],
    [40, 2.85, 0.12], [40, 3.01, 0.10], [40, 3.13, 0.4], [47, 3.13, 0.4],
  ] },
  blues: { dur: 3.9, attack: 0.005, notes: [
    [59, 0.00, 0.30], [57, 0.28, 0.28], [55, 0.54, 0.30], [52, 0.84, 0.55],
    [52, 1.45, 0.28], [55, 1.72, 0.28], [57, 1.98, 0.5],
    [59, 2.45, 1.4],
  ] },
  lead: { dur: 4.3, attack: 0.02, notes: [
    [55, 0.00, 0.9], [57, 0.88, 0.7], [59, 1.55, 1.7], [57, 3.25, 1.0],
  ] },
  clean: { dur: 3.9, attack: 0.02, notes: [
    [40, 0.00, 2.2], [47, 0.35, 2.0], [52, 0.70, 1.8], [55, 1.05, 1.6],
    [59, 1.45, 1.7], [55, 1.9, 1.3], [52, 2.3, 1.6],
  ] },
  funk: { dur: 2.9, attack: 0.004, notes: [
    [52, 0.00, 0.09], [55, 0.00, 0.09], [59, 0.00, 0.09],
    [52, 0.36, 0.09], [55, 0.36, 0.09], [59, 0.36, 0.09],
    [52, 0.54, 0.09], [55, 0.54, 0.09],
    [52, 0.90, 0.09], [55, 0.90, 0.09], [59, 0.90, 0.09],
    [52, 1.26, 0.09], [55, 1.26, 0.09], [59, 1.26, 0.09],
    [52, 1.44, 0.09], [55, 1.44, 0.09],
    [52, 1.80, 0.12], [55, 1.80, 0.12], [59, 1.80, 0.12],
    [52, 2.16, 0.35], [55, 2.16, 0.35], [59, 2.16, 0.35],
  ] },
  acoustic: { dur: 3.9, attack: 0.005, notes: [
    [40, 0.00, 1.5], [47, 0.04, 1.5], [52, 0.08, 1.5], [55, 0.12, 1.5], [59, 0.16, 1.5],
    [59, 0.85, 1.0], [55, 0.90, 1.0], [52, 0.95, 1.0],
    [40, 1.6, 2.0], [47, 1.64, 2.0], [52, 1.68, 2.0], [55, 1.72, 2.0], [59, 1.76, 2.0],
  ] },
  ambient: { dur: 4.2, attack: 0.6, notes: [
    [40, 0.00, 3.8], [47, 0.10, 3.7], [52, 0.20, 3.6], [55, 0.30, 3.5], [59, 0.40, 3.4],
  ] },
};
const STYLE_LABEL = {
  rock: 'rock riff', metal: 'metal chug', blues: 'blues lick', lead: 'lead line',
  clean: 'clean arpeggio', funk: 'funk stabs', acoustic: 'strummed chord', ambient: 'ambient swell',
};

// Pick a phrase style from the preset's tag, else infer from its amp + effects.
function styleOf(p) {
  const t = (p.tag || '').toLowerCase();
  if (t) {
    if (/metallica|pantera|slayer|megadeth|maiden|sabbath|iommi|dimebag/.test(t)) return 'metal';
    if (/gilmour|floyd|hendrix|clapton|santana|beck|trower|gary moore|king|mayer|frusciante/.test(t)) return 'lead';
    if (/knopfler|smiths|marr|u2|edge/.test(t)) return 'clean';
    if (/ac\/dc|angus|van halen|zz top|guns|slash|setzer|rush|queen|may/.test(t)) return 'rock';
    if (t === 'metal') return 'metal';
    if (t === 'blues') return 'blues';
    if (t === 'lead') return 'lead';
    if (t === 'clean') return 'clean';
    if (t === 'acoustic') return 'acoustic';
    if (t === 'funk') return 'funk';
    if (t.includes('ambient')) return 'ambient';
    if (t.includes('fuzz')) return 'lead';
    if (t.includes('crunch') || t.includes('rock')) return 'rock';
  }
  const m = p.amp.model;
  const g = (p.amp.gain || 0) / 255;
  const fx = {}; p.effects.forEach((f) => { fx[f.dsp] = f; });
  const fuzz = fx[6] && [0x1a, 0x1c, 0x10f].includes(fx[6].model);
  const bigVerb = fx[9] && [0x3a, 0x4c, 0x4d].includes(fx[9].model);
  const clean = [0x67, 0x64, 0x7c, 0x53, 0x6a, 0x75, 0xf6].includes(m);
  if (m === 0x6d || (g > 0.7 && m === 0x5d)) return 'metal';
  if (fuzz) return 'lead';
  if (clean && g < 0.4) return bigVerb ? 'ambient' : 'clean';
  if (fx[8] && g < 0.7) return 'lead';
  if (g > 0.55) return 'rock';
  return 'blues';
}

export function previewStyle(p) { return STYLE_LABEL[styleOf(p)] || 'tone'; }

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

  const phrase = PHRASES[styleOf(p)];
  const t0 = ctx.currentTime + 0.06;
  const srcs = [];
  phrase.notes.forEach(([midi, at, dur]) => {
    const buf = noteBufs[midi]; if (!buf) return;
    const s = ctx.createBufferSource(); s.buffer = buf;
    const g = ctx.createGain();
    const st = t0 + at;
    const atk = Math.min(phrase.attack, dur * 0.5);
    const hold = Math.max(st + atk, st + dur - 0.05);
    g.gain.setValueAtTime(0.0001, st);
    g.gain.exponentialRampToValueAtTime(1, st + atk);
    g.gain.setValueAtTime(1, hold);
    g.gain.exponentialRampToValueAtTime(0.001, st + dur);
    s.connect(g); g.connect(input); s.start(st); s.stop(st + dur + 0.05);
    srcs.push(s);
  });
  active = { out, srcs };
  return phrase.dur;
}
