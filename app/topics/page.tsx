import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PageHeader } from "@/components/PageHeader";
import { defaultMetadata } from "@/lib/seo";
import { topics } from "@/lib/site";

export const metadata = defaultMetadata(
  "Topics",
  "Coverage areas: news, tools, research, shopping, task performance, harnesses, education, and how agents work.",
  "/topics",
);

export default function TopicsIndexPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Topics", path: "/topics" }]} />
      <PageHeader
        kicker="Coverage"
        title="Every beat, one URL"
        summary="Section pages pull related blog posts, research, glossary terms, and directory listings from frontmatter. They stay public and server-rendered."
      />
      <div className="mx-auto grid max-w-6xl gap-4 px-4 pb-20 sm:grid-cols-2">
        {topics.map((topic) => (
          <Link key={topic.slug} href={topic.href} className="glass lift rounded-3xl p-6">
            <h2 className="font-semibold tracking-tight text-2xl">{topic.title}</h2>
            <p className="mt-2 text-sm text-[var(--muted)]">{topic.summary}</p>
          </Link>
        ))}
      </div>
    </>
  );
}
