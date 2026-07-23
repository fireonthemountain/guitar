import { useState, useEffect, useMemo } from 'react';
import AssessmentWizard from '../components/stage90/AssessmentWizard';
import ReadinessDial from '../components/stage90/ReadinessDial';
import TrendChart from '../components/stage90/TrendChart';
import { ASSESSMENT_WEEKS, PHASES, phaseForWeek, GIG_TEMPO_TARGET, RATING_KEYS } from '../data/assessmentPlan';
import {
  loadStage90, saveStage90, dateKey, addDays, currentWeek, daysToGig,
  planForWeek, gigReadiness, remediationFor, PROGRAM_WEEKS,
} from '../utils/stage90';

const fmtDate = (iso) => new Date(iso + 'T00:00:00').toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' });

// --- Setup: first visit, pick the gig date --------------------------------
function SetupCard({ onStart }) {
  const [gig, setGig] = useState(() => addDays(dateKey(new Date()), 7 * (PROGRAM_WEEKS + 1)));
  return (
    <div className="max-w-lg mx-auto bg-gray-800 border border-gray-700 rounded-2xl p-6 space-y-4 text-center">
      <div className="text-4xl">🎤</div>
      <h3 className="text-white text-xl font-bold" style={{ fontFamily: 'ui-serif, Georgia, serif' }}>Set your gig date</h3>
      <p className="text-gray-400 text-sm leading-relaxed">
        The program is a week-0 placement plus 13 training weeks, each ending in an assessment.
        Pick the coffee-shop night — everything counts down from here. You can change it later.
      </p>
      <input
        type="date"
        value={gig}
        min={addDays(dateKey(new Date()), 14)}
        onChange={(e) => setGig(e.target.value)}
        className="bg-gray-900 border border-gray-700 rounded-lg px-4 py-2.5 text-white text-base mx-auto block"
      />
      <button onClick={() => onStart(gig)} className="w-full py-3 rounded-xl font-extrabold text-[15px] bg-rose-500 hover:bg-rose-400 text-rose-50">
        Start the program — week 0 begins today
      </button>
    </div>
  );
}

// --- History table row ------------------------------------------------------
function HistoryRow({ record, plan, onRedo }) {
  const counts = plan.criteria.reduce(
    (acc, c) => {
      const r = record.criteria?.[c.id];
      if (r) acc[r] += 1;
      return acc;
    },
    { pass: 0, marginal: 0, fail: 0 }
  );
  return (
    <div className="flex items-center gap-3 bg-gray-900/50 border border-gray-700 rounded-xl px-3 py-2.5">
      <div className="w-10 text-center flex-shrink-0">
        <div className="text-white font-bold text-sm">w{record.week}</div>
        <div className="text-gray-600 text-[9px]">{fmtDate(record.date).split(',')[0]}</div>
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-gray-300 text-xs font-semibold truncate">{plan.title}</div>
        <div className="flex gap-2 text-[11px] mt-0.5">
          <span className="text-emerald-400">{counts.pass} pass</span>
          {counts.marginal > 0 && <span className="text-amber-400">{counts.marginal} marginal</span>}
          {counts.fail > 0 && <span className="text-rose-400">{counts.fail} fail</span>}
          {record.maxCleanBpm > 0 && <span className="text-gray-500">· {record.maxCleanBpm} BPM</span>}
        </div>
      </div>
      <div className="text-right flex-shrink-0">
        <div className="text-teal-400 font-bold text-lg" style={{ fontFamily: 'ui-serif, Georgia, serif' }}>{record.score}</div>
        <button onClick={onRedo} className="text-gray-600 hover:text-gray-400 text-[10px] underline">redo</button>
      </div>
    </div>
  );
}

