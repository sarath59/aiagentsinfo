import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { EmptyState } from "@/components/EmptyState";
import { PageHeader } from "@/components/PageHeader";
import {
  getResearchDocs,
  researchTopics,
  researchTypeTitle,
  researchTypes,
} from "@/lib/research";
import { defaultMetadata } from "@/lib/seo";
import { formatDate, normalizeQuery } from "@/lib/utils";

export const metadata = defaultMetadata(
  "Research",
  "Paper breakdowns, original reports, and benchmark notes. Every entry is its own citable page.",
  "/research",
);

export default async function ResearchIndexPage({
  searchParams,
}: {
  searchParams: Promise<{ topic?: string; type?: string }>;
}) {
  const params = await searchParams;
  const topic = normalizeQuery(params.topic);
  const type = normalizeQuery(params.type);
  const docs = await getResearchDocs();
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
        <div className="mt-8 grid gap-4">
          {docs.length === 0 ? (
            <EmptyState
              title="Research notes publishing soon"
              body="Paper pages will appear when there is a real arXiv or DOI link and the authors are correct."
            />
          ) : filtered.length ? (
            filtered.map((doc) => (
              <article key={doc.slug} className="glass lift rounded-3xl p-6 sm:p-8">
                <p className="kicker">
                  {researchTypeTitle(doc.type)} · {formatDate(doc.date)}
                </p>
                <h2 className="mt-3 font-semibold tracking-tight text-3xl">
                  <Link href={`/research/${doc.slug}`}>{doc.title}</Link>
                </h2>
                <p className="mt-3 max-w-3xl text-[var(--muted)]">{doc.description}</p>
              </article>
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
      </div>
    </>
  );
}
