# Daily Guitar Scales

A five-minute daily guitar practice app with audio playback, metronome, and visual fretboard/piano mapping.

## Features

- **Audio Synthesis**: Tap fretboard dots and piano keys to hear guitar (plucked synthesis) or piano tones
- **Play Scale**: Full ascending + descending scale playback with visual note tracking, at adjustable BPM (40–160)
- **Metronome**: Lookahead Web Audio scheduler, 4-beat visual indicator, BPM 40–200 with presets
- **Fretboard Box Positions**: Full 12-fret view + 5 pentatonic box shapes (how scales are actually taught)
- **Daily Sessions**: 5 daily sessions per day, each a different scale type; keys rotate weekly to build fluency across all 12 keys
- **Progress Tracking**: Session completion saved to localStorage, daily streak counter
- **7 Scale Types**: Pentatonic Minor/Major, Natural Minor, Major, Blues, Dorian, Mixolydian — each with practice tips

## Tech Stack

- **React 18** + Vite
- **Tailwind CSS** for styling
- **Web Audio API** for synthesis and metronome
- **localStorage** for session persistence
- **PWA** ready (installable on mobile)

## Development

```bash
npm install
npm run dev
```

Open http://localhost:5173 and start a session.

## Build & Deploy

```bash
npm run build
```

The `dist/` folder is ready for static hosting (Vercel, Netlify, GitHub Pages).

For Vercel/Netlify, use `_redirects` (Netlify) or `vercel.json` (Vercel) to redirect all routes to `index.html` for client-side routing.

## Next Features

- Mic pitch detection (hear the user play, verify correctness)
- Streaks & statistics dashboard
- Leveled curriculum with progression
- Backing tracks (chord progressions)
- Spaced repetition for scale review
- User accounts for cross-device sync
