import Link from "next/link";
import { ArrowIcon } from "@/components/Icons";
import type { ReportEntry } from "@/lib/report-catalog";
import { formatDate } from "@/lib/utils";

function meta(entry: ReportEntry) {
  return [entry.date ? formatDate(entry.date) : "", entry.readingMinutes ? `${entry.readingMinutes} min read` : ""]
    .filter(Boolean)
    .join(" · ");
}

function issueLabel(issue: number) {
  return `No. ${String(issue).padStart(2, "0")}`;
}

/** Decorative cover art. Four patterns, picked by issue number so a grid never repeats side by side. */
function CoverArt({ pattern }: { pattern: number }) {
  if (pattern === 0) {
    return (
      <svg viewBox="0 0 320 150" preserveAspectRatio="xMidYMid slice" aria-hidden="true" className="cover-art">
        {[28, 52, 76, 100, 124, 148].map((r, i) => (
          <circle key={r} cx="300" cy="150" r={r} className={i === 2 ? "cover-gold" : "cover-line"} />
        ))}
        <circle cx="300" cy="150" r="6" className="cover-dot" />
      </svg>
    );
  }
  if (pattern === 1) {
    const points = "0,118 40,110 80,114 120,92 160,96 200,70 240,58 280,40 320,30";
    return (
      <svg viewBox="0 0 320 150" preserveAspectRatio="xMidYMid slice" aria-hidden="true" className="cover-art">
        {Array.from({ length: 6 }, (_, i) => (
          <line key={i} x1="0" x2="320" y1={20 + i * 22} y2={20 + i * 22} className="cover-grid" />
        ))}
        <polyline points={`${points} 320,150 0,150`} className="cover-fill" />
        <polyline points={points} className="cover-gold" />
        <circle cx="280" cy="40" r="4" className="cover-dot" />
      </svg>
    );
  }
  if (pattern === 2) {
    const bars = [62, 88, 48, 104, 76, 120, 94];
    return (
      <svg viewBox="0 0 320 150" preserveAspectRatio="xMidYMid slice" aria-hidden="true" className="cover-art">
        {bars.map((h, i) => (
          <rect
            key={i}
            x={34 + i * 40}
            y={150 - h}
            width="18"
            height={h}
            rx="2"
            className={i === 5 ? "cover-bar-gold" : "cover-bar"}
          />
        ))}
      </svg>
    );
  }
  const nodes: [number, number][] = [
    [60, 40], [140, 26], [230, 52], [290, 24], [100, 104], [190, 112], [270, 108],
  ];
  const edges: [number, number][] = [[0, 1], [1, 2], [2, 3], [0, 4], [4, 5], [5, 6], [1, 5], [2, 6]];
  return (
    <svg viewBox="0 0 320 150" preserveAspectRatio="xMidYMid slice" aria-hidden="true" className="cover-art">
      {edges.map(([a, b]) => (
        <line
          key={`${a}-${b}`}
          x1={nodes[a][0]}
          y1={nodes[a][1]}
          x2={nodes[b][0]}
          y2={nodes[b][1]}
          className={a === 1 && b === 5 ? "cover-gold" : "cover-line"}
        />
      ))}
      {nodes.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={i === 5 ? 5 : 3.5} className={i === 5 ? "cover-dot" : "cover-node"} />
      ))}
    </svg>
  );
}

export function ReportCover({
  entry,
  issue,
  headingLevel = 3,
  showSummary = false,
}: {
  entry: ReportEntry;
  issue: number;
  headingLevel?: 2 | 3;
  showSummary?: boolean;
}) {
  const Heading = headingLevel === 2 ? "h2" : "h3";
  const line = meta(entry);
  return (
    <article className="report-cover click-card">
      <div className="report-cover-art">
        <CoverArt pattern={issue % 4} />
        <span className="report-cover-issue">{issueLabel(issue)}</span>
        <span className="report-cover-kicker">{entry.kicker}</span>
      </div>
      <div className="report-cover-body">
        <Heading className="report-cover-title">
          <Link className="card-stretch focus-ring" href={entry.href}>
            {entry.title}
          </Link>
        </Heading>
        {showSummary ? <p className="report-cover-summary">{entry.summary}</p> : null}
        {line ? <p className="report-cover-meta">{line}</p> : null}
      </div>
    </article>
  );
}

export function FlagshipCover({ entry, headingLevel = 3 }: { entry: ReportEntry; headingLevel?: 2 | 3 }) {
  const Heading = headingLevel === 2 ? "h2" : "h3";
  const line = meta(entry);
  return (
    <article className="flagship-cover click-card">
      <div className="flagship-cover-copy">
        <p className="flagship-cover-label">
          <span>Flagship report</span>
          <span aria-hidden="true">·</span>
          <span>Vol. I</span>
        </p>
        <Heading className="flagship-cover-title">
          <Link className="card-stretch focus-ring" href={entry.href}>
            {entry.title}
          </Link>
        </Heading>
        <p className="flagship-cover-summary">{entry.summary}</p>
        <div className="flagship-cover-foot">
          {line ? <p className="flagship-cover-meta">{line}</p> : null}
          <span className="flagship-cover-cta" aria-hidden="true">
            Read the report
            <ArrowIcon className="h-3.5 w-3.5" />
          </span>
        </div>
      </div>
      <div className="flagship-cover-art" aria-hidden="true">
        <svg viewBox="0 0 360 360" className="cover-art">
          {[40, 80, 120, 160].map((r) => (
            <circle key={r} cx="180" cy="180" r={r} className="cover-line" />
          ))}
          <circle cx="180" cy="180" r="120" className="cover-gold flagship-orbit" strokeDasharray="4 10" />
          {Array.from({ length: 12 }, (_, i) => {
            const angle = (i / 12) * Math.PI * 2;
            return (
              <line
                key={i}
                x1={180 + Math.cos(angle) * 40}
                y1={180 + Math.sin(angle) * 40}
                x2={180 + Math.cos(angle) * 160}
                y2={180 + Math.sin(angle) * 160}
                className="cover-grid"
              />
            );
          })}
          <circle cx="180" cy="180" r="14" className="cover-dot" />
          <circle cx="300" cy="180" r="5" className="cover-dot" />
          <circle cx="100" cy="90" r="4" className="cover-node" />
          <circle cx="120" cy="290" r="4" className="cover-node" />
        </svg>
        <p className="flagship-cover-mark">12-month outlook</p>
      </div>
    </article>
  );
}
