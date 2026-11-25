import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { act } from 'react';
import { createRoot } from 'react-dom/client';
import TrainPage from './TrainPage';
import { STAGE90_KEY } from '../utils/stage90';

globalThis.IS_REACT_ACT_ENVIRONMENT = true;

let host;
let root;

const render = async () => {
  host = document.createElement('div');
  document.body.appendChild(host);
  root = createRoot(host);
  await act(async () => { root.render(<TrainPage />); });
};
const button = (text) => [...host.querySelectorAll('button')].find((b) => b.textContent.includes(text));
const click = async (text) => { await act(async () => { button(text).dispatchEvent(new MouseEvent('click', { bubbles: true })); }); };
const stored = () => JSON.parse(localStorage.getItem(STAGE90_KEY));

beforeEach(() => { window.scrollTo = () => {}; });
afterEach(async () => { await act(async () => root.unmount()); host.remove(); });

describe('Train page', () => {
  it('shows a balanced first-day queue with a reason for every item', async () => {
    await render();
    const items = [...host.querySelectorAll('ol > li')];
    expect(items).toHaveLength(6);
    expect(items.filter((li) => li.textContent.includes('electric'))).toHaveLength(3);
    expect(items.filter((li) => li.textContent.includes('acoustic'))).toHaveLength(3);
    expect(items.every((li) => li.textContent.includes('New: first step in'))).toBe(true);
  });

  it('filters the queue by instrument and remembers the choice', async () => {
    await render();
    await click('Electric');
    const items = [...host.querySelectorAll('ol > li')];
    expect(items.every((li) => li.textContent.includes('electric'))).toBe(true);
    expect(stored().gym.instrument).toBe('electric');
    await click('15 min');
    expect(host.querySelectorAll('ol > li')).toHaveLength(3);
    expect(stored().gym.minutes).toBe(15);
  });

  it('runs a session: three clean passes climb the ladder, and the session is logged', async () => {
    await render();
    await click('Electric');
    await click('Start session');
    expect(host.textContent).toContain('Single-string sixteenths');
    expect(host.textContent).toContain('Start click at 60');

    await click('Clean');
    await click('Clean');
    expect(host.textContent).toContain('Start click at 60');
    await click('Clean');
    expect(host.textContent).toContain('Clean. Up to 64 BPM.');
    expect(host.textContent).toContain('Start click at 64');

    await click('Missed');
    await click('Missed');
    expect(host.textContent).toContain('Back to 60 BPM');

    const item = stored().gym.items['e-ap-single-string'];
    expect(item).toMatchObject({ bpm: 60, bestCleanBpm: 60, reps: 5, cleanReps: 3 });
    expect(stored().gym.log).toHaveLength(5);

    await click('Next exercise');
    expect(host.textContent).toContain('2 of 5');
    expect(stored().gym.items['e-ap-single-string'].dueDate).toBeTruthy();

    await act(async () => { host.querySelector('button[aria-label="End session"]').dispatchEvent(new MouseEvent('click', { bubbles: true })); });
    expect(host.textContent).toContain('Session logged at');
    expect(host.textContent).toMatch(/Session logged at \d{1,2}:\d{2} (AM|PM)/); // 12-hour clock
    expect(host.textContent).toContain('3 clean of 5 passes');
    expect(stored().gym.sessions).toHaveLength(1);
    expect(stored().gym.sessions[0]).toMatchObject({ items: 1, clean: 3, total: 5 });
  });

  it('keeps tempo, click and grading in a sticky bar for phones, wired to the same ladder', async () => {
    await render();
    await click('Electric');
    await click('Start session');
    const bar = host.querySelector('[data-testid="runner-action-bar"]');
    expect(bar.className).toContain('sticky');
    expect(bar.className).toContain('lg:hidden'); // the two-column card takes over on desktop
    expect(host.querySelector('[data-testid="runner-desktop-controls"]').className).toContain('lg:block');
    const inBar = (label) => [...bar.querySelectorAll('button')].find((b) => (b.getAttribute('aria-label') || b.textContent).includes(label));
    for (const label of ['Start click at 60', 'Clean', 'Shaky', 'Missed', 'Next exercise']) expect(inBar(label), label).toBeTruthy();
    // every control in the bar is a full-size tap target (44px or more)
    for (const b of bar.querySelectorAll('button')) expect(b.className).toMatch(/min-h-(12|\[3\.25rem\])/);

    for (let i = 0; i < 3; i++) await act(async () => { inBar('Clean').dispatchEvent(new MouseEvent('click', { bubbles: true })); });
    expect(bar.textContent).toContain('Clean. Up to 64 BPM.');
    expect(bar.textContent).toContain('64');
    expect(stored().gym.items['e-ap-single-string']).toMatchObject({ bpm: 64, bestCleanBpm: 60, reps: 3 });

    await act(async () => { inBar('Next exercise').dispatchEvent(new MouseEvent('click', { bubbles: true })); });
    expect(host.textContent).toContain('2 of 5');
  });

  it('keeps existing program progress intact while training', async () => {
    localStorage.setItem(STAGE90_KEY, JSON.stringify({ startDate: '2026-09-01', program: { completed: [1, 2, 3] } }));
    await render();
    await click('Start session');
    await click('Shaky');
    expect(stored().program.completed).toEqual([1, 2, 3]);
    expect(stored().startDate).toBe('2026-09-01');
    expect(stored().gym.log).toHaveLength(1);
  });

  it('shows benchmarks with a row for every exercise and explains an unavailable mic', async () => {
    await render();
    await click('Benchmarks');
    expect(host.querySelectorAll('tbody tr').length).toBeGreaterThanOrEqual(25);
    expect(host.textContent).toContain('Progress to target tempo, by skill area');
    await click('Practice'); // first row
    expect(host.textContent).toContain('Single-string sixteenths');
    // jsdom is not a secure context with a mic: the panel must say why, not break.
    expect(button('Turn on mic').disabled).toBe(true);
    expect(host.textContent).toMatch(/microphone/i);
  });
});
