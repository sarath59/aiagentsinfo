import { isHardcodedSecret, isReference, maskSecrets } from "@/lib/mcp-config/mask";
import type { ClientId, OsId } from "@/lib/mcp-config/types";

export type Finding = {
  severity: "error" | "warning" | "note";
  code: string;
  title: string;
  detail: string;
  line?: number;
  column?: number;
};

export type ValidationResult = {
  score: number;
  verdict: string;
  findings: Finding[];
  fixed: string | null;
  parsed: boolean;
};

const NAME_RE = /^[A-Za-z0-9_-]+$/;
const EXPECTED_KEY: Record<ClientId, "mcpServers" | "servers"> = {
  "claude-desktop": "mcpServers",
  "claude-code": "mcpServers",
  cursor: "mcpServers",
  vscode: "servers",
  "vscode-copilot": "mcpServers",
  windsurf: "mcpServers",
};

function positionAt(text: string, index: number) {
  const clipped = Math.max(0, Math.min(index, text.length));
  let line = 1;
  let column = 1;
  for (let i = 0; i < clipped; i += 1) {
    if (text[i] === "\n") {
      line += 1;
      column = 1;
    } else column += 1;
  }
  return { line, column };
}

function parseConfig(text: string) {
  const source = text.replace(/^\uFEFF/, "");
  try {
    return { value: JSON.parse(source) as unknown, source };
  } catch (error) {
    const message = error instanceof Error ? error.message : "The file is not valid JSON.";
    const match = message.match(/position (\d+)/i);
    const at = positionAt(source, match ? Number(match[1]) : 0);
    const cleaned = message.replace(/\s*in JSON at position \d+/i, "").replace(/^JSON\.parse:\s*/i, "").trim();
    return {
      source,
      error: {
        message: cleaned || "The file is not valid JSON.",
        line: at.line,
        column: at.column,
      },
    };
  }
}

export function findDuplicateKeys(text: string) {
  const dupes: { key: string; line: number; column: number }[] = [];
  const stack: { type: "object" | "array"; keys: Set<string>; expect: "key" | "colon" | "value" | "comma" }[] = [];
  let i = 0;
  let line = 1;
  let column = 1;

  function advance(count: number) {
    for (let n = 0; n < count; n += 1) {
      if (text[i] === "\n") {
        line += 1;
        column = 1;
      } else column += 1;
      i += 1;
    }
  }

  function readString() {
    const startLine = line;
    const startColumn = column;
    advance(1);
    let raw = "\"";
    while (i < text.length) {
      const ch = text[i];
      raw += ch;
      if (ch === "\\") {
        advance(1);
        if (i < text.length) {
          raw += text[i];
          advance(1);
        }
        continue;
      }
      advance(1);
      if (ch === "\"") {
        try {
          return { value: JSON.parse(raw) as string, line: startLine, column: startColumn };
        } catch {
          return { value: raw.slice(1, -1), line: startLine, column: startColumn };
        }
      }
    }
    return null;
  }

  while (i < text.length) {
    const ch = text[i];
    if (ch === " " || ch === "\t" || ch === "\r" || ch === "\n") {
      advance(1);
      continue;
    }
    const frame = stack[stack.length - 1];
    if (ch === "{") {
      stack.push({ type: "object", keys: new Set(), expect: "key" });
      advance(1);
      continue;
    }
    if (ch === "[") {
      stack.push({ type: "array", keys: new Set(), expect: "value" });
      advance(1);
      continue;
    }
    if (ch === "}" || ch === "]") {
      stack.pop();
      advance(1);
      const parent = stack[stack.length - 1];
      if (parent?.expect === "value") parent.expect = "comma";
      continue;
    }
    if (ch === ",") {
      advance(1);
      if (frame?.type === "object") frame.expect = "key";
      if (frame?.type === "array") frame.expect = "value";
      continue;
    }
    if (ch === ":") {
      advance(1);
      if (frame?.type === "object" && frame.expect === "colon") frame.expect = "value";
      continue;
    }
    if (ch === "\"") {
      const parsed = readString();
      if (!parsed) break;
      if (frame?.type === "object" && frame.expect === "key") {
        if (frame.keys.has(parsed.value)) dupes.push({ key: parsed.value, line: parsed.line, column: parsed.column });
        else frame.keys.add(parsed.value);
        frame.expect = "colon";
      } else if (frame?.expect === "value") {
        frame.expect = "comma";
      }
      continue;
    }
    if (frame?.expect === "value" || frame?.type === "array") {
      while (i < text.length && !/[\s,\]}]/.test(text[i])) advance(1);
      if (frame) frame.expect = "comma";
      continue;
    }
    advance(1);
  }
  return dupes;
}

