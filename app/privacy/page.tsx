import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PageHeader } from "@/components/PageHeader";
import { defaultMetadata } from "@/lib/seo";
import { operator, site } from "@/lib/site";

export const metadata = defaultMetadata(
  "Privacy",
  "Plain privacy note for a static publication. Analytics is named on this page.",
  "/privacy",
);

export default function PrivacyPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Privacy", path: "/privacy" }]} />
      <PageHeader
        kicker="Privacy"
        title="What this site does with data"
        summary="Honest and short. This is not a fake GDPR theater document."
      />
      <div className="mx-auto max-w-3xl px-4 pb-20 text-[var(--muted)]">
        <p>
          Reading articles, research, glossary terms, and directory pages does not require an account. There is no login.
        </p>
        <p className="mt-4">
          This site does not run an email newsletter and does not ask for an address to send a digest. New pages are published here. The RSS feed at{" "}
          <a className="text-[var(--link)] underline" href="/rss.xml">
            /rss.xml
          </a>{" "}
          lists them.
        </p>
        <p className="mt-4">
          <Link href="/submit" className="text-[var(--link)] underline">
            Submit your tool
          </Link>{" "}
          does not require an account. A valid submission is published to the directory. Your email is required and is saved with the submission so we can contact you. Directory pages do not show that email. If saving is unavailable, the form offers an email to {site.email} instead. Do not send secrets.
        </p>
        <p className="mt-4">
          A{" "}
          <Link href="/list-your-tool" className="text-[var(--link)] underline">
            paid featured listing
          </Link>{" "}
          asks for your email, product name, and website before Stripe checkout. Those fields are stored so we can
          match your payment in Stripe and build the listing. Card numbers stay with Stripe.           Confirmation emails may be
          sent by hand from {operator.email}.
        </p>
        <p className="mt-4">
          The{" "}
          <Link href="/agent-prompt-checker" className="text-[var(--link)] underline">
            prompt and tool checker
          </Link>{" "}
          sends the pasted prompt and tool JSON to this site so the server can count tokens and check the schema. That text is not written to a file, a database, or a log.
        </p>
        <p className="mt-4">
          The{" "}
          <Link href="/tools/agents-md-generator" className="text-[var(--link)] underline">
            AGENTS.md generator
          </Link>{" "}
          builds the file in your browser. The form is not sent to this site. If you use Polish on this device, that step stays in the browser&apos;s built-in language model and is not sent here either.
        </p>
        <p className="mt-4">
          The{" "}
          <Link href="/tools/mcp-config-generator" className="text-[var(--link)] underline">
            MCP server config generator
          </Link>{" "}
          sends the generator fields, and a pasted config if you use Check, so this site can run the same rules as the browser. That request is not written to a file, a database, or a log. A value that looks like a token is replaced with [redacted] in the response.
        </p>
        <p className="mt-4">
          The{" "}
          <Link href="/tools/ai-crawler-robots-txt-checker" className="text-[var(--link)] underline">
            robots.txt checker for AI crawlers
          </Link>{" "}
          sends the host you type so this site can fetch that host&apos;s /robots.txt and /llms.txt. The host, the file, and a pasted robots.txt are not written to a file, a database, or a log. Paste mode stays in the browser.
        </p>
        <p className="mt-4">
          The{" "}
          <Link href="/tools/llms-txt-checker" className="text-[var(--link)] underline">
            llms.txt checker
          </Link>{" "}
          sends the host you type so this site can fetch that host&apos;s /llms.txt, /llms-full.txt, sitemap.xml, and a
          sample of the linked URLs. A pasted file stays in the browser unless you ask for a link check, which sends
          only those URLs. The host, the files, and the paste are not written to a file, a database, or a log.
        </p>
        <p className="mt-4">
          Page views, in-page goals (for example tool runs and report reading), and clicks we choose to measure are
          logged first-party in our database. A random visitor id and session id are stored in the browser (cookies /
          local storage) so returns can be counted without a login. We store the path, event name, referrer host, UTM
          names when present, and a short User-Agent. We do not store emails in analytics. An optional extra script
          loads only if <code>NEXT_PUBLIC_ANALYTICS_DOMAIN</code> is set.
        </p>
        <p className="mt-4">
          Human visits that arrive from an AI chat product (for example ChatGPT, Claude, Perplexity, Gemini, Copilot,
          Grok, or Meta AI) are labeled by referrer host or <code>utm_source</code> so we can compare them with answer
          bots that fetched the same page.
        </p>
        <p className="mt-4">
          When a known AI crawler, answer fetcher, training bot, or other automated agent requests a page, this site
          records the bot name, the path, the request kind (view, interact, or discovery file), the HTTP method, a
          short User-Agent string, Accept flags, the referer host, a session id, and whether the client IP matched a
          published operator range. Query parameter names may be stored; values are not. Raw IP addresses are not
          stored; only a one-way hash used to group crawl sessions. Unknown automated clients may be sampled by
          User-Agent for review.
        </p>
        <p className="mt-6 text-sm">{operator.line}</p>
      </div>
    </>
  );
}
