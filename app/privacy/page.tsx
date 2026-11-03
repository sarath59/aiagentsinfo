import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CompanyLogo } from "@/components/CompanyLogo";
import { PageHeader } from "@/components/PageHeader";
import { companyBySlug } from "@/lib/companies";
import { defaultMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = defaultMetadata(
  "Privacy",
  "Plain privacy note for a static publication. Update when analytics or a newsletter provider is actually connected.",
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
          The newsletter form is not connected to a mailing list. Addresses posted there are not stored.
        </p>
        <p className="mt-4">
          <Link href="/submit" className="text-[var(--link)] underline">
            Submit your tool
          </Link>{" "}
          does not require an account. The form asks for a contact email and the public details of a product. When the site is configured, that submission is saved as a GitHub issue for review and is not listed until someone fact-checks it. On a public repository, the issue, including the email, can be read by anyone. If saving is unavailable, the form offers an email to {site.email} instead. Do not send secrets.
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
