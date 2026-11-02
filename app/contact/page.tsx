import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PageHeader } from "@/components/PageHeader";
import { defaultMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = defaultMetadata(
  "Contact",
  "How to reach AI Agents Info. Replace the address when the mailbox is live.",
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
          Placeholder address (replace when DNS and mailbox are ready):{" "}
          <a href={`mailto:${site.email}`}>{site.email}</a>
        </p>
        <p className="mt-4 text-[var(--muted)]">
          For directory additions use <Link href="/directory/submit">Submit a tool</Link>. For corrections, email is enough — we would rather fix a file than collect a form we do not read.
        </p>
      </div>
    </>
  );
}
