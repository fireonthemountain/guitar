import { parseTab } from './tabParser';

export const EMPTY_TAB = `e|----------------|
B|----------------|
G|----------------|
D|----------------|
A|----------------|
E|----------------|`;

const LABELS = ['e', 'B', 'G', 'D', 'A', 'E'];

function cleanGrid(value) {
  return value
    .replace(/[—–_~=]/g, '-')
    .replace(/[Il!]/g, '|')
    .replace(/[()\[\]{},.;:'"`]/g, '')
    .replace(/\s+/g, '')
    .replace(/[^0-9|/\\hpbrxX\-]/g, '')
    .replace(/-{2,}/g, (run) => run)
    .slice(0, 240);
}

// OCR frequently confuses staff lines and bar lines. This extracts only groups
// that look like labeled guitar strings; it never invents fret numbers.
export function normalizeOcrTab(text) {
  if (!text || typeof text !== 'string') return { tab: EMPTY_TAB, confidence: 0, warnings: ['No text was recognized.'] };
  const candidates = [];
  for (const raw of text.split(/\r?\n/)) {
    const line = raw.trim();
    const match = line.match(/^([eEBGDA])\s*[|:lI!]?\s*(.*)$/);
    if (!match) continue;
    const body = cleanGrid(match[2]);
    if (!/\d/.test(body) || body.length < 3) continue;
    candidates.push({ rawLabel: match[1], body });
  }

  if (!candidates.length) {
    return { tab: EMPTY_TAB, confidence: 0, warnings: ['No labeled tablature lines were recognized. Enter the frets in the editor.'] };
  }

  const selected = [];
  let cursor = 0;
  for (const label of LABELS) {
    const exact = candidates.findIndex((item, index) => index >= cursor && (label === 'e' ? item.rawLabel.toLowerCase() === 'e' : item.rawLabel.toUpperCase() === label));
    if (exact >= 0) {
      selected.push(`${label}|${candidates[exact].body}`);
      cursor = exact + 1;
    } else selected.push(`${label}|----------------|`);
  }
  const tab = selected.join('\n');
  const recognized = selected.filter((line) => /\d/.test(line)).length;
  const playable = parseTab(tab).playable;
  const warnings = [];
  if (recognized < 6) warnings.push(`OCR found ${recognized} of 6 guitar strings; check the blank lines.`);
  warnings.push('Verify every fret and technique against the screenshot before saving.');
  return { tab, confidence: playable ? recognized / 6 : 0, warnings };
}
