import { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowRight, Check, Minus, Pause, Play, X } from 'lucide-react';
import TabBlock from '../guitar/TabBlock';
import ListenPanel from './ListenPanel';
import useLadderMetronome from './useLadderMetronome';
import { hasLadder, newItem, repsToClimb, targetBpm } from '../../utils/practiceEngine';

// One exercise, run as deliberate practice: a fixed tempo, a clear standard for
// "clean", an honest grade after every pass, and a metronome that only speeds
// up when the grades say you earned it.

const fmtClock = (seconds) => `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, '0')}`;

const EVENT_TEXT = {
  climbed: (item) => ({ text: `Clean. Up to ${item.bpm} BPM.`, tone: 'text-emerald-300' }),
  dropped: (item) => ({ text: `Two misses. Back to ${item.bpm} BPM: slower and clean beats faster and sloppy.`, tone: 'text-amber-300' }),
  mastered: () => ({ text: 'Target reached. This now moves to spaced review.', tone: 'text-emerald-300' }),
};

const KIND_LABEL = { review: 'Review', ladder: 'Ladder', new: 'New' };

export default function ExerciseRunner({ entry, item: itemIn, position, total, suggestedMinutes = 5, onRep, onNext, onExit, isLast }) {
  const { exercise } = entry;
  const item = itemIn || newItem(exercise);
  const ladder = hasLadder(exercise);
  const target = targetBpm(exercise);
  const bpm = item.bpm || exercise.tempo?.startBpm || 60;
  const need = repsToClimb(exercise);
  const metronome = useLadderMetronome(bpm);

  const [elapsed, setElapsed] = useState(0);
  const [bout, setBout] = useState({ clean: 0, total: 0 });
  const [notice, setNotice] = useState(null);
  const suggestion = useRef(null);
  const [suggested, setSuggested] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => setElapsed((s) => s + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleSuggest = useCallback((value) => {
    suggestion.current = value;
    setSuggested(value?.result || null);
  }, []);

  const grade = (result) => {
    const event = onRep(result, suggestion.current?.measured);
    setBout((b) => ({ clean: b.clean + (result === 'clean' ? 1 : 0), total: b.total + 1 }));
    setNotice(EVENT_TEXT[event] ? { event, at: Date.now() } : null);
  };

  const finish = () => { metronome.stop(); onNext(bout); };
  const noticeText = notice && EVENT_TEXT[notice.event]?.(item);
  const overTime = elapsed >= suggestedMinutes * 60;

  return (
    <div className="mx-auto max-w-6xl space-y-4">
      <div className="flex items-center gap-3">
        <div className="flex flex-1 gap-1" aria-hidden="true">
          {Array.from({ length: total }, (_, i) => (
            <div key={i} className={`h-1.5 flex-1 rounded-full ${i < position ? 'bg-emerald-500' : i === position ? 'bg-teal-500' : 'bg-gray-700'}`} />
          ))}
        </div>
        <span className="shrink-0 text-xs text-gray-500">{position + 1} of {total}</span>
        <button type="button" onClick={() => { metronome.stop(); onExit(bout); }} className="shrink-0 rounded-lg p-1 text-gray-500 hover:text-gray-200" aria-label="End session"><X size={18} /></button>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(320px,400px)]">
        {/* What to play */}
        <div className="min-w-0 space-y-4 rounded-2xl border border-gray-700 bg-gray-800 p-5">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="min-w-0">
              <div className="text-[10px] font-bold uppercase tracking-[2px] text-teal-400">
                {exercise.instrument} · {exercise.moduleTitle} · {KIND_LABEL[entry.kind] || 'Practice'}
              </div>
              <h2 className="mt-1 text-2xl font-bold text-white" style={{ fontFamily: 'ui-serif, Georgia, serif' }}>{exercise.title}</h2>
              <p className="mt-1 text-xs text-gray-400">{entry.reason}</p>
            </div>
            <div className={`shrink-0 text-right text-sm tabular-nums ${overTime ? 'text-emerald-400' : 'text-gray-400'}`}>
              {fmtClock(elapsed)}
              <div className="text-[10px] text-gray-600">about {suggestedMinutes} min</div>
            </div>
          </div>

          <ol className="list-decimal space-y-1.5 pl-5 text-[15px] leading-relaxed text-gray-100">
            {exercise.instructions.map((line) => <li key={line}>{line}</li>)}
          </ol>

          {exercise.tablature && <TabBlock label={exercise.chords?.length ? `Chords: ${exercise.chords.join(', ')}` : 'Tab'} tab={exercise.tablature} />}
          {!exercise.tablature && exercise.chords?.length > 0 && (
            <div className="flex flex-wrap gap-2">{exercise.chords.map((c) => <span key={c} className="rounded-lg bg-gray-900 px-3 py-1.5 font-mono text-sm font-bold text-gray-100">{c}</span>)}</div>
          )}

          {exercise.listenFor?.length > 0 && (
            <div className="rounded-xl border border-gray-700 bg-gray-900/50 px-4 py-3">
              <div className="text-[10px] font-bold uppercase tracking-[2px] text-amber-400">A clean pass means</div>
              <ul className="mt-1.5 space-y-1 text-sm text-gray-300">
                {exercise.listenFor.map((line) => <li key={line} className="flex gap-2"><Check size={15} className="mt-0.5 shrink-0 text-gray-500" aria-hidden="true" />{line}</li>)}
              </ul>
            </div>
          )}
        </div>

        {/* Tempo, grading, mic */}
        <div className="min-w-0 space-y-4">
          <div className="space-y-4 rounded-2xl border border-gray-700 bg-gray-800 p-5">
            {ladder ? (
              <>
                <div className="flex items-end justify-between gap-3">
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-[2px] text-gray-500">Tempo ladder</div>
                    <div className="text-5xl font-bold tabular-nums text-white">{bpm}<span className="ml-1 text-base font-semibold text-gray-500">BPM</span></div>
                  </div>
                  <div className="text-right text-xs text-gray-400">
                    <div>target <span className="font-bold text-gray-200">{target}</span></div>
                    <div>best clean <span className="font-bold text-gray-200">{item.bestCleanBpm || '–'}</span></div>
                    {exercise.feedback?.notesPerBeat > 1 && <div>{exercise.feedback.notesPerBeat} notes per click</div>}
                  </div>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-gray-900" role="img" aria-label={`Tempo ${bpm} of target ${target}`}>
                  <div className="h-full rounded-full bg-teal-600" style={{ width: `${Math.max(4, Math.min(100, ((bpm - exercise.tempo.startBpm) / (target - exercise.tempo.startBpm)) * 100))}%` }} />
                </div>
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-1.5" aria-label={`${item.cleanStreak} of ${need} clean passes at this tempo`}>
                    {Array.from({ length: need }, (_, i) => (
                      <span key={i} className={`h-3 w-3 rounded-full ${i < item.cleanStreak ? 'bg-emerald-400' : 'bg-gray-700'}`} />
                    ))}
                    <span className="ml-1 text-xs text-gray-400">{need} clean in a row to climb</span>
                  </div>
                  <div className="flex gap-1" aria-hidden="true">
                    {[0, 1, 2, 3].map((b) => <span key={b} className={`h-2.5 w-2.5 rounded-full ${metronome.beat === b ? (b === 0 ? 'bg-amber-400' : 'bg-teal-400') : 'bg-gray-700'}`} />)}
                  </div>
                </div>
                <button type="button" onClick={metronome.toggle} className={`flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 ${metronome.running ? 'bg-gray-700 text-gray-100 hover:bg-gray-600' : 'bg-teal-600 text-white hover:bg-teal-500'}`}>
                  {metronome.running ? <Pause size={16} aria-hidden="true" /> : <Play size={16} aria-hidden="true" />}
                  {metronome.running ? 'Stop click' : `Start click at ${bpm}`}
                </button>
              </>
            ) : (
              <div>
                <div className="text-[10px] font-bold uppercase tracking-[2px] text-gray-500">Clean repetitions</div>
                <div className="mt-1 flex items-center gap-1.5">
                  {Array.from({ length: need }, (_, i) => <span key={i} className={`h-3 w-3 rounded-full ${i < item.cleanStreak || item.masteredAt ? 'bg-emerald-400' : 'bg-gray-700'}`} />)}
                  <span className="ml-1 text-xs text-gray-400">{need} clean in a row to complete</span>
                </div>
              </div>
            )}

            <div>
              <div className="mb-2 text-[10px] font-bold uppercase tracking-[2px] text-gray-500">Grade the pass you just played</div>
              <div className="grid grid-cols-3 gap-2">
                {[
                  ['clean', 'Clean', Check, 'bg-emerald-600 hover:bg-emerald-500'],
                  ['shaky', 'Shaky', Minus, 'bg-amber-600 hover:bg-amber-500'],
                  ['miss', 'Missed', X, 'bg-rose-700 hover:bg-rose-600'],
                ].map(([id, label, Icon, style]) => (
                  <button key={id} type="button" onClick={() => grade(id)} className={`flex min-h-14 flex-col items-center justify-center gap-0.5 rounded-xl text-sm font-bold text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white ${style} ${suggested === id ? 'ring-2 ring-white' : ''}`}>
                    <Icon size={18} aria-hidden="true" />{label}
                  </button>
                ))}
              </div>
              <p className="mt-2 min-h-4 text-xs text-gray-500">
                {suggested ? `Mic suggests: ${suggested}. You decide.` : 'Shaky = got through it, but not to the standard on the left.'}
              </p>
              {noticeText && <p className={`mt-1 text-sm font-semibold ${noticeText.tone}`} role="status">{noticeText.text}</p>}
            </div>

            <div className="flex items-center justify-between border-t border-gray-700 pt-3 text-xs text-gray-400">
              <span>This sitting: <span className="font-bold text-gray-200">{bout.clean}</span> clean of {bout.total}</span>
              <button type="button" onClick={finish} className="flex items-center gap-1.5 rounded-xl bg-gray-700 px-4 py-2.5 text-sm font-bold text-white hover:bg-gray-600">
                {isLast ? 'Finish session' : 'Next exercise'} <ArrowRight size={15} aria-hidden="true" />
              </button>
            </div>
          </div>

          <ListenPanel exercise={exercise} bpm={bpm} metronome={metronome} onSuggest={handleSuggest} />
        </div>
      </div>
    </div>
  );
}
