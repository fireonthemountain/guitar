import { getAudioCtx, getMaster, scheduleGuitarNote, midiToFreq } from './audioEngine';

/* An in-browser APPROXIMATION of a Mustang preset — not the amp's real DSP.
   A .fuse file is just parameter values, so we rebuild a rough tone from them
   with Web Audio: drive from gain/master, voicing from the EQ, and delay /
   reverb / modulation when the preset has them. Good enough to hear clean vs
   crunch vs high-gain and A/B presets by ear. */

const n = (b) => Math.max(0, Math.min(1, (b || 0) / 255)); // 0–255 byte → 0–1

// Soft-clip transfer curve; `amount` (0–1) sets how hard it distorts.
function makeCurve(amount) {
  const k = amount * 140;
  const len = 1024;
  const c = new Float32Array(len);
  for (let i = 0; i < len; i++) {
    const x = (i / len) * 2 - 1;
    c[i] = (1 + k) * x / (1 + k * Math.abs(x));
  }
  return c;
}

// Exponentially-decaying noise → a cheap reverb impulse response.
function makeImpulse(ctx, seconds, decay) {
  const len = Math.floor(ctx.sampleRate * seconds);
  const buf = ctx.createBuffer(2, len, ctx.sampleRate);
  for (let ch = 0; ch < 2; ch++) {
    const d = buf.getChannelData(ch);
    for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, decay);
  }
  return buf;
}

// A short rock/blues lick + a held chord so tone differences are audible.
// [midi, startOffset(s), duration(s)]
const PHRASE = [
  [40, 0.00, 1.9], [47, 0.03, 1.9], [52, 0.06, 1.9], // E5 strum
  [52, 0.95, 0.28], [55, 1.20, 0.28], [57, 1.45, 0.30], [59, 1.70, 0.55], // lick up
  [40, 2.35, 1.4], [47, 2.38, 1.4], [52, 2.41, 1.4], // E5 again
];

let active = null; // { out, endsAt } — current chain, so a new preview can cut it

export function stopPreview() {
  if (active) { try { active.out.disconnect(); } catch { /* ignore */ } active = null; }
}

// Builds the amp chain for a preset and plays PHRASE through it.
// Returns the total duration (seconds) so the UI can clear its playing state.
export function previewPreset(p) {
  const ctx = getAudioCtx();
  if (ctx.state === 'suspended') ctx.resume();
  stopPreview();

  const a = p.amp;
  const gain = n(a.gain);
  const vol = n(a.volume);
  const master = n(a.master);
  const hot = a.model === 0x6d ? 0.2 : 0; // Metal 2000 runs hotter
  const drive = Math.min(1, gain * 0.85 + hot);

  const pre = ctx.createGain();
  pre.gain.value = 1 + gain * 6; // push into the waveshaper
  const shaper = ctx.createWaveShaper();
  shaper.curve = makeCurve(drive);
  shaper.oversample = '2x';

  const bass = ctx.createBiquadFilter();
  bass.type = 'lowshelf'; bass.frequency.value = 180; bass.gain.value = (n(a.bass) - 0.5) * 24;
  const mid = ctx.createBiquadFilter();
  mid.type = 'peaking'; mid.frequency.value = 750; mid.Q.value = 0.8; mid.gain.value = (n(a.middle) - 0.5) * 18;
  const treble = ctx.createBiquadFilter();
  treble.type = 'highshelf'; treble.frequency.value = 2600; treble.gain.value = (n(a.treble) - 0.5) * 24;
  const presence = ctx.createBiquadFilter();
  presence.type = 'highshelf'; presence.frequency.value = 5200; presence.gain.value = (n(a.presence) - 0.5) * 16;
  const cab = ctx.createBiquadFilter();
  cab.type = 'lowpass'; cab.frequency.value = drive > 0.5 ? 4200 : 6800; cab.Q.value = 0.7;

  const out = ctx.createGain();
  out.gain.value = (0.35 + vol * 0.5) / (1 + drive * 2.2); // loudness-compensate the drive

  pre.connect(shaper); shaper.connect(bass); bass.connect(mid); mid.connect(treble);
  treble.connect(presence); presence.connect(cab);

  // Effects, keyed by DSP slot: 7 mod, 8 delay, 9 reverb
  const fx = {};
  p.effects.forEach((f) => { fx[f.dsp] = f; });

  let tap = cab; // node the effects tap off / dry path continues from

  if (fx[7]) { // modulation → a gentle tremolo (amplitude LFO in the dry path)
    const trem = ctx.createGain();
    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    lfo.frequency.value = 3 + n(fx[7].knobs[0]) * 6;
    lfoGain.gain.value = 0.25 + n(fx[7].knobs[1]) * 0.3;
    trem.gain.value = 1 - lfoGain.gain.value;
    lfo.connect(lfoGain); lfoGain.connect(trem.gain);
    cab.connect(trem); tap = trem;
    lfo.start();
  }

  tap.connect(out); // dry path

  if (fx[8]) { // delay → feedback echo
    const d = fx[8];
    const delay = ctx.createDelay(2.0);
    delay.delayTime.value = 0.14 + n(d.knobs[0]) * 0.5;
    const fb = ctx.createGain();
    fb.gain.value = Math.min(0.6, 0.2 + n(d.knobs[1]) * 0.5);
    const wet = ctx.createGain();
    wet.gain.value = 0.2 + n(d.knobs[2]) * 0.35;
    tap.connect(delay); delay.connect(fb); fb.connect(delay); delay.connect(wet); wet.connect(out);
  }

  if (fx[9]) { // reverb → convolver
    const conv = ctx.createConvolver();
    conv.buffer = makeImpulse(ctx, 1.8, 2.2);
    const wet = ctx.createGain();
    wet.gain.value = 0.18 + n(fx[9].knobs[0]) * 0.3;
    tap.connect(conv); conv.connect(wet); wet.connect(out);
  }

  out.connect(getMaster());
  active = out;

  const t0 = ctx.currentTime + 0.05;
  PHRASE.forEach(([midi, at, dur]) => scheduleGuitarNote(midiToFreq(midi), t0 + at, dur, ctx, pre));

  const total = 4.2;
  setTimeout(() => { if (active === out) stopPreview(); }, total * 1000 + 400);
  return total;
}
