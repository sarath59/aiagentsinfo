import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PageHeader } from "@/components/PageHeader";
import { COMPARISON_HUB, COMPARISON_VERIFIED_ON, comparisonPages } from "@/lib/comparisons";
import { defaultMetadata } from "@/lib/seo";
import { topics } from "@/lib/site";
import { formatDate } from "@/lib/utils";

export const metadata = defaultMetadata(
  "Every beat, one URL",
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
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="font-semibold tracking-tight text-2xl">
          <Link href={COMPARISON_HUB.href}>{COMPARISON_HUB.title}</Link>
        </h2>
        <p className="mt-2 text-sm text-[var(--muted)]">
          Last verified {formatDate(COMPARISON_VERIFIED_ON)}. Licence, list price, and platform only. No invented
          scores.
        </p>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          {comparisonPages.map((page) => (
            <Link key={page.path} href={page.path} className="glass lift rounded-3xl p-6">
              <h3 className="font-semibold tracking-tight text-xl">{page.title}</h3>
              <p className="mt-2 text-sm text-[var(--muted)]">{page.summary}</p>
            </Link>
          ))}
        </div>
      </div>
      <div className="mx-auto grid max-w-6xl gap-4 px-4 py-12 pb-20 sm:grid-cols-2">
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
