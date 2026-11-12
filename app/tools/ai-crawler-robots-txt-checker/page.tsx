import Link from "next/link";
import { RobotsChecker } from "@/components/RobotsChecker";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FaqList } from "@/components/FaqList";
import { BOTS_CHECKED, BOTS_CHECKED_LABEL, aiBots, omittedTokens, purposeLabel } from "@/lib/robots/bots";
import { evaluateRobots, scoreSentence } from "@/lib/robots/evaluate";
import { JsonLd, defaultMetadata, faqPageJsonLd, softwareApplicationJsonLd, webPageJsonLd } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";

const path = "/tools/ai-crawler-robots-txt-checker";
const title = "robots.txt checker for AI crawlers: who can fetch /";
const description =
  "Check which documented AI crawlers may fetch a path, then download a robots.txt that allows search and blocks training. No login. Nothing you enter is stored.";
const articlePath = "/blog/which-ai-crawlers-can-fetch-your-homepage";

const exampleFile = [
  "User-agent: *",
  "Disallow: /api/",
  "",
  "User-agent: GPTBot",
  "Disallow: /",
  "",
  "User-agent: OAI-SearchBot",
  "Allow: /",
  "",
  "User-agent: ChatGPT-User",
  "Disallow: /",
  "",
].join("\n");

const example = evaluateRobots(exampleFile, ["/"], "parsed");
const exampleHome = example.scores[0];

function exampleAccess(token: string) {
  const row = example.bots.find((bot) => bot.token === token);
  return row?.paths[0]?.access ?? "unknown";
}

const faqs = [
  {
    question: "What is a robots.txt checker for AI crawlers?",
    answer:
      "It fetches a host's /robots.txt, parses it under RFC 9309, and says whether each documented AI product token may fetch / and, if you add one, another path. It also writes a robots.txt from a policy you pick. It does not call a model.",
  },
  {
    question: "Does blocking GPTBot keep a site out of ChatGPT search?",
    answer:
      "No. OpenAI's crawler page, read 12 November 2026, says GPTBot is the training crawler and OAI-SearchBot is the search crawler. The two robots.txt settings are independent. A site that opts out of OAI-SearchBot is not shown in ChatGPT search answers.",
  },
  {
    question: "Does Google-Extended affect Google Search?",
    answer:
      "No. Google's common-crawlers page, last updated 2026-10-30 UTC and read 12 November 2026, says Google-Extended is a robots.txt token for Gemini training and grounding. It has no separate HTTP user agent, and it does not affect inclusion or ranking in Google Search.",
  },
  {
    question: "What does a missing robots.txt mean?",
    answer:
      "HTTP 404 or 410 means the file is unavailable. RFC 9309 lets a crawler fetch any public URL. An empty file is the same result: no group matches, so nothing is disallowed. A 5xx is the opposite. RFC 9309 says the crawler must assume a complete disallow until the file can be fetched.",
  },
  {
    question: "Do ChatGPT-User and Perplexity-User obey robots.txt?",
    answer:
      "OpenAI says ChatGPT-User rules may not apply, because a person started the fetch. Perplexity says Perplexity-User generally ignores robots.txt. Anthropic says Claude-User does honor it, and a block stops retrieval. This checker shows the file's rule and the operator's caveat on the same row.",
  },
  {
    question: "Is the URL or the pasted file stored?",
    answer:
      "No. A URL check is sent to this site so the server can fetch /robots.txt and /llms.txt. The response is not written to a file, a database, or a log. Paste mode runs in the browser and is not sent. Do not paste secrets. robots.txt is public.",
  },
  {
    question: "Why is a bot from my logs missing?",
    answer:
      "The list includes only product tokens this desk read on the operator's own documentation page on 12 November 2026. cohere-ai, anthropic-ai, FacebookExternalHit, Googlebot, and Google-NotebookLM are left out on purpose. The page says why for each one. A client can send any User-Agent, so a log line is not proof of the operator.",
  },
  {
    question: "Will the generated file stop every AI bot?",
    answer:
      "No. robots.txt is a request, not access control. Tokens whose operators say they may ignore the file are named in the comments. A named group also replaces User-agent: *, so a path you want blocked has to be repeated inside that group.",
  },
];

