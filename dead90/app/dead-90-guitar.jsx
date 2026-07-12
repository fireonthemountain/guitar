import { useState, useEffect, useRef } from "react";

// ------------------------------------------------------------------
// CURRICULUM — 13 weeks / 90 days / 3 phases
// Each week: theme, a lesson (plain-language teaching + tab + terms),
// and 7 days, each with a focus and step-by-step instructions.
// ------------------------------------------------------------------

const WEEKS = [
  // ---------------- WEEK 1 ----------------
  {
    t: "Home Base: Mixolydian",
    lesson: {
      p: [
        "A scale is a family of notes that belong together. The major scale is the do-re-mi sound you already know. Mixolydian is a major scale with exactly one change: the 7th note is lowered by one fret. That single flatted 7th (the \"b7\") turns sunny into sunny-with-dust — the Grateful Dead's home sound. Jerry spent a whole career inside this scale.",
        "This week you learn E Mixolydian in open position: E, F#, G#, A, B, C#, D. In the tab below, each line is a string (top line = thinnest string), numbers are frets, and 0 means play the string open. Read left to right, low notes first.",
      ],
      tabs: [
        {
          l: "E Mixolydian — two octaves, open position",
          t: `e|---------------------------0--
B|----------------------2-3-----
G|----------------1-2-4---------
D|----------0-2-4---------------
A|----0-2-4---------------------
E|-0-2-4------------------------`,
        },
        {
          l: "This week's chords — E, A, D (x = don't play that string)",
          t: `      E   A   D
e|----0---0---2--
B|----0---2---3--
G|----1---2---2--
D|----2---2---0--
A|----2---0---x--
E|----0---x---x--`,
        },
      ],
      terms: [
        ["Mixolydian", "A major scale with the 7th note lowered one fret"],
        ["b7", "That lowered 7th — the note that makes it sound like the Dead"],
        ["Open position", "The first few frets, using open strings"],
      ],
    },
    days: [
      { f: "Meet E Mixolydian — first octave, open position", h: ["Play just the first octave of the lesson tab: low E string 0-2-4, A string 0-2-4, D string 0-2.", "One finger per fret: index takes fret 2, ring takes fret 4.", "Ten slow, clean passes at 60 bpm. Clean beats fast, every time."] },
      { f: "Full two octaves, up and back down — 70 bpm", h: ["Play the whole lesson tab going up, then reverse it coming down.", "No pauses at string crossings — that's the entire game today.", "If a crossing stumbles, loop just those two strings until it doesn't."] },
      { f: "Say every note name out loud as you play", h: ["E, F#, G#, A, B, C#, D — speak each one as you fret it.", "It feels slow. It's wiring the fretboard into your brain.", "Bonus round: name them coming back down too."] },
      { f: "Sequence in 3s: E-F#-G#, F#-G#-A, G#-A-B…", h: ["Play three notes, restart one scale note higher, repeat all the way up.", "Keep strict down-up picking throughout.", "This exact pattern shows up in half of Jerry's runs."], tabs: [{ l: "The first four groups of the sequence", t: `A|-----------0------0-2----0-2-4-
E|-0-2-4---2-4----4---------------` }] },
      { f: "Play the mode over an E7 drone — hear the b7", h: ["Search YouTube for an \"E7 drone\" or \"E Mixolydian backing track.\"", "Play the scale slowly over it and pause on the D note each pass.", "That slightly bluesy rub is the b7. That's the sound you're chasing."] },
      { f: "Move the shape: A Mixolydian and D Mixolydian", h: ["Same fingering logic starting from the open A string: A, B, C#, D, E, F#, G.", "Then start from the open D string: D, E, F#, G, A, B, C.", "The pattern travels. That's the fretboard's biggest secret."], tabs: [{ l: "A Mixolydian — two octaves, open position", t: `e|--------------------------0-2-3-5-
B|--------------------2-3-----------
G|--------------0-2-4---------------
D|--------0-2-4---------------------
A|--0-2-4---------------------------` }, { l: "D Mixolydian — one octave, open position", t: `B|----------------1-3-
G|--------0-2-4-------
D|--0-2-4-------------` }] },
      { f: "Free play over an E7 vamp — scale notes only", h: ["Backing track on. No rules except: stay inside the scale.", "Play short phrases with rests between them, not endless streams.", "Hit a sour note? Slide one fret either way — you're never far from home."] },
    ],
  },
  // ---------------- WEEK 2 ----------------
  {
    t: "Major Pentatonic & the Jerry Box",
    lesson: {
      p: [
        "Pentatonic means five notes. Take the major scale, remove the 4th and 7th, and what's left is the major pentatonic — nearly impossible to make sound bad, and the skeleton under most Garcia solos. The Dead live in the key of B a lot, so that's where we learn it.",
        "The \"box\" below sits between frets 4 and 7. Your root notes (B) are at fret 7 on both E strings and fret 4 on the G string. Learn where the roots are and the box becomes a map instead of a shape.",
      ],
      tabs: [
        {
          l: "B major pentatonic — box 1 (frets 4–7)",
          t: `e|-4-7-
B|-4-7-
G|-4-6-
D|-4-6-
A|-4-6-
E|-4-7-`,
        },
        {
          l: "This week's chords — G, C, D",
          t: `      G   C   D
e|----3---0---2--
B|----0---1---3--
G|----0---0---2--
D|----0---2---0--
A|----2---3---x--
E|----3---x---x--`,
        },
      ],
      terms: [
        ["Pentatonic", "A five-note scale — the major scale minus its 4th and 7th"],
        ["Box", "A scale pattern that stays in one spot on the neck"],
        ["Root", "The note the key is named after — your home base"],
      ],
    },
    days: [
      { f: "B major pentatonic, box 1 — memorize it cold", h: ["Play the lesson box bottom string to top and back, 60 bpm.", "Find every B as you pass it: fret 7 low E, fret 4 G, fret 7 high e.", "Ten passes, then try it with your eyes closed."] },
      { f: "Connect box 1 to the next box with slides", h: ["Here's box 2 — it overlaps box 1 and sits a couple frets higher.", "Go up through box 1, slide up the B string from 7 to 9, come back down through box 2.", "Smooth beats fast. The slide should be silent work."], tabs: [{ l: "B major pentatonic — box 2 (frets 6–9)", t: `e|-7-9-
B|-7-9-
G|-6-8-
D|-6-9-
A|-6-9-
E|-7-9-` }] },
      { f: "Add the 4 and b7 — penta melts into Mixolydian", h: ["Add two notes to the box: E at fret 5 on the B string, and A at fret 7 on the D string.", "Pentatonic is the safe zone; those two notes are the color.", "Alternate: one phrase plain, one phrase with color."], tabs: [{ l: "The two color notes inside box 1", t: `B|--5--   E, the 4th
D|--7--   A, the b7` }] },
      { f: "Ascend one box, descend the next", h: ["Up box 1, shift up, come down box 2 — one continuous line.", "Metronome at 70. Don't rush the position shift.", "Then run the whole trip in reverse."] },
      { f: "Target the 3rd (D#) every time the chord lands", h: ["Loop a B chord vamp. Every time a bar starts, land on D# — fret 4, B string.", "Approach it from above one pass, from below the next.", "The 3rd is the sweetest note in any chord. Feel why."] },
      { f: "Call and response: 2-bar question, 2-bar answer", h: ["Play a short phrase that ends on any note EXCEPT B. That's the question.", "Answer it with a phrase that ends on B.", "This is the moment solos become conversations."] },
      { f: "Free play over a B vamp — pentatonic only", h: ["Five minutes minimum, backing track on.", "The limit is the freedom: five notes force real phrasing.", "Reuse your best question-and-answer pair from yesterday."] },
    ],
  },
  // ---------------- WEEK 3 ----------------
  {
    t: "CAGED Triads Up the Neck",
    lesson: {
      p: [
        "A triad is the smallest possible chord: three notes — the root, the 3rd, and the 5th. The CAGED idea says the five open chord shapes you already know (C, A, G, E, D) repeat up the neck, which means every chord lives in five different places. Jerry's rhythm playing — and a lot of his lead playing — leans on these small triads instead of big barre chords.",
        "Start with A major on just the top three strings. Below are the same three notes (A, C#, E) in three different neighborhoods. Strum only the three thinnest strings.",
      ],
      tabs: [
        {
          l: "A major triads — top three strings, three positions",
          t: `e|--5----9----12--
B|--5----10---14--
G|--6----9----14--`,
        },
        {
          l: "This week's chords — Em and Am join G, C, D",
          t: `      Em  Am
e|----0---0--
B|----0---1--
G|----0---2--
D|----2---2--
A|----2---0--
E|----0---x--`,
        },
      ],
      terms: [
        ["Triad", "A three-note chord: root, 3rd, 5th"],
        ["CAGED", "The five chord shapes that tile the whole neck"],
        ["Voicing", "One particular arrangement of a chord's notes"],
      ],
    },
    days: [
      { f: "A major in three places — learn the lesson triads", h: ["Play each of the three tab shapes slowly, top three strings only.", "Say \"A major\" out loud each time — same chord, new address.", "One relaxed downstroke per shape. Let it ring."] },
      { f: "The middle shape is movable — find D, G, and A", h: ["Take the middle lesson shape and slide it: the fret you land on sets the key.", "Find D major, G major, and A major with it.", "Movable shapes are the whole neck unlocking at once."] },
      { f: "Connect two shapes on one chord", h: ["Pick one chord and play it in the lowest lesson shape, then the next one up.", "Walk between them slowly until the jump feels like one motion.", "Slow is fine. Smooth is the goal."] },
      { f: "Play the Ripple progression with tiny triads", h: ["Look up the chords to Ripple (it lives around G, C, A, and D).", "Comp the whole verse using only top-three-string triads. No barre chords today.", "Hear how much lighter it sounds? That's the Dead's rhythm texture."] },
      { f: "Arpeggiate every triad — one note at a time", h: ["Same shapes, but pick each string separately and let the notes ring together.", "Strict down-up picking.", "This is rhythm playing and lead playing shaking hands."] },
      { f: "Triads through G–C–D with minimal movement", h: ["Use these three triads — they live within a few frets of each other.", "Change chords by moving one or two fingers, never jumping.", "Loop the progression until the changes happen by themselves."], tabs: [{ l: "G, C, and D triads — top three strings, close together", t: `      G   C   D
e|----3---3---5---
B|----3---5---7---
G|----4---5---7---` }] },
      { f: "Song run: Uncle John's Band, triads only", h: ["Look up the chords and comp the intro and verse with triads.", "Hum the melody over your own playing.", "Record 30 seconds on your phone and listen back."] },
    ],
  },
  // ---------------- WEEK 4 ----------------
  {
    t: "The Right Hand",
    lesson: {
      p: [
        "Tone and groove live in the right hand. Alternate picking means strict down-up-down-up, no exceptions, even when you cross strings. Hybrid picking means you keep holding the pick but pluck extra strings with your middle and ring fingers — Jerry's country-flavored snap comes straight from this.",
        "The banjo roll is a repeating three-string pattern borrowed from bluegrass (Garcia was a banjo player first). Hold an open G chord and loop the pattern below: the pick strikes the D string, your middle finger plucks the B, your ring finger plucks the high e. Let every note ring into the next.",
      ],
      tabs: [
        {
          l: "Banjo roll on open G — pick, middle, ring, repeat",
          t: `e|------0------0------0---
B|----0------0------0-----
D|--0------0------0-------`,
        },
        {
          l: "This week's strum pattern — over the G–C–D loop",
          t: `count:  1    2  &    &  4  &
strum:  D    D  U    U  D  U
(keep the arm swinging on the silent beats)`,
        },
      ],
      terms: [
        ["Alternate picking", "Strict down-up-down-up pick strokes"],
        ["Hybrid picking", "Pick plus bare fingers plucking at the same time"],
        ["Roll", "A repeating fingerpicking pattern that rings like a banjo"],
      ],
    },
    days: [
      { f: "Alternate picking: the 1-2-3-4 drill, 80 bpm", h: ["Frets 1-2-3-4 on every string, one finger per fret, down-up-down-up.", "Keep the pick motion small — wrist, not elbow.", "Four clean passes across all six strings."] },
      { f: "String crossing in 4s, strict alternation", h: ["Play your E Mixolydian scale, never breaking the down-up order.", "The hard part is an up-stroke landing on a fatter string. That's normal.", "Slow down until the crossings are silent."] },
      { f: "Hybrid picking: pick plus middle finger", h: ["Pick the open A string, then instantly pluck fret 2 on the B string with your bare middle finger.", "Loop it as steady eighth notes — pick, pluck, pick, pluck.", "That fingertip snap is the country half of Jerry."], tabs: [{ l: "Hybrid picking loop — pick the A, finger the B string", t: `B|-----2-----2-----2---   (middle finger)
A|--0-----0-----0------   (pick)` }] },
      { f: "The banjo roll on open G", h: ["Run the lesson tab: pick hits D, middle plucks B, ring plucks high e.", "Let all three strings ring into each other.", "Start at 60 bpm. Evenness matters more than speed."] },
      { f: "Accent shifting: lean on 2 and 4", h: ["Run yesterday's roll, but play beats 2 and 4 louder than 1 and 3.", "Then move the accent to the \"and\" of each beat.", "Control over volume is where groove comes from."] },
      { f: "Everything from this week, +10 bpm", h: ["Revisit days 1–5 one metronome notch faster.", "If a drill falls apart, drop back 5 bpm — find your true edge.", "Log today's tempos in the notes so future-you can gloat."] },
      { f: "Apply it: Cumberland Blues rhythm workout", h: ["Look up the tune and comp along, all attention on right-hand bounce.", "Sneak the banjo roll into the G sections.", "Fun is the actual assignment today."] },
    ],
  },
  // ---------------- WEEK 5 ----------------
  {
    t: "Bends, Vibrato & Slides",
    lesson: {
      p: [
        "A bend pushes the string sideways to raise its pitch — it's the guitar imitating the human voice. A whole-step bend must land exactly on the pitch two frets higher; your ear is the referee, not your hands. Vibrato is a small, steady wobble that keeps a held note alive instead of letting it die.",
        "Check your bend intonation like this: play fret 9 on the G string and memorize that pitch. Then bend fret 7 until the two match. Always bend with three fingers — the ring finger frets the note while middle and index push behind it for strength.",
      ],
      tabs: [
        {
          l: "The pitch-check bend — target first, then bend to match",
          t: `G|--9----7b9----7b9--`,
        },
        {
          l: "This week's chords — E7, A7, B7, plus the 12-bar loop",
          t: `      E7  A7  B7
e|----0---0---2--
B|----3---2---0--
G|----1---0---2--
D|----0---2---1--
A|----2---0---2--
E|----0---x---x--

| E7 | E7 | E7 | E7 |
| A7 | A7 | E7 | E7 |
| B7 | A7 | E7 | E7 |`,
        },
      ],
      terms: [
        ["Whole step", "A two-fret distance in pitch"],
        ["Oblique bend", "Bending one string while another rings unbent"],
        ["Vibrato", "A controlled, repeating wobble on a held note"],
      ],
    },
    days: [
      { f: "Whole-step bends, pitch-checked", h: ["Run the lesson drill: hear fret 9, then bend fret 7 up to match it.", "Three fingers behind every bend — ring bends, middle and index help push.", "Ten bends. Be brutally honest about the pitch."] },
      { f: "Half-step bend and release, slow motion", h: ["Bend fret 7 up just one fret's worth — check it against fret 8.", "Then lower it back down as slowly and evenly as you raised it.", "The release should be silent: no scrapes, no wobble."] },
      { f: "Vibrato: slow and wide, then narrow", h: ["Hold fret 7 on the B string and rock your wrist to wobble the pitch.", "Exaggerate first — big slow waves — then gradually tighten.", "Sync it to the metronome: one full wave per beat."] },
      { f: "Slide into chord tones from below", h: ["Pick one fret below your target note and slide in without re-picking.", "Target the 3rds and 5ths of a B chord.", "Slides are cheap expression. Spend freely."] },
      { f: "Bend and hold while picking a second string", h: ["Bend the G string at fret 7 up a whole step, hold it there, and pick fret 5 on the B string.", "This oblique move is pure pedal steel — pure Jerry.", "It hurts today. It's gorgeous in a month."], tabs: [{ l: "The oblique bend — bend, hold, add the top note", t: `B|---------5-----   (rings straight)
G|--7b9~~~~~~~~~~   (bent and held)` }] },
      { f: "Oblique bends in two more positions", h: ["Move yesterday's bend-and-hold to two other spots on the neck.", "Pitch-check the bent note every single time.", "Slow tempo, maximum listening."] },
      { f: "Sing a phrase, play it with bends only", h: ["Hum any four-note melody — anything.", "Find it on the G and B strings using bends and slides instead of separate frets.", "This is the day technique starts becoming a voice."] },
    ],
  },
  // ---------------- WEEK 6 ----------------
  {
    t: "Chromatic Color",
    lesson: {
      p: [
        "Chromatic notes are the in-between notes — anything one fret outside your scale. Played carelessly they sound wrong; played on purpose they create motion and pull. The one rule: chromatic notes pass through, they never park. Always land on a chord tone.",
        "The approach note is the easiest version: play the note one fret below your target, then resolve up onto it. The enclosure surrounds the target — one note above, one below, then land. Below, an enclosure that circles and lands on B.",
      ],
      tabs: [
        {
          l: "Enclosure landing on B — above, below, target",
          t: `G|--5--3--4--`,
        },
      ],
      terms: [
        ["Chromatic", "A note one fret outside the scale"],
        ["Approach note", "The note one fret below a target, resolving up"],
        ["Enclosure", "Circling a target: above, below, then land"],
      ],
    },
    days: [
      { f: "Approach every chord tone from one fret below", h: ["Loop a B chord. Before each chord tone (B, D#, F#), play the fret below it first.", "Approach note on the weak beat, target note on the strong beat.", "Instant jazz-country flavor. Notice how the target now shines."] },
      { f: "Enclosures: above, below, land", h: ["Run the lesson tab: C, then A#, landing on B.", "Build the same move around D# and around F#.", "An enclosure is a spotlight pointed at the target note."] },
      { f: "Chromatic walks between pentatonic boxes", h: ["Travel from box 1 to box 2 on one string, hitting every fret in between.", "Time the walk so you arrive on a scale note exactly on beat one.", "Passing through — never parking."] },
      { f: "The ascending chromatic run into the root", h: ["Walk up into B: frets 2, 3, 4 on the G string (A, A#, B).", "End the run exactly on beat one.", "A classic Garcia sentence-ender. File it away."], tabs: [{ l: "The chromatic walk-up — land B on beat one", t: `G|--2--3--4--
     A  A#  B` }] },
      { f: "Passing tones inside the scale", h: ["Play Mixolydian phrases, but fill one whole-step gap per phrase with its in-between fret.", "Keep passing tones quick and light — grace notes, not destinations.", "The scale is the road; these are the gravel shoulders."] },
      { f: "One chromatic idea per phrase — no more", h: ["Solo over a B vamp. Each phrase gets exactly one approach, enclosure, or walk.", "Restraint is what makes them shine.", "Overuse turns color into seasickness."] },
      { f: "Free play — count your chromatic moves", h: ["Five-minute jam. Tally every chromatic device you use.", "Aim for 8–12 total: present, not constant.", "Note which one is starting to feel like yours."] },
    ],
  },
  // ---------------- WEEK 7 ----------------
  {
    t: "Arpeggio Targeting",
    lesson: {
      p: [
        "An arpeggio is a chord played one note at a time. When you solo, arpeggios are the safety rails: chord tones are the notes that always sound right over that chord, no matter what. \"Targeting\" means aiming your phrase so a chord tone lands right when the chord changes — the difference between playing over the changes and playing through them.",
        "Below is a B major arpeggio (B, D#, F#) in one compact position. Learn it, then hunt the same three notes elsewhere on the neck.",
      ],
      tabs: [
        {
          l: "B major arpeggio — B, D#, F#, B",
          t: `G|------------4--
D|-----1--4------
A|--2------------`,
        },
      ],
      terms: [
        ["Arpeggio", "A chord played one note at a time"],
        ["Chord tone", "A note that belongs to the current chord"],
        ["Targeting", "Landing a chord tone exactly when the chord changes"],
      ],
    },
    days: [
      { f: "B major arpeggio — lesson position plus two more", h: ["Play the lesson tab until it's smooth, saying the note names: B, D#, F#, B.", "Then find those same three notes in two other spots.", "Arpeggios are just chords walking single file."] },
      { f: "E and F#m arpeggios — the Scarlet neighborhood", h: ["E major is E, G#, B. F# minor is F#, A, C#.", "Both sit right next to the B shape you already know — minimal travel.", "Loop B → E → F#m arpeggios in steady time."], tabs: [{ l: "E major arpeggio — E, G#, B, E", t: `D|-----------2--
A|--------2-----
E|--0--4--------` }, { l: "F# minor arpeggio — F#, A, C#, F#", t: `D|-----------4--
A|-----0--4-----
E|--2-----------` }] },
      { f: "Land the 3rd on beat one", h: ["Loop a B-to-E change, two bars each.", "When E arrives, be on G#. When B returns, be on D#.", "This single skill makes a solo sound professional overnight."] },
      { f: "Half arpeggio, half scale", h: ["Over the B–E loop: outline the chord for two beats, run the scale for two.", "The arpeggio anchors; the scale decorates.", "Swap the order every pass."] },
      { f: "Dominant 7 arpeggios: A7 and D7", h: ["A7 is A, C#, E, G. D7 is D, F#, A, C.", "The b7 baked into the arpeggio is Mixolydian flavor, pre-installed.", "Learn each tab, then find the same notes one more place on the neck."], tabs: [{ l: "A7 arpeggio — A, C#, E, G", t: `D|--------2--5--
A|--0--4--------` }, { l: "D7 arpeggio — D, F#, A, C", t: `G|--------2--5--
D|--0--4--------` }] },
      { f: "Spell the chords out loud, then solo", h: ["Before each backing-track chorus, say the chord tones of every chord in the loop.", "Then solo, hunting exactly those notes.", "Knowledge becomes fingers a little more every day."] },
      { f: "Solo the full Scarlet Begonias verse form", h: ["Look up the verse changes and loop them.", "One chorus arpeggios-only, then one chorus free.", "Record the free one and listen for the targeted 3rds."] },
    ],
  },
  // ---------------- WEEK 8 ----------------
  {
    t: "The Jerry Lexicon",
    lesson: {
      p: [
        "A lick is a short, reusable phrase — vocabulary. You learn licks the way you learn words: copy exactly, then use them in your own sentences until they stop feeling borrowed. Three licks this week, all in B. The daily work moves them into other keys, which is how they become permanently yours.",
      ],
      tabs: [
        {
          l: "Lick 1 — the pentatonic roll-off (descending)",
          t: `B|--7--4----------
G|--------6--4----
D|------------6--4`,
        },
        {
          l: "Lick 2 — Mixolydian run down to the b7",
          t: `G|--8--6--4----
D|----------7--`,
        },
        {
          l: "Lick 3 — chromatic enclosure phrase",
          t: `G|--5--3--4----
D|----------6--`,
        },
      ],
      terms: [
        ["Lick", "A short, reusable musical phrase"],
        ["Transpose", "Moving a phrase to a different key"],
        ["Phrase", "A musical sentence with a start and an end"],
      ],
    },
    days: [
      { f: "Lick 1: the penta roll-off, in B", h: ["Learn the first lesson tab exactly — the rhythm counts as much as the notes.", "Loop it twenty times until your hand owns it.", "Then play it once at the end of a phrase of your own."] },
      { f: "Lick 1 in E and A", h: ["Slide the whole shape so it starts from each new root.", "Same fingering, new neighborhood.", "Transposing is the exact moment a lick becomes vocabulary."] },
      { f: "Lick 2: the Mixolydian run to the b7", h: ["Second lesson tab: D#, C#, B, resolving down to A.", "Land the A gently — it's the color note, not a crash pad.", "Loop it, then alternate it with Lick 1."] },
      { f: "Lick 2 in three keys, rhythm remixed", h: ["Play it in B, E, and A.", "Then stretch it: same notes at half speed, then syncopated.", "Rhythmic variation doubles your vocabulary for free."] },
      { f: "Lick 3: the chromatic enclosure phrase", h: ["Third lesson tab: circle the B, land it, drop to the G# below.", "Attach a short scale run in front so it ends a longer sentence.", "Your most jazz-Jerry lick so far."] },
      { f: "Chain all three into one statement", h: ["Lick 1, breath, Lick 2, breath, Lick 3.", "Adjust the joins until it flows like a single thought.", "Congratulations — you just composed a solo chorus."] },
      { f: "Improvise; quote each lick once", h: ["Five minutes over a B vamp.", "Work each lick in naturally — no announcing it.", "If one shows up uninvited, it's officially yours now."] },
    ],
  },
  // ---------------- WEEK 9 ----------------
  {
    t: "Double Stops",
    lesson: {
      p: [
        "A double stop is two notes played at once — instant harmony, and one of the most Garcia sounds there is. 3rds (notes two scale steps apart) sound sweet and vocal, like two singers. 6ths (a wider gap, usually with a skipped string in between) sound like a pedal steel crying in the next room.",
        "Below: 3rds walking up in A on the G and B strings. Press both notes cleanly and strum only those two strings. Slide between pairs instead of lifting off.",
      ],
      tabs: [
        {
          l: "3rds in A — paired notes on the G and B strings",
          t: `B|--2--3--5--7--
G|--2--4--6--7--`,
        },
      ],
      terms: [
        ["Double stop", "Two notes played at the same time"],
        ["3rds", "Note pairs two scale steps apart — sweet and vocal"],
        ["6ths", "Wider pairs with a skipped string — the pedal-steel sound"],
      ],
    },
    days: [
      { f: "3rds up the scale, two strings at once", h: ["Run the lesson tab: paired notes, G and B strings.", "Press both cleanly; strum only those two strings.", "Walk the pairs up and back until the moves are automatic."] },
      { f: "6ths on strings 1 and 3 — the sweet stuff", h: ["Skip the B string: fret the G and high e strings together.", "Walk these pairs up the neck, letting a lazy finger mute the B string.", "Instant Peggy-O tenderness."], tabs: [{ l: "6ths in A — G and high e strings, B string muted", t: `e|--5---7---9---10--
B|--x---x---x---x---
G|--6---7---9---11--` }] },
      { f: "Double-stop bends", h: ["Bend the G-string note while its B-string partner rings straight.", "Small bends — a half step is plenty.", "The clash-then-resolve is the entire point."] },
      { f: "Hybrid-picked double-stop riffing", h: ["Pick the low note, pluck the high one with your middle finger.", "Groove on an A7 vamp — think chicken-pickin' Jerry.", "Add tiny slides between the pairs."] },
      { f: "Harmonize a melody in 3rds", h: ["Take any simple melody — Happy Birthday absolutely counts.", "Play it in double-stop 3rds, slowly.", "This is ear training wearing a guitar costume."] },
      { f: "Double stops as rhythm fills", h: ["Comp a B–E vamp. Between chord hits, sneak in short two-note fills.", "Fills answer the chord, then get out of the way.", "This blend is most of what Jerry does under vocals."] },
      { f: "Solo with a double stop in every phrase", h: ["Five minutes over the vamp.", "Every phrase must contain at least one pair.", "Single notes are words; double stops are harmony singing along."] },
    ],
  },
  // ---------------- WEEK 10 ----------------
  {
    t: "Two-Chord Vamps",
    lesson: {
      p: [
        "A vamp is a short progression that repeats forever — the Dead's launchpad. Fire on the Mountain is two chords, B to A, around and around for as long as the band feels like it. With no form to track, all of your attention goes where it matters: phrasing, dynamics, and space.",
        "Make your own backing track this week: record two or three minutes of yourself comping the vamp on your phone, then solo over the recording. The week's one discipline: once the loop starts, you never stop playing.",
      ],
      tabs: [
        {
          l: "The Fire vamp — one bar each, forever",
          t: `|  B  . . .  |  A  . . .  |  (repeat)`,
        },
      ],
      terms: [
        ["Vamp", "A short chord loop that repeats indefinitely"],
        ["Comping", "Playing rhythm chords behind a melody or solo"],
        ["Dynamics", "Deliberate changes in volume and intensity"],
      ],
    },
    days: [
      { f: "Fire on the Mountain: comp the vamp for 5 minutes", h: ["Two chords: B to A, one bar each, forever.", "Record 2–3 minutes of your comping — that's your backing track for the week.", "Vary the strumming, but keep the groove sacred."] },
      { f: "Solo 5 minutes, zero stopping", h: ["Over yesterday's recording. No pauses allowed, even after mistakes.", "Mistakes get absorbed into the next phrase, never restarted.", "Endurance is a skill. Today it starts."] },
      { f: "One motif per minute", h: ["Set a timer. Each minute, pick one small idea and milk it dry.", "Repeat it, move it up, flip it — do not abandon it.", "Development beats novelty every time."] },
      { f: "Whisper chorus, shout chorus", h: ["Alternate: once through as quietly as you can, then as big as you can.", "Volume comes from pick attack, not the amp knob.", "Dynamics are the cheapest drama available."] },
      { f: "Two beats of silence per phrase", h: ["End each phrase, then count two full beats before the next one.", "Uncomfortable means you're doing it right.", "Jerry's space is as famous as his notes."] },
      { f: "Franklin's Tower: same drills, new vamp", h: ["Loop the Franklin's changes below — record your own backing track again.", "Run the motif drill and the dynamics drill over it.", "Notice how a third chord changes your note choices."], tabs: [{ l: "The Franklin's vamp — A Mixolydian territory", t: `|  A  . . .  |  A  . . .  |  G  . . .  |  D  . . .  |  (repeat)` }] },
      { f: "Record, listen, fix exactly one thing", h: ["Record a full 5-minute jam.", "Listen once through with the guitar out of your hands.", "Write ONE fix in the notes below. Just one."] },
    ],
  },
  // ---------------- WEEK 11 ----------------
  {
    t: "Melodic Development",
    lesson: {
      p: [
        "A motif is a tiny idea — three to five notes. Great solos aren't a parade of unrelated licks; they take one idea and grow it: repeat it, move it higher, flip it upside down, stretch its rhythm. Listeners follow a solo the way they follow a sentence — through repetition and variation.",
        "Jerry's other secret is simpler: he starts from the vocal melody and decorates it. When you're lost mid-solo, play the melody. It always works, and nobody plays it enough.",
      ],
      tabs: [
        {
          l: "Motif development — one idea, three treatments",
          t: `state it   →  repeat it  →  move it up  →  flip it`,
        },
      ],
      terms: [
        ["Motif", "A tiny musical idea, 3–5 notes"],
        ["Development", "Growing one idea through variation"],
        ["Displacement", "The same phrase started on a different beat"],
      ],
    },
    days: [
      { f: "Motif lab: repeat, transpose, invert", h: ["Pick three notes. Play them. Again. Now start them higher. Now flip the direction.", "Ten minutes on ONE motif — resist every new idea that shows up.", "This discipline is what audiences hear as storytelling."] },
      { f: "Rhythmic displacement", h: ["Same motif, but start it on beat 2 instead of beat 1.", "Then start it on the \"and\" of 1.", "Familiar notes in a new place: fresh without being random."] },
      { f: "Question and answer, formalized", h: ["A two-bar phrase ending unresolved, then a two-bar phrase ending on the root.", "Ten pairs in a row over the vamp.", "Keep the question identical; vary only the answers."] },
      { f: "Engineer a peak at bar 24", h: ["Solo over 32 bars. Plan to hit maximum height — register, volume, density — at bar 24.", "Then descend and land soft.", "Peaks feel accidental to the listener. They never are."] },
      { f: "The melody-first approach", h: ["Pick a Dead tune you can sing and find its vocal melody on the neck.", "Solo by decorating that melody: slides, doubles, approach notes.", "This is the actual center of Garcia's style."] },
      { f: "Resolve vs. suspend", h: ["Alternate phrase endings: land on the root (resolved), then on the 2nd or 6th (floating).", "Feel how the suspended endings pull the listener forward.", "Control of tension is control of the room."] },
      { f: "The three-chorus story", h: ["Chorus 1: sparse and low. Chorus 2: motifs develop. Chorus 3: peak, then release.", "Record it.", "Listen back — can you hear the arc from the outside?"] },
    ],
  },
  // ---------------- WEEK 12 ----------------
  {
    t: "Full Song Forms",
    lesson: {
      p: [
        "A form is the map of a song — which sections, in what order, how many bars each. Soloing over a form means always knowing where you are on that map. This week: three Dead standards. For each one, learn the chords first, comp the full form until it's automatic, and only then solo.",
        "The rule for the week: if you get lost, do not stop. Drop back to comping until beat one finds you, then re-enter. Recovering gracefully IS the skill — it's what separates playing songs from playing exercises.",
      ],
      tabs: [
        {
          l: "The weekly ladder",
          t: `learn form → comp it cold → solo it → recover gracefully`,
        },
      ],
      terms: [
        ["Form", "The section map of a song"],
        ["Changes", "The chord progression of a form"],
        ["Chorus", "One full trip through the form"],
      ],
    },
    days: [
      { f: "Deal: learn and comp the form", h: ["Look up the changes and map the sections in your notes below.", "Comp the full form five times at an easy tempo.", "Count out loud through anything that trips you."] },
      { f: "Deal: solo the full form", h: ["Solo while naming each chord as it arrives — out loud or in your head.", "Target 3rds at every change. Week 7 pays off right here.", "Lost? Comp until beat one comes around, then re-enter."] },
      { f: "Sugaree: form plus fills", h: ["Learn the form. It breathes slower — leave real space.", "Add short double-stop fills where the vocal lines would pause.", "Fills serve the song, not the soloist."] },
      { f: "Sugaree: the three-chorus build", h: ["Apply the Week 11 arc across three full choruses.", "Chorus 3 should visit your highest register of the day.", "Record the last chorus."] },
      { f: "Bertha: the form at tempo", h: ["A faster tune — comp until the changes run on autopilot.", "Simplify: triads and muted strums keep the train on the rails.", "Tempo exposes hesitation. That's exactly the point."] },
      { f: "Bertha: solo and recover", h: ["Solo the form. When you flub — you will — keep the right hand moving.", "Absorb the mistake into a rhythm figure, then re-enter the solo.", "Graceful recovery is a stage skill you can build alone in a room."] },
      { f: "The mini-set", h: ["Deal, then Sugaree, then Bertha. Back to back, no restarts.", "Comp each head, solo one full form per tune.", "You just played a set. Note how the energy held up."] },
    ],
  },
  // ---------------- WEEK 13 ----------------
  {
    t: "The Long Jam",
    lesson: {
      p: [
        "Everything converges here. A long jam is a conversation with yourself: statements, questions, space, and a peak you build on purpose. Think in waves — rise, crest, breathe, rise higher. Ten minutes is a long time on purpose; boredom is the doorway, and what's on the other side of it is the actual jam.",
        "Record everything this week. Listening back is where half the learning lives: you'll hear the rushing, the repetition, and — more often than you expect — the moments that genuinely worked.",
      ],
      tabs: [
        {
          l: "The wave shape",
          t: `rise → crest → breathe → rise higher → crest → release`,
        },
      ],
      terms: [
        ["Peak", "The planned high point of a jam"],
        ["Trading fours", "Alternating four-bar phrases with another player"],
        ["Space", "Deliberate silence, played on purpose"],
      ],
    },
    days: [
      { f: "Ten minutes, one key, no stopping", h: ["Timer on, backing vamp on, go.", "Use everything: motifs, licks, double stops, space, dynamics.", "Boredom is the doorway. Play through it."] },
      { f: "Jam with a modulation", h: ["Five minutes in B, then lift the whole jam up to E for five more.", "Plan the pivot: land on G# — the 3rd of E — right at the switch.", "A modulation is the jam's second wind."] },
      { f: "Trade fours with a recording", h: ["Put on a live Dead jam. Play four bars, then lay out four while the band answers.", "Steal something from their four for your next four.", "Listening is the deepest practice there is."] },
      { f: "Three waves of intensity", h: ["Ten minutes, three planned peaks, each higher than the last.", "Between peaks: drop the volume, thin the notes, breathe.", "You're conducting yourself. That's what this is."] },
      { f: "Half the notes, twice the intent", h: ["Ten minutes with a hard rule: long tones, space, and vibrato do the talking.", "Every note gets a beginning, a middle, and an end.", "Less has never been more than it is today."] },
      { f: "Record your best jam of the program", h: ["Warm up properly, then record ten minutes in one take.", "Listen back tonight with day-one ears.", "Compare it to your Week 10 recording. Feel that distance."] },
      { f: "Day 90: the open mic set — rhythm and lead", h: ["Ripple with the roll texture, Friend of the Devil opening with its intro run, your closer with the 8-bar solo break. Standing, announced, timed.", "You have played this set dozens of times. The stage is just a room with better light.", "Ninety days. What a long strange trip. Now go sign up for the slot."] },
    ],
  },
];

