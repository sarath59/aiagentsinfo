import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { BylineLink } from "@/components/BylineLink";
import { CompaniesMentioned, SourceList } from "@/components/CompanyMarks";
import { MarkdownBody } from "@/components/MarkdownBody";
import { PublishedDates } from "@/components/PublishedDates";
import { TableOfContents } from "@/components/TableOfContents";
import { getBlogPost, getBlogPosts, relatedBlogPosts } from "@/lib/blog";
import { JsonLd, articleJsonLd, defaultMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) return {};
  return defaultMetadata(post.title, post.description, `/blog/${post.slug}`);
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [post, all] = await Promise.all([getBlogPost(slug), getBlogPosts()]);
  if (!post) notFound();
  const related = relatedBlogPosts(post, all);

  return (
    <>
      <JsonLd
        data={articleJsonLd({
          title: post.title,
          description: post.description,
          path: `/blog/${post.slug}`,
          date: post.date,
          updated: post.updated,
          byline: post.byline ?? site.bylines.editorial,
        })}
      />
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
          { name: post.title, path: `/blog/${post.slug}` },
        ]}
      />
      <article className="mx-auto grid max-w-6xl gap-10 px-4 pb-20 pt-10 lg:grid-cols-[minmax(0,1fr)_16rem]">
        <div>
          <p className="kicker">{post.category}</p>
          <h1 className="display mt-3 text-4xl sm:text-5xl">{post.title}</h1>
          <p className="mt-4 text-lg text-[var(--muted)]">{post.description}</p>
          <dl className="mt-6 grid gap-1 text-sm text-[var(--muted)]">
            <div>
              <dt className="inline">Byline: </dt>
              <dd className="inline">
                <BylineLink name={post.byline ?? site.bylines.editorial} />
                {" · "}
                <Link href="/editorial-policy">Editorial policy</Link>
              </dd>
            </div>
          </dl>
          <PublishedDates published={post.date} updated={post.updated} />
          <CompaniesMentioned slugs={post.companies} />
          <div className="mt-10">
            <MarkdownBody html={post.html} />
          </div>
          {post.sources?.length ? (
            <section className="mt-12">
              <h2 className="font-semibold tracking-tight text-2xl">Sources</h2>
              <SourceList sources={post.sources} />
            </section>
          ) : null}
          {related.length ? (
            <section className="mt-12">
              <h2 className="font-semibold tracking-tight text-2xl">Related</h2>
              <ul className="mt-4 grid gap-3">
                {related.map((item) => (
                  <li key={item.slug}>
                    <Link href={`/blog/${item.slug}`}>{item.title}</Link>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
        </div>
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <TableOfContents items={post.toc} />
        </aside>
      </article>
    </>
  );
}