function record(value: unknown) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  return value as Record<string, unknown>;
}

function text(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function isRelativePath(arg: string) {
  if (!arg || arg.startsWith("-") || arg.startsWith("@")) return false;
  if (/^https?:\/\//i.test(arg)) return false;
  if (/^[a-z0-9.-]+\.[a-z]{2,}\//i.test(arg)) return false;
  if (arg.startsWith("./") || arg.startsWith("../") || arg.startsWith(".\\") || arg.startsWith("..\\")) return true;
  if (arg.startsWith("/") || /^[A-Za-z]:[\\/]/.test(arg)) return false;
  return arg.includes("/") || arg.includes("\\");
}

function clientName(client: ClientId) {
  if (client === "claude-desktop") return "Claude Desktop";
  if (client === "claude-code") return "Claude Code";
  if (client === "cursor") return "Cursor";
  if (client === "vscode") return "VS Code's editor file";
  if (client === "vscode-copilot") return "VS Code's Copilot portable file";
  return "Windsurf";
}

function keyExplanation(client: ClientId, found: string) {
  const expected = EXPECTED_KEY[client];
  if (client === "vscode" && found === "mcpServers") {
    return "VS Code's editor file, .vscode/mcp.json, reads servers. mcpServers is the key for Claude Desktop, Claude Code, Cursor, Windsurf, and for VS Code's newer Copilot portable file. The configuration reference says the Copilot harness does not read .vscode/mcp.json directly. A Cursor file pasted into .vscode/mcp.json is valid JSON and an invisible server.";
  }
  if (client === "vscode-copilot" && found === "servers") {
    return "The portable Copilot file reads mcpServers. servers is the editor-managed key in .vscode/mcp.json. The reference says new Copilot configs should use the portable file, and that the harness does not read the editor file directly.";
  }
  return `${clientName(client)} reads ${expected}. This file's server map is under ${found}. The other key is a different client.`;
}

function requiresType(client: ClientId) {
  return client === "claude-code" || client === "vscode" || client === "vscode-copilot";
}

function referenceFor(client: ClientId, envName: string, inputId: string) {
  if (client === "vscode") return `\${input:${inputId}}`;
  if (client === "cursor" || client === "windsurf") return `\${env:${envName}}`;
  if (client === "claude-code" || client === "vscode-copilot") return `\${${envName}}`;
  return "REPLACE_ON_THIS_MACHINE";
}

function inputIdFor(name: string, used: Set<string>) {
  const base = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "secret";
  let id = base;
  let n = 2;
  while (used.has(id)) {
    id = `${base}-${n}`;
    n += 1;
  }
  used.add(id);
  return id;
}

function sanitizeName(name: string, index: number) {
  if (NAME_RE.test(name)) return name;
  const cleaned = name
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^A-Za-z0-9_-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
  return cleaned || `server-${index + 1}`;
}

function withYes(command: string, args: string[]) {
  const next = [...args];
  const at = command === "npx" ? 0 : next.indexOf("npx") + 1;
  if (command !== "npx" && at === 0) return next;
  if (next[at] === "-y" || next[at] === "--yes") return next;
  next.splice(at, 0, "-y");
  return next;
}

function wrapWindows(command: string, args: string[], os: OsId) {
  if (os !== "windows" || command !== "npx") return { command, args };
  return { command: "cmd", args: ["/c", "npx", ...args] };
}

function verdictFor(score: number, parsed: boolean) {
  if (!parsed) return "The file is not JSON, so no client can load it.";
  if (score >= 90) return "This file matches the client's documented shape.";
  if (score >= 70) return "A client can read this file. Fix the warnings before you rely on it.";
  if (score >= 40) return "A client is likely to skip a server in this file.";
  return "Do not save this file until the errors are gone.";
}

function push(findings: Finding[], finding: Finding) {
  findings.push(finding);
}

export function validateConfig(config: string, client: ClientId, os: OsId): ValidationResult {
  const findings: Finding[] = [];
  const parsed = parseConfig(config);
  if ("error" in parsed && parsed.error) {
    push(findings, {
      severity: "error",
      code: "json",
      title: `JSON parse error at line ${parsed.error.line}, column ${parsed.error.column}`,
      detail: `${parsed.error.message} Nothing after this point is a config. Fix the syntax, then run the check again. A comment, a trailing comma, or a smart quote is enough to make the client skip the file.`,
      line: parsed.error.line,
      column: parsed.error.column,
    });
    return { score: 0, verdict: verdictFor(0, false), findings, fixed: null, parsed: false };
  }

  const source = "source" in parsed ? parsed.source : config;
  for (const dupe of findDuplicateKeys(source)) {
    push(findings, {
      severity: "error",
      code: "duplicate-key",
      title: `Duplicate key "${dupe.key}"`,
      detail:
        "JSON keeps the last copy and drops the earlier one without an error. The client does the same, so the server you thought you edited may not be the one that loads.",
      line: dupe.line,
      column: dupe.column,
    });
  }

  const root = record(parsed.value);
  if (!root) {
    push(findings, {
      severity: "error",
      code: "root",
      title: "The top level is not an object",
      detail: "Every client on this page reads a JSON object. An array, a string, or a bare server entry will not load.",
    });
    return { score: 0, verdict: verdictFor(0, true), findings, fixed: null, parsed: true };
  }

  const expected = EXPECTED_KEY[client];
  const alternate = expected === "servers" ? "mcpServers" : "servers";
  const hasExpected = record(root[expected]) !== null || expected in root;
  const hasAlternate = record(root[alternate]) !== null || alternate in root;
  let serverMap = record(root[expected]);
  if (!serverMap && hasAlternate) serverMap = record(root[alternate]);

  if (root.mcp && record(root.mcp)) {
    push(findings, {
      severity: "error",
      code: "mcp-wrapper",
      title: "The servers are nested under mcp",
      detail:
        "GitHub's README shows an mcp wrapper for some IDE buttons, then says a .vscode/mcp.json copy should omit that wrapper. None of the client files this tool writes use a top-level mcp key.",
    });
  }

  if (expected in root && !record(root[expected])) {
    push(findings, {
      severity: "error",
      code: "map-type",
      title: `${expected} is not an object`,
      detail: "The server map is an object whose keys are server names. An array or a string is not a map.",
    });
  }

  if (hasExpected && hasAlternate) {
    push(findings, {
      severity: "error",
      code: "both-keys",
      title: "Both mcpServers and servers are set",
      detail: `${clientName(client)} reads ${expected}. The other object is ignored, or it is a second file pasted into the first. Keep one.`,
    });
  } else if (!hasExpected && hasAlternate) {
    push(findings, {
      severity: "error",
      code: "wrong-key",
      title: `Wrong top-level key: ${alternate}`,
      detail: keyExplanation(client, alternate),
    });
  } else if (!hasExpected && !serverMap) {
    push(findings, {
      severity: "error",
      code: "missing-map",
      title: `Missing ${expected}`,
      detail: `${clientName(client)} looks for a ${expected} object. Without it, the file is valid JSON and an empty config.`,
    });
  }

  if (client === "vscode-copilot" && Array.isArray(root.inputs)) {
    push(findings, {
      severity: "warning",
      code: "inputs-portable",
      title: "inputs is an editor-only field",
      detail:
        "The portable Copilot file does not prompt. The reference says not to copy inputs into it, and a server that needs ${input:...} is not forwarded. Use ${NAME} from the environment.",
    });
  }

  const inputs = Array.isArray(root.inputs) ? root.inputs : [];
  const inputIds = new Set(
    inputs
      .map((item) => record(item))
      .filter((item): item is Record<string, unknown> => Boolean(item))
      .map((item) => text(item.id))
      .filter(Boolean),
  );

  const fixedMap: Record<string, unknown> = {};
  const fixedInputs: Record<string, unknown>[] = [];
  const usedInputIds = new Set<string>();
  const usedNames = new Set<string>();

  if (serverMap) {
    const names = Object.keys(serverMap);
    if (!names.length) {
      push(findings, {
        severity: "warning",
        code: "empty-map",
        title: `${expected} is empty`,
        detail: "The key is right and there are no servers under it. Add one entry, or you restarted the client for a file that connects nothing.",
      });
    }
    names.forEach((name, index) => {
      const entry = record(serverMap?.[name]);
      const safeName = sanitizeName(name, index);
      let finalName = safeName;
      let n = 2;
      while (usedNames.has(finalName)) {
        finalName = `${safeName}-${n}`;
        n += 1;
      }
      usedNames.add(finalName);

      if (!NAME_RE.test(name)) {
        push(findings, {
          severity: client === "claude-code" ? "error" : "warning",
          code: "server-name",
          title: `Server name "${name}" will be rejected or awkward`,
          detail:
            "Claude Code accepts only letters, numbers, hyphens, and underscores, and the key is the name. VS Code's portable docs say to avoid spaces and special characters. The fixed file uses a name that passes that rule.",
        });
      }

      if (!entry) {
        push(findings, {
          severity: "error",
          code: "entry-type",
          title: `"${name}" is not an object`,
          detail: "A server entry is an object of command and args, or of a url. A string or array here is skipped.",
        });
        return;
      }

      const type = text(entry.type);
      const command = text(entry.command);
      const url = text(entry.url) || text(entry.serverUrl);
      const hasCommand = Boolean(command);
      const hasUrl = Boolean(url);
      let transport: "stdio" | "http" | "sse" | "drop" = "drop";
      if (type === "stdio" || type === "http" || type === "sse" || type === "streamable-http") {
        transport = type === "streamable-http" ? "http" : type === "stdio" ? "stdio" : type === "sse" ? "sse" : "http";
      } else if (hasUrl && !hasCommand) transport = "http";
      else if (hasCommand && !hasUrl) transport = "stdio";
      else if (hasUrl && hasCommand) transport = "stdio";

      if (hasCommand && hasUrl) {
        push(findings, {
          severity: "error",
          code: "mixed-transport",
          title: `"${name}" has both a command and a url`,
          detail:
            "stdio is a process: command and args. HTTP and SSE are a url and optional headers. Claude Code treats a missing type as stdio, so a url sitting next to a command is the wrong process. The fixed file keeps one side.",
        });
      }
      if ((type === "stdio" && hasUrl && !hasCommand) || ((type === "http" || type === "sse" || type === "streamable-http") && hasCommand && !hasUrl)) {
        push(findings, {
          severity: "error",
          code: "type-mismatch",
          title: `"${name}" says ${type} and then uses the other transport's fields`,
          detail: "The type and the fields disagree. A stdio entry needs command. An http or sse entry needs url.",
        });
      }
      if (client === "claude-code" && hasUrl && !type) {
        push(findings, {
          severity: "error",
          code: "claude-url-type",
          title: `"${name}" has a url and no type`,
          detail:
            "Claude Code reads a missing type as stdio, then skips the server. The docs tell you to add type http, sse, or ws. The fixed file sets http.",
        });
        if (transport === "stdio") transport = "http";
      }
      if (requiresType(client) && !type && transport !== "drop") {
        push(findings, {
          severity: "error",
          code: "missing-type",
          title: `"${name}" has no type`,
          detail:
            client === "vscode"
              ? "The editor field table marks type as required: stdio, http, or sse."
              : "This client's field table marks type as required on every server.",
        });
      }
      if (client === "cursor" && transport === "stdio" && !type) {
        push(findings, {
          severity: "warning",
          code: "cursor-type",
          title: `"${name}" omits type`,
          detail:
            "Cursor's stdio field table marks type as required. Several examples on the same page omit it. Add \"stdio\" so the file matches the table, not only the shortest example.",
        });
      }
      if (type === "streamable-http") {
        push(findings, {
          severity: "note",
          code: "alias",
          title: `"${name}" uses the streamable-http alias`,
          detail: "Claude Code accepts streamable-http as an alias of http. Other clients on this page document http. The fixed file writes http.",
        });
      }
      if (transport === "drop") {
        push(findings, {
          severity: "error",
          code: "missing-launch",
          title: `"${name}" has neither a command nor a url`,
          detail: "There is nothing for the client to start or to connect to. The fixed file omits this server.",
        });
        return;
      }
      if (transport === "stdio" && !hasCommand) {
        push(findings, {
          severity: "error",
          code: "missing-command",
          title: `"${name}" is stdio and has no command`,
          detail: "The client cannot launch a process without command. The fixed file omits this server.",
        });
        return;
      }
      if (transport !== "stdio" && !hasUrl) {
        push(findings, {
          severity: "error",
          code: "missing-url",
          title: `"${name}" is remote and has no url`,
          detail: "HTTP and SSE need a url. Windsurf also accepts serverUrl. The fixed file omits this server.",
        });
        return;
      }
      if (client === "claude-desktop" && transport !== "stdio") {
        push(findings, {
          severity: "error",
          code: "desktop-remote",
          title: `"${name}" is a remote server inside claude_desktop_config.json`,
          detail:
            "The local-server guide documents command and args. The remote guide adds a URL in Settings, Connectors, Add custom connector. This tool did not find a documented url key for that file. The fixed file omits this entry.",
        });
        return;
      }

      let args: string[] = [];
      if (transport === "stdio") {
        if (Array.isArray(entry.args)) {
          const bad = entry.args.some((item) => typeof item !== "string");
          if (bad) {
            push(findings, {
              severity: "error",
              code: "args-type",
              title: `"${name}" has an args entry that is not a string`,
              detail: "args is an array of strings. A number or object will fail the client's own parse.",
            });
          }
          args = entry.args.filter((item): item is string => typeof item === "string");
        } else if (typeof entry.args === "string") {
          push(findings, {
            severity: "error",
            code: "args-string",
            title: `"${name}" has args as one string`,
            detail: "args is an array. A single string is not a list of arguments. The fixed file wraps it as one argument.",
          });
          args = [entry.args];
        } else if (entry.args !== undefined) {
          push(findings, {
            severity: "error",
            code: "args-type",
            title: `"${name}" has args in the wrong shape`,
            detail: "args is an array of strings, or it is omitted.",
          });
        }

        const npx = command === "npx" || args.includes("npx");
        const yesAt = command === "npx" ? args[0] : args[args.indexOf("npx") + 1];
        if (npx && yesAt !== "-y" && yesAt !== "--yes") {
          push(findings, {
            severity: "warning",
            code: "npx-yes",
            title: `"${name}" runs npx without -y`,
            detail:
              "npx can stop on an install prompt the client cannot answer. The filesystem guide and the reference-servers README both pass -y. The fixed file inserts it.",
          });
        }
        const wrappedAlready = command === "cmd" && (args[0] === "/c" || args[0] === "/C") && args[1] === "npx";
        if (os === "windows" && command === "npx") {
          push(findings, {
            severity: "warning",
            code: "windows-npx",
            title: `"${name}" uses npx directly on Windows`,
            detail:
              "The reference-servers README wraps npx as command cmd and args /c, npx, so Windows can launch the cmd shim. The Claude Desktop tutorial's Windows sample uses command npx with no wrapper. If the server never starts on Windows, apply the wrapper. The fixed file does, because this check was set to Windows.",
          });
        }
        if (os !== "windows" && wrappedAlready) {
          push(findings, {
            severity: "warning",
            code: "cmd-on-unix",
            title: `"${name}" uses cmd /c on ${os}`,
            detail: "cmd is the Windows wrapper from the reference-servers README. It is not a binary on macOS or Linux. Use command npx here.",
          });
        }
        for (const arg of args) {
          if (isRelativePath(arg)) {
            push(findings, {
              severity: "warning",
              code: "relative-path",
              title: `"${name}" passes a relative path`,
              detail: `"${arg}" is not absolute. The debugging guide says the client's working directory may be /, so a relative path does not point at the folder you have open. The fixed file does not guess the absolute path.`,
            });
          }
        }
      }

      const nextEntry: Record<string, unknown> = {};
      if (requiresType(client) || (client === "cursor" && transport === "stdio")) {
        nextEntry.type = transport === "stdio" ? "stdio" : transport === "sse" ? "sse" : "http";
      }
      if (transport === "stdio") {
        let nextCommand = command;
        let nextArgs = withYes(command, args);
        if (os !== "windows" && nextCommand === "cmd" && (nextArgs[0] === "/c" || nextArgs[0] === "/C") && nextArgs[1] === "npx") {
          nextCommand = "npx";
          nextArgs = nextArgs.slice(2);
        }
        const wrapped = wrapWindows(nextCommand, nextArgs, os);
        nextEntry.command = wrapped.command;
        nextEntry.args = wrapped.args;
      } else if (client === "windsurf") {
        nextEntry.serverUrl = url;
      } else {
        nextEntry.url = url;
      }

      const env = record(entry.env);
      if (entry.env !== undefined && !env) {
        push(findings, {
          severity: "error",
          code: "env-type",
          title: `"${name}" has env in the wrong shape`,
          detail: "env is an object of string values, one key per variable.",
        });
      }
      if (env) {
        const nextEnv: Record<string, string> = {};
        for (const [key, value] of Object.entries(env)) {
          const raw = typeof value === "string" ? value : "";
          if (typeof value !== "string") {
            push(findings, {
              severity: "error",
              code: "env-value",
              title: `env.${key} is not a string`,
              detail: "Clients on this page expect string values. A number may fail the parse, and it is the wrong place for a secret object.",
            });
            continue;
          }
          if (isHardcodedSecret(key, raw)) {
            push(findings, {
              severity: "error",
              code: "hardcoded-secret",
              title: `env.${key} is a hardcoded secret`,
              detail:
                "The value looks like a token. Put the name in the file and the value in the environment, or in a VS Code input. The fixed file does not repeat the value. Do not commit the original.",
            });
            const id = inputIdFor(key, usedInputIds);
            nextEnv[key] = referenceFor(client, key, id);
            if (client === "vscode") {
              fixedInputs.push({ type: "promptString", id, description: key, password: true });
            }
          } else {
            if (client === "vscode" && /\$\{input:([^}]+)\}/.test(raw)) {
              const id = raw.match(/\$\{input:([^}]+)\}/)?.[1] ?? "";
              if (id && !inputIds.has(id)) {
                push(findings, {
                  severity: "error",
                  code: "missing-input",
                  title: `\${input:${id}} has no matching input`,
                  detail: "VS Code prompts only for ids listed in inputs. A missing id leaves the variable empty and the server starts without the credential.",
                });
              }
            }
            if ((client === "claude-code" || client === "vscode-copilot") && raw.includes("${env:")) {
              push(findings, {
                severity: "warning",
                code: "env-syntax",
                title: `env.${key} uses \${env:}, which this client does not document`,
                detail:
                  client === "claude-code"
                    ? "Claude Code expands ${VAR} and ${VAR:-default}. ${env:VAR} is the Cursor and editor-file form."
                    : "The portable Copilot file expands ${NAME}. ${env:NAME} is the editor-file form.",
              });
            }
            if (client !== "vscode" && raw.includes("${input:")) {
              push(findings, {
                severity: "warning",
                code: "input-elsewhere",
                title: `env.${key} uses a VS Code input reference`,
                detail: "${input:id} is documented for the VS Code editor file. This client will not prompt, and it may pass the text through unchanged.",
              });
            }
            nextEnv[key] = isHardcodedSecret(key, raw) ? referenceFor(client, key, inputIdFor(key, usedInputIds)) : raw;
          }
        }
        if (Object.keys(nextEnv).length && transport === "stdio") nextEntry.env = nextEnv;
      }

      const headers = record(entry.headers);
      if (entry.headers !== undefined && !headers) {
        push(findings, {
          severity: "error",
          code: "headers-type",
          title: `"${name}" has headers in the wrong shape`,
          detail: "headers is an object of string values.",
        });
      }
      if (headers && transport !== "stdio") {
        const nextHeaders: Record<string, string> = {};
        for (const [key, value] of Object.entries(headers)) {
          const raw = typeof value === "string" ? value : "";
          if (typeof value !== "string") continue;
          if (isHardcodedSecret(key, raw)) {
            push(findings, {
              severity: "error",
              code: "hardcoded-secret",
              title: `headers.${key} is a hardcoded secret`,
              detail:
                "A header in a shared file is a committed credential. Use the client's reference form. The fixed file does not repeat the value.",
            });
            const envName = key.toLowerCase() === "authorization" ? "AUTHORIZATION_TOKEN" : key.replace(/[^A-Za-z0-9_]/g, "_").toUpperCase();
            const id = inputIdFor(envName, usedInputIds);
            const ref = referenceFor(client, envName, id);
            nextHeaders[key] = key.toLowerCase() === "authorization" && !isReference(raw) ? `Bearer ${ref}` : ref;
            if (client === "vscode") fixedInputs.push({ type: "promptString", id, description: envName, password: true });
          } else nextHeaders[key] = raw;
        }
        if (Object.keys(nextHeaders).length) nextEntry.headers = nextHeaders;
      }

      fixedMap[finalName] = nextEntry;
    });
  }

  let score = 100;
  for (const finding of findings) {
    if (finding.severity === "error") score -= 18;
    else if (finding.severity === "warning") score -= 7;
  }
  score = Math.max(0, Math.min(100, score));

  const fixedRoot: Record<string, unknown> = {};
  if (client === "vscode" && fixedInputs.length) fixedRoot.inputs = fixedInputs;
  fixedRoot[expected] = fixedMap;
  const fixed = maskSecrets(`${JSON.stringify(fixedRoot, null, 2)}\n`);

  return {
    score,
    verdict: verdictFor(score, true),
    findings: findings.map((finding) => ({ ...finding, title: maskSecrets(finding.title), detail: maskSecrets(finding.detail) })),
    fixed,
    parsed: true,
  };
}
