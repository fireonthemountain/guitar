import { afterEach, describe, expect, it, vi } from 'vitest';
import { act } from 'react';
import { createRoot } from 'react-dom/client';
import SyncCard from './SyncCard';

globalThis.IS_REACT_ACT_ENVIRONMENT = true;
let root;
let host;
afterEach(async () => { if (root) await act(async () => root.unmount()); host?.remove(); root = null; host = null; });
const render = async () => {
  host = document.createElement('div'); document.body.appendChild(host); root = createRoot(host);
  await act(async () => root.render(<SyncCard />));
};
const seed = (hasConflict) => {
  localStorage.setItem('stage90-sync', JSON.stringify({ url: 'https://example.test/api', token: 'a'.repeat(48), enabled: true, hasConflict }));
  localStorage.setItem('stage90-sync-conflict', JSON.stringify({ local: { startDate: '2026-11-24' }, remote: { startDate: '2026-11-20' } }));
};
describe('sync recovery choices', () => {
  it('keeps recovery downloads available after a conflict is resolved', async () => {
    seed(false);
    await render();
    expect(host.textContent).toContain('Download this device’s copy');
    expect(host.textContent).toContain('Download cloud copy');
    expect([...host.querySelectorAll('button')].some((button) => button.textContent === 'Use this device')).toBe(false);
  });
  it('offers an explicit choice while retaining both recovery downloads', async () => {
    seed(true);
    await render();
    expect(host.textContent).toContain('Use this device');
    expect(host.textContent).toContain('Use cloud copy');
    expect(host.textContent).toContain('Download cloud copy');
  });
  it('explains an unavailable backend without exposing a technical error as success', async () => {
    seed(false);
    localStorage.setItem('stage90', JSON.stringify({ startDate: '2026-11-24', _updatedAt: 100, _revision: 1, _deviceId: 'test' }));
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response('{}', { status: 503 })));
    await render();
    await act(async () => [...host.querySelectorAll('button')].find((b) => b.textContent.includes('Push now')).click());
    expect(host.textContent).toContain('Cloud storage is unavailable or not connected yet');
    expect(host.textContent).not.toContain('Progress uploaded.');
    expect(JSON.parse(localStorage.getItem('stage90')).startDate).toBe('2026-11-24');
  });
});
