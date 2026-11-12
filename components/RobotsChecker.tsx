"use client";

import { useMemo, useRef, useState, type FormEvent } from "react";
import { trackGoal } from "@/lib/analytics";
import { BOTS_CHECKED_LABEL, aiBots, purposeOrder } from "@/lib/robots/bots";
import { evaluateRobots, scoreSentence, type BotRow, type Evaluation } from "@/lib/robots/evaluate";
import { choiceFor, cleanPaths, cleanSitemap, generateRobots, policies, type BotChoice, type PolicyId } from "@/lib/robots/generate";
import { normalizeCheckedPath } from "@/lib/robots/parse";

const TOOL_SLUG = "ai-crawler-robots-txt-checker";

const fieldClass =
  "focus-ring w-full rounded-2xl border border-[var(--stroke)] bg-white px-3 py-2 text-sm text-[var(--fg)]";

type Mode = "check" | "paste" | "generate";

type FetchMeta = {
  requestedUrl: string;
  finalUrl: string;
  status: number;
  redirects: number;
  truncated: boolean;
  contentType: string | null;
  preview: string;
  previewTrimmed: boolean;
  llms: { status: number | null; state: "present" | "missing" | "error"; finalUrl: string };
};

type CheckResponse = { evaluation: Evaluation; fetch: FetchMeta; error?: string };

function initialChoices(policy: PolicyId) {
  return Object.fromEntries(aiBots.map((bot) => [bot.token, choiceFor(bot, policy)])) as Record<string, BotChoice>;
}

