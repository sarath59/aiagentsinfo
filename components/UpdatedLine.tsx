import { formatDate } from "@/lib/utils";

export function UpdatedLine({ date }: { date: string }) {
  const stamp = date.slice(0, 10);
  return (
    <p className="mt-3 text-sm text-[var(--muted)]">
      Updated <time dateTime={stamp}>{formatDate(stamp)}</time>
    </p>
  );
}
