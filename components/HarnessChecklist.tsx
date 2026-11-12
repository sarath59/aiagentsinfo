"use client";

import { useMemo, useRef, useState } from "react";
import { trackGoal } from "@/lib/analytics";
import { checklistGroups, checklistItems } from "@/lib/harness-checklist";

type Answer = "yes" | "not-yet";

const TOOL_SLUG = "ai-agent-harness-evaluation-checklist";

async function copyText(value: string) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(value);
    return;
  }
  const area = document.createElement("textarea");
  area.value = value;
  area.setAttribute("readonly", "");
  area.style.position = "fixed";
  area.style.left = "-9999px";
  document.body.appendChild(area);
  area.select();
  document.execCommand("copy");
  area.remove();
}

export function HarnessChecklist() {
  const [answers, setAnswers] = useState<Record<string, Answer>>({});
  const [copied, setCopied] = useState(false);
  const [copyNote, setCopyNote] = useState("");
  const ran = useRef(false);

  const counts = useMemo(() => {
    let yes = 0;
    let open = 0;
    for (const item of checklistItems) {
      if (answers[item.id] === "yes") yes += 1;
      else if (answers[item.id] === "not-yet") open += 1;
    }
    return { yes, open, unanswered: checklistItems.length - yes - open };
  }, [answers]);

  async function copyResult() {
    const lines = [
      `AI agent harness evaluation checklist: ${counts.yes} of ${checklistItems.length} marked yes.`,
      `Still open: ${counts.open}. Unanswered: ${counts.unanswered}.`,
      "This count is a worksheet. It is not a SWE-bench score, a Terminal-Bench score, or a rank.",
      "",
    ];
    for (const item of checklistItems) {
      const answer = answers[item.id];
      const label = answer === "yes" ? "Yes" : answer === "not-yet" ? "Not yet" : "Unanswered";
      lines.push(`${label}. ${item.prompt}`);
    }
    try {
      await copyText(lines.join("\n"));
      trackGoal("tool_output_used", { tool_slug: TOOL_SLUG, action: "copy_result" });
      setCopyNote("");
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
      setCopyNote("The browser did not copy that.");
    }
  }

  return (
    <form
      className="grid gap-8"
      onSubmit={(event) => event.preventDefault()}
      aria-describedby="checklist-count"
    >
      <p id="checklist-count" className="glass rounded-3xl p-5 text-sm leading-relaxed">
        Marked yes: <strong>{counts.yes}</strong> of {checklistItems.length}. Still open:{" "}
        <strong>{counts.open}</strong>. Unanswered: <strong>{counts.unanswered}</strong>. This count is your
        worksheet. It is not a SWE-bench score, a Terminal-Bench score, or a rank. Nothing you mark is saved.
      </p>
      {checklistGroups.map((group) => (
        <section key={group.id} aria-labelledby={group.id}>
          <h2 id={group.id} className="text-2xl font-semibold tracking-tight">
            {group.heading}
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-[var(--muted)]">{group.answer}</p>
          <ul className="mt-4 grid gap-4">
            {group.items.map((item) => (
              <li key={item.id} className="glass rounded-3xl p-5">
                <fieldset>
                  <legend className="text-base font-semibold leading-snug">{item.prompt}</legend>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{item.sourceSays}</p>
                  <p className="mt-2 text-sm">
                    <a className="text-[var(--link)] underline" href={item.sourceUrl}>
                      {item.sourceName}
                    </a>
                  </p>
                  <div className="mt-3 flex flex-wrap gap-3">
                    {(
                      [
                        ["yes", "Yes, this is true"],
                        ["not-yet", "Not yet"],
                      ] as const
                    ).map(([value, label]) => (
                      <label
                        key={value}
                        className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-[var(--stroke)] bg-white/70 px-3 py-2 text-sm"
                      >
                        <input
                          type="radio"
                          name={item.id}
                          value={value}
                          checked={answers[item.id] === value}
                          onChange={() => {
                            setAnswers((current) => ({ ...current, [item.id]: value }));
                            if (ran.current) return;
                            ran.current = true;
                            trackGoal("tool_run", { tool_slug: TOOL_SLUG });
                          }}
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
      <p className="flex flex-wrap items-center gap-3">
        <button type="button" className="btn-primary px-4 py-2 text-sm" onClick={() => void copyResult()}>
          {copied ? "Copied" : "Copy result"}
        </button>
        <button
          type="button"
          className="btn-ghost px-4 py-2 text-sm"
          onClick={() => {
            setAnswers({});
            setCopied(false);
            setCopyNote("");
          }}
        >
          Clear the worksheet
        </button>
        {copyNote ? <span className="text-sm text-[var(--muted)]">{copyNote}</span> : null}
      </p>
    </form>
  );
}
