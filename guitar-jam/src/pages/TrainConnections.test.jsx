import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { act } from 'react';
import { createRoot } from 'react-dom/client';
import App from '../App';
import AssessmentPage from './AssessmentPage';
import Stage90ProgramPage from './Stage90ProgramPage';
import { SKILL_TRACKS } from '../data/skillTracks';
import { STAGE90_KEY, dateKey } from '../utils/stage90';
import { addDaysKey, applyBoutEnd, applyRep, emptyGym, flattenExercises, localDateKey, repsToClimb } from '../utils/practiceEngine';

globalThis.IS_REACT_ACT_ENVIRONMENT = true;

const EXERCISES = flattenExercises(SKILL_TRACKS);
const E1 = EXERCISES.find((e) => e.instrument === 'electric' && e.tempo?.startBpm);
const TODAY = localDateKey();

let host;
let root;

const render = async (node) => {
  host = document.createElement('div');
  document.body.appendChild(host);
  root = createRoot(host);
  await act(async () => { root.render(node); });
};
const buttons = () => [...host.querySelectorAll('button')];
const button = (text) => buttons().find((b) => (b.getAttribute('aria-label') || '').includes(text) || b.textContent.includes(text));
const click = async (target) => {
  const el = typeof target === 'string' ? button(target) : target;
  if (!el) throw new Error(`No button "${target}"`);
  await act(async () => { el.dispatchEvent(new MouseEvent('click', { bubbles: true })); });
};
const stored = () => JSON.parse(localStorage.getItem(STAGE90_KEY));
const seed = (blob) => localStorage.setItem(STAGE90_KEY, JSON.stringify(blob));
const q = (id) => host.querySelector(`[data-testid="${id}"]`);

// Progress exactly as saved before Train existed: schema 1, no `gym`, and an
// assessment record with no `train` field.
const preTrainBlob = () => ({
  _schemaVersion: 1,
  startDate: dateKey(new Date()),
  gigDate: addDaysKey(TODAY, 98),
  assessments: { 0: { week: 0, date: TODAY, recordedTake: true, criteria: {}, maxCleanBpm: 72, ratings: { clean: 3, rhythm: 3, memory: 2, confidence: 2, recovery: 3 }, notes: 'old note', score: 44 } },
  program: { completed: [], blocks: { 1: [0] }, notes: { 1: 'G to C drags' }, activity: {} },
  set: [],
});

function sit(gym, exercise, day, results) {
  let next = gym;
  for (const r of results) next = applyRep(next, exercise, r, { today: day, at: 1 }).gym;
  return applyBoutEnd(next, exercise, { clean: results.filter((r) => r === 'clean').length, total: results.length }, day);
}

beforeEach(() => { window.scrollTo = () => {}; });
afterEach(async () => { await act(async () => root.unmount()); host.remove(); });

