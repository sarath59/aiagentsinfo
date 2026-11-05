import Link from "next/link";
import { ArrowIcon, DirectoryIcon, LearnIcon, ResearchIcon } from "@/components/Icons";
import { CompanyLogo } from "@/components/CompanyLogo";
import { CompanyMarks } from "@/components/CompanyMarks";
import { EmptyState } from "@/components/EmptyState";
import { HeroFigure } from "@/components/HeroFigure";
import { ListingCard } from "@/components/ListingCard";
import { NewsletterForm } from "@/components/NewsletterForm";
import { categoryTitle, getBlogPosts } from "@/lib/blog";
import { getDirectoryListings } from "@/lib/directory";
import { getGlossaryTerms } from "@/lib/glossary";
import { getResearchDocs, researchTypeTitle } from "@/lib/research";
import { indexRobots } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";
import { audiences, dataAssets, site, topics } from "@/lib/site";
import { formatDate } from "@/lib/utils";

export const metadata = {
  title: { absolute: `${site.name} — ${site.tagline}` },
  description: site.description,
  alternates: { canonical: absoluteUrl("/") },
  openGraph: {
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    url: absoluteUrl("/"),
    siteName: site.name,
    type: "website" as const,
    locale: site.locale,
  },
  robots: indexRobots,
};

