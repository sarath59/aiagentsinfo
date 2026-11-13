"use client";

import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import { trackGoal, trackTool } from "@/lib/analytics";
import {
  availableUses,
  recommendAgents,
  type PickerAnswers,
  type PickerListing,
  type PickerMatch,
} from "@/lib/agent-picker";

const TOOL_SLUG = "agent-picker";

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

function resultText(result: { note: string; matches: PickerMatch[] }) {
  const lines = [result.note, ""];
  result.matches.forEach((match, index) => {
    lines.push(`${index + 1}. ${match.name}`);
    lines.push(match.summary);
    lines.push(match.why);
    if (match.missed.length) lines.push(`Misses: ${match.missed.join(". ")}.`);
    lines.push("");
  });
  return lines.join("\n").trim();
}

export function AgentPicker({ listings, compact = false }: { listings: PickerListing[]; compact?: boolean }) {
  const uses = useMemo(() => availableUses(listings), [listings]);
  const [useCase, setUseCase] = useState<PickerAnswers["useCase"]>(uses[0]?.id ?? "any");
  const [budget, setBudget] = useState<PickerAnswers["budget"]>("paid-ok");
  const [openSource, setOpenSource] = useState<PickerAnswers["openSource"]>("either");
  const [build, setBuild] = useState<PickerAnswers["build"]>("either");
  const [result, setResult] = useState<{ note: string; matches: PickerMatch[] } | null>(null);
  const [copied, setCopied] = useState(false);
  const [copyNote, setCopyNote] = useState("");
  const tracked = useRef(false);

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const next = recommendAgents(listings, { useCase, budget, openSource, build });
    setResult(next);
    setCopied(false);
    setCopyNote("");
    trackTool("tool_run", TOOL_SLUG);
    if (!tracked.current && next.matches.length) {
      tracked.current = true;
      trackGoal("picker_complete");
    }
  }

  async function copyResult() {
    if (!result?.matches.length) return;
    try {
      await copyText(resultText(result));
      trackTool("tool_output_used", TOOL_SLUG, "copy_result");
      setCopyNote("");
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
      setCopyNote("The browser did not copy that.");
    }
  }

  return (
    <form onSubmit={onSubmit} className={compact ? "glass rounded-3xl p-5" : "glass rounded-3xl p-6 sm:p-8"}>
      <div className={`grid gap-4 ${compact ? "" : "sm:grid-cols-2"}`}>
        <Select label="Use case" value={useCase} onChange={(value) => setUseCase(value as PickerAnswers["useCase"])}>
          {uses.map((item) => (
            <option key={item.id} value={item.id}>
              {item.label}
            </option>
          ))}
        </Select>
        <Select label="Budget" value={budget} onChange={(value) => setBudget(value as PickerAnswers["budget"])}>
          <option value="free-path">A free plan or open-source code</option>
          <option value="paid-ok">Paid is fine</option>
        </Select>
        <Select label="Open source" value={openSource} onChange={(value) => setOpenSource(value as PickerAnswers["openSource"])}>
          <option value="required">I need open source</option>
          <option value="either">No preference</option>
        </Select>
        <Select label="How you want to work" value={build} onChange={(value) => setBuild(value as PickerAnswers["build"])}>
          <option value="code">I will write code</option>
          <option value="nocode">No code</option>
          <option value="either">Either</option>
        </Select>
      </div>
      <button type="submit" className="btn-primary mt-4 px-4 py-2 text-sm">
        Show 3 listings
      </button>
      {result ? (
        <div className="mt-5">
          <p className="text-sm leading-relaxed text-[var(--muted)]">{result.note}</p>
          <ol className="mt-4 grid gap-3">
            {result.matches.map((match) => (
              <li key={match.slug} className="rounded-2xl border border-[var(--stroke)] bg-white p-4">
                <Link href={match.href} className="font-semibold text-[var(--link)] underline">
                  {match.name}
                </Link>
                <p className="mt-1 text-sm leading-relaxed text-[var(--muted)]">{match.summary}</p>
                <p className="mt-2 text-sm leading-relaxed">{match.why}</p>
                {match.missed.length ? (
                  <p className="mt-1 text-sm text-[var(--muted)]">Misses: {match.missed.join(". ")}.</p>
                ) : null}
              </li>
            ))}
          </ol>
          {result.matches.length ? (
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <button type="button" className="btn-primary px-4 py-2 text-sm" onClick={() => void copyResult()}>
                {copied ? "Copied" : "Copy result"}
              </button>
              {copyNote ? <p className="text-sm text-[var(--muted)]">{copyNote}</p> : null}
            </div>
          ) : null}
        </div>
      ) : null}
    </form>
  );
}

function Select({
  label,
  value,
  onChange,
  children,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  children: React.ReactNode;
}) {
  return (
    <label className="grid gap-2 text-sm">
      <span className="kicker">{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="focus-ring rounded-2xl border border-[var(--stroke)] bg-white px-3 py-3"
      >
        {children}
      </select>
    </label>
  );
}
