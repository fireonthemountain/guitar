import { useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import { SONGS, SONGBOOK_NOTE } from '../data/songs';
import TabBlock from '../components/guitar/TabBlock';
import MySet from '../components/stage90/MySet';
import { PracticeContext } from '../practiceContext';

const DIFF_COLOR = {
  Beginner: 'text-emerald-400 bg-emerald-900/30',
  'Beginner–Intermediate': 'text-lime-400 bg-lime-900/30',
  Intermediate: 'text-amber-400 bg-amber-900/30',
  'Intermediate–Advanced': 'text-orange-400 bg-orange-900/30',
};

function SongCard({ song, onOpen }) {
  return (
    <button onClick={onOpen} className="text-left bg-gray-800 border border-gray-700 hover:border-teal-600 rounded-2xl p-4 transition-colors active:scale-[0.99]">
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-white font-bold text-lg leading-tight" style={{ fontFamily: 'ui-serif, Georgia, serif' }}>{song.title}</h3>
        <span className={`text-[10px] px-1.5 py-0.5 rounded flex-shrink-0 ${DIFF_COLOR[song.difficulty] || 'text-gray-400 bg-gray-700'}`}>{song.difficulty}</span>
      </div>
      <div className="text-teal-400 text-xs font-semibold mt-1">{song.key}</div>
      <div className="text-gray-500 text-xs mt-0.5">{song.feel}</div>
      <p className="text-gray-400 text-sm mt-2 leading-snug">{song.about}</p>
    </button>
  );
}

function SongDetail({ song, onBack }) {
  const [practice, setPractice] = useState({ loops: 1, countIn: false, tempoStep: 0, click: true });

  return (
    <PracticeContext.Provider value={practice}>
      <div className="space-y-5">
        {/* Header */}
        <div className="flex items-start gap-3">
          <button onClick={onBack} className="text-gray-400 hover:text-white transition-colors p-1 -ml-1 mt-1">
            <ChevronLeft size={22} />
          </button>
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white" style={{ fontFamily: 'ui-serif, Georgia, serif' }}>{song.title}</h2>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-teal-400 text-sm font-semibold">{song.key}</span>
              <span className="text-gray-600">·</span>
              <span className="text-gray-400 text-sm">{song.feel}</span>
            </div>
          </div>
        </div>

        <div className="grid gap-5 lg:grid-cols-3 items-start">
          {/* Main: the playable stuff */}
          <div className="lg:col-span-2 space-y-4 min-w-0">
            {/* Loop controls — looping a lick is how you learn a part */}
            <div className="bg-gray-800 rounded-2xl p-4 flex flex-wrap items-center gap-x-4 gap-y-2">
              <span className="text-white font-semibold text-sm">Practice</span>
              <div className="flex items-center gap-2">
                <span className="text-gray-400 text-xs">Loops</span>
                {[1, 3, 5, 64].map((n) => (
                  <button key={n} onClick={() => setPractice((p) => ({ ...p, loops: n }))} className={`px-2.5 py-1 rounded text-xs font-medium ${practice.loops === n ? 'bg-teal-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}>
                    {n === 64 ? '∞' : n}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-400 text-xs">Click</span>
                <button onClick={() => setPractice((p) => ({ ...p, click: !p.click }))} className={`px-2.5 py-1 rounded text-xs font-medium ${practice.click ? 'bg-teal-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}>
                  {practice.click ? 'On' : 'Off'}
                </button>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-400 text-xs">Count-in</span>
                <button onClick={() => setPractice((p) => ({ ...p, countIn: !p.countIn }))} className={`px-2.5 py-1 rounded text-xs font-medium ${practice.countIn ? 'bg-teal-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}>
                  {practice.countIn ? 'On' : 'Off'}
                </button>
              </div>
            </div>

            {/* Chords */}
            <div className="bg-gray-800 rounded-2xl p-4">
              <div className="text-gray-500 text-[10px] font-bold tracking-[2px] mb-1">CHORDS</div>
              <TabBlock label={song.chords.l} tab={song.chords.t} />
            </div>

            {/* Signature parts */}
            <div className="bg-gray-800 rounded-2xl p-4">
              <div className="text-rose-400 text-[10px] font-bold tracking-[2px] mb-1">SIGNATURE PARTS</div>
              <div className="grid xl:grid-cols-2 gap-x-4">
                {song.parts.map((p, i) => (
                  <TabBlock key={i} label={p.l} tab={p.t} />
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar: context */}
          <div className="space-y-4 min-w-0">
            <div className="bg-gray-800 rounded-2xl p-4">
              <div className="text-gray-500 text-[10px] font-bold tracking-[2px] mb-1.5">ABOUT</div>
              <p className="text-gray-300 text-sm leading-relaxed">{song.about}</p>
            </div>

            <div className="bg-gray-800 rounded-2xl p-4">
              <div className="text-gray-500 text-[10px] font-bold tracking-[2px] mb-2">FORM</div>
              <pre className="bg-gray-950 border border-gray-700 rounded-lg p-3 text-gray-200 text-xs leading-relaxed overflow-x-auto font-mono whitespace-pre-wrap">{song.form}</pre>
            </div>

            <div className="bg-gray-800 rounded-2xl p-4">
              <div className="text-gray-500 text-[10px] font-bold tracking-[2px] mb-2">HOW TO PLAY IT</div>
              <ul className="space-y-2">
                {song.tips.map((t, i) => (
                  <li key={i} className="text-gray-400 text-sm flex gap-2 leading-snug">
                    <span className="text-teal-500 flex-shrink-0">›</span>
                    {t}
                  </li>
                ))}
              </ul>
            </div>

            <p className="text-gray-600 text-[11px] leading-relaxed px-1">{SONGBOOK_NOTE}</p>
          </div>
        </div>
      </div>
    </PracticeContext.Provider>
  );
}

export default function SongbookPage() {
  const [openId, setOpenId] = useState(null);
  const song = SONGS.find((s) => s.id === openId);

  if (song) return <SongDetail song={song} onBack={() => setOpenId(null)} />;

  return (
    <div className="space-y-5">
      <div className="text-center">
        <div className="text-rose-400 text-[11px] font-bold tracking-[3px]">THE SET</div>
        <h2 className="text-3xl sm:text-4xl font-bold text-white mt-1" style={{ fontFamily: 'ui-serif, Georgia, serif' }}>Songbook</h2>
        <p className="text-gray-400 text-sm mt-2 max-w-2xl mx-auto">
          Dead &amp; Company staples — form, chords, and signature parts you can play, loop, and slow down. Start with Ripple.
        </p>
      </div>

      <MySet />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {SONGS.map((s) => (
          <SongCard key={s.id} song={s} onOpen={() => setOpenId(s.id)} />
        ))}
      </div>

      <p className="text-gray-600 text-[11px] leading-relaxed text-center max-w-2xl mx-auto pt-2">{SONGBOOK_NOTE}</p>
    </div>
  );
}
