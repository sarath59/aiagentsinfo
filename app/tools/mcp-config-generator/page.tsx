import Link from "next/link";
import { McpConfigGenerator } from "@/components/McpConfigGenerator";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FaqList } from "@/components/FaqList";
import { workedExamples } from "@/lib/mcp-config/examples";
import { generate } from "@/lib/mcp-config/generate";
import { MCP_CONFIG_CHECKED_ISO, MCP_CONFIG_CHECKED_LABEL, mcpConfigSources } from "@/lib/mcp-config/sources";
import { JsonLd, defaultMetadata, faqPageJsonLd, softwareApplicationJsonLd, webPageJsonLd } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";

const path = "/tools/mcp-config-generator";
const title = "MCP Server Config Generator: The File Each Client Loads";
const description =
  "Write the MCP config for Claude Desktop, Claude Code, Cursor, VS Code, or Windsurf. Copy the file, the path, and the command. Or paste a config and get a score.";

const faqs = [
  {
    question: "What is an MCP server config file?",
    answer:
      "It is the JSON file that tells one client how to start a local MCP server, or which URL to call. Claude Desktop reads claude_desktop_config.json. Claude Code reads .mcp.json for a project. Cursor reads mcp.json. VS Code's editor file is .vscode/mcp.json. Windsurf's Cascade file is mcp_config.json. The keys are not the same.",
  },
  {
    question: "Why does the same server load in Cursor and not in VS Code?",
    answer:
      "Cursor's mcp.json uses a top-level mcpServers object. VS Code's editor file, .vscode/mcp.json, uses servers. The Copilot harness, on the configuration reference checked 13 Nov 2026, reads a different portable file that uses mcpServers, and that page says the harness does not read .vscode/mcp.json directly. A file that is correct for Cursor is invisible in the editor file. The note is Why an MCP Server Loads in Cursor and Not in VS Code.",
  },
  {
    question: "Does this generator call an AI model?",
    answer:
      "No. The file is built from the client, the transport, and the server fields, using rules taken from the vendor pages linked below. Variation switches the secret style, or the VS Code file, using those same rules. The result is labeled Your generated MCP config. It is not attributed to a named model.",
  },
  {
    question: "Is a pasted config stored?",
    answer:
      "No. Generate and Check both send the request to this site so the server can run the same rules. The request is not written to a file, a database, or a log. A value that looks like a token is replaced with [redacted] in the review and in the fixed file. Do not paste a live token anyway.",
  },
  {
    question: "Where does Claude Desktop keep the file?",
    answer:
      "The local-server guide, checked 13 Nov 2026, puts claude_desktop_config.json at ~/Library/Application Support/Claude/ on macOS, %APPDATA%\\Claude\\ on Windows, and ~/.config/Claude/ on Linux. Quit the app completely after you save. A remote server is added in Settings, Connectors, Add custom connector. That guide does not put a url key in the JSON file.",
  },
  {
    question: "Does npx need cmd /c on Windows?",
    answer:
      "The reference-servers README says yes: set command to cmd and start args with /c, npx. Leave uvx unwrapped. The Claude Desktop tutorial's Windows sample uses command npx with no wrapper. This tool follows the README when the operating system is Windows, and it says so on the file.",
  },
  {
    question: "Which GitHub MCP package should the file run?",
    answer:
      "GitHub's README says the remote server is https://api.githubcopilot.com/mcp/ and the local image is ghcr.io/github/github-mcp-server. It says the npm package @modelcontextprotocol/server-github is no longer supported. This generator does not write that package. Windsurf's sample still shows it. That sample is stale.",
  },
  {
    question: "Does Windsurf use the same file as Cursor?",
    answer:
      "No. The English Cascade page, checked 13 Nov 2026, uses mcpServers, like Cursor, but the file is mcp_config.json. Cascade opens ~/.config/devin/mcp_config.json on macOS and Linux, or %AppData%\\devin\\mcp_config.json on Windows. A remote server uses serverUrl or url. Editor discovery reads a different file under ~/.codeium/windsurf/. Older translated pages disagree about that path, so this tool follows the English page.",
  },
];

const steps = [
  {
    title: "Pick the client, not a generic JSON shape",
    body: "Claude Desktop, Claude Code, Cursor, VS Code, and Windsurf do not read the same key. The VS Code control also chooses the editor file or the Copilot portable file. Those two VS Code files disagree with each other.",
  },
  {
    title: "Add a server you can actually install",
    body: "The list is the reference servers from modelcontextprotocol/servers, plus GitHub's official remote URL and Docker image. The retired GitHub npm package is not on the list. A custom row is there when the server is yours.",
  },
  {
    title: "Name the environment variable. Do not paste the token.",
    body: "The form takes the variable name. The file gets the reference that client documents: ${env:NAME}, ${NAME}, or a VS Code input. Claude Desktop's debugging page shows a literal. This tool writes REPLACE_ON_THIS_MACHINE instead, and tells you to fill it on that machine.",
  },
  {
    title: "Copy the file, the path, and the command",
    body: "Claude Code gets claude mcp add --scope project. VS Code's editor file gets code --add-mcp. Cursor, Claude Desktop, Windsurf, and the Copilot portable file had no one-line add command on the pages checked 13 Nov 2026. The path list covers macOS, Windows, and Linux.",
  },
  {
    title: "Restart, then confirm the server is listed",
    body: "Claude Desktop wants a full quit. Claude Code wants a new session, then claude mcp list or /mcp. Cursor wants a restart. VS Code wants MCP: List Servers. Windsurf wants the refresh button. If the name is missing, paste the file into Check a config.",
  },
];

