import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CompanyLogo } from "@/components/CompanyLogo";
import { PageHeader } from "@/components/PageHeader";
import { companyBySlug } from "@/lib/companies";
import { defaultMetadata } from "@/lib/seo";

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
          The newsletter and submit-a-tool forms post to stub API routes. Until a provider is wired, submissions are only logged on the server you deploy to. Do not send secrets.
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
