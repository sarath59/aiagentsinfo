import { maskSecrets } from "@/lib/mcp-config/mask";
import type { ClientId, GenerateInput, GeneratedFile, OsId, SecretStyle, ServerDraft, TransportId } from "@/lib/mcp-config/types";

const CLIENT_LABEL: Record<ClientId, string> = {
  "claude-desktop": "Claude Desktop",
  "claude-code": "Claude Code",
  cursor: "Cursor",
  vscode: "VS Code editor file",
  "vscode-copilot": "VS Code Copilot portable file",
  windsurf: "Windsurf",
};

const FILE_NAME: Record<ClientId, string> = {
  "claude-desktop": "claude_desktop_config.json",
  "claude-code": ".mcp.json",
  cursor: "mcp.json",
  vscode: "mcp.json",
  "vscode-copilot": ".mcp.json",
  windsurf: "mcp_config.json",
};

const PLACEHOLDER = "REPLACE_ON_THIS_MACHINE";
const NAME_RE = /^[A-Za-z0-9_-]+$/;
const ENV_RE = /^[A-Za-z_][A-Za-z0-9_]*$/;

type BuiltServer = {
  name: string;
  transport: TransportId;
  entry: Record<string, unknown>;
  commandLine: string[];
  envNames: string[];
  headerNames: string[];
};

function json(value: unknown) {
  return `${JSON.stringify(value, null, 2)}\n`;
}

