import { useState, useEffect, useMemo, useCallback } from 'react';
import { CheckCircle2, ChevronLeft, ChevronRight, ChevronDown, Circle, Clock3, Play, Target, TrendingUp } from 'lucide-react';
import { STAGE90_WEEKS, STAGE90_TOTAL_DAYS, CORE_CHARTS } from '../data/stage90Curriculum';
import { GIG_TEMPO_TARGET, PHASES, phaseForWeek } from '../data/assessmentPlan';
import { texturesForWeek, nextTexture } from '../data/stage90Textures';
import { DAY_ROLES, COLOR_CHORDS, CAPO_CHART, CHORD_FAMILIES, NASHVILLE, LISTENING } from '../data/stage90Reference';
import GroovePlayer from '../components/stage90/GroovePlayer';
import TabBlock from '../components/guitar/TabBlock';
import Metronome from '../components/guitar/Metronome';
import VampPlayer from '../components/guitar/VampPlayer';
import FocusSession from '../components/stage90/FocusSession';
import { PracticeContext } from '../practiceContext';
import TrainTodayCard from '../components/train/TrainTodayCard';
import { SKILL_TRACKS } from '../data/skillTracks';
import { flattenExercises, localDateKey } from '../utils/practiceEngine';
import { todayTrainPlan, trainActiveDays, trainBudgetMinutes } from '../utils/trainLink';
import {
  loadStage90, saveStage90, dateKey, daysBetween, daysToGig,
  gigReadiness, planForWeek, remediationFor,
} from '../utils/stage90';

const TRAIN_EXERCISES = flattenExercises(SKILL_TRACKS);

const weekOf = (day) => Math.floor((day - 1) / 7);
const dayIdx = (day) => (day - 1) % 7;

// Every warm-up balances three fingerpicking patterns with three strums. The
// sets rotate by day so both hands build vocabulary without losing repetition.
const WARMUP_PATTERNS = [
  {
    finger: ['Forward roll: T–I–M–R–M–I', 'Outside-in: T–R–M–I–M–R', 'Pinch & roll: T+(M/R)–I–M–I'],
    strum: ['Anchor: D D D D', 'Workhorse: D - D U - U D U', 'Ballad: D - - U D - - U'],
  },
  {
    finger: ['Travis seed: T–M–T–I', 'Alternating roll: T–I–T–M–T–I–T–M', 'Reverse roll: R–M–I–T–I–M'],
    strum: ['Workhorse: D - D U - U D U', 'Pushed: D - D U D U D U', 'Half-time: D - - - D U - U'],
  },
  {
    finger: ['Bass pinch: T–(I/M/R)–T–(I/M/R)', 'Forward roll: T–I–M–R–M–I', 'Travis seed: T–M–T–I'],
    strum: ['Country: B - D U B - D U', 'Bass/strum: B D U - B D U -', 'Anchor: D D D D'],
  },
  {
    finger: ['Outside-in: T–R–M–I–M–R', 'Reverse roll: R–M–I–T–I–M', 'Pinch & roll: T+(M/R)–I–M–I'],
    strum: ['Shuffle: D U D U D U D U (swing it)', 'Stop groove: D U D - x - - -', 'Workhorse: D - D U - U D U'],
  },
  {
    finger: ['Alternating roll: T–I–T–M–T–I–T–M', 'Bass pinch: T–(I/M/R)–T–(I/M/R)', 'Forward roll: T–I–M–R–M–I'],
    strum: ['Ballad: D - - U D - - U', '6/8: D - U D - U', 'Half-time: D - - - D U - U'],
  },
  {
    finger: ['Travis seed: T–M–T–I', 'Pinch & roll: T+(M/R)–I–M–I', 'Reverse roll: R–M–I–T–I–M'],
    strum: ['Pushed: D - D U D U D U', 'Country: B - D U B - D U', 'Workhorse: D - D U - U D U'],
  },
];

const warmupPatterns = (day) => WARMUP_PATTERNS[(day - 1) % WARMUP_PATTERNS.length];

function warmupBlock(day, description) {
  const patterns = warmupPatterns(day);
  return {
    n: 'Warmup',
    m: 5,
    d: description,
    groups: [
      { label: 'Fingerpicking', items: patterns.finger },
      { label: 'Strumming', items: patterns.strum },
    ],
    legend: 'T = thumb · I/M/R = index/middle/ring · D/U = down/up · “-” = keep moving through the rest',
  };
}

