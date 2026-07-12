let _ctx = null;
let _master = null;
let _volume = null;

export function getAudioCtx() {
  if (!_ctx) {
    _ctx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (_ctx.state === 'suspended') {
    _ctx.resume();
  }
  return _ctx;
}

// Browsers create the AudioContext suspended until a user gesture. resume() is
// async, so the very first Play can be scheduled while still suspended → silent.
// Unlock on the first pointer/key event so audio is already running by the time
// any button is clicked, and kick a 1-sample buffer for iOS/Safari.
let _unlocked = false;
export function unlockAudio() {
  const ctx = getAudioCtx();
  if (ctx.state === 'suspended') ctx.resume();
  if (_unlocked) return;
  try {
    const src = ctx.createBufferSource();
    src.buffer = ctx.createBuffer(1, 1, 22050);
    src.connect(ctx.destination);
    src.start(0);
    _unlocked = true;
  } catch {}
}

let _armed = false;
export function armAudioUnlock() {
  if (_armed || typeof window === 'undefined') return;
  _armed = true;
  const evs = ['pointerdown', 'touchend', 'keydown'];
  const h = () => {
    unlockAudio();
    // Once unlocked, stop listening — no need to create a node on every event.
    if (_unlocked) evs.forEach((e) => window.removeEventListener(e, h));
  };
  evs.forEach((e) => window.addEventListener(e, h, { passive: true }));
}

// Master volume: every note + the metronome route through this gain node, so a
// single slider controls everything. Persisted across sessions.
export function getMasterVolume() {
  if (_volume === null) {
    const stored = parseFloat(localStorage.getItem('guitar-jam-volume'));
    _volume = Number.isFinite(stored) ? stored : 0.9;
  }
  return _volume;
}

export function setMasterVolume(v) {
  _volume = Math.max(0, Math.min(1, v));
  try { localStorage.setItem('guitar-jam-volume', String(_volume)); } catch {}
  if (_master) _master.gain.value = _volume;
  if (_click) _click.gain.value = _volume;
}

function getMaster() {
  const ctx = getAudioCtx();
  if (!_master) {
    _master = ctx.createGain();
    _master.gain.value = getMasterVolume();
    // Limiter so we can drive the output hot (louder overall) without harsh
    // clipping when several notes stack into a chord.
    const limiter = ctx.createDynamicsCompressor();
    limiter.threshold.value = -3;
    limiter.knee.value = 6;
    limiter.ratio.value = 20;
    limiter.attack.value = 0.002;
    limiter.release.value = 0.15;
    _master.connect(limiter);
    limiter.connect(ctx.destination);
  }
  return _master;
}

// Metronome clicks use their own bus — volume-controlled but NOT run through the
// limiter, so a loud guitar chord can never duck the click. Keeps the beat solid.
let _click = null;
function getClickBus() {
  const ctx = getAudioCtx();
  if (!_click) {
    _click = ctx.createGain();
    _click.gain.value = getMasterVolume();
    _click.connect(ctx.destination);
  }
  return _click;
}

// Click track that belongs to a scale/tab PLAYBACK (count-in + beat clicks). It
// feeds the volume-controlled click bus but is its own node, so cancelScale()
// can cut it when you press Stop — without touching the standalone metronome.
let _pbClick = null;
function getPlaybackClickBus() {
  const ctx = getAudioCtx();
  if (!_pbClick) { _pbClick = ctx.createGain(); _pbClick.connect(getClickBus()); }
  return _pbClick;
}
function killPlaybackClick() {
  if (_pbClick) { try { _pbClick.disconnect(); } catch {} _pbClick = null; }
}

// Melody bus: scale/tab playback routes through this so cancelScale() can cut
// ALL scheduled-but-not-yet-sounded notes at once (loops schedule audio ahead).
// Disconnecting silences everything on it; a fresh one is made on next play.
let _melody = null;
function getMelodyBus() {
  const ctx = getAudioCtx();
  if (!_melody) { _melody = ctx.createGain(); _melody.connect(getMaster()); }
  return _melody;
}
function killMelody() {
  if (_melody) { try { _melody.disconnect(); } catch {} _melody = null; }
}

export function midiToFreq(midi) {
  return 440 * Math.pow(2, (midi - 69) / 12);
}

// Bandpass-filtered noise — gives a convincing plucked string timbre
function scheduleGuitarNote(freq, t, dur, ctx, dest) {
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
  gain.gain.setValueAtTime(1.3, t);
  gain.gain.exponentialRampToValueAtTime(0.001, t + dur);

  src.connect(bp);
  bp.connect(lp);
  lp.connect(gain);
  gain.connect(dest || getMaster());
  src.start(t);
  src.stop(t + dur + 0.1);
}

// Additive sine synthesis — bright attack, piano-like decay
function schedulePianoNote(freq, t, dur, ctx, dest) {
  const master = ctx.createGain();
  master.gain.setValueAtTime(0, t);
  master.gain.linearRampToValueAtTime(0.55, t + 0.007);
  master.gain.exponentialRampToValueAtTime(0.001, t + dur);
  master.connect(dest || getMaster());

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

export function scheduleMetronomeClick(t, isAccent, ctx, dest) {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = 'sine';
  osc.frequency.value = isAccent ? 1050 : 700;
  gain.gain.setValueAtTime(isAccent ? 0.55 : 0.30, t);
  gain.gain.exponentialRampToValueAtTime(0.001, t + 0.04);
  osc.connect(gain);
  gain.connect(dest || getClickBus());
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
  killMelody();
  killPlaybackClick();
}

// Returns total duration ms. Calls onNoteStart(noteIdx) in sync with playback.
export function playScale(scaleNotes, rootIdx, bpm, instrument, onNoteStart, click = false) {
  const ctx = getAudioCtx();
  const gen = ++_gen;
  killMelody();
  killPlaybackClick();
  const bus = getMelodyBus();
  const pbClick = getPlaybackClickBus();
  const beatDur = 60 / bpm;
  const noteDur = beatDur * 0.82;

  const asc = scaleNotes.map(note => ({ note, octave: note < rootIdx ? 5 : 4 }));
  const desc = [...asc].reverse().slice(1);
  const seq = [...asc, ...desc];

  seq.forEach(({ note, octave }, i) => {
    const t = ctx.currentTime + 0.06 + i * beatDur;
    const freq = midiToFreq(12 * (octave + 1) + note);

    if (instrument === 'piano') {
      schedulePianoNote(freq, t, noteDur, ctx, bus);
    } else {
      scheduleGuitarNote(freq, t, noteDur, ctx, bus);
    }

    if (click) scheduleMetronomeClick(t, i % 4 === 0, ctx, pbClick);

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

// Play parsed tab steps (from tabParser). One step per beat; chords are lightly
// strummed low-to-high. onStep(i) fires as each step sounds; onStep(null) at end.
// Reuses the same generation counter, so cancelScale() also stops a tab.
// opts: { bpm, instrument, loops, countIn, tempoStep, tempoMax }
//   loops     — repeat the whole tab this many times (Infinity for until-stop)
//   countIn   — click one bar (4 beats) before the first loop
//   tempoStep — add this many BPM each loop (tempo trainer), capped at tempoMax
// onStep(stepIndexOrNull, meta) fires per step; meta carries { loop, loops, bpm },
//   { countIn: beatsLeft } during the count-in, or { done: true } at the end.
export function playTab(steps, opts, onStep) {
  const { bpm = 70, instrument = 'guitar', loops = 1, countIn = false, tempoStep = 0, tempoMax = 400, click = false } = opts || {};
  const ctx = getAudioCtx();
  const gen = ++_gen;
  killMelody();
  killPlaybackClick();
  const bus = getMelodyBus();
  const pbClick = getPlaybackClickBus();
  const now = ctx.currentTime;
  let t = now + 0.12;

  // How many loops to actually schedule up front (bound the "until-stop" case).
  const scheduled = Number.isFinite(loops) ? loops : 64;

  const fire = (whenSec, fn) => {
    const ms = Math.max(0, (whenSec - now) * 1000);
    setTimeout(() => { if (_gen === gen) fn(); }, ms);
  };

  if (countIn) {
    const beat = 60 / bpm;
    for (let b = 0; b < 4; b++) {
      scheduleMetronomeClick(t, b === 0, ctx, pbClick);
      const tt = t;
      fire(tt, () => onStep && onStep(null, { countIn: 4 - b }));
      t += beat;
    }
  }

  for (let l = 0; l < scheduled; l++) {
    const curBpm = Math.min(tempoMax, bpm + l * tempoStep);
    const beat = 60 / curBpm;
    const noteDur = beat * 0.9;

    steps.forEach((step, i) => {
      const t0 = t + i * beat;
      const isChord = step.notes.length > 1;
      step.notes.forEach((n) => {
        // Strum: low strings (higher stringIdx) a hair before high ones.
        const tn = t0 + (isChord ? (5 - n.stringIdx) * 0.011 : 0);
        const freq = midiToFreq(n.midi);
        if (instrument === 'piano') schedulePianoNote(freq, tn, noteDur, ctx, bus);
        else scheduleGuitarNote(freq, tn, noteDur, ctx, bus);
      });
      if (click) scheduleMetronomeClick(t0, i % 4 === 0, ctx, pbClick); // beat locked to each note
      fire(t0, () => onStep && onStep(i, { loop: l + 1, loops: scheduled, bpm: curBpm }));
    });

    t += steps.length * beat + beat * 0.35; // brief breath between loops
  }

  fire(t, () => onStep && onStep(null, { done: true }));
  return (t - now) * 1000;
}

// ── Backing vamp / drone ──────────────────────────────────────────────────
// Standard open-chord voicings as MIDI notes (low→high), for practicing over.
export const CHORDS = {
  E: [40, 47, 52, 56, 59, 64], A: [45, 52, 57, 61, 64], D: [50, 57, 62, 66],
  G: [43, 47, 50, 55, 59, 67], C: [48, 52, 55, 60, 64], B: [47, 54, 59, 63, 66],
  Em: [40, 47, 52, 55, 59, 64], Am: [45, 52, 57, 61, 64],
  E7: [40, 47, 50, 56, 59, 64], A7: [45, 52, 55, 61, 64], B7: [47, 51, 57, 59, 66],
};

let _vampTimer = null;
let _vampGen = 0;

export function stopVamp() {
  _vampGen++;
  if (_vampTimer) { clearInterval(_vampTimer); _vampTimer = null; }
}

// Loop a chord sequence indefinitely (one bar each) until stopVamp(). Strums on
// beats 1 and 3. seq is an array of { name, midis }. onChange(index) fires per bar.
export function playVamp(seq, bpm, onChange) {
  stopVamp();
  const gen = ++_vampGen;
  const ctx = getAudioCtx();
  const beat = 60 / bpm;
  const bar = beat * 4;
  const noteDur = beat * 2 * 0.92;
  let idx = 0;
  let nextTime = ctx.currentTime + 0.1;

  const strum = (midis, at) => midis.forEach((m, k) => scheduleGuitarNote(midiToFreq(m), at + k * 0.02, noteDur, ctx));

  const tick = () => {
    const now = ctx.currentTime;
    while (nextTime < now + 0.35) {
      const chord = seq[idx % seq.length];
      strum(chord.midis, nextTime);        // beat 1
      strum(chord.midis, nextTime + 2 * beat); // beat 3
      const captured = idx % seq.length;
      const delay = Math.max(0, (nextTime - now) * 1000);
      setTimeout(() => { if (_vampGen === gen) onChange && onChange(captured); }, delay);
      idx++;
      nextTime += bar;
    }
  };

  tick();
  _vampTimer = setInterval(tick, 130);
}

// Play a strum pattern (8 eighth-note slots per bar) on a chord, looping `bars`.
// slots: 'D' down, 'U' up, 'B' bass-note-only, 'x' muted chunk, '-' rest.
// A soft click marks each quarter beat. onSlot(slotIndex|null) tracks position.
export function playStrum(slots, bpm, chordMidis, bars, onSlot) {
  const ctx = getAudioCtx();
  const gen = ++_gen;
  killMelody();
  killPlaybackClick();
  const bus = getMelodyBus();
  const pbClick = getPlaybackClickBus();
  const now = ctx.currentTime;
  const eighth = 60 / bpm / 2;
  const base = now + 0.12;
  const total = slots.length * bars;

  for (let i = 0; i < total; i++) {
    const slot = slots[i % slots.length];
    const t = base + i * eighth;
    if (slot === 'D' || slot === 'U') {
      const order = slot === 'D' ? chordMidis : [...chordMidis].reverse(); // down = low→high
      order.forEach((m, k) => scheduleGuitarNote(midiToFreq(m), t + k * 0.013, eighth * 1.7, ctx, bus));
    } else if (slot === 'B') {
      scheduleGuitarNote(midiToFreq(chordMidis[0]), t, eighth * 1.7, ctx, bus);
    } else if (slot === 'x') {
      chordMidis.forEach((m, k) => scheduleGuitarNote(midiToFreq(m), t + k * 0.008, 0.055, ctx, bus)); // muted chunk
    }
    if (i % 2 === 0) scheduleMetronomeClick(t, i % slots.length === 0, ctx, pbClick); // quarter-beat click

    if (onSlot) {
      const delay = Math.max(0, (t - now) * 1000);
      setTimeout(() => { if (_gen === gen) onSlot(i % slots.length); }, delay);
    }
  }

  const totalMs = (total * eighth + 0.35) * 1000;
  if (onSlot) setTimeout(() => { if (_gen === gen) onSlot(null); }, totalMs);
  return totalMs;
}