describe('Today includes the Train queue', () => {
  it('runs assessment focus through Train and retains the original assessment', async () => {
    const original = preTrainBlob();
    original.assessments[0].criteria['w0-change'] = 'fail';
    seed(original);
    await render(<App />);
    const first = q('train-today').querySelector('ol > li');
    expect(first.textContent).toContain('G to C every two beats');
    expect(first.textContent).toContain('assessment focus');
    await click('Start technique');
    expect(host.textContent).toContain('G to C every two beats');
    await click('Clean');
    await click(host.querySelector('button[aria-label="End session"]'));
    await click('Back to Today');
    expect(q('train-today').querySelector('ol > li').textContent).toContain('Done today');
    expect(stored().assessments[0]).toEqual(original.assessments[0]);
  });

  it('preserves legacy Dead 90 progress and shares Train progress on return', async () => {
    const legacy = { completed: [1], blocks: { 2: [0] }, notes: { 2: 'keep this course note' }, activity: {} };
    localStorage.setItem('dead90', JSON.stringify(legacy));
    localStorage.setItem('guitar-jam-program-track', 'dead90');
    await render(<App />);
    expect(q('train-today')).toBeTruthy();
    expect(stored().dead90).toEqual(legacy);
    await click('Start technique');
    await click('Clean');
    await click(host.querySelector('button[aria-label="End session"]'));
    await click('Back to Today');
    expect(q('train-today-count').textContent).toContain('1/');
    expect(stored().dead90).toEqual(legacy);
    expect(JSON.parse(localStorage.getItem('dead90'))).toEqual(legacy);
    expect(stored().gym.log).toHaveLength(1);
  });

  it('shows the technique block with reasons and a time budget on a pre-Train blob', async () => {
    seed(preTrainBlob());
    await render(<Stage90ProgramPage onOpenTrain={() => {}} />);
    const card = q('train-today');
    expect(card).toBeTruthy();
    // Day 1 program blocks total 40 min, so technique gets the other 20 of the hour.
    expect(q('day-minutes').textContent).toContain('60 min');
    expect(q('day-minutes').textContent).toContain('40 program + 20 technique');
    const items = [...card.querySelectorAll('ol > li')];
    expect(items).toHaveLength(4);
    expect(items.every((li) => li.textContent.includes('New: first step in'))).toBe(true);
    expect(q('train-today-count').textContent).toBe('0/4 DONE TODAY');
    expect(button('Start technique · 4 exercises')).toBeTruthy();
    // Loading and showing it changed nothing the old blob held.
    expect(stored().program).toMatchObject({ blocks: { 1: [0] }, notes: { 1: 'G to C drags' } });
    expect(stored().assessments[0]).toEqual(preTrainBlob().assessments[0]);
  });

  it('hands today’s remaining queue to Train with its budget', async () => {
    seed({ ...preTrainBlob(), gym: sit(emptyGym(), E1, TODAY, ['clean', 'miss']) });
    let intent;
    await render(<Stage90ProgramPage onOpenTrain={(value) => { intent = value; }} />);
    expect(q('train-today-count').textContent).toBe('1/4 DONE TODAY');
    expect(q('train-today').textContent).toContain('Done today: 1 clean of 2 passes.');
    await click('Continue technique · 3 left');
    expect(intent).toEqual({ start: 'today', minutes: 20 });
  });

  it('counts Train reps as practice in the last-7-days strip', async () => {
    seed({ ...preTrainBlob(), gym: sit(emptyGym(), E1, TODAY, ['clean']) });
    await render(<Stage90ProgramPage />);
    expect(host.textContent).toContain('1/7 active');
  });

  it('does not show today’s technique block on another day of the course', async () => {
    seed(preTrainBlob());
    await render(<Stage90ProgramPage />);
    expect(q('train-today')).toBeTruthy();
    await click('Next');
    expect(q('train-today')).toBeNull();
    expect(q('day-minutes').textContent).not.toContain('technique');
  });

  it('runs Today → Train → back, and the reps count toward the day', async () => {
    seed(preTrainBlob());
    localStorage.setItem('guitar-jam-view', 'program');
    await render(<App />);
    await click('Start technique · 4 exercises');
    // Straight into the runner on the first queued exercise, 1 of 4.
    expect(host.textContent).toContain('1 of 4');
    const first = stored().gym; // nothing graded yet
    expect(first.log).toHaveLength(0);
    await click('Clean');
    await click('Shaky');
    await click(host.querySelector('button[aria-label="End session"]'));
    expect(host.textContent).toContain('Counted toward today: 1 of 4 technique exercises done.');
    expect(stored().gym.log).toHaveLength(2);
    expect(stored().gym.log.every((entry) => entry.d === TODAY)).toBe(true);

    await click('Back to Today');
    expect(q('train-today-count').textContent).toBe('1/4 DONE TODAY');
    expect(q('train-today').textContent).toContain('Done today: 1 clean of 2 passes.');
    expect(button('Continue technique · 3 left')).toBeTruthy();
    expect(host.textContent).toContain('1/7 active');
    // Program progress from the old blob survived the round trip.
    expect(stored().program).toMatchObject({ blocks: { 1: [0] }, notes: { 1: 'G to C drags' } });
    expect(stored().assessments[0].score).toBe(44);
  });

  it('marks the technique block done once the budget is met', async () => {
    let gym = emptyGym();
    for (const exercise of EXERCISES.filter((e) => e.indexInModule === 0).slice(0, 4)) gym = sit(gym, exercise, TODAY, ['clean']);
    seed({ ...preTrainBlob(), gym });
    await render(<Stage90ProgramPage onOpenTrain={() => {}} />);
    expect(q('train-today-count').textContent).toBe('4/4 DONE TODAY');
    expect(q('train-today').textContent).toContain('Technique is done for today: 4 clean of 4 graded passes.');
    expect(button('Open Train')).toBeTruthy();
    // One of day 1's three program blocks was already ticked; technique makes 2 of 4.
    expect(host.textContent).toContain('Continue practice · 2/4 blocks');
  });
});

