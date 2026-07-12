import { useState, useCallback, useEffect } from 'react';
import { playStrum, cancelScale, CHORDS } from '../../utils/audioEngine';

// The five patterns from the curriculum, as 8 eighth-note slots (1 & 2 & 3 & 4 &).
const PATTERNS = [
  { name: 'Foundation', desc: 'steady', slots: ['D', '-', 'D', '-', 'D', '-', 'D', '-'] },
  { name: 'Backbeat', desc: 'bounce', slots: ['D', '-', 'D', 'U', 'D', '-', 'D', 'U'] },
  { name: 'Campfire', desc: 'the classic', slots: ['D', '-', 'D', 'U', '-', 'U', 'D', 'U'] },
  { name: 'Boom-chick', desc: 'Dead country', slots: ['B', '-', 'D', '-', 'B', '-', 'D', '-'] },
  { name: 'The Chop', desc: 'groove', slots: ['D', '-', 'x', '-', 'D', '-', 'x', '-'] },
];
const COUNT = ['1', '&', '2', '&', '3', '&', '4', '&'];
const SYM = { D: 'D', U: 'U', B: 'B', x: 'x', '-': '·' };

export default function StrumPatterns() {
  const [bpm, setBpm] = useState(80);
  const [playing, setPlaying] = useState(null); // index of the playing pattern
  const [slot, setSlot] = useState(null);

  useEffect(() => () => cancelScale(), []);

  const toggle = useCallback((idx) => {
    if (playing === idx) { cancelScale(); setPlaying(null); setSlot(null); return; }
    setPlaying(idx);
    setSlot(null);
    playStrum(PATTERNS[idx].slots, bpm, CHORDS.G, 2, (s) => {
      if (s === null) { setPlaying(null); setSlot(null); return; }
      setSlot(s);
    });
  }, [playing, bpm]);

  return (
    <div className="mt-3 bg-gray-900/60 border border-gray-700 rounded-xl p-3">
      <div className="flex items-center justify-between mb-2 gap-2">
        <div className="text-amber-400 text-xs font-bold">The five strum patterns — tap ▶ to hear each (in G)</div>
        <span className="text-gray-500 text-[11px] flex-shrink-0">{bpm} BPM</span>
      </div>

      {/* count header */}
      <div className="flex items-center gap-2 mb-1">
        <div className="w-24 flex-shrink-0" />
        <div className="flex gap-1 font-mono text-[11px] text-gray-500">
          {COUNT.map((c, i) => <div key={i} className="w-6 text-center">{c}</div>)}
        </div>
      </div>

      {PATTERNS.map((p, idx) => {
        const isPlaying = playing === idx;
        return (
          <div key={p.name} className="flex items-center gap-2 py-0.5">
            <button onClick={() => toggle(idx)} className={`w-24 flex-shrink-0 text-left flex items-center gap-1.5 ${isPlaying ? 'text-amber-400' : 'text-gray-200 hover:text-white'}`}>
              <span className="text-xs">{isPlaying ? '⏹' : '▶'}</span>
              <span className="text-[11px] font-semibold leading-tight">{p.name}<span className="block text-gray-500 font-normal">{p.desc}</span></span>
            </button>
            <div className="flex gap-1 font-mono">
              {p.slots.map((s, i) => {
                const active = isPlaying && slot === i;
                const filled = s !== '-';
                return (
                  <div key={i} className={`w-6 h-6 rounded grid place-items-center text-xs font-bold transition-colors ${active ? 'bg-amber-500 text-stone-900' : filled ? 'bg-gray-700 text-teal-300' : 'text-gray-700'}`}>
                    {SYM[s]}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}

      <div className="flex items-center gap-2 mt-2.5">
        <span className="text-gray-500 text-[11px] w-16 flex-shrink-0">Tempo</span>
        <input type="range" min={50} max={140} value={bpm} onChange={(e) => setBpm(Number(e.target.value))} disabled={playing !== null} className="w-full accent-amber-500" />
      </div>

      <div className="text-gray-500 text-[11px] mt-2 leading-snug">
        D = downstrum · U = upstrum · B = bass note only · x = muted chunk
      </div>
    </div>
  );
}
