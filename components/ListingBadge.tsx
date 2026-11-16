import Link from "next/link";
import { BadgeSnippets } from "@/components/BadgeSnippets";
import { listingBadgeEmbed } from "@/lib/badge";

export function ListingBadge({ slug, name }: { slug: string; name: string }) {
  const badge = listingBadgeEmbed(slug, name);
  return (
    <section id="listed-badge" className="mt-5 rounded-2xl border border-[var(--stroke)] bg-white px-4 py-3">
      <h2 className="text-sm font-semibold tracking-tight">Add this badge to your site</h2>
      <p className="mt-1 text-sm leading-relaxed text-[var(--muted)]">
        Show visitors that {name} is listed in this directory. The image is a normal link to this page.{" "}
        <Link href="/badge" className="text-[var(--link)] underline">
          About the badge
        </Link>
        .
      </p>
      <a href={badge.href} className="mt-3 inline-block">
        {/* The file makers embed. next/image would rewrite that address. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={badge.path} width={badge.width} height={badge.height} alt="Listed on AI Agents Info" />
      </a>
      <BadgeSnippets html={badge.html} markdown={badge.markdown} />
    </section>
  );
}
