import { useEffect, useMemo, useRef, useState } from 'react';
import { Mic, MicOff, Circle, Square } from 'lucide-react';
import { analyzeVibrato, bendStatus, describePitch, detectPitch, midiToFreq } from '../../utils/pitchDetect';
import { createOnsetDetector, estimateLatency, scoreTiming, suggestResult } from '../../utils/timingAnalysis';
import { getCalibratedLatency, micSupport, openMic, recorderSupported, reportedOutputLatency, setCalibratedLatency } from '../../utils/micInput';
import { parseTab } from '../../utils/tabParser';

// Listening checks for one exercise. The mic is opt-in and nothing is uploaded
// or stored: analysis runs in the page, and a recorded take lives only until
// you leave the exercise.
//
// Which check shows depends on exercise.feedback.mode:
//   timing  — note onsets scored against the metronome grid
//   bend    — is the bent note within 15 cents of the target pitch?
//   vibrato — rate, depth and evenness of the pitch wobble
// A tuner readout is always shown while the mic is on.

const GRADE_STYLE = {
  locked: 'text-emerald-300',
  solid: 'text-teal-300',
  loose: 'text-amber-300',
  unsteady: 'text-rose-300',
};

// The first bent note in the tab gives the unbent and target pitches.
function bendTargets(exercise) {
  const semitones = exercise.feedback?.bendSemitones || 2;
  const parsed = exercise.tablature ? parseTab(exercise.tablature) : null;
  const note = parsed?.steps.flatMap((s) => s.notes).find((n) => n.bendTo != null);
  if (!note) return null;
  return { baseFreq: midiToFreq(note.midi), semitones, baseName: describePitch(midiToFreq(note.midi)).name, targetName: describePitch(midiToFreq(note.midi + semitones)).name };
}

function Needle({ cents, range = 50, okWithin = 15 }) {
  const clamped = Math.max(-range, Math.min(range, cents ?? 0));
  const left = 50 + (clamped / range) * 50;
  const ok = cents != null && Math.abs(cents) <= okWithin;
  return (
    <div className="relative h-7 rounded-lg bg-gray-950/70" role="img" aria-label={cents == null ? 'No pitch detected' : `${cents} cents from target`}>
      <div className="absolute inset-y-0 bg-emerald-500/15" style={{ left: `${50 - (okWithin / range) * 50}%`, right: `${50 - (okWithin / range) * 50}%` }} />
      <div className="absolute inset-y-0 left-1/2 w-px bg-gray-600" />
      {cents != null && <div className={`absolute top-1 bottom-1 w-1.5 -translate-x-1/2 rounded-full ${ok ? 'bg-emerald-400' : 'bg-amber-400'}`} style={{ left: `${left}%` }} />}
    </div>
  );
}

function Stat({ label, value, hint, tone = 'text-white' }) {
  return (
    <div className="rounded-xl bg-gray-950/50 px-3 py-2">
      <div className="text-[10px] font-bold uppercase tracking-[1.5px] text-gray-500">{label}</div>
      <div className={`text-xl font-bold tabular-nums ${tone}`}>{value}</div>
      {hint && <div className="text-[11px] text-gray-500">{hint}</div>}
    </div>
  );
}

