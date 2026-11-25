import { describe, expect, it, vi } from 'vitest';
import { playTab } from './audioEngine';

const gain = () => ({ gain: { value: 1 }, connect() {}, disconnect() {} });
class TestAudioContext {
  state = 'running';
  currentTime = 0;
  destination = {};
  createGain = gain;
  createDynamicsCompressor() {
    return { ...gain(), ...Object.fromEntries(['threshold', 'knee', 'ratio', 'attack', 'release'].map((k) => [k, { value: 0 }])) };
  }
}

describe('tab playback rhythm', () => {
  it('schedules sixteenths within quarter-note BPM instead of playing one note per beat', () => {
    vi.useFakeTimers();
    vi.setSystemTime(0);
    vi.stubGlobal('AudioContext', TestAudioContext);
    const heard = [];
    playTab(Array.from({ length: 8 }, () => ({ notes: [] })), { bpm: 60, notesPerBeat: 4 }, (step) => { if (step != null) heard.push(Date.now()); });
    vi.advanceTimersByTime(2000);
    expect(heard).toHaveLength(8);
    expect(heard[1] - heard[0]).toBe(250);
    expect(heard.at(-1) - heard[0]).toBe(1750);
  });
  it('retains one-note-per-beat playback for existing course tabs', () => {
    vi.useFakeTimers();
    vi.setSystemTime(0);
    vi.stubGlobal('AudioContext', TestAudioContext);
    const heard = [];
    playTab(Array.from({ length: 4 }, () => ({ notes: [] })), { bpm: 60 }, (step) => { if (step != null) heard.push(Date.now()); });
    vi.advanceTimersByTime(3500);
    expect(heard).toHaveLength(4);
    expect(heard[1] - heard[0]).toBe(1000);
  });
});
