import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CompanyLogo } from "@/components/CompanyLogo";
import { CompaniesMentioned, InlineCompanyText, SourceList } from "@/components/CompanyMarks";
import { CopyBibtex } from "@/components/CopyBibtex";
import { MarkdownBody } from "@/components/MarkdownBody";
import { TableOfContents } from "@/components/TableOfContents";
import { getResearchDoc, getResearchDocs, researchTypeTitle } from "@/lib/research";
import { companyForUrl } from "@/lib/companies";
import { JsonLd, defaultMetadata, scholarlyArticleJsonLd } from "@/lib/seo";
import { site } from "@/lib/site";
import { formatDate } from "@/lib/utils";

export async function generateStaticParams() {
  const docs = await getResearchDocs();
  return docs.map((doc) => ({ slug: doc.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const doc = await getResearchDoc(slug);
  if (!doc) return {};
  return defaultMetadata(doc.title, doc.description, `/research/${doc.slug}`);
}

export default async function ResearchDocPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const doc = await getResearchDoc(slug);
  if (!doc) notFound();
  const paper = doc.paperUrl ? companyForUrl(doc.paperUrl) : undefined;
  const code = doc.codeUrl ? companyForUrl(doc.codeUrl) : undefined;

  return (
    <>
      <JsonLd
        data={scholarlyArticleJsonLd({
          title: doc.title,
          description: doc.description,
          path: `/research/${doc.slug}`,
          date: doc.date,
          updated: doc.updated,
          paperUrl: doc.paperUrl,
          paperAuthors: doc.paperAuthors,
        })}
      />
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Research", path: "/research" },
          { name: doc.title, path: `/research/${doc.slug}` },
        ]}
      />
      <article className="mx-auto grid max-w-6xl gap-10 px-4 pb-20 pt-10 lg:grid-cols-[minmax(0,1fr)_18rem]">
        <div>
          <p className="kicker">{researchTypeTitle(doc.type)}</p>
          <h1 className="display mt-3 text-4xl sm:text-5xl">{doc.title}</h1>
          <p className="mt-4 text-lg text-[var(--muted)]">{doc.description}</p>
          <dl className="mt-6 grid gap-1 text-sm text-[var(--muted)]">
            <div>
              <dt className="inline">Byline: </dt>
              <dd className="inline">{site.bylines.research}</dd>
            </div>
            <div>
              <dt className="inline">Published: </dt>
              <dd className="inline">{formatDate(doc.date)}</dd>
            </div>
            {doc.updated ? (
              <div>
                <dt className="inline">Last updated: </dt>
                <dd className="inline">{formatDate(doc.updated)}</dd>
              </div>
            ) : null}
            {doc.paperAuthors ? (
              <div>
                <dt className="inline">Paper: </dt>
                <dd className="inline">
                  {doc.paperTitle} — {doc.paperAuthors}
                  {doc.paperYear ? ` (${doc.paperYear})` : ""}
                </dd>
              </div>
            ) : null}
            {doc.venue ? (
              <div>
                <dt className="inline">Venue: </dt>
                <dd className="inline">
                  <InlineCompanyText text={doc.venue} />
                </dd>
              </div>
            ) : null}
          </dl>
          <CompaniesMentioned slugs={doc.companies} />
          <div className="mt-8 flex flex-wrap gap-3">
            {doc.paperUrl ? (
              <a className="btn-primary inline-flex items-center gap-2 px-4 py-2 text-sm" href={doc.paperUrl} rel="noreferrer">
                <CompanyLogo name={paper?.name ?? "Paper"} src={paper?.logo} tile={paper?.tile} size="xs" />
                Paper
              </a>
            ) : null}
            {doc.codeUrl ? (
              <a className="inline-flex items-center gap-2 rounded-full border border-[var(--stroke)] px-4 py-2 text-sm" href={doc.codeUrl} rel="noreferrer">
                <CompanyLogo name={code?.name ?? "Code"} src={code?.logo} tile={code?.tile} size="xs" />
                Code
              </a>
            ) : null}
          </div>

          <section className="mt-10">
            <h2 className="font-semibold tracking-tight text-2xl">Abstract / summary</h2>
            <p className="mt-3 text-[var(--muted)]">
              <InlineCompanyText text={doc.abstract} />
            </p>
          </section>
          <section className="mt-8">
            <h2 className="font-semibold tracking-tight text-2xl">Key findings</h2>
            <ul className="mt-3 list-disc pl-5">
              {doc.keyFindings.map((finding) => (
                <li key={finding} className="mt-2">
                  <InlineCompanyText text={finding} />
                </li>
              ))}
            </ul>
          </section>
          <section className="mt-8">
            <h2 className="font-semibold tracking-tight text-2xl">Methodology</h2>
            <p className="mt-3 text-[var(--muted)]">
              <InlineCompanyText text={doc.methodology} />
            </p>
          </section>
          <section className="mt-8">
            <h2 className="font-semibold tracking-tight text-2xl">Limitations</h2>
            <ul className="mt-3 list-disc pl-5">
              {doc.limitations.map((item) => (
                <li key={item} className="mt-2">
                  <InlineCompanyText text={item} />
                </li>
              ))}
            </ul>
          </section>
          <div className="mt-10">
            <MarkdownBody html={doc.html} />
          </div>
          <section className="mt-10">
            <h2 className="font-semibold tracking-tight text-2xl">References</h2>
            <SourceList sources={doc.references} />
          </section>
        </div>
        <aside className="grid gap-4 lg:sticky lg:top-24 lg:self-start">
          <TableOfContents items={doc.toc} />
          <CopyBibtex value={doc.citation.bibtex} />
          {doc.citation.apa ? (
            <p className="text-sm text-[var(--muted)]">
              <span className="kicker block mb-2">APA</span>
              {doc.citation.apa}
            </p>
          ) : null}
          <p className="text-sm">
            <Link href="/research" className="underline">
              All research
            </Link>
          </p>
        </aside>
      </article>
    </>
  );
}
