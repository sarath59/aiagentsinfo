---
title: "Why an MCP Server Loads in Cursor and Not in VS Code"
description: "Cursor's mcp.json uses mcpServers. VS Code's .vscode/mcp.json uses servers. The same JSON is valid and invisible. Here is the file each client reads, and a free checker."
date: "2026-11-13"
updated: "2026-11-13"
category: guide
topics:
  - tools-saas
  - harnesses
  - how-agents-work
audience:
  - builders
companies:
  - cursor
  - microsoft
  - anthropic
  - github
byline: "AI Agents Info Editorial"
absoluteTitle: true
takeaways:
  - "Cursor reads mcpServers in .cursor/mcp.json. VS Code's editor file, .vscode/mcp.json, reads servers. A Cursor file pasted into the editor file is valid JSON and a server that never appears."
  - "VS Code's configuration reference, checked 13 Nov 2026, says new Copilot configs should use mcpServers in a workspace .mcp.json or in ~/.copilot/mcp-config.json. It says the Copilot harness does not read .vscode/mcp.json directly."
  - "The free checker at /tools/mcp-config-generator names the wrong key, then writes a fixed file. The paste is not stored."
sources:
  - title: "Cursor, Model Context Protocol (checked 13 Nov 2026)"
    url: "https://cursor.com/docs/mcp"
  - title: "Cursor, MCP integrations (checked 13 Nov 2026)"
    url: "https://cursor.com/help/customization/mcp"
  - title: "VS Code, MCP configuration reference (checked 13 Nov 2026)"
    url: "https://code.visualstudio.com/docs/agents/reference/mcp-configuration.md"
  - title: "Claude Code, Connect Claude Code to tools via MCP (checked 13 Nov 2026)"
    url: "https://code.claude.com/docs/en/mcp"
  - title: "MCP, Connect to local MCP servers (checked 13 Nov 2026)"
    url: "https://modelcontextprotocol.io/docs/2026-07-28/develop/connect-local-servers"
faq:
  - question: "Why does an MCP server load in Cursor and not in VS Code?"
    answer: "Cursor's mcp.json uses a top-level mcpServers object. VS Code's editor file, .vscode/mcp.json, uses servers. The JSON parses. The editor file never sees the server. The Copilot portable file uses mcpServers again, and the VS Code reference says the harness does not read .vscode/mcp.json directly."
  - question: "Which file should a new VS Code Copilot setup use?"
    answer: "The configuration reference checked 13 Nov 2026 says to use mcpServers in a workspace-root .mcp.json or in ~/.copilot/mcp-config.json. It tells you not to start a new Copilot config in .vscode/mcp.json."
  - question: "Does the checker store the config I paste?"
    answer: "No. The request is not written to a file, a database, or a log. A value that looks like a token is shown as [redacted]."
---

You paste a working Cursor config into VS Code, restart, and the server is not in the list. There is no error that names the key. The JSON is valid. The client is looking at a different key.

Cursor reads `mcpServers`. VS Code's editor file reads `servers`. Those are not aliases. The [MCP config generator](/tools/mcp-config-generator) writes the file for the client you pick, and the checker flags a Cursor file that was pasted into `.vscode/mcp.json`.

## Which key does each client read?

The key in the file you opened, not the key in the README you copied.

[Cursor's MCP page](https://cursor.com/docs/mcp), checked 13 Nov 2026, puts servers under `mcpServers` in `.cursor/mcp.json` or `~/.cursor/mcp.json`. The [help page](https://cursor.com/help/customization/mcp) says the two files merge and the project name wins, and it says to restart Cursor after you save.

[VS Code's configuration reference](https://code.visualstudio.com/docs/agents/reference/mcp-configuration.md), checked the same day, splits the product in two:

- The editor file, `.vscode/mcp.json`, uses `servers`, plus an `inputs` array when a secret should be prompted instead of written down.
- A new Copilot config uses `mcpServers` in a workspace-root `.mcp.json`, or in `~/.copilot/mcp-config.json` when `COPILOT_HOME` is unset. The page says the harness does not read `.vscode/mcp.json` directly. Eligible editor entries can be forwarded. A file that needs `${input:...}` is not forwarded.

So a Cursor file can be the right shape for the new Copilot file and the wrong shape for `.vscode/mcp.json`. If you do not know which VS Code file you opened, the server's absence is not a mystery. It is the wrong object.

Claude Desktop and Claude Code also use `mcpServers`. Claude Desktop's file is `claude_desktop_config.json`. Claude Code's project file is `.mcp.json`. Windsurf's Cascade file is `mcp_config.json`, again with `mcpServers`. Sharing one blob across those apps only works when you are sharing the key, and even then the fields differ. Claude Code rejects a `url` that has no `type`. Cursor's remote example has a `url` and no `type`. Copying either file into the other is how a server goes quiet.

## What does the broken file look like?

This is a Cursor-shaped file. Point the checker at VS Code's editor file and it fails the key before it fails anything else.

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/Users/username/Desktop"]
    }
  }
}
```

The editor file wants this:

```json
{
  "servers": {
    "filesystem": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/Users/username/Desktop"]
    }
  }
}
```

The [field table](https://code.visualstudio.com/docs/agents/reference/mcp-configuration.md) marks `type` as required on that editor entry. Cursor's stdio table also marks `type` as required, while several examples on Cursor's page omit it. The generator includes `"stdio"` for both, and the note on the file says why.

If the new Copilot file is the one you meant, keep `mcpServers` and do not add `inputs`. The reference says input prompts are editor-only. Use `${NAME}` there. The editor file uses `${env:NAME}` or `${input:id}`.

## How do you confirm the server loaded?

Look at the client's own list. A missing name is a failed load.

- Cursor: save, restart, and look for the server. The help page's instruction is the restart.
- VS Code: run MCP: List Servers in the session you think is connected. `code --add-mcp` writes the editor file, not the portable Copilot file.
- Claude Code: `claude mcp list`, or `/mcp` in the session. A project server asks for approval the first time. A `url` with no `type` is skipped. The message on that page tells you to add `type`.
- Claude Desktop: quit the app completely. The [local-server guide](https://modelcontextprotocol.io/docs/2026-07-28/develop/connect-local-servers) says the file is read on startup. Then open the connector list and look for the name.

The [generator](/tools/mcp-config-generator) prints the path for macOS, Windows, and Linux next to the file. Paste a config you already have into Check a config. A wrong key, a `url` with no `type`, `npx` without `-y`, a relative path, a Windows `npx` that is not wrapped the way the reference-servers README describes, a duplicated name, and a hardcoded token each get a sentence. The score starts at 100 and drops for each error and warning. The fixed file does not echo a token. Nothing you paste is stored.

What an MCP server is, as a protocol object, is [the glossary entry](/glossary/model-context-protocol). How many reference servers the project maintains, which is not the registry count, is [How many official MCP servers are there?](/blog/how-many-official-mcp-servers-are-there).
