"use client";

import { useState } from "react";

export function CopyBibtex({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  }

  return (
    <div className="citation-panel glass rounded-3xl p-5">
      <div className="mb-3 flex items-center justify-between">
        <p className="kicker">Cite this page</p>
        <button type="button" onClick={copy} className="focus-ring text-sm underline">
          {copied ? "Copied" : "Copy BibTeX"}
        </button>
      </div>
      <pre className="overflow-x-auto font-mono text-xs leading-relaxed text-[var(--muted)]">{value}</pre>
    </div>
  );
}