// Session blocks by phase; the day's numbered steps are always the main block.
function blocksFor(day, remediation) {
  const w = weekOf(day);
  const dd = STAGE90_WEEKS[w].days[dayIdx(day)];
  if (dd.assessment) {
    return [{ n: 'Assessment Day', m: 20, d: 'Open the Assessment tab and run the week ' + w + ' wizard — recorded take, criteria, tempo test, ratings, notes.' }];
  }
  const blocks = [];
  if (remediation.length) {
    blocks.push({ n: 'Injected focus', m: 10, d: remediation.map((r) => r.fix).join(' ') });
  }
  if (w <= 4) {
    blocks.push(
      warmupBlock(day, 'Tone-check two open chords, then give each pattern about 30 seconds.'),
      { n: 'Focus', m: 25, d: 'Work today\'s numbered steps above.', main: true },
      { n: 'Click work', m: 10, d: 'Strum pattern 2 on the metronome, then the reference progression (G–D–Em–C). Rule: +4 BPM only after three clean repetitions.' },
    );
  } else if (w <= 9) {
    blocks.push(
      warmupBlock(day, 'Do one change sprint, then play each pattern for about 30 seconds over the reference progression. Start below your tempo-test BPM.'),
      { n: 'Song work', m: 30, d: 'Work today\'s numbered steps above.', main: true },
      { n: 'Recovery', m: 10, d: 'Vamp on: comp the 12-bar blues and plant one flub per chorus — keep the groove through it.' },
    );
  } else {
    blocks.push(
      warmupBlock(day, 'Play each pattern for about 30 seconds on chords from your set. Finish with two silent count-in bars into each song’s first chord.'),
      { n: 'Set work', m: 30, d: 'Work today\'s numbered steps above — the set is the unit of practice now.', main: true },
      { n: 'Debrief', m: 10, d: 'Log the run (Set Runner in Songbook), note the worst bar, give it 8 slow reps.' },
    );
  }
  // The weekly cycle's Record day: a one-take two-minute performance on camera.
  if (dayIdx(day) === 4) {
    blocks.push({ n: 'Record', m: 5, d: 'Phone up: two minutes of this week\'s material, one take, no warm-up run. Watch it back once — that\'s the whole exercise.' });
  }
  return blocks;
}

function firstIncomplete(completed) {
  for (let i = 1; i <= STAGE90_TOTAL_DAYS; i++) if (!completed.includes(i)) return i;
  return STAGE90_TOTAL_DAYS;
}

