import Link from "next/link";
import { ArrowIcon, DirectoryIcon, LearnIcon, ResearchIcon, SearchIcon } from "@/components/Icons";
import { ListingRow } from "@/components/ListingCard";
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

const pillars = [
  {
    href: "/directory",
    kicker: "01  Directory",
    title: "Tools, apps, SaaS, agents",
    body: "Built to scale to thousands of listings.",
    Icon: DirectoryIcon,
  },
  {
    href: "/research",
    kicker: "02  Research",
    title: "Papers, reports, evals",
    body: "Each paper gets its own citable page.",
    Icon: ResearchIcon,
  },
  {
    href: "/blog",
    kicker: "03  Learn",
    title: "Blog & explainers",
    body: "From first questions to working systems.",
    Icon: LearnIcon,
  },
];

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
    <div>
      <section className="relative overflow-hidden">
        <div className="grid-fade pointer-events-none absolute inset-0" />
        <div className="relative mx-auto max-w-6xl px-4 pb-20 pt-14 sm:pb-24 sm:pt-20">
          <div className="reveal">
            <p className="kicker kicker-lead">Publication · Directory · Research</p>
            <h1 className="display mt-6 max-w-4xl text-[2.8rem] sm:text-7xl">
              Learn <span className="text-gradient">AI agents</span> from first questions to frontier research.
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-[var(--muted)] sm:text-xl">
              A calm, sourced site for curious kids, older and non-technical readers, builders, and researchers — covering news, tools, papers, shopping, task performance, harnesses, and education.
            </p>
          </div>

          <form action="/directory" method="get" className="reveal delay-1 glass mt-12 rounded-[1.75rem] p-4 sm:p-5">
            <label htmlFor="home-directory-q" className="kicker px-2">
              Search the AI directory
            </label>
            <div className="input-well mt-3 flex-col p-1.5 sm:flex-row sm:pl-4">
              <span className="hidden text-[var(--color-cyan)] sm:grid sm:place-items-center">
                <SearchIcon className="h-4 w-4" />
              </span>
              <input
                id="home-directory-q"
                name="q"
                placeholder="Coding agents, shopping, voice, harnesses…"
                className="focus-ring min-h-12 flex-1 bg-transparent px-4 text-base sm:min-h-12 sm:px-2 sm:text-lg"
              />
              <button className="btn-primary min-h-12 w-full px-7 text-sm sm:w-auto" type="submit">
                Search tools
              </button>
            </div>
            <ul className="mt-4 flex flex-wrap gap-2 px-1">
              {directoryCategories.map((category) => (
                <li key={category.slug}>
                  <Link href={`/directory/category/${category.slug}`} className="chip">
                    {category.title}
                  </Link>
                </li>
              ))}
            </ul>
          </form>

          <div className="reveal delay-2 mt-8 grid gap-4 sm:grid-cols-3">
            {pillars.map((item) => (
              <Link key={item.href} href={item.href} className="glass lift group rounded-3xl p-6">
                <div className="flex items-center justify-between">
                  <p className="kicker">{item.kicker}</p>
                  <item.Icon className="h-5 w-5 text-[var(--color-cyan)]" />
                </div>
                <h2 className="mt-4 font-semibold tracking-tight text-2xl text-[var(--fg)]">{item.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{item.body}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm text-[var(--color-electric)]">
                  Open
                  <ArrowIcon className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <div className="section-rule" />

      <section className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
        <p className="kicker kicker-lead">Four doors in</p>
        <h2 className="display mt-3 text-4xl sm:text-5xl">Who are you reading as today?</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {audiences.map((audience, index) => (
            <Link
              key={audience.slug}
              href={audience.href}
              className={`glass lift rounded-3xl p-7 ${audience.slug === "kids" ? "kids-card" : ""} reveal delay-${index + 1}`}
            >
              <p className="kicker">{audience.eyebrow}</p>
              <h3 className="mt-2 font-semibold tracking-tight text-3xl">{audience.title}</h3>
              <p className="mt-3 text-[var(--muted)]">{audience.summary}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="kicker kicker-lead">This Week in Agents</p>
            <h2 className="display mt-3 text-4xl sm:text-5xl">Latest from the desk</h2>
          </div>
          <Link href="/blog" className="text-sm text-[var(--color-electric)] underline">
            All posts
          </Link>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {latest.map((post) => (
            <article key={post.slug} className="glass lift rounded-3xl p-6">
              {post.sample ? <SampleBanner /> : null}
              <p className="kicker">
                {post.category} · {formatDate(post.date)}
              </p>
              <h3 className="mt-3 font-semibold tracking-tight text-2xl">
                <Link href={`/blog/${post.slug}`}>{post.title}</Link>
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">{post.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="kicker kicker-lead">Directory</p>
            <h2 className="display mt-3 text-4xl sm:text-5xl">New this week & editor&apos;s picks</h2>
          </div>
          <Link href="/directory" className="text-sm text-[var(--color-electric)] underline">
            Browse all
          </Link>
        </div>
        <div className="mt-8 grid gap-4 lg:grid-cols-2">
          <div className="glass rounded-3xl p-6">
            <p className="kicker mb-4">New this week</p>
            <ul className="grid gap-1">
              {newListings.map((listing) => (
                <li key={listing.slug}>
                  <ListingRow listing={listing} />
                </li>
              ))}
            </ul>
          </div>
          <div className="glass rounded-3xl p-6">
            <p className="kicker mb-4">Editor&apos;s picks</p>
            <ul className="grid gap-1">
              {picks.map((listing) => (
                <li key={listing.slug}>
                  <ListingRow listing={listing} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="kicker kicker-lead">Flagship research</p>
            <h2 className="display mt-3 text-4xl sm:text-5xl">Papers with their own pages</h2>
          </div>
          <Link href="/research" className="text-sm text-[var(--color-electric)] underline">
            Research desk
          </Link>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {research.map((doc) => (
            <article key={doc.slug} className="glass lift rounded-3xl p-6">
              {doc.sample ? <SampleBanner /> : null}
              <p className="kicker">{doc.type.replace("-", " ")}</p>
              <h3 className="mt-3 font-semibold tracking-tight text-2xl">
                <Link href={`/research/${doc.slug}`}>{doc.title}</Link>
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">{doc.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
        <p className="kicker kicker-lead">Coverage</p>
        <h2 className="display mt-3 text-4xl sm:text-5xl">Every beat, end to end</h2>
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {topics.map((topic) => (
            <Link key={topic.slug} href={topic.href} className="glass lift rounded-2xl p-5">
              <h3 className="font-medium tracking-tight">{topic.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{topic.summary}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
        <div className="glass rounded-[2rem] p-8 sm:p-10">
          <p className="kicker kicker-lead">Glossary A–Z</p>
          <h2 className="display mt-3 text-4xl sm:text-5xl">Words we will not hand-wave</h2>
          <p className="mt-3 max-w-xl text-[var(--muted)]">
            Sample terms only for now. Each letter will fill in as files land in <code>content/glossary</code>.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {letters.map((letter) => (
              <Link key={letter} href={`/glossary#${letter}`} className="chip grid h-10 w-10 place-items-center px-0">
                {letter}
              </Link>
            ))}
          </div>
          <Link href="/glossary" className="mt-6 inline-block text-sm text-[var(--color-electric)] underline">
            Open the glossary
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-20">
        <p className="kicker kicker-lead">Newsletter</p>
        <h2 className="display mt-3 text-4xl sm:text-5xl">A digest, not a firehose</h2>
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
