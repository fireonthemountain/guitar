import { useState, useEffect, useRef } from 'react';
import { getAudioCtx, scheduleMetronomeClick } from '../../utils/audioEngine';

const TEMPO_NAMES = [
  { name: 'Largo', max: 60 },
  { name: 'Andante', max: 80 },
  { name: 'Moderato', max: 108 },
  { name: 'Allegro', max: 156 },
  { name: 'Presto', max: 220 },
];

function tempoName(bpm) {
  return (TEMPO_NAMES.find(t => bpm < t.max) ?? TEMPO_NAMES.at(-1)).name;
}

const LOOKAHEAD = 0.12; // seconds to schedule ahead
const TICK_MS = 25;     // scheduler polling interval

export default function Metronome({ defaultBpm = 80 }) {
  const [bpm, setBpm] = useState(defaultBpm);
  const [running, setRunning] = useState(false);
  const [activeBeat, setActiveBeat] = useState(-1);

  const bpmRef = useRef(bpm);
  const nextBeatTimeRef = useRef(0);
  const beatCountRef = useRef(0);

  // Keep bpmRef in sync for the scheduler closure
  useEffect(() => { bpmRef.current = bpm; }, [bpm]);

  useEffect(() => {
    if (!running) {
      setActiveBeat(-1);
      return;
    }

    const ctx = getAudioCtx();
    nextBeatTimeRef.current = ctx.currentTime + 0.05;
    beatCountRef.current = 0;

    const id = setInterval(() => {
      const now = ctx.currentTime;
      while (nextBeatTimeRef.current < now + LOOKAHEAD) {
        const beatTime = nextBeatTimeRef.current;
        const beat = beatCountRef.current % 4;
        const isAccent = beat === 0;

        scheduleMetronomeClick(beatTime, isAccent, ctx);

        // Visual update fires when audio fires (approximate)
        const delayMs = Math.max(0, (beatTime - now) * 1000);
        const capturedBeat = beat;
        setTimeout(() => setActiveBeat(capturedBeat), delayMs);

        beatCountRef.current++;
        nextBeatTimeRef.current += 60 / bpmRef.current;
      }
    }, TICK_MS);

    return () => clearInterval(id);
  }, [running]);

  return (
    <div className="bg-gray-800 rounded-2xl p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-white font-semibold">Metronome</h3>
        <span className="text-gray-400 text-sm">{tempoName(bpm)}</span>
      </div>

      {/* Beat indicator dots */}
      <div className="flex justify-center gap-3">
        {[0, 1, 2, 3].map(beat => (
          <div
            key={beat}
            className="rounded-full transition-all duration-75"
            style={{
              width: beat === 0 ? 18 : 14,
              height: beat === 0 ? 18 : 14,
              background:
                activeBeat === beat
                  ? beat === 0
                    ? '#f59e0b'
                    : '#0d9488'
                  : '#374151',
              boxShadow:
                activeBeat === beat
                  ? `0 0 10px ${beat === 0 ? '#f59e0b' : '#0d9488'}`
                  : 'none',
            }}
          />
        ))}
      </div>

      {/* BPM control */}
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <span className="text-gray-400 text-sm">Tempo</span>
          <span className="text-white font-mono font-bold">{bpm} BPM</span>
        </div>
        <input
          type="range"
          min={40}
          max={200}
          value={bpm}
          onChange={e => setBpm(Number(e.target.value))}
          className="w-full accent-teal-500"
        />
        <div className="flex justify-between text-xs text-gray-600">
          <span>40</span>
          <span>120</span>
          <span>200</span>
        </div>
      </div>

      {/* Quick BPM presets */}
      <div className="flex gap-2 flex-wrap">
        {[60, 80, 100, 120].map(preset => (
          <button
            key={preset}
            onClick={() => setBpm(preset)}
            className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
              bpm === preset ? 'bg-teal-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            {preset}
          </button>
        ))}
      </div>

      {/* Start / stop */}
      <button
        onClick={() => setRunning(r => !r)}
        className={`w-full py-2 rounded-lg font-semibold text-sm transition-colors ${
          running
            ? 'bg-gray-700 hover:bg-gray-600 text-gray-200'
            : 'bg-teal-600 hover:bg-teal-500 text-white'
        }`}
      >
        {running ? '⏹ Stop' : '▶ Start Metronome'}
      </button>
    </div>
  );
}
