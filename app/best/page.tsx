import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PageHeader } from "@/components/PageHeader";
import {
  COMPARISON_HUB,
  COMPARISON_VERIFIED_ON,
  comparisonPages,
  type ComparisonPage,
} from "@/lib/comparisons";
import {
  breadcrumbJsonLd,
  defaultMetadata,
  itemListJsonLd,
  JsonLd,
  organizationJsonLd,
  webPageJsonLd,
} from "@/lib/seo";
import { formatDate } from "@/lib/utils";

export const metadata = defaultMetadata(
  COMPARISON_HUB.metaTitle,
  COMPARISON_HUB.metaDescription,
  COMPARISON_HUB.href,
  { absoluteTitle: true },
);

export default function BestIndexPage() {
  return (
    <>
      <JsonLd
        data={[
          organizationJsonLd(),
          webPageJsonLd({
            title: COMPARISON_HUB.heading,
            description: COMPARISON_HUB.metaDescription,
            path: COMPARISON_HUB.href,
            datePublished: COMPARISON_VERIFIED_ON,
            dateModified: COMPARISON_VERIFIED_ON,
          }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: COMPARISON_HUB.title, path: COMPARISON_HUB.href },
          ]),
          itemListJsonLd({
            name: COMPARISON_HUB.title,
            description: COMPARISON_HUB.summary,
            path: COMPARISON_HUB.href,
            items: comparisonPages.map((page) => ({
              name: page.title,
              url: page.path,
              description: page.summary,
            })),
          }),
        ]}
      />
      <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: COMPARISON_HUB.title, path: COMPARISON_HUB.href }]} />
      <PageHeader
        kicker="Comparisons"
        title={COMPARISON_HUB.heading}
        summary={COMPARISON_HUB.description}
      />
      <HubGroup
        heading="For builders"
        pages={comparisonPages.filter((page) => page.kind === "builder")}
      />
      <HubGroup
        heading="For everyone"
        pages={comparisonPages.filter((page) => page.kind === "consumer")}
      />
    </>
  );
}

function HubGroup({ heading, pages }: { heading: string; pages: ComparisonPage[] }) {
  return (
    <section className="mx-auto max-w-6xl px-4 pb-16">
      <h2 className="text-2xl font-semibold tracking-tight">{heading}</h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-3">
        {pages.map((page) => (
          <Link key={page.path} href={page.path} className="glass lift rounded-3xl p-6">
            <p className="kicker">
              {page.title} · Last verified {formatDate(COMPARISON_VERIFIED_ON)}
            </p>
            <h3 className="mt-3 font-semibold tracking-tight text-2xl">{page.question}</h3>
            <p className="mt-2 text-sm text-[var(--muted)]">{page.metaDescription}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
