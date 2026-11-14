import benchmark from "@/data/benchmarks/november-2026.json";

/** The benchmark file's read date. This calculator does not re-fetch the boards. */
export const BENCHMARK_COST_CHECKED = benchmark.readOn;
export const benchmarkCostPath = "/tools/agent-benchmark-cost-per-solved-task";

const DOLLAR = /^\$([0-9,]+\.\d{2})$/;

export type BenchmarkBoardId =
  | "swe-verified-bash"
  | "swe-verified-other"
  | "swe-multilingual"
  | "terminal-bench-4";

export type BenchmarkBoard = {
  id: BenchmarkBoardId;
  label: string;
  instances: number | null;
  sourceNote: string;
};

export const benchmarkBoards: BenchmarkBoard[] = [
  {
    id: "swe-verified-bash",
    label: "SWE-bench Verified, mini-SWE-agent",
    instances: benchmark.swebench.verifiedInstances,
    sourceNote: `${benchmark.swebench.verifiedInstances} Verified instances. The percent is the share resolved. Every row uses mini-SWE-agent.`,
  },
  {
    id: "swe-verified-other",
    label: "SWE-bench Verified, other team-checked harnesses",
    instances: benchmark.swebench.verifiedInstances,
    sourceNote: `${benchmark.swebench.verifiedInstances} Verified instances. These rows were checked by the SWE-bench team and use a harness other than mini-SWE-agent.`,
  },
  {
    id: "swe-multilingual",
    label: "SWE-bench Multilingual, mini-SWE-agent",
    instances: benchmark.swebench.multilingualInstances,
    sourceNote: `${benchmark.swebench.multilingualInstances} Multilingual instances, a different task set from Verified. Every row uses mini-SWE-agent.`,
  },
  {
    id: "terminal-bench-4",
    label: "Terminal-Bench 4.0",
    instances: null,
    sourceNote:
      "Successes and trials are the fields on the row. The agent changes by row. A cost the board marked partial is not divided.",
  },
];

export type PricedRun = {
  id: string;
  boardId: BenchmarkBoardId;
  harness: string;
  model: string;
  optionLabel: string;
  date: string;
  scoreLabel: string;
  solved: number | null;
  solvedLabel: string;
  costUsd: number | null;
  /** Listed run cost, the board's partial string, or "Not listed". */
  costLabel: string;
  partial: boolean;
  perSolved: number | null;
  perSolvedLabel: string;
  note: string;
};

type SweSource = {
  name: string;
  model: string;
  agent: string;
  date: string;
  resolved: number;
  costUsd: number | null;
};

function formatRunCost(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

export function formatPerSolved(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 4,
    maximumFractionDigits: 4,
  }).format(value);
}

export function formatProjection(value: number) {
  const cents = Math.round((value + Number.EPSILON) * 100) / 100;
  return formatRunCost(cents);
}

function formatSolved(value: number) {
  const tenths = Math.round(value * 10) / 10;
  if (Math.abs(tenths - Math.round(tenths)) < 1e-9) {
    return Math.round(tenths).toLocaleString("en-US");
  }
  return tenths.toLocaleString("en-US", { minimumFractionDigits: 1, maximumFractionDigits: 1 });
}

function priceSolved(costUsd: number | null, solved: number | null, partial: boolean, costLabel: string) {
  if (partial) {
    return {
      perSolved: null as number | null,
      perSolvedLabel: "Not listed",
      note: `The board printed “${costLabel}”. A partial run cost is not scaled to a full task set, and it is not estimated.`,
    };
  }
  if (costUsd == null) {
    return {
      perSolved: null,
      perSolvedLabel: "Not listed",
      note: "This row has no listed run cost. The cost per solved task is Not listed. It is not estimated.",
    };
  }
  if (solved == null || solved <= 0) {
    return {
      perSolved: null,
      perSolvedLabel: "Not listed",
      note: "The row lists no solved tasks to divide by. The cost per solved task is Not listed.",
    };
  }
  const perSolved = costUsd / solved;
  const zeroNote =
    costUsd === 0
      ? " The source lists the run cost as $0.00, so the rate is that listed zero, not a missing price."
      : "";
  return {
    perSolved,
    perSolvedLabel: formatPerSolved(perSolved),
    note: `Run cost divided by tasks resolved.${zeroNote}`,
  };
}

