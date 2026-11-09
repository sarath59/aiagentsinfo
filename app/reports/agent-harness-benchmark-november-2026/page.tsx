import Link from "next/link";
import { ArticleTemplate } from "@/components/ArticleTemplate";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CiteOrEmbed } from "@/components/CiteOrEmbed";
import { ListYourAgent } from "@/components/ListYourAgent";
import { NewsletterSignup } from "@/components/newsletter/NewsletterSignup";
import { NextRead } from "@/components/NextRead";
import { FaqList } from "@/components/FaqList";
import { SortableTable } from "@/components/SortableTable";
import { ToolCtas } from "@/components/ToolCtas";
import { categoryTitle, getBlogPost } from "@/lib/blog";
import { description, path, readingMinutes, title } from "@/lib/benchmark-report";
import { categorySummaries } from "@/lib/directory-meta";
import { getGlossaryTerm } from "@/lib/glossary";
import {
  BENCHMARK_READ_ON,
  sweColumns,
  sweRows,
  swebenchBenchmark,
  terminalBench,
  terminalColumns,
  terminalRows,
} from "@/lib/harness-benchmark";
import { JsonLd, datasetJsonLd, defaultMetadata, faqPageJsonLd, webPageJsonLd } from "@/lib/seo";
import { absoluteUrl, site } from "@/lib/site";
import { formatDate } from "@/lib/utils";

export const metadata = defaultMetadata(title, description, path);

