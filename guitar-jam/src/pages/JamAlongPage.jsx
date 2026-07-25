import { useState, useEffect } from 'react';
import { ChevronLeft, Plus, X } from 'lucide-react';
import YouTubeJam from '../components/stage90/YouTubeJam';
import ScaleBoard from '../components/guitar/ScaleBoard';
import VampPlayer from '../components/guitar/VampPlayer';
import Metronome from '../components/guitar/Metronome';
import { NOTE_NAMES, SCALE_TYPES } from '../utils/guitarScales';
import { loadStage90, saveStage90, dateKey } from '../utils/stage90';

// Pull a video ID out of a full URL, a share link, or a bare ID.
export function parseVideoId(input) {
  const s = input.trim();
  const m =
    s.match(/(?:youtube\.com\/(?:watch\?.*v=|shorts\/|embed\/)|youtu\.be\/)([\w-]{11})/) ||
    s.match(/^([\w-]{11})$/);
  return m ? m[1] : null;
}

const SCALE_NAMES = Object.keys(SCALE_TYPES);

function AddJamForm({ onAdd, onCancel }) {
  const [d, setD] = useState({ url: '', title: '', keyIdx: 7, scaleType: 'Pentatonic Minor', chords: '' });
  const videoId = parseVideoId(d.url);
  const upd = (k) => (e) => setD((x) => ({ ...x, [k]: e.target.value }));

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-2xl p-4 space-y-3">
      <div className="text-teal-400 text-[10px] font-bold tracking-[2px]">ADD A JAM VIDEO</div>
      <div className="grid sm:grid-cols-2 gap-2">
        <input value={d.url} onChange={upd('url')} placeholder="YouTube link (lesson, backing track…)" className="bg-gray-950 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm sm:col-span-2" autoFocus />
        <input value={d.title} onChange={upd('title')} placeholder="Title (e.g. Seriff — A minor jam)" className="bg-gray-950 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm sm:col-span-2" />
        <select value={d.keyIdx} onChange={(e) => setD((x) => ({ ...x, keyIdx: Number(e.target.value) }))} className="bg-gray-950 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm">
          {NOTE_NAMES.map((n, i) => <option key={n} value={i}>Key of {n}</option>)}
        </select>
        <select value={d.scaleType} onChange={upd('scaleType')} className="bg-gray-950 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm">
          {SCALE_NAMES.map((n) => <option key={n} value={n}>{n}</option>)}
        </select>
        <input value={d.chords} onChange={upd('chords')} placeholder="Chords (Am G F E…)" className="bg-gray-950 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm sm:col-span-2" />
      </div>
      {d.url && !videoId && <p className="text-amber-400 text-[11px]">That doesn't look like a YouTube link or video ID yet.</p>}
      <div className="flex gap-2">
        <button
          onClick={() => videoId && onAdd({ id: Date.now(), videoId, title: d.title.trim() || 'Untitled jam', keyIdx: d.keyIdx, scaleType: d.scaleType, chords: d.chords.trim(), sessions: 0, last: null })}
          disabled={!videoId}
          className="px-4 py-1.5 rounded-lg text-sm font-bold bg-teal-600 hover:bg-teal-500 text-white disabled:bg-gray-700 disabled:text-gray-500"
        >
          Add to library
        </button>
        <button onClick={onCancel} className="px-4 py-1.5 rounded-lg text-sm text-gray-400 border border-gray-700">Cancel</button>
      </div>
    </div>
  );
}

