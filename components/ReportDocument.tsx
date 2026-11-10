import type { ReactNode } from "react";
import Link from "next/link";
import type { ChartSpec, ReportChapter } from "@/lib/report-model";

const BAR_COLORS = ["#0c5cad", "#0c746e", "#c4922a", "#123456"];

function Inline({ text }: { text: string }) {
  const nodes: ReactNode[] = [];
  const re = /\[\[(\d+)\]\]|\[([^\]]+)\]\(([^)\s]+)\)/g;
  let last = 0;
  let match: RegExpExecArray | null;
  while ((match = re.exec(text))) {
    if (match.index > last) nodes.push(text.slice(last, match.index));
    if (match[1]) {
      const n = match[1];
      nodes.push(
        <sup key={`${match.index}-cite`} className="report-cite">
          <a href={`#source-${n}`}>{n}</a>
        </sup>,
      );
    } else {
      const label = match[2] ?? "";
      const href = match[3] ?? "";
      nodes.push(
        href.startsWith("http") ? (
          <a key={match.index} href={href}>
            {label}
          </a>
        ) : (
          <Link key={match.index} href={href}>
            {label}
          </Link>
        ),
      );
    }
    last = match.index + match[0].length;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return <>{nodes}</>;
}

export function ReportProse({ text }: { text: string }) {
  return (
    <p>
      <Inline text={text} />
    </p>
  );
}

function ChartFigure({ chart }: { chart: ChartSpec }) {
  const width = 680;
  const labelW = 168;
  const gap = 8;
  const barH = 14;
  const rowH = 18 + chart.series.length * (barH + 6);
  const height = 28 + chart.categories.length * rowH;
  const max = Math.max(...chart.categories.flatMap((category) => category.values), 1);
  const barW = width - labelW - 128;
  const titleId = `${chart.id}-title`;
  const descId = `${chart.id}-desc`;
  return (
    <figure className="report-chart" id={chart.id}>
      <figcaption>
        <Inline text={chart.caption} />
      </figcaption>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        role="img"
        aria-labelledby={titleId}
        aria-describedby={descId}
      >
        <title id={titleId}>{chart.title}</title>
        <desc id={descId}>
          {chart.caption} Unit: {chart.unit}. {chart.source}
        </desc>
        {chart.categories.map((category, row) => {
          const y = 16 + row * rowH;
          return (
            <g key={category.label}>
              <text x={0} y={y + 12} fill="#0b1f33" fontSize="12">
                {category.label.length > 28 ? `${category.label.slice(0, 26)}…` : category.label}
              </text>
              {chart.series.map((series, index) => {
                const value = category.values[index] ?? 0;
                const length = (value / max) * barW;
                const by = y + 18 + index * (barH + 6);
                return (
                  <g key={series}>
                    <rect x={labelW} y={by} width={Math.max(length, 1)} height={barH} rx={2} fill={BAR_COLORS[index % BAR_COLORS.length]} />
                    <text x={labelW + length + gap} y={by + 11} fill="#3a5168" fontSize="11">
                      {category.displays[index] ?? String(value)}
                    </text>
                  </g>
                );
              })}
            </g>
          );
        })}
      </svg>
      {chart.series.length > 1 ? (
        <ul className="report-legend">
          {chart.series.map((series, index) => (
            <li key={series}>
              <span style={{ background: BAR_COLORS[index % BAR_COLORS.length] }} />
              {series}
            </li>
          ))}
        </ul>
      ) : null}
      <table>
        <caption className="sr-only">{chart.title}</caption>
        <thead>
          <tr>
            <th scope="col">Category</th>
            {chart.series.map((series) => (
              <th key={series} scope="col">
                {series}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {chart.categories.map((category) => (
            <tr key={category.label}>
              <th scope="row">{category.label}</th>
              {category.displays.map((display, index) => (
                <td key={`${category.label}-${index}`}>{display}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <p className="report-chart-source">
        <Inline text={chart.source} /> Unit: {chart.unit}.
      </p>
    </figure>
  );
}

export function ReportChapters({ chapters, charts }: { chapters: ReportChapter[]; charts: ChartSpec[] }) {
  const byId = new Map(charts.map((chart) => [chart.id, chart]));
  return (
    <>
      {chapters.map((chapter) => (
        <section key={chapter.id} id={chapter.id} className="report-chapter">
          <h2>{chapter.title}</h2>
          {chapter.blocks.map((block, index) => {
            const key = `${chapter.id}-${index}`;
            if (block.kind === "p") return <ReportProse key={key} text={block.text} />;
            if (block.kind === "h3") return <h3 key={key}>{block.text}</h3>;
            if (block.kind === "quote") {
              return (
                <blockquote key={key} className="report-quote">
                  <p>
                    <Inline text={block.text} />
                  </p>
                  <footer>
                    <Inline text={block.cite} />
                  </footer>
                </blockquote>
              );
            }
            if (block.kind === "callout") {
              return (
                <aside key={key} className="report-callout">
                  <p className="kicker">{block.title}</p>
                  <p>
                    <Inline text={block.text} />
                  </p>
                </aside>
              );
            }
            if (block.kind === "means") {
              return (
                <aside key={key} className="report-means">
                  <p className="kicker">What this means for {block.audience.toLowerCase()}</p>
                  <p>
                    <Inline text={block.text} />
                  </p>
                </aside>
              );
            }
            if (block.kind === "chart") {
              const chart = byId.get(block.id);
              return chart ? <ChartFigure key={key} chart={chart} /> : null;
            }
            return (
              <div key={key} className="report-table-wrap">
                <table>
                  <caption>{block.caption}</caption>
                  <thead>
                    <tr>
                      {block.headers.map((header) => (
                        <th key={header} scope="col">
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {block.rows.map((row) => (
                      <tr key={row.join("|")}>
                        {row.map((cell, cellIndex) => (
                          <td key={`${cell}-${cellIndex}`}>
                            <Inline text={cell} />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          })}
        </section>
      ))}
    </>
  );
}

export function SourceList({ sources }: { sources: { n: number; title: string; url: string; detail: string }[] }) {
  return (
    <ol className="source-list">
      {sources.map((source) => (
        <li key={source.n} id={`source-${source.n}`}>
          <span className="source-index">{source.n}</span>
          <span className="source-link">
            <a href={source.url}>{source.title}</a>
            {". "}
            {source.detail}
          </span>
        </li>
      ))}
    </ol>
  );
}
