// Microphone plumbing for the Train tab's listening checks. Everything
// analytical lives in pitchDetect.js / timingAnalysis.js; this file only talks
// to the browser.

import { getAudioCtx } from './audioEngine';

const LATENCY_KEY = 'guitar-jam-mic-latency'; // per-device, so not part of synced progress

// Browsers only expose the mic on secure origins: https://, or http://localhost.
// A plain http:// LAN address (http://192.168.x.x:5173) is NOT secure — use
// `npm run dev:https` for LAN/phone access with the mic.
export function micSupport() {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') return { ok: false, reason: 'No browser.' };
  if (!window.isSecureContext) {
    return { ok: false, reason: 'The microphone needs a secure page. Open the app over https (the Vercel site, or run "npm run dev:https" for the LAN address), or use http://localhost on this computer.' };
  }
  if (!navigator.mediaDevices?.getUserMedia) return { ok: false, reason: 'This browser does not offer microphone access.' };
  return { ok: true, reason: '' };
}

export async function openMic() {
  const support = micSupport();
  if (!support.ok) throw new Error(support.reason);
  // Processing off: echo cancellation and noise suppression smear note attacks
  // and bend pitch, which are exactly what is being measured.
  const stream = await navigator.mediaDevices.getUserMedia({
    audio: { echoCancellation: false, noiseSuppression: false, autoGainControl: false },
  });
  const ctx = getAudioCtx();
  const source = ctx.createMediaStreamSource(stream);
  const analyser = ctx.createAnalyser();
  analyser.fftSize = 4096;
  analyser.smoothingTimeConstant = 0;
  source.connect(analyser); // never connected to the speakers: no feedback loop
  const buffer = new Float32Array(analyser.fftSize);
  let lastRead = ctx.currentTime;

  return {
    ctx,
    stream,
    sampleRate: ctx.sampleRate,
    // Latest window of audio (for pitch) plus only the samples that are new
    // since the previous read (for onset detection), with their start time on
    // the AudioContext clock — the same clock the metronome is scheduled on.
    read() {
      analyser.getFloatTimeDomainData(buffer);
      const now = ctx.currentTime;
      const fresh = Math.max(0, Math.min(buffer.length, Math.round((now - lastRead) * ctx.sampleRate)));
      lastRead = now;
      return { window: buffer, fresh: buffer.subarray(buffer.length - fresh), freshStart: now - fresh / ctx.sampleRate, now };
    },
    close() {
      try { source.disconnect(); } catch {}
      stream.getTracks().forEach((track) => track.stop());
    },
  };
}

// Output-side latency the browser knows about. Input latency is unknown until
// calibrated, so uncalibrated early/late readings are approximate.
export function reportedOutputLatency(ctx = getAudioCtx()) {
  return (ctx.outputLatency || 0) + (ctx.baseLatency || 0);
}

export function getCalibratedLatency() {
  try {
    const value = parseFloat(localStorage.getItem(LATENCY_KEY));
    return Number.isFinite(value) && value >= 0 && value < 0.5 ? value : null;
  } catch { return null; }
}

export function setCalibratedLatency(seconds) {
  try {
    if (seconds == null) localStorage.removeItem(LATENCY_KEY);
    else localStorage.setItem(LATENCY_KEY, String(seconds));
  } catch {}
}

export function recorderSupported() {
  return typeof window !== 'undefined' && typeof window.MediaRecorder !== 'undefined';
}