export default function AssessmentPage() {
  const [state, setState] = useState(loadStage90);
  const [wizardWeek, setWizardWeek] = useState(null); // week number, or null
  const [editGig, setEditGig] = useState(false);

  useEffect(() => { saveStage90(state); }, [state]);

  const started = !!state.startDate;
  const week = started ? currentWeek(state.startDate) : 0;
  const plan = planForWeek(week);
  const phase = phaseForWeek(week);
  const gigDays = started ? daysToGig(state.gigDate) : null;
  const readiness = useMemo(() => gigReadiness(state.assessments), [state.assessments]);

  const done = useMemo(
    () => Object.values(state.assessments).filter((a) => a && typeof a.score === 'number').sort((a, b) => a.week - b.week),
    [state.assessments]
  );
  const latest = done.at(-1) || null;
  const latestPlan = latest ? planForWeek(latest.week) : null;
  const remediation = latest ? remediationFor(latest, latestPlan) : [];

  const start = (gig) => setState({ startDate: dateKey(new Date()), gigDate: gig, assessments: {} });

  const saveRecord = (record) => {
    setState((s) => ({ ...s, assessments: { ...s.assessments, [record.week]: record } }));
    setWizardWeek(null);
    window.scrollTo(0, 0);
  };

  const exportData = () => {
    const blob = new Blob([JSON.stringify(state)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'stage90-progress.json';
    a.click();
  };

  const importData = () => {
    const v = prompt('Paste your exported Stage Ready progress JSON:');
    if (!v) return;
    try {
      const parsed = JSON.parse(v);
      if (!parsed.startDate) throw new Error('missing startDate');
      setState({ startDate: null, gigDate: null, assessments: {}, ...parsed });
      alert('Progress restored.');
    } catch {
      alert("Couldn't parse that — make sure it's the exported JSON.");
    }
  };

  // Trend series
  const bpmSeries = done.filter((a) => a.maxCleanBpm > 0).map((a) => ({ week: a.week, value: a.maxCleanBpm }));
  const scoreSeries = done.map((a) => ({ week: a.week, value: a.score }));
  const confSeries = done
    .filter((a) => a.ratings?.confidence)
    .map((a) => ({ week: a.week, value: a.ratings.confidence }));

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="text-center">
        <div className="text-teal-400 text-[11px] font-bold tracking-[3px]">STAGE READY 90</div>
        <h2 className="text-3xl sm:text-4xl font-bold text-white mt-1" style={{ fontFamily: 'ui-serif, Georgia, serif' }}>
          Weekly <span className="text-amber-400 italic font-semibold">Assessment</span>
        </h2>
        <p className="text-gray-400 text-sm mt-2">
          The goal: <b className="text-gray-200">a coffee-shop set on gig night</b> — three songs, standing, from memory, recovering without stopping.
        </p>
      </div>

      {!started ? (
        <SetupCard onStart={start} />
      ) : (
        <>
          {/* Status hero: countdown + dial + phase */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12 bg-gray-800 rounded-2xl p-5">
            <div className="text-center">
              <div className={`font-bold text-5xl leading-none ${gigDays <= 14 ? 'text-rose-400' : 'text-amber-400'}`} style={{ fontFamily: 'ui-serif, Georgia, serif' }}>
                {Math.max(gigDays, 0)}
              </div>
              <div className="text-gray-400 text-xs font-semibold mt-1">days to the gig</div>
              {editGig ? (
                <input
                  type="date"
                  defaultValue={state.gigDate}
                  onBlur={(e) => { if (e.target.value) setState((s) => ({ ...s, gigDate: e.target.value })); setEditGig(false); }}
                  className="mt-1 bg-gray-900 border border-gray-700 rounded px-2 py-1 text-gray-300 text-xs"
                  autoFocus
                />
              ) : (
                <button onClick={() => setEditGig(true)} className="text-gray-600 hover:text-gray-400 text-[11px] underline mt-1">
                  {fmtDate(state.gigDate)}
                </button>
              )}
            </div>
            <ReadinessDial score={readiness} />
            <div className="w-full sm:w-auto sm:min-w-[220px] space-y-2">
              <div className="flex gap-1.5">
                {PHASES.map((p) => (
                  <div key={p.name} className={`flex-1 py-1.5 px-1 rounded-lg text-center border ${p === phase ? 'bg-gray-900/60 border-amber-500' : 'border-gray-700'}`}>
                    <div className={`text-[10px] font-bold ${p === phase ? 'text-amber-400' : 'text-gray-500'}`}>{p.name}</div>
                    <div className="text-[9px] text-gray-600">w{p.weeks[0]}{p.weeks[1] !== p.weeks[0] ? `–${p.weeks[1]}` : ''}</div>
                  </div>
                ))}
              </div>
              <div className="text-center text-gray-400 text-xs">
                Week <b className="text-white">{week}</b> of {PROGRAM_WEEKS} · {done.length} assessment{done.length === 1 ? '' : 's'} done
              </div>
            </div>
          </div>

          {/* Wizard, when open */}
          {wizardWeek !== null && (
            <AssessmentWizard
              week={wizardWeek}
              plan={planForWeek(wizardWeek)}
              existing={state.assessments[wizardWeek]}
              onSave={saveRecord}
              onCancel={() => setWizardWeek(null)}
            />
          )}

          {wizardWeek === null && (
            <div className="grid gap-5 lg:grid-cols-3 items-start">
              {/* Main column */}
              <div className="lg:col-span-2 space-y-4 min-w-0">
                {/* This week */}
                <div className="bg-gray-800 rounded-2xl p-4">
                  <div className="text-rose-400 text-[10px] font-bold tracking-[2px] mb-1">THIS WEEK · WEEK {week} — {plan.title.toUpperCase()}</div>
                  <p className="text-gray-300 text-sm leading-relaxed mb-3">{plan.focus}</p>
                  <div className="text-gray-500 text-[10px] font-bold tracking-[2px] mb-1.5">THE BAR TO CLEAR</div>
                  <ul className="space-y-1.5 mb-4">
                    {plan.criteria.map((c) => (
                      <li key={c.id} className="flex gap-2 items-start text-sm text-gray-300 leading-snug">
                        <span className="text-amber-400 mt-0.5">◦</span> {c.label}
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => setWizardWeek(week)}
                    className="w-full py-3 rounded-xl font-extrabold text-[15px] bg-teal-600 hover:bg-teal-500 text-white"
                  >
                    {state.assessments[week] ? '↻ Redo this week\'s assessment' : `Take the week ${week} assessment`}
                  </button>
                  {state.assessments[week] && (
                    <p className="text-center text-gray-500 text-xs mt-2">
                      Done {fmtDate(state.assessments[week].date)} — score {state.assessments[week].score}
                    </p>
                  )}
                </div>

                {/* Remediation from the latest assessment */}
                {remediation.length > 0 && (
                  <div className="bg-amber-950/30 border border-amber-600/50 rounded-2xl p-4">
                    <div className="text-amber-400 text-[10px] font-bold tracking-[2px] mb-2">
                      INJECTED FOCUS — FROM WEEK {latest.week}'S {remediation.length} MISSED CRITERI{remediation.length === 1 ? 'ON' : 'A'}
                    </div>
                    <div className="space-y-2.5">
                      {remediation.map((r) => (
                        <div key={r.id} className="text-sm leading-snug">
                          <div className={`font-semibold ${r.result === 'fail' ? 'text-rose-300' : 'text-amber-300'}`}>
                            {r.result === 'fail' ? '✗' : '~'} {r.label}
                          </div>
                          <div className="text-gray-300 mt-0.5 pl-4">→ {r.fix}</div>
                        </div>
                      ))}
                    </div>
                    <p className="text-gray-500 text-[11px] mt-3">Work these into every practice day until next Assessment Day.</p>
                  </div>
                )}

                {/* History */}
                {done.length > 0 && (
                  <div>
                    <div className="text-gray-500 text-[10px] font-bold tracking-[2px] mb-2 ml-0.5">ASSESSMENT HISTORY</div>
                    <div className="space-y-2">
                      {[...done].reverse().map((r) => (
                        <HistoryRow key={r.week} record={r} plan={planForWeek(r.week)} onRedo={() => setWizardWeek(r.week)} />
                      ))}
                    </div>
                  </div>
                )}

                {/* Catch-up: earlier weeks never assessed */}
                {ASSESSMENT_WEEKS.filter((p) => p.week < week && !state.assessments[p.week]).length > 0 && (
                  <div className="bg-gray-800/60 border border-gray-700 rounded-2xl p-4">
                    <div className="text-gray-500 text-[10px] font-bold tracking-[2px] mb-2">MISSED WEEKS</div>
                    <div className="flex flex-wrap gap-2">
                      {ASSESSMENT_WEEKS.filter((p) => p.week < week && !state.assessments[p.week]).map((p) => (
                        <button
                          key={p.week}
                          onClick={() => setWizardWeek(p.week)}
                          className="px-3 py-1.5 rounded-lg text-xs font-bold bg-gray-700 text-gray-300 hover:bg-gray-600"
                        >
                          Week {p.week} · {p.title}
                        </button>
                      ))}
                    </div>
                    <p className="text-gray-500 text-[11px] mt-2">Life happens. Assess against the missed week's bar so the trend stays honest.</p>
                  </div>
                )}
              </div>

              {/* Sidebar: trends */}
              <div className="space-y-4 min-w-0">
                <div className="bg-gray-800 rounded-2xl p-4 space-y-4">
                  <TrendChart points={scoreSeries} min={0} max={100} color="#2dd4bf" label="WEEKLY SCORE" />
                  <TrendChart points={bpmSeries} min={40} max={140} target={GIG_TEMPO_TARGET} color="#f59e0b" label="TEMPO TEST" unit=" BPM" />
                  <TrendChart points={confSeries} min={1} max={5} color="#f43f5e" label="CONFIDENCE (SELF-RATED)" />
                  {done.length < 2 && <p className="text-gray-600 text-[11px]">Trends appear once two assessments are in.</p>}
                </div>

                {/* Ratings snapshot from latest */}
                {latest && (
                  <div className="bg-gray-800 rounded-2xl p-4">
                    <div className="text-gray-500 text-[10px] font-bold tracking-[2px] mb-2">LATEST SELF-RATINGS · WEEK {latest.week}</div>
                    <div className="space-y-1.5">
                      {RATING_KEYS.map(([k, label]) => (
                        <div key={k} className="flex items-center gap-2">
                          <span className="text-gray-400 text-xs w-24 flex-shrink-0">{label}</span>
                          <div className="flex-1 bg-gray-700 rounded-full h-2">
                            <div className="bg-teal-500 rounded-full h-2" style={{ width: `${((latest.ratings?.[k] || 0) / 5) * 100}%` }} />
                          </div>
                          <span className="text-teal-400 text-xs font-bold w-4 text-right">{latest.ratings?.[k] || '–'}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Backup */}
                <div className="text-center pt-1">
                  <button onClick={exportData} className="border border-gray-700 rounded-lg px-3 py-1.5 text-[11px] text-gray-400 mx-1">Export progress</button>
                  <button onClick={importData} className="border border-gray-700 rounded-lg px-3 py-1.5 text-[11px] text-gray-400 mx-1">Import progress</button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
