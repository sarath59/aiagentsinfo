import Link from "next/link";
import type { ChecklistItem } from "@/lib/listing-checklist";
import { listingUpdateHref } from "@/lib/listing-checklist";

export function ListingChecklist({
  items,
  slug,
  intro,
  embedded = false,
}: {
  items: ChecklistItem[];
  slug: string;
  intro?: string;
  embedded?: boolean;
}) {
  const doneCount = items.filter((item) => item.done).length;
  const missing = items.filter((item) => !item.done).map((item) => item.key);
  const updateHref = listingUpdateHref(slug, missing);

  return (
    <section
      id="complete-listing"
      className={embedded ? "mt-8" : "glass mt-8 rounded-3xl p-6"}
      aria-labelledby="complete-listing-heading"
    >
      <p className="kicker">For the maker</p>
      <h2 id="complete-listing-heading" className="mt-2 text-2xl font-semibold tracking-tight">
        Complete your listing
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
        {intro ??
          "These five fields are read from the listing. Missing items go to the claim form, which emails the desk. There is no login."}{" "}
        {doneCount} of {items.length} on file.
      </p>
      <ul className="mt-5 grid gap-3">
        {items.map((item) => (
          <li
            key={item.key}
            className="flex flex-col gap-2 rounded-2xl border border-[var(--stroke)] bg-white px-4 py-3 sm:flex-row sm:items-start sm:justify-between"
          >
            <div>
              <p className="text-sm font-semibold tracking-tight">
                {item.label}
                <span className="ml-2 text-xs font-medium text-[var(--muted)]">
                  {item.done ? "On file" : "Missing"}
                </span>
              </p>
              <p className="mt-1 text-sm leading-relaxed text-[var(--muted)]">{item.detail}</p>
            </div>
            {item.done ? null : (
              <Link
                href={item.href}
                className="shrink-0 text-sm text-[var(--link)] underline sm:mt-0.5"
              >
                Add {item.label.toLowerCase()}
              </Link>
            )}
          </li>
        ))}
      </ul>
      {missing.length ? (
        <p className="mt-4 text-sm">
          <Link href={updateHref} className="text-[var(--link)] underline">
            Email all missing fields
          </Link>
        </p>
      ) : (
        <p className="mt-4 text-sm text-[var(--muted)]">
          The fields this card tracks are on file. To change a line,{" "}
          <Link href={listingUpdateHref(slug)} className="text-[var(--link)] underline">
            email an update
          </Link>
          .
        </p>
      )}
    </section>
  );
}
