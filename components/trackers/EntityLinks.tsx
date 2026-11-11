import Link from "next/link";
import type { EntityLink } from "@/lib/trackers/entities";

export function EntityLinks({ links }: { links: EntityLink[] }) {
  if (!links.length) return null;
  return (
    <p className="mt-4 max-w-3xl text-sm leading-relaxed text-[var(--muted)]">
      {links.map((link, index) => (
        <span key={link.href}>
          {index > 0 ? " · " : null}
          <Link className="text-[var(--link)] underline" href={link.href}>
            {link.label}
          </Link>
        </span>
      ))}
    </p>
  );
}
