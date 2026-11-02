import Link from "next/link";
import { NewsletterForm } from "@/components/NewsletterForm";
import { SampleBanner } from "@/components/SampleBanner";
import { SponsorSlot } from "@/components/SponsorSlot";
import { getBlogPosts } from "@/lib/blog";
import {
  directoryCategories,
  getDirectoryListings,
  listingsForCollection,
} from "@/lib/directory";
import { getGlossaryTerms } from "@/lib/glossary";
import { getResearchDocs } from "@/lib/research";
import { absoluteUrl } from "@/lib/site";
import { audiences, site, topics } from "@/lib/site";
import { formatDate } from "@/lib/utils";

export const metadata = {
  title: { absolute: `${site.name} — ${site.tagline}` },
  description: site.description,
  alternates: { canonical: absoluteUrl("/") },
};

export default async function HomePage() {
  const [posts, research, listings, glossary] = await Promise.all([
    getBlogPosts(),
    getResearchDocs(),
    getDirectoryListings(),
    getGlossaryTerms(),
  ]);
  const latest = posts.slice(0, 3);
  const newListings = listingsForCollection(listings, "new").slice(0, 4);
  const picks = listingsForCollection(listings, "editors-picks").slice(0, 4);
  const letters = Array.from(new Set(glossary.map((term) => term.term[0]?.toUpperCase()))).sort();

  return (
    <div className="mesh">
      <section className="mx-auto max-w-6xl px-4 pb-20 pt-16 sm:pt-24">
        <div className="reveal">
          <p className="kicker">Publication · Directory · Research desk</p>
          <h1 className="display mt-5 max-w-4xl text-5xl sm:text-7xl">
            Learn AI agents from first questions to frontier research.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-[var(--muted)] sm:text-xl">
            A calm, sourced site for curious kids, older and non-technical readers, builders, and researchers — covering news, tools, papers, shopping, task performance, harnesses, and education.
          </p>
        </div>

        <form action="/directory" method="get" className="reveal delay-1 glass mt-10 rounded-[2rem] p-3 sm:p-4">
          <label htmlFor="home-directory-q" className="kicker px-3">
            Search the AI directory
          </label>
          <div className="mt-2 flex flex-col gap-3 sm:flex-row">
            <input
              id="home-directory-q"
              name="q"
              placeholder="Coding agents, shopping, voice, harnesses…"
              className="focus-ring min-h-14 flex-1 rounded-full bg-transparent px-5 text-base sm:text-lg"
            />
            <button className="rounded-full bg-[var(--fg)] px-6 py-3 text-sm font-medium text-[var(--bg)]" type="submit">
              Search tools
            </button>
          </div>
          <ul className="mt-4 flex flex-wrap gap-2 px-2">
            {directoryCategories.map((category) => (
              <li key={category.slug}>
                <Link
                  href={`/directory/category/${category.slug}`}
                  className="lift inline-flex rounded-full border border-[var(--stroke)] px-3 py-1.5 text-sm"
                >
                  {category.title}
                </Link>
              </li>
            ))}
          </ul>
        </form>

        <div className="reveal delay-2 mt-8 grid gap-4 sm:grid-cols-3">
          {[
            { href: "/directory", kicker: "Directory", title: "Tools, apps, SaaS, agents", body: "Built to scale to thousands of listings." },
            { href: "/research", kicker: "Research", title: "Papers, reports, evals", body: "Each paper gets its own citable page." },
            { href: "/blog", kicker: "Learn", title: "Blog & explainers", body: "From first questions to working systems." },
          ].map((item) => (
            <Link key={item.href} href={item.href} className="glass lift rounded-3xl p-6">
              <p className="kicker">{item.kicker}</p>
              <h2 className="mt-3 font-serif text-2xl">{item.title}</h2>
              <p className="mt-2 text-sm text-[var(--muted)]">{item.body}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <p className="kicker">Four doors in</p>
        <h2 className="display mt-3 text-4xl">Who are you reading as today?</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {audiences.map((audience, index) => (
            <Link
              key={audience.slug}
              href={audience.href}
              className={`glass lift rounded-3xl p-7 ${audience.slug === "kids" ? "kids-card" : ""} reveal delay-${index + 1}`}
            >
              <p className="kicker">{audience.eyebrow}</p>
              <h3 className="mt-2 font-serif text-3xl">{audience.title}</h3>
              <p className="mt-3 text-[var(--muted)]">{audience.summary}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="kicker">This Week in Agents</p>
            <h2 className="display mt-3 text-4xl">Latest from the desk</h2>
          </div>
          <Link href="/blog" className="text-sm underline">
            All posts
          </Link>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {latest.map((post) => (
            <article key={post.slug} className="glass lift rounded-3xl p-6">
              {post.sample ? <SampleBanner /> : null}
              <p className="kicker">{post.category} · {formatDate(post.date)}</p>
              <h3 className="mt-3 font-serif text-2xl">
                <Link href={`/blog/${post.slug}`}>{post.title}</Link>
              </h3>
              <p className="mt-3 text-sm text-[var(--muted)]">{post.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="kicker">Directory</p>
            <h2 className="display mt-3 text-4xl">New this week & editor&apos;s picks</h2>
          </div>
          <Link href="/directory" className="text-sm underline">
            Browse all
          </Link>
        </div>
        <div className="mt-8 grid gap-4 lg:grid-cols-2">
          <div className="glass rounded-3xl p-6">
            <p className="kicker mb-4">New this week</p>
            <ul className="grid gap-3">
              {newListings.map((listing) => (
                <li key={listing.slug}>
                  <Link href={`/directory/${listing.slug}`} className="flex items-baseline justify-between gap-3">
                    <span>{listing.name}</span>
                    <span className="text-sm text-[var(--muted)]">{listing.vendor}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="glass rounded-3xl p-6">
            <p className="kicker mb-4">Editor&apos;s picks</p>
            <ul className="grid gap-3">
              {picks.map((listing) => (
                <li key={listing.slug}>
                  <Link href={`/directory/${listing.slug}`} className="flex items-baseline justify-between gap-3">
                    <span>{listing.name}</span>
                    <span className="text-sm text-[var(--muted)]">{listing.vendor}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="kicker">Flagship research</p>
            <h2 className="display mt-3 text-4xl">Papers with their own pages</h2>
          </div>
          <Link href="/research" className="text-sm underline">
            Research desk
          </Link>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {research.map((doc) => (
            <article key={doc.slug} className="glass lift rounded-3xl p-6">
              {doc.sample ? <SampleBanner /> : null}
              <p className="kicker">{doc.type.replace("-", " ")}</p>
              <h3 className="mt-3 font-serif text-2xl">
                <Link href={`/research/${doc.slug}`}>{doc.title}</Link>
              </h3>
              <p className="mt-3 text-sm text-[var(--muted)]">{doc.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <p className="kicker">Coverage</p>
        <h2 className="display mt-3 text-4xl">Every beat, end to end</h2>
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {topics.map((topic) => (
            <Link key={topic.slug} href={topic.href} className="glass lift rounded-2xl p-5">
              <h3 className="font-medium">{topic.title}</h3>
              <p className="mt-2 text-sm text-[var(--muted)]">{topic.summary}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="glass rounded-[2rem] p-8 sm:p-10">
          <p className="kicker">Glossary A–Z</p>
          <h2 className="display mt-3 text-4xl">Words we will not hand-wave</h2>
          <p className="mt-3 max-w-xl text-[var(--muted)]">
            Sample terms only for now. Each letter will fill in as files land in <code>content/glossary</code>.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {letters.map((letter) => (
              <Link key={letter} href={`/glossary#${letter}`} className="grid h-10 w-10 place-items-center rounded-full border border-[var(--stroke)]">
                {letter}
              </Link>
            ))}
          </div>
          <Link href="/glossary" className="mt-6 inline-block text-sm underline">
            Open the glossary
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-20">
        <p className="kicker">Newsletter</p>
        <h2 className="display mt-3 text-4xl">A digest, not a firehose</h2>
        <p className="mt-3 text-[var(--muted)]">
          Form posts to an API route with a provider TODO. No keys in this repo. We will not invent subscriber counts.
        </p>
        <div className="mt-6">
          <NewsletterForm />
        </div>
        <div className="mt-8">
          <SponsorSlot
            placement="Newsletter"
            title="Newsletter sponsor slot"
            body="Reserved for a future digest sponsor. Labeled on purpose. We will not invent a subscriber count to sell this."
          />
        </div>
      </section>
    </div>
  );
}
