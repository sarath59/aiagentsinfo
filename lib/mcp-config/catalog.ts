import type { OsId, ServerDraft, TransportId } from "@/lib/mcp-config/types";

export type CatalogServer = {
  id: string;
  label: string;
  blurb: string;
  source: string;
  transport: TransportId;
  build: (os: OsId) => ServerDraft;
};

function homeDir(os: OsId) {
  if (os === "windows") return "C:\\Users\\username";
  if (os === "linux") return "/home/username";
  return "/Users/username";
}

export const catalogServers: CatalogServer[] = [
  {
    id: "filesystem",
    label: "Filesystem (reference)",
    blurb: "Reads and writes only the directories you list after the package name.",
    source: "https://github.com/modelcontextprotocol/servers/blob/main/README.md",
    transport: "stdio",
    build: (os) => ({
      name: "filesystem",
      transport: "stdio",
      command: "npx",
      args: ["-y", "@modelcontextprotocol/server-filesystem", `${homeDir(os)}${os === "windows" ? "\\Desktop" : "/Desktop"}`],
      envNames: [],
      url: "",
      headerNames: [],
    }),
  },
  {
    id: "memory",
    label: "Memory (reference)",
    blurb: "A local knowledge graph. The servers README starts it with npx.",
    source: "https://github.com/modelcontextprotocol/servers/blob/main/README.md",
    transport: "stdio",
    build: () => ({
      name: "memory",
      transport: "stdio",
      command: "npx",
      args: ["-y", "@modelcontextprotocol/server-memory"],
      envNames: [],
      url: "",
      headerNames: [],
    }),
  },
  {
    id: "sequential-thinking",
    label: "Sequential Thinking (reference)",
    blurb: "One thinking tool. The package README shows this npx command for Claude Desktop.",
    source: "https://www.npmjs.com/package/@modelcontextprotocol/server-sequential-thinking",
    transport: "stdio",
    build: () => ({
      name: "sequential-thinking",
      transport: "stdio",
      command: "npx",
      args: ["-y", "@modelcontextprotocol/server-sequential-thinking"],
      envNames: [],
      url: "",
      headerNames: [],
    }),
  },
  {
    id: "fetch",
    label: "Fetch (reference)",
    blurb: "Pulls a web page for the model. Python, started with uvx.",
    source: "https://github.com/modelcontextprotocol/servers/blob/main/README.md",
    transport: "stdio",
    build: () => ({
      name: "fetch",
      transport: "stdio",
      command: "uvx",
      args: ["mcp-server-fetch"],
      envNames: [],
      url: "",
      headerNames: [],
    }),
  },
  {
    id: "git",
    label: "Git (reference)",
    blurb: "Reads one repository. The README passes --repository. Use an absolute path.",
    source: "https://github.com/modelcontextprotocol/servers/blob/main/README.md",
    transport: "stdio",
    build: (os) => ({
      name: "git",
      transport: "stdio",
      command: "uvx",
      args: ["mcp-server-git", "--repository", `${homeDir(os)}${os === "windows" ? "\\repo" : "/repo"}`],
      envNames: [],
      url: "",
      headerNames: [],
    }),
  },
  {
    id: "github-remote",
    label: "GitHub (official remote)",
    blurb: "GitHub's hosted server. OAuth in the client. No token in the file.",
    source: "https://github.com/github/github-mcp-server",
    transport: "http",
    build: () => ({
      name: "github",
      transport: "http",
      command: "",
      args: [],
      envNames: [],
      url: "https://api.githubcopilot.com/mcp/",
      headerNames: [],
    }),
  },
  {
    id: "github-docker",
    label: "GitHub (official Docker)",
    blurb: "Local stdio via ghcr.io/github/github-mcp-server. The npm package is retired.",
    source: "https://github.com/github/github-mcp-server",
    transport: "stdio",
    build: () => ({
      name: "github",
      transport: "stdio",
      command: "docker",
      args: ["run", "-i", "--rm", "-e", "GITHUB_PERSONAL_ACCESS_TOKEN", "ghcr.io/github/github-mcp-server"],
      envNames: ["GITHUB_PERSONAL_ACCESS_TOKEN"],
      url: "",
      headerNames: [],
    }),
  },
];

export function catalogById(id: string) {
  return catalogServers.find((server) => server.id === id);
}
