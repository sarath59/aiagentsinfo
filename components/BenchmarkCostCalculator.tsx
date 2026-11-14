"use client";

import { Suspense, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { trackTool } from "@/lib/analytics";
import {
  benchmarkBoards,
  boardById,
  defaultRunId,
  projectCost,
  runById,
  runsForBoard,
  type BenchmarkBoardId,
  type PricedRun,
} from "@/lib/tools/benchmark-cost";

const TOOL_SLUG = "agent-benchmark-cost-per-solved-task";
const MAX_TASKS = 100_000;

function readTasks(value: string) {
  if (!/^\d+$/.test(value)) return null;
  const parsed = Number(value);
  if (!Number.isInteger(parsed) || parsed < 0 || parsed > MAX_TASKS) return null;
  return parsed;
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

function BenchmarkCostForm() {
  const params = useSearchParams();
  const requested = runById(params.get("run"));
  const [boardId, setBoardId] = useState<BenchmarkBoardId>(requested?.boardId ?? "swe-verified-bash");
  const [runId, setRunId] = useState(requested?.id ?? defaultRunId);
  const [tasks, setTasks] = useState(() => {
    const raw = params.get("n");
    return raw && readTasks(raw) != null ? raw : "100";
  });
  const [copied, setCopied] = useState("");
  const [copyNote, setCopyNote] = useState("");
  const used = useRef(false);

  const runs = useMemo(() => runsForBoard(boardId), [boardId]);
  const run = runs.find((item) => item.id === runId) ?? runs[0];
  const taskCount = readTasks(tasks);
  const projection = run && taskCount != null ? projectCost(run, taskCount) : null;
  const board = boardById(boardId);

  function markUse() {
    if (used.current) return;
    used.current = true;
    trackTool("tool_run", TOOL_SLUG);
  }

  function selectBoard(next: BenchmarkBoardId) {
    markUse();
    setBoardId(next);
    const nextRuns = runsForBoard(next);
    setRunId((current) => (nextRuns.some((item) => item.id === current) ? current : nextRuns[0]?.id ?? current));
  }

  async function copyResult() {
    if (!run || taskCount == null) return;
    const text = [
      "Agent benchmark cost per solved task",
      `Board: ${board.label}`,
      `Run: ${run.harness} · ${run.model} · ${run.date}`,
      `Score: ${run.scoreLabel}`,
      `Tasks resolved: ${run.solvedLabel}`,
      `Run cost: ${run.costLabel}`,
      `Cost per solved task: ${run.perSolvedLabel}`,
      `Tasks entered: ${taskCount.toLocaleString("en-US")}`,
      `Projected cost: ${projection ? projection.label : "Not listed"}`,
      run.note,
      "Rows read November 5, 2026, from the SWE-bench and Terminal-Bench file on https://www.aiagentsinfo.com/reports/agent-harness-benchmark-november-2026",
      "A missing or partial cost stays Not listed. This page does not estimate it.",
    ].join("\n");
    try {
      await copyText(text);
      trackTool("tool_output_used", TOOL_SLUG, "copy_result");
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
    url.searchParams.set("run", run?.id ?? runId);
    url.searchParams.set("n", tasks);
    try {
      await copyText(url.toString());
      trackTool("tool_output_used", TOOL_SLUG, "copy_link");
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
        <label className="grid gap-2 text-sm">
          <span className="kicker">Board</span>
          <select
            value={boardId}
            onChange={(event) => selectBoard(event.target.value as BenchmarkBoardId)}
            className="focus-ring rounded-2xl border border-[var(--stroke)] bg-white px-3 py-3"
          >
            {benchmarkBoards.map((item) => (
              <option key={item.id} value={item.id}>
                {item.label}
              </option>
            ))}
          </select>
        </label>
        <label className="grid gap-2 text-sm">
          <span className="kicker">Harness and model</span>
          <select
            value={run?.id ?? ""}
            onChange={(event) => {
              markUse();
              setRunId(event.target.value);
            }}
            className="focus-ring rounded-2xl border border-[var(--stroke)] bg-white px-3 py-3"
          >
            {runs.map((item) => (
              <option key={item.id} value={item.id}>
                {item.optionLabel}
                {item.perSolved == null ? " · Not listed" : ""}
              </option>
            ))}
          </select>
        </label>
        <label className="grid gap-2 text-sm sm:col-span-2">
          <span className="kicker">Your tasks, N</span>
          <input
            inputMode="numeric"
            value={tasks}
            onChange={(event) => {
              markUse();
              setTasks(event.target.value);
            }}
            className="focus-ring rounded-2xl border border-[var(--stroke)] bg-white px-3 py-3"
            aria-describedby="task-count-note"
          />
        </label>
      </div>
      <p id="task-count-note" className="mt-3 text-sm text-[var(--muted)]">
        N is a whole number from 0 to {MAX_TASKS.toLocaleString("en-US")}. The projection multiplies the listed cost
        per solved task by N. It does not upload the number. Nothing you select is stored.
      </p>

      {run ? <RunReadout run={run} boardNote={board.sourceNote} tasks={taskCount} projectionLabel={projection?.label ?? null} /> : null}

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <button
          type="button"
          className="btn-primary focus-ring min-h-11 px-4 text-sm"
          onClick={() => void copyResult()}
          disabled={!run || taskCount == null}
        >
          {copied === "result" ? "Copied" : "Copy result"}
        </button>
        <button type="button" className="btn-ghost focus-ring min-h-11 px-4 text-sm" onClick={() => void copyLink()}>
          {copied === "link" ? "Copied" : "Copy share link"}
        </button>
      </div>
      <p className="mt-3 text-sm text-[var(--muted)]" aria-live="polite">
        {copyNote || "Copy share link puts the run and N in the URL. It does not upload them."}
      </p>
    </form>
  );
}

function RunReadout({
  run,
  boardNote,
  tasks,
  projectionLabel,
}: {
  run: PricedRun;
  boardNote: string;
  tasks: number | null;
  projectionLabel: string | null;
}) {
  return (
    <div className="mt-6 rounded-2xl border border-[var(--stroke)] bg-white/80 p-5">
      <p className="kicker">Cost per solved task</p>
      <p className="mt-1 text-4xl font-semibold tracking-tight tabular-nums">{run.perSolvedLabel}</p>
      <p className="mt-2 text-sm text-[var(--muted)]">
        {run.harness} · {run.model} · {run.date}
      </p>
      <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
        <div>
          <dt className="kicker">Score</dt>
          <dd className="mt-1 tabular-nums">{run.scoreLabel}</dd>
        </div>
        <div>
          <dt className="kicker">Tasks resolved</dt>
          <dd className="mt-1 tabular-nums">{run.solvedLabel}</dd>
        </div>
        <div>
          <dt className="kicker">Run cost</dt>
          <dd className="mt-1 tabular-nums">{run.costLabel}</dd>
        </div>
        <div>
          <dt className="kicker">Projected cost for N</dt>
          <dd className="mt-1 tabular-nums">
            {tasks == null ? "Enter a whole number." : projectionLabel ?? "Not listed"}
          </dd>
        </div>
      </dl>
      <p className="mt-4 text-sm leading-relaxed text-[var(--muted)]">{run.note}</p>
      <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{boardNote}</p>
      {tasks != null && projectionLabel && run.perSolved != null ? (
        <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
          {run.perSolvedLabel} times {tasks.toLocaleString("en-US")} is {projectionLabel}, rounded to the cent. That
          applies this row’s listed rate to N tasks. It is not a quote for a repository the board did not run.
        </p>
      ) : null}
    </div>
  );
}

export function BenchmarkCostCalculator() {
  return (
    <Suspense fallback={<p className="text-sm text-[var(--muted)]">Loading the calculator.</p>}>
      <BenchmarkCostForm />
    </Suspense>
  );
}
