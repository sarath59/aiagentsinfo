"use client";

import { useState } from "react";

export function CopyCode({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  const [state, setState] = useState<"idle" | "copied" | "failed">("idle");

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      setState("copied");
    } catch {
      setState("failed");
    }
    window.setTimeout(() => setState("idle"), 1600);
  }

  const buttonLabel = state === "copied" ? "Copied" : state === "failed" ? "Copy failed" : "Copy";

  return (
    <div className="glass rounded-3xl p-5">
      <div className="mb-3 flex items-center justify-between gap-3">
        <p className="kicker">{label}</p>
        <button type="button" onClick={copy} className="focus-ring text-sm underline">
          {buttonLabel}
        </button>
      </div>
      <pre className="overflow-x-auto whitespace-pre-wrap font-mono text-xs leading-relaxed text-[var(--muted)]">
        {value}
      </pre>
    </div>
  );
}
