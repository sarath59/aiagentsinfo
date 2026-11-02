import Link from "next/link";

export function SponsorSlot({
  placement,
  title,
  body,
}: {
  placement: string;
  title: string;
  body: string;
}) {
  return (
    <aside
      className="rounded-3xl border border-dashed border-[var(--stroke-strong)] bg-[color-mix(in_oklab,var(--color-gold)_5%,transparent)] p-5"
      aria-label={`Sponsored placement: ${placement}`}
    >
      <p className="kicker text-[var(--gold)]">Sponsored · {placement}</p>
      <p className="mt-2 font-medium">{title}</p>
      <p className="mt-2 text-sm text-[var(--muted)]">{body}</p>
      <Link href="/advertise" className="mt-3 inline-block text-sm underline">
        Advertise here
      </Link>
    </aside>
  );
}
