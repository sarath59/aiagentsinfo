import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CompanyLogo } from "@/components/CompanyLogo";
import { PageHeader } from "@/components/PageHeader";
import { companyBySlug } from "@/lib/companies";
import { defaultMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = defaultMetadata(
  "Privacy",
  "Plain privacy note for a static publication. Analytics and the newsletter provider are named on this page.",
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
          The weekly newsletter form is provided by{" "}
          <a className="text-[var(--link)] underline" href="https://kit.com" rel="noreferrer">
            Kit
          </a>
          . If you subscribe, Kit receives your email address so the Thursday note can be sent. This site does not keep its own copy of that address. A note in this browser remembers if you closed the signup prompt, so it is not shown again for 30 days, or at all after you subscribe.
        </p>
        <p className="mt-4">
          <Link href="/submit" className="text-[var(--link)] underline">
            Submit your tool
          </Link>{" "}
          does not require an account. A valid submission is published to the directory. That public file includes the product details and logo URL, and it does not include your email. If a separate private repository is configured, the email is stored only on a private GitHub issue. Otherwise the email is not stored. If saving is unavailable, the form offers an email to {site.email} instead. Do not send secrets.
        </p>
        <p className="mt-4">
          A separate first-party counter also runs in the browser. It does not use cookies. A random visitor id stays in local storage and a session id stays in session storage. It records the page, the referring site, utm parameters, screen size, language, how long the tab was visible, the furthest scroll mark (25, 50, 75, or 100 percent), the heading on screen when you leave, clicks to other sites, newsletter submits, and PDF downloads. The server adds the country, region, and city supplied by the host, plus a daily hash of the network address used only to count unique visits. The address itself is not stored. If the browser sends Do Not Track or Global Privacy Control, this counter does not run.
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
