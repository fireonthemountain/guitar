# Course drafts (not published)

Files here are course skeletons that are **not** loaded by the app. They are
validated by `npm run validate:curriculum` in draft mode, which allows
`"unverified": true` exercises and `"reviewed": false` source references. The
same data would **fail** validation as published content — that is the gate.

## beginner-fingerstyle.draft.json

Skeleton for the Beginner Fingerstyle pilot (ledger task guitar-5): 16 lessons
following chapters 2-17 of the owned source book, mapped to the page images in
`private-data/review/marty-music-beginner-fingerstyle/pages/` (gitignored).

It contains lesson titles, objectives, page numbers and one-line descriptions
only. **No tablature and no text from the book has been copied.** Every
exercise still needs its tab entered by hand from the source page.

To publish a lesson:

1. Open `private-data/review/marty-music-beginner-fingerstyle/pages/page-0NN.jpg`
   for the pages listed in the lesson's `sourceReferences`.
2. Enter each exercise's `tablature` (top line = high e) and check it by ear
   with the Play button in the Library import screen.
3. Replace the placeholder second instruction, set real `tempo`/`mastery`
   numbers, set `"unverified": false` on the exercise and `"reviewed": true`
   on the source reference.
4. Move the finished course into `src/data/skillTracks.js` (or import the JSON
   there). `npm test` will refuse it while any flag is still unreviewed.
