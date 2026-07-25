// Gig-readiness gauge: 0–100 arc. Null score = no assessment yet.

const color = (s) => (s === null ? '#4b5563' : s < 40 ? '#f43f5e' : s < 70 ? '#f59e0b' : '#10b981');

export default function ReadinessDial({ score, size = 150 }) {
  const R = 62, CX = 75, CY = 78;
  const arc = (from, to) => {
    const x1 = CX + R * Math.cos(from), y1 = CY + R * Math.sin(from);
    const x2 = CX + R * Math.cos(to), y2 = CY + R * Math.sin(to);
    const large = to - from > Math.PI ? 1 : 0;
    return `M ${x1.toFixed(1)} ${y1.toFixed(1)} A ${R} ${R} 0 ${large} 1 ${x2.toFixed(1)} ${y2.toFixed(1)}`;
  };
  // Gauge runs clockwise from 155° through the top to 25°: 230° of travel, open at the bottom.
  const a0 = (155 * Math.PI) / 180;
  const travel = (230 * Math.PI) / 180;
  const frac = score === null ? 0 : score / 100;

  return (
    <svg width={size} height={size * 0.87} viewBox="0 0 150 130">
      <path d={arc(a0, a0 + travel)} stroke="#374151" strokeWidth="10" fill="none" strokeLinecap="round" />
      {frac > 0 && (
        <path d={arc(a0, a0 + travel * frac)} stroke={color(score)} strokeWidth="10" fill="none" strokeLinecap="round" />
      )}
      <text x="75" y="78" textAnchor="middle" fill={score === null ? '#6b7280' : '#f4f4f5'} style={{ font: '700 34px ui-serif, Georgia, serif' }}>
        {score === null ? '—' : score}
      </text>
      <text x="75" y="98" textAnchor="middle" fill="#a1a1aa" style={{ font: '600 9px sans-serif', letterSpacing: '2px' }}>
        GIG READINESS
      </text>
    </svg>
  );
}