function PatternGroup({ group, complete = false }) {
  const isStrum = group.label === 'Strumming';
  return (
    <div className={`rounded-xl border px-3 py-3 ${complete ? 'border-gray-800 bg-gray-950/30 opacity-55' : 'border-gray-700 bg-gray-950/55'}`}>
      <div className="mb-2 text-[10px] font-bold uppercase tracking-[1.5px] text-teal-400">{group.label}</div>
      <div className="space-y-2">
        {group.items.map((item) => {
          const [name, ...rest] = item.split(':');
          const pattern = rest.join(':').trim();
          const marks = isStrum
            ? pattern.split(/\s+/).map((token) => ({ D: '↓', U: '↑', B: 'B', '-': '·', x: '×' }[token] || token))
            : pattern.split('–');
          return (
            <div key={item} className={complete ? 'line-through' : ''}>
              <div className="text-[11px] font-semibold text-gray-400">{name}</div>
              <div className="mt-1 flex flex-wrap gap-1" aria-label={pattern}>
                {marks.map((mark, index) => (
                  <span key={`${mark}-${index}`} className={`grid min-h-7 min-w-7 place-items-center rounded-md px-1.5 font-mono text-sm font-bold ${mark === '·' ? 'bg-gray-900 text-gray-600' : 'bg-gray-800 text-gray-100'}`}>
                    {mark}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function localDateOffset(daysAgo) {
  const d = new Date();
  d.setHours(12, 0, 0, 0);
  d.setDate(d.getDate() - daysAgo);
  return dateKey(d);
}

export default function Stage90ProgramPage({ onOpenTrain }) {
  const [state, setState] = useState(loadStage90);
  const calendarDay = state.startDate
    ? Math.max(1, Math.min(STAGE90_TOTAL_DAYS, daysBetween(state.startDate, dateKey(new Date())) + 1))
    : null;
  const [day, setDay] = useState(() => calendarDay ?? firstIncomplete(loadStage90().program.completed));
  const [lessonOpen, setLessonOpen] = useState(false);
  const [chartsOpen, setChartsOpen] = useState(true);
  const [practice, setPractice] = useState({ loops: 1, countIn: false, tempoStep: 0, click: true });
  const [optionsOpen, setOptionsOpen] = useState(false);
  // Today is the stable home screen. The focused session opens from one clear
  // action and can be exited without losing any completed blocks.
  const [focusMode, setFocusMode] = useState(false);
  const [licksOpen, setLicksOpen] = useState(false);
  const [theoryOpen, setTheoryOpen] = useState(false);

  useEffect(() => { saveStage90(state); }, [state]);

  const w = weekOf(day);
  const week = STAGE90_WEEKS[w];
  const dd = week.days[dayIdx(day)];
  const phase = phaseForWeek(w);
  const gigDays = state.gigDate ? daysToGig(state.gigDate) : null;

  // Injected focus: the previous week's assessment misses live in this week's days.
  const remediation = useMemo(() => {
    const prev = state.assessments[w - 1];
    if (!prev || typeof prev.score !== 'number') return [];
    return remediationFor(prev, planForWeek(w - 1));
  }, [state.assessments, w]);

  const goto = useCallback((d) => {
    if (d < 1 || d > STAGE90_TOTAL_DAYS) return;
    setDay(d);
    setLessonOpen(false);
    setFocusMode(false);
    window.scrollTo(0, 0);
  }, []);

  const todayKey = () => dateKey(new Date());
  const stamp = (s) => ({ ...s.program.activity, [todayKey()]: (s.program.activity?.[todayKey()] || 0) + 1 });
  const patch = (fn) => setState((s) => ({ ...s, program: fn(s.program, s) }));

  const doneBlocks = state.program.blocks[day] || [];
  const toggleBlock = (i) =>
    setState((s) => {
      const cur = s.program.blocks[day] || [];
      const on = !cur.includes(i);
      const next = on ? [...cur, i] : cur.filter((x) => x !== i);
      return { ...s, program: { ...s.program, blocks: { ...s.program.blocks, [day]: next }, activity: on ? stamp(s) : s.program.activity } };
    });

  const dayDone = state.program.completed.includes(day);
  const toggleDay = () =>
    setState((s) => {
      const on = !s.program.completed.includes(day);
      const completed = on ? [...s.program.completed, day] : s.program.completed.filter((d) => d !== day);
      return { ...s, program: { ...s.program, completed, activity: on ? stamp(s) : s.program.activity } };
    });

  // Guided-session callbacks: set (never unset) block/day completion.
  const setBlockOn = (i) =>
    setState((s) => {
      const cur = s.program.blocks[day] || [];
      if (cur.includes(i)) return s;
      return { ...s, program: { ...s.program, blocks: { ...s.program.blocks, [day]: [...cur, i] }, activity: stamp(s) } };
    });
  const finishGuidedDay = () => {
    setState((s) =>
      s.program.completed.includes(day)
        ? s
        : { ...s, program: { ...s.program, completed: [...s.program.completed, day], activity: stamp(s) } }
    );
    setFocusMode(false);
    window.scrollTo(0, 0);
  };

  const setNote = (v) => patch((p) => ({ ...p, notes: { ...p.notes, [day]: v } }));

  const blocks = blocksFor(day, remediation);
  const weekDone = state.program.completed.filter((d) => weekOf(d) === w).length;

  // Week-specific charts first, then the core charts (open chords, strum
  // patterns, reference progression) — the steps name these on every day.
  const allCharts = [...week.lesson.tabs, ...CORE_CHARTS, ...(w >= 3 ? [COLOR_CHORDS] : [])].filter(
    (t, i, arr) => arr.findIndex((x) => x.l === t.l) === i
  );
  const dayText = `${dd.f} ${dd.h.join(' ')}`.toLowerCase();
  const chartScore = (chart) => {
    const label = chart.l.toLowerCase();
    let score = week.lesson.tabs.some((tab) => tab.l === chart.l) ? 2 : 0;
    if (/strum|pattern|rhythm/.test(dayText) && /strum|pattern|groove/.test(label)) score += 5;
    if (/chord|change|barre/.test(dayText) && /chord|barre/.test(label)) score += 4;
    if (/tempo|progression|click/.test(dayText) && /progression|tempo/.test(label)) score += 5;
    if (/pick|arpeggio|roll|lick|fill/.test(dayText) && /pick|arpeggio|roll|lick|fill/.test(label)) score += 5;
    return score;
  };
  const contextCharts = [...allCharts].sort((a, b) => chartScore(b) - chartScore(a)).slice(0, 1);
  const guidedCharts = [...contextCharts, ...texturesForWeek(w).slice(-1).map((x) => ({ l: x.l, t: x.t }))]
    .filter((t, i, arr) => arr.findIndex((x) => x.l === t.l) === i);
  const role = DAY_ROLES[dayIdx(day)];
  const listening = LISTENING[w];
  const totalMinutes = blocks.reduce((sum, block) => sum + block.m, 0);
  const nextBlock = blocks.findIndex((_, index) => !doneBlocks.includes(index));
  // Technique (Train) is part of the day, but only of the real calendar day:
  // its queue and its "done" state come from today's Train log, so it is not
  // shown when browsing another day of the course.
  const showTrain = calendarDay === null || calendarDay === day;
  const trainMinutes = trainBudgetMinutes(totalMinutes, state.gym.minutes);
  const trainPlan = useMemo(
    () => todayTrainPlan({ gym: state.gym, exercises: TRAIN_EXERCISES, assessments: state.assessments, budgetMinutes: trainMinutes, today: localDateKey() }),
    [state.gym, state.assessments, trainMinutes],
  );
  const trainDays = useMemo(() => trainActiveDays(state.gym), [state.gym]);
  const trainBlockDone = showTrain && trainPlan.complete ? 1 : 0;
  const planBlockCount = blocks.length + (showTrain ? 1 : 0);
  const completedBlockCount = Math.min(doneBlocks.length, blocks.length) + trainBlockDone;
  const dayMinutes = totalMinutes + (showTrain ? trainPlan.budgetMinutes : 0);
  const latestAssessment = Object.values(state.assessments)
    .filter((assessment) => assessment && typeof assessment.score === 'number')
    .sort((a, b) => a.week - b.week)
    .at(-1);
  const readiness = gigReadiness(state.assessments);
  const activityDays = Array.from({ length: 7 }, (_, index) => localDateOffset(6 - index));
  // A day counts as practiced if a program block OR a Train rep was logged.
  const isActiveDay = (key) => (state.program.activity?.[key] || 0) > 0 || trainDays.has(key);
  const activeDays = activityDays.filter(isActiveDay).length;
  const weekPlan = planForWeek(w);

  return (
    <PracticeContext.Provider value={practice}>
      <div className="space-y-4">
        {/* Compact course identity + day navigation */}
        <section className="rounded-2xl border border-gray-700 bg-gray-900/60 p-3 sm:p-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <div className="text-[10px] font-bold tracking-[2px] text-teal-400">STAGE READY 90 · {phase.name.toUpperCase()}</div>
              <div className="mt-0.5 flex flex-wrap items-baseline gap-x-2">
                <h2 className="text-xl font-bold text-white" style={{ fontFamily: 'ui-serif, Georgia, serif' }}>Day {day}</h2>
                <span className="text-sm text-gray-400">Week {w} · {week.t}</span>
                {dayDone && <span className="rounded-full bg-emerald-950 px-2 py-0.5 text-[10px] font-bold text-emerald-300">COMPLETE</span>}
              </div>
              <p className="mt-1 text-xs text-gray-500">
                {gigDays !== null
                  ? <>Gig in <span className="font-semibold text-amber-400">{Math.max(gigDays, 0)} days</span> · three songs, standing, from memory</>
                  : 'Coffee-shop goal · three songs, standing, from memory'}
              </p>
            </div>
            <div className="flex items-center justify-between gap-2 sm:justify-end">
              <button onClick={() => goto(day - 1)} disabled={day === 1} className="flex items-center gap-1 rounded-lg border border-gray-700 px-3 py-2 text-sm font-bold text-gray-300 disabled:text-gray-700">
                <ChevronLeft size={16} /> <span className="hidden min-[380px]:inline">Prev</span>
              </button>
              <button
                onClick={toggleDay}
                aria-pressed={dayDone}
                aria-label={dayDone ? `Day ${day} complete; tap to mark incomplete` : `Mark day ${day} complete`}
                className={`flex items-center gap-1.5 rounded-lg border px-3 py-2 text-xs font-bold ${dayDone ? 'border-emerald-700 bg-emerald-950/40 text-emerald-300' : 'border-gray-700 text-gray-400'}`}
              >
                {dayDone ? <CheckCircle2 size={16} /> : <Circle size={16} />} {dayDone ? 'Done' : `${weekDone}/7 this week`}
              </button>
              <button onClick={() => goto(day + 1)} disabled={day === STAGE90_TOTAL_DAYS} className="flex items-center gap-1 rounded-lg border border-gray-700 px-3 py-2 text-sm font-bold text-gray-300 disabled:text-gray-700">
                <span className="hidden min-[380px]:inline">Next</span> <ChevronRight size={16} />
              </button>
            </div>
          </div>
          <div className="mt-3 flex gap-1.5 overflow-x-auto pb-0.5">
            {PHASES.map((p) => (
              <div key={p.name} className={`min-w-[88px] flex-1 rounded-md border px-2 py-1 text-center ${p === phase ? 'border-teal-600 bg-teal-950/40' : 'border-gray-800'}`}>
                <span className={`text-[10px] font-bold ${p === phase ? 'text-teal-300' : 'text-gray-600'}`}>{p.name}</span>
              </div>
            ))}
          </div>
          {calendarDay !== null && calendarDay !== day && (
            <button onClick={() => goto(calendarDay)} className="mt-2 text-xs text-teal-400 hover:text-teal-300">
              Jump to today (day {calendarDay})
            </button>
          )}
        </section>

        {focusMode ? (
          <FocusSession
            blocks={blocks}
            steps={dd.assessment ? [] : dd.h}
            contextTabs={guidedCharts}
            allTabs={[...allCharts, ...texturesForWeek(w).map((x) => ({ l: x.l, t: x.t }))]}
            completedBlocks={doneBlocks}
            dayLabel={`Day ${day} · Week ${w} — ${week.t} · ${DAY_ROLES[dayIdx(day)].name} day`}
            intro={dayIdx(day) === 0 && doneBlocks.length === 0 ? { title: week.t, paragraphs: week.lesson.p } : null}
            onBlockDone={setBlockOn}
            onFinishDay={finishGuidedDay}
            onExit={() => setFocusMode(false)}
          />
        ) : (
        <div className="grid grid-cols-1 items-start gap-5 lg:grid-cols-[minmax(0,2fr)_minmax(250px,1fr)]">
          {/* Main column */}
          <div className="min-w-0 space-y-4">
            {/* One primary action: start or resume the ordered practice queue. */}
            {!dd.assessment && (
              <button
                onClick={() => { setFocusMode(true); window.scrollTo(0, 0); }}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-teal-600 py-4 text-base font-extrabold text-white shadow-lg shadow-teal-950/30 hover:bg-teal-500"
              >
                <Play size={18} fill="currentColor" />
                {dayDone ? 'Practice this day again' : completedBlockCount > 0 ? `Continue practice · ${completedBlockCount}/${planBlockCount} blocks` : `Start today's practice · ${totalMinutes} min`}
              </button>
            )}

            {/* Today's focus */}
            <div className={`rounded-2xl p-4 ${dd.assessment ? 'bg-teal-950/40 border border-teal-600/60' : 'bg-gray-800'}`}>
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <div className="text-teal-400 text-[10px] font-bold tracking-[2px]">TODAY · WEEK {w} — {week.t.toUpperCase()}</div>
                <span className="text-[10px] font-bold text-teal-300 bg-teal-900/50 border border-teal-700 rounded px-1.5 py-0.5 flex-shrink-0" title={role.hint}>
                  {role.name.toUpperCase()} DAY
                </span>
              </div>
              <div className="text-gray-500 text-[11px] -mt-1 mb-2">{role.hint}</div>
              <div className="text-white text-lg leading-snug mb-3" style={{ fontFamily: 'ui-serif, Georgia, serif' }}>{dd.f}</div>
              <div className="space-y-2">
                {dd.h.map((s, i) => (
                  <div key={i} className="flex gap-2.5 items-start">
                    <div className="w-5 h-5 rounded-full flex-shrink-0 mt-0.5 grid place-items-center bg-gray-700 text-teal-300 text-[11px] font-extrabold">{i + 1}</div>
                    <div className="text-gray-300 text-sm leading-relaxed">{s}</div>
                  </div>
                ))}
              </div>
              {/* Remediation from the last assessment lives with the work, not in its own card */}
              {remediation.length > 0 && !dd.assessment && (
                <div className="mt-3 pt-3 border-t border-amber-600/30">
                  <div className="text-amber-400 text-[10px] font-bold tracking-[2px] mb-1.5">ALSO THIS WEEK — FROM YOUR LAST ASSESSMENT</div>
                  <div className="space-y-1.5">
                    {remediation.map((r) => (
                      <div key={r.id} className="text-sm text-gray-300 leading-snug flex gap-2">
                        <span className={r.result === 'fail' ? 'text-rose-400' : 'text-amber-400'}>{r.result === 'fail' ? '✗' : '~'}</span>
                        {r.fix}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* This week's listening — one real song, one thing to hear */}
            {listening && !dd.assessment && (
              <div className="bg-gray-800/60 border border-gray-700 rounded-2xl p-3.5 flex gap-3 items-start">
                <span className="text-lg flex-shrink-0">🎧</span>
                <div className="min-w-0">
                  <div className="text-white text-sm font-bold">{listening.song}</div>
                  <div className="text-gray-400 text-xs leading-snug mt-0.5">{listening.focus}</div>
                </div>
              </div>
            )}

            {/* Session blocks */}
            <div>
              <div className="mb-2 flex items-center justify-between gap-3 px-0.5">
                <div className="text-[10px] font-bold tracking-[2px] text-gray-500">TODAY'S PRACTICE QUEUE</div>
                <div className="flex items-center gap-1 text-[11px] text-gray-500" data-testid="day-minutes"><Clock3 size={13} /> {dayMinutes} min{showTrain && ` · ${totalMinutes} program + ${trainPlan.budgetMinutes} technique`}</div>
              </div>
              <div className="space-y-2">
                {blocks.map((b, i) => {
                  const on = doneBlocks.includes(i);
                  const current = !on && i === nextBlock;
                  return (
                    <button key={i} onClick={() => toggleBlock(i)} className={`w-full rounded-xl border p-3 text-left transition-colors ${on ? 'border-emerald-800/60 bg-emerald-950/15' : current ? 'border-teal-600/70 bg-teal-950/20' : 'border-gray-700 bg-gray-800 hover:border-gray-600'}`}>
                      <div className="flex gap-3 items-start">
                      <div className={`mt-0.5 grid h-7 w-7 flex-shrink-0 place-items-center rounded-full border text-xs font-extrabold ${on ? 'border-emerald-600 bg-emerald-600 text-white' : current ? 'border-teal-500 bg-teal-950 text-teal-300' : 'border-gray-600 text-gray-500'}`}>
                        {on ? '✓' : i + 1}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-x-2">
                          <span className={`text-sm font-bold ${on ? 'text-emerald-300' : 'text-white'}`}>{b.n}</span>
                          <span className={`text-xs font-semibold ${current ? 'text-amber-400' : 'text-gray-500'}`}>{b.m} min</span>
                          {current && <span className="rounded bg-teal-900/60 px-1.5 py-0.5 text-[9px] font-bold tracking-wide text-teal-300">UP NEXT</span>}
                        </div>
                        <div className={`text-sm mt-0.5 leading-snug ${on ? 'text-gray-500 line-through' : 'text-gray-400'}`}>{b.d}</div>
                        {b.groups && (
                          <div className="mt-3 grid gap-2 sm:grid-cols-2">
                            {b.groups.map((group) => <PatternGroup key={group.label} group={group} complete={on} />)}
                          </div>
                        )}
                        {b.legend && <div className={`mt-2 text-[10px] leading-relaxed ${on ? 'text-gray-600' : 'text-gray-500'}`}>{b.legend}</div>}
                      </div>
                      </div>
                    </button>
                  );
                })}
                {showTrain && (
                  <TrainTodayCard
                    plan={trainPlan}
                    number={blocks.length + 1}
                    onStart={onOpenTrain ? () => onOpenTrain(trainPlan.complete || !trainPlan.upcoming.length ? null : { start: 'today', minutes: trainPlan.budgetMinutes }) : undefined}
                  />
                )}
              </div>
            </div>

            {/* Reference — everything readable lives below the work, folded away */}
            <div className="text-gray-500 text-[10px] font-bold tracking-[2px] pt-2 ml-0.5">WHEN YOU NEED IT</div>

            {/* Lesson */}
            <div className="bg-gray-800/60 border border-gray-700 rounded-2xl overflow-hidden">
              <button onClick={() => setLessonOpen((o) => !o)} className="w-full flex justify-between items-center px-4 py-3.5 text-sm font-bold text-white text-left">
                <span>
                  <span className="text-teal-400">Why this week:</span> {week.t}
                  {dayIdx(day) === 0 && <span className="ml-2 text-[10px] font-bold text-teal-300 bg-teal-900/50 border border-teal-700 rounded px-1.5 py-0.5">NEW WEEK</span>}
                </span>
                <span className="text-gray-400 text-lg leading-none">{lessonOpen ? '−' : '+'}</span>
              </button>
              {lessonOpen && (
                <div className="px-4 pb-4">
                  <div className="max-w-3xl">
                    {week.lesson.p.map((p, i) => (
                      <p key={i} className="text-gray-300 text-sm leading-relaxed mb-2.5">{p}</p>
                    ))}
                  </div>
                  <div className="mt-3.5 space-y-1.5">
                    {week.lesson.terms.map((t, i) => (
                      <div key={i} className="text-xs leading-snug">
                        <b className="text-teal-400">{t[0]}</b>
                        <span className="text-gray-500"> — {t[1]}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* The most relevant reference is visible before the full chart library. */}
            {contextCharts.length > 0 && (
              <div className="rounded-2xl border border-teal-800/60 bg-teal-950/10 p-4">
                <div className="text-[10px] font-bold tracking-[2px] text-teal-400">FOR TODAY'S WORK</div>
                {contextCharts.map((chart) => <TabBlock key={chart.l} label={chart.l} tab={chart.t} />)}
              </div>
            )}

            {/* Full chart set */}
            <div className="bg-gray-800/60 border border-gray-700 rounded-2xl overflow-hidden">
              <button onClick={() => setChartsOpen((o) => !o)} className="w-full flex justify-between items-center px-4 py-3.5 text-sm font-bold text-white text-left">
                <span><span className="text-teal-400">All weekly charts</span> · chords, patterns, progression</span>
                <span className="text-gray-400 text-lg leading-none">{chartsOpen ? '−' : '+'}</span>
              </button>
              {chartsOpen && (
                <div className="px-4 pb-4 space-y-3">
                  <GroovePlayer />
                  <div className="grid grid-cols-1 xl:grid-cols-2 gap-x-4">
                    {allCharts.map((t, i) => (
                      <TabBlock key={i} label={t.l} tab={t.t} />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Theory & capo */}
            <div className="bg-gray-800/60 border border-gray-700 rounded-2xl overflow-hidden">
              <button onClick={() => setTheoryOpen((o) => !o)} className="w-full flex justify-between items-center px-4 py-3.5 text-sm font-bold text-white text-left">
                <span><span className="text-teal-400">Theory &amp; capo</span> · chord families, number system, capo chart</span>
                <span className="text-gray-400 text-lg leading-none">{theoryOpen ? '−' : '+'}</span>
              </button>
              {theoryOpen && (
                <div className="px-4 pb-4 space-y-3">
                  {[
                    ['THE SEVEN PROGRESSIONS · NASHVILLE NUMBERS', NASHVILLE],
                    ['CHORD FAMILIES — THE SIX CHORDS OF EACH KEY', CHORD_FAMILIES],
                    ['CAPO CHART — SAME SHAPES, NEW KEY', CAPO_CHART],
                  ].map(([label, text]) => (
                    <div key={label}>
                      <div className="text-gray-500 text-[10px] font-bold tracking-[2px] mb-1">{label}</div>
                      <pre className="bg-gray-950 border border-gray-700 rounded-lg p-3 text-gray-200 text-xs leading-relaxed overflow-x-auto font-mono">{text}</pre>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Licks & fingerpicking — the texture track, unlocked week by week */}
            {texturesForWeek(w).length > 0 && (
              <div className="bg-gray-800/60 border border-gray-700 rounded-2xl overflow-hidden">
                <button onClick={() => setLicksOpen((o) => !o)} className="w-full flex justify-between items-center px-4 py-3.5 text-sm font-bold text-white text-left">
                  <span>
                    <span className="text-teal-400">Licks &amp; picking</span> · {texturesForWeek(w).length} unlocked
                    {nextTexture(w) && <span className="text-gray-500 font-normal"> — next: week {nextTexture(w).week}</span>}
                  </span>
                  <span className="text-gray-400 text-lg leading-none">{licksOpen ? '−' : '+'}</span>
                </button>
                {licksOpen && (
                  <div className="px-4 pb-4 space-y-4">
                    {texturesForWeek(w).map((x) => (
                      <div key={x.l}>
                        <TabBlock label={x.l} tab={x.t} />
                        <p className="text-gray-400 text-xs leading-snug mt-1 px-1">{x.tip}</p>
                      </div>
                    ))}
                    {nextTexture(w) && (
                      <p className="text-gray-600 text-[11px] px-1">🔒 Week {nextTexture(w).week} unlocks: {nextTexture(w).l}</p>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Notes */}
            <div>
              <div className="text-gray-500 text-[10px] font-bold tracking-[2px] mb-2">PRACTICE NOTES — DAY {day}</div>
              <textarea
                key={day}
                defaultValue={state.program.notes[day] || ''}
                onBlur={(e) => setNote(e.target.value)}
                placeholder="What clicked? What fought back?"
                className="w-full bg-gray-800 border border-gray-700 rounded-xl p-3 text-gray-100 text-sm resize-y min-h-[70px]"
              />
            </div>
          </div>

          {/* Useful course context from the player's saved state. */}
          <aside className="min-w-0 space-y-3 lg:sticky lg:top-20">
            <div className="rounded-2xl border border-gray-700 bg-gray-800/70 p-4">
              <div className="flex items-center justify-between">
                <div className="text-[10px] font-bold tracking-[2px] text-gray-500">LAST 7 DAYS</div>
                <span className="text-xs font-bold text-white">{activeDays}/7 active</span>
              </div>
              <div className="mt-3 grid grid-cols-7 gap-1.5">
                {activityDays.map((key) => {
                  const active = isActiveDay(key);
                  return (
                    <div key={key} className="text-center">
                      <div className={`mx-auto h-7 w-full max-w-7 rounded-md ${active ? 'bg-emerald-500' : 'bg-gray-700'}`} title={`${key}: ${active ? 'practice logged' : 'no practice logged'}`} />
                      <div className="mt-1 text-[9px] text-gray-600">{new Date(`${key}T12:00:00`).toLocaleDateString(undefined, { weekday: 'narrow' })}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="rounded-2xl border border-gray-700 bg-gray-800/70 p-4">
              <div className="flex items-center gap-2 text-[10px] font-bold tracking-[2px] text-gray-500"><TrendingUp size={14} /> TEMPO &amp; READINESS</div>
              {latestAssessment ? (
                <div className="mt-3 grid grid-cols-2 gap-2">
                  <div className="rounded-xl bg-gray-900/60 p-3">
                    <div className="text-2xl font-bold text-white">{latestAssessment.maxCleanBpm || '—'}<span className="ml-1 text-xs font-normal text-gray-500">BPM</span></div>
                    <div className="mt-1 text-[10px] text-gray-500">Week {latestAssessment.week} clean tempo</div>
                  </div>
                  <div className="rounded-xl bg-gray-900/60 p-3">
                    <div className="text-2xl font-bold text-amber-400">{latestAssessment.maxCleanBpm ? Math.min(latestAssessment.maxCleanBpm + 4, GIG_TEMPO_TARGET) : '—'}<span className="ml-1 text-xs font-normal text-gray-500">BPM</span></div>
                    <div className="mt-1 text-[10px] text-gray-500">Next clean target</div>
                  </div>
                  {readiness !== null && <div className="col-span-2 text-xs text-gray-400">Saved gig readiness: <span className="font-bold text-teal-300">{readiness}%</span></div>}
                </div>
              ) : (
                <p className="mt-2 text-xs leading-relaxed text-gray-400">Your first saved assessment will establish a clean-tempo baseline and readiness score.</p>
              )}
            </div>

            <div className="rounded-2xl border border-gray-700 bg-gray-800/70 p-4">
              <div className="flex items-center gap-2 text-[10px] font-bold tracking-[2px] text-gray-500"><Target size={14} /> THIS STAGE</div>
              <div className="mt-2 text-sm font-bold text-white">{weekPlan?.title || week.t}</div>
              <p className="mt-1 text-xs leading-relaxed text-gray-400">{weekPlan?.focus || week.lesson.p[0]}</p>
              <div className="mt-3 flex flex-wrap gap-2 text-[10px] font-semibold">
                <span className="rounded-full bg-gray-900 px-2 py-1 text-gray-400">{state.program.completed.length}/{STAGE90_TOTAL_DAYS} days</span>
                <span className={`rounded-full px-2 py-1 ${state.set.length >= 3 ? 'bg-emerald-950 text-emerald-300' : 'bg-amber-950/60 text-amber-300'}`}>{state.set.length}/3 set songs</span>
              </div>
            </div>

            <div>
              <button onClick={() => setOptionsOpen((o) => !o)} className="w-full flex items-center justify-between px-1 py-2 text-left">
                <span className="text-gray-400 text-[10px] font-bold tracking-[2px]">PRACTICE TOOLS</span>
                <ChevronDown size={16} className={`text-gray-400 transition-transform ${optionsOpen ? 'rotate-180' : ''}`} />
              </button>
            </div>
            {optionsOpen && (
              <>
                <Metronome defaultBpm={60} />
                <VampPlayer />
              </>
            )}

            <div className="text-center text-xs text-gray-600 italic pt-2" style={{ fontFamily: 'ui-serif, Georgia, serif' }}>
              Consistency beats intensity. Every day.
            </div>
          </aside>
        </div>
        )}
      </div>
    </PracticeContext.Provider>
  );
}
