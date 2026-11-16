import Link from "next/link";
import { entityLine, priorityReading } from "@/lib/site";

/** One-line entity statement plus the same research links. No counts. */
export function EntityStatement({ embedded = false }: { embedded?: boolean }) {
  return (
    <section className={embedded ? "mt-6" : "mx-auto max-w-6xl px-4 pb-2 pt-8"} aria-label="About this site">
      <p className="max-w-3xl text-base leading-relaxed">{entityLine}</p>
      <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm">
        {priorityReading.map((item) => (
          <li key={item.href}>
            <Link className="text-[var(--link)] underline" href={item.href}>
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
