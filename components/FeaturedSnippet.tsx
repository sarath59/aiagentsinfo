"use client";

import { useState } from "react";
import { absoluteUrl } from "@/lib/site";

export function FeaturedSnippet({ path }: { path: string }) {
  const html = `<a href="${absoluteUrl(path)}">Featured on AI Agents Info</a>`;
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(html);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="mt-6 rounded-2xl border border-[var(--stroke)] bg-white/80 p-4">
      <p className="text-sm font-medium">Optional HTML link</p>
      <p className="mt-1 text-sm leading-relaxed text-[var(--muted)]">
        Paste this on your own site if you want to. It is not required, and it is not a rating or a review.
      </p>
      <pre className="mt-3 overflow-x-auto rounded-xl bg-[var(--bg)] p-3 text-xs">{html}</pre>
      <button type="button" className="btn-ghost mt-3 px-3 py-1.5 text-sm" onClick={copy}>
        {copied ? "Copied" : "Copy HTML"}
      </button>
    </div>
  );
}
