import { DataSourceLine } from "@/components/DataSourceLine";
import type { PageSource } from "@/lib/attribution";

const PALETTE = ["#0c5cad", "#0c746e", "#0b1f33", "#e0b04a", "#2f9dff"];

export type ChartSeries = {
  id: string;
  label: string;
  points: { date: string; value: number }[];
};

export function HistoryChart({
  series,
  caption,
  source,
}: {
  series: ChartSeries[];
  caption: string;
  source?: PageSource;
}) {
  const width = 720;
  const height = 280;
  const pad = { top: 16, right: 12, bottom: 36, left: 64 };
  const innerW = width - pad.left - pad.right;
  const innerH = height - pad.top - pad.bottom;
  const dates = [...new Set(series.flatMap((item) => item.points.map((point) => point.date)))].sort();
  const max = Math.max(1, ...series.flatMap((item) => item.points.map((point) => point.value)));
  if (!dates.length) return null;

  function x(date: string) {
    if (dates.length === 1) return pad.left + innerW / 2;
    const index = dates.indexOf(date);
    return pad.left + (index / (dates.length - 1)) * innerW;
  }
  function y(value: number) {
    return pad.top + innerH - (value / max) * innerH;
  }

  const ticks = [0, 0.5, 1].map((fraction) => Math.round(max * fraction));
  const start = dates[0];
  const end = dates[dates.length - 1];

  return (
    <figure className="mt-6 overflow-x-auto">
      <svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label={caption} className="min-w-[36rem] w-full">
        <title>{caption}</title>
        {ticks.map((tick) => (
          <g key={tick}>
            <line
              x1={pad.left}
              x2={width - pad.right}
              y1={y(tick)}
              y2={y(tick)}
              stroke="rgba(12, 42, 74, 0.12)"
            />
            <text x={pad.left - 8} y={y(tick) + 4} textAnchor="end" fontSize="11" fill="#3a5168">
              {tick >= 1_000_000 ? `${Math.round(tick / 1_000_000)}M` : tick >= 1_000 ? `${Math.round(tick / 1_000)}k` : tick}
            </text>
          </g>
        ))}
        {series.map((item, index) => {
          const d = item.points
            .filter((point) => dates.includes(point.date))
            .map((point, pointIndex) => `${pointIndex === 0 ? "M" : "L"}${x(point.date)} ${y(point.value)}`)
            .join(" ");
          return <path key={item.id} d={d} fill="none" stroke={PALETTE[index % PALETTE.length]} strokeWidth="2" />;
        })}
        <text x={pad.left} y={height - 10} fontSize="11" fill="#3a5168">
          {start}
        </text>
        <text x={width - pad.right} y={height - 10} textAnchor="end" fontSize="11" fill="#3a5168">
          {end}
        </text>
      </svg>
      <figcaption className="mt-3 flex flex-wrap gap-4 text-sm text-[var(--muted)]">
        {series.map((item, index) => (
          <span key={item.id} className="inline-flex items-center gap-2">
            <span className="inline-block h-2 w-6 rounded-full" style={{ background: PALETTE[index % PALETTE.length] }} />
            {item.label}
          </span>
        ))}
      </figcaption>
      {source ? <DataSourceLine title={source.title} updated={source.updated} path={source.path} /> : null}
    </figure>
  );
}
