// @vitest-environment node
import { describe, expect, it } from 'vitest';
import { createOnsetDetector, detectOnsets, estimateLatency, scoreTiming, suggestResult, timingSignalQuality } from './timingAnalysis';

const SR = 44100;

// Plucked notes: sharp attack, exponential decay, at the given times.
function plucks(times, { seconds, freq = 196, amp = 0.5, decay = 9 } = {}) {
  const total = seconds ?? Math.max(...times) + 0.5;
  const out = new Float32Array(Math.floor(total * SR));
  for (const start of times) {
    const first = Math.round(start * SR);
    for (let i = first; i < out.length; i++) {
      const t = (i - first) / SR;
      if (t > 0.6) break;
      out[i] += amp * Math.exp(-decay * t) * Math.sin(2 * Math.PI * freq * t);
    }
  }
  return out;
}

const grid = (bpm, notesPerBeat, count, offsets = () => 0) =>
  Array.from({ length: count }, (_, i) => 0.25 + (i * 60) / bpm / notesPerBeat + offsets(i) / 1000);

describe('onset detection', () => {
  it('finds every plucked note within a few milliseconds', () => {
    const times = grid(100, 2, 12);
    const onsets = detectOnsets(plucks(times), SR);
    expect(onsets).toHaveLength(times.length);
    onsets.forEach((t, i) => expect(Math.abs(t - times[i])).toBeLessThan(0.012));
  });

  it('keeps up with sixteenth notes at 120 BPM', () => {
    const times = grid(120, 4, 24);
    expect(detectOnsets(plucks(times, { decay: 25 }), SR)).toHaveLength(24);
  });

  it('ignores silence and steady low-level noise', () => {
    expect(detectOnsets(new Float32Array(SR), SR)).toEqual([]);
    let seed = 3;
    const hiss = Float32Array.from({ length: SR }, () => { seed = (seed * 16807) % 2147483647; return (seed / 2147483647 - 0.5) * 0.01; });
    expect(detectOnsets(hiss, SR)).toEqual([]);
  });

  it('gives the same answer when audio arrives in uneven chunks', () => {
    const times = grid(90, 2, 10);
    const audio = plucks(times);
    const whole = detectOnsets(audio, SR);
    const detector = createOnsetDetector({ sampleRate: SR });
    const streamed = [];
    let offset = 0;
    const sizes = [735, 2048, 300, 1470];
    for (let i = 0; offset < audio.length; i++) {
      const size = sizes[i % sizes.length];
      streamed.push(...detector.push(audio.subarray(offset, offset + size), offset / SR));
      offset += size;
    }
    expect(streamed).toHaveLength(whole.length);
    streamed.forEach((t, i) => expect(t).toBeCloseTo(whole[i], 6));
  });
});

describe('scoreTiming', () => {
  it('grades tight playing as locked', () => {
    const onsets = grid(100, 2, 16, (i) => [3, -4, 2, -2][i % 4]);
    const score = scoreTiming(onsets, { bpm: 100, notesPerBeat: 2, gridStart: 0.25 });
    expect(score.grade).toBe('locked');
    expect(score.spreadMs).toBeLessThan(6);
    expect(score.inPocketPct).toBe(100);
    expect(score.tendency).toBe('centered');
    expect(suggestResult(score)).toBe('clean');
  });

  it('separates a constant offset (bias) from inconsistency (spread)', () => {
    const late = grid(100, 2, 16, () => 30);
    const score = scoreTiming(late, { bpm: 100, notesPerBeat: 2, gridStart: 0.25 });
    expect(score.biasMs).toBe(30);
    expect(score.tendency).toBe('dragging');
    expect(score.spreadMs).toBeLessThan(1);
    expect(score.grade).toBe('locked');
    const calibrated = scoreTiming(late, { bpm: 100, notesPerBeat: 2, gridStart: 0.25, latency: 0.03 });
    expect(calibrated.biasMs).toBe(0);
    expect(calibrated.tendency).toBe('centered');
  });

  it('reports rushing', () => {
    const early = grid(80, 1, 12, () => -25);
    expect(scoreTiming(early, { bpm: 80, gridStart: 0.25 })).toMatchObject({ biasMs: -25, tendency: 'rushing' });
  });

  it('grades erratic playing as unsteady and suggests a miss', () => {
    const wobble = [60, -55, 40, -70, 65, -45, 50, -60, 58, -52, 44, -66];
    const onsets = grid(90, 1, 12, (i) => wobble[i]);
    const score = scoreTiming(onsets, { bpm: 90, gridStart: 0.25 });
    expect(score.grade).toBe('unsteady');
    expect(score.inPocketPct).toBeLessThan(30);
    expect(suggestResult(score)).toBe('miss');
  });

  it('grades mildly loose playing as shaky', () => {
    const drift = [20, -22, 28, -18, 24, -30, 19, -25, 27, -21, 23, -26];
    const score = scoreTiming(grid(90, 1, 12, (i) => drift[i]), { bpm: 90, gridStart: 0.25 });
    expect(['solid', 'loose']).toContain(score.grade);
    expect(suggestResult(score)).toBe('shaky');
  });

  it('needs at least four onsets', () => {
    expect(scoreTiming([0.1, 0.6, 1.1], { bpm: 120 })).toBeNull();
    expect(suggestResult(null)).toBeNull();
  });

  it('scores detected audio end to end', () => {
    const times = grid(96, 2, 16, (i) => [5, -5, 0, 4][i % 4]);
    const onsets = detectOnsets(plucks(times), SR);
    const score = scoreTiming(onsets, { bpm: 96, notesPerBeat: 2, gridStart: 0.25 });
    expect(score.count).toBe(16);
    expect(score.spreadMs).toBeLessThan(12);
    expect(Math.abs(score.biasMs)).toBeLessThan(12);
  });
});

describe('estimateLatency', () => {
  it('measures the click-to-mic delay', () => {
    const clicks = [1, 1.5, 2, 2.5, 3, 3.5];
    const heard = clicks.map((t, i) => t + 0.082 + (i % 2 ? 0.002 : -0.002));
    expect(estimateLatency(clicks, heard)).toBeCloseTo(0.082, 2);
  });

  it('returns null when too few clicks were heard', () => {
    expect(estimateLatency([1, 1.5, 2, 2.5], [1.08, 2.08])).toBeNull();
    expect(estimateLatency([1, 2, 3, 4, 5], [])).toBeNull();
  });
});

describe('timing signal quality', () => {
  it('accepts a recent complete note stream', () => {
    expect(timingSignalQuality(grid(100, 4, 24), { bpm: 100, notesPerBeat: 4, now: 4 }).ready).toBe(true);
  });
  it('withholds a grade for silence or an old take', () => {
    expect(timingSignalQuality([], { bpm: 100, now: 4 }).ready).toBe(false);
    expect(timingSignalQuality(grid(100, 4, 24), { bpm: 100, notesPerBeat: 4, now: 10 }).ready).toBe(false);
  });
  it('does not call a regular half-heard stream clean', () => {
    const halfHeard = grid(100, 4, 24).filter((_, i) => i % 2 === 0);
    expect(timingSignalQuality(halfHeard, { bpm: 100, notesPerBeat: 4, now: 4 })).toMatchObject({ ready: false });
  });
  it('withholds a grade for excess onsets or invalid tempo', () => {
    expect(timingSignalQuality(grid(100, 8, 48), { bpm: 100, notesPerBeat: 4, now: 4 }).ready).toBe(false);
    expect(timingSignalQuality([1, 2, 3, 4], { bpm: 0, now: 4 }).ready).toBe(false);
  });
});