const PHASES = [
  { name: "Foundation", range: [1, 30], sub: "Hands, scales, chords" },
  { name: "Vocabulary", range: [31, 60], sub: "The Jerry lexicon" },
  { name: "The Jam", range: [61, 90], sub: "Improvisation & forms" },
];

function phaseFor(day) {
  if (day <= 30) return 0;
  if (day <= 60) return 1;
  return 2;
}

// Week-specific chord practice for Phase 1 — shapes are drawn in the lesson card
const CHORD_DRILLS = [
  "Open E, A, and D — shapes are drawn just below. Run the one-minute change test: switch E→A as many times as you can in 60 seconds, log the count in your notes. Then A→D. Beat yesterday's number.",
  "Open G, C, and D — shapes below. One-minute change tests: G→C, then C→D. Then loop G–C–G–D slowly, four downstrums per chord, no gaps between changes.",
  "Add Em and Am — shapes below. Loop G–Em–C–D, four beats each. That's the folk engine under half the songbook. Keep the strumming plain; the changes are the workout.",
  "Strum pattern week: Down, Down-Up, Up-Down-Up over the G–C–D loop — chart below. Count it \"1, 2-and, and-4-and.\" Keep the arm moving even through the misses.",
  "Dominant 7ths: E7, A7, B7 — shapes below. Loop a 12-bar in E: E7×4 bars, A7×2, E7×2, B7×1, A7×1, E7×2. This is the blues floor under the whole Dead catalog.",
];

