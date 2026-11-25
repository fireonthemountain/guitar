import { INSTRUMENT_COLOR } from './BenchmarkBoard';
import { TRAIN_INSTRUMENTS } from '../../utils/trainLink';

// The Train side of the weekly assessment: what the tempo ladders did over the
// last seven days, next to the single G–D–Em–C tempo test. Renders a live
// report or one frozen into a saved assessment (same shape).

const shortDate = (key) => new Date(`${key}T12:00:00`).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

function Stat({ value, label, tone = 'text-white' }) {
  return (
    <div className="rounded-xl bg-gray-900/60 px-3 py-2.5">
      <div className={`text-xl font-bold tabular-nums ${tone}`}>{value}</div>
      <div className="mt-0.5 text-[10px] leading-tight text-gray-500">{label}</div>
    </div>
  );
}

export default function TrainWeekCard({ report, compact = false, onOpenTrain }) {
  if (!report) return null;
  const reviewed = report.reviews.passed + report.reviews.failed;
  const range = `${shortDate(report.from)} – ${shortDate(report.to)}`;

  return (
    <section aria-label="Technique this week" data-testid="train-week" className={compact ? 'rounded-xl border border-gray-700 bg-gray-900/40 p-3' : 'rounded-2xl bg-gray-800 p-4'}>
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <div className="text-[10px] font-bold tracking-[2px] text-teal-400">TECHNIQUE THIS WEEK · TRAIN</div>
        <div className="text-[11px] text-gray-500">{range} · compared with before {shortDate(report.from)}</div>
      </div>

      {report.reps === 0 ? (
        <p className="mt-2 text-sm leading-relaxed text-gray-400">
          No Train reps in the last {report.days} days, so there are no technique benchmarks to compare this week.
          {onOpenTrain && <> <button type="button" onClick={onOpenTrain} className="font-semibold text-teal-300 underline hover:text-teal-200">Open Train</button></>}
        </p>
      ) : (
        <>
          <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
            <Stat value={report.reps} label={`graded passes · ${report.cleanRate}% clean`} />
            <Stat value={`${report.daysPracticed}/${report.days}`} label={`days practiced${report.minutes ? ` · ${report.minutes} min` : ''}`} />
            <Stat value={report.reviews.passed} label={`review${report.reviews.passed === 1 ? '' : 's'} passed${reviewed ? ` of ${reviewed}` : ''}`} tone="text-emerald-300" />
            <Stat value={report.reviews.failed} label={`review${report.reviews.failed === 1 ? '' : 's'} failed`} tone={report.reviews.failed ? 'text-rose-300' : 'text-white'} />
          </div>

          <div className={`mt-3 grid grid-cols-1 gap-3 ${compact ? '' : 'md:grid-cols-2'}`}>
            {TRAIN_INSTRUMENTS.map((name) => {
              const b = report.instruments?.[name];
              if (!b) return null;
              return (
                <div key={name} className="min-w-0 rounded-xl border border-gray-700 bg-gray-900/40 p-3" data-testid={`train-week-${name}`}>
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 text-sm font-bold capitalize text-gray-100"><span className="h-2.5 w-2.5 rounded-sm" style={{ background: INSTRUMENT_COLOR[name] }} aria-hidden="true" />{name}</div>
                    <div className={`text-sm font-bold tabular-nums ${b.gainedBpm > 0 || b.firstBenchmarks > 0 ? 'text-emerald-300' : 'text-gray-500'}`}>{b.gainedBpm > 0 ? `+${b.gainedBpm} BPM` : b.firstBenchmarks > 0 ? `${b.firstBenchmarks} first benchmark${b.firstBenchmarks === 1 ? '' : 's'}` : 'no gain'}</div>
                  </div>
                  <div className="mt-0.5 text-[11px] text-gray-500">
                    {b.practiced} practiced · {b.improved} faster{b.firstBenchmarks ? ` · ${b.firstBenchmarks} first benchmark${b.firstBenchmarks === 1 ? '' : 's'}` : ''} · {b.atTarget} at target{b.newlyAtTarget ? ` (${b.newlyAtTarget} new)` : ''}
                  </div>
                  {b.changes.length === 0 ? (
                    <p className="mt-2 text-xs text-gray-500">{b.practiced ? 'Practiced, but no best clean tempo moved this week.' : 'Not practiced this week.'}</p>
                  ) : (
                    <table className="mt-2 w-full text-xs">
                      <thead>
                        <tr className="text-left text-[10px] uppercase tracking-wide text-gray-600">
                          <th className="pb-1 font-semibold">Best clean BPM</th>
                          <th className="pb-1 text-right font-semibold">Last wk</th>
                          <th className="pb-1 text-right font-semibold">Now</th>
                          <th className="pb-1 text-right font-semibold">Change</th>
                        </tr>
                      </thead>
                      <tbody>
                        {b.changes.slice(0, compact ? 3 : 8).map((c) => (
                          <tr key={c.id} className="border-t border-gray-800">
                            <td className="py-1 pr-2 text-gray-300">{c.title}</td>
                            <td className="py-1 text-right tabular-nums text-gray-500">{c.before ?? '–'}</td>
                            <td className="py-1 text-right font-bold tabular-nums text-white">{c.after}</td>
                            <td className="py-1 text-right font-bold tabular-nums text-emerald-300">{c.delta === null ? 'first' : `+${c.delta}`}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              );
            })}
          </div>

          {(report.weakest.length > 0 || report.reviews.failedItems.length > 0) && (
            <div className={`mt-3 grid grid-cols-1 gap-3 ${compact ? '' : 'md:grid-cols-2'}`}>
              {report.weakest.length > 0 && (
                <div className="min-w-0">
                  <div className="text-[10px] font-bold tracking-[2px] text-amber-400">WEAKEST — FIRST IN NEXT WEEK'S QUEUE</div>
                  <ul className="mt-1 space-y-1 text-xs text-gray-300">
                    {report.weakest.map((w) => (
                      <li key={w.id} className="flex items-baseline justify-between gap-2">
                        <span className="min-w-0"><span className="mr-1.5 inline-block h-2 w-2 rounded-sm" style={{ background: INSTRUMENT_COLOR[w.instrument] }} aria-hidden="true" />{w.title}</span>
                        <span className="shrink-0 tabular-nums text-gray-500">{w.targetBpm ? `${w.bestCleanBpm ?? '–'} of ${w.targetBpm} BPM` : `${w.cleanRate}% clean`}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {report.reviews.failedItems.length > 0 && (
                <div className="min-w-0">
                  <div className="text-[10px] font-bold tracking-[2px] text-rose-400">FAILED REVIEWS THIS WEEK</div>
                  <ul className="mt-1 space-y-1 text-xs text-gray-300">
                    {report.reviews.failedItems.slice(0, compact ? 3 : 6).map((f) => (
                      <li key={`${f.id}-${f.date}`} className="flex items-baseline justify-between gap-2">
                        <span className="min-w-0">{f.title}</span>
                        <span className="shrink-0 tabular-nums text-gray-500">{f.clean}/{f.total} clean · {shortDate(f.date)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </section>
  );
}
