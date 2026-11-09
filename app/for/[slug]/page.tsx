import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CompanyLogo } from "@/components/CompanyLogo";
import { CompanyMarks } from "@/components/CompanyMarks";
import { EmptyState } from "@/components/EmptyState";
import { ReadableToggle } from "@/components/ReadableToggle";
import { getBlogPosts } from "@/lib/blog";
import { getDirectoryListings } from "@/lib/directory";
import { getResearchDocs } from "@/lib/research";
import { companyForName } from "@/lib/companies";
import { BestOfLinks } from "@/components/BestOfLinks";
import { comparisonPages } from "@/lib/comparisons";
import { defaultMetadata } from "@/lib/seo";
import { audiences } from "@/lib/site";

export async function generateStaticParams() {
  return audiences.map((audience) => ({ slug: audience.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const audience = audiences.find((item) => item.slug === slug);
  if (!audience) return {};
  const title = audience.slug === "research" ? "For researchers" : audience.title;
  return defaultMetadata(title, audience.summary, audience.href);
}

export default async function AudiencePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const audience = audiences.find((item) => item.slug === slug);
  if (!audience) notFound();
  const [posts, research, listings] = await Promise.all([
    getBlogPosts(),
    getResearchDocs(),
    getDirectoryListings(),
  ]);
  const relatedPosts = posts.filter((post) => post.audience?.includes(slug));
  const relatedListings = listings.filter((listing) => listing.audiences.includes(slug));
  const isEveryone = slug === "everyone";
  const isResearch = slug === "research";

  const copy = copyFor(slug);

  const body = (
    <>
      <p className="kicker">{audience.eyebrow}</p>
      <h1 className="display mt-3 text-5xl">{audience.slug === "research" ? "For researchers" : audience.title}</h1>
      <p className="mt-4 text-lg text-[var(--muted)]">{audience.summary}</p>
      {copy.map((block) => (
        <section key={block.title} className="mt-10">
          <h2 className="font-semibold tracking-tight text-3xl">{block.title}</h2>
          <p className="mt-3 text-[var(--muted)]">{block.body}</p>
        </section>
      ))}
      {slug === "everyone" ? (
        <BestOfLinks
          pages={comparisonPages.filter((page) => page.kind === "consumer")}
          intro="Sourced tables for shopping, search, travel, email, and other everyday jobs. Last verified November 2026."
        />
      ) : null}
      {slug === "builders" || slug === "research" ? (
        <section className="mt-10">
          <h2 className="font-semibold tracking-tight text-2xl">Dated figures</h2>
          <ul className="mt-3 grid gap-2">
            <li>
              <Link href="/reports/ai-agents-next-12-months">AI agents, Nov 2026 to Nov 2027</Link>
            </li>
            <li>
              <Link href="/reports/ai-agents-next-6-months">AI agents, Nov 2026 to May 2027</Link>
            </li>
            <li>
              <Link href="/reports/browser-and-computer-use-agents-next-6-months">
                Browser and computer-use agents, Nov 2026 to May 2027
              </Link>
            </li>
            <li>
              <Link href="/best">Best AI agents</Link>
            </li>
            <li>
              <Link href="/best/ai-agent-harnesses">Best AI agent harness</Link>
            </li>
            <li>
              <Link href="/best/computer-use-agents">Best computer use agents</Link>
            </li>
            <li>
              <Link href="/best/ai-agent-evaluation-tools">Best AI agent evaluation tools</Link>
            </li>
            <li>
              <Link href="/reports/agent-harness-benchmark-november-2026">Harness benchmark, November 2026</Link>
            </li>
            <li>
              <Link href="/agent-cost-calculator">Agent cost calculator</Link>
            </li>
            <li>
              <Link href="/agent-prompt-checker">Prompt and tool checker</Link>
            </li>
            <li>
              <Link href="/directory/stats">Directory stats</Link>
            </li>
          </ul>
        </section>
      ) : null}
      <section className="mt-10">
        <h2 className="font-semibold tracking-tight text-2xl">Start here</h2>
        {relatedPosts.length || (isResearch && research.length) ? (
          <ul className="mt-3 grid gap-2">
            {relatedPosts.map((post) => (
              <li key={post.slug} className="flex flex-wrap items-center gap-2">
                <CompanyMarks slugs={post.companies} />
                <Link href={`/blog/${post.slug}`}>{post.title}</Link>
              </li>
            ))}
            {isResearch
              ? research.map((doc) => (
                  <li key={doc.slug} className="flex flex-wrap items-center gap-2">
                    <CompanyMarks slugs={doc.companies} />
                    <Link href={`/research/${doc.slug}`}>{doc.title}</Link>
                  </li>
                ))
              : null}
          </ul>
        ) : (
          <div className="mt-4">
            <EmptyState
              title="First articles publishing soon"
              body="Reading for this audience will show up here as it is published."
              href="/blog"
              cta="Visit the blog"
            />
          </div>
        )}
      </section>
      {relatedListings.length ? (
        <section className="mt-8">
          <h2 className="font-semibold tracking-tight text-2xl">Directory picks</h2>
          <ul className="mt-3 grid gap-2">
            {relatedListings.slice(0, 6).map((listing) => (
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
          </ul>
        </section>
      ) : null}
    </>
  );

  return (
    <div>
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: audience.slug === "research" ? "For researchers" : audience.title, path: audience.href },
        ]}
      />
      <div className="mx-auto max-w-3xl px-4 pb-20 pt-12">
        {isEveryone ? <ReadableToggle>{body}</ReadableToggle> : body}
      </div>
    </div>
  );
}

function copyFor(slug: string) {
  if (slug === "everyone") {
    return [
      {
        title: "Clear writing, larger type if you want it",
        body: "Use the button above when you want larger type. Jargon links to the glossary. If a company brags about millions of users, we will not repeat the number unless we can source it.",
      },
      {
        title: "What you can read here",
        body: "Plain-English AI news and research for adults: what an agent is, where the tools are actually used, and what the papers change. Sourced consumer tables cover shopping, web search, travel booking, email, personal assistant tasks, research, scheduling, writing, students, and small business under Best AI agents.",
      },
    ];
  }
  if (slug === "builders") {
    return [
      {
        title: "Harnesses over vibes",
        body: "Start with the loop: tools, observations, stop conditions, evals. Framework names are in the directory. Sourced comparisons of harnesses, computer use agents, and evaluation tools live under Compare. They list licence, list price, and platform. They do not invent a ranking.",
      },
      {
        title: "Ship a listing when you ship a product",
        body: "Use the submit form to suggest a product. A listing is added only after the official site is checked.",
      },
    ];
  }
  return [
    {
      title: "Cite the paper, date the number",
      body: "Research pages carry the paper link, the authors, and BibTeX. We will not invent citations.",
    },
    {
        title: "Trackers wait for sources",
        body: "The sourced harness comparison lists licence, list price, and platform. The November harness benchmark lists the leaderboard rows that had a source and a date. Neither page invents a quality score.",
    },
  ];
}
