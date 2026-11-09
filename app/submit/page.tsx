import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PageHeader } from "@/components/PageHeader";
import { SubmitToolForm } from "@/components/SubmitToolForm";
import { getDirectoryListing } from "@/lib/directory";
import { defaultMetadata } from "@/lib/seo";
import { absoluteUrl, site } from "@/lib/site";

export const metadata = defaultMetadata(
  "Submit your tool",
  "Submit an AI tool, SaaS product, app, or agent to the directory. No login and no fee. A valid submission goes live in about two minutes.",
  "/submit",
);

export default async function SubmitPage({
  searchParams,
}: {
  searchParams: Promise<{ claim?: string }>;
}) {
  const { claim } = await searchParams;
  const listing = claim ? await getDirectoryListing(claim) : undefined;
  const mailto = listing
    ? `mailto:${site.email}?subject=${encodeURIComponent(`Claim / update listing: ${listing.name}`)}&body=${encodeURIComponent(`Listing: ${absoluteUrl(`/directory/${listing.slug}`)}\n\nWhat should change:\n`)}`
    : "";

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
        summary="No account and no fee. A valid submission is published automatically. Payment does not buy a listing or a rank."
      />
      <div className="mx-auto grid max-w-2xl gap-12 px-4 pb-20">
        {listing ? (
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
                </a>
                .
              </>
            ) : null}
          </p>
        ) : null}
        <SubmitToolForm />
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
