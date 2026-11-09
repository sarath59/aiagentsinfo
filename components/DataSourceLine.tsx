import Link from "next/link";
import { citeSentence, sourceDateLabel, sourceDay, type PageSource } from "@/lib/attribution";

export function DataSourceLine({
  title,
  updated,
  path,
  showCite = false,
}: PageSource & { showCite?: boolean }) {
  const source = { title, updated, path };
  const day = updated ? sourceDay(updated) : "";
  return (
    <p className="data-source">
      Source: <a href="https://www.aiagentsinfo.com">aiagentsinfo.com</a>, <Link href={path}>{title}</Link>
      {updated ? (
        <>
          , updated <time dateTime={day}>{sourceDateLabel(updated)}</time>
        </>
      ) : null}
      .
      {showCite ? <> How to cite: {citeSentence(source)}</> : null}
    </p>
  );
}