export default async function HarnessBenchmarkPage() {
  const [guide, evalGuide, buildGuide, benchmarkTerm] = await Promise.all([
    getBlogPost("what-is-an-ai-agent-harness"),
    getBlogPost("how-do-you-evaluate-an-ai-agent-harness"),
    getBlogPost("how-to-build-an-eval-harness-for-ai-agents"),
    getGlossaryTerm("benchmark"),
  ]);
  const related = [
    evalGuide
      ? {
          href: `/blog/${evalGuide.slug}`,
          title: evalGuide.title,
          description: evalGuide.description,
          kicker: categoryTitle(evalGuide.category),
          date: evalGuide.date,
          readingMinutes: evalGuide.readingMinutes,
        }
      : undefined,
    buildGuide
      ? {
          href: `/blog/${buildGuide.slug}`,
          title: buildGuide.title,
          description: buildGuide.description,
          kicker: categoryTitle(buildGuide.category),
          date: buildGuide.date,
          readingMinutes: buildGuide.readingMinutes,
        }
      : undefined,
    {
      href: "/reports/ai-agents-next-12-months",
      title: "AI agents, Nov 2026 to Nov 2027",
      description:
        "The 12-month flagship for coding agents, computer use, harnesses, and regulation. Official board scores stay on this page.",
      kicker: "Report",
      date: "2026-11-07",
    },
    {
      href: "/reports/ai-agents-next-6-months",
      title: "AI agents, Nov 2026 to May 2027",
      description:
        "What filings and company pages have dated for coding agents, computer use, harnesses, and regulation from November 2026 through May 2027.",
      kicker: "Report",
      date: "2026-11-05",
    },
    guide
      ? {
          href: `/blog/${guide.slug}`,
          title: guide.title,
          description: guide.description,
          kicker: categoryTitle(guide.category),
          date: guide.date,
          readingMinutes: guide.readingMinutes,
        }
      : undefined,
    benchmarkTerm
      ? {
          href: "/glossary/benchmark",
          title: benchmarkTerm.term,
          description: benchmarkTerm.shortDefinition,
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
      href: "/best",
      title: "Best AI agents",
      description: "The hub for sourced harness, computer use, and evaluation comparisons.",
      kicker: "Hub",
      date: "2026-11-08",
    },
    {
      href: "/best/ai-agent-harnesses",
      title: "Best AI agent harness",
      description:
        "Licence, list price, and platform for coding, open-source, and local harnesses. Last verified November 2026.",
      kicker: "Comparison",
      date: "2026-11-08",
    },
    {
      href: "/best/ai-agent-evaluation-tools",
      title: "Best AI agent evaluation tools",
      description: "Regression and trajectory evaluation stacks, including open source.",
      kicker: "Comparison",
      date: "2026-11-08",
    },
    {
      href: "/directory/category/agent-frameworks",
      title: "Agent frameworks and harnesses",
      description: categorySummaries["agent-frameworks"],
      kicker: "Directory",
    },
    {
      href: "/agent-cost-calculator",
      title: "Agent cost calculator",
      description:
        "Estimate a 30-day model bill from official per-token prices. Pick a model, then enter tokens per task and tasks per day. No login is required.",
      kicker: "Data",
      date: "2026-11-05",
    },
    {
      href: "/trackers/benchmarks",
      title: "Benchmark tracker",
      description:
        "A leaderboard for public agent benchmarks. A score is published only with a source, a date, and the harness that produced it.",
      kicker: "Tracker",
    },
  ].filter((item) => item !== undefined);
  const updated = BENCHMARK_READ_ON;
  const updatedLabel = formatDate(updated);
  const pageUrl = absoluteUrl(path);
  const citation = `AI Agents Info. "${title}." Last updated ${updatedLabel}. ${pageUrl}.`;
  const embed = `<blockquote cite="${pageUrl}">
<p>${description}</p>
<footer><a href="${pageUrl}">${title}</a>, AI Agents Info, last updated ${updatedLabel}.</footer>
</blockquote>`;
  const topUnchecked = swebenchBenchmark.uncheckedTop
    .map((row) => `${row.name} (${row.resolved}% on ${row.date})`)
    .join(" and ");

  return (
    <>
      <JsonLd data={webPageJsonLd({ title, description, path, datePublished: updated, dateModified: updated })} />
      <JsonLd data={datasetJsonLd({ title, description, path, datePublished: updated, dateModified: updated })} />
      <JsonLd
        data={faqPageJsonLd([
          {
            question: "Does a higher percent mean a better product?",
            answer:
              "Only inside one table, and only for the harness named on the row. A bash-only SWE-bench score and a Terminal-Bench score are different tests. A mini-SWE-agent 1.x row and a 2.x row are not described by SWE-bench as a clean comparison.",
          },
          {
            question: "Why are some famous models missing?",
            answer: `They were not on the official file when it was read on ${updatedLabel}. A score that exists only on a recap site is left out. The newest SWE-bench Verified date in that file is ${swebenchBenchmark.newestResultDate}.`,
          },
          {
            question: "Who checked the runs?",
            answer:
              "The SWE-bench tables have a team-checked column taken from the official file. Terminal-Bench rows are the rows on the official 4.0 board. This site did not re-run the tasks.",
          },
          {
            question: "How often does this page change?",
            answer:
              "It is the November 2026 agent harness benchmark. A later month gets its own page when the boards are read again. The reports index is where that page will be linked.",
          },
        ])}
      />
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
        published={updated}
        readingMinutes={readingMinutes}
        byline={site.bylines.research}
        wide
        takeaways={[
          "This page copies public scores for coding agents and the harnesses around them.",
          "The tables use the official SWE-bench leaderboard and the official Terminal-Bench 4.0 leaderboard. Each row keeps the date on that source.",
          "Nothing here is estimated, and a score from another website is not filled in when the official board does not list it.",
        ]}
        toc={[
          { id: "what-these-numbers-are", text: "What is this agent harness benchmark?", level: 2 },
          { id: "swe-bench-bash", text: "What does SWE-bench show when the harness stays the same?", level: 2 },
          { id: "swe-bench-checked", text: "Which other harnesses did the SWE-bench team check?", level: 2 },
          { id: "swe-bench-multilingual", text: "How does SWE-bench Multilingual compare on one harness?", level: 2 },
          { id: "terminal-bench", text: "What does Terminal-Bench 4.0 show in this harness comparison?", level: 2 },
          { id: "left-out", text: "What does this harness comparison leave out?", level: 2 },
          { id: "faq", text: "FAQ", level: 2 },
          { id: "citation", text: "Cite or embed", level: 2 },
        ]}
        actions={
          <>
            <a className="btn-primary px-4 py-2 text-sm" href={`${path}/pdf`}>
              Download PDF
            </a>
            <a className="btn-ghost px-4 py-2 text-sm" href={`${path}/csv?table=swe-bash`}>
              Download CSV
            </a>
          </>
        }
        citation={<CiteOrEmbed citation={citation} embed={embed} />}
        related={related}
      >
        <div className="article-prose">
          <p>
            This is the November 2026 agent harness benchmark. It copies public scores for coding agents and the{" "}
            <Link href="/glossary/harness">harnesses</Link> around them. A harness is the loop, tools, and limits
            around a model. The tables use the official SWE-bench leaderboard and the official Terminal-Bench 4.0
            leaderboard. Each row keeps the date on that source. Nothing here is estimated, and a score from another
            website is not filled in when the official board does not list it. The product table is{" "}
            <Link href="/best/ai-agent-harnesses">Best AI agent harness</Link>. How to test one action, rather than a
            whole score, is{" "}
            <Link href="/blog/how-do-you-evaluate-an-ai-agent-harness">How to evaluate an AI agent harness</Link>. How
            to stand up tasks, isolated trials, and graders is{" "}
            <Link href="/blog/how-to-build-an-eval-harness-for-ai-agents">How to build an eval harness for AI agents</Link>
            . The shelf for the guides, the research notes, and this benchmark is the{" "}
            <Link href="/topics/harnesses">agent harnesses hub</Link>. The short pointer page is the{" "}
            <Link href="/trackers/harnesses">harness comparison tracker</Link>. Live install counts are on the{" "}
            <Link href="/trackers">trackers</Link> and the{" "}
            <Link href="/trackers/downloads">downloads tracker</Link>.
          </p>
        </div>
        <NextRead
          reads={[
            {
              href: "/blog/how-do-you-evaluate-an-ai-agent-harness",
              title: "How to evaluate an AI agent harness",
              note: "One observable action, then whether the whole job still finishes.",
            },
            {
              href: "/blog/how-to-build-an-eval-harness-for-ai-agents",
              title: "How to build an eval harness for AI agents",
              note: "Isolate every trial, grade the environment, keep a held-out set.",
            },
            {
              href: "/blog/what-is-an-ai-agent-harness",
              title: "What is an AI agent harness?",
              note: "The workshop these scores are measuring.",
            },
            {
              href: "/best/ai-agent-harnesses",
              title: "Best AI agent harness",
              note: "Licence and list price, not a quality ranking.",
            },
          ]}
          tool={{
            href: "/agent-cost-calculator",
            title: "agent cost calculator",
            note: "a 30-day token bill from official prices",
          }}
        />
        <section className="glass mt-10 rounded-3xl p-6 sm:p-8">
          <h2 id="what-these-numbers-are" className="text-2xl font-semibold tracking-tight">What is this agent harness benchmark?</h2>
          <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
            This agent harness benchmark copies public SWE-bench and Terminal-Bench scores, and it does not fill in a
            score the official board leaves out. SWE-bench Verified is 500 real GitHub issues. The score is the percent
            resolved: the share of issues whose tests passed. The bash-only rows all use mini-SWE-agent, so the harness
            stays the same while the model changes. The SWE-bench site says release 2.x calls tools, while release 1.x
            reads the action out of the model&apos;s text, and that those two generations are not necessarily
            comparable. The version column is the release named on the row.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
            Terminal-Bench 4.0 is the current board on tbench.ai. The agent column changes by row, so those scores
            include Claude Code, Codex, Grok Build, mini-SWE-agent, or Muse Code, not one shared harness. Accuracy
            and the 95% half-width are the fields on the official leaderboard. The cost cell is copied as printed,
            including a partial-trial note where the board includes one.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
            The newest result date on the SWE-bench Verified file, as read on {updatedLabel}, is{" "}
            {swebenchBenchmark.newestResultDate}. The Terminal-Bench 4.0 board record says it was updated{" "}
            {terminalBench.updatedAt}. Read as an AI coding agent benchmark for November 2026, this page is a reading
            of those boards. It is not a claim that either project published a new run in November.
          </p>
        </section>

        <section className="mt-12">
          <h2 id="swe-bench-bash" className="text-2xl font-semibold tracking-tight">What does SWE-bench show when the harness stays the same?</h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-[var(--muted)]">
            These rows all use mini-SWE-agent, so the harness stays the same while the model changes.{" "}
            {swebenchBenchmark.bashOnly.length} rows from the Verified list where the harness is mini-SWE-agent.
            &quot;Team checked&quot; means the SWE-bench page marks the run as performed or checked by the SWE-bench
            team. A &quot;No&quot; means the row is on the official board without that mark. Source:{" "}
            <a className="text-[var(--link)] underline" href={swebenchBenchmark.sourceUrl}>
              swebench.com
            </a>
            , read {updatedLabel}.
          </p>
          <div className="mt-5">
            <SortableTable
              caption="SWE-bench Verified bash-only scores"
              columns={sweColumns}
              rows={sweRows(swebenchBenchmark.bashOnly)}
              defaultSort="resolved"
              downloadHref={`${path}/csv?table=swe-bash`}
            />
          </div>
        </section>

        <section className="mt-12">
          <h2 id="swe-bench-checked" className="text-2xl font-semibold tracking-tight">Which other harnesses did the SWE-bench team check?</h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-[var(--muted)]">
            The SWE-bench team checked {swebenchBenchmark.teamCheckedOther.length} Verified rows that use a harness
            other than mini-SWE-agent. The full list also has {swebenchBenchmark.uncheckedSubmittedCount}{" "}
            submitted rows without that mark. The highest of those is {topUnchecked}. They are named here and left
            out of the table.
          </p>
          <div className="mt-5">
            <SortableTable
              caption="Team-checked SWE-bench Verified rows outside the bash-only harness"
              columns={sweColumns}
              rows={sweRows(swebenchBenchmark.teamCheckedOther)}
              defaultSort="resolved"
              downloadHref={`${path}/csv?table=swe-checked`}
            />
          </div>
        </section>

        <section className="mt-12">
          <h2 id="swe-bench-multilingual" className="text-2xl font-semibold tracking-tight">How does SWE-bench Multilingual compare on one harness?</h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-[var(--muted)]">
            It is a separate task set from Verified, scored here with the same mini-SWE-agent harness, so the percents
            are not a second reading of the 500 Verified issues. {swebenchBenchmark.multilingualInstances} instances,{" "}
            {swebenchBenchmark.multilingual.length} mini-SWE-agent rows on the same official file.
          </p>
          <div className="mt-5">
            <SortableTable
              caption="SWE-bench Multilingual mini-SWE-agent scores"
              columns={sweColumns}
              rows={sweRows(swebenchBenchmark.multilingual)}
              defaultSort="resolved"
              downloadHref={`${path}/csv?table=swe-multilingual`}
            />
          </div>
        </section>

        <section className="mt-12">
          <h2 id="terminal-bench" className="text-2xl font-semibold tracking-tight">What does Terminal-Bench 4.0 show in this harness comparison?</h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-[var(--muted)]">
            The agent column changes by row, so this harness comparison includes Claude Code, Codex, Grok Build,
            mini-SWE-agent, or Muse Code, not one shared harness. {terminalBench.rows.length} rows.{" "}
            {terminalBench.description} Harbor, from the Terminal-Bench authors, is one way to run a task folder
            against those agents; how to build that kind of eval is{" "}
            <Link href="/blog/how-to-build-an-eval-harness-for-ai-agents">How to build an eval harness for AI agents</Link>
            . The board name on Harbor Hub is{" "}
            {terminalBench.name}, and the record was updated {terminalBench.updatedAt}. Read {updatedLabel} from the{" "}
            <a className="text-[var(--link)] underline" href={terminalBench.pageUrl}>
              Terminal-Bench site
            </a>{" "}
            through the public leaderboard it displays. Click a model or agent name when the board supplied a link.
          </p>
          <div className="mt-5">
            <SortableTable
              caption="Terminal-Bench 4.0 official leaderboard"
              columns={terminalColumns}
              rows={terminalRows()}
              defaultSort="rank"
              defaultDirection="asc"
              downloadHref={`${path}/csv?table=terminal-bench`}
            />
          </div>
        </section>

        <section className="mt-12">
          <h2 id="left-out" className="text-2xl font-semibold tracking-tight">What does this harness comparison leave out?</h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-[var(--muted)]">
            A score is left out when it is not on the official board this page read.
          </p>
          <ul className="mt-3 grid gap-3 text-sm leading-relaxed text-[var(--muted)]">
            <li>
              Third-party score roundups, including pages that list SWE-bench results above the official board, are
              not used. If the official file does not contain the row, it is not on this page.
            </li>
            <li>
              SWE-bench Full, Lite, and Multimodal are on swebench.com and were not copied into this month&apos;s
              tables.
            </li>
            <li>
              OSWorld, WebArena, GAIA, and SWE-bench Pro were not read from an official board for this edition, so
              they are not given scores here.
            </li>
            <li>
              The November 3, 2026 paper &quot;You don&apos;t need long context&quot; reports its own SWE-bench
              Verified and Terminal-Bench 2.1 runs. Those are the authors&apos; runs, not rows on the public boards,
              and they stay on the{" "}
              <Link href="/research/you-dont-need-long-context">research note</Link>.
            </li>
            <li>
              A separate note covers{" "}
              <Link href="/research/terminal-bench-2-1-benchmark-repairs">Terminal-Bench 2.1</Link>. This page&apos;s
              Terminal-Bench table is the 4.0 board only.
            </li>
          </ul>
        </section>

        <FaqList
          items={[
            {
              question: "Does a higher percent mean a better product?",
              answer: (
                <p>
                  Only inside one table, and only for the harness named on the row. A bash-only SWE-bench score and a
                  Terminal-Bench score are different tests. A mini-SWE-agent 1.x row and a 2.x row are not described
                  by SWE-bench as a clean comparison.
                </p>
              ),
            },
            {
              question: "Why are some famous models missing?",
              answer: (
                <p>
                  They were not on the official file when it was read on {updatedLabel}. A score that exists only on
                  a recap site is left out. The newest SWE-bench Verified date in that file is{" "}
                  {swebenchBenchmark.newestResultDate}.
                </p>
              ),
            },
            {
              question: "Who checked the runs?",
              answer: (
                <p>
                  The SWE-bench tables have a team-checked column taken from the official file. Terminal-Bench rows
                  are the rows on the official 4.0 board. This site did not re-run the tasks.
                </p>
              ),
            },
            {
              question: "How often does this page change?",
              answer: (
                <p>
                  It is the November 2026 agent harness benchmark. A later month gets its own page when the boards are read again.
                  The <Link href="/reports">reports index</Link> is where that page will be linked.
                </p>
              ),
            },
          ]}
        />
        <ToolCtas tools={["calculator", "checker", "picker"]} />
        <ListYourAgent />
        <div className="mt-14">
          <NewsletterSignup id="report-benchmark" />
        </div>
      </ArticleTemplate>
    </>
  );
}
