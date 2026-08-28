// Imported from the Complete Acoustic Guitar Method (Wide Edition) — the
// distinct, non-filler material: groove vocabulary, color chords, theory
// references, listening studies, and the weekly day-role cycle.

// ── The weekly day cycle (book: mechanics → groove → application →
//    improvisation → record) mapped onto our 7-day weeks ──────────────────
export const DAY_ROLES = [
  { name: 'Mechanics', hint: 'Slow and correct — build the movement' },
  { name: 'Groove', hint: 'Same material, now it has to feel good' },
  { name: 'Application', hint: 'Use it inside real music' },
  { name: 'Improvise', hint: 'Bend it — vary, recover, play' },
  { name: 'Record', hint: 'Two minutes on camera, one take' },
  { name: 'Polish', hint: 'Consolidate the week\'s wins' },
  { name: 'Assess', hint: 'Grade the week honestly' },
];

// ── Strumming grooves (playable through the strum engine) ─────────────────
// slots: 8 = a bar of eighths (6 = waltz/6-8 feels). D down, U up, B bass
// string only, x muted chunk, - rest.
export const GROOVES = [
  { id: 'folk', name: 'Folk (workhorse)', count: '1 & 2 & 3 & 4 &', slots: ['D', '-', 'D', 'U', '-', 'U', 'D', 'U'] },
  { id: 'ballad', name: 'Ballad', count: '1 & 2 & 3 & 4 &', slots: ['D', '-', '-', 'U', 'D', '-', '-', 'U'] },
  { id: 'half', name: 'Half-time', count: '1 & 2 & 3 & 4 &', slots: ['D', '-', '-', '-', 'D', 'U', '-', 'U'] },
  { id: 'country', name: 'Country (boom-strum)', count: '1 & 2 & 3 & 4 &', slots: ['B', '-', 'D', 'U', 'B', '-', 'D', 'U'] },
  { id: 'bass', name: 'Bass / strum', count: '1 & 2 & 3 & 4 &', slots: ['B', 'D', 'U', '-', 'B', 'D', 'U', '-'] },
  { id: 'shuffle', name: 'Shuffle (swing it)', count: '1 a 2 a 3 a 4 a', slots: ['D', 'U', 'D', 'U', 'D', 'U', 'D', 'U'] },
  { id: 'stop', name: 'Stop groove', count: '1 & 2 & (stop)', slots: ['D', 'U', 'D', '-', 'x', '-', '-', '-'] },
  { id: 'waltz', name: 'Waltz (3/4)', count: '1 & 2 & 3 &', slots: ['D', '-', 'D', 'U', 'D', 'U'] },
  { id: 'sixeight', name: '6/8', count: '1 2 3 4 5 6', slots: ['D', '-', 'U', 'D', '-', 'U'] },
];

// ── Color chords — the shapes that make strummed songs sound arranged ─────
export const COLOR_CHORDS = {
  l: 'Color chords — sus, add & slash shapes (swap them in for their plain cousins)',
  t: `      Cadd9 Dsus2 Dsus4 Asus2 Asus4 Em7  G/B  D/F# Fmaj7
e|----3-----0-----3-----0-----0----0----3----2----0--
B|----3-----3-----3-----0-----3----3----3----3----1--
G|----0-----2-----2-----2-----2----0----0----2----2--
D|----2-----0-----0-----2-----2----2----0----0----3--
A|----3-----x-----x-----0-----0----2----2----x----x--
E|----x-----x-----x-----x-----x----0----x----2----x--`,
};

// ── Theory & capo reference (rendered as plain charts) ────────────────────
export const CAPO_CHART = `shape   capo1  capo2  capo3  capo4  capo5
C   →   Db     D      Eb     E      F
G   →   Ab     A      Bb     B      C
D   →   Eb     E      F      F#     G
A   →   Bb     B      C      C#     D
E   →   F      F#     G      Ab     A

Song fights your voice? Keep the easy shapes,
move the capo until singing feels comfortable.`;

export const CHORD_FAMILIES = `key   I    ii    iii   IV   V    vi
C  →  C    Dm    Em    F    G    Am
G  →  G    Am    Bm    C    D    Em
D  →  D    Em    F#m   G    A    Bm
A  →  A    Bm    C#m   D    E    F#m
E  →  E    F#m   G#m   A    B    C#m

The six chords in a row = every chord a song
in that key is likely to use.`;

export const NASHVILLE = `I-V-vi-IV    G-D-Em-C     (half of pop radio)
I-IV-V       G-C-D        (folk & rock)
vi-IV-I-V    Em-C-G-D     (the moody cousin)
I-vi-IV-V    C-Am-F-G     (doo-wop / 50s)
ii-V-I       Dm-G-C       (the jazz cadence)
I-bVII-IV    G-F-C        (classic rock)
I-IV-I-V     E-A-E-B7     (12-bar skeleton)

Numbers, not letters: G-C-D is I-IV-V in G,
so D-G-A is the SAME song in D. Learn the
relationships and transposing is mechanical.`;

// ── Listening studies — one real song per week, one thing to hear ─────────
export const LISTENING = {
  3: { song: 'Fast Car — Tracy Chapman', focus: 'One folk figure repeats almost the whole song. Notice how little it changes — and how much the song moves anyway.' },
  4: { song: 'Landslide — Fleetwood Mac', focus: 'A repeating arpeggio as the entire accompaniment. Hear the picking pattern stay steady under the vocal.' },
  5: { song: 'Dust in the Wind — Kansas', focus: 'Rolling fingerpicking — the same engine you\'re learning. Hear the thumb hold the pulse.' },
  6: { song: 'Freight Train — Elizabeth Cotten', focus: 'Alternating-bass Travis picking. The thumb is a metronome; everything else decorates it.' },
  7: { song: 'Deep River Blues — Doc Watson', focus: 'Syncopated blues over an alternating bass. Hear which layer stays constant while the other one plays.' },
  8: { song: 'The Boxer — Simon & Garfunkel', focus: 'Steady fingerpicking serving a song — texture as accompaniment, never as a solo.' },
  9: { song: 'Tears in Heaven — Eric Clapton', focus: 'Chord melody: the tune lives on top of the chords. Follow the highest note.' },
  10: { song: 'Fire and Rain — James Taylor', focus: 'Thumb-led embellishment — little hammer-ons decorating plain chords. Ideas to steal for your set.' },
  11: { song: 'Never Going Back Again — Fleetwood Mac', focus: 'Cross-string independence at performance level. Listen for the calm in something so busy.' },
  12: { song: 'Blackbird — The Beatles', focus: 'Moving intervals over an open string. Simple parts, total control — the goal of your taper week.' },
};
