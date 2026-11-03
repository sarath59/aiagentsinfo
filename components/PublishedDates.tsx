import { formatDate } from "@/lib/utils";

function dateTimeAttr(value: string) {
  return value.slice(0, 10);
}

export function PublishedDates({ published, updated }: { published: string; updated?: string }) {
  const modified = updated || published;
  return (
    <dl className="mt-6 grid gap-1 text-sm text-[var(--muted)]">
      <div>
        <dt className="inline">Published: </dt>
        <dd className="inline">
          <time dateTime={dateTimeAttr(published)}>{formatDate(published)}</time>
        </dd>
      </div>
      <div>
        <dt className="inline">Updated: </dt>
        <dd className="inline">
          <time dateTime={dateTimeAttr(modified)}>{formatDate(modified)}</time>
        </dd>
      </div>
    </dl>
  );
}
