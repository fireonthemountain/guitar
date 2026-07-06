let _ctx = null;

export function getAudioCtx() {
  if (!_ctx) {
    _ctx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (_ctx.state === 'suspended') {
    _ctx.resume();
  }
  return _ctx;
}

export function midiToFreq(midi) {
  return 440 * Math.pow(2, (midi - 69) / 12);
}

// Bandpass-filtered noise — gives a convincing plucked string timbre
function scheduleGuitarNote(freq, t, dur, ctx) {
  const len = Math.ceil(ctx.sampleRate * Math.min(dur + 0.2, 3.5));
  const buf = ctx.createBuffer(1, len, ctx.sampleRate);
  const d = buf.getChannelData(0);
  for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;

  const src = ctx.createBufferSource();
  src.buffer = buf;

  const bp = ctx.createBiquadFilter();
  bp.type = 'bandpass';
  bp.frequency.value = freq;
  bp.Q.value = Math.max(20, 80 - freq / 50); // higher Q for lower notes

  const lp = ctx.createBiquadFilter();
  lp.type = 'lowpass';
  lp.frequency.value = Math.min(freq * 6, ctx.sampleRate * 0.45);

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.75, t);
  gain.gain.exponentialRampToValueAtTime(0.001, t + dur);

  src.connect(bp);
  bp.connect(lp);
  lp.connect(gain);
  gain.connect(ctx.destination);
  src.start(t);
  src.stop(t + dur + 0.1);
}

// Additive sine synthesis — bright attack, piano-like decay
function schedulePianoNote(freq, t, dur, ctx) {
  const master = ctx.createGain();
  master.gain.setValueAtTime(0, t);
  master.gain.linearRampToValueAtTime(0.38, t + 0.007);
  master.gain.exponentialRampToValueAtTime(0.001, t + dur);
  master.connect(ctx.destination);

  [[1, 0.50], [2, 0.26], [3, 0.13], [4, 0.07], [5, 0.04]].forEach(([h, g]) => {
    const osc = ctx.createOscillator();
    const og = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.value = freq * h;
    og.gain.value = g;
    osc.connect(og);
    og.connect(master);
    osc.start(t);
    osc.stop(t + dur);
  });
}

export function scheduleMetronomeClick(t, isAccent, ctx) {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = 'sine';
  osc.frequency.value = isAccent ? 1050 : 700;
  gain.gain.setValueAtTime(isAccent ? 0.55 : 0.30, t);
  gain.gain.exponentialRampToValueAtTime(0.001, t + 0.04);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(t);
  osc.stop(t + 0.05);
}

export function playGuitarNote(midi) {
  const ctx = getAudioCtx();
  scheduleGuitarNote(midiToFreq(midi), ctx.currentTime + 0.01, 2.2, ctx);
}

export function playPianoNote(noteIdx, octave = 4) {
  const ctx = getAudioCtx();
  const midi = 12 * (octave + 1) + noteIdx;
  schedulePianoNote(midiToFreq(midi), ctx.currentTime + 0.01, 2.8, ctx);
}

// Generation counter for cancelling visual tracking without stopping audio
let _gen = 0;

export function cancelScale() {
  _gen++;
}

// Returns total duration ms. Calls onNoteStart(noteIdx) in sync with playback.
export function playScale(scaleNotes, rootIdx, bpm, instrument, onNoteStart) {
  const ctx = getAudioCtx();
  const gen = ++_gen;
  const beatDur = 60 / bpm;
  const noteDur = beatDur * 0.82;

  const asc = scaleNotes.map(note => ({ note, octave: note < rootIdx ? 5 : 4 }));
  const desc = [...asc].reverse().slice(1);
  const seq = [...asc, ...desc];

  seq.forEach(({ note, octave }, i) => {
    const t = ctx.currentTime + 0.06 + i * beatDur;
    const freq = midiToFreq(12 * (octave + 1) + note);

    if (instrument === 'piano') {
      schedulePianoNote(freq, t, noteDur, ctx);
    } else {
      scheduleGuitarNote(freq, t, noteDur, ctx);
    }

    if (onNoteStart) {
      const delayMs = Math.max(0, (t - ctx.currentTime) * 1000);
      setTimeout(() => {
        if (_gen === gen) onNoteStart(note);
      }, delayMs);
    }
  });

  const totalMs = (0.06 + seq.length * beatDur + 0.15) * 1000;

  if (onNoteStart) {
    setTimeout(() => {
      if (_gen === gen) onNoteStart(null);
    }, totalMs);
  }

  return totalMs;
}
