import { useState, useEffect, useCallback } from 'react';

const SESSION_SECS = 5 * 60;
const CIRCUMFERENCE = 2 * Math.PI * 52;

export default function SessionTimer({ onComplete, alreadyComplete }) {
  const [timeLeft, setTimeLeft] = useState(alreadyComplete ? 0 : SESSION_SECS);
  const [running, setRunning] = useState(false);
  const [done, setDone] = useState(alreadyComplete);

  useEffect(() => {
    if (alreadyComplete) {
      setTimeLeft(0);
      setDone(true);
      setRunning(false);
    }
  }, [alreadyComplete]);

  useEffect(() => {
    if (!running || done) return;
    const id = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setRunning(false);
          setDone(true);
          onComplete?.();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [running, done, onComplete]);

  const handleReset = useCallback(() => {
    setTimeLeft(SESSION_SECS);
    setDone(false);
    setRunning(false);
  }, []);

  const progress = 1 - timeLeft / SESSION_SECS;
  const mins = Math.floor(timeLeft / 60);
  const secs = timeLeft % 60;
  const dashOffset = CIRCUMFERENCE * (1 - progress);

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Circular progress ring */}
      <div className="relative">
        <svg width={120} height={120} viewBox="0 0 120 120">
          <circle cx={60} cy={60} r={52} fill="none" stroke="#374151" strokeWidth={8} />
          <circle
            cx={60}
            cy={60}
            r={52}
            fill="none"
            stroke={done ? '#10b981' : '#0d9488'}
            strokeWidth={8}
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={dashOffset}
            strokeLinecap="round"
            transform="rotate(-90 60 60)"
            style={{ transition: 'stroke-dashoffset 0.5s ease' }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {done ? (
            <span className="text-3xl">✓</span>
          ) : (
            <>
              <span className="text-2xl font-mono font-bold text-white leading-none">
                {String(mins).padStart(2, '0')}:{String(secs).padStart(2, '0')}
              </span>
              <span className="text-xs text-gray-400 mt-0.5">
                {running ? 'remaining' : timeLeft === SESSION_SECS ? '5:00' : 'paused'}
              </span>
            </>
          )}
        </div>
      </div>

      {/* Controls */}
      <div className="flex gap-3">
        {!done && (
          <button
            onClick={() => setRunning(r => !r)}
            className={`px-6 py-2 rounded-lg font-semibold text-sm transition-colors ${
              running
                ? 'bg-gray-700 hover:bg-gray-600 text-gray-200'
                : 'bg-teal-600 hover:bg-teal-500 text-white'
            }`}
          >
            {running ? 'Pause' : timeLeft === SESSION_SECS ? 'Start Session' : 'Resume'}
          </button>
        )}
        {!running && timeLeft < SESSION_SECS && !done && (
          <button
            onClick={handleReset}
            className="px-4 py-2 rounded-lg text-sm bg-gray-700 hover:bg-gray-600 text-gray-300"
          >
            Reset
          </button>
        )}
        {done && !alreadyComplete && (
          <div className="text-center">
            <p className="text-emerald-400 font-semibold">Session complete!</p>
            <p className="text-gray-400 text-xs mt-1">Take a short break before the next one.</p>
          </div>
        )}
        {done && alreadyComplete && (
          <div className="text-center">
            <p className="text-emerald-400 font-semibold">Already completed today</p>
            <p className="text-gray-400 text-xs mt-1">Come back tomorrow for a fresh session.</p>
          </div>
        )}
      </div>
    </div>
  );
}
