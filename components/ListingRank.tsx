import Link from "next/link";
import type { ListingRankView } from "@/lib/listing-rank";

export function ListingRank({ rank, embedded = false }: { rank: ListingRankView; embedded?: boolean }) {
  return (
    <section
      id="see-where-you-rank"
      className={embedded ? "mt-8" : "glass mt-8 rounded-3xl p-6"}
      aria-labelledby="rank-heading"
    >
      <p className="kicker">Directory</p>
      <h2 id="rank-heading" className="mt-2 text-2xl font-semibold tracking-tight">
        See where you rank
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
        These are real pages on this site. Nothing here is a traffic count, a star rating, or a paid slot.
      </p>

      <p className="mt-5 text-sm">
        Category:{" "}
        <Link href={rank.categoryHref} className="text-[var(--link)] underline">
          {rank.categoryTitle}
        </Link>
      </p>

      {rank.comparisons.length ? (
        <div className="mt-4">
          <p className="text-sm font-semibold tracking-tight">Best-of and comparison pages</p>
          <ul className="mt-2 grid gap-1">
            {rank.comparisons.map((page) => (
              <li key={page.href}>
                <Link href={page.href} className="text-sm text-[var(--link)] underline">
                  {page.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="mt-4 text-sm text-[var(--muted)]">
          This desk has not published a best-of table for {rank.categoryTitle} yet. The category page is the
          public list.
        </p>
      )}

      <div className="mt-6">
        <h3 className="text-lg font-semibold tracking-tight">{rank.top3Heading}</h3>
        <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{rank.top3Note}</p>
        {rank.top3.length ? (
          <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm">
            {rank.top3.map((peer) => (
              <li key={peer.href}>
                <Link href={peer.href} className="text-[var(--link)] underline">
                  {peer.name}
                </Link>
                {peer.isSelf ? <span className="text-[var(--muted)]"> (this listing)</span> : null}
              </li>
            ))}
          </ol>
        ) : null}
        <p className="mt-4">
          <Link href={rank.compareHref} className="btn-primary inline-flex px-4 py-2 text-sm">
            {rank.compareLabel}
          </Link>
        </p>
      </div>
    </section>
  );
}
