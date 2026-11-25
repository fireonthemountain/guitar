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

## Screenshot to Practice

The **Import** tab provides a complete local-first workflow for turning a screenshot
into a private playable exercise:

1. Choose, photograph, or drag in a music image (15 MB maximum).
2. Run Tesseract OCR in the browser. The OCR runtime/language data may download on
   first use, but the app does not upload the source image to an application server.
3. Compare the proposed six-string ASCII tab with the source and correct every fret.
4. Play the preview, set the starting tempo and add practice notes.
5. Save the image, extraction metadata and reviewed tab together in IndexedDB.

Recognition is deliberately review-first: OCR can propose characters but cannot be
trusted to infer all guitar techniques or rhythm from every screenshot. If a labeled
tab grid cannot be recognized, the app supplies a clean editable six-string template.
Saved imports can be edited, practiced or deleted from the same screen.

## Train: the skill gym

The **Train** tab is where technique gets measurably better. It is separate from the
day-by-day programs and works for both instruments:

- **Electric track**: alternate picking, legato, bends to pitch, vibrato, palm and
  fretting-hand muting, tone and amp control.
- **Acoustic track**: p-i-m-a fingerstyle, Travis picking, strumming dynamics, open
  chord and barre changes, capo transposition, voice-leading.

How a session works:

1. Pick Electric, Acoustic or Both and a length (15 to 60 minutes). The queue is built
   for you: mapped weaknesses from your latest assessment first, then due reviews,
   in-progress items and new exercises. Every item shows why it was chosen.
2. Each exercise runs on a **tempo ladder**. Play a pass, grade it Clean, Shaky or
   Missed. Enough clean passes in a row and the click steps up; two misses and it steps
   down. Your **best clean BPM** is the benchmark.
3. Reaching the target tempo moves the exercise to **spaced review** (3, 7, 15, 33...
   days), and a failed review brings it back the next day.
4. **Benchmarks** shows best clean tempo against target for every exercise, progress per
   skill area for each instrument, four weeks of repetitions, and what is weakest now.

Train is wired into the rest of the Practice Desk:

- **Today** (Stage Ready 90 and Dead 90) includes a **Technique · Train** block:
  the same queue with its reasons, sized to what is left of a 60-minute day (10 to 20
  minutes, never more than the Train session length). *Start technique* opens the runner
  on that queue; graded reps tick the block off and count the day as practiced. Nothing
  extra is stored for this, it is read from the Train log.
- **Progress** shows **Technique this week** beside the G-D-Em-C tempo test: best clean
  BPM now against last week for each instrument, reviews passed and failed, and the
  weakest items. Saving a weekly assessment freezes that report into the record
  (`assessments[week].train`); the score is unchanged and older records without it still load.
- On a phone the runner keeps BPM, click start/stop, Clean / Shaky / Missed and Next in a
  sticky bar above the tab bar, so grading a pass never needs a scroll.

Optional **mic checks** (nothing is uploaded or stored):

| Check | What it measures |
|-------|------------------|
| Tuner | Note name and cents, always on while the mic is on |
| Timing | Note onsets against the click: steadiness (ms spread), percent in the pocket, and rushing or dragging after a one-time delay calibration |
| Bend | Cents from the target pitch; counts bends held in tune for half a second |
| Vibrato | Rate, width, evenness, and whether each pulse returns to pitch |
| Record a take | Record and listen straight back |

The mic needs a secure page. It works on the Vercel site (https) and on
`http://localhost`. For a phone or another computer on the LAN use `npm run dev:https`
and open `https://<this-mac's-LAN-IP>:5173` (accept the self-signed certificate once).
Wear headphones for the click while using the timing check, otherwise the mic hears the
click as notes.

Train progress is stored inside the same saved blob as Stage Ready 90, so it is covered
by the same backup, export/import and cloud sync.
Dead 90 course progress is also included. The older separate browser copy is imported
after storage recovery and retained as a compatibility copy. The full Progress export
includes both course progress and Train; the older Dead 90 course-only export remains supported.

The built-in Redis endpoint checks the cloud version atomically before replacing it.
Different device copies stop automatic upload and show a choice in Cloud Sync, with
downloadable recovery copies. Use this built-in endpoint for concurrent-device protection;
the older Cloudflare KV worker retains its one-active-device limitation. Refresh older
open app tabs after deploying the updated endpoint so they use the conditional-write protocol.

Tab demonstrations in Train follow the ladder BPM and the exercise's notes-per-click.
Starting a demonstration stops the separate practice click, avoiding two competing clicks.
Timing suggestions are withheld for sparse/stale input and cleared when listening stops,
the click stops or tempo changes. Real-guitar detector accuracy still needs the
[device checks](RELEASE-2026-11-24.md); the release does not claim those checks passed.

Content lives in `src/data/skillTracks.js` in the shape of
`content/curriculum.schema.json`. `npm run validate:curriculum` checks it, plus the
Dead 90 and Stage Ready 90 week data (`content/program-weeks.schema.json`) and any
drafts in `content/drafts/`. The same checks run in `npm test`.

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
npm run dev:https # same, over https - needed for the mic from other LAN devices
npm test          # vitest
npm run validate:curriculum
npm run build     # -> dist/, static-hostable
npm run preview
```

Deploy: static host (`dist/`), or the included `Dockerfile` + `nginx.conf`. Stage Ready
progress is written to IndexedDB with a `localStorage` compatibility/backup copy and an
optional token-based cloud-sync mechanism. Screenshot exercises and their private source
images are stored in IndexedDB on the current browser; account-based library sync is not
yet enabled. The program's JSON Export/Import buttons provide a manual progress backup.

## Known caveat

A few of the open-position scale tabs (e.g. E Mixolydian) are drawn as a compressed
diagonal "staircase," where one note on a lower string sits a column left of the next note
on a higher string. Read strictly by column (standard tab semantics — correct for banjo
rolls, riffs, and chords), this swaps one adjacent pair at a string crossing. The fretboard
positions are all correct; only the playback order of that one pair differs. Left as-is
because column ordering is right for the overwhelming majority of tabs.
