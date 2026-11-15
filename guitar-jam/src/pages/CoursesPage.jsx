import { ArrowRight, BookOpen, Clock3, Music2, Target } from 'lucide-react';

const TRACK_KEY = 'guitar-jam-program-track';

const COURSES = [
  {
    id: 'stage90',
    eyebrow: 'PERFORMANCE PATH',
    title: 'Stage Ready 90',
    description: 'Build a complete coffee-shop set through focused daily practice, weekly checks, and performance-ready song work.',
    duration: '13 weeks',
    outcome: 'Play a three-song set',
    accent: 'teal',
    phases: ['Foundation', 'Groove', 'Song craft', 'Performance'],
  },
  {
    id: 'dead90',
    eyebrow: 'JAM PATH',
    title: 'Dead 90',
    description: 'Develop the rhythm vocabulary, signature parts, and improvisational confidence needed for a Grateful Dead jam.',
    duration: '90 days',
    outcome: 'Hold your part in a jam',
    accent: 'rose',
    phases: ['Rhythm', 'Vocabulary', 'Songs', 'Jamming'],
  },
];

const accentStyles = {
  teal: {
    border: 'hover:border-teal-500/70',
    eyebrow: 'text-teal-400',
    icon: 'bg-teal-500/15 text-teal-300 ring-teal-500/25',
    button: 'bg-teal-600 hover:bg-teal-500 focus-visible:ring-teal-400',
    phase: 'bg-teal-950/70 border-teal-900/70 text-teal-200',
  },
  rose: {
    border: 'hover:border-rose-500/70',
    eyebrow: 'text-rose-400',
    icon: 'bg-rose-500/15 text-rose-300 ring-rose-500/25',
    button: 'bg-rose-600 hover:bg-rose-500 focus-visible:ring-rose-400',
    phase: 'bg-rose-950/60 border-rose-900/70 text-rose-200',
  },
};

export default function CoursesPage({ onOpenCourse }) {
  const openCourse = (courseId) => {
    localStorage.setItem(TRACK_KEY, courseId);
    onOpenCourse(courseId);
  };

  return (
    <section className="mx-auto max-w-6xl space-y-7" aria-labelledby="courses-title">
      <header className="max-w-3xl">
        <div className="text-[11px] font-bold tracking-[3px] text-teal-400">LEARNING PATHS</div>
        <h2 id="courses-title" className="mt-2 text-3xl font-bold text-white sm:text-4xl" style={{ fontFamily: 'ui-serif, Georgia, serif' }}>
          Courses with a finish line
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-gray-400 sm:text-base">
          Choose the musical goal you want to train toward. Your selected course opens in Today and keeps its own saved progress.
        </p>
      </header>

      <div className="grid gap-5 lg:grid-cols-2">
        {COURSES.map((course) => {
          const styles = accentStyles[course.accent];
          return (
            <article key={course.id} className={`group flex flex-col rounded-3xl border border-gray-700 bg-gray-800/80 p-5 transition-colors sm:p-6 ${styles.border}`}>
              <div className="flex items-start gap-4">
                <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ring-1 ${styles.icon}`} aria-hidden="true">
                  {course.id === 'stage90' ? <Target size={24} /> : <Music2 size={24} />}
                </div>
                <div className="min-w-0">
                  <div className={`text-[10px] font-bold tracking-[2.5px] ${styles.eyebrow}`}>{course.eyebrow}</div>
                  <h3 className="mt-1 text-2xl font-bold text-white" style={{ fontFamily: 'ui-serif, Georgia, serif' }}>{course.title}</h3>
                </div>
              </div>

              <p className="mt-5 flex-1 text-sm leading-relaxed text-gray-300">{course.description}</p>

              <dl className="mt-5 grid grid-cols-1 gap-2 text-sm sm:grid-cols-2">
                <div className="flex items-center gap-2 rounded-xl bg-gray-900/60 px-3 py-2.5">
                  <Clock3 className="text-gray-500" size={16} aria-hidden="true" />
                  <div><dt className="sr-only">Duration</dt><dd className="text-gray-300">{course.duration}</dd></div>
                </div>
                <div className="flex items-center gap-2 rounded-xl bg-gray-900/60 px-3 py-2.5">
                  <BookOpen className="text-gray-500" size={16} aria-hidden="true" />
                  <div><dt className="sr-only">Outcome</dt><dd className="text-gray-300">{course.outcome}</dd></div>
                </div>
              </dl>

              <ol className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4" aria-label={`${course.title} course phases`}>
                {course.phases.map((phase, index) => (
                  <li key={phase} className={`rounded-lg border px-2 py-2 text-center text-[11px] font-semibold ${styles.phase}`}>
                    <span className="sr-only">Phase {index + 1}: </span>{phase}
                  </li>
                ))}
              </ol>

              <button
                type="button"
                onClick={() => openCourse(course.id)}
                className={`mt-5 flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900 ${styles.button}`}
              >
                Open course <ArrowRight size={17} aria-hidden="true" />
              </button>
            </article>
          );
        })}
      </div>
    </section>
  );
}