function fromSwe(boardId: BenchmarkBoardId, rows: SweSource[], instances: number): PricedRun[] {
  return rows.map((row, index) => {
    const solved = (row.resolved * instances) / 100;
    const costLabel = row.costUsd == null ? "Not listed" : formatRunCost(row.costUsd);
    const priced = priceSolved(row.costUsd, solved, false, costLabel);
    return {
      id: `${boardId}:${index}:${row.date}:${row.agent}:${row.name}`,
      boardId,
      harness: row.agent,
      model: row.model || row.name,
      optionLabel: `${row.agent} · ${row.name} · ${row.date}`,
      date: row.date,
      scoreLabel: `${row.resolved}% of ${instances.toLocaleString("en-US")}`,
      solved,
      solvedLabel: formatSolved(solved),
      costUsd: row.costUsd,
      costLabel,
      partial: false,
      ...priced,
    };
  });
}

function fromTerminal(): PricedRun[] {
  return benchmark.terminalBench.rows.map((row, index) => {
    const raw = row.cost?.trim() ?? "";
    const match = DOLLAR.exec(raw);
    const partial = raw.length > 0 && !match;
    const costUsd = match ? Number(match[1].replace(/,/g, "")) : null;
    const costLabel = !raw ? "Not listed" : partial ? raw : formatRunCost(costUsd ?? 0);
    const solved = row.successes == null ? null : row.successes;
    const priced = priceSolved(
      Number.isFinite(costUsd) ? costUsd : null,
      solved,
      partial,
      costLabel,
    );
    const scoreLabel =
      row.successes == null || row.trials == null ? "Not listed" : `${row.successes} / ${row.trials}`;
    return {
      id: `terminal-bench-4:${index}:${row.rank}:${row.date}:${row.agent}:${row.model}`,
      boardId: "terminal-bench-4",
      harness: row.agent,
      model: row.model,
      optionLabel: `${row.agent} · ${row.model} · ${row.date}`,
      date: row.date,
      scoreLabel,
      solved,
      solvedLabel: solved == null ? "Not listed" : formatSolved(solved),
      costUsd: partial ? null : costUsd,
      costLabel,
      partial,
      ...priced,
    };
  });
}

const runsByBoard: Record<BenchmarkBoardId, PricedRun[]> = {
  "swe-verified-bash": fromSwe(
    "swe-verified-bash",
    benchmark.swebench.bashOnly,
    benchmark.swebench.verifiedInstances,
  ),
  "swe-verified-other": fromSwe(
    "swe-verified-other",
    benchmark.swebench.teamCheckedOther,
    benchmark.swebench.verifiedInstances,
  ),
  "swe-multilingual": fromSwe(
    "swe-multilingual",
    benchmark.swebench.multilingual,
    benchmark.swebench.multilingualInstances,
  ),
  "terminal-bench-4": fromTerminal(),
};

export function boardById(id: string): BenchmarkBoard {
  return benchmarkBoards.find((board) => board.id === id) ?? benchmarkBoards[0];
}

export function runsForBoard(id: string): PricedRun[] {
  const board = boardById(id);
  return runsByBoard[board.id];
}

export function runById(id: string | null | undefined): PricedRun | null {
  if (!id) return null;
  for (const board of benchmarkBoards) {
    const found = runsByBoard[board.id].find((run) => run.id === id);
    if (found) return found;
  }
  return null;
}

export function positiveRates(boardId: BenchmarkBoardId) {
  return runsByBoard[boardId]
    .filter((run): run is PricedRun & { perSolved: number } => run.perSolved != null && run.perSolved > 0)
    .slice()
    .sort((a, b) => a.perSolved - b.perSolved);
}

const swePositive = positiveRates("swe-verified-bash");
const terminalPositive = positiveRates("terminal-bench-4");

export const cheapestSweBash = swePositive[0];
export const dearestSweBash = swePositive[swePositive.length - 1];
export const cheapestTerminal = terminalPositive[0];
export const dearestTerminal = terminalPositive[terminalPositive.length - 1];

export const defaultRunId = cheapestSweBash.id;

export function projectCost(run: PricedRun, tasks: number) {
  if (run.perSolved == null || !Number.isFinite(tasks) || tasks < 0) return null;
  return {
    usd: run.perSolved * tasks,
    label: formatProjection(run.perSolved * tasks),
  };
}

export const benchmarkCostTitle = `Agent benchmark cost per solved task: ${cheapestSweBash.perSolvedLabel} or ${dearestTerminal.perSolvedLabel}`;

export const benchmarkCostDescription = `${cheapestSweBash.harness} with ${cheapestSweBash.model} lists ${cheapestSweBash.costLabel} for ${cheapestSweBash.solvedLabel} resolved SWE-bench Verified issues, ${cheapestSweBash.perSolvedLabel} per solved task. ${dearestTerminal.harness} with ${dearestTerminal.model} lists ${dearestTerminal.costLabel} for ${dearestTerminal.solvedLabel} Terminal-Bench successes, ${dearestTerminal.perSolvedLabel} each. A missing or partial cost stays Not listed. Nothing is stored.`;