// Chord charts rendered directly below the session blocks in Phase 1
const CHORD_CHARTS = [
  {
    l: "Week 1 chords — E, A, D (x = don't play that string)",
    t: `      E   A   D
e|----0---0---2--
B|----0---2---3--
G|----1---2---2--
D|----2---2---0--
A|----2---0---x--
E|----0---x---x--`,
  },
  {
    l: "Week 2 chords — G, C, D",
    t: `      G   C   D
e|----3---0---2--
B|----0---1---3--
G|----0---0---2--
D|----0---2---0--
A|----2---3---x--
E|----3---x---x--`,
  },
  {
    l: "Week 3 chords — G, C, D, plus Em and Am",
    t: `      G   C   D   Em  Am
e|----3---0---2---0---0--
B|----0---1---3---0---1--
G|----0---0---2---0---2--
D|----0---2---0---2---2--
A|----2---3---x---2---0--
E|----3---x---x---0---x--`,
  },
  {
    l: "Week 4 — G, C, D with the strum pattern",
    t: `      G   C   D
e|----3---0---2--
B|----0---1---3--
G|----0---0---2--
D|----0---2---0--
A|----2---3---x--
E|----3---x---x--

count:  1    2  &    &  4  &
strum:  D    D  U    U  D  U`,
  },
  {
    l: "Week 5 chords — E7, A7, B7, plus the 12-bar loop",
    t: `      E7  A7  B7
e|----0---0---2--
B|----3---2---0--
G|----1---0---2--
D|----0---2---1--
A|----2---0---2--
E|----0---x---x--

| E7 | E7 | E7 | E7 |
| A7 | A7 | E7 | E7 |
| B7 | A7 | E7 | E7 |`,
  },
];

