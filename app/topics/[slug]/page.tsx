import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SampleBanner } from "@/components/SampleBanner";
import { getBlogPosts } from "@/lib/blog";
import { getDirectoryListings } from "@/lib/directory";
import { getGlossaryTerms } from "@/lib/glossary";
import { getResearchDocs } from "@/lib/research";
import { defaultMetadata } from "@/lib/seo";
import { topics } from "@/lib/site";

export async function generateStaticParams() {
  return topics.map((topic) => ({ slug: topic.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const topic = topics.find((item) => item.slug === slug);
  if (!topic) return {};
  return defaultMetadata(topic.title, topic.summary, topic.href);
}

export default async function TopicPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const topic = topics.find((item) => item.slug === slug);
  if (!topic) notFound();
  const [posts, research, glossary, listings] = await Promise.all([
    getBlogPosts(),
    getResearchDocs(),
    getGlossaryTerms(),
    getDirectoryListings(),
  ]);
  const relatedPosts = posts.filter((post) => post.topics.includes(slug));
  const relatedResearch = research.filter((doc) => doc.topics.includes(slug));
  const relatedTerms = glossary.filter((term) => term.topics?.includes(slug));
  const relatedListings = listings.filter(
    (listing) => listing.category === slug || listing.useCases.includes(slug) || listing.tags.includes(slug),
  );

  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Topics", path: "/topics" },
          { name: topic.title, path: topic.href },
        ]}
      />
      <div className="mx-auto max-w-4xl px-4 pb-20 pt-12">
        <p className="kicker">Coverage</p>
        <h1 className="display mt-3 text-5xl">{topic.title}</h1>
        <p className="mt-4 text-lg text-[var(--muted)]">{topic.summary}</p>
        <SampleBanner>Section page · sample related items until the corpus grows</SampleBanner>
        <Section title="From the blog" empty="No sample posts tagged here yet.">
          {relatedPosts.map((post) => (
            <li key={post.slug}>
              <Link href={`/blog/${post.slug}`}>{post.title}</Link>
            </li>
          ))}
        </Section>
        <Section title="Research" empty="No sample research tagged here yet.">
          {relatedResearch.map((doc) => (
            <li key={doc.slug}>
              <Link href={`/research/${doc.slug}`}>{doc.title}</Link>
            </li>
          ))}
        </Section>
        <Section title="Glossary" empty="No sample terms tagged here yet.">
          {relatedTerms.map((term) => (
            <li key={term.slug}>
              <Link href={`/glossary/${term.slug}`}>{term.term}</Link>
            </li>
          ))}
        </Section>
        <Section title="Directory" empty="No sample listings matched this beat yet.">
          {relatedListings.map((listing) => (
            <li key={listing.slug}>
              <Link href={`/directory/${listing.slug}`}>{listing.name}</Link>
            </li>
          ))}
        </Section>
      </div>
    </>
  );
}

function Section({
  title,
  empty,
  children,
}: {
  title: string;
  empty: string;
  children: React.ReactNode;
}) {
  const has = Array.isArray(children) ? children.length > 0 : Boolean(children);
  return (
    <section className="mt-10">
      <h2 className="font-serif text-2xl">{title}</h2>
      {has ? <ul className="mt-3 grid gap-2">{children}</ul> : <p className="mt-3 text-[var(--muted)]">{empty}</p>}
    </section>
  );
}
