import { useState, useEffect, useRef } from 'react';
import { Plus, X, ArrowUp, ArrowDown } from 'lucide-react';
import { loadStage90, saveStage90 } from '../../utils/stage90';

const fmtSec = (s) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;

// --- The Set Runner: run the whole set, tap stumbles, log the run ----------
function SetRunner({ set, onFinish, onCancel }) {
  const [idx, setIdx] = useState(0);
  const [perSong, setPerSong] = useState([]); // finished songs: {title, sec, stumbles}
  const [stumbles, setStumbles] = useState(0);
  const [now, setNow] = useState(Date.now());
  const songStart = useRef(Date.now());
  const runStart = useRef(Date.now());

  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 500);
    return () => clearInterval(t);
  }, []);

  const song = set[idx];
  const songSec = (now - songStart.current) / 1000;
  const totalSec = (now - runStart.current) / 1000;

  const advance = () => {
    const done = [...perSong, { title: song.title, sec: Math.round(songSec), stumbles }];
    if (idx + 1 < set.length) {
      setPerSong(done);
      setStumbles(0);
      setIdx(idx + 1);
      songStart.current = Date.now();
    } else {
      onFinish({
        date: new Date().toISOString().slice(0, 10),
        totalSec: Math.round((Date.now() - runStart.current) / 1000),
        perSong: done,
        totalStumbles: done.reduce((a, s) => a + s.stumbles, 0),
      });
    }
  };

  return (
    <div className="bg-gray-900 border-2 border-rose-500/60 rounded-2xl p-5 space-y-4 text-center">
      <div className="flex justify-between items-center text-xs text-gray-500">
        <span>SET RUN · SONG {idx + 1} OF {set.length}</span>
        <span>total {fmtSec(totalSec)}</span>
        <button onClick={onCancel} className="text-gray-500 hover:text-gray-300">abandon</button>
      </div>

      <div>
        <div className="text-white font-bold text-3xl" style={{ fontFamily: 'ui-serif, Georgia, serif' }}>{song.title}</div>
        <div className="text-gray-400 text-sm mt-1">
          {song.bpm ? <>target {song.bpm} BPM · </> : null}
          {song.minutes ? <>planned {song.minutes} min · </> : null}
          elapsed {fmtSec(songSec)}
        </div>
        <div className="text-gray-600 text-xs mt-1">Count yourself in: two silent bars. No restarts — ever.</div>
      </div>

      <button
        onClick={() => setStumbles((s) => s + 1)}
        className="w-full py-6 rounded-2xl bg-amber-600/20 border-2 border-amber-500 text-amber-300 font-extrabold text-xl active:scale-[0.98]"
      >
        Stumble +1 <span className="block text-3xl mt-1">{stumbles}</span>
      </button>

      <button onClick={advance} className="w-full py-3.5 rounded-xl font-extrabold text-[15px] bg-teal-600 hover:bg-teal-500 text-white">
        {idx + 1 < set.length ? `Song done → ${set[idx + 1].title}` : 'Set finished — log the run'}
      </button>

      {perSong.length > 0 && (
        <div className="text-gray-500 text-xs">
          {perSong.map((s) => `${s.title} ${fmtSec(s.sec)} (${s.stumbles})`).join(' · ')}
        </div>
      )}
    </div>
  );
}

