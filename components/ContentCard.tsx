import Link from "next/link";
import { formatDate } from "@/lib/utils";

export function ContentCard({
  href,
  kicker,
  title,
  description,
  date,
  readingMinutes,
  downloadHref,
}: {
  href: string;
  kicker: string;
  title: string;
  description: string;
  date?: string;
  readingMinutes?: number;
  downloadHref?: string;
}) {
  const meta = [date ? formatDate(date) : "", readingMinutes ? `${readingMinutes} min read` : ""]
    .filter(Boolean)
    .join(" · ");

  return (
    <article className="content-card glass lift click-card">
      <p>
        <span className="article-pill">{kicker}</span>
      </p>
      <h2 className="content-card-title">
        <Link className="card-stretch" href={href}>
          {title}
        </Link>
      </h2>
      <p className="content-card-dek">{description}</p>
      <div className="content-card-foot">
        {meta ? <p className="content-card-meta">{meta}</p> : <span />}
        {downloadHref ? (
          <a className="content-card-download" href={downloadHref}>
            Download PDF
          </a>
        ) : null}
      </div>
    </article>
  );
}
