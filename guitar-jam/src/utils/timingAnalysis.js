// Timing analysis for the mic check: find note onsets in audio and score them
// against the metronome grid. Pure functions; unit-tested with synthesized audio.
//
// Honest limits, stated here so the UI can say the same thing:
//   • The browser does not report mic input latency precisely, so absolute
//     early/late ("bias") needs a one-time calibration. Spread (how consistent
//     you are) does not depend on latency at all — that is the headline number.
//   • If the click plays through speakers the mic hears it too. Use headphones
//     for the click when scoring.

// Streaming onset detector: feed consecutive blocks of samples, get onset
// times (seconds, in the caller's clock) back. An onset is a block whose energy
// jumps well above the recent average, followed by a refractory gap.
export function createOnsetDetector({ sampleRate, hop = 256, ratio = 2.2, floor = 0.012, refractory = 0.07 } = {}) {
  let average = 0;
  let previous = 0;
  let lastOnset = -Infinity;
  let carry = new Float32Array(0);

  function processHop(block, time) {
    let sum = 0;
    for (let i = 0; i < block.length; i++) sum += block[i] * block[i];
    const level = Math.sqrt(sum / block.length);
    let onset = null;
    const rising = level > previous * 1.3;
    if (level > floor && level > average * ratio && rising && time - lastOnset >= refractory) {
      onset = time;
      lastOnset = time;
    }
    // Slow-follow average so sustained notes raise the bar for the next onset.
    average = average * 0.9 + level * 0.1;
    previous = level;
    return onset;
  }

  return {
    // samples: Float32Array; startTime: time of samples[0] in seconds.
    push(samples, startTime) {
      const joined = new Float32Array(carry.length + samples.length);
      joined.set(carry);
      joined.set(samples, carry.length);
      const base = startTime - carry.length / sampleRate;
      const onsets = [];
      let offset = 0;
      while (offset + hop <= joined.length) {
        const onset = processHop(joined.subarray(offset, offset + hop), base + offset / sampleRate);
        if (onset !== null) onsets.push(onset);
        offset += hop;
      }
      carry = joined.slice(offset);
      return onsets;
    },
    reset() { average = 0; previous = 0; lastOnset = -Infinity; carry = new Float32Array(0); },
  };
}

export function detectOnsets(samples, sampleRate, options = {}) {
  return createOnsetDetector({ sampleRate, ...options }).push(samples, 0);
}

const median = (values) => {
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
};

// Score onsets against a grid.
//   onsets:       onset times in seconds
//   bpm:          metronome tempo
//   notesPerBeat: grid subdivision (1 = quarters, 2 = eighths, 4 = sixteenths)
//   gridStart:    time of any click (grid origin)
//   latency:      seconds to subtract from every onset (calibration)
// Returns null when there are too few onsets to say anything.
export function scoreTiming(onsets, { bpm, notesPerBeat = 1, gridStart = 0, latency = 0 } = {}) {
  if (!bpm || !onsets || onsets.length < 4) return null;
  const slot = 60 / bpm / notesPerBeat;
  const deviations = onsets.map((t) => {
    const position = (t - latency - gridStart) / slot;
    return (position - Math.round(position)) * slot * 1000; // ms; negative = early
  });

  const bias = median(deviations);
  const centered = deviations.map((d) => d - bias);
  const spread = Math.sqrt(centered.reduce((sum, d) => sum + d * d, 0) / centered.length);
  const meanAbs = deviations.reduce((sum, d) => sum + Math.abs(d), 0) / deviations.length;
  // "In the pocket" window scales with the grid, capped: 16ths at 120 BPM are
  // only 125 ms apart, so a fixed wide window would be meaningless there.
  const window = Math.min(35, slot * 1000 * 0.2);
  const inPocket = centered.filter((d) => Math.abs(d) <= window).length / centered.length;

  let grade;
  if (spread <= 12) grade = 'locked';
  else if (spread <= 22) grade = 'solid';
  else if (spread <= 35) grade = 'loose';
  else grade = 'unsteady';

  return {
    count: onsets.length,
    biasMs: Math.round(bias),
    spreadMs: Math.round(spread * 10) / 10,
    meanAbsMs: Math.round(meanAbs * 10) / 10,
    inPocketPct: Math.round(inPocket * 100),
    windowMs: Math.round(window),
    grade,
    tendency: Math.abs(bias) <= 10 ? 'centered' : bias < 0 ? 'rushing' : 'dragging',
    deviations: deviations.map((d) => Math.round(d)),
  };
}

// Suggest a rep result from a timing score. The player still decides; this
// just keeps "clean" honest.
export function suggestResult(score) {
  if (!score) return null;
  if (score.grade === 'locked' || (score.grade === 'solid' && score.inPocketPct >= 80)) return 'clean';
  if (score.grade === 'unsteady') return 'miss';
  return 'shaky';
}

// Latency calibration: the mic listens to the app's own clicks.
// Returns the median delay (seconds) between each scheduled click and the
// onset the mic heard for it, or null if too few clicks were matched.
export function estimateLatency(clickTimes, onsets, maxDelay = 0.4) {
  const delays = [];
  for (const click of clickTimes) {
    const heard = onsets.find((t) => t >= click - 0.005 && t - click <= maxDelay);
    if (heard !== undefined) delays.push(heard - click);
  }
  if (delays.length < 4) return null;
  return Math.round(median(delays) * 1000) / 1000;
}
