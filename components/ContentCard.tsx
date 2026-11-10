import Link from "next/link";
import { formatDate } from "@/lib/utils";

export function ContentCard({
  href,
  kicker,
  title,
  description,
  date,
  readingMinutes,
}: {
  href: string;
  kicker: string;
  title: string;
  description: string;
  date?: string;
  readingMinutes?: number;
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
      {meta ? (
        <div className="content-card-foot">
          <p className="content-card-meta">{meta}</p>
        </div>
      ) : null}
    </article>
  );
}
