import type { TocItem } from "@/lib/markdown";

export function TableOfContents({ items }: { items: TocItem[] }) {
  if (!items.length) return null;
  return (
    <nav aria-label="Table of contents" className="glass rounded-3xl p-5">
      <p className="kicker mb-3">On this page</p>
      <ol className="grid gap-2 text-sm">
        {items.map((item) => (
          <li key={item.id} className={item.level === 3 ? "pl-3" : ""}>
            <a className="text-[var(--muted)] hover:text-[var(--fg)]" href={`#${item.id}`}>
              {item.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
