import { useState } from 'react';
import { dailyActivity, instrumentSummary, moduleSummaries, streakDays } from '../../utils/practiceEngine';

// Benchmarks: is the practice working? Everything here is computed from logged
// repetitions — best clean tempo against target, per exercise and per module.
//
// Series colors identify the instrument and were checked with the dataviz
// palette validator against this dark surface (lightness band, CVD separation,
// contrast). Text never wears the series color; a swatch beside it does.
export const INSTRUMENT_COLOR = { electric: '#d97706', acoustic: '#0d9488' };
const INSTRUMENT_LABEL = { electric: 'Electric', acoustic: 'Acoustic' };

const shortDate = (key) => {
  const [y, m, d] = key.split('-').map(Number);
  return new Date(y, m - 1, d).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

function Swatch({ instrument }) {
  return <span className="inline-block h-2.5 w-2.5 shrink-0 rounded-sm" style={{ background: INSTRUMENT_COLOR[instrument] }} aria-hidden="true" />;
}

function Tile({ label, value, sub }) {
  return (
    <div className="rounded-2xl border border-gray-700 bg-gray-800 px-4 py-3">
      <div className="text-[10px] font-bold uppercase tracking-[2px] text-gray-500">{label}</div>
      <div className="mt-0.5 text-3xl font-bold tabular-nums text-white">{value}</div>
      {sub && <div className="text-xs text-gray-400">{sub}</div>}
    </div>
  );
}

// 28 days of repetitions: one bar per day, clean reps as the solid part.
function ActivityChart({ days }) {
  const [hover, setHover] = useState(null);
  const W = 560, H = 120, PAD = { l: 28, r: 6, t: 8, b: 20 };
  const iw = W - PAD.l - PAD.r, ih = H - PAD.t - PAD.b;
  const max = Math.max(10, ...days.map((d) => d.reps));
  const slot = iw / days.length;
  const bar = Math.max(4, slot - 2);
  const y = (v) => PAD.t + ih - (v / max) * ih;
  const shown = hover != null ? days[hover] : null;
  return (
    <div>
      <div className="mb-1 flex items-baseline justify-between gap-3">
        <span className="text-[10px] font-bold uppercase tracking-[2px] text-gray-500">Repetitions per day, last 4 weeks</span>
        <span className="text-xs tabular-nums text-gray-300">
          {shown ? `${shortDate(shown.date)}: ${shown.reps} reps, ${shown.clean} clean${shown.minutes ? `, ${shown.minutes} min` : ''}` : 'Hover a day for detail'}
        </span>
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" role="img" aria-label="Bar chart of repetitions per day for the last 28 days" onMouseLeave={() => setHover(null)}>
        {[0, max].map((v) => (
          <g key={v}>
            <line x1={PAD.l} x2={W - PAD.r} y1={y(v)} y2={y(v)} stroke="#374151" strokeWidth="1" />
            <text x={PAD.l - 5} y={y(v) + 3} textAnchor="end" fill="#9ca3af" style={{ font: '9px sans-serif' }}>{v}</text>
          </g>
        ))}
        {days.map((d, i) => {
          const x = PAD.l + i * slot + (slot - bar) / 2;
          return (
            <g key={d.date} onMouseEnter={() => setHover(i)} onFocus={() => setHover(i)} tabIndex={0} style={{ outline: 'none' }}>
              <rect x={PAD.l + i * slot} y={PAD.t} width={slot} height={ih} fill={hover === i ? '#ffffff0d' : 'transparent'} />
              {d.reps > 0 && <rect x={x} y={y(d.reps)} width={bar} height={y(0) - y(d.reps)} rx="2" fill="#4b5563" />}
              {d.clean > 0 && <rect x={x} y={y(d.clean)} width={bar} height={y(0) - y(d.clean)} rx="2" fill="#0d9488" />}
              <title>{`${shortDate(d.date)}: ${d.reps} reps, ${d.clean} clean`}</title>
              {(i === 0 || i === days.length - 1 || i % 7 === 0) && (
                <text x={PAD.l + i * slot + slot / 2} y={H - 6} textAnchor="middle" fill="#9ca3af" style={{ font: '9px sans-serif' }}>{shortDate(d.date)}</text>
              )}
            </g>
          );
        })}
      </svg>
      <div className="mt-1 flex gap-4 text-[11px] text-gray-400">
        <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-sm bg-teal-600" aria-hidden="true" />Clean</span>
        <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-sm bg-gray-600" aria-hidden="true" />Shaky or missed</span>
      </div>
    </div>
  );
}

// Best clean BPM per practice day for one exercise, against its target.
function TempoTrend({ row }) {
  const points = row.history;
  if (!points.length) return <span className="text-[11px] text-gray-600">no clean rung yet</span>;
  const W = 150, H = 34;
  const lo = Math.min(row.startBpm, ...points.map((p) => p[1])) - 2;
  const hi = row.targetBpm + 2;
  const x = (i) => (points.length === 1 ? W - 6 : 4 + (i / (points.length - 1)) * (W - 10));
  const y = (v) => H - 4 - ((v - lo) / (hi - lo)) * (H - 8);
  const color = INSTRUMENT_COLOR[row.instrument];
  return (
    <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H} role="img" aria-label={`Best clean tempo over time: ${points.map((p) => `${shortDate(p[0])} ${p[1]}`).join(', ')}. Target ${row.targetBpm}.`}>
      <title>{points.map((p) => `${shortDate(p[0])}: ${p[1]} BPM`).join('\n')}</title>
      <line x1="0" x2={W} y1={y(row.targetBpm)} y2={y(row.targetBpm)} stroke="#6b7280" strokeWidth="1" strokeDasharray="3 3" />
      {points.length > 1 && <polyline points={points.map((p, i) => `${x(i).toFixed(1)},${y(p[1]).toFixed(1)}`).join(' ')} fill="none" stroke={color} strokeWidth="2" strokeLinejoin="round" />}
      <circle cx={x(points.length - 1)} cy={y(points.at(-1)[1])} r="3.5" fill={color} stroke="#1f2937" strokeWidth="2" />
    </svg>
  );
}

