import { ArrowRight, Check, Dumbbell, RefreshCw, Sparkles, TrendingUp } from 'lucide-react';
import { INSTRUMENT_COLOR } from './BenchmarkBoard';

// Today's technique block: the Train queue (due reviews, weakest ladders, new
// material) shown as part of the day's plan. Its state is read from the Train
// log, so reps graded in Train tick it off here without anything being stored
// twice.

const KIND = {
  focus: { label: 'Assessment', Icon: TrendingUp, style: 'border-rose-800/60 bg-rose-950/60 text-rose-200' },
  review: { label: 'Review', Icon: RefreshCw, style: 'border-sky-800/60 bg-sky-950/60 text-sky-200' },
  ladder: { label: 'Ladder', Icon: TrendingUp, style: 'border-teal-800/60 bg-teal-950/60 text-teal-200' },
  new: { label: 'New', Icon: Sparkles, style: 'border-amber-800/60 bg-amber-950/50 text-amber-200' },
};

export default function TrainTodayCard({ plan, number, onStart }) {
  const { entries, upcoming, doneCount, slots, complete, started, budgetMinutes, repsToday, cleanToday } = plan;
  const total = Math.max(slots, doneCount);
  const empty = entries.length === 0;

  return (
    <section aria-label="Technique for today" data-testid="train-today" className={`rounded-xl border p-3 ${complete ? 'border-emerald-800/60 bg-emerald-950/15' : started ? 'border-teal-600/70 bg-teal-950/20' : 'border-gray-700 bg-gray-800'}`}>
      <div className="flex items-start gap-3">
        <div className={`mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full border text-xs font-extrabold ${complete ? 'border-emerald-600 bg-emerald-600 text-white' : started ? 'border-teal-500 bg-teal-950 text-teal-300' : 'border-gray-600 text-gray-500'}`}>
          {complete ? '✓' : number}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <span className={`flex items-center gap-1.5 text-sm font-bold ${complete ? 'text-emerald-300' : 'text-white'}`}><Dumbbell size={15} aria-hidden="true" /> Technique · Train</span>
            <span className="text-xs font-semibold text-gray-500">{budgetMinutes} min</span>
            <span className={`rounded px-1.5 py-0.5 text-[9px] font-bold tracking-wide ${complete ? 'bg-emerald-900/60 text-emerald-300' : 'bg-gray-900 text-gray-400'}`} data-testid="train-today-count">
              {doneCount}/{total} DONE TODAY
            </span>
          </div>
          <p className="mt-0.5 text-sm leading-snug text-gray-400">
            {complete
              ? `Technique is done for today: ${cleanToday} clean of ${repsToday} graded passes. Tempos and review dates are updated.`
              : empty
                ? 'Nothing is queued for this instrument today.'
                : 'Your assessment focus comes first, followed by due reviews, in-progress work and new material.'}
          </p>

          {entries.length > 0 && (
            <ol className="mt-3 space-y-1.5">
              {entries.map((entry) => {
                const kind = KIND[entry.kind] || KIND.ladder;
                return (
                  <li key={entry.exercise.id} className={`flex items-start gap-2.5 rounded-lg border px-3 py-2 ${entry.done ? 'border-emerald-900/50 bg-emerald-950/10' : 'border-gray-700 bg-gray-900/40'}`}>
                    <span className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full ${entry.done ? 'bg-emerald-600 text-white' : 'border border-gray-600'}`} aria-hidden="true">{entry.done && <Check size={13} />}</span>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                        <span className={`text-sm font-semibold ${entry.done ? 'text-gray-400' : 'text-gray-100'}`}>{entry.exercise.title}</span>
                        <span className={`flex items-center gap-1 rounded-md border px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide ${kind.style}`}><kind.Icon size={11} aria-hidden="true" />{kind.label}</span>
                        <span className="flex items-center gap-1 text-[11px] capitalize text-gray-500"><span className="inline-block h-2 w-2 rounded-sm" style={{ background: INSTRUMENT_COLOR[entry.exercise.instrument] }} aria-hidden="true" />{entry.exercise.instrument}</span>
                      </div>
                      <p className="mt-0.5 text-xs leading-relaxed text-gray-400">{entry.reason}</p>
                    </div>
                    {entry.bpm && <div className="shrink-0 text-right"><div className="text-base font-bold tabular-nums text-white">{entry.bpm}</div><div className="text-[10px] text-gray-500">BPM</div></div>}
                  </li>
                );
              })}
            </ol>
          )}

          <button
            type="button"
            onClick={() => onStart?.(plan)}
            className={`mt-3 flex min-h-11 w-full items-center justify-center gap-2 rounded-xl px-4 text-sm font-bold focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-300 sm:w-auto ${complete || empty ? 'border border-gray-700 text-gray-300 hover:border-teal-700 hover:text-teal-200' : 'bg-teal-600 text-white hover:bg-teal-500'}`}
          >
            {complete || empty
              ? 'Open Train'
              : started
                ? `Continue technique · ${upcoming.length} left`
                : `Start technique · ${upcoming.length} exercise${upcoming.length === 1 ? '' : 's'}`}
            <ArrowRight size={16} aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
}
