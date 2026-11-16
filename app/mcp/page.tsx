import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CiteOrEmbed } from "@/components/CiteOrEmbed";
import { CopyCode } from "@/components/CopyCode";
import { FaqList } from "@/components/FaqList";
import { PlainTable } from "@/components/trackers/PlainTable";
import { UpdatedLine } from "@/components/UpdatedLine";
import {
  MCP_PAGE_PATH,
  MCP_PATH,
  MCP_PUBLISHED,
  MCP_SERVER_VERSION,
  MCP_UPDATED,
  mcpToolDocs,
} from "@/lib/mcp";
import {
  JsonLd,
  defaultMetadata,
  faqPageJsonLd,
  softwareApplicationJsonLd,
  webPageJsonLd,
} from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";
import { formatDate } from "@/lib/utils";

const path = MCP_PAGE_PATH;
const title = "AI agents directory MCP server";
const description =
  "Public, read-only MCP server for the AI Agents Info directory. Connect Claude, Cursor, ChatGPT, and VS Code to search listings, comparisons, and research. No login.";
const endpoint = absoluteUrl(MCP_PATH);
const pageUrl = absoluteUrl(path);

export const metadata = defaultMetadata(title, description, path);

const faqs = [
  {
    question: "What is an MCP server?",
    answer:
      "A program that exposes tools, resources, and prompts to an AI client over the Model Context Protocol. The specification for revision 2026-07-28, read November 16, 2026, calls a server a service that provides context and capabilities. It uses JSON-RPC 2.0. The two standard transports are stdio and Streamable HTTP.",
  },
  {
    question: "What is the AI agents directory MCP server?",
    answer:
      "A public, read-only Model Context Protocol server at https://www.aiagentsinfo.com/api/mcp. It lets an assistant search and read this directory, its comparison tables, and its research notes. It speaks Streamable HTTP. There is no login and no write tool.",
  },
  {
    question: "Is an MCP server the same as a REST API?",
    answer:
      "No. A REST API is an HTTP interface your own code calls. An MCP server is a JSON-RPC 2.0 service a host connects to, and the specification says it may offer resources, prompts, and tools. Function calling, on OpenAI’s guide read November 16, 2026, is different again: the model returns a function call, and your application executes it. The API does not run the function.",
  },
  {
    question: "Are MCP servers safe?",
    answer:
      "Not by default. The specification for revision 2026-07-28 says tools represent arbitrary code execution and that hosts must obtain explicit user consent before invoking any tool. It also says tool descriptions should be treated as untrusted unless they come from a trusted server. Invariant Labs, on April 1, 2025, showed a tool description that could instruct a model to read secrets. The security best practices page, read November 16, 2026, forbids token passthrough and tells servers to keep OAuth scopes narrow. This directory server is read-only and has no login. A server that can write, or that holds a token, is a different risk.",
  },
  {
    question: "Do I need an API key?",
    answer:
      "No. The server is public and read-only. There is no login and no write tools. The code on this site, as of November 16, 2026, allows 90 requests in five minutes from one client address and refuses a body over 64,000 bytes.",
  },
  {
    question: "Which assistants can connect?",
    answer:
      "Any client that speaks MCP Streamable HTTP. Cursor and VS Code take a JSON file, and the top-level key is not the same. Claude Code takes one CLI command. Claude’s remote-server guide, read November 16, 2026, adds a custom connector by URL. ChatGPT’s custom MCP guide, read the same day, adds a plugin from ChatGPT Plugins and has a No authentication option. A stdio-only app can wrap the URL with mcp-remote. This server does not speak the old HTTP+SSE transport.",
  },
  {
    question: "Where do the answers come from?",
    answer:
      "Only from listings, comparison tables, and research already published on AI Agents Info. The server does not invent products, prices, or scores. Every tool result includes a canonical https://www.aiagentsinfo.com URL. Use that URL when you cite a listing, comparison, or research note.",
  },
  {
    question: "What is the difference between a local and a remote MCP server?",
    answer:
      "A local server is a process the client starts on the same machine, usually over stdio, and it typically serves one client. A remote server is an HTTP service, usually Streamable HTTP, and it can serve many clients. The architecture overview for revision 2026-07-28, read November 16, 2026, uses the filesystem server as the local example and Sentry as the remote example. This directory server is remote: one URL, no process to install.",
  },
];

const prompts = [
  "Search the AI Agents Info directory for free open-source coding agents and link the listings.",
  "Compare Claude Code, Codex, and Cursor using the AI Agents Info MCP server. Do not invent a ranking.",
  "What does AI Agents Info research say about Terminal-Bench? Cite the research URL.",
  "List the directory categories on aiagentsinfo.com and how many listings each has.",
];

const cursorConfig = `{
  "mcpServers": {
    "ai-agents-info": {
      "url": "${endpoint}"
    }
  }
}`;

const vscodeConfig = `{
  "servers": {
    "ai-agents-info": {
      "type": "http",
      "url": "${endpoint}"
    }
  }
}`;

const claudeDesktopConfig = `{
  "mcpServers": {
    "ai-agents-info": {
      "command": "npx",
      "args": ["-y", "mcp-remote", "${endpoint}"]
    }
  }
}`;

const claudeCodeCommand = `claude mcp add --transport http ai-agents-info ${endpoint}`;

