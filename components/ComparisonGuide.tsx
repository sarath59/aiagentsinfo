import type { ReactNode } from "react";
import { ArticleTemplate } from "@/components/ArticleTemplate";
import { CiteOrEmbed } from "@/components/CiteOrEmbed";
import { CompanyLogo } from "@/components/CompanyLogo";
import { SourceList } from "@/components/CompanyMarks";
import { FaqList } from "@/components/FaqList";
import { NewsletterSignup } from "@/components/newsletter/NewsletterSignup";
import { SortableTable } from "@/components/SortableTable";
import {
  COMPARISON_HUB,
  COMPARISON_VERIFIED_LABEL,
  COMPARISON_VERIFIED_ON,
  comparisonItemListItems,
  comparisonLogo,
  comparisonRows,
  type ComparisonPage,
} from "@/lib/comparisons";
import {
  breadcrumbJsonLd,
  faqPageJsonLd,
  itemListJsonLd,
  JsonLd,
  organizationJsonLd,
  webPageJsonLd,
} from "@/lib/seo";
import { absoluteUrl, site } from "@/lib/site";
import { formatDate } from "@/lib/utils";

export function ComparisonGuide({
  page,
  children,
  toc,
}: {
  page: ComparisonPage;
  children: ReactNode;
  toc: { id: string; text: string; level: 2 | 3 }[];
}) {
  const updatedLabel = formatDate(COMPARISON_VERIFIED_ON);
  const pageUrl = absoluteUrl(page.path);
  const citation = `AI Agents Info. "${page.title}." Last verified ${COMPARISON_VERIFIED_LABEL}. ${pageUrl}.`;
  const embed = `<blockquote cite="${pageUrl}">
<p>${page.description}</p>
<footer><a href="${pageUrl}">${page.title}</a>, AI Agents Info, last verified ${COMPARISON_VERIFIED_LABEL}.</footer>
</blockquote>`;

  return (
    <>
      <JsonLd
        data={[
          organizationJsonLd(),
          webPageJsonLd({
            title: page.heading,
            description: page.metaDescription,
            path: page.path,
            datePublished: COMPARISON_VERIFIED_ON,
            dateModified: COMPARISON_VERIFIED_ON,
          }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: COMPARISON_HUB.title, path: COMPARISON_HUB.href },
            { name: page.title, path: page.path },
          ]),
          faqPageJsonLd(page.faq),
          itemListJsonLd({
            name: page.title,
            description: page.summary,
            path: page.path,
            items: comparisonItemListItems(page),
          }),
        ]}
      />
      <ArticleTemplate
        category="Comparison"
        title={page.heading}
        description={page.description}
        published={COMPARISON_VERIFIED_ON}
        updated={COMPARISON_VERIFIED_ON}
        byline={site.bylines.editorial}
        wide
        takeaways={page.takeaways}
        toc={toc}
        sources={<SourceList sources={page.sources} />}
        citation={<CiteOrEmbed citation={citation} embed={embed} />}
        related={page.related}
        details={
          <p className="text-sm text-[var(--muted)]">
            Last verified {updatedLabel}. Cells are licence, list price, and platform from official pages. This is not
            a quality ranking.
          </p>
        }
      >
        <p className="text-sm font-medium text-[var(--gold)]">Last verified {COMPARISON_VERIFIED_LABEL}</p>
        {children}
        <section className="mt-12" id="comparison-table">
          <h2 className="text-2xl font-semibold tracking-tight">{page.tableHeading}</h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-[var(--muted)]">{page.tableLead}</p>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-[var(--muted)]">
            Sort any column. A blank would mean the official page did not state the fact. Source numbers match the
            list at the end of the page. Last verified {updatedLabel}. The shelf for this table is{" "}
            <a className="text-[var(--link)] underline" href={COMPARISON_HUB.href}>
              {COMPARISON_HUB.title}
            </a>
            .
          </p>
          <ul className="mt-5 flex flex-wrap items-center gap-3">
            {page.rows.map((row) => (
              <li key={row.id} className="flex items-center gap-2">
                <CompanyLogo name={row.name} src={comparisonLogo(row)} size="sm" loading="lazy" />
                <span className="text-xs text-[var(--muted)]">{row.name}</span>
              </li>
            ))}
          </ul>
          <div className="mt-5">
            <SortableTable
              caption={page.tableCaption}
              columns={page.columns}
              rows={comparisonRows(page.rows)}
              defaultSort="name"
              defaultDirection="asc"
            />
          </div>
        </section>
        <section className="mt-12" id="best-for">
          <h2 className="text-2xl font-semibold tracking-tight">{page.bestForHeading}</h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-[var(--muted)]">{page.bestForLead}</p>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-[var(--muted)]">
            These are job-fit notes from the documented scope, not scores.
          </p>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2">
            {page.picks.map((pick) => (
              <li key={pick.title} className="glass rounded-3xl p-5">
                <h3 className="text-lg font-semibold tracking-tight">{pick.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{pick.body}</p>
                {pick.href ? (
                  <p className="mt-3 text-sm">
                    <a className="text-[var(--link)] underline" href={pick.href}>
                      Open the matching listing
                    </a>
                  </p>
                ) : null}
              </li>
            ))}
          </ul>
        </section>
        <section className="mt-12" id="how-this-was-checked">
          <h2 className="text-2xl font-semibold tracking-tight">{page.methodHeading}</h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[var(--muted)]">{page.methodLead}</p>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[var(--muted)]">
            Prices are list prices with the billing unit the vendor printed. Licences are the SPDX or file name on
            the repository, not a guess. This page does not invent ratings, traffic, or a composite score, and it
            does not treat benchmark percentages from different tasks as one experiment.
          </p>
        </section>
        <FaqList
          heading={page.faqHeading}
          lead={page.faqLead}
          items={page.faq.map((item) => ({
            question: item.question,
            answer: <p>{item.answer}</p>,
          }))}
        />
        <div className="mt-14">
          <NewsletterSignup id={`comparison-${page.slug}`} />
        </div>
      </ArticleTemplate>
    </>
  );
}
