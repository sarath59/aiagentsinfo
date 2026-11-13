import type { GenerateInput } from "@/lib/mcp-config/types";

export const workedExamples: { id: string; label: string; title: string; body: string; input: GenerateInput }[] = [
  {
    id: "desktop-filesystem-windows",
    label: "Claude Desktop on Windows",
    title: "Claude Desktop, filesystem server, Windows",
    body: "The reference filesystem server, with the Windows npx wrapper from the servers README, and the Desktop path under %APPDATA%.",
    input: {
      client: "claude-desktop",
      os: "windows",
      secretStyle: "env",
      servers: [
        {
          name: "filesystem",
          transport: "stdio",
          command: "npx",
          args: ["-y", "@modelcontextprotocol/server-filesystem", "C:\\Users\\username\\Desktop"],
          envNames: [],
          url: "",
          headerNames: [],
        },
      ],
    },
  },
  {
    id: "vscode-github-http",
    label: "VS Code remote GitHub",
    title: "VS Code, GitHub's remote server, API key input",
    body: "Official remote URL, top-level servers, and a password input. The token is not in the file.",
    input: {
      client: "vscode",
      os: "macos",
      secretStyle: "input",
      servers: [
        {
          name: "github",
          transport: "http",
          command: "",
          args: [],
          envNames: ["GITHUB_PERSONAL_ACCESS_TOKEN"],
          url: "https://api.githubcopilot.com/mcp/",
          headerNames: ["Authorization"],
        },
      ],
    },
  },
  {
    id: "cursor-two-servers",
    label: "Cursor, two servers",
    title: "Cursor, filesystem and memory",
    body: "Two stdio servers in mcpServers, which is the key Cursor reads. The same file pasted into .vscode/mcp.json is the wrong key.",
    input: {
      client: "cursor",
      os: "macos",
      secretStyle: "env",
      servers: [
        {
          name: "filesystem",
          transport: "stdio",
          command: "npx",
          args: ["-y", "@modelcontextprotocol/server-filesystem", "/Users/username/Desktop"],
          envNames: [],
          url: "",
          headerNames: [],
        },
        {
          name: "memory",
          transport: "stdio",
          command: "npx",
          args: ["-y", "@modelcontextprotocol/server-memory"],
          envNames: [],
          url: "",
          headerNames: [],
        },
      ],
    },
  },
];

export const brokenConfigExample = `{
  "mcpServers": {
    "file system": {
      "command": "npx",
      "args": ["@modelcontextprotocol/server-filesystem", "./Desktop"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "ghp_EXAMPLEEXAMPLEEXAMPLEEXAMPLE1234"
      }
    }
  }
}
`;
