"use client";

import { useMemo, useRef, useState } from "react";
import { trackGoal } from "@/lib/analytics";
import {
  bandLabel,
  pointsFor,
  readinessChecks,
  readinessGroups,
  readinessScore,
  type ReadinessAnswer,
} from "@/lib/shopping-readiness";

const TOOL_SLUG = "shopping-agent-readiness-checker";

const choices = [
  ["yes", "Yes, this is true"],
  ["partial", "Partly"],
  ["no", "No"],
] as const;

export function ShoppingReadinessChecker() {
  const [answers, setAnswers] = useState<Record<string, ReadinessAnswer>>({});
  const [copied, setCopied] = useState(false);
  const ran = useRef(false);
  const result = useMemo(() => readinessScore(answers), [answers]);

  function mark(id: string, value: ReadinessAnswer) {
    setAnswers((current) => ({ ...current, [id]: value }));
    setCopied(false);
    if (ran.current) return;
    ran.current = true;
    trackGoal("tool_run", { tool_slug: TOOL_SLUG });
  }

  async function copyGaps() {
    const lines = [
      `Shopping agent readiness: ${result.earned} of 100.`,
      bandLabel(result.earned, result.openWeight),
      "Weights are this site’s worksheet. They are not a Google score, an OpenAI score, or a completed order.",
      "",
    ];
    if (!result.gaps.length) {
      lines.push(result.unanswered ? "No gap on the rows you marked." : "No gap on the 18 rows.");
    } else {
      lines.push("Gaps, largest missing points first:");
      for (const gap of result.gaps) {
        const got = pointsFor(gap.answer, gap.weight);
        lines.push(
          `- ${gap.prompt} (${got} of ${gap.weight}). ${gap.answer === "partial" ? gap.partialMeans : gap.fix}`,
        );
      }
    }
    try {
      await navigator.clipboard.writeText(lines.join("\n"));
    } catch {
      return;
    }
    setCopied(true);
    trackGoal("tool_output_used", { tool_slug: TOOL_SLUG, action: "copy_result" });
  }

  return (
    <form className="grid gap-8" onSubmit={(event) => event.preventDefault()} aria-describedby="readiness-score">
      <div id="readiness-score" className="glass rounded-3xl p-5 text-sm leading-relaxed">
        <p>
          Score: <strong>{result.earned}</strong> of 100. Answered weight: <strong>{result.answeredWeight}</strong>.
          Still blank: <strong>{result.openWeight}</strong> points across <strong>{result.unanswered}</strong> rows.
        </p>
        <p className="mt-2">{bandLabel(result.earned, result.openWeight)}</p>
        <p className="mt-2 text-[var(--muted)]">
          Yes scores the full weight. Partly scores half. No scores zero. The weights are this desk’s. Nothing you
          mark is stored, and the answers are not sent with the page view.
        </p>
      </div>
      {readinessGroups.map((group) => (
        <section key={group.id} aria-labelledby={group.id}>
          <h2 id={group.id} className="text-2xl font-semibold tracking-tight">
            {group.heading}
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-[var(--muted)]">{group.answer}</p>
          <ul className="mt-4 grid gap-4">
            {readinessChecks
              .filter((check) => check.group === group.id)
              .map((check) => (
                <li key={check.id} className="glass rounded-3xl p-5">
                  <fieldset>
                    <legend className="text-base font-semibold leading-snug">
                      {check.prompt}{" "}
                      <span className="font-medium text-[var(--muted)]">({check.weight} points)</span>
                    </legend>
                    <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                      Partly means: {check.partialMeans}
                    </p>
                    <p className="mt-2 text-sm">
                      <a className="text-[var(--link)] underline" href={check.sourceUrl}>
                        {check.sourceName}
                      </a>
                    </p>
                    <div className="mt-3 flex flex-wrap gap-3">
                      {choices.map(([value, label]) => (
                        <label
                          key={value}
                          className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-[var(--stroke)] bg-white/70 px-3 py-2 text-sm"
                        >
                          <input
                            type="radio"
                            name={check.id}
                            value={value}
                            checked={answers[check.id] === value}
                            onChange={() => mark(check.id, value)}
                          />
                          {label}
                        </label>
                      ))}
                    </div>
                  </fieldset>
                </li>
              ))}
          </ul>
        </section>
      ))}
      <section aria-labelledby="gap-list">
        <h2 id="gap-list" className="text-2xl font-semibold tracking-tight">
          Which gaps cost the most points?
        </h2>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-[var(--muted)]">
          {result.gaps.length
            ? "The largest missing weight is first. The fix is the one tied to that row’s source."
            : result.unanswered
              ? "No gap yet on the rows you marked. Blank rows are not counted as failures."
              : "No gap on the 18 rows. The worksheet is full. It is still not a completed order."}
        </p>
        {result.gaps.length ? (
          <ol className="mt-4 grid gap-4">
            {result.gaps.map((gap) => (
              <li key={gap.id} className="glass rounded-3xl p-5 text-sm leading-relaxed">
                <p className="font-semibold">
                  {gap.missing} points open · {gap.prompt}
                </p>
                <p className="mt-2 text-[var(--muted)]">{gap.answer === "partial" ? gap.partialMeans : gap.fix}</p>
                {gap.answer === "partial" ? <p className="mt-2">{gap.fix}</p> : null}
              </li>
            ))}
          </ol>
        ) : null}
        <p className="mt-4 flex flex-wrap gap-3">
          <button type="button" className="btn-primary px-4 py-2 text-sm" onClick={() => void copyGaps()}>
            {copied ? "Copied" : "Copy the gap list"}
          </button>
          <button
            type="button"
            className="btn-ghost px-4 py-2 text-sm"
            onClick={() => {
              setAnswers({});
              setCopied(false);
            }}
          >
            Clear the worksheet
          </button>
        </p>
      </section>
    </form>
  );
}
