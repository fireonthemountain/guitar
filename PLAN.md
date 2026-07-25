# Stage Ready 90 — App Plan

**Goal:** be comfortable on a coffee-shop stage in 3 months.
**Definition of done:** on gig night (~13 weeks out) you play a 3-song set, standing,
from memory, at performance tempo, and recover from mistakes without stopping.
**The instrument for getting there:** one app, with a weekly assessment loop that
tells you every 7 days whether you're on track — and adjusts the next week if you're not.

Everything builds inside **`guitar-jam/`** (React/Vite/Tailwind, Web Audio engine,
playable tabs, metronome, vamps, streaks, localStorage + export/import). No new
standalone apps. dead90 proved the 90-day → open-mic arc; this generalizes it and
adds the two things the repo lacks: **assessment** and **follow-along jamming**.

---

## 1. The program: 13 weeks, 3 phases, weekly gates

Week 0 is a placement assessment (see §2) that sets your starting point. Days are
~40–60 min: warm-up → main block → cool-down (structure already in guitar-jam).
Every 7th day is **Assessment Day** instead of a normal practice day.

| Phase | Weeks | Focus | Exit bar (assessed) |
|-------|-------|-------|---------------------|
| **Foundation** | 1–4 | Clean open chords, strumming patterns, metronome timing, first barre (F) if placement says so. Pick your 3 set songs by end of week 2. | Chord changes at 40+/min clean; one full song top-to-bottom with a metronome at 70% target tempo, no stopping. |
| **Repertoire** | 5–9 | One song at a time to performance-ready: full form, dynamics, from memory. Jam Along sessions twice a week for feel and recovery skills. | Each song: full run from memory, standing, at 90% tempo, ≤2 stumbles, zero restarts. |
| **Performance** | 10–13 | Full set runs daily. Stage simulation reps (standing, announced out loud, phone recording, timed). Recovery drills. Dry run for a friend in week 12. Visit the open mic once as a spectator. | Full 3-song set, standing, recorded, ≤2 total stumbles, no restarts, within 20% of planned set length. |

**Week 0 placement** routes you: comfortable with open chords → standard track;
not yet → weeks 1–2 swap in the beginner bootcamp material (open chords, basic
strumming, 12-bar blues) and the schedule compresses later weeks' polish time.

**Recovery is a first-class skill.** From week 5 on, one drill per week is
"mistake practice": the app (metronome/vamp running) — you keep playing through
flubs, and log restarts. Comfort on stage is mostly knowing you can keep going.

---

## 2. Weekly assessment (the core new feature)

Assessment Day is a guided wizard, ~20 minutes:

1. **Record a take** — phone video of the week's target piece. The app doesn't
   record (v1); it prompts you, and you log that you did it. Watching yourself
   weekly is the single highest-signal habit.
