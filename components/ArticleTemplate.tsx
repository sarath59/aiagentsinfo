import type { ReactNode } from "react";
import { BylineLink } from "@/components/BylineLink";
import { CompanyMarks, InlineCompanyText } from "@/components/CompanyMarks";
import { ContentCard } from "@/components/ContentCard";
import { TableOfContents } from "@/components/TableOfContents";
import type { TocItem } from "@/lib/markdown";
import { formatDate } from "@/lib/utils";

export type RelatedCard = {
  href: string;
  title: string;
  description?: string;
  kicker: string;
  date?: string;
  readingMinutes?: number;
};

export type KeyNumber = {
  value: string;
  label: string;
  note?: string;
};

function dateStamp(value: string) {
  return value.slice(0, 10);
}

export function ArticleTemplate({
  category,
  title,
  description,
  thesis,
  published,
  updated,
  readingMinutes,
  byline,
  companies,
  details,
  actions,
  keyNumbers,
  executiveSummary,
  takeaways,
  toc = [],
  methodology,
  sources,
  sourcesTitle = "Sources",
  sourcesId = "sources",
  citation,
  related,
  wide = false,
  shell = "article",
  children,
}: {
  category: string;
  title: string;
  description: string;
  /** One-line claim under the title. Report pages use this. The meta description stays in `description`. */
  thesis?: string;
  published: string;
  updated?: string;
  readingMinutes?: number;
  byline?: string;
  companies?: string[];
  details?: ReactNode;
  actions?: ReactNode;
  keyNumbers?: KeyNumber[];
  executiveSummary?: ReactNode;
  takeaways?: string[];
  toc?: TocItem[];
  methodology?: ReactNode;
  sources?: ReactNode;
  sourcesTitle?: string;
  sourcesId?: string;
  citation?: ReactNode;
  related?: RelatedCard[];
  wide?: boolean;
  shell?: "article" | "report";
  children: ReactNode;
}) {
  const report = shell === "report";
  const modified = updated || undefined;
  const findingsId = report ? "key-findings" : "key-takeaways";
  const chapterToc = report ? toc : [
    ...(takeaways?.length ? [{ id: findingsId, text: "Key takeaways", level: 2 as const }] : []),
    ...toc,
  ];
  const preface: { id: string; text: string }[] = [];
  if (report && executiveSummary) preface.push({ id: "executive-summary", text: "Executive summary" });
  if (report && takeaways?.length) preface.push({ id: findingsId, text: "Key findings" });
  const tail: { id: string; text: string }[] = [];
  if (report && sources) tail.push({ id: sourcesId, text: sourcesTitle });

  return (
    <article className={report ? "article-shell report-shell" : "article-shell"}>
      <div className="mx-auto max-w-6xl px-4 pb-20 pt-8 sm:pt-10">
        <header className="article-hero">
          <div className="article-hero-panel">
            <div className="article-hero-bar" aria-hidden="true" />
            <p>
              <span className="article-pill">{category}</span>
            </p>
            <h1 className="display article-title">{title}</h1>
            <p className={thesis ? "report-thesis" : "article-dek"}>{thesis ?? description}</p>
            {details ? <div className="article-details">{details}</div> : null}
            <div className="article-meta">
              <span>
                Published <time dateTime={dateStamp(published)}>{formatDate(published)}</time>
              </span>
              {modified ? (
                <span>
                  Updated <time dateTime={dateStamp(modified)}>{formatDate(modified)}</time>
                </span>
              ) : null}
              {readingMinutes ? <span>{readingMinutes} min read</span> : null}
              {byline ? (
                <span>
                  <BylineLink name={byline} />
                </span>
              ) : null}
            </div>
            {companies?.length ? (
              <div className="article-companies">
                <CompanyMarks slugs={companies} />
              </div>
            ) : null}
            {actions ? <div className="article-actions no-print">{actions}</div> : null}
          </div>
        </header>

        {keyNumbers?.length ? (
          <ul className="report-numbers" aria-label="Key numbers">
            {keyNumbers.map((item) => (
              <li key={item.label}>
                <p className="report-numbers-value">{item.value}</p>
                <p className="report-numbers-label">{item.label}</p>
                {item.note ? <p className="report-numbers-note">{item.note}</p> : null}
              </li>
            ))}
          </ul>
        ) : null}

        <div className={`article-layout ${wide ? "is-wide" : "is-prose"}`}>
          <div className="article-column">
            {executiveSummary ? (
              <section className="report-summary" id="executive-summary" aria-labelledby="executive-summary-heading">
                <h2 id="executive-summary-heading" className="report-unnumbered">
                  Executive summary
                </h2>
                {executiveSummary}
              </section>
            ) : null}
            {takeaways?.length ? (
              <section className={report ? "report-findings" : "takeaways"} id={findingsId} aria-labelledby="key-findings-heading">
                <h2 id="key-findings-heading" className="kicker">
                  {report ? "Key findings" : "Key takeaways"}
                </h2>
                {report ? (
                  <ol>
                    {takeaways.map((item, index) => (
                      <li key={item}>
                        <span className="report-finding-index">{String(index + 1).padStart(2, "0")}</span>
                        <InlineCompanyText text={item} />
                      </li>
                    ))}
                  </ol>
                ) : (
                  <ul>
                    {takeaways.map((item) => (
                      <li key={item}>
                        <InlineCompanyText text={item} />
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ) : null}
            <div className={wide ? "article-wide" : "article-measure article-prose"}>{children}</div>
            {methodology ? (
              <section className="report-method" id="methodology" aria-labelledby="methodology-heading">
                <h2 id="methodology-heading">Methodology</h2>
                {methodology}
              </section>
            ) : null}
            {sources ? (
              <section className="article-sources" id={sourcesId}>
                <h2 className="report-unnumbered">{sourcesTitle}</h2>
                {sources}
              </section>
            ) : null}
            {citation ? (
              <div className="article-citation" id="citation">
                {citation}
              </div>
            ) : null}
          </div>
          {chapterToc.length || preface.length ? (
            <aside className="article-toc no-print">
              {preface.length ? (
                <nav aria-label="Report front matter" className="report-toc-preface">
                  <p className="kicker mb-3">Contents</p>
                  <ul>
                    {preface.map((item) => (
                      <li key={item.id}>
                        <a href={`#${item.id}`}>{item.text}</a>
                      </li>
                    ))}
                  </ul>
                </nav>
              ) : null}
              {chapterToc.length ? <TableOfContents items={chapterToc} numbered={report} /> : null}
              {tail.length ? (
                <ul className="report-toc-tail">
                  {tail.map((item) => (
                    <li key={item.id}>
                      <a href={`#${item.id}`}>{item.text}</a>
                    </li>
                  ))}
                </ul>
              ) : null}
            </aside>
          ) : null}
        </div>

        {related?.length ? (
          <section className="article-related" aria-labelledby="related-heading">
            <h2 id="related-heading" className="display text-3xl">
              Related reading
            </h2>
            <div className="content-grid mt-6">
              {related.map((item) => (
                <ContentCard
                  key={item.href}
                  href={item.href}
                  kicker={item.kicker}
                  title={item.title}
                  description={item.description ?? ""}
                  date={item.date}
                  readingMinutes={item.readingMinutes}
                />
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </article>
  );
}
