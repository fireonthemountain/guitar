// Stage Ready 90 — the weekly assessment plan.
// Week 0 is placement; weeks 1–13 each end in an Assessment Day.
// Each criterion carries its own remediation (`fix`): fail it and that text
// becomes next week's injected focus.

export const GIG_TEMPO_TARGET = 90; // max-clean-BPM goal on the reference progression by gig week
export const TEMPO_FLOOR = 40;      // where the tempo-test scale starts

export const REFERENCE_PROGRESSION =
  'G – D – Em – C, one bar each, strum pattern: D D DU DU. Raise the metronome until changes fall apart; log the last clean BPM.';

export const RATING_KEYS = [
  ['clean', 'Clean chords'],
  ['rhythm', 'Rhythm steadiness'],
  ['memory', 'Memory'],
  ['confidence', 'Confidence'],
  ['recovery', 'Recovery'],
];

export const PHASES = [
  { name: 'Placement', weeks: [0, 0] },
  { name: 'Foundation', weeks: [1, 4] },
  { name: 'Repertoire', weeks: [5, 9] },
  { name: 'Performance', weeks: [10, 13] },
];

export const phaseForWeek = (w) => PHASES.find((p) => w >= p.weeks[0] && w <= p.weeks[1]) || PHASES.at(-1);

