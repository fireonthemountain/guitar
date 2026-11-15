import { useState, useEffect } from 'react';
import {
  BarChart3,
  BookOpen,
  Dumbbell,
  Eye,
  GraduationCap,
  Home,
  Library as LibraryIcon,
  Menu,
  Music2,
  Radio,
  SlidersHorizontal,
  Volume2,
  VolumeX,
  X,
} from 'lucide-react';
import ProgramPage from './pages/ProgramPage';
import SongbookPage from './pages/SongbookPage';
import MustangPage from './pages/MustangPage';
import AssessmentPage from './pages/AssessmentPage';
import JamAlongPage from './pages/JamAlongPage';
import LibraryPage from './pages/LibraryPage';
import DesignPreviewPage from './pages/DesignPreviewPage';
import CoursesPage from './pages/CoursesPage';
import TrainPage from './pages/TrainPage';
import { getMasterVolume, setMasterVolume, armAudioUnlock } from './utils/audioEngine';
import { STAGE90_STORAGE_EVENT } from './utils/stage90';
import { getLastSyncStatus, isSyncConfigured, STAGE90_SYNC_EVENT } from './utils/syncClient';

const PRIMARY_VIEWS = [
  { id: 'program', label: 'Today', icon: Home },
  { id: 'train', label: 'Train', icon: Dumbbell },
  { id: 'songbook', label: 'Songs', icon: Music2 },
  { id: 'courses', label: 'Courses', icon: GraduationCap },
  { id: 'import', label: 'Library', icon: LibraryIcon },
  { id: 'assessment', label: 'Progress', icon: BarChart3 },
];

const TOOL_VIEWS = [
  { id: 'jam', label: 'Jam Along', icon: Radio },
  { id: 'amp', label: 'Amp', icon: SlidersHorizontal },
  { id: 'preview', label: 'Design Preview', icon: Eye },
];

const VIEWS = [...PRIMARY_VIEWS, ...TOOL_VIEWS];

function VolumeControl() {
  const [vol, setVol] = useState(() => Math.round(getMasterVolume() * 100));
  const change = (v) => { setVol(v); setMasterVolume(v / 100); };
  return (
    <div className="flex items-center gap-2">
      <button onClick={() => change(vol === 0 ? 80 : 0)} className="text-gray-400 hover:text-gray-200" aria-label={vol === 0 ? 'Unmute' : 'Mute'}>
        {vol === 0 ? <VolumeX size={18} /> : <Volume2 size={18} />}
      </button>
      <input type="range" min={0} max={100} value={vol} onChange={(e) => change(Number(e.target.value))} className="hidden sm:block w-20 md:w-24 accent-teal-500" aria-label="Volume" />
    </div>
  );
}

function PersistenceStatus() {
  const initial = () => {
    const sync = getLastSyncStatus();
    if (sync) return sync;
    return isSyncConfigured()
      ? { status: 'ready', message: 'Cloud sync is enabled.' }
      : { status: 'local', message: 'Progress is stored only in this browser. Enable Cloud Sync in Assessment for cross-device recovery.' };
  };
  const [state, setState] = useState(initial);

  useEffect(() => {
    const onStorage = (event) => {
      if (event.detail?.status === 'error') setState(event.detail);
      else if (!isSyncConfigured()) setState({ status: 'local', message: 'Saved in this browser only.' });
    };
    const onSync = (event) => setState(event.detail);
    window.addEventListener(STAGE90_STORAGE_EVENT, onStorage);
    window.addEventListener(STAGE90_SYNC_EVENT, onSync);
    return () => {
      window.removeEventListener(STAGE90_STORAGE_EVENT, onStorage);
      window.removeEventListener(STAGE90_SYNC_EVENT, onSync);
    };
  }, []);

  const display = {
    local: ['Local only', 'bg-amber-400'],
    ready: ['Cloud ready', 'bg-teal-400'],
    syncing: ['Syncing…', 'bg-teal-400 animate-pulse'],
    pulling: ['Checking cloud…', 'bg-teal-400 animate-pulse'],
    synced: ['Synced', 'bg-emerald-400'],
    restored: ['Cloud restored', 'bg-emerald-400'],
    empty: ['Cloud empty', 'bg-amber-400'],
    timeout: ['Local · cloud timeout', 'bg-amber-400'],
    error: ['Save/sync issue', 'bg-rose-400'],
  }[state.status] || ['Local only', 'bg-amber-400'];

  return (
    <div className="flex items-center gap-1.5 text-[10px] text-gray-400 whitespace-nowrap" title={state.message || display[0]} aria-label={state.message || display[0]}>
      <span className={`h-2 w-2 rounded-full ${display[1]}`} />
      <span className="hidden sm:inline">{display[0]}</span>
    </div>
  );
}

