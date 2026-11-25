"use client";

import { Suspense, useEffect, useRef, useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import type { FileCheck, HostCheck, LinkCheck } from "@/lib/llms-txt/check";
import type { GenerateResult } from "@/lib/llms-txt/generate";
import { MAX_LINK_CHECKS } from "@/lib/llms-txt/limits";
import {
  countBySeverity,
  estimateTokensByChars,
  PASTE_TOKEN_METHOD,
  validateLlmsTxt,
  type Finding,
  type LlmsValidation,
} from "@/lib/llms-txt/validate";

const TOOL_SLUG = "llms-txt-checker";
const FIELD =
  "focus-ring w-full rounded-2xl border border-[var(--stroke)] bg-white px-3 py-2 text-sm text-[var(--fg)]";

type Mode = "check" | "paste" | "generate";

async function copyText(value: string) {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(value);
      return;
    }
  } catch {
    // Fall through to the selection copy.
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

function downloadText(value: string, filename: string) {
  const blob = new Blob([value], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function LlmsTxtForm() {
  const params = useSearchParams();
  const seeded = params.get("url")?.trim() ?? "";
  const [mode, setMode] = useState<Mode>("check");
  const [target, setTarget] = useState(seeded || "aiagentsinfo.com");
  const [checkLinks, setCheckLinks] = useState(true);
  const [paste, setPaste] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [hostResult, setHostResult] = useState<HostCheck | null>(null);
  const [pasted, setPasted] = useState<LlmsValidation | null>(null);
  const [pasteLinks, setPasteLinks] = useState<LinkCheck | null>(null);
  const [draft, setDraft] = useState<GenerateResult | null>(null);
  const [copied, setCopied] = useState("");
  const [generateTarget, setGenerateTarget] = useState(seeded || "aiagentsinfo.com");
  const ran = useRef(false);
  const requestId = useRef(0);
  const auto = useRef(false);

  function markRun() {
    if (ran.current) return;
    ran.current = true;
  }

  async function runCheck(value: string, links = checkLinks) {
    const id = requestId.current + 1;
    requestId.current = id;
    setError("");
    setPasted(null);
    setPasteLinks(null);
    setBusy(true);
    setMode("check");
    const next = value.trim();
    setTarget(next);
    const share = new URL(window.location.href);
    share.searchParams.set("url", next);
    window.history.replaceState(null, "", share);
    try {
      const response = await fetch("/api/llms-txt/check", {
        method: "POST",
        headers: { "content-type": "application/json", accept: "application/json" },
        body: JSON.stringify({ target: next, checkLinks: links }),
      });
      const payload = (await response.json()) as HostCheck & { error?: string };
      if (id !== requestId.current) return;
      if (!response.ok || !payload.llms) {
        setHostResult(null);
        setError(payload.error || "That site could not be checked.");
        return;
      }
      markRun();
      setHostResult(payload);
      document.getElementById("llms-result")?.scrollIntoView({ behavior: "smooth", block: "start" });
    } catch {
      if (id !== requestId.current) return;
      setHostResult(null);
      setError("The check did not finish. Try again.");
    } finally {
      if (id === requestId.current) setBusy(false);
    }
  }

  useEffect(() => {
    const value = params.get("url")?.trim();
    if (!value || auto.current) return;
    auto.current = true;
    void runCheck(value, true);
    // The query string is the shareable input. Run it once on load.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  function onCheck(event: FormEvent) {
    event.preventDefault();
    void runCheck(target, checkLinks);
  }

  function onPaste(event: FormEvent) {
    event.preventDefault();
    setError("");
    setHostResult(null);
    setPasteLinks(null);
    if (paste.length > 2 * 1024 * 1024) {
      setError("Paste at most 2 MB.");
      return;
    }
    markRun();
    setPasted(validateLlmsTxt(paste));
    document.getElementById("llms-result")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  async function onPasteLinks() {
    if (!pasted) return;
    const urls = pasted.links.filter((link) => link.absolute).map((link) => link.url);
    if (!urls.length) {
      setError("That paste has no absolute http(s) link to request.");
      return;
    }
    setBusy(true);
    setError("");
    try {
      const response = await fetch("/api/llms-txt/check", {
        method: "POST",
        headers: { "content-type": "application/json", accept: "application/json" },
        body: JSON.stringify({ urls: urls.slice(0, MAX_LINK_CHECKS) }),
      });
      const payload = (await response.json()) as { links?: LinkCheck; error?: string };
      if (!response.ok || !payload.links) {
        setError(payload.error || "The links could not be checked.");
        return;
      }
      setPasteLinks(payload.links);
    } catch {
      setError("The link check did not finish. Try again.");
    } finally {
      setBusy(false);
    }
  }

  async function onGenerate(event: FormEvent) {
    event.preventDefault();
    setError("");
    setBusy(true);
    try {
      const response = await fetch("/api/llms-txt/generate", {
        method: "POST",
        headers: { "content-type": "application/json", accept: "application/json" },
        body: JSON.stringify({ target: generateTarget }),
      });
      const payload = (await response.json()) as GenerateResult & { error?: string };
      if (!response.ok || !payload.draft) {
        setDraft(null);
        setError(payload.error || "A draft could not be generated.");
        return;
      }
      markRun();
      setDraft(payload);
      document.getElementById("llms-draft")?.scrollIntoView({ behavior: "smooth", block: "start" });
    } catch {
      setDraft(null);
      setError("The generator did not finish. Try again.");
    } finally {
      setBusy(false);
    }
  }

  async function copyResult(value: string) {
    await copyText(value);
    setCopied("Copied");
  }

  async function share() {
    const url = new URL(window.location.href);
    if (target.trim()) url.searchParams.set("url", target.trim());
    await copyText(url.toString());
    setCopied("Link copied");
  }

  return (
    <section className="glass rounded-3xl p-4 sm:p-6" aria-labelledby="llms-tool-heading">
      <h2 id="llms-tool-heading" className="text-xl font-semibold tracking-tight">
        Check a host, paste a file, or draft one
      </h2>
      <p className="mt-2 max-w-3xl text-sm leading-relaxed text-[var(--muted)]">
        A URL check fetches <code>/llms.txt</code> and <code>/llms-full.txt</code>, then drops the response. Paste mode stays in
        the browser unless you ask for a link check. Nothing you type is stored.
      </p>
      <div className="mt-4 flex flex-wrap gap-2" role="tablist" aria-label="Tool mode">
        {(
          [
            ["check", "Check a URL"],
            ["paste", "Paste llms.txt"],
            ["generate", "Generate"],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={mode === id}
            className={mode === id ? "btn-primary px-4 py-2 text-sm" : "btn-ghost px-4 py-2 text-sm"}
            onClick={() => setMode(id)}
          >
            {label}
          </button>
        ))}
      </div>

      {mode === "check" ? (
        <form className="mt-4 grid gap-3" onSubmit={onCheck}>
          <label className="grid gap-1 text-sm">
            <span className="font-medium">Domain or URL</span>
            <input
              className={FIELD}
              value={target}
              onChange={(event) => setTarget(event.target.value)}
              placeholder="example.com"
              inputMode="url"
              autoCapitalize="none"
              autoCorrect="off"
              spellCheck={false}
              required
            />
          </label>
          <p className="text-sm text-[var(--muted)]">
            The path is ignored. The check requests <code>/llms.txt</code> and <code>/llms-full.txt</code> on that host.
          </p>
          <label className="flex items-start gap-2 text-sm">
            <input
              type="checkbox"
              className="mt-1"
              checked={checkLinks}
              onChange={(event) => setCheckLinks(event.target.checked)}
            />
            <span>Request up to {MAX_LINK_CHECKS} absolute links from the file (HEAD, then GET).</span>
          </label>
          <div className="flex flex-wrap gap-2">
            <button type="submit" className="btn-primary px-4 py-2 text-sm" disabled={busy}>
              {busy ? "Checking…" : "Check llms.txt"}
            </button>
            <button type="button" className="btn-ghost px-4 py-2 text-sm" disabled={busy} onClick={() => void runCheck("aiagentsinfo.com", true)}>
              Example: aiagentsinfo.com
            </button>
            <button
              type="button"
              className="btn-ghost px-4 py-2 text-sm"
              disabled={busy}
              onClick={() => void runCheck("docs.anthropic.com", true)}
            >
              Example: docs.anthropic.com
            </button>
            <button type="button" className="btn-ghost px-4 py-2 text-sm" onClick={() => void share()}>
              Share
            </button>
          </div>
        </form>
      ) : null}

      {mode === "paste" ? (
        <form className="mt-4 grid gap-3" onSubmit={onPaste}>
          <label className="grid gap-1 text-sm">
            <span className="font-medium">llms.txt text</span>
            <textarea
              className={`${FIELD} min-h-48 font-mono text-xs`}
              value={paste}
              onChange={(event) => setPaste(event.target.value)}
              spellCheck={false}
              placeholder={"# Site name\n\n> One-line summary.\n\n## Docs\n\n- [Guide](https://example.com/guide.md): Start here.\n"}
            />
          </label>
          <div className="flex flex-wrap gap-2">
            <button type="submit" className="btn-primary px-4 py-2 text-sm" disabled={busy}>
              Validate paste
            </button>
            <button type="button" className="btn-ghost px-4 py-2 text-sm" disabled={busy || !pasted} onClick={() => void onPasteLinks()}>
              Check linked URLs
            </button>
          </div>
          <p className="text-sm text-[var(--muted)]">
            Validation runs in the browser. The token figure is {PASTE_TOKEN_METHOD}. A URL check uses tiktoken o200k_base on the
            server.
          </p>
        </form>
      ) : null}

      {mode === "generate" ? (
        <form className="mt-4 grid gap-3" onSubmit={onGenerate}>
          <label className="grid gap-1 text-sm">
            <span className="font-medium">Domain or URL</span>
            <input
              className={FIELD}
              value={generateTarget}
              onChange={(event) => setGenerateTarget(event.target.value)}
              placeholder="example.com"
              inputMode="url"
              autoCapitalize="none"
              autoCorrect="off"
              spellCheck={false}
              required
            />
          </label>
          <p className="text-sm text-[var(--muted)]">
            Reads <code>/sitemap.xml</code>, follows a sitemap index up to a cap, and pulls a title and meta description from
            up to 30 pages.
          </p>
          <button type="submit" className="btn-primary w-fit px-4 py-2 text-sm" disabled={busy}>
            {busy ? "Drafting…" : "Generate llms.txt"}
          </button>
        </form>
      ) : null}

      {error ? (
        <p className="mt-4 text-sm text-[#9f1239]" role="alert">
          {error}
        </p>
      ) : null}
      {copied ? <p className="mt-3 text-sm text-[var(--muted)]">{copied}</p> : null}

      {hostResult ? (
        <div id="llms-result" className="mt-6 grid gap-4">
          <div className="flex flex-wrap gap-2">
            <button type="button" className="btn-ghost px-4 py-2 text-sm" onClick={() => void copyResult(hostReport(hostResult))}>
              Copy result
            </button>
            <button type="button" className="btn-ghost px-4 py-2 text-sm" onClick={() => void share()}>
              Share
            </button>
          </div>
          <FileCard file={hostResult.llms} />
          <FileCard file={hostResult.llmsFull} />
          {hostResult.links ? <LinkCard links={hostResult.links} /> : null}
        </div>
      ) : null}

      {pasted ? (
        <div id="llms-result" className="mt-6 grid gap-4">
          <p className="text-sm text-[var(--muted)]">
            About {estimateTokensByChars(paste).toLocaleString("en-US")} tokens ({PASTE_TOKEN_METHOD}). {paste.length.toLocaleString("en-US")}{" "}
            characters.
          </p>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              className="btn-ghost px-4 py-2 text-sm"
              onClick={() => void copyResult(findingsReport("Pasted llms.txt", pasted.findings, pasted.title))}
            >
              Copy result
            </button>
          </div>
          <FindingList findings={pasted.findings} />
          {pasteLinks ? <LinkCard links={pasteLinks} /> : null}
        </div>
      ) : null}

      {draft ? (
        <div id="llms-draft" className="mt-6 grid gap-3">
          <h3 className="text-lg font-semibold">Draft llms.txt</h3>
          <p className="text-sm text-[var(--muted)]">
            {draft.urlsUsed} links from {draft.urlsFound} sitemap URLs. {draft.pagesRead} pages returned a title or description.{" "}
            {draft.tokens.toLocaleString("en-US")} tokens ({draft.tokenMethod}).
          </p>
          {draft.notes.length ? (
            <ul className="grid gap-1 text-sm text-[var(--muted)]">
              {draft.notes.map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>
          ) : null}
          <pre className="max-h-[32rem] overflow-auto rounded-2xl border border-[var(--stroke)] bg-white p-4 text-xs leading-relaxed">
            {draft.draft}
          </pre>
          <div className="flex flex-wrap gap-2">
            <button type="button" className="btn-primary px-4 py-2 text-sm" onClick={() => void copyResult(draft.draft)}>
              Copy
            </button>
            <button
              type="button"
              className="btn-ghost px-4 py-2 text-sm"
              onClick={() => {
                downloadText(draft.draft, "llms.txt");
                setCopied("Downloaded");
              }}
            >
              Download
            </button>
          </div>
        </div>
      ) : null}
    </section>
  );
}

function FileCard({ file }: { file: FileCheck }) {
  const counts = countBySeverity(file.findings);
  return (
    <article className="rounded-2xl border border-[var(--stroke)] bg-white p-4">
      <h3 className="text-lg font-semibold">{file.name}</h3>
      <dl className="mt-3 grid gap-2 text-sm sm:grid-cols-2">
        <Stat label="HTTP status" value={file.status == null ? "—" : String(file.status)} />
        <Stat label="Redirects" value={String(file.redirects)} />
        <Stat label="Content-type" value={file.contentType || "—"} />
        <Stat label="Bytes kept" value={file.bytes.toLocaleString("en-US")} />
        <Stat
          label="Tokens"
          value={file.tokens == null ? "—" : file.tokens.toLocaleString("en-US")}
        />
        <Stat label="Links in the file" value={String(file.linkCount)} />
      </dl>
      <p className="mt-2 text-xs leading-relaxed text-[var(--muted)]">{file.tokenMethod || "No body was counted."}</p>
      {file.finalUrl ? (
        <p className="mt-2 break-all text-sm">
          Final URL: <span className="text-[var(--muted)]">{file.finalUrl}</span>
        </p>
      ) : null}
      {file.title ? <p className="mt-2 text-sm">H1: {file.title}</p> : null}
      <p className="mt-2 text-sm text-[var(--muted)]">
        {counts.error} errors, {counts.warning} warnings, {counts.info} info.
        {file.truncated ? " The body was cut at the 2 MB cap." : ""}
      </p>
      <FindingList findings={file.findings} />
      {file.preview ? (
        <pre className="mt-3 max-h-64 overflow-auto rounded-2xl border border-[var(--stroke)] bg-[var(--bg)] p-3 text-xs leading-relaxed">
          {file.preview}
          {file.previewTrimmed ? "\n…" : ""}
        </pre>
      ) : null}
    </article>
  );
}

function LinkCard({ links }: { links: LinkCheck }) {
  return (
    <article className="rounded-2xl border border-[var(--stroke)] bg-white p-4">
      <h3 className="text-lg font-semibold">Linked URLs</h3>
      <p className="mt-2 text-sm text-[var(--muted)]">
        Checked {links.sampled} of {links.totalHttpLinks} absolute http(s) links.
        {links.truncated
          ? ` The sample stopped at ${MAX_LINK_CHECKS}.`
          : " Every absolute http(s) link in the file was requested."}
      </p>
      <dl className="mt-3 grid grid-cols-2 gap-2 text-sm sm:grid-cols-5">
        <Stat label="2xx" value={String(links.counts["2xx"])} />
        <Stat label="3xx" value={String(links.counts["3xx"])} />
        <Stat label="4xx" value={String(links.counts["4xx"])} />
        <Stat label="5xx" value={String(links.counts["5xx"])} />
        <Stat label="Failed" value={String(links.counts.error)} />
      </dl>
      {links.broken.length ? (
        <ul className="mt-3 grid gap-2 text-sm">
          {links.broken.map((item) => (
            <li key={item.url} className="break-all">
              <span className="font-medium text-[#9f1239]">{item.status ?? "error"}</span> {item.url}
              <span className="text-[var(--muted)]">. {item.detail}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-3 text-sm">No broken links in the sample.</p>
      )}
    </article>
  );
}

function FindingList({ findings }: { findings: Finding[] }) {
  if (!findings.length) return <p className="mt-3 text-sm">No structure findings.</p>;
  return (
    <ul className="mt-3 grid gap-3">
      {findings.map((finding, index) => (
        <li key={`${finding.code}-${index}`} className="text-sm leading-relaxed">
          <Severity severity={finding.severity} /> {finding.message}
          <span className="mt-1 block text-[var(--muted)]">Fix: {finding.fix}</span>
        </li>
      ))}
    </ul>
  );
}

function Severity({ severity }: { severity: Finding["severity"] }) {
  const color = severity === "error" ? "text-[#9f1239]" : severity === "warning" ? "text-[var(--gold)]" : "text-[var(--link)]";
  const label = severity === "error" ? "Error" : severity === "warning" ? "Warning" : "Info";
  return <span className={`font-semibold uppercase tracking-wide ${color}`}>{label}.</span>;
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs uppercase tracking-wide text-[var(--muted)]">{label}</dt>
      <dd className="break-all font-medium">{value}</dd>
    </div>
  );
}

function hostReport(result: HostCheck) {
  return [
    `llms.txt check for ${result.host}`,
    `Checked ${result.checkedAt}`,
    "",
    fileReport(result.llms),
    "",
    fileReport(result.llmsFull),
    "",
    result.links ? linkReport(result.links) : "Link checks were off.",
  ].join("\n");
}

function fileReport(file: FileCheck) {
  const counts = countBySeverity(file.findings);
  return [
    file.name,
    `Status: ${file.status ?? "none"}`,
    `Final URL: ${file.finalUrl ?? "none"}`,
    `Content-type: ${file.contentType ?? "none"}`,
    `Bytes: ${file.bytes}`,
    `Tokens: ${file.tokens ?? "none"} (${file.tokenMethod || "not counted"})`,
    `Findings: ${counts.error} errors, ${counts.warning} warnings, ${counts.info} info`,
    ...file.findings.map((finding) => `- ${finding.severity}: ${finding.message} Fix: ${finding.fix}`),
  ].join("\n");
}

function findingsReport(title: string, findings: Finding[], h1: string | null) {
  const counts = countBySeverity(findings);
  return [
    title,
    h1 ? `H1: ${h1}` : "H1: none",
    `${counts.error} errors, ${counts.warning} warnings, ${counts.info} info`,
    ...findings.map((finding) => `- ${finding.severity}: ${finding.message} Fix: ${finding.fix}`),
  ].join("\n");
}

function linkReport(links: LinkCheck) {
  return [
    `Links checked: ${links.sampled} of ${links.totalHttpLinks}${links.truncated ? " (sample truncated)" : ""}`,
    `2xx ${links.counts["2xx"]}, 3xx ${links.counts["3xx"]}, 4xx ${links.counts["4xx"]}, 5xx ${links.counts["5xx"]}, failed ${links.counts.error}`,
    ...links.broken.map((item) => `- ${item.status ?? "error"} ${item.url} ${item.detail}`),
  ].join("\n");
}

export function LlmsTxtChecker() {
  return (
    <Suspense fallback={<p className="glass rounded-3xl p-6 text-sm">Loading the checker.</p>}>
      <LlmsTxtForm />
    </Suspense>
  );
}