describe('Weekly assessment pulls Train results', () => {
  it('loads a pre-Train blob: old history intact, and says there is no Train data yet', async () => {
    seed(preTrainBlob());
    await render(<AssessmentPage />);
    expect(host.textContent).toContain('ASSESSMENT HISTORY');
    expect(host.textContent).toContain('72 BPM');
    expect(q('train-week').textContent).toContain('No Train reps in the last 7 days');
    expect(host.textContent).not.toContain('Train: ');
    expect(stored().assessments[0]).toEqual(preTrainBlob().assessments[0]);
  });

  it('shows benchmark changes against last week per instrument, reviews and weakest items', async () => {
    const step = E1.tempo.stepBpm || 4;
    let gym = sit(emptyGym(), E1, addDaysKey(TODAY, -10), Array(repsToClimb(E1)).fill('clean'));
    gym = sit(gym, E1, addDaysKey(TODAY, -1), [...Array(repsToClimb(E1) * 2).fill('clean'), 'miss']);
    seed({ ...preTrainBlob(), gym });
    await render(<AssessmentPage />);
    const electric = q('train-week-electric');
    expect(electric.textContent).toContain(`+${2 * step} BPM`);
    const row = [...electric.querySelectorAll('tbody tr')].find((tr) => tr.textContent.includes(E1.title));
    expect([...row.querySelectorAll('td')].map((td) => td.textContent)).toEqual([E1.title, String(E1.tempo.startBpm), String(E1.tempo.startBpm + 2 * step), `+${2 * step}`]);
    expect(q('train-week-acoustic').textContent).toContain('Not practiced this week.');
    expect(q('train-week').textContent).toContain('reviews passed');
    expect(q('train-week').textContent).toContain('WEAKEST');
    // The existing G–D–Em–C tempo trend is still there beside it.
    expect(host.textContent).toContain('TEMPO TEST');
  });

  it('saves the Train report with the assessment and leaves older records alone', async () => {
    const blob = preTrainBlob();
    blob.startDate = addDaysKey(TODAY, -8); // now in week 1
    blob.assessments[0].date = addDaysKey(TODAY, -2);
    blob.gym = sit(emptyGym(), E1, addDaysKey(TODAY, -1), Array(repsToClimb(E1)).fill('clean'));
    seed(blob);
    await render(<AssessmentPage />);
    await click('Take the week 1 assessment');
    await click('Next'); // record a take → criteria
    for (const pass of buttons().filter((b) => b.textContent === 'Pass')) await click(pass);
    await click('Next'); // → tempo test, where the Train report sits beside G–D–Em–C
    expect(host.textContent).toContain('G');
    expect(q('train-week').textContent).toContain(E1.title);
    const input = host.querySelector('input[type="number"]');
    await act(async () => {
      Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set.call(input, '84');
      input.dispatchEvent(new Event('input', { bubbles: true }));
    });
    await click('Next');
    await click('Next');
    await click('Save week 1 assessment');

    const saved = stored().assessments;
    expect(saved[1]).toMatchObject({ week: 1, maxCleanBpm: 84 });
    expect(saved[1].train).toMatchObject({ to: TODAY, reps: repsToClimb(E1) });
    expect(saved[1].train.instruments.electric.changes[0]).toMatchObject({ id: E1.id, before: null, after: E1.tempo.startBpm });
    expect(saved[0]).toEqual(blob.assessments[0]); // old record: untouched, still no `train`
    expect(host.textContent).toContain('Train: electric 1 first benchmark');
  });

  it('keeps Train progress when the program is started or an old export is imported', async () => {
    const gym = sit(emptyGym(), E1, TODAY, ['clean']);
    seed({ gym }); // trained before ever setting a gig date
    await render(<AssessmentPage />);
    await click('Start the program');
    expect(stored().startDate).toBeTruthy();
    expect(stored().gym.log).toHaveLength(1);

    window.prompt = () => JSON.stringify(preTrainBlob()); // export from before Train
    window.alert = () => {};
    globalThis.prompt = window.prompt;
    globalThis.alert = window.alert;
    await click('Import progress');
    expect(stored().assessments[0].score).toBe(44);
    expect(stored().gym.log).toHaveLength(1);
  });
});