function DesktopNavItem({ item, active, onSelect }) {
  const Icon = item.icon;
  return (
    <button
      type="button"
      onClick={() => onSelect(item.id)}
      className={`group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 ${
        active ? 'bg-teal-600 text-white shadow-lg shadow-teal-950/30' : 'text-gray-400 hover:bg-gray-800 hover:text-gray-100'
      }`}
      aria-current={active ? 'page' : undefined}
    >
      <Icon size={19} aria-hidden="true" />
      <span>{item.label}</span>
    </button>
  );
}

function MobileNavItem({ item, active, onSelect }) {
  const Icon = item.icon;
  return (
    <button
      type="button"
      onClick={() => onSelect(item.id)}
      className={`flex min-w-0 flex-1 flex-col items-center justify-center gap-1 rounded-lg px-1 py-1.5 text-[10px] font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 ${
        active ? 'text-teal-300' : 'text-gray-500 hover:text-gray-200'
      }`}
      aria-current={active ? 'page' : undefined}
    >
      <Icon size={20} strokeWidth={active ? 2.5 : 2} aria-hidden="true" />
      <span className="truncate">{item.label}</span>
    </button>
  );
}

export default function App() {
  const [view, setView] = useState(() => {
    const q = new URLSearchParams(window.location.search).get('view');
    if (VIEWS.some((v) => v.id === q)) return q;
    const saved = localStorage.getItem('guitar-jam-view');
    return VIEWS.some((v) => v.id === saved) ? saved : 'program';
  });
  const [mobileToolsOpen, setMobileToolsOpen] = useState(false);
  const pick = (id) => {
    if (!VIEWS.some((item) => item.id === id)) return;
    setView(id);
    setMobileToolsOpen(false);
    localStorage.setItem('guitar-jam-view', id);
  };

  useEffect(() => { armAudioUnlock(); }, []);

  useEffect(() => {
    if (!mobileToolsOpen) return undefined;
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setMobileToolsOpen(false);
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [mobileToolsOpen]);

  const activeLabel = VIEWS.find((item) => item.id === view)?.label || 'Today';

  return (
    <div className="min-h-screen bg-gray-900 [overflow-x:clip]">
      <a href="#main-content" className="fixed left-3 top-3 z-50 -translate-y-20 rounded-lg bg-teal-600 px-4 py-2 text-sm font-bold text-white transition-transform focus:translate-y-0">
        Skip to content
      </a>

      <header className="sticky top-0 z-40 border-b border-gray-700 bg-gray-800/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-[1800px] items-center justify-between gap-3 px-4 sm:px-5">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-teal-500/15 text-lg ring-1 ring-teal-400/20" aria-hidden="true">🎸</div>
            <div className="min-w-0">
              <h1 className="truncate text-sm font-bold text-white sm:text-base">Guitar Practice</h1>
              <p className="truncate text-[10px] font-semibold uppercase tracking-[1.5px] text-teal-400 md:hidden">{activeLabel}</p>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-3">
            <PersistenceStatus />
            <VolumeControl />
            <button
              type="button"
              onClick={() => setMobileToolsOpen((open) => !open)}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-700 text-gray-300 transition-colors hover:bg-gray-700 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 md:hidden"
              aria-label={mobileToolsOpen ? 'Close tools menu' : 'Open tools menu'}
              aria-expanded={mobileToolsOpen}
              aria-controls="mobile-tools-menu"
            >
              {mobileToolsOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
            </button>
          </div>
        </div>

        {mobileToolsOpen && (
          <nav id="mobile-tools-menu" aria-label="Practice tools" className="absolute right-3 top-[calc(100%_-_1px)] w-64 rounded-2xl border border-gray-700 bg-gray-800 p-2 shadow-2xl shadow-black/40 md:hidden">
            <div className="px-3 pb-1.5 pt-1 text-[10px] font-bold uppercase tracking-[2px] text-gray-500">Practice tools</div>
            {TOOL_VIEWS.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  type="button"
                  key={item.id}
                  onClick={() => pick(item.id)}
                  className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 ${view === item.id ? 'bg-teal-600 text-white' : 'text-gray-300 hover:bg-gray-700'}`}
                  aria-current={view === item.id ? 'page' : undefined}
                >
                  <Icon size={18} aria-hidden="true" /> {item.label}
                </button>
              );
            })}
          </nav>
        )}
      </header>

      <div className="mx-auto flex max-w-[1800px] items-start">
        <aside className="sticky top-16 hidden h-[calc(100vh-4rem)] w-56 shrink-0 flex-col border-r border-gray-800 bg-gray-900/80 px-3 py-5 md:flex lg:w-60 lg:px-4">
          <nav aria-label="Primary" className="space-y-1">
            {PRIMARY_VIEWS.map((item) => <DesktopNavItem key={item.id} item={item} active={view === item.id} onSelect={pick} />)}
          </nav>

          <div className="my-5 border-t border-gray-800" />
          <div className="mb-2 px-3 text-[10px] font-bold uppercase tracking-[2px] text-gray-600">Tools</div>
          <nav aria-label="Practice tools" className="space-y-1">
            {TOOL_VIEWS.map((item) => <DesktopNavItem key={item.id} item={item} active={view === item.id} onSelect={pick} />)}
          </nav>

          <div className="mt-auto rounded-2xl border border-gray-800 bg-gray-800/45 p-3">
            <div className="flex items-center gap-2 text-xs font-bold text-gray-300"><BookOpen size={15} className="text-teal-400" aria-hidden="true" /> Practice tip</div>
            <p className="mt-1.5 text-[11px] leading-relaxed text-gray-500">Short, focused sessions beat occasional marathons.</p>
          </div>
        </aside>

        <main id="main-content" tabIndex={-1} className="min-w-0 flex-1 px-4 pb-24 pt-5 sm:px-5 sm:pt-6 md:pb-8 lg:px-8">
          {view === 'program' && <ProgramPage onOpenCourses={() => pick('courses')} onOpenTrain={() => pick('train')} />}
          {view === 'train' && <TrainPage />}
          {view === 'assessment' && <AssessmentPage />}
          {view === 'jam' && <JamAlongPage />}
          {view === 'songbook' && <SongbookPage />}
          {view === 'courses' && <CoursesPage onOpenCourse={() => pick('program')} />}
          {view === 'import' && <LibraryPage />}
          {view === 'amp' && <MustangPage />}
          {view === 'preview' && <DesignPreviewPage />}
        </main>
      </div>

      <nav aria-label="Primary" className="safe-bottom fixed inset-x-0 bottom-0 z-40 border-t border-gray-700 bg-gray-900/95 px-1 pb-1 pt-1 backdrop-blur md:hidden">
        <div className="mx-auto flex max-w-xl items-stretch">
          {PRIMARY_VIEWS.map((item) => <MobileNavItem key={item.id} item={item} active={view === item.id} onSelect={pick} />)}
        </div>
      </nav>
    </div>
  );
}
