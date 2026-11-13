"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { catalogServers } from "@/lib/mcp-config/catalog";
import { brokenConfigExample, workedExamples } from "@/lib/mcp-config/examples";
import { generate, generateAll } from "@/lib/mcp-config/generate";
import type { ClientId, GenerateInput, OsId, SecretStyle, ServerDraft, TransportId } from "@/lib/mcp-config/types";
import { validateConfig, type ValidationResult } from "@/lib/mcp-config/validate";
import { trackGoal } from "@/lib/analytics";

const fieldClass =
  "focus-ring w-full rounded-2xl border border-[var(--stroke)] bg-white px-3 py-2 text-sm text-[var(--fg)]";

const TOOL_SLUG = "mcp-config-generator";

const picker: { id: ClientId; label: string }[] = [
  { id: "claude-desktop", label: "Claude Desktop" },
  { id: "claude-code", label: "Claude Code" },
  { id: "cursor", label: "Cursor" },
  { id: "vscode", label: "VS Code" },
  { id: "windsurf", label: "Windsurf" },
];

const osLabels: Record<OsId, string> = { macos: "macOS", windows: "Windows", linux: "Linux" };

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

function downloadFile(value: string, name: string) {
  const blob = new Blob([value], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = name;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function blankServer(transport: TransportId): ServerDraft {
  return {
    name: transport === "stdio" ? "local" : "remote",
    transport,
    command: transport === "stdio" ? "npx" : "",
    args: transport === "stdio" ? ["-y"] : [],
    envNames: [],
    url: transport === "stdio" ? "" : "https://example.com/mcp",
    headerNames: [],
  };
}

export function McpConfigGenerator() {
  const [mode, setMode] = useState<"generate" | "validate">("generate");
  const [input, setInput] = useState<GenerateInput>(workedExamples[0].input);
  const [paste, setPaste] = useState(brokenConfigExample);
  const [checkClient, setCheckClient] = useState<ClientId>("vscode");
  const [checkOs, setCheckOs] = useState<OsId>("windows");
  const [copied, setCopied] = useState("");
  const [serverNote, setServerNote] = useState("");
  const ran = useRef(false);

  function markRun() {
    if (ran.current) return;
    ran.current = true;
    trackGoal("tool_run", { tool_slug: TOOL_SLUG });
  }

  function markOutput(action: "copy" | "download" | "regenerate") {
    trackGoal("tool_output_used", { tool_slug: TOOL_SLUG, action });
  }

  const file = useMemo(() => generate(input), [input]);
  const others = useMemo(() => generateAll(input).filter((item) => item.client !== input.client), [input]);
  const localCheck = useMemo(() => validateConfig(paste, checkClient, checkOs), [paste, checkClient, checkOs]);
  const [serverCheck, setServerCheck] = useState<ValidationResult | null>(null);
  const check = serverCheck ?? localCheck;

  useEffect(() => {
    setServerCheck(null);
    setServerNote("");
  }, [mode]);

  useEffect(() => {
    const controller = new AbortController();
    const timer = window.setTimeout(() => {
      const payload =
        mode === "generate"
          ? { action: "generate", input }
          : { action: "validate", config: paste, client: checkClient, os: checkOs };
      fetch("/api/tools/mcp-config", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
        signal: controller.signal,
      })
        .then(async (response) => {
          if (controller.signal.aborted) return;
          const data = (await response.json()) as { result?: ValidationResult & { body?: string }; error?: string };
          if (controller.signal.aborted) return;
          if (!response.ok || !data.result) {
            if (mode === "validate") setServerCheck(null);
            return;
          }
          if (mode === "validate") setServerCheck(data.result);
          setServerNote("Checked on the server. The paste is not stored.");
        })
        .catch(() => {
          if (!controller.signal.aborted && mode === "validate") setServerCheck(null);
        });
    }, 500);
    return () => {
      controller.abort();
      window.clearTimeout(timer);
    };
  }, [mode, input, paste, checkClient, checkOs]);

  function updateServer(index: number, patch: Partial<ServerDraft>) {
    markRun();
    setInput((current) => ({
      ...current,
      servers: current.servers.map((server, serverIndex) => (serverIndex === index ? { ...server, ...patch } : server)),
    }));
  }

  function addCatalog(id: string) {
    markRun();
    if (!id) return;
    if (id === "custom") {
      setInput((current) => ({ ...current, servers: [...current.servers, blankServer("stdio")] }));
      return;
    }
    const preset = catalogServers.find((server) => server.id === id);
    if (!preset) return;
    setInput((current) => ({ ...current, servers: [...current.servers, preset.build(current.os)] }));
  }

  async function copy(value: string, label: string) {
    markRun();
    markOutput("copy");
    await copyText(value);
    setCopied(label);
    window.setTimeout(() => setCopied(""), 1600);
  }

  return (
    <div id="mcp-config-draft">
      <div className="mb-4 flex flex-wrap gap-2">
        <button type="button" className={mode === "generate" ? "btn-primary px-4 py-2 text-sm" : "btn-ghost px-4 py-2 text-sm"} onClick={() => setMode("generate")}>
          Generate
        </button>
        <button type="button" className={mode === "validate" ? "btn-primary px-4 py-2 text-sm" : "btn-ghost px-4 py-2 text-sm"} onClick={() => { markRun(); setMode("validate"); }}>
          Check a config
        </button>
      </div>

      {mode === "generate" ? (
        <div className="grid items-start gap-6 lg:grid-cols-2">
          <form className="glass rounded-3xl p-5 sm:p-6" autoComplete="off" onSubmit={(event) => event.preventDefault()}>
            <div className="flex flex-wrap gap-2">
              {workedExamples.map((example) => (
                <button
                  key={example.id}
                  type="button"
                  className="btn-ghost px-3 py-1.5 text-xs"
                  onClick={() => {
                    markRun();
                    setInput(example.input);
                  }}
                >
                  {example.label}
                </button>
              ))}
            </div>
            <p className="mt-3 text-sm text-[var(--muted)]">
              An example is loaded. Edit it. The form sends the field values so the server can build the same file. It does not ask for a token, and it does not store the request.
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <label className="grid gap-1 text-sm">
                <span className="font-medium">Client</span>
                <select
                  className={fieldClass}
                  value={input.client === "vscode-copilot" ? "vscode" : input.client}
                  onChange={(event) => {
                    markRun();
                    const next = event.target.value as ClientId;
                    setInput((current) => ({
                      ...current,
                      client: next === "vscode" && current.client === "vscode-copilot" ? "vscode-copilot" : next,
                    }));
                  }}
                >
                  {picker.map((client) => (
                    <option key={client.id} value={client.id}>
                      {client.label}
                    </option>
                  ))}
                </select>
              </label>
              <label className="grid gap-1 text-sm">
                <span className="font-medium">Operating system</span>
                <select
                  className={fieldClass}
                  value={input.os}
                  onChange={(event) => {
                    markRun();
                    setInput((current) => ({ ...current, os: event.target.value as OsId }));
                  }}
                >
                  {(["macos", "windows", "linux"] as const).map((os) => (
                    <option key={os} value={os}>
                      {osLabels[os]}
                    </option>
                  ))}
                </select>
              </label>
              <label className="grid gap-1 text-sm sm:col-span-2">
                <span className="font-medium">Secret style</span>
                <select
                  className={fieldClass}
                  value={input.secretStyle}
                  onChange={(event) => {
                    markRun();
                    setInput((current) => ({ ...current, secretStyle: event.target.value as SecretStyle }));
                  }}
                >
                  <option value="env">Environment reference</option>
                  <option value="input">VS Code input prompt</option>
                </select>
              </label>
              {input.client === "vscode" || input.client === "vscode-copilot" ? (
                <label className="grid gap-1 text-sm sm:col-span-2">
                  <span className="font-medium">VS Code file</span>
                  <select
                    className={fieldClass}
                    value={input.client}
                    onChange={(event) => {
                      markRun();
                      setInput((current) => ({ ...current, client: event.target.value as ClientId }));
                    }}
                  >
                    <option value="vscode">Editor file, .vscode/mcp.json (servers and inputs)</option>
                    <option value="vscode-copilot">Copilot portable file, .mcp.json (mcpServers)</option>
                  </select>
                </label>
              ) : null}
            </div>

            <div className="mt-4 grid gap-3">
              {input.servers.map((server, index) => (
                <fieldset key={`${server.name}-${index}`} className="rounded-2xl border border-[var(--stroke)] p-3">
                  <legend className="px-1 text-sm font-medium">Server {index + 1}</legend>
                  <div className="grid gap-2">
                    <div className="grid gap-2 sm:grid-cols-2">
                      <label className="grid gap-1 text-sm">
                        <span className="text-[var(--muted)]">Name</span>
                        <input className={fieldClass} value={server.name} spellCheck={false} onChange={(event) => updateServer(index, { name: event.target.value })} />
                      </label>
                      <label className="grid gap-1 text-sm">
                        <span className="text-[var(--muted)]">Transport</span>
                        <select
                          className={fieldClass}
                          value={server.transport}
                          onChange={(event) => updateServer(index, { transport: event.target.value as TransportId })}
                        >
                          <option value="stdio">stdio (command)</option>
                          <option value="http">Streamable HTTP</option>
                          <option value="sse">SSE</option>
                        </select>
                      </label>
                    </div>
                    {server.transport === "stdio" ? (
                      <>
                        <label className="grid gap-1 text-sm">
                          <span className="text-[var(--muted)]">Command</span>
                          <input className={`${fieldClass} font-mono text-[13px]`} value={server.command} spellCheck={false} onChange={(event) => updateServer(index, { command: event.target.value })} />
                        </label>
                        <label className="grid gap-1 text-sm">
                          <span className="text-[var(--muted)]">Args, one per line</span>
                          <textarea
                            className={`${fieldClass} font-mono text-[13px]`}
                            rows={4}
                            spellCheck={false}
                            value={server.args.join("\n")}
                            onChange={(event) => updateServer(index, { args: event.target.value.split("\n") })}
                          />
                        </label>
                      </>
                    ) : (
                      <label className="grid gap-1 text-sm">
                        <span className="text-[var(--muted)]">URL</span>
                        <input className={`${fieldClass} font-mono text-[13px]`} value={server.url} spellCheck={false} onChange={(event) => updateServer(index, { url: event.target.value })} />
                      </label>
                    )}
                    <label className="grid gap-1 text-sm">
                      <span className="text-[var(--muted)]">Env var names, comma separated. Values are not accepted.</span>
                      <input
                        className={fieldClass}
                        value={server.envNames.join(", ")}
                        spellCheck={false}
                        placeholder="GITHUB_PERSONAL_ACCESS_TOKEN"
                        onChange={(event) =>
                          updateServer(index, {
                            envNames: event.target.value.split(",").map((name) => name.trim()).filter(Boolean),
                          })
                        }
                      />
                    </label>
                    {server.transport !== "stdio" ? (
                      <label className="grid gap-1 text-sm">
                        <span className="text-[var(--muted)]">Header names, comma separated</span>
                        <input
                          className={fieldClass}
                          value={server.headerNames.join(", ")}
                          spellCheck={false}
                          placeholder="Authorization"
                          onChange={(event) =>
                            updateServer(index, {
                              headerNames: event.target.value.split(",").map((name) => name.trim()).filter(Boolean),
                            })
                          }
                        />
                      </label>
                    ) : null}
                    <button
                      type="button"
                      className="btn-ghost w-fit px-3 py-1.5 text-xs"
                      onClick={() => {
                        markRun();
                        setInput((current) => ({ ...current, servers: current.servers.filter((_, serverIndex) => serverIndex !== index) }));
                      }}
                    >
                      Remove
                    </button>
                  </div>
                </fieldset>
              ))}
            </div>
            <label className="mt-3 grid gap-1 text-sm">
              <span className="font-medium">Add a server</span>
              <select className={fieldClass} value="" onChange={(event) => { addCatalog(event.target.value); event.target.value = ""; }}>
                <option value="">Choose a known server or a blank one</option>
                {catalogServers.map((server) => (
                  <option key={server.id} value={server.id}>
                    {server.label}
                  </option>
                ))}
                <option value="custom">Custom server</option>
              </select>
            </label>
          </form>

          <div className="glass rounded-3xl p-5 sm:p-6">
            <p className="kicker">Your generated MCP config</p>
            <h2 className="mt-2 text-xl font-semibold tracking-tight">{file.label}</h2>
            <p className="mt-2 text-sm text-[var(--muted)]">
              {file.kind === "json" ? `File: ${file.fileName}` : "No JSON file. Remote Claude servers are a connector, not a config key."}{" "}
              {serverNote}
            </p>
            <ul className="mt-3 grid gap-1 text-sm">
              {file.paths.map((path) => (
                <li key={path.os} className={path.os === input.os ? "font-medium" : "text-[var(--muted)]"}>
                  <span className="inline-block w-16">{osLabels[path.os]}</span>
                  <code>{path.path}</code>
                </li>
              ))}
            </ul>
            <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{file.folderNote}</p>
            <pre className="mt-3 max-h-80 overflow-auto rounded-2xl bg-[var(--bg)] p-3 text-xs leading-relaxed"><code>{file.body}</code></pre>
            <div className="mt-3 flex flex-wrap gap-2">
              <button type="button" className="btn-primary px-4 py-2 text-sm" onClick={() => copy(file.body, "config")}>
                {copied === "config" ? "Copied" : "Copy"}
              </button>
              <button
                type="button"
                className="btn-ghost px-4 py-2 text-sm"
                onClick={() => {
                  markRun();
                  markOutput("download");
                  downloadFile(file.body, file.kind === "json" ? file.fileName : "claude-remote-connector.txt");
                }}
              >
                Download
              </button>
              <button
                type="button"
                className="btn-ghost px-4 py-2 text-sm"
                onClick={() => {
                  markRun();
                  markOutput("regenerate");
                  setInput((current) => {
                    if (current.client === "vscode") return { ...current, client: "vscode-copilot", secretStyle: "env" };
                    if (current.client === "vscode-copilot") return { ...current, client: "vscode", secretStyle: current.secretStyle === "input" ? "env" : "input" };
                    return { ...current, secretStyle: current.secretStyle === "env" ? "input" : "env" };
                  });
                }}
              >
                Variation
              </button>
            </div>
            {file.commands.length ? (
              <div className="mt-4">
                <h3 className="text-sm font-semibold">CLI</h3>
                {file.commands.map((command) => (
                  <div key={command} className="mt-2">
                    <pre className="overflow-auto rounded-2xl bg-[var(--bg)] p-3 text-xs"><code>{command}</code></pre>
                    <button type="button" className="btn-ghost mt-2 px-3 py-1.5 text-xs" onClick={() => copy(command, command)}>
                      {copied === command ? "Copied" : "Copy command"}
                    </button>
                  </div>
                ))}
                <p className="mt-2 text-sm text-[var(--muted)]">{file.commandNote}</p>
              </div>
            ) : (
              <p className="mt-4 text-sm text-[var(--muted)]">{file.commandNote}</p>
            )}
            <h3 className="mt-4 text-sm font-semibold">Notes for this file</h3>
            <ul className="mt-2 grid gap-2 text-sm leading-relaxed text-[var(--muted)]">
              {file.notes.map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>
            {file.limits.length ? (
              <ul className="mt-3 grid gap-2 text-sm leading-relaxed">
                {file.limits.map((limit) => (
                  <li key={limit}>{limit}</li>
                ))}
              </ul>
            ) : null}
          </div>
        </div>
      ) : (
        <div className="grid items-start gap-6 lg:grid-cols-2">
          <form className="glass rounded-3xl p-5 sm:p-6" autoComplete="off" onSubmit={(event) => event.preventDefault()}>
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="grid gap-1 text-sm">
                <span className="font-medium">Client this file is for</span>
                <select className={fieldClass} value={checkClient} onChange={(event) => { markRun(); setServerCheck(null); setCheckClient(event.target.value as ClientId); }}>
                  {picker.map((client) => (
                    <option key={client.id} value={client.id}>{client.label}</option>
                  ))}
                  <option value="vscode-copilot">VS Code Copilot portable file</option>
                </select>
              </label>
              <label className="grid gap-1 text-sm">
                <span className="font-medium">Operating system</span>
                <select className={fieldClass} value={checkOs} onChange={(event) => { markRun(); setServerCheck(null); setCheckOs(event.target.value as OsId); }}>
                  {(["macos", "windows", "linux"] as const).map((os) => (
                    <option key={os} value={os}>{osLabels[os]}</option>
                  ))}
                </select>
              </label>
            </div>
            <label className="mt-3 grid gap-1 text-sm">
              <span className="font-medium">Paste the config</span>
              <textarea
                className={`${fieldClass} font-mono text-[13px]`}
                rows={16}
                spellCheck={false}
                value={paste}
                onChange={(event) => {
                  markRun();
                  setServerCheck(null);
                  setPaste(event.target.value);
                }}
              />
            </label>
            <button
              type="button"
              className="btn-ghost mt-3 px-3 py-1.5 text-xs"
              onClick={() => {
                markRun();
                setServerCheck(null);
                setCheckClient("vscode");
                setCheckOs("windows");
                setPaste(brokenConfigExample);
              }}
            >
              Load the broken VS Code example
            </button>
            <p className="mt-3 text-sm text-[var(--muted)]">
              The check runs in the browser, then again on the server. The paste is not written to a file, a database, or a log. A value that looks like a token is replaced with [redacted] before it is shown.
            </p>
          </form>
          <div className="glass rounded-3xl p-5 sm:p-6">
            <p className="kicker">Review</p>
            <h2 className="mt-2 text-xl font-semibold tracking-tight">Score {check.score} of 100</h2>
            <p className="mt-2 text-sm leading-relaxed">{check.verdict}</p>
            <p className="mt-1 text-sm text-[var(--muted)]">{serverNote || "Showing the browser check."}</p>
            <ul className="mt-4 grid gap-3">
              {check.findings.map((finding, index) => (
                <li key={`${finding.code}-${index}`} className="rounded-2xl border border-[var(--stroke)] p-3">
                  <p className="text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">
                    {finding.severity}
                    {finding.line ? ` · line ${finding.line}, column ${finding.column}` : ""}
                  </p>
                  <h3 className="mt-1 text-sm font-semibold">{finding.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-[var(--muted)]">{finding.detail}</p>
                </li>
              ))}
            </ul>
            {check.fixed ? (
              <div className="mt-4">
                <h3 className="text-sm font-semibold">Fixed version</h3>
                <pre className="mt-2 max-h-80 overflow-auto rounded-2xl bg-[var(--bg)] p-3 text-xs leading-relaxed"><code>{check.fixed}</code></pre>
                <div className="mt-2 flex flex-wrap gap-2">
                  <button type="button" className="btn-primary px-4 py-2 text-sm" onClick={() => copy(check.fixed ?? "", "fixed")}>
                    {copied === "fixed" ? "Copied" : "Copy fixed file"}
                  </button>
                  <button
                    type="button"
                    className="btn-ghost px-4 py-2 text-sm"
                    onClick={() => {
                      markRun();
                      markOutput("download");
                      downloadFile(check.fixed ?? "", "mcp.fixed.json");
                    }}
                  >
                    Download
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      )}

      {mode === "generate" ? (
        <section className="mt-6" aria-labelledby="convert-clients">
          <h2 id="convert-clients" className="text-lg font-semibold tracking-tight">Convert to other clients</h2>
          <p className="mt-1 text-sm text-[var(--muted)]">Same servers, each client's documented file. A key that is right for one of these is wrong for another.</p>
          <ul className="mt-3 grid gap-3">
            {others.map((other) => (
              <li key={other.client} className="rounded-2xl border border-[var(--stroke)] p-3">
                <h3 className="text-sm font-semibold">{other.label}</h3>
                <p className="mt-1 text-xs text-[var(--muted)]">{other.paths.find((path) => path.os === input.os)?.path}</p>
                <pre className="mt-2 max-h-48 overflow-auto rounded-2xl bg-[var(--bg)] p-3 text-xs"><code>{other.body}</code></pre>
                <button type="button" className="btn-ghost mt-2 px-3 py-1.5 text-xs" onClick={() => copy(other.body, other.client)}>
                  {copied === other.client ? "Copied" : "Copy"}
                </button>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  );
}
