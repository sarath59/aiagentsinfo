/**
 * AI agent ROI.
 *
 * Baseline human cost = tasks × minutes / 60 × hourly cost.
 * Agent-scenario human time = tasks × review minutes + tasks × (1 − success) × rework minutes.
 * Monthly hours saved = baseline hours − agent-scenario human hours.
 * Monthly agent cost = tasks × agent cost per task + platform.
 * Monthly net = baseline human cost − (agent-scenario human cost + monthly agent cost).
 * Annual ROI % = (12 × net − setup) / (setup + 12 × monthly agent cost) × 100.
 * Payback months = setup / net. Setup of 0 is immediate. Net ≤ 0 with setup above 0 never pays back.
 * Break-even tasks/month = platform / per-task margin. No break-even when that margin is ≤ 0.
 */

export const ROI_PATH = "/tools/ai-agent-roi-calculator";

export const SENSITIVITY_RATES = [60, 65, 70, 75, 80, 85, 90, 95] as const;

export const ROI_FIELDS = [
  ["tasks", "tasksPerMonth"],
  ["minutes", "minutesPerTask"],
  ["rate", "hourlyCost"],
  ["agent", "agentCostPerTask"],
  ["success", "successPercent"],
  ["review", "reviewMinutes"],
  ["rework", "reworkMinutes"],
  ["setup", "setupCost"],
  ["platform", "platformCost"],
] as const;

export type RoiFieldKey = (typeof ROI_FIELDS)[number][0];

export type RoiInput = {
  tasksPerMonth: number;
  minutesPerTask: number;
  hourlyCost: number;
  agentCostPerTask: number;
  successPercent: number;
  reviewMinutes: number;
  reworkMinutes: number;
  setupCost: number;
  platformCost: number;
};

export type Payback = { kind: "immediate" } | { kind: "never" } | { kind: "months"; months: number };

export type BreakEven = { kind: "none" } | { kind: "tasks"; tasks: number };

export type RoiDrag = {
  id: "review" | "rework" | "agent" | "platform";
  label: string;
  dollars: number;
};

export type RoiVerdict = "pays-back" | "marginal" | "even" | "loses";

export type RoiOk = {
  ok: true;
  input: RoiInput;
  baselineHours: number;
  baselineHumanCost: number;
  reviewHours: number;
  reworkHours: number;
  agentHumanHours: number;
  agentHumanCost: number;
  hoursSaved: number;
  monthlyAgentCost: number;
  monthlyNet: number;
  annualRoiPercent: number | null;
  payback: Payback;
  perTaskMargin: number;
  breakEven: BreakEven;
  reviewShareOfBaseline: number | null;
  drags: RoiDrag[];
  largestDrag: RoiDrag | null;
  verdict: RoiVerdict;
};

export type RoiResult = RoiOk | { ok: false; message: string };

const FIELD_LIMITS: { key: keyof RoiInput; label: string; max: number }[] = [
  { key: "tasksPerMonth", label: "Tasks per month", max: 10_000_000 },
  { key: "minutesPerTask", label: "Minutes per task", max: 100_000 },
  { key: "hourlyCost", label: "Loaded hourly cost", max: 1_000_000 },
  { key: "agentCostPerTask", label: "Agent cost per task", max: 1_000_000 },
  { key: "reviewMinutes", label: "Review minutes", max: 100_000 },
  { key: "reworkMinutes", label: "Rework minutes", max: 100_000 },
  { key: "setupCost", label: "Setup cost", max: 1_000_000_000 },
  { key: "platformCost", label: "Monthly platform cost", max: 1_000_000_000 },
];

export type RoiPreset = {
  id: string;
  title: string;
  note: string;
  input: RoiInput;
};

