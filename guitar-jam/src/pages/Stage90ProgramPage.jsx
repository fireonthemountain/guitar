import { useState, useEffect, useMemo, useCallback } from 'react';
import { ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';
import { STAGE90_WEEKS, STAGE90_TOTAL_DAYS } from '../data/stage90Curriculum';
import { PHASES, phaseForWeek } from '../data/assessmentPlan';
import { texturesForWeek, nextTexture } from '../data/stage90Textures';
import TabBlock from '../components/guitar/TabBlock';
import Metronome from '../components/guitar/Metronome';
import VampPlayer from '../components/guitar/VampPlayer';
import FocusSession from '../components/stage90/FocusSession';
import { PracticeContext } from '../practiceContext';
import {
  loadStage90, saveStage90, dateKey, daysBetween, daysToGig,
  planForWeek, remediationFor,
} from '../utils/stage90';

const weekOf = (day) => Math.floor((day - 1) / 7);
const dayIdx = (day) => (day - 1) % 7;

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
      { n: 'Warmup', m: 5, d: 'Tone checks on the five open chords, then one change sprint on your slowest pair.' },
      { n: 'Focus', m: 25, d: 'Work today\'s numbered steps above.', main: true },
      { n: 'Click work', m: 10, d: 'Strum pattern 2 on the metronome, then the reference progression (G–D–Em–C) until it locks.' },
    );
  } else if (w <= 9) {
    blocks.push(
      { n: 'Warmup', m: 5, d: 'One change sprint, then the reference progression at your latest tempo-test BPM.' },
      { n: 'Song work', m: 30, d: 'Work today\'s numbered steps above.', main: true },
      { n: 'Recovery', m: 10, d: 'Vamp on: comp the 12-bar blues and plant one flub per chorus — keep the groove through it.' },
    );
  } else {
    blocks.push(
      { n: 'Warmup', m: 5, d: 'Reference progression once, then count-ins: two silent bars into each song\'s first chord.' },
      { n: 'Set work', m: 30, d: 'Work today\'s numbered steps above — the set is the unit of practice now.', main: true },
      { n: 'Debrief', m: 10, d: 'Log the run (Set Runner in Songbook), note the worst bar, give it 8 slow reps.' },
    );
  }
  return blocks;
}

function firstIncomplete(completed) {
  for (let i = 1; i <= STAGE90_TOTAL_DAYS; i++) if (!completed.includes(i)) return i;
  return STAGE90_TOTAL_DAYS;
}

