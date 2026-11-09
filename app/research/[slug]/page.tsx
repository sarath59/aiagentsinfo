import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleTemplate } from "@/components/ArticleTemplate";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CompanyLogo } from "@/components/CompanyLogo";
import { InlineCompanyText, SourceList } from "@/components/CompanyMarks";
import { CopyBibtex } from "@/components/CopyBibtex";
import { MarkdownBody } from "@/components/MarkdownBody";
import { NewsletterSignup } from "@/components/newsletter/NewsletterSignup";
import { ToolCtas } from "@/components/ToolCtas";
import { companyForUrl } from "@/lib/companies";
import { withTableDownloads } from "@/lib/html-tables";
import { getResearchDoc, getResearchDocs, relatedResearchDocs, researchTypeTitle } from "@/lib/research";
import { JsonLd, datasetJsonLd, defaultMetadata, faqPageJsonLd, researchArticleJsonLd } from "@/lib/seo";
import { site } from "@/lib/site";

function RichText({ text }: { text: string }) {
  const paragraphs = text
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.replace(/\s+/g, " ").trim())
    .filter(Boolean);
  return (
    <>
      {paragraphs.map((paragraph, index) => (
        <p key={index}>
          <InlineCompanyText text={paragraph} />
        </p>
      ))}
    </>
  );
}

export async function generateStaticParams() {
  const docs = await getResearchDocs();
  return docs.map((doc) => ({ slug: doc.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const doc = await getResearchDoc(slug);
  if (!doc) return {};
  return defaultMetadata(doc.title, doc.description, `/research/${doc.slug}`, {
    openGraphType: "article",
    absoluteTitle: doc.absoluteTitle === true,
  });
}

export default async function ResearchDocPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [doc, all] = await Promise.all([getResearchDoc(slug), getResearchDocs()]);
  if (!doc) notFound();
  const paper = doc.paperUrl ? companyForUrl(doc.paperUrl) : undefined;
  const code = doc.codeUrl ? companyForUrl(doc.codeUrl) : undefined;
  const related = relatedResearchDocs(doc, all);
  const toc = [
    { id: "abstract", text: "Abstract / summary", level: 2 as const },
    ...(doc.whyItMatters ? [{ id: "why-it-matters", text: "Why it matters", level: 2 as const }] : []),
    { id: "methodology", text: "Methodology", level: 2 as const },
    { id: "limitations", text: "Limitations", level: 2 as const },
    ...doc.toc,
    ...(doc.faq?.length ? [{ id: "faq", text: "FAQ", level: 2 as const }] : []),
    { id: "references", text: "References", level: 2 as const },
    { id: "citation", text: "Citation", level: 2 as const },
  ];

  return (
    <>
      <JsonLd
        data={researchArticleJsonLd({
          title: doc.title,
          description: doc.description,
          path: `/research/${doc.slug}`,
          date: doc.date,
          updated: doc.updated,
          paperUrl: doc.paperUrl,
          paperTitle: doc.paperTitle,
          paperAuthors: doc.paperAuthors,
          paperYear: doc.paperYear,
          license: doc.contentLicense === true,
        })}
      />
      {doc.faq?.length ? <JsonLd data={faqPageJsonLd(doc.faq)} /> : null}
      {doc.dataset ? (
        <JsonLd
          data={datasetJsonLd({
            title: doc.dataset.title,
            description: doc.dataset.description,
            path: `/research/${doc.slug}`,
            datePublished: doc.date,
            dateModified: doc.updated ?? doc.date,
            isBasedOn: doc.dataset.isBasedOn,
          })}
        />
      ) : null}
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Research", path: "/research" },
          { name: doc.title, path: `/research/${doc.slug}` },
        ]}
      />
      <ArticleTemplate
        category={researchTypeTitle(doc.type)}
        title={doc.title}
        description={doc.description}
        published={doc.date}
        updated={doc.updated}
        readingMinutes={doc.readingMinutes}
        byline={site.bylines.research}
        companies={doc.companies}
        takeaways={doc.keyFindings}
        toc={toc}
        details={
          <>
            {doc.paperAuthors ? (
              <p>
                {doc.paperTitle} — {doc.paperAuthors}
                {doc.paperYear ? ` (${doc.paperYear})` : ""}
              </p>
            ) : null}
            {doc.venue ? (
              <p>
                <InlineCompanyText text={doc.venue} />
              </p>
            ) : null}
          </>
        }
        actions={
          <>
            {doc.paperUrl ? (
              <a className="btn-primary inline-flex items-center gap-2 px-4 py-2 text-sm" href={doc.paperUrl} rel="noreferrer">
                <CompanyLogo name={paper?.name ?? "Paper"} src={paper?.logo} tile={paper?.tile} size="xs" />
                Read the paper
              </a>
            ) : null}
            {doc.codeUrl ? (
              <a className="btn-ghost inline-flex items-center gap-2 px-4 py-2 text-sm" href={doc.codeUrl} rel="noreferrer">
                <CompanyLogo name={code?.name ?? "Code"} src={code?.logo} tile={code?.tile} size="xs" />
                Source code
              </a>
            ) : null}
            <Link className="btn-ghost px-4 py-2 text-sm" href="/editorial-policy">
              Editorial policy
            </Link>
          </>
        }
        sources={<SourceList sources={doc.references} />}
        sourcesTitle="References"
        sourcesId="references"
        citation={
          <div className="grid gap-4">
            <CopyBibtex value={doc.citation.bibtex} />
            {doc.citation.apa ? (
              <p className="text-sm leading-relaxed text-[var(--muted)]">
                <span className="kicker mb-2 block">APA</span>
                {doc.citation.apa}
              </p>
            ) : null}
          </div>
        }
        related={related.map((item) => ({
          href: `/research/${item.slug}`,
          title: item.title,
          description: item.description,
          kicker: researchTypeTitle(item.type),
          date: item.date,
          readingMinutes: item.readingMinutes,
        }))}
      >
        {doc.ledeQuestion && doc.ledeAnswer ? (
          <section id="answer">
            <h2>{doc.ledeQuestion}</h2>
            <p>{doc.ledeAnswer}</p>
          </section>
        ) : null}
        <section id="abstract">
          <h2>Abstract / summary</h2>
          <RichText text={doc.abstract} />
        </section>
        {doc.whyItMatters ? (
          <section id="why-it-matters">
            <h2>Why it matters</h2>
            <RichText text={doc.whyItMatters} />
          </section>
        ) : null}
        <section id="methodology">
          <h2>Methodology</h2>
          <RichText text={doc.methodology} />
        </section>
        <section id="limitations">
          <h2>Limitations</h2>
          <ul>
            {doc.limitations.map((item) => (
              <li key={item}>
                <InlineCompanyText text={item} />
              </li>
            ))}
          </ul>
        </section>
        <MarkdownBody html={withTableDownloads(doc.html, `/research/${doc.slug}/tables`)} />
        {doc.faq?.length ? (
          <section id="faq">
            <h2>FAQ</h2>
            {doc.faq.map((item) => (
              <div key={item.question}>
                <h3>{item.question}</h3>
                <RichText text={item.answer} />
              </div>
            ))}
          </section>
        ) : null}
        <ToolCtas tools={["picker", "calculator"]} />
        <div className="mt-14">
          <NewsletterSignup id="research" />
        </div>
      </ArticleTemplate>
    </>
  );
}
