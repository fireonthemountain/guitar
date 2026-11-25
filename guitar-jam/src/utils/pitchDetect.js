// Pitch detection for the mic checks (tuner, bend-to-pitch, vibrato).
// Pure math on Float32Array buffers so it can be unit-tested with synthesized
// signals; the Web Audio plumbing lives in micInput.js.

const NOTE_NAMES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

export const GUITAR_MIN_HZ = 70;   // just under low E (82.4 Hz), room for drop D
export const GUITAR_MAX_HZ = 1400; // above high e fret 24 (1318.5 Hz)

export function rms(buffer) {
  let sum = 0;
  for (let i = 0; i < buffer.length; i++) sum += buffer[i] * buffer[i];
  return Math.sqrt(sum / buffer.length);
}

// YIN-style fundamental estimate (cumulative mean normalized difference).
// Returns { freq, clarity } where clarity is 0–1 (1 = perfectly periodic), or
// null when the buffer is too quiet or has no clear pitch.
export function detectPitch(buffer, sampleRate, { minHz = GUITAR_MIN_HZ, maxHz = GUITAR_MAX_HZ, threshold = 0.15, minRms = 0.008 } = {}) {
  if (!buffer || buffer.length < 256) return null;
  if (rms(buffer) < minRms) return null;

  const maxLag = Math.min(Math.floor(sampleRate / minHz), Math.floor(buffer.length / 2));
  const minLag = Math.max(2, Math.floor(sampleRate / maxHz));
  if (maxLag <= minLag + 2) return null;
  const size = buffer.length - maxLag;

  const diff = new Float32Array(maxLag + 1);
  for (let lag = 1; lag <= maxLag; lag++) {
    let sum = 0;
    for (let i = 0; i < size; i++) {
      const delta = buffer[i] - buffer[i + lag];
      sum += delta * delta;
    }
    diff[lag] = sum;
  }

  const cmnd = new Float32Array(maxLag + 1);
  cmnd[0] = 1;
  let running = 0;
  for (let lag = 1; lag <= maxLag; lag++) {
    running += diff[lag];
    cmnd[lag] = running > 0 ? (diff[lag] * lag) / running : 1;
  }

  // First dip under the threshold, walked down to its local minimum. Taking
  // the FIRST dip (not the global minimum) avoids octave-below errors.
  let best = -1;
  for (let lag = minLag; lag <= maxLag; lag++) {
    if (cmnd[lag] < threshold) {
      while (lag + 1 <= maxLag && cmnd[lag + 1] < cmnd[lag]) lag++;
      best = lag;
      break;
    }
  }
  if (best === -1) {
    let min = Infinity;
    for (let lag = minLag; lag <= maxLag; lag++) if (cmnd[lag] < min) { min = cmnd[lag]; best = lag; }
    if (min > 0.35) return null; // nothing periodic enough to call a note
  }

  // Parabolic interpolation around the minimum for sub-sample precision.
  let refined = best;
  if (best > 1 && best < maxLag) {
    const a = cmnd[best - 1], b = cmnd[best], c = cmnd[best + 1];
    const denom = a - 2 * b + c;
    if (denom !== 0) refined = best + (a - c) / (2 * denom);
  }
  const freq = sampleRate / refined;
  if (!Number.isFinite(freq) || freq < minHz || freq > maxHz) return null;
  return { freq, clarity: Math.max(0, Math.min(1, 1 - cmnd[best])) };
}

export const freqToMidi = (freq) => 69 + 12 * Math.log2(freq / 440);
export const midiToFreq = (midi) => 440 * 2 ** ((midi - 69) / 12);
export const centsBetween = (freq, reference) => 1200 * Math.log2(freq / reference);

// Nearest equal-tempered note and how far off it is.
export function describePitch(freq) {
  const exact = freqToMidi(freq);
  const midi = Math.round(exact);
  return {
    midi,
    name: NOTE_NAMES[((midi % 12) + 12) % 12],
    octave: Math.floor(midi / 12) - 1,
    cents: Math.round((exact - midi) * 100),
    freq,
  };
}

// Bend check: how far the current pitch is from `semitones` above the base
// (unbent) pitch. inTune = within `tolerance` cents of the target.
export function bendStatus(freq, baseFreq, semitones, tolerance = 15) {
  const target = baseFreq * 2 ** (semitones / 12);
  const centsFromTarget = centsBetween(freq, target);
  const centsFromBase = centsBetween(freq, baseFreq);
  return {
    targetFreq: target,
    centsFromTarget: Math.round(centsFromTarget) || 0,
    progress: Math.max(0, Math.min(1.25, centsFromBase / (semitones * 100))),
    inTune: Math.abs(centsFromTarget) <= tolerance,
    sharp: centsFromTarget > tolerance,
  };
}

// Vibrato analysis over a pitch track: [{ t (seconds), freq }].
// Guitar vibrato only bends sharp, so depth is measured from the floor of the
// track (the fretted pitch) to the peaks.
// Returns { rateHz, depthCents, evenness (0–1), returnsToPitch, cycles } or null.
export function analyzeVibrato(track) {
  const points = (track || []).filter((p) => p && p.freq > 0);
  if (points.length < 12) return null;
  const duration = points.at(-1).t - points[0].t;
  if (duration < 0.6) return null;

  const sortedFreq = points.map((p) => p.freq).sort((a, b) => a - b);
  const base = sortedFreq[Math.floor(sortedFreq.length * 0.1)];
  const cents = points.map((p) => ({ t: p.t, c: centsBetween(p.freq, base) }));
  const sortedCents = cents.map((p) => p.c).sort((a, b) => a - b);
  const high = sortedCents[Math.floor(sortedCents.length * 0.95)];
  const low = sortedCents[Math.floor(sortedCents.length * 0.05)];
  const depth = high - low;
  if (depth < 8) return { rateHz: 0, depthCents: Math.round(depth), evenness: 0, returnsToPitch: true, cycles: 0 };

  // Count upward crossings of the midline, with hysteresis so jitter near the
  // line is not counted as extra cycles.
  const mid = (high + low) / 2;
  const band = depth * 0.15;
  const crossings = [];
  let below = cents[0].c < mid;
  for (const p of cents) {
    if (below && p.c > mid + band) { crossings.push(p.t); below = false; }
    else if (!below && p.c < mid - band) below = true;
  }
  if (crossings.length < 3) return { rateHz: 0, depthCents: Math.round(depth), evenness: 0, returnsToPitch: true, cycles: crossings.length };

  const periods = [];
  for (let i = 1; i < crossings.length; i++) periods.push(crossings[i] - crossings[i - 1]);
  const mean = periods.reduce((a, b) => a + b, 0) / periods.length;
  const variance = periods.reduce((sum, p) => sum + (p - mean) ** 2, 0) / periods.length;
  const cv = Math.sqrt(variance) / mean;

  // Per-cycle troughs: does each cycle come back down to the fretted pitch?
  const troughs = [];
  for (let i = 1; i < crossings.length; i++) {
    const seg = cents.filter((p) => p.t >= crossings[i - 1] && p.t < crossings[i]);
    if (seg.length) troughs.push(Math.min(...seg.map((p) => p.c)));
  }
  const worstTrough = troughs.length ? Math.max(...troughs) : 0;

  return {
    rateHz: Math.round((1 / mean) * 10) / 10,
    depthCents: Math.round(depth),
    evenness: Math.max(0, Math.min(1, Math.round((1 - cv * 2) * 100) / 100)),
    returnsToPitch: worstTrough - low <= Math.max(12, depth * 0.3),
    cycles: periods.length,
  };
}
