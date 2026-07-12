import { OPEN_STRING_MIDI, NOTE_NAMES, STRING_NAMES } from './guitarScales';

// Tab string labels map to a string index: high e = 0 … low E = 5.
// Case matters — lowercase 'e' is the high string, uppercase 'E' is the low one.
const LABEL_TO_STRING = { e: 0, B: 1, G: 2, D: 3, A: 4, E: 5 };

export function noteNameForPos(stringIdx, fret) {
  return NOTE_NAMES[(OPEN_STRING_MIDI[stringIdx] + fret) % 12];
}

export function stringLabel(stringIdx) {
  return STRING_NAMES[stringIdx];
}

// Decide play order for a tab's note events.
//
// Normally that's simply left→right by column — correct for chords, rolls,
// riffs, and arpeggios. But open-position scale runs are often drawn as a
// compressed diagonal "staircase," where the next string's first note sits a
// column LEFT of the current string's last note, so pure column order swaps a
// pair at every string crossing (E F# A G# … instead of E F# G# A …).
//
// We detect a clean scalar staircase — single-note, one contiguous column
// cluster per string, strings stepping monotonically, and strictly monotonic in
// pitch when read string-by-string — and order it string-by-string. Anything
// that isn't unambiguously that keeps column order.
function orderEvents(events) {
  const byCol = [...events].sort((a, b) => a.col - b.col);

  // Any two notes sharing a column → chordal; keep column order.
  for (let i = 1; i < byCol.length; i++) if (byCol[i].col === byCol[i - 1].col) return byCol;

  // Bucket by string; each string must be a single contiguous cluster.
  const GAP_MAX = 4;
  const byString = new Map();
  for (const e of events) {
    if (!byString.has(e.stringIdx)) byString.set(e.stringIdx, []);
    byString.get(e.stringIdx).push(e);
  }
  const strings = [];
  for (const [si, evs] of byString) {
    const sorted = [...evs].sort((a, b) => a.col - b.col);
    for (let i = 1; i < sorted.length; i++) if (sorted[i].col - sorted[i - 1].col > GAP_MAX) return byCol;
    strings.push({ si, minCol: sorted[0].col, evs: sorted });
  }
  if (strings.length < 2) return byCol;

  // Strings must step monotonically by entry column (a clean diagonal).
  strings.sort((a, b) => a.minCol - b.minCol);
  const dir = Math.sign(strings[1].si - strings[0].si);
  if (dir === 0) return byCol;
  for (let i = 1; i < strings.length; i++)
    if (Math.sign(strings[i].si - strings[i - 1].si) !== dir) return byCol;

  // Read string-by-string; accept only if that yields a strictly monotonic pitch line.
  const grouped = strings.flatMap((s) => s.evs);
  const midi = (e) => OPEN_STRING_MIDI[e.stringIdx] + e.fret;
  const pdir = Math.sign(midi(grouped[1]) - midi(grouped[0]));
  if (pdir === 0) return byCol;
  for (let i = 1; i < grouped.length; i++)
    if (Math.sign(midi(grouped[i]) - midi(grouped[i - 1])) !== pdir) return byCol;

  return grouped;
}

// Parse one ASCII guitar-tab block into timed, playable steps.
//
// Returns { playable, steps, minFret, maxFret, hasOpen, stringsUsed }
//   steps:  [{ notes: [{ stringIdx, fret, midi, bendTo }] }]  in play order.
//           A step with >1 note is a chord / double-stop played together.
//
// Non-tab text (strum charts, chord-name grids, arrows) has no string-label
// lines and comes back { playable:false } so callers render it as plain text.
export function parseTab(raw) {
  if (!raw || typeof raw !== 'string') {
    return { playable: false, steps: [], minFret: 0, maxFret: 0, hasOpen: false, stringsUsed: [] };
  }

  const events = []; // flat { stringIdx, fret, col, bendTo }
  const stringsUsed = new Set();
  let stringLineCount = 0;

  for (const line of raw.split('\n')) {
    const m = line.match(/^\s*([eBGDAE])\s*\|(.*)$/);
    if (!m) continue;
    const stringIdx = LABEL_TO_STRING[m[1]];
    if (stringIdx === undefined) continue;
    stringLineCount++;
    stringsUsed.add(stringIdx);

    // Trim trailing prose ("--5--   E, the 4th") — the tab grid never uses
    // 2+ spaces before content, so that's a reliable cut point.
    let content = m[2];
    const prose = content.search(/\s{2,}\S/);
    if (prose !== -1) content = content.slice(0, prose);

    for (let c = 0; c < content.length; c++) {
      const ch = content[c];
      if (ch < '0' || ch > '9') continue;

      // Read the full (possibly multi-digit) fret number.
      let num = ch;
      let j = c + 1;
      while (j < content.length && content[j] >= '0' && content[j] <= '9') num += content[j++];

      // A bend ("7b9") targets a higher pitch on the SAME string — merge it
      // so the "9" isn't misread as a separate note.
      let bendTo = null;
      if (content[j] === 'b') {
        let k = j + 1, b = '';
        while (k < content.length && content[k] >= '0' && content[k] <= '9') b += content[k++];
        if (b) { bendTo = parseInt(b, 10); j = k; }
      }

      events.push({ stringIdx, fret: parseInt(num, 10), col: c, bendTo });
      c = j - 1; // skip what we consumed
    }
  }

  if (stringLineCount < 1 || events.length < 1) {
    return { playable: false, steps: [], minFret: 0, maxFret: 0, hasOpen: false, stringsUsed: [] };
  }

  // Order events (column order, or string-by-string for a scalar staircase),
  // then group any that share a column into a simultaneous step (chord).
  const ordered = orderEvents(events);
  const steps = [];
  let curCol = null, cur = null;
  let minFret = Infinity, maxFret = -Infinity, hasOpen = false;

  for (const ev of ordered) {
    if (ev.fret === 0) hasOpen = true;
    else { minFret = Math.min(minFret, ev.fret); maxFret = Math.max(maxFret, ev.fret); }
    const note = {
      stringIdx: ev.stringIdx,
      fret: ev.fret,
      midi: OPEN_STRING_MIDI[ev.stringIdx] + ev.fret,
      bendTo: ev.bendTo,
    };
    if (ev.col === curCol) {
      cur.notes.push(note);
    } else {
      cur = { notes: [note] };
      steps.push(cur);
      curCol = ev.col;
    }
  }

  if (minFret === Infinity) { minFret = 0; maxFret = Math.max(maxFret, 0); }
  if (maxFret === -Infinity) maxFret = 0;

  return {
    playable: true,
    steps,
    minFret,
    maxFret,
    hasOpen,
    stringsUsed: [...stringsUsed].sort((a, b) => a - b),
  };
}
