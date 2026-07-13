import { getAudioCtx, getMaster } from './audioEngine';

/* An in-browser APPROXIMATION of a Mustang preset. It is NOT the amp's real
   DSP and won't match a specific preset exactly — but it now sounds like a
   guitar through an amp, because it uses:
     · a REAL recorded clean electric-guitar DI (FluidR3 samples, MIT), and
     · a REAL guitar cabinet impulse response (Greenback / Marshall 1960AX, CC0),
   with tube-style drive + a tone stack from the preset's gain/EQ/effects.
   The cabinet convolution is what stops distortion from sounding like fizz. */

const n = (b) => Math.max(0, Math.min(1, (b || 0) / 255)); // 0–255 byte → 0–1
const BASE = import.meta.env.BASE_URL || '/';

// midi → sample file (exact pitches, so no pitch-shifting needed)
const NOTE_FILE = { 40: 'E2', 47: 'B2', 52: 'E3', 55: 'G3', 57: 'A3', 59: 'B3' };

// A short rock/blues phrase: E5 strum · lick up · E5 again. [midi, start, dur]
const PHRASE = [
  [40, 0.00, 1.9], [47, 0.04, 1.9], [52, 0.08, 1.9],
  [52, 0.95, 0.30], [55, 1.22, 0.30], [57, 1.48, 0.32], [59, 1.74, 0.62],
  [40, 2.45, 1.6], [47, 2.49, 1.6], [52, 2.53, 1.6],
];

let cabBuf = null;
const noteBufs = {};
let loading = null;

function loadAssets(ctx) {
  if (loading) return loading;
  const load = async (url) => ctx.decodeAudioData(await (await fetch(url)).arrayBuffer());
  loading = Promise.all([
    load(`${BASE}mustang-audio/cab.wav`).then((b) => { cabBuf = b; }),
    ...Object.entries(NOTE_FILE).map(([midi, name]) =>
      load(`${BASE}mustang-audio/gtr/${name}.mp3`).then((b) => { noteBufs[midi] = b; })),
  ]);
  return loading;
}

// Soft-clip tube-ish transfer curve; `amount` (0–1) sets how hard it distorts.
function makeCurve(amount) {
  const k = amount * 120;
  const len = 1024;
  const c = new Float32Array(len);
  for (let i = 0; i < len; i++) {
    const x = (i / len) * 2 - 1;
    c[i] = ((1 + k) * x) / (1 + k * Math.abs(x));
  }
  return c;
}

// Exponentially-decaying noise → a cheap room-reverb impulse (for the reverb FX,
// separate from the cabinet).
function makeImpulse(ctx, seconds, decay) {
  const len = Math.floor(ctx.sampleRate * seconds);
  const buf = ctx.createBuffer(2, len, ctx.sampleRate);
  for (let ch = 0; ch < 2; ch++) {
    const d = buf.getChannelData(ch);
    for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, decay);
  }
  return buf;
}

let active = null; // { out, srcs } so a new/stop preview can cut the current one

export function stopPreview() {
  if (!active) return;
  active.srcs.forEach((s) => { try { s.stop(); } catch { /* already stopped */ } });
  try { active.out.disconnect(); } catch { /* ignore */ }
  active = null;
}

/* Builds the amp chain for a preset and plays the phrase through it.
   Async: loads the audio assets on first call. Resolves to the phrase
   duration (seconds) so the UI can clear its playing state. */
