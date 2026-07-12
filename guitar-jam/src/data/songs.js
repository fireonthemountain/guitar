// Song-specific parts library — Dead & Company staples.
//
// Honest framing (same ethos as the rest of the app): the CHORDS are the
// standard, widely-published changes. The FORMS are section maps. The PARTS are
// ORIGINAL teaching licks written in each song's style — not transcriptions.
// They capture the moves that make a song sound like itself; learn the
// definitive versions by ear from the records. Every part is playable/loopable.

export const SONGBOOK_NOTE =
  'Chords are the standard changes; parts are original teaching licks in each song’s style. ' +
  'Learn the definitive versions by ear — that’s the real work, and the fun part.';

export const SONGS = [
  {
    id: 'ripple',
    title: 'Ripple',
    key: 'G major',
    feel: 'Gentle, folk, banjo-roll texture',
    difficulty: 'Beginner',
    about:
      'The friendliest way into the songbook. Three or four open chords, a lilting feel, and a banjo-roll texture on the G that is pure Garcia. Your set opener.',
    form: `Intro   : banjo-roll G
Verse   : G  C  G  D   (×2)
Chorus  : C  G  C  G  /  A(min)  D  G
Bridge  : "Reach out your hand…" C  G  D  C  G`,
    chords: {
      l: 'Ripple — G, C, D, plus Am and D7',
      t: `      G    C    D    Am   D7
e|----3----0----2----0----2
B|----0----1----3----1----1
G|----0----0----2----2----2
D|----0----2----0----2----0
A|----2----3----x----0----x
E|----3----x----x----x----x`,
    },
    parts: [
      {
        l: 'The banjo-roll texture on G — pick, middle, ring',
        t: `e|------0------0------0---
B|----0------0------0-----
D|--0------0------0-------`,
      },
      {
        l: 'A line-ending fill — G major pentatonic, resolving home',
        t: `e|--3--------------
B|-----3--0--------
G|-----------2--0--`,
      },
    ],
    tips: [
      'Comp the verses with top-three-string triads, not big barre chords — lighter, more Dead.',
      'End each vocal line with a small fill that lands on a chord tone of the next chord.',
      'The banjo roll goes on the G chords; let every string ring into the next.',
    ],
  },
  {
    id: 'fotd',
    title: 'Friend of the Devil',
    key: 'G major',
    feel: 'Bright, bluegrass bounce',
    difficulty: 'Beginner–Intermediate',
    about:
      'Opens with its famous descending run — that intro IS lead guitar, and it announces the song before a word is sung. Learn it cold; it opens your set.',
    form: `Intro   : descending G run (below)
Verse   : G  D  Am  G   /  G  D  Am  C  G
Bridge  : "Got two reasons…" E  A  D  (walk it up)`,
    chords: {
      l: 'Friend of the Devil — G, D, Am, C',
      t: `      G    D    Am   C
e|----3----2----0----0
B|----0----3----1----1
G|----0----2----2----0
D|----0----0----2----2
A|----2----x----0----3
E|----3----x----x----x`,
    },
    parts: [
      {
        l: 'The descending intro run — teaching version, full G octave down',
        t: `e|--3--2--0-------------------
B|----------3--1--0-----------
G|-------------------2--0-----`,
      },
      {
        l: 'The bass walk under the bridge — E to A',
        t: `E|--0--2--4--
A|-----------`,
      },
    ],
    tips: [
      'Pick the bass note before each verse strum — it gives the bluegrass bounce.',
      'The intro run is G major descending: G F# E D C B A G. Say the notes as you learn it.',
      'Keep the intro clean over fast — clean always wins on stage.',
    ],
  },
  {
    id: 'sugaree',
    title: 'Sugaree',
    key: 'B major',
    feel: 'Slow, greasy, built for lead',
    difficulty: 'Intermediate',
    about:
      'The closer, and the best lead vehicle of the set. Mid-tempo, tons of space, and double-stop fills between the vocal lines. This is where you get your 8-bar solo break.',
    form: `Verse   : B  .  .  .  |  B  .  .  .  |  E  .  .  .  |  B  .  .  .
Turn    : F#7  E  B   (the "just don't tell them…" lift)
Solo    : one full verse form — build one idea`,
    chords: {
      l: 'Sugaree — B, E, F#7',
      t: `      B    E    F#7
e|----2----0----2
B|----4----0----5
G|----4----1----3
D|----4----2----2
A|----2----2----4
E|----x----0----2`,
    },
    parts: [
      {
        l: 'Double-stop 3rds fill — the sweet, vocal Jerry sound',
        t: `B|--4--5--
G|--4--6--`,
      },
      {
        l: 'A descending fill from the B "Jerry box" (major pentatonic)',
        t: `e|--7--4--------------
B|--------7--4--------
G|--------------6--4--`,
      },
    ],
    tips: [
      'Leave real space — Sugaree breathes. Fills answer the vocal, then get out of the way.',
      'For the solo break: pick ONE motif and develop it across the 8 bars. Do not empty the whole toolbox.',
      'Target the 3rd (D#) when the B chord lands — that is the sweetest note in the room.',
    ],
  },
  {
    id: 'ujb',
    title: "Uncle John's Band",
    key: 'G major',
    feel: 'Warm, campfire, then tricky middle',
    difficulty: 'Intermediate',
    about:
      'A candidate closer. The verses are a folk campfire; the "Goddamn well" middle section shifts feel and keeps you honest. Hum the melody and decorate it.',
    form: `Verse   : G  C  Am  G   ("Well the first days are the hardest…")
Refrain : C  G  /  C  G  /  F  C  (…let me know your name)
Middle  : F  C   (the odd-time "Whoa-oh, what I want to know…")`,
    chords: {
      l: "Uncle John's Band — G, C, Am, D, F",
      t: `      G    C    Am   D    F
e|----3----0----0----2----1
B|----0----1----1----3----1
G|----0----0----2----2----2
D|----0----2----2----0----3
A|----2----3----0----x----3
E|----3----x----x----x----1`,
    },
    parts: [
      {
        l: 'Melody-decoration lick — G major pentatonic',
        t: `e|--3--------------
B|-----3--0--------
G|-----------2--0--`,
      },
    ],
    tips: [
      'Start your solo from the vocal melody, then decorate it — that is the whole Garcia move.',
      'Comp with triads; the arrangement is already busy with harmony vocals.',
      'The middle section changes feel — count it out loud until it stops fighting you.',
    ],
  },
  {
    id: 'fire',
    title: 'Fire on the Mountain',
    key: 'B Mixolydian',
    feel: 'Two-chord vamp, endless groove',
    difficulty: 'Intermediate',
    about:
      'Two chords — B to A — around and around forever. With no form to track, everything is phrasing, space, and dynamics. The purest test of taste in the book.',
    form: `Vamp    : |  B  .  .  .  |  A  .  .  .  |  (repeat, forever)
Head    : the vocal melody sits right on top of the vamp
Solo    : same two chords — build waves, don't race`,
    chords: {
      l: 'Fire on the Mountain — the B–A vamp',
      t: `      B    A
e|----2----0
B|----4----2
G|----4----2
D|----4----2
A|----2----0
E|----x----x`,
    },
    parts: [
      {
        l: 'A B-major-pentatonic phrase over the vamp',
        t: `e|--7--9--7--------
B|-----------7--4--`,
      },
      {
        l: 'Land the b7 (A) for the Mixolydian color',
        t: `G|--8--6--4----
D|----------7--`,
      },
    ],
    tips: [
      'Use the Backing vamp tool (Fire B–A) and solo over it — five minutes, no stopping.',
      'Repetition is the point: five notes force real phrasing. Milk one idea.',
      'Two beats of silence between phrases. Uncomfortable means you are doing it right.',
    ],
  },
  {
    id: 'franklins',
    title: "Franklin's Tower",
    key: 'A Mixolydian',
    feel: 'Rolling, joyful, three chords',
    difficulty: 'Intermediate',
    about:
      'A, G, D rolling around A Mixolydian. Slightly more motion than Fire, which nudges your note choices. Endless and euphoric when the groove locks.',
    form: `Vamp    : |  A  .  .  .  |  A  .  .  .  |  G  .  .  .  |  D  .  .  .
Head    : "Roll away… the dew" over the changes
Solo    : ride the A Mixolydian, target chord tones on G and D`,
    chords: {
      l: "Franklin's Tower — A, G, D",
      t: `      A    G    D
e|----0----3----2
B|----2----0----3
G|----2----0----2
D|----2----0----0
A|----0----2----x
E|----x----3----x`,
    },
    parts: [
      {
        l: 'A-major-pentatonic rolling lick',
        t: `e|--5--7--5--------
B|-----------5--7--`,
      },
    ],
    tips: [
      'Use the Backing vamp tool (Franklin\'s A-A-G-D) to practice the changes.',
      'When the chord moves to G or D, aim a chord tone right on the change — Week 7 pays off here.',
      'Keep it light and bouncing; this song smiles.',
    ],
  },
  {
    id: 'scarlet',
    title: 'Scarlet Begonias',
    key: 'B / A (jam)',
    feel: 'Sunny lilt into an open A jam',
    difficulty: 'Intermediate–Advanced',
    about:
      'A bright verse in B that opens into a wide A-Mixolydian jam (and, on a good night, straight into Fire). The verse changes are your arpeggio-targeting exam.',
    form: `Verse   : B  .  |  A  .  |  B  .  |  A  .  |  E  .  .  .
Jam     : vamp on A — long, patient, building
(often segues → Fire on the Mountain)`,
    chords: {
      l: 'Scarlet Begonias — B, A, E',
      t: `      B    A    E
e|----2----0----0
B|----4----2----0
G|----4----2----1
D|----4----2----2
A|----2----0----2
E|----x----x----0`,
    },
    parts: [
      {
        l: 'B major arpeggio — for targeting the changes',
        t: `G|------------4--
D|-----1--4------
A|--2------------`,
      },
      {
        l: 'A-Mixolydian jam phrase',
        t: `e|--5--7--5--------
B|-----------5--7--`,
      },
    ],
    tips: [
      'The verse moves quickly between B and A — outline each chord, do not just run one scale.',
      'The jam is on A: patient, wave-shaped, build to one peak and release.',
      'Practice the segue feel — Scarlet loves to roll into Fire.',
    ],
  },
  {
    id: 'bertha',
    title: 'Bertha',
    key: 'G major',
    feel: 'Fast, driving, a train that keeps rolling',
    difficulty: 'Intermediate',
    about:
      'A up-tempo romp. The tempo exposes hesitation, so simplify — triads and muted strums keep the train on the rails while you solo in G.',
    form: `Verse   : G  C  D  G   (drive it)
Chorus  : "Any more, any more…"  C  G  D
Solo    : G major — energy over density`,
    chords: {
      l: 'Bertha — G, C, D',
      t: `      G    C    D
e|----3----0----2
B|----0----1----3
G|----0----0----2
D|----0----2----0
A|----2----3----x
E|----3----x----x`,
    },
    parts: [
      {
        l: 'A fast G-major-pentatonic lick',
        t: `e|--3--5--3--------
B|-----------3--5--`,
      },
    ],
    tips: [
      'At tempo, simplify the rhythm — muted strums keep the groove without clutter.',
      'When you flub, keep the right hand moving and absorb it — never restart.',
      'Energy beats density here. A few well-placed notes carry further than a flurry.',
    ],
  },
];
