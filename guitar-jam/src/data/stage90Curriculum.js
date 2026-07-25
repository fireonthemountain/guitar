// Stage Ready 90 — the daily curriculum. 14 weeks (0–13) × 7 days = 98 days.
// Day 7 of every week is Assessment Day (the Assessment tab takes over).
// Tab convention matches the rest of the repo: top line = high e string.
// Chord voicings here are the standard shapes (the source bootcamp doc's
// diagrams were wrong for A and D — these are corrected).

export const STAGE90_TOTAL_DAYS = 98;

const OPEN_CHORDS = {
  l: 'The five open chords — this month\'s home base (x = don\'t play that string)',
  t: `      G   C   D   Em  Am
e|----3---0---2---0---0--
B|----0---1---3---0---1--
G|----0---0---2---0---2--
D|----0---2---0---2---2--
A|----2---3---x---2---0--
E|----3---x---x---0---x--`,
};

const F_BARRE = {
  l: 'F major barre — index flat across fret 1, thumb low behind the neck',
  t: `e|----1--  (index barre)
B|----1--  (index barre)
G|----2--  (middle)
D|----3--  (ring)
A|----3--  (pinky)
E|----1--  (index barre)`,
};

const STRUM_CHART = {
  l: 'The three strum patterns (D = down, U = up; keep the arm moving on the &s you skip)',
  t: `count:        1  &  2  &  3  &  4  &
1 Anchor      D     D     D     D
2 Workhorse   D     D  U     U  D  U
3 Pushed      D     D  U  D  U  D  U

Start every pattern on one chord until it is boring,
then take it across changes.`,
};

const REFERENCE_TAB = {
  l: 'The reference progression — your weekly tempo test (one bar each, pattern 2)',
  t: `| G . . . | D . . . | Em . . . | C . . . |  (repeat)`,
};

const TWELVE_BAR = {
  l: '12-bar blues in G — the recovery playground (1 bar = 4 beats)',
  t: `| G . . . | G . . . | G . . . | G . . . |
| C . . . | C . . . | G . . . | G . . . |
| D . . . | C . . . | G . . . | D . . . |
bars 1-4: I chord   bars 5-8: IV then I   bars 9-12: V-IV-I turnaround`,
};

// A practice day: f = focus, h = the numbered steps.
const A = (w) => ({
  f: 'Assessment Day',
  h: [
    'No normal practice today — open the Assessment tab and take the week ' + w + ' assessment.',
    'Record your take first, one attempt, no warm-up run. Grade honestly.',
    'Read the injected focus it produces — that list is tomorrow\'s warm-up.',
  ],
  assessment: true,
});