function shellQuote(value: string) {
  if (/^[A-Za-z0-9_./:@%=+-]+$/.test(value)) return value;
  return `'${value.replace(/'/g, `'\\''`)}'`;
}

function inputId(name: string, used: Set<string>) {
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

function secretReference(client: ClientId, style: SecretStyle, envName: string, id: string) {
  if (style === "input" && client === "vscode") return `\${input:${id}}`;
  if (client === "cursor" || client === "windsurf" || client === "vscode") return `\${env:${envName}}`;
  if (client === "claude-code" || client === "vscode-copilot") return `\${${envName}}`;
  return PLACEHOLDER;
}

function usesInputs(client: ClientId, style: SecretStyle) {
  return client === "vscode" && style === "input";
}

function includeType(client: ClientId, transport: TransportId) {
  if (client === "claude-code" || client === "vscode" || client === "vscode-copilot") return true;
  return client === "cursor" && transport === "stdio";
}

function remoteKey(client: ClientId) {
  return client === "windsurf" ? "serverUrl" : "url";
}

function topKey(client: ClientId) {
  return client === "vscode" ? "servers" : "mcpServers";
}

function sanitizeName(name: string, index: number) {
  const trimmed = name.trim();
  if (NAME_RE.test(trimmed)) return { name: trimmed, changed: false };
  const cleaned = trimmed
    .replace(/\s+/g, "-")
    .replace(/[^A-Za-z0-9_-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
  return { name: cleaned || `server-${index + 1}`, changed: true };
}

function wrapNpx(command: string, args: string[], os: OsId) {
  if (os !== "windows" || command !== "npx") return { command, args };
  return { command: "cmd", args: ["/c", "npx", ...args] };
}

function ensureNpxYes(command: string, args: string[]) {
  const next = [...args];
  const npxAt = command === "npx" ? -1 : next.indexOf("npx");
  if (command !== "npx" && npxAt === -1) return next;
  const after = command === "npx" ? 0 : npxAt + 1;
  if (next[after] === "-y" || next[after] === "--yes") return next;
  next.splice(after, 0, "-y");
  return next;
}

function cleanEnvNames(names: string[]) {
  const kept: string[] = [];
  const dropped: string[] = [];
  for (const name of names) {
    const trimmed = name.trim();
    if (!trimmed) continue;
    if (ENV_RE.test(trimmed)) kept.push(trimmed);
    else dropped.push(trimmed);
  }
  return { kept: [...new Set(kept)].slice(0, 20), dropped };
}

function headerValue(name: string, reference: string) {
  if (name.toLowerCase() === "authorization") return `Bearer ${reference}`;
  return reference;
}

function pathsFor(client: ClientId) {
  if (client === "claude-desktop") {
    return [
      { os: "macos" as const, path: "~/Library/Application Support/Claude/claude_desktop_config.json" },
      { os: "windows" as const, path: "%APPDATA%\\Claude\\claude_desktop_config.json" },
      { os: "linux" as const, path: "~/.config/Claude/claude_desktop_config.json" },
    ];
  }
  if (client === "claude-code") {
    return [
      { os: "macos" as const, path: "<project>/.mcp.json" },
      { os: "windows" as const, path: "<project>\\.mcp.json" },
      { os: "linux" as const, path: "<project>/.mcp.json" },
    ];
  }
  if (client === "cursor") {
    return [
      { os: "macos" as const, path: "<project>/.cursor/mcp.json" },
      { os: "windows" as const, path: "<project>\\.cursor\\mcp.json" },
      { os: "linux" as const, path: "<project>/.cursor/mcp.json" },
    ];
  }
  if (client === "vscode") {
    return [
      { os: "macos" as const, path: "<project>/.vscode/mcp.json" },
      { os: "windows" as const, path: "<project>\\.vscode\\mcp.json" },
      { os: "linux" as const, path: "<project>/.vscode/mcp.json" },
    ];
  }
  if (client === "vscode-copilot") {
    return [
      { os: "macos" as const, path: "<project>/.mcp.json" },
      { os: "windows" as const, path: "<project>\\.mcp.json" },
      { os: "linux" as const, path: "<project>/.mcp.json" },
    ];
  }
  return [
    { os: "macos" as const, path: "~/.config/devin/mcp_config.json" },
    { os: "windows" as const, path: "%AppData%\\devin\\mcp_config.json" },
    { os: "linux" as const, path: "~/.config/devin/mcp_config.json" },
  ];
}

function folderNote(client: ClientId) {
  if (client === "claude-code") {
    return "Project scope. User scope is ~/.claude.json on macOS and Linux, and %USERPROFILE%\\.claude.json on Windows. Do not replace that file with only this object.";
  }
  if (client === "cursor") {
    return "Global file, same shape: ~/.cursor/mcp.json. The Cursor docs write that path with ~ and do not publish a separate Windows path. Project wins when the same server name is in both files.";
  }
  if (client === "vscode") {
    return "This is the editor-managed file. For a new Copilot session, the configuration reference says to use the portable file instead.";
  }
  if (client === "vscode-copilot") {
    return "Personal file, when COPILOT_HOME is unset: ~/.copilot/mcp-config.json. The workspace form can reject ${...}; the runtime still reads the reference.";
  }
  if (client === "windsurf") {
    return "This is the file Cascade's Open MCP config file action opens. Editor discovery is a different file: ~/.codeium/windsurf/mcp_config.json, or ~/.codeium/windsurf-next/mcp_config.json on Next.";
  }
  return "Merge mcpServers into the file if it already has other keys. Replacing the whole file drops them.";
}

function buildServer(server: ServerDraft, client: ClientId, os: OsId, style: SecretStyle, index: number, usedIds: Set<string>) {
  const naming = sanitizeName(server.name, index);
  const env = cleanEnvNames(server.envNames);
  const headerNames = [...new Set(server.headerNames.map((name) => name.trim()).filter((name) => /^[\w-]{1,80}$/.test(name)))].slice(0, 20);
  const notes: string[] = [];
  if (naming.changed) {
    notes.push(
      `"${server.name.trim() || "(blank)"}" is not a safe server name. Claude Code accepts letters, numbers, hyphens, and underscores. The file uses "${naming.name}".`,
    );
  }
  if (env.dropped.length) {
    notes.push(`Dropped env names that are not shell identifiers: ${env.dropped.join(", ")}.`);
  }

  const refs = new Map<string, string>();
  for (const name of env.kept) {
    const id = inputId(name, usedIds);
    refs.set(name, secretReference(client, style, name, id));
  }

  const transport = server.transport;
  const entry: Record<string, unknown> = {};
  let commandLine: string[] = [];

  if (transport === "stdio") {
    let command = server.command.trim() || "npx";
    let args = server.args.map((arg) => arg.trim()).filter((arg) => arg.length > 0);
    if (command === "npx" || args.includes("npx")) args = ensureNpxYes(command, args);
    const wrapped = wrapNpx(command, args, os);
    command = wrapped.command;
    args = wrapped.args;
    if (includeType(client, "stdio")) entry.type = "stdio";
    entry.command = command;
    entry.args = args;
    if (env.kept.length && client !== "claude-desktop") {
      const envObject: Record<string, string> = {};
      for (const name of env.kept) envObject[name] = refs.get(name) ?? PLACEHOLDER;
      entry.env = envObject;
    } else if (env.kept.length && client === "claude-desktop") {
      const envObject: Record<string, string> = {};
      for (const name of env.kept) envObject[name] = PLACEHOLDER;
      entry.env = envObject;
    }
    commandLine = [command, ...args];
  } else {
    const url = server.url.trim();
    if (includeType(client, transport)) entry.type = transport === "sse" ? "sse" : "http";
    entry[remoteKey(client)] = url;
    if (headerNames.length && client !== "claude-desktop") {
      const headerObject: Record<string, string> = {};
      headerNames.forEach((name, headerIndex) => {
        const envName = env.kept[headerIndex] || env.kept[0] || name.replace(/[^A-Za-z0-9_]/g, "_").toUpperCase();
        if (!refs.has(envName)) {
          const id = inputId(envName, usedIds);
          refs.set(envName, secretReference(client, style, envName, id));
        }
        headerObject[name] = headerValue(name, refs.get(envName) ?? PLACEHOLDER);
      });
      entry.headers = headerObject;
    }
  }

  return {
    name: naming.name,
    transport,
    entry,
    commandLine,
    envNames: env.kept,
    headerNames: transport === "stdio" ? [] : headerNames,
    notes,
    refs,
  };
}

function claudeAdd(name: string, server: ReturnType<typeof buildServer>) {
  if (server.transport === "stdio") {
    const envFlags = server.envNames.map((envName) => `--env ${shellQuote(`${envName}=\${${envName}}`)}`);
    const command = server.commandLine.map(shellQuote).join(" ");
    return ["claude mcp add --scope project", ...envFlags, "--transport stdio", shellQuote(name), "--", command]
      .filter(Boolean)
      .join(" ");
  }
  const url = String(server.entry.url ?? server.entry.serverUrl ?? "");
  const headerFlags = server.headerNames.map((headerName) => {
    const headers = server.entry.headers as Record<string, string> | undefined;
    const value = headers?.[headerName] ?? "";
    return `--header ${shellQuote(`${headerName}: ${value}`)}`;
  });
  const transport = server.transport === "sse" ? "sse" : "http";
  return ["claude mcp add --scope project", `--transport ${transport}`, shellQuote(name), shellQuote(url), ...headerFlags]
    .filter(Boolean)
    .join(" ");
}

function vscodeAdd(name: string, server: ReturnType<typeof buildServer>) {
  const payload: Record<string, unknown> = { name, ...server.entry };
  return `code --add-mcp ${shellQuote(JSON.stringify(payload))}`;
}

function desktopSteps(servers: ReturnType<typeof buildServer>[]) {
  const lines = [
    "Claude Desktop does not document a url key in claude_desktop_config.json.",
    "The connect-remote-servers guide adds a remote server as a custom connector:",
    "1. Open Settings, then Connectors. On desktop the guide says Ctrl+Comma, or the top-left menu, File, Settings.",
    "2. Click Add, then Add custom connector.",
    "3. Paste the server URL and click Add.",
    "4. Finish the server's own sign-in. The guide says that step is usually OAuth or a key prompt, not a header in the JSON file.",
    "",
    "URLs from this form:",
  ];
  for (const server of servers) {
    const url = String(server.entry.url ?? server.entry.serverUrl ?? "");
    lines.push(`- ${server.name}: ${url}`);
  }
  lines.push("");
  lines.push("Local stdio servers, if you also have any, stay in claude_desktop_config.json.");
  return lines.join("\n");
}

function notesFor(client: ClientId, os: OsId, servers: ReturnType<typeof buildServer>[], style: SecretStyle) {
  const notes: string[] = [];
  const hasNpx = servers.some((server) => server.commandLine.includes("npx"));
  const hasStdio = servers.some((server) => server.transport === "stdio");
  const hasRemote = servers.some((server) => server.transport !== "stdio");
  const hasSecret = servers.some((server) => server.envNames.length || server.headerNames.length);
  const hasFilesystem = servers.some((server) => server.commandLine.includes("@modelcontextprotocol/server-filesystem"));

  if (client === "claude-desktop") {
    notes.push("Quit Claude Desktop completely, then open it again. The local-server guide says the app reads this file on startup.");
    notes.push("After restart, open the connector list from the chat box and look for the server name. A missing name is a failed start, not a hidden tool.");
    const logFile =
      os === "macos"
        ? "~/Library/Logs/Claude/mcp.log"
        : os === "windows"
          ? "%APPDATA%\\Claude\\logs\\mcp.log"
          : "~/.config/Claude/logs/mcp.log";
    notes.push(`Connection failures land in ${logFile}. That server's stderr is mcp-server-<name>.log in the same directory.`);
    if (hasFilesystem) {
      notes.push("The directories after the package name are the only trees the filesystem server may touch. The guide says it runs as your user.");
    }
    if (hasSecret) {
      notes.push(
        "The debugging page shows an env value as a literal. This file writes REPLACE_ON_THIS_MACHINE instead. Fill that in on this computer. Do not commit the file.",
      );
    }
    if (hasRemote) {
      const urls = servers
        .filter((server) => server.transport !== "stdio")
        .map((server) => `${server.name}: ${String(server.entry.url ?? server.entry.serverUrl ?? "")}`)
        .join("; ");
      notes.push(
        `Remote URLs go through Settings, Connectors, Add custom connector. They are not written into this JSON. ${urls}`,
      );
    }
  }

  if (client === "claude-code") {
    notes.push("Start a new session in this project. Claude Code reads .mcp.json at startup and asks you to approve a project server the first time.");
    notes.push("Check with claude mcp list, or /mcp inside the session. A first npx download can show Failed to connect. Run the list again after it finishes.");
    notes.push("A url without type is skipped. Claude Code reads a missing type as stdio, then rejects the url.");
    if (hasSecret) {
      notes.push("Values use ${VAR}, which Claude Code expands from the environment. ${VAR:-default} is the other form the docs describe. The single quotes on the CLI keep the shell from expanding the value first.");
    }
    notes.push("The command uses --scope project so it matches this file. Omit the flag and the CLI writes local scope into ~/.claude.json instead.");
  }

  if (client === "cursor") {
    notes.push("Save the file and restart Cursor. The help page says the project file and the global file are merged, and the project name wins.");
    notes.push("The stdio field table marks type as required. Some examples on the same page omit it. This file includes \"stdio\".");
    if (hasRemote) {
      notes.push("The remote example is a url and optional headers, with no type field. This file follows that example. It does not claim Cursor has a switch for Streamable HTTP versus SSE.");
    }
    if (hasSecret) {
      notes.push("Secrets use ${env:NAME}. Cursor resolves that in command, args, env, url, and headers. envFile is documented for stdio only. This file does not point at one.");
    }
    notes.push("The CLI docs checked on this date describe agent mcp login for a server already in mcp.json. They do not document a one-line add command.");
  }

  if (client === "vscode") {
    notes.push("Confirm the server under MCP: List Servers. code --add-mcp writes this editor-managed file, not the Copilot portable file.");
    notes.push("The configuration reference says new Copilot configs should use .mcp.json or ~/.copilot/mcp-config.json. The harness does not read .vscode/mcp.json directly. Switch variation if that is the file you need.");
    if (style === "input" && hasSecret) {
      notes.push("inputs prompts when the server starts. password: true hides the typing. ${input:id} is not forwarded into a Copilot harness session.");
    } else if (hasSecret) {
      notes.push("This variation uses ${env:NAME}, which the editor format accepts. The portable Copilot file uses ${NAME} instead, with no inputs array.");
    }
    if (hasRemote) {
      notes.push("type http tries Streamable HTTP and falls back to SSE in the editor client. type sse forces the legacy endpoint. Prefer http when the server supports it.");
    }
  }

  if (client === "vscode-copilot") {
    notes.push("Open Chat: Open Customizations, MCP Servers, and confirm a tool call. Adding the file does not prove the session can use the server.");
    notes.push("Do not copy inputs, envFile, or dev into this file. The reference says those are editor-only and servers that need ${input:...} are not forwarded.");
    if (hasSecret) {
      notes.push("References are ${NAME} or ${NAME:-default}. ${env:NAME} is the editor form. The workspace form may reject ${...}; edit it through Other Properties. The runtime still reads it.");
    }
    if (hasRemote) notes.push("type http is Streamable HTTP. type sse is the legacy endpoint. The reference says to prefer HTTP.");
  }

  if (client === "windsurf") {
    notes.push("Use Cascade's Open MCP config file action so you edit the file this install actually reads. Press the refresh button after you save.");
    notes.push("OAuth is documented for Streamable HTTP and SSE, not for stdio. Pass stdio credentials through env.");
    if (hasRemote) {
      notes.push("The remote example uses serverUrl, and the page also accepts url. It does not publish a type field that selects SSE. This file uses serverUrl for both.");
    }
    if (hasSecret) notes.push("Interpolation is ${env:NAME} in command, args, env, serverUrl, url, and headers.");
    notes.push("The page's GitHub sample still shows the npm package @modelcontextprotocol/server-github. GitHub's own README says that package is retired. This file does not use it.");
  }

  if (hasNpx && os === "windows") {
    notes.push("npx is wrapped as cmd /c. The reference-servers README says to do that on Windows, and to leave uvx unwrapped. The Claude Desktop tutorial's Windows sample uses command npx with no wrapper.");
  } else if (hasNpx) {
    notes.push("On macOS and Linux the command stays npx. The Windows shape, from the same README, is cmd /c npx.");
  }

  if (hasStdio && (hasFilesystem || servers.some((server) => server.commandLine.some((part) => part.includes("/") || part.includes("\\"))))) {
    notes.push("Use an absolute directory. The debugging page says the client's working directory may be /, so a relative path does not point where you think.");
  }

  if (!servers.length) notes.push("The map is empty. Add a server before you save the file.");
  return notes;
}

