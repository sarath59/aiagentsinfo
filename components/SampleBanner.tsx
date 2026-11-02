export function SampleBanner({ children }: { children?: React.ReactNode }) {
  return (
    <p className="kicker mb-4 inline-flex items-center gap-2 rounded-full border border-[var(--stroke)] bg-[var(--bg-elev)] px-3 py-1">
      <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-[var(--gold)]" />
      {children ?? "Sample content · easy to replace"}
    </p>
  );
}
