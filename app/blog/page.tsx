import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CompanyMarks } from "@/components/CompanyMarks";
import { EmptyState } from "@/components/EmptyState";
import { PageHeader } from "@/components/PageHeader";
import { Pagination } from "@/components/Pagination";
import { blogCategories, categoryTitle, getBlogPosts } from "@/lib/blog";
import { defaultMetadata } from "@/lib/seo";
import { formatDate, normalizeQuery, paginate } from "@/lib/utils";

const PER_PAGE = 6;

export const metadata = defaultMetadata(
  "Blog",
  "Explainers, news, and guides about AI agents — from first questions to working systems.",
  "/blog",
);

export default async function BlogIndexPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; page?: string }>;
}) {
  const params = await searchParams;
  const category = normalizeQuery(params.category);
  const page = Number(normalizeQuery(params.page) || "1");
  const posts = await getBlogPosts();
  const filtered = category ? posts.filter((post) => post.category === category) : posts;
  const result = paginate(filtered, page, PER_PAGE);
  const hrefFor = (next: number) => {
    const query = new URLSearchParams();
    if (category) query.set("category", category);
    if (next > 1) query.set("page", String(next));
    const qs = query.toString();
    return qs ? `/blog?${qs}` : "/blog";
  };

  return (
    <>
      <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Blog", path: "/blog" }]} />
      <PageHeader
        kicker="Blog"
        title="Writing from the desk"
        summary="Explainers, news, and guides about AI agents. A post appears here when it is ready to publish."
      />
      <div className="mx-auto max-w-6xl px-4 pb-20">
        {posts.length ? (
          <div className="flex flex-wrap gap-2">
            <Link href="/blog" className={`chip ${!category ? "chip-active" : ""}`}>
              All
            </Link>
            {blogCategories.map((item) => (
              <Link
                key={item.slug}
                href={`/blog?category=${item.slug}`}
                className={`chip ${category === item.slug ? "chip-active" : ""}`}
              >
                {item.title}
              </Link>
            ))}
          </div>
        ) : null}
        <div className="mt-8 grid gap-4">
          {posts.length === 0 ? (
            <EmptyState
              title="First articles publishing soon"
              body="Explainers, news, and guides will appear here as they are published."
            />
          ) : result.items.length ? (
            result.items.map((post) => (
              <article key={post.slug} className="glass lift rounded-3xl p-6 sm:p-8">
                <p className="kicker">
                  {categoryTitle(post.category)} · {formatDate(post.date)} · {post.readingMinutes} min
                </p>
                <h2 className="mt-3 font-semibold tracking-tight text-3xl">
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h2>
                <p className="mt-3 max-w-3xl text-[var(--muted)]">{post.description}</p>
                {post.companies?.length ? (
                  <div className="mt-4">
                    <CompanyMarks slugs={post.companies} />
                  </div>
                ) : null}
              </article>
            ))
          ) : (
            <EmptyState
              title="No posts in this category yet"
              body="Try another category. Nothing is filled in to make the grid look busy."
              href="/blog"
              cta="All posts"
            />
          )}
        </div>
        <Pagination page={result.page} totalPages={result.totalPages} hrefFor={hrefFor} />
      </div>
    </>
  );
}