export const STAGE90_WEEKS = [
  {
    w: 0,
    t: 'Placement',
    lesson: {
      p: [
        'This week finds your honest starting point. Nothing is pass/fail in spirit — the week-0 assessment routes the next two weeks, nothing more. Play everything, note what fights back, and resist the urge to practice for the test.',
        'One habit starts now and never leaves: the string-by-string tone check. Form a chord, then pluck each string alone and listen. Buzz means more fingertip pressure or move closer behind the fret; a dead string means another finger is leaning on it — arch more.',
      ],
      tabs: [OPEN_CHORDS],
      terms: [
        ['Tone check', 'Pluck each string of a held chord one at a time, listening for buzz or mutes'],
        ['Change sprint', 'One minute of switching between two chords, counting clean landings'],
        ['BPM', 'Beats per minute — the metronome number'],
      ],
    },
    days: [
      { f: 'Meet the five chords', h: ['Form G, C, D, Em, Am from the chart, one at a time — no strumming yet.', 'Tone check each: pluck every string, fix what buzzes, hold 3 seconds, release, repeat 5×.', 'Finish with one slow strum of each chord that rings.'] },
      { f: 'Change drill baseline', h: ['One-minute change sprint G→C: count clean landings, write the number down.', 'Same for G→D and C→D.', 'These three numbers are your baseline — they only go up from here.'] },
      { f: 'Meet the click', h: ['Metronome at 60. Strum G on every click for one minute — just downstrokes.', 'Do the same on C and Em. Drifting is normal; noticing the drift is the skill.', 'Last round: close your eyes for the middle 20 seconds.'] },
      { f: 'F barre trial', h: ['Lay your index flat across fret 1, thumb low behind the neck. Squeeze and strum — count how many strings sound.', 'Add middle, ring, pinky per the chart. Count again.', 'Three minutes total, then shake your hand out. This is a trial, not a verdict.'] },
      { f: 'First mini-songs', h: ['Loop G–C–D, 8 slow beats each, around and around.', 'Loop Em–C–G–D the same way — that progression is half of pop music.', 'Keep changes slow enough to land clean. Smooth now beats fast later.'] },
      { f: 'Placement dress rehearsal', h: ['Run tomorrow\'s four criteria informally: tone-check the five chords, one G→C sprint, one minute on the click, one F barre attempt.', 'No grading today — just note which one feels shakiest.', 'Give the shakiest one five extra minutes.'] },
      A(0),
    ],
  },
  {
    w: 1,
    t: 'Open chords & the click',
    lesson: {
      p: [
        'Two things matter this week: chords that ring on demand, and a right hand that agrees with the clock. Strumming pattern 2 (the workhorse) enters — it fits nearly every song you might pick next week.',
        'Start listening for set-song candidates this week. You want three songs you love enough to play five hundred times: mostly 3–4 open chords, singable, and at most one that scares you a little.',
      ],
      tabs: [STRUM_CHART, REFERENCE_TAB],
      terms: [
        ['Pattern 2 (workhorse)', 'D-D U-U D U — the campfire strum that fits almost everything'],
        ['Reference progression', 'G–D–Em–C, one bar each — the fixed loop your weekly tempo test measures'],
      ],
    },
    days: [
      { f: 'Tone work on the weak chords', h: ['Yesterday\'s assessment named your weak chords — give each 5 minutes of tone checks.', 'Then one-minute change sprints pairing each weak chord with G.', 'End with the reference progression, slow, all four chords ringing.'] },
      { f: 'Change sprints toward 30', h: ['Three one-minute sprints: G→C, C→D, G→Em. Log the best number.', 'On the slowest pair: watch your fretting hand — which finger arrives last? Lead with that finger 10 changes in a row.', 'One pass of the reference progression at 60 BPM.'] },
      { f: 'The workhorse pattern', h: ['Pattern 2 on G alone, metronome 60, two minutes straight. Say it out loud: "down, down-up, up-down-up."', 'Same on Em. Keep the arm swinging through the skipped beats.', 'Speed is not the goal — an unbroken two minutes is.'] },
      { f: 'Pattern across changes', h: ['Pattern 2 on G for one bar, then C for one bar. The change happens during the last up-strum — start moving early.', 'Extend to the full reference progression, one bar each.', 'Three clean loops at 60 BPM ends the day.'] },
      { f: 'The minor chords', h: ['Em and Am get the spotlight: tone check, then Em→Am sprints.', 'Loop Am–C–G–D with pattern 2 — hear how the minor start changes the mood.', 'One clean pass of the reference progression, eyes closed on the changes.'] },
      { f: 'Two minutes, no stopping', h: ['The week\'s bar: pattern 2, steady at 60 BPM, for two unbroken minutes on one chord. Run it.', 'If it broke, rest and run it again — twice more max.', 'Then reference progression loops until the timer says stop.'] },
      A(1),
    ],
  },
  {
    w: 2,
    t: 'Pick the set',
    lesson: {
      p: [
        'This is the most consequential week of the program: you choose the three songs you will play on gig night. Pick with your ears and your honesty — two songs that feel easy, one reach. Mostly open chords. Songs you can imagine singing or humming in front of strangers.',
        'Once chosen, add them to My Set in the Songbook tab with a target tempo. Song 1 — the easiest — starts work immediately. A good-enough set practiced for eleven weeks beats a perfect set postponed. And if a song fights your voice, a capo is the honest fix — move it up until singing feels easy, and note the fret in My Set.',
      ],
      tabs: [REFERENCE_TAB],
      terms: [
        ['Chunking', 'Practicing a song 4 bars at a time until each chunk is boring, then chaining chunks'],
        ['Target tempo', 'The BPM the real song sits at — your percentages all measure against this'],
      ],
    },
    days: [
      { f: 'Shortlist six candidates', h: ['List six songs you\'d be proud to play. For each, look up the chords — cross off anything needing more than one barre shape.', 'Play the chord loop of the top three, slow, pattern 2.', 'Sleep on it. Tomorrow you commit.'] },
      { f: 'Commit to three', h: ['Pick the three. Write each song\'s chords and target tempo in My Set (Songbook tab).', 'Order them: song 1 = easiest, song 3 = the reach.', 'Play each song\'s chord loop once, slow — say hello to the next eleven weeks.'] },
      { f: 'Song 1: the verse', h: ['Write out the verse progression. Loop it in 4-bar chunks at 50% tempo, pattern 2.', 'Tone check any chord that buzzes under pressure of the change.', 'Finish with two full verse loops, slow and clean.'] },
      { f: 'Chunk and chain', h: ['Each verse chunk at 50% until it bores you, then chain pairs of chunks.', 'The change sprint habit continues: two sprints on song 1\'s hardest chord pair.', 'One full verse at 60% to close.'] },
      { f: 'Changes toward 35', h: ['Three one-minute sprints on song 1\'s chord pairs. Log the best.', 'Reference progression tempo ladder: 60 → 65 → 70, two loops each, stop where it frays.', 'One relaxed verse loop to shake it off.'] },
      { f: 'Verse on the clock', h: ['The week\'s bar: song 1 verse with the metronome at 60% target tempo, no stopping. Run it.', 'Mark the bar where it wobbles; loop just that bar 10×.', 'Run the verse once more. Better is enough.'] },
      A(2),
    ],
  },
  {
    w: 3,
    t: 'Chaining sections',
    lesson: {
      p: [
        'Song 1 grows from sections into a form this week: verse into chorus without a seam. The secret is that transitions are their own 2-bar song — the last bar of one section into the first bar of the next. Drill the seam, not the sections.',
        'Dynamics enter too. A performance is loud and soft on purpose; practice volume as a choice, not an accident. And if your set needs the F barre, its daily three minutes start now — if not, skip those steps guilt-free.',
      ],
      tabs: [F_BARRE, STRUM_CHART],
      terms: [
        ['The seam', 'The two-bar transition between sections — where songs actually fall apart'],
        ['Dynamics', 'Deliberate volume: soft verses, big choruses'],
      ],
    },
    days: [
      { f: 'Song 1: the chorus', h: ['Chunk the chorus at 50% like you did the verse.', 'Tone check under pressure: the chorus\'s hardest chord gets 10 slow changes.', 'Two full chorus loops, clean.'] },
      { f: 'Drill the seam', h: ['Play only the last bar of the verse into the first bar of the chorus, 10× slow.', 'Then the chorus-back-to-verse seam, 10×.', 'Chain verse → chorus → verse once at 60%.'] },
      { f: 'Chain at 70', h: ['Full verse + chorus chained at 70% target tempo, three attempts.', 'Between attempts: 5 slow reps of whichever seam broke.', 'F barre (if your set needs it): 3 minutes of tone work, count the ringing strings.'] },
      { f: 'The volume ladder', h: ['On one chord, pattern 2: 4 bars soft → 4 medium → 4 loud → back down. Twice.', 'Play the verse soft and the chorus loud, 60% tempo.', 'Notice: loud comes from arm speed, not a death grip.', 'New in Licks & Picking: the boom-chick. Two minutes on G — bass note, then strum.'] },
      { f: 'Barre plus chain', h: ['F barre 3 minutes: barre-only squeeze holds, then full shape, string count each time.', 'Verse + chorus chain at 70%, dynamics on.', 'One change sprint on the song\'s hardest pair — the habit continues.'] },
      { f: 'Record the chain', h: ['Phone up: record verse + chorus at 70%, one take.', 'Watch it. Write one sentence about the seam and one about your strumming arm.', 'Run the chain once more, fixing only the one thing you named.'] },
      A(3),
    ],
  },
  {
    w: 4,
    t: 'Foundation exit',
    lesson: {
      p: [
        'Gate week. Pass the week-4 assessment and the next five weeks are pure song work. The bar: changes at 40+ per minute, one full song top-to-bottom at 70% with the sheet, and a 70+ tempo test. None of it requires brilliance — it requires this week\'s reps.',
        'The full-song run has a rule that now applies forever: no stopping. A flub costs one bar, not the song. Train the reflex of continuing — it is the single most stage-relevant skill in this program.',
      ],
      tabs: [REFERENCE_TAB, TWELVE_BAR],
      terms: [
        ['Trouble bars', 'The 2–3 specific bars where a song breaks — drill these, not the whole song'],
        ['No-stopping rule', 'From now on, full runs continue through mistakes. Always.'],
      ],
    },
    days: [
      { f: 'Push the sprints', h: ['Five one-minute change sprints across your pairs — chase 40.', 'Rest a full minute between sprints; sloppy reps teach sloppy changes.', 'One verse + chorus chain at 70% to remember what it\'s for.'] },
      { f: 'Map the trouble bars', h: ['Play song 1 top-to-bottom at 60%, sheet up, no stopping — and mark every bar that wobbles.', 'Drill only the marked bars at 50%, 10× each.', 'Run the full form again. Compare wobble count.'] },
      { f: 'Full song at 70', h: ['Three full runs at 70%, sheet allowed, no stopping. Log stumbles per run.', 'Between runs: 5 reps on the worst bar only.', 'Best run of the three is your benchmark — write its stumble count down.'] },
      { f: 'Tempo ladder day', h: ['Reference progression: 60 → 65 → 70 → 75, two clean loops each rung. Stop where it frays; that number goes in Saturday\'s assessment.', 'One full song run at 70% with dynamics.', '12-bar blues in G, twice around — pure fun, pattern 2.'] },
      { f: 'Dynamics pass', h: ['Full song at 70%: verses soft, chorus loud, on purpose.', 'Trouble bars: 5 reps each, now with the dynamic they\'ll wear in the song.', 'Close quiet: two minutes on the G arpeggio fingerpicking pattern (Licks & Picking) — even and unhurried.'] },
      { f: 'Mock exit assessment', h: ['Run the week-4 criteria cold: sprints, full song at 70%, tempo test. No retries.', 'Whatever failed gets 10 focused minutes.', 'Then stop. Tomorrow is the real one — arrive fresh.'] },
      A(4),
    ],
  },
  {
    w: 5,
    t: 'Song 1 to memory',
    lesson: {
      p: [
        'The sheet starts going away. Memory is built by retrieval, not rereading: play from memory until stuck, peek once, then restart the section. The struggle before the peek is the memorization — don\'t shortcut it.',
        'Jam Along sessions start this week, twice a week, and count toward the assessment. Improvising over something keeps time moving while your hands solve problems — exactly the stage skill the coffee shop will ask of you.',
      ],
      tabs: [TWELVE_BAR],
      terms: [
        ['Retrieval', 'Pulling the next chord from memory before your eyes can find it on the sheet'],
        ['Face-down rule', 'The sheet stays in the room but face-down — peeking is allowed, but it costs a section restart'],
      ],
    },
    days: [
      { f: 'Memorize the verse', h: ['Play the verse from memory, sheet face-down. Stuck? Peek once, restart the verse.', 'Repeat until one full verse happens with no peek.', 'Close with a full-form run at 80%, sheet up.'] },
      { f: 'Memorize the rest', h: ['Same retrieval routine on the chorus, then any bridge/outro.', 'Chain verse + chorus from memory, slow.', 'Full form at 80% with sheet — keep the tempo honest.'] },
      { f: 'Jam Along #1', h: ['Twenty minutes over the 12-bar blues vamp (or a Jam Along video): comp chords, keep the groove, no stopping.', 'Deliberately flub once per chorus and play through it.', 'Sneak this week\'s campfire walkup (Licks & Picking) into the comping once per chorus.', 'One memory run of song 1\'s verse + chorus.'] },
      { f: 'Memory under tempo', h: ['Verse + chorus from memory at 70%, three attempts.', 'Any section that needed a peek gets the retrieval routine again.', 'Full form at 80% with sheet, dynamics on.'] },
      { f: 'Jam Along #2', h: ['Twenty minutes of jam — new key or new vamp if the last one got comfortable.', 'Practice the recovery face: flub, breathe, keep strumming. Nobody watching can tell.', 'One face-down memory run: how far through the form can you get?'] },
      { f: 'The week\'s bar', h: ['Run it: full form at 80% with sheet, then verse + chorus from memory, face-down.', 'A peek means restart the section, not the song.', 'End on a win: play the section that feels best, once, loud.'] },
      A(5),
    ],
  },
  {
    w: 6,
    t: 'Standing up',
    lesson: {
      p: [
        'The strap changes everything — the neck angle, your wrist, where your eyes can\'t reach. That\'s why standing starts now, seven weeks before the gig, not two. Set the strap so the guitar sits at the same height standing as it does seated, then practice standing every day this week, even drills.',
        'Song 2 enters with its sheet, and the recording habit becomes weekly: one take, watched back, one sentence written. You will hate the first recording. Record it anyway — week 12 you will be glad to have it.',
      ],
      tabs: [],
      terms: [
        ['Strap height', 'Same guitar position seated and standing — vanity lowers it, wisdom doesn\'t'],
        ['One-take', 'A run recorded on the first attempt — the honest measurement'],
      ],
    },
    days: [
      { f: 'Strap day', h: ['Set strap height seated, then stand — the guitar shouldn\'t move.', 'Standing: tone checks, then the reference progression at 70.', 'Song 1 verse + chorus from memory, standing, slow. Feel what changed.'] },
      { f: 'Song 1 standing', h: ['Full song from memory, standing, at 80% — three attempts, no stopping.', 'Seams that broke get 5 slow reps, still standing.', 'Sit down only for the day\'s last run — notice how easy it suddenly is.'] },
      { f: 'Song 2 enters', h: ['Map song 2\'s form on paper: sections, chords, target tempo (into My Set).', 'Chunk the verse at 50%, sheet up.', 'Song 1 maintenance: one memory run, standing.'] },
      { f: 'Song 2 sections', h: ['Verse chunks chained at 60%, then chorus chunks at 50%.', 'Drill song 2\'s hardest chord pair — two sprints.', 'Song 1: one-take memory run, standing. Log stumbles.'] },
      { f: 'Song 2 at 70', h: ['Song 2 full form with sheet at 70%, twice.', 'The seam drill: song 2\'s verse→chorus transition 10×.', 'Song 1 stays warm: verse + chorus, standing, memory.', 'Three minutes on the Travis seed (Licks & Picking) — the thumb keeps time, the fingers decorate.'] },
      { f: 'Record the take', h: ['Phone up: song 1, from memory, standing, 90% — one take. Watch it back.', 'Write one sentence: what would a stranger notice first?', 'Ten minutes on exactly that, then stop.'] },
      A(6),
    ],
  },
  {
    w: 7,
    t: 'Mistake practice',
    lesson: {
      p: [
        'On stage the song keeps going whether you do or not — so this week you train the keep-going reflex directly. The planted-flub drill: mid-run, deliberately mute a bar or drop a change, then count beats until you\'re back in. The goal is a recovery that costs one bar and shows nothing on your face.',
        'Song 2 races toward memory using the same retrieval routine as song 1. Song 1 drops to maintenance: one one-take run per day, first thing, no retries — the honest daily measurement.',
      ],
      tabs: [TWELVE_BAR],
      terms: [
        ['Planted flub', 'A deliberate mistake inserted mid-run to train recovery'],
        ['Maintenance run', 'One daily one-take pass to keep a finished song warm'],
      ],
    },
    days: [
      { f: 'Song 2 retrieval', h: ['Verse + chorus from memory, face-down rule, until one clean pass each.', 'Full form at 70% with sheet.', 'Song 1 maintenance: one-take, standing.'] },
      { f: 'First planted flubs', h: ['Vamp or metronome on. Song 1 from memory — flub on purpose once per section. Count beats to recovery.', 'Target: back in within 4 beats, face neutral.', 'Song 2: memory run at 70%.'] },
      { f: 'Song 2 at 80', h: ['Song 2 from memory at 80%, three attempts, no stopping.', 'Trouble bars at 60%, 5 reps each.', 'Song 1 maintenance one-take.'] },
      { f: 'Flub day', h: ['Both songs, one run each with two planted flubs — recovery within a bar.', 'Then one honest run each, no plants; play through whatever real flubs come.', 'Learn the Em pocket fill (Licks & Picking); drop it into the last bar before a change, twice.', '12-bar blues, two relaxed rounds.'] },
      { f: 'Song 2 full memory', h: ['Full song 2 from memory at 80%, standing, twice.', 'Retrieval routine on any section that needed a peek.', 'Song 1 maintenance one-take.'] },
      { f: 'Back to back', h: ['Song 1 then song 2, memory, standing, with a 30-second breather between — like a tiny set.', 'Log total stumbles; no restarts allowed.', 'One planted-flub pass on whichever song felt shakier.'] },
      A(7),
    ],
  },
  {
    w: 8,
    t: 'Third song in',
    lesson: {
      p: [
        'Three songs alive at once is the real workload of a performer, and it starts now. Song 3 — the reach — gets the fresh first fifteen minutes of every session. Songs 1 and 2 move to maintenance one-takes and standing runs.',
        'If song 3 is truly fighting you, this is the last cheap moment to swap it for something kinder. A reach song should stretch you, not break the set. Decide by Friday; after this week the set is locked.',
      ],
      tabs: [],
      terms: [
        ['Set lock', 'After week 8, the three songs are final — polish replaces choice'],
      ],
    },
    days: [
      { f: 'Song 3 enters', h: ['Map song 3\'s form, chords, target tempo (into My Set).', 'Chunk its verse at 50%, sheet up. Meet its hardest chord honestly.', 'Maintenance: song 1 one-take.'] },
      { f: 'Song 3 sections', h: ['Verse chunks chained at 60%; chorus chunked at 50%.', 'Two change sprints on song 3\'s hardest pair.', 'Maintenance: song 2 one-take, standing.'] },
      { f: 'Song 2 stands', h: ['Song 2 from memory, standing, at 90% — three attempts.', 'Its worst seam: 5 slow reps.', 'Song 3: one slow full pass with sheet.'] },
      { f: 'Song 3 full form', h: ['Song 3 top-to-bottom with sheet at 70%, twice, no stopping.', 'Trouble bars at 50%, 10× each.', 'Maintenance: song 1 one-take.'] },
      { f: 'Flub drill, three songs', h: ['One planted-flub run per song (sheet OK for song 3).', 'Recovery within 4 beats, face neutral — that\'s the rep that counts.', 'The classic E turnaround is unlocked (Licks & Picking) — learn its first half, slow.', 'Decision check: is song 3 the right reach? Commit or swap today.'] },
      { f: 'Touch all three', h: ['One session, three songs: song 3 with sheet at 70%, songs 1–2 from memory standing.', '30-second breathers between — a rough draft of the set.', 'Log stumbles per song; the worst bar gets tomorrow\'s first five minutes... after the assessment.'] },
      A(8),
    ],
  },
  {
    w: 9,
    t: 'Repertoire exit',
    lesson: {
      p: [
        'The second gate. The bar for every song: from memory, standing, at 90% tempo, two stumbles or fewer, zero restarts. Song 3 may keep its sheet one more week — but say so out loud when you grade yourself.',
        'The method this week is one-take runs and stumble-bar surgery: run a song once cold, then drill only the bars that broke, at 70%, then run it again. Whole-song repetition is comfort food; targeted reps are progress.',
      ],
      tabs: [],
      terms: [
        ['Stumble-bar surgery', 'Cold run → drill only what broke → run again'],
      ],
    },
    days: [
      { f: 'Song 1 surgery', h: ['One-take: song 1, memory, standing, 90%. Log the stumble bars.', 'Drill each stumble bar at 70%, 8 reps.', 'Run it again. Log the difference.'] },
      { f: 'Song 2 surgery', h: ['Same routine: one-take, drill the breaks, re-run.', 'Then one planted-flub pass — recovery stays sharp.', 'Song 1: single maintenance one-take.'] },
      { f: 'Song 3 surgery', h: ['One-take with sheet at 90% (or memory if it\'s there). Log, drill, re-run.', 'Retrieval routine on song 3\'s weakest section.', 'Maintenance: song 2 one-take.'] },
      { f: 'The 70% deep clean', h: ['Every logged stumble bar across all three songs: 8 reps each at 70%.', 'Boring is the point — boring bars don\'t break on stage.', 'One relaxed 12-bar blues to reset the ears.'] },
      { f: 'Three one-takes', h: ['All three songs, one take each, memory, standing, 90%, breathers between.', 'Total stumble count across the set — write it down.', 'Nothing else. Fresh hands tomorrow.'] },
      { f: 'Mock exit', h: ['Run the week-9 criteria cold, one song at a time.', 'Ten focused minutes on the worst result.', 'Stop early. The real assessment is tomorrow.'] },
      A(9),
    ],
  },
  {
    w: 10,
    t: 'The set exists',
    lesson: {
      p: [
        'Stop practicing songs; start practicing the set. From today the unit of practice is all three songs back-to-back, with the between-song moments included — tuning glances, a sip of water, one spoken sentence. Those gaps are part of the performance and they only feel natural if they\'re rehearsed.',
        'Time every run with the Set Runner (Songbook tab). Set length matters at a coffee shop: know your minutes. Rushed tempo is the usual thief — the count-in habit fixes it: two silent bars of the song\'s tempo before the first strum.',
      ],
      tabs: [],
      terms: [
        ['The gaps', 'Between-song moments — scripted, rehearsed, part of the set'],
        ['Count-in', 'Two silent bars at the song\'s tempo before you start — kills the rushed open'],
      ],
    },
    days: [
      { f: 'First set run', h: ['Set order decided. Full set back-to-back, seated OK, sheets OK for song 3.', 'Time it with the Set Runner. No restarts — the chain matters more than any link.', 'Note which gap felt longest; that\'s where a sentence goes.'] },
      { f: 'Timed and talked', h: ['Script one or two sentences per gap: a title, a thank-you. Write them down.', 'Full set run, saying the lines out loud, even alone. Yes, it\'s awkward. Twice is less awkward.', 'If your set has vocals: sing (or at least hum) every run from now on — quiet is fine, silent is not.', 'Log time + stumbles in the Set Runner.'] },
      { f: 'Find the drifter', h: ['Time each song separately. Compare against target — one of them is drifting.', 'The drifter gets count-in practice: two silent bars, then in, three times.', 'Full set run with count-ins.'] },
      { f: 'Standing set', h: ['Full set standing, memory (song 3 sheet OK), lines spoken, timed.', 'One planted flub somewhere in the middle song — recover, continue.', 'Water between songs — practice even the sip.'] },
      { f: 'Set run + surgery', h: ['Full timed run, then 8 reps on the day\'s worst bar.', 'Second full run. Better is the pattern now.', 'Check total time against plan — within 25%?'] },
      { f: 'The week\'s bar', h: ['One full set run exactly as the assessment wants: back-to-back, timed, lines spoken.', 'Log it honestly in the Set Runner.', 'Then one favorite song, once, purely for fun. Remember fun?'] },
      A(10),
    ],
  },
  {
    w: 11,
    t: 'Stage simulation',
    lesson: {
      p: [
        'Every run this week is a performance: standing, from memory, announced out loud, phone recording, no restarts under any circumstances. The camera is a stand-in audience — treat the red dot like eyes. If the open mic is on a signup, this week you visit as a spectator or lock the date.',
        'Restarting is now the one banned move. A restart on stage is the only mistake an audience can\'t forgive, because it turns one flub into a story. Flub, breathe, keep going — you\'ve trained this for six weeks.',
      ],
      tabs: [],
      terms: [
        ['Sim run', 'Full set: standing, memory, announced, recorded, timed, no restarts'],
      ],
    },
    days: [
      { f: 'Sim run #1', h: ['The full protocol: phone recording, stand, announce yourself and each song, play the set, timed.', 'No restarts. Whatever happens, it happens forward.', 'Don\'t watch the recording today.'] },
      { f: 'Watch and list', h: ['Watch yesterday\'s recording. Write the top-3 list: the three moments a stranger would notice.', 'Drill exactly those three, 10 minutes each.', 'One song — the middle one — as a mini sim.'] },
      { f: 'Sim run #2', h: ['Full protocol again.', 'Goal vs sim #1: fewer stumbles OR smoother gaps — pick one and win it.', 'Log in the Set Runner.'] },
      { f: 'The venue', h: ['Visit the open mic as a spectator, or nail down the date and signup rules today.', 'Watch how performers get on and off stage — that\'s a part nobody practices.', 'Light day: one relaxed set run, seated, no recording.'] },
      { f: 'Sim run #3', h: ['Full protocol. The recordings should be getting boring — boring is the goal.', 'Ten minutes on the top-3 list (it may have changed).', 'Early finish. Hands fresh.'] },
      { f: 'Sim run #4', h: ['Full protocol, best-effort — this one feeds tomorrow\'s assessment.', 'Count total stumbles; four or fewer across the set is the bar.', 'Watch only the gaps back: are the lines landing?'] },
      A(11),
    ],
  },
  {
    w: 12,
    t: 'Dry run',
    lesson: {
      p: [
        'A real audience this week — one person is plenty: a friend, a partner, a neighbor bribed with coffee. If truly nobody is available, a phone on a tripod introduced out loud as "everyone, thanks for coming" is a serviceable stand-in. The nerves the dry run produces are the lesson, not the verdict.',
        'Everything else tapers toward precision: count-ins to lock starting tempos, set length inside 20% of plan, recovery on every stumble. You are not building anything new anymore — you are letting what you built settle.',
      ],
      tabs: [],
      terms: [
        ['Dry run', 'The full set for a real audience of at least one, before the one that counts'],
      ],
    },
    days: [
      { f: 'Warm sim', h: ['One sim run, full protocol, relaxed.', 'Count-ins before every song — two silent bars.', 'Confirm the dry-run audience and time for this week.'] },
      { f: 'Dry run #1', h: ['Play the set for your person. Announce songs. No restarts, no apologies mid-set.', 'Afterward ask them one question only: "what\'s one moment you remember?"', 'Write down how the nerves felt in bar one vs. the last song.'] },
      { f: 'Debrief drills', h: ['Whatever wobbled in the dry run: stumble-bar surgery, 8 reps each at 70%.', 'One planted-flub pass on the song where nerves hit hardest.', 'Light set run, seated, sheets allowed — recovery day.'] },
      { f: 'Tempo lock', h: ['Count-in practice: each song started 3× at exact tempo, checked against the metronome.', 'Full set run with count-ins, timed — inside 20% of plan?', 'Ten minutes on the top-3 list.'] },
      { f: 'Dry run #2', h: ['Second audience run — same person is fine, a new person is better.', 'Goal: fewer stumbles than dry run #1 and every recovery invisible.', 'Thank your audience. You\'ll want them at the gig.'] },
      { f: 'Light and easy', h: ['One relaxed set run, 90% tempo, seated, purely to feel smooth.', 'Nothing else. No surgery, no lists.', 'Sleep well — tomorrow grades the week.'] },
      A(12),
    ],
  },
  {
    w: 13,
    t: 'Gig week — taper',
    lesson: {
      p: [
        'Nothing new this week — no new strums, no tweaks to the set, no brave ideas. Short clean runs at 90%, logistics, and sleep. The training is done; taper lets your hands consolidate it. One full-protocol run early in the week, then increasingly light touches.',
        'The set card is standard practice, not cheating: song order and your between-song lines on one index card at your feet. Pack the gig bag early — tuner, picks, capo, strap, water — and know your arrival time. On the night: count yourself in, play the set you\'ve played a hundred times, and let the room have it.',
      ],
      tabs: [],
      terms: [
        ['Taper', 'Reduced load before performance — fresh beats sharp'],
        ['Set card', 'Song order + gap lines on one card at your feet'],
      ],
    },
    days: [
      { f: 'The clean run', h: ['One full-protocol sim: standing, recorded, ≤2 stumbles, no restarts. This is the week\'s big rep.', 'If it went sideways, one more tomorrow — not today.', 'Write the set card.'] },
      { f: 'Logistics', h: ['Pack the bag: tuner, three picks, capo, strap, water, set card. By the door.', 'Confirm signup time, arrival time, how many songs the slot allows.', 'One light set run at 90%, seated.'] },
      { f: 'Short and smooth', h: ['Set run at 90%, standing, no recording — just smoothness.', 'Count-ins on all three songs.', 'Fifteen minutes total playing. Stop while it feels good.'] },
      { f: 'Light touch', h: ['Play only your favorite of the three, once, for pleasure.', 'Run the gap lines from the set card, out loud, once.', 'That\'s it. Restraint is the practice today.'] },
      { f: 'Final run', h: ['One clean set run, recorded, 90% tempo. Watch only if it felt good.', 'Re-check the bag against the list.', 'Early night.'] },
      { f: 'Rest day', h: ['Tune the guitar. Play one verse of anything, softly.', 'Visualize the walk to the stool, the count-in, the first chord of song 1.', 'Sleep. Tomorrow you play.'] },
      {
        f: '🎤 GIG NIGHT',
        h: [
          'Arrive early. Sign up. Watch a couple of acts and clap loudly for them.',
          'On stage: set card down, breathe, two silent bars of count-in, and play song 1 exactly like the hundred times before.',
          'Flubs cost one bar and no face. When it\'s done — you did the thing. Take the applause; you trained for it too.',
        ],
        assessment: true,
      },
    ],
  },
];