export default function ListenPanel({ exercise, bpm, metronome, onSuggest }) {
  const mode = exercise.feedback?.mode || 'none';
  const notesPerBeat = exercise.feedback?.notesPerBeat || 1;
  const support = useMemo(micSupport, []);
  const bend = useMemo(() => (mode === 'bend' ? bendTargets(exercise) : null), [exercise, mode]);

  const [listening, setListening] = useState(false);
  const [error, setError] = useState('');
  const [pitch, setPitch] = useState(null);
  const [timing, setTiming] = useState(null);
  const [bendRead, setBendRead] = useState(null);
  const [bendHits, setBendHits] = useState(0);
  const [vibrato, setVibrato] = useState(null);
  const [latency, setLatency] = useState(getCalibratedLatency);
  const [calibrating, setCalibrating] = useState(false);
  const [calibrationNote, setCalibrationNote] = useState('');
  const [recording, setRecording] = useState(false);
  const [takeUrl, setTakeUrl] = useState('');

  const micRef = useRef(null);
  const onsetsRef = useRef([]);
  const trackRef = useRef([]);
  const holdRef = useRef({ since: null, counted: false });
  const recorderRef = useRef(null);
  const live = useRef({});
  live.current = { bpm, notesPerBeat, metronome, latency, mode, bend, calibrating };

  // New tempo = new grid: old onsets no longer mean anything.
  useEffect(() => { onsetsRef.current = []; setTiming(null); }, [bpm, metronome.running]);

  useEffect(() => {
    if (!listening) return undefined;
    let raf = 0;
    let cancelled = false;
    let detector = null;
    let frame = 0;

    openMic().then((mic) => {
      if (cancelled) { mic.close(); return; }
      micRef.current = mic;
      detector = createOnsetDetector({ sampleRate: mic.sampleRate });
      const loop = () => {
        const { bpm: liveBpm, notesPerBeat: npb, metronome: metro, latency: lat, mode: liveMode, bend: liveBend } = live.current;
        const { window: win, fresh, freshStart, now } = mic.read();
        frame += 1;

        if (fresh.length) {
          const found = detector.push(fresh, freshStart);
          if (found.length && metro.running) {
            onsetsRef.current.push(...found);
            if (onsetsRef.current.length > 96) onsetsRef.current = onsetsRef.current.slice(-96);
          }
        }

        // Pitch every other frame is plenty and halves the CPU cost.
        if (frame % 2 === 0) {
          const found = detectPitch(win.subarray(win.length - 2048), mic.sampleRate);
          const good = found && found.clarity > 0.75 ? found : null;
          setPitch(good ? describePitch(good.freq) : null);

          if (liveMode === 'bend' && liveBend) {
            if (good) {
              const status = bendStatus(good.freq, liveBend.baseFreq, liveBend.semitones);
              setBendRead(status);
              const hold = holdRef.current;
              if (status.inTune) {
                if (hold.since == null) hold.since = now;
                if (!hold.counted && now - hold.since >= 0.5) { hold.counted = true; setBendHits((n) => n + 1); }
              } else { hold.since = null; hold.counted = false; }
            } else { setBendRead(null); holdRef.current = { since: null, counted: false }; }
          }

          if (liveMode === 'vibrato') {
            if (good) trackRef.current.push({ t: now, freq: good.freq });
            trackRef.current = trackRef.current.filter((p) => now - p.t <= 2.5);
            if (frame % 10 === 0) setVibrato(analyzeVibrato(trackRef.current));
          }
        }

        if (frame % 15 === 0 && metro.running && !live.current.calibrating) {
          const clicks = metro.getClicks();
          const gridStart = clicks.at(-1);
          if (gridStart != null) {
            const useLatency = lat ?? reportedOutputLatency(mic.ctx);
            setTiming(scoreTiming(onsetsRef.current, { bpm: liveBpm, notesPerBeat: npb, gridStart, latency: useLatency }));
          }
        }
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
    }).catch((err) => {
      setError(err?.name === 'NotAllowedError' ? 'Microphone permission was denied. Allow it in the browser address bar and try again.' : (err?.message || 'Could not open the microphone.'));
      setListening(false);
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      if (recorderRef.current?.state === 'recording') recorderRef.current.stop();
      micRef.current?.close();
      micRef.current = null;
      setPitch(null);
    };
  }, [listening]);

  useEffect(() => () => { if (takeUrl) URL.revokeObjectURL(takeUrl); }, [takeUrl]);

  // Pass the measurement up so a rep can be logged with what the mic heard.
  useEffect(() => {
    if (!onSuggest) return;
    if (mode === 'timing' && timing) onSuggest({ result: suggestResult(timing), measured: { spreadMs: timing.spreadMs, biasMs: timing.biasMs, pocket: timing.inPocketPct } });
    else if (mode === 'bend' && bendRead) onSuggest({ result: null, measured: { bendCents: bendRead.centsFromTarget } });
    else if (mode === 'vibrato' && vibrato?.cycles >= 3) onSuggest({ result: null, measured: { vibRate: vibrato.rateHz, vibDepth: vibrato.depthCents, vibEven: vibrato.evenness } });
    else onSuggest(null);
  }, [timing, bendRead, vibrato, mode, onSuggest]);

  // Calibration: play the click through the speakers, let the mic hear it, and
  // measure the round trip. After this, early/late readings are trustworthy.
  const calibrate = () => {
    if (!listening || calibrating) return;
    setCalibrating(true);
    setCalibrationNote('Listening to the click for 5 seconds. Use speakers, stay quiet.');
    onsetsRef.current = [];
    if (!metronome.running) metronome.start();
    setTimeout(() => {
      const measured = estimateLatency(metronome.getClicks(), onsetsRef.current);
      metronome.stop();
      onsetsRef.current = [];
      setCalibrating(false);
      if (measured == null) {
        setCalibrationNote('Could not hear the click clearly. Turn the volume up, use speakers (not headphones), and try again.');
      } else {
        setCalibratedLatency(measured);
        setLatency(measured);
        setCalibrationNote(`Calibrated: ${Math.round(measured * 1000)} ms speaker-to-mic delay saved for this device.`);
      }
    }, 5000);
  };

  const toggleRecording = () => {
    const mic = micRef.current;
    if (!mic) return;
    if (recording) { recorderRef.current?.stop(); return; }
    const chunks = [];
    const recorder = new MediaRecorder(mic.stream);
    recorder.ondataavailable = (event) => { if (event.data.size) chunks.push(event.data); };
    recorder.onstop = () => {
      setRecording(false);
      if (chunks.length) setTakeUrl(URL.createObjectURL(new Blob(chunks, { type: recorder.mimeType || 'audio/webm' })));
    };
    recorderRef.current = recorder;
    setTakeUrl('');
    recorder.start();
    setRecording(true);
  };

  const modeLabel = { timing: 'Timing check', bend: 'Bend check', vibrato: 'Vibrato check', pitch: 'Pitch check', none: 'Tuner' }[mode];

  return (
    <section className="rounded-2xl border border-gray-700 bg-gray-800/70 p-4" aria-label="Microphone feedback">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="text-[10px] font-bold uppercase tracking-[2px] text-teal-400">Listen</div>
          <div className="text-sm font-bold text-gray-100">{modeLabel}</div>
        </div>
        <button
          type="button"
          disabled={!support.ok}
          onClick={() => { setError(''); setListening((v) => !v); }}
          className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 ${listening ? 'bg-rose-600 text-white hover:bg-rose-500' : 'bg-gray-700 text-gray-100 hover:bg-gray-600'} disabled:cursor-not-allowed disabled:bg-gray-800 disabled:text-gray-600`}
        >
          {listening ? <MicOff size={16} aria-hidden="true" /> : <Mic size={16} aria-hidden="true" />}
          {listening ? 'Stop listening' : 'Turn on mic'}
        </button>
      </div>

      {!support.ok && <p className="mt-3 text-xs leading-relaxed text-amber-300">{support.reason}</p>}
      {error && <p className="mt-3 text-xs leading-relaxed text-rose-300" role="alert">{error}</p>}
      {!listening && support.ok && !error && (
        <p className="mt-3 text-xs leading-relaxed text-gray-500">
          Optional. Audio is analyzed in this page only and never uploaded. Grade yourself by ear either way; the mic keeps the grade honest.
        </p>
      )}

      {listening && (
        <div className="mt-4 space-y-4">
          {/* Tuner readout, always on */}
          <div className="grid grid-cols-[auto_1fr] items-center gap-3">
            <div className="w-20 text-center">
              <div className="text-3xl font-bold text-white">{pitch ? pitch.name : '–'}<span className="text-base text-gray-500">{pitch ? pitch.octave : ''}</span></div>
              <div className="text-[11px] tabular-nums text-gray-500">{pitch ? `${pitch.cents > 0 ? '+' : ''}${pitch.cents} cents` : 'play a note'}</div>
            </div>
            <Needle cents={pitch ? pitch.cents : null} okWithin={8} />
          </div>

          {mode === 'timing' && (
            <div className="space-y-2">
              {!metronome.running && <p className="text-xs text-gray-400">Start the click, then play. Scoring begins after four notes.</p>}
              {metronome.running && !timing && <p className="text-xs text-gray-400">Listening for notes at {notesPerBeat} per click…</p>}
              {timing && (
                <>
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                    <Stat label="Steadiness" value={timing.grade} tone={GRADE_STYLE[timing.grade]} hint={`±${timing.spreadMs} ms spread`} />
                    <Stat label="In the pocket" value={`${timing.inPocketPct}%`} hint={`within ${timing.windowMs} ms`} />
                    <Stat label="Tendency" value={timing.tendency} hint={`${timing.biasMs > 0 ? '+' : ''}${timing.biasMs} ms${latency == null ? ' (uncalibrated)' : ''}`} />
                    <Stat label="Notes heard" value={timing.count} hint={`at ${bpm} BPM`} />
                  </div>
                  <p className="text-[11px] leading-relaxed text-gray-500">
                    Steadiness is the number to trust: it does not depend on device delay. Tendency (rushing or dragging) needs calibration to be exact.
                  </p>
                </>
              )}
              <div className="flex flex-wrap items-center gap-2">
                <button type="button" onClick={calibrate} disabled={calibrating} className="rounded-lg border border-gray-600 px-3 py-1.5 text-xs font-semibold text-gray-300 hover:border-teal-600 hover:text-teal-200 disabled:text-gray-600">
                  {calibrating ? 'Calibrating…' : latency == null ? 'Calibrate delay' : `Recalibrate (${Math.round(latency * 1000)} ms)`}
                </button>
                <span className="text-[11px] text-gray-500">Wear headphones for the click while scoring, or the mic hears the click as notes.</span>
              </div>
              {calibrationNote && <p className="text-[11px] text-gray-400">{calibrationNote}</p>}
            </div>
          )}

          {mode === 'bend' && bend && (
            <div className="space-y-2">
              <div className="flex items-baseline justify-between text-xs text-gray-400">
                <span>Bend {bend.baseName} up to <span className="font-bold text-gray-100">{bend.targetName}</span> ({bend.semitones === 1 ? 'half step' : `${bend.semitones / 2 === 1 ? 'whole step' : `${bend.semitones} frets`}`})</span>
                <span className="tabular-nums">{bendRead ? `${bendRead.centsFromTarget > 0 ? '+' : ''}${bendRead.centsFromTarget} cents` : ''}</span>
              </div>
              <Needle cents={bendRead ? bendRead.centsFromTarget : null} range={100} okWithin={15} />
              <div className="flex items-center justify-between text-xs">
                <span className={bendRead?.inTune ? 'font-bold text-emerald-300' : 'text-gray-400'}>
                  {!bendRead ? 'Play the bend.' : bendRead.inTune ? 'In tune. Hold it.' : bendRead.sharp ? 'Sharp: you pushed past the target.' : bendRead.progress < 0.15 ? 'Unbent note heard. Now push.' : 'Flat: keep pushing.'}
                </span>
                <span className="text-gray-400">Bends landed and held: <span className="font-bold tabular-nums text-white">{bendHits}</span></span>
              </div>
              <p className="text-[11px] text-gray-500">Tune first: the target is measured from standard tuning, so an out-of-tune string reads as a missed bend.</p>
            </div>
          )}

          {mode === 'vibrato' && (
            <div className="space-y-2">
              {(!vibrato || vibrato.cycles < 3) && <p className="text-xs text-gray-400">Hold one note and add vibrato for two seconds.</p>}
              {vibrato && vibrato.cycles >= 3 && (
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                  <Stat label="Rate" value={`${vibrato.rateHz}/s`} hint={`${bpm} BPM, 2 per click = ${(bpm / 30).toFixed(1)}/s`} />
                  <Stat label="Width" value={`${vibrato.depthCents}¢`} hint={vibrato.depthCents < 25 ? 'narrow: go wider' : 'good width'} tone={vibrato.depthCents < 25 ? 'text-amber-300' : 'text-white'} />
                  <Stat label="Evenness" value={`${Math.round(vibrato.evenness * 100)}%`} tone={vibrato.evenness >= 0.75 ? 'text-emerald-300' : 'text-amber-300'} />
                  <Stat label="Returns to pitch" value={vibrato.returnsToPitch ? 'yes' : 'no'} tone={vibrato.returnsToPitch ? 'text-emerald-300' : 'text-amber-300'} hint={vibrato.returnsToPitch ? '' : 'note is staying sharp'} />
                </div>
              )}
            </div>
          )}

          {recorderSupported() && (
            <div className="flex flex-wrap items-center gap-3 border-t border-gray-700 pt-3">
              <button type="button" onClick={toggleRecording} className={`flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-bold ${recording ? 'bg-rose-600 text-white' : 'bg-gray-700 text-gray-200 hover:bg-gray-600'}`}>
                {recording ? <Square size={13} aria-hidden="true" /> : <Circle size={13} className="text-rose-400" aria-hidden="true" />}
                {recording ? 'Stop and listen back' : 'Record a take'}
              </button>
              {takeUrl ? <audio controls src={takeUrl} className="h-9 min-w-0 flex-1" /> : <span className="text-[11px] text-gray-500">Hearing yourself back is the fastest honest feedback there is. Takes are not saved.</span>}
            </div>
          )}
        </div>
      )}
    </section>
  );
}
