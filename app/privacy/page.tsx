import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CompanyLogo } from "@/components/CompanyLogo";
import { PageHeader } from "@/components/PageHeader";
import { companyBySlug } from "@/lib/companies";
import { defaultMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = defaultMetadata(
  "Privacy",
  "Plain privacy note for a static publication. Analytics is named on this page.",
  "/privacy",
);

export default function PrivacyPage() {
  const datafast = companyBySlug("datafast");
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
          Page views are measured with{" "}
          <a className="inline-flex items-center gap-1.5 align-middle" href="https://datafa.st" rel="noreferrer">
            <CompanyLogo name="DataFast" src={datafast?.logo} tile={datafast?.tile} size="xs" />
            DataFast
          </a>{" "}
          (<code>datafa.st</code>) so we can see which pages are read. No login, and we do not invent visitor counts on this site. An extra analytics script loads only if <code>NEXT_PUBLIC_ANALYTICS_DOMAIN</code> is also set in the host environment.
        </p>
      </div>
    </>
  );
}
