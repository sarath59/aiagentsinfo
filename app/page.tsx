import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowIcon } from "@/components/Icons";
import { CompanyLogo } from "@/components/CompanyLogo";
import { EmptyState } from "@/components/EmptyState";
import { EntityStatement } from "@/components/EntityStatement";
import { HomeReveal } from "@/components/home/HomeReveal";
import { HomeToolsHero } from "@/components/home/HomeToolsHero";
import { FlagshipCover, ReportCover } from "@/components/ReportCover";
import { SubmitToolButton } from "@/components/SubmitToolButton";
import { TrackLink } from "@/components/TrackLink";
import { LIST_TOOL_CTA, LIST_TOOL_PATH, listToolMeta } from "@/lib/analytics/list-tool-goals";
import { categoryTitle, getBlogPosts, type BlogPost } from "@/lib/blog";
import { companyForName } from "@/lib/companies";
import { categoryTitle as directoryCategoryTitle, getDirectoryListings, type DirectoryListing } from "@/lib/directory";
import { getGlossaryTerms } from "@/lib/glossary";
import { flagshipReport, labInstruments, publishedReports } from "@/lib/report-catalog";
import { getResearchDocs, researchTypeTitle, type ResearchDoc } from "@/lib/research";
import { indexRobots } from "@/lib/seo";
import { liveTrackers } from "@/lib/trackers";
import { absoluteUrl, comparisons, site } from "@/lib/site";
import { formatDate } from "@/lib/utils";

const socialTitle = `${site.name} — ${site.tagline}`;

export const metadata = {
  title: { absolute: socialTitle },
  description: site.description,
  alternates: { canonical: absoluteUrl("/") },
  openGraph: {
    title: socialTitle,
    description: site.description,
    url: absoluteUrl("/"),
    siteName: site.name,
    type: "website" as const,
    locale: site.locale,
  },
  twitter: {
    card: "summary_large_image" as const,
    title: socialTitle,
    description: site.description,
  },
  robots: indexRobots,
};

const spotlightSlugs = ["cursor", "devin", "crewai", "claude-code", "langgraph", "openai-codex"] as const;
const instrumentHrefs = [
  "/tools/mcp-config-generator",
  "/tools/ai-crawler-robots-txt-checker",
  "/tools/agents-md-generator",
  "/agent-cost-calculator",
  "/tools/ai-agent-roi-calculator",
  "/agent-prompt-checker",
  "/verified-revenue",
  "/directory/stats",
] as const;

function previewTools(listings: DirectoryListing[], count: number) {
  const picked: DirectoryListing[] = [];
  for (const slug of spotlightSlugs) {
    const listing = listings.find((item) => item.slug === slug);
    if (listing) picked.push(listing);
  }
  for (const listing of listings) {
    if (picked.length >= count) break;
    if (!picked.some((item) => item.slug === listing.slug)) picked.push(listing);
  }
  return picked.slice(0, count);
}

const agentCategories = ["ai-agents", "coding-agents", "agent-frameworks", "developer-tools", "voice", "research"];

function topCategories(listings: DirectoryListing[], count: number) {
  const tally = new Map<string, number>();
  for (const listing of listings) tally.set(listing.category, (tally.get(listing.category) ?? 0) + 1);
  const pinned = agentCategories.filter((slug) => tally.has(slug));
  const rest = [...tally.keys()]
    .filter((slug) => !pinned.includes(slug))
    .sort((a, b) => (tally.get(b) ?? 0) - (tally.get(a) ?? 0) || a.localeCompare(b));
  return [...pinned, ...rest]
    .slice(0, count)
    .map((slug) => ({ slug, total: tally.get(slug) ?? 0, title: directoryCategoryTitle(slug) }));
}

function plural(count: number, singular: string, pluralLabel = `${singular}s`) {
  return count === 1 ? singular : pluralLabel;
}

