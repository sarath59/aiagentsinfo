import Link from "next/link";
import { ReportLayout } from "@/components/ReportLayout";
import { DataSourceLine } from "@/components/DataSourceLine";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SourceList } from "@/components/CompanyMarks";
import { CiteOrEmbed } from "@/components/CiteOrEmbed";
import { NewsletterSignup } from "@/components/newsletter/NewsletterSignup";
import { FaqList } from "@/components/FaqList";
import { categoryTitle, getBlogPost } from "@/lib/blog";
import { description, months, path, readOn, readingMinutes, sources, title } from "@/lib/agents-12-month-outlook";
import { categorySummaries } from "@/lib/directory-meta";
import { getGlossaryTerm } from "@/lib/glossary";
import { JsonLd, datasetJsonLd, defaultMetadata, webPageJsonLd } from "@/lib/seo";
import { absoluteUrl, site, topics } from "@/lib/site";
import { formatDate } from "@/lib/utils";

export const metadata = defaultMetadata(title, description, path);

const laterDates = [
  ["July 28, 2027", "Inside this window", "MCP Roots, Sampling, Logging, and Dynamic Client Registration become eligible for removal in the first revision released on or after this day. The registry does not remove them on the day."],
  ["August 2, 2027", "Inside this window", "EU member states should have at least one national AI regulatory sandbox operational. Service Desk timeline, including the Digital Omnibus."],
  ["September 30, 2027", "Inside this window", "Last day of the span in which Anthropic’s November 2 filing says about $69.8 billion of commitments are due. Not a single payment date."],
  ["December 2, 2027", "After this window", "Rules for high-risk AI systems in Annex III. Do not date them earlier."],
  ["August 2, 2028", "After this window", "Rules for high-risk AI embedded in regulated products covered by Annex I."],
];

