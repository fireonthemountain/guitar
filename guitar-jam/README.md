# Guitar Practice — Scales & the 90-Day Jam

The two guitar apps, combined: **daily-guitar-scales'** interactive engine (Web Audio
synthesis, metronome, tappable fretboard) driving **dead90's** 90-day Grateful Dead
curriculum. One app, two modes, a shared engine — and **every tab is now playable**.

## What's combined

| From | Contribution |
|------|--------------|
| `daily-guitar-scales` | React/Vite/Tailwind build, Web Audio synth (plucked guitar + piano), lookahead metronome, interactive fretboard/piano, PWA + Docker deploy |
| `dead90` | The 90-day curriculum (`src/data/curriculum.json`) — 13 weeks of lessons, tabs, terms, 40-min session blocks, chord charts, strum patterns, milestones, progress ring, notes, export/import |

## One integrated flow

The app *is* the 90-day program — "Ninety Days to the Jam" — with the daily-scales
engine woven through it. Each day, top to bottom:

- **Warm-up · Scale of the day** — an interactive scale drill (rotates through the
  scales the program leans on). Pick any key/scale, see it on the shared fretboard with
  box positions, play it at tempo. (This is the old Daily Scales tool, folded in.)
- **Lesson** — plain-language teaching with playable tabs.
- **Today's focus** + numbered steps + playable day tabs.
- **40-minute session blocks** — checkable.
- **Practice tools** — global tab-playback settings (loops, count-in, tempo trainer),
  a metronome, and a **backing-vamp player** (E7 drone, Fire B–A, Franklin's, folk, 12-bar
  blues) to solo over.
- **Progress** — the 90-day ring, phase tracker, milestones, practice notes, and a
  **streak + 12-week activity heatmap**.

Global **volume** lives in the header; everything (notes, chords, metronome) routes
through one master gain.

## The headline feature: playable tabs

Every ASCII tab in the curriculum is parsed into notes (`src/utils/tabParser.js`) and rendered by `TabBlock`:

- A **▶ Play** button sounds the tab through the guitar synth at an adjustable BPM,
  honoring the global loop count, count-in, and tempo-trainer settings.
- The **same fretboard** the warm-up uses sits above the tab and lights each note as it
  plays; tap any dot to hear it.
- The raw ASCII stays below (players still read tab).

The parser handles single-note runs, chords/double-stops (vertical stacks → strums),
bends (`7b9`), muted strings (`x`), and multi-digit frets (`10`, `12`, `14`). Pure-text
diagrams (strum-pattern charts, `| B . . . |` vamps, arrow lists) are detected and left as
plain text. 34 of the curriculum's 40 tab blocks are playable; the other 6 are those text
diagrams.

## Develop / build

```bash
npm install
npm run dev       # http://localhost:5173 (exposed on the LAN via host:true)
npm run build     # -> dist/, static-hostable
npm run preview
```

Deploy: static host (`dist/`), or the included `Dockerfile` + `nginx.conf`. Progress for
both modes lives in `localStorage` (the 90-day program reuses the `dead90` key, so progress
from the standalone dead90 app carries over). The program's Export/Import buttons move
progress between devices.

## Known caveat

A few of the open-position scale tabs (e.g. E Mixolydian) are drawn as a compressed
diagonal "staircase," where one note on a lower string sits a column left of the next note
on a higher string. Read strictly by column (standard tab semantics — correct for banjo
rolls, riffs, and chords), this swaps one adjacent pair at a string crossing. The fretboard
positions are all correct; only the playback order of that one pair differs. Left as-is
because column ordering is right for the overwhelming majority of tabs.
