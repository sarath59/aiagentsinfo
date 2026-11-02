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
        summary="These terms are a stub for a small publication. Have a lawyer rewrite them before you need them."
      />
      <div className="mx-auto max-w-3xl px-4 pb-20 text-[var(--muted)]">
        <p>
          Content on {site.name} is provided as-is for learning and research. Sample pages are labeled. Directory listings are descriptive, not endorsements, and sponsored slots will be marked if they ever exist.
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
