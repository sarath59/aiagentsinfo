import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleTemplate } from "@/components/ArticleTemplate";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SourceList } from "@/components/CompanyMarks";
import { MarkdownBody } from "@/components/MarkdownBody";
import { NewsletterSignup } from "@/components/newsletter/NewsletterSignup";
import { categoryTitle, getBlogPost, getBlogPosts, relatedBlogPosts } from "@/lib/blog";
import { withTableDownloads } from "@/lib/html-tables";
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
  const toc = [
    ...post.toc,
    ...(post.sources?.length ? [{ id: "sources", text: "Sources", level: 2 as const }] : []),
  ];

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
      <ArticleTemplate
        category={categoryTitle(post.category)}
        title={post.title}
        description={post.description}
        published={post.date}
        updated={post.updated}
        readingMinutes={post.readingMinutes}
        byline={post.byline ?? site.bylines.editorial}
        companies={post.companies}
        takeaways={post.takeaways}
        toc={toc}
        sources={post.sources?.length ? <SourceList sources={post.sources} /> : undefined}
        related={related.map((item) => ({
          href: `/blog/${item.slug}`,
          title: item.title,
          description: item.description,
          kicker: categoryTitle(item.category),
          date: item.date,
          readingMinutes: item.readingMinutes,
        }))}
        actions={
          <Link className="btn-ghost px-4 py-2 text-sm" href="/editorial-policy">
            Editorial policy
          </Link>
        }
      >
        <MarkdownBody html={withTableDownloads(post.html, `/blog/${post.slug}/tables`)} />
        <div className="mt-14">
          <NewsletterSignup id="article" />
        </div>
      </ArticleTemplate>
    </>
  );
}
