import { TrackLink } from "@/components/TrackLink";

export function ListYourAgent() {
  return (
    <aside className="glass mt-10 rounded-3xl p-6">
      <p className="kicker">Directory</p>
      <h2 className="mt-2 text-2xl font-semibold tracking-tight">List your AI agent</h2>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[var(--muted)]">
        No login and no fee. A valid submission is published to the directory. Payment does not buy a listing or a rank.
      </p>
      <TrackLink href="/submit" goal="submit_click" className="btn-primary mt-4 inline-flex px-4 py-2 text-sm">
        List your AI agent
      </TrackLink>
    </aside>
  );
}
