import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleTemplate } from "@/components/ArticleTemplate";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SourceList } from "@/components/CompanyMarks";
import { MarkdownBody } from "@/components/MarkdownBody";
import { NewsletterSignup } from "@/components/newsletter/NewsletterSignup";
import { ToolCtas } from "@/components/ToolCtas";
import { categoryTitle, getBlogPost, getBlogPosts, relatedBlogPosts } from "@/lib/blog";
import { withTableDownloads } from "@/lib/html-tables";
import { JsonLd, articleJsonLd, datasetJsonLd, defaultMetadata, faqPageJsonLd } from "@/lib/seo";
import { site } from "@/lib/site";

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) return {};
  return defaultMetadata(post.title, post.description, `/blog/${post.slug}`, {
    openGraphType: "article",
    absoluteTitle: post.absoluteTitle === true,
  });
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
          license: post.contentLicense === true,
        })}
      />
      {post.dataset ? (
        <JsonLd
          data={datasetJsonLd({
            title: post.dataset.title,
            description: post.dataset.description,
            path: `/blog/${post.slug}`,
            datePublished: post.date,
            dateModified: post.updated ?? post.date,
            isBasedOn: post.dataset.isBasedOn,
          })}
        />
      ) : null}
      {post.faq?.length && post.html.includes('id="faq"') ? (
        <JsonLd data={faqPageJsonLd(post.faq)} />
      ) : null}
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
        <ToolCtas tools={toolsForPost(post.slug, post.category)} />
        <div className="mt-14">
          <NewsletterSignup id="article" />
        </div>
      </ArticleTemplate>
    </>
  );
}

function toolsForPost(slug: string, category: string) {
  const tools: ("calculator" | "checker" | "picker")[] = [];
  if (/pric|cost|token/.test(slug)) tools.push("calculator");
  if (/prompt|tool-json/.test(slug)) tools.push("checker");
  if (category === "guide" || /agent|employee|shopping|computer/.test(slug)) tools.push("picker");
  return tools;
}
