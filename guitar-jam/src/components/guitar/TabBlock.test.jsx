import { afterEach, describe, expect, it, vi } from 'vitest';
import { act } from 'react';
import { createRoot } from 'react-dom/client';
import TabBlock from './TabBlock';
import { playTab } from '../../utils/audioEngine';

vi.mock('../../utils/audioEngine', async (original) => ({ ...await original(), playTab: vi.fn(), cancelScale: vi.fn() }));
globalThis.IS_REACT_ACT_ENVIRONMENT = true;
let root;
let host;
afterEach(async () => { if (root) await act(async () => root.unmount()); host?.remove(); });
const render = async (props) => {
  if (!host) { host = document.createElement('div'); document.body.appendChild(host); root = createRoot(host); }
  await act(async () => root.render(<TabBlock tab={'e|-----|\nB|-5-6-|\nG|-----|\nD|-----|\nA|-----|\nE|-----|'} {...props} />));
};
const play = async () => act(async () => [...host.querySelectorAll('button')].find((b) => b.textContent.includes('Play')).click());

describe('Train tab demonstration tempo', () => {
  it('plays at the ladder tempo and subdivision, and stops the independent click first', async () => {
    const onPlay = vi.fn();
    await render({ tempoBpm: 60, notesPerBeat: 4, onPlay });
    expect(host.textContent).toContain('60 BPM');
    expect(host.textContent).toContain('4 notes per click');
    await play();
    expect(onPlay).toHaveBeenCalledOnce();
    expect(playTab).toHaveBeenLastCalledWith(expect.any(Array), expect.objectContaining({ bpm: 60, notesPerBeat: 4 }), expect.any(Function));
    await render({ tempoBpm: 64, notesPerBeat: 4, onPlay });
    await play();
    expect(playTab).toHaveBeenLastCalledWith(expect.any(Array), expect.objectContaining({ bpm: 64 }), expect.any(Function));
  });
});
