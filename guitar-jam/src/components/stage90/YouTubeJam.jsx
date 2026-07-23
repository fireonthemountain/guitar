import { useState, useEffect, useRef, useCallback } from 'react';

// YouTube IFrame API wrapper with A/B section looping and playback speed.
// The API script loads once and is shared; players are created per videoId.

let apiPromise = null;
function loadYouTubeAPI() {
  if (window.YT?.Player) return Promise.resolve(window.YT);
  if (!apiPromise) {
    apiPromise = new Promise((resolve) => {
      const prev = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => { prev?.(); resolve(window.YT); };
      const s = document.createElement('script');
      s.src = 'https://www.youtube.com/iframe_api';
      document.head.appendChild(s);
    });
  }
  return apiPromise;
}

const fmt = (s) => (s == null ? '–:––' : `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`);
const SPEEDS = [0.5, 0.75, 1];

export default function YouTubeJam({ videoId }) {
  const holder = useRef(null);
  const playerRef = useRef(null);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [a, setA] = useState(null);
  const [b, setB] = useState(null);
  const [speed, setSpeed] = useState(1);
  const ab = useRef({ a: null, b: null });
  ab.current = { a, b };

  useEffect(() => {
    let cancelled = false;
    let player;
    setReady(false); setFailed(false); setA(null); setB(null); setSpeed(1);

    const timeout = setTimeout(() => { if (!playerRef.current) setFailed(true); }, 8000);
    loadYouTubeAPI().then((YT) => {
      if (cancelled || !holder.current) return;
      holder.current.innerHTML = '';
      const el = document.createElement('div');
      holder.current.appendChild(el);
      player = new YT.Player(el, {
        videoId,
        width: '100%',
        height: '100%',
        playerVars: { rel: 0, playsinline: 1 },
        events: {
          onReady: () => { if (!cancelled) { playerRef.current = player; setReady(true); clearTimeout(timeout); } },
          onError: () => { if (!cancelled) setFailed(true); },
        },
      });
    });

    // A/B loop watcher
    const tick = setInterval(() => {
      const p = playerRef.current;
      const { a: A, b: B } = ab.current;
      if (!p || A == null || B == null || B <= A) return;
      try {
        if (p.getCurrentTime() >= B) p.seekTo(A, true);
      } catch {}
    }, 300);

    return () => {
      cancelled = true;
      clearTimeout(timeout);
      clearInterval(tick);
      try { player?.destroy(); } catch {}
      playerRef.current = null;
    };
  }, [videoId]);

  const mark = useCallback((which) => {
    const p = playerRef.current;
    if (!p) return;
    const t = p.getCurrentTime();
    if (which === 'a') setA(t);
    else setB(t);
  }, []);

  const setRate = (r) => {
    setSpeed(r);
    try { playerRef.current?.setPlaybackRate(r); } catch {}
  };

  return (
    <div className="space-y-3">
      <div className="relative w-full rounded-xl overflow-hidden bg-black" style={{ paddingBottom: '56.25%' }}>
        <div ref={holder} className="absolute inset-0 [&>iframe]:w-full [&>iframe]:h-full" />
        {failed && (
          <div className="absolute inset-0 grid place-items-center text-center p-4">
            <div className="text-gray-400 text-sm">
              Couldn't load the video — check the link or your connection.<br />
              <span className="text-gray-600 text-xs">The built-in backing vamp below always works offline.</span>
            </div>
          </div>
        )}
      </div>

      {/* Loop + speed controls */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-gray-500 text-[10px] font-bold tracking-[2px]">LOOP</span>
        <button onClick={() => mark('a')} disabled={!ready} className={`px-3 py-1.5 rounded-lg text-xs font-bold ${a != null ? 'bg-teal-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'} disabled:opacity-40`}>
          A {fmt(a)}
        </button>
        <button onClick={() => mark('b')} disabled={!ready} className={`px-3 py-1.5 rounded-lg text-xs font-bold ${b != null ? 'bg-teal-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'} disabled:opacity-40`}>
          B {fmt(b)}
        </button>
        {(a != null || b != null) && (
          <button onClick={() => { setA(null); setB(null); }} className="px-2.5 py-1.5 rounded-lg text-xs text-gray-400 border border-gray-700">clear</button>
        )}
        <span className="text-gray-500 text-[10px] font-bold tracking-[2px] ml-2">SPEED</span>
        {SPEEDS.map((r) => (
          <button key={r} onClick={() => setRate(r)} disabled={!ready} className={`px-2.5 py-1.5 rounded-lg text-xs font-bold ${speed === r ? 'bg-amber-500 text-stone-900' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'} disabled:opacity-40`}>
            {r}×
          </button>
        ))}
      </div>
      {a != null && b != null && b <= a && (
        <p className="text-amber-400 text-[11px]">B needs to be after A — the loop is off until it is.</p>
      )}
    </div>
  );
}
