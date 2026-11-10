"use client";

import { useEffect, useMemo, useState } from "react";
import { commandLabels, defaultCommands, defaultPackageManager, packageManagersFor } from "@/lib/agents-md/defaults";
import { workedExamples } from "@/lib/agents-md/examples";
import { generateAgentsMd } from "@/lib/agents-md/generate";
import { agents, commandKeys, packageManagers, stacks } from "@/lib/agents-md/types";
import type { AgentId, AgentsMdInput, CommandKey, Commands, PackageManagerId, StackId } from "@/lib/agents-md/types";

const fieldClass =
  "focus-ring w-full rounded-2xl border border-[var(--stroke)] bg-white px-3 py-2 text-sm text-[var(--fg)]";

type LanguageModelSession = {
  prompt: (input: string) => Promise<string>;
  destroy?: () => void;
};

type LanguageModelApi = {
  availability: () => Promise<string>;
  create: (options?: {
    initialPrompts?: { role: "system" | "user" | "assistant"; content: string }[];
  }) => Promise<LanguageModelSession>;
};

function mergeCommands(current: Commands, previousDefaults: Commands, nextDefaults: Commands): Commands {
  const merged = { ...current };
  for (const key of commandKeys) {
    if (!current[key].trim() || current[key] === previousDefaults[key]) merged[key] = nextDefaults[key];
  }
  return merged;
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

function downloadMarkdown(value: string) {
  const blob = new Blob([value], { type: "text/markdown;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "AGENTS.md";
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

export function AgentsMdGenerator() {
  const [input, setInput] = useState<AgentsMdInput>(workedExamples[0].input);
  const [seed, setSeed] = useState(1);
  const [copied, setCopied] = useState(false);
  const [polished, setPolished] = useState<string | null>(null);
  const [polishNote, setPolishNote] = useState("");
  const [polishing, setPolishing] = useState(false);
  const [canPolish, setCanPolish] = useState(false);

  const result = useMemo(() => generateAgentsMd(input, seed), [input, seed]);
  const shown = polished ?? result.markdown;
  const managers = packageManagersFor(input.stack);

  useEffect(() => {
    const api = (window as Window & { LanguageModel?: LanguageModelApi }).LanguageModel;
    if (!api?.availability) return;
    let cancel = false;
    api
      .availability()
      .then((status) => {
        if (!cancel && (status === "available" || status === "readily")) setCanPolish(true);
      })
      .catch(() => {
        if (!cancel) setCanPolish(false);
      });
    return () => {
      cancel = true;
    };
  }, []);

  function update(patch: Partial<AgentsMdInput>) {
    setPolished(null);
    setPolishNote("");
    setInput((current) => ({ ...current, ...patch }));
  }

  function updateCommand(key: CommandKey, value: string) {
    setPolished(null);
    setPolishNote("");
    setInput((current) => ({ ...current, commands: { ...current.commands, [key]: value } }));
  }

  function changeStack(stack: StackId) {
    setPolished(null);
    setPolishNote("");
    setInput((current) => {
      const allowed = packageManagersFor(stack);
      const packageManager = allowed.includes(current.packageManager)
        ? current.packageManager
        : defaultPackageManager(stack);
      return {
        ...current,
        stack,
        packageManager,
        commands: mergeCommands(
          current.commands,
          defaultCommands(current.stack, current.packageManager),
          defaultCommands(stack, packageManager),
        ),
      };
    });
  }

  function changeManager(packageManager: PackageManagerId) {
    setPolished(null);
    setPolishNote("");
    setInput((current) => ({
      ...current,
      packageManager,
      commands: mergeCommands(
        current.commands,
        defaultCommands(current.stack, current.packageManager),
        defaultCommands(current.stack, packageManager),
      ),
    }));
  }

  function toggleAgent(id: AgentId) {
    setPolished(null);
    setPolishNote("");
    setInput((current) => {
      const has = current.agents.includes(id);
      return {
        ...current,
        agents: has ? current.agents.filter((agent) => agent !== id) : [...current.agents, id],
      };
    });
  }

  function loadExample(exampleInput: AgentsMdInput) {
    setPolished(null);
    setPolishNote("");
    setSeed(1);
    setInput(exampleInput);
    document.getElementById("agents-md-draft")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  async function polish() {
    const api = (window as Window & { LanguageModel?: LanguageModelApi }).LanguageModel;
    if (!api?.create) {
      setPolishNote("This browser has no built-in Prompt API. The rules draft is unchanged.");
      return;
    }
    setPolishing(true);
    setPolishNote("");
    try {
      const session = await api.create({
        initialPrompts: [
          {
            role: "system",
            content:
              "You tighten a repository instruction file. Return only Markdown. Do not add commands, paths, policies, or facts that are not already in the draft. Do not remove a runnable command or a do-not rule.",
          },
        ],
      });
      const text = (await session.prompt(result.markdown)).trim();
      session.destroy?.();
      const test = input.commands.test.trim();
      if (!text.includes("# AGENTS.md") || (test && !text.includes(test))) {
        setPolishNote("The browser model did not return a usable draft. The rules result is unchanged.");
        setPolished(null);
        return;
      }
      setPolished(`${text}\n`);
      setPolishNote("");
    } catch {
      setPolished(null);
      setPolishNote("The browser model did not return a draft. The rules result is unchanged.");
    } finally {
      setPolishing(false);
    }
  }

  return (
    <div>
      <div id="agents-md-draft" className="grid items-start gap-6 lg:grid-cols-2">
        <form
          className="glass rounded-3xl p-5 sm:p-6"
          autoComplete="off"
          onSubmit={(event) => event.preventDefault()}
        >
          <div className="flex flex-wrap gap-2">
            {workedExamples.slice(0, 3).map((example) => (
              <button
                key={example.id}
                type="button"
                className="btn-ghost px-3 py-1.5 text-xs"
                onClick={() => loadExample(example.input)}
              >
                {example.label}
              </button>
            ))}
            {workedExamples[3] ? (
              <button
                type="button"
                className="btn-ghost px-3 py-1.5 text-xs"
                onClick={() => loadExample(workedExamples[3].input)}
              >
                Rust library
              </button>
            ) : null}
          </div>
          <p className="mt-3 text-sm text-[var(--muted)]">
            An example is loaded so you can read a draft immediately. Edit any field. Nothing you type is sent to this
            site.
          </p>

          <div className="mt-4 grid gap-3">
            <label className="grid gap-1 text-sm">
              <span className="font-medium">Project name</span>
              <input
                className={fieldClass}
                value={input.projectName}
                onChange={(event) => update({ projectName: event.target.value })}
                placeholder="Northwind"
              />
            </label>
            <label className="grid gap-1 text-sm">
              <span className="font-medium">Short description</span>
              <textarea
                className={fieldClass}
                rows={2}
                value={input.description}
                onChange={(event) => update({ description: event.target.value })}
                placeholder="What this repo is, in one or two sentences."
              />
            </label>
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="grid gap-1 text-sm">
                <span className="font-medium">Stack</span>
                <select
                  className={fieldClass}
                  value={input.stack}
                  onChange={(event) => changeStack(event.target.value as StackId)}
                >
                  {stacks.map((stack) => (
                    <option key={stack.id} value={stack.id}>
                      {stack.label}
                    </option>
                  ))}
                </select>
              </label>
              <label className="grid gap-1 text-sm">
                <span className="font-medium">Package manager</span>
                <select
                  className={fieldClass}
                  value={input.packageManager}
                  onChange={(event) => changeManager(event.target.value as PackageManagerId)}
                >
                  {packageManagers
                    .filter((manager) => managers.includes(manager.id))
                    .map((manager) => (
                      <option key={manager.id} value={manager.id}>
                        {manager.label}
                      </option>
                    ))}
                </select>
              </label>
            </div>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={input.monorepo}
                onChange={(event) => update({ monorepo: event.target.checked })}
              />
              Monorepo, with nested AGENTS.md files for packages that differ
            </label>
            {input.monorepo ? (
              <label className="grid gap-1 text-sm">
                <span className="font-medium">Package name, if you are writing the root file with one package in mind</span>
                <input
                  className={fieldClass}
                  value={input.focusPackage}
                  onChange={(event) => update({ focusPackage: event.target.value })}
                  placeholder="web"
                />
              </label>
            ) : null}
          </div>

          <fieldset className="mt-4">
            <legend className="text-sm font-medium">Commands</legend>
            <p className="mt-1 text-xs leading-relaxed text-[var(--muted)]">
              Defaults follow the stack. Change any line that this repo does not actually run.
            </p>
            <div className="mt-2 grid gap-2">
              {commandKeys.map((key) => (
                <label key={key} className="grid gap-1 text-sm">
                  <span className="text-[var(--muted)]">{commandLabels[key]}</span>
                  <input
                    className={`${fieldClass} font-mono text-[13px]`}
                    spellCheck={false}
                    value={input.commands[key]}
                    onChange={(event) => updateCommand(key, event.target.value)}
                  />
                </label>
              ))}
            </div>
          </fieldset>

          <div className="mt-4 grid gap-3">
            <label className="grid gap-1 text-sm">
              <span className="font-medium">Directory layout</span>
              <textarea className={fieldClass} rows={2} value={input.layout} onChange={(event) => update({ layout: event.target.value })} />
            </label>
            <label className="grid gap-1 text-sm">
              <span className="font-medium">Code style</span>
              <textarea className={fieldClass} rows={2} value={input.style} onChange={(event) => update({ style: event.target.value })} />
            </label>
            <label className="grid gap-1 text-sm">
              <span className="font-medium">Testing expectations</span>
              <textarea className={fieldClass} rows={2} value={input.testing} onChange={(event) => update({ testing: event.target.value })} />
            </label>
            <label className="grid gap-1 text-sm">
              <span className="font-medium">PR and commit conventions</span>
              <textarea className={fieldClass} rows={2} value={input.commits} onChange={(event) => update({ commits: event.target.value })} />
            </label>
            <label className="grid gap-1 text-sm">
              <span className="font-medium">Security and secrets</span>
              <textarea className={fieldClass} rows={2} value={input.security} onChange={(event) => update({ security: event.target.value })} />
            </label>
            <label className="grid gap-1 text-sm">
              <span className="font-medium">What agents must never do</span>
              <textarea className={fieldClass} rows={2} value={input.never} onChange={(event) => update({ never: event.target.value })} />
            </label>
            <label className="grid gap-1 text-sm">
              <span className="font-medium">Anything else</span>
              <textarea className={fieldClass} rows={2} value={input.extra} onChange={(event) => update({ extra: event.target.value })} />
            </label>
          </div>

          <fieldset className="mt-4">
            <legend className="text-sm font-medium">Target agents</legend>
            <div className="mt-2 flex flex-wrap gap-2">
              {agents.map((agent) => (
                <label
                  key={agent.id}
                  className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-[var(--stroke)] bg-white px-3 py-1.5 text-sm"
                >
                  <input
                    type="checkbox"
                    checked={input.agents.includes(agent.id)}
                    onChange={() => toggleAgent(agent.id)}
                  />
                  {agent.label}
                </label>
              ))}
            </div>
          </fieldset>
        </form>

        <div className="lg:sticky lg:top-24">
          <div className="glass rounded-3xl p-5 sm:p-6">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h2 className="text-lg font-semibold tracking-tight">
                  {polished ? "Your generated AGENTS.md, polished in this browser" : "Your generated AGENTS.md"}
                </h2>
                <p className="mt-1 text-sm text-[var(--muted)]">
                  {polished
                    ? "Polished with this browser's built-in language model. The checklist below still scores the rules draft."
                    : "Rules draft. No model from this site wrote it."}
                </p>
              </div>
              <p className="text-sm text-[var(--muted)]" aria-live="polite">
                {result.passed} passed, {result.warnings} warnings, {result.failed} failed
              </p>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              <button
                type="button"
                className="btn-primary px-4 py-2 text-sm"
                onClick={() => {
                  void copyText(shown).then(() => {
                    setCopied(true);
                    window.setTimeout(() => setCopied(false), 2000);
                  });
                }}
              >
                {copied ? "Copied" : "Copy"}
              </button>
              <button type="button" className="btn-ghost px-4 py-2 text-sm" onClick={() => downloadMarkdown(shown)}>
                Download .md
              </button>
              <button
                type="button"
                className="btn-ghost px-4 py-2 text-sm"
                onClick={() => {
                  setPolished(null);
                  setPolishNote("");
                  setSeed((current) => current + 1);
                }}
              >
                Regenerate
              </button>
              {canPolish ? (
                <button type="button" className="btn-ghost px-4 py-2 text-sm" disabled={polishing} onClick={() => void polish()}>
                  {polishing ? "Polishing…" : "Polish on this device"}
                </button>
              ) : null}
            </div>
            {polishNote ? <p className="mt-2 text-sm text-[var(--muted)]">{polishNote}</p> : null}
            <pre className="mt-4 max-h-[32rem] overflow-auto rounded-2xl border border-[var(--stroke)] bg-white p-4 font-mono text-[13px] leading-relaxed whitespace-pre-wrap">
              {shown}
            </pre>
          </div>
          <ul className="mt-4 grid gap-2" aria-label="Draft checklist">
            {result.checks.map((item) => (
              <li key={item.id} className="rounded-2xl border border-[var(--stroke)] bg-white px-4 py-3 text-sm">
                <p className="font-medium">
                  <span
                    className={
                      item.status === "pass"
                        ? "text-[var(--color-cyan)]"
                        : item.status === "warn"
                          ? "text-[var(--gold)]"
                          : "text-[#9f2d2d]"
                    }
                  >
                    {item.status === "pass" ? "Pass" : item.status === "warn" ? "Warning" : "Fail"}
                  </span>
                  {" · "}
                  {item.label}
                </p>
                <p className="mt-1 leading-relaxed text-[var(--muted)]">{item.detail}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <section className="mt-12" aria-labelledby="worked-examples">
        <h2 id="worked-examples" className="text-2xl font-semibold tracking-tight">
          What does a finished draft look like?
        </h2>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-[var(--muted)]">
          Three inputs, three drafts, all from the same rules. The commands, the layout, and the agent notes change
          with the input. Regenerate on the live draft changes the wording, not the commands you typed.
        </p>
        <div className="mt-4 grid gap-4">
          {workedExamples.slice(0, 3).map((example) => {
            const sample = generateAgentsMd(example.input, 1);
            return (
              <article key={example.id} className="glass rounded-3xl p-5">
                <h3 className="text-lg font-semibold">{example.label}</h3>
                <p className="mt-1 text-sm text-[var(--muted)]">{example.blurb}</p>
                <p className="mt-2 text-sm">
                  Test command: <code>{example.input.commands.test}</code>
                  {example.input.monorepo ? ` · package ${example.input.focusPackage}` : ""}
                </p>
                <button type="button" className="btn-ghost mt-3 px-3 py-1.5 text-xs" onClick={() => loadExample(example.input)}>
                  Load this example
                </button>
                <pre className="mt-3 max-h-80 overflow-auto rounded-2xl border border-[var(--stroke)] bg-white p-4 font-mono text-[12px] leading-relaxed whitespace-pre-wrap">
                  {sample.markdown}
                </pre>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}
