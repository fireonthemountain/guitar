import { useState } from 'react';
import DeadProgramPage from './DeadProgramPage';
import Stage90ProgramPage from './Stage90ProgramPage';

const TRACK_KEY = 'guitar-jam-program-track';

const TRACKS = [
  { id: 'stage90', label: 'Stage Ready 90', sub: 'coffee-shop gig' },
  { id: 'dead90', label: 'Dead 90', sub: 'the Grateful Dead jam' },
];

// Default: keep long-time dead90 users on their track; new users land on Stage Ready.
function defaultTrack() {
  try {
    if (localStorage.getItem('dead90') && !localStorage.getItem('stage90')) return 'dead90';
  } catch {}
  return 'stage90';
}

export default function ProgramPage() {
  const [track, setTrack] = useState(() => localStorage.getItem(TRACK_KEY) || defaultTrack());
  const pick = (id) => { setTrack(id); localStorage.setItem(TRACK_KEY, id); };

  return (
    <div className="space-y-5">
      <div className="flex justify-center">
        <div className="flex gap-1 bg-gray-800/80 p-1 rounded-xl border border-gray-700">
          {TRACKS.map((t) => (
            <button
              key={t.id}
              onClick={() => pick(t.id)}
              className={`px-4 py-1.5 rounded-lg text-left transition-colors ${track === t.id ? 'bg-teal-600' : 'hover:bg-gray-700'}`}
            >
              <div className={`text-sm font-bold ${track === t.id ? 'text-white' : 'text-gray-400'}`}>{t.label}</div>
              <div className={`text-[10px] ${track === t.id ? 'text-teal-100' : 'text-gray-600'}`}>{t.sub}</div>
            </button>
          ))}
        </div>
      </div>
      {track === 'stage90' ? <Stage90ProgramPage /> : <DeadProgramPage />}
    </div>
  );
}
