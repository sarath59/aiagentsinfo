import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ComparisonGuide } from "@/components/ComparisonGuide";
import { LinkedText } from "@/components/LinkedText";
import { COMPARISON_HUB, comparisonBySlug } from "@/lib/comparisons";
import { consumerComparisons } from "@/lib/consumer-comparisons";
import { defaultMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return consumerComparisons.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = comparisonBySlug(slug);
  if (!page || page.kind !== "consumer") return {};
  return defaultMetadata(page.metaTitle, page.metaDescription, page.path, { absoluteTitle: true });
}

export default async function ConsumerComparisonPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = comparisonBySlug(slug);
  if (!page || page.kind !== "consumer") notFound();

  const toc = [
    ...(page.sections ?? []).map((section) => ({ id: section.id, text: section.heading, level: 2 as const })),
    { id: "comparison-table", text: page.tableHeading, level: 2 as const },
    { id: "best-for", text: page.bestForHeading, level: 2 as const },
    { id: "how-this-was-checked", text: page.methodHeading, level: 2 as const },
    { id: "faq", text: page.faqHeading, level: 2 as const },
  ];

  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: COMPARISON_HUB.title, path: COMPARISON_HUB.href },
          { name: page.title, path: page.path },
        ]}
      />
      <ComparisonGuide page={page} toc={toc}>
        {(page.sections ?? []).map((section) => (
          <section
            key={section.id}
            id={section.id}
            className={section.id === "direct-answer" ? "article-prose" : "mt-12"}
          >
            {section.id === "direct-answer" ? (
              <h2>{section.heading}</h2>
            ) : (
              <h2 className="text-2xl font-semibold tracking-tight">{section.heading}</h2>
            )}
            {section.paragraphs.map((paragraph) => (
              <p
                key={paragraph.slice(0, 48)}
                className={
                  section.id === "direct-answer"
                    ? undefined
                    : "mt-3 max-w-3xl text-sm leading-relaxed text-[var(--muted)]"
                }
              >
                <LinkedText text={paragraph} />
              </p>
            ))}
          </section>
        ))}
      </ComparisonGuide>
    </>
  );
}
