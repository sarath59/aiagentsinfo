import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ContentCard } from "@/components/ContentCard";
import { ContentDeskNav } from "@/components/ContentDeskNav";
import { EmptyState } from "@/components/EmptyState";
import { PageHeader } from "@/components/PageHeader";
import { getResearchDocs, researchTypeTitle } from "@/lib/research";
import { defaultMetadata } from "@/lib/seo";

export const metadata = defaultMetadata(
  "Papers",
  "Paper breakdowns with the source link, the authors, and a citation. A note appears when those check out.",
  "/papers",
);

export default async function PapersPage() {
  const docs = (await getResearchDocs()).filter((doc) => doc.type === "paper-breakdown");

  return (
    <>
      <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Papers", path: "/papers" }]} />
      <PageHeader
        kicker="Papers"
        title="Paper notes, each one citable"
        summary="Each note names the paper, links the source, and lists the paper's authors as the paper's authors."
      />
      <div className="mx-auto max-w-6xl px-4 pb-20">
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