// --- My Set: the 3 gig songs + run history ---------------------------------
export default function MySet() {
  const [state, setState] = useState(loadStage90);
  const [running, setRunning] = useState(false);
  const [adding, setAdding] = useState(false);
  const [draft, setDraft] = useState({ title: '', chords: '', bpm: '', minutes: '' });

  useEffect(() => { saveStage90(state); }, [state]);

  const set = state.set || [];
  const runs = state.setruns || [];
  const plannedMin = set.reduce((a, s) => a + (Number(s.minutes) || 0), 0);

  const addSong = () => {
    if (!draft.title.trim()) return;
    setState((s) => ({
      ...s,
      set: [...(s.set || []), {
        id: Date.now(), title: draft.title.trim(), chords: draft.chords.trim(),
        bpm: Number(draft.bpm) || null, minutes: Number(draft.minutes) || null, memorized: false,
      }],
    }));
    setDraft({ title: '', chords: '', bpm: '', minutes: '' });
    setAdding(false);
  };

  const patchSong = (id, fn) => setState((s) => ({ ...s, set: s.set.map((x) => (x.id === id ? fn(x) : x)) }));
  const removeSong = (id) => setState((s) => ({ ...s, set: s.set.filter((x) => x.id !== id) }));
  const move = (i, dir) => setState((s) => {
    const arr = [...s.set];
    const j = i + dir;
    if (j < 0 || j >= arr.length) return s;
    [arr[i], arr[j]] = [arr[j], arr[i]];
    return { ...s, set: arr };
  });

  const logRun = (run) => {
    setState((s) => ({ ...s, setruns: [...(s.setruns || []), run] }));
    setRunning(false);
  };

  const lastRun = runs.at(-1);

  return (
    <div className="bg-gray-800/60 border border-gray-700 rounded-2xl p-4 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-rose-400 text-[10px] font-bold tracking-[2px]">MY SET — GIG NIGHT</div>
          <div className="text-gray-500 text-xs mt-0.5">
            {set.length ? `${set.length} song${set.length === 1 ? '' : 's'}${plannedMin ? ` · ~${plannedMin} min planned` : ''}` : 'Three songs: two easy, one reach. Pick them in week 2.'}
          </div>
        </div>
        {set.length > 0 && !running && (
          <button onClick={() => setRunning(true)} className="px-4 py-2 rounded-lg text-sm font-bold bg-rose-500 hover:bg-rose-400 text-white">
            ▶ Run the set
          </button>
        )}
      </div>

      {running ? (
        <SetRunner set={set} onFinish={logRun} onCancel={() => setRunning(false)} />
      ) : (
        <>
          {/* Songs */}
          {set.length > 0 && (
            <div className="space-y-2">
              {set.map((s, i) => (
                <div key={s.id} className="flex items-center gap-2.5 bg-gray-900/50 border border-gray-700 rounded-xl px-3 py-2">
                  <span className="text-gray-600 font-bold text-sm w-4">{i + 1}</span>
                  <div className="flex-1 min-w-0">
                    <div className="text-white text-sm font-bold truncate">{s.title}</div>
                    <div className="text-gray-500 text-[11px] truncate">
                      {[s.chords, s.bpm && `${s.bpm} BPM`, s.minutes && `${s.minutes} min`].filter(Boolean).join(' · ')}
                    </div>
                  </div>
                  <button
                    onClick={() => patchSong(s.id, (x) => ({ ...x, memorized: !x.memorized }))}
                    className={`px-2 py-1 rounded text-[10px] font-bold flex-shrink-0 ${s.memorized ? 'bg-emerald-900/50 text-emerald-300 border border-emerald-600' : 'bg-gray-700 text-gray-400'}`}
                  >
                    {s.memorized ? '✓ memorized' : 'on sheet'}
                  </button>
                  <div className="flex flex-col flex-shrink-0">
                    <button onClick={() => move(i, -1)} className="text-gray-600 hover:text-gray-300"><ArrowUp size={13} /></button>
                    <button onClick={() => move(i, 1)} className="text-gray-600 hover:text-gray-300"><ArrowDown size={13} /></button>
                  </div>
                  <button onClick={() => removeSong(s.id)} className="text-gray-600 hover:text-rose-400 flex-shrink-0"><X size={15} /></button>
                </div>
              ))}
            </div>
          )}

          {/* Add song */}
          {adding ? (
            <div className="bg-gray-900/50 border border-gray-700 rounded-xl p-3 space-y-2">
              <div className="grid sm:grid-cols-2 gap-2">
                <input value={draft.title} onChange={(e) => setDraft((d) => ({ ...d, title: e.target.value }))} placeholder="Song title" className="bg-gray-950 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm" autoFocus />
                <input value={draft.chords} onChange={(e) => setDraft((d) => ({ ...d, chords: e.target.value }))} placeholder="Chords (G C D Em…)" className="bg-gray-950 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm" />
                <input value={draft.bpm} onChange={(e) => setDraft((d) => ({ ...d, bpm: e.target.value }))} type="number" placeholder="Target BPM" className="bg-gray-950 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm" />
                <input value={draft.minutes} onChange={(e) => setDraft((d) => ({ ...d, minutes: e.target.value }))} type="number" placeholder="Length (min)" className="bg-gray-950 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm" />
              </div>
              <div className="flex gap-2">
                <button onClick={addSong} className="px-4 py-1.5 rounded-lg text-sm font-bold bg-teal-600 hover:bg-teal-500 text-white">Add</button>
                <button onClick={() => setAdding(false)} className="px-4 py-1.5 rounded-lg text-sm text-gray-400 border border-gray-700">Cancel</button>
              </div>
            </div>
          ) : (
            <button onClick={() => setAdding(true)} className="flex items-center gap-1.5 text-teal-400 hover:text-teal-300 text-sm font-semibold">
              <Plus size={15} /> Add a set song
            </button>
          )}

          {/* Run history */}
          {runs.length > 0 && (
            <div>
              <div className="text-gray-500 text-[10px] font-bold tracking-[2px] mb-1.5">SET RUNS · LAST {Math.min(runs.length, 5)}</div>
              <div className="space-y-1.5">
                {runs.slice(-5).reverse().map((r, i) => {
                  const delta = plannedMin ? Math.round(((r.totalSec / 60 - plannedMin) / plannedMin) * 100) : null;
                  return (
                    <div key={runs.length - i} className="flex items-center gap-3 text-sm bg-gray-900/40 rounded-lg px-3 py-1.5">
                      <span className="text-gray-500 text-xs w-20 flex-shrink-0">{r.date.slice(5)}</span>
                      <span className="text-white font-bold">{fmtSec(r.totalSec)}</span>
                      {delta !== null && (
                        <span className={`text-xs ${Math.abs(delta) <= 20 ? 'text-emerald-400' : 'text-amber-400'}`}>
                          {delta > 0 ? '+' : ''}{delta}% vs plan
                        </span>
                      )}
                      <span className={`ml-auto text-xs font-bold ${r.totalStumbles <= 2 ? 'text-emerald-400' : 'text-amber-400'}`}>
                        {r.totalStumbles} stumble{r.totalStumbles === 1 ? '' : 's'}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