async function copyText(value: string) {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(value);
      return;
    }
  } catch {
    // Permission or a non-secure context. Fall through to the selection copy.
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

function downloadText(value: string) {
  const blob = new Blob([value], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "robots.txt";
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

export function RobotsChecker() {
  const [mode, setMode] = useState<Mode>("check");
  const [target, setTarget] = useState("");
  const [path, setPath] = useState("");
  const [paste, setPaste] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<CheckResponse | null>(null);
  const [pasted, setPasted] = useState<Evaluation | null>(null);
  const [policy, setPolicy] = useState<PolicyId>("allow-search-answer");
  const [choices, setChoices] = useState<Record<string, BotChoice>>(() => initialChoices("allow-search-answer"));
  const [protect, setProtect] = useState("/api/\n/account");
  const [sitemap, setSitemap] = useState("");
  const [variant, setVariant] = useState(0);
  const [written, setWritten] = useState(false);
  const [copied, setCopied] = useState("");
  const ran = useRef(false);

  function markRun() {
    if (ran.current) return;
    ran.current = true;
    trackGoal("tool_run", { tool_slug: TOOL_SLUG });
  }

  function markOutput(action: "copy" | "download" | "regenerate") {
    trackGoal("tool_output_used", { tool_slug: TOOL_SLUG, action });
  }

  const generated = useMemo(
    () =>
      generateRobots({
        policy,
        choices,
        paths: protect.split(/\r?\n/),
        sitemap,
        variant,
      }),
    [policy, choices, protect, sitemap, variant],
  );

  async function checkUrl(event: FormEvent) {
    event.preventDefault();
    setError("");
    setPasted(null);
    setBusy(true);
    try {
      const response = await fetch("/api/ai-crawler-robots", {
        method: "POST",
        headers: { "content-type": "application/json", accept: "application/json" },
        body: JSON.stringify({ target, path }),
      });
      const payload = (await response.json()) as CheckResponse;
      if (!response.ok || !payload.evaluation) {
        setResult(null);
        setError(payload.error || "That site could not be checked.");
        return;
      }
      markRun();
      setResult(payload);
      document.getElementById("robots-result")?.scrollIntoView({ behavior: "smooth", block: "start" });
    } catch {
      setResult(null);
      setError("The check did not finish. Try again.");
    } finally {
      setBusy(false);
    }
  }

  function checkPaste(event: FormEvent) {
    event.preventDefault();
    setError("");
    setResult(null);
    const checked = normalizeCheckedPath(path || "/");
    if (!checked) {
      setError("Enter a path that starts with /, or leave it blank.");
      return;
    }
    if (paste.length > 500 * 1024) {
      setError("Paste at most 500 KiB. That is the size RFC 9309 tells crawlers to parse.");
      return;
    }
    markRun();
    const paths = checked === "/" ? ["/"] : ["/", checked];
    setPasted(evaluateRobots(paste, paths, "parsed"));
    document.getElementById("robots-result")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function writeFile() {
    setWritten(true);
    markRun();
    document.getElementById("robots-file")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  const evaluation = result?.evaluation ?? pasted;

  return (
    <section className="glass rounded-3xl p-4 sm:p-6" aria-labelledby="robots-tool-heading">
      <h2 id="robots-tool-heading" className="text-xl font-semibold tracking-tight">
        Check a host, paste a file, or write one
      </h2>
      <p className="mt-2 max-w-3xl text-sm leading-relaxed text-[var(--muted)]">
        The bot list was read from operator docs on {BOTS_CHECKED_LABEL}. A URL check fetches <code>/robots.txt</code> and{" "}
        <code>/llms.txt</code> and then drops the response. Nothing you type is stored.
      </p>
      <div className="mt-4 flex flex-wrap gap-2" role="tablist" aria-label="Tool mode">
        {(
          [
            ["check", "Check a URL"],
            ["paste", "Paste robots.txt"],
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
        <form className="mt-4 grid gap-3" onSubmit={checkUrl}>
          <label className="grid gap-1 text-sm">
            <span className="font-medium">Domain or URL</span>
            <input
              className={fieldClass}
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
          <label className="grid gap-1 text-sm">
            <span className="font-medium">Path to test, besides /</span>
            <input
              className={fieldClass}
              value={path}
              onChange={(event) => setPath(event.target.value)}
              placeholder="/pricing"
              autoCapitalize="none"
              autoCorrect="off"
              spellCheck={false}
            />
          </label>
          <div className="flex flex-wrap gap-2">
            <button className="btn-primary px-4 py-2 text-sm" type="submit" disabled={busy}>
              {busy ? "Fetching robots.txt" : "Check robots.txt"}
            </button>
            <button
              className="btn-ghost px-4 py-2 text-sm"
              type="button"
              onClick={() => {
                setTarget("aiagentsinfo.com");
                setPath("/api/");
              }}
            >
              Fill aiagentsinfo.com and /api/
            </button>
          </div>
        </form>
      ) : null}

      {mode === "paste" ? (
        <form className="mt-4 grid gap-3" onSubmit={checkPaste}>
          <label className="grid gap-1 text-sm">
            <span className="font-medium">robots.txt</span>
            <textarea
              className={`${fieldClass} min-h-40 font-mono`}
              value={paste}
              onChange={(event) => setPaste(event.target.value)}
              spellCheck={false}
              required
            />
          </label>
          <label className="grid gap-1 text-sm">
            <span className="font-medium">Path to test, besides /</span>
            <input className={fieldClass} value={path} onChange={(event) => setPath(event.target.value)} placeholder="/pricing" />
          </label>
          <button className="btn-primary w-fit px-4 py-2 text-sm" type="submit">
            Check this file
          </button>
          <p className="text-sm text-[var(--muted)]">The paste stays in this browser. It is not sent to the server.</p>
        </form>
      ) : null}

      {mode === "generate" ? (
        <div className="mt-4 grid gap-4">
          <fieldset className="grid gap-2">
            <legend className="text-sm font-medium">Policy</legend>
            {policies.map((item) => (
              <label key={item.id} className="grid grid-cols-[auto_1fr] gap-x-2 gap-y-1 text-sm">
                <input
                  type="radio"
                  name="policy"
                  className="mt-1"
                  checked={policy === item.id}
                  onChange={() => {
                    setPolicy(item.id);
                    setChoices(initialChoices(item.id));
                    setWritten(false);
                  }}
                />
                <span>
                  <span className="font-medium">{item.label}</span>
                  <span className="mt-1 block text-[var(--muted)]">{item.detail}</span>
                </span>
              </label>
            ))}
          </fieldset>
          <details className="rounded-2xl border border-[var(--stroke)] bg-white p-3">
            <summary className="cursor-pointer text-sm font-medium">Change one bot</summary>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2">
              {aiBots.map((bot) => (
                <li key={bot.token} className="flex items-center justify-between gap-2 text-sm">
                  <span>
                    <span className="font-medium">{bot.token}</span>
                    <span className="ml-2 text-[var(--muted)]">{bot.operator}</span>
                  </span>
                  <select
                    className="rounded-xl border border-[var(--stroke)] bg-white px-2 py-1"
                    value={choices[bot.token]}
                    aria-label={`${bot.token} policy`}
                    onChange={(event) => {
                      const value = event.target.value === "block" ? "block" : "allow";
                      setChoices((current) => ({ ...current, [bot.token]: value }));
                      setWritten(false);
                    }}
                  >
                    <option value="allow">Allow</option>
                    <option value="block">Block</option>
                  </select>
                </li>
              ))}
            </ul>
          </details>
          <label className="grid gap-1 text-sm">
            <span className="font-medium">Paths to protect, one per line</span>
            <textarea
              className={`${fieldClass} min-h-24 font-mono`}
              value={protect}
              onChange={(event) => {
                setProtect(event.target.value);
                setWritten(false);
              }}
              spellCheck={false}
            />
            <span className="text-[var(--muted)]">
              Use a prefix such as /api/. A named group does not inherit *, so each allowed group repeats these Disallow lines.
              {cleanPaths(protect.split(/\r?\n/)).length === 0 && protect.trim()
                ? " Nothing in that box is a usable path yet."
                : ""}
            </span>
          </label>
          <label className="grid gap-1 text-sm">
            <span className="font-medium">Sitemap URL</span>
            <input
              className={fieldClass}
              value={sitemap}
              onChange={(event) => {
                setSitemap(event.target.value);
                setWritten(false);
              }}
              placeholder="https://example.com/sitemap.xml"
              inputMode="url"
            />
            {sitemap.trim() && !cleanSitemap(sitemap) ? (
              <span className="text-[var(--muted)]">That sitemap was left out. Use an http or https URL with no password.</span>
            ) : null}
          </label>
          <button className="btn-primary w-fit px-4 py-2 text-sm" type="button" onClick={writeFile}>
            Write robots.txt
          </button>
          {written ? (
            <div id="robots-file">
              {generated.warnings.map((warning) => (
                <p key={warning} className="mb-2 text-sm leading-relaxed text-[var(--muted)]">
                  {warning}
                </p>
              ))}
              <pre className="max-h-96 overflow-auto rounded-2xl border border-[var(--stroke)] bg-white p-3 text-xs leading-relaxed">
                {generated.text}
              </pre>
              <div className="mt-3 flex flex-wrap gap-2">
                <button
                  className="btn-primary px-4 py-2 text-sm"
                  type="button"
                  onClick={() => {
                    markOutput("copy");
                    void copyText(generated.text).then(() => {
                      setCopied("Copied.");
                      window.setTimeout(() => setCopied(""), 2000);
                    });
                  }}
                >
                  Copy
                </button>
                <button
                  className="btn-ghost px-4 py-2 text-sm"
                  type="button"
                  onClick={() => {
                    markOutput("download");
                    downloadText(generated.text);
                    setCopied("Downloaded.");
                  }}
                >
                  Download
                </button>
                <button
                  className="btn-ghost px-4 py-2 text-sm"
                  type="button"
                  onClick={() => {
                    markOutput("regenerate");
                    setVariant((current) => current + 1);
                  }}
                >
                  {variant % 2 === 0 ? "One group per bot" : "Group bots that share a rule"}
                </button>
                {copied ? <span className="self-center text-sm text-[var(--muted)]">{copied}</span> : null}
              </div>
            </div>
          ) : null}
        </div>
      ) : null}

      {error ? (
        <p className="mt-4 text-sm text-[var(--fg)]" role="alert">
          {error}
        </p>
      ) : null}

      {evaluation && mode !== "generate" ? (
        <div id="robots-result" className="mt-6">
          <Result evaluation={evaluation} fetchMeta={result && !pasted ? result.fetch : null} />
        </div>
      ) : null}
    </section>
  );
}

function Result({
  evaluation,
  fetchMeta,
}: {
  evaluation: Evaluation;
  fetchMeta: FetchMeta | null;
}) {
  const showScores = evaluation.kind === "parsed" || evaluation.kind === "missing";

  return (
    <div>
      {showScores
        ? evaluation.scores.map((score, index) => (
            <p key={score.path} className={index === 0 ? "text-lg font-semibold tracking-tight" : "mt-1 text-lg font-semibold tracking-tight"}>
              {evaluation.scores.length > 1 ? <span className="font-mono">{score.path}</span> : null}
              {evaluation.scores.length > 1 ? ": " : null}
              {scoreSentence(score.lines)}
            </p>
          ))
        : null}
      <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
        {statusCopy(evaluation, fetchMeta)}
        {evaluation.mayIgnore.length
          ? ` ${evaluation.mayIgnore.length} tokens may ignore the file: ${evaluation.mayIgnore.join(", ")}.`
          : ""}
      </p>
      {fetchMeta ? <FetchNotes meta={fetchMeta} sitemaps={evaluation.sitemaps} /> : null}
      {evaluation.fixes.length ? (
        <div className="mt-4">
          <h3 className="text-base font-semibold">What to change</h3>
          <ul className="mt-2 grid gap-2">
            {evaluation.fixes.map((fix) => (
              <li key={fix} className="rounded-2xl border border-[var(--stroke)] bg-white p-3 text-sm leading-relaxed">
                {fix}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
      {evaluation.kind !== "refused" && evaluation.kind !== "not-robots" ? (
        <div className="mt-4 grid gap-4">
          {purposeOrder.map((purpose) => {
            const rows = evaluation.bots.filter((bot) => bot.purpose === purpose);
            if (!rows.length) return null;
            return (
              <section key={purpose}>
                <h3 className="text-base font-semibold">{rows[0].purposeLabel}</h3>
                <div className="mt-2 overflow-x-auto rounded-2xl border border-[var(--stroke)] bg-white">
                  <table className="w-full min-w-[44rem] text-left text-sm">
                    <thead className="text-[var(--muted)]">
                      <tr>
                        <th className="px-3 py-2 font-medium">Token</th>
                        {rows[0].paths.map((item) => (
                          <th key={item.path} className="px-3 py-2 font-medium">
                            {item.path}
                          </th>
                        ))}
                        <th className="px-3 py-2 font-medium">Group</th>
                        <th className="px-3 py-2 font-medium">Source</th>
                      </tr>
                    </thead>
                    <tbody>
                      {rows.map((bot) => (
                        <BotLine key={bot.token} bot={bot} />
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            );
          })}
        </div>
      ) : null}
      {fetchMeta?.preview ? (
        <details className="mt-4">
          <summary className="cursor-pointer text-sm font-medium">File that was fetched</summary>
          <pre className="mt-2 max-h-80 overflow-auto rounded-2xl border border-[var(--stroke)] bg-white p-3 text-xs leading-relaxed">
            {fetchMeta.preview}
            {fetchMeta.previewTrimmed ? "\n# Preview trimmed in the browser. The check used the full parsed body, up to 500 KiB." : ""}
          </pre>
        </details>
      ) : null}
    </div>
  );
}

function BotLine({ bot }: { bot: BotRow }) {
  const home = bot.paths[0];
  return (
    <tr className="border-t border-[var(--stroke)] align-top">
      <td className="px-3 py-2">
        <div className="font-medium">{bot.token}</div>
        <div className="text-[var(--muted)]">{bot.operator}</div>
        {!bot.fetches ? <div className="text-[var(--muted)]">Not a separate fetcher.</div> : null}
        {bot.honorsRobots === "may-ignore" ? <div>May ignore robots.txt.</div> : null}
        {bot.honorsRobots === "unstated" ? <div>Obedience not stated.</div> : null}
      </td>
      {bot.paths.map((item) => (
        <td key={item.path} className="px-3 py-2">
          <div>{accessLabel(item.access)}</div>
          {item.implicitRobots ? <div className="text-[var(--muted)]">/robots.txt is always allowed.</div> : null}
          {item.rule ? (
            <div className="text-[var(--muted)]">
              {item.rule.type}: {item.rule.pattern || "(empty)"}
            </div>
          ) : null}
          {item.prefixMatch ? <div className="text-[var(--muted)]">Prefix match. A group naming the full token would win.</div> : null}
        </td>
      ))}
      <td className="px-3 py-2">{home ? groupLabel(home) : ""}</td>
      <td className="px-3 py-2">
        <a className="text-[var(--link)] underline" href={bot.docUrl}>
          {bot.operator}
        </a>
        {bot.note ? <div className="mt-1 text-[var(--muted)]">{bot.note}</div> : null}
        {bot.caveat ? <div className="mt-1 text-[var(--muted)]">{bot.caveat}</div> : null}
      </td>
    </tr>
  );
}

function accessLabel(access: "allowed" | "disallowed" | "unknown") {
  if (access === "allowed") return "Allowed";
  if (access === "disallowed") return "Blocked";
  return "Not read";
}

function groupLabel(row: BotRow["paths"][number]) {
  if (!row.matchedAgents.length) return row.matchSource === "none" ? "No group" : "*";
  return row.matchedAgents.join(", ");
}

function statusCopy(evaluation: Evaluation, fetchMeta: FetchMeta | null) {
  if (evaluation.kind === "missing") {
    return `HTTP ${fetchMeta?.status ?? 404}. No robots.txt. A compliant crawler may fetch public URLs.`;
  }
  if (evaluation.kind === "unreachable") {
    return `HTTP ${fetchMeta?.status ?? "5xx"}. The file was unreachable. RFC 9309 treats that as a complete disallow until a fetch succeeds. The blocked column is that rule, not a line in the file.`;
  }
  if (evaluation.kind === "refused") {
    return `HTTP ${fetchMeta?.status ?? 403}. This checker did not read a robots.txt body.`;
  }
  if (evaluation.kind === "not-robots") {
    return `HTTP ${fetchMeta?.status ?? 200}, but the body was HTML. It was not parsed as robots.txt.`;
  }
  const where = fetchMeta ? `Fetched ${fetchMeta.finalUrl}.` : "Parsed the pasted file.";
  const redirects = fetchMeta && fetchMeta.redirects ? ` ${fetchMeta.redirects} redirect${fetchMeta.redirects === 1 ? "" : "s"}.` : "";
  const cut = fetchMeta?.truncated ? " The body was longer than 500 KiB and was cut there." : "";
  return `${where}${redirects}${cut} Allowed means the file lets that token through. For Google-Extended and Applebot-Extended, allowed means the training use is not opted out. Scores skip tokens the operator says may ignore the file, and tokens whose page does not say they read it.`;
}

function FetchNotes({ meta, sitemaps }: { meta: FetchMeta; sitemaps: string[] }) {
  const llms =
    meta.llms.state === "present"
      ? `/llms.txt returned HTTP ${meta.llms.status}. That file is not a robots.txt rule.`
      : meta.llms.state === "missing"
        ? `/llms.txt returned HTTP ${meta.llms.status}. A missing llms.txt does not change these rules.`
        : "/llms.txt could not be read. The robots.txt result above does not depend on it.";
  return (
    <ul className="mt-3 grid gap-1 text-sm text-[var(--muted)]">
      <li>{llms}</li>
      <li>
        {sitemaps.length
          ? `Sitemap ${sitemaps.length === 1 ? "line" : "lines"}: ${sitemaps.join(", ")}`
          : "No Sitemap line in the parsed file."}
      </li>
      {meta.requestedUrl !== meta.finalUrl ? <li>Requested {meta.requestedUrl}. Rules apply to the host you entered.</li> : null}
    </ul>
  );
}

