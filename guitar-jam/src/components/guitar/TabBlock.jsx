import { memo, useMemo, useState, useCallback, useEffect } from 'react';
import { parseTab } from '../../utils/tabParser';
import { playTab, cancelScale } from '../../utils/audioEngine';
import { usePractice } from '../../practiceContext';
import GuitarFretboard from './GuitarFretboard';

const posOf = (step) => (step ? step.notes.map((n) => ({ stringIdx: n.stringIdx, fret: n.fret })) : []);

// A single tab block. Playable tabs get a Play button + the shared fretboard
// (same one the scale warm-up uses) above the raw ASCII, which players still
// read. Non-tab text (strum charts, vamps, arrow lists) renders as-is.
//
// Two view modes:
//   • step  — show ONE chord/note at a time, with a slider to move between them
//             (default for chord charts, so shapes aren't all piled on at once)
//   • shape — show every position at once (default for melodic runs / scales)
function TabBlock({ label, tab }) {
  const parsed = useMemo(() => parseTab(tab), [tab]);
  const practice = usePractice();
  const [bpm, setBpm] = useState(70);
  const [playing, setPlaying] = useState(false);
  const [activeStep, setActiveStep] = useState(null);
  const [status, setStatus] = useState(null);

  const hasChord = useMemo(() => parsed.steps.some((s) => s.notes.length > 1), [parsed]);
  const [mode, setMode] = useState(hasChord ? 'step' : 'shape');
  const [stepView, setStepView] = useState(0);

  // Reset when the tab itself changes (component is reused across days).
  useEffect(() => { setStepView(0); setMode(hasChord ? 'step' : 'shape'); }, [tab, hasChord]);
  useEffect(() => () => cancelScale(), []);

  // Every distinct position (for the shape view) + a stable display window.
  const { allPositions, minFret, maxFret } = useMemo(() => {
    const seen = new Map();
    for (const step of parsed.steps)
      for (const n of step.notes) seen.set(`${n.stringIdx}-${n.fret}`, { stringIdx: n.stringIdx, fret: n.fret });
    const pos = [...seen.values()];
    const positive = pos.map((p) => p.fret).filter((f) => f > 0);
    const hasOpen = pos.some((p) => p.fret === 0);
    const pmin = positive.length ? Math.min(...positive) : 0;
    const pmax = positive.length ? Math.max(...positive) : 4;
    const lo = hasOpen || pmin <= 2 ? 0 : pmin - 1;
    return { allPositions: pos, minFret: lo, maxFret: Math.max(pmax, lo + 4) };
  }, [parsed]);

  const nSteps = parsed.steps.length;
  const shownStep = playing && activeStep != null ? activeStep : Math.min(stepView, nSteps - 1);
  const stepPositions = useMemo(() => posOf(parsed.steps[shownStep]), [parsed, shownStep]);

  // What the fretboard draws, and which of those are "lit".
  const fretPositions = mode === 'step' ? stepPositions : allPositions;
  const fretActive = playing && parsed.steps[activeStep] ? posOf(parsed.steps[activeStep]) : mode === 'step' ? stepPositions : [];

  const toggle = useCallback(() => {
    if (playing) {
      cancelScale();
      setPlaying(false);
      setActiveStep(null);
      setStatus(null);
      return;
    }
    setPlaying(true);
    playTab(
      parsed.steps,
      { bpm, instrument: 'guitar', loops: practice.loops, countIn: practice.countIn, tempoStep: practice.tempoStep, tempoMax: 200, click: practice.click },
      (step, meta) => {
        if (meta?.done) { setPlaying(false); setActiveStep(null); setStatus(null); return; }
        if (meta?.countIn) { setActiveStep(null); setStatus(`Count-in ${meta.countIn}…`); return; }
        setActiveStep(step);
        const parts = [];
        if (meta.loops > 1) parts.push(`Loop ${meta.loop}/${meta.loops === 64 ? '∞' : meta.loops}`);
        if (practice.tempoStep > 0) parts.push(`${meta.bpm} BPM`);
        setStatus(parts.join(' · ') || null);
      }
    );
  }, [playing, parsed.steps, bpm, practice]);

  if (!parsed.playable) {
    return (
      <div className="mt-3">
        {label && <div className="text-amber-400 text-xs font-bold mb-1.5">{label}</div>}
        <pre className="bg-gray-950 border border-gray-700 rounded-lg p-3 text-gray-200 text-xs leading-relaxed overflow-x-auto font-mono">{tab}</pre>
      </div>
    );
  }

  const stepWord = hasChord ? 'Chord' : 'Step';

  return (
    <div className="mt-3 bg-gray-900/60 border border-gray-700 rounded-xl p-3">
      <div className="flex items-center justify-between gap-2 mb-1">
        {label && <div className="text-amber-400 text-xs font-bold leading-snug min-w-0">{label}</div>}
        <div className="flex items-center gap-2 flex-shrink-0">
          {status && <span className="text-teal-400 text-[10px] font-mono">{status}</span>}
          {nSteps > 1 && (
            <button
              onClick={() => setMode((m) => (m === 'step' ? 'shape' : 'step'))}
              className="px-2 py-1 rounded-lg text-[11px] font-semibold bg-gray-700 hover:bg-gray-600 text-gray-200"
              title={mode === 'step' ? 'Show the whole shape' : 'Step through one at a time'}
            >
              {mode === 'step' ? 'All' : 'Step'}
            </button>
          )}
          <button
            onClick={toggle}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors ${
              playing ? 'bg-gray-700 hover:bg-gray-600 text-gray-100' : 'bg-amber-500 hover:bg-amber-400 text-stone-900'
            }`}
          >
            {playing ? '⏹ Stop' : '▶ Play'}
          </button>
        </div>
      </div>

      <GuitarFretboard positions={fretPositions} activePositions={fretActive} minFret={minFret} maxFret={maxFret} />

      {/* Step slider — move between chords/notes one at a time */}
      {mode === 'step' && nSteps > 1 && (
        <div className="flex items-center gap-2 mt-2">
          <span className="text-gray-500 text-[11px] w-20 flex-shrink-0">{stepWord} {shownStep + 1}/{nSteps}</span>
          <input
            type="range"
            min={0}
            max={nSteps - 1}
            value={shownStep}
            onChange={(e) => setStepView(Number(e.target.value))}
            disabled={playing}
            className="w-full accent-teal-500"
          />
        </div>
      )}

      <div className="flex items-center gap-2 mt-2">
        <span className="text-gray-500 text-[11px] w-20 flex-shrink-0">{bpm} BPM</span>
        <input
          type="range"
          min={40}
          max={160}
          value={bpm}
          onChange={(e) => setBpm(Number(e.target.value))}
          disabled={playing}
          className="w-full accent-amber-500"
        />
      </div>

      <pre className="bg-gray-950 border border-gray-700 rounded-lg p-3 text-gray-200 text-xs leading-relaxed overflow-x-auto font-mono mt-2">{tab}</pre>
    </div>
  );
}

export default memo(TabBlock);
