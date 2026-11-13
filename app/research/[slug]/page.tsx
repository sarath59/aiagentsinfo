import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleTemplate } from "@/components/ArticleTemplate";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CompanyLogo } from "@/components/CompanyLogo";
import { InlineCompanyText, SourceList } from "@/components/CompanyMarks";
import { CopyBibtex } from "@/components/CopyBibtex";
import { DataSourceLine } from "@/components/DataSourceLine";
import { MarkdownBody } from "@/components/MarkdownBody";
import { NextRead, type NextReadItem } from "@/components/NextRead";
import { ToolCtas } from "@/components/ToolCtas";
import { companyForUrl } from "@/lib/companies";
import { withTableDownloads } from "@/lib/html-tables";
import { getResearchDoc, getResearchDocs, relatedResearchDocs, researchTypeTitle } from "@/lib/research";
import { JsonLd, datasetJsonLd, defaultMetadata, faqPageJsonLd, researchArticleJsonLd } from "@/lib/seo";
import { site } from "@/lib/site";

function RichText({ text }: { text: string }) {
  const paragraphs = text
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.replace(/\s+/g, " ").trim())
    .filter(Boolean);
  return (
    <>
      {paragraphs.map((paragraph, index) => (
        <p key={index}>
          <InlineCompanyText text={paragraph} />
        </p>
      ))}
    </>
  );
}

export async function generateStaticParams() {
  const docs = await getResearchDocs();
  return docs.map((doc) => ({ slug: doc.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const doc = await getResearchDoc(slug);
  if (!doc) return {};
  return defaultMetadata(doc.title, doc.description, `/research/${doc.slug}`, {
    openGraphType: "article",
    absoluteTitle: doc.absoluteTitle === true,
  });
}

export default async function ResearchDocPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [doc, all] = await Promise.all([getResearchDoc(slug), getResearchDocs()]);
  if (!doc) notFound();
  const paper = doc.paperUrl ? companyForUrl(doc.paperUrl) : undefined;
  const code = doc.codeUrl ? companyForUrl(doc.codeUrl) : undefined;
  const related = relatedResearchDocs(doc, all);
  const nextRead = nextReadForDoc(doc.slug);
  const hasTable = /<table\b/i.test(doc.html);
  const source = {
    title: doc.title,
    updated: doc.updated ?? doc.date,
    path: `/research/${doc.slug}`,
  };
  const toc = [
    { id: "abstract", text: "Abstract / summary", level: 2 as const },
    ...(doc.whyItMatters ? [{ id: "why-it-matters", text: "Why it matters", level: 2 as const }] : []),
    { id: "methodology", text: "Methodology", level: 2 as const },
    { id: "limitations", text: "Limitations", level: 2 as const },
    ...doc.toc,
    ...(doc.faq?.length ? [{ id: "faq", text: "FAQ", level: 2 as const }] : []),
    { id: "references", text: "References", level: 2 as const },
    { id: "citation", text: "Citation", level: 2 as const },
  ];

  return (
    <>
      <JsonLd
        data={researchArticleJsonLd({
          title: doc.title,
          description: doc.description,
          path: `/research/${doc.slug}`,
          date: doc.date,
          updated: doc.updated,
          paperUrl: doc.paperUrl,
          paperTitle: doc.paperTitle,
          paperAuthors: doc.paperAuthors,
          paperYear: doc.paperYear,
          license: doc.contentLicense === true,
        })}
      />
      {doc.faq?.length ? <JsonLd data={faqPageJsonLd(doc.faq)} /> : null}
      {doc.dataset ? (
        <JsonLd
          data={datasetJsonLd({
            title: doc.dataset.title,
            description: doc.dataset.description,
            path: `/research/${doc.slug}`,
            datePublished: doc.date,
            dateModified: doc.updated ?? doc.date,
            isBasedOn: doc.dataset.isBasedOn,
          })}
        />
      ) : null}
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Research", path: "/research" },
          { name: doc.title, path: `/research/${doc.slug}` },
        ]}
      />
      <ArticleTemplate
        category={researchTypeTitle(doc.type)}
        title={doc.title}
        description={doc.description}
        published={doc.date}
        updated={doc.updated}
        readingMinutes={doc.readingMinutes}
        byline={site.bylines.research}
        companies={doc.companies}
        takeaways={doc.keyFindings}
        toc={toc}
        details={
          <>
            {doc.paperAuthors ? (
              <p>
                {doc.paperTitle} — {doc.paperAuthors}
                {doc.paperYear ? ` (${doc.paperYear})` : ""}
              </p>
            ) : null}
            {doc.venue ? (
              <p>
                <InlineCompanyText text={doc.venue} />
              </p>
            ) : null}
          </>
        }
        actions={
          <>
            {doc.paperUrl ? (
              <a className="btn-primary inline-flex items-center gap-2 px-4 py-2 text-sm" href={doc.paperUrl} rel="noreferrer">
                <CompanyLogo name={paper?.name ?? "Paper"} src={paper?.logo} tile={paper?.tile} size="xs" />
                Read the paper
              </a>
            ) : null}
            {doc.codeUrl ? (
              <a className="btn-ghost inline-flex items-center gap-2 px-4 py-2 text-sm" href={doc.codeUrl} rel="noreferrer">
                <CompanyLogo name={code?.name ?? "Code"} src={code?.logo} tile={code?.tile} size="xs" />
                Source code
              </a>
            ) : null}
            <Link className="btn-ghost px-4 py-2 text-sm" href="/editorial-policy">
              Editorial policy
            </Link>
          </>
        }
        sources={<SourceList sources={doc.references} />}
        sourcesTitle="References"
        sourcesId="references"
        citation={
          <div className="grid gap-4">
            <CopyBibtex value={doc.citation.bibtex} />
            {doc.citation.apa ? (
              <p className="text-sm leading-relaxed text-[var(--muted)]">
                <span className="kicker mb-2 block">APA</span>
                {doc.citation.apa}
              </p>
            ) : null}
          </div>
        }
        related={related.map((item) => ({
          href: `/research/${item.slug}`,
          title: item.title,
          description: item.description,
          kicker: researchTypeTitle(item.type),
          date: item.date,
          readingMinutes: item.readingMinutes,
        }))}
      >
        {nextRead ? <NextRead reads={nextRead.reads} tool={nextRead.tool} /> : null}
        {doc.ledeQuestion && doc.ledeAnswer ? (
          <section id="answer">
            <h2>{doc.ledeQuestion}</h2>
            <p>{doc.ledeAnswer}</p>
          </section>
        ) : null}
        <section id="abstract">
          <h2>Abstract / summary</h2>
          <RichText text={doc.abstract} />
        </section>
        {doc.whyItMatters ? (
          <section id="why-it-matters">
            <h2>Why it matters</h2>
            <RichText text={doc.whyItMatters} />
          </section>
        ) : null}
        <section id="methodology">
          <h2>Methodology</h2>
          <RichText text={doc.methodology} />
        </section>
        <section id="limitations">
          <h2>Limitations</h2>
          <ul>
            {doc.limitations.map((item) => (
              <li key={item}>
                <InlineCompanyText text={item} />
              </li>
            ))}
          </ul>
        </section>
        <MarkdownBody html={withTableDownloads(doc.html, `/research/${doc.slug}/tables`, source)} />
        {hasTable ? null : <DataSourceLine title={source.title} updated={source.updated} path={source.path} />}
        {doc.faq?.length ? (
          <section id="faq">
            <h2>FAQ</h2>
            {doc.faq.map((item) => (
              <div key={item.question}>
                <h3>{item.question}</h3>
                <RichText text={item.answer} />
              </div>
            ))}
          </section>
        ) : null}
        <ToolCtas tools={nextRead ? ["checklist", "picker", "calculator"] : ["picker", "calculator"]} />
      </ArticleTemplate>
    </>
  );
}

