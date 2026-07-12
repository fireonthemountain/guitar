import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { NOTE_NAMES } from '../../utils/guitarScales';
import ScaleBoard from './ScaleBoard';

// A rotating "scale of the day" so the warm-up varies — drawn from the scales
// the Dead program actually leans on. Rotates by program day.
const DAILY = [
  { rootIdx: 4, type: 'Mixolydian' },        // E Mixolydian — the home sound
  { rootIdx: 11, type: 'Pentatonic Major' }, // B major pentatonic — the Jerry box
  { rootIdx: 9, type: 'Mixolydian' },        // A Mixolydian
  { rootIdx: 4, type: 'Blues' },             // E blues
  { rootIdx: 9, type: 'Pentatonic Minor' },  // A minor pentatonic
];

// Collapsible warm-up: an interactive scale drill (with box positions) for the
// day's rotating scale.
export default function ScaleWarmup({ day = 1 }) {
  const seed = DAILY[(day - 1) % DAILY.length];
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-gray-800 rounded-2xl overflow-hidden border border-gray-700">
      <button onClick={() => setOpen((o) => !o)} className="w-full flex items-center justify-between px-4 py-3 text-left">
        <div>
          <div className="text-teal-400 text-[10px] font-bold tracking-[2px]">WARM-UP · SCALE OF THE DAY</div>
          <div className="text-white font-semibold text-sm mt-0.5">{NOTE_NAMES[seed.rootIdx]} {seed.type}</div>
        </div>
        <ChevronDown size={18} className={`text-gray-400 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="px-4 pb-4">
          <ScaleBoard initialRoot={seed.rootIdx} initialType={seed.type} />
        </div>
      )}
    </div>
  );
}
