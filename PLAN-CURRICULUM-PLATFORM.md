# Guitar Practice Curriculum Platform Plan

**Last updated:** September 5, 2026

## Mission

Turn Guitar Practice into a reliable, adaptive learning platform: one guided daily session, normalized courses and exercises, measurable skill mastery, private source-document ingestion, and durable progress across devices.

## Assumptions

- Existing `stage90` progress must migrate without a reset.
- The live Vercel app remains the primary client and continues to work as a PWA.
- Purchased or owned books and course PDFs are private source material and must not be placed in the public application bundle.
- The canonical intake folder is `/Users/csather/Documents/Guitar Library/Inbox/`; `/Users/csather/Documents/Guitar/` remains a legacy source until inventory and duplicate review are complete.
- Beginner Fingerstyle is the first ingestion pilot because its sequence and exercises are comparatively easy to validate.
- The current uncommitted edit to `guitar-jam/src/pages/Stage90ProgramPage.jsx` belongs to the user and must be preserved.

## Completed Foundation

- Removed the cloud-startup timeout race that could apply remote data after render and then overwrite it with stale mounted state.
- Added schema-versioned `stage90` persistence metadata.
- Added verified writes and automatic recovery from a backup blob.
- Made unchanged mount-time saves no-ops.
- Added device, revision, and update metadata.
- Added visible local/cloud persistence status in the application header.
- Added regression tests for migration, backup recovery, failed writes, cloud timeout cancellation, and cloud/local freshness.

## Target Learning Model

```text
Learning path
└── Course
    └── Module
        └── Lesson
            ├── Concepts and explanation
            ├── Demonstration or private source reference
            ├── Diagram, chord chart, or tablature
            ├── Guided exercises
            ├── Practice prescription
            ├── Mastery criteria
            └── Follow-up assignment
```

Progress is tracked independently from curriculum content:

```text
Course enrollment
├── Lesson progress
├── Exercise attempts
├── Practice sessions
├── Assessment results
└── Skill mastery evidence
```

## Delivery Phases

1. **Reliable progress** - versioned local persistence, backup recovery, safe startup sync, visible state, and regression tests.
2. **Private library inventory** - recursive scanning, hashes, page counts, format detection, and exact-duplicate groups without moving source files.
3. **Curriculum data layer** - validate courses, modules, lessons, exercises, source references, prerequisites, and mastery criteria against one schema.
4. **Ingestion review tool** - extract candidate text/page images into private working data and require visual confirmation of every musical example.
5. **Beginner Fingerstyle pilot** - publish the first normalized course into the Learn and Today experiences.
6. **Adaptive practice** - use prerequisites, attempts, tempo evidence, and assessment misses to select the next session.
7. **Additional courses** - Acoustic Blues, CAGED, scale study, acoustic tricks, songbooks, and other owned material.
8. **Expert-level feedback** - recording capture, timing/pitch analysis, structured self-review, spaced repetition, and performance readiness.

## Content Safety Boundary

The scanner may record local filenames, hashes, sizes, formats, and page counts in `guitar-jam/private-data/`, which is gitignored. Raw PDFs, extracted page images, and substantial copyrighted text remain private. The deployed application receives only content that is original, licensed for use, or sufficiently transformed into personal instruction and structured exercises after review.

## Success Measures

- No progress is lost during refresh, PWA restart, offline use, cloud timeout, or application upgrade.
- Every progress mutation has a visible local-save state and an eventual cloud outcome.
- Exact duplicate source files are detected before ingestion.
- Every published lesson passes schema validation.
- Every tablature/chord extraction is visually checked against its source page.
- The Today screen can explain why each exercise was selected and what constitutes mastery.
