# Guitar App — Analysis & Redesign (Nov 15, 2026)

Branch: `redesign/2026-11-practice-gains` (local only; not pushed, merged, or deployed).
Pre-existing WIP preserved on `wip/pre-redesign-2026-11` (based on `claude/cyd-touch-demo`).

## 1. Findings

The app was a good program reader with nothing that makes technique improve between weekly assessments, and it was almost entirely acoustic open-chord strumming.

### Inventory
| Subproject | What it is | State on Nov 15 |
|---|---|---|
| `guitar-jam/` | The real app (React 18, Vite 5, Tailwind, Web Audio, PWA, Vercel sync function) | Builds; 20/20 tests passed before this work |
| `daily-guitar-scales/` | Earlier scales app | Superseded: every source file also exists in guitar-jam (four byte-identical); no node_modules, no tests |
| `dead90/` | Original 90-day program | `data/curriculum.json` byte-identical to guitar-jam's copy |
| `mustang/` | Amp preset archives | Data only |
| `sync-worker/` | Cloudflare Worker sync alternative | Same contract as the Vercel route; no sign it is deployed |
| `cyd-touch-demo/` | ESP32 touchscreen demo | Unrelated to guitar |

### Deploy status
- `https://guitar-one-blush.vercel.app/` returns 200.
- `/api/sync/<token>` returns **503 "no database linked"**: Upstash Redis is not connected to the Vercel project, so cloud sync does not work on any device yet.

### Git state found
Repo was on `claude/cyd-touch-demo` (1 commit ahead of `main`) with 13 modified + 17 untracked paths: Sep 5 curriculum-platform work, Sep 16 Practice Desk redesign, CYD tweaks — coherent and passing tests.

### Learning-design scores (0–5, before → after)
| What produces improvement | Before | After | Why |
|---|---|---|---|
| Deliberate practice | 2 | 4 | Day steps were prose + countdown + "Done" button |
| Progressive overload / tempo ladder | 1 | 4 | "Tempo ladder" was text only; metronome had no memory |
| Measurable benchmarks | 2 | 4 | One number a week (max clean BPM on G–D–Em–C) |
| Spaced review of weak items | 0 | 4 | Nothing scheduled anything |
| Audio feedback | 0 | 3 | No mic/recorder/analyser code; held at 3 until tuned on a real guitar |
| Electric technique | 0 | 3 | No legato or palm-muting content; now a solid core, not a full method |
| Acoustic technique | 2 | 4 | Six untracked "texture" licks |
| Session structure | 3 | 4 | Practice Desk was already good |
| Performance readiness | 4 | 4 | Unchanged; already the app's strength |
| Cross-device durability | 2 | 2 | Local persistence solid; cloud DB not linked |

### Dead code & duplication (nothing deleted; logged as guitar-11)
- `GuitarScalesPage.jsx` unreachable; only it uses `PianoKeyboard.jsx`, `SessionTimer.jsx`, `getDailySessions`, `playPianoNote` (~600 lines).
- `DesignPreviewPage.jsx` mocks a redesign that already shipped.
- `daily-guitar-scales/` and the second `curriculum.json` are full duplicates.
- Two `PatternGroup` components; now three metronome schedulers.

### Friction
- Main bundle one 946 kB chunk (196 kB gzip), up from 861 kB.
- Mic cannot work on plain `http://192.168.x.x` (browser rule) — use `npm run dev:https`.
- On phone, Train grading buttons sit below the tab, so each pass needs a scroll.

## 2. Prioritized plan and status
| Rank | Item | Status |
|---|---|---|
| 1 | Practice engine: tempo ladder, benchmarks, spaced review, session builder | Built |
| 2 | Electric and acoustic technique tracks | Built |
| 3 | Train tab: queue, runner, benchmark board | Built |
| 4 | Mic feedback: timing, bend, vibrato, record/playback | Built; needs real-guitar pass |
| 5 | Curriculum validation (guitar-4) | Built |
| 6 | Import image storage fix (guitar-1) | Built |
| 7 | Beginner Fingerstyle pilot (guitar-5) | Skeleton only |
| 8 | Link Upstash (guitar-3) | Needs owner; server confirmed not linked |
| 9 | Feed Train into Today and weekly assessment | Not done (guitar-10) |
| 10 | Dead code removal, bundle split | Not done (guitar-11) |

## 3. What was built

### Commits
`wip/pre-redesign-2026-11` (WIP as found): `53cd251` CYD tweaks · `c3dbd8a` persistence, sync fixes, vitest suite · `cbfeef1` library scripts + curriculum schema · `4f37a73` Practice Desk shell · `5cfff1e` plan + mockups. Nothing under `private-data/` and no PDFs tracked.

