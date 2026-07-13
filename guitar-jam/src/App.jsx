import { useState, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import DeadProgramPage from './pages/DeadProgramPage';
import SongbookPage from './pages/SongbookPage';
import MustangPage from './pages/MustangPage';
import { getMasterVolume, setMasterVolume, armAudioUnlock } from './utils/audioEngine';

const VIEWS = [
  { id: 'program', label: '90-Day Program' },
  { id: 'songbook', label: 'Songbook' },
  { id: 'amp', label: 'Amp' },
];

function VolumeControl() {
  const [vol, setVol] = useState(() => Math.round(getMasterVolume() * 100));
  const change = (v) => { setVol(v); setMasterVolume(v / 100); };
  return (
    <div className="flex items-center gap-2">
      <button onClick={() => change(vol === 0 ? 80 : 0)} className="text-gray-400 hover:text-gray-200" aria-label={vol === 0 ? 'Unmute' : 'Mute'}>
        {vol === 0 ? <VolumeX size={18} /> : <Volume2 size={18} />}
      </button>
      <input type="range" min={0} max={100} value={vol} onChange={(e) => change(Number(e.target.value))} className="w-20 sm:w-24 accent-teal-500" aria-label="Volume" />
    </div>
  );
}

export default function App() {
  const [view, setView] = useState(() => {
    const q = new URLSearchParams(window.location.search).get('view');
    if (VIEWS.some((v) => v.id === q)) return q;
    return localStorage.getItem('guitar-jam-view') || 'program';
  });
  const pick = (id) => { setView(id); localStorage.setItem('guitar-jam-view', id); };

  useEffect(() => { armAudioUnlock(); }, []);

  return (
    <div className="min-h-screen bg-gray-900">
      <header className="sticky top-0 bg-gray-800/95 backdrop-blur border-b border-gray-700 z-30">
        <div className="max-w-[1600px] mx-auto px-5 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 min-w-0">
            <h1 className="text-lg font-bold text-teal-400 flex-shrink-0">🎸 Guitar Practice</h1>
            <nav className="flex gap-1 bg-gray-900/60 p-1 rounded-lg">
              {VIEWS.map((v) => (
                <button
                  key={v.id}
                  onClick={() => pick(v.id)}
                  className={`px-3 py-1 rounded-md text-sm font-semibold transition-colors ${
                    view === v.id ? 'bg-teal-600 text-white' : 'text-gray-400 hover:text-gray-200'
                  }`}
                >
                  {v.label}
                </button>
              ))}
            </nav>
          </div>
          <VolumeControl />
        </div>
      </header>

      <main className="max-w-[1600px] mx-auto px-5 py-6">
        {view === 'program' && <DeadProgramPage />}
        {view === 'songbook' && <SongbookPage />}
        {view === 'amp' && <MustangPage />}
      </main>
    </div>
  );
}