const steps = [
  {
    title: "Enter the host, not the page",
    body: "example.com and https://example.com/pricing both check that host's /robots.txt. The optional path is the URL you want a verdict for. The checker does not fetch that path.",
  },
  {
    title: "Read the score, then the group",
    body: "Answer fetches, search, and training controls are counted only when the operator says the file applies. Open a row to see which User-agent group won. A prefix match, such as Applebot winning for Applebot-Extended, is labeled.",
  },
  {
    title: "Paste a file if the host refuses the fetch",
    body: "A 401, 403, or 429 means this checker did not read the file. RFC 9309 lets a crawler treat a 4xx as allow-all. That is not an Allow line. Paste the file you already have. The paste stays in the browser.",
  },
  {
    title: "Write the file you meant",
    body: "The usual split is allow search and answer tokens, disallow training tokens, and repeat protected paths inside every allowed group. Copy or download. Regenerate switches between one shared group and one group per bot. The bytes are the same policy.",
  },
];

const siblings = [
  {
    href: "/tools/shopping-agent-readiness-checker",
    title: "Shopping agent readiness checker",
    body: "Eighteen store checks, including whether OAI-SearchBot is allowed. The score stays in the browser.",
  },
  {
    href: "/tools/agents-md-generator",
    title: "AGENTS.md generator",
    body: "A repo file for coding agents. Copy or download. The form stays in the browser.",
  },
  {
    href: "/agent-prompt-checker",
    title: "Prompt and tool checker",
    body: "Schema and token check for a prompt and its tools. The prompt is not stored.",
  },
  {
    href: "/tools/ai-agent-harness-evaluation-checklist",
    title: "Harness evaluation checklist",
    body: "Twelve sourced yes-or-no checks. The count stays in the browser.",
  },
  {
    href: "/reports/ai-answer-crawlers-november-2026",
    title: "AI answer crawlers, one week on this site",
    body: "28,311 verified fetches in seven days, with the path each answer bot opened.",
  },
];

const sources = [...new Map(aiBots.map((bot) => [bot.docUrl, bot])).values()];

export const metadata = defaultMetadata(title, description, path, { absoluteTitle: true });