// THE GOAL: Day 90 = open mic, three songs, standing up, confident.
// Repertoire track for Phase 2 — one song at a time, weeks 5–9
const REP_DRILLS = [
  "Song 1: Ripple. Verse chords (G, C, A, D territory) with the Week 4 strum. Then re-run the verse swapping the banjo roll onto every G chord — rhythm one pass, texture the next. Both styles, same song.",
  "Ripple start to finish, singing or humming. Now add lead: end each vocal line with a small fill — slide into the 3rd of the next chord (your Week 5 skill). Strummer AND soloist, four bars at a time.",
  "Song 2: Friend of the Devil. That famous descending intro run IS lead guitar — learn it exactly, it opens your set. Then the verse chords (G, C, D, Am), picking the bass note before each strum.",
  "Friend of the Devil start to finish, then Ripple from memory. End one Ripple verse with Lick 1 transposed to G — exactly what this week teaches. Your first planned lead moment on stage.",
  "Your closer: Sugaree — mid-tempo, built for lead. Learn the verse, then mark TWO spots for double-stop fills (this week's skill). Keep Songs 1–2 warm: one memory pass each.",
];

// Performance reps for Phase 3 — rotating daily, this is where confidence is built
const PERFORMANCE_REPS = [
  "Stage rep: Ripple, start to finish, STANDING, no stops — roll texture on at least two verses, fills at the line endings. Mistakes get played through, never restarted.",
  "Stage rep: Friend of the Devil from memory, standing, intro run included. Announce it out loud first, like you're at the mic: \"This one's called…\"",
  "Stage rep: your closer with an 8-bar solo break — two verses of comping, one short solo built from ONE motif (Week 11 style), then back to the verse. Land the ending clean and deliberate.",
  "Stage rep: the FULL set, 10 seconds max between songs, timed. The closer keeps its solo break — that's your jam moment on stage. An open mic slot is 10–15 minutes.",
  "Stage rep: record one set song on video and watch it back. You're checking posture, the fills, and recovery — not perfection.",
  "Stage rep: play one song for a real human — spouse, kid, friend on a video call. Bonus: improvise one fill you've never played before, while they watch.",
];

