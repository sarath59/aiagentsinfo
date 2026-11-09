import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { DataSourceLine } from "@/components/DataSourceLine";
import { CompanyLogo } from "@/components/CompanyLogo";
import { ContentCard } from "@/components/ContentCard";
import { ContentDeskNav } from "@/components/ContentDeskNav";
import { EmptyState } from "@/components/EmptyState";
import { PageHeader } from "@/components/PageHeader";
import { getResearchDocs, researchTopics, researchTypeTitle, researchTypes } from "@/lib/research";
import { defaultMetadata } from "@/lib/seo";
import { normalizeQuery } from "@/lib/utils";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ topic?: string; type?: string }>;
}) {
  const params = await searchParams;
  const variant = Boolean(normalizeQuery(params.topic) || normalizeQuery(params.type));
  return defaultMetadata(
    "Papers with their own pages",
    "Paper breakdowns, original reports, and benchmark notes. Every entry is its own citable page.",
    "/research",
    { index: !variant, canonicalPath: "/research" },
  );
}

export default async function ResearchIndexPage({
  searchParams,
}: {
  searchParams: Promise<{ topic?: string; type?: string }>;
}) {
  const params = await searchParams;
  const topic = normalizeQuery(params.topic);
  const type = normalizeQuery(params.type);
  const docs = await getResearchDocs();
  const updated = docs.map((doc) => doc.updated ?? doc.date).sort().at(-1);
  const topics = researchTopics(docs);
  const filtered = docs.filter((doc) => {
    if (topic && !doc.topics.includes(topic)) return false;
    if (type && doc.type !== type) return false;
    return true;
  });

  const hrefFor = (next: { topic?: string; type?: string }) => {
    const query = new URLSearchParams();
    const nextTopic = next.topic ?? topic;
    const nextType = next.type ?? type;
    if (nextTopic) query.set("topic", nextTopic);
    if (nextType) query.set("type", nextType);
    const qs = query.toString();
    return qs ? `/research?${qs}` : "/research";
  };

  return (
    <>
      <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Research", path: "/research" }]} />
      <PageHeader
        kicker="Research desk"
        title="Papers with their own pages"
        summary="A note appears here when the paper, the link, and the authors check out. Citations are not invented."
      />
      <div className="mx-auto max-w-6xl px-4 pb-20">
        <ContentDeskNav current="/research" />
        <div className="flex flex-wrap gap-2">
          <Link href="/research" className="chip">
            Reset
          </Link>
          {researchTypes.map((item) => (
            <Link
              key={item.slug}
              href={hrefFor({ type: item.slug, topic: topic || undefined })}
              className={`chip ${type === item.slug ? "chip-active" : ""}`}
            >
              {item.title}
            </Link>
          ))}
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {topics.map((item) => (
            <Link
              key={item}
              href={hrefFor({ topic: item, type: type || undefined })}
              className={`chip ${topic === item ? "chip-active" : ""}`}
            >
              {item}
            </Link>
          ))}
        </div>
        <div className="content-grid mt-8">
          {docs.length === 0 ? (
            <EmptyState
              title="Research notes publishing soon"
              body={
                <>
                  Paper pages will appear when there is a real{" "}
                  <span className="inline-flex items-center gap-1 align-middle">
                    <CompanyLogo name="arXiv" src="/logos/arxiv.png" size={16} />
                    arXiv
                  </span>{" "}
                  or DOI link and the authors are correct.
                </>
              }
            />
          ) : filtered.length ? (
            filtered.map((doc) => (
              <ContentCard
                key={doc.slug}
                href={`/research/${doc.slug}`}
                kicker={researchTypeTitle(doc.type)}
                title={doc.title}
                description={doc.description}
                date={doc.date}
                readingMinutes={doc.readingMinutes}
              />
            ))
          ) : (
            <EmptyState
              title="No research matches these filters"
              body="Reset the filters. Papers are not added to fill an empty grid."
              href="/research"
              cta="All research"
            />
          )}
        </div>
        {updated ? <DataSourceLine title="Research" updated={updated} path="/research" showCite /> : null}
      </div>
    </>
  );
}
