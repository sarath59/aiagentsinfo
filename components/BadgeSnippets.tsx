"use client";

import { useState } from "react";

const fieldClass =
  "focus-ring mt-2 w-full rounded-2xl border border-[var(--stroke)] bg-white px-3 py-2 font-mono text-xs leading-relaxed text-[var(--fg)]";

export function BadgeSnippets({ html, markdown }: { html: string; markdown: string }) {
  const [copied, setCopied] = useState<"html" | "markdown" | null>(null);

  async function copy(text: string, key: "html" | "markdown") {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        throw new Error("clipboard unavailable");
      }
    } catch {
      const area = document.createElement("textarea");
      area.value = text;
      document.body.appendChild(area);
      area.select();
      document.execCommand("copy");
      area.remove();
    }
    setCopied(key);
    window.setTimeout(() => setCopied((current) => (current === key ? null : current)), 2000);
  }

  return (
    <div className="mt-3 grid gap-3">
      <Snippet
        id="badge-html"
        label="HTML"
        value={html}
        copied={copied === "html"}
        onCopy={() => copy(html, "html")}
      />
      <Snippet
        id="badge-markdown"
        label="Markdown"
        value={markdown}
        copied={copied === "markdown"}
        onCopy={() => copy(markdown, "markdown")}
      />
    </div>
  );
}

function Snippet({
  id,
  label,
  value,
  copied,
  onCopy,
}: {
  id: string;
  label: string;
  value: string;
  copied: boolean;
  onCopy: () => void;
}) {
  return (
    <div>
      <div className="flex items-center justify-between gap-3">
        <label className="text-xs font-medium text-[var(--muted)]" htmlFor={id}>
          {label}
        </label>
        <button type="button" className="btn-ghost focus-ring px-3 py-1.5 text-xs" onClick={onCopy}>
          {copied ? "Copied" : `Copy ${label}`}
        </button>
      </div>
      <textarea
        id={id}
        readOnly
        rows={3}
        value={value}
        data-badge-snippet={label.toLowerCase()}
        className={fieldClass}
        onFocus={(event) => event.currentTarget.select()}
      />
    </div>
  );
}