export const roiPresets: RoiPreset[] = [
  {
    id: "support-ticket-triage",
    title: "Support ticket triage",
    note: "Hypothetical queue. Not a measured support desk.",
    input: {
      tasksPerMonth: 2000,
      minutesPerTask: 8,
      hourlyCost: 45,
      agentCostPerTask: 0.04,
      successPercent: 80,
      reviewMinutes: 2,
      reworkMinutes: 8,
      setupCost: 2000,
      platformCost: 150,
    },
  },
  {
    id: "code-review",
    title: "Code review",
    note: "Hypothetical pull-request queue. Not a measured engineering team.",
    input: {
      tasksPerMonth: 400,
      minutesPerTask: 25,
      hourlyCost: 80,
      agentCostPerTask: 0.15,
      successPercent: 75,
      reviewMinutes: 10,
      reworkMinutes: 25,
      setupCost: 500,
      platformCost: 40,
    },
  },
  {
    id: "lead-research",
    title: "Lead research",
    note: "Hypothetical research queue. Not a measured sales team.",
    input: {
      tasksPerMonth: 300,
      minutesPerTask: 20,
      hourlyCost: 55,
      agentCostPerTask: 0.25,
      successPercent: 70,
      reviewMinutes: 6,
      reworkMinutes: 20,
      setupCost: 1000,
      platformCost: 80,
    },
  },
  {
    id: "invoice-processing",
    title: "Invoice processing",
    note: "Hypothetical invoice queue. Not a measured finance team.",
    input: {
      tasksPerMonth: 800,
      minutesPerTask: 6,
      hourlyCost: 35,
      agentCostPerTask: 0.08,
      successPercent: 90,
      reviewMinutes: 1,
      reworkMinutes: 6,
      setupCost: 3000,
      platformCost: 200,
    },
  },
];

export const supportTriagePreset = roiPresets[0];

export function calculateRoi(input: RoiInput): RoiResult {
  const message = validateRoiInput(input);
  if (message) return { ok: false, message };

  const tasks = input.tasksPerMonth;
  const success = input.successPercent / 100;
  const fail = 1 - success;
  const rate = input.hourlyCost;

  const baselineHours = (tasks * input.minutesPerTask) / 60;
  const baselineHumanCost = baselineHours * rate;
  const reviewHours = (tasks * input.reviewMinutes) / 60;
  const reworkHours = (tasks * fail * input.reworkMinutes) / 60;
  const agentHumanHours = reviewHours + reworkHours;
  const agentHumanCost = agentHumanHours * rate;
  const hoursSaved = baselineHours - agentHumanHours;
  const taskAgentSpend = tasks * input.agentCostPerTask;
  const monthlyAgentCost = taskAgentSpend + input.platformCost;
  const monthlyNet = baselineHumanCost - (agentHumanCost + monthlyAgentCost);
  const investment = input.setupCost + 12 * monthlyAgentCost;
  const annualRoiPercent = investment === 0 ? null : ((12 * monthlyNet - input.setupCost) / investment) * 100;
  const netCents = Math.round(monthlyNet * 100) / 100;
  const payback: Payback =
    input.setupCost === 0
      ? { kind: "immediate" }
      : netCents <= 0
        ? { kind: "never" }
        : { kind: "months", months: input.setupCost / monthlyNet };
  const perTaskMargin =
    ((input.minutesPerTask - input.reviewMinutes - fail * input.reworkMinutes) / 60) * rate -
    input.agentCostPerTask;
  const breakEven: BreakEven =
    perTaskMargin <= 1e-9 ? { kind: "none" } : { kind: "tasks", tasks: input.platformCost / perTaskMargin };
  const reviewShareOfBaseline = baselineHours === 0 ? null : reviewHours / baselineHours;
  const drags: RoiDrag[] = [
    { id: "review", label: "review minutes", dollars: reviewHours * rate },
    { id: "rework", label: "rework on failed tasks", dollars: reworkHours * rate },
    { id: "agent", label: "agent cost per task", dollars: taskAgentSpend },
    { id: "platform", label: "monthly platform cost", dollars: input.platformCost },
  ];
  const top = drags.reduce((best, item) => (item.dollars > best.dollars ? item : best));
  const largestDrag = top.dollars > 0 ? top : null;
  const verdict: RoiVerdict =
    netCents < 0
      ? "loses"
      : netCents === 0
        ? "even"
        : payback.kind === "months" && payback.months > 12
          ? "marginal"
          : "pays-back";

  return {
    ok: true,
    input,
    baselineHours,
    baselineHumanCost,
    reviewHours,
    reworkHours,
    agentHumanHours,
    agentHumanCost,
    hoursSaved,
    monthlyAgentCost,
    monthlyNet,
    annualRoiPercent,
    payback,
    perTaskMargin,
    breakEven,
    reviewShareOfBaseline,
    drags,
    largestDrag,
    verdict,
  };
}

