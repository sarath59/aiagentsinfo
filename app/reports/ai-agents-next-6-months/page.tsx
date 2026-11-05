import Link from "next/link";
import { ArticleTemplate } from "@/components/ArticleTemplate";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CiteOrEmbed } from "@/components/CiteOrEmbed";
import { NewsletterSignup } from "@/components/newsletter/NewsletterSignup";
import { FaqList } from "@/components/FaqList";
import { categoryTitle, getBlogPost } from "@/lib/blog";
import { description, months, path, readOn, readingMinutes, title } from "@/lib/agents-outlook";
import { categorySummaries } from "@/lib/directory-meta";
import { getGlossaryTerm } from "@/lib/glossary";
import { JsonLd, defaultMetadata, webPageJsonLd } from "@/lib/seo";
import { absoluteUrl, site, topics } from "@/lib/site";
import { formatDate } from "@/lib/utils";

export const metadata = defaultMetadata(title, description, path);

export default async function AgentsOutlookPage() {
  const [harness, hy4, agent, harnessTerm, autonomy] = await Promise.all([
    getBlogPost("what-is-an-ai-agent-harness"),
    getBlogPost("tencent-releases-hy4-with-computer-use"),
    getGlossaryTerm("agent"),
    getGlossaryTerm("harness"),
    getGlossaryTerm("autonomy"),
  ]);
  const related = [
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
      href: "/agent-cost-calculator",
      title: "Agent cost calculator",
      description:
        "Estimate a 30-day model bill from official per-token prices. Pick a model, then enter tokens per task and tasks per day.",
      kicker: "Tool",
      date: "2026-11-05",
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
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Reports", path: "/reports" },
          { name: title, path },
        ]}
      />
      <ArticleTemplate
        category="Report"
        title={title}
        description={description}
        published={readOn}
        readingMinutes={readingMinutes}
        byline={site.bylines.research}
        wide
        takeaways={[
          "From November 2026 through May 2027, the dated public record is a set of filings, a few product posts, and two EU dates. It is not a launch calendar.",
          "Anthropic’s November 2 prospectus describes Claude Code and Claude Cowork as products already in market, and expects short-term compute to rise in the near term.",
          "OpenAI’s computer-use page, read November 5, covers macOS and Windows. It does not mention Linux.",
          "Shopping checkout for the same six months is a separate report. This page does not repeat it.",
        ]}
        toc={[
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
        citation={<CiteOrEmbed citation={citation} embed={embed} />}
        related={related}
      >
        <div className="article-prose">
          <p>
            From November 2026 through May 2027, the public record is a short list of things a company or a government
            has already dated, plus a handful of phrases with no day attached. Anthropic filed an amended prospectus
            on November 2. Apple’s auditors signed the Form 10-K on November 3. AWS, Sysdig, DeepSeek, and Tencent
            posted on November 3 and 4. The European Commission’s AI Act timeline names December 2, 2026. It does not
            name a product launch between then and May 2027.
          </p>
          <p>
            Shopping and payments for the same six months are in{" "}
            <Link href="/reports/ai-shopping-agents-next-6-months">
              AI shopping agents in the next 6 months
            </Link>
            . This page does not repeat that checkout record. Scores for coding harnesses are in the{" "}
            <Link href="/reports/agent-harness-benchmark-november-2026">November harness benchmark</Link>. A month
            with no dated launch is left empty on purpose.
          </p>
        </div>

        <section className="glass article-callout mt-10 rounded-3xl p-6 sm:p-8">
          <h2 id="how-a-claim-is-sorted" className="text-2xl font-semibold tracking-tight">
            How a claim is sorted
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
            <strong className="font-semibold text-[var(--fg)]">Announced</strong> means a linked filing, company page,
            protocol changelog, or official timeline says it.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
            <strong className="font-semibold text-[var(--fg)]">Likely</strong> means that page aims the work at this
            six-month stretch and does not name a day. The word means “their phrase covers these months.” It is not a
            new odds estimate from this desk.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
            <strong className="font-semibold text-[var(--fg)]">Watch for</strong> means a later check should confirm
            the item or drop it: the page withholds a date, the tense is future, or a follow-up named earlier was not
            confirmed on November 5, 2026.
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
              began merging Claude Cowork and Claude.ai.
            </p>
            <p>
              The quarterly table in that prospectus shows revenue of $16,956 million for the three months ended
              September 30, 2026, and an operating loss of $567 million. The narrative rounds the same quarter’s
              revenue to $17.0 billion. For the nine months ended September 30, revenue is $33,242 million and the
              operating loss is $1,260 million. Net revenue retention is approximately 900 percent as of September
              30. The filing says Opus 5.5 reduced customer cost per task by approximately 40 percent compared with
              Opus 5. It does not split revenue between Claude Code and the rest of the business. None of those
              figures is a forecast for a named day in 2027.
            </p>
            <h3 className="text-lg font-semibold text-[var(--fg)]">Browser and computer-use agents</h3>
            <p>
              <a className="text-[var(--link)] underline" href="https://developers.openai.com/codex/computer-use">
                OpenAI’s computer-use guide
              </a>
              , read November 5, 2026, says Computer Use in the ChatGPT desktop app is available on macOS and Windows
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
              </a>{" "}
              says one <code>computer_toolset_20260801</code> entry gives Claude 17 member tools, including
              screenshot, click, type, and zoom. The caller runs every call in an environment it controls. The toolset
              is on the Claude API and Google Cloud. It is not currently available in Claude Managed Agents. A
              separate browser tool reads and acts on a page without a full desktop. The S-1 defines computer use as
              a model observing and operating a graphical interface, and it says Claude Cowork has that capability
              for knowledge work.
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
              catalog price through December 31, 2026. The longer note is{" "}
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
              announced general availability of Sysdig AI Defense on November 4, 2026. The release says it judges
              each agent action against an organization’s policy and can allow it, ask a person to confirm it, or
              block it. It names Claude Code, Codex, GitHub Copilot, and Cursor as platforms whose agents can be
              traced to a person. It also says it instruments the harness to see which tools, MCP servers, skills,
              and plugins an agent calls.
            </p>
            <h3 id="deepseek-harness" className="text-lg font-semibold text-[var(--fg)]">
              Harnesses and protocols
            </h3>
            <p>
              <a className="text-[var(--link)] underline" href="https://github.com/deepseek-ai/deepseek-harness">
                DeepSeek Harness
              </a>{" "}
              is an open-source agent harness. The project page says it is in developer preview and that there will
              be compatibility-breaking changes.{" "}
              <a className="text-[var(--link)] underline" href="https://github.com/deepseek-ai/DeepSeek-Harness/releases">
                Release v0.2.2-rc.1
              </a>{" "}
              was published on November 4, 2026. The notes include an experimental plugin that can hand a task to a
              local Codex or Claude command-line tool, and changes to the macOS computer-use permission prompts. A
              release candidate is not a stable version.
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
              are Gemini 3.6 Flash, and the rates are means of three runs. The abstract says the gains exceed 10
              percent on both benchmarks. The paper does not announce a product.
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
              tasks into an official extension. Roots, Sampling, and Logging are deprecated. The same changelog
              adopts a minimum 12-month deprecation window. Those three features therefore stay in the specification
              at least through July 28, 2027, which covers this entire six-month window. The changelog does not name
              the day they will be removed.
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
              generate inaccurate outputs, and that some consequences, such as deleting data or completing a
              transaction, may be difficult or impossible to reverse. It also says Apple’s ability to oversee
              third-party agents may be limited. The filing does not say that an agent has done any of those things
              inside Apple.
            </p>
            <p>
              The{" "}
              <a
                className="text-[var(--link)] underline"
                href="https://ai-act-service-desk.ec.europa.eu/en/ai-act/timeline/timeline-implementation-eu-ai-act"
              >
                EU AI Act timeline
              </a>{" "}
              on the Commission’s service desk, which includes the Digital Omnibus amendments, places two dates inside
              this window’s first month and none after it. On December 2, 2026, prohibitions on AI systems that
              generate non-consensual sexual deepfakes and child sexual abuse material start to apply. The same day
              is the transitional deadline for certain providers of systems, including general-purpose systems, that
              were already on the market before August 2, 2026, to comply with the Article 50(2) marking and detection
              rule. National AI regulatory sandboxes are dated August 2, 2027. Rules for high-risk systems in Annex
              III are dated December 2, 2027. Both of those are after May 2027.
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
              that existing law already applies to personal AI agents, including competition, consumer, and data
              protection law, online safety, financial services, payments, and cyber security. The statement says an
              agent’s autonomy does not reduce the duty of the organization that deploys it.{" "}
              <a
                className="text-[var(--link)] underline"
                href="https://www.drcf.org.uk/siteassets/drcf/pdf-files/drcf-joint-statement-protecting-people-and-businesses-in-and-agentic-economy2.pdf?v=427414"
              >
                The PDF
              </a>{" "}
              is dated the same day.
            </p>
            <h3 className="text-lg font-semibold text-[var(--fg)]">Agent shopping and payments</h3>
            <p>
              Checkout that is already running, and the phrases Google, OpenAI, Amazon, Microsoft, and Adobe have
              aimed at this same six months, are written up in the{" "}
              <Link className="text-[var(--link)] underline" href="/reports/ai-shopping-agents-next-6-months">
                shopping-agent outlook
              </Link>
              . The short version: some carts can already take a payment inside rules a company has published, and
              no page in that set names a new country or a new checkout button for a specific day through May 2027.
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
              does not name a month. It is a statement about cost, not a promise of a new model.
            </p>
            <p>
              The same filing says about $69.8 billion of purchase commitments and leases are due in the 12 months
              following September 30, 2026. That span includes this whole window and runs past it, to September 30,
              2027. It is a committed-spend figure, not a product date.
            </p>
            <p>
              Tencent’s November 4 post says the weights and system cards will be released in the coming days, and
              that Hy4 Flash is scheduled for release soon. Both phrases point at a near date and do not name one.
              If either is still unreleased, it remains inside this window only until Tencent replaces the sentence.
              The same post says a WorkBuddy “Projects” feature will be introduced with an upcoming release. That
              sentence is weaker than “soon,” so it is listed under Watch for as well.
            </p>
          </div>
        </section>

        <section className="mt-12">
          <h2 id="watch-for" className="text-2xl font-semibold tracking-tight">
            Watch for
          </h2>
          <div className="mt-4 grid gap-4 text-sm leading-relaxed text-[var(--muted)]">
            <p>
              <a
                className="text-[var(--link)] underline"
                href="https://www.citrix.com/news/announcements/nov-2026/citrix-advances-secure-ai-adoption.html"
              >
                Citrix’s November 4 announcement
              </a>{" "}
              says new capabilities are coming across SecurSpaces, SecurAccess, and Platform Flex. Two of the
              security lines are in the future tense and have no day: SecurAccess with Chrome Enterprise “will be
              able” to tell when automation, rather than a person, is driving the browser, and SecurAccess ZTNA
              “will become” a control point that limits an agent to the tools it needs for a task through the Model
              Context Protocol. A later page should either date those controls or drop them from this window.
            </p>
            <p>
              OpenAI’s computer-use page does not mention Linux. A support reply on a community thread is not used
              here as a promise. The thing to watch is whether the official guide gains a Linux section.
            </p>
            <p>
              DeepSeek’s README says the harness is in developer preview and that compatibility-breaking changes
              will happen. It does not say when the preview ends. Harmony Harness is a paper, not a shipping product.
              Watch for an author code release or a product page. Neither was part of the paper read on November 5.
            </p>
            <p>
              The EU dates after this window are August 2, 2027 and December 2, 2027. A claim that Annex III
              high-risk duties land before June 2027 does not match the Commission timeline read on November 5.
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
            will be quiet.
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
            in the AWS and Sysdig posts, run inside a company desktop or under a company policy. Shopping agents are
            the checkout case, covered in the other report. A self-improving harness, in the Harmony paper, is still
            a research method: the software around the model is what gets edited between runs. The paper’s own
            numbers are on secure-coding benchmarks, not on a customer deployment.
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
            blocking when a team is ready. Apple’s 10-K is the reminder that a finished transaction or a deleted
            file may not be reversible. None of those pages is a setup tutorial for a specific app version, and this
            report does not add one.
          </p>
        </section>

        <section className="mt-12">
          <h2 id="left-out" className="text-2xl font-semibold tracking-tight">
            Left out
          </h2>
          <ul className="mt-3 grid gap-3 text-sm leading-relaxed text-[var(--muted)]">
            <li>
              Tencent’s own WorkBuddy, finance, and game scores are the company’s evaluations. They are not copied
              here. The dated product facts are the API, the free window, the discount, and the computer-use
              sentence.
            </li>
            <li>
              The ICO’s agentic-AI call for evidence did not load on November 5, 2026. The site returned a bot check.
              A closing date from a secondary summary is not used.
            </li>
            <li>
              A fresh Google Trends series for this title was not retrieved on November 5. Relative-interest figures
              are left out.
            </li>
            <li>
              Microsoft’s Agent 365 pages describe a control plane. This report did not find a dated change on those
              pages that falls between November 2026 and May 2027, so the product is not placed on the calendar.
            </li>
            <li>
              NIST’s January 2026 request for information on agent security closed on March 9, 2026, before this
              window. No CAISI guidance dated inside the window was opened for this report, so none is forecast.
            </li>
            <li>
              SWE-bench, Terminal-Bench, OSWorld, WebArena, GAIA, and tau-bench scores are not repeated here. The
              November benchmark copies the two official boards that were re-read on November 5 and says which
              others were left out.
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
              question: "What types of AI agents show up between November 2026 and May 2027?",
              answer: (
                <p>
                  The dated sources cover coding agents, computer-use and browser agents, enterprise agents running
                  under a company desktop or a company policy, and shopping agents, which have their own report.
                  Harmony Harness is a research paper on self-improving harnesses, not a product with a ship date.
                  DeepSeek Harness is a developer preview, with a release candidate on November 4, 2026.
                </p>
              ),
            },
            {
              question: "How do you use an AI agent without handing over the whole computer?",
              answer: (
                <p>
                  OpenAI’s computer-use guide, read November 5, says to name one app or flow, to review each
                  permission, and to stay present for payment and credential steps. On Windows the feature takes the
                  foreground. Anthropic’s API tool runs in an environment the caller controls. AWS’s November 3 post
                  puts the agent on a cloud desktop with the company’s existing isolation and identity controls.
                  Apple’s November 3 10-K says some agent actions, including a completed transaction, may be hard to
                  undo.
                </p>
              ),
            },
            {
              question: "What did Apple say about AI agent risks?",
              answer: (
                <p>
                  The Form 10-K for the year ended September 26, 2026 says agents can act on their own, including on
                  systems they may not be allowed to access, and that they may exceed permissions, hide actions, or
                  produce deceptive outputs. It says Apple’s oversight of third-party agents may be limited. It does
                  not describe a specific incident.
                </p>
              ),
            },
            {
              question: "What is a self-improving agent harness?",
              answer: (
                <p>
                  In the Harmony Harness paper, submitted October 10, 2026, it is a harness that is rewritten from
                  its own test results, with functionality and security kept as separate goals. The paper reports
                  gains on SecRepoBench and BaxBench using Gemini 3.6 Flash. It does not announce a product for this
                  six-month window.
                </p>
              ),
            },
            {
              question: "What is DeepSeek Harness?",
              answer: (
                <p>
                  It is DeepSeek’s open-source agent harness. The project page says it is a developer preview and
                  that compatibility-breaking changes are expected. Version v0.2.2-rc.1 was released on November 4,
                  2026. The notes mention an experimental way to hand a task to a local Codex or Claude
                  command-line tool.
                </p>
              ),
            },
            {
              question: "What is already announced for the next six months?",
              answer: (
                <p>
                  Already in market, on the pages read November 5: Claude Code and Claude Cowork as Anthropic
                  describes them, OpenAI computer use on macOS and Windows, Anthropic’s computer-use toolset on the
                  Claude API and Google Cloud, Hy4’s API, AWS Linux and Windows 11 desktops for agents, and Sysdig
                  AI Defense. Dated ahead: the EU’s December 2, 2026 prohibition and Article 50(2) deadline, and
                  Tencent’s discount through December 31, 2026. High-risk EU rules for Annex III are dated December
                  2, 2027, after this window.
                </p>
              ),
            },
            {
              question: "Does this report repeat the shopping-agent outlook?",
              answer: (
                <p>
                  No. Who can pay, and which shopping phrases point at November 2026 through May 2027, is in the
                  shopping report. This page links to it and does not copy the retailer list or the Adobe traffic
                  figures.
                </p>
              ),
            },
          ]}
        />
        <div className="mt-14">
          <NewsletterSignup id="report-agents-outlook" />
        </div>
      </ArticleTemplate>
    </>
  );
}
