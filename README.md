# 🎸 guitar

Personal guitar practice apps. The main app is **[guitar-jam](guitar-jam/)** — everything else
feeds into it or is kept as source material.

**Live app: <https://guitar-one-blush.vercel.app/>** — hosted on Vercel, auto-deployed from
`main` (root directory `guitar-jam`). Open it on any device and Add to Home Screen (it's a
PWA). Optional login wall: Vercel project → Settings → Deployment Protection → Vercel
Authentication. Progress syncs across devices via the built-in `/api/sync` endpoint —
link a free Upstash Redis database once in Vercel (see [sync-worker/README.md](sync-worker/README.md)),
then tap "This site" in the app's Cloud Sync card. Export/Import remains the manual fallback.

## Stage Ready 90 — the headline program

A 14-week path (week-0 placement + 13 training weeks) from wherever you are to a
**coffee-shop open mic**: three songs, standing, from memory, recovering from mistakes
without stopping. Lives in guitar-jam across four tabs:

| Tab | What it does |
|-----|--------------|
| **Program** | The daily curriculum (98 days) — lessons, chord charts, session blocks, notes. Switchable with the original Dead 90 track. |
| **Assessment** | Every 7th day: a guided wizard (recorded take, pass/marginal/fail criteria, tempo test, self-ratings, notes) → weekly score, gig-readiness dial, trend charts, and remediation injected into next week's practice days. |
| **Jam Along** | Save YouTube lessons/backing tracks (e.g. [Daniel Seriff](https://www.youtube.com/channel/UCdndQZ_Yt3BifEaOqeyESQA)), tag key + scale once, and the fretboard shows what to play while the video runs. A/B section looping and 0.5–1× speed. |
| **Songbook** | Dead & Co staples with playable tabs, plus **My Set** — your three gig songs — and the **Set Runner**: timed full-set runs with a stumble counter, logged against your planned set length. |

The full design is in [PLAN.md](PLAN.md). Run locally: `cd guitar-jam && npm install && npm run dev`.

## Subprojects

- **[guitar-jam/](guitar-jam/)** — the combined app (React/Vite/Tailwind, Web Audio synth,
  playable ASCII tabs, metronome, vamp player, Mustang amp-preset browser). Progress lives in
  `localStorage` with export/import; PWA + Docker deploy.
- **[dead90/](dead90/)** — the original "Ninety Days to the Jam" Grateful Dead program:
  curriculum JSON (source of truth), markdown program, standalone single-file web app.
- **[daily-guitar-scales/](daily-guitar-scales/)** — the earlier scales app whose audio engine
  and fretboard were folded into guitar-jam.
- **[mustang/](mustang/)** — Fender Mustang amp preset archives (.fuse) backing the Amp tab.
