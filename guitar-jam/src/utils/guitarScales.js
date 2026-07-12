export const NOTE_NAMES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

export const SCALE_TYPES = {
  'Pentatonic Minor': {
    intervals: [0, 3, 5, 7, 10],
    description: 'The essential rock & blues scale. 5 notes make it easy to learn and improvise over virtually any progression.',
    difficulty: 'Beginner',
    tips: [
      'Learn Position 1 (box shape) first — 5th fret for A',
      'Connect positions by sliding between them chromatically',
      'Bend the 3rd and 7th scale degrees for blues expression',
    ],
  },
  'Pentatonic Major': {
    intervals: [0, 2, 4, 7, 9],
    description: 'Bright and uplifting. Country, pop, and folk staple. Same shape as minor pentatonic — just start 3 frets higher.',
    difficulty: 'Beginner',
    tips: [
      'Relative to minor pentatonic: A minor pent = C major pent',
      'Great for playing over I, IV, V chord progressions',
      'Add slides and hammer-ons for a country feel',
    ],
  },
  'Natural Minor': {
    intervals: [0, 2, 3, 5, 7, 8, 10],
    description: 'The Aeolian mode. Dark and emotional, foundational to rock, metal, and classical guitar.',
    difficulty: 'Beginner',
    tips: [
      'Contains the pentatonic minor scale + 2 extra notes (2nd and 6th)',
      'Practice in 3-note-per-string patterns for speed',
      'The 6th degree gives it a distinctly classical sound',
    ],
  },
  'Major': {
    intervals: [0, 2, 4, 5, 7, 9, 11],
    description: 'The Ionian mode. Bright and foundational. Every musician must internalize this scale in all keys.',
    difficulty: 'Beginner',
    tips: [
      'Learn the CAGED system to find it all over the neck',
      'Practice ascending and descending slowly with a metronome',
      'Emphasize chord tones (1, 3, 5) when improvising',
    ],
  },
  'Blues': {
    intervals: [0, 3, 5, 6, 7, 10],
    description: 'Pentatonic minor with a chromatic "blue note" (b5). The defining sound of blues and rock guitar.',
    difficulty: 'Intermediate',
    tips: [
      'The b5 is a passing tone — land on the 5th after it',
      'Bend the blue note up to the 5th for classic blues licks',
      'Works over dominant 7th chords and minor blues progressions',
    ],
  },
  'Dorian': {
    intervals: [0, 2, 3, 5, 7, 9, 10],
    description: 'Natural minor with a raised 6th. Soulful and jazzy — Santana, Miles Davis, and Carlos Santana\'s signature.',
    difficulty: 'Intermediate',
    tips: [
      'The raised 6th is what gives Dorian its open, less gloomy feel',
      'Use over minor 7th chords in jazz and fusion',
      'Try it over a minor IV chord — the 6th lights up perfectly',
    ],
  },
  'Mixolydian': {
    intervals: [0, 2, 4, 5, 7, 9, 10],
    description: 'Major scale with a flatted 7th. The dominant scale — blues-rock gold used in classic rock riffs.',
    difficulty: 'Intermediate',
    tips: [
      'Use over dominant 7th chords (G7, A7, D7)',
      'The b7 creates tension that wants to resolve down',
      'Classic rock riffs (Hendrix, Page) often live in Mixolydian',
    ],
  },
};

// Open string notes (high e to low E display order)
// Index into NOTE_NAMES: C=0, C#=1, D=2, D#=3, E=4, F=5, F#=6, G=7, G#=8, A=9, A#=10, B=11
export const OPEN_STRING_NOTES = [4, 11, 7, 2, 9, 4]; // e, B, G, D, A, E
export const STRING_NAMES = ['e', 'B', 'G', 'D', 'A', 'E'];

// MIDI note numbers for open strings (high e to low E)
export const OPEN_STRING_MIDI = [64, 59, 55, 50, 45, 40];

export function getNoteAtFret(stringIdx, fret) {
  return (OPEN_STRING_NOTES[stringIdx] + fret) % 12;
}

export function getMidiAtFret(stringIdx, fret) {
  return OPEN_STRING_MIDI[stringIdx] + fret;
}

// Fret where the root note first appears on the low E string
export function getRootFretOnLowE(rootIdx) {
  return (rootIdx - 4 + 12) % 12; // low E open = E (noteIdx 4)
}

// Returns the 5 traditional pentatonic box positions + a "Full" view
// Each window shows a 5-fret range to focus practice
export function getPositionWindows(rootIdx) {
  const r = getRootFretOnLowE(rootIdx);
  // Offsets (from root fret on low E) for each pentatonic box shape
  const boxOffsets = [0, 3, 5, 7, 10];
  return [
    { label: 'Full', minFret: 0, maxFret: 12 },
    ...boxOffsets.map((offset, i) => ({
      label: `Box ${i + 1}`,
      minFret: r + offset,
      maxFret: r + offset + 4,
    })),
  ];
}

export function getScaleNotes(rootIdx, scaleType) {
  return SCALE_TYPES[scaleType].intervals.map(i => (rootIdx + i) % 12);
}

// The scale as an ascending run within one fret window (a box position): walk
// low string → high string, low fret → high fret. Returns playable positions
// [{ stringIdx, fret, midi, note }] — used to play a scale IN position and to
// "walk the neck" box by box.
export function getPositionRun(scaleNotes, minFret, maxFret) {
  const run = [];
  for (let si = 5; si >= 0; si--) {           // low E (5) up to high e (0)
    for (let fret = Math.max(0, minFret); fret <= maxFret; fret++) {
      const note = getNoteAtFret(si, fret);
      if (scaleNotes.includes(note)) {
        run.push({ stringIdx: si, fret, midi: getMidiAtFret(si, fret), note });
      }
    }
  }
  return run;
}

// 5 sessions per day, cycling through keys weekly (perfect 4th = 5 semitones)
const BASE_SESSIONS = [
  { rootIdx: 9, type: 'Pentatonic Minor' },
  { rootIdx: 0, type: 'Major' },
  { rootIdx: 4, type: 'Natural Minor' },
  { rootIdx: 7, type: 'Pentatonic Major' },
  { rootIdx: 9, type: 'Blues' },
];

export function getDailySessions() {
  const today = new Date();
  const startOfYear = new Date(today.getFullYear(), 0, 1);
  const dayOfYear = Math.floor((today - startOfYear) / 86400000);
  const weekNum = Math.floor(dayOfYear / 7);

  return BASE_SESSIONS.map((s, i) => ({
    sessionNum: i + 1,
    rootIdx: (s.rootIdx + weekNum * 5) % 12,
    type: s.type,
  }));
}

export function getTodayKey() {
  return new Date().toISOString().slice(0, 10);
}

export function getCompletedSessions() {
  const key = `guitar-sessions-${getTodayKey()}`;
  try {
    return JSON.parse(localStorage.getItem(key) || '[]');
  } catch {
    return [];
  }
}

export function markSessionComplete(sessionNum) {
  const key = `guitar-sessions-${getTodayKey()}`;
  const completed = getCompletedSessions();
  if (!completed.includes(sessionNum)) {
    completed.push(sessionNum);
    localStorage.setItem(key, JSON.stringify(completed));
  }
  return completed;
}
