import Link from "next/link";
import { RoiCalculator } from "@/components/RoiCalculator";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FaqList } from "@/components/FaqList";
import { PRICE_READ_ON } from "@/lib/model-prices";
import { JsonLd, defaultMetadata, faqPageJsonLd, softwareApplicationJsonLd, webPageJsonLd } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";
import {
  calculateRoi,
  formatBreakEven,
  formatHourValue,
  formatHours,
  formatPayback,
  formatRoi,
  formatUsd,
  roiPath,
  roiPresets,
  sensitivityTable,
  supportTriagePreset,
  verdictHeadline,
  type RoiInput,
  type RoiOk,
} from "@/lib/tools/roi";
import { formatDate } from "@/lib/utils";

const path = "/tools/ai-agent-roi-calculator";
const title = "AI Agent ROI Calculator: payback months and break-even volume";
const description =
  "Free AI agent ROI calculator. Enter tasks, a loaded wage, and the agent bill. See monthly net, annual ROI, payback months, and break-even volume. No login.";
const published = "2026-11-11";

const faqs = [
  {
    question: "What is an AI agent ROI calculator?",
    answer:
      "It compares the cost of a person doing a monthly queue of tasks with the cost of an agent doing that queue, including the time a person still spends reviewing and redoing failures. You get monthly net savings, an annual ROI, payback months, and the task volume where the month breaks even.",
  },
  {
    question: "How do you calculate annual ROI on this page?",
    answer:
      "Annual ROI % = (12 × monthly net − setup) / (setup + 12 × monthly agent cost) × 100. Monthly net is the human cost of doing the work yourself, minus the human time left in the agent scenario, minus the monthly agent bill. If setup and the monthly agent bill are both zero, the denominator is zero and ROI is not defined.",
  },
  {
    question: "What does payback months mean?",
    answer:
      "Payback months = setup ÷ monthly net. That is how many months of net savings cover the one-time setup. If setup is $0, payback is immediate. If monthly net is zero or negative and setup is above zero, the page says never pays back.",
  },
  {
    question: "How do you get the break-even task volume?",
    answer:
      "Break-even tasks per month = the monthly platform cost divided by the per-task margin. The margin is the human dollars saved on one task, after review and rework, minus the agent cost of that task. If the margin is zero or negative, there is no break-even. A bigger queue does not fix a task that loses money.",
  },
  {
    question: "Where does the agent cost per task come from?",
    answer:
      "You type it. The optional model list only fills a token price from the same official prices as the AI agent cost calculator, read November 9, 2026. That fill is not a seat, a tool-call fee, or a measured cost for your task. A price that is not in that list is not invented here.",
  },
  {
    question: "Are the preset scenarios benchmarks?",
    answer:
      "No. Support ticket triage, code review, lead research, and invoice processing are example inputs so the math is visible. They are not measured workloads, and they are not industry averages.",
  },
  {
    question: "Is what I type stored?",
    answer:
      "No. The calculation stays in the browser. The share link puts the inputs in the address bar so you can send the same case. This site does not receive the form.",
  },
  {
    question: "How is this different from the AI agent cost calculator?",
    answer:
      "The cost calculator estimates a 30-day token bill from official per-token prices. This page takes a dollar cost per task, a person’s time, and a success rate, and returns whether that spend pays back. Use the cost calculator when you need the token price. Paste or type that price here.",
  },
  {
    question: "Why can a high success rate still lose money?",
    answer:
      "Success only changes the rework term. Review minutes are spent on every task, including the ones that succeed. A platform fee is spent even when the queue is small. If review plus the agent bill costs more than the human time removed, a 95% success rate can still show a negative month.",
  },
];

const steps = [
  {
    title: "Count the queue",
    body: "Tasks per month, and the minutes a person spends on one task today. Use a month you can defend, not a hoped-for volume.",
  },
  {
    title: "Price the person and the agent",
    body: "Loaded hourly cost is the wage plus the load you already pay. Agent cost per task is a number you type, or a token price from the model list. Add the monthly platform fee on its own line.",
  },
  {
    title: "Set what a person still does",
    body: "Success rate, review minutes on every task, and rework minutes when the agent fails and a person redoes the task. A success rate of 100 with rework minutes above zero ignores the rework. The failure share is zero.",
  },
  {
    title: "Read payback, then move one input",
    body: "The verdict, the success-rate table, and the break-even volume update as you type. Copy the summary, download CSV or Markdown, or copy the share link. The link carries every input.",
  },
];

