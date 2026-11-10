import type { TocItem } from "@/lib/markdown";

export function TableOfContents({ items, numbered = false }: { items: TocItem[]; numbered?: boolean }) {
  if (!items.length) return null;
  let chapter = 0;
  return (
    <nav aria-label="Table of contents" className="glass rounded-3xl p-5">
      <p className="kicker mb-3">{numbered ? "Chapters" : "On this page"}</p>
      <ol className={numbered ? "report-toc grid gap-2 text-sm" : "grid gap-2 text-sm"}>
        {items.map((item) => {
          const index = numbered && item.level === 2 ? ++chapter : 0;
          return (
            <li key={item.id} className={item.level === 3 ? "is-sub pl-3" : ""}>
              <a className="text-[var(--muted)] hover:text-[var(--fg)]" href={`#${item.id}`}>
                {index ? <span className="report-toc-index">{String(index).padStart(2, "0")}</span> : null}
                {item.text}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
