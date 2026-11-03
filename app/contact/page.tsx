import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PageHeader } from "@/components/PageHeader";
import { defaultMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = defaultMetadata(
  "Write to the desk",
  "How to reach AI Agents Info about corrections, listings, and sponsorship.",
  "/contact",
);

export default function ContactPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Contact", path: "/contact" }]} />
      <PageHeader
        kicker="Contact"
        title="Write to the desk"
        summary="There is no public staff directory because there are no invented people to list."
      />
      <div className="mx-auto max-w-3xl px-4 pb-20">
        <p className="text-[var(--muted)]">
          Email the desk at <a href={`mailto:${site.email}`}>{site.email}</a>.
        </p>
        <p className="mt-4 text-[var(--muted)]">
          For directory additions use <Link href="/submit">Submit your tool</Link>. For corrections, email is enough. The{" "}
          <Link href="/editorial-policy">editorial policy</Link> explains what a correction changes and how dates are kept.
        </p>
      </div>
    </>
  );
}
