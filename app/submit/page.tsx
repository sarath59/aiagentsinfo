import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ListingChecklist } from "@/components/ListingChecklist";
import { PageHeader } from "@/components/PageHeader";
import { SubmitToolForm } from "@/components/SubmitToolForm";
import { getBlogPosts } from "@/lib/blog";
import { getDirectoryListing, getDirectoryListings } from "@/lib/directory";
import { FOUNDER_TOOLS, founderReadingCards } from "@/lib/founder-followup";
import {
  listingChecklist,
  listingUpdateMailto,
  parseChecklistNeeds,
} from "@/lib/listing-checklist";
import { rankByCategory } from "@/lib/listing-rank";
import { defaultMetadata } from "@/lib/seo";
import { absoluteUrl, site } from "@/lib/site";

export const metadata = defaultMetadata(
  "Submit your AI tool free — no account, live in ~2 minutes",
  "Submit an AI tool, SaaS product, app, or agent to the directory. No login and no fee. A valid submission goes live in about two minutes.",
  "/submit",
);

export default async function SubmitPage({
  searchParams,
}: {
  searchParams: Promise<{ claim?: string; need?: string }>;
}) {
  const { claim, need } = await searchParams;
  const [listing, listings, posts] = await Promise.all([
    claim ? getDirectoryListing(claim) : Promise.resolve(undefined),
    getDirectoryListings(),
    getBlogPosts(),
  ]);
  const needs = parseChecklistNeeds(need);
  const mailto = listing ? listingUpdateMailto(listing, needs) : "";
  const checklist = listing ? listingChecklist(listing) : [];
  const followup = {
    rankByCategory: rankByCategory(listings),
    reading: founderReadingCards(posts),
    tools: [...FOUNDER_TOOLS],
  };

  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Submit your tool", path: "/submit" },
        ]}
      />
      <PageHeader
        kicker="Directory"
        title="Submit your tool"
        summary="Free submission to the AI Agents Info directory. No account needed. A valid listing goes live in about 2 minutes."
      />
      <div className="mx-auto grid max-w-2xl gap-12 px-4 pb-20">
        {listing ? (
          <div className="grid gap-6">
            <p className="rounded-3xl border border-[var(--stroke)] bg-white p-5 text-sm leading-relaxed">
              {listing.name} is already listed at{" "}
              <Link href={`/directory/${listing.slug}`}>{absoluteUrl(`/directory/${listing.slug}`)}</Link>. To claim or
              update that page, email the desk. The form below is for a product that is not listed yet. A duplicate
              domain is not published twice.
              {mailto ? (
                <>
                  {" "}
                  <a className="text-[var(--link)] underline" href={mailto}>
                    Email an update for {listing.name}
                    {needs.length ? ` (${needs.length} missing field${needs.length === 1 ? "" : "s"})` : ""}
                  </a>
                  .
                </>
              ) : null}
            </p>
            <ListingChecklist
              items={checklist}
              slug={listing.slug}
              intro="Checked against the live listing. Each missing line opens an email to the desk with that field named. There is no login."
            />
          </div>
        ) : null}
        <SubmitToolForm followup={followup} />
        <section className="text-sm leading-relaxed text-[var(--muted)]">
          <h2 className="font-semibold tracking-tight text-2xl text-[var(--fg)]">What happens next</h2>
          <ol className="mt-4 list-decimal space-y-2 pl-5">
            <li>We check that the site responds, the domain is new, and the text can be published. Keyboard-mash is rejected. A one-line slogan can go live for visitors and stay out of search. Read the <Link href="/editorial-policy">editorial policy</Link>.</li>
            <li>We commit the listing to the directory and save your email with the submission so we can contact you. The directory page does not show your email.</li>
            <li>Your tool will be live in about 2 minutes.</li>
          </ol>
          <p className="mt-4">
            If the form cannot save, it gives you an email draft to {site.email}. Do not send passwords, private metrics, or other secrets.
          </p>
        </section>
      </div>
    </>
  );
}