export default async function HomePage() {
  const [posts, research, listings, glossary] = await Promise.all([
    getBlogPosts(),
    getResearchDocs(),
    getDirectoryListings(),
    getGlossaryTerms(),
  ]);
  const news = posts.filter((post) => post.category === "news").slice(0, 4);
  const guidePosts = posts.filter((post) => post.category === "guide");
  const digitalWorker = guidePosts.find((post) => post.slug === "what-is-a-digital-worker");
  const guides = (
    digitalWorker
      ? [digitalWorker, ...guidePosts.filter((post) => post.slug !== digitalWorker.slug)]
      : guidePosts
  ).slice(0, 4);
  const papers = research.slice(0, 4);
  const tools = previewTools(listings, 24);
  const heroTools = tools.map((listing) => {
    const brand = companyForName(listing.name);
    return {
      slug: listing.slug,
      name: listing.name,
      logo: listing.logo || undefined,
      tile: brand?.tile,
    };
  });
  const sectionTools = tools.slice(0, 6);
  const categories = topCategories(listings, 10);
  const reportGrid = publishedReports.slice(0, 6);
  const reportCount = publishedReports.length + (flagshipReport ? 1 : 0);
  const instruments = instrumentHrefs.flatMap((href) => {
    const item = labInstruments.find((entry) => entry.href === href);
    return item ? [item] : [];
  });
  const toolCount = listings.length.toLocaleString("en-US");

  return (
    <div className="home">
      <HomeToolsHero tools={heroTools} toolCount={toolCount} />

      <HomeReveal>
        <section className="mx-auto max-w-6xl px-4" aria-label="What we do">
          <div className="lab-pillars">
            <div className="lab-pillar lab-pillar-dark">
              <p className="lab-pillar-eyebrow">I · The lab</p>
              <h2 className="lab-pillar-title">Research you can cite</h2>
              <p className="lab-pillar-body">
                Reports, daily briefs and benchmarks on agents, harnesses and frameworks. Every figure carries a date
                and a public source, or it does not go up.
              </p>
              <ul className="lab-pillar-list">
                <li>Flagship 12-month outlook, revised as filings land</li>
                <li>Daily briefs on crawlers, pricing and releases</li>
                <li>Live trackers for downloads, stars and AGENTS.md</li>
              </ul>
              <Link href="/reports" className="lab-pillar-link focus-ring">
                Explore the research
                <ArrowIcon className="h-3.5 w-3.5" />
              </Link>
            </div>
            <div className="lab-pillar lab-pillar-light">
              <p className="lab-pillar-eyebrow">II · The directory</p>
              <h2 className="lab-pillar-title">Every AI agent tool, with an official home</h2>
              <p className="lab-pillar-body">
                {toolCount} tools across coding agents, frameworks, voice, research and more. Each listing is checked
                against a working site before it goes live.
              </p>
              <ul className="lab-pillar-list">
                <li>Free listing, no account, live as soon as it is saved</li>
                <li>Pricing, maker and links on one page</li>
                <li>Category pages and side-by-side comparisons</li>
              </ul>
              <Link href="/directory" className="lab-pillar-link focus-ring">
                Browse the directory
                <ArrowIcon className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </section>
      </HomeReveal>

      <HomeReveal>
        <section className="home-section mx-auto max-w-6xl px-4" aria-labelledby="home-reports">
          <SectionHead
            id="home-reports"
            index="01"
            eyebrow="Research library"
            title="Reports, published like a journal"
            lede="Numbered, dated and sourced. Read them in the browser, cite them in your own work."
            href="/reports"
            seeAllLabel={`All ${reportCount} reports`}
          />
          {flagshipReport ? <FlagshipCover entry={flagshipReport} /> : null}
          <div className="report-cover-grid">
            {reportGrid.map((entry, index) => (
              <ReportCover key={entry.href} entry={entry} issue={publishedReports.length - index} />
            ))}
          </div>
        </section>
      </HomeReveal>

      <HomeReveal>
        <section className="home-section mx-auto max-w-6xl px-4" aria-labelledby="home-directory">
          <SectionHead
            id="home-directory"
            index="02"
            eyebrow="The directory"
            title="AI agent tools worth knowing"
            lede={`${toolCount} ${plural(listings.length, "tool")}, each with a working official site. Browse by category or search by name.`}
            href="/directory"
            seeAllLabel="See all tools"
          />
          {categories.length ? (
            <ul className="lab-categories" aria-label="Popular categories">
              {categories.map((category) => (
                <li key={category.slug}>
                  <Link href={`/directory/category/${category.slug}`} className="lab-category focus-ring">
                    {category.title}
                    <span>{category.total.toLocaleString("en-US")}</span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : null}
          {sectionTools.length ? (
            <div className="lab-tool-logo-grid" aria-label="Sample tools from the directory">
              {sectionTools.map((listing) => (
                <ToolLogoCard key={listing.slug} listing={listing} />
              ))}
            </div>
          ) : (
            <EmptyState
              title="Listings coming soon"
              body="The directory lists real products with a working official site."
              href="/submit"
              cta="Submit a tool"
            />
          )}
          <div className="lab-list-cta">
            <div>
              <p className="lab-list-cta-title">Building an AI agent tool?</p>
              <p className="lab-list-cta-body">
                Featured 30-day listing for AI answer traffic, or submit free for a basic page.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <TrackLink
                href={LIST_TOOL_PATH}
                goal={LIST_TOOL_CTA}
                metadata={listToolMeta({ placement: "home_directory" })}
                className="btn-primary focus-ring inline-flex px-5 py-2.5 text-sm"
              >
                List your tool
              </TrackLink>
              <SubmitToolButton />
            </div>
          </div>
        </section>
      </HomeReveal>

      <HomeReveal>
        <section className="home-section mx-auto max-w-6xl px-4" aria-labelledby="home-instruments">
          <SectionHead
            id="home-instruments"
            index="03"
            eyebrow="Instruments"
            title="Live trackers and lab tools"
            lede="Data that refreshes daily, and calculators and checkers you can open in the browser."
            href="/tools"
            seeAllLabel="All free tools"
          />
          <div className="lab-instruments">
            <div className="lab-trackers">
              {liveTrackers.map((item) => (
                <Link key={item.href} href={item.href} className="lab-tracker focus-ring">
                  <span className="lab-tracker-pulse" aria-hidden="true" />
                  <span className="lab-tracker-kicker">{item.kicker}</span>
                  <span className="lab-tracker-title">{item.title}</span>
                  <span className="lab-tracker-body">{item.summary}</span>
                </Link>
              ))}
            </div>
            <ol className="lab-tool-list">
              {instruments.map((tool, index) => (
                <li key={tool.href}>
                  <Link href={tool.href} className="lab-tool-row focus-ring">
                    <span className="lab-tool-index" aria-hidden="true">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="lab-tool-copy">
                      <span className="lab-tool-name">{tool.title}</span>
                      <span className="lab-tool-kicker">{tool.kicker}</span>
                    </span>
                    <ArrowIcon className="lab-tool-arrow h-3.5 w-3.5" />
                  </Link>
                </li>
              ))}
            </ol>
          </div>
        </section>
      </HomeReveal>

      <HomeReveal>
        <section className="home-section mx-auto max-w-6xl px-4" aria-labelledby="home-compare">
          <SectionHead
            id="home-compare"
            index="04"
            eyebrow="Best AI agents"
            title="Comparisons from official pages"
            lede="Licence, list price and platform, read from the vendor. Last verified November 2026. No invented scores."
            href="/best"
            seeAllLabel="All comparisons"
          />
          <div className="lab-compare">
            {comparisons.map((page) => (
              <Link key={page.href} href={page.href} className="lab-compare-card focus-ring">
                <span className="lab-compare-title">{page.title}</span>
                <span className="lab-compare-body">{page.summary}</span>
                <span className="lab-compare-more">
                  Open the table
                  <ArrowIcon className="h-3.5 w-3.5" />
                </span>
              </Link>
            ))}
          </div>
        </section>
      </HomeReveal>

      <HomeReveal>
        <section className="home-section mx-auto max-w-6xl px-4" aria-labelledby="home-desk">
          <SectionHead
            id="home-desk"
            index="05"
            eyebrow="The desk"
            title="News, paper notes and guides"
            lede="Short dated notes on what changed, papers with their own pages, and plain-English explainers."
            href="/blog"
            seeAllLabel="Visit the blog"
          />
          <div className="lab-desk">
            <DeskColumn title="News" href="/blog?category=news" seeAll="All news">
              {news.length ? (
                news.map((post) => <PostRow key={post.slug} post={post} />)
              ) : (
                <li className="lab-desk-empty">News notes will land here once they are written and sourced.</li>
              )}
            </DeskColumn>
            <DeskColumn title="Paper notes" href="/research" seeAll="All papers">
              {papers.length ? (
                papers.map((doc) => <PaperRow key={doc.slug} doc={doc} />)
              ) : (
                <li className="lab-desk-empty">Paper pages appear when the source and the authors check out.</li>
              )}
            </DeskColumn>
            <DeskColumn
              title="Guides"
              href={guides.length ? "/blog?category=guide" : "/glossary"}
              seeAll={guides.length ? "All guides" : "Glossary"}
            >
              {guides.map((post) => (
                <PostRow key={post.slug} post={post} />
              ))}
              {glossary.length ? (
                <li>
                  <Link href="/glossary" className="lab-desk-row focus-ring">
                    <span className="lab-desk-meta">Glossary</span>
                    <span className="lab-desk-title">
                      {glossary.length.toLocaleString("en-US")} {plural(glossary.length, "term")}, defined plainly
                    </span>
                  </Link>
                </li>
              ) : null}
            </DeskColumn>
          </div>
        </section>
      </HomeReveal>

      <HomeReveal>
        <section className="mx-auto max-w-6xl px-4" aria-labelledby="home-closing">
          <div className="lab-closing">
            <div className="lab-closing-copy">
              <p className="lab-closing-eyebrow">AI Agents Info</p>
              <h2 id="home-closing" className="lab-closing-title">
                Research for the people building AI agents. <em>A directory for the tools they ship.</em>
              </h2>
              <EntityStatement embedded />
            </div>
            <div className="lab-closing-actions">
              <SubmitToolButton />
              <Link href="/editorial-policy" className="lab-closing-link focus-ring">
                How we research and verify
                <ArrowIcon className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </section>
      </HomeReveal>
    </div>
  );
}

function SectionHead({
  id,
  index,
  eyebrow,
  title,
  lede,
  href,
  seeAllLabel,
}: {
  id: string;
  index: string;
  eyebrow: string;
  title: string;
  lede: string;
  href: string;
  seeAllLabel: string;
}) {
  return (
    <div className="home-head">
      <div>
        <p className="home-eyebrow">
          <span className="home-eyebrow-index">{index}</span>
          {eyebrow}
        </p>
        <h2 id={id} className="home-h2">
          {title}
        </h2>
        <p className="home-lede">{lede}</p>
      </div>
      <Link href={href} className="home-see focus-ring">
        {seeAllLabel}
        <ArrowIcon className="h-3.5 w-3.5" />
      </Link>
    </div>
  );
}

function ToolLogoCard({ listing }: { listing: DirectoryListing }) {
  const brand = companyForName(listing.name);
  return (
    <Link
      href={`/directory/${listing.slug}`}
      className="lab-tool-logo focus-ring"
      title={listing.name}
      aria-label={listing.name}
    >
      <CompanyLogo name={listing.name} src={listing.logo || undefined} tile={brand?.tile} size="lg" />
    </Link>
  );
}

function DeskColumn({
  title,
  href,
  seeAll,
  children,
}: {
  title: string;
  href: string;
  seeAll: string;
  children: ReactNode;
}) {
  return (
    <div className="lab-desk-col">
      <div className="lab-desk-head">
        <h3 className="lab-desk-heading">{title}</h3>
        <Link href={href} className="lab-desk-see focus-ring">
          {seeAll}
        </Link>
      </div>
      <ul className="lab-desk-list">{children}</ul>
    </div>
  );
}

function PostRow({ post }: { post: BlogPost }) {
  return (
    <li>
      <Link href={`/blog/${post.slug}`} className="lab-desk-row focus-ring">
        <span className="lab-desk-meta">
          {categoryTitle(post.category)} · {formatDate(post.date)}
        </span>
        <span className="lab-desk-title">{post.title}</span>
      </Link>
    </li>
  );
}

function PaperRow({ doc }: { doc: ResearchDoc }) {
  const when = doc.paperYear ? String(doc.paperYear) : formatDate(doc.date);
  return (
    <li>
      <Link href={`/research/${doc.slug}`} className="lab-desk-row focus-ring">
        <span className="lab-desk-meta">
          {researchTypeTitle(doc.type)} · {when}
        </span>
        <span className="lab-desk-title">{doc.title}</span>
      </Link>
    </li>
  );
}