// Five strumming patterns — rotated daily through every Phase 1 chord session
const STRUM_PATTERNS = {
  l: "The five strum patterns (today's is named in the Chords block)",
  t: `count:         1  &  2  &  3  &  4  &
1 Foundation   D     D     D     D
2 Backbeat     D     D  U  D     D  U
3 Campfire     D     D  U     U  D  U
4 Boom-chick   B     D     B     D
5 The Chop     D     x     D     x

B = pick just the bass string of the chord
x = muted slap: relax the fret hand, strum the thunk
1 steady - 2 bounce - 3 the classic - 4 Dead country - 5 groove`,
};
const STRUM_NAMES = ["Foundation", "Backbeat", "Campfire", "Boom-chick", "The Chop"];

const MILESTONES = {
  30: "MILESTONE — Checkpoint 1: loop G–C–D with the strum pattern for 3 straight minutes, no stopping. That's a song's worth of endurance.",
  60: "MILESTONE — Checkpoint 2: Ripple and Friend of the Devil back to back, from memory, recorded — with at least one lead fill in each. Two-thirds of your set, both styles present.",
  90: "MILESTONE — THE GOAL: three songs, standing, for people — fills throughout and a solo break in the closer. Rhythm player AND lead player, same guy. Find the open mic; you've done this dozens of times.",
};

