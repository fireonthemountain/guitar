# Ninety Days to the Jam

A 90-day Grateful Dead guitar program for beginner-to-light-intermediate players.

**The goal: an open mic on night 90 — three songs, rhythm and lead, standing, confident.**

The set it builds: **Ripple** (strummed verses with banjo-roll texture and fills), **Friend of the Devil** (opens with its descending intro run), and a **closer — Sugaree or Uncle John's Band** (double-stop fills and an 8-bar solo break).

## Structure

```
app/dead-90-guitar.jsx    React version (built as a Claude artifact; account-synced storage via window.storage)
web/index.html            Standalone single-file web app (vanilla JS, localStorage, zero dependencies)
docs/program.md           The full program as markdown — 90 checkbox days, all lessons/tabs, practice log
data/curriculum.json      The curriculum as data: weeks, lessons, tabs, chord charts, drills, milestones
```

All four are generated from the same curriculum. `data/curriculum.json` is the source of truth if you want to build another front end.

## The program

Three 30-day phases, ~40 minutes per day:

| Phase | Days | Focus |
|-------|------|-------|
| Foundation | 1–30 | Mixolydian, pentatonic boxes, CAGED triads, right hand (alternate/hybrid picking, banjo rolls), bends — plus a chord track (11 open shapes, 5 strum patterns) |
| Vocabulary | 31–60 | Chromatic approach tones, arpeggio targeting, three Jerry licks, double stops — plus the repertoire track (one set song at a time) |
| The Jam | 61–90 | Vamps, motif development, full song forms, long-jam endurance — plus daily stage reps (standing, from memory, announced, timed, recorded, witnessed) |

Weekly lessons teach every concept in plain language with real tab. Every referenced scale, arpeggio, lick, chord shape, and strum pattern is drawn out. Milestone checkpoints at days 30, 60, and 90.

## Hosting the web version

- **Private + free:** serve `web/index.html` from any static server on a Tailscale network (`tailscale serve` works). Open via the tailnet hostname on iOS Safari → Add to Home Screen.
- **Public + free:** GitHub Pages (public repo required on the free plan), Netlify Drop, or Cloudflare Pages.
- Progress lives in the browser's `localStorage` — per device, never sent anywhere. Use the in-app Export/Import buttons to move progress between devices.
- Don't open the file directly from the iOS Files app — Quick Look doesn't reliably persist storage. Serve it from a URL.

## Notes

- Tab convention throughout: top line = high e string, numbers = frets, 0 = open, x = don't play.
- Song chords/forms are referenced by name (look up your preferred versions); all licks, scales, and exercises are original teaching material.
