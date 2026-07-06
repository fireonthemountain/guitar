import { useState, useCallback, useMemo } from 'react';
import { ChevronLeft } from 'lucide-react';
import {
  NOTE_NAMES,
  SCALE_TYPES,
  getDailySessions,
  getScaleNotes,
  getCompletedSessions,
  markSessionComplete,
  getPositionWindows,
} from '../utils/guitarScales';
import { playScale, cancelScale } from '../utils/audioEngine';
import GuitarFretboard from '../components/guitar/GuitarFretboard';
import PianoKeyboard from '../components/guitar/PianoKeyboard';
import SessionTimer from '../components/guitar/SessionTimer';
import Metronome from '../components/guitar/Metronome';

const DIFFICULTY_COLOR = {
  Beginner: 'text-emerald-400 bg-emerald-900/30',
  Intermediate: 'text-amber-400 bg-amber-900/30',
};

function ScaleNoteChips({ scaleNotes, rootIdx }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {scaleNotes.map((note, i) => (
        <span
          key={i}
          className={`text-xs px-2 py-0.5 rounded font-semibold ${
            note === rootIdx ? 'bg-amber-500 text-stone-900' : 'bg-teal-800/60 text-teal-200'
          }`}
        >
          {NOTE_NAMES[note]}
        </span>
      ))}
    </div>
  );
}

