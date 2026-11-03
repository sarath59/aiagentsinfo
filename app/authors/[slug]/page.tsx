import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PageHeader } from "@/components/PageHeader";
import { PublishedDates } from "@/components/PublishedDates";
import { authorBySlug, authorPath, authors } from "@/lib/authors";
import { getBlogPosts } from "@/lib/blog";
import { getResearchDocs } from "@/lib/research";
import { JsonLd, defaultMetadata, profilePageJsonLd } from "@/lib/seo";
import { site } from "@/lib/site";
import { formatDate } from "@/lib/utils";

export function generateStaticParams() {
  return authors.map((author) => ({ slug: author.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const author = authorBySlug((await params).slug);
  if (!author) return {};
  return defaultMetadata(author.name, author.description, authorPath(author.slug));
}

export default async function AuthorPage({ params }: { params: Promise<{ slug: string }> }) {
  const author = authorBySlug((await params).slug);
  if (!author) notFound();
  const [posts, research] = await Promise.all([getBlogPosts(), getResearchDocs()]);
  const pieces =
    author.slug === "research"
      ? research.map((doc) => ({
          href: `/research/${doc.slug}`,
          title: doc.title,
          description: doc.description,
          date: doc.updated ?? doc.date,
        }))
      : posts
          .filter((post) => (post.byline ?? site.bylines.editorial) === author.name)
          .map((post) => ({
            href: `/blog/${post.slug}`,
            title: post.title,
            description: post.description,
            date: post.updated ?? post.date,
          }));

  return (
    <>
      <JsonLd
        data={profilePageJsonLd({
          name: author.name,
          description: author.description,
          path: authorPath(author.slug),
          kind: author.kind,
          published: author.published,
          updated: author.updated,
        })}
      />
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: author.name, path: authorPath(author.slug) },
        ]}
      />
      <PageHeader kicker="Byline" title={author.name} summary={author.description} />
      <div className="mx-auto max-w-3xl px-4 pb-20">
        <PublishedDates published={author.published} updated={author.updated} />
        <p className="mt-6 text-[var(--muted)]">
          Part of <Link href="/about">{site.name}</Link>. Read the <Link href="/editorial-policy">editorial policy</Link>{" "}
          for how pages are sourced, dated, and corrected. Email <a href={`mailto:${site.email}`}>{site.email}</a>.
        </p>
        <p className="mt-4 text-[var(--muted)]">Subjects: {author.knowsAbout.join(", ")}.</p>
        <section className="mt-10">
          <h2 className="font-semibold tracking-tight text-2xl">Pages from this desk</h2>
          {pieces.length ? (
            <ul className="mt-4 grid gap-4">
              {pieces.map((piece) => (
                <li key={piece.href}>
                  <Link href={piece.href} className="font-semibold tracking-tight text-xl">
                    {piece.title}
                  </Link>
                  <p className="mt-1 text-sm text-[var(--muted)]">
                    <time dateTime={piece.date.slice(0, 10)}>{formatDate(piece.date)}</time>
                    {" · "}
                    {piece.description}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-3 text-[var(--muted)]">No pages are signed with this byline yet.</p>
          )}
        </section>
      </div>
    </>
  );
}
