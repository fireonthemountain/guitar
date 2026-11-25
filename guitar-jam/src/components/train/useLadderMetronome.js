import { useEffect, useRef, useState } from 'react';
import { getAudioCtx, scheduleMetronomeClick } from '../../utils/audioEngine';

const LOOKAHEAD = 0.12;
const TICK_MS = 25;

// Metronome whose tempo is owned by the caller (the ladder), and which keeps
// the exact AudioContext time of every click so playing can be scored against it.
export default function useLadderMetronome(bpm) {
  const [running, setRunning] = useState(false);
  const [beat, setBeat] = useState(-1);
  const bpmRef = useRef(bpm);
  const clicksRef = useRef([]); // scheduled click times, newest last

  useEffect(() => { bpmRef.current = bpm; }, [bpm]);

  useEffect(() => {
    if (!running) { setBeat(-1); return undefined; }
    const ctx = getAudioCtx();
    let next = ctx.currentTime + 0.08;
    let count = 0;
    clicksRef.current = [];
    const timers = new Set();
    const id = setInterval(() => {
      const now = ctx.currentTime;
      while (next < now + LOOKAHEAD) {
        const thisBeat = count % 4;
        scheduleMetronomeClick(next, thisBeat === 0, ctx);
        clicksRef.current.push(next);
        if (clicksRef.current.length > 512) clicksRef.current.shift();
        const timer = setTimeout(() => { timers.delete(timer); setBeat(thisBeat); }, Math.max(0, (next - now) * 1000));
        timers.add(timer);
        count += 1;
        next += 60 / bpmRef.current;
      }
    }, TICK_MS);
    return () => { clearInterval(id); timers.forEach(clearTimeout); };
  }, [running]);

  return {
    running,
    beat,
    start: () => setRunning(true),
    stop: () => setRunning(false),
    toggle: () => setRunning((r) => !r),
    getClicks: () => clicksRef.current,
  };
}
