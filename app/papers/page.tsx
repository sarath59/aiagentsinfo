import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ContentCard } from "@/components/ContentCard";
import { ContentDeskNav } from "@/components/ContentDeskNav";
import { EmptyState } from "@/components/EmptyState";
import { NextRead } from "@/components/NextRead";
import { PageHeader } from "@/components/PageHeader";
import { getResearchDocs, researchTypeTitle } from "@/lib/research";
import { UpdatedLine } from "@/components/UpdatedLine";
import { defaultMetadata } from "@/lib/seo";

export async function generateMetadata() {
  const docs = (await getResearchDocs()).filter((doc) => doc.type === "paper-breakdown");
  return defaultMetadata(
    `AI agent papers: ${docs.length} citable breakdowns`,
    `AI agent papers: ${docs.length} notes. Each one names the paper, links the source, and lists the authors. A number is here only when the paper printed it.`,
    "/papers",
    { absoluteTitle: true },
  );
}

export default async function PapersPage() {
  const docs = (await getResearchDocs()).filter((doc) => doc.type === "paper-breakdown");
  const updated = docs.reduce((latest, doc) => {
    const stamp = doc.updated ?? doc.date;
    return stamp > latest ? stamp : latest;
  }, "");

  return (
    <>
      <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Papers", path: "/papers" }]} />
      <PageHeader
        kicker="Papers"
        title="Which AI agent papers are broken down here?"
        summary={`${docs.length} paper notes. Each one names the paper, links the source, and lists the authors.`}
      />
      <div className="mx-auto max-w-6xl px-4">
        {updated ? <UpdatedLine date={updated} /> : null}
        <p className="mt-3 max-w-2xl text-sm leading-relaxed">
          {docs.length} citable breakdowns. The note stays with the paper’s own numbers.
        </p>
      </div>
      <div className="mx-auto max-w-6xl px-4 pb-20">
        <div className="mb-8">
          <NextRead
            reads={[
              {
                href: "/research/harnessflow-mcts-harness-optimization",
                title: "HarnessFlow",
                note: "A paper that searches for a better complete harness.",
              },
              {
                href: "/research/evolver-agent-exploration-evolving-capabilities",
                title: "Evolver",
                note: "A paper that reuses experience inside two coding harnesses.",
              },
              {
                href: "/blog/how-do-you-evaluate-an-ai-agent-harness",
                title: "How to evaluate an AI agent harness",
                note: "One observable action, then whether the job still finishes.",
              },
              {
                href: "/reports/ai-shopping-agents-next-6-months",
                title: "AI shopping agents, the next 6 months",
                note: "What six companies have dated for shopping agents.",
              },
            ]}
            tool={{
              href: "/tools/ai-agent-harness-evaluation-checklist",
              title: "harness evaluation checklist",
              note: "twelve sourced checks, counted in the browser",
            }}
          />
        </div>
        <ContentDeskNav current="/papers" />
        <div className="content-grid">
          {docs.length ? (
            docs.map((doc) => (
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
              title="Paper notes publishing soon"
              body="A paper page appears when the link and the authors check out. Citations are not invented."
            />
          )}
        </div>
      </div>
    </>
  );
}