function nextReadForDoc(slug: string): { reads: NextReadItem[]; tool: NextReadItem } | null {
  if (slug === "ai-agent-framework-mcp-a2a-support-november-2026") {
    return {
      reads: [
        {
          href: "/reports/ai-agent-framework-github-stats-november-2026",
          title: "AI agent framework GitHub stats, November 2026",
          note: "The November 5 snapshot these names come from. Stars and one tag, not the protocol cells.",
        },
        {
          href: "/best/ai-agent-frameworks",
          title: "Best AI agent frameworks",
          note: "Licence and release tag. This note is MCP, A2A, and AG-UI.",
        },
        {
          href: "/research/ai-agent-framework-release-cadence-october-november-2026",
          title: "3,165 GitHub releases in 30 days, or 407 days of silence",
          note: "How often tags landed. A different count from a documented protocol.",
        },
        {
          href: "/trackers/downloads",
          title: "Framework downloads tracker",
          note: "PyPI and npm file requests. A download is not a user.",
        },
      ],
      tool: {
        href: "/tools/web-search-api-cost-per-agent-task",
        title: "web search API cost calculator",
        note: "the call fee plus the tokens of the results you keep",
      },
    };
  }
  if (slug === "ai-agent-framework-issue-health-november-2026") {
    return {
      reads: [
        {
          href: "/reports/ai-agent-framework-github-stats-november-2026",
          title: "AI agent framework GitHub stats, November 2026",
          note: "The November 5 snapshot these 19 repositories come from. Its open column adds issues and pull requests.",
        },
        {
          href: "/research/ai-agent-framework-release-cadence-october-november-2026",
          title: "3,165 GitHub releases in 30 days, or 407 days of silence",
          note: "Tag frequency the same day, anchored at 03:42 UTC. A different count from issue closes.",
        },
        {
          href: "/blog/ai-agent-framework-release-november-2026",
          title: "AI agent framework release, November 2026",
          note: "What the November 9–11 tags change in a harness.",
        },
        {
          href: "/trackers/stars",
          title: "Framework stars tracker",
          note: "Bookmarks. This page times issue closes.",
        },
      ],
      tool: {
        href: "/agent-cost-calculator",
        title: "agent cost calculator",
        note: "a token bill. Issue age is not a price",
      },
    };
  }
  if (slug === "ai-video-generators-agents-can-call-november-2026") {
    return {
      reads: [
        {
          href: "/directory/freegenvideo",
          title: "FreeGenVideo",
          note: "The browser generator. One free video a day. No API on the homepage fetched November 12, 2026.",
        },
        {
          href: "/directory/category/video",
          title: "Video category",
          note: "Listings. A listing is not a tool call until the vendor publishes an API.",
        },
        {
          href: "/directory/runway",
          title: "Runway",
          note: "The vendor in this set with an official MCP server, on a different credit meter from the Dev API.",
        },
        {
          href: "/glossary/model-context-protocol",
          title: "Model Context Protocol",
          note: "The wire. Runway’s video server is one implementation.",
        },
      ],
      tool: {
        href: "/agent-cost-calculator",
        title: "agent cost calculator",
        note: "a token bill. These per-second video rates are a separate meter",
      },
    };
  }
  if (slug === "agentic-commerce-protocol-adoption-november-2026") {
    return {
      reads: [
        {
          href: "/reports/ai-shopping-agents-next-6-months",
          title: "AI shopping agents in the next 6 months",
          note: "What six companies have dated. This page counts installs, not checkouts.",
        },
        {
          href: "/blog/ucp-vs-acp-spec-versions-november-2026",
          title: "UCP and ACP spec versions",
          note: "Which snapshot to pin. Read November 10, 2026.",
        },
        {
          href: "/blog/can-an-ai-shopping-agent-check-out-for-you",
          title: "Can an AI shopping agent check out for you?",
          note: "The channel still decides who can take payment.",
        },
        {
          href: "/trackers/downloads",
          title: "Framework downloads tracker",
          note: "A different package set, refreshed from the registries.",
        },
      ],
      tool: {
        href: "/agent-cost-calculator",
        title: "agent cost calculator",
        note: "a token bill. These download counts are not a price",
      },
    };
  }
  if (slug === "ai-agents-next-12-months-scorecard-november-2026") {
    return {
      reads: [
        {
          href: "/reports/ai-agents-next-12-months",
          title: "AI agents in the next 12 months",
          note: "The November 7 calendar this note scores. Its sentences are unchanged.",
        },
        {
          href: "/reports/ai-shopping-agents-next-6-months",
          title: "AI shopping agents in the next 6 months",
          note: "Checkout stays there. This scorecard does not move it.",
        },
        {
          href: "/trackers/downloads",
          title: "Framework downloads tracker",
          note: "What registries fetched, which a prospectus commitment is not.",
        },
        {
          href: "/trackers/stars",
          title: "Framework stars tracker",
          note: "Bookmarks. A different count from a filing.",
        },
      ],
      tool: {
        href: "/agent-cost-calculator",
        title: "agent cost calculator",
        note: "a 30-day token bill from published prices, with no seat fee",
      },
    };
  }
  if (slug === "claude-code-vs-codex-downloads-november-2026") {
    return {
      reads: [
        {
          href: "/blog/claude-code-vs-codex-pricing",
          title: "Claude Code vs Codex pricing",
          note: "Seat prices. The download counters on this page are not a bill.",
        },
        {
          href: "/reports/ai-coding-agents-next-30-days",
          title: "AI coding agents in the next 30 days",
          note: "The dated product calendar. It does not count npm files.",
        },
        {
          href: "/trackers/downloads",
          title: "Framework downloads tracker",
          note: "LangChain and the other SDKs, refreshed daily. CLIs are not in that table.",
        },
        {
          href: "/trackers/stars",
          title: "Framework stars tracker",
          note: "Bookmarks, not file requests. Gemini CLI is the case where those diverge.",
        },
      ],
      tool: {
        href: "/agent-cost-calculator",
        title: "agent cost calculator",
        note: "a 30-day token bill from published prices, with no seat fee",
      },
    };
  }
  if (
    slug !== "evolver-agent-exploration-evolving-capabilities" &&
    slug !== "harnessflow-mcts-harness-optimization"
  ) {
    return null;
  }
  const other =
    slug === "harnessflow-mcts-harness-optimization"
      ? {
          href: "/research/evolver-agent-exploration-evolving-capabilities",
          title: "Evolver",
          note: "Reuses experience inside Claude Code and Codex. A different question from rewriting the harness.",
        }
      : {
          href: "/research/harnessflow-mcts-harness-optimization",
          title: "HarnessFlow",
          note: "Searches for a better harness program. A different question from reusing a trace.",
        };
  return {
    reads: [
      other,
      {
        href: "/blog/how-do-you-evaluate-an-ai-agent-harness",
        title: "How to evaluate an AI agent harness",
        note: "One observable action, then whether the job still finishes.",
      },
      {
        href: "/reports/agent-harness-benchmark-november-2026",
        title: "November 2026 harness benchmark",
        note: "Official board rows. These papers are not a row on that board.",
      },
      {
        href: "/papers",
        title: "AI agent papers",
        note: "The shelf of citable breakdowns.",
      },
    ],
    tool: {
      href: "/tools/ai-agent-harness-evaluation-checklist",
      title: "harness evaluation checklist",
      note: "twelve sourced checks, counted in the browser",
    },
  };
}
