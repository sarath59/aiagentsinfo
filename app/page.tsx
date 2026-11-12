import Link from "next/link";
import { ArrowIcon } from "@/components/Icons";
import { CompanyLogo } from "@/components/CompanyLogo";
import { EmptyState } from "@/components/EmptyState";
import { HomeReveal } from "@/components/home/HomeReveal";
import { SectionSignal } from "@/components/home/SectionSignal";
import { categoryTitle, getBlogPosts, type BlogPost } from "@/lib/blog";
import { companyForName } from "@/lib/companies";
import { categoryTitle as directoryCategoryTitle, getDirectoryListings, type DirectoryListing } from "@/lib/directory";
import { getGlossaryTerms } from "@/lib/glossary";
import { getResearchDocs, researchTypeTitle, type ResearchDoc } from "@/lib/research";
import { indexRobots } from "@/lib/seo";
import { liveTrackers } from "@/lib/trackers";
import { absoluteUrl, comparisons, dataAssets, site } from "@/lib/site";
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

const spotlightSlugs = ["cursor", "devin", "crewai"] as const;
const freeToolHrefs = [
  "/tools/ai-crawler-robots-txt-checker",
  "/tools/agents-md-generator",
  "/agent-cost-calculator",
  "/tools/ai-agent-roi-calculator",
  "/agent-prompt-checker",
  "/verified-revenue",
  "/directory/stats",
] as const;