const guides = [
  {
    href: "/glossary/model-context-protocol",
    title: "Glossary: What is an MCP server in AI?",
    body: "The short definition. The versioning page it cites still named revision 2026-07-28 on November 16, 2026.",
  },
  {
    href: "/tools/mcp-config-generator",
    title: "MCP server config generator",
    body: "Writes the file for Claude Desktop, Claude Code, Cursor, VS Code, or Windsurf, and checks a paste. Nothing is stored.",
  },
  {
    href: "/blog/why-an-mcp-server-loads-in-cursor-not-vs-code",
    title: "Why an MCP server loads in Cursor and not in VS Code",
    body: "Cursor reads mcpServers. VS Code’s editor file reads servers. The JSON can be valid and the server can still be missing.",
  },
  {
    href: "/blog/mcp-server-meaning-42072-github-repos",
    title: "MCP server meaning: 42,072 repos carry the tag",
    body: "GitHub’s topic:mcp-server total at 03:35:36 UTC on November 10, 2026. A tag is not a server to enable.",
  },
  {
    href: "/research/top-mcp-server-repos-november-2026",
    title: "5 of 44 top MCP server repos are archived",
    body: "The November 13 name search. Five archived repositories still held 9,827 stars. The first raw row was a list.",
  },
  {
    href: "/blog/how-many-official-mcp-servers-are-there",
    title: "How many official MCP servers are there?",
    body: "Seven reference servers, re-read on this page November 16. The registry count is a different object.",
  },
  {
    href: "/reports/mcp-next-6-months",
    title: "MCP, Nov 2026 to May 2027",
    body: "What revision 2026-07-28 already removed, and the November 10 registry walk of 61,146 latest records.",
  },
  {
    href: "/research/web-search-mcp-npm-downloads-november-2026",
    title: "Firecrawl’s search MCP had 680,952 npm downloads",
    body: "October 14 through November 12, 2026. A download is a file request, not a user and not a quality rank.",
  },
];

const sources = [
  {
    href: "https://modelcontextprotocol.io/specification/2026-07-28",
    label: "Specification, revision 2026-07-28",
    note: "Read November 16, 2026. JSON-RPC 2.0. Servers offer resources, prompts, and tools. Tools represent arbitrary code execution. Hosts must obtain explicit user consent before invoking any tool. Tool descriptions are untrusted unless they come from a trusted server.",
  },
  {
    href: "https://modelcontextprotocol.io/docs/learn/versioning",
    label: "Versioning",
    note: "Read November 16, 2026. The current protocol version is 2026-07-28. A version string is the last date of a backwards-incompatible change. Handshake-based revisions are 2025-11-25 and earlier.",
  },
  {
    href: "https://modelcontextprotocol.io/docs/2026-07-28/learn/architecture",
    label: "Architecture overview, revision 2026-07-28",
    note: "Read November 16, 2026. Host, client, and server. Stdio typically serves one client. Streamable HTTP can serve many. server/discover. Roots, sampling, and logging are deprecated in this revision.",
  },
  {
    href: "https://modelcontextprotocol.io/specification/2026-07-28/basic/transports",
    label: "Transports, revision 2026-07-28",
    note: "Read November 16, 2026. Stdio is newline-delimited JSON-RPC on a client-launched subprocess. Streamable HTTP is an HTTP POST to one endpoint, answered as JSON or a request-scoped SSE stream.",
  },
  {
    href: "https://modelcontextprotocol.io/docs/2026-07-28/learn/server-concepts",
    label: "Understanding MCP servers",
    note: "Read November 16, 2026. Tools are chosen by the model, resources by the application, prompts by the user.",
  },
  {
    href: "https://modelcontextprotocol.io/docs/getting-started/intro",
    label: "What is the Model Context Protocol?",
    note: "Read November 16, 2026. The USB-C comparison, and the clients the page names: Claude, ChatGPT, Visual Studio Code, Cursor, and MCPJam.",
  },
  {
    href: "https://modelcontextprotocol.io/docs/2026-07-28/tutorials/security/security_best_practices",
    label: "Security best practices",
    note: "Read November 16, 2026. Token passthrough is forbidden. Scope minimization. The confused-deputy note says Dynamic Client Registration is deprecated as of 2026-07-28 and that the attack still applies to proxies that support it.",
  },
  {
    href: "https://invariantlabs.ai/blog/mcp-security-notification",
    label: "Invariant Labs, tool poisoning",
    note: "Dated April 1, 2025. A tool description can carry instructions the model follows and the approval dialog may not show. The same note describes rug pulls and tool shadowing across servers.",
  },
  {
    href: "https://github.com/modelcontextprotocol/servers",
    label: "Reference servers README",
    note: "Read November 16, 2026. Seven reference servers, maintained by the MCP steering group, and marked as not production-ready. Every server in the repo serves stdio. Only Everything also serves Streamable HTTP. The old GitHub reference server is archived.",
  },
  {
    href: "https://github.com/github/github-mcp-server",
    label: "GitHub MCP server README",
    note: "Read November 16, 2026. Remote URL https://api.githubcopilot.com/mcp/ with OAuth or a personal access token. Local image ghcr.io/github/github-mcp-server.",
  },
  {
    href: "https://modelcontextprotocol.io/docs/2026-07-28/develop/connect-remote-servers",
    label: "Connect to remote MCP servers",
    note: "Read November 16, 2026. Claude Desktop and claude.ai: Settings, Connectors, Add, Add custom connector, then the URL.",
  },
  {
    href: "https://modelcontextprotocol.io/docs/2026-07-28/develop/connect-local-servers",
    label: "Connect to local MCP servers",
    note: "Read November 16, 2026. Claude Desktop reads claude_desktop_config.json on startup. Paths for macOS, Windows, and Linux are on that page. Quit the app completely after a local-server edit.",
  },
  {
    href: "https://developers.openai.com/api/docs/guides/custom-mcp-server",
    label: "OpenAI, add a custom MCP server",
    note: "Read November 16, 2026. ChatGPT Plugins, Add custom MCP server, Server URL. Authentication includes No authentication. Supported protocols listed there: SSE and streaming HTTP.",
  },
  {
    href: "https://developers.openai.com/api/docs/guides/function-calling",
    label: "OpenAI, function calling",
    note: "Read November 16, 2026. The model returns a function call. The application executes it and sends the result back. The API does not run the function.",
  },
  {
    href: "https://www.npmjs.com/package/mcp-handler/v/2.1.1",
    label: "mcp-handler 2.1.1 README",
    note: "The package this route imports. It says it serves revision 2026-07-28 and falls back to stateless Streamable HTTP for 2025-era clients. HTTP+SSE from 2024-11-05 is removed in 2.x.",
  },
];

