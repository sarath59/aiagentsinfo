"use client";

import { useMemo, useRef, useState } from "react";
import type { PromptCheckResult } from "@/lib/prompt-check";
import { modelPrices } from "@/lib/model-prices";
import type { ToolTarget } from "@/lib/tool-definitions";

const providers = ["OpenAI", "Anthropic", "Google", "xAI"] as const;

const samplePrompt =
  "You are a weather assistant. Use get_weather when the user asks about the weather. Do not invent a temperature.";

const validTools = `[
  {
    "type": "function",
    "name": "get_weather",
    "description": "Get the current weather for a city.",
    "parameters": {
      "type": "object",
      "properties": {
        "city": { "type": "string", "description": "City name" }
      },
      "required": ["city"],
      "additionalProperties": false
    },
    "strict": true
  }
]`;

const invalidTools = `[
  {
    "type": "function",
    "function": {
      "name": "bad name",
      "parameters": { "type": "string" }
    }
  }
]`;

type FormatOption = ToolTarget;

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

function tokens(value: number) {
  return new Intl.NumberFormat("en-US").format(value);
}

function readWhole(value: string) {
  if (value.trim() === "") return 0;
  const parsed = Number(value);
  return parsed;
}

export function PromptChecker() {
  const [prompt, setPrompt] = useState("");
  const [tools, setTools] = useState("");
  const [format, setFormat] = useState<FormatOption>("auto");
  const [modelId, setModelId] = useState("gpt-5");
  const [outputTokens, setOutputTokens] = useState("800");
  const [tasksPerDay, setTasksPerDay] = useState("10");
  const [pending, setPending] = useState(false);
  const requestId = useRef(0);
  const [error, setError] = useState("");
  const [result, setResult] = useState<PromptCheckResult | null>(null);

  const grouped = useMemo(
    () => providers.map((provider) => ({ provider, models: modelPrices.filter((item) => item.provider === provider) })),
    [],
  );

  async function runCheck(next: { prompt: string; tools: string; format: FormatOption }) {
    const id = ++requestId.current;
    setPending(true);
    setError("");
    setResult(null);
    try {
      const response = await fetch("/api/agent-prompt-checker", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: next.prompt,
          tools: next.tools,
          format: next.format,
          modelId,
          outputTokens: readWhole(outputTokens),
          tasksPerDay: readWhole(tasksPerDay),
        }),
      });
      const payload = (await response.json()) as PromptCheckResult | { error?: string };
      if (id !== requestId.current) return;
      if (!response.ok || !("tokens" in payload)) {
        setError("error" in payload && payload.error ? payload.error : "The checker did not return a result.");
        return;
      }
      setResult(payload);
    } catch {
      if (id === requestId.current) setError("The checker could not be reached.");
    } finally {
      if (id === requestId.current) setPending(false);
    }
  }

  function loadExample(kind: "valid" | "invalid") {
    const nextPrompt = samplePrompt;
    const nextTools = kind === "valid" ? validTools : invalidTools;
    setPrompt(nextPrompt);
    setTools(nextTools);
    setFormat("auto");
    void runCheck({ prompt: nextPrompt, tools: nextTools, format: "auto" });
  }

  return (
    <form
      className="glass rounded-3xl p-6 sm:p-8"
      onSubmit={(event) => {
        event.preventDefault();
        void runCheck({ prompt, tools, format });
      }}
    >
      <div className="grid gap-4">
        <label className="grid gap-2 text-sm">
          <span className="kicker">System prompt</span>
          <textarea
            value={prompt}
            onChange={(event) => setPrompt(event.target.value)}
            required
            rows={7}
            spellCheck
            className="focus-ring min-h-36 rounded-2xl border border-[var(--stroke)] bg-white px-3 py-3"
            placeholder="Paste the system prompt."
          />
        </label>
        <label className="grid gap-2 text-sm">
          <span className="kicker">Tool definitions, optional</span>
          <textarea
            value={tools}
            onChange={(event) => setTools(event.target.value)}
            rows={12}
            spellCheck={false}
            className="focus-ring min-h-48 rounded-2xl border border-[var(--stroke)] bg-white px-3 py-3 font-mono text-[13px]"
            placeholder="Paste OpenAI, Anthropic, or MCP tool JSON."
          />
        </label>
        <p className="text-sm text-[var(--muted)]">
          An array of tools, one tool object, or an object with a tools array. OpenAI function tools use parameters.
          Anthropic tools use input_schema. MCP tools use inputSchema.
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="grid gap-2 text-sm">
            <span className="kicker">Check against</span>
            <select
              value={format}
              onChange={(event) => setFormat(event.target.value as FormatOption)}
              className="focus-ring rounded-2xl border border-[var(--stroke)] bg-white px-3 py-3"
            >
              <option value="auto">Auto-detect</option>
              <option value="openai">OpenAI</option>
              <option value="anthropic">Anthropic</option>
              <option value="mcp">MCP</option>
            </select>
          </label>
          <label className="grid gap-2 text-sm">
            <span className="kicker">Model for the price</span>
            <select
              value={modelId}
              onChange={(event) => setModelId(event.target.value)}
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
          <label className="grid gap-2 text-sm">
            <span className="kicker">Output tokens you expect</span>
            <input
              value={outputTokens}
              onChange={(event) => setOutputTokens(event.target.value)}
              inputMode="numeric"
              className="focus-ring rounded-2xl border border-[var(--stroke)] bg-white px-3 py-3"
            />
          </label>
          <label className="grid gap-2 text-sm">
            <span className="kicker">Turns per day</span>
            <input
              value={tasksPerDay}
              onChange={(event) => setTasksPerDay(event.target.value)}
              inputMode="decimal"
              className="focus-ring rounded-2xl border border-[var(--stroke)] bg-white px-3 py-3"
            />
          </label>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <button type="submit" className="btn-primary focus-ring min-h-11 px-5" disabled={pending}>
          {pending ? "Checking" : "Check prompt"}
        </button>
        <button type="button" className="btn-ghost focus-ring min-h-11 px-4" disabled={pending} onClick={() => loadExample("valid")}>
          Load a valid example
        </button>
        <button type="button" className="btn-ghost focus-ring min-h-11 px-4" disabled={pending} onClick={() => loadExample("invalid")}>
          Load an invalid example
        </button>
      </div>
      <p className="mt-3 text-sm text-[var(--muted)]">
        Checking sends the text to this site so the server can count tokens and read the JSON. The text is not saved.
        Output tokens start at 800 and turns at 10 so the price is visible. Those are not a measured workload.
      </p>

      <div id="check-result" aria-live="polite" className="mt-6">
        {error ? (
          <p className="rounded-2xl border border-[var(--stroke)] bg-white/80 p-5 text-sm leading-relaxed">{error}</p>
        ) : null}
        {result ? <CheckResult result={result} /> : null}
      </div>
    </form>
  );
}