function blocksFor(day) {
  const p = phaseFor(day);
  const w = Math.min(Math.floor((day - 1) / 7), 12);
  if (p === 0)
    return [
      { n: "Warmup", m: 5, d: "Chromatic 1-2-3-4 drill: frets 1-2-3-4 on every string, one finger per fret, down-up picking, 60 bpm" },
      { n: "Technique", m: 20, d: "Work today's focus — the numbered steps above" },
      { n: "Chords", m: 15, d: CHORD_DRILLS[Math.min(w, 4)] + " Strum of the day: #" + (((day - 1) % 5) + 1) + " (" + STRUM_NAMES[(day - 1) % 5] + ") - chart below." },
    ];
  if (p === 1)
    return [
      { n: "Warmup", m: 5, d: "60 seconds of the banjo roll on G, then E Mixolydian two octaves up and down, twice" },
      { n: "Vocabulary", m: 15, d: "Work today's focus — the numbered steps above" },
      { n: "Application", m: 10, d: "Loop a B vamp (record 2 minutes of comping, or find a backing track) and use today's idea over it, slow tempo first" },
      { n: "Repertoire", m: 10, d: REP_DRILLS[Math.min(Math.max(w - 4, 0), 4)] },
    ];
  return [
    { n: "Warmup", m: 5, d: "One Phase 2 lick in a brand-new key, plus one slow pass of the B pentatonic box" },
    { n: "Stage rep", m: 10, d: PERFORMANCE_REPS[day % PERFORMANCE_REPS.length] },
    { n: "The Jam", m: 20, d: "Work today's focus — the numbered steps above" },
    { n: "Debrief", m: 5, d: "Record one minute of playing, listen back, write one sentence below" },
  ];
}

