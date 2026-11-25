import { useMemo, useRef, useState } from 'react';
import { ArrowRight, Gauge, ListChecks, RefreshCw, Sparkles, TrendingUp } from 'lucide-react';
import { SKILL_TRACKS } from '../data/skillTracks';
import {
  applyBoutEnd, applyRep, applySessionEnd, benchmarkRows, flattenExercises,
  instrumentSummary, localDateKey, MINUTES_PER_ITEM,
} from '../utils/practiceEngine';
import { loadGym, updateGym } from '../utils/gymStore';
import { todayTrainPlan } from '../utils/trainLink';
import { buildAssessmentSession } from '../utils/assessmentFocus';
import { loadStage90 } from '../utils/stage90';
import ExerciseRunner from '../components/train/ExerciseRunner';
import BenchmarkBoard, { INSTRUMENT_COLOR } from '../components/train/BenchmarkBoard';

// Train — the skill gym. One queue of exercises chosen for today (weak and due
// items first), each run on a tempo ladder with an honest grade per pass, and a
// benchmark board that shows whether the numbers are moving.

const EXERCISES = flattenExercises(SKILL_TRACKS);
const INSTRUMENTS = [['both', 'Both'], ['electric', 'Electric'], ['acoustic', 'Acoustic']];
const LENGTHS = [15, 30, 45, 60];
const KIND = {
  focus: { label: 'Assessment', Icon: ListChecks, style: 'bg-rose-950/60 text-rose-200 border-rose-800/60' },
  review: { label: 'Review', Icon: RefreshCw, style: 'bg-sky-950/60 text-sky-200 border-sky-800/60' },
  ladder: { label: 'Ladder', Icon: TrendingUp, style: 'bg-teal-950/60 text-teal-200 border-teal-800/60' },
  new: { label: 'New', Icon: Sparkles, style: 'bg-amber-950/50 text-amber-200 border-amber-800/60' },
};

const clock12 = (date) => date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });

function Segmented({ label, options, value, onChange }) {
  return (
    <div role="group" aria-label={label} className="flex gap-1 rounded-xl border border-gray-700 bg-gray-800/80 p-1">
      {options.map(([id, text]) => (
        <button key={id} type="button" onClick={() => onChange(id)} aria-pressed={value === id} className={`rounded-lg px-3 py-1.5 text-sm font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 ${value === id ? 'bg-teal-600 text-white' : 'text-gray-400 hover:bg-gray-700 hover:text-gray-100'}`}>
          {text}
        </button>
      ))}
    </div>
  );
}

const newRun = (entries, fromToday = null) => ({ queue: entries, index: 0, startedAt: Date.now(), clean: 0, total: 0, done: 0, fromToday });

// Today hands off with intent { start: 'today', minutes }: run what is left of
// today's technique block straight away.
function runFromIntent(intent, gym) {
  if (intent?.start !== 'today') return null;
  const plan = todayTrainPlan({ gym, exercises: EXERCISES, assessments: loadStage90().assessments, budgetMinutes: intent.minutes, today: localDateKey() });
  return plan.upcoming.length ? newRun(plan.upcoming, { minutes: intent.minutes }) : null;
}