export async function previewPreset(p) {
  const ctx = getAudioCtx();
  if (ctx.state === 'suspended') await ctx.resume();
  await loadAssets(ctx);
  stopPreview();

  const a = p.amp;
  const gain = n(a.gain);
  const vol = n(a.volume);
  const hot = a.model === 0x6d ? 0.2 : 0; // Metal 2000 runs hotter
  const drive = Math.min(1, gain * 0.9 + hot);

  const input = ctx.createGain();
  const hp = ctx.createBiquadFilter(); // tighten the low end before clipping
  hp.type = 'highpass'; hp.frequency.value = 90;
  const pre = ctx.createGain();
  pre.gain.value = 1 + gain * 7; // push into the waveshaper
  const shaper = ctx.createWaveShaper();
  shaper.curve = makeCurve(drive);
  shaper.oversample = '4x';

  const bass = ctx.createBiquadFilter();
  bass.type = 'lowshelf'; bass.frequency.value = 180; bass.gain.value = (n(a.bass) - 0.5) * 20;
  const mid = ctx.createBiquadFilter();
  mid.type = 'peaking'; mid.frequency.value = 750; mid.Q.value = 0.8; mid.gain.value = (n(a.middle) - 0.5) * 16;
  const treble = ctx.createBiquadFilter();
  treble.type = 'highshelf'; treble.frequency.value = 2600; treble.gain.value = (n(a.treble) - 0.5) * 18;
  const presence = ctx.createBiquadFilter();
  presence.type = 'highshelf'; presence.frequency.value = 4800; presence.gain.value = (n(a.presence) - 0.5) * 12;

  const cabinet = ctx.createConvolver();
  cabinet.buffer = cabBuf;
  const makeup = ctx.createGain(); // convolution drops level; bring it back
  makeup.gain.value = 6;

  const out = ctx.createGain();
  out.gain.value = (0.4 + vol * 0.5) / (1 + drive * 1.6);

  input.connect(hp); hp.connect(pre); pre.connect(shaper);
  shaper.connect(bass); bass.connect(mid); mid.connect(treble); treble.connect(presence);
  presence.connect(cabinet); cabinet.connect(makeup);

  // Effects, keyed by DSP slot: 7 mod, 8 delay, 9 reverb
  const fx = {};
  p.effects.forEach((f) => { fx[f.dsp] = f; });

  let tap = makeup; // post-cabinet signal; dry path continues from here

  if (fx[7]) { // modulation → gentle tremolo
    const trem = ctx.createGain();
    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    lfo.frequency.value = 3 + n(fx[7].knobs[0]) * 5;
    lfoGain.gain.value = 0.2 + n(fx[7].knobs[1]) * 0.25;
    trem.gain.value = 1 - lfoGain.gain.value;
    lfo.connect(lfoGain); lfoGain.connect(trem.gain);
    makeup.connect(trem); tap = trem;
    lfo.start();
  }

  tap.connect(out);

  if (fx[8]) { // delay → feedback echo
    const d = fx[8];
    const delay = ctx.createDelay(2.0);
    delay.delayTime.value = 0.14 + n(d.knobs[0]) * 0.5;
    const fb = ctx.createGain();
    fb.gain.value = Math.min(0.55, 0.18 + n(d.knobs[1]) * 0.45);
    const wet = ctx.createGain();
    wet.gain.value = 0.18 + n(d.knobs[2]) * 0.3;
    tap.connect(delay); delay.connect(fb); fb.connect(delay); delay.connect(wet); wet.connect(out);
  }

  if (fx[9]) { // reverb → room convolver (distinct from the cabinet)
    const conv = ctx.createConvolver();
    conv.buffer = makeImpulse(ctx, 1.8, 2.2);
    const wet = ctx.createGain();
    wet.gain.value = 0.15 + n(fx[9].knobs[0]) * 0.25;
    tap.connect(conv); conv.connect(wet); wet.connect(out);
  }

  out.connect(getMaster());

  const t0 = ctx.currentTime + 0.06;
  const srcs = [];
  PHRASE.forEach(([midi, at, dur]) => {
    const buf = noteBufs[midi];
    if (!buf) return;
    const s = ctx.createBufferSource();
    s.buffer = buf;
    const g = ctx.createGain();
    g.gain.setValueAtTime(1, t0 + at);
    g.gain.setValueAtTime(1, t0 + at + dur - 0.06);
    g.gain.exponentialRampToValueAtTime(0.001, t0 + at + dur); // clean release
    s.connect(g); g.connect(input);
    s.start(t0 + at); s.stop(t0 + at + dur + 0.05);
    srcs.push(s);
  });
  active = { out, srcs };

  return 4.3; // total phrase length (s)
}
