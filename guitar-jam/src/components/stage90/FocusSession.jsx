import { useState, useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import TabBlock from '../guitar/TabBlock';
import Metronome from '../guitar/Metronome';

// Guided session: the day's work as one card at a time — do the exercise,
// advance, repeat — instead of a scrolling page. The main block's numbered
// steps each get their own card; other blocks are one card each. Each card
// carries a share of its block's minutes as a countdown (guidance, not a gate).

const fmt = (s) => `${Math.floor(s / 60)}:${String(Math.max(0, Math.floor(s % 60))).padStart(2, '0')}`;

function buildCards(blocks, steps) {
  const cards = [];
  blocks.forEach((b, bi) => {
    if (b.main && steps.length) {
      const per = Math.max(120, Math.round((b.m * 60) / steps.length));
      steps.forEach((s, si) => {
        cards.push({ block: b, blockIdx: bi, label: `${b.n} · ${si + 1} of ${steps.length}`, text: s, seconds: per, lastOfBlock: si === steps.length - 1 });
      });
    } else {
      cards.push({ block: b, blockIdx: bi, label: b.n, text: b.d, seconds: Math.max(120, b.m * 60), lastOfBlock: true });
    }
  });
  return cards;
}

export default function FocusSession({ blocks, steps, weekTabs, dayLabel, onBlockDone, onFinishDay, onExit }) {
  const [cards] = useState(() => buildCards(blocks, steps));
  const [idx, setIdx] = useState(0);
  const [finished, setFinished] = useState(false);
  const [remaining, setRemaining] = useState(cards[0]?.seconds ?? 0);
  const [paused, setPaused] = useState(false);
  const pausedRef = useRef(paused);
  pausedRef.current = paused;

  const card = cards[idx];

  // Countdown — pauses freeze it; hitting zero just changes color, never advances.
  useEffect(() => {
    const t = setInterval(() => {
      if (!pausedRef.current) setRemaining((r) => r - 1);
    }, 1000);
    return () => clearInterval(t);
  }, [idx]);

  const advance = () => {
    if (card.lastOfBlock) onBlockDone(card.blockIdx);
    if (idx + 1 < cards.length) {
      setIdx(idx + 1);
      setRemaining(cards[idx + 1].seconds);
      setPaused(false);
      window.scrollTo(0, 0);
    } else {
      setFinished(true);
    }
  };

  const back = () => {
    if (idx === 0) return;
    setIdx(idx - 1);
    setRemaining(cards[idx - 1].seconds);
    setPaused(false);
  };

  if (finished) {
    return (
      <div className="max-w-2xl mx-auto bg-gray-800 border border-emerald-600/60 rounded-2xl p-8 text-center space-y-4">
        <div className="text-5xl">🎸</div>
        <h3 className="text-white text-2xl font-bold" style={{ fontFamily: 'ui-serif, Georgia, serif' }}>Session done — {dayLabel}</h3>
        <p className="text-gray-400 text-sm">Every exercise touched. That's the whole job today.</p>
        <button onClick={onFinishDay} className="w-full py-3.5 rounded-xl font-extrabold text-[15px] bg-rose-500 hover:bg-rose-400 text-rose-50">
          Mark day complete
        </button>
        <button onClick={onExit} className="text-gray-500 hover:text-gray-300 text-sm underline">back to the day view</button>
      </div>
    );
  }

  const over = remaining <= 0;
  const total = cards.length;

  return (
    <div className="max-w-2xl mx-auto space-y-4">
      {/* Header: progress + exit */}
      <div className="flex items-center gap-3">
        <div className="flex-1 flex gap-1">
          {cards.map((_, i) => (
            <div key={i} className={`h-1.5 flex-1 rounded-full ${i < idx ? 'bg-teal-500' : i === idx ? 'bg-amber-400' : 'bg-gray-700'}`} />
          ))}
        </div>
        <span className="text-gray-500 text-xs flex-shrink-0">{idx + 1} / {total}</span>
        <button onClick={onExit} className="text-gray-500 hover:text-gray-300 flex-shrink-0" aria-label="Exit guided session"><X size={18} /></button>
      </div>

      {/* The card */}
      <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6 space-y-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-teal-400 text-[10px] font-bold tracking-[2px]">{card.label.toUpperCase()}</div>
            <div className="text-gray-600 text-[11px] mt-0.5">{dayLabel}</div>
          </div>
          <div className={`text-right flex-shrink-0 font-bold text-3xl tabular-nums ${over ? 'text-emerald-400' : 'text-white'}`} style={{ fontFamily: 'ui-serif, Georgia, serif' }}>
            {over ? 'time ✓' : fmt(remaining)}
          </div>
        </div>

        <p className="text-gray-100 text-lg leading-relaxed" style={{ fontFamily: 'ui-serif, Georgia, serif' }}>{card.text}</p>

        {over && <p className="text-emerald-400/80 text-xs">Time's up on this one — move on when it feels done, not before.</p>}

        {/* Timer controls */}
        <div className="flex flex-wrap gap-2">
          <button onClick={() => setPaused((p) => !p)} className="px-3 py-1.5 rounded-lg text-xs font-bold bg-gray-700 text-gray-300 hover:bg-gray-600">
            {paused ? '▶ Resume' : '⏸ Pause'}
          </button>
          <button onClick={() => setRemaining((r) => Math.max(r, 0) + 120)} className="px-3 py-1.5 rounded-lg text-xs font-bold bg-gray-700 text-gray-300 hover:bg-gray-600">
            +2 min
          </button>
        </div>

        {/* Charts on demand — don't clutter the card */}
        {weekTabs?.length > 0 && (
          <details className="bg-gray-900/50 border border-gray-700 rounded-xl px-3 py-2">
            <summary className="text-gray-400 text-xs font-semibold cursor-pointer select-none">This week's charts</summary>
            <div className="pt-1">
              {weekTabs.map((t, i) => (
                <TabBlock key={i} label={t.l} tab={t.t} />
              ))}
            </div>
          </details>
        )}
        <details className="bg-gray-900/50 border border-gray-700 rounded-xl px-3 py-2">
          <summary className="text-gray-400 text-xs font-semibold cursor-pointer select-none">Metronome</summary>
          <div className="pt-2"><Metronome defaultBpm={60} /></div>
        </details>
      </div>

      {/* Nav */}
      <div className="flex justify-between">
        <button onClick={back} disabled={idx === 0} className="px-4 py-2.5 rounded-lg text-sm font-bold border border-gray-700 text-gray-300 disabled:text-gray-700 disabled:border-gray-800">
          Back
        </button>
        <button onClick={advance} className="px-6 py-2.5 rounded-xl text-[15px] font-extrabold bg-teal-600 hover:bg-teal-500 text-white">
          {idx + 1 < total ? 'Done → next exercise' : 'Done → finish session'}
        </button>
      </div>
    </div>
  );
}