function previewTools(listings: DirectoryListing[]) {
  const picked: DirectoryListing[] = [];
  for (const slug of spotlightSlugs) {
    const listing = listings.find((item) => item.slug === slug);
    if (listing) picked.push(listing);
  }
  if (picked.length >= 3) return picked.slice(0, 3);
  for (const listing of listings) {
    if (picked.length >= 3) break;
    if (!picked.some((item) => item.slug === listing.slug)) picked.push(listing);
  }
  return picked;
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
  const news = posts.filter((post) => post.category === "news").slice(0, 3);
  const guides = posts.filter((post) => post.category === "guide").slice(0, 3);
  const papers = research.slice(0, 3);
  const tools = previewTools(listings);
  const reports = dataAssets.filter((asset) => asset.href.startsWith("/reports/"));
  const [featured, ...moreReports] = reports;
  const freeTools = freeToolHrefs.flatMap((href) => {
    const asset = dataAssets.find((item) => item.href === href);
    return asset ? [asset] : [];
  });
  const stats = [
    { href: "/directory", value: listings.length, label: plural(listings.length, "tool") },
    { href: "/blog?category=news", value: news.length, label: plural(news.length, "news note") },
    { href: "/research", value: research.length, label: plural(research.length, "paper") },
    { href: "/blog?category=guide", value: guides.length, label: plural(guides.length, "guide") },
    { href: "/reports", value: reports.length, label: plural(reports.length, "report") },
  ].filter((item) => item.value > 0);

  return (
    <div>
      <section className={"home-hero"} aria-labelledby="home-heading">
        <div className={"home-fx"} aria-hidden="true">
          <div className={"home-mesh"} />
          <div className={"home-dots"} />
          <div className={"home-glow"} />
        </div>
        <div className={`${"home-copy"} mx-auto max-w-6xl px-4`}>
          <p className="kicker kicker-lead">News · Directory · Research</p>
          <h1 id="home-heading" className={"home-headline"}>
            The latest news, research, tools, and guides on <span className="text-gradient">AI agents</span>.
          </h1>
          <p className={"home-sub"}>Sourced reporting, a directory of working tools, and notes on the papers.</p>
          <div className={"home-actions"}>
            <Link href="/blog" className="btn-primary focus-ring min-h-12 px-7 text-[15px]">
              Read the latest
            </Link>
            <Link href="/directory" className={`btn-ghost focus-ring min-h-12 px-7 text-[15px] ${"home-secondary"}`}>
              Browse the directory
            </Link>
          </div>
          {stats.length ? (
            <div className={"home-stats"}>
              {stats.map((item) => (
                <Link key={item.href} href={item.href} className={`focus-ring ${"home-stat"}`}>
                  <strong>{item.value.toLocaleString("en-US")}</strong>
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>
          ) : null}
        </div>
      </section>

      <SectionSignal label="01 / plan" />

      <HomeReveal>
        <section className="mx-auto max-w-6xl px-4" aria-labelledby="home-directory">
          <SectionHead
            id="home-directory"
            eyebrow="Directory"
            title="Tools with an official home"
            lede={`${listings.length.toLocaleString("en-US")} ${plural(listings.length, "tool")}, each checked against a working site.`}
            href="/directory"
            seeAllLabel="See all tools"
          />
          {tools.length ? (
            <div className={"home-trio"}>
              {tools.map((listing) => (
                <ToolCard key={listing.slug} listing={listing} />
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
        </section>
      </HomeReveal>

      <SectionSignal label="02 / search" delay="-0.7s" />

      <HomeReveal>
        <section className="mx-auto max-w-6xl px-4" aria-labelledby="home-reports">
          <SectionHead
            id="home-reports"
            eyebrow="Reports"
            title="Benchmarks and dated figures"
            lede="Sourced reports, and tools you can open in the browser."
            href="/reports"
            seeAllLabel="See all reports"
          />
          <div className={"home-reports"}>
            <div className={"home-feature-col"}>
              {featured ? (
                <Link href={featured.href} className={`focus-ring ${"home-card"} ${"home-feature"}`}>
                  <p className="kicker">{featured.href === "/reports/ai-agents-next-12-months" ? "Flagship" : "Report"}</p>
                  <h3 className={"home-feature-title"}>{featured.title}</h3>
                  <p className={"home-summary"}>{featured.summary}</p>
                  <span className={"home-more"}>
                    Read the report
                    <ArrowIcon className="h-3.5 w-3.5" />
                  </span>
                </Link>
              ) : null}
              {moreReports.slice(0, 2).map((report) => (
                <Link key={report.href} href={report.href} className={`focus-ring ${"home-card"} ${"home-also"}`}>
                  <span>
                    <span className="kicker">Report</span>
                    <span className={"home-also-title"}>{report.title}</span>
                  </span>
                  <ArrowIcon className="h-3.5 w-3.5 shrink-0 text-[var(--color-electric)]" />
                </Link>
              ))}
            </div>
            <div className={"home-stack"}>
              {freeTools.map((tool, index) => (
                <Link key={tool.href} href={tool.href} className={`focus-ring ${"home-card"} ${"home-mini"}`}>
                  <span className={"home-index"} aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className={"home-mini-copy"}>
                    <h3 className={"home-card-title"}>{tool.title}</h3>
                    <p className={"home-card-body"}>{tool.summary}</p>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </HomeReveal>

      <SectionSignal label="03 / track" delay="-1.0s" />

      <HomeReveal>
        <section className="mx-auto max-w-6xl px-4" aria-labelledby="home-trackers">
          <SectionHead
            id="home-trackers"
            eyebrow="Live data"
            title="Trackers that refresh daily"
            lede="Public download, AGENTS.md, and GitHub star counts. Each page names the source and how to cite it."
            href="/trackers"
            seeAllLabel="See all trackers"
          />
          <div className="home-trio">
            {liveTrackers.map((item) => (
              <Link key={item.href} href={item.href} className={`focus-ring ${"home-card"} ${"home-guide"}`}>
                <p className="kicker">{item.kicker}</p>
                <h3 className={"home-card-title"}>{item.title}</h3>
                <p className={"home-card-body"}>{item.summary}</p>
                <span className={"home-more"}>
                  Open the tracker
                  <ArrowIcon className="h-3.5 w-3.5" />
                </span>
              </Link>
            ))}
          </div>
        </section>
      </HomeReveal>

      <SectionSignal label="04 / act" delay="-1.4s" />

      <HomeReveal>
        <section className="mx-auto max-w-6xl px-4" aria-labelledby="home-news">
          <SectionHead
            id="home-news"
            eyebrow="News"
            title="Latest from the desk"
            lede="Short notes on what changed, each with a date."
            href="/blog?category=news"
            seeAllLabel="See all news"
          />
          {news.length ? (
            <div className={"home-lead"}>
              {news.map((post, index) => (
                <StoryCard key={post.slug} post={post} lead={index === 0} />
              ))}
            </div>
          ) : (
            <EmptyState title="First articles publishing soon" body="News notes will land here once they are written and sourced." href="/blog" cta="Visit the blog" />
          )}
        </section>
      </HomeReveal>

      <SectionSignal label="05 / review" delay="-0.4s" />

      <HomeReveal>
        <section className="mx-auto max-w-6xl px-4" aria-labelledby="home-research">
          <SectionHead
            id="home-research"
            eyebrow="Research"
            title="Papers with their own pages"
            lede="Notes with the authors, the link, and what the paper covers."
            href="/research"
            seeAllLabel="See all papers"
          />
          {papers.length ? (
            <div className={"home-trio"}>
              {papers.map((doc) => (
                <PaperCard key={doc.slug} doc={doc} />
              ))}
            </div>
          ) : (
            <EmptyState title="Research notes publishing soon" body="Paper pages appear when the source and the authors check out." href="/research" cta="Research desk" />
          )}
        </section>
      </HomeReveal>

      <SectionSignal label="06 / compare" delay="-0.8s" />

      <HomeReveal>
        <section className="mx-auto max-w-6xl px-4" aria-labelledby="home-compare">
          <SectionHead
            id="home-compare"
            eyebrow="Best AI agents"
            title="Best AI agents"
            lede="Licence, list price, and platform from official pages. Last verified November 2026. No invented scores."
            href="/best"
            seeAllLabel="Best AI agents"
          />
          <div className="home-trio">
            {comparisons.map((page) => (
              <Link key={page.href} href={page.href} className={`focus-ring ${"home-card"} ${"home-guide"}`}>
                <p className="kicker">Comparison</p>
                <h3 className={"home-card-title"}>{page.title}</h3>
                <p className={"home-card-body"}>{page.summary}</p>
                <span className={"home-more"}>
                  Open the table
                  <ArrowIcon className="h-3.5 w-3.5" />
                </span>
              </Link>
            ))}
          </div>
        </section>
      </HomeReveal>

      <SectionSignal label="07 / learn" delay="-1.1s" />

      <HomeReveal>
        <section className="mx-auto max-w-6xl px-4" aria-labelledby="home-guides">
          <SectionHead
            id="home-guides"
            eyebrow="Guides"
            title="Plain-English guides"
            lede={
              glossary.length
                ? "Short guides, plus a glossary of the terms these pages use."
                : "Short guides on how these systems fit together."
            }
            href={guides.length ? "/blog?category=guide" : "/glossary"}
            seeAllLabel={guides.length ? "See all guides" : "See the glossary"}
          />
          {guides.length || glossary.length ? (
            <div className={guides.length + (glossary.length ? 1 : 0) > 2 ? "home-lead" : "home-trio"}>
              {guides.map((post, index) => (
                <StoryCard key={post.slug} post={post} lead={index === 0 && guides.length + (glossary.length ? 1 : 0) > 2} />
              ))}
              {glossary.length ? (
                <Link href="/glossary" className={`focus-ring ${"home-card"} ${"home-guide"}`}>
                  <p className="kicker">Glossary</p>
                  <h3 className={"home-card-title"}>
                    {glossary.length.toLocaleString("en-US")} {plural(glossary.length, "term")}
                  </h3>
                  <p className={"home-card-body"}>Short definitions of words these pages use.</p>
                  <span className={"home-more"}>
                    Open the glossary
                    <ArrowIcon className="h-3.5 w-3.5" />
                  </span>
                </Link>
              ) : null}
            </div>
          ) : (
            <EmptyState title="Guides publishing soon" body="Explainers will appear here as they are written." href="/blog" cta="Visit the blog" />
          )}
        </section>
      </HomeReveal>
    </div>
  );
}

function SectionHead({
  id,
  eyebrow,
  title,
  lede,
  href,
  seeAllLabel,
}: {
  id: string;
  eyebrow: string;
  title: string;
  lede: string;
  href: string;
  seeAllLabel: string;
}) {
  return (
    <div className={"home-head"}>
      <div>
        <p className="kicker kicker-lead">{eyebrow}</p>
        <h2 id={id} className={"home-h2"}>
          {title}
        </h2>
        <p className={"home-lede"}>{lede}</p>
      </div>
      <Link href={href} className={`focus-ring ${"home-see"}`}>
        {seeAllLabel}
        <ArrowIcon className="h-3.5 w-3.5" />
      </Link>
    </div>
  );
}

function ToolCard({ listing }: { listing: DirectoryListing }) {
  const brand = companyForName(listing.name);
  const category = directoryCategoryTitle(listing.category);
  const meta = listing.vendor && listing.vendor !== listing.name ? `${category} · ${listing.vendor}` : category;

  return (
    <Link href={`/directory/${listing.slug}`} className={`focus-ring ${"home-card"} ${"home-tool"}`}>
      <CompanyLogo name={listing.name} src={listing.logo || undefined} tile={brand?.tile} size="md" />
      <p className="kicker mt-5">{meta}</p>
      <h3 className={"home-card-title"}>{listing.name}</h3>
      <p className={"home-card-body"}>{listing.summary}</p>
    </Link>
  );
}

function StoryCard({ post, lead = false }: { post: BlogPost; lead?: boolean }) {
  return (
    <Link href={`/blog/${post.slug}`} className={`focus-ring ${"home-card"} ${"home-story"} ${lead ? "home-lead-card" : ""}`}>
      <p className="kicker">
        {categoryTitle(post.category)} · {formatDate(post.date)}
      </p>
      <h3 className={"home-card-title"}>{post.title}</h3>
      <p className={"home-card-body"}>{post.description}</p>
    </Link>
  );
}

function PaperCard({ doc }: { doc: ResearchDoc }) {
  const when = doc.paperYear ? String(doc.paperYear) : formatDate(doc.date);
  return (
    <Link href={`/research/${doc.slug}`} className={`focus-ring ${"home-card"} ${"home-paper"}`}>
      <p className="kicker">
        {researchTypeTitle(doc.type)} · {when}
      </p>
      <h3 className={"home-card-title"}>{doc.title}</h3>
      <p className={"home-card-body"}>{doc.description}</p>
    </Link>
  );
}
