import benchmark from "@/data/benchmarks/november-2026.json";
import type { SortableColumn, SortableRow } from "@/lib/sortable";

export const BENCHMARK_READ_ON = benchmark.readOn;

export const swebenchBenchmark = benchmark.swebench;
export const terminalBench = benchmark.terminalBench;

type SweRow = {
  name: string;
  model: string;
  agent: string;
  date: string;
  resolved: number;
  costUsd: number | null;
  miniVersion: string | null;
  reasoningEffort: string | null;
  teamChecked: boolean;
  openWeights: boolean;
};

function percent(value: number | null) {
  if (value == null) return "Not listed";
  return `${value}%`;
}

function dollars(value: number | null) {
  if (value == null) return "Not listed";
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value);
}

export const sweColumns: SortableColumn[] = [
  { key: "name", label: "Run" },
  { key: "agent", label: "Harness" },
  { key: "model", label: "Model" },
  { key: "resolved", label: "% resolved", numeric: true },
  { key: "date", label: "Result date" },
  { key: "version", label: "mini-SWE-agent" },
  { key: "effort", label: "Effort" },
  { key: "cost", label: "Run cost", numeric: true },
  { key: "checked", label: "Team checked" },
  { key: "weights", label: "Open weights" },
];

export function sweRows(rows: readonly SweRow[]): SortableRow[] {
  return rows.map((row) => ({
    id: `${row.date}-${row.name}`,
    sort: {
      name: row.name,
      agent: row.agent,
      model: row.model,
      resolved: row.resolved,
      date: row.date,
      version: row.miniVersion,
      effort: row.reasoningEffort,
      cost: row.costUsd,
      checked: row.teamChecked ? "Yes" : "No",
      weights: row.openWeights ? "Yes" : "No",
    },
    display: {
      name: row.name,
      agent: row.agent,
      model: row.model || "Not listed",
      resolved: percent(row.resolved),
      date: row.date,
      version: row.miniVersion || "—",
      effort: row.reasoningEffort || "Not stated",
      cost: dollars(row.costUsd),
      checked: row.teamChecked ? "Yes" : "No",
      weights: row.openWeights ? "Yes" : "No",
    },
  }));
}

export const terminalColumns: SortableColumn[] = [
  { key: "rank", label: "Rank", numeric: true },
  { key: "model", label: "Model" },
  { key: "agent", label: "Agent" },
  { key: "effort", label: "Effort" },
  { key: "accuracy", label: "Accuracy", numeric: true },
  { key: "ci", label: "95% half-width", numeric: true },
  { key: "solved", label: "Successes / trials" },
  { key: "cost", label: "Cost" },
  { key: "date", label: "Date" },
];

export function terminalRows(): SortableRow[] {
  return terminalBench.rows.map((row) => ({
    id: `${row.rank}-${row.model}-${row.agent}-${row.effort}-${row.date}`,
    sort: {
      rank: row.rank,
      model: row.model,
      agent: row.agent,
      effort: row.effort,
      accuracy: row.accuracy,
      ci: row.ciHalfWidth,
      solved: row.successes,
      cost: row.cost,
      date: row.date,
    },
    display: {
      rank: String(row.rank),
      model: row.model,
      agent: row.agent,
      effort: row.effort || "Not stated",
      accuracy: row.accuracy == null ? "Not listed" : `${row.accuracy}%`,
      ci: row.ciHalfWidth == null ? "Not listed" : `± ${row.ciHalfWidth}`,
      solved:
        row.successes == null || row.trials == null ? "Not listed" : `${row.successes} / ${row.trials}`,
      cost: row.cost || "Not listed",
      date: row.date,
    },
    href: {
      ...(row.modelUrl ? { model: row.modelUrl } : {}),
      ...(row.agentUrl ? { agent: row.agentUrl } : {}),
    },
  }));
}