function ProgressBar({ value, instrument, label }) {
  return (
    <div className="h-2.5 overflow-hidden rounded-full bg-gray-900" role="img" aria-label={label}>
      <div className="h-full rounded-full" style={{ width: `${Math.round(value * 100)}%`, background: INSTRUMENT_COLOR[instrument] }} />
    </div>
  );
}

export default function BenchmarkBoard({ rows, gym, today, onPractice }) {
  const modules = moduleSummaries(rows);
  const activity = dailyActivity(gym, 28, today);
  const weekReps = activity.slice(-7).reduce((sum, d) => sum + d.reps, 0);
  const weekClean = activity.slice(-7).reduce((sum, d) => sum + d.clean, 0);
  const weekMinutes = activity.slice(-7).reduce((sum, d) => sum + d.minutes, 0);
  const started = rows.filter((r) => r.reps);
  const weakest = [...started].filter((r) => !r.mastered).sort((a, b) => b.weakness - a.weakness).slice(0, 3);

  return (
    <div className="min-w-0 space-y-5">
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-5">
        <Tile label="Practice streak" value={`${streakDays(gym, today)} d`} sub="days in a row with logged reps" />
        <Tile label="This week" value={weekReps} sub={`reps, ${weekReps ? Math.round((weekClean / weekReps) * 100) : 0}% clean, ${weekMinutes} min`} />
        <Tile label="At target tempo" value={`${rows.filter((r) => r.mastered).length}/${rows.length}`} sub="exercises mastered" />
        {['electric', 'acoustic'].map((instrument) => {
          const s = instrumentSummary(rows, instrument);
          return (
            <div key={instrument} className="rounded-2xl border border-gray-700 bg-gray-800 px-4 py-3">
              <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[2px] text-gray-500"><Swatch instrument={instrument} />{INSTRUMENT_LABEL[instrument]}</div>
              <div className="mt-0.5 text-3xl font-bold tabular-nums text-white">{Math.round(s.progress * 100)}%</div>
              <div className="text-xs text-gray-400">{s.mastered} of {s.total} at target · {s.due} due</div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
        <div className="min-w-0 rounded-2xl border border-gray-700 bg-gray-800 p-4">
          <ActivityChart days={activity} />
        </div>

        <div className="rounded-2xl border border-gray-700 bg-gray-800 p-4">
          <div className="mb-3 flex items-baseline justify-between">
            <span className="text-[10px] font-bold uppercase tracking-[2px] text-gray-500">Progress to target tempo, by skill area</span>
            <span className="flex gap-3 text-[11px] text-gray-400">
              <span className="flex items-center gap-1.5"><Swatch instrument="electric" />Electric</span>
              <span className="flex items-center gap-1.5"><Swatch instrument="acoustic" />Acoustic</span>
            </span>
          </div>
          <div className="grid grid-cols-1 gap-x-6 gap-y-2.5 sm:grid-cols-2">
            {['electric', 'acoustic'].map((instrument) => (
              <div key={instrument} className="space-y-2.5">
                {modules.filter((m) => m.instrument === instrument).map((m) => (
                  <div key={m.key}>
                    <div className="mb-1 flex items-baseline justify-between gap-2 text-xs">
                      <span className="truncate text-gray-200">{m.title}</span>
                      <span className="shrink-0 tabular-nums text-gray-400">{Math.round(m.progress * 100)}% · {m.mastered}/{m.total}</span>
                    </div>
                    <ProgressBar value={m.progress} instrument={instrument} label={`${m.title}: ${Math.round(m.progress * 100)} percent to target`} />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {weakest.length > 0 && (
        <div className="rounded-2xl border border-amber-700/50 bg-amber-950/20 p-4">
          <div className="text-[10px] font-bold uppercase tracking-[2px] text-amber-400">Weakest right now: these come up first in your next session</div>
          <ul className="mt-2 grid grid-cols-1 gap-2 md:grid-cols-3">
            {weakest.map((r) => (
              <li key={r.id} className="flex min-w-0 items-center gap-2 text-sm text-gray-200">
                <Swatch instrument={r.instrument} />
                <span className="min-w-0 flex-1 truncate">{r.title}</span>
                <span className="shrink-0 text-xs tabular-nums text-gray-400">{r.bestCleanBpm || '–'} / {r.targetBpm || '–'} BPM · {r.cleanRate}% clean</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="relative overflow-x-auto rounded-2xl border border-gray-700 bg-gray-800">
        <table className="w-full min-w-[900px] text-left text-sm">
          <caption className="sr-only">Every exercise with its best clean tempo, target, clean rate and next review date</caption>
          <thead className="text-[10px] uppercase tracking-[1.5px] text-gray-500">
            <tr className="border-b border-gray-700">
              <th scope="col" className="px-4 py-2.5 font-bold">Exercise</th>
              <th scope="col" className="px-3 py-2.5 text-right font-bold">Best clean</th>
              <th scope="col" className="px-3 py-2.5 text-right font-bold">Target</th>
              <th scope="col" className="w-40 px-3 py-2.5 font-bold">To target</th>
              <th scope="col" className="px-3 py-2.5 font-bold">Trend</th>
              <th scope="col" className="px-3 py-2.5 text-right font-bold">Clean rate</th>
              <th scope="col" className="px-3 py-2.5 font-bold">Next review</th>
              <th scope="col" className="px-3 py-2.5"><span className="sr-only">Practice</span></th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} className="border-b border-gray-700/60 last:border-0">
                <th scope="row" className="min-w-[240px] px-4 py-2 font-normal">
                  <div className="flex items-center gap-2 text-gray-100"><Swatch instrument={r.instrument} />{r.title}</div>
                  <div className="pl-[18px] text-[11px] text-gray-500">{INSTRUMENT_LABEL[r.instrument]} · {r.moduleTitle}</div>
                </th>
                <td className="px-3 py-2 text-right tabular-nums text-gray-100">{r.bestCleanBpm ? `${r.bestCleanBpm}` : r.mastered ? 'done' : '–'}</td>
                <td className="px-3 py-2 text-right tabular-nums text-gray-400">{r.targetBpm || '–'}</td>
                <td className="px-3 py-2">
                  <ProgressBar value={r.progress} instrument={r.instrument} label={`${Math.round(r.progress * 100)} percent to target`} />
                </td>
                <td className="px-3 py-2">{r.targetBpm ? <TempoTrend row={r} /> : <span className="text-[11px] text-gray-600">no tempo</span>}</td>
                <td className="px-3 py-2 text-right tabular-nums text-gray-300">{r.cleanRate == null ? '–' : `${r.cleanRate}%`}</td>
                <td className="px-3 py-2 text-xs text-gray-300">
                  {!r.reps ? <span className="text-gray-600">not started</span> : r.due ? <span className="font-semibold text-amber-300">due now</span> : r.dueDate ? shortDate(r.dueDate) : '–'}
                </td>
                <td className="px-3 py-2 text-right">
                  <button type="button" onClick={() => onPractice(r.id)} className="rounded-lg border border-gray-600 px-2.5 py-1 text-xs font-semibold text-gray-300 hover:border-teal-600 hover:text-teal-200">Practice</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
