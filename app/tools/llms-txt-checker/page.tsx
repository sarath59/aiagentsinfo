import Link from "next/link";
import { LlmsTxtChecker } from "@/components/LlmsTxtChecker";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FaqList } from "@/components/FaqList";
import {
  FILE_TIMEOUT_MS,
  LINK_CONCURRENCY,
  LINK_BUDGET_MS,
  MAX_BYTES,
  MAX_LINK_CHECKS,
  MAX_REDIRECTS,
  PAGE_CAP,
  PAGE_CONCURRENCY,
  SITEMAP_CHILD_CAP,
  SITEMAP_URL_CAP,
} from "@/lib/llms-txt/limits";
import { JsonLd, defaultMetadata, faqPageJsonLd, softwareApplicationJsonLd, webPageJsonLd } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";

const path = "/tools/llms-txt-checker";
const title = "llms.txt Checker and Generator: Validate Your File Free";
const description =
  "Check /llms.txt and /llms-full.txt, validate the llmstxt.org format, test linked URLs, or draft a file from a sitemap. Free. Nothing you enter is stored.";
const checked = "2026-11-16";

const faqs = [
  {
    question: "What is llms.txt?",
    answer:
      "A Markdown file a site can publish so an agent can find a short index of pages. The proposal at llmstxt.org, v2, updated 10 August 2026 and read 16 November 2026, asks for one H1 with the site name, an optional blockquote summary, then H2 sections whose items are markdown links of the form `- [name](url): notes`. An Optional section holds links an agent can skip when the context window is tight.",
  },
  {
    question: "How is llms.txt different from robots.txt?",
    answer:
      "robots.txt, specified in RFC 9309, tells a crawler which paths it may fetch. llms.txt is a reading list. It does not allow or block a bot. The robots.txt checker for AI crawlers on this site is the tool for the allow and block question. This page is the file-format question.",
  },
  {
    question: "What is llms-full.txt?",
    answer:
      "A longer companion that some sites publish next to /llms.txt. The v2 proposal read on 16 November 2026 specifies /llms.txt and does not define /llms-full.txt. This site still publishes /llms-full.txt as one long document. The checker fetches it and reports status, type, size, and a token count. A 404 there is a normal result.",
  },
  {
    question: "Where do I put llms.txt?",
    answer:
      "At /llms.txt on the host you want covered, served as text/plain or text/markdown. The proposal also allows a file at a subpath, such as /docs/llms.txt, covering the pages under that path. This checker requests the host root. Put the H1 on the first line, keep the links absolute, and point them at the Markdown version of a page when you have one.",
  },
  {
    question: "How do I check an llms.txt file?",
    answer:
      "Enter the host on this page, or open a share link with ?url= set. The server fetches /llms.txt and /llms-full.txt and reports HTTP status, the final URL, content-type, size, a token count, and structure findings. You can also paste the file. Paste validation stays in the browser.",
  },
  {
    question: "Do ChatGPT, Claude, or Google read llms.txt?",
    answer:
      "Google Search Central's AI optimization guide, last updated 2026-07-10 UTC, says Google Search ignores LLMS.txt files and that keeping one will neither harm nor help visibility or rankings in Google Search. John Mueller wrote on Bluesky on 17 June 2025, \"FWIW no AI system currently uses llms.txt.\" That sentence is about that day. On 16 November 2026 this desk fetched a real file at developers.openai.com/llms.txt and, after redirects, at platform.claude.com/llms.txt. Publishing a file is a different fact from a product reading it during an answer. This page did not find an OpenAI or Anthropic document that says ChatGPT or Claude fetch /llms.txt when they answer. The proposal says agents are expected to view the file. That is the proposal.",
  },
  {
    question: "Is the URL or the pasted file stored?",
    answer:
      "No. A URL check is sent so this server can fetch the public files and a sample of links. The response is not written to a file, a database, or an application log. Paste mode runs in the browser. A link check from a paste sends only the URLs, not the whole paste. Do not submit secrets. These files are public.",
  },
];

