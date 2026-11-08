import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CompanyLogo } from "@/components/CompanyLogo";
import { CompanyMarks } from "@/components/CompanyMarks";
import { EmptyState } from "@/components/EmptyState";
import { getBlogPosts } from "@/lib/blog";
import { getDirectoryListings } from "@/lib/directory";
import { getGlossaryTerms } from "@/lib/glossary";
import { getResearchDocs } from "@/lib/research";
import { companyForName } from "@/lib/companies";
import { topicIsIndexable } from "@/lib/indexing";
import { COMPARISON_HUB, comparisonsForTopic } from "@/lib/comparisons";
import { defaultMetadata } from "@/lib/seo";
import { topics } from "@/lib/site";

export async function generateStaticParams() {
  return topics.map((topic) => ({ slug: topic.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const topic = topics.find((item) => item.slug === slug);
  if (!topic) return {};
  const [posts, research, glossary, listings] = await Promise.all([
    getBlogPosts(),
    getResearchDocs(),
    getGlossaryTerms(),
    getDirectoryListings(),
  ]);
  const index = topicIsIndexable(topic.slug, { posts, research, glossary, listings });
  return defaultMetadata(topic.title, topic.summary, topic.href, { index });
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
        {comparisonsForTopic(slug).length ? (
          <Section title={COMPARISON_HUB.title} emptyTitle="" empty="">
            <li>
              <Link href={COMPARISON_HUB.href}>{COMPARISON_HUB.title}</Link>
            </li>
            {comparisonsForTopic(slug).map((page) => (
              <li key={page.path}>
                <Link href={page.path}>{page.title}</Link>
              </li>
            ))}
          </Section>
        ) : null}
        <Section title="From the blog" emptyTitle="First articles publishing soon" empty="Posts on this beat will appear when they are published.">
          {relatedPosts.map((post) => (
            <li key={post.slug} className="flex flex-wrap items-center gap-2">
              <CompanyMarks slugs={post.companies} />
              <Link href={`/blog/${post.slug}`}>{post.title}</Link>
            </li>
          ))}
        </Section>
        <Section title="Research" emptyTitle="Research notes publishing soon" empty="Paper notes on this beat will appear when the source checks out.">
          {relatedResearch.map((doc) => (
            <li key={doc.slug} className="flex flex-wrap items-center gap-2">
              <CompanyMarks slugs={doc.companies} />
              <Link href={`/research/${doc.slug}`}>{doc.title}</Link>
            </li>
          ))}
        </Section>
        <Section title="Glossary" emptyTitle="No terms on this beat yet" empty="Definitions show up here when a term is tagged to this topic.">
          {relatedTerms.map((term) => (
            <li key={term.slug}>
              <Link href={`/glossary/${term.slug}`}>{term.term}</Link>
            </li>
          ))}
        </Section>
        <Section title="Directory" emptyTitle="Listings coming soon — submit a tool" empty="Products for this beat appear after the official site is checked.">
          {relatedListings.map((listing) => (
            <li key={listing.slug}>
              <Link href={`/directory/${listing.slug}`} className="inline-flex items-center gap-2">
                <CompanyLogo
                  name={listing.name}
                  src={listing.logo || undefined}
                  tile={companyForName(listing.name)?.tile}
                  size="sm"
                />
                {listing.name}
              </Link>
            </li>
          ))}
        </Section>
      </div>
    </>
  );
}

function Section({
  title,
  emptyTitle,
  empty,
  children,
}: {
  title: string;
  emptyTitle: string;
  empty: string;
  children: React.ReactNode;
}) {
  const has = Array.isArray(children) ? children.length > 0 : Boolean(children);
  return (
    <section className="mt-10">
      <h2 className="font-semibold tracking-tight text-2xl">{title}</h2>
      {has ? (
        <ul className="mt-3 grid gap-2">{children}</ul>
      ) : (
        <div className="mt-4">
          <EmptyState title={emptyTitle} body={empty} />
        </div>
      )}
    </section>
  );
}