export function validateRoiInput(input: RoiInput): string | null {
  for (const field of FIELD_LIMITS) {
    const value = input[field.key];
    if (!Number.isFinite(value)) return `${field.label} needs a number.`;
    if (value < 0) return `${field.label} has to be zero or higher.`;
    if (value > field.max) return `${field.label} can be at most ${field.max.toLocaleString("en-US")}.`;
  }
  if (!Number.isFinite(input.successPercent)) return "Success rate needs a number.";
  if (input.successPercent < 0 || input.successPercent > 100) return "Success rate has to be from 0 to 100.";
  return null;
}

export function sensitivityTable(input: RoiInput): { successPercent: number; result: RoiResult }[] {
  return SENSITIVITY_RATES.map((successPercent) => ({
    successPercent,
    result: calculateRoi({ ...input, successPercent }),
  }));
}

/** Review minutes where monthly net is zero, holding every other input still. Null when the hour rate or volume cannot solve it. */
export function reviewMinutesAtZeroNet(input: RoiInput): number | null {
  if (!(input.tasksPerMonth > 0) || !(input.hourlyCost > 0)) return null;
  const fail = 1 - input.successPercent / 100;
  const perTaskTarget = input.platformCost / input.tasksPerMonth + input.agentCostPerTask;
  const review =
    input.minutesPerTask - fail * input.reworkMinutes - (perTaskTarget * 60) / input.hourlyCost;
  return Number.isFinite(review) ? review : null;
}

/** Success percent where monthly net is zero. Null when rework minutes are zero, because success then does not change the month. */
export function successPercentAtZeroNet(input: RoiInput): number | null {
  if (!(input.reworkMinutes > 0) || !(input.tasksPerMonth > 0) || !(input.hourlyCost > 0)) return null;
  const perTaskTarget = input.platformCost / input.tasksPerMonth + input.agentCostPerTask;
  const savedMinutes = (perTaskTarget * 60) / input.hourlyCost;
  const success =
    (savedMinutes - input.minutesPerTask + input.reviewMinutes + input.reworkMinutes) / input.reworkMinutes;
  return Number.isFinite(success) ? success * 100 : null;
}

export function formatUsd(value: number): string {
  const abs = Math.abs(value);
  const maximumFractionDigits = abs > 0 && abs < 1 ? 4 : 2;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits,
  }).format(value);
}

export function formatHourValue(value: number): string {
  const rounded = Math.round(value * 100) / 100;
  return rounded.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 2 });
}

export function formatHours(value: number): string {
  return `${formatHourValue(value)} hours`;
}

export function formatPercent(value: number): string {
  const rounded = Math.round(value * 10) / 10;
  const digits = Math.abs(rounded - Math.round(rounded)) < 1e-9 ? 0 : 1;
  return `${rounded.toLocaleString("en-US", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  })}%`;
}

export function formatRoi(percent: number | null): string {
  if (percent == null || !Number.isFinite(percent)) return "Not defined";
  return `${percent.toLocaleString("en-US", { minimumFractionDigits: 1, maximumFractionDigits: 1 })}%`;
}

export function formatTasks(value: number): string {
  return value.toLocaleString("en-US", { minimumFractionDigits: 1, maximumFractionDigits: 1 });
}