export default function TrainPage({ intent = null, onBackToToday }) {
  const [gym, setGym] = useState(loadGym);
  const [assessments] = useState(() => loadStage90().assessments);
  const [tab, setTab] = useState('session');
  // { queue, index, startedAt, clean, total, done, fromToday }
  const [run, setRun] = useState(() => runFromIntent(intent, loadGym()));
  const [summary, setSummary] = useState(null);
  const [saveError, setSaveError] = useState(false);
  const today = localDateKey();
  const gymRef = useRef(gym);
  gymRef.current = gym;

  const commit = (change) => {
    const { gym: next, ok } = updateGym(change);
    setGym(next);
    gymRef.current = next;
    setSaveError(!ok);
    return next;
  };

  const queue = useMemo(
    () => buildAssessmentSession({ exercises: EXERCISES, gym, assessments, today }),
    [gym, assessments, today],
  );
  const rows = useMemo(() => benchmarkRows(EXERCISES, gym.items, today), [gym.items, today]);
  const dueCount = rows.filter((r) => r.due).length;

  const startRun = (entries) => {
    if (!entries.length) return;
    setSummary(null);
    setRun(newRun(entries));
    window.scrollTo(0, 0);
  };

  const practiceOne = (id) => {
    const exercise = EXERCISES.find((e) => e.id === id);
    if (!exercise) return;
    startRun([{ exercise, kind: gym.items[id]?.masteredAt ? 'review' : gym.items[id]?.reps ? 'ladder' : 'new', reason: 'Picked from the benchmark table.', minutes: MINUTES_PER_ITEM }]);
  };

  const handleRep = (result, measured) => {
    const exercise = run.queue[run.index].exercise;
    let event = 'held';
    commit((current) => {
      const applied = applyRep(current, exercise, result, { today, measured });
      event = applied.event;
      return applied.gym;
    });
    setRun((r) => ({ ...r, clean: r.clean + (result === 'clean' ? 1 : 0), total: r.total + 1 }));
    return event;
  };

  const closeBout = (bout, endSession) => {
    const exercise = run.queue[run.index].exercise;
    const done = run.done + (bout.total ? 1 : 0);
    const last = endSession || run.index + 1 >= run.queue.length;
    commit((current) => {
      let next = applyBoutEnd(current, exercise, bout, today);
      if (last) {
        next = applySessionEnd(next, { minutes: (Date.now() - run.startedAt) / 60000, items: done, clean: run.clean, total: run.total, instrument: current.instrument }, today);
      }
      return next;
    });
    if (last) {
      const todayPlan = run.fromToday
        ? todayTrainPlan({ gym: gymRef.current, exercises: EXERCISES, budgetMinutes: run.fromToday.minutes, today })
        : null;
      setSummary({ minutes: Math.max(1, Math.round((Date.now() - run.startedAt) / 60000)), items: done, clean: run.clean, total: run.total, endedAt: new Date(), todayPlan });
      setRun(null);
    } else {
      setRun((r) => ({ ...r, index: r.index + 1, done }));
    }
    window.scrollTo(0, 0);
  };

  if (run) {
    const entry = run.queue[run.index];
    return (
      <ExerciseRunner
        key={`${entry.exercise.id}-${run.index}`}
        entry={entry}
        item={gym.items[entry.exercise.id]}
        position={run.index}
        total={run.queue.length}
        suggestedMinutes={entry.minutes || MINUTES_PER_ITEM}
        isLast={run.index + 1 >= run.queue.length}
        onRep={handleRep}
        onNext={(bout) => closeBout(bout, false)}
        onExit={(bout) => closeBout(bout, true)}
      />
    );
  }

  return (
    <section className="mx-auto max-w-[1500px] space-y-5" aria-labelledby="train-title">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div className="max-w-2xl">
          <div className="text-[11px] font-bold tracking-[3px] text-teal-400">SKILL GYM</div>
          <h2 id="train-title" className="mt-1 text-3xl font-bold text-white" style={{ fontFamily: 'ui-serif, Georgia, serif' }}>Train</h2>
          <p className="mt-1.5 text-sm leading-relaxed text-gray-400">
            Technique work with a number attached. The click only speeds up after clean passes in a row, weak and overdue items come first, and finished work returns on a widening schedule so it sticks.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Segmented label="Instrument" options={INSTRUMENTS} value={gym.instrument} onChange={(instrument) => commit((g) => ({ ...g, instrument }))} />
          <Segmented label="Session length" options={LENGTHS.map((m) => [m, `${m} min`])} value={gym.minutes} onChange={(minutes) => commit((g) => ({ ...g, minutes }))} />
        </div>
      </header>

      {saveError && <p className="rounded-xl border border-rose-700 bg-rose-950/40 px-4 py-2 text-sm text-rose-200" role="alert">Progress could not be saved to this browser. Check the storage status in the header before continuing.</p>}

      <div className="flex gap-1 border-b border-gray-800" role="tablist" aria-label="Train sections">
        {[['session', "Today's session", ListChecks], ['benchmarks', 'Benchmarks', Gauge]].map(([id, label, Icon]) => (
          <button key={id} type="button" role="tab" aria-selected={tab === id} onClick={() => setTab(id)} className={`-mb-px flex items-center gap-2 border-b-2 px-4 py-2.5 text-sm font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 ${tab === id ? 'border-teal-400 text-white' : 'border-transparent text-gray-500 hover:text-gray-200'}`}>
            <Icon size={16} aria-hidden="true" />{label}
            {id === 'benchmarks' && dueCount > 0 && <span className="rounded-full bg-amber-500/20 px-1.5 text-[11px] font-bold text-amber-300">{dueCount} due</span>}
          </button>
        ))}
      </div>

      {tab === 'session' && (
        <div className="grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1fr)_340px]">
          <div className="min-w-0 space-y-4">
            {summary && (
              <div className="rounded-2xl border border-emerald-600/60 bg-emerald-950/20 p-5" role="status">
                <div className="text-[10px] font-bold uppercase tracking-[2px] text-emerald-400">Session logged at {clock12(summary.endedAt)}</div>
                <p className="mt-1 text-lg font-bold text-white">{summary.minutes} min · {summary.items} exercise{summary.items === 1 ? '' : 's'} · {summary.clean} clean of {summary.total} passes</p>
                <p className="mt-1 text-sm text-gray-300">Tempos, benchmarks and review dates are updated. The queue below is already rebuilt for next time.</p>
                {summary.todayPlan && (
                  <div className="mt-3 flex flex-wrap items-center gap-3 border-t border-emerald-800/50 pt-3">
                    <p className="min-w-0 flex-1 text-sm text-gray-200">
                      {summary.todayPlan.complete
                        ? `Counted toward today: technique block done (${summary.todayPlan.doneCount} of ${Math.max(summary.todayPlan.slots, summary.todayPlan.doneCount)}).`
                        : `Counted toward today: ${summary.todayPlan.doneCount} of ${summary.todayPlan.slots} technique exercises done.`}
                    </p>
                    {onBackToToday && (
                      <button type="button" onClick={onBackToToday} className="flex min-h-11 items-center gap-2 rounded-xl bg-emerald-700 px-4 text-sm font-bold text-white hover:bg-emerald-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300">
                        Back to Today <ArrowRight size={16} aria-hidden="true" />
                      </button>
                    )}
                  </div>
                )}
              </div>
            )}

            <div className="rounded-2xl border border-gray-700 bg-gray-800 p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-[2px] text-gray-500">Queue for today</div>
                  <div className="text-lg font-bold text-white">{queue.length} exercises · about {queue.length * MINUTES_PER_ITEM} min</div>
                </div>
                <button type="button" onClick={() => startRun(queue)} disabled={!queue.length} className="flex items-center gap-2 rounded-xl bg-teal-600 px-6 py-3 text-[15px] font-extrabold text-white hover:bg-teal-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-300 disabled:bg-gray-700 disabled:text-gray-500">
                  Start session <ArrowRight size={18} aria-hidden="true" />
                </button>
              </div>

              {queue.length === 0 ? (
                <p className="mt-4 text-sm text-gray-400">Nothing is due for this instrument today. Pick any exercise from Benchmarks to practice it anyway.</p>
              ) : (
                <ol className="mt-4 space-y-2">
                  {queue.map((entry, i) => {
                    const kind = KIND[entry.kind];
                    return (
                      <li key={entry.exercise.id} className="flex items-start gap-3 rounded-xl border border-gray-700 bg-gray-900/40 px-3.5 py-3">
                        <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-gray-700 text-xs font-bold text-gray-200">{i + 1}</span>
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="font-semibold text-gray-100">{entry.exercise.title}</span>
                            <span className={`flex items-center gap-1 rounded-md border px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide ${kind.style}`}><kind.Icon size={11} aria-hidden="true" />{kind.label}</span>
                          </div>
                          <div className="mt-0.5 flex items-center gap-1.5 text-[11px] text-gray-500">
                            <span className="inline-block h-2 w-2 rounded-sm" style={{ background: INSTRUMENT_COLOR[entry.exercise.instrument] }} aria-hidden="true" />
                            <span className="capitalize">{entry.exercise.instrument}</span> · {entry.exercise.moduleTitle}
                          </div>
                          <p className="mt-1 text-xs leading-relaxed text-gray-400">{entry.reason}</p>
                        </div>
                        {entry.bpm && <div className="shrink-0 text-right"><div className="text-lg font-bold tabular-nums text-white">{entry.bpm}</div><div className="text-[10px] text-gray-500">BPM</div></div>}
                      </li>
                    );
                  })}
                </ol>
              )}
            </div>
          </div>

          <aside className="space-y-4">
            {['electric', 'acoustic'].map((instrument) => {
              const s = instrumentSummary(rows, instrument);
              return (
                <div key={instrument} className="rounded-2xl border border-gray-700 bg-gray-800 p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm font-bold capitalize text-gray-100"><span className="h-2.5 w-2.5 rounded-sm" style={{ background: INSTRUMENT_COLOR[instrument] }} aria-hidden="true" />{instrument}</div>
                    <span className="text-xl font-bold tabular-nums text-white">{Math.round(s.progress * 100)}%</span>
                  </div>
                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-gray-900" role="img" aria-label={`${instrument} ${Math.round(s.progress * 100)} percent to target`}>
                    <div className="h-full rounded-full" style={{ width: `${Math.round(s.progress * 100)}%`, background: INSTRUMENT_COLOR[instrument] }} />
                  </div>
                  <div className="mt-2 text-xs text-gray-400">{s.started} of {s.total} started · {s.mastered} at target · {s.due} due</div>
                </div>
              );
            })}
            <div className="rounded-2xl border border-gray-700 bg-gray-800/60 p-4 text-xs leading-relaxed text-gray-400">
              <div className="mb-1 font-bold text-gray-200">How the ladder works</div>
              Play a pass, then grade it: clean, shaky or missed. Enough clean passes in a row and the click steps up. Two misses and it steps down. Your best clean tempo is the benchmark, and it never moves unless you earn it.
            </div>
          </aside>
        </div>
      )}

      {tab === 'benchmarks' && <BenchmarkBoard rows={rows} gym={gym} today={today} onPractice={practiceOne} />}
    </section>
  );
}