const citation = `AI Agents Info. "${title}." ${formatDate(MCP_UPDATED)}. ${pageUrl}.`;
const embed = `<blockquote cite="${pageUrl}">
<p>${description}</p>
<footer><a href="${pageUrl}">${title}</a>, AI Agents Info.</footer>
</blockquote>`;

export default function McpPage() {
  return (
    <>
      <JsonLd
        data={[
          webPageJsonLd({
            title,
            description,
            path,
            datePublished: MCP_PUBLISHED,
            dateModified: MCP_UPDATED,
          }),
          faqPageJsonLd(faqs),
          softwareApplicationJsonLd({
            name: "AI Agents Info MCP server",
            url: path,
            description,
            applicationCategory: "DeveloperApplication",
            operatingSystem: "Any",
          }),
        ]}
      />
      <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: title, path }]} />
      <header className="mx-auto max-w-6xl px-4 pb-8 pt-12">
        <p className="kicker kicker-lead">MCP</p>
        <h1 className="display mt-3 text-4xl sm:text-5xl">{title}</h1>
        <p className="mt-4 max-w-3xl text-lg leading-relaxed text-[var(--muted)]">
          An MCP server is a program that exposes tools, resources, and prompts to an AI client over the Model
          Context Protocol. The specification for revision 2026-07-28, read November 16, 2026, calls that program a
          service that provides context and capabilities. Messages are JSON-RPC 2.0. The two standard transports are
          stdio, a local process, and Streamable HTTP, a URL. This page is the connection guide for one of those
          servers: a public, read-only directory at {endpoint}. Paste the URL. No login. Seven tools. Each result
          carries a canonical page on this site.
        </p>
        <UpdatedLine date={MCP_UPDATED} />
        <p className="mt-3 text-sm text-[var(--muted)]">
          Endpoint <a className="text-[var(--link)] underline" href={endpoint}>{endpoint}</a>. Server version{" "}
          {MCP_SERVER_VERSION}. No authentication.
        </p>
      </header>

      <div className="mx-auto max-w-6xl px-4 pb-20">
        <section className="max-w-3xl">
          <h2 id="what-is-an-mcp-server" className="text-2xl font-semibold tracking-tight">
            What is an MCP server?
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
            It is the program an AI application connects to when a model needs a tool or a piece of context. The{" "}
            <a className="text-[var(--link)] underline" href="https://modelcontextprotocol.io/specification/2026-07-28">
              specification for revision 2026-07-28
            </a>
            , read November 16, 2026, says servers offer any of these features to clients:
          </p>
        </section>

        <div className="mt-4">
          <PlainTable
            caption="Server features in MCP specification revision 2026-07-28, read November 16, 2026"
            columns={["Feature", "What the specification says it is", "Who decides to use it"]}
            rows={[
              {
                key: "tools",
                cells: [
                  "Tools",
                  "Functions for the AI model to execute",
                  "The model. The server-concepts page says the model decides when to call them.",
                ],
              },
              {
                key: "resources",
                cells: [
                  "Resources",
                  "Context and data, for the user or the AI model to use",
                  "The application. The same page calls them passive, read-only data.",
                ],
              },
              {
                key: "prompts",
                cells: [
                  "Prompts",
                  "Templated messages and workflows for users",
                  "The user. The same page calls them pre-built instruction templates.",
                ],
              },
            ]}
          />
        </div>

        <section className="mt-4 max-w-3xl text-sm leading-relaxed text-[var(--muted)]">
          <p>
            The{" "}
            <a className="text-[var(--link)] underline" href="https://modelcontextprotocol.io/docs/getting-started/intro">
              introductory page
            </a>
            , read the same day, compares MCP to a USB-C port: one connection pattern, many devices. It names Claude,
            ChatGPT, Visual Studio Code, Cursor, and MCPJam. The metaphor stops at the plug. It does not say which
            file your client reads, which transport the server speaks, or which of the public counts is a server you
            should connect. Those three are below.
          </p>
          <p className="mt-3">
            This directory server exposes tools only. It does not register resources or prompts. The seven tools are
            read-only: the handler sets <code>readOnlyHint</code>, clears <code>destructiveHint</code>, and marks them
            idempotent. A client that honors the hint can treat a call as a read. The short glossary entry is{" "}
            <Link className="text-[var(--link)] underline" href="/glossary/model-context-protocol">
              What is an MCP server in AI?
            </Link>
            . The loop that makes the call is a{" "}
            <Link className="text-[var(--link)] underline" href="/glossary/harness">
              harness
            </Link>
            . The call itself is{" "}
            <Link className="text-[var(--link)] underline" href="/glossary/tool-use">
              tool use
            </Link>
            .
          </p>
        </section>

        <section className="mt-12 max-w-3xl">
          <h2 id="how-does-an-mcp-server-work" className="text-2xl font-semibold tracking-tight">
            How does an MCP server work?
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
            Three roles, one message format, two transports. The{" "}
            <a
              className="text-[var(--link)] underline"
              href="https://modelcontextprotocol.io/docs/2026-07-28/learn/architecture"
            >
              architecture overview
            </a>{" "}
            for revision 2026-07-28, read November 16, 2026, defines them this way.
          </p>
          <ul className="mt-4 grid gap-3 text-sm leading-relaxed text-[var(--muted)]">
            <li>
              <span className="font-semibold text-[var(--fg)]">Host.</span> The AI application. Claude Desktop, VS
              Code, and Cursor are hosts. The host creates one client per server.
            </li>
            <li>
              <span className="font-semibold text-[var(--fg)]">Client.</span> The connector inside the host. It keeps
              the connection and brings context back.
            </li>
            <li>
              <span className="font-semibold text-[var(--fg)]">Server.</span> The program that provides context. Local
              or remote, it is still a server. The filesystem server on your machine and a hosted URL are the same
              role.
            </li>
          </ul>
          <p className="mt-4 text-sm leading-relaxed text-[var(--muted)]">
            The wire is{" "}
            <a className="text-[var(--link)] underline" href="https://www.jsonrpc.org/specification">
              JSON-RPC 2.0
            </a>
            . Revision 2026-07-28 made the protocol stateless. Every request carries its protocol version and the
            client capabilities in <code>_meta</code>. Servers must implement <code>server/discover</code>, which
            returns supported versions, capabilities, and identity. Calling it is optional. A client may send any
            request and handle a version error. The{" "}
            <a className="text-[var(--link)] underline" href="https://modelcontextprotocol.io/docs/learn/versioning">
              versioning page
            </a>
            , read the same day, says the current protocol version is 2026-07-28, and that the string is the last date
            a backwards-incompatible change landed. Handshake-based revisions, <code>initialize</code> included, are
            2025-11-25 and earlier.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
            A tool call is two steps. The client sends <code>tools/list</code>. The host puts that list where the
            model can see it. The model picks a name and arguments. The client sends <code>tools/call</code>. The
            server runs the function and returns the result. Listings can change. The same pattern exists for{" "}
            <code>resources/list</code> plus <code>resources/read</code>, and for <code>prompts/list</code> plus{" "}
            <code>prompts/get</code>.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
            This route uses <code>mcp-handler</code> 2.1.1. That package’s README says it serves 2026-07-28 natively
            and falls back to stateless Streamable HTTP for 2025-era clients. It also says the 2024-11-05 HTTP+SSE
            transport is removed in 2.x. A client that only speaks that old SSE path will not connect here. Roots,
            sampling, and protocol logging are deprecated in 2026-07-28. The architecture page says new code should
            pass directories or files as tool parameters, resource URIs, or server configuration, call a model API
            directly instead of sampling, and log to stderr for stdio servers or to OpenTelemetry. The dated
            reading of what leaves the spec next is{" "}
            <Link className="text-[var(--link)] underline" href="/reports/mcp-next-6-months">
              MCP, Nov 2026 to May 2027
            </Link>
            .
          </p>
        </section>

        <section className="mt-12">
          <h2 id="mcp-server-vs-api" className="text-2xl font-semibold tracking-tight">
            MCP server vs API
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[var(--muted)]">
            People search this as if the three names were one product. They are three different jobs. The MCP cells
            are the specification read November 16, 2026. The function-calling cells are{" "}
            <a
              className="text-[var(--link)] underline"
              href="https://developers.openai.com/api/docs/guides/function-calling"
            >
              OpenAI’s function calling guide
            </a>
            , read the same day. A REST API is the HTTP interface your own code calls. MCP does not define it, and
            this table does not pretend a REST spec said otherwise.
          </p>
          <div className="mt-4">
            <PlainTable
              caption="MCP server versus a REST API versus OpenAI function calling, sources read November 16, 2026"
              columns={["", "MCP server", "REST API", "Function calling"]}
              rows={[
                {
                  key: "what",
                  cells: [
                    "What it is",
                    "A service that provides context and capabilities. It may offer resources, prompts, and tools.",
                    "An HTTP interface your application calls. Not defined by MCP.",
                    "Tool definitions you put in a model request. The model may answer with a function call.",
                  ],
                },
                {
                  key: "find",
                  cells: [
                    "How the operations are found",
                    "tools/list, resources/list, and prompts/list. server/discover returns versions and capabilities.",
                    "Docs, or an OpenAPI file a person wrote. There is no MCP method for this.",
                    "The tools array on that request. There is no separate server to list.",
                  ],
                },
                {
                  key: "runs",
                  cells: [
                    "Who runs the operation",
                    "The MCP server, when the client sends tools/call.",
                    "The API’s own handler.",
                    "Your application. The guide says that when the model calls a function, you execute it and return the result.",
                  ],
                },
                {
                  key: "wire",
                  cells: [
                    "Wire",
                    "JSON-RPC 2.0 over stdio or Streamable HTTP. Custom transports are allowed if they keep that format.",
                    "HTTP methods on URLs.",
                    "The model provider’s API. Not an MCP transport.",
                  ],
                },
                {
                  key: "consent",
                  cells: [
                    "What must happen before a tool runs",
                    "The spec says hosts must obtain explicit user consent. Tools represent arbitrary code execution.",
                    "Whatever that API’s auth requires. MCP does not set the rule.",
                    "The guide does not require a consent dialog. The application decides.",
                  ],
                },
              ]}
            />
          </div>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-[var(--muted)]">
            Use a REST API when you already know the call and your code should make it. Use function calling when the
            model should choose among functions you defined for that request, and your process will run them. Use an
            MCP server when many hosts should discover the same tools without you pasting a fresh schema into each
            one. This directory is the third case. The model does not receive the seven tool schemas until a host
            connects to {endpoint}.
          </p>
        </section>

        <section className="mt-12 max-w-3xl">
          <h2 id="examples" className="text-2xl font-semibold tracking-tight">
            What are examples of MCP servers?
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
            Named programs, not a star chart. Each link below was opened on November 16, 2026, except the two census
            pages, which keep the date of the measurement.
          </p>
          <ul className="mt-4 grid gap-4">
            <li className="glass rounded-3xl p-5">
              <p className="font-semibold text-[var(--fg)]">
                <a className="text-[var(--link)] underline" href="https://github.com/modelcontextprotocol/servers">
                  modelcontextprotocol/servers
                </a>
              </p>
              <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                The reference list maintained by the MCP steering group. The README, read November 16, 2026, names
                seven: Everything, Fetch, Filesystem, Git, Memory, Sequential Thinking, and Time. It says they
                demonstrate features and SDK usage, and that they are not production-ready. Every server in the
                repository serves stdio. Only Everything also serves Streamable HTTP. The old GitHub, Slack, Postgres,
                and Puppeteer reference servers are in{" "}
                <a className="text-[var(--link)] underline" href="https://github.com/modelcontextprotocol/servers-archived">
                  servers-archived
                </a>
                . Brave Search’s row there points at Brave’s own server.
              </p>
            </li>
            <li className="glass rounded-3xl p-5">
              <p className="font-semibold text-[var(--fg)]">
                <a className="text-[var(--link)] underline" href="https://github.com/github/github-mcp-server">
                  github/github-mcp-server
                </a>
              </p>
              <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                GitHub’s official server. The README, read November 16, 2026, documents a remote endpoint at{" "}
                <a className="text-[var(--link)] underline" href="https://api.githubcopilot.com/mcp/">
                  https://api.githubcopilot.com/mcp/
                </a>{" "}
                with OAuth or a personal access token, and a local image at <code>ghcr.io/github/github-mcp-server</code>.
                The token stays in memory on the OAuth path the README describes. A personal access token is a secret
                in your config. The README tells you to grant only the permissions you are comfortable giving the
                tools. This is not the archived reference server above.
              </p>
            </li>
            <li className="glass rounded-3xl p-5">
              <p className="font-semibold text-[var(--fg)]">Filesystem, the local example in the official guide</p>
              <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                <code>npx -y @modelcontextprotocol/server-filesystem</code> plus the directories you allow. The{" "}
                <a
                  className="text-[var(--link)] underline"
                  href="https://modelcontextprotocol.io/docs/2026-07-28/develop/connect-local-servers"
                >
                  local-server guide
                </a>
                , read November 16, 2026, uses it as the Claude Desktop walkthrough. The server runs as you. It can
                do anything your user can do inside those directories. The architecture page uses the same server as
                its local example, and Sentry’s hosted server as its remote example.
              </p>
            </li>
            <li className="glass rounded-3xl p-5">
              <p className="font-semibold text-[var(--fg)]">This directory</p>
              <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                {endpoint}. Remote, Streamable HTTP, no token, seven read-only tools over pages already on this site.
                It is one server. It is not a GitHub topic and it is not a registry row unless a publisher listed it.
                The November 10 registry search recorded on the{" "}
                <Link className="text-[var(--link)] underline" href="/reports/mcp-next-6-months">
                  six-month outlook
                </Link>{" "}
                returned no row for this site.
              </p>
            </li>
          </ul>
          <p className="mt-4 text-sm leading-relaxed text-[var(--muted)]">
            A star count answers a different question. On November 13, 2026 this site read GitHub’s search for{" "}
            <code>mcp-server</code> in the repository name: <code>total_count</code> 56,008 at 03:44:49 UTC. After
            lists and one guide were removed, 5 of the remaining 44 were archived, and those five still had 9,827
            stars. Notion’s description said official while the README sent readers elsewhere. That note is{" "}
            <Link className="text-[var(--link)] underline" href="/research/top-mcp-server-repos-november-2026">
              5 of 44 top MCP server repos are archived
            </Link>
            . Connect the server the vendor documents. Read <code>archived</code> before you trust the stars.
          </p>
        </section>

        <section className="mt-12">
          <h2 id="three-counts" className="text-2xl font-semibold tracking-tight">
            Which number is “how many MCP servers”?
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[var(--muted)]">
            None of these, by itself. They were not taken at one moment, and they count different objects. The seven
            was re-read on November 16, 2026. The other rows are this site’s earlier measurements, with the clock
            time kept on the linked page. They are not a live total.
          </p>
          <div className="mt-4">
            <PlainTable
              caption="Public MCP counts this site has published, with the date of each measurement"
              columns={["Object", "Count", "When", "What it actually is"]}
              rows={[
                {
                  key: "ref",
                  cells: [
                    "Reference servers",
                    "7",
                    "README read November 16, 2026",
                    "Everything, Fetch, Filesystem, Git, Memory, Sequential Thinking, Time. Not a production list.",
                  ],
                },
                {
                  key: "reg10",
                  cells: [
                    "Registry, latest records",
                    "61,146",
                    "November 10, 2026, 10:45:53–10:49:01 GMT",
                    "60,183 active and 963 deprecated. Metadata rows. The about page, read November 10, says host apps should not consume the raw registry.",
                  ],
                },
                {
                  key: "reg8",
                  cells: [
                    "Registry, earlier walk",
                    "59,506",
                    "November 8, 2026, 13:43–13:45 UTC",
                    "The same API, two days earlier. A second pass that hour counted 59,508. The total moves.",
                  ],
                },
                {
                  key: "topic",
                  cells: [
                    "GitHub topic mcp-server",
                    "42,072",
                    "November 10, 2026, 03:35:36 UTC",
                    "total_count, incomplete_results false. A later query the same day, 10:47:15 GMT, returned 42,138.",
                  ],
                },
                {
                  key: "name",
                  cells: [
                    "mcp-server in the repo name",
                    "56,008",
                    "November 13, 2026, 03:44:49 UTC",
                    "A name search. The first row was a list, punkpeye/awesome-mcp-servers, not a server.",
                  ],
                },
              ]}
            />
          </div>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-[var(--muted)]">
            61,146 minus 42,072 is 19,074, and that subtraction is not a gap in one list. A repository can publish
            many registry rows and one topic. A topic can sit on a course, a scraper, or a resume builder. The method
            and the raw queries are on{" "}
            <Link className="text-[var(--link)] underline" href="/blog/how-many-official-mcp-servers-are-there">
              How many official MCP servers are there?
            </Link>
            ,{" "}
            <Link className="text-[var(--link)] underline" href="/blog/mcp-server-meaning-42072-github-repos">
              MCP server meaning: 42,072 repos carry the tag
            </Link>
            , and the{" "}
            <Link className="text-[var(--link)] underline" href="/reports/mcp-next-6-months">
              November 10 outlook
            </Link>
            .
          </p>
        </section>

        <section className="mt-12 max-w-3xl">
          <h2 id="connect" className="text-2xl font-semibold tracking-tight">
            How do I connect an MCP server to Claude, Cursor, ChatGPT, or VS Code?
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
            For this server, paste {endpoint}. A client that speaks Streamable HTTP needs that URL and no token.
            Then look at the client’s own server list. A missing name is a failed load. The file key is the usual
            failure, and it is not the same word in every app. The{" "}
            <Link className="text-[var(--link)] underline" href="/tools/mcp-config-generator">
              MCP config generator
            </Link>{" "}
            writes the file for the client you pick. The note on the key mix-up is{" "}
            <Link className="text-[var(--link)] underline" href="/blog/why-an-mcp-server-loads-in-cursor-not-vs-code">
              why an MCP server loads in Cursor and not in VS Code
            </Link>
            , checked November 13, 2026.
          </p>
        </section>

        <div className="mt-8 grid gap-4">
          <CopyCode label="Cursor — ~/.cursor/mcp.json or .cursor/mcp.json" value={cursorConfig} />
          <CopyCode label="VS Code — .vscode/mcp.json" value={vscodeConfig} />
          <CopyCode label="Claude Code" value={claudeCodeCommand} />
          <CopyCode label="Claude Desktop — claude_desktop_config.json via mcp-remote" value={claudeDesktopConfig} />
        </div>

        <section className="mt-10 max-w-3xl text-sm leading-relaxed text-[var(--muted)]">
          <h3 className="text-lg font-semibold tracking-tight text-[var(--fg)]">Claude</h3>
          <p className="mt-2">
            For the URL, the{" "}
            <a
              className="text-[var(--link)] underline"
              href="https://modelcontextprotocol.io/docs/2026-07-28/develop/connect-remote-servers"
            >
              remote-server guide
            </a>
            , read November 16, 2026, says to open Settings, then Connectors, then Add, then Add custom connector.
            On the desktop app the path into Settings is Ctrl+Comma, or the top-left menu, File, Settings. In the
            browser it is the profile menu, then Settings. Paste {endpoint}. Name it AI Agents Info. The guide’s
            next step is authentication, because most remote servers ask for it. This one does not. If the dialog
            demands a token, cancel it and use the mcp-remote snippet, which launches a local process and does not
            send a credential.
          </p>
          <p className="mt-3">
            The JSON file is the other door, for a stdio process. The{" "}
            <a
              className="text-[var(--link)] underline"
              href="https://modelcontextprotocol.io/docs/2026-07-28/develop/connect-local-servers"
            >
              local-server guide
            </a>
            , read the same day, puts servers under <code>mcpServers</code> in <code>claude_desktop_config.json</code>.
            macOS: <code>~/Library/Application Support/Claude/claude_desktop_config.json</code>. Windows:{" "}
            <code>%APPDATA%\Claude\claude_desktop_config.json</code>. Linux:{" "}
            <code>~/.config/Claude/claude_desktop_config.json</code>. Quit Claude Desktop completely. The file is read
            on startup. The reference-servers README, also read that day, wraps a Windows <code>npx</code> command as{" "}
            <code>cmd /c</code>. The local-server guide’s own Windows sample does not. If <code>npx</code> never
            starts, use the wrapper.
          </p>
          <h3 className="mt-6 text-lg font-semibold tracking-tight text-[var(--fg)]">Claude Code</h3>
          <p className="mt-2">
            The command above sets the transport to HTTP and the name to <code>ai-agents-info</code>. Claude Code’s
            page, checked on this site November 13, 2026, rejects a <code>url</code> that has no <code>type</code>.
            Confirm with <code>claude mcp list</code>, or <code>/mcp</code> inside a session. A project server asks
            for approval the first time.
          </p>
          <h3 className="mt-6 text-lg font-semibold tracking-tight text-[var(--fg)]">Cursor</h3>
          <p className="mt-2">
            Save the snippet in <code>.cursor/mcp.json</code> for one project, or <code>~/.cursor/mcp.json</code> for
            every project. The key is <code>mcpServers</code>. Cursor’s help page, checked November 13, 2026, says
            the two files merge, the project name wins, and you should restart. The remote example on that docs set
            is a <code>url</code> without a <code>type</code>. That shape is what the snippet uses.
          </p>
          <h3 className="mt-6 text-lg font-semibold tracking-tight text-[var(--fg)]">VS Code</h3>
          <p className="mt-2">
            The editor file <code>.vscode/mcp.json</code> uses <code>servers</code>, and the field table checked
            November 13, 2026 marks <code>type</code> as required. The snippet sets <code>http</code>. A new Copilot
            config is a different file: <code>mcpServers</code> in a workspace <code>.mcp.json</code>, or in{" "}
            <code>~/.copilot/mcp-config.json</code>. The configuration reference says the Copilot harness does not
            read <code>.vscode/mcp.json</code> directly. Pasting the Cursor file into the editor file parses and
            never lists the server. Run MCP: List Servers in the session you think is connected.
          </p>
          <h3 className="mt-6 text-lg font-semibold tracking-tight text-[var(--fg)]">ChatGPT</h3>
          <p className="mt-2">
            OpenAI’s{" "}
            <a
              className="text-[var(--link)] underline"
              href="https://developers.openai.com/api/docs/guides/custom-mcp-server"
            >
              custom MCP server guide
            </a>
            , read November 16, 2026, says to use ChatGPT on the web, open ChatGPT Plugins, select the plus button,
            then Add custom MCP server. Enter the name AI Agents Info. Under Connection, paste {endpoint}. Set
            authentication to No authentication. Read the risk warning, confirm it, and create the plugin. Install
            it, then type <code>@</code> in the prompt and select it. The guide says workspace permissions, including
            Lockdown, can block the add. It lists SSE and streaming HTTP as the protocols ChatGPT supports. This
            endpoint is streaming HTTP. It is not the old SSE transport. Ask for a search and tell it to use this
            server, or the built-in browser will answer instead.
          </p>
        </section>

        <section className="mt-12 max-w-3xl">
          <h2 id="tools" className="text-2xl font-semibold tracking-tight">
            Which MCP tools does this server expose?
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
            Seven read-only tools over the published directory, comparison tables, and research notes. Every result
            includes a canonical aiagentsinfo.com URL. There is no tool that writes a listing, sends mail, or reads
            your files.
          </p>
          <ul className="mt-4 grid gap-4">
            {mcpToolDocs.map((tool) => (
              <li key={tool.name} className="glass rounded-3xl p-5">
                <p className="font-mono text-sm font-semibold text-[var(--fg)]">{tool.name}</p>
                <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{tool.description}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-12">
          <h2 id="local-vs-remote" className="text-2xl font-semibold tracking-tight">
            Local vs remote MCP servers
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[var(--muted)]">
            The{" "}
            <a
              className="text-[var(--link)] underline"
              href="https://modelcontextprotocol.io/specification/2026-07-28/basic/transports"
            >
              transports page
            </a>{" "}
            for revision 2026-07-28, read November 16, 2026, says the messages mean the same thing on every binding.
            The binding is how they are framed. The architecture page adds who the server can serve, and it
            recommends OAuth when a remote server needs a token.
          </p>
          <div className="mt-4">
            <PlainTable
              caption="Stdio versus Streamable HTTP, specification revision 2026-07-28, read November 16, 2026"
              columns={["", "stdio", "Streamable HTTP"]}
              rows={[
                {
                  key: "start",
                  cells: [
                    "Who starts it",
                    "The client launches a subprocess on the same machine.",
                    "The server is already running. One process can serve many clients.",
                  ],
                },
                {
                  key: "address",
                  cells: [
                    "How you address it",
                    "A command and args in the client’s config. No port.",
                    "One URL. Each client message is an HTTP POST.",
                  ],
                },
                {
                  key: "frame",
                  cells: [
                    "Framing",
                    "Newline-delimited JSON-RPC on stdin and stdout.",
                    "A JSON response, or a request-scoped Server-Sent Events stream.",
                  ],
                },
                {
                  key: "auth",
                  cells: [
                    "Auth on the wire",
                    "None. The process runs as you. The risk is which directories and tokens that process can see.",
                    "Bearer tokens, API keys, or custom headers. The architecture page recommends OAuth to obtain tokens.",
                  ],
                },
                {
                  key: "cancel",
                  cells: [
                    "How a client cancels",
                    "A notifications/cancelled message.",
                    "The client closes that request’s response stream.",
                  ],
                },
                {
                  key: "here",
                  cells: [
                    "This directory",
                    "Not offered. There is no command to launch.",
                    `${endpoint}. No authentication header.`,
                  ],
                },
              ]}
            />
          </div>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-[var(--muted)]">
            On November 13, 2026 this site read the READMEs of 44 star-ranked repositories with{" "}
            <code>mcp-server</code> in the name. Thirty-three documented a server you run. Four documented only a
            vendor-hosted URL. Seven documented both. Local is still the common case in that set. Remote is the case
            you want when the same URL should work in a browser client and on a second computer. The full split is
            the{" "}
            <Link className="text-[var(--link)] underline" href="/research/top-mcp-server-repos-november-2026">
              November 13 repository note
            </Link>
            .
          </p>
        </section>

        <section className="mt-12 max-w-3xl">
          <h2 id="are-mcp-servers-safe" className="text-2xl font-semibold tracking-tight">
            Are MCP servers safe?
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
            A server is as safe as the tools it can run and the token it holds. The specification, read November 16,
            2026, says tools represent arbitrary code execution and must be treated with caution. Hosts must obtain
            explicit user consent before invoking any tool. The same section says descriptions of tool behavior,
            including annotations, should be considered untrusted unless they come from a trusted server.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
            That last sentence is the one a USB-C explainer skips.{" "}
            <a className="text-[var(--link)] underline" href="https://invariantlabs.ai/blog/mcp-security-notification">
              Invariant Labs
            </a>
            , on April 1, 2025, named the failure tool poisoning: instructions hidden in a tool description that the
            model reads and the approval dialog may not show in full. Their Cursor experiment had the model read a
            config file and an SSH key because the description said to, then pass the contents in an argument. They
            also described a rug pull, where the description changes after you approved the server, and tool
            shadowing, where one server’s description redirects a tool that belongs to a different, trusted server.
            This page does not repeat the payload. Read the tool list before you approve the server, and do not leave
            a write-capable server connected beside a server you do not trust.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
            Tokens are the second loss. The{" "}
            <a
              className="text-[var(--link)] underline"
              href="https://modelcontextprotocol.io/docs/2026-07-28/tutorials/security/security_best_practices"
            >
              security best practices
            </a>{" "}
            page, read November 16, 2026, forbids token passthrough: an MCP server must not accept a token that was
            issued for some other resource and forward that token downstream. The same page’s scope section says a
            stolen token with broad scopes such as <code>files:*</code>, <code>db:*</code>, or <code>admin:*</code>{" "}
            reaches every tool those scopes allow. Ask for the narrow scope the call needs. GitHub’s README tells you
            the same thing in product language: enable only the permissions you are comfortable granting the tools.
            A personal access token in <code>mcp.json</code> is a secret the model can be talked into reading. OAuth
            is a different grant. It is not automatically safer if the client hides the tool arguments.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
            The confused-deputy section of that page is the third case. An MCP proxy that uses one static client ID
            at a third-party authorization server can skip a later user’s consent if it trusts a consent cookie.
            Dynamic Client Registration is deprecated as of 2026-07-28. The page says the attack still applies to
            proxies that support it.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
            This directory server cannot write, and it does not take a token. Connecting it does not make a
            filesystem server, or a GitHub token, safe. The practical order is: vendor URL, then <code>archived</code>{" "}
            and the date of the last push, then the scopes, then the tool descriptions, then the consent dialog. Stars
            are not on that list. An archived Gmail server with 1,169 stars was still inside the November 13 top 44.
          </p>
        </section>

        <section className="mt-12 max-w-3xl">
          <h2 className="text-2xl font-semibold tracking-tight">Is the AI agents directory MCP server free to use?</h2>
          <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
            Yes. There is no account and no API key. The limit in this site’s code, as of November 16, 2026, is 90
            requests in five minutes for one client address. A body over 64,000 bytes is refused. The error tells you
            to wait and retry, and the response sets <code>Retry-After</code>. The catalog is cached for five minutes
            on the server, because the listings change when the site is deployed.
          </p>
        </section>

        <section className="mt-12 max-w-3xl">
          <h2 className="text-2xl font-semibold tracking-tight">Where do the answers come from?</h2>
          <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
            From the same files that render the{" "}
            <Link className="text-[var(--link)] underline" href="/directory">
              directory
            </Link>
            , the{" "}
            <Link className="text-[var(--link)] underline" href="/best">
              comparison tables
            </Link>
            , and the{" "}
            <Link className="text-[var(--link)] underline" href="/research">
              research notes
            </Link>
            . The server will not invent a product, a price, or a score. If a listing is missing, it is missing.
            Cite the <code>url</code> field on the tool result. The longer plain-text dump of the site is still{" "}
            <a className="text-[var(--link)] underline" href="/llms.txt">
              /llms.txt
            </a>
            .
          </p>
        </section>

        <section className="mt-12 max-w-3xl">
          <h2 className="text-2xl font-semibold tracking-tight">What prompts work well?</h2>
          <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
            Ask for a search, a comparison, or a citation, and tell the assistant to use the AI Agents Info MCP
            server. These four hold up:
          </p>
          <ul className="mt-4 grid gap-3">
            {prompts.map((prompt) => (
              <li key={prompt}>
                <CopyCode label="Example prompt" value={prompt} />
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-12 max-w-3xl text-sm leading-relaxed">
          <h2 className="text-2xl font-semibold tracking-tight text-[var(--fg)]">How is this listed in MCP registries?</h2>
          <p className="mt-3 text-[var(--muted)]">
            The machine-readable manifest is{" "}
            <a className="text-[var(--link)] underline" href="/.well-known/mcp/server.json">
              /.well-known/mcp/server.json
            </a>
            , also kept as <code>server.json</code> in the public GitHub repository. A Smithery-style server card is{" "}
            <a className="text-[var(--link)] underline" href="/.well-known/mcp/server-card.json">
              /.well-known/mcp/server-card.json
            </a>
            . Publishing to the official MCP Registry still needs a one-time domain proof for the{" "}
            <code>com.aiagentsinfo</code> namespace, then <code>mcp-publisher publish</code>. Other directories
            (Smithery, Glama, PulseMCP, mcp.so) are submitted from their own forms. Those steps are manual. A registry
            row is metadata. It is not the same thing as the seven reference servers. The about page, read on this
            site November 10, 2026, tells host apps to use a marketplace rather than the raw list.
          </p>
        </section>

        <section className="mt-12">
          <h2 id="guides" className="text-2xl font-semibold tracking-tight">
            MCP guides on this site
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[var(--muted)]">
            This page is the definition and the connection guide. The notes below keep the measurements, the file-key
            failure, and the config checker. Read the one that matches the question you still have.
          </p>
          <ul className="mt-4 grid gap-4 sm:grid-cols-2">
            {guides.map((guide) => (
              <li key={guide.href} className="glass rounded-3xl p-5">
                <h3 className="font-semibold">
                  <Link className="text-[var(--link)] underline" href={guide.href}>
                    {guide.title}
                  </Link>
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{guide.body}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-12 max-w-3xl">
          <h2 className="text-2xl font-semibold tracking-tight">Sources</h2>
          <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
            Read November 16, 2026, unless the note names an earlier measurement. A figure from a previous page on
            this site keeps that page’s clock time. It was not re-counted today.
          </p>
          <ul className="mt-4 grid gap-4">
            {sources.map((source) => (
              <li key={source.href} className="text-sm leading-relaxed text-[var(--muted)]">
                <a className="text-[var(--link)] underline" href={source.href}>
                  {source.label}
                </a>
                . {source.note}
              </li>
            ))}
          </ul>
        </section>

        <div className="mt-10">
          <CiteOrEmbed citation={citation} embed={embed} />
        </div>

        <FaqList items={faqs} heading="FAQ" />
      </div>
    </>
  );
}