function dayInfo(day) {
  const w = Math.min(Math.floor((day - 1) / 7), 12);
  const dIdx = Math.min((day - 1) % 7, 6);
  const week = WEEKS[w];
  const d = week.days[dIdx];
  const weekTabs = [...week.lesson.tabs, ...week.days.flatMap((dd) => dd.tabs || [])];
  const chordChart = phaseFor(day) === 0 ? CHORD_CHARTS[Math.min(w, 4)] : null;
  return { week: w + 1, theme: week.t, lesson: week.lesson, weekTabs, chordChart, milestone: MILESTONES[day] || null, focus: d.f, how: d.h, dayTabs: d.tabs || [], blocks: blocksFor(day), phase: phaseFor(day), isWeekStart: dIdx === 0 };
}

// ------------------------------------------------------------------
// STORAGE
// ------------------------------------------------------------------
const KEY = "dead90-progress";
const emptyState = { completed: [], notes: {}, blocks: {} };

async function loadState() {
  try {
    const r = await window.storage.get(KEY);
    return r ? JSON.parse(r.value) : { ...emptyState };
  } catch {
    return { ...emptyState };
  }
}
async function saveState(s) {
  try {
    await window.storage.set(KEY, JSON.stringify(s));
  } catch (e) {
    console.error("save failed", e);
  }
}

// ------------------------------------------------------------------
// PROGRESS RING — 90 dots
// ------------------------------------------------------------------
function Ring({ completed, current }) {
  const R = 118, C = 150;
  const dots = [];
  for (let i = 1; i <= 90; i++) {
    const a = ((i - 1) / 90) * Math.PI * 2 - Math.PI / 2;
    const x = C + R * Math.cos(a);
    const y = C + R * Math.sin(a);
    const done = completed.includes(i);
    const isCur = i === current;
    dots.push(
      <circle key={i} cx={x} cy={y} r={isCur ? 6 : done ? 4.5 : 3}
        fill={isCur ? "#D2525C" : done ? "#E5A13C" : "#3A2E4D"}
        className={isCur ? "cur-dot" : ""} />
    );
  }
  const pct = Math.round((completed.length / 90) * 100);
  return (
    <svg viewBox="0 0 300 300" style={{ width: "min(66vw, 250px)", display: "block", margin: "0 auto" }}>
      {dots}
      <text x="150" y="138" textAnchor="middle" fill="#F4ECDC" style={{ font: "700 44px Fraunces, serif" }}>{current}</text>
      <text x="150" y="162" textAnchor="middle" fill="#A395BB" style={{ font: "600 11px Karla, sans-serif", letterSpacing: "2.5px" }}>OF 90 DAYS</text>
      <text x="150" y="186" textAnchor="middle" fill="#E5A13C" style={{ font: "700 14px Karla, sans-serif" }}>{pct}% complete</text>
    </svg>
  );
}

// ------------------------------------------------------------------
// TAB BLOCK
// ------------------------------------------------------------------
function TabBlock({ label, tab }) {
  return (
    <div style={{ marginTop: 12 }}>
      <div style={{ fontSize: 11, fontWeight: 700, color: "#E5A13C", marginBottom: 5 }}>{label}</div>
      <pre style={{ margin: 0, background: "#150F1E", border: "1px solid #3A2E4D", borderRadius: 10, padding: "10px 12px", color: "#F4ECDC", fontSize: 12.5, lineHeight: 1.55, overflowX: "auto", fontFamily: "ui-monospace, Menlo, monospace" }}>{tab}</pre>
    </div>
  );
}