export default function AiCrawlerRobotsPage() {
  const gpt = exampleAccess("GPTBot");
  const search = exampleAccess("OAI-SearchBot");
  const user = exampleAccess("ChatGPT-User");
  return (
    <>
      <JsonLd
        data={[
          webPageJsonLd({
            title,
            description,
            path,
            datePublished: BOTS_CHECKED,
            dateModified: BOTS_CHECKED,
          }),
          faqPageJsonLd(faqs),
          softwareApplicationJsonLd({
            name: "robots.txt checker for AI crawlers",
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
          { name: "robots.txt checker for AI crawlers", path },
        ]}
      />
      <header className="mx-auto max-w-6xl px-4 pb-4 pt-8">
        <p className="kicker kicker-lead">Free tool</p>
        <h1 className="display mt-2 text-3xl sm:text-4xl">{title}</h1>
        <p className="mt-3 max-w-3xl text-lg leading-relaxed text-[var(--muted)]">
          Enter a domain. See which documented AI bots may fetch a path, then download a robots.txt that matches the policy you picked.
        </p>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-[var(--muted)]">
          Operator pages read <time dateTime={BOTS_CHECKED}>{BOTS_CHECKED_LABEL}</time>. The worked example on four live hosts is{" "}
          <Link className="text-[var(--link)] underline" href={articlePath}>
            Which AI crawlers can fetch your homepage
          </Link>
          .
        </p>
      </header>
      <div className="mx-auto max-w-6xl px-4 pb-20">
        <RobotsChecker />

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

        <section className="mt-14">
          <h2 className="text-2xl font-semibold tracking-tight">What does a three-group file actually do?</h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[var(--muted)]">
            This fixture is parsed by the same function as the tool. The score is {exampleHome ? scoreSentence(exampleHome.lines) : ""}.
            GPTBot is {gpt}. OAI-SearchBot is {search}. ChatGPT-User&apos;s group {user === "disallowed" ? "blocks" : "allows"} /, and
            OpenAI says that fetcher may ignore the file. <code>*</code> disallows only <code>/api/</code>, so a search bot with no group
            of its own may still fetch the homepage.
          </p>
          <pre className="mt-4 max-w-3xl overflow-auto rounded-2xl border border-[var(--stroke)] bg-white p-4 text-xs leading-relaxed">{exampleFile}</pre>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[var(--muted)]">
            The trap is the named group. Once GPTBot has its own group, it stops reading <code>*</code>. Allowing <code>/</code> on the
            wildcard does not let GPTBot back in. The same is true in reverse: a <code>Disallow: /</code> on <code>*</code> does not block
            a bot whose own group says <code>Allow: /</code>.
          </p>
        </section>

        <section className="mt-14">
          <h2 className="text-2xl font-semibold tracking-tight">Which tokens are on the list?</h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[var(--muted)]">
            {aiBots.length} tokens, each with the page it was read from. A token is omitted when that page did not name it.
          </p>
          <ul className="mt-4 grid gap-3">
            {aiBots.map((bot) => (
              <li key={bot.token} className="text-sm leading-relaxed">
                <span className="font-medium">{bot.token}</span>
                <span className="text-[var(--muted)]">
                  {" "}
                  · {bot.operator} · {purposeLabel[bot.purpose]} ·{" "}
                </span>
                <a className="text-[var(--link)] underline" href={bot.docUrl}>
                  {bot.docTitle}
                </a>
              </li>
            ))}
          </ul>
          <h3 className="mt-8 text-lg font-semibold">Left off on purpose</h3>
          <ul className="mt-3 grid gap-3">
            {omittedTokens.map((item) => (
              <li key={item.name} className="text-sm leading-relaxed">
                <span className="font-medium">{item.name}</span>
                <span className="text-[var(--muted)]"> — {item.reason} </span>
                <a className="text-[var(--link)] underline" href={item.url}>
                  Source
                </a>
              </li>
            ))}
          </ul>
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
              <Link className="text-[var(--link)] underline" href={articlePath}>
                Which AI crawlers can fetch your homepage
              </Link>
              <span className="text-[var(--muted)]"> — the same checker, run on four live hosts.</span>
            </li>
            <li>
              <Link className="text-[var(--link)] underline" href="/reports/ai-answer-crawlers-november-2026">
                AI answer crawlers, November 2026
              </Link>
              <span className="text-[var(--muted)]"> — what those bots actually fetched here in one week.</span>
            </li>
            <li>
              <Link className="text-[var(--link)] underline" href="/blog/how-to-get-your-ai-tool-recommended-by-chatgpt-and-google">
                How to get your AI tool recommended by ChatGPT and Google
              </Link>
              <span className="text-[var(--muted)]"> — eligibility is not a promise of a citation.</span>
            </li>
            <li>
              <Link className="text-[var(--link)] underline" href="/trackers">
                Trackers
              </Link>
              <span className="text-[var(--muted)]"> — downloads, stars, and AGENTS.md adoption. A fetch is not a user.</span>
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
            Read <time dateTime={BOTS_CHECKED}>{BOTS_CHECKED_LABEL}</time>, except where the page prints its own updated date.
          </p>
          <ul className="mt-3 grid gap-2 text-sm">
            <li>
              <a className="text-[var(--link)] underline" href="https://www.rfc-editor.org/rfc/rfc9309">
                RFC 9309, Robots Exclusion Protocol
              </a>
              <span className="text-[var(--muted)]"> — group matching, Allow versus Disallow, `*` and `$`, and 404 versus 5xx.</span>
            </li>
            {sources.map((bot) => (
              <li key={bot.docUrl}>
                <a className="text-[var(--link)] underline" href={bot.docUrl}>
                  {bot.docTitle}
                </a>
              </li>
            ))}
            <li>
              <a className="text-[var(--link)] underline" href="https://docs.cohere.com/docs/cohere-web-crawlers">
                Cohere, Web Crawlers
              </a>
              <span className="text-[var(--muted)]"> — no active bot. Not scored.</span>
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
          heading="Questions people ask before they edit robots.txt"
          lead="The answers follow the operator page or RFC 9309. A crawler that ignores the file will not be talked into obeying it."
          items={faqs.map((item) => ({ question: item.question, answer: <p>{item.answer}</p> }))}
        />
      </div>
    </>
  );
}
