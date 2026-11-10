"use client";

import { useMemo, useRef, useState } from "react";
import { trackGoal } from "@/lib/analytics";
import { modelById, modelPrices, thirtyDayCost, type ModelPrice } from "@/lib/model-prices";

const providers = ["OpenAI", "Anthropic", "Google", "xAI"] as const;

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

export function CostCalculator({ toolSlug }: { toolSlug: string }) {
  const [modelId, setModelId] = useState("gpt-5");
  const [inputTokens, setInputTokens] = useState("4000");
  const [outputTokens, setOutputTokens] = useState("800");
  const [tasksPerDay, setTasksPerDay] = useState("10");
  const used = useRef(false);

  function markUse() {
    if (used.current) return;
    used.current = true;
    trackGoal("calculator_use");
    trackGoal("tool_run", { tool_slug: toolSlug });
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
      </div>
    </form>
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