export default function Stage90ProgramPage() {
  const [state, setState] = useState(loadStage90);
  const calendarDay = state.startDate
    ? Math.max(1, Math.min(STAGE90_TOTAL_DAYS, daysBetween(state.startDate, dateKey(new Date())) + 1))
    : null;
  const [day, setDay] = useState(() => calendarDay ?? firstIncomplete(loadStage90().program.completed));
  const [lessonOpen, setLessonOpen] = useState(() => dayIdx(day) === 0);
  const [practice, setPractice] = useState({ loops: 1, countIn: false, tempoStep: 0, click: true });
  const [optionsOpen, setOptionsOpen] = useState(false);
  const [focusMode, setFocusMode] = useState(false);
  const [licksOpen, setLicksOpen] = useState(false);

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
    setLessonOpen(dayIdx(d) === 0);
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

  return (
    <PracticeContext.Provider value={practice}>
      <div className="space-y-6">
        {/* Title */}
        <div className="text-center">
          <div className="text-teal-400 text-[11px] font-bold tracking-[3px]">STAGE READY 90</div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mt-1" style={{ fontFamily: 'ui-serif, Georgia, serif' }}>
            Ninety-Eight Days <span className="text-amber-400 italic font-semibold">to the Coffee Shop</span>
          </h2>
          <p className="text-gray-400 text-sm mt-2">
            {gigDays !== null
              ? <>Gig night in <b className="text-amber-400">{Math.max(gigDays, 0)} days</b> — three songs, standing, from memory.</>
              : <>Set your gig date in the <b className="text-gray-200">Assessment tab</b> to anchor the calendar.</>}
          </p>
        </div>

        {/* Phases + nav */}
        <div className="flex flex-col items-center gap-4">
          <div className="flex gap-2 w-full max-w-xl">
            {PHASES.map((p) => (
              <div key={p.name} className={`flex-1 py-2 px-1.5 rounded-lg text-center border ${p === phase ? 'bg-gray-800 border-amber-500' : 'border-gray-700'}`}>
                <div className={`text-xs font-bold ${p === phase ? 'text-amber-400' : 'text-gray-500'}`}>{p.name}</div>
                <div className="text-[10px] text-gray-500 mt-0.5">w{p.weeks[0]}{p.weeks[1] !== p.weeks[0] ? `–${p.weeks[1]}` : ''}</div>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between gap-2 w-full max-w-xl">
            <button onClick={() => goto(day - 1)} disabled={day === 1} className="border border-gray-700 rounded-lg px-3 py-2 text-sm font-bold text-gray-300 disabled:text-gray-700 flex items-center gap-1">
              <ChevronLeft size={16} /> Prev
            </button>
            <div className="text-center">
              <div className="text-white font-bold text-lg" style={{ fontFamily: 'ui-serif, Georgia, serif' }}>Day {day} <span className="text-gray-500 font-normal text-sm">of {STAGE90_TOTAL_DAYS}</span></div>
              <div className="text-gray-500 text-[11px]">Week {w} · {week.t} · {weekDone}/7 days done</div>
            </div>
            <button onClick={() => goto(day + 1)} disabled={day === STAGE90_TOTAL_DAYS} className="border border-gray-700 rounded-lg px-3 py-2 text-sm font-bold text-gray-300 disabled:text-gray-700 flex items-center gap-1">
              Next <ChevronRight size={16} />
            </button>
          </div>
          {calendarDay !== null && calendarDay !== day && (
            <button onClick={() => goto(calendarDay)} className="text-teal-400 hover:text-teal-300 text-xs underline">
              Jump to today (day {calendarDay})
            </button>
          )}
        </div>

        {focusMode ? (
          <FocusSession
            blocks={blocks}
            steps={dd.assessment ? [] : dd.h}
            weekTabs={[...week.lesson.tabs, ...texturesForWeek(w).slice(-2).map((x) => ({ l: x.l, t: x.t }))]}
            dayLabel={`Day ${day} · Week ${w} — ${week.t}`}
            onBlockDone={setBlockOn}
            onFinishDay={finishGuidedDay}
            onExit={() => setFocusMode(false)}
          />
        ) : (
        <div className="grid gap-5 lg:grid-cols-3 items-start">
          {/* Main column */}
          <div className="lg:col-span-2 space-y-4 min-w-0">
            {/* Injected focus */}
            {remediation.length > 0 && !dd.assessment && (
              <div className="bg-amber-950/30 border border-amber-600/50 rounded-2xl p-4">
                <div className="text-amber-400 text-[10px] font-bold tracking-[2px] mb-2">INJECTED FOCUS — FROM YOUR LAST ASSESSMENT</div>
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

            {/* Lesson */}
            <div className="bg-gray-800/60 border border-gray-700 rounded-2xl overflow-hidden">
              <button onClick={() => setLessonOpen((o) => !o)} className="w-full flex justify-between items-center px-4 py-3.5 text-sm font-bold text-white text-left">
                <span><span className="text-amber-400">Lesson · Week {w}:</span> {week.t}</span>
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
                        <b className="text-amber-400">{t[0]}</b>
                        <span className="text-gray-500"> — {t[1]}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Week charts */}
            {week.lesson.tabs.length > 0 && (
              <div className="bg-gray-800 rounded-2xl p-4">
                <div className="text-teal-400 text-[10px] font-bold tracking-[2px] mb-1">THIS WEEK'S CHARTS</div>
                <div className="grid xl:grid-cols-2 gap-x-4">
                  {week.lesson.tabs.map((t, i) => (
                    <TabBlock key={i} label={t.l} tab={t.t} />
                  ))}
                </div>
              </div>
            )}

            {/* Licks & fingerpicking — the texture track, unlocked week by week */}
            {texturesForWeek(w).length > 0 && (
              <div className="bg-gray-800/60 border border-gray-700 rounded-2xl overflow-hidden">
                <button onClick={() => setLicksOpen((o) => !o)} className="w-full flex justify-between items-center px-4 py-3.5 text-sm font-bold text-white text-left">
                  <span>
                    <span className="text-amber-400">Licks &amp; picking</span> · {texturesForWeek(w).length} unlocked
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

            {/* Today's focus */}
            <div className={`rounded-2xl p-4 ${dd.assessment ? 'bg-teal-950/40 border border-teal-600/60' : 'bg-gray-800'}`}>
              <div className="text-rose-400 text-[10px] font-bold tracking-[2px] mb-1.5">TODAY'S FOCUS</div>
              <div className="text-white text-lg leading-snug mb-3" style={{ fontFamily: 'ui-serif, Georgia, serif' }}>{dd.f}</div>
              <div className="space-y-2">
                {dd.h.map((s, i) => (
                  <div key={i} className="flex gap-2.5 items-start">
                    <div className="w-5 h-5 rounded-full flex-shrink-0 mt-0.5 grid place-items-center bg-gray-700 text-amber-400 text-[11px] font-extrabold">{i + 1}</div>
                    <div className="text-gray-300 text-sm leading-relaxed">{s}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Guided session — one exercise at a time */}
            {!dd.assessment && (
              <button
                onClick={() => { setFocusMode(true); window.scrollTo(0, 0); }}
                className="w-full py-3.5 rounded-xl font-extrabold text-[15px] bg-teal-600 hover:bg-teal-500 text-white"
              >
                ▶ Start today's session — guided, one exercise at a time
              </button>
            )}

            {/* Session blocks */}
            <div>
              <div className="text-gray-500 text-[10px] font-bold tracking-[2px] mb-2 ml-0.5">TODAY'S SESSION · ~{blocks.reduce((a, b) => a + b.m, 0)} MIN — OR CHECK OFF FREESTYLE</div>
              <div className="space-y-2">
                {blocks.map((b, i) => {
                  const on = doneBlocks.includes(i);
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

            {/* Done */}
            <button onClick={toggleDay} className={`w-full py-3.5 rounded-xl font-extrabold text-[15px] transition-colors ${dayDone ? 'bg-gray-700 text-gray-300' : 'bg-rose-500 hover:bg-rose-400 text-rose-50'}`}>
              {dayDone ? '✓ Day complete — tap to undo' : 'Mark day complete'}
            </button>

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

          {/* Sidebar */}
          <div className="space-y-4 min-w-0">
            <div>
              <button onClick={() => setOptionsOpen((o) => !o)} className="w-full flex items-center justify-between px-1 py-2 text-left">
                <span className="text-gray-400 text-[10px] font-bold tracking-[2px]">TOOLS</span>
                <ChevronDown size={16} className={`text-gray-400 transition-transform ${optionsOpen ? 'rotate-180' : ''}`} />
              </button>
            </div>
            {optionsOpen && (
              <>
                <Metronome defaultBpm={60} />
                <VampPlayer />
              </>
            )}

            {/* Stats */}
            <div className="flex gap-2">
              <div className="flex-1 bg-gray-800 border border-gray-700 rounded-xl py-2.5 text-center">
                <div className="text-amber-400 text-lg font-bold" style={{ fontFamily: 'ui-serif, Georgia, serif' }}>{state.program.completed.length}</div>
                <div className="text-gray-500 text-[10px] uppercase tracking-wide mt-0.5">Days done</div>
              </div>
              <div className="flex-1 bg-gray-800 border border-gray-700 rounded-xl py-2.5 text-center">
                <div className="text-amber-400 text-lg font-bold" style={{ fontFamily: 'ui-serif, Georgia, serif' }}>{weekDone} / 7</div>
                <div className="text-gray-500 text-[10px] uppercase tracking-wide mt-0.5">This week</div>
              </div>
              <div className="flex-1 bg-gray-800 border border-gray-700 rounded-xl py-2.5 text-center">
                <div className="text-amber-400 text-lg font-bold" style={{ fontFamily: 'ui-serif, Georgia, serif' }}>
                  {Object.values(state.assessments).filter((a) => a?.score != null).length}
                </div>
                <div className="text-gray-500 text-[10px] uppercase tracking-wide mt-0.5">Assessments</div>
              </div>
            </div>

            <div className="text-center text-xs text-gray-600 italic pt-2" style={{ fontFamily: 'ui-serif, Georgia, serif' }}>
              Consistency beats intensity. Every day.
            </div>
          </div>
        </div>
        )}
      </div>
    </PracticeContext.Provider>
  );
}