export function formatPayback(payback: Payback): string {
  if (payback.kind === "immediate") return "Immediate";
  if (payback.kind === "never") return "Never pays back";
  const digits = payback.months < 10 ? 2 : 1;
  const text = payback.months.toLocaleString("en-US", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
  return `${text} months`;
}

export function formatBreakEven(value: BreakEven): string {
  if (value.kind === "none") return "No break-even";
  return `${formatTasks(value.tasks)} tasks/month`;
}

export function verdictHeadline(result: RoiOk): string {
  if (result.verdict === "loses") return "Loses money";
  if (result.verdict === "even") return "Breaks even";
  if (result.verdict === "marginal" && result.payback.kind === "months") {
    return `Marginal: payback is ${formatPayback(result.payback)}`;
  }
  if (result.payback.kind === "immediate") return "Pays back immediately";
  if (result.payback.kind === "months") return `Pays back in ${formatPayback(result.payback)}`;
  return "Loses money";
}

export function verdictDetail(result: RoiOk): string {
  const sentences = [`Monthly net is ${formatUsd(result.monthlyNet)}.`];
  if (result.verdict === "loses" && result.payback.kind === "never") {
    sentences.push("The setup never pays back, because monthly net is not positive.");
  } else if (result.verdict === "loses" && result.payback.kind === "immediate") {
    sentences.push("Setup is $0. The loss is the monthly net, and it repeats.");
  } else if (result.verdict === "even" && result.payback.kind === "never") {
    sentences.push("The month breaks even, and the setup never pays back.");
  } else if (result.verdict === "marginal") {
    sentences.push("Payback is longer than 12 months, so the call is marginal.");
  } else if (result.payback.kind === "immediate" && result.annualRoiPercent == null) {
    sentences.push(
      "Annual ROI is not defined. Setup and the monthly agent bill are both zero, so the formula divides by zero.",
    );
  }
  if (result.baselineHours > 0 && result.reviewShareOfBaseline != null) {
    sentences.push(
      `Review time puts back ${formatPercent(result.reviewShareOfBaseline * 100)} of the hours a person spends on these tasks today (${formatHourValue(result.reviewHours)} of ${formatHours(result.baselineHours)}).`,
    );
  }
  if (result.largestDrag) {
    sentences.push(
      `The largest monthly cost in the agent scenario is ${result.largestDrag.label}, at ${formatUsd(result.largestDrag.dollars)}.`,
    );
  }
  if (result.breakEven.kind === "none") {
    sentences.push(
      "There is no break-even task volume. The per-task margin is not positive, so a larger queue does not fix the month.",
    );
  }
  return sentences.join(" ");
}

export function formatQueryNumber(value: number): string {
  if (!Number.isFinite(value)) return "";
  const rounded = Math.round(value * 1e8) / 1e8;
  return rounded.toFixed(8).replace(/\.?0+$/, "");
}

export function roiSearch(input: RoiInput): string {
  const params = new URLSearchParams();
  for (const [key, field] of ROI_FIELDS) params.set(key, formatQueryNumber(input[field]));
  return params.toString();
}

export function roiPath(input: RoiInput): string {
  return `${ROI_PATH}?${roiSearch(input)}`;
}

export function presetFields(input: RoiInput): Record<RoiFieldKey, string> {
  const fields = {} as Record<RoiFieldKey, string>;
  for (const [key, field] of ROI_FIELDS) fields[key] = formatQueryNumber(input[field]);
  return fields;
}

export function cleanField(value: string): string {
  return value.replace(/[<>'"&]/g, "").trim().slice(0, 32);
}

export function fieldsFromSearch(
  params: URLSearchParams,
  base: Record<RoiFieldKey, string>,
): Record<RoiFieldKey, string> {
  const next = { ...base };
  for (const [key] of ROI_FIELDS) {
    const value = params.get(key);
    if (value != null && value.trim() !== "") next[key] = cleanField(value);
  }
  return next;
}

export function searchFromFields(fields: Record<RoiFieldKey, string>, extra?: Record<string, string>): string {
  const params = new URLSearchParams();
  for (const [key] of ROI_FIELDS) {
    const raw = fields[key].trim();
    params.set(key, raw === "" ? "0" : cleanField(raw));
  }
  if (extra) {
    for (const [key, value] of Object.entries(extra)) params.set(key, cleanField(value));
  }
  return params.toString();
}

export function inputFromFields(fields: Record<RoiFieldKey, string>): RoiInput | { error: string } {
  const input = {} as RoiInput;
  for (const [key, field] of ROI_FIELDS) {
    const raw = fields[key].trim();
    if (raw === "") {
      input[field] = 0;
      continue;
    }
    const value = Number(raw);
    if (!Number.isFinite(value)) return { error: "Enter a number in every field." };
    input[field] = value;
  }
  return input;
}

export function roiMarkdown(result: RoiOk, pageUrl: string): string {
  const rows = sensitivityTable(result.input).map(({ successPercent, result: row }) => {
    if (!row.ok) return `| ${successPercent}% | — | — | — |`;
    return `| ${successPercent}% | ${formatUsd(row.monthlyNet)} | ${formatRoi(row.annualRoiPercent)} | ${formatPayback(row.payback)} |`;
  });
  return [
    "# AI agent ROI",
    "",
    "The inputs are whatever was in the form. They are a benchmark only if you measured them.",
    "",
    "## Inputs",
    "",
    `- Tasks per month: ${formatQueryNumber(result.input.tasksPerMonth)}`,
    `- Minutes a person spends per task: ${formatQueryNumber(result.input.minutesPerTask)}`,
    `- Loaded hourly cost: ${formatUsd(result.input.hourlyCost)}`,
    `- Agent cost per task: ${formatUsd(result.input.agentCostPerTask)}`,
    `- Agent success rate: ${formatQueryNumber(result.input.successPercent)}%`,
    `- Human review minutes per task: ${formatQueryNumber(result.input.reviewMinutes)}`,
    `- Rework minutes on a failed task: ${formatQueryNumber(result.input.reworkMinutes)}`,
    `- One-time setup cost: ${formatUsd(result.input.setupCost)}`,
    `- Monthly platform cost: ${formatUsd(result.input.platformCost)}`,
    "",
    "## Result",
    "",
    verdictHeadline(result),
    "",
    verdictDetail(result),
    "",
    `- Baseline human cost: ${formatUsd(result.baselineHumanCost)} (${formatHours(result.baselineHours)})`,
    `- Agent-scenario human cost: ${formatUsd(result.agentHumanCost)} (${formatHours(result.agentHumanHours)})`,
    `- Hours saved: ${formatHours(result.hoursSaved)}`,
    `- Monthly agent cost: ${formatUsd(result.monthlyAgentCost)}`,
    `- Monthly net savings: ${formatUsd(result.monthlyNet)}`,
    `- Annual ROI: ${formatRoi(result.annualRoiPercent)}`,
    `- Payback: ${formatPayback(result.payback)}`,
    `- Break-even volume: ${formatBreakEven(result.breakEven)}`,
    "",
    "Annual ROI = (12 × monthly net − setup) / (setup + 12 × monthly agent cost) × 100.",
    "",
    "## Success-rate sensitivity",
    "",
    "| Success | Monthly net | Annual ROI | Payback |",
    "| --- | --- | --- | --- |",
    ...rows,
    "",
    "Calculated in the browser. Nothing was stored.",
    "",
    pageUrl,
    "",
  ].join("\n");
}

function csvNumber(value: number): string {
  if (!Number.isFinite(value)) return "";
  const rounded = Math.round(value * 1e8) / 1e8;
  return String(rounded);
}

function csvCell(value: string): string {
  if (/[",\n]/.test(value)) return `"${value.replaceAll('"', '""')}"`;
  return value;
}

export function roiCsv(result: RoiOk): string {
  const lines = [
    "metric,value",
    `tasks_per_month,${csvNumber(result.input.tasksPerMonth)}`,
    `minutes_per_task,${csvNumber(result.input.minutesPerTask)}`,
    `loaded_hourly_cost_usd,${csvNumber(result.input.hourlyCost)}`,
    `agent_cost_per_task_usd,${csvNumber(result.input.agentCostPerTask)}`,
    `success_rate_percent,${csvNumber(result.input.successPercent)}`,
    `review_minutes,${csvNumber(result.input.reviewMinutes)}`,
    `rework_minutes,${csvNumber(result.input.reworkMinutes)}`,
    `setup_cost_usd,${csvNumber(result.input.setupCost)}`,
    `monthly_platform_cost_usd,${csvNumber(result.input.platformCost)}`,
    `baseline_hours,${csvNumber(result.baselineHours)}`,
    `baseline_human_cost_usd,${csvNumber(result.baselineHumanCost)}`,
    `agent_scenario_human_hours,${csvNumber(result.agentHumanHours)}`,
    `agent_scenario_human_cost_usd,${csvNumber(result.agentHumanCost)}`,
    `hours_saved,${csvNumber(result.hoursSaved)}`,
    `monthly_agent_cost_usd,${csvNumber(result.monthlyAgentCost)}`,
    `monthly_net_savings_usd,${csvNumber(result.monthlyNet)}`,
    `annual_roi_percent,${result.annualRoiPercent == null ? "" : csvNumber(result.annualRoiPercent)}`,
    `payback,${csvCell(formatPayback(result.payback))}`,
    `break_even_tasks_per_month,${result.breakEven.kind === "tasks" ? csvNumber(result.breakEven.tasks) : ""}`,
    `verdict,${csvCell(verdictHeadline(result))}`,
    "annual_roi_definition,(12 * monthly_net - setup) / (setup + 12 * monthly_agent_cost) * 100",
    "",
    "success_percent,monthly_net_usd,annual_roi_percent,payback",
  ];
  for (const row of sensitivityTable(result.input)) {
    if (!row.result.ok) {
      lines.push(`${row.successPercent},,,`);
      continue;
    }
    lines.push(
      [
        row.successPercent,
        csvNumber(row.result.monthlyNet),
        row.result.annualRoiPercent == null ? "" : csvNumber(row.result.annualRoiPercent),
        csvCell(formatPayback(row.result.payback)),
      ].join(","),
    );
  }
  return `${lines.join("\n")}\n`;
}
