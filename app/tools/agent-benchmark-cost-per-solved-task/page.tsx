import Link from "next/link";
import { BenchmarkCostCalculator } from "@/components/BenchmarkCostCalculator";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FaqList } from "@/components/FaqList";
import { NextRead } from "@/components/NextRead";
import {
  BENCHMARK_COST_CHECKED,
  benchmarkBoards,
  benchmarkCostDescription,
  benchmarkCostPath,
  benchmarkCostTitle,
  cheapestSweBash,
  cheapestTerminal,
  dearestSweBash,
  dearestTerminal,
  projectCost,
  runsForBoard,
} from "@/lib/tools/benchmark-cost";
import { JsonLd, defaultMetadata, faqPageJsonLd, softwareApplicationJsonLd, webPageJsonLd } from "@/lib/seo";
import { formatDate } from "@/lib/utils";

const path = benchmarkCostPath;
const title = benchmarkCostTitle;
const description = benchmarkCostDescription;
const published = "2026-11-14";

const unpricedOther = runsForBoard("swe-verified-other").filter((run) => run.perSolved == null).length;
const otherCount = runsForBoard("swe-verified-other").length;
const partialTerminal = runsForBoard("terminal-bench-4").filter((run) => run.partial);

const faqs = [
  {
    question: "What is the cost per solved task on these boards?",
    answer: `On SWE-bench Verified with mini-SWE-agent, ${cheapestSweBash.model} lists ${cheapestSweBash.costLabel} for ${cheapestSweBash.solvedLabel} resolved issues, ${cheapestSweBash.perSolvedLabel} per solved task. On Terminal-Bench 4.0, ${dearestTerminal.harness} with ${dearestTerminal.model} lists ${dearestTerminal.costLabel} for ${dearestTerminal.solvedLabel} successes, ${dearestTerminal.perSolvedLabel} each. The file was read ${formatDate(BENCHMARK_COST_CHECKED)}.`,
  },
  {
    question: "How is tasks resolved calculated?",
    answer: `SWE-bench rows store a percent. Tasks resolved are that percent times the instance count in the file: ${benchmarkBoards[0].instances} for Verified and ${benchmarkBoards[2].instances} for Multilingual. Terminal-Bench rows store successes and trials, and the division uses successes. A percent that does not land on a whole number stays at one decimal. This page does not round it to a hidden integer before dividing.`,
  },
  {
    question: "Why do some rows say Not listed?",
    answer: `${unpricedOther} of ${otherCount} team-checked SWE-bench rows outside mini-SWE-agent have no run cost in the file. ${partialTerminal.length} Terminal-Bench row prints a partial cost, ${partialTerminal.map((run) => `${run.harness} · ${run.model}: ${run.costLabel}`).join("; ") || "none"}. Those rates stay Not listed. A listed $0.00 stays $0.00.`,
  },
  {
    question: "Does the projection estimate a missing cost?",
    answer:
      "No. N times the listed cost per solved task is a projection of that listed rate. If the row’s cost is missing or partial, the projection is Not listed. The number is not a quote for your repository, and it is not a fill-in for a board cell the file left blank.",
  },
  {
    question: "Is what I select stored?",
    answer:
      "No. The calculation stays in the browser. The share link puts the run and N in the address bar. This site does not receive the form, and there is no email field.",
  },
];

export const metadata = defaultMetadata(title, description, path, { absoluteTitle: true });

