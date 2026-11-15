// @vitest-environment node

import { describe, expect, it } from 'vitest';
import { canonicalTitle, classifySource } from './inventory-guitar-library.mjs';

describe('guitar library inventory naming', () => {
  it('normalizes UUID prefixes, copy suffixes, underscores, and extension', () => {
    expect(canonicalTitle('ef8a62a-673b-ffe-1f63-ecd1da4a82_Marty_Music_Guide (1).pdf'))
      .toBe('Marty Music Guide');
  });

  it('classifies common curriculum source families', () => {
    expect(classifySource('/library/Beginner Fingerstyle.pdf')).toBe('fingerstyle');
    expect(classifySource('/library/The CAGED System.pdf')).toBe('fretboard');
    expect(classifySource('/library/Acoustic Blues.pdf')).toBe('blues');
    expect(classifySource('/library/Campfire Songbook.pdf')).toBe('songbook');
  });
});
