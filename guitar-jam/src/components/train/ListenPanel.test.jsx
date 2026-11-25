import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { act } from 'react';
import { createRoot } from 'react-dom/client';
import ListenPanel from './ListenPanel';
import { openMic } from '../../utils/micInput';
import { createOnsetDetector } from '../../utils/timingAnalysis';

vi.mock('../../utils/micInput', () => ({
  getCalibratedLatency: () => 0, setCalibratedLatency: vi.fn(), micSupport: () => ({ ok: true }),
  openMic: vi.fn(), recorderSupported: () => false, reportedOutputLatency: () => 0,
}));
vi.mock('../../utils/timingAnalysis', async (original) => ({ ...await original(), createOnsetDetector: vi.fn() }));
globalThis.IS_REACT_ACT_ENVIRONMENT = true;
let root;
let host;
let frame;
const metro = { running: true, getClicks: () => [0, 0.5, 1], start: vi.fn() };
const exercise = { feedback: { mode: 'timing', notesPerBeat: 2 } };
beforeEach(() => {
  host = document.createElement('div'); document.body.appendChild(host); root = createRoot(host);
  vi.stubGlobal('requestAnimationFrame', vi.fn((callback) => { frame = callback; return 1; }));
  vi.stubGlobal('cancelAnimationFrame', vi.fn());
  openMic.mockResolvedValue({ sampleRate: 44100, ctx: {}, close: vi.fn(), read: () => ({ window: new Float32Array(2048), fresh: new Float32Array(256), freshStart: 0, now: 1.1 }) });
});
afterEach(async () => { await act(async () => root.unmount()); host.remove(); });
const render = async (onSuggest, bpm = 120) => act(async () => root.render(<ListenPanel exercise={exercise} bpm={bpm} metronome={metro} onSuggest={onSuggest} />));
const click = async (text) => act(async () => [...host.querySelectorAll('button')].find((b) => b.textContent.includes(text)).click());
const frames = async () => { for (let i = 0; i < 15; i += 1) await act(async () => frame()); };

describe('live microphone suggestion lifecycle', () => {
  it('clears the previous grade when the microphone is stopped or the tempo changes', async () => {
    createOnsetDetector.mockReturnValue({ push: vi.fn().mockReturnValueOnce([0.25, 0.5, 0.75, 1]).mockReturnValue([]) });
    const suggest = vi.fn();
    await render(suggest);
    await click('Turn on mic');
    await frames();
    expect(suggest).toHaveBeenLastCalledWith(expect.objectContaining({ result: 'clean' }));
    await render(suggest, 100);
    expect(suggest).toHaveBeenLastCalledWith(null);
    await click('Stop listening');
    expect(suggest).toHaveBeenLastCalledWith(null);
  });
  it('shows insufficient input instead of suggesting a grade for silence', async () => {
    createOnsetDetector.mockReturnValue({ push: () => [] });
    const suggest = vi.fn();
    await render(suggest);
    await click('Turn on mic');
    await frames();
    expect(host.textContent).toContain('Not enough recent notes');
    expect(suggest).not.toHaveBeenCalledWith(expect.objectContaining({ result: 'clean' }));
  });
});
