// Skill Gym content — technique tracks for electric and acoustic guitar.
//
// Shape follows content/curriculum.schema.json (skills + courses → modules →
// lessons → exercises) and is checked by `npm run validate:curriculum` and by
// src/data/skillTracks.test.js, so schema drift fails the test run.
//
// Every exercise here is original material written for this app: standard
// technique patterns (chromatic picking, pentatonic boxes, p-i-m-a arpeggios,
// alternating-thumb patterns) that are common property of guitar teaching.
//
// Tempo numbers are metronome BPM (quarter note). `feedback.notesPerBeat` says
// how many notes sit on each click, so 100 BPM at notesPerBeat 4 = sixteenths.

const ORDER = ['e', 'B', 'G', 'D', 'A', 'E'];

// Build an aligned six-line ASCII tab from a compact spec, so columns can never
// drift out of line. Tokens are space-separated:
//   B5        fret 5 on the B string          G7b9   bend fret 7 up to fret 9
//   G5h       fret 5, hammer-on follows       E0+A2  notes played together
//   |         bar line                         .      rest (one empty column)
export function tab(spec) {
  let lines = ORDER.map((s) => `${s}|-`);
  for (const token of spec.trim().split(/\s+/)) {
    if (token === '|') {
      lines = lines.map((l) => `${l}|-`);
      continue;
    }
    const cells = {};
    if (token !== '.') {
      for (const part of token.split('+')) {
        const m = part.match(/^([eBGDAE])(\d+(?:b\d+)?[hpsx~]?)$/);
        if (!m) throw new Error(`Bad tab token "${part}" in "${spec}"`);
        cells[m[1]] = m[2];
      }
    }
    const width = Math.max(1, ...Object.values(cells).map((c) => c.length)) + 1;
    lines = lines.map((l, i) => l + (cells[ORDER[i]] || '').padEnd(width, '-'));
  }
  return lines.map((l) => `${l}|`).join('\n');
}

const rep = (pattern, times) => Array.from({ length: times }, () => pattern).join(' | ');

export const SKILLS = [
  { id: 'timekeeping', name: 'Timekeeping with a click', domain: 'rhythm' },
  { id: 'alternate-picking', name: 'Alternate picking', domain: 'technique', prerequisiteSkillIds: ['timekeeping'] },
  { id: 'legato', name: 'Legato (hammer-ons and pull-offs)', domain: 'technique' },
  { id: 'string-bending', name: 'String bending to pitch', domain: 'technique' },
  { id: 'vibrato', name: 'Vibrato control', domain: 'technique', prerequisiteSkillIds: ['string-bending'] },
  { id: 'muting', name: 'Palm and fretting-hand muting', domain: 'technique' },
  { id: 'tone-control', name: 'Tone and amp control', domain: 'style' },
  { id: 'fingerstyle-arpeggio', name: 'Fingerstyle arpeggios (p-i-m-a)', domain: 'technique' },
  { id: 'travis-picking', name: 'Travis picking', domain: 'technique', prerequisiteSkillIds: ['fingerstyle-arpeggio'] },
  { id: 'strum-dynamics', name: 'Strumming dynamics', domain: 'rhythm', prerequisiteSkillIds: ['timekeeping'] },
  { id: 'open-chord-changes', name: 'Open chord and barre changes', domain: 'foundation' },
  { id: 'capo-transposition', name: 'Capo and transposition', domain: 'theory' },
  { id: 'voice-leading', name: 'Voice-leading and bass movement', domain: 'fretboard', prerequisiteSkillIds: ['open-chord-changes'] },
];

