import Link from "next/link";

export function Pagination({
  page,
  totalPages,
  hrefFor,
}: {
  page: number;
  totalPages: number;
  hrefFor: (page: number) => string;
}) {
  if (totalPages <= 1) return null;
  return (
    <nav aria-label="Pagination" className="mt-12 flex items-center justify-center gap-3">
      {page > 1 ? (
        <Link className="rounded-full border border-[var(--stroke)] px-4 py-2 text-sm" href={hrefFor(page - 1)}>
          Previous
        </Link>
      ) : (
        <span className="px-4 py-2 text-sm text-[var(--muted)]">Previous</span>
      )}
      <p className="text-sm text-[var(--muted)]">
        Page {page} of {totalPages}
      </p>
      {page < totalPages ? (
        <Link className="rounded-full border border-[var(--stroke)] px-4 py-2 text-sm" href={hrefFor(page + 1)}>
          Next
        </Link>
      ) : (
        <span className="px-4 py-2 text-sm text-[var(--muted)]">Next</span>
      )}
    </nav>
  );
}
