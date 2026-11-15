// @vitest-environment node

import { describe, expect, it } from 'vitest';
import { detectChapter, safeSlug } from './extract-pdf-review.mjs';

describe('PDF review extraction helpers', () => {
  it('detects chapter numbers from extracted headings', () => {
    expect(detectChapter('Chapter 12\nBeginner Fingerstyle')).toBe(12);
    expect(detectChapter('No numbered heading')).toBeNull();
  });

  it('creates stable filesystem-safe course slugs', () => {
    expect(safeSlug('/books/Marty Music - Beginner Fingerstyle.pdf'))
      .toBe('marty-music-beginner-fingerstyle');
  });
});
