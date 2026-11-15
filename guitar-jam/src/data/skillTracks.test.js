import { describe, expect, it } from 'vitest';
import dead90 from './curriculum.json';
import { SKILL_TRACKS, tab } from './skillTracks';
import { STAGE90_WEEKS } from './stage90Curriculum';
import { parseTab } from '../utils/tabParser';
import { flattenExercises } from '../utils/practiceEngine';
import { validateCourses, validateProgramWeeks } from '../../scripts/lib/curriculum-validation.mjs';

const clone = (value) => JSON.parse(JSON.stringify(value));

describe('curriculum data validates against its schemas', () => {
  it('skill tracks match content/curriculum.schema.json and cross-references resolve', () => {
    expect(validateCourses(SKILL_TRACKS, { parseTab })).toEqual([]);
  });

  it('Dead 90 weeks match content/program-weeks.schema.json', () => {
    expect(validateProgramWeeks(dead90.WEEKS)).toEqual([]);
    expect(dead90.WEEKS).toHaveLength(13);
  });

  it('Stage Ready 90 weeks match content/program-weeks.schema.json', () => {
    expect(validateProgramWeeks(STAGE90_WEEKS)).toEqual([]);
    expect(STAGE90_WEEKS).toHaveLength(14);
  });

  it('catches schema drift: unknown fields, bad ids, and unknown skills', () => {
    const extraField = clone(SKILL_TRACKS);
    extraField.courses[0].modules[0].lessons[0].exercises[0].difficulty = 'hard';
    expect(validateCourses(extraField).join('\n')).toMatch(/additional properties/);

    const badSkill = clone(SKILL_TRACKS);
    badSkill.courses[0].modules[0].lessons[0].exercises[0].skillIds = ['sweep-picking'];
    expect(validateCourses(badSkill).join('\n')).toMatch(/unknown skill "sweep-picking"/);

    const duplicate = clone(SKILL_TRACKS);
    duplicate.courses[1].modules[0].lessons[0].exercises[0].id = 'e-ap-single-string';
    expect(validateCourses(duplicate).join('\n')).toMatch(/duplicate exercise id/);

    const impossible = clone(SKILL_TRACKS);
    impossible.courses[0].modules[0].lessons[0].exercises[0].mastery.minimumBpm = 300;
    expect(validateCourses(impossible).join('\n')).toMatch(/can never be reached/);

    const brokenWeek = clone(STAGE90_WEEKS);
    brokenWeek[0].days.pop();
    expect(validateProgramWeeks(brokenWeek).length).toBeGreaterThan(0);
  });

  it('refuses to publish unreviewed source material, but allows it in drafts', () => {
    const draft = clone(SKILL_TRACKS);
    const lesson = draft.courses[1].modules[0].lessons[0];
    lesson.sourceReferences = [{ sourceId: 'some-book', pages: [3], usage: 'private-reference', reviewed: false }];
    lesson.exercises[0].unverified = true;
    const published = validateCourses(draft).join('\n');
    expect(published).toMatch(/unreviewed source reference/);
    expect(published).toMatch(/still marked unverified/);
    expect(validateCourses(draft, { requireReviewedSources: false })).toEqual([]);
  });
});

describe('skill track content', () => {
  const exercises = flattenExercises(SKILL_TRACKS);

  it('has a real track for each instrument', () => {
    const electric = exercises.filter((e) => e.instrument === 'electric');
    const acoustic = exercises.filter((e) => e.instrument === 'acoustic');
    expect(electric.length).toBeGreaterThanOrEqual(10);
    expect(acoustic.length).toBeGreaterThanOrEqual(10);
  });

  it('covers the techniques each instrument needs', () => {
    const skills = (instrument) => new Set(exercises.filter((e) => e.instrument === instrument).flatMap((e) => e.skillIds));
    for (const id of ['alternate-picking', 'legato', 'string-bending', 'vibrato', 'muting', 'tone-control']) {
      expect(skills('electric').has(id), `electric ${id}`).toBe(true);
    }
    for (const id of ['fingerstyle-arpeggio', 'travis-picking', 'strum-dynamics', 'open-chord-changes', 'capo-transposition', 'voice-leading']) {
      expect(skills('acoustic').has(id), `acoustic ${id}`).toBe(true);
    }
  });

  it('gives every exercise a self-check, and a measurable target where tempo applies', () => {
    for (const exercise of exercises) {
      expect(exercise.listenFor?.length, exercise.id).toBeGreaterThanOrEqual(2);
      if (exercise.tempo) expect(exercise.mastery.minimumBpm, exercise.id).toBe(exercise.tempo.targetBpm);
    }
  });

  it('builds aligned, playable tabs from the compact spec', () => {
    const built = tab('E0+A2+D2 B5 G7b9 . | e3');
    const lines = built.split('\n');
    expect(lines).toHaveLength(6);
    expect(new Set(lines.map((l) => l.length)).size).toBe(1);
    expect(lines[0].startsWith('e|')).toBe(true);
    const parsed = parseTab(built);
    expect(parsed.steps.map((s) => s.notes.length)).toEqual([3, 1, 1, 1]);
    expect(parsed.steps[2].notes[0].bendTo).toBe(9);
    expect(() => tab('X5')).toThrow(/Bad tab token/);
  });
});
