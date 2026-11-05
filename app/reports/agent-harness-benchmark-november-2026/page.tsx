import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CiteOrEmbed } from "@/components/CiteOrEmbed";
import { FaqList } from "@/components/FaqList";
import { SortableTable } from "@/components/SortableTable";
import {
  BENCHMARK_READ_ON,
  sweColumns,
  sweRows,
  swebenchBenchmark,
  terminalBench,
  terminalColumns,
  terminalRows,
} from "@/lib/harness-benchmark";
import { JsonLd, defaultMetadata, webPageJsonLd } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";
import { formatDate } from "@/lib/utils";

const path = "/reports/agent-harness-benchmark-november-2026";
const title = "AI Agent Harness Benchmark, November 2026";
const description =
  "Public SWE-bench and Terminal-Bench scores for agent harnesses and coding agents, each with the date on the official source. Read November 5, 2026.";

export const metadata = defaultMetadata(title, description, path);

export default function HarnessBenchmarkPage() {
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
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Reports", path: "/reports" },
          { name: title, path },
        ]}
      />
      <header className="mx-auto max-w-6xl px-4 pb-8 pt-12">
        <p className="kicker kicker-lead">Monthly report</p>
        <h1 className="display mt-3 text-4xl sm:text-5xl">{title}</h1>
        <p className="mt-4 max-w-3xl text-lg leading-relaxed text-[var(--muted)]">
          This page copies public scores for coding agents and the{" "}
          <Link href="/glossary/harness">harnesses</Link> around them. A harness is the loop, tools, and limits
          around a model. The tables use the official SWE-bench leaderboard and the official Terminal-Bench 4.0
          leaderboard. Each row keeps the date on that source. Nothing here is estimated, and a score from another
          website is not filled in when the official board does not list it.
        </p>
        <p className="mt-3 text-sm text-[var(--muted)]">
          Last updated <time dateTime={updated}>{updatedLabel}</time>.
        </p>
      </header>

      <div className="mx-auto max-w-6xl px-4 pb-20">
        <section className="glass rounded-3xl p-6 sm:p-8">
          <h2 className="text-2xl font-semibold tracking-tight">What these numbers are</h2>
          <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
            SWE-bench Verified is 500 real GitHub issues. The score is the percent resolved: the share of issues
            whose tests passed. The bash-only rows all use mini-SWE-agent, so the harness stays the same while the
            model changes. The SWE-bench site says release 2.x calls tools, while release 1.x reads the action out
            of the model&apos;s text, and that those two generations are not necessarily comparable. The version
            column is the release named on the row.
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
            {terminalBench.updatedAt}. This November report is a reading of those boards. It is not a claim that
            either project published a new run in November.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold tracking-tight">SWE-bench Verified, bash only</h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-[var(--muted)]">
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
            />
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold tracking-tight">Other harnesses the SWE-bench team checked</h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-[var(--muted)]">
            {swebenchBenchmark.teamCheckedOther.length} Verified rows that use a harness other than mini-SWE-agent
            and that the board marks as team-checked. The full list also has {swebenchBenchmark.uncheckedSubmittedCount}{" "}
            submitted rows without that mark. The highest of those is {topUnchecked}. They are named here and left
            out of the table.
          </p>
          <div className="mt-5">
            <SortableTable
              caption="Team-checked SWE-bench Verified rows outside the bash-only harness"
              columns={sweColumns}
              rows={sweRows(swebenchBenchmark.teamCheckedOther)}
              defaultSort="resolved"
            />
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold tracking-tight">SWE-bench Multilingual, same harness</h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-[var(--muted)]">
            {swebenchBenchmark.multilingualInstances} instances, {swebenchBenchmark.multilingual.length} mini-SWE-agent
            rows on the same official file. This is a separate task set from Verified, so the percents are not a
            second reading of the 500 Verified issues.
          </p>
          <div className="mt-5">
            <SortableTable
              caption="SWE-bench Multilingual mini-SWE-agent scores"
              columns={sweColumns}
              rows={sweRows(swebenchBenchmark.multilingual)}
              defaultSort="resolved"
            />
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold tracking-tight">Terminal-Bench 4.0</h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-[var(--muted)]">
            {terminalBench.rows.length} rows. {terminalBench.description} The board name on Harbor Hub is{" "}
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
            />
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold tracking-tight">Left out</h2>
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
          </ul>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold tracking-tight">Related on this site</h2>
          <ul className="mt-3 grid gap-2 text-sm">
            <li>
              <Link className="text-[var(--link)] underline" href="/blog/what-is-an-ai-agent-harness">
                What is an AI agent harness?
              </Link>
            </li>
            <li>
              <Link className="text-[var(--link)] underline" href="/glossary/benchmark">
                Benchmark, in the glossary
              </Link>
            </li>
            <li>
              <Link className="text-[var(--link)] underline" href="/directory/category/coding-agents">
                Coding agents in the directory
              </Link>
            </li>
            <li>
              <Link className="text-[var(--link)] underline" href="/directory/category/agent-frameworks">
                Agent frameworks and harnesses
              </Link>
            </li>
            <li>
              <Link className="text-[var(--link)] underline" href="/agent-cost-calculator">
                Agent cost calculator
              </Link>
            </li>
            <li>
              <Link className="text-[var(--link)] underline" href="/trackers/benchmarks">
                Benchmark tracker
              </Link>
            </li>
          </ul>
        </section>

        <div className="mt-12">
          <CiteOrEmbed citation={citation} embed={embed} />
        </div>

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
                  It is the November 2026 edition. A later month gets its own page when the boards are read again.
                  The <Link href="/reports">reports index</Link> is where that page will be linked.
                </p>
              ),
            },
          ]}
        />
      </div>
    </>
  );
}
