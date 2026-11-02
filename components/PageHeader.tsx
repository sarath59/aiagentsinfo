import { SampleBanner } from "@/components/SampleBanner";

export function PageHeader({
  kicker,
  title,
  summary,
  sample,
}: {
  kicker: string;
  title: string;
  summary: string;
  sample?: boolean;
}) {
  return (
    <header className="mx-auto max-w-3xl px-4 pb-10 pt-16">
      {sample ? <SampleBanner /> : null}
      <p className="kicker">{kicker}</p>
      <h1 className="display mt-3 text-4xl sm:text-5xl">{title}</h1>
      <p className="mt-4 text-lg text-[var(--muted)]">{summary}</p>
    </header>
  );
}
