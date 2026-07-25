// Licks & fingerpicking for Stage Ready 90 — the "texture track."
// Each unlocks at a week and stays available; every tab is playable (▶) and
// follows the repo convention: top line = high e string.
// These are the moves that turn three strummed songs into a set worth hearing:
// a bass-strum groove, two fingerpicking seeds, a walkup, a fill, a turnaround.

export const TEXTURES = [
  {
    week: 3,
    l: 'Boom-chick on G — bass note, then strum',
    t: `e|--------3--------3--
B|--------0--------0--
G|--------0--------0--
D|--------0--------0--
A|--------------------
E|--3--------3--------`,
    tip: 'Thumb-side of the pick hits just the low string (boom), then a light strum (chick). Instantly makes plain strumming sound arranged. Works on any chord — bass note is the chord\'s root.',
  },
  {
    week: 4,
    l: 'First fingerpicking — G arpeggio, up and over',
    t: `e|--------------3---------
B|-----------0-----0------
G|--------0-----------0---
D|-----0-----------------0
A|------------------------
E|--3---------------------`,
    tip: 'Thumb takes the E and D strings, index the G, middle the B, ring the high e. Fingertips, not nails. Slow and perfectly even beats fast and lumpy — this is a texture for quiet verses.',
  },
  {
    week: 5,
    l: 'The campfire walkup — G to C',
    t: `e|------------------0--
B|------------------1--
G|------------------0--
D|------------------2--
A|-------0--2-------3--
E|--3------------------`,
    tip: 'Play it in the last bar before the change: bass G, then walk A–B up the A string and land on C on beat 1. The single most useful move in strummed folk/rock — reverse it to walk back down.',
  },
  {
    week: 6,
    l: 'Travis seed — alternating thumb on C',
    t: `e|------------------------0--
B|-----------1---------------
G|-----0---------------0-----
D|--------2---------2--------
A|--3------------3-----------
E|---------------------------`,
    tip: 'The thumb alternates A and D strings like a metronome — that\'s the whole secret of Travis picking. Fingers decorate on the off-beats. When the thumb runs itself, add the pinch.',
  },
  {
    week: 7,
    l: 'Em pocket fill — open pentatonic',
    t: `e|------------------------------
B|-----------0--3--0------------
G|--------0-----------0---------
D|--2--------------------2------
A|------------------------------
E|------------------------------`,
    tip: 'Seven notes, ends back on the root. Drop it into the last bar before a chord change — anywhere a song sits on Em or G. A fill that lands on beat 1 is worth more than a whole solo that doesn\'t.',
  },
  {
    week: 8,
    l: 'The classic turnaround — E blues',
    t: `e|--------------------------2--
B|--3---2---1---0-----------0--
G|--------------------------2--
D|--------------------------1--
A|--------------------------2--
E|--0---0---0---0---0----------`,
    tip: 'Low E drones while the B string walks down, landing on B7 — the sound of the last two bars of every blues ever. Learn the first half slow; the B7 lands you back at the top of the form.',
  },
];

export const texturesForWeek = (w) => TEXTURES.filter((x) => x.week <= w);
export const nextTexture = (w) => TEXTURES.find((x) => x.week > w) || null;
