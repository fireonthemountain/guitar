import { describe, expect, it } from 'vitest';
import { EMPTY_TAB, normalizeOcrTab } from './tabOcr';

describe('normalizeOcrTab', () => {
  it('normalizes common OCR staff characters without inventing notes', () => {
    const result = normalizeOcrTab('e I--0—2--|\nB |--1--3--|\nG |--0--2--|\nD |--2--0--|\nA |--3-----|\nE |--------|');
    expect(result.tab).toContain('e|--0-2--|');
    expect(result.tab).toContain('A|--3-----|');
    expect(result.confidence).toBeCloseTo(5 / 6);
  });

  it('returns an editable blank template when no tab is detected', () => {
    const result = normalizeOcrTab('Verse one: play softly');
    expect(result.tab).toBe(EMPTY_TAB);
    expect(result.confidence).toBe(0);
  });
});
