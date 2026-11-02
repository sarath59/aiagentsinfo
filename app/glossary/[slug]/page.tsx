import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { MarkdownBody } from "@/components/MarkdownBody";
import { getGlossaryTerm, getGlossaryTerms } from "@/lib/glossary";
import { JsonLd, defaultMetadata } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";

export async function generateStaticParams() {
  const terms = await getGlossaryTerms();
  return terms.map((term) => ({ slug: term.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const term = await getGlossaryTerm(slug);
  if (!term) return {};
  return defaultMetadata(term.term, term.shortDefinition, `/glossary/${term.slug}`);
}

export default async function GlossaryTermPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [term, all] = await Promise.all([getGlossaryTerm(slug), getGlossaryTerms()]);
  if (!term) notFound();
  const related = all.filter((other) => term.related?.includes(other.slug));

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "DefinedTerm",
          name: term.term,
          description: term.shortDefinition,
          url: absoluteUrl(`/glossary/${term.slug}`),
          inDefinedTermSet: absoluteUrl("/glossary"),
        }}
      />
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Glossary", path: "/glossary" },
          { name: term.term, path: `/glossary/${term.slug}` },
        ]}
      />
      <article className="mx-auto max-w-3xl px-4 pb-20 pt-10">
        <p className="kicker">Glossary</p>
        <h1 className="display mt-3 text-5xl">{term.term}</h1>
        <p className="mt-4 text-xl text-[var(--muted)]">{term.shortDefinition}</p>
        <div className="mt-10">
          <MarkdownBody html={term.html} />
        </div>
        {related.length ? (
          <section className="mt-10">
            <h2 className="font-semibold tracking-tight text-2xl">Related terms</h2>
            <ul className="mt-3 grid gap-2">
              {related.map((item) => (
                <li key={item.slug}>
                  <Link href={`/glossary/${item.slug}`}>{item.term}</Link>
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </article>
    </>
  );
}