function limitsFor(client: ClientId, style: SecretStyle, hasSecret: boolean) {
  const limits: string[] = [];
  if (style === "input" && client !== "vscode") {
    limits.push("VS Code input prompts are documented for the editor file only. This client gets an environment reference instead.");
  }
  if (client === "claude-desktop" && hasSecret) {
    limits.push("No ${VAR} expansion is documented for claude_desktop_config.json. The value is a placeholder, not a reference.");
  }
  if (client === "cursor") {
    limits.push("No Cursor one-line install command is on the pages checked 13 Nov 2026.");
  }
  if (client === "windsurf") {
    limits.push("No Windsurf CLI add command is on the page checked 13 Nov 2026.");
  }
  limits.push("Windsurf's older translated pages disagree about ~/.codeium paths. This file follows the English Cascade page.");
  if (client !== "windsurf") limits.pop();
  return limits;
}

export function generate(input: GenerateInput): GeneratedFile {
  const usedIds = new Set<string>();
  const built = input.servers.slice(0, 20).map((server, index) => buildServer(server, input.client, input.os, input.secretStyle, index, usedIds));
  const seen = new Set<string>();
  for (const server of built) {
    let name = server.name;
    let n = 2;
    while (seen.has(name)) {
      name = `${server.name}-${n}`;
      n += 1;
    }
    server.name = name;
    seen.add(name);
  }

  const stdio = built.filter((server) => server.transport === "stdio");
  const remote = built.filter((server) => server.transport !== "stdio");
  const desktopRemoteOnly = input.client === "claude-desktop" && remote.length > 0 && stdio.length === 0;
  const hasSecret = built.some((server) => server.envNames.length || server.headerNames.length);

  let body: string;
  let kind: GeneratedFile["kind"] = "json";
  if (desktopRemoteOnly) {
    kind = "steps";
    body = desktopSteps(remote);
  } else {
    const map: Record<string, unknown> = {};
    const included = input.client === "claude-desktop" ? stdio : built;
    for (const server of included) map[server.name] = server.entry;
    const file: Record<string, unknown> = {};
    if (usesInputs(input.client, input.secretStyle) && hasSecret) {
      const inputs = [];
      const seen = new Set<string>();
      for (const server of included) {
        for (const [envName, reference] of server.refs) {
          const id = reference.match(/\$\{input:([^}]+)\}/)?.[1];
          if (!id || seen.has(id)) continue;
          seen.add(id);
          inputs.push({ type: "promptString", id, description: envName, password: true });
        }
      }
      if (inputs.length) file.inputs = inputs;
    }
    file[topKey(input.client)] = map;
    body = json(file);
  }

  body = maskSecrets(body);

  const commands: string[] = [];
  let commandNote = "";
  if (input.client === "claude-code") {
    for (const server of built) commands.push(claudeAdd(server.name, server));
    commandNote = "One command per server. --scope project writes .mcp.json. Run it in a terminal, not inside a claude session.";
  } else if (input.client === "vscode") {
    for (const server of (desktopRemoteOnly ? [] : built)) commands.push(vscodeAdd(server.name, server));
    commandNote = "code --add-mcp targets the editor file. Single quotes match the VS Code example. PowerShell and bash accept them. cmd.exe does not.";
  } else if (input.client === "claude-desktop") {
    commandNote = "Claude Desktop has no add command on the pages checked 13 Nov 2026. Use Settings, Developer, Edit Config for a local server.";
  } else if (input.client === "cursor") {
    commandNote = "No add command. Save mcp.json and restart Cursor. agent mcp login authenticates a server that is already in the file.";
  } else if (input.client === "vscode-copilot") {
    commandNote = "code --add-mcp does not write this portable file. The reference says that command targets the editor-managed config.";
  } else {
    commandNote = "No add command on the Windsurf page. Edit the file Cascade opens, then refresh.";
  }

  const extra = built.flatMap((server) => server.notes);
  const notes = [...notesFor(input.client, input.os, built, input.secretStyle), ...extra];

  return {
    client: input.client,
    label: CLIENT_LABEL[input.client],
    fileName: FILE_NAME[input.client],
    folderNote: folderNote(input.client),
    kind,
    body,
    paths: pathsFor(input.client),
    commands,
    commandNote,
    notes,
    limits: limitsFor(input.client, input.secretStyle, hasSecret),
  };
}

export function generateAll(input: GenerateInput): GeneratedFile[] {
  const clients: ClientId[] = ["claude-desktop", "claude-code", "cursor", "vscode", "vscode-copilot", "windsurf"];
  return clients.map((client) => generate({ ...input, client }));
}

export function scrubDraft(server: ServerDraft): ServerDraft {
  return {
    ...server,
    name: maskSecrets(server.name),
    command: maskSecrets(server.command),
    args: server.args.map((arg) => maskSecrets(arg)),
    url: maskSecrets(server.url),
    envNames: server.envNames.map((name) => maskSecrets(name)),
    headerNames: server.headerNames.map((name) => maskSecrets(name)),
  };
}