const steps = [
  {
    title: "Check the host root",
    body: "example.com and https://example.com/docs both request that host's /llms.txt and /llms-full.txt. The optional link sample is the first 25 absolute http(s) URLs in /llms.txt.",
  },
  {
    title: "Read the errors before the info lines",
    body: "An error is a missing file, an HTML page served in its place, a missing or extra H1, or a link scheme an agent cannot fetch. A warning is a broken list item, a relative URL, a duplicate, or an H2 with no links. Info covers the optional summary, the Optional section, and links to other hosts, which the spec allows.",
  },
  {
    title: "Paste when you already have the bytes",
    body: "Paste mode uses the same structure rules in the browser. The token figure there is the character count divided by 4. Ask for a link check only if you want those URLs requested.",
  },
  {
    title: "Generate a draft from the sitemap",
    body: "The generator groups sitemap URLs by the first path segment, reads a title and meta description from up to 30 HTML pages, and writes one H1, a summary, H2 link lists, and an Optional section. Copy or download, then edit it. It is a draft.",
  },
];

const siblings = [
  {
    href: "/tools/ai-crawler-robots-txt-checker",
    title: "robots.txt checker for AI crawlers",
    body: "Which documented AI bots may fetch a path, and a robots.txt for the policy you pick. A different file from llms.txt.",
  },
  {
    href: "/reports/ai-answer-crawlers-november-2026",
    title: "AI answer crawlers, November 2026",
    body: "What answer-engine fetchers requested on this site in one week, with the path each one opened.",
  },
  {
    href: "/tools/shopping-agent-readiness-checker",
    title: "Shopping agent readiness checker",
    body: "Eighteen store checks. A feed row and an HTML price outweigh an llms.txt file.",
  },
];

export const metadata = defaultMetadata(title, description, path, { absoluteTitle: true });

