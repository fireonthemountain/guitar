// Tiny SVG line chart for weekly series: points = [{week, value}], sorted by week.
// Optional `target` draws a dashed goal line. No chart library — one polyline.

export default function TrendChart({ points, min, max, target, color = '#2dd4bf', label, unit = '' }) {
  const W = 280, H = 90, PAD = { l: 26, r: 8, t: 10, b: 18 };
  const iw = W - PAD.l - PAD.r, ih = H - PAD.t - PAD.b;
  const weeks = 13;
  const x = (w) => PAD.l + (w / weeks) * iw;
  const y = (v) => PAD.t + ih - ((v - min) / (max - min)) * ih;

  const path = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${x(p.week).toFixed(1)} ${y(p.value).toFixed(1)}`).join(' ');
  const last = points.at(-1);

  return (
    <div>
      {label && (
        <div className="flex items-baseline justify-between mb-1">
          <span className="text-gray-500 text-[10px] font-bold tracking-[2px]">{label}</span>
          {last && <span className="text-sm font-bold" style={{ color }}>{last.value}{unit}</span>}
        </div>
      )}
      <svg width="100%" viewBox={`0 0 ${W} ${H}`} style={{ display: 'block' }}>
        {[min, max].map((v) => (
          <g key={v}>
            <line x1={PAD.l} y1={y(v)} x2={W - PAD.r} y2={y(v)} stroke="#374151" strokeWidth="1" />
            <text x={PAD.l - 4} y={y(v) + 3} textAnchor="end" fill="#6b7280" style={{ font: '9px sans-serif' }}>{v}</text>
          </g>
        ))}
        {target != null && (
          <g>
            <line x1={PAD.l} y1={y(target)} x2={W - PAD.r} y2={y(target)} stroke="#f59e0b" strokeWidth="1" strokeDasharray="4 3" />
            <text x={W - PAD.r} y={y(target) - 3} textAnchor="end" fill="#f59e0b" style={{ font: '9px sans-serif' }}>goal {target}{unit}</text>
          </g>
        )}
        {[0, 4, 9, 13].map((w) => (
          <text key={w} x={x(w)} y={H - 4} textAnchor="middle" fill="#6b7280" style={{ font: '9px sans-serif' }}>w{w}</text>
        ))}
        {points.length > 1 && <path d={path} stroke={color} strokeWidth="2" fill="none" />}
        {points.map((p) => (
          <circle key={p.week} cx={x(p.week)} cy={y(p.value)} r="3" fill={color} />
        ))}
      </svg>
    </div>
  );
}