const siblings = [
  {
    href: "/agent-cost-calculator",
    title: "AI agent cost calculator",
    body: "A 30-day token bill from official prices, read November 9, 2026. Use it when the per-task box should be a token price.",
  },
  {
    href: "/tools/cursor-vs-claude-code-vs-codex-pricing",
    title: "Cursor vs Claude Code vs Codex pricing",
    body: "Seat prices read from the vendors. A seat is not a payback period.",
  },
  {
    href: "/tools/agent-picker",
    title: "Which AI agent fits me?",
    body: "Four questions, then three directory listings.",
  },
  {
    href: "/tools/agents-md-generator",
    title: "AGENTS.md generator",
    body: "Draft the file a coding agent reads. Copy or download. Nothing is stored.",
  },
];

function ready(input: RoiInput): RoiOk {
  const result = calculateRoi(input);
  if (!result.ok) throw new Error(result.message);
  return result;
}

export const metadata = defaultMetadata(title, description, path, { absoluteTitle: true });

export default function AiAgentRoiCalculatorPage() {
  const support = ready(supportTriagePreset.input);
  const reviewCliff = ready({ ...supportTriagePreset.input, reviewMinutes: 6.25 });
  const examples = roiPresets.map((preset) => ({ preset, result: ready(preset.input) }));
  const sensitivity = sensitivityTable(supportTriagePreset.input);
  const priceChecked = formatDate(PRICE_READ_ON);

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
            name: "AI Agent ROI Calculator",
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
          { name: "AI agent ROI calculator", path },
        ]}
      />
      <header className="mx-auto max-w-6xl px-4 pb-4 pt-8">
        <p className="kicker kicker-lead">Free tool</p>
        <h1 className="display mt-2 text-3xl sm:text-4xl">{title}</h1>
        <p className="mt-3 max-w-3xl text-lg leading-relaxed text-[var(--muted)]">
          Enter tasks, minutes, a loaded wage, and the agent bill. See monthly net savings, annual ROI, payback
          months, and the task volume where net is zero.
        </p>
        <p className="mt-2 text-sm text-[var(--muted)]">
          The math runs in your browser. Nothing you type is stored. The worked example is{" "}
          <Link className="text-[var(--link)] underline" href="/blog/does-a-support-triage-agent-pay-back">
            Does a support-triage agent pay back?
          </Link>
        </p>
      </header>
      <div className="mx-auto max-w-6xl px-4 pb-20">
        <RoiCalculator />

        <section className="mt-14" aria-labelledby="how-to">
          <h2 id="how-to" className="text-2xl font-semibold tracking-tight">
            What do you type?
          </h2>
          <ol className="mt-4 grid gap-4">
            {steps.map((step, index) => (
              <li key={step.title} className="glass rounded-3xl p-5">
                <p className="kicker">Step {index + 1}</p>
                <h3 className="mt-2 text-lg font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{step.body}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-14" id="formula" aria-labelledby="formula-heading">
          <h2 id="formula-heading" className="text-2xl font-semibold tracking-tight">
            What does the formula count?
          </h2>
          <div className="mt-3 max-w-3xl text-sm leading-relaxed text-[var(--muted)]">
            <p>
              Baseline human cost is tasks × minutes per task ÷ 60 × the loaded hourly cost. That is the month if a
              person keeps doing the queue.
            </p>
            <p className="mt-3">
              In the agent scenario, a person still spends the review minutes on every task, and the rework minutes on
              the share that fails. Agent-scenario human time is tasks × review minutes, plus tasks × (1 − success
              rate) × rework minutes. Monthly hours saved are the baseline hours minus those remaining human hours.
            </p>
            <p className="mt-3">
              Monthly agent cost is tasks × the cost per task, plus the monthly platform fee. Monthly net savings are
              the baseline human cost minus the remaining human cost minus that agent bill.
            </p>
            <p className="mt-3">
              Annual ROI uses one definition: (12 × monthly net − setup) / (setup + 12 × monthly agent cost) × 100.
              Payback months are setup ÷ monthly net. Setup of $0 is immediate. Monthly net at or below zero, with
              setup above zero, never pays back. Break-even tasks per month are the platform fee divided by the
              per-task margin. If that margin is not positive, the page says no break-even.
            </p>
            <p className="mt-3">
              The verdict is loses money when monthly net is below zero, breaks even when it is zero, and marginal
              when net is positive and payback is longer than 12 months. A shorter payback, or a setup of zero with a
              positive net, pays back.
            </p>
          </div>
        </section>

        <section className="mt-14" aria-labelledby="examples">
          <h2 id="examples" className="text-2xl font-semibold tracking-tight">
            What do the example inputs return?
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[var(--muted)]">
            Example inputs, not benchmarks. Each row is the preset button above, calculated by the same function as
            the form. The{" "}
            <Link className="text-[var(--link)] underline" href="/blog/does-a-support-triage-agent-pay-back">
              support-triage walkthrough
            </Link>{" "}
            uses the first row and{" "}
            <Link className="text-[var(--link)] underline" href={roiPath(supportTriagePreset.input)}>
              opens it already filled in
            </Link>
            .
          </p>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[720px] border-collapse text-sm">
              <thead>
                <tr className="border-b border-[var(--stroke)] text-left">
                  <th className="py-2 pr-4 font-semibold">Example</th>
                  <th className="py-2 pr-4 font-semibold">Monthly net</th>
                  <th className="py-2 pr-4 font-semibold">Annual ROI</th>
                  <th className="py-2 pr-4 font-semibold">Payback</th>
                  <th className="py-2 font-semibold">Break-even</th>
                </tr>
              </thead>
              <tbody>
                {examples.map(({ preset, result }) => (
                  <tr key={preset.id} className="border-b border-[var(--stroke)]">
                    <th className="py-2 pr-4 text-left font-medium" scope="row">
                      {preset.title}
                    </th>
                    <td className="py-2 pr-4 tabular-nums">{formatUsd(result.monthlyNet)}</td>
                    <td className="py-2 pr-4 tabular-nums">{formatRoi(result.annualRoiPercent)}</td>
                    <td className="py-2 pr-4">{formatPayback(result.payback)}</td>
                    <td className="py-2">{formatBreakEven(result.breakEven)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 max-w-3xl text-sm leading-relaxed text-[var(--muted)]">
            <p>
              Support ticket triage, as filled: 2,000 tasks, 8 minutes, $45 an hour, $0.04 per task, 80% success, 2
              minutes of review, 8 minutes of rework, $2,000 setup, $150 platform. A person spends{" "}
              {formatHours(support.baselineHours)} today, at {formatUsd(support.baselineHumanCost)}. Review puts back{" "}
              {formatHourValue(support.reviewHours)} of those hours. Failed tasks put back{" "}
              {formatHourValue(support.reworkHours)}. Hours saved: {formatHours(support.hoursSaved)}. The agent bill is{" "}
              {formatUsd(support.monthlyAgentCost)}. {verdictHeadline(support)}. Monthly net is{" "}
              {formatUsd(support.monthlyNet)}. Annual ROI is {formatRoi(support.annualRoiPercent)}. Break-even volume
              is {formatBreakEven(support.breakEven)}.
            </p>
            <p className="mt-3">
              Hold that example still and set review to 6.25 minutes. Monthly net becomes{" "}
              {formatUsd(reviewCliff.monthlyNet)}. {verdictHeadline(reviewCliff)}. The success-rate table below keeps
              review at 2 minutes. From 60% to 95%, the example still pays back in under a month. Success is not the
              input that flips it.
            </p>
          </div>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse text-sm">
              <caption className="mb-2 text-left text-[var(--muted)]">
                Support-ticket example only. Other inputs stay at the preset. Not a benchmark.
              </caption>
              <thead>
                <tr className="border-b border-[var(--stroke)] text-left">
                  <th className="py-2 pr-4 font-semibold">Success</th>
                  <th className="py-2 pr-4 font-semibold">Monthly net</th>
                  <th className="py-2 pr-4 font-semibold">Annual ROI</th>
                  <th className="py-2 font-semibold">Payback</th>
                </tr>
              </thead>
              <tbody>
                {sensitivity.map((row) => (
                  <tr key={row.successPercent} className="border-b border-[var(--stroke)]">
                    <th className="py-2 pr-4 text-left font-medium tabular-nums" scope="row">
                      {row.successPercent}%
                    </th>
                    <td className="py-2 pr-4 tabular-nums">{row.result.ok ? formatUsd(row.result.monthlyNet) : "—"}</td>
                    <td className="py-2 pr-4 tabular-nums">
                      {row.result.ok ? formatRoi(row.result.annualRoiPercent) : "—"}
                    </td>
                    <td className="py-2">{row.result.ok ? formatPayback(row.result.payback) : "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-14">
          <h2 className="text-2xl font-semibold tracking-tight">Which tool do you open next?</h2>
          <ul className="mt-4 grid gap-4 sm:grid-cols-2">
            {siblings.map((tool) => (
              <li key={tool.href} className="glass rounded-3xl p-5">
                <h3 className="font-semibold">
                  <Link href={tool.href}>{tool.title}</Link>
                </h3>
                <p className="mt-2 text-sm text-[var(--muted)]">{tool.body}</p>
                <Link href={tool.href} className="mt-3 inline-block text-sm text-[var(--link)] underline">
                  Use tool
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-14">
          <h2 className="text-2xl font-semibold tracking-tight">Next steps</h2>
          <ul className="mt-3 grid gap-2 text-sm">
            <li>
              <Link className="text-[var(--link)] underline" href="/blog/does-a-support-triage-agent-pay-back">
                Does a support-triage agent pay back?
              </Link>
              <span className="text-[var(--muted)]"> walks the first example, then the input that flips it.</span>
            </li>
            <li>
              <Link className="text-[var(--link)] underline" href="/blog/how-much-does-an-ai-employee-cost">
                How much does an AI employee cost for a small business?
              </Link>
              <span className="text-[var(--muted)]">
                {" "}
                prices named AI employees from vendor pages read November 11, 2026, then runs a 400-email inbox at the
                BLS median wage.
              </span>
            </li>
            <li>
              <Link className="text-[var(--link)] underline" href="/blog/voice-ai-agent-cost-per-call-november-2026">
                What a voice AI agent costs per call
              </Link>
              <span className="text-[var(--muted)]">
                {" "}
                prices 1,000 and 10,000 three-minute calls from the vendors&apos; pages, read November 11, 2026.
              </span>
            </li>
            <li>
              <Link className="text-[var(--link)] underline" href="/agent-cost-calculator">
                AI agent cost calculator
              </Link>
              <span className="text-[var(--muted)]">
                {" "}
                for a token price. Prices were read {priceChecked}.
              </span>
            </li>
            <li>
              <Link className="text-[var(--link)] underline" href="/trackers">
                Live trackers
              </Link>
              <span className="text-[var(--muted)]">
                {" "}
                and the{" "}
                <Link className="text-[var(--link)] underline" href="/trackers/downloads">
                  downloads tracker
                </Link>{" "}
                if you are choosing a framework, not pricing a queue.
              </span>
            </li>
            <li>
              <Link className="text-[var(--link)] underline" href="/submit">
                Submit or claim a listing
              </Link>
              <span className="text-[var(--muted)]"> if you ship an agent and want it in the directory.</span>
            </li>
            <li>
              <Link className="text-[var(--link)] underline" href="/tools">
                All free tools
              </Link>
              <span className="text-[var(--muted)]"> on one page.</span>
            </li>
          </ul>
          <p className="mt-4 text-sm text-[var(--muted)]">
            Canonical URL:{" "}
            <a className="text-[var(--link)] underline" href={absoluteUrl(path)}>
              {absoluteUrl(path)}
            </a>
          </p>
        </section>

        <FaqList
          heading="Questions people ask before they trust a payback number"
          lead="The answers describe this page’s formula. They do not describe your vendor’s invoice."
          items={faqs.map((item) => ({ question: item.question, answer: <p>{item.answer}</p> }))}
        />
      </div>
    </>
  );
}