`redesign/2026-11-practice-gains` adds:
- `c67d082` practice engine, mic analysis, curriculum validation, guitar-1 fix
- `e02fa3c` Train tab UI, mic panel, benchmarks, `dev:https`
- `4f464ff` fingerstyle draft, README section, calibration display fix

### Train tab (under `guitar-jam/`)
- **Content** — `src/data/skillTracks.js`: 14 electric exercises (alternate picking, legato, bends, vibrato, palm + fretting-hand muting, tone/amp) and 15 acoustic (p-i-m-a, Travis, strum dynamics, chord/barre changes, capo, voice-leading). Each has instructions, a "clean pass means" standard, tab, and target tempo. All original material.
- **Engine** — `src/utils/practiceEngine.js`: ladder climbs one step after N clean passes in a row, drops after two misses; benchmark = best clean BPM per exercise; mastered items return at 3, 7, 15, 33… days, a failed review returns next day; queue = due reviews → weakest in-progress → at most two new, each with a stated reason.
- **Mic checks** — `src/utils/pitchDetect.js`, `src/utils/timingAnalysis.js`, `src/components/train/ListenPanel.jsx`: tuner (note + cents); timing vs. click (steadiness ms, % in pocket; rushing/dragging only after one-time delay calibration); bend-to-pitch within 15 cents; vibrato rate/width/evenness; record + listen back. Opt-in; nothing uploaded or stored.
- **Benchmarks board** — `src/components/train/BenchmarkBoard.jsx`: best clean vs. target per exercise, per-skill progress per instrument, 4 weeks of reps, weakest items, next review dates. Wide layout, 12-hour times.
- **Storage** — Train state lives in the existing Stage Ready blob (`src/utils/gymStore.js`), so it gets the same backup/export/import/sync. Existing progress untouched.

### Ledger tasks
- **guitar-1 (done):** test already passed only because it had been switched to Node's Blob; applied the real fix — images stored as ArrayBuffer + MIME, rebuilt on read; old records still load.
- **guitar-4 (done):** `npm run validate:curriculum` + vitest coverage. New `content/program-weeks.schema.json` describes Dead 90 / Stage Ready 90 week data as-is. No content edited; no data problems found.
- **guitar-2 (in review):** WIP committed; no PR per no-push rule.
- **guitar-5 (open):** skeleton `content/drafts/beginner-fingerstyle.draft.json` — 16 lessons, 27 exercises mapped to source page numbers; no tab/book text copied; flagged unverified, not loaded by the app, validator refuses to publish it. Tab entry/check is the owner's.
- **guitar-3 (open):** note added with the 503 finding.

## 4. Test results
- `npm test`: **92 passed, 0 failed, 13 files** (was 20 in 7 files).
- `npm run validate:curriculum`: all 4 sources valid.
- `npm run build`: succeeds.
- Headless Chromium at 1600px and 390px: no console errors, no horizontal overflow.
- Mic path with synthesized audio through a fake mic: 196 Hz → "G3, 0 cents"; bend 30¢ flat → "Flat"; 5¢ sharp → "In tune" and counted; tight note stream → "locked, ±3 ms"; sloppy → "unsteady, ±37 ms".

**Not verified:** no real guitar through the mic yet (onset sensitivity and grade thresholds are first guesses — guitar-8); not tested on iPhone or installed PWA; speaker-to-mic delay calibration not exercised end to end; `daily-guitar-scales` and `cyd-touch-demo` not built.

## 5. How to run
```bash
cd guitar-jam
git switch redesign/2026-11-practice-gains
npm install
npm run dev          # http://localhost:5173/?view=train  (binds 0.0.0.0)
npm run dev:https    # https://<Mac LAN IP>:5173/?view=train  for mic from phone/LAN
```
Mic works only on `http://localhost` or https. Wear headphones for the click during the timing check.

## 6. Ledger after this work
- **Done:** guitar-1, guitar-4
- **guitar-7 (H):** review and merge the two branches
- **guitar-8 (H):** tune mic checks on a real guitar
- **guitar-9:** keep tempo/grade buttons on screen on phone
- **guitar-10:** connect Train to Today and the weekly assessment
- **guitar-11 (L):** remove dead code/duplicates, split the bundle
- **guitar-12 (L):** expand Train content
- **Still open:** guitar-3 (link Upstash, then phone check), guitar-5 (tab entry/review), guitar-2 (review until pushed)

## 7. Notes
- A daily 7:00 AM `git pull --ff-only` appears in the reflog; it can't fast-forward while on these local branches.
- Repo left checked out on `redesign/2026-11-practice-gains`, clean tree.
- New dev deps in guitar-jam: `ajv`, `@vitejs/plugin-basic-ssl`.
