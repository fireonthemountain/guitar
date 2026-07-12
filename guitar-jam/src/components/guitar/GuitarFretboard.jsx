import { memo } from 'react';
import { NOTE_NAMES, getNoteAtFret, getMidiAtFret, STRING_NAMES } from '../../utils/guitarScales';
import { playGuitarNote } from '../../utils/audioEngine';

// Layout constants for full (12-fret) mode
const FULL_NUT_X = 58;
const FULL_FRET_W = 52;
const FULL_NUM_FRETS = 12;

// Layout constants for position (box) mode — fits on mobile without scrolling
const POS_NUT_X = 50;
const POS_FRET_W = 60;

const STRING_Y_START = 34;
const STRING_Y_GAP = 27;
const CIRCLE_R_FULL = 10;
const CIRCLE_R_POS = 13;
const FRET_MARKER_FRETS = [3, 5, 7, 9];

function sY(i) { return STRING_Y_START + i * STRING_Y_GAP; }

const BOARD_Y1 = STRING_Y_START - 14;
const BOARD_H = 5 * STRING_Y_GAP + 28;
const midY = STRING_Y_START + 2.5 * STRING_Y_GAP;

// Two modes, same layout:
//  • scale mode — pass scaleNotes + rootIdx; highlights playingNote (a pitch class)
//  • tab  mode — pass positions (+ activePositions), each { stringIdx, fret }
function GuitarFretboard({
  scaleNotes,
  rootIdx,
  minFret = 0,
  maxFret = 12,
  playingNote = null,
  positions = null,
  activePositions = null,
}) {
  const isPositionMode = minFret > 0;

  const tabMode = Array.isArray(positions);
  const posSet = tabMode ? new Set(positions.map((p) => `${p.stringIdx}-${p.fret}`)) : null;
  // A specific set of highlighted positions (string+fret) takes precedence over
  // the pitch-class playingNote — used to light exactly one note during a
  // position/walk playback instead of every occurrence of that pitch.
  const activeSet = activePositions && activePositions.length
    ? new Set(activePositions.map((p) => `${p.stringIdx}-${p.fret}`))
    : null;
  const cellVisible = (si, fret, note) => (tabMode ? posSet.has(`${si}-${fret}`) : scaleNotes.includes(note));
  const cellActive = (si, fret, note) => {
    if (activeSet) return activeSet.has(`${si}-${fret}`);
    return tabMode ? false : note === playingNote;
  };
  const cellRoot = (note) => (!tabMode && note === rootIdx);

  // Frets to display (columns for fret wires/notes)
  const firstFret = isPositionMode ? minFret : 1;
  const lastFret = maxFret;
  const numCols = lastFret - firstFret + 1;

  const NUT_X = isPositionMode ? POS_NUT_X : FULL_NUT_X;
  const FRET_W = isPositionMode ? POS_FRET_W : FULL_FRET_W;
  const CIRCLE_R = isPositionMode ? CIRCLE_R_POS : CIRCLE_R_FULL;
  const FONT_SIZE = isPositionMode ? 9.5 : 7.5;

  const SVG_W = NUT_X + numCols * FRET_W + 18;
  const SVG_H = STRING_Y_START + 5 * STRING_Y_GAP + 22;

  // x-center for a given fret column
  function fretCX(fret) {
    if (fret === 0) return 36; // open string column
    const col = fret - firstFret; // 0-indexed from leftmost displayed fret
    return NUT_X + (col + 0.5) * FRET_W;
  }

  // Wire x for the boundary after column `col`
  function wireX(col) {
    return NUT_X + col * FRET_W;
  }

  return (
    <div className="overflow-x-auto -mx-1">
      <svg
        viewBox={`0 0 ${SVG_W} ${SVG_H}`}
        width={SVG_W}
        height={SVG_H}
        style={{ minWidth: SVG_W, display: 'block' }}
      >
        {/* Fretboard wood background */}
        <rect x={NUT_X} y={BOARD_Y1} width={numCols * FRET_W} height={BOARD_H} fill="#3b2010" rx={2} />

        {/* Fret position marker dots (only in full mode where frets are known) */}
        {!isPositionMode &&
          FRET_MARKER_FRETS.map(f =>
            f >= firstFret && f <= lastFret ? (
              <circle key={f} cx={fretCX(f)} cy={midY} r={4.5} fill="#5a3820" />
            ) : null
          )}
        {!isPositionMode && lastFret >= 12 && (
          <>
            <circle cx={fretCX(12)} cy={midY - 19} r={4.5} fill="#5a3820" />
            <circle cx={fretCX(12)} cy={midY + 19} r={4.5} fill="#5a3820" />
          </>
        )}

        {/* Nut / start-of-window indicator */}
        {isPositionMode ? (
          // In position mode: show fret number label on left instead of nut
          <text x={NUT_X - 6} y={SVG_H - 6} textAnchor="end" fontSize={9} fill="#6b7280" fontFamily="monospace">
            fr {minFret}
          </text>
        ) : null}

        {/* Fret wires */}
        {/* Nut line */}
        {!isPositionMode && (
          <line
            x1={NUT_X}
            y1={BOARD_Y1 + 2}
            x2={NUT_X}
            y2={BOARD_Y1 + BOARD_H - 2}
            stroke="#d1d5db"
            strokeWidth={4}
          />
        )}
        {/* Regular fret wires */}
        {Array.from({ length: numCols }, (_, i) => (
          <line
            key={i}
            x1={wireX(i + 1)}
            y1={BOARD_Y1 + 2}
            x2={wireX(i + 1)}
            y2={BOARD_Y1 + BOARD_H - 2}
            stroke="#9ca3af"
            strokeWidth={1.5}
          />
        ))}

        {/* Strings */}
        {STRING_NAMES.map((name, i) => (
          <g key={i}>
            <line
              x1={isPositionMode ? NUT_X : 28}
              y1={sY(i)}
              x2={SVG_W - 6}
              y2={sY(i)}
              stroke="#c8a850"
              strokeWidth={0.6 + i * 0.45}
              opacity={0.75}
            />
            {!isPositionMode && (
              <text x={20} y={sY(i) + 4} textAnchor="middle" fontSize={9} fill="#6b7280" fontFamily="monospace">
                {name}
              </text>
            )}
            {isPositionMode && (
              <text x={NUT_X - 6} y={sY(i) + 4} textAnchor="end" fontSize={9} fill="#6b7280" fontFamily="monospace">
                {name}
              </text>
            )}
          </g>
        ))}

        {/* Fret numbers */}
        {Array.from({ length: numCols }, (_, i) => {
          const fret = firstFret + i;
          return (
            <text
              key={fret}
              x={fretCX(fret)}
              y={STRING_Y_START - 18}
              textAnchor="middle"
              fontSize={isPositionMode ? 10 : 8.5}
              fill={isPositionMode ? '#9ca3af' : '#4b5563'}
            >
              {fret}
            </text>
          );
        })}

        {/* Open string circles (full mode only) */}
        {!isPositionMode &&
          Array.from({ length: 6 }, (_, si) => {
            const note = getNoteAtFret(si, 0);
            if (!cellVisible(si, 0, note)) return null;
            const isRoot = cellRoot(note);
            const isPlaying = cellActive(si, 0, note);
            const cx = 36;
            const cy = sY(si);
            return (
              <g key={`open-${si}`} onClick={() => playGuitarNote(getMidiAtFret(si, 0))} style={{ cursor: 'pointer' }}>
                <circle cx={cx} cy={cy} r={CIRCLE_R + (isPlaying ? 3 : 0)} fill={isRoot ? '#f59e0b' : '#0d9488'} opacity={isPlaying ? 1 : 0.9} />
                <text x={cx} y={cy + 3.5} textAnchor="middle" fontSize={FONT_SIZE} fontWeight="bold" fill={isRoot ? '#1c1917' : '#ffffff'}>
                  {NOTE_NAMES[note]}
                </text>
              </g>
            );
          })}

        {/* Fretted note circles */}
        {Array.from({ length: 6 }, (_, si) =>
          Array.from({ length: numCols }, (_, col) => {
            const fret = firstFret + col;
            const note = getNoteAtFret(si, fret);
            if (!cellVisible(si, fret, note)) return null;
            const isRoot = cellRoot(note);
            const isPlaying = cellActive(si, fret, note);
            const cx = fretCX(fret);
            const cy = sY(si);
            const r = CIRCLE_R + (isPlaying ? 3 : 0);
            return (
              <g
                key={`${si}-${fret}`}
                onClick={() => playGuitarNote(getMidiAtFret(si, fret))}
                style={{ cursor: 'pointer' }}
              >
                <circle cx={cx} cy={cy} r={r} fill={isRoot ? '#f59e0b' : '#0d9488'} opacity={isPlaying ? 1 : 0.92} />
                {isPlaying && (
                  <circle cx={cx} cy={cy} r={r + 4} fill="none" stroke={isRoot ? '#f59e0b' : '#0d9488'} strokeWidth={2} opacity={0.5} />
                )}
                <text x={cx} y={cy + 3.5} textAnchor="middle" fontSize={FONT_SIZE} fontWeight="bold" fill={isRoot ? '#1c1917' : '#ffffff'}>
                  {NOTE_NAMES[note]}
                </text>
              </g>
            );
          })
        )}
      </svg>
    </div>
  );
}

export default memo(GuitarFretboard);