export default function LlmsTxtCheckerPage() {
  const megabytes = MAX_BYTES / (1024 * 1024);
  return (
    <>
      <JsonLd
        data={[
          webPageJsonLd({
            title,
            description,
            path,
            datePublished: checked,
            dateModified: checked,
          }),
          faqPageJsonLd(faqs),
          softwareApplicationJsonLd({
            name: "llms.txt checker and generator",
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
          { name: "llms.txt checker and generator", path },
        ]}
      />
      <header className="mx-auto max-w-6xl px-4 pb-4 pt-8">
        <p className="kicker kicker-lead">Free tool</p>
        <h1 className="display mt-2 text-3xl sm:text-4xl">{title}</h1>
        <p className="mt-3 max-w-3xl text-lg leading-relaxed text-[var(--muted)]">
          Enter a domain. See whether <code>/llms.txt</code> matches the{" "}
          <a className="text-[var(--link)] underline" href="https://llmstxt.org/">
            llmstxt.org
          </a>{" "}
          proposal, which links resolve, and what a sitemap draft of the file would look like.
        </p>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-[var(--muted)]">
          Spec, Google Search Central pages, and the vendor files named below were read{" "}
          <time dateTime={checked}>16 November 2026</time>.
        </p>
      </header>
      <div className="mx-auto max-w-6xl px-4 pb-20">
        <LlmsTxtChecker />

        <section className="mt-14" aria-labelledby="how-to">
          <h2 id="how-to" className="text-2xl font-semibold tracking-tight">
            How do you use the checker?
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

        <section className="mt-14" aria-labelledby="seo">
          <h2 id="seo" className="text-2xl font-semibold tracking-tight">
            Does llms.txt help SEO or AI answers?
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[var(--muted)]">
            Google&apos;s own guide says the file is ignored for Search, including AI Overviews and AI Mode. This page
            does not claim a ranking benefit.
          </p>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[var(--muted)]">
            <a className="text-[var(--link)] underline" href="https://developers.google.com/search/docs/fundamentals/ai-optimization-guide">
              Optimizing your website for generative AI features on Google Search
            </a>
            , last updated 2026-07-10 UTC, says: &quot;You don&apos;t need to create new machine readable files, AI text
            files, markup, or Markdown to appear in Google Search (including its generative AI capabilities), as Google
            Search itself doesn&apos;t use them.&quot; The next paragraph says maintaining LLMS.txt files &quot;will
            neither harm nor help your site&apos;s visibility or rankings in Google Search, as Google Search ignores
            them.&quot; The{" "}
            <a className="text-[var(--link)] underline" href="https://developers.google.com/search/updates">
              Search Central updates log
            </a>{" "}
            dates that note to 15 June 2026. The{" "}
            <a className="text-[var(--link)] underline" href="https://developers.google.com/search/docs/appearance/ai-features">
              AI features page
            </a>
            , last updated 2025-12-10 UTC, still says you don&apos;t need new machine-readable files, AI text files, or
            markup to appear in AI Overviews or AI Mode.
          </p>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[var(--muted)]">
            John Mueller wrote on{" "}
            <a className="text-[var(--link)] underline" href="https://bsky.app/profile/johnmu.com/post/3luk2gw5fd22w">
              Bluesky on 17 June 2025
            </a>
            : &quot;FWIW no AI system currently uses llms.txt.&quot; That is a statement about that day, from a Google
            Search person. It is not a crawl log from November 2026.
          </p>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[var(--muted)]">
            Files this desk fetched on 16 November 2026:{" "}
            <a className="text-[var(--link)] underline" href="https://developers.openai.com/llms.txt">
              developers.openai.com/llms.txt
            </a>{" "}
            returned HTTP 200, <code>text/plain</code>, and opened with an H1, a blockquote, and H2 link lists.{" "}
            <a className="text-[var(--link)] underline" href="https://docs.anthropic.com/llms.txt">
              docs.anthropic.com/llms.txt
            </a>{" "}
            returned HTTP 301 to <code>platform.claude.com/docs/llms.txt</code>, which returned HTTP 308 to{" "}
            <a className="text-[var(--link)] underline" href="https://platform.claude.com/llms.txt">
              platform.claude.com/llms.txt
            </a>
            , HTTP 200, <code>text/plain</code>.{" "}
            <a className="text-[var(--link)] underline" href="https://ai.google.dev/llms.txt">
              ai.google.dev/llms.txt
            </a>{" "}
            returned HTTP 404. A docs host publishing the file is not a statement that ChatGPT or Claude consult it
            while answering. The{" "}
            <a className="text-[var(--link)] underline" href="https://llmstxt.org/">
              v2 proposal
            </a>{" "}
            says agents are expected to view <code>llms.txt</code> and then follow a link. That expectation is the
            author&apos;s, Jeremy Howard, updated 10 August 2026.
          </p>
        </section>

        <section className="mt-14" aria-labelledby="method">
          <h2 id="method" className="text-2xl font-semibold tracking-tight">
            How it works, and where it stops
          </h2>
          <ul className="mt-4 grid gap-3 text-sm leading-relaxed text-[var(--muted)]">
            <li>
              A URL check sends the host to this site. The server requests <code>https://host/llms.txt</code> and{" "}
              <code>https://host/llms-full.txt</code> with GET. Timeout {FILE_TIMEOUT_MS / 1000} seconds. At most{" "}
              {MAX_REDIRECTS} redirects. The body is kept up to {megabytes} MB.
            </li>
            <li>
              Before the connection, the hostname is resolved. Loopback, private, link-local, and cloud-metadata
              addresses are refused, including a redirect that lands on one. The socket uses the address that was
              checked. Only http and https, on port 80 or 443, are requested.
            </li>
            <li>
              The token count on a URL check is tiktoken <code>o200k_base</code>, with special tokens included, on the
              text that was kept. It is a size estimate. It is not a bill from OpenAI, Anthropic, or Google. Paste mode
              shows characters divided by 4 and says so, because that count stays in the browser.
            </li>
            <li>
              Structure rules follow the v2 order at llmstxt.org: one H1 first, an optional blockquote, detail text
              without headings, then H2 file lists written as <code>- [name](url): notes</code>, plus an Optional
              section. HTML at that URL is reported as a soft 404. Relative URLs, duplicates, and links to other hosts
              are listed. Other hosts are allowed by the spec, so they are info.
            </li>
            <li>
              Link checks take the first {MAX_LINK_CHECKS} distinct absolute http(s) URLs in <code>/llms.txt</code>.
              Each is a HEAD, then a GET when HEAD returns 400, 403, 405, or 501. Up to {LINK_CONCURRENCY} run at once,
              inside a {LINK_BUDGET_MS / 1000}-second budget. Counts use the final status after at most {MAX_REDIRECTS}{" "}
              redirects. The result shows 2xx, 3xx, 4xx, 5xx, and failed counts, plus the broken list. A longer file
              says the sample was truncated.
            </li>
            <li>
              The generator reads <code>/sitemap.xml</code>. A sitemap index is followed for at most {SITEMAP_CHILD_CAP}{" "}
              child sitemaps and {SITEMAP_URL_CAP} URLs, same host only. Up to {PAGE_CAP} HTML pages are fetched,{" "}
              {PAGE_CONCURRENCY} at a time, for a <code>&lt;title&gt;</code> and a meta description. Titles that exist
              only after JavaScript are missed. The draft is grouped by the first path segment.
            </li>
            <li>
              The whole check is built to finish inside 30 seconds. When the clock runs out, the result says which
              sample stopped. The host, the file, and a paste are not written to a database or an application log.
            </li>
          </ul>
          <p className="mt-4 text-sm text-[var(--muted)]">
            Data as of <time dateTime={checked}>16 November 2026</time>. The robots.txt question lives on the{" "}
            <Link className="text-[var(--link)] underline" href="/tools/ai-crawler-robots-txt-checker">
              robots.txt checker for AI crawlers
            </Link>
            .
          </p>
        </section>

        <section className="mt-14">
          <h2 className="text-2xl font-semibold tracking-tight">Related pages</h2>
          <ul className="mt-4 grid gap-4 sm:grid-cols-3">
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
          <h2 className="text-2xl font-semibold tracking-tight">Sources</h2>
          <p className="mt-2 text-sm text-[var(--muted)]">
            Read <time dateTime={checked}>16 November 2026</time>, except where the page prints its own updated date.
          </p>
          <ul className="mt-3 grid gap-2 text-sm">
            <li>
              <a className="text-[var(--link)] underline" href="https://llmstxt.org/">
                The /llms.txt file, v2
              </a>
              <span className="text-[var(--muted)]"> — Jeremy Howard, 3 September 2024, updated 10 August 2026.</span>
            </li>
            <li>
              <a className="text-[var(--link)] underline" href="https://developers.google.com/search/docs/fundamentals/ai-optimization-guide">
                Google Search Central, AI optimization guide
              </a>
              <span className="text-[var(--muted)]"> — last updated 2026-07-10 UTC. Google Search ignores LLMS.txt.</span>
            </li>
            <li>
              <a className="text-[var(--link)] underline" href="https://developers.google.com/search/updates">
                Google Search Central updates, 15 June 2026
              </a>
              <span className="text-[var(--muted)]"> — the log entry for that note.</span>
            </li>
            <li>
              <a className="text-[var(--link)] underline" href="https://developers.google.com/search/docs/appearance/ai-features">
                Google Search Central, AI features and your website
              </a>
              <span className="text-[var(--muted)]"> — last updated 2025-12-10 UTC.</span>
            </li>
            <li>
              <a className="text-[var(--link)] underline" href="https://bsky.app/profile/johnmu.com/post/3luk2gw5fd22w">
                John Mueller on Bluesky, 17 June 2025
              </a>
              <span className="text-[var(--muted)]"> — &quot;FWIW no AI system currently uses llms.txt.&quot;</span>
            </li>
            <li>
              <a className="text-[var(--link)] underline" href="https://www.rfc-editor.org/rfc/rfc9309">
                RFC 9309, Robots Exclusion Protocol
              </a>
              <span className="text-[var(--muted)]"> — the robots.txt standard this file does not replace.</span>
            </li>
            <li>
              <a className="text-[var(--link)] underline" href="https://developers.openai.com/llms.txt">
                OpenAI developer docs, llms.txt
              </a>
              <span className="text-[var(--muted)]"> — HTTP 200, text/plain, fetched 16 November 2026.</span>
            </li>
            <li>
              <a className="text-[var(--link)] underline" href="https://platform.claude.com/llms.txt">
                Anthropic developer docs, llms.txt
              </a>
              <span className="text-[var(--muted)]">
                {" "}
                — docs.anthropic.com/llms.txt redirected here. HTTP 200, text/plain, fetched 16 November 2026.
              </span>
            </li>
          </ul>
          <p className="mt-4 text-sm text-[var(--muted)]">
            Canonical URL:{" "}
            <a className="text-[var(--link)] underline" href={absoluteUrl(path)}>
              {absoluteUrl(path)}
            </a>
          </p>
        </section>

        <FaqList
          heading="Questions people ask about llms.txt"
          lead="The answers follow the proposal or a vendor page. A file on a docs host is not a promise that an answer engine will quote you."
          items={faqs.map((item) => ({ question: item.question, answer: <p>{item.answer}</p> }))}
        />
      </div>
    </>
  );
}