const electric = {
  id: 'electric-technique',
  title: 'Electric Technique',
  level: 'intermediate',
  instrument: 'electric',
  description: 'The five things that separate a clean electric player from a noisy one: picking accuracy, legato, bends that land in tune, muting, and deliberate tone.',
  outcomes: [
    'Alternate-pick sixteenth notes cleanly at 120 BPM',
    'Land whole-step and half-step bends within 15 cents of pitch',
    'Play with gain without unwanted string noise',
  ],
  modules: [
    {
      id: 'alternate-picking',
      title: 'Alternate picking',
      description: 'Strict down-up motion, first on one string, then across strings, then through a scale shape.',
      lessons: [
        {
          id: 'picking-engine',
          title: 'The picking engine',
          estimatedMinutes: 15,
          skillIds: ['alternate-picking', 'timekeeping'],
          objectives: ['Keep strict down-up picking at every tempo', 'Cross strings without breaking the down-up order'],
          explanation: [
            'Speed is a by-product of small, even motion. The ladder only moves up when three passes in a row are clean, so the tempo you see is always a tempo you actually own.',
          ],
          exercises: [
            {
              id: 'e-ap-single-string',
              title: 'Single-string sixteenths',
              type: 'scale',
              instructions: [
                'Four notes per click on the B string: frets 5-6-7-8 with fingers 1-2-3-4, then back down.',
                'Strict alternate picking, starting on a downstroke. Never two downs in a row.',
                'One clean pass = four bars with every note sounding and no rushed beat.',
              ],
              listenFor: ['Every note the same volume', 'Upstrokes as loud as downstrokes', 'Notes land exactly on the click, not ahead of it'],
              skillIds: ['alternate-picking', 'timekeeping'],
              tablature: tab(rep('B5 B6 B7 B8 B8 B7 B6 B5', 2)),
              tempo: { startBpm: 60, targetBpm: 120, stepBpm: 4 },
              feedback: { mode: 'timing', notesPerBeat: 4 },
              mastery: { cleanRepetitions: 3, minimumBpm: 120, maximumStumbles: 0 },
            },
            {
              id: 'e-ap-string-crossing',
              title: 'Two-string crossing',
              type: 'scale',
              instructions: [
                'Two notes on the G string, two on the B string, sixteenths. The pick crosses strings on every beat.',
                'Keep the down-up order no matter which string is next. This drills both outside and inside picking.',
                'If the crossing snags, drop one rung and exaggerate the small wrist motion.',
              ],
              listenFor: ['No extra open-string noise at the crossing', 'The first note on the new string is not accented by accident'],
              skillIds: ['alternate-picking'],
              tablature: tab(rep('G5 G7 B5 B7 B7 B5 G7 G5', 2)),
              tempo: { startBpm: 60, targetBpm: 108, stepBpm: 4 },
              feedback: { mode: 'timing', notesPerBeat: 4 },
              mastery: { cleanRepetitions: 3, minimumBpm: 108, maximumStumbles: 0 },
            },
            {
              id: 'e-ap-pentatonic-box',
              title: 'A minor pentatonic, box 1',
              type: 'scale',
              instructions: [
                'Up and down box 1 at the 5th fret, two notes per string, alternate picked.',
                'Start with two notes per click. When 100 BPM is clean, restart the ladder at 60 with four notes per click.',
                'Eyes off the fretting hand for the last pass of each rung.',
              ],
              listenFor: ['Even tone across all six strings', 'Clean landing on the top note before turning around'],
              skillIds: ['alternate-picking'],
              tablature: tab('E5 E8 A5 A7 D5 D7 G5 G7 B5 B8 e5 e8 | e8 e5 B8 B5 G7 G5 D7 D5 A7 A5 E8 E5'),
              tempo: { startBpm: 60, targetBpm: 112, stepBpm: 4 },
              feedback: { mode: 'timing', notesPerBeat: 2 },
              mastery: { cleanRepetitions: 3, minimumBpm: 112, maximumStumbles: 0 },
            },
          ],
        },
      ],
    },
    {
      id: 'legato',
      title: 'Legato',
      description: 'Fretting-hand strength and evenness: notes sounded by hammer-ons and pull-offs should be as loud as picked notes.',
      lessons: [
        {
          id: 'hammer-pull-control',
          title: 'Hammer-on and pull-off control',
          estimatedMinutes: 10,
          skillIds: ['legato'],
          objectives: ['Make slurred notes as loud as picked notes', 'Keep slurs in time instead of rushing them'],
          exercises: [
            {
              id: 'e-leg-trill',
              title: 'Hammer-pull pairs',
              type: 'lick',
              instructions: [
                'Pick fret 5 once, hammer to 7, pull off to 5, hammer to 7. Four notes per click, one pick stroke per beat.',
                'Do it on the G string, then B, then high e. The pull-off is a small sideways pluck, not a lift.',
              ],
              listenFor: ['Hammered note as loud as the picked note', 'Slurs evenly spaced, not rushed toward the next beat'],
              skillIds: ['legato'],
              tablature: tab('G5h G7p G5h G7 | B5h B7p B5h B7 | e5h e7p e5h e7'),
              tempo: { startBpm: 60, targetBpm: 110, stepBpm: 5 },
              feedback: { mode: 'timing', notesPerBeat: 4 },
              mastery: { cleanRepetitions: 3, minimumBpm: 110, maximumStumbles: 0 },
            },
            {
              id: 'e-leg-three-note-roll',
              title: 'Three-note legato roll',
              type: 'lick',
              instructions: [
                'Three notes per click (triplets): pick once, hammer twice going up; pick once, pull twice coming down.',
                'Fingers 1-3-4 on frets 5-7-8. Keep finger 1 planted the whole time.',
              ],
              listenFor: ['The third note of each group still rings clearly', 'No open-string noise when the pinky pulls off'],
              skillIds: ['legato'],
              tablature: tab('G5h G7h G9 | B5h B7h B8 | e5h e7h e8 | e8p e7p e5 | B8p B7p B5 | G9p G7p G5'),
              tempo: { startBpm: 56, targetBpm: 110, stepBpm: 4 },
              feedback: { mode: 'timing', notesPerBeat: 3 },
              mastery: { cleanRepetitions: 3, minimumBpm: 110, maximumStumbles: 0 },
            },
          ],
        },
      ],
    },
    {
      id: 'bends-vibrato',
      title: 'Bends and vibrato',
      description: 'The expressive core of electric lead playing. Use the mic check: a bend only counts when it lands in tune.',
      lessons: [
        {
          id: 'bend-to-pitch',
          title: 'Bend to pitch',
          estimatedMinutes: 12,
          skillIds: ['string-bending'],
          objectives: ['Land whole-step and half-step bends within 15 cents', 'Hold the top of a bend steady'],
          explanation: [
            'Play the target fret first so your ear knows the destination, then bend up to that exact pitch. Push with the wrist turning like a door knob, three fingers on the string, thumb over the top of the neck.',
          ],
          exercises: [
            {
              id: 'e-bend-whole-step',
              title: 'Whole-step bend, G string',
              type: 'lick',
              instructions: [
                'Play fret 9 on the G string (the target), then fret 7 bent up until it matches.',
                'Ring finger does the bend with the index and middle fingers behind it on the same string.',
                'Turn on Bend check: a rep is clean when the meter holds within 15 cents for half a second.',
              ],
              listenFor: ['The bend stops exactly at the target, not short and not over', 'No pitch sag while the note is held'],
              skillIds: ['string-bending'],
              tablature: tab('G9 . G7b9 . | G9 . G7b9 .'),
              tempo: { startBpm: 50, targetBpm: 80, stepBpm: 5 },
              feedback: { mode: 'bend', bendSemitones: 2 },
              mastery: { cleanRepetitions: 5, minimumBpm: 80, maximumStumbles: 0 },
            },
            {
              id: 'e-bend-half-step',
              title: 'Half-step bend, B string',
              type: 'lick',
              instructions: [
                'Play fret 9 on the B string, then fret 8 bent up one fret to match it.',
                'Half-step bends are easy to overshoot. Stop early and creep up to pitch.',
              ],
              listenFor: ['Exactly one fret of pitch, no more', 'The same pitch every repetition'],
              skillIds: ['string-bending'],
              tablature: tab('B9 . B8b9 . | B9 . B8b9 .'),
              tempo: { startBpm: 50, targetBpm: 80, stepBpm: 5 },
              feedback: { mode: 'bend', bendSemitones: 1 },
              mastery: { cleanRepetitions: 5, minimumBpm: 80, maximumStumbles: 0 },
            },
            {
              id: 'e-bend-release',
              title: 'Bend, hold, release',
              type: 'lick',
              instructions: [
                'Bend fret 7 up a whole step over one beat, hold for two beats, release in time over one beat.',
                'The release is a note too: it must arrive back at the fretted pitch on the click.',
              ],
              listenFor: ['Held note stays flat-line steady', 'The release lands on the beat, not early'],
              skillIds: ['string-bending', 'timekeeping'],
              tablature: tab('G7b9 . . G7 | G7b9 . . G7'),
              tempo: { startBpm: 50, targetBpm: 90, stepBpm: 5 },
              feedback: { mode: 'bend', bendSemitones: 2 },
              mastery: { cleanRepetitions: 4, minimumBpm: 90, maximumStumbles: 0 },
            },
          ],
        },
        {
          id: 'vibrato-control',
          title: 'Vibrato control',
          estimatedMinutes: 8,
          skillIds: ['vibrato'],
          prerequisiteLessonIds: ['bend-to-pitch'],
          objectives: ['Produce even vibrato at a chosen speed', 'Return to true pitch on every cycle'],
          exercises: [
            {
              id: 'e-vibrato-pulse',
              title: 'Metered vibrato',
              type: 'lick',
              instructions: [
                'Hold fret 7 on the G string with the ring finger. Vibrato in time: two pulses per click (bend slightly sharp, return to pitch).',
                'Hold each note for four beats. Turn on Vibrato check to see your rate and depth.',
                'Wide and slow first. Narrow nervous vibrato is the thing to train out.',
              ],
              listenFor: ['Every pulse the same width', 'The pitch returns all the way to the fretted note', 'A steady rate you chose, not a tremble'],
              skillIds: ['vibrato'],
              tablature: tab('G7~ . . . | B8~ . . . | e5~ . . .'),
              tempo: { startBpm: 60, targetBpm: 100, stepBpm: 5 },
              feedback: { mode: 'vibrato' },
              mastery: { cleanRepetitions: 4, minimumBpm: 100, maximumStumbles: 0 },
            },
          ],
        },
      ],
    },
    {
      id: 'muting',
      title: 'Muting',
      description: 'With gain on, the notes you do not play matter as much as the ones you do.',
      lessons: [
        {
          id: 'palm-muting',
          title: 'Palm muting',
          estimatedMinutes: 10,
          skillIds: ['muting', 'timekeeping'],
          objectives: ['Hold a consistent palm-mute depth', 'Switch between muted and open strokes in time'],
          exercises: [
            {
              id: 'e-mute-palm-eighths',
              title: 'Palm-muted eighths with an open accent',
              type: 'strum',
              instructions: [
                'Edge of the picking hand rests on the strings right at the bridge. Eighth notes on the open low E, all downstrokes.',
                'Beat 1 of each bar is an open E5 power chord: lift the palm for that one stroke, then mute again.',
                'Use a crunch preset on the Amp page so the difference is obvious.',
              ],
              listenFor: ['Muted notes are tight and all the same length', 'The open accent rings without a late palm landing', 'No drift against the click'],
              skillIds: ['muting', 'timekeeping'],
              tablature: tab(rep('E0+A2+D2 E0 E0 E0 E0 E0 E0 E0', 2)),
              tempo: { startBpm: 80, targetBpm: 160, stepBpm: 6 },
              feedback: { mode: 'timing', notesPerBeat: 2 },
              mastery: { cleanRepetitions: 3, minimumBpm: 160, maximumStumbles: 0 },
            },
            {
              id: 'e-mute-gallop',
              title: 'Gallop rhythm',
              type: 'strum',
              instructions: [
                'One eighth and two sixteenths per beat on the palm-muted low E: down, down-up.',
                'Change to the A string (fret 0) for bar two without loosening the mute.',
              ],
              listenFor: ['The two sixteenths are even, not swung', 'Mute depth does not change on the string change'],
              skillIds: ['muting', 'alternate-picking'],
              tablature: tab('E0 E0 E0 E0 E0 E0 E0 E0 E0 E0 E0 E0 | A0 A0 A0 A0 A0 A0 A0 A0 A0 A0 A0 A0'),
              tempo: { startBpm: 70, targetBpm: 130, stepBpm: 5 },
              feedback: { mode: 'timing', notesPerBeat: 4 },
              mastery: { cleanRepetitions: 3, minimumBpm: 130, maximumStumbles: 0 },
            },
          ],
        },
        {
          id: 'fretting-hand-muting',
          title: 'Fretting-hand muting',
          estimatedMinutes: 8,
          skillIds: ['muting'],
          objectives: ['Silence unplayed strings with the fretting hand', 'Play single notes through a full strum without stray strings'],
          exercises: [
            {
              id: 'e-mute-raked-single-notes',
              title: 'Single notes through a full strum',
              type: 'lick',
              instructions: [
                'Fret the D string at fret 7 with the ring finger. Lay the index finger flat so it touches every other string without pressing.',
                'Strum all six strings hard. Only the one fretted note should sound.',
                'Move the note: 7, 5, 7, 9 on the D string, one strum per click.',
              ],
              listenFor: ['One pitched note and a percussive click, nothing else', 'No open low E or high e ringing through'],
              skillIds: ['muting'],
              tablature: tab('D7 D5 D7 D9 | D7 D5 D7 D9'),
              tempo: { startBpm: 60, targetBpm: 100, stepBpm: 5 },
              feedback: { mode: 'timing', notesPerBeat: 1 },
              mastery: { cleanRepetitions: 4, minimumBpm: 100, maximumStumbles: 0 },
            },
          ],
        },
      ],
    },
    {
      id: 'tone-and-amp',
      title: 'Tone and amp',
      description: 'Tone is mostly hands, then the guitar controls, then the amp. Train them in that order.',
      lessons: [
        {
          id: 'dynamics-into-gain',
          title: 'Dynamics into gain',
          estimatedMinutes: 10,
          skillIds: ['tone-control'],
          objectives: ['Clean up a driven amp with pick attack alone', 'Match the amp setting to the part'],
          exercises: [
            {
              id: 'e-tone-pick-dynamics',
              title: 'Clean to crunch with the pick',
              type: 'lick',
              instructions: [
                'Load an edge-of-breakup preset on the Amp page (a Deluxe or Bassman style model with gain around 4).',
                'Play the phrase for two bars as softly as you can so it stays clean, then two bars digging in so it breaks up.',
                'Do not touch any knob. The only variable is your picking hand.',
              ],
              listenFor: ['A clearly clean sound and a clearly driven sound from the same setting', 'Tempo does not speed up when you dig in'],
              skillIds: ['tone-control'],
              tablature: tab('G5 G7 B5 B8 | G7 G5 D7 D5 | G5 G7 B5 B8 | G7 G5 D7 D5'),
              tempo: { startBpm: 70, targetBpm: 100, stepBpm: 5 },
              feedback: { mode: 'timing', notesPerBeat: 1 },
              mastery: { cleanRepetitions: 3, minimumBpm: 100, maximumStumbles: 0 },
            },
            {
              id: 'e-tone-three-settings',
              title: 'One phrase, three amps',
              type: 'knowledge',
              instructions: [
                'Play the same four-bar phrase on a clean preset, a crunch preset and a lead preset from the Amp page.',
                'For each one, change one thing to make it sit right: pick position, guitar volume knob, or pickup selector. Say out loud what you changed and why.',
                'A clean rep = all three settings played back to back without stopping, each sounding intentional.',
              ],
              listenFor: ['Clean: every note even, no harsh pick click', 'Crunch: chords still have note definition', 'Lead: sustain without noise between notes'],
              skillIds: ['tone-control', 'muting'],
              tablature: tab('G5 G7 B5 B8 | G7 G5 D7 D5'),
              mastery: { cleanRepetitions: 3 },
            },
          ],
        },
      ],
    },
  ],
};

