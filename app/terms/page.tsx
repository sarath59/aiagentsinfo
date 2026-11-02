import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PageHeader } from "@/components/PageHeader";
import { defaultMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = defaultMetadata(
  "Terms",
  "Simple terms of use for AI Agents Info.",
  "/terms",
);

export default function TermsPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Terms", path: "/terms" }]} />
      <PageHeader
        kicker="Terms"
        title="Use the writing; do not pretend we ranked your product"
        summary="Short terms for a small publication. They describe how the writing and the directory may be used."
      />
      <div className="mx-auto max-w-3xl px-4 pb-20 text-[var(--muted)]">
        <p>
          Content on {site.name} is provided as-is for learning and research. Directory listings are descriptive, not endorsements. A paid placement, if one exists, is marked sponsored.
        </p>
        <p className="mt-4">
          You may quote with attribution and a link. You may not scrape the directory to invent reviews or user counts and attribute them to this site.
        </p>
        <p className="mt-4">
          The software in this repository is MIT-licensed (see LICENSE). That license is for the code, not a trademark grant for the name {site.name}.
        </p>
      </div>
    </>
  );
}
