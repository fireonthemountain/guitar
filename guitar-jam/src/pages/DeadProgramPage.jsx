import { useState, useEffect, useMemo, useCallback } from 'react';
import { ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';
import DATA from '../data/curriculum.json';
import TabBlock from '../components/guitar/TabBlock';
import Metronome from '../components/guitar/Metronome';
import ScaleWarmup from '../components/guitar/ScaleWarmup';
import ScaleBoard from '../components/guitar/ScaleBoard';
import VampPlayer from '../components/guitar/VampPlayer';
import StrumPatterns from '../components/guitar/StrumPatterns';
import { PracticeContext } from '../practiceContext';
import { NOTE_NAMES } from '../utils/guitarScales';

// The scale to drill "up the neck" per week (0-based). Weeks without an obvious
// single scale fall back to E Mixolydian, the program's home sound.
const WEEK_SCALES = {
  0: { rootIdx: 4, type: 'Mixolydian' },        // E Mixolydian
  1: { rootIdx: 11, type: 'Pentatonic Major' }, // B major pentatonic — the Jerry box
  2: { rootIdx: 9, type: 'Major' },             // A major (CAGED triads)
  4: { rootIdx: 11, type: 'Pentatonic Major' }, // bends live in the box
  5: { rootIdx: 11, type: 'Pentatonic Major' }, // chromatic color around the box
  6: { rootIdx: 11, type: 'Major' },            // arpeggio targeting (B major)
  9: { rootIdx: 9, type: 'Mixolydian' },        // two-chord vamps — A Mixolydian
};
const scaleForWeek = (w) => WEEK_SCALES[w] || { rootIdx: 4, type: 'Mixolydian' };

const { WEEKS, PHASES, CHORD_DRILLS, CHORD_CHARTS, REP_DRILLS, PERFORMANCE_REPS, MILESTONES } = DATA;

const STRUM_PATTERNS = {
  l: 'The five strum patterns (today\'s is named in the Chords block)',
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
const STRUM_NAMES = ['Foundation', 'Backbeat', 'Campfire', 'Boom-chick', 'The Chop'];
const KEY = 'dead90';

const phaseFor = (d) => (d <= 30 ? 0 : d <= 60 ? 1 : 2);

function blocksFor(day) {
  const p = phaseFor(day);
  const w = Math.min(Math.floor((day - 1) / 7), 12);
  if (p === 0)
    return [
      { n: 'Warmup', m: 5, d: 'Chromatic 1-2-3-4 drill: frets 1-2-3-4 on every string, one finger per fret, down-up picking, 60 bpm' },
      { n: 'Technique', m: 20, d: 'Work today\'s focus — the numbered steps above' },
      { n: 'Chords', m: 15, d: CHORD_DRILLS[Math.min(w, 4)] + ' Strum of the day: #' + (((day - 1) % 5) + 1) + ' (' + STRUM_NAMES[(day - 1) % 5] + ') - chart below.' },
    ];
  if (p === 1)
    return [
      { n: 'Warmup', m: 5, d: '60 seconds of the banjo roll on G, then E Mixolydian two octaves up and down, twice' },
      { n: 'Vocabulary', m: 15, d: 'Work today\'s focus — the numbered steps above' },
      { n: 'Application', m: 10, d: 'Loop a B vamp (record 2 minutes of comping, or find a backing track) and use today\'s idea over it, slow tempo first' },
      { n: 'Repertoire', m: 10, d: REP_DRILLS[Math.min(Math.max(w - 4, 0), 4)] },
    ];
  return [
    { n: 'Warmup', m: 5, d: 'One Phase 2 lick in a brand-new key, plus one slow pass of the B pentatonic box' },
    { n: 'Stage rep', m: 10, d: PERFORMANCE_REPS[day % PERFORMANCE_REPS.length] },
    { n: 'The Jam', m: 20, d: 'Work today\'s focus — the numbered steps above' },
    { n: 'Debrief', m: 5, d: 'Record one minute of playing, listen back, write one sentence below' },
  ];
}

function info(day) {
  const w = Math.min(Math.floor((day - 1) / 7), 12);
  const di = Math.min((day - 1) % 7, 6);
  const week = WEEKS[w];
  const dd = week.days[di];
  const weekTabs = [...week.lesson.tabs, ...week.days.flatMap((x) => x.tabs || [])];
  return {
    week: w + 1,
    theme: week.t,
    lesson: week.lesson,
    weekTabs,
    focus: dd.f,
    how: dd.h,
    dayTabs: dd.tabs || [],
    blocks: blocksFor(day),
    phase: phaseFor(day),
    chordChart: phaseFor(day) === 0 ? CHORD_CHARTS[Math.min(w, 4)] : null,
    milestone: MILESTONES[day] || null,
    isWeekStart: di === 0,
  };
}

function loadState() {
  try {
    const s = localStorage.getItem(KEY);
    if (s) return { completed: [], notes: {}, blocks: {}, activity: {}, ...JSON.parse(s) };
  } catch {}
  return { completed: [], notes: {}, blocks: {}, activity: {} };
}

const dateKey = (d) => d.toISOString().slice(0, 10);
const addDays = (d, n) => { const x = new Date(d); x.setDate(x.getDate() + n); return x; };
const todayKey = () => dateKey(new Date());

const streakColor = (c) => (c === 0 ? '#374151' : c < 2 ? '#0d9488' : c < 4 ? '#f59e0b' : '#f43f5e');
const DOW = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

// Top-of-page consistency card: streak length, the last 7 days, and a
// last-month (5-week) activity heatmap.
function StreakCard({ activity }) {
  const today = new Date();
  const cnt = (d) => activity[dateKey(d)] || 0;

  // Current streak (today not practiced yet doesn't break it).
  let streak = 0;
  let cursor = new Date(today);
  if (cnt(cursor) === 0) cursor = addDays(cursor, -1);
  while (cnt(cursor) > 0) { streak++; cursor = addDays(cursor, -1); }

  const totalDays = Object.values(activity).filter((c) => c > 0).length;

  // Last 7 days.
  const last7 = [];
  for (let i = 6; i >= 0; i--) {
    const d = addDays(today, -i);
    last7.push({ dow: DOW[d.getDay()], c: cnt(d), isToday: i === 0 });
  }

  // Last month — 5 weeks aligned to weeks (Sun→Sat).
  const weeks = 5;
  const endAligned = addDays(today, 6 - today.getDay());
  const start = addDays(endAligned, -(weeks * 7 - 1));
  const CELL = 13, GAP = 3, W = weeks * (CELL + GAP), H = 7 * (CELL + GAP);
  const cells = [];
  for (let w = 0; w < weeks; w++)
    for (let r = 0; r < 7; r++) {
      const d = addDays(start, w * 7 + r);
      if (d > today) continue;
      cells.push(<rect key={`${w}-${r}`} x={w * (CELL + GAP)} y={r * (CELL + GAP)} width={CELL} height={CELL} rx={2.5} fill={streakColor(cnt(d))} />);
    }

  return (
    <div className="bg-gray-800 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-8">
      {/* Streak number */}
      <div className="flex items-center gap-3">
        <span className="text-3xl">🔥</span>
        <div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-amber-400 font-bold text-4xl leading-none" style={{ fontFamily: 'ui-serif, Georgia, serif' }}>{streak}</span>
            <span className="text-white font-semibold text-sm">day{streak === 1 ? '' : 's'} streak</span>
          </div>
          <div className="text-gray-500 text-xs mt-1">{totalDays} days practiced total</div>
        </div>
      </div>

      {/* Last 7 days */}
      <div className="flex-1">
        <div className="text-gray-500 text-[10px] font-bold tracking-[2px] mb-1.5">LAST 7 DAYS</div>
        <div className="flex gap-1.5">
          {last7.map((d, i) => (
            <div key={i} className="text-center">
              <div className={`w-6 h-6 rounded-md ${d.isToday ? 'ring-2 ring-teal-300' : ''}`} style={{ background: streakColor(d.c) }} />
              <div className="text-gray-500 text-[10px] mt-1">{d.dow}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Last month */}
      <div>
        <div className="text-gray-500 text-[10px] font-bold tracking-[2px] mb-1.5">THIS MONTH</div>
        <div className="overflow-x-auto">
          <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ display: 'block' }}>{cells}</svg>
        </div>
      </div>
    </div>
  );
}

function firstIncomplete(completed) {
  for (let i = 1; i <= 90; i++) if (!completed.includes(i)) return i;
  return 90;
}

function Ring({ day, completed }) {
  const R = 118, C = 150;
  const dots = [];
  for (let i = 1; i <= 90; i++) {
    const a = ((i - 1) / 90) * Math.PI * 2 - Math.PI / 2;
    const x = C + R * Math.cos(a), y = C + R * Math.sin(a);
    const done = completed.includes(i), cur = i === day;
    dots.push(
      <circle key={i} cx={x.toFixed(1)} cy={y.toFixed(1)} r={cur ? 6 : done ? 4.5 : 3} fill={cur ? '#f43f5e' : done ? '#f59e0b' : '#374151'} className={cur ? 'animate-pulse' : ''} />
    );
  }
  const pct = Math.round((completed.length / 90) * 100);
  return (
    <svg viewBox="0 0 300 300" style={{ width: 'min(62vw,230px)', display: 'block', margin: '0 auto' }}>
      {dots}
      <text x="150" y="140" textAnchor="middle" fill="#f4f4f5" style={{ font: '700 44px ui-serif, Georgia, serif' }}>{day}</text>
      <text x="150" y="164" textAnchor="middle" fill="#a1a1aa" style={{ font: '600 11px sans-serif', letterSpacing: '2.5px' }}>OF 90 DAYS</text>
      <text x="150" y="188" textAnchor="middle" fill="#f59e0b" style={{ font: '700 14px sans-serif' }}>{pct}% complete</text>
    </svg>
  );
}

export default function DeadProgramPage() {
  const [state, setState] = useState(loadState);
  const [day, setDay] = useState(() => {
    const q = parseInt(new URLSearchParams(window.location.search).get('day'), 10);
    return q >= 1 && q <= 90 ? q : firstIncomplete(loadState().completed);
  });
  const [lessonOpen, setLessonOpen] = useState(() => info(day).isWeekStart);
  const [practice, setPractice] = useState({ loops: 1, countIn: false, tempoStep: 0, click: true });
  const [optionsOpen, setOptionsOpen] = useState(false);

  useEffect(() => {
    try { localStorage.setItem(KEY, JSON.stringify(state)); } catch {}
  }, [state]);

  const nfo = useMemo(() => info(day), [day]);

  const goto = useCallback((d) => {
    if (d < 1 || d > 90) return;
    setDay(d);
    setLessonOpen(info(d).isWeekStart);
    window.scrollTo(0, 0);
  }, []);

  const stamp = (s) => ({ ...s.activity, [todayKey()]: (s.activity?.[todayKey()] || 0) + 1 });

  const toggleBlock = (i) =>
    setState((s) => {
      const cur = s.blocks[day] || [];
      const turningOn = !cur.includes(i);
      const next = turningOn ? [...cur, i] : cur.filter((x) => x !== i);
      return { ...s, blocks: { ...s.blocks, [day]: next }, activity: turningOn ? stamp(s) : s.activity };
    });

  const toggleDay = () =>
    setState((s) => {
      const turningOn = !s.completed.includes(day);
      const completed = turningOn ? [...s.completed, day] : s.completed.filter((d) => d !== day);
      return { ...s, completed, activity: turningOn ? stamp(s) : s.activity };
    });

  const setNote = (v) => setState((s) => ({ ...s, notes: { ...s.notes, [day]: v } }));

  const exportProgress = () => {
    const blob = new Blob([JSON.stringify(state)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'dead90-progress.json';
    a.click();
  };

  const importProgress = () => {
    const v = prompt('Paste your exported progress JSON:');
    if (!v) return;
    try {
      const parsed = JSON.parse(v);
      setState({ completed: [], notes: {}, blocks: {}, activity: {}, ...parsed });
      setDay(firstIncomplete(parsed.completed || []));
      alert('Progress restored.');
    } catch {
      alert("Couldn't parse that — make sure it's the exported JSON.");
    }
  };

  const done = state.blocks[day] || [];
  const dayDone = state.completed.includes(day);
  const ph = PHASES[nfo.phase];
  const phDone = state.completed.filter((d) => d >= ph.range[0] && d <= ph.range[1]).length;

  return (
    <PracticeContext.Provider value={practice}>
    <div className="space-y-6">
      {/* Title */}
      <div className="text-center">
        <div className="text-rose-400 text-[11px] font-bold tracking-[3px]">A GRATEFUL DEAD GUITAR PROGRAM</div>
        <h2 className="text-3xl sm:text-4xl font-bold text-white mt-1" style={{ fontFamily: 'ui-serif, Georgia, serif' }}>
          Ninety Days <span className="text-amber-400 italic font-semibold">to the Jam</span>
        </h2>
        <p className="text-gray-400 text-sm mt-2">
          The goal: <b className="text-gray-200">an open mic on night 90</b> — three songs, rhythm and lead, standing, confident.
        </p>
      </div>

      {/* Practice streak — top of the page */}
      <StreakCard activity={state.activity} />

      {/* Progress hero — ring beside phases/nav on iPad & desktop */}
      <div className="flex flex-col items-center gap-5 md:flex-row md:justify-center md:gap-10">
        <Ring day={day} completed={state.completed} />
        <div className="w-full max-w-md md:w-auto md:min-w-[360px] space-y-3">
          {/* Phases */}
          <div className="flex gap-2">
            {PHASES.map((p, i) => (
              <div key={i} className={`flex-1 py-2 px-1.5 rounded-lg text-center border ${i === nfo.phase ? 'bg-gray-800 border-amber-500' : 'border-gray-700'}`}>
                <div className={`text-xs font-bold ${i === nfo.phase ? 'text-amber-400' : 'text-gray-500'}`}>{p.name}</div>
                <div className="text-[10px] text-gray-500 mt-0.5">{p.range[0]}–{p.range[1]}</div>
              </div>
            ))}
          </div>

          {/* Nav */}
          <div className="flex items-center justify-between gap-2">
            <button onClick={() => goto(day - 1)} disabled={day === 1} className="border border-gray-700 rounded-lg px-3 py-2 text-sm font-bold text-gray-300 disabled:text-gray-700 flex items-center gap-1">
              <ChevronLeft size={16} /> Prev
            </button>
            <div className="text-center">
              <div className="text-white font-bold text-lg" style={{ fontFamily: 'ui-serif, Georgia, serif' }}>Day {day}</div>
              <div className="text-gray-500 text-[11px]">Week {nfo.week} · {nfo.theme}</div>
            </div>
            <button onClick={() => goto(day + 1)} disabled={day === 90} className="border border-gray-700 rounded-lg px-3 py-2 text-sm font-bold text-gray-300 disabled:text-gray-700 flex items-center gap-1">
              Next <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Day content — two columns on iPad / desktop, stacked on phones */}
      <div className="grid gap-5 lg:grid-cols-3 items-start">
        {/* Main column: the reading + playing */}
        <div className="lg:col-span-2 space-y-4 min-w-0">

      {/* Warm-up — the daily scale drill, first thing */}
      <ScaleWarmup day={day} />

      {/* Milestone */}
      {nfo.milestone && (
        <div className="bg-rose-950/40 border border-rose-500/60 rounded-2xl p-4 text-sm text-rose-100 font-semibold leading-relaxed">
          {nfo.milestone}
        </div>
      )}

      {/* Lesson (collapsible) */}
      <div className="bg-gray-800/60 border border-gray-700 rounded-2xl overflow-hidden">
        <button onClick={() => setLessonOpen((o) => !o)} className="w-full flex justify-between items-center px-4 py-3.5 text-sm font-bold text-white text-left">
          <span><span className="text-amber-400">Lesson · Week {nfo.week}:</span> {nfo.theme}</span>
          <span className="text-gray-400 text-lg leading-none">{lessonOpen ? '−' : '+'}</span>
        </button>
        {lessonOpen && (
          <div className="px-4 pb-4">
            <div className="max-w-3xl">
              {nfo.lesson.p.map((p, i) => (
                <p key={i} className="text-gray-300 text-sm leading-relaxed mb-2.5">{p}</p>
              ))}
            </div>
            <div className="mt-3.5 space-y-1.5">
              {nfo.lesson.terms.map((t, i) => (
                <div key={i} className="text-xs leading-snug">
                  <b className="text-amber-400">{t[0]}</b>
                  <span className="text-gray-500"> — {t[1]}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* This week's scales & tabs — always visible; you drill these every day */}
      <div className="bg-gray-800 rounded-2xl p-4">
        <div className="text-teal-400 text-[10px] font-bold tracking-[2px] mb-1">THIS WEEK'S SCALES &amp; TABS</div>
        <div className="text-gray-500 text-xs mb-1">Play these all week — they don't go away after day 1.</div>

        {/* Scale up the neck — box positions you can move along the neck */}
        <div className="mt-3 bg-gray-900/60 border border-gray-700 rounded-xl p-3">
          {(() => {
            const s = scaleForWeek(nfo.week - 1);
            return (
              <>
                <div className="text-amber-400 text-xs font-bold mb-2">
                  Scale up the neck — {NOTE_NAMES[s.rootIdx]} {s.type} · box positions
                </div>
                <ScaleBoard initialRoot={s.rootIdx} initialType={s.type} guidedDefault />
              </>
            );
          })()}
        </div>

        <div className="grid xl:grid-cols-2 gap-x-4">
          {nfo.lesson.tabs.map((t, i) => (
            <TabBlock key={`w-${i}`} label={t.l} tab={t.t} />
          ))}
        </div>
      </div>

      {/* Today's focus */}
      <div className="bg-gray-800 rounded-2xl p-4">
        <div className="text-rose-400 text-[10px] font-bold tracking-[2px] mb-1.5">TODAY'S FOCUS</div>
        <div className="text-white text-lg leading-snug mb-3" style={{ fontFamily: 'ui-serif, Georgia, serif' }}>{nfo.focus}</div>
        <div className="space-y-2">
          {nfo.how.map((s, i) => (
            <div key={i} className="flex gap-2.5 items-start">
              <div className="w-5 h-5 rounded-full flex-shrink-0 mt-0.5 grid place-items-center bg-gray-700 text-amber-400 text-[11px] font-extrabold">{i + 1}</div>
              <div className="text-gray-300 text-sm leading-relaxed">{s}</div>
            </div>
          ))}
        </div>
        <div className="grid xl:grid-cols-2 gap-x-4">
          {nfo.dayTabs.map((t, i) => (
            <TabBlock key={i} label={t.l} tab={t.t} />
          ))}
        </div>
      </div>

      {/* Session blocks */}
      <div>
        <div className="text-gray-500 text-[10px] font-bold tracking-[2px] mb-2 ml-0.5">TODAY'S 40-MINUTE SESSION</div>
        <div className="space-y-2">
          {nfo.blocks.map((b, i) => {
            const on = done.includes(i);
            return (
              <button key={i} onClick={() => toggleBlock(i)} className={`w-full flex gap-3 items-start text-left rounded-xl p-3 border transition-colors ${on ? 'bg-gray-800/50 border-amber-500/40' : 'bg-gray-800 border-gray-700 hover:border-gray-600'}`}>
                <div className={`rounded-lg flex-shrink-0 mt-0.5 grid place-items-center border-2 text-sm font-extrabold ${on ? 'bg-amber-500 border-amber-500 text-stone-900' : 'border-gray-600 text-transparent'}`} style={{ width: 22, height: 22 }}>
                  ✓
                </div>
                <div>
                  <div className="text-sm font-bold text-white">{b.n} <span className="text-amber-400 font-semibold">· {b.m} min</span></div>
                  <div className={`text-sm mt-0.5 leading-snug ${on ? 'text-gray-500 line-through' : 'text-gray-400'}`}>{b.d}</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Chord chart + strum pattern */}
      {nfo.chordChart && (
        <div className="bg-gray-800 rounded-2xl p-4">
          <div className="text-gray-500 text-[10px] font-bold tracking-[2px] mb-1">THIS WEEK'S CHORDS</div>
          <TabBlock label={nfo.chordChart.l} tab={nfo.chordChart.t} />
          <StrumPatterns />
        </div>
      )}

      {/* Done */}
      <button onClick={toggleDay} className={`w-full py-3.5 rounded-xl font-extrabold text-[15px] transition-colors ${dayDone ? 'bg-gray-700 text-gray-300' : 'bg-rose-500 hover:bg-rose-400 text-rose-50'}`}>
        {dayDone ? '✓ Day complete — tap to undo' : 'Mark day complete'}
      </button>

      {/* Notes */}
      <div>
        <div className="text-gray-500 text-[10px] font-bold tracking-[2px] mb-2">PRACTICE NOTES — DAY {day}</div>
        <textarea
          key={day}
          defaultValue={state.notes[day] || ''}
          onBlur={(e) => setNote(e.target.value)}
          placeholder="What clicked? What fought back?"
          className="w-full bg-gray-800 border border-gray-700 rounded-xl p-3 text-gray-100 text-sm resize-y min-h-[70px]"
        />
      </div>

        </div>
        {/* end main column */}

        {/* Sidebar: options + progress */}
        <div className="space-y-4 min-w-0">
          {/* Options — playback settings, metronome, backing vamp */}
          <div>
            <button onClick={() => setOptionsOpen((o) => !o)} className="w-full flex items-center justify-between px-1 py-2 text-left">
              <span className="text-gray-400 text-[10px] font-bold tracking-[2px]">OPTIONS</span>
              <ChevronDown size={16} className={`text-gray-400 transition-transform ${optionsOpen ? 'rotate-180' : ''}`} />
            </button>
          </div>

          {optionsOpen && (
          <>
          {/* Tab playback settings — apply to every ▶ Play on the page */}
          <div className="bg-gray-800 rounded-2xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-white font-semibold">Tab playback</h3>
              <span className="text-gray-500 text-xs">every ▶ Play</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-400 text-xs w-16 flex-shrink-0">Loops</span>
              {[1, 3, 5, 64].map((n) => (
                <button key={n} onClick={() => setPractice((p) => ({ ...p, loops: n }))} className={`px-2.5 py-1 rounded text-xs font-medium ${practice.loops === n ? 'bg-teal-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}>
                  {n === 64 ? '∞' : n}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-400 text-xs w-16 flex-shrink-0">Click</span>
              <button onClick={() => setPractice((p) => ({ ...p, click: !p.click }))} className={`px-2.5 py-1 rounded text-xs font-medium ${practice.click ? 'bg-teal-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}>
                {practice.click ? 'On · beat' : 'Off'}
              </button>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-400 text-xs w-16 flex-shrink-0">Count-in</span>
              <button onClick={() => setPractice((p) => ({ ...p, countIn: !p.countIn }))} className={`px-2.5 py-1 rounded text-xs font-medium ${practice.countIn ? 'bg-teal-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}>
                {practice.countIn ? 'On · 1 bar' : 'Off'}
              </button>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-400 text-xs w-16 flex-shrink-0">Speed up</span>
              {[[0, 'Off'], [5, '+5/loop'], [10, '+10/loop']].map(([v, l]) => (
                <button key={v} onClick={() => setPractice((p) => ({ ...p, tempoStep: v }))} className={`px-2.5 py-1 rounded text-xs font-medium ${practice.tempoStep === v ? 'bg-teal-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}>
                  {l}
                </button>
              ))}
            </div>
            {practice.tempoStep > 0 && practice.loops === 1 && (
              <p className="text-gray-500 text-[11px]">Tip: set Loops above 1 for the tempo trainer to ramp.</p>
            )}
          </div>

          {/* Metronome — the curriculum cites a tempo almost every day */}
          <Metronome defaultBpm={70} />

          {/* Backing vamp — practice licks over the changes */}
          <VampPlayer />
          </>
          )}

          {/* Stats */}
          <div className="flex gap-2">
            <div className="flex-1 bg-gray-800 border border-gray-700 rounded-xl py-2.5 text-center">
              <div className="text-amber-400 text-lg font-bold" style={{ fontFamily: 'ui-serif, Georgia, serif' }}>{state.completed.length}</div>
              <div className="text-gray-500 text-[10px] uppercase tracking-wide mt-0.5">Days done</div>
            </div>
            <div className="flex-1 bg-gray-800 border border-gray-700 rounded-xl py-2.5 text-center">
              <div className="text-amber-400 text-lg font-bold" style={{ fontFamily: 'ui-serif, Georgia, serif' }}>{phDone} / 30</div>
              <div className="text-gray-500 text-[10px] uppercase tracking-wide mt-0.5">This phase</div>
            </div>
            <div className="flex-1 bg-gray-800 border border-gray-700 rounded-xl py-2.5 text-center">
              <div className="text-amber-400 text-lg font-bold" style={{ fontFamily: 'ui-serif, Georgia, serif' }}>40 min</div>
              <div className="text-gray-500 text-[10px] uppercase tracking-wide mt-0.5">Session</div>
            </div>
          </div>

          {/* Backup */}
          <div className="text-center pt-1">
            <button onClick={exportProgress} className="border border-gray-700 rounded-lg px-3 py-1.5 text-[11px] text-gray-400 mx-1">Export progress</button>
            <button onClick={importProgress} className="border border-gray-700 rounded-lg px-3 py-1.5 text-[11px] text-gray-400 mx-1">Import progress</button>
          </div>

          <div className="text-center text-xs text-gray-600 italic pt-2" style={{ fontFamily: 'ui-serif, Georgia, serif' }}>
            "Once in a while you get shown the light…"
          </div>
        </div>
        {/* end sidebar */}
      </div>
      {/* end day-content grid */}
    </div>
    </PracticeContext.Provider>
  );
}
