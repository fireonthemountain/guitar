import { useState } from 'react';
import Metronome from '../guitar/Metronome';
import { RATING_KEYS, REFERENCE_PROGRESSION, GIG_TEMPO_TARGET } from '../../data/assessmentPlan';

const defaultRatings = (existing) =>
  Object.fromEntries(RATING_KEYS.map(([k]) => [k, existing?.ratings?.[k] ?? 3]));
import { assessmentScore, dateKey } from '../../utils/stage90';

const STEPS = ['Record a take', 'Criteria', 'Tempo test', 'Ratings', 'Notes'];

const CRIT_OPTS = [
  ['pass', 'Pass', 'bg-emerald-600 text-white'],
  ['marginal', 'Marginal', 'bg-amber-600 text-white'],
  ['fail', 'Fail', 'bg-rose-600 text-white'],
];

const RATING_HINTS = {
  clean: 'Every chord rings, no buzz or dead strings',
  rhythm: 'You and the click agree for whole songs',
  memory: 'Eyes closed, hands know where to go',
  confidence: 'You would play this for a stranger right now',
  recovery: 'A flub costs you a beat, not the song',
};

export default function AssessmentWizard({ week, plan, existing, onSave, onCancel }) {
  const [step, setStep] = useState(0);
  const [draft, setDraft] = useState(() => ({
    week,
    date: dateKey(new Date()),
    recordedTake: existing?.recordedTake || false,
    criteria: { ...(existing?.criteria || {}) },
    maxCleanBpm: existing?.maxCleanBpm || '',
    ratings: defaultRatings(existing),
    notes: existing?.notes || '',
  }));

  const criteriaDone = plan.criteria.every((c) => draft.criteria[c.id]);
  const canNext = [true, criteriaDone, !!draft.maxCleanBpm, true, true][step];

  const finish = () => {
    const record = { ...draft, maxCleanBpm: Number(draft.maxCleanBpm) || 0 };
    record.score = assessmentScore(record, plan);
    onSave(record);
  };

  return (
    <div className="bg-gray-800 border border-teal-700/60 rounded-2xl p-4 space-y-4">
      {/* Step header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="text-teal-400 text-[10px] font-bold tracking-[2px]">WEEK {week} ASSESSMENT · STEP {step + 1} OF {STEPS.length}</div>
          <div className="text-white font-bold text-lg" style={{ fontFamily: 'ui-serif, Georgia, serif' }}>{STEPS[step]}</div>
        </div>
        <button onClick={onCancel} className="text-gray-500 hover:text-gray-300 text-sm">Cancel</button>
      </div>
      <div className="flex gap-1">
        {STEPS.map((_, i) => (
          <div key={i} className={`h-1 flex-1 rounded-full ${i <= step ? 'bg-teal-500' : 'bg-gray-700'}`} />
        ))}
      </div>

      {/* Step 1 — record a take */}
      {step === 0 && (
        <div className="space-y-3">
          <p className="text-gray-300 text-sm leading-relaxed">
            Prop your phone up and record a video of this week's target piece — one take, no warm-up run.
            Watching yourself weekly is the highest-signal habit in this whole program. The recording stays
            on your phone; just tell the app you did it.
          </p>
          <button
            onClick={() => setDraft((d) => ({ ...d, recordedTake: !d.recordedTake }))}
            className={`w-full py-3 rounded-xl font-bold text-sm border transition-colors ${
              draft.recordedTake ? 'bg-emerald-900/40 border-emerald-500 text-emerald-300' : 'bg-gray-900/50 border-gray-700 text-gray-300 hover:border-gray-500'
            }`}
          >
            {draft.recordedTake ? '✓ Take recorded and watched back' : 'Tap when your take is recorded (or skip — be honest)'}
          </button>
        </div>
      )}

      {/* Step 2 — criteria */}
      {step === 1 && (
        <div className="space-y-3">
          <p className="text-gray-400 text-xs">Grade honestly — a false pass just moves the problem to a worse week. Marginal means "sometimes."</p>
          {plan.criteria.map((c) => (
            <div key={c.id} className="bg-gray-900/50 border border-gray-700 rounded-xl p-3">
              <div className="text-gray-200 text-sm leading-snug mb-2">{c.label}</div>
              <div className="flex gap-1.5">
                {CRIT_OPTS.map(([val, label, activeCls]) => (
                  <button
                    key={val}
                    onClick={() => setDraft((d) => ({ ...d, criteria: { ...d.criteria, [c.id]: val } }))}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors ${
                      draft.criteria[c.id] === val ? activeCls : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Step 3 — tempo test */}
      {step === 2 && (
        <div className="space-y-3">
          <p className="text-gray-300 text-sm leading-relaxed">{REFERENCE_PROGRESSION}</p>
          <Metronome defaultBpm={Number(draft.maxCleanBpm) || 60} />
          <div className="flex items-center gap-3">
            <label className="text-gray-400 text-sm flex-shrink-0">Last clean BPM</label>
            <input
              type="number"
              min="30"
              max="220"
              value={draft.maxCleanBpm}
              onChange={(e) => setDraft((d) => ({ ...d, maxCleanBpm: e.target.value }))}
              className="w-24 bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-white text-lg font-bold text-center"
            />
            <span className="text-gray-500 text-xs">gig goal: {GIG_TEMPO_TARGET}</span>
          </div>
        </div>
      )}

      {/* Step 4 — ratings */}
      {step === 3 && (
        <div className="space-y-3">
          {RATING_KEYS.map(([key, label]) => (
            <div key={key}>
              <div className="flex justify-between items-baseline">
                <span className="text-gray-200 text-sm font-semibold">{label}</span>
                <span className="text-teal-400 text-sm font-bold">{draft.ratings[key]}</span>
              </div>
              <div className="text-gray-500 text-[11px] mb-1">5 = {RATING_HINTS[key]}</div>
              <input
                type="range"
                min="1"
                max="5"
                step="1"
                value={draft.ratings[key]}
                onChange={(e) => setDraft((d) => ({ ...d, ratings: { ...d.ratings, [key]: Number(e.target.value) } }))}
                className="w-full accent-teal-500"
              />
            </div>
          ))}
        </div>
      )}

      {/* Step 5 — notes */}
      {step === 4 && (
        <div className="space-y-2">
          <p className="text-gray-400 text-xs">What fought back this week? What clicked? One honest paragraph feeds next week's focus.</p>
          <textarea
            value={draft.notes}
            onChange={(e) => setDraft((d) => ({ ...d, notes: e.target.value }))}
            placeholder="The G→C change still drags. Song 1 chorus finally feels automatic…"
            className="w-full bg-gray-900 border border-gray-700 rounded-xl p-3 text-gray-100 text-sm resize-y min-h-[90px]"
          />
        </div>
      )}

      {/* Nav */}
      <div className="flex justify-between pt-1">
        <button
          onClick={() => setStep((s) => s - 1)}
          disabled={step === 0}
          className="px-4 py-2 rounded-lg text-sm font-bold border border-gray-700 text-gray-300 disabled:text-gray-700 disabled:border-gray-800"
        >
          Back
        </button>
        {step < STEPS.length - 1 ? (
          <button
            onClick={() => setStep((s) => s + 1)}
            disabled={!canNext}
            className="px-5 py-2 rounded-lg text-sm font-bold bg-teal-600 hover:bg-teal-500 text-white disabled:bg-gray-700 disabled:text-gray-500"
          >
            Next
          </button>
        ) : (
          <button onClick={finish} className="px-5 py-2 rounded-lg text-sm font-bold bg-rose-500 hover:bg-rose-400 text-white">
            Save week {week} assessment
          </button>
        )}
      </div>
    </div>
  );
}