export default function JamAlongPage() {
  const [state, setState] = useState(loadStage90);
  const [openId, setOpenId] = useState(null);
  const [adding, setAdding] = useState(false);

  useEffect(() => { saveStage90(state); }, [state]);

  const jams = state.jams || [];
  const jam = jams.find((j) => j.id === openId);

  const addJam = (j) => {
    setState((s) => ({ ...s, jams: [...(s.jams || []), j] }));
    setAdding(false);
    setOpenId(j.id);
  };
  const removeJam = (id) => {
    setState((s) => ({ ...s, jams: s.jams.filter((j) => j.id !== id) }));
    if (openId === id) setOpenId(null);
  };
  const logSession = (id) =>
    setState((s) => {
      const today = dateKey(new Date());
      return {
        ...s,
        jams: s.jams.map((j) => (j.id === id ? { ...j, sessions: (j.sessions || 0) + 1, last: today } : j)),
        program: { ...s.program, activity: { ...s.program.activity, [today]: (s.program.activity?.[today] || 0) + 1 } },
      };
    });

  // Detail view
  if (jam) {
    return (
      <div className="space-y-5">
        <div className="flex items-start gap-3">
          <button onClick={() => setOpenId(null)} className="text-gray-400 hover:text-white transition-colors p-1 -ml-1 mt-1">
            <ChevronLeft size={22} />
          </button>
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white" style={{ fontFamily: 'ui-serif, Georgia, serif' }}>{jam.title}</h2>
            <div className="text-teal-400 text-sm font-semibold mt-1">
              {NOTE_NAMES[jam.keyIdx]} {jam.scaleType}
              {jam.sessions > 0 && <span className="text-gray-500 font-normal"> · {jam.sessions} session{jam.sessions === 1 ? '' : 's'}</span>}
            </div>
          </div>
        </div>

        <div className="grid gap-5 lg:grid-cols-3 items-start">
          <div className="lg:col-span-2 space-y-4 min-w-0">
            <div className="bg-gray-800 rounded-2xl p-4">
              <YouTubeJam videoId={jam.videoId} />
            </div>

            {/* What to play over it */}
            <div className="bg-gray-800 rounded-2xl p-4">
              <div className="text-amber-400 text-[10px] font-bold tracking-[2px] mb-2">WHAT TO PLAY — {NOTE_NAMES[jam.keyIdx].toUpperCase()} {jam.scaleType.toUpperCase()}</div>
              {jam.chords && (
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {jam.chords.split(/[\s,|]+/).filter(Boolean).map((c, i) => (
                    <span key={i} className="text-sm px-2.5 py-1 rounded font-bold font-mono bg-gray-700/70 text-gray-200">{c}</span>
                  ))}
                </div>
              )}
              <ScaleBoard initialRoot={jam.keyIdx} initialType={jam.scaleType} guidedDefault />
            </div>

            <button
              onClick={() => logSession(jam.id)}
              className="w-full py-3.5 rounded-xl font-extrabold text-[15px] bg-teal-600 hover:bg-teal-500 text-white"
            >
              ✓ Log a jam session ({jam.sessions || 0} so far{jam.last ? ` · last ${jam.last}` : ''})
            </button>
            <p className="text-gray-600 text-[11px] text-center -mt-2">Two logged sessions a week is the assessment bar from week 5 on.</p>
          </div>

          <div className="space-y-4 min-w-0">
            <Metronome defaultBpm={80} />
            <VampPlayer />
            <div className="bg-gray-800 rounded-2xl p-4">
              <div className="text-gray-500 text-[10px] font-bold tracking-[2px] mb-1.5">HOW TO JAM</div>
              <ul className="space-y-2 text-gray-400 text-sm leading-snug">
                <li className="flex gap-2"><span className="text-teal-500">›</span>Comp the chords first — locking with the track beats any solo.</li>
                <li className="flex gap-2"><span className="text-teal-500">›</span>Loop a hard 8-bar section with A/B and slow it to 0.75×.</li>
                <li className="flex gap-2"><span className="text-teal-500">›</span>Flub? Keep strumming. Recovery is the skill being trained.</li>
                <li className="flex gap-2"><span className="text-teal-500">›</span>Melody: stay inside the lit scale boxes — three notes played with intent beat thirty.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Library view
  return (
    <div className="space-y-5">
      <div className="text-center">
        <div className="text-teal-400 text-[11px] font-bold tracking-[3px]">FOLLOW ALONG</div>
        <h2 className="text-3xl sm:text-4xl font-bold text-white mt-1" style={{ fontFamily: 'ui-serif, Georgia, serif' }}>Jam Along</h2>
        <p className="text-gray-400 text-sm mt-2 max-w-2xl mx-auto">
          Save the videos you jam with — lessons, backing tracks, play-alongs. Tag each with its key and
          scale once, and the fretboard shows what to play while the video runs. Loop the hard parts, slow them down.
        </p>
      </div>

      {adding ? (
        <AddJamForm onAdd={addJam} onCancel={() => setAdding(false)} />
      ) : (
        <div className="text-center">
          <button onClick={() => setAdding(true)} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-bold bg-teal-600 hover:bg-teal-500 text-white">
            <Plus size={15} /> Add a jam video
          </button>
        </div>
      )}

      {jams.length === 0 && !adding && (
        <p className="text-gray-600 text-sm text-center">
          Library's empty. Paste any YouTube backing track or lesson —<br />
          jam sessions start counting toward the weekly assessment in week 5.
        </p>
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {jams.map((j) => (
          <div key={j.id} className="relative bg-gray-800 border border-gray-700 hover:border-teal-600 rounded-2xl overflow-hidden transition-colors">
            <button onClick={() => setOpenId(j.id)} className="text-left w-full">
              <img src={`https://i.ytimg.com/vi/${j.videoId}/mqdefault.jpg`} alt="" className="w-full aspect-video object-cover" loading="lazy" />
              <div className="p-3">
                <div className="text-white font-bold text-sm leading-tight">{j.title}</div>
                <div className="text-teal-400 text-xs font-semibold mt-1">{NOTE_NAMES[j.keyIdx]} {j.scaleType}</div>
                <div className="text-gray-500 text-[11px] mt-0.5">
                  {j.sessions ? `${j.sessions} session${j.sessions === 1 ? '' : 's'}${j.last ? ` · last ${j.last}` : ''}` : 'not jammed yet'}
                </div>
              </div>
            </button>
            <button onClick={() => removeJam(j.id)} className="absolute top-2 right-2 bg-gray-900/80 rounded-full p-1 text-gray-400 hover:text-rose-400">
              <X size={14} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