const pillars = [
  {
    href: "/directory",
    kicker: "01  Directory",
    title: "Tools, apps, SaaS, agents",
    body: "Built to scale to thousands of listings.",
    cta: "Open the directory",
    Icon: DirectoryIcon,
  },
  {
    href: "/research",
    kicker: "02  Research",
    title: "Papers, reports, evals",
    body: "Each paper gets its own citable page.",
    cta: "Open research notes",
    Icon: ResearchIcon,
  },
  {
    href: "/blog",
    kicker: "03  Learn",
    title: "Blog & explainers",
    body: "News, explainers, and guides in plain English.",
    cta: "Open the blog",
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
  const heroPreviews = latest.map((post) => ({
    kicker: categoryTitle(post.category),
    title: post.title,
    date: formatDate(post.date),
  }));
  for (const doc of research) {
    if (heroPreviews.length >= 3) break;
    heroPreviews.push({
      kicker: researchTypeTitle(doc.type),
      title: doc.title,
      date: formatDate(doc.date),
    });
  }
  const previewListings = listings.slice(0, 6);
  const letters = Array.from(new Set(glossary.map((term) => term.term[0]?.toUpperCase()))).sort();

  return (
    <div>
      <section className="relative overflow-hidden" aria-labelledby="home-heading">
        <div className="grid-fade pointer-events-none absolute inset-0" />
        <div className="relative mx-auto max-w-6xl px-4 pb-20 pt-16 sm:pb-24 sm:pt-20 lg:pb-28 lg:pt-24">
          <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,1.04fr)_minmax(340px,0.96fr)] lg:gap-16 xl:gap-20">
            <div className="min-w-0 max-w-xl lg:max-w-none lg:py-4">
              <p className="kicker kicker-lead">News · Directory · Research</p>
              <h1
                id="home-heading"
                className="display mt-6 max-w-[14em] text-[2.55rem] leading-[1.04] tracking-[-0.035em] sm:text-5xl sm:leading-[1.03] lg:text-[3.45rem] xl:text-[3.7rem]"
              >
                The latest news, research, tools, and guides on <span className="text-gradient">AI agents</span>.
              </h1>
              <p className="mt-6 max-w-md text-base leading-7 text-[var(--muted)] sm:text-lg sm:leading-8">
                Reporting, a directory of working tools, and notes on the papers that matter.
              </p>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link href="/blog" className="btn-primary focus-ring min-h-12 gap-2 px-6 text-[15px] sm:px-7">
                  Read the latest
                  <ArrowIcon className="h-3.5 w-3.5" />
                </Link>
                <Link href="/directory" className="btn-ghost focus-ring min-h-12 px-6 text-[15px] sm:px-7">
                  Browse the directory
                </Link>
              </div>
            </div>
            <HeroFigure previews={heroPreviews} />
          </div>

          <div className="mt-16 grid gap-4 sm:mt-20 sm:grid-cols-3 lg:mt-24">
            {pillars.map((item) => (
              <Link key={item.href} href={item.href} className="glass lift group rounded-3xl p-6">
                <div className="flex items-center justify-between">
                  <p className="kicker">{item.kicker}</p>
                  <item.Icon className="h-5 w-5 text-[var(--color-cyan)]" />
                </div>
                <h2 className="mt-4 font-semibold tracking-tight text-2xl text-[var(--fg)]">{item.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{item.body}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm text-[var(--color-electric)]">
                  {item.cta}
                  <ArrowIcon className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <div className="section-rule" />

      <section className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
        <p className="kicker kicker-lead">Where to start</p>
        <h2 className="display mt-3 text-4xl sm:text-5xl">Pick a reading path</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {audiences.map((audience, index) => (
            <Link
              key={audience.slug}
              href={audience.href}
              className={`glass lift rounded-3xl p-7 reveal delay-${index + 1}`}
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
            <p className="kicker kicker-lead">Blog</p>
            <h2 className="display mt-3 text-4xl sm:text-5xl">Latest from the desk</h2>
          </div>
          <Link href="/blog" className="text-sm text-[var(--color-electric)] underline">
            All blog posts
          </Link>
        </div>
        <div className="mt-8">
          {latest.length ? (
            <div className="grid gap-4 md:grid-cols-3">
              {latest.map((post) => (
                <article key={post.slug} className="glass lift click-card rounded-3xl p-6">
                  <p className="kicker">
                    {post.category} · {formatDate(post.date)}
                  </p>
                  <h3 className="mt-3 font-semibold tracking-tight text-2xl">
                    <Link className="card-stretch" href={`/blog/${post.slug}`}>
                      {post.title}
                    </Link>
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">{post.description}</p>
                  {post.companies?.length ? (
                    <div className="mt-4">
                      <CompanyMarks slugs={post.companies} />
                    </div>
                  ) : null}
                </article>
              ))}
            </div>
          ) : (
            <EmptyState
              title="First articles publishing soon"
              body="Explainers, news, and guides will land here once they are written and sourced."
              href="/blog"
              cta="Visit the blog"
            />
          )}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="kicker kicker-lead">Directory</p>
            <h2 className="display mt-3 text-4xl sm:text-5xl">Tools with an official home</h2>
          </div>
          <Link href="/directory" className="text-sm text-[var(--color-electric)] underline">
            Browse the directory
          </Link>
        </div>
        <div className="mt-8">
          {previewListings.length ? (
            <div className="grid gap-4 md:grid-cols-2">
              {previewListings.map((listing) => (
                <ListingCard key={listing.slug} listing={listing} />
              ))}
            </div>
          ) : (
            <EmptyState
              title="Listings coming soon — submit a tool"
              body="The directory lists real products with a working official site. Nothing is published until it is checked."
              href="/submit"
              cta="Submit a tool"
            />
          )}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="kicker kicker-lead">Reports</p>
            <h2 className="display mt-3 text-4xl sm:text-5xl">Figures you can cite</h2>
          </div>
          <Link href="/reports" className="text-sm text-[var(--color-electric)] underline">
            All reports
          </Link>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {dataAssets.map((item) => (
            <article key={item.href} className="glass lift click-card rounded-3xl p-6">
              <h3 className="font-semibold tracking-tight text-2xl">
                <Link className="card-stretch" href={item.href}>
                  {item.title}
                </Link>
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">{item.summary}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="kicker kicker-lead">Flagship research</p>
            <h2 className="display mt-3 text-4xl sm:text-5xl">Papers with their own pages</h2>
          </div>
          <Link href="/research" className="text-sm text-[var(--color-electric)] underline">
            Open the research desk
          </Link>
        </div>
        <div className="mt-8">
          {research.length ? (
            <div className="grid gap-4 md:grid-cols-2">
              {research.map((doc) => (
                <article key={doc.slug} className="glass lift click-card rounded-3xl p-6">
                  <p className="kicker">{doc.type.replace("-", " ")}</p>
                  <h3 className="mt-3 font-semibold tracking-tight text-2xl">
                    <Link className="card-stretch" href={`/research/${doc.slug}`}>
                      {doc.title}
                    </Link>
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">{doc.description}</p>
                  {doc.companies?.length ? (
                    <div className="mt-4">
                      <CompanyMarks slugs={doc.companies} />
                    </div>
                  ) : null}
                </article>
              ))}
            </div>
          ) : (
            <EmptyState
              title="Research notes publishing soon"
              body={
                <>
                  Paper pages will appear when there is a real{" "}
                  <span className="inline-flex items-center gap-1 align-middle">
                    <CompanyLogo name="arXiv" src="/logos/arxiv.png" size={16} />
                    arXiv
                  </span>{" "}
                  or DOI link and the authors are correct.
                </>
              }
              href="/research"
              cta="Research desk"
            />
          )}
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
            Short definitions of terms the site actually uses. Each entry is a page of its own.
          </p>
          {letters.length ? (
            <div className="mt-6 flex flex-wrap gap-2">
              {letters.map((letter) => (
                <Link key={letter} href={`/glossary#${letter}`} className="chip grid h-10 w-10 place-items-center px-0">
                  {letter}
                </Link>
              ))}
            </div>
          ) : (
            <div className="mt-6">
              <EmptyState title="Glossary entries publishing soon" body="Definitions will show up here as terms are written." href="/glossary" cta="Open the glossary" />
            </div>
          )}
          <Link href="/glossary" className="mt-6 inline-block text-sm text-[var(--color-electric)] underline">
            Open the glossary
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-20">
        <p className="kicker kicker-lead">Newsletter</p>
        <h2 className="display mt-3 text-4xl sm:text-5xl">A digest, not a firehose</h2>
        <p className="mt-3 text-[var(--muted)]">
          A short note when there is something worth sending. No subscriber count is published.
        </p>
        <div className="mt-6">
          <NewsletterForm />
        </div>
      </section>
    </div>
  );
}
