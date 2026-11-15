import { useState } from 'react';
import { Dumbbell, GraduationCap } from 'lucide-react';
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

export default function ProgramPage({ onOpenCourses, onOpenTrain }) {
  const [track] = useState(() => localStorage.getItem(TRACK_KEY) || defaultTrack());
  const currentTrack = TRACKS.find((item) => item.id === track) || TRACKS[0];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3 border-b border-gray-800 pb-3">
        <div className="min-w-0">
          <div className="text-[10px] font-bold uppercase tracking-[2px] text-gray-500">Current course</div>
          <div className="truncate text-sm font-bold text-gray-200">{currentTrack.label} <span className="font-normal text-gray-500">· {currentTrack.sub}</span></div>
        </div>
        {onOpenTrain && (
          <button type="button" onClick={onOpenTrain} className="ml-auto flex shrink-0 items-center gap-1.5 rounded-lg border border-teal-800 bg-teal-950/40 px-3 py-2 text-xs font-semibold text-teal-200 hover:border-teal-600">
            <Dumbbell size={15} aria-hidden="true" /> Technique session
          </button>
        )}
        {onOpenCourses && (
          <button type="button" onClick={onOpenCourses} className="flex shrink-0 items-center gap-1.5 rounded-lg border border-gray-700 px-3 py-2 text-xs font-semibold text-gray-400 hover:border-teal-700 hover:text-teal-300">
            <GraduationCap size={15} aria-hidden="true" /> Change course
          </button>
        )}
      </div>
      {track === 'stage90' ? <Stage90ProgramPage /> : <DeadProgramPage />}
    </div>
  );
}
