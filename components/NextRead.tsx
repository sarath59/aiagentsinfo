import Link from "next/link";
import { TrackLink } from "@/components/TrackLink";

export type NextReadItem = {
  href: string;
  title: string;
  note: string;
};

export function NextRead({
  reads,
  tool,
}: {
  reads: NextReadItem[];
  tool: NextReadItem;
}) {
  return (
    <aside className="next-read glass rounded-3xl p-5 sm:p-6" aria-labelledby="next-read-heading">
      <p className="kicker">Keep going</p>
      <h2 id="next-read-heading" className="mt-2 text-xl font-semibold tracking-tight">
        Next, read
      </h2>
      <ol>
        {reads.map((item) => (
          <li key={item.href}>
            <Link href={item.href}>{item.title}</Link>
            <span className="next-read-note"> — {item.note}</span>
          </li>
        ))}
      </ol>
      <p className="next-read-meta">
        Live counts: <Link href="/trackers">trackers</Link>
        {" · "}
        <Link href="/trackers/downloads">framework downloads</Link>
        {" · "}
        try the <Link href={tool.href}>{tool.title}</Link> ({tool.note}).
      </p>
      <p className="next-read-meta">
        Make or update a listing:{" "}
        <TrackLink href="/submit" goal="submit_click" className="font-medium text-[var(--link)] underline">
          submit a tool
        </TrackLink>
        , or open an existing{" "}
        <Link href="/directory">directory</Link> page and claim it. No login.
      </p>
    </aside>
  );
}