2. **Criteria checklist** — 3–6 concrete pass/marginal/fail items for that week
   (defined per-week in the curriculum data, e.g. "Song 1 verse+chorus from memory
   at 80 BPM, no stopping").
3. **Tempo test** — max clean BPM on a fixed reference progression (G–D–Em–C, one
   strum pattern), measured against the app metronome. One number, tracked weekly —
   your objective progress line.
4. **Self-ratings** — 1–5 sliders: clean chords, rhythm steadiness, memory,
   confidence, recovery.
5. **Notes** — what felt hard; feeds next week's focus.

**The app then adapts:** any failed criterion injects targeted remediation blocks
into the next week's days (repeat drills, drop tempo 10%, extra reps) and shifts
that week's exit bar. Passing everything advances the track normally. Simple rules
engine — no cleverness needed, just criterion → remediation-block mapping in data.

**Gig Readiness dial** — a composite (0–100) shown on the home screen with a
countdown to gig date: per-song readiness × latest set-run stats × assessment
trend. Weeks 10+ it's the thing you watch.

---

## 3. App structure

Tabs after the build (existing → kept; **new in bold**):

```
🎸 Guitar Practice
├── Program        — curriculum switcher: Stage Ready 90 (new data) | Dead 90 (existing)
│                    day view reuses: TabBlock, Metronome, StrumPatterns, VampPlayer,
│                    SessionTimer, streak/heatmap; Assessment Day renders the wizard
├── Songbook       — existing + My Set: pick 3 songs, order them, per-song readiness
│                    card (memorized? tempo? last clean run?), SetRunner mode
├── Jam Along      — NEW: YouTube IFrame embed (Seriff lessons, backing tracks) with
│                    A/B section loop + playback speed; tagged key/scale drives the
│                    existing ScaleBoard fretboard + lit chord chips; jam library
│                    with per-video notes; sessions feed the streak
├── Assessment     — NEW: this week's wizard + history (tempo-test trend chart,
│                    ratings over time, readiness dial, past takes log)
└── Amp            — existing Mustang preset browser, untouched
```

### New components
| Component | Purpose |
|-----------|---------|
| `AssessmentWizard` | The 5-step weekly flow; writes an assessment record |
| `ReadinessDial` + `GigCountdown` | Composite score + days-to-gig, on Program home |
| `TrendChart` | Tempo test + ratings over weeks (tiny SVG, no chart lib) |
| `SetRunner` | Performance simulator: runs the whole set with countdown between songs, elapsed timer, tap-to-log-stumble, produces a set-run record |
| `YouTubeJam` | IFrame API wrapper: load by URL/ID, A/B loop, 0.5–1× speed |
| `SongReadinessCard` | Per-set-song status rollup |

### Data
- `src/data/curriculum-stage90.json` — same shape as the existing curriculum
  (weeks → lesson/tabs/terms → days) **plus** per-week `assessment.criteria[]` and
  `remediation{}` maps. Beginner weeks adapt the bootcamp material — **with its
  chord diagrams corrected and converted to the repo's tab convention** (top line
  = high e; the source doc's A and D diagrams are wrong as written).
- Songs gain performance metadata: target BPM, section list, `memorized` flag.
- Storage: new namespaced keys (`stage90.progress`, `stage90.assessments[]`,
  `stage90.setruns[]`, `stage90.jams[]`, `stage90.gigDate`); existing
  Export/Import extended to cover all of it. Assessment records:
  `{week, date, criteria:[{id, result}], ratings:{...}, maxCleanBpm, recordedTake, notes, score}`.

### Explicitly out of scope (v1)
- In-app audio/video recording (MediaRecorder is a v2 stretch; phone is fine).
- Accounts/sync (export/import covers it).
- Mic pitch-detection scoring (nice later; self-assessment + video is enough now).
- The standalone `bootcamp-playing/index.html` from the source doc — superseded.

**Caveat:** Jam Along needs network for YouTube; the rest of the app stays
offline-capable. Embed failures degrade to the built-in VampPlayer.

---

## 4. Build order

| Step | Deliverable | Why this order |
|------|-------------|----------------|
| 1 | Assessment system: wizard, records, trend chart, gig date + countdown, readiness dial | The weekly loop is the ask — usable in week 1 even before new curriculum exists (works against the Dead program too) |
| 2 | Stage Ready 90 curriculum data + Program switcher + placement week + remediation injection | The daily driver |
| 3 | My Set + SetRunner in Songbook | Needed by week 5; phase-3 core |
| 4 | Jam Along tab | Twice-weekly from week 5 |
| 5 | Polish: root README, PWA check on phone Safari, export/import extension | Ship & durability |

Steps 1–2 land within the first program week so the app and the training start
together; 3–4 land before their phases need them.

---

## 5. The calendar (start now)

| | |
|---|---|
| Week 0 (this week) | Placement assessment, pick gig target date (~13 weeks out), install app on phone |
| Weeks 1–4 | Foundation + weekly assessments; songs chosen by week 2 |
| Weeks 5–9 | Repertoire, one song at a time; Jam Along 2×/week |
| Weeks 10–12 | Daily set runs, stage sim reps, dry run for a friend (wk 12), scout the venue |
| Week 13 | Taper (short clean runs, no new material), then **gig night** |
