/** Facts below were read from the linked pages on this day. */
export const MCP_CONFIG_CHECKED_ISO = "2026-11-13";
export const MCP_CONFIG_CHECKED_LABEL = "13 Nov 2026";

export const mcpConfigSources = [
  {
    name: "MCP, Connect to local MCP servers",
    url: "https://modelcontextprotocol.io/docs/2026-07-28/develop/connect-local-servers",
    note: "Claude Desktop file paths, mcpServers, the filesystem npx example, restart, and the connector check.",
  },
  {
    name: "MCP, Debugging",
    url: "https://modelcontextprotocol.io/docs/2026-07-28/tools/debugging",
    note: "Absolute paths, the env key in claude_desktop_config.json, and log directories.",
  },
  {
    name: "MCP, Connect to remote MCP servers",
    url: "https://modelcontextprotocol.io/docs/draft/develop/connect-remote-servers",
    note: "Claude remote servers are added as a custom connector. The page is served under a draft path.",
  },
  {
    name: "Claude Help Center, custom connectors",
    url: "https://support.claude.com/en/articles/11175166-get-started-with-custom-connectors-using-remote-mcp",
    note: "Remote connectors are separate from claude_desktop_config.json.",
  },
  {
    name: "Claude Code, Connect to MCP servers",
    url: "https://code.claude.com/docs/en/mcp-quickstart",
    note: ".mcp.json shape, scopes, claude mcp add, and the approval prompt.",
  },
  {
    name: "Claude Code, Connect Claude Code to tools via MCP",
    url: "https://code.claude.com/docs/en/mcp",
    note: "type is required when a url is set. Server names. ${VAR} expansion. The add-json command.",
  },
  {
    name: "Cursor, Model Context Protocol",
    url: "https://cursor.com/docs/mcp",
    note: "mcp.json fields, stdio type, envFile, and ${env:NAME} interpolation.",
  },
  {
    name: "Cursor, MCP integrations",
    url: "https://cursor.com/help/customization/mcp",
    note: "Project and global paths, merge rule, remote url and headers, restart.",
  },
  {
    name: "VS Code, MCP configuration reference",
    url: "https://code.visualstudio.com/docs/agents/reference/mcp-configuration.md",
    note: "servers plus inputs, and the portable mcpServers files the Copilot harness reads.",
  },
  {
    name: "Windsurf, Cascade MCP configuration",
    url: "https://docs.windsurf.com/plugins/cascade/mcp",
    note: "mcp_config.json paths, mcpServers, serverUrl or url, and ${env:NAME}.",
  },
  {
    name: "modelcontextprotocol/servers README",
    url: "https://github.com/modelcontextprotocol/servers/blob/main/README.md",
    note: "Reference-server commands, and cmd /c around npx on Windows.",
  },
  {
    name: "GitHub MCP Server README",
    url: "https://github.com/github/github-mcp-server",
    note: "Remote URL, Docker image, and the retired npm package.",
  },
] as const;