const acoustic = {
  id: 'acoustic-technique',
  title: 'Acoustic Technique',
  level: 'intermediate',
  instrument: 'acoustic',
  description: 'The acoustic side of the same hands: independent fingers, a thumb that keeps time, strumming with a real dynamic range, and chord changes that connect.',
  outcomes: [
    'Hold a Travis pattern through chord changes at 100 BPM',
    'Strum with three clearly different volume levels on demand',
    'Connect open chords with bass walk-ups and shared tones',
  ],
  modules: [
    {
      id: 'fingerstyle-foundations',
      title: 'Fingerstyle foundations',
      description: 'Thumb (p) owns the three bass strings. Index (i), middle (m) and ring (a) own G, B and high e.',
      lessons: [
        {
          id: 'pima-arpeggios',
          title: 'p-i-m-a arpeggios',
          estimatedMinutes: 12,
          skillIds: ['fingerstyle-arpeggio'],
          objectives: ['Assign one finger per string and keep it there', 'Play arpeggios with even volume across all fingers'],
          exercises: [
            {
              id: 'a-fs-pima-em',
              title: 'p-i-m-a on E minor',
              type: 'fingerstyle',
              instructions: [
                'Hold Em. Thumb plays the low E, then index G string, middle B string, ring high e. Two notes per click.',
                'Rest the hand lightly; fingers move from the big knuckle and return to their string.',
                'Up then back down: p-i-m-a-m-i.',
              ],
              listenFor: ['The ring finger is as loud as the thumb', 'No gap when the pattern turns around'],
              skillIds: ['fingerstyle-arpeggio', 'timekeeping'],
              tablature: tab(rep('E0 G0 B0 e0 B0 G0 E0 G0', 2)),
              tempo: { startBpm: 60, targetBpm: 110, stepBpm: 5 },
              feedback: { mode: 'timing', notesPerBeat: 2 },
              mastery: { cleanRepetitions: 3, minimumBpm: 110, maximumStumbles: 0 },
            },
            {
              id: 'a-fs-pima-changes',
              title: 'Arpeggio through C, Am, G, Em',
              type: 'fingerstyle',
              instructions: [
                'One bar per chord. The thumb moves to each chord\'s root: A string for C and Am, low E for G and Em.',
                'Change the fretting hand during the last note of the bar. The picking hand never waits.',
              ],
              listenFor: ['The first bass note of each bar is on the click', 'No buzzing on the first note after a change'],
              skillIds: ['fingerstyle-arpeggio', 'open-chord-changes'],
              tablature: tab('A3 G0 B1 e0 B1 G0 A3 G0 | A0 G2 B1 e0 B1 G2 A0 G2 | E3 G0 B0 e3 B0 G0 E3 G0 | E0 G0 B0 e0 B0 G0 E0 G0'),
              tempo: { startBpm: 56, targetBpm: 100, stepBpm: 4 },
              feedback: { mode: 'timing', notesPerBeat: 2 },
              mastery: { cleanRepetitions: 3, minimumBpm: 100, maximumStumbles: 0 },
            },
            {
              id: 'a-fs-pinch',
              title: 'Pinch and roll on G',
              type: 'fingerstyle',
              instructions: [
                'Beat 1 is a pinch: thumb on the low E and ring finger on the high e at the same moment.',
                'Then roll inward: index, middle, index. Repeat with the thumb on the D string for beats 3 and 4.',
              ],
              listenFor: ['The two pinched notes sound as one', 'Bass note rings under the roll instead of being cut off'],
              skillIds: ['fingerstyle-arpeggio'],
              tablature: tab(rep('E3+e3 G0 B0 G0 D0+e3 G0 B0 G0', 2)),
              tempo: { startBpm: 56, targetBpm: 100, stepBpm: 4 },
              feedback: { mode: 'timing', notesPerBeat: 2 },
              mastery: { cleanRepetitions: 3, minimumBpm: 100, maximumStumbles: 0 },
            },
          ],
        },
      ],
    },
    {
      id: 'travis-picking',
      title: 'Travis picking',
      description: 'A thumb that alternates on its own, with the fingers added on top. Built in three layers.',
      lessons: [
        {
          id: 'alternating-thumb',
          title: 'The alternating thumb',
          estimatedMinutes: 15,
          skillIds: ['travis-picking', 'timekeeping'],
          prerequisiteLessonIds: ['pima-arpeggios'],
          objectives: ['Keep the thumb alternating without thinking about it', 'Add fingers on the off-beats without disturbing the thumb'],
          explanation: [
            'Do not add fingers until the thumb can run by itself while you hold a conversation. Every problem in Travis picking is a thumb problem.',
          ],
          exercises: [
            {
              id: 'a-tr-thumb-only',
              title: 'Thumb alone on C',
              type: 'fingerstyle',
              instructions: [
                'Hold C. Thumb alternates A string, D string, one note per click. Nothing else plays.',
                'Lightly palm-mute the bass strings so the thumb thumps.',
                'Count out loud, then talk out loud. The thumb must not stop.',
              ],
              listenFor: ['Dead-even quarter notes', 'Both bass notes the same volume'],
              skillIds: ['travis-picking', 'timekeeping'],
              tablature: tab(rep('A3 D2 A3 D2', 2)),
              tempo: { startBpm: 60, targetBpm: 120, stepBpm: 6 },
              feedback: { mode: 'timing', notesPerBeat: 1 },
              mastery: { cleanRepetitions: 3, minimumBpm: 120, maximumStumbles: 0 },
            },
            {
              id: 'a-tr-basic-pattern',
              title: 'Thumb plus off-beat fingers on C',
              type: 'fingerstyle',
              instructions: [
                'Thumb keeps A, D, A, D on the clicks. Between the clicks add: index on the G string, then middle on the B string.',
                'Beat 1 is thumb alone. The pattern is thumb, thumb-then-index, thumb-then-middle, thumb-then-index.',
                'If the thumb stumbles, go back to the thumb-only exercise for one minute.',
              ],
              listenFor: ['Thumb stays on the click when a finger is added', 'Finger notes are quieter than the bass'],
              skillIds: ['travis-picking'],
              tablature: tab(rep('A3 . D2 G0 A3 B1 D2 G0', 2)),
              tempo: { startBpm: 56, targetBpm: 110, stepBpm: 4 },
              feedback: { mode: 'timing', notesPerBeat: 2 },
              mastery: { cleanRepetitions: 3, minimumBpm: 110, maximumStumbles: 0 },
            },
            {
              id: 'a-tr-pattern-changes',
              title: 'The pattern through C, G, Am, F',
              type: 'fingerstyle',
              instructions: [
                'Same picking pattern, one bar per chord. The thumb alternates root and D string: C (A, D), G (low E, D), Am (A, D), Fmaj7 (D, G).',
                'For Fmaj7 the whole pattern moves up one string set: thumb on D and G, fingers on B and high e.',
                'Loop it. A clean rep is four times around without the thumb hesitating at a change.',
              ],
              listenFor: ['No pause before the first beat of a new chord', 'Pattern stays identical on every chord'],
              skillIds: ['travis-picking', 'open-chord-changes'],
              tablature: tab('A3 . D2 G0 A3 B1 D2 G0 | E3 . D0 G0 E3 B0 D0 G0 | A0 . D2 G2 A0 B1 D2 G2 | D3 . G2 B1 D3 e0 G2 B1'),
              tempo: { startBpm: 54, targetBpm: 100, stepBpm: 4 },
              feedback: { mode: 'timing', notesPerBeat: 2 },
              mastery: { cleanRepetitions: 3, minimumBpm: 100, maximumStumbles: 0 },
            },
          ],
        },
      ],
    },
    {
      id: 'strumming-dynamics',
      title: 'Strumming dynamics',
      description: 'An acoustic guitar has a huge volume range. Most players use a third of it.',
      lessons: [
        {
          id: 'accents-and-volume',
          title: 'Accents and volume',
          estimatedMinutes: 12,
          skillIds: ['strum-dynamics', 'timekeeping'],
          objectives: ['Place accents on chosen beats inside a constant strumming motion', 'Play three distinct volume levels at the same tempo'],
          exercises: [
            {
              id: 'a-st-accented-sixteenths',
              title: 'Sixteenth strum with accents on 2 and 4',
              type: 'strum',
              instructions: [
                'Hold Em. Constant down-up sixteenths, four strokes per click, very light.',
                'Accent only the downstroke on beats 2 and 4, like a snare drum. Everything else stays quiet.',
                'The arm speed never changes. An accent is a deeper stroke, not a faster one.',
              ],
              listenFor: ['Accents are obviously louder, ghost strokes obviously softer', 'Up-strokes catch only the top three strings'],
              skillIds: ['strum-dynamics', 'timekeeping'],
              chords: ['Em'],
              tablature: 'count:  1 e & a 2 e & a 3 e & a 4 e & a\nstroke: d u d u D u d u d u d u D u d u\n        (capital = accent)',
              tempo: { startBpm: 60, targetBpm: 100, stepBpm: 4 },
              feedback: { mode: 'timing', notesPerBeat: 4 },
              mastery: { cleanRepetitions: 3, minimumBpm: 100, maximumStumbles: 0 },
            },
            {
              id: 'a-st-volume-ladder',
              title: 'Three-level volume ladder',
              type: 'strum',
              instructions: [
                'Pattern D, D-U, U-D-U on G. Four bars soft, four bars medium, four bars loud, four bars medium, back to soft.',
                'Loud comes from a bigger arm arc and more strings, not from gripping the pick harder.',
                'Record one pass and listen: can you clearly hear three levels?',
              ],
              listenFor: ['Three clearly separate volumes', 'Tempo does not rush when it gets loud or drag when it gets soft'],
              skillIds: ['strum-dynamics'],
              chords: ['G'],
              tablature: 'count:  1 & 2 & 3 & 4 &\nstroke: D   D U   U D U\nlevels: soft x4 | medium x4 | loud x4 | medium x4',
              tempo: { startBpm: 70, targetBpm: 110, stepBpm: 5 },
              feedback: { mode: 'timing', notesPerBeat: 2 },
              mastery: { cleanRepetitions: 3, minimumBpm: 110, maximumStumbles: 0 },
            },
            {
              id: 'a-st-alternating-bass',
              title: 'Alternating-bass strum on G and C',
              type: 'strum',
              instructions: [
                'Bass note on beats 1 and 3, a light strum of the top strings on 2 and 4.',
                'G: low E string then D string. C: A string then D string. Two bars each.',
                'The bass notes are single strings. Aim the pick; do not rake.',
              ],
              listenFor: ['Bass notes are single and clear', 'The strum is lighter than the bass note'],
              skillIds: ['strum-dynamics', 'voice-leading'],
              chords: ['G', 'C'],
              tablature: tab('E3 G0+B0+e3 D0 G0+B0+e3 | E3 G0+B0+e3 D0 G0+B0+e3 | A3 G0+B1+e0 D2 G0+B1+e0 | A3 G0+B1+e0 D2 G0+B1+e0'),
              tempo: { startBpm: 70, targetBpm: 120, stepBpm: 5 },
              feedback: { mode: 'timing', notesPerBeat: 1 },
              mastery: { cleanRepetitions: 3, minimumBpm: 120, maximumStumbles: 0 },
            },
          ],
        },
      ],
    },
    {
      id: 'chords-and-capo',
      title: 'Open chords and capo',
      description: 'Changes fast enough to disappear, and the capo as a thinking tool rather than a crutch.',
      lessons: [
        {
          id: 'changes-on-the-clock',
          title: 'Changes on the clock',
          estimatedMinutes: 10,
          skillIds: ['open-chord-changes', 'timekeeping'],
          objectives: ['Land open chord changes on the beat at tempo', 'Get the F barre ringing inside a progression'],
          exercises: [
            {
              id: 'a-ch-two-beat-changes',
              title: 'G to C every two beats',
              type: 'change',
              instructions: [
                'One strum per click. Two strums on G, two on C, around and around.',
                'All fingers leave together and land together. Slow the ladder down if they arrive one at a time.',
                'At 120 BPM this is 60 clean changes a minute.',
              ],
              listenFor: ['First strum after the change has all six strings ringing', 'No gap of silence before the change'],
              skillIds: ['open-chord-changes', 'timekeeping'],
              chords: ['G', 'C'],
              tablature: tab('E3+A2+D0+G0+B0+e3 E3+A2+D0+G0+B0+e3 A3+D2+G0+B1+e0 A3+D2+G0+B1+e0'),
              tempo: { startBpm: 60, targetBpm: 120, stepBpm: 6 },
              feedback: { mode: 'timing', notesPerBeat: 1 },
              mastery: { cleanRepetitions: 3, minimumBpm: 120, maximumStumbles: 0 },
            },
            {
              id: 'a-ch-f-barre-in-context',
              title: 'F barre inside C, F, C, G',
              type: 'change',
              instructions: [
                'One bar each of C, F (full barre at fret 1), C, G. Four strums per bar.',
                'Before the ladder: hold the F and pluck each string. Fix any dead string by rolling the index finger slightly onto its bony edge.',
                'A clean rep means all six strings of the F ring on its first strum.',
              ],
              listenFor: ['F has no dead B or high e string', 'The change into F is on time, not a beat late'],
              skillIds: ['open-chord-changes'],
              chords: ['C', 'F', 'G'],
              tablature: tab('A3+D2+G0+B1+e0 | E1+A3+D3+G2+B1+e1 | A3+D2+G0+B1+e0 | E3+A2+D0+G0+B0+e3'),
              tempo: { startBpm: 50, targetBpm: 100, stepBpm: 5 },
              feedback: { mode: 'timing', notesPerBeat: 1 },
              mastery: { cleanRepetitions: 3, minimumBpm: 100, maximumStumbles: 0 },
            },
          ],
        },
        {
          id: 'capo-thinking',
          title: 'Capo thinking',
          estimatedMinutes: 8,
          skillIds: ['capo-transposition'],
          objectives: ['Name the sounding key for any capo position and shape', 'Move a song to a new key with a capo in under a minute'],
          exercises: [
            {
              id: 'a-ch-capo-transposition',
              title: 'Same shapes, new key',
              type: 'knowledge',
              instructions: [
                'Capo at fret 2. Play G, C, D, Em shapes and say the sounding chords out loud: A, D, E, F sharp minor.',
                'Move the capo to fret 4 and play C, F, G, Am shapes: they sound as E, A, B, C sharp minor.',
                'Rule: every capo fret raises the sounding chord one half step from the shape you are holding.',
                'A clean rep = one progression named correctly at a new capo position with no pause.',
              ],
              listenFor: ['Every string still rings after the capo goes on', 'Retune check: capo pressure pulls strings sharp'],
              skillIds: ['capo-transposition', 'open-chord-changes'],
              chords: ['G', 'C', 'D', 'Em'],
              mastery: { cleanRepetitions: 4 },
            },
          ],
        },
      ],
    },
    {
      id: 'voice-leading',
      title: 'Voice-leading',
      description: 'Make chord changes sound like one moving part instead of four separate blocks.',
      lessons: [
        {
          id: 'moving-bass-and-common-tones',
          title: 'Moving bass and common tones',
          estimatedMinutes: 12,
          skillIds: ['voice-leading', 'open-chord-changes'],
          prerequisiteLessonIds: ['changes-on-the-clock'],
          objectives: ['Connect chords with a walking bass note', 'Keep shared fingers planted through a change'],
          exercises: [
            {
              id: 'a-vl-walk-ups',
              title: 'Walk-up from G to C and back',
              type: 'change',
              instructions: [
                'Bar 1: G bass note, strum, then walk A string open, fret 2. Land on the C chord on beat 1 of bar 2.',
                'Bar 2: C bass note, strum, then walk back down A string fret 2, open. Land on G.',
                'The walking notes replace the last two beats of the bar. Nothing is added to the count.',
              ],
              listenFor: ['Walk notes are in time and as loud as the bass notes', 'The landing chord arrives exactly on beat 1'],
              skillIds: ['voice-leading'],
              chords: ['G', 'C'],
              tablature: tab('E3 G0+B0+e3 A0 A2 | A3 G0+B1+e0 A2 A0 | E3 G0+B0+e3 A0 A2 | A3 G0+B1+e0 A2 A0'),
              tempo: { startBpm: 60, targetBpm: 110, stepBpm: 5 },
              feedback: { mode: 'timing', notesPerBeat: 1 },
              mastery: { cleanRepetitions: 3, minimumBpm: 110, maximumStumbles: 0 },
            },
            {
              id: 'a-vl-descending-bass',
              title: 'Descending bass line: C, C/B, Am, Am/G',
              type: 'change',
              instructions: [
                'Two beats per chord. Only the bass note moves: A string fret 3, fret 2, open, then low E fret 3.',
                'Keep the index finger on the B string fret 1 for all four chords. That shared note is the glue.',
                'Bass note on the first beat, light strum on the second.',
              ],
              listenFor: ['You can sing the bass line', 'The top of the chord does not change volume as the bass moves'],
              skillIds: ['voice-leading'],
              chords: ['C', 'C/B', 'Am', 'Am/G'],
              tablature: tab('A3 D2+G0+B1+e0 A2 D2+G0+B1+e0 | A0 D2+G2+B1+e0 E3 D2+G2+B1+e0'),
              tempo: { startBpm: 60, targetBpm: 110, stepBpm: 5 },
              feedback: { mode: 'timing', notesPerBeat: 1 },
              mastery: { cleanRepetitions: 3, minimumBpm: 110, maximumStumbles: 0 },
            },
            {
              id: 'a-vl-anchored-changes',
              title: 'Anchored changes: G, Cadd9, Em7, Dsus4',
              type: 'change',
              instructions: [
                'Ring finger on the B string fret 3 and pinky on the high e fret 3 stay down for all four chords.',
                'Only the index and middle fingers move. One bar each, pattern D, D-U, U-D-U.',
                'Because two fingers never lift, these changes can go much faster than ordinary ones. Push the ladder.',
              ],
              listenFor: ['The two anchored notes ring straight through every change', 'No squeak or gap between chords'],
              skillIds: ['voice-leading', 'open-chord-changes', 'strum-dynamics'],
              chords: ['G', 'Cadd9', 'Em7', 'Dsus4'],
              tablature: tab('E3+A2+D0+G0+B3+e3 | A3+D2+G0+B3+e3 | E0+A2+D2+G0+B3+e3 | D0+G2+B3+e3'),
              tempo: { startBpm: 70, targetBpm: 126, stepBpm: 6 },
              feedback: { mode: 'timing', notesPerBeat: 2 },
              mastery: { cleanRepetitions: 3, minimumBpm: 126, maximumStumbles: 0 },
            },
          ],
        },
      ],
    },
  ],
};

export const SKILL_TRACKS = {
  schemaVersion: 1,
  skills: SKILLS,
  courses: [electric, acoustic],
};

export default SKILL_TRACKS;
