"use client";

import { Suspense, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { trackGoal } from "@/lib/analytics";
import {
  DAYS,
  formatCount,
  formatUsd,
  priceSearchApi,
  searchApis,
  searchModelById,
  searchModelGroups,
  sumLines,
  type SearchApi,
} from "@/lib/tools/web-search-cost";

const TOOL_SLUG = "web-search-api-cost-per-agent-task";

function paramNumber(value: string | null, max: number) {
  if (!value || !/^\d+(\.\d+)?$/.test(value)) return null;
  const parsed = Number(value);
  if (!Number.isFinite(parsed) || parsed < 0 || parsed > max) return null;
  return value;
}

function readNumber(value: string) {
  if (value.trim() === "") return Number.NaN;
  return Number(value);
}

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

function WebSearchCostForm() {
  const params = useSearchParams();
  const groups = useMemo(() => searchModelGroups(), []);
  const [modelId, setModelId] = useState(() => {
    const model = params.get("model");
    return model && searchModelById(model).id === model ? model : "gpt-5";
  });
  const [searches, setSearches] = useState(() => paramNumber(params.get("searches"), 1_000) ?? "2");
  const [results, setResults] = useState(() => paramNumber(params.get("results"), 100) ?? "5");
  const [tokens, setTokens] = useState(() => paramNumber(params.get("tokens"), 100_000) ?? "400");
  const [tasks, setTasks] = useState(() => paramNumber(params.get("tasks"), 100_000) ?? "20");
  const [output, setOutput] = useState(() => paramNumber(params.get("output"), 10_000_000) ?? "0");
  const [allowance, setAllowance] = useState(() => params.get("free") === "1");
  const [modes, setModes] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    for (const api of searchApis) {
      const requested = params.get(api.id);
      initial[api.id] = api.modes.some((mode) => mode.id === requested) ? requested! : api.defaultMode;
    }
    return initial;
  });
  const [selected, setSelected] = useState<string[]>(() => {
    const raw = params.get("apis");
    if (!raw) return ["openai-web-search"];
    const ids = raw.split(",").filter((id) => searchApis.some((api) => api.id === id));
    return ids.length ? ids : ["openai-web-search"];
  });
  const [copied, setCopied] = useState("");
  const [copyNote, setCopyNote] = useState("");
  const used = useRef(false);

  function markUse() {
    if (used.current) return;
    used.current = true;
    trackGoal("tool_run", { tool_slug: TOOL_SLUG });
  }

  const inputs = {
    searchesPerTask: readNumber(searches),
    resultsPerSearch: readNumber(results),
    tokensPerResult: readNumber(tokens),
    tasksPerDay: readNumber(tasks),
    outputTokensPerTask: readNumber(output),
    modelId,
    applyAllowance: allowance,
  };
  const lines = searchApis.map((api) => priceSearchApi(api, modes[api.id] ?? api.defaultMode, inputs));
  const valid = lines.every((line) => line != null);
  const picked = valid
    ? lines.filter((line): line is NonNullable<typeof line> => line != null && selected.includes(line.id))
    : [];
  const total = sumLines(picked);
  const model = searchModelById(modelId);

  function toggle(id: string) {
    markUse();
    setSelected((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]));
  }

  async function copyResult() {
    if (!valid) return;
    const rows = lines
      .filter((line): line is NonNullable<typeof line> => line != null)
      .map(
        (line) =>
          `${selected.includes(line.id) ? "[in this task] " : ""}${line.name} (${line.modeLabel}): ${formatUsd(line.perTask)} per task, ${formatUsd(line.month)} over ${DAYS} days${line.partial ? " (part of the call volume is not priced)" : ""}`,
      );
    const text = [
      "Web search API cost per agent task",
      `Model: ${model.label}`,
      `Searches per task: ${formatCount(inputs.searchesPerTask)}`,
      `Results per search: ${formatCount(inputs.resultsPerSearch)}`,
      `Tokens per result, entered: ${formatCount(inputs.tokensPerResult)}`,
      `Tasks per day: ${formatCount(inputs.tasksPerDay)}`,
      `Output tokens per task, entered: ${formatCount(inputs.outputTokensPerTask)}`,
      `Free allowance applied: ${allowance ? "yes" : "no"}`,
      ...rows,
      `Selected APIs together: ${formatUsd(total.perTask)} per task, ${formatUsd(total.month)} over ${DAYS} days`,
      "Prices read November 13, 2026 from the vendor pages linked on https://www.aiagentsinfo.com/tools/web-search-api-cost-per-agent-task",
    ].join("\n");
    try {
      await copyText(text);
      trackGoal("tool_output_used", { tool_slug: TOOL_SLUG, action: "copy_result" });
      setCopyNote("");
      setCopied("result");
      window.setTimeout(() => setCopied(""), 2000);
    } catch {
      setCopied("");
      setCopyNote("The browser did not copy that.");
    }
  }

  async function copyLink() {
    const url = new URL(window.location.pathname, window.location.origin);
    url.searchParams.set("model", modelId);
    url.searchParams.set("searches", searches);
    url.searchParams.set("results", results);
    url.searchParams.set("tokens", tokens);
    url.searchParams.set("tasks", tasks);
    url.searchParams.set("output", output);
    url.searchParams.set("free", allowance ? "1" : "0");
    url.searchParams.set("apis", selected.join(","));
    for (const api of searchApis) url.searchParams.set(api.id, modes[api.id] ?? api.defaultMode);
    try {
      await copyText(url.toString());
      trackGoal("tool_output_used", { tool_slug: TOOL_SLUG, action: "copy_link" });
      setCopyNote("");
      setCopied("link");
      window.setTimeout(() => setCopied(""), 2000);
    } catch {
      setCopied("");
      setCopyNote("The browser did not copy that.");
    }
  }

  return (
    <form className="glass rounded-3xl p-6 sm:p-8" onSubmit={(event) => event.preventDefault()}>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2 text-sm sm:col-span-2">
          <span className="kicker">Model that reads the results</span>
          <select
            value={modelId}
            onChange={(event) => {
              markUse();
              setModelId(event.target.value);
            }}
            className="focus-ring rounded-2xl border border-[var(--stroke)] bg-white px-3 py-3"
          >
            {groups.map((group) => (
              <optgroup key={group.provider} label={group.provider}>
                {group.models.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.label}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </label>
        <NumberField id="searches" label="Searches per task" value={searches} onChange={(value) => { markUse(); setSearches(value); }} />
        <NumberField id="results" label="Results fetched per search" value={results} onChange={(value) => { markUse(); setResults(value); }} />
        <NumberField id="tokens" label="Tokens per result, which you enter" value={tokens} onChange={(value) => { markUse(); setTokens(value); }} />
        <NumberField id="tasks" label="Tasks per day" value={tasks} onChange={(value) => { markUse(); setTasks(value); }} />
        <NumberField id="output" label="Model output tokens per task" value={output} onChange={(value) => { markUse(); setOutput(value); }} />
        <label className="flex items-end gap-3 text-sm">
          <input
            type="checkbox"
            checked={allowance}
            onChange={(event) => {
              markUse();
              setAllowance(event.target.checked);
            }}
            className="size-4"
          />
          <span>Subtract a published free allowance when that vendor prints one</span>
        </label>
      </div>
      <p className="mt-3 text-sm text-[var(--muted)]">
        The boxes start at 2 searches, 5 results, 400 tokens a result, 20 tasks a day, and 0 output tokens so the
        arithmetic is visible. 400 is not a measured snippet. Replace it. A month on this page is {DAYS} days, the same
        window as the token calculator. Nothing you type is stored.
      </p>

      <div className="mt-6 overflow-x-auto">
        <table className="w-full min-w-[44rem] text-left text-sm">
          <thead>
            <tr className="border-b border-[var(--stroke)] text-xs uppercase tracking-wide text-[var(--muted)]">
              <th className="py-2 pr-3 font-medium">In this task</th>
              <th className="py-2 pr-3 font-medium">API</th>
              <th className="py-2 pr-3 font-medium">Mode</th>
              <th className="py-2 pr-3 font-medium">Per task</th>
              <th className="py-2 font-medium">30 days</th>
            </tr>
          </thead>
          <tbody>
            {searchApis.map((api, index) => (
              <ApiRow
                key={api.id}
                api={api}
                modeId={modes[api.id] ?? api.defaultMode}
                checked={selected.includes(api.id)}
                line={lines[index]}
                onToggle={() => toggle(api.id)}
                onMode={(modeId) => {
                  markUse();
                  setModes((current) => ({ ...current, [api.id]: modeId }));
                }}
              />
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 rounded-2xl border border-[var(--stroke)] bg-white/80 p-5">
        {valid && picked.length ? (
          <>
            <p className="kicker">Selected APIs, one task</p>
            <p className="mt-1 text-4xl font-semibold tracking-tight tabular-nums">{formatUsd(total.perTask)}</p>
            <p className="mt-2 text-sm text-[var(--muted)]">
              {formatUsd(total.month)} over {DAYS} days at {formatCount(inputs.tasksPerDay)} tasks a day.
              {total.partial ? " At least one selected row leaves volume unpriced. Read that row’s note." : ""}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
              Checking two APIs adds both call fees and both result sets. It is the cost of a task that calls both,
              not an average.
            </p>
          </>
        ) : (
          <p className="text-sm leading-relaxed">
            {valid
              ? "Check at least one API."
              : "Enter zero or a positive number. Searches stay at or under 1,000, results at or under 100, tokens per result at or under 100,000, tasks at or under 100,000, and output tokens at or under 10 million."}
          </p>
        )}
        {valid ? (
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <button type="button" className="btn-primary focus-ring min-h-11 px-4 text-sm" onClick={() => void copyResult()}>
              {copied === "result" ? "Copied" : "Copy result"}
            </button>
            <button type="button" className="btn-ghost focus-ring min-h-11 px-4 text-sm" onClick={() => void copyLink()}>
              {copied === "link" ? "Copied" : "Copy share link"}
            </button>
          </div>
        ) : null}
        <p className="mt-3 text-sm text-[var(--muted)]" aria-live="polite">
          {copyNote || "Copy share link puts these inputs in the URL. It does not upload them."}
        </p>
      </div>
    </form>
  );
}

function ApiRow({
  api,
  modeId,
  checked,
  line,
  onToggle,
  onMode,
}: {
  api: SearchApi;
  modeId: string;
  checked: boolean;
  line: ReturnType<typeof priceSearchApi>;
  onToggle: () => void;
  onMode: (modeId: string) => void;
}) {
  return (
    <tr className="border-b border-[var(--stroke)] align-top">
      <td className="py-3 pr-3">
        <input type="checkbox" checked={checked} onChange={onToggle} aria-label={`Include ${api.name}`} className="size-4" />
      </td>
      <td className="py-3 pr-3">
        <div className="font-medium">{api.name}</div>
        <a className="text-[var(--link)] underline" href={api.sourceUrl}>
          {api.sourceLabel}
        </a>
        {line?.partial ? <p className="mt-1 text-xs text-[var(--muted)]">Part of this volume is not priced.</p> : null}
      </td>
      <td className="py-3 pr-3">
        <select
          value={modeId}
          onChange={(event) => onMode(event.target.value)}
          aria-label={`${api.name} price`}
          className="focus-ring max-w-64 rounded-xl border border-[var(--stroke)] bg-white px-2 py-2"
        >
          {api.modes.map((mode) => (
            <option key={mode.id} value={mode.id}>
              {mode.label}
            </option>
          ))}
        </select>
      </td>
      <td className="py-3 pr-3 tabular-nums">{line ? formatUsd(line.perTask) : "—"}</td>
      <td className="py-3 tabular-nums">{line ? formatUsd(line.month) : "—"}</td>
    </tr>
  );
}

function NumberField({
  id,
  label,
  value,
  onChange,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="grid gap-2 text-sm" htmlFor={id}>
      <span className="kicker">{label}</span>
      <input
        id={id}
        inputMode="decimal"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="focus-ring rounded-2xl border border-[var(--stroke)] bg-white px-3 py-3 tabular-nums"
      />
    </label>
  );
}

export function WebSearchCostCalculator() {
  return (
    <Suspense fallback={<p className="glass rounded-3xl p-6 text-sm">Loading the calculator.</p>}>
      <WebSearchCostForm />
    </Suspense>
  );
}