export default async function AgentsTwelveMonthOutlookPage() {
  const [harness, hy4, agent, harnessTerm, autonomy] = await Promise.all([
    getBlogPost("what-is-an-ai-agent-harness"),
    getBlogPost("tencent-releases-hy4-with-computer-use"),
    getGlossaryTerm("agent"),
    getGlossaryTerm("harness"),
    getGlossaryTerm("autonomy"),
  ]);
  const related = [
    {
      href: "/reports/ai-agents-in-production-2026",
      title: "AI agents in production, 2026",
      description: "Where agents are actually running: graded coding work, survey 'scaling,' and the computer-use gap.",
      kicker: "Report",
      date: "2026-11-10",
    },
    {
      href: "/reports/ai-agents-in-2027",
      title: "AI agents in 2027",
      description: "A labeled forecast. This calendar does not make those calls, and that forecast does not refill this grid.",
      kicker: "Report",
      date: "2026-11-10",
    },
    {
      href: "/reports/ai-agents-next-6-months",
      title: "AI agents, Nov 2026 to May 2027",
      description:
        "The shorter outlook. It stops at May 2027 and does not carry the August sandbox date or the July 2027 MCP eligibility date.",
      kicker: "Report",
      date: "2026-11-05",
    },
    {
      href: "/reports/browser-and-computer-use-agents-next-6-months",
      title: "Browser and computer-use agents, Nov 2026 to May 2027",
      description:
        "Ten live browser and computer-use agents, and the one day a vendor has named through May 9, 2027.",
      kicker: "Report",
      date: "2026-11-09",
    },
    {
      href: "/reports/ai-shopping-agents-next-6-months",
      title: "AI shopping agents, Nov 2026 to May 2027",
      description:
        "What Google, OpenAI, Amazon, Microsoft, Shopify, and Adobe have dated for shopping agents from November 2026 through May 2027.",
      kicker: "Report",
      date: "2026-11-05",
    },
    {
      href: "/reports/agent-harness-benchmark-november-2026",
      title: "Harness benchmark, November 2026",
      description:
        "Public SWE-bench and Terminal-Bench scores for agent harnesses and coding agents, each with the date on the official source.",
      kicker: "Report",
      date: "2026-11-05",
    },
    harness
      ? {
          href: `/blog/${harness.slug}`,
          title: harness.title,
          description: harness.description,
          kicker: categoryTitle(harness.category),
          date: harness.date,
          readingMinutes: harness.readingMinutes,
        }
      : undefined,
    hy4
      ? {
          href: `/blog/${hy4.slug}`,
          title: hy4.title,
          description: hy4.description,
          kicker: categoryTitle(hy4.category),
          date: hy4.date,
          readingMinutes: hy4.readingMinutes,
        }
      : undefined,
    agent
      ? {
          href: "/glossary/agent",
          title: agent.term,
          description: agent.shortDefinition,
          kicker: "Glossary",
        }
      : undefined,
    harnessTerm
      ? {
          href: "/glossary/harness",
          title: harnessTerm.term,
          description: harnessTerm.shortDefinition,
          kicker: "Glossary",
        }
      : undefined,
    autonomy
      ? {
          href: "/glossary/autonomy",
          title: autonomy.term,
          description: autonomy.shortDefinition,
          kicker: "Glossary",
        }
      : undefined,
    {
      href: "/directory/category/coding-agents",
      title: "Coding agents in the directory",
      description: categorySummaries["coding-agents"],
      kicker: "Directory",
    },
    {
      href: "/topics/task-performance",
      title: "Agents in task performance",
      description: topics.find((topic) => topic.slug === "task-performance")?.summary ?? "",
      kicker: "Topic",
    },
  ].filter((item) => item !== undefined);
  const updatedLabel = formatDate(readOn);
  const pageUrl = absoluteUrl(path);
  const citation = `AI Agents Info. "${title}." Last updated ${updatedLabel}. ${pageUrl}.`;
  const embed = `<blockquote cite="${pageUrl}">
<p>${description}</p>
<footer><a href="${pageUrl}">${title}</a>, AI Agents Info, last updated ${updatedLabel}.</footer>
</blockquote>`;

  return (
    <>
      <JsonLd data={webPageJsonLd({ title, description, path, datePublished: readOn, dateModified: readOn })} />
      <JsonLd data={datasetJsonLd({ title, description, path, datePublished: readOn, dateModified: readOn })} />
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Reports", path: "/reports" },
          { name: title, path },
        ]}
      />
      <ReportLayout
        category="Report"
        title={title}
        thesis="From November 2026 through November 2027, the public record is a short list of dated filings, not a launch calendar."
        description={description}
        published={readOn}
        readingMinutes={readingMinutes}
        byline={site.bylines.research}
        wide
        takeaways={[
          "From November 2026 through November 2027, the new dated marks past May 2027 are July 28, 2027 (MCP features become eligible for removal, and are not removed that day), August 2, 2027 (EU national AI sandboxes), and September 30, 2027 (the last day of Anthropic’s $69.8 billion commitment span). Annex III high-risk rules are December 2, 2027, after this window.",
          "Anthropic’s November 2 prospectus describes Claude Code and Claude Cowork as products already in market, expects short-term compute to rise in the near term, and says about $69.8 billion of commitments are due in the 12 months after September 30, 2026. Aggregate commitments in that filing are about $895.4 billion.",
          "OpenAI’s computer-use page, read November 7, covers macOS and Windows. It does not mention Linux.",
          "A November 5 Singapore speech says GovTech is developing GovHarness. It does not name a ship date. The UK bill’s April 29, 2027 date is a procedural expiry, not the day agent rules start.",
          "Shopping checkout stays in the shopping-agent report. Official harness scores stay in the November benchmark. A month with no dated source stays empty.",
        ]}
        toc={[
          { id: "second-half", text: "What falls after May 2027", level: 2 },
          { id: "how-a-claim-is-sorted", text: "How a claim is sorted", level: 2 },
          { id: "announced", text: "Announced", level: 2 },
          { id: "likely", text: "Likely", level: 2 },
          { id: "watch-for", text: "Watch for", level: 2 },
          { id: "month-by-month", text: "Month by month", level: 2 },
          { id: "what-are-ai-agents", text: "What are AI agents and how do they work", level: 2 },
          { id: "types-of-ai-agents", text: "Types of AI agents in this window", level: 2 },
          { id: "how-to-use-ai-agents", text: "How to use an AI agent", level: 2 },
          { id: "left-out", text: "Left out", level: 2 },
          { id: "faq", text: "FAQ", level: 2 },
          { id: "sources", text: "Sources", level: 2 },
          { id: "citation", text: "Cite or embed", level: 2 },
        ]}
        actions={
          <>
            <a className="btn-primary px-4 py-2 text-sm" href={`${path}/pdf`}>
              Download PDF
            </a>
            <a className="btn-ghost px-4 py-2 text-sm" href={`${path}/csv`}>
              Download CSV
            </a>
          </>
        }
        sources={<SourceList sources={sources} />}
        citation={<CiteOrEmbed citation={citation} embed={embed} />}
        related={related}
      >
        <div className="article-prose">
          <p>
            From November 2026 through November 2027, the public record is a short list of things a company, a
            standards body, or a government has already dated, plus a handful of phrases with no day attached.
            Anthropic filed an amended prospectus on November 2. Apple’s auditors signed the Form 10-K on November 3.
            AWS, Sysdig, DeepSeek, Tencent, and Citrix posted on November 3 and 4. Singapore’s Ministry of Digital
            Development and Information published a speech on November 5. The European Commission’s AI Act timeline
            names December 2, 2026, and then August 2, 2027. It does not name a product launch in between.
          </p>
          <p>
            The{" "}
            <Link href="/reports/ai-agents-next-6-months">six-month agents outlook</Link> stops at May 2027. This page
            is the flagship for the full year. It keeps the claims that were re-read on November 7, 2026, and it adds
            the second half. Shopping and payments are in{" "}
            <Link href="/reports/ai-shopping-agents-next-6-months">AI shopping agents in the next 6 months</Link>.
            Browser agents and desktop computer use through May 9, 2027 are in{" "}
            <Link href="/reports/browser-and-computer-use-agents-next-6-months">
              Browser and computer-use agents next 6 months
            </Link>
            . This page does not repeat that checkout record or that product table. Scores on the official SWE-bench and Terminal-Bench
            boards are in the{" "}
            <Link href="/reports/agent-harness-benchmark-november-2026">November harness benchmark</Link>. A month
            with no dated launch is left empty on purpose.
          </p>
        </div>

        <section className="mt-12">
          <h2 id="second-half" className="text-2xl font-semibold tracking-tight">
            What falls after May 2027
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[var(--muted)]">
            These are the dates a primary page names that the six-month report could not carry because they fall
            after May 2027, or that it correctly left out because they fall after November 2027. An empty cell is
            not hiding a launch. June, October, and November 2027 have no dated launch in this source set.
          </p>
          <div className="mt-5 overflow-x-auto">
            <table className="w-full min-w-[40rem] border-collapse text-sm">
              <caption className="sr-only">Dates after May 2027 named by a primary source</caption>
              <thead>
                <tr className="border-b border-[var(--stroke)] text-left">
                  <th className="py-2 pr-4 font-semibold">Date</th>
                  <th className="py-2 pr-4 font-semibold">Where it sits</th>
                  <th className="py-2 font-semibold">What the source says</th>
                </tr>
              </thead>
              <tbody>
                {laterDates.map((row) => (
                  <tr key={row[0]} className="border-b border-[var(--stroke)] align-top">
                    <td className="py-3 pr-4 font-medium text-[var(--fg)]">{row[0]}</td>
                    <td className="py-3 pr-4 text-[var(--muted)]">{row[1]}</td>
                    <td className="py-3 text-[var(--muted)]">{row[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <DataSourceLine title={title} updated={readOn} path={path} />
          </div>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-[var(--muted)]">
            One earlier date belongs in the same record and was not on the six-month page. On November 4, 2026 the
            House of Commons passed a carry-over motion so proceedings on the Cyber Security and Resilience Bill
            lapse at the end of April 29, 2027, rather than at the end of November 11, 2026. That is a deadline for
            the bill’s parliamentary proceedings. It is not the day the government’s agentic-AI measures take effect.
          </p>
        </section>

        <section className="glass article-callout mt-10 rounded-3xl p-6 sm:p-8">
          <h2 id="how-a-claim-is-sorted" className="text-2xl font-semibold tracking-tight">
            How a claim is sorted
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
            <strong className="font-semibold text-[var(--fg)]">Announced</strong> means a linked filing, company page,
            protocol changelog, official timeline, or parliamentary page says it.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
            <strong className="font-semibold text-[var(--fg)]">Likely</strong> means that page aims the work at this
            twelve-month stretch and does not name a day. The word means “their phrase covers these months.” It is
            not a new odds estimate from this desk.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
            <strong className="font-semibold text-[var(--fg)]">Watch for</strong> means a later check should confirm
            the item or drop it: the page withholds a date, the tense is future, or a follow-up named earlier was not
            confirmed on November 7, 2026.
          </p>
        </section>

        <section className="mt-12">
          <h2 id="announced" className="text-2xl font-semibold tracking-tight">
            Announced
          </h2>
          <div className="mt-4 grid gap-4 text-sm leading-relaxed text-[var(--muted)]">
            <h3 className="text-lg font-semibold text-[var(--fg)]">Coding agents</h3>
            <p>
              <a className="text-[var(--link)] underline" href="https://www.sec.gov/Archives/edgar/data/2130357/000162828026068676/anthropicpbc-sx1ax1.htm">
                Anthropic’s amended S-1
              </a>
              , filed with the SEC on November 2, 2026, describes Claude Code as the coding agent already in market:
              it plans, writes, tests, and debugs, with a harness that turns intent into actions and an execution
              environment on a developer’s machine or in a sandboxed cloud. The same filing says Claude Cowork, made
              available as a research preview in January 2026, had by September 30, 2026 outpaced the adoption Claude
              Code had at the equivalent point after its February 2025 research preview. In September 2026 Anthropic
              began merging Claude Cowork and Claude.ai. Those dates sit before this window. They describe products
              already in market, not launches scheduled for 2027.
            </p>
            <p>
              The quarterly table shows revenue of $16,956 million for the three months ended September 30, 2026, and
              an operating loss of $567 million. The narrative rounds the same quarter’s revenue to $17.0 billion.
              For the nine months ended September 30, revenue is $33,242 million and the operating loss is $1,260
              million. The same nine months show a net loss of $104.0 billion, of which $94.3 billion is the change
              in fair value of convertible notes, derivative liabilities, and SAFEs. Net revenue retention is
              approximately 900 percent as of September 30. The filing says Opus 5.5 reduced customer cost per task
              by approximately 40 percent compared with Opus 5. It does not split revenue between Claude Code and
              the rest of the business. None of those figures is a forecast for a named day in 2027.
            </p>
            <p>
              As of and subsequent to September 30, 2026, the filing reports purchase commitments and leases,
              including short-term commitments and leases not yet commenced, with an aggregate committed spend of
              approximately $895.4 billion, substantially all of it related to compute and infrastructure. About
              $447.5 billion is expected to be incurred before December 31, 2030, and substantially all of the
              remainder between 2031 and 2045. About $69.8 billion is due in the 12 months following September 30,
              2026. That span runs through September 30, 2027. It covers this window through September and does not
              cover October or November 2027. It is a committed-spend figure, not a product date.
            </p>
            <h3 className="text-lg font-semibold text-[var(--fg)]">Browser and computer-use agents</h3>
            <p>
              <a className="text-[var(--link)] underline" href="https://developers.openai.com/codex/computer-use">
                OpenAI’s computer-use guide
              </a>
              , read November 7, 2026, says Computer Use in the ChatGPT desktop app is available on macOS and Windows
              with ChatGPT Work and Codex. On macOS it can run a scoped task in the background. On Windows it runs
              on the active desktop and takes the foreground. The page says the feature cannot automate terminal apps
              or ChatGPT itself. For difficult tasks that depend on screenshots, it says to choose GPT-6 Astra when
              that model is in the selector. It does not mention Linux.
            </p>
            <p>
              <a
                className="text-[var(--link)] underline"
                href="https://platform.claude.com/docs/en/agents-and-tools/tool-use/computer-use-tool"
              >
                Anthropic’s computer-use tool page
              </a>
              , read the same day, says one <code>computer_toolset_20260801</code> entry gives Claude 17 member
              tools, including screenshot, left click, type, and zoom. The caller runs every call in an environment
              it controls. The toolset page lists it as available on the Claude API and on Google Cloud for a set of
              current models, and as available on Claude Platform on AWS, Amazon Bedrock, and Microsoft Foundry for
              a similar set. Older models are marked beta on those clouds. Claude Managed Agents lists the toolset
              as not available. A separate browser tool reads and acts on a page without a full desktop. The S-1
              defines computer use as a model observing and operating a graphical interface, and it says Claude
              Cowork has that capability for knowledge work.
            </p>
            <p>
              <a
                className="text-[var(--link)] underline"
                href="https://www.tencent.com/tencent-launches-hy4-joining-the-ranks-of-the-worlds-leading-open-source-ai-models/"
              >
                Tencent’s November 4 post
              </a>{" "}
              says Hy4 is the first Hy model with computer use, on both a command line and a graphical interface, and
              that the API is already on TokenHub and in products including WorkBuddy and CodeBuddy. WorkBuddy and
              CodeBuddy are free from November 4 through November 15. Hy4 on TokenHub is billed at 50 percent of the
              catalog price through December 31, 2026. The post prints the catalog price as approximately US$0.90 per
              million input tokens, US$2.70 per million output tokens, and US$0.045 per million cached input tokens.
              The longer note is{" "}
              <Link className="text-[var(--link)] underline" href="/blog/tencent-releases-hy4-with-computer-use">
                Tencent releases Hy4 with image understanding and computer use
              </Link>
              .
            </p>
            <h3 className="text-lg font-semibold text-[var(--fg)]">Enterprise agents</h3>
            <p>
              <a
                className="text-[var(--link)] underline"
                href="https://aws.amazon.com/about-aws/whats-new/2026/11/workspaces-ai-agents-linux-windows-11/"
              >
                AWS
              </a>{" "}
              posted on November 3, 2026 that WorkSpaces for AI agents now supports Linux and Windows 11 cloud
              desktops, in addition to Windows Server. Linux desktops give agents root access for builds, tests, and
              scripts. Windows 11 desktops are for the enterprise applications teams already use. AWS says both have
              the same network isolation, IAM access, and compliance boundaries as the Windows Server desktops.
            </p>
            <p>
              <a
                className="text-[var(--link)] underline"
                href="https://www.sysdig.com/press-releases/sysdig-launches-sysdig-ai-defense-bringing-runtime-security-to-every-action-ai-agents-take"
              >
                Sysdig
              </a>{" "}
              announced general availability of Sysdig AI Defense on November 4, 2026, for macOS and Windows. The
              release says it judges each agent action against an organization’s policy and can allow it, ask a
              person to confirm it, or block it. It names Claude Code, Codex, GitHub Copilot, and Cursor as platforms
              whose agents can be traced to a person. It also says it instruments the harness to see which tools, MCP
              servers, skills, and plugins an agent calls. Policies can start in alert mode and move to blocking when
              a team is ready.
            </p>
            <p>
              <a
                className="text-[var(--link)] underline"
                href="https://www.citrix.com/news/announcements/nov-2026/citrix-advances-secure-ai-adoption.html"
              >
                Citrix’s November 4 announcement
              </a>{" "}
              says SecurSpaces updates are generally available now. The availability line says the SecurAccess
              updates will be available by the end of this month, which, on a November 4 post, is the end of
              November 2026. It does not name a day inside November. Citrix also says it plans to release a Knowledge
              Worker Agent for SecurSpaces as open source under the Apache 2.0 license, and it does not name a day
              for that release.
            </p>
            <h3 id="deepseek-harness" className="text-lg font-semibold text-[var(--fg)]">
              Harnesses and protocols
            </h3>
            <p>
              <a className="text-[var(--link)] underline" href="https://github.com/deepseek-ai/DeepSeek-Harness">
                DeepSeek Harness
              </a>{" "}
              is an open-source agent harness. The README, read November 7, says it is in developer preview and that
              there will be compatibility-breaking changes.{" "}
              <a className="text-[var(--link)] underline" href="https://github.com/deepseek-ai/DeepSeek-Harness/releases/tag/dsh-v0.2.2-rc.1">
                Release v0.2.2-rc.1
              </a>{" "}
              was published on November 4, 2026, and it was still the newest release when this page was
              checked on November 7. The notes include an experimental plugin that can hand a task to a local Codex or Claude
              command-line tool, and changes to the macOS computer-use permission prompts. A release candidate is
              not a stable version.
            </p>
            <p id="self-improving-agent-harness">
              <a className="text-[var(--link)] underline" href="https://arxiv.org/abs/2610.15150">
                Harmony Harness
              </a>{" "}
              (arXiv 2610.15150, submitted October 10, 2026) is a research paper from authors at Google Cloud AI
              Research, Google DeepMind, and Carnegie Mellon. It treats a self-improving agent harness as something
              to evolve for two goals at once, functionality and security, instead of one score. On SecRepoBench the
              paper reports held-out in-distribution joint success of 86.7 percent against a 50.0 percent baseline,
              and held-out out-of-distribution joint success of 66.7 percent against 36.7 percent. On BaxBench it
              reports an average of 61.3 percent against 42.9 percent for the baseline. The proposer and the solver
              use Gemini 3.6 Flash, and the paper says every reported rate is the mean of three independent runs.
              The abstract says the gains exceed 10 percent on both benchmarks. The paper does not announce a
              product or a code release. Public SWE-bench and Terminal-Bench rows are not copied here.
            </p>
            <p>
              The{" "}
              <a
                className="text-[var(--link)] underline"
                href="https://modelcontextprotocol.io/specification/2026-07-28/changelog"
              >
                Model Context Protocol changelog for the July 28, 2026 specification
              </a>{" "}
              is the current spec. It makes the core stateless, requires <code>server/discover</code>, and moves
              tasks into an official extension. Roots, Sampling, and Logging are deprecated. The same revision adopts
              a minimum twelve-month deprecation window, measured from the revision’s release. The{" "}
              <a
                className="text-[var(--link)] underline"
                href="https://modelcontextprotocol.io/specification/2026-07-28/deprecated"
              >
                deprecated-features registry
              </a>
              , read November 7, puts the earliest removal of Roots, Sampling, Logging, and Dynamic Client
              Registration at the first revision released on or after July 28, 2027. That day is inside this window.
              The registry says earliest removal is eligibility, that the actual removal is a later maintainer
              decision, and that no feature has been removed under the policy yet. The lifecycle policy also says a
              feature may stay deprecated much longer than the minimum. The HTTP+SSE transport is on the same
              registry without a calendar day. Its earliest removal is “three months after SEP-2596 reaches Final,”
              so this report does not assign it a month.
            </p>
            <p>
              What a harness is, in plain language, is in{" "}
              <Link className="text-[var(--link)] underline" href="/blog/what-is-an-ai-agent-harness">
                What is an AI agent harness?
              </Link>
            </p>
            <h3 id="apple-ai-agent-risks" className="text-lg font-semibold text-[var(--fg)]">
              Safety and regulation
            </h3>
            <p>
              <a className="text-[var(--link)] underline" href="https://www.sec.gov/Archives/edgar/data/320193/000032019326000026/aapl-20260926.htm">
                Apple’s Form 10-K
              </a>{" "}
              for the year ended September 26, 2026, with the auditor’s report dated November 3, 2026, says artificial
              intelligence agents can take actions on their own, including interacting with systems they may not be
              authorized to access, executing or altering code, sending communications, and completing transactions.
              It says they may behave in unintended or unpredictable ways, exceed permissions, conceal actions, or
              generate inaccurate or deceptive outputs, and that some consequences, such as deleting data or
              completing a transaction, may be difficult or impossible to reverse. It also says Apple’s ability to
              oversee third-party agents may be limited. The filing does not say that an agent has done any of those
              things inside Apple.
            </p>
            <p>
              The{" "}
              <a
                className="text-[var(--link)] underline"
                href="https://ai-act-service-desk.ec.europa.eu/en/ai-act/timeline/timeline-implementation-eu-ai-act"
              >
                EU AI Act timeline
              </a>{" "}
              on the Commission’s service desk, which includes the Digital Omnibus amendments, was read on November 7.
              On December 2, 2026, prohibitions on AI systems that generate non-consensual sexual deepfakes and child
              sexual abuse material start to apply. The same day is the transitional deadline for certain providers
              of systems, including general-purpose systems, that were already on the market before August 2, 2026,
              to comply with the Article 50(2) marking and detection rule. National AI regulatory sandboxes are dated
              August 2, 2027: member states should have at least one operational. Rules for high-risk systems in
              Annex III are dated December 2, 2027, which is after this window. Rules for high-risk AI embedded in
              regulated products covered by Annex I are dated August 2, 2028, further out.
            </p>
            <p>
              On October 30, 2026, the UK’s Digital Regulation Cooperation Forum — the CMA, FCA, ICO, and Ofcom —
              published a{" "}
              <a
                className="text-[var(--link)] underline"
                href="https://www.gov.uk/government/publications/agentic-ai-and-consumers"
              >
                joint statement
              </a>{" "}
              on personal AI agents. The{" "}
              <a
                className="text-[var(--link)] underline"
                href="https://www.drcf.org.uk/siteassets/drcf/pdf-files/drcf-joint-statement-protecting-people-and-businesses-in-and-agentic-economy2.pdf?v=427414"
              >
                PDF
              </a>{" "}
              is dated the same day. It says existing legal and regulatory frameworks apply to personal AI agents,
              including competition, consumer, and data protection law, online safety, financial services, payments,
              and cyber security. It also says an agent’s autonomy does not diminish the responsibility of
              organisations that deploy it to comply with applicable law. The statement does not set a new
              commencement date inside this window.
            </p>
            <p>
              A separate{" "}
              <a
                className="text-[var(--link)] underline"
                href="https://www.gov.uk/government/publications/cyber-security-and-resilience-network-and-information-systems-bill-factsheets/agentic-ai-resilience-measures"
              >
                GOV.UK factsheet
              </a>
              , updated November 3, 2026, says the government will consult on using powers in the Cyber Security and
              Resilience Bill to introduce four measures on agentic loss of control: security and resilience
              requirements, notification of affected organisations, evidence preservation, and post-incident review
              powers for ministers. The factsheet says the measures would follow Royal Assent, consultation, and the
              affirmative procedure. It names no month.{" "}
              <a className="text-[var(--link)] underline" href="https://bills.parliament.uk/bills/4035/news">
                Parliament’s bill page
              </a>
              , read November 7, says the Lords’ third reading was November 2 and that the amendments agreed then
              were about consistent language and the definition of a regulated person. On November 4 the Commons
              passed a carry-over motion so proceedings on the bill lapse at the end of April 29, 2027, rather than
              at the end of November 11, 2026.
            </p>
            <p>
              On November 5, 2026, Senior Minister of State Tan Kiat How told the GovTech STACK conference that
              GovTech is developing{" "}
              <a
                className="text-[var(--link)] underline"
                href="https://www.mddi.gov.sg/newsroom/opening-address-by-sms-mr-tan-kiat-how-at-govtech-stack-conference-2026-on-5-nov/"
              >
                GovHarness
              </a>{" "}
              as shared infrastructure for building and operating AI agents across the Singapore government, with
              deployment, tool connections, monitoring, evaluation, and common guardrails. The same speech describes
              GovTech’s Agentic Risk and Capability framework: higher-risk actions, including financial transactions,
              official communications, and data deletion, need stronger controls such as human approval. The speech
              does not date either one. It does give current figures for a different platform already in use: Rabbit
              Deploy supports over 8,000 users across 90 agencies, with over 5,000 active applications. Those are
              not a 2027 launch.
            </p>
            <h3 className="text-lg font-semibold text-[var(--fg)]">Agent shopping and payments</h3>
            <p>
              Checkout that is already running, and the phrases Google, OpenAI, Amazon, Microsoft, and Adobe have
              aimed at November 2026 through May 2027, are written up in the{" "}
              <Link className="text-[var(--link)] underline" href="/reports/ai-shopping-agents-next-6-months">
                shopping-agent outlook
              </Link>
              . This page does not copy the retailer list or the traffic figures. No shopping page in that set was
              re-dated, for this report, to a day in June through November 2027.
            </p>
          </div>
        </section>

        <section className="mt-12">
          <h2 id="likely" className="text-2xl font-semibold tracking-tight">
            Likely
          </h2>
          <div className="mt-4 grid gap-4 text-sm leading-relaxed text-[var(--muted)]">
            <p>
              Anthropic’s November 2 prospectus says: “We expect our use of short-term compute to continue to increase
              in the near term and to in turn compress our operating margin and Adjusted Operating Margin as a
              result.” Short-term compute, in that section, costs more than compute bought under multi-year
              commitments. The filing ties the September quarter’s swing — from $974 million of operating income in
              the June quarter to a $567 million operating loss — in part to $5.0 billion of short-term compute and
              $2.0 billion of non-cash donation-matching charges. “Near term” covers the start of this window and
              does not name a month. It is a statement about cost, not a promise of a new model. It is not pinned to
              June, July, August, or September 2027 either.
            </p>
            <p>
              The $69.8 billion figure is the other undated span that does have an end. Commitments due in the 12
              months after September 30, 2026, can fall in any month through September 30, 2027. A month inside that
              span is not, by itself, a deadline. October 2027 and November 2027 are outside it.
            </p>
            <p>
              Tencent’s November 4 post says the weights and system cards will be released in the coming days, and
              that Hy4 Flash is scheduled for release soon. Both phrases point at a near date and do not name one.
              The heading “Hy4 Flash Recently Released” is not treated as a ship date, because the paragraph under
              it says the model is scheduled for release soon. If either item is still unreleased, it remains inside
              this window only until Tencent replaces the sentence. The same post says a WorkBuddy “Projects”
              feature will be introduced with an upcoming release. That sentence is weaker than “soon,” so it is
              listed under Watch for as well.
            </p>
            <p>
              Citrix’s availability line, “by the end of this month,” covers the rest of November 2026 and does not
              name a day. On November 7 that sentence was still in the future tense. GovTech’s November 5 speech
              says GovHarness is being developed. “Developing” covers the months ahead only until a later page names
              a date or drops the work. It is not a 2027 launch announcement.
            </p>
          </div>
        </section>

        <section className="mt-12">
          <h2 id="watch-for" className="text-2xl font-semibold tracking-tight">
            Watch for
          </h2>
          <div className="mt-4 grid gap-4 text-sm leading-relaxed text-[var(--muted)]">
            <p>
              Two Citrix SecurAccess lines are still future tense and have no day of their own: SecurAccess with
              Chrome Enterprise “will be able” to tell when automation, rather than a person, is driving the
              browser, and SecurAccess ZTNA “will become” a control point that limits an agent to the tools it needs
              for a task through the Model Context Protocol. The post’s availability sentence puts the SecurAccess
              updates at the end of November 2026. A later page should either show them as available or drop them
              from this window. The open-source Knowledge Worker Agent has no date at all.
            </p>
            <p>
              OpenAI’s computer-use page does not mention Linux. A support reply on a community thread is not used
              here as a promise. The thing to watch is whether the official guide gains a Linux section.
            </p>
            <p>
              DeepSeek’s README says the harness is in developer preview and that compatibility-breaking changes
              will happen. It does not say when the preview ends. On November 7, v0.2.2-rc.1 was still the newest
              release, and it is marked a pre-release. Harmony Harness is a paper, not a shipping product. Watch for
              an author code release or a product page. Neither was part of the paper.
            </p>
            <p>
              MCP removal is not scheduled for July 28, 2027. That is the first day a later revision may remove
              Roots, Sampling, Logging, and Dynamic Client Registration. The policy’s expedited path can shorten the
              floor to 90 days for an active security risk, with maintainer approval. No such shortening was on the
              registry. HTTP+SSE still has no calendar day.
            </p>
            <p>
              The EU dates after this window are December 2, 2027, and August 2, 2028. A claim that Annex III
              high-risk duties land before December 2027 does not match the Commission timeline read on November 7.
              August 2, 2027 is the sandbox duty, not a substitute for Annex III.
            </p>
            <p>
              The UK factsheet’s four agentic measures have no month. April 29, 2027 is the extended date on which
              Commons proceedings on the whole bill lapse if they are not finished. It is not Royal Assent, and it
              is not the start of those four measures. GovHarness and the ARC framework, as described on November 5,
              have no ship date.
            </p>
            <p>
              Apple’s risk factor is a warning, not an incident report. A later 10-Q or 8-K would be the place a
              specific event would show up. This report did not find one dated inside the window.
            </p>
          </div>
        </section>

        <section className="mt-12">
          <h2 id="month-by-month" className="text-2xl font-semibold tracking-tight">
            Month by month
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-[var(--muted)]">
            An empty announcement means no linked source named that month. It is not a prediction that the month
            will be quiet. June 2027, October 2027, and November 2027 are empty of launches on purpose.
          </p>
          <div className="mt-5 grid gap-4">
            {months.map((item) => (
              <article key={item.month} className="glass rounded-3xl p-6">
                <h3 className="text-xl font-semibold tracking-tight">{item.month}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
                  <strong className="font-semibold text-[var(--fg)]">Announced. </strong>
                  {item.announced}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                  <strong className="font-semibold text-[var(--fg)]">Likely. </strong>
                  {item.likely}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                  <strong className="font-semibold text-[var(--fg)]">Watch for. </strong>
                  {item.watch}
                </p>
              </article>
            ))}
          </div>
          <DataSourceLine title={title} updated={readOn} path={path} />
          <p className="mt-4 text-sm">
            <a className="text-[var(--link)] underline" href={`${path}/csv`}>
              Download the month table as CSV
            </a>
          </p>
        </section>

        <section className="mt-12">
          <h2 id="what-are-ai-agents" className="text-2xl font-semibold tracking-tight">
            What are AI agents and how do they work
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[var(--muted)]">
            Anthropic’s prospectus, in its defined terms, calls agentic AI a system that can plan and carry out
            actions to meet a goal, including by using tools and services. It calls the agent loop the cycle of
            taking an action, seeing the result, and choosing the next step until the task is done. On this site, an{" "}
            <Link className="text-[var(--link)] underline" href="/glossary/agent">agent</Link> is that working
            combination: a model plus the{" "}
            <Link className="text-[var(--link)] underline" href="/glossary/harness">harness</Link> around it. The
            harness is the loop, the tools, the permissions, and the rule for when to stop. The model does not click
            a button by itself. The harness runs the click the model asked for, inside whatever limits the product
            set.
          </p>
        </section>

        <section className="mt-12">
          <h2 id="types-of-ai-agents" className="text-2xl font-semibold tracking-tight">
            Types of AI agents in this window
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[var(--muted)]">
            The sources above sort into a few types, not a taxonomy from a textbook. Coding agents, such as Claude
            Code in Anthropic’s filing, work in a repository and a terminal. Computer-use agents, in OpenAI’s guide,
            Anthropic’s toolset, and Tencent’s Hy4 post, look at a screen or a page and act on it. Enterprise agents,
            in the AWS, Sysdig, and Citrix posts, run inside a company desktop or under a company policy. Government
            agents, in the Singapore speech, are the same pattern inside public services, with GovHarness still
            described as in development. Shopping agents are the checkout case, covered in the other report. A
            self-improving harness, in the Harmony paper, is still a research method: the software around the model
            is what gets edited between runs. The paper’s own numbers are on secure-coding benchmarks, not on a
            customer deployment.
          </p>
        </section>

        <section className="mt-12">
          <h2 id="how-to-use-ai-agents" className="text-2xl font-semibold tracking-tight">
            How to use an AI agent
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[var(--muted)]">
            The official computer-use pages describe a narrow job, not a standing permission. OpenAI’s guide says to
            name the app and the flow, to keep sensitive apps closed unless the task needs them, and to stay present
            for account, payment, or credential steps. It asks before it uses an app, and an administrator can turn
            the feature off. Anthropic’s API tool runs in an environment the caller controls, and the page says it
            is not in Claude Managed Agents. AWS puts the agent on a cloud desktop with the company’s existing
            network and identity controls. Sysdig’s release says policies can start in alert mode and move to
            blocking when a team is ready. Singapore’s November 5 speech draws the same line for higher-risk
            actions: a financial transaction, an official message, or a deletion needs a stronger control, including
            a person. Apple’s 10-K is the reminder that a finished transaction or a deleted file may not be
            reversible. The UK regulators’ October 30 statement says autonomy does not shrink the duty of the
            organisation that deploys the agent. None of those pages is a setup tutorial for a specific app version,
            and this report does not add one.
          </p>
        </section>

        <section className="mt-12">
          <h2 id="left-out" className="text-2xl font-semibold tracking-tight">
            Left out
          </h2>
          <ul className="mt-3 grid gap-3 text-sm leading-relaxed text-[var(--muted)]">
            <li>
              Tencent’s own WorkBuddy, finance, and game scores are the company’s evaluations. They are not copied
              here. The dated product facts are the API, the free window, the discount, the approximate catalog
              price on the corporate post, and the computer-use sentence.
            </li>
            <li>
              The Hy research page at hy.tencent.ai/research/hy4 did not return body text on November 7, 2026. A
              price table seen only in a secondary summary of that page is not used. The approximate prices above
              are the ones printed on Tencent’s corporate post.
            </li>
            <li>
              SWE-bench, Terminal-Bench, OSWorld, WebArena, GAIA, and tau-bench scores are not repeated here. The
              November benchmark copies the two official boards and says which others were left out. Harmony
              Harness’s own percentages stay with the paper.
            </li>
            <li>
              Shopping carts, merchant lists, and holiday traffic forecasts are in the shopping report. This page
              does not extend that checkout record into June through November 2027, because no primary shopping page
              was dated into those months for this edition.
            </li>
            <li>
              Secondary reports of a CERT-In AI security auditing guideline on November 5 were not matched to a
              CERT-In document dated November 5, 6, or 7. They are not used. A secondary report that the House of
              Lords added an agentic clause at third reading does not match Parliament’s news page, which describes
              language and definition amendments on November 2. It is not used.
            </li>
            <li>
              No primary product, coding-agent, computer-use, or harness page dated November 6 or November 7, 2026,
              was found in this pass. Those two days stay empty.
            </li>
            <li>
              A fresh Google Trends series for this title was not retrieved on November 7. Relative-interest figures
              are left out. This edition also did not open a new Microsoft Agent 365 changelog or a new NIST or
              CAISI document dated inside the window, so none is forecast.
            </li>
            <li>
              December 2, 2027, and August 2, 2028, are on the EU timeline and outside this page’s window. They are
              listed above so they are not pulled forward.
            </li>
          </ul>
        </section>

        <FaqList
          items={[
            {
              question: "What are AI agents and how do they work?",
              answer: (
                <p>
                  Anthropic’s November 2, 2026 prospectus defines agentic AI as a system that can plan and carry out
                  steps, including by using tools, and defines the agent loop as action, observation, and the next
                  step until the task is done. On this site the agent is the model plus the harness: the loop, the
                  tools, the permissions, and the stop rule. The model proposes a step. The harness is what runs it.
                </p>
              ),
            },
            {
              question: "What is newly dated between June and November 2027?",
              answer: (
                <p>
                  Three dates, and none of them is a product launch. July 28, 2027 is the first day a later MCP
                  revision may remove Roots, Sampling, Logging, and Dynamic Client Registration. August 2, 2027 is
                  the EU date for at least one national AI regulatory sandbox per member state. September 30, 2027
                  is the last day of the span in which Anthropic says about $69.8 billion of commitments are due.
                  June, October, and November 2027 have no dated launch in this source set. Annex III high-risk
                  rules are December 2, 2027, after the window.
                </p>
              ),
            },
            {
              question: "Does the MCP deprecation remove Roots, Sampling, and Logging on July 28, 2027?",
              answer: (
                <p>
                  No. The registry for the July 28, 2026 specification says those features, and Dynamic Client
                  Registration, become eligible for removal in the first revision released on or after July 28,
                  2027. Removal is a later decision, and the registry read on November 7, 2026 said no feature had
                  been removed under the policy yet. An expedited path can shorten the floor to 90 days for an
                  active security risk. That shortening was not on the registry.
                </p>
              ),
            },
            {
              question: "What did Apple say about AI agent risks?",
              answer: (
                <p>
                  The Form 10-K for the year ended September 26, 2026 says agents can act on their own, including on
                  systems they may not be allowed to access, and that they may exceed permissions, hide actions, or
                  produce inaccurate or deceptive outputs. It says some consequences, such as deleting data or
                  completing a transaction, may be difficult or impossible to reverse, and that Apple’s oversight of
                  third-party agents may be limited. It does not describe a specific incident.
                </p>
              ),
            },
            {
              question: "What is a self-improving agent harness?",
              answer: (
                <p>
                  In the Harmony Harness paper, submitted October 10, 2026, it is a harness that is rewritten from
                  its own test results, with functionality and security kept as separate goals. The paper reports
                  gains on SecRepoBench and BaxBench using Gemini 3.6 Flash, as means of three runs. It does not
                  announce a product for this twelve-month window.
                </p>
              ),
            },
            {
              question: "What is already announced for the next twelve months?",
              answer: (
                <p>
                  Already in market, on the pages read November 7: Claude Code and Claude Cowork as Anthropic
                  describes them, OpenAI computer use on macOS and Windows, Anthropic’s computer-use toolset on the
                  listed clouds, Hy4’s API, AWS Linux and Windows 11 desktops for agents, Sysdig AI Defense, and
                  Citrix’s SecurSpaces updates. Dated ahead inside the window: the EU’s December 2, 2026 prohibition
                  and Article 50(2) deadline, Tencent’s discount through December 31, 2026, the UK bill’s procedural
                  lapse date of April 29, 2027, MCP eligibility from July 28, 2027, and EU national AI sandboxes on
                  August 2, 2027. High-risk EU rules for Annex III are dated December 2, 2027, after this window.
                </p>
              ),
            },
            {
              question: "Is $69.8 billion due on one day?",
              answer: (
                <p>
                  No. Anthropic’s November 2 filing says about $69.8 billion of purchase commitments and leases are
                  due in the 12 months following September 30, 2026. The span ends September 30, 2027. The same
                  paragraph puts aggregate commitments at about $895.4 billion, with about $447.5 billion expected
                  before December 31, 2030. The filing does not break the $69.8 billion into months.
                </p>
              ),
            },
            {
              question: "Does this report repeat the shopping outlook or the harness benchmark?",
              answer: (
                <p>
                  No. Who can pay, and which shopping phrases point at November 2026 through May 2027, is in the
                  shopping report. Official SWE-bench and Terminal-Bench scores are in the November harness
                  benchmark. This page links to both and does not copy them.
                </p>
              ),
            },
          ]}
        />
        <div className="mt-14">
          <NewsletterSignup id="report-agents-12-month-outlook" />
        </div>
      </ReportLayout>
    </>
  );
}