// ------------------------------------------------------------------
// APP
// ------------------------------------------------------------------
export default function Dead90() {
  const [state, setState] = useState(null);
  const [day, setDay] = useState(1);
  const [noteDraft, setNoteDraft] = useState("");
  const [lessonOpen, setLessonOpen] = useState(true);
  const saveTimer = useRef(null);

  useEffect(() => {
    loadState().then((s) => {
      setState(s);
      const next = firstIncomplete(s.completed);
      setDay(next);
      setNoteDraft(s.notes[next] || "");
    });
  }, []);

  function firstIncomplete(completed) {
    for (let i = 1; i <= 90; i++) if (!completed.includes(i)) return i;
    return 90;
  }

  function persist(next) {
    setState(next);
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => saveState(next), 400);
  }

  function toggleBlock(idx) {
    const cur = state.blocks[day] || [];
    const next = cur.includes(idx) ? cur.filter((i) => i !== idx) : [...cur, idx];
    persist({ ...state, blocks: { ...state.blocks, [day]: next } });
  }

  function toggleDay() {
    const done = state.completed.includes(day);
    const completed = done ? state.completed.filter((d) => d !== day) : [...state.completed, day];
    persist({ ...state, completed });
  }

  function goto(d) {
    const nd = Math.min(90, Math.max(1, d));
    setDay(nd);
    setNoteDraft(state.notes[nd] || "");
    setLessonOpen(dayInfo(nd).isWeekStart);
  }

  function saveNote() {
    persist({ ...state, notes: { ...state.notes, [day]: noteDraft } });
  }

  if (!state)
    return (
      <div style={{ minHeight: "100vh", background: "#191221", color: "#A395BB", display: "grid", placeItems: "center", fontFamily: "Karla, sans-serif" }}>
        Tuning up…
      </div>
    );

  const info = dayInfo(day);
  const phase = PHASES[info.phase];
  const doneBlocks = state.blocks[day] || [];
  const dayDone = state.completed.includes(day);

  return (
    <div style={{ minHeight: "100vh", background: "#191221", color: "#F4ECDC", fontFamily: "Karla, sans-serif", paddingBottom: 48 }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400..900;1,9..144,400..900&family=Karla:wght@400;600;700&display=swap');
        * { box-sizing: border-box; }
        .cur-dot { animation: pulse 1.6s ease-in-out infinite; }
        @keyframes pulse { 50% { opacity: .45; } }
        @media (prefers-reduced-motion: reduce) { .cur-dot { animation: none; } }
        button { font-family: Karla, sans-serif; cursor: pointer; }
        textarea:focus, button:focus-visible { outline: 2px solid #E5A13C; outline-offset: 2px; }
      `}</style>

      <div style={{ maxWidth: 460, margin: "0 auto", padding: "26px 18px 0" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 16 }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "3px", color: "#D2525C" }}>A GRATEFUL DEAD GUITAR PROGRAM</div>
          <h1 style={{ fontFamily: "Fraunces, serif", fontWeight: 800, fontSize: 34, margin: "6px 0 0", lineHeight: 1.05 }}>
            Ninety Days<br /><em style={{ color: "#E5A13C", fontWeight: 600 }}>to the Jam</em>
          </h1>
          <div style={{ fontSize: 12.5, color: "#A395BB", marginTop: 8 }}>
            The goal: <span style={{ color: "#F4ECDC", fontWeight: 700 }}>an open mic on night 90</span> — three songs, rhythm and lead, standing, confident.
          </div>
        </div>

        <Ring completed={state.completed} current={day} />

        {/* Phase strip */}
        <div style={{ display: "flex", gap: 8, margin: "16px 0" }}>
          {PHASES.map((p, i) => (
            <div key={p.name} style={{ flex: 1, padding: "8px 6px", borderRadius: 10, textAlign: "center", background: i === info.phase ? "#2A2138" : "transparent", border: `1px solid ${i === info.phase ? "#E5A13C" : "#3A2E4D"}` }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: i === info.phase ? "#E5A13C" : "#A395BB" }}>{p.name}</div>
              <div style={{ fontSize: 10, color: "#A395BB", marginTop: 2 }}>{p.range[0]}–{p.range[1]}</div>
            </div>
          ))}
        </div>

        {/* Day nav */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
          <button onClick={() => goto(day - 1)} disabled={day === 1} style={navBtn(day === 1)}>← Prev</button>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontFamily: "Fraunces, serif", fontSize: 20, fontWeight: 700 }}>Day {day}</div>
            <div style={{ fontSize: 11, color: "#A395BB" }}>Week {info.week} · {info.theme}</div>
          </div>
          <button onClick={() => goto(day + 1)} disabled={day === 90} style={navBtn(day === 90)}>Next →</button>
        </div>

        {/* Weekly lesson (collapsible) */}
        <div style={{ background: "#221A31", border: "1px solid #4a3d63", borderRadius: 14, marginBottom: 12, overflow: "hidden" }}>
          <button onClick={() => setLessonOpen(!lessonOpen)} style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", background: "transparent", border: "none", color: "#F4ECDC", padding: "13px 16px", fontSize: 13, fontWeight: 700, textAlign: "left" }}>
            <span><span style={{ color: "#E5A13C" }}>Lesson · Week {info.week}:</span> {info.theme}</span>
            <span style={{ color: "#A395BB" }}>{lessonOpen ? "−" : "+"}</span>
          </button>
          {lessonOpen && (
            <div style={{ padding: "0 16px 16px" }}>
              {info.lesson.p.map((para, i) => (
                <p key={i} style={{ fontSize: 13.5, lineHeight: 1.6, color: "#DDD2EE", margin: i === 0 ? "0 0 10px" : "10px 0" }}>{para}</p>
              ))}
              {info.weekTabs.map((tb, i) => (
                <TabBlock key={i} label={tb.l} tab={tb.t} />
              ))}
              <div style={{ marginTop: 14, display: "grid", gap: 6 }}>
                {info.lesson.terms.map(([term, def]) => (
                  <div key={term} style={{ fontSize: 12.5, lineHeight: 1.45 }}>
                    <span style={{ color: "#E5A13C", fontWeight: 700 }}>{term}</span>
                    <span style={{ color: "#A395BB" }}> — {def}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Milestone banner */}
        {info.milestone && (
          <div style={{ background: "#2e1e26", border: "1px solid #D2525C", borderRadius: 14, padding: "13px 16px", marginBottom: 12, fontSize: 13.5, lineHeight: 1.5, color: "#F4ECDC", fontWeight: 600 }}>
            {info.milestone}
          </div>
        )}

        {/* Today's focus + how-to */}
        <div style={{ background: "#2A2138", border: "1px solid #3A2E4D", borderRadius: 14, padding: 16, marginBottom: 12 }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "2px", color: "#D2525C", marginBottom: 6 }}>TODAY'S FOCUS</div>
          <div style={{ fontFamily: "Fraunces, serif", fontSize: 19, lineHeight: 1.3, marginBottom: 12 }}>{info.focus}</div>
          <div style={{ display: "grid", gap: 8 }}>
            {info.how.map((step, i) => (
              <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                <div style={{ width: 20, height: 20, borderRadius: "50%", flexShrink: 0, marginTop: 1, display: "grid", placeItems: "center", background: "#3A2E4D", color: "#E5A13C", fontSize: 11, fontWeight: 800 }}>{i + 1}</div>
                <div style={{ fontSize: 13.5, lineHeight: 1.5, color: "#DDD2EE" }}>{step}</div>
              </div>
            ))}
          </div>
          {info.dayTabs.map((tb, i) => (
            <TabBlock key={i} label={tb.l} tab={tb.t} />
          ))}
        </div>

        {/* Session blocks */}
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "2px", color: "#A395BB", margin: "0 0 8px 2px" }}>TODAY'S 40-MINUTE SESSION</div>
        <div style={{ display: "grid", gap: 8, marginBottom: 16 }}>
          {info.blocks.map((b, i) => {
            const on = doneBlocks.includes(i);
            return (
              <button key={i} onClick={() => toggleBlock(i)} style={{ display: "flex", gap: 12, alignItems: "flex-start", textAlign: "left", background: on ? "#241E33" : "#211A2E", border: `1px solid ${on ? "#E5A13C55" : "#3A2E4D"}`, borderRadius: 12, padding: "12px 14px", color: "inherit" }}>
                <div style={{ width: 22, height: 22, borderRadius: 7, flexShrink: 0, marginTop: 2, display: "grid", placeItems: "center", background: on ? "#E5A13C" : "transparent", border: `2px solid ${on ? "#E5A13C" : "#5A4B73"}`, color: "#191221", fontWeight: 800, fontSize: 14 }}>{on ? "✓" : ""}</div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700 }}>{b.n} <span style={{ color: "#E5A13C" }}>· {b.m} min</span></div>
                  <div style={{ fontSize: 13, color: on ? "#8f82a8" : "#CBBFE0", marginTop: 3, lineHeight: 1.4, textDecoration: on ? "line-through" : "none" }}>{b.d}</div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Chord chart for this week (Phase 1) */}
        {info.chordChart && (
          <div style={{ marginBottom: 16, marginTop: -4 }}>
            <TabBlock label={info.chordChart.l} tab={info.chordChart.t} />
            <TabBlock label={STRUM_PATTERNS.l} tab={STRUM_PATTERNS.t} />
          </div>
        )}

        {/* Complete day */}
        <button onClick={toggleDay} style={{ width: "100%", padding: "14px 0", borderRadius: 12, border: "none", fontWeight: 800, fontSize: 15, background: dayDone ? "#3A2E4D" : "#D2525C", color: dayDone ? "#CBBFE0" : "#FFF6E8", marginBottom: 16 }}>
          {dayDone ? "✓ Day complete — tap to undo" : "Mark day complete"}
        </button>

        {/* Notes */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "2px", color: "#A395BB", marginBottom: 6 }}>PRACTICE NOTES — DAY {day}</div>
          <textarea value={noteDraft} onChange={(e) => setNoteDraft(e.target.value)} onBlur={saveNote}
            placeholder="What clicked? What fought back?" rows={3}
            style={{ width: "100%", background: "#211A2E", border: "1px solid #3A2E4D", borderRadius: 12, padding: 12, color: "#F4ECDC", fontFamily: "Karla, sans-serif", fontSize: 14, resize: "vertical" }} />
        </div>

        {/* Stats */}
        <div style={{ display: "flex", gap: 8 }}>
          <Stat label="Days done" value={state.completed.length} />
          <Stat label="This phase" value={state.completed.filter((d) => d >= phase.range[0] && d <= phase.range[1]).length + " / 30"} />
          <Stat label="Session" value="40 min" />
        </div>

        <div style={{ textAlign: "center", marginTop: 26, fontSize: 12, color: "#5A4B73", fontStyle: "italic", fontFamily: "Fraunces, serif" }}>
          "Once in a while you get shown the light…"
        </div>
      </div>
    </div>
  );
}

function navBtn(disabled) {
  return { background: "transparent", border: "1px solid #3A2E4D", color: disabled ? "#4a3d63" : "#CBBFE0", borderRadius: 10, padding: "8px 12px", fontSize: 13, fontWeight: 700 };
}

function Stat({ label, value }) {
  return (
    <div style={{ flex: 1, background: "#211A2E", border: "1px solid #3A2E4D", borderRadius: 12, padding: "10px 8px", textAlign: "center" }}>
      <div style={{ fontFamily: "Fraunces, serif", fontSize: 18, fontWeight: 700, color: "#E5A13C" }}>{value}</div>
      <div style={{ fontSize: 10, color: "#A395BB", marginTop: 2, letterSpacing: "1px" }}>{label.toUpperCase()}</div>
    </div>
  );
}
