// @vitest-environment node
import { describe, expect, it } from 'vitest';
import { analyzeVibrato, bendStatus, centsBetween, describePitch, detectPitch, midiToFreq } from './pitchDetect';

const SR = 44100;

// A plucked-string-like tone: fundamental plus decaying harmonics.
function tone(freq, { seconds = 0.1, sampleRate = SR, harmonics = [1, 0.6, 0.4, 0.25], amp = 0.3 } = {}) {
  const out = new Float32Array(Math.floor(seconds * sampleRate));
  for (let i = 0; i < out.length; i++) {
    let v = 0;
    harmonics.forEach((h, k) => { v += h * Math.sin((2 * Math.PI * freq * (k + 1) * i) / sampleRate); });
    out[i] = amp * v;
  }
  return out;
}

describe('detectPitch', () => {
  const strings = { E2: 82.41, A2: 110, D3: 146.83, G3: 196, B3: 246.94, E4: 329.63 };

  it('finds each open string within 5 cents', () => {
    for (const [name, freq] of Object.entries(strings)) {
      const result = detectPitch(tone(freq), SR);
      expect(result, name).not.toBeNull();
      expect(Math.abs(centsBetween(result.freq, freq)), name).toBeLessThan(5);
      expect(result.clarity).toBeGreaterThan(0.8);
    }
  });

  it('tracks high fretted notes and does not drop an octave on strong harmonics', () => {
    const high = detectPitch(tone(987.77), SR); // B5, high e fret 19
    expect(Math.abs(centsBetween(high.freq, 987.77))).toBeLessThan(5);
    const weakFundamental = detectPitch(tone(110, { harmonics: [0.3, 1, 0.5, 0.3] }), SR);
    expect(Math.abs(centsBetween(weakFundamental.freq, 110))).toBeLessThan(8);
  });

  it('works at a 48 kHz sample rate with a 2048-sample analyser buffer', () => {
    const buffer = tone(196, { sampleRate: 48000 }).subarray(0, 2048);
    expect(Math.abs(centsBetween(detectPitch(buffer, 48000).freq, 196))).toBeLessThan(5);
  });

  it('returns null for silence and for noise', () => {
    expect(detectPitch(new Float32Array(2048), SR)).toBeNull();
    let seed = 7;
    const noise = Float32Array.from({ length: 4096 }, () => { seed = (seed * 16807) % 2147483647; return (seed / 2147483647 - 0.5) * 0.6; });
    expect(detectPitch(noise, SR)).toBeNull();
    expect(detectPitch(tone(196, { amp: 0.001 }), SR)).toBeNull();
  });
});

describe('describePitch', () => {
  it('names the note and the cents offset', () => {
    expect(describePitch(440)).toMatchObject({ name: 'A', octave: 4, midi: 69, cents: 0 });
    expect(describePitch(82.41)).toMatchObject({ name: 'E', octave: 2 });
    const sharp = describePitch(440 * 2 ** (20 / 1200));
    expect(sharp).toMatchObject({ name: 'A', cents: 20 });
    expect(describePitch(440 * 2 ** (-30 / 1200)).cents).toBe(-30);
  });
});

describe('bendStatus', () => {
  const base = midiToFreq(62); // D4, G string fret 7

  it('accepts a whole-step bend that lands within tolerance', () => {
    const target = midiToFreq(64);
    expect(bendStatus(target, base, 2)).toMatchObject({ inTune: true, centsFromTarget: 0 });
    expect(bendStatus(target * 2 ** (12 / 1200), base, 2).inTune).toBe(true);
  });

  it('flags flat and sharp bends with how far off they are', () => {
    const flat = bendStatus(base * 2 ** (160 / 1200), base, 2);
    expect(flat).toMatchObject({ inTune: false, sharp: false, centsFromTarget: -40 });
    expect(flat.progress).toBeCloseTo(0.8, 2);
    const over = bendStatus(base * 2 ** (230 / 1200), base, 2);
    expect(over).toMatchObject({ inTune: false, sharp: true, centsFromTarget: 30 });
  });

  it('handles half-step bends', () => {
    expect(bendStatus(base * 2 ** (1 / 12), base, 1).inTune).toBe(true);
    expect(bendStatus(base * 2 ** (2 / 12), base, 1)).toMatchObject({ inTune: false, sharp: true });
  });
});

describe('analyzeVibrato', () => {
  // Guitar vibrato: pitch rises above the fretted note and returns.
  const track = (rate, depthCents, { seconds = 2, fps = 50, floorCents = 0, jitter = 0 } = {}) =>
    Array.from({ length: seconds * fps }, (_, i) => {
      const t = i / fps;
      const phase = 2 * Math.PI * rate * t + jitter * Math.sin(t * 9);
      const cents = floorCents + (depthCents / 2) * (1 - Math.cos(phase));
      return { t, freq: 293.66 * 2 ** (cents / 1200) };
    });

  it('measures rate and depth of an even vibrato', () => {
    const result = analyzeVibrato(track(5, 40));
    expect(result.rateHz).toBeCloseTo(5, 0);
    expect(result.depthCents).toBeGreaterThan(32);
    expect(result.depthCents).toBeLessThanOrEqual(41);
    expect(result.evenness).toBeGreaterThan(0.8);
    expect(result.returnsToPitch).toBe(true);
  });

  it('scores an uneven vibrato lower', () => {
    const even = analyzeVibrato(track(5, 40));
    const uneven = analyzeVibrato(track(5, 40, { jitter: 2.5 }));
    expect(uneven.evenness).toBeLessThan(even.evenness);
  });

  it('reports no vibrato on a steady note and null on too little data', () => {
    expect(analyzeVibrato(track(5, 2))).toMatchObject({ rateHz: 0, cycles: 0 });
    expect(analyzeVibrato(track(5, 40, { seconds: 0.2 }))).toBeNull();
    expect(analyzeVibrato([])).toBeNull();
  });
});
