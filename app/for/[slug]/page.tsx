import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { EmptyState } from "@/components/EmptyState";
import { ReadableToggle } from "@/components/ReadableToggle";
import { getBlogPosts } from "@/lib/blog";
import { getDirectoryListings } from "@/lib/directory";
import { getResearchDocs } from "@/lib/research";
import { defaultMetadata } from "@/lib/seo";
import { audiences } from "@/lib/site";

export async function generateStaticParams() {
  return audiences.map((audience) => ({ slug: audience.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const audience = audiences.find((item) => item.slug === slug);
  if (!audience) return {};
  return defaultMetadata(audience.title, audience.summary, audience.href);
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
  const isKids = slug === "kids";
  const isEveryone = slug === "everyone";
  const isResearch = slug === "research";

  const copy = copyFor(slug);

  const body = (
    <>
      <p className="kicker">{audience.eyebrow}</p>
      <h1 className="display mt-3 text-5xl">{audience.title}</h1>
      <p className="mt-4 text-lg text-[var(--muted)]">{audience.summary}</p>
      {copy.map((block) => (
        <section key={block.title} className="mt-10">
          <h2 className="font-semibold tracking-tight text-3xl">{block.title}</h2>
          <p className="mt-3 text-[var(--muted)]">{block.body}</p>
        </section>
      ))}
      <section className="mt-10">
        <h2 className="font-semibold tracking-tight text-2xl">Start here</h2>
        {relatedPosts.length || (isResearch && research.length) ? (
          <ul className="mt-3 grid gap-2">
            {relatedPosts.map((post) => (
              <li key={post.slug}>
                <Link href={`/blog/${post.slug}`}>{post.title}</Link>
              </li>
            ))}
            {isResearch
              ? research.map((doc) => (
                  <li key={doc.slug}>
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
                <Link href={`/directory/${listing.slug}`}>{listing.name}</Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </>
  );

  return (
    <div className={isKids ? "kids-theme" : ""}>
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: audience.title, path: audience.href },
        ]}
      />
      <div className="mx-auto max-w-3xl px-4 pb-20 pt-12">
        {isEveryone ? <ReadableToggle>{body}</ReadableToggle> : body}
        {isKids ? (
          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            <div className="kids-card p-6">
              <p className="text-lg">An agent is a helper that can do steps, not just talk.</p>
            </div>
            <div className="kids-card p-6">
              <p className="text-lg">Always ask a grown-up before it clicks, buys, or sends.</p>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

function copyFor(slug: string) {
  if (slug === "kids") {
    return [
      {
        title: "A helper that can take turns",
        body: "A chatbot answers with words. An agent can also use tools: look something up, write code, or click around a screen. That is powerful and it can make mistakes. Use it like a curious lab — with a grown-up nearby.",
      },
      {
        title: "Words we will keep small",
        body: "We will not pretend the computer is a person. We will not invent scores or fans.",
      },
    ];
  }
  if (slug === "everyone") {
    return [
      {
        title: "Plain language, larger type if you want it",
        body: "Use the button above to enlarge the text. Jargon is linked to the glossary. If a company brags about millions of users, we will not repeat the number unless we can source it.",
      },
      {
        title: "What you can learn here",
        body: "What an agent is, what it still cannot do, and how shopping, school, and office tools are actually being used — without requiring a computer-science degree.",
      },
    ];
  }
  if (slug === "builders") {
    return [
      {
        title: "Harnesses over vibes",
        body: "Start with the loop: tools, observations, stop conditions, evals. Framework names are in the directory. We will not crown a winner without a sourced comparison.",
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
      body: "The timeline, harness table, and leaderboard stay empty until each cell has a source and a date.",
    },
  ];
}
