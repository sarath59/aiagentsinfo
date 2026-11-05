"use client";

import { useState } from "react";

function CopyBlock({ label, value }: { label: string; value: string }) {
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
    <div>
      <div className="mb-2 flex items-center justify-between gap-3">
        <p className="kicker">{label}</p>
        <button type="button" onClick={copy} className="focus-ring text-sm underline">
          {buttonLabel}
        </button>
      </div>
      <pre className="overflow-x-auto whitespace-pre-wrap font-mono text-xs leading-relaxed text-[var(--muted)]">{value}</pre>
    </div>
  );
}

export function CiteOrEmbed({ citation, embed }: { citation: string; embed: string }) {
  return (
    <section className="glass rounded-3xl p-6 sm:p-7">
      <h2 className="text-2xl font-semibold tracking-tight">Cite or embed this</h2>
      <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
        The citation names this page and the date above. The embed is a blockquote with a link back here.
      </p>
      <div className="mt-5 grid gap-6">
        <CopyBlock label="Citation" value={citation} />
        <CopyBlock label="Embed" value={embed} />
      </div>
    </section>
  );
}