function CheckResult({ result }: { result: PromptCheckResult }) {
  const heading = result.toolCount === 0 && result.ok ? "Prompt only" : result.ok ? "No schema errors" : "Schema problems";
  return (
    <div className="grid gap-4">
      <section className="rounded-2xl border border-[var(--stroke)] bg-white/80 p-5">
        <p className="kicker">Tool JSON</p>
        <h2 className="mt-1 text-2xl font-semibold tracking-tight">{heading}</h2>
        {result.formats.length ? (
          <p className="mt-2 text-sm text-[var(--muted)]">Detected: {result.formats.join(", ")}.</p>
        ) : (
          <p className="mt-2 text-sm text-[var(--muted)]">No tool JSON was checked.</p>
        )}
        {result.issues.length ? (
          <ul className="mt-4 grid gap-3">
            {result.issues.map((item, index) => (
              <li
                key={`${item.path}-${index}`}
                className="rounded-2xl border border-[var(--stroke)] bg-white px-4 py-3 text-sm leading-relaxed"
                style={{ borderLeftWidth: 3, borderLeftColor: item.severity === "error" ? "var(--color-navy)" : "var(--gold-bright)" }}
              >
                <p className="font-medium text-[var(--fg)]">
                  {item.severity === "error" ? "Problem" : "Note"} · {item.path}
                </p>
                <p className="mt-1 text-[var(--muted)]">{item.message}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
            {result.toolCount
              ? "The tool JSON matches the shape this checker tests."
              : "Paste tool JSON when you want the schema checked."}
          </p>
        )}
      </section>

      <section className="rounded-2xl border border-[var(--stroke)] bg-white/80 p-5">
        <p className="kicker">{result.tokens.exact ? "Token count" : "Token estimate"}</p>
        <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{result.tokens.label}</p>
        <dl className="mt-4 grid gap-3 sm:grid-cols-2">
          <Stat label="Prompt tokens" value={tokens(result.tokens.prompt)} />
          <Stat
            label={result.tokens.toolsInCost ? "Tool tokens in the cost" : "Tool tokens, not in the cost"}
            value={tokens(result.tokens.tools)}
          />
          {result.tokens.anthropicToolPrompt != null ? (
            <Stat label="Anthropic tool-use prompt" value={tokens(result.tokens.anthropicToolPrompt)} />
          ) : null}
          <Stat label="Output tokens entered" value={tokens(result.cost?.outputTokens ?? 0)} />
          <Stat label="Input tokens priced" value={tokens(result.cost?.inputTokens ?? result.tokens.prompt)} />
        </dl>
        <ul className="mt-4 grid gap-2 text-sm leading-relaxed text-[var(--muted)]">
          {result.notes.map((note) => (
            <li key={note}>{note}</li>
          ))}
        </ul>
      </section>

      <section className="rounded-2xl border border-[var(--stroke)] bg-white/80 p-5">
        <p className="kicker">Price for one turn, then 30 days</p>
        {result.cost ? (
          <>
            <p className="mt-1 text-4xl font-semibold tracking-tight tabular-nums">{usd(result.cost.thirtyDay)}</p>
            <p className="mt-2 text-sm text-[var(--muted)]">
              {usd(result.cost.perTurn)} per turn · {result.cost.provider} {result.cost.modelLabel} · {result.cost.bandLabel}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
              ${result.cost.inputPerMillion} per million input tokens and ${result.cost.outputPerMillion} per million
              output tokens.{" "}
              <a className="text-[var(--link)] underline" href={result.cost.sourceUrl}>
                Provider price
              </a>
              . The 30-day figure is the per-turn price times {result.cost.tasksPerDay} turns a day times 30.
            </p>
            {result.cost.notes.length ? (
              <ul className="mt-3 grid gap-2 text-sm leading-relaxed text-[var(--muted)]">
                {result.cost.notes.map((note) => (
                  <li key={note}>{note}</li>
                ))}
              </ul>
            ) : null}
          </>
        ) : (
          <p className="mt-2 text-sm leading-relaxed">The token totals are outside the range this price table will multiply.</p>
        )}
        <h3 className="mt-5 text-base font-semibold">Left out of the price</h3>
        <ul className="mt-2 grid gap-2 text-sm leading-relaxed text-[var(--muted)]">
          {result.omitted.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs uppercase tracking-wide text-[var(--muted)]">{label}</dt>
      <dd className="mt-1 text-lg font-semibold tabular-nums">{value}</dd>
    </div>
  );
}