const siblings = [
  { href: "/agent-prompt-checker", title: "Prompt and tool checker", body: "Schema and token check for a prompt and its tools." },
  { href: "/tools/agents-md-generator", title: "AGENTS.md generator", body: "The instruction file a coding agent reads before it edits the repo." },
  { href: "/agent-cost-calculator", title: "AI agent cost calculator", body: "A 30-day token bill from official prices." },
  { href: "/blog/how-many-official-mcp-servers-are-there", title: "How many official MCP servers are there?", body: "Seven reference servers, and a registry count that is a different object." },
];

export const metadata = defaultMetadata(title, description, path, { absoluteTitle: true });

export default function McpConfigGeneratorPage() {
  const samples = workedExamples.map((example) => ({ ...example, file: generate(example.input) }));
  return (
    <>
      <JsonLd
        data={[
          webPageJsonLd({
            title,
            description,
            path,
            datePublished: MCP_CONFIG_CHECKED_ISO,
            dateModified: MCP_CONFIG_CHECKED_ISO,
          }),
          faqPageJsonLd(faqs),
          softwareApplicationJsonLd({
            name: "MCP Server Config Generator",
            url: path,
            description,
            applicationCategory: "DeveloperApplication",
            operatingSystem: "Web",
            isAccessibleForFree: true,
            offers: { price: 0, priceCurrency: "USD" },
          }),
        ]}
      />
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Tools", path: "/tools" },
          { name: "MCP server config generator", path },
        ]}
      />
      <header className="mx-auto max-w-6xl px-4 pb-4 pt-8">
        <p className="kicker kicker-lead">Free tool</p>
        <h1 className="display mt-2 text-3xl sm:text-4xl">{title}</h1>
        <p className="mt-3 max-w-3xl text-lg leading-relaxed text-[var(--muted)]">
          It writes the config file that client reads, and it checks a config you already have for the mistakes that keep a server from loading.
        </p>
        <p className="mt-2 text-sm text-[var(--muted)]">
          Client formats checked <time dateTime={MCP_CONFIG_CHECKED_ISO}>{MCP_CONFIG_CHECKED_LABEL}</time>. No account. The failure this catches is{" "}
          <Link className="text-[var(--link)] underline" href="/blog/why-an-mcp-server-loads-in-cursor-not-vs-code">
            why an MCP server loads in Cursor and not in VS Code
          </Link>
          .
        </p>
      </header>
      <div className="mx-auto max-w-6xl px-4 pb-20">
        <McpConfigGenerator />

        <section className="mt-14" aria-labelledby="how-to">
          <h2 id="how-to" className="text-2xl font-semibold tracking-tight">
            How do you get from a blank form to a server that is actually listed?
          </h2>
          <ol className="mt-4 grid gap-4">
            {steps.map((step, index) => (
              <li key={step.title} className="glass rounded-3xl p-5">
                <p className="kicker">Step {index + 1}</p>
                <h3 className="mt-2 text-lg font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{step.body}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-14">
          <h2 className="text-2xl font-semibold tracking-tight">Three configs, three clients</h2>
          <div className="mt-4 grid gap-4">
            {samples.map((sample) => (
              <article key={sample.id} className="glass rounded-3xl p-5">
                <h3 className="text-lg font-semibold">{sample.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{sample.body}</p>
                <p className="mt-2 text-sm">
                  <code>{sample.file.paths.find((item) => item.os === sample.input.os)?.path}</code>
                </p>
                <pre className="mt-3 overflow-auto rounded-2xl bg-[var(--bg)] p-3 text-xs leading-relaxed">
                  <code>{sample.file.body}</code>
                </pre>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-14">
          <h2 className="text-2xl font-semibold tracking-tight">What the pages actually said</h2>
          <div className="mt-3 max-w-3xl text-sm leading-relaxed text-[var(--muted)]">
            <p>
              On {MCP_CONFIG_CHECKED_LABEL} the{" "}
              <a className="text-[var(--link)] underline" href="https://modelcontextprotocol.io/docs/2026-07-28/develop/connect-local-servers">
                local-server guide
              </a>{" "}
              put Claude Desktop&apos;s stdio servers under mcpServers, with command npx and -y, and told you to quit the app. Its Windows sample does not use cmd /c. The{" "}
              <a className="text-[var(--link)] underline" href="https://github.com/modelcontextprotocol/servers/blob/main/README.md">
                reference-servers README
              </a>{" "}
              does. This tool follows the README for a Windows npx command and says so in the notes.
            </p>
            <p className="mt-3">
              Claude Code&apos;s{" "}
              <a className="text-[var(--link)] underline" href="https://code.claude.com/docs/en/mcp">
                MCP page
              </a>{" "}
              requires a type when an entry has a url, limits server names to letters, numbers, hyphens, and underscores, and expands ${"{VAR}"}. Cursor&apos;s{" "}
              <a className="text-[var(--link)] underline" href="https://cursor.com/docs/mcp">
                MCP page
              </a>{" "}
              marks stdio type as required and documents ${"{env:NAME}"}. Its{" "}
              <a className="text-[var(--link)] underline" href="https://cursor.com/help/customization/mcp">
                help page
              </a>{" "}
              says to restart, and that the project file wins over ~/.cursor/mcp.json. It does not publish a separate Windows path for that global file.
            </p>
            <p className="mt-3">
              VS Code&apos;s{" "}
              <a className="text-[var(--link)] underline" href="https://code.visualstudio.com/docs/agents/reference/mcp-configuration.md">
                configuration reference
              </a>{" "}
              now tells new Copilot setups to use mcpServers in a workspace .mcp.json or in ~/.copilot/mcp-config.json. It still documents .vscode/mcp.json, with servers and inputs, as the editor-managed file the harness does not read directly. Windsurf&apos;s{" "}
              <a className="text-[var(--link)] underline" href="https://docs.windsurf.com/plugins/cascade/mcp">
                Cascade page
              </a>{" "}
              uses mcpServers and serverUrl. A detail that was not on these pages is not in the generator.
            </p>
          </div>
        </section>

        <section className="mt-14">
          <h2 className="text-2xl font-semibold tracking-tight">Other free tools</h2>
          <ul className="mt-4 grid gap-4 sm:grid-cols-2">
            {siblings.map((tool) => (
              <li key={tool.href} className="glass rounded-3xl p-5">
                <h3 className="font-semibold">
                  <Link href={tool.href}>{tool.title}</Link>
                </h3>
                <p className="mt-2 text-sm text-[var(--muted)]">{tool.body}</p>
                <Link href={tool.href} className="mt-3 inline-block text-sm text-[var(--link)] underline">
                  Open
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-14">
          <h2 className="text-2xl font-semibold tracking-tight">Next steps</h2>
          <ul className="mt-3 grid gap-2 text-sm">
            <li>
              <Link className="text-[var(--link)] underline" href="/blog/why-an-mcp-server-loads-in-cursor-not-vs-code">
                Read the short failure note
              </Link>
              <span className="text-[var(--muted)]"> on mcpServers versus servers.</span>
            </li>
            <li>
              <Link className="text-[var(--link)] underline" href="/blog/how-many-official-mcp-servers-are-there">
                How many official MCP servers are there?
              </Link>
              <span className="text-[var(--muted)]"> Seven reference servers, counted separately from the registry.</span>
            </li>
            <li>
              <Link className="text-[var(--link)] underline" href="/blog/mcp-server-meaning-42072-github-repos">
                MCP server meaning
              </Link>
              <span className="text-[var(--muted)]"> and the GitHub topic count from 10 November 2026.</span>
            </li>
            <li>
              <Link className="text-[var(--link)] underline" href="/glossary/model-context-protocol">
                What is an MCP server?
              </Link>
              <span className="text-[var(--muted)]"> The protocol, before the config file.</span>
            </li>
            <li>
              <Link className="text-[var(--link)] underline" href="/reports/mcp-next-6-months">
                MCP, the next six months
              </Link>
              <span className="text-[var(--muted)]"> Revision 2026-07-28, the registry, and the dated risks.</span>
            </li>
            <li>
              <Link className="text-[var(--link)] underline" href="/tools">
                All free tools
              </Link>
              <span className="text-[var(--muted)]"> on one page.</span>
            </li>
            <li>
              <Link className="text-[var(--link)] underline" href="/submit">
                Submit or claim a listing
              </Link>
              <span className="text-[var(--muted)]"> if you ship an agent and want it in the directory.</span>
            </li>
          </ul>
        </section>

        <section className="mt-14">
          <h2 className="text-2xl font-semibold tracking-tight">Sources</h2>
          <p className="mt-2 text-sm text-[var(--muted)]">
            Read <time dateTime={MCP_CONFIG_CHECKED_ISO}>{MCP_CONFIG_CHECKED_LABEL}</time>. A format claim that is not on one of these pages is not in the generator.
          </p>
          <ul className="mt-3 grid gap-2 text-sm">
            {mcpConfigSources.map((source) => (
              <li key={source.url}>
                <a className="text-[var(--link)] underline" href={source.url}>
                  {source.name}
                </a>
                <span className="text-[var(--muted)]"> — {source.note}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-[var(--muted)]">
            Canonical URL:{" "}
            <a className="text-[var(--link)] underline" href={absoluteUrl(path)}>
              {absoluteUrl(path)}
            </a>
          </p>
        </section>

        <FaqList
          heading="Questions people ask before they restart the client"
          lead="The answers cite a page read 13 Nov 2026. They do not promise that a server will connect on your machine."
          items={faqs.map((item) => ({ question: item.question, answer: <p>{item.answer}</p> }))}
        />
      </div>
    </>
  );
}