export const ASSESSMENT_WEEKS = [
  {
    week: 0,
    title: 'Placement',
    focus: 'Find your honest starting point. Nothing here is pass/fail in spirit — it routes your first two weeks.',
    criteria: [
      { id: 'w0-open', label: 'G, C, D, Em each ring cleanly — pluck all strings one at a time, no buzz or mutes', fix: 'Weeks 1–2 lean on open-chord tone work: form, pluck string-by-string, adjust, repeat.' },
      { id: 'w0-change', label: 'G→C changes, 20 per minute, landing clean', fix: 'Daily one-minute change drills (G→C, G→D, C→D) before anything else.' },
      { id: 'w0-metro', label: 'Strum any chord with the metronome at 60 BPM for one minute without drifting', fix: 'Every practice block starts with 2 minutes of single-chord strumming on the click.' },
      { id: 'w0-barre', label: 'F barre attempt — 4 of 6 strings sound', fix: 'Add 3 minutes/day of barre tone work; pick set songs that avoid barre chords for now.' },
    ],
  },
  {
    week: 1,
    title: 'Open chords & the click',
    focus: 'Clean open chords and a steady right hand. Start listening to candidate set songs.',
    criteria: [
      { id: 'w1-five', label: 'G, C, D, Em, Am all ring cleanly on demand', fix: 'String-by-string tone check on the weak chords, 5 min/day.' },
      { id: 'w1-change', label: 'Chord changes at 30/min (any pair from the five)', fix: 'One-minute change sprints, 3 rounds/day, on the slowest pair.' },
      { id: 'w1-strum', label: 'Pattern D-D-DU-DU steady at 60 BPM for 2 minutes', fix: 'Strum on a muted chord along the click, 2 min before each session.' },
    ],
  },
  {
    week: 2,
    title: 'Pick the set',
    focus: 'Choose your 3 songs this week — you will live with them for 11 weeks. Two easy, one reach.',
    criteria: [
      { id: 'w2-songs', label: 'Three set songs chosen and added to My Set', fix: 'Decide now with what you have — a good-enough set practiced beats a perfect set postponed.' },
      { id: 'w2-change', label: 'Chord changes at 35/min', fix: 'Keep the daily change sprints; slow the metronome 10% and rebuild.' },
      { id: 'w2-verse', label: 'Song 1 verse with the metronome at 60% of target tempo, no stopping', fix: 'Loop the verse in 4-bar chunks at 50% until each chunk is boring, then chain.' },
    ],
  },
  {
    week: 3,
    title: 'Chaining sections',
    focus: 'Song 1 grows from sections into a form. Dynamics enter: not every strum at the same volume.',
    criteria: [
      { id: 'w3-chain', label: 'Song 1 verse + chorus chained at 70% tempo, no stopping', fix: 'Practice only the transition bar — the last bar of verse into the first of chorus — 10x slow.' },
      { id: 'w3-dyn', label: 'One pattern played soft, medium, loud on cue', fix: 'Volume ladder drill: 4 bars soft → 4 medium → 4 loud, on one chord.' },
      { id: 'w3-barre', label: 'F barre: 5+ strings clean, 3-second holds (skip if your set avoids barres)', fix: '3 min/day barre tone work; check thumb position — low, behind the neck.' },
    ],
  },
  {
    week: 4,
    title: 'Foundation exit',
    focus: 'The gate to song work. Pass this and the next five weeks are pure repertoire.',
    criteria: [
      { id: 'w4-change', label: 'Chord changes at 40+/min', fix: 'Carry the change sprints into next week — they leave the schedule only when this passes.' },
      { id: 'w4-full', label: 'One full song top-to-bottom at 70% target tempo, no stopping (sheet allowed)', fix: 'Map the song\'s trouble bars, drill only those at 50%, then re-run the form.' },
      { id: 'w4-tempo', label: 'Tempo test at 70+ BPM clean', fix: 'Two extra tempo-ladder rounds per day on the reference progression.' },
    ],
  },
  {
    week: 5,
    title: 'Song 1 to memory',
    focus: 'The sheet starts going away. Memory is built by retrieval, not rereading — look away first, peek second.',
    criteria: [
      { id: 'w5-form', label: 'Song 1 full form at 80% tempo with sheet', fix: 'Slow the full run to 70% and log which bars pull your eyes to the sheet.' },
      { id: 'w5-mem', label: 'Song 1 verse + chorus from memory (sheet face-down)', fix: 'Memorize by section: play from memory until stuck, peek once, restart the section.' },
      { id: 'w5-jam', label: 'Two Jam Along sessions this week', fix: 'Schedule them like appointments — jamming is where recovery skill comes from.' },
    ],
  },
  {
    week: 6,
    title: 'Standing up',
    focus: 'Song 1 standing, from memory. The strap changes your angles — earlier than you think it should.',
    criteria: [
      { id: 'w6-stand', label: 'Song 1 from memory, standing, at 90% tempo', fix: 'Practice standing every day next week — even drills. The neck angle needs reps.' },
      { id: 'w6-two', label: 'Song 2 full form with sheet at 70% tempo', fix: 'Give song 2 the first 15 minutes of each session while it\'s newest.' },
      { id: 'w6-rec', label: 'Recorded one full song 1 take and watched it back', fix: 'Record tomorrow\'s first run — no warm-up take, that\'s the point.' },
    ],
  },
  {
    week: 7,
    title: 'Mistake practice',
    focus: 'Recovery becomes a drill. On stage the song keeps going; train that reflex now.',
    criteria: [
      { id: 'w7-mem2', label: 'Song 2 from memory at 80% tempo', fix: 'Same retrieval routine as song 1: section from memory, one peek, restart section.' },
      { id: 'w7-flub', label: 'Play through 3 planted mistakes without stopping (mute a bar, drop a change — keep the groove)', fix: 'Vamp player on, deliberately flub once per run, count the beats until you\'re back.' },
      { id: 'w7-one', label: 'Song 1 still clean: full memory run, ≤2 stumbles', fix: 'Song 1 gets a daily maintenance run — first thing, one take, no retries.' },
    ],
  },
  {
    week: 8,
    title: 'Third song in',
    focus: 'Song 2 stands up; song 3 enters. Three songs alive at once is the real workload now.',
    criteria: [
      { id: 'w8-stand2', label: 'Song 2 from memory, standing, at 90% tempo', fix: 'Alternate days: song 2 standing runs / song 3 section work.' },
      { id: 'w8-three', label: 'Song 3 full form with sheet at 70% tempo', fix: 'Song 3 gets the fresh first 15 minutes; songs 1–2 move to maintenance runs.' },
      { id: 'w8-recov', label: 'One planted-mistake run per song without stopping', fix: 'Keep the flub drill daily — recovery decays fast.' },
    ],
  },
  {
    week: 9,
    title: 'Repertoire exit',
    focus: 'The gate to performance prep: every song from memory, standing, near tempo.',
    criteria: [
      { id: 'w9-s1', label: 'Song 1: memory, standing, 90% tempo, ≤2 stumbles, no restarts', fix: 'Drill only the stumble bars at 70%, then one-take runs.' },
      { id: 'w9-s2', label: 'Song 2: memory, standing, 90% tempo, ≤2 stumbles, no restarts', fix: 'Drill only the stumble bars at 70%, then one-take runs.' },
      { id: 'w9-s3', label: 'Song 3: memory, standing, 90% tempo, ≤2 stumbles, no restarts', fix: 'If song 3 lags, it\'s allowed a sheet for one more week — but say so out loud.' },
    ],
  },
  {
    week: 10,
    title: 'The set exists',
    focus: 'Stop practicing songs; start practicing the set. Back-to-back, with the between-song moments.',
    criteria: [
      { id: 'w10-set', label: 'Full 3-song set back-to-back (seated OK), timed', fix: 'Run the set daily even if rough — the chain matters more than any link now.' },
      { id: 'w10-time', label: 'Set length within 25% of plan', fix: 'Time each song separately to find the drifter — it\'s usually rushed tempo.' },
      { id: 'w10-talk', label: 'Said something between songs — a title, a thank-you — every run', fix: 'Script two sentences per gap and say them every run, even alone.' },
    ],
  },
  {
    week: 11,
    title: 'Stage simulation',
    focus: 'Every run is a performance: standing, announced, recorded, no restarts allowed.',
    criteria: [
      { id: 'w11-sim', label: 'Full set standing, from memory, recorded, ≤4 stumbles total', fix: 'Watch the recording, list the top 3 moments, drill only those.' },
      { id: 'w11-open', label: 'Visited (or picked the date for) the open mic as a spectator', fix: 'Go this week — knowing the room removes half the fear.' },
      { id: 'w11-norestart', label: 'Zero restarts across all set runs this week', fix: 'Restarting is the one banned move. Flub, breathe, keep going.' },
    ],
  },
  {
    week: 12,
    title: 'Dry run',
    focus: 'One real audience — a friend, a partner, a phone on a tripod treated like a person.',
    criteria: [
      { id: 'w12-dry', label: 'Played the full set for a person (or camera-as-audience), ≤3 stumbles', fix: 'Do a second dry run — the first one\'s nerves are the lesson, not the verdict.' },
      { id: 'w12-time', label: 'Set length within 20% of plan', fix: 'Practice with the metronome count-in before each song to lock starting tempos.' },
      { id: 'w12-recover', label: 'Recovered from every stumble without stopping', fix: 'Back to planted-mistake runs, once per song per day.' },
    ],
  },
  {
    week: 13,
    title: 'Gig week — taper',
    focus: 'Nothing new. Short clean runs, logistics, sleep. You are as ready as the last 12 weeks made you.',
    criteria: [
      { id: 'w13-run', label: 'One clean full-set run this week: standing, recorded, ≤2 stumbles, no restarts', fix: 'One more taper run tomorrow at 90% tempo — smoothness over speed.' },
      { id: 'w13-gear', label: 'Logistics done: tuner, spare picks, capo, strap checked, arrival time known', fix: 'Pack the bag tonight and leave it by the door.' },
      { id: 'w13-plan', label: 'Set order and between-song lines written on one card', fix: 'Write the card now — paper on the floor is standard practice, not cheating.' },
    ],
  },
];
