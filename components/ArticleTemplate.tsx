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

function dateStamp(value: string) {
  return value.slice(0, 10);
}

export function ArticleTemplate({
  category,
  title,
  description,
  published,
  updated,
  readingMinutes,
  byline,
  companies,
  details,
  actions,
  takeaways,
  toc = [],
  sources,
  sourcesTitle = "Sources",
  sourcesId = "sources",
  citation,
  related,
  wide = false,
  children,
}: {
  category: string;
  title: string;
  description: string;
  published: string;
  updated?: string;
  readingMinutes?: number;
  byline?: string;
  companies?: string[];
  details?: ReactNode;
  actions?: ReactNode;
  takeaways?: string[];
  toc?: TocItem[];
  sources?: ReactNode;
  sourcesTitle?: string;
  sourcesId?: string;
  citation?: ReactNode;
  related?: RelatedCard[];
  wide?: boolean;
  children: ReactNode;
}) {
  const modified = updated && updated.slice(0, 10) !== published.slice(0, 10) ? updated : undefined;
  const tocItems: TocItem[] = [
    ...(takeaways?.length ? [{ id: "key-takeaways", text: "Key takeaways", level: 2 as const }] : []),
    ...toc,
  ];

  return (
    <article className="article-shell">
      <div className="mx-auto max-w-6xl px-4 pb-20 pt-8 sm:pt-10">
        <header className="article-hero">
          <div className="article-hero-panel">
            <div className="article-hero-bar" aria-hidden="true" />
            <p>
              <span className="article-pill">{category}</span>
            </p>
            <h1 className="display article-title">{title}</h1>
            <p className="article-dek">{description}</p>
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

        <div className={`article-layout ${wide ? "is-wide" : "is-prose"}`}>
          <div className="article-column">
            {takeaways?.length ? (
              <section className="takeaways" id="key-takeaways" aria-labelledby="key-takeaways-heading">
                <h2 id="key-takeaways-heading" className="kicker">
                  Key takeaways
                </h2>
                <ul>
                  {takeaways.map((item) => (
                    <li key={item}>
                      <InlineCompanyText text={item} />
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}
            <div className={wide ? "article-wide" : "article-measure article-prose"}>{children}</div>
            {sources ? (
              <section className="article-sources" id={sourcesId}>
                <h2>{sourcesTitle}</h2>
                {sources}
              </section>
            ) : null}
            {citation ? (
              <div className="article-citation" id="citation">
                {citation}
              </div>
            ) : null}
          </div>
          {tocItems.length ? (
            <aside className="article-toc no-print">
              <TableOfContents items={tocItems} />
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
