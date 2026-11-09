import type { ReactNode } from "react";
import { AgentPicker } from "@/components/AgentPicker";
import { ArticleTemplate } from "@/components/ArticleTemplate";
import { CiteOrEmbed } from "@/components/CiteOrEmbed";
import { CompanyLogo } from "@/components/CompanyLogo";
import { SourceList } from "@/components/CompanyMarks";
import { FaqList } from "@/components/FaqList";
import { ListYourAgent } from "@/components/ListYourAgent";
import { NewsletterSignup } from "@/components/newsletter/NewsletterSignup";
import { SortableTable } from "@/components/SortableTable";
import { ToolCtas } from "@/components/ToolCtas";
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
import { toPickerListings } from "@/lib/agent-picker";
import { getDirectoryListings } from "@/lib/directory";
import { FRAMEWORK_STARS_READ } from "@/lib/framework-stars";
import { formatDate } from "@/lib/utils";

export async function ComparisonGuide({
  page,
  children,
  toc,
}: {
  page: ComparisonPage;
  children: ReactNode;
  toc: { id: string; text: string; level: 2 | 3 }[];
}) {
  const listings = toPickerListings(await getDirectoryListings());
  const verifiedOn = page.verifiedOn ?? COMPARISON_VERIFIED_ON;
  const updatedLabel = page.verifiedOn ? formatDate(page.verifiedOn) : COMPARISON_VERIFIED_LABEL;
  const pageUrl = absoluteUrl(page.path);
  const citation = `AI Agents Info. "${page.title}." Last verified ${updatedLabel}. ${pageUrl}.`;
  const embed = `<blockquote cite="${pageUrl}">
<p>${page.description}</p>
<footer><a href="${pageUrl}">${page.title}</a>, AI Agents Info, last verified ${updatedLabel}.</footer>
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
            datePublished: verifiedOn,
            dateModified: verifiedOn,
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
        published={verifiedOn}
        updated={verifiedOn}
        byline={site.bylines.editorial}
        wide
        takeaways={page.takeaways}
        toc={toc}
        sources={<SourceList sources={page.sources} />}
        citation={<CiteOrEmbed citation={citation} embed={embed} />}
        related={page.related}
        details={
          <p className="text-sm text-[var(--muted)]">
            Last verified {updatedLabel}.{" "}
            {page.cellsNote ??
              "Cells are licence, list price, and platform from official pages. This is not a quality ranking."}
          </p>
        }
      >
        <p className="text-sm font-medium text-[var(--gold)]">Last verified {updatedLabel}</p>
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
            <ComparisonTable page={page} />
          </div>
          <div className="mt-8">
            <h3 className="text-lg font-semibold tracking-tight">Which AI agent fits me?</h3>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-[var(--muted)]">
              Four answers, then three directory listings. The match uses category, pricing tags, and use. It is not a score.
            </p>
            <div className="mt-4">
              <AgentPicker listings={listings} compact />
            </div>
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
            {page.methodNote ??
              "Prices are list prices with the billing unit the vendor printed. Licences are the SPDX or file name on the repository, not a guess. This page does not invent ratings, traffic, or a composite score, and it does not treat benchmark percentages from different tasks as one experiment."}
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
        <ToolCtas tools={["calculator", "checker", "picker"]} />
        <ListYourAgent />
        <div className="mt-14">
          <NewsletterSignup id={`comparison-${page.slug}`} />
        </div>
      </ArticleTemplate>
    </>
  );
}

function ComparisonTable({ page }: { page: ComparisonPage }) {
  const rows = comparisonRows(page.rows);
  const withStars = rows.some((row) => typeof row.facets?.stars === "number");
  const columns = withStars
    ? [...page.columns, { key: "stars", label: "GitHub stars", numeric: true }]
    : page.columns;
  return (
    <SortableTable
      caption={page.tableCaption}
      columns={columns}
      rows={rows}
      defaultSort={withStars ? "stars" : "name"}
      defaultDirection={withStars ? "desc" : "asc"}
      filters={["stars", "free", "openSource", "useCase"]}
      starsReadOn={withStars ? FRAMEWORK_STARS_READ : undefined}
    />
  );
}
