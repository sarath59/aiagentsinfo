import Link from "next/link";
import { JsonLd, breadcrumbJsonLd } from "@/lib/seo";

export function Breadcrumbs({ items }: { items: { name: string; path: string }[] }) {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(items)} />
      <nav aria-label="Breadcrumb" className="mx-auto max-w-6xl px-4 pt-6 text-sm text-[var(--muted)]">
        <ol>
          {items.map((item, index) => (
            <li key={item.path} className="inline">
              {index > 0 ? <span aria-hidden>{" / "}</span> : null}
              {index === items.length - 1 ? (
                <span className="text-[var(--fg)]">{item.name}</span>
              ) : (
                <Link href={item.path} className="hover:text-[var(--fg)]">
                  {item.name}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
