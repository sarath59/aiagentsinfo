"use client";

import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { trackGoal, trackTool } from "@/lib/analytics";
import { modelById, modelPrices, PRICE_READ_ON, thirtyDayCost } from "@/lib/model-prices";
import {
  ROI_FIELDS,
  ROI_PATH,
  calculateRoi,
  fieldsFromSearch,
  formatBreakEven,
  formatHours,
  formatPayback,
  formatQueryNumber,
  formatRoi,
  formatUsd,
  inputFromFields,
  presetFields,
  roiCsv,
  roiMarkdown,
  roiPresets,
  searchFromFields,
  sensitivityTable,
  supportTriagePreset,
  verdictDetail,
  verdictHeadline,
  type RoiFieldKey,
  type RoiOk,
} from "@/lib/tools/roi";
import { formatDate } from "@/lib/utils";

const TOOL_SLUG = "ai-agent-roi-calculator";
const providers = ["OpenAI", "Anthropic", "Google", "xAI"] as const;

const fieldClass =
  "focus-ring w-full rounded-2xl border border-[var(--stroke)] bg-white px-3 py-3 text-sm tabular-nums";

function readNumber(value: string) {
  if (value.trim() === "") return 0;
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

function downloadFile(filename: string, type: string, value: string) {
  const blob = new Blob([value], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

type PriceFill = { model: string; in: string; out: string };

function subscribeToSearch(onStoreChange: () => void) {
  window.addEventListener("popstate", onStoreChange);
  return () => window.removeEventListener("popstate", onStoreChange);
}

function useLocationSearch() {
  return useSyncExternalStore(
    subscribeToSearch,
    () => window.location.search,
    () => "",
  );
}

function fieldsForSearch(search: string): Record<RoiFieldKey, string> {
  const base = presetFields(supportTriagePreset.input);
  const params = new URLSearchParams(search);
  if (!ROI_FIELDS.some(([key]) => params.has(key))) return base;
  return fieldsFromSearch(params, base);
}

function readPriceFill(search: string): PriceFill | null {
  const params = new URLSearchParams(search);
  const model = params.get("model");
  const input = params.get("in");
  const output = params.get("out");
  if (!model || input == null || output == null) return null;
  if (!modelPrices.some((item) => item.id === model)) return null;
  return { model, in: input, out: output };
}

function matchingPreset(fields: Record<RoiFieldKey, string>, priceFill: PriceFill | null) {
  if (priceFill) return null;
  return (
    roiPresets.find((preset) => {
      const candidate = presetFields(preset.input);
      return ROI_FIELDS.every(([key]) => candidate[key] === fields[key]);
    })?.id ?? null
  );
}

export function RoiCalculator() {
  const locationSearch = useLocationSearch();
  const urlFields = useMemo(() => fieldsForSearch(locationSearch), [locationSearch]);
  const urlFill = useMemo(() => readPriceFill(locationSearch), [locationSearch]);
  const [draft, setDraft] = useState<Record<RoiFieldKey, string> | null>(null);
  const [fillDraft, setFillDraft] = useState<PriceFill | null | undefined>(undefined);
  const fields = draft ?? urlFields;
  const priceFill = fillDraft === undefined ? urlFill : fillDraft;
  const activePreset = matchingPreset(fields, priceFill);
  const [modelDraft, setModelDraft] = useState<string | null>(null);
  const [inputDraft, setInputDraft] = useState<string | null>(null);
  const [outputDraft, setOutputDraft] = useState<string | null>(null);
  const [pricesOpen, setPricesOpen] = useState<boolean | null>(null);
  const modelId = modelDraft ?? priceFill?.model ?? "gpt-5";
  const inputTokens = inputDraft ?? priceFill?.in ?? "4000";
  const outputTokens = outputDraft ?? priceFill?.out ?? "800";
  const showPrices = pricesOpen ?? Boolean(priceFill);
  const [copied, setCopied] = useState<"" | "summary" | "link">("");
  const ran = useRef(false);
  const edited = draft !== null || fillDraft !== undefined;

  function markRun() {
    if (ran.current) return;
    ran.current = true;
    trackGoal("calculator_use");
    trackTool("tool_run", TOOL_SLUG);
  }

  useEffect(() => {
    if (!edited) return;
    const extra = priceFill ? { model: priceFill.model, in: priceFill.in, out: priceFill.out } : undefined;
    const next = `${window.location.pathname}?${searchFromFields(fields, extra)}`;
    const current = `${window.location.pathname}${window.location.search}`;
    if (current !== next) window.history.replaceState(null, "", next);
  }, [edited, fields, priceFill]);

  const parsed = inputFromFields(fields);
  const result = "error" in parsed ? ({ ok: false, message: parsed.error } as const) : calculateRoi(parsed);
  const rows = result.ok ? sensitivityTable(result.input) : [];

  const grouped = useMemo(
    () => providers.map((provider) => ({ provider, models: modelPrices.filter((item) => item.provider === provider) })),
    [],
  );
  const model = modelById(modelId);
  const priced = thirtyDayCost(model, readNumber(inputTokens), readNumber(outputTokens), 1);
  const priceChecked = formatDate(PRICE_READ_ON);

  function shareUrl() {
    const extra = priceFill ? { model: priceFill.model, in: priceFill.in, out: priceFill.out } : undefined;
    return `${window.location.origin}${ROI_PATH}?${searchFromFields(fields, extra)}`;
  }

  function setField(key: RoiFieldKey, value: string) {
    markRun();
    if (key === "agent") setFillDraft(null);
    setDraft((current) => ({ ...(current ?? fields), [key]: value }));
  }

  function applyPreset(id: string) {
    const preset = roiPresets.find((item) => item.id === id);
    if (!preset) return;
    markRun();
    setFillDraft(null);
    setDraft(presetFields(preset.input));
  }

  function useModelPrice() {
    if (!priced) return;
    markRun();
    const fill = { model: modelId, in: inputTokens.trim() || "0", out: outputTokens.trim() || "0" };
    setFillDraft(fill);
    setDraft((current) => ({ ...(current ?? fields), agent: formatQueryNumber(priced.perTask) }));
  }

  async function copySummary() {
    if (!result.ok) return;
    await copyText(roiMarkdown(result, shareUrl()));
    trackTool("tool_output_used", TOOL_SLUG, "copy_result");
    setCopied("summary");
  }

  async function copyShare() {
    if (!result.ok) return;
    await copyText(shareUrl());
    trackTool("tool_output_used", TOOL_SLUG, "copy_link");
    setCopied("link");
  }

  function downloadCsv() {
    if (!result.ok) return;
    downloadFile("ai-agent-roi.csv", "text/csv;charset=utf-8", roiCsv(result));
    trackTool("tool_output_used", TOOL_SLUG, "download");
  }

  function downloadMarkdown() {
    if (!result.ok) return;
    downloadFile("ai-agent-roi.md", "text/markdown;charset=utf-8", roiMarkdown(result, shareUrl()));
    trackTool("tool_output_used", TOOL_SLUG, "download");
  }

  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(""), 2000);
    return () => window.clearTimeout(timer);
  }, [copied]);

  return (
    <div>
      <div className="mb-4">
        <p className="text-sm font-medium">Example inputs, not benchmarks</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {roiPresets.map((preset) => (
            <button
              key={preset.id}
              type="button"
              aria-pressed={activePreset === preset.id}
              onClick={() => applyPreset(preset.id)}
              className={
                activePreset === preset.id ? "btn-primary px-3 py-2 text-sm" : "btn-ghost px-3 py-2 text-sm"
              }
            >
              {preset.title}
            </button>
          ))}
        </div>
        {activePreset ? (
          <p className="mt-2 text-sm text-[var(--muted)]">
            {roiPresets.find((preset) => preset.id === activePreset)?.note} Replace any number with your own.
          </p>
        ) : null}
      </div>

      <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
        <form className="glass rounded-3xl p-6 sm:p-8" onSubmit={(event) => event.preventDefault()}>
          <div className="grid gap-4 sm:grid-cols-2">
            <NumberField id="roi-tasks" label="Tasks per month" value={fields.tasks} onChange={(value) => setField("tasks", value)} />
            <NumberField id="roi-minutes" label="Minutes a person spends per task" value={fields.minutes} onChange={(value) => setField("minutes", value)} />
            <NumberField id="roi-rate" label="Loaded hourly cost ($)" value={fields.rate} onChange={(value) => setField("rate", value)} />
            <NumberField id="roi-agent" label="Agent cost per task ($)" value={fields.agent} onChange={(value) => setField("agent", value)} />
            <NumberField id="roi-success" label="Agent success rate (%)" value={fields.success} onChange={(value) => setField("success", value)} />
            <NumberField id="roi-review" label="Human review minutes per task" value={fields.review} onChange={(value) => setField("review", value)} />
            <NumberField id="roi-rework" label="Rework minutes when the agent fails" value={fields.rework} onChange={(value) => setField("rework", value)} />
            <NumberField id="roi-setup" label="One-time setup cost ($)" value={fields.setup} onChange={(value) => setField("setup", value)} />
            <NumberField id="roi-platform" label="Monthly platform cost ($)" value={fields.platform} onChange={(value) => setField("platform", value)} />
          </div>
          <p className="mt-3 text-sm text-[var(--muted)]">
            80 in the success box means the agent finishes 80% of tasks. A person redoes the rest, for the rework
            minutes. Loaded hourly cost is the wage plus the load you already count. Nothing you type is sent or stored.
          </p>

          <div className="mt-5 border-t border-[var(--stroke)] pt-5">
            <button
              type="button"
              className="text-sm font-medium text-[var(--link)] underline"
              aria-expanded={showPrices}
              onClick={() => setPricesOpen(!(pricesOpen ?? Boolean(priceFill)))}
            >
              {showPrices ? "Hide model prices" : "Fill agent cost per task from model prices"}
            </button>
            {showPrices ? (
              <div className="mt-3 grid gap-3">
                <label className="grid gap-2 text-sm">
                  <span className="kicker">Model</span>
                  <select
                    value={modelId}
                    onChange={(event) => setModelDraft(event.target.value)}
                    className={fieldClass}
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
                <div className="grid gap-3 sm:grid-cols-2">
                  <NumberField id="roi-in" label="Input tokens per task" value={inputTokens} onChange={setInputDraft} />
                  <NumberField id="roi-out" label="Output tokens per task" value={outputTokens} onChange={setOutputDraft} />
                </div>
                <p className="text-sm leading-relaxed text-[var(--muted)]">
                  {priced ? (
                    <>
                      {model.label} at these token counts is {formatUsd(priced.perTask)} per task. Source:{" "}
                      <a className="text-[var(--link)] underline" href={model.sourceUrl}>
                        {model.provider} pricing
                      </a>
                      , read <time dateTime={PRICE_READ_ON}>{priceChecked}</time>. This is the token price only. It is
                      not a seat, a tool-call fee, or a measured cost for your task. The same list, with a 30-day bill,
                      is the{" "}
                      <Link className="text-[var(--link)] underline" href="/agent-cost-calculator">
                        AI agent cost calculator
                      </Link>
                      . 4,000 input tokens and 800 output tokens are that calculator&apos;s starting example, so a price
                      is visible. They are not a measured task.
                    </>
                  ) : (
                    "Enter zero or a positive token count, up to 10 million per task."
                  )}
                </p>
                <button type="button" className="btn-primary w-fit px-4 py-2 text-sm" onClick={useModelPrice} disabled={!priced}>
                  Use this per-task price
                </button>
              </div>
            ) : (
              <p className="mt-2 text-sm text-[var(--muted)]">
                Only prices already copied into the{" "}
                <Link className="text-[var(--link)] underline" href="/agent-cost-calculator">
                  cost calculator
                </Link>{" "}
                can fill this box. They were read <time dateTime={PRICE_READ_ON}>{priceChecked}</time>. Anything else,
                you type.
              </p>
            )}
          </div>
        </form>

        <div className="rounded-3xl border border-[var(--stroke)] bg-white p-5 sm:p-6" aria-live="polite">
          {result.ok ? (
            <ResultBody result={result} copied={copied} onCopy={copySummary} onCsv={downloadCsv} onMarkdown={downloadMarkdown} onShare={copyShare} />
          ) : (
            <p className="text-sm leading-relaxed">{result.message}</p>
          )}
        </div>
      </div>

      {result.ok ? (
        <div className="mt-6 overflow-x-auto rounded-3xl border border-[var(--stroke)] bg-white">
          <table className="w-full min-w-[640px] border-collapse text-sm">
            <caption className="px-5 py-4 text-left">
              <span className="font-semibold">Success rate, with every other input held still</span>
              <span className="mt-1 block text-[var(--muted)]">
                60% through 95%. Your success box is {fields.success.trim() || "0"}%.
              </span>
            </caption>
            <thead>
              <tr className="border-y border-[var(--stroke)] text-left">
                <th className="px-5 py-2 font-semibold">Success</th>
                <th className="px-5 py-2 font-semibold">Monthly net</th>
                <th className="px-5 py-2 font-semibold">Annual ROI</th>
                <th className="px-5 py-2 font-semibold">Payback</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => {
                const current = Math.abs(Number(fields.success) - row.successPercent) < 0.001;
                return (
                  <tr key={row.successPercent} className={current ? "bg-[var(--bg)]" : undefined}>
                    <th className="px-5 py-2 text-left font-medium tabular-nums" scope="row">
                      {row.successPercent}%{current ? " (your rate)" : ""}
                    </th>
                    <td className="px-5 py-2 tabular-nums">{row.result.ok ? formatUsd(row.result.monthlyNet) : "—"}</td>
                    <td className="px-5 py-2 tabular-nums">
                      {row.result.ok ? formatRoi(row.result.annualRoiPercent) : "—"}
                    </td>
                    <td className="px-5 py-2">{row.result.ok ? formatPayback(row.result.payback) : "—"}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : null}
    </div>
  );
}

function ResultBody({
  result,
  copied,
  onCopy,
  onCsv,
  onMarkdown,
  onShare,
}: {
  result: RoiOk;
  copied: "" | "summary" | "link";
  onCopy: () => void;
  onCsv: () => void;
  onMarkdown: () => void;
  onShare: () => void;
}) {
  return (
    <div>
      <p className="kicker">Verdict</p>
      <p className="mt-1 text-2xl font-semibold tracking-tight">{verdictHeadline(result)}</p>
      <p className="mt-3 text-sm leading-relaxed">{verdictDetail(result)}</p>
      <dl className="mt-5 grid gap-3 sm:grid-cols-2">
        <Stat label="Monthly net" value={formatUsd(result.monthlyNet)} />
        <Stat label="Annual ROI" value={formatRoi(result.annualRoiPercent)} />
        <Stat label="Payback" value={formatPayback(result.payback)} />
        <Stat label="Break-even volume" value={formatBreakEven(result.breakEven)} />
        <Stat label="Hours saved" value={formatHours(result.hoursSaved)} />
        <Stat label="Monthly agent cost" value={formatUsd(result.monthlyAgentCost)} />
      </dl>
      <div className="mt-5 flex flex-wrap gap-2">
        <button type="button" className="btn-primary px-4 py-2 text-sm" onClick={onCopy}>
          {copied === "summary" ? "Copied" : "Copy summary"}
        </button>
        <button type="button" className="btn-ghost px-4 py-2 text-sm" onClick={onCsv}>
          Download CSV
        </button>
        <button type="button" className="btn-ghost px-4 py-2 text-sm" onClick={onMarkdown}>
          Download Markdown
        </button>
        <button type="button" className="btn-ghost px-4 py-2 text-sm" onClick={onShare}>
          {copied === "link" ? "Link copied" : "Copy share link"}
        </button>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="kicker">{label}</dt>
      <dd className="mt-1 font-medium tabular-nums">{value}</dd>
    </div>
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
        className={fieldClass}
      />
    </label>
  );
}