export default function AgentBenchmarkCostPage() {
  const checked = formatDate(BENCHMARK_COST_CHECKED);
  const sweHundred = projectCost(cheapestSweBash, 100);
  const terminalHundred = projectCost(dearestTerminal, 100);

  return (
    <>
      <JsonLd
        data={[
          webPageJsonLd({
            title,
            description,
            path,
            datePublished: published,
            dateModified: published,
          }),
          faqPageJsonLd(faqs),
          softwareApplicationJsonLd({
            name: "Agent benchmark cost per solved task",
            url: path,
            description,
            applicationCategory: "BusinessApplication",
            operatingSystem: "Web",
            isAccessibleForFree: true,
            offers: { price: 0, priceCurrency: "USD" },
          }),
        ]}
      />
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Tools", path: "/tools" },
          { name: "Agent benchmark cost per solved task", path },
        ]}
      />
      <header className="mx-auto max-w-6xl px-4 pb-4 pt-8">
        <p className="kicker kicker-lead">Free tool</p>
        <h1 className="display mt-2 text-3xl sm:text-4xl">{title}</h1>
        <p className="mt-3 max-w-3xl text-lg leading-relaxed text-[var(--muted)]">
          Pick a harness and model from the November 2026 boards. The page divides the listed run cost by the tasks
          that run resolved. Then it multiplies that rate by a task count you type.
        </p>
        <p className="mt-2 text-sm text-[var(--muted)]">
          The rows were read {checked}. They are the same file as the{" "}
          <Link className="text-[var(--link)] underline" href="/reports/agent-harness-benchmark-november-2026">
            agent harness benchmark, November 2026
          </Link>
          . A cell with no cost stays Not listed.
        </p>
      </header>
      <div className="mx-auto max-w-6xl px-4 pb-20">
        <BenchmarkCostCalculator />

        <section className="mt-14" aria-labelledby="what-one-solved-task-costs">
          <h2 id="what-one-solved-task-costs" className="text-2xl font-semibold tracking-tight">
            What does one solved task cost on these boards?
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[var(--muted)]">
            {cheapestSweBash.perSolvedLabel} on the cheapest positive SWE-bench Verified row, and{" "}
            {dearestTerminal.perSolvedLabel} on the dearest Terminal-Bench 4.0 row.
          </p>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[var(--muted)]">
            {cheapestSweBash.harness} with {cheapestSweBash.model}, result date {cheapestSweBash.date}, resolved{" "}
            {cheapestSweBash.scoreLabel}. The file lists the run cost as {cheapestSweBash.costLabel}. Divided by{" "}
            {cheapestSweBash.solvedLabel} resolved issues, that is {cheapestSweBash.perSolvedLabel} per solved task.
            The dearest positive row on the same mini-SWE-agent list is {dearestSweBash.model},{" "}
            {dearestSweBash.costLabel} for {dearestSweBash.solvedLabel} resolved issues, {dearestSweBash.perSolvedLabel}{" "}
            each, at {dearestSweBash.scoreLabel}.
          </p>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[var(--muted)]">
            Terminal-Bench is a different test, and the harness changes by row. {dearestTerminal.harness} with{" "}
            {dearestTerminal.model}, dated {dearestTerminal.date}, lists {dearestTerminal.costLabel} for{" "}
            {dearestTerminal.scoreLabel}. {dearestTerminal.costLabel} divided by {dearestTerminal.solvedLabel} successes
            is {dearestTerminal.perSolvedLabel}. The cheapest positive listed rate on that board is{" "}
            {cheapestTerminal.harness} with {cheapestTerminal.model}: {cheapestTerminal.costLabel} for{" "}
            {cheapestTerminal.scoreLabel}, {cheapestTerminal.perSolvedLabel} per success. A listed $0.00 stays $0.00 and
            is not treated as the cheapest positive rate.
          </p>
        </section>

        <section className="mt-14" aria-labelledby="not-listed">
          <h2 id="not-listed" className="text-2xl font-semibold tracking-tight">
            Which rows stay Not listed?
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[var(--muted)]">
            Every team-checked SWE-bench row that is not mini-SWE-agent, and the one Terminal-Bench cost the board
            marked partial.
          </p>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[var(--muted)]">
            {unpricedOther} of {otherCount} rows on the team-checked table have no <code>costUsd</code> in the file
            read {checked}. Their cost per solved task is Not listed.{" "}
            {partialTerminal.map((run) => `${run.harness} with ${run.model} prints ${run.costLabel}`).join(" ")} That
            partial figure is not divided and not scaled up to 330 trials. The{" "}
            <Link className="text-[var(--link)] underline" href="/reports/agent-harness-benchmark-november-2026">
              harness benchmark
            </Link>{" "}
            copies the same cells and does not fill a blank.
          </p>
        </section>

        <section className="mt-14" aria-labelledby="project-n">
          <h2 id="project-n" className="text-2xl font-semibold tracking-tight">
            What changes when you project N tasks of your own?
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[var(--muted)]">
            The listed rate times N, rounded to the cent. A missing rate stays Not listed.
          </p>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[var(--muted)]">
            At N = 100, {cheapestSweBash.model} is {sweHundred?.label ?? "Not listed"} and {dearestTerminal.model} is{" "}
            {terminalHundred?.label ?? "Not listed"}. Change N and both move. The
            product assumes your task costs what one resolved issue, or one Terminal-Bench success, cost on that row.
            It does not know your repository, your retries, or a model the file does not list. A token bill from
            published per-token prices, which is a different meter, is the{" "}
            <Link className="text-[var(--link)] underline" href="/agent-cost-calculator">
              agent cost calculator
            </Link>
            .
          </p>
        </section>

        <div className="mt-14">
          <NextRead
            reads={[
              {
                href: "/reports/agent-harness-benchmark-november-2026",
                title: "Agent harness benchmark, November 2026",
                note: "The SWE-bench and Terminal-Bench rows this calculator divides.",
              },
              {
                href: "/best/ai-agent-harnesses",
                title: "Best AI agent harness",
                note: "Licence and list price. Not a cost per solved task.",
              },
              {
                href: "/tools/ai-agent-harness-evaluation-checklist",
                title: "AI agent harness evaluation checklist",
                note: "Twelve yes-or-no checks. The count is not a board score.",
              },
              {
                href: "/blog/how-to-build-an-eval-harness-for-ai-agents",
                title: "How to build an eval harness for AI agents",
                note: "Tasks, isolated trials, and a grader, before you trust one row.",
              },
            ]}
            tool={{
              href: "/tools/ai-agent-harness-evaluation-checklist",
              title: "harness evaluation checklist",
              note: "twelve sourced checks, counted in the browser",
            }}
          />
        </div>

        <FaqList items={faqs.map((item) => ({ question: item.question, answer: item.answer }))} />
      </div>
    </>
  );
}
