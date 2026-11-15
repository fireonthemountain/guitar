// Shared curriculum validation: JSON Schema (ajv) plus the cross-reference
// checks a schema cannot express. Used by scripts/validate-curriculum.mjs and
// by the vitest suite, so `npm test` fails on schema drift.

import Ajv2020 from 'ajv/dist/2020.js';
import courseSchema from '../../content/curriculum.schema.json';
import programSchema from '../../content/program-weeks.schema.json';

export const loadCourseSchema = () => courseSchema;
export const loadProgramSchema = () => programSchema;

function schemaErrors(schema, data) {
  const ajv = new Ajv2020({ allErrors: true, strict: false });
  const validate = ajv.compile(schema);
  if (validate(data)) return [];
  return validate.errors.map((e) => `${e.instancePath || '/'} ${e.message}${e.params?.additionalProperty ? ` (${e.params.additionalProperty})` : ''}`);
}

// Course-model data (skills + courses). Returns a list of problems; empty = valid.
//   requireReviewedSources: published data must not carry unreviewed source
//   references or unverified examples. Drafts pass `false`.
export function validateCourses(data, { requireReviewedSources = true, parseTab = null } = {}) {
  const errors = schemaErrors(loadCourseSchema(), data);
  if (errors.length) return errors;

  const skillIds = new Set();
  for (const skill of data.skills) {
    if (skillIds.has(skill.id)) errors.push(`duplicate skill id "${skill.id}"`);
    skillIds.add(skill.id);
  }
  for (const skill of data.skills) {
    for (const pre of skill.prerequisiteSkillIds || []) {
      if (!skillIds.has(pre)) errors.push(`skill "${skill.id}" requires unknown skill "${pre}"`);
    }
  }

  const seen = { course: new Set(), module: new Set(), lesson: new Set(), exercise: new Set() };
  const claim = (kind, id) => {
    if (seen[kind].has(id)) errors.push(`duplicate ${kind} id "${id}"`);
    seen[kind].add(id);
  };
  const lessonIds = new Set(data.courses.flatMap((c) => c.modules.flatMap((m) => m.lessons.map((l) => l.id))));
  const needSkill = (owner, ids) => {
    for (const id of ids || []) if (!skillIds.has(id)) errors.push(`${owner} references unknown skill "${id}"`);
  };

  for (const course of data.courses) {
    claim('course', course.id);
    needSkill(`course "${course.id}"`, course.prerequisiteSkillIds);
    for (const module of course.modules) {
      claim('module', `${course.id}/${module.id}`);
      for (const lesson of module.lessons) {
        claim('lesson', lesson.id);
        needSkill(`lesson "${lesson.id}"`, lesson.skillIds);
        for (const pre of lesson.prerequisiteLessonIds || []) {
          if (!lessonIds.has(pre)) errors.push(`lesson "${lesson.id}" requires unknown lesson "${pre}"`);
        }
        if (requireReviewedSources) {
          for (const ref of lesson.sourceReferences || []) {
            if (!ref.reviewed) errors.push(`lesson "${lesson.id}" has an unreviewed source reference (pages ${ref.pages.join(', ')})`);
          }
        }
        for (const exercise of lesson.exercises) {
          claim('exercise', exercise.id);
          needSkill(`exercise "${exercise.id}"`, exercise.skillIds);
          if (requireReviewedSources && exercise.unverified) errors.push(`exercise "${exercise.id}" is still marked unverified`);
          const tempo = exercise.tempo;
          if (tempo) {
            if (!(tempo.startBpm && tempo.targetBpm && tempo.stepBpm)) errors.push(`exercise "${exercise.id}" tempo needs startBpm, targetBpm and stepBpm`);
            else if (tempo.startBpm >= tempo.targetBpm) errors.push(`exercise "${exercise.id}" startBpm must be below targetBpm`);
            if (exercise.mastery.minimumBpm && tempo.targetBpm && exercise.mastery.minimumBpm > tempo.targetBpm) {
              errors.push(`exercise "${exercise.id}" mastery.minimumBpm is above the ladder's targetBpm, so it can never be reached`);
            }
          }
          // A tab that draws all six strings is meant to be playable; make sure it parses.
          if (parseTab && exercise.tablature && /^\s*e\s*\|/m.test(exercise.tablature)) {
            const parsed = parseTab(exercise.tablature);
            if (!parsed.playable || !parsed.steps.length) errors.push(`exercise "${exercise.id}" tablature does not parse into playable steps`);
          }
        }
      }
    }
  }
  return errors;
}

// Week/day program data (Dead 90 WEEKS, Stage Ready 90 STAGE90_WEEKS).
export function validateProgramWeeks(weeks) {
  return schemaErrors(loadProgramSchema(), weeks);
}
