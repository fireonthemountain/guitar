import { memo, useState, useMemo, useCallback, useEffect } from 'react';
import { NOTE_NAMES, SCALE_TYPES, getScaleNotes, getPositionWindows, getPositionRun } from '../../utils/guitarScales';
import { playScale, playTab, cancelScale } from '../../utils/audioEngine';
import { usePractice } from '../../practiceContext';
import GuitarFretboard from './GuitarFretboard';

const stepsFromRun = (run) => run.map((n) => ({ notes: [{ stringIdx: n.stringIdx, fret: n.fret, midi: n.midi }] }));
const BOXES = [1, 2, 3, 4, 5];

// Interactive scale practice with two modes:
//  • guided — work box 1 → 5 one at a time, mark each "got it", then walk the
//    neck to connect them (a lesson). Skippable: tap any box to jump.
//  • free   — pick any box / Full and play; walk the neck any time.
function ScaleBoard({ initialRoot, initialType, guidedDefault = false }) {
  const practice = usePractice();
  const [rootIdx, setRootIdx] = useState(initialRoot);
  const [type, setType] = useState(initialType);
  const [bpm, setBpm] = useState(70);
  const [posIdx, setPosIdx] = useState(guidedDefault ? 1 : 0);
  const [playing, setPlaying] = useState(false);
  const [walking, setWalking] = useState(false);
  const [playingNote, setPlayingNote] = useState(null);
  const [activePos, setActivePos] = useState([]);
  const [mode, setMode] = useState(guidedDefault ? 'guided' : 'free');
  const [done, setDone] = useState(() => new Set());
  const [guidedBox, setGuidedBox] = useState(1);

  // Reset the lesson when the week/day's scale changes.
  useEffect(() => {
    setRootIdx(initialRoot); setType(initialType);
    setDone(new Set()); setGuidedBox(1);
    setPosIdx(guidedDefault ? 1 : 0);
  }, [initialRoot, initialType, guidedDefault]);
  useEffect(() => () => cancelScale(), []);

  // In guided mode the fretboard follows the current box.
  useEffect(() => { if (mode === 'guided') setPosIdx(guidedBox); }, [mode, guidedBox]);

  const scaleNotes = useMemo(() => getScaleNotes(rootIdx, type), [rootIdx, type]);
  const windows = useMemo(() => getPositionWindows(rootIdx), [rootIdx]);
  const win = windows[posIdx] || windows[0];
  const allDone = done.size === 5;

  const stop = useCallback(() => {
    cancelScale(); setPlaying(false); setWalking(false); setPlayingNote(null); setActivePos([]);
  }, []);

  const play = useCallback(() => {
    if (playing || walking) return stop();
    setPlaying(true);
    if (posIdx === 0) {
      setActivePos([]);
      playScale(scaleNotes, rootIdx, bpm, 'guitar', (note) => { setPlayingNote(note); if (note === null) setPlaying(false); }, practice.click);
    } else {
      const run = getPositionRun(scaleNotes, win.minFret, win.maxFret);
      setPlayingNote(null);
      playTab(stepsFromRun(run), { bpm, click: practice.click }, (i, m) => {
        if (m?.done) { setPlaying(false); setActivePos([]); return; }
        if (m?.countIn) return;
        setActivePos(run[i] ? [{ stringIdx: run[i].stringIdx, fret: run[i].fret }] : []);
      });
    }
  }, [playing, walking, posIdx, scaleNotes, rootIdx, bpm, win, practice.click, stop]);

  const walk = useCallback(() => {
    if (playing || walking) return stop();
    const steps = []; const meta = [];
    for (const b of BOXES) {
      const w = windows[b]; if (!w) continue;
      getPositionRun(scaleNotes, w.minFret, w.maxFret).forEach((n) => {
        steps.push({ notes: [{ stringIdx: n.stringIdx, fret: n.fret, midi: n.midi }] });
        meta.push({ box: b, stringIdx: n.stringIdx, fret: n.fret });
      });
    }
    if (!steps.length) return;
    setWalking(true); setPlayingNote(null); setPosIdx(1);
    playTab(steps, { bpm, click: practice.click }, (i, m) => {
      if (m?.done) { setWalking(false); setActivePos([]); return; }
      if (m?.countIn) return;
      const info = meta[i];
      if (info) { setPosIdx(info.box); setActivePos([{ stringIdx: info.stringIdx, fret: info.fret }]); }
    });
  }, [playing, walking, scaleNotes, bpm, windows, practice.click, stop]);

  const markDone = useCallback(() => {
    const newDone = new Set(done); newDone.add(guidedBox);
    setDone(newDone);
    if (newDone.size < 5) {
      const remaining = BOXES.filter((b) => !newDone.has(b));
      setGuidedBox(remaining.find((b) => b > guidedBox) ?? remaining[0]);
    }
  }, [done, guidedBox]);

  const busy = playing || walking;

  return (
    <div className="space-y-3">
      {/* Key selector */}
      <div className="flex flex-wrap gap-1">
        {NOTE_NAMES.map((n, i) => (
          <button key={i} onClick={() => setRootIdx(i)} className={`px-2 py-0.5 rounded text-xs font-semibold ${i === rootIdx ? 'bg-amber-500 text-stone-900' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}>{n}</button>
        ))}
      </div>

      {/* Scale type selector */}
      <div className="flex flex-wrap gap-1">
        {Object.keys(SCALE_TYPES).map((t) => (
          <button key={t} onClick={() => setType(t)} className={`px-2 py-0.5 rounded text-xs font-medium ${t === type ? 'bg-teal-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}>{t}</button>
        ))}
      </div>

      {/* Note chips */}
      <div className="flex flex-wrap gap-1.5">
        {scaleNotes.map((note, i) => (
          <span key={i} className={`text-xs px-2 py-0.5 rounded font-semibold ${note === rootIdx ? 'bg-amber-500 text-stone-900' : 'bg-teal-800/60 text-teal-200'}`}>{NOTE_NAMES[note]}</span>
        ))}
      </div>

      {/* Mode toggle */}
      <div className="flex items-center gap-2">
        <span className="text-gray-500 text-[11px]">Mode</span>
        <div className="flex rounded-lg overflow-hidden border border-gray-700 text-xs">
          {['guided', 'free'].map((m) => (
            <button key={m} onClick={() => setMode(m)} className={`px-3 py-1 font-medium capitalize ${mode === m ? 'bg-teal-600 text-white' : 'bg-gray-800 text-gray-400 hover:text-gray-200'}`}>{m}</button>
          ))}
        </div>
      </div>

      {mode === 'guided' ? (
        <div className="space-y-2">
          <div className="flex items-center gap-1.5">
            {BOXES.map((b) => {
              const isDone = done.has(b);
              const isCur = b === guidedBox && !allDone;
              return (
                <button key={b} onClick={() => setGuidedBox(b)} className={`flex-1 h-8 rounded-lg text-xs font-bold grid place-items-center border transition-colors ${isCur ? 'bg-teal-600 text-white border-teal-500' : isDone ? 'bg-amber-500/20 text-amber-400 border-amber-500/50' : 'bg-gray-800 text-gray-500 border-gray-700 hover:border-gray-600'}`}>
                  {isDone ? '✓' : `Box ${b}`}
                </button>
              );
            })}
          </div>
          <p className={`text-[11px] ${allDone ? 'text-amber-400 font-semibold' : 'text-gray-400'}`}>
            {allDone
              ? 'All 5 boxes done — now connect them: walk the neck ↑'
              : `Box ${guidedBox} of 5 · frets ${win.minFret}–${win.maxFret} — play it clean, then advance`}
          </p>
        </div>
      ) : (
        <div className="flex gap-1.5 flex-wrap">
          {windows.map((pos, i) => (
            <button key={i} onClick={() => setPosIdx(i)} className={`px-2.5 py-1 rounded text-xs font-medium ${posIdx === i ? 'bg-teal-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}>{pos.label}</button>
          ))}
        </div>
      )}

      <GuitarFretboard scaleNotes={scaleNotes} rootIdx={rootIdx} minFret={win.minFret} maxFret={win.maxFret} playingNote={playingNote} activePositions={activePos} />

      <div className="flex items-center gap-2">
        <span className="text-gray-500 text-[11px] w-20 flex-shrink-0">{bpm} BPM</span>
        <input type="range" min={40} max={160} value={bpm} onChange={(e) => setBpm(Number(e.target.value))} disabled={busy} className="w-full accent-teal-500" />
      </div>

      {/* Controls */}
      {mode === 'guided' ? (
        <div className="flex gap-2">
          <button onClick={play} className={`flex-1 py-2 rounded-xl font-semibold text-sm transition-colors ${playing ? 'bg-gray-700 hover:bg-gray-600 text-gray-200' : 'bg-teal-600 hover:bg-teal-500 text-white'}`}>
            {playing ? '⏹ Stop' : `▶ Play box ${guidedBox}`}
          </button>
          {allDone ? (
            <button onClick={walk} className={`flex-1 py-2 rounded-xl font-semibold text-sm transition-colors ${walking ? 'bg-gray-700 hover:bg-gray-600 text-gray-200' : 'bg-amber-600 hover:bg-amber-500 text-white'}`}>
              {walking ? '⏹ Stop' : '▶ Walk the neck ↑'}
            </button>
          ) : (
            <button onClick={markDone} disabled={busy} className="flex-1 py-2 rounded-xl font-semibold text-sm bg-gray-700 hover:bg-gray-600 text-gray-100 disabled:opacity-50">
              Got it → next ✓
            </button>
          )}
        </div>
      ) : (
        <div className="flex gap-2">
          <button onClick={play} className={`flex-1 py-2 rounded-xl font-semibold text-sm transition-colors ${playing ? 'bg-gray-700 hover:bg-gray-600 text-gray-200' : 'bg-teal-600 hover:bg-teal-500 text-white'}`}>
            {playing ? '⏹ Stop' : posIdx === 0 ? '▶ Play scale' : `▶ Play box ${posIdx}`}
          </button>
          <button onClick={walk} className={`flex-1 py-2 rounded-xl font-semibold text-sm transition-colors ${walking ? 'bg-gray-700 hover:bg-gray-600 text-gray-200' : 'bg-amber-600 hover:bg-amber-500 text-white'}`}>
            {walking ? '⏹ Stop' : '▶ Walk the neck ↑'}
          </button>
        </div>
      )}
    </div>
  );
}

export default memo(ScaleBoard);