function SessionCard({ session, completed, onStart }) {
  const scaleNotes = getScaleNotes(session.rootIdx, session.type);
  const diff = SCALE_TYPES[session.type].difficulty;

  return (
    <button
      onClick={onStart}
      className={`w-full text-left p-4 rounded-2xl border transition-all ${
        completed
          ? 'bg-gray-800/40 border-teal-800/50'
          : 'bg-gray-800 border-gray-700 hover:border-teal-600 active:scale-[0.99]'
      }`}
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="flex items-center gap-2.5">
          <div
            className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
              completed ? 'bg-teal-600 text-white' : 'bg-gray-700 text-gray-400'
            }`}
          >
            {completed ? '✓' : session.sessionNum}
          </div>
          <div>
            <span className="text-white font-semibold">
              {NOTE_NAMES[session.rootIdx]} {session.type}
            </span>
            <div className="flex items-center gap-2 mt-0.5">
              <span className={`text-xs px-1.5 py-0.5 rounded ${DIFFICULTY_COLOR[diff]}`}>
                {diff}
              </span>
              <span className="text-gray-500 text-xs">· 5 min</span>
            </div>
          </div>
        </div>
      </div>
      <p className="text-gray-400 text-sm ml-9 mb-2 leading-snug">
        {SCALE_TYPES[session.type].description.split('.')[0]}.
      </p>
      <div className="ml-9">
        <ScaleNoteChips scaleNotes={scaleNotes} rootIdx={session.rootIdx} />
      </div>
    </button>
  );
}

function ActiveSession({ session, completedSessions, onComplete, onBack }) {
  const { rootIdx, type, sessionNum } = session;
  const scaleNotes = getScaleNotes(rootIdx, type);
  const info = SCALE_TYPES[type];
  const isAlreadyComplete = completedSessions.includes(sessionNum);

  // Audio state
  const [instrument, setInstrument] = useState('guitar');
  const [scaleBpm, setScaleBpm] = useState(70);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playingNote, setPlayingNote] = useState(null);

  // Fretboard position state
  const positionWindows = useMemo(() => getPositionWindows(rootIdx), [rootIdx]);
  const [posIdx, setPosIdx] = useState(0);
  const activeWindow = positionWindows[posIdx];

  const handlePlayScale = useCallback(() => {
    if (isPlaying) {
      cancelScale();
      setIsPlaying(false);
      setPlayingNote(null);
      return;
    }
    setIsPlaying(true);
    playScale(scaleNotes, rootIdx, scaleBpm, instrument, note => {
      setPlayingNote(note);
      if (note === null) setIsPlaying(false);
    });
  }, [isPlaying, scaleNotes, rootIdx, scaleBpm, instrument]);

  const handleComplete = useCallback(() => {
    onComplete(sessionNum);
  }, [onComplete, sessionNum]);

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button onClick={onBack} className="text-gray-400 hover:text-white transition-colors p-1 -ml-1">
          <ChevronLeft size={22} />
        </button>
        <div>
          <h2 className="text-white font-bold text-lg leading-tight">
            {NOTE_NAMES[rootIdx]} {type}
          </h2>
          <p className="text-gray-400 text-sm">Session {sessionNum} of 5</p>
        </div>
        <span className={`ml-auto text-xs px-2 py-0.5 rounded ${DIFFICULTY_COLOR[info.difficulty]}`}>
          {info.difficulty}
        </span>
      </div>

      {/* Timer */}
      <div className="bg-gray-800 rounded-2xl p-5 flex flex-col items-center">
        <SessionTimer
          key={`${sessionNum}-${isAlreadyComplete}`}
          onComplete={handleComplete}
          alreadyComplete={isAlreadyComplete}
        />
      </div>

      {/* Scale notes + audio controls */}
      <div className="bg-gray-800 rounded-2xl p-4 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-white font-semibold">Scale Notes</h3>
          <div className="flex items-center gap-3 text-xs text-gray-400">
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" /> Root
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-teal-600 inline-block" /> Degree
            </span>
          </div>
        </div>

        <ScaleNoteChips scaleNotes={scaleNotes} rootIdx={rootIdx} />
        <p className="text-gray-400 text-sm leading-relaxed">{info.description}</p>

        {/* Instrument toggle */}
        <div className="flex rounded-lg overflow-hidden border border-gray-700">
          {['guitar', 'piano'].map(inst => (
            <button
              key={inst}
              onClick={() => setInstrument(inst)}
              className={`flex-1 py-1.5 text-sm font-medium transition-colors ${
                instrument === inst ? 'bg-teal-700 text-white' : 'bg-gray-800 text-gray-400 hover:text-gray-200'
              }`}
            >
              {inst === 'guitar' ? '🎸 Guitar' : '🎹 Piano'}
            </button>
          ))}
        </div>

        {/* Scale BPM + play button */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-400">Scale speed</span>
            <span className="text-white font-mono">{scaleBpm} BPM</span>
          </div>
          <input
            type="range"
            min={40}
            max={160}
            value={scaleBpm}
            onChange={e => setScaleBpm(Number(e.target.value))}
            className="w-full accent-teal-500"
            disabled={isPlaying}
          />
        </div>

        <button
          onClick={handlePlayScale}
          className={`w-full py-2.5 rounded-xl font-semibold text-sm transition-colors ${
            isPlaying
              ? 'bg-gray-700 hover:bg-gray-600 text-gray-200'
              : 'bg-teal-600 hover:bg-teal-500 text-white'
          }`}
        >
          {isPlaying ? '⏹ Stop' : `▶ Play Scale (${instrument})`}
        </button>

        {isPlaying && (
          <p className="text-center text-xs text-teal-400 animate-pulse">
            Tap along — highlighted note is playing
          </p>
        )}
      </div>

      {/* Metronome */}
      <Metronome defaultBpm={scaleBpm} />

      {/* Guitar fretboard */}
      <div className="bg-gray-800 rounded-2xl p-4 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-white font-semibold">Guitar Fretboard</h3>
          <span className="text-gray-500 text-xs">Tap a note to hear it</span>
        </div>

        {/* Position selector */}
        <div className="flex gap-1.5 flex-wrap">
          {positionWindows.map((pos, i) => (
            <button
              key={i}
              onClick={() => setPosIdx(i)}
              className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${
                posIdx === i ? 'bg-teal-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {pos.label}
            </button>
          ))}
        </div>

        {posIdx > 0 && (
          <p className="text-gray-500 text-xs">
            Showing frets {activeWindow.minFret}–{activeWindow.maxFret} · tap circles to play
          </p>
        )}
        {posIdx === 0 && (
          <p className="text-gray-500 text-xs">Scroll right to see all 12 frets →</p>
        )}

        <GuitarFretboard
          scaleNotes={scaleNotes}
          rootIdx={rootIdx}
          minFret={activeWindow.minFret}
          maxFret={activeWindow.maxFret}
          playingNote={playingNote}
        />

        <div className="flex items-center gap-4 text-xs text-gray-500 pt-1">
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 rounded-full bg-amber-500 inline-block" />
            Root ({NOTE_NAMES[rootIdx]})
          </span>
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 rounded-full bg-teal-600 inline-block" />
            Scale tones
          </span>
        </div>
      </div>

      {/* Piano keyboard */}
      <div className="bg-gray-800 rounded-2xl p-4 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-white font-semibold">Piano Keyboard</h3>
          <span className="text-gray-500 text-xs">Tap keys to hear them</span>
        </div>
        <PianoKeyboard scaleNotes={scaleNotes} rootIdx={rootIdx} playingNote={playingNote} />
      </div>

      {/* Practice tips */}
      <div className="bg-gray-800 rounded-2xl p-4 space-y-2">
        <h3 className="text-white font-semibold">Practice Tips</h3>
        <ul className="space-y-2">
          {info.tips.map((tip, i) => (
            <li key={i} className="text-gray-400 text-sm flex gap-2">
              <span className="text-teal-500 flex-shrink-0">›</span>
              {tip}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function GuitarScalesPage() {
  const [activeSession, setActiveSession] = useState(null);
  const [completedSessions, setCompletedSessions] = useState(() => getCompletedSessions());

  const dailySessions = getDailySessions();

  const handleComplete = useCallback((sessionNum) => {
    const updated = markSessionComplete(sessionNum);
    setCompletedSessions(updated);
  }, []);

  if (activeSession) {
    return (
      <ActiveSession
        session={activeSession}
        completedSessions={completedSessions}
        onComplete={handleComplete}
        onBack={() => {
          cancelScale();
          setActiveSession(null);
        }}
      />
    );
  }

  const doneCount = completedSessions.length;
  const allDone = doneCount >= 5;

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-white">Daily Scales</h2>
        <p className="text-gray-400 mt-0.5 text-sm">
          Five-minute sessions · {doneCount} of 5 complete today
        </p>
      </div>

      {/* Daily progress */}
      <div className="bg-gray-800 rounded-2xl p-4 space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Today's progress</span>
          <span className={allDone ? 'text-emerald-400 font-semibold' : 'text-gray-300'}>
            {doneCount}/5 sessions
          </span>
        </div>
        <div className="flex gap-1.5">
          {dailySessions.map(s => (
            <div
              key={s.sessionNum}
              className={`flex-1 h-2 rounded-full transition-colors ${
                completedSessions.includes(s.sessionNum) ? 'bg-teal-500' : 'bg-gray-700'
              }`}
            />
          ))}
        </div>
        {allDone && (
          <p className="text-emerald-400 text-sm font-medium">
            All 5 sessions complete — great day of practice!
          </p>
        )}
      </div>

      {/* Session cards */}
      <div className="space-y-3">
        {dailySessions.map(session => (
          <SessionCard
            key={session.sessionNum}
            session={session}
            completed={completedSessions.includes(session.sessionNum)}
            onStart={() => setActiveSession(session)}
          />
        ))}
      </div>

      <div className="bg-gray-800/50 rounded-2xl p-4 text-center space-y-1">
        <p className="text-gray-400 text-sm">Sessions rotate keys weekly</p>
        <p className="text-gray-500 text-xs">
          Each week shifts by a perfect 4th · tap any note on the fretboard or keys to hear it
        </p>
      </div>
    </div>
  );
}
