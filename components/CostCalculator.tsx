"use client";

import { Suspense, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { trackGoal, trackTool } from "@/lib/analytics";
import { modelById, modelPrices, thirtyDayCost, type ModelPrice } from "@/lib/model-prices";

const providers = ["OpenAI", "Anthropic", "Google", "xAI"] as const;
const TOKEN_MAX = 10_000_000;
const TASK_MAX = 100_000;

function usd(value: number) {
  const abs = Math.abs(value);
  const maximumFractionDigits = abs > 0 && abs < 1 ? 4 : 2;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits,
  }).format(value);
}

function readNumber(value: string) {
  if (value.trim() === "") return 0;
  const parsed = Number(value);
  return parsed;
}

function paramNumber(value: string | null, max: number) {
  if (!value || !/^\d+(\.\d+)?$/.test(value)) return null;
  const parsed = Number(value);
  if (!Number.isFinite(parsed) || parsed < 0 || parsed > max) return null;
  return value;
}

function formatParam(value: number) {
  return Number.isInteger(value) ? String(value) : String(value);
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

function CostCalculatorForm({ toolSlug }: { toolSlug: string }) {
  const params = useSearchParams();
  const [modelId, setModelId] = useState(() => {
    const model = params.get("model");
    return model && modelPrices.some((item) => item.id === model) ? model : "gpt-5";
  });
  const [inputTokens, setInputTokens] = useState(() => paramNumber(params.get("input"), TOKEN_MAX) ?? "4000");
  const [outputTokens, setOutputTokens] = useState(() => paramNumber(params.get("output"), TOKEN_MAX) ?? "800");
  const [tasksPerDay, setTasksPerDay] = useState(() => paramNumber(params.get("tasks"), TASK_MAX) ?? "10");
  const [copied, setCopied] = useState<"result" | "link" | "">("");
  const [copyNote, setCopyNote] = useState("");
  const used = useRef(false);

  function markUse() {
    if (used.current) return;
    used.current = true;
    trackGoal("calculator_use");
    trackTool("tool_run", toolSlug);
  }

  const model = modelById(modelId);
  const input = readNumber(inputTokens);
  const output = readNumber(outputTokens);
  const tasks = readNumber(tasksPerDay);
  const result = thirtyDayCost(model, input, output, tasks);
  const tooLarge = [input, output, tasks].every((value) => Number.isFinite(value) && value >= 0) && result == null;

  const grouped = useMemo(
    () => providers.map((provider) => ({ provider, models: modelPrices.filter((item) => item.provider === provider) })),
    [],
  );

  async function copyResult() {
    if (!result) return;
    const text = [
      "AI agent cost calculator",
      `Model: ${model.label}`,
      `Input tokens per task: ${new Intl.NumberFormat("en-US").format(input)}`,
      `Output tokens per task: ${new Intl.NumberFormat("en-US").format(output)}`,
      `Tasks per day: ${new Intl.NumberFormat("en-US").format(tasks)}`,
      `Per task: ${usd(result.perTask)}`,
      `30-day cost: ${usd(result.thirtyDay)}`,
      `Price: ${result.band.label}, $${trim(result.band.inputPerMillion)} in / $${trim(result.band.outputPerMillion)} out per million tokens`,
      `Source: ${model.sourceUrl}`,
    ].join("\n");
    try {
      await copyText(text);
      trackTool("tool_output_used", toolSlug, "copy_result");
      setCopyNote("");
      setCopied("result");
      window.setTimeout(() => setCopied(""), 2000);
    } catch {
      setCopied("");
      setCopyNote("The browser did not copy that.");
    }
  }

  async function copyLink() {
    if (!result) return;
    const url = new URL(window.location.pathname, window.location.origin);
    url.searchParams.set("model", model.id);
    url.searchParams.set("input", formatParam(input));
    url.searchParams.set("output", formatParam(output));
    url.searchParams.set("tasks", formatParam(tasks));
    try {
      await copyText(url.toString());
      trackTool("tool_output_used", toolSlug, "copy_link");
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
          <span className="kicker">Model</span>
          <select
            value={modelId}
            onChange={(event) => {
              markUse();
              setModelId(event.target.value);
            }}
            className="focus-ring rounded-2xl border border-[var(--stroke)] bg-white px-3 py-3"
          >
            {grouped.map((group) => (
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
        <NumberField id="input-tokens" label="Input tokens per task" value={inputTokens} onChange={(value) => { markUse(); setInputTokens(value); }} />
        <NumberField id="output-tokens" label="Output tokens per task" value={outputTokens} onChange={(value) => { markUse(); setOutputTokens(value); }} />
        <NumberField id="tasks-per-day" label="Tasks per day" value={tasksPerDay} onChange={(value) => { markUse(); setTasksPerDay(value); }} />
      </div>
      <p className="mt-3 text-sm text-[var(--muted)]">
        The boxes start at 4,000 input tokens, 800 output tokens, and 10 tasks a day so the math is visible. That
        example is not a measured workload. Replace it with your own numbers.
      </p>

      <div className="mt-6 rounded-2xl border border-[var(--stroke)] bg-white/80 p-5">
        {result ? (
          <Result model={model} result={result} />
        ) : (
          <p className="text-sm leading-relaxed">
            {tooLarge
              ? "Enter up to 10 million tokens per task and up to 100,000 tasks per day."
              : "Enter zero or a positive number in each box."}
          </p>
        )}
        {result ? (
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
          {copyNote ||
            "Copy share link puts the model and the three numbers in the URL. It does not upload them, and it does not store a prompt."}
        </p>
      </div>
    </form>
  );
}

export function CostCalculator({ toolSlug }: { toolSlug: string }) {
  return (
    <Suspense fallback={<p className="glass rounded-3xl p-6 text-sm">Loading the calculator.</p>}>
      <CostCalculatorForm toolSlug={toolSlug} />
    </Suspense>
  );
}

function Result({
  model,
  result,
}: {
  model: ModelPrice;
  result: NonNullable<ReturnType<typeof thirtyDayCost>>;
}) {
  return (
    <div>
      <p className="kicker">30-day cost</p>
      <p className="mt-1 text-4xl font-semibold tracking-tight tabular-nums">{usd(result.thirtyDay)}</p>
      <dl className="mt-4 grid gap-3 sm:grid-cols-3">
        <div>
          <dt className="kicker">Per task</dt>
          <dd className="mt-1 font-medium tabular-nums">{usd(result.perTask)}</dd>
        </div>
        <div>
          <dt className="kicker">Per day</dt>
          <dd className="mt-1 font-medium tabular-nums">{usd(result.perDay)}</dd>
        </div>
        <div>
          <dt className="kicker">Price used</dt>
          <dd className="mt-1 font-medium">
            {result.band.label}: ${trim(result.band.inputPerMillion)} in / ${trim(result.band.outputPerMillion)} out
            per million tokens
          </dd>
        </div>
      </dl>
      <ul className="mt-4 grid gap-2 text-sm leading-relaxed text-[var(--muted)]">
        {model.notes.map((note) => (
          <li key={note}>{note}</li>
        ))}
      </ul>
    </div>
  );
}

function trim(value: number) {
  return new Intl.NumberFormat("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value);
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
        min={0}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="focus-ring rounded-2xl border border-[var(--stroke)] bg-white px-3 py-3 tabular-nums"
      />
    </label>
  );
}
