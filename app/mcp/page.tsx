import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CiteOrEmbed } from "@/components/CiteOrEmbed";
import { CopyCode } from "@/components/CopyCode";
import { FaqList } from "@/components/FaqList";
import { UpdatedLine } from "@/components/UpdatedLine";
import {
  MCP_PAGE_PATH,
  MCP_PATH,
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
    question: "What is the AI agents directory MCP server?",
    answer:
      "A public, read-only Model Context Protocol server at https://www.aiagentsinfo.com/api/mcp that lets assistants search and read this directory, its comparison tables, and its research notes.",
  },
  {
    question: "Do I need an API key?",
    answer: "No. The server is public and read-only. There is no login and no write tools.",
  },
  {
    question: "Which assistants can connect?",
    answer:
      "Any client that speaks MCP Streamable HTTP, including Cursor, VS Code, Claude Code, Claude Desktop (via a connector or mcp-remote), and ChatGPT custom MCP connectors.",
  },
  {
    question: "Where do the answers come from?",
    answer:
      "Only from listings, comparison tables, and research already published on AI Agents Info. The server does not invent products, prices, or scores.",
  },
  {
    question: "How do I cite a result?",
    answer:
      "Every tool result includes a canonical https://www.aiagentsinfo.com URL. Use that URL when you mention a listing, comparison, or research note.",
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
            datePublished: MCP_UPDATED,
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
          A public Streamable HTTP endpoint so Claude, Cursor, ChatGPT, VS Code, and other MCP clients can search
          this independent directory of AI agents and tools, then link back to the page they used.
        </p>
        <UpdatedLine date={MCP_UPDATED} />
        <p className="mt-3 text-sm text-[var(--muted)]">
          Endpoint <a className="text-[var(--link)] underline" href={endpoint}>{endpoint}</a>. Server version{" "}
          {MCP_SERVER_VERSION}. No authentication.
        </p>
      </header>

      <div className="mx-auto max-w-6xl px-4 pb-20">
        <section className="max-w-3xl">
          <h2 className="text-2xl font-semibold tracking-tight">What is the AI agents directory MCP server?</h2>
          <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
            A public, read-only Model Context Protocol server at {endpoint} that lets assistants search and read this
            directory, its comparison tables, and its research notes. It uses Streamable HTTP, the current MCP
            transport, so a client only needs that URL. The protocol revision named in this site&apos;s glossary, read
            November 8, 2026, is 2026-07-28; the handler also answers 2025-era Streamable HTTP clients.
          </p>
        </section>

        <section className="mt-12 max-w-3xl">
          <h2 className="text-2xl font-semibold tracking-tight">How do I connect Claude, Cursor, or ChatGPT?</h2>
          <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
            Paste {endpoint} into the client as a Streamable HTTP MCP server. Cursor and VS Code take a JSON snippet.
            Claude Code takes one CLI command. ChatGPT and Claude Desktop add a custom connector by URL. Older
            stdio-only apps can wrap the same URL with mcp-remote.
          </p>
        </section>

        <div className="mt-8 grid gap-4">
          <CopyCode
            label="Cursor — ~/.cursor/mcp.json or .cursor/mcp.json"
            value={cursorConfig}
          />
          <CopyCode label="VS Code — .vscode/mcp.json" value={vscodeConfig} />
          <CopyCode label="Claude Code" value={claudeCodeCommand} />
          <CopyCode
            label="Claude Desktop — claude_desktop_config.json via mcp-remote"
            value={claudeDesktopConfig}
          />
        </div>

        <section className="mt-10 max-w-3xl text-sm leading-relaxed text-[var(--muted)]">
          <h3 className="text-lg font-semibold tracking-tight text-[var(--fg)]">Claude Desktop and claude.ai</h3>
          <p className="mt-2">
            In Claude Desktop or claude.ai, open Customize, then Connectors, then add a custom connector. Use the
            name AI Agents Info and the URL {endpoint}. If your build only launches local stdio servers, use the
            mcp-remote snippet above and restart Claude Desktop.
          </p>
          <h3 className="mt-6 text-lg font-semibold tracking-tight text-[var(--fg)]">ChatGPT</h3>
          <p className="mt-2">
            In ChatGPT, open Settings, then Connectors or Apps, then add a custom MCP server. Choose Streamable HTTP
            and paste {endpoint}. Leave authentication empty. Workspace policy decides whether custom connectors are
            allowed.
          </p>
        </section>

        <section className="mt-12 max-w-3xl">
          <h2 className="text-2xl font-semibold tracking-tight">Which MCP tools does this server expose?</h2>
          <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
            Seven read-only tools over the published directory, comparison tables, and research notes. Every result
            includes a canonical aiagentsinfo.com URL.
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

        <section className="mt-12 max-w-3xl">
          <h2 className="text-2xl font-semibold tracking-tight">Is the AI agents directory MCP server free to use?</h2>
          <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
            Yes. There is no account and no API key. Requests are rate-limited so a single network cannot crowd out
            everyone else. The catalog is cached for a few minutes on the server, because the listings only change
            when the site is deployed.
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
            . The server will not invent a product, a price, or a score. If a listing is missing, it is missing. The
            longer plain-text dump of the site is still{" "}
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
            (Smithery, Glama, PulseMCP, mcp.so) are submitted from their own forms. Those steps are manual.
          </p>
        </section>

        <section className="mt-10 text-sm">
          <p>
            Related:{" "}
            <Link className="text-[var(--link)] underline" href="/reports/mcp-next-6-months">
              MCP, Nov 2026 to May 2027
            </Link>
            {" · "}
            <Link className="text-[var(--link)] underline" href="/glossary/model-context-protocol">
              Model Context Protocol
            </Link>
            {" · "}
            <Link className="text-[var(--link)] underline" href="/directory">
              directory
            </Link>
            {" · "}
            <Link className="text-[var(--link)] underline" href="/best">
              best AI agents
            </Link>
            {" · "}
            <Link className="text-[var(--link)] underline" href="/research">
              research
            </Link>
            {" · "}
            <Link className="text-[var(--link)] underline" href="/agent-prompt-checker">
              prompt and tool checker
            </Link>
          </p>
        </section>

        <div className="mt-10">
          <CiteOrEmbed citation={citation} embed={embed} />
        </div>

        <FaqList items={faqs} heading="FAQ" />
      </div>
    </>
  );
}
