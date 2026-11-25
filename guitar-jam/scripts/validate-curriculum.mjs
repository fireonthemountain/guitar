#!/usr/bin/env node
// Validate every curriculum data source against its schema.
//   npm run validate:curriculum
// Exit code 1 if anything fails, so it can gate a build.

import { readdirSync, readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { validateCourses, validateProgramWeeks } from './lib/curriculum-validation.mjs';
import { SKILL_TRACKS } from '../src/data/skillTracks.js';
import { STAGE90_WEEKS } from '../src/data/stage90Curriculum.js';
import { parseTab } from '../src/utils/tabParser.js';

const root = (p) => fileURLToPath(new URL(`../${p}`, import.meta.url));
const dead90 = JSON.parse(readFileSync(root('src/data/curriculum.json'), 'utf8'));

const checks = [
  ['src/data/skillTracks.js (course model)', validateCourses(SKILL_TRACKS, { parseTab })],
  ['src/data/curriculum.json WEEKS (Dead 90)', validateProgramWeeks(dead90.WEEKS)],
  ['src/data/stage90Curriculum.js STAGE90_WEEKS', validateProgramWeeks(STAGE90_WEEKS)],
];

const draftsDir = root('content/drafts');
if (existsSync(draftsDir)) {
  for (const file of readdirSync(draftsDir).filter((f) => f.endsWith('.json')).sort()) {
    const data = JSON.parse(readFileSync(`${draftsDir}/${file}`, 'utf8'));
    checks.push([`content/drafts/${file} (draft, review flags allowed)`, validateCourses(data, { requireReviewedSources: false, parseTab })]);
  }
}

let failed = 0;
for (const [name, errors] of checks) {
  if (errors.length) {
    failed += 1;
    console.log(`FAIL  ${name}`);
    for (const e of errors.slice(0, 25)) console.log(`        ${e}`);
    if (errors.length > 25) console.log(`        ... and ${errors.length - 25} more`);
  } else {
    console.log(`ok    ${name}`);
  }
}
console.log(failed ? `\n${failed} of ${checks.length} sources failed validation.` : `\nAll ${checks.length} sources valid.`);
process.exit(failed ? 1 : 0);
