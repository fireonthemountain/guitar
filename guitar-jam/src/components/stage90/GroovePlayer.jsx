import { useState, useEffect } from 'react';
import { CHORDS, playStrum, cancelScale } from '../../utils/audioEngine';
import { GROOVES } from '../../data/stage90Reference';

const CHORD_OPTS = ['G', 'C', 'D', 'Em', 'Am', 'E'];

// Nine strumming grooves, playable on any open chord through the real-sample
// strum engine. Pick a groove, pick a chord, play four bars, copy the feel.
export default function GroovePlayer() {
  const [grooveId, setGrooveId] = useState('folk');
  const [chord, setChord] = useState('G');
  const [bpm, setBpm] = useState(70);
  const [playing, setPlaying] = useState(false);
  const [slot, setSlot] = useState(null);

  const groove = GROOVES.find((g) => g.id === grooveId);

  useEffect(() => () => cancelScale(), []);

  const toggle = () => {
    if (playing) { cancelScale(); setPlaying(false); setSlot(null); return; }
    setPlaying(true);
    playStrum(groove.slots, bpm, CHORDS[chord], 4, (s) => {
      setSlot(s);
      if (s === null) setPlaying(false);
    });
  };

  return (
    <div className="bg-gray-900/60 border border-gray-700 rounded-xl p-3 space-y-2.5">
      <div className="flex items-center justify-between">
        <span className="text-amber-400 text-xs font-bold">Groove player — 9 strum feels</span>
        <span className="text-gray-500 text-[11px]">{groove.count}</span>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {GROOVES.map((g) => (
          <button
            key={g.id}
            onClick={() => { cancelScale(); setPlaying(false); setSlot(null); setGrooveId(g.id); }}
            className={`px-2.5 py-1 rounded text-[11px] font-semibold ${g.id === grooveId ? 'bg-amber-500 text-stone-900' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
          >
            {g.name}
          </button>
        ))}
      </div>

      {/* The pattern, slot by slot — the active slot lights during playback */}
      <div className="flex gap-1">
        {groove.slots.map((s, i) => (
          <div
            key={i}
            className={`flex-1 text-center py-1.5 rounded font-mono font-bold text-sm ${
              playing && slot === i ? 'bg-amber-500 text-stone-900' : s === '-' ? 'bg-gray-800 text-gray-600' : 'bg-gray-700 text-gray-100'
            }`}
          >
            {s === '-' ? '·' : s}
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <div className="flex gap-1">
          {CHORD_OPTS.map((c) => (
            <button key={c} onClick={() => setChord(c)} className={`px-2 py-1 rounded text-[11px] font-bold ${c === chord ? 'bg-teal-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}>
              {c}
            </button>
          ))}
        </div>
        <span className="text-gray-500 text-[11px] ml-auto flex-shrink-0 w-14 text-right">{bpm} BPM</span>
        <input type="range" min={50} max={140} value={bpm} onChange={(e) => setBpm(Number(e.target.value))} className="w-24 accent-amber-500" disabled={playing} />
        <button onClick={toggle} className={`px-3 py-1.5 rounded-lg text-xs font-bold ${playing ? 'bg-gray-700 text-gray-100' : 'bg-amber-500 hover:bg-amber-400 text-stone-900'}`}>
          {playing ? '⏹' : '▶ 4 bars'}
        </button>
      </div>
      <p className="text-gray-600 text-[11px]">B = bass string only · x = muted chunk · shuffle wants a swung feel — let the pairs limp.</p>
    </div>
  );
}
