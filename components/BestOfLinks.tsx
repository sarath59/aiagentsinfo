import Link from "next/link";
import { COMPARISON_HUB, comparisonPages, type ComparisonPage } from "@/lib/comparisons";

export function BestOfLinks({
  pages = comparisonPages,
  intro = "Sourced tables of licence, list price, and platform. Last verified November 2026.",
  heading = true,
}: {
  pages?: readonly ComparisonPage[];
  intro?: string;
  heading?: boolean;
}) {
  return (
    <section className="mt-8">
      {heading ? (
        <h2 className="font-semibold tracking-tight text-2xl">
          <Link href={COMPARISON_HUB.href}>{COMPARISON_HUB.title}</Link>
        </h2>
      ) : null}
      <p className={heading ? "mt-2 text-sm text-[var(--muted)]" : "text-sm text-[var(--muted)]"}>{intro}</p>
      <ul className="mt-3 grid gap-2">
        {heading ? null : (
          <li>
            <Link href={COMPARISON_HUB.href}>{COMPARISON_HUB.title}</Link>
          </li>
        )}
        {pages.map((page) => (
          <li key={page.path}>
            <Link href={page.path}>{page.title}</Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
