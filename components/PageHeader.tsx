export function PageHeader({
  kicker,
  title,
  summary,
}: {
  kicker: string;
  title: string;
  summary: string;
}) {
  return (
    <header className="mx-auto max-w-3xl px-4 pb-10 pt-16">
      <p className="kicker kicker-lead">{kicker}</p>
      <h1 className="display mt-3 text-4xl sm:text-5xl">{title}</h1>
      <p className="mt-4 text-lg leading-relaxed text-[var(--muted)]">{summary}</p>
    </header>
  );
}
