import { NOTE_NAMES } from '../../utils/guitarScales';
import { playPianoNote } from '../../utils/audioEngine';

const WW = 32;
const WH = 108;
const BW = 20;
const BH = 66;
const OCTAVES = 2;
const OCTAVE_W = 7 * WW;
const SVG_W = OCTAVES * OCTAVE_W + 2;
const SVG_H = WH + 20;

const WHITE_KEYS = [
  { note: 0 }, { note: 2 }, { note: 4 },
  { note: 5 }, { note: 7 }, { note: 9 }, { note: 11 },
];

const BLACK_KEYS = [
  { note: 1, xOffset: 22 },
  { note: 3, xOffset: 54 },
  { note: 6, xOffset: 118 },
  { note: 8, xOffset: 150 },
  { note: 10, xOffset: 182 },
];

export default function PianoKeyboard({ scaleNotes, rootIdx, playingNote = null }) {
  const whiteKeyEls = [];
  const blackKeyEls = [];

  for (let oct = 0; oct < OCTAVES; oct++) {
    const ox = oct * OCTAVE_W;
    const octave = oct + 3;

    WHITE_KEYS.forEach(({ note }, wIdx) => {
      const x = ox + wIdx * WW;
      const inScale = scaleNotes.includes(note);
      const isRoot = note === rootIdx;
      const isPlaying = note === playingNote;

      let fill = '#e5e7eb';
      if (isPlaying) fill = isRoot ? '#fcd34d' : '#5eead4';
      else if (isRoot) fill = '#f59e0b';
      else if (inScale) fill = '#0d9488';

      whiteKeyEls.push(
        <g key={`w-${oct}-${note}`} onClick={() => playPianoNote(note, octave)} style={{ cursor: 'pointer' }}>
          <rect x={x + 1} y={1} width={WW - 2} height={WH} rx={3} fill={fill} stroke="#6b7280" strokeWidth={0.5} />
          {isPlaying && (
            <rect x={x + 1} y={1} width={WW - 2} height={WH} rx={3} fill="white" opacity={0.25} />
          )}
          {inScale && (
            <text x={x + WW / 2} y={WH - 8} textAnchor="middle" fontSize={7.5} fontWeight="bold" fill={isRoot ? '#1c1917' : '#ffffff'}>
              {NOTE_NAMES[note]}
            </text>
          )}
          {note === 0 && (
            <text x={x + WW / 2} y={WH + 14} textAnchor="middle" fontSize={8} fill="#4b5563">
              C{octave}
            </text>
          )}
        </g>
      );
    });

    BLACK_KEYS.forEach(({ note, xOffset }) => {
      const x = ox + xOffset;
      const inScale = scaleNotes.includes(note);
      const isRoot = note === rootIdx;
      const isPlaying = note === playingNote;

      let fill = '#1f2937';
      if (isPlaying) fill = isRoot ? '#b45309' : '#0f766e';
      else if (isRoot) fill = '#92400e';
      else if (inScale) fill = '#0f766e';

      blackKeyEls.push(
        <g key={`b-${oct}-${note}`} onClick={() => playPianoNote(note, octave)} style={{ cursor: 'pointer' }}>
          <rect x={x} y={1} width={BW} height={BH} rx={2} fill={fill} stroke="#374151" strokeWidth={0.5} />
          {inScale && (
            <text x={x + BW / 2} y={BH - 5} textAnchor="middle" fontSize={6.5} fontWeight="bold" fill={isRoot ? '#fef3c7' : '#99f6e4'}>
              {NOTE_NAMES[note]}
            </text>
          )}
        </g>
      );
    });
  }

  return (
    <div className="overflow-x-auto -mx-1">
      <svg viewBox={`0 0 ${SVG_W} ${SVG_H}`} width={SVG_W} height={SVG_H} style={{ minWidth: SVG_W, display: 'block' }}>
        {whiteKeyEls}
        {blackKeyEls}
      </svg>
    </div>
  );
}
