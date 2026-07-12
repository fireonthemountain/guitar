import { useState, useEffect, useCallback } from 'react';
import { CHORDS, playVamp, stopVamp } from '../../utils/audioEngine';

// Backing vamps the curriculum keeps asking you to play over.
const VAMPS = [
  { id: 'e7', label: 'E7 drone', chords: ['E7'] },
  { id: 'fire', label: 'Fire (B–A)', chords: ['B', 'A'] },
  { id: 'franklins', label: "Franklin's (A-A-G-D)", chords: ['A', 'A', 'G', 'D'] },
  { id: 'folk', label: 'Folk (G–C–D)', chords: ['G', 'C', 'D'] },
  { id: 'blues', label: '12-bar E blues', chords: ['E7', 'E7', 'E7', 'E7', 'A7', 'A7', 'E7', 'E7', 'B7', 'A7', 'E7', 'E7'] },
];

export default function VampPlayer() {
  const [vampId, setVampId] = useState('e7');
  const [bpm, setBpm] = useState(80);
  const [playing, setPlaying] = useState(false);
  const [barIdx, setBarIdx] = useState(-1);

  const vamp = VAMPS.find((v) => v.id === vampId);

  // Stop audio if the component unmounts (e.g. navigating days).
  useEffect(() => () => stopVamp(), []);

  const toggle = useCallback(() => {
    if (playing) { stopVamp(); setPlaying(false); setBarIdx(-1); return; }
    const seq = vamp.chords.map((name) => ({ name, midis: CHORDS[name] }));
    setPlaying(true);
    playVamp(seq, bpm, (i) => setBarIdx(i));
  }, [playing, vamp, bpm]);

  // Changing vamp/tempo while playing restarts the loop with new settings.
  useEffect(() => {
    if (!playing) return;
    const seq = vamp.chords.map((name) => ({ name, midis: CHORDS[name] }));
    playVamp(seq, bpm, (i) => setBarIdx(i));
  }, [vampId, bpm]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="bg-gray-800 rounded-2xl p-4 space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-white font-semibold">Backing vamp</h3>
        <span className="text-gray-500 text-xs">play over the changes</span>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {VAMPS.map((v) => (
          <button
            key={v.id}
            onClick={() => setVampId(v.id)}
            className={`px-2.5 py-1 rounded text-xs font-medium ${v.id === vampId ? 'bg-amber-500 text-stone-900' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
          >
            {v.label}
          </button>
        ))}
      </div>

      {/* Chord chips — the current bar lights up */}
      <div className="flex flex-wrap gap-1.5">
        {vamp.chords.map((c, i) => (
          <span
            key={i}
            className={`text-sm px-2.5 py-1 rounded font-bold font-mono transition-colors ${
              playing && i === barIdx ? 'bg-amber-500 text-stone-900' : 'bg-gray-700/70 text-gray-300'
            }`}
          >
            {c}
          </span>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <span className="text-gray-500 text-[11px] w-20 flex-shrink-0">{bpm} BPM</span>
        <input type="range" min={50} max={160} value={bpm} onChange={(e) => setBpm(Number(e.target.value))} className="w-full accent-amber-500" />
      </div>

      <button
        onClick={toggle}
        className={`w-full py-2 rounded-lg font-semibold text-sm transition-colors ${
          playing ? 'bg-gray-700 hover:bg-gray-600 text-gray-200' : 'bg-amber-600 hover:bg-amber-500 text-white'
        }`}
      >
        {playing ? '⏹ Stop vamp' : '▶ Start vamp'}
      </button>
    </div>
  );
}
