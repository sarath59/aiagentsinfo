import { CompanyLogo, type LogoSize } from "@/components/CompanyLogo";
import {
  resolveCompanies,
  sourceMark,
  splitCompanyMentions,
  type Company,
} from "@/lib/companies";

export function CompanyChip({
  company,
  size = "xs",
}: {
  company: Company;
  size?: LogoSize;
}) {
  const inner = (
    <>
      <CompanyLogo name={company.name} src={company.logo} tile={company.tile} size={size} />
      <span>{company.name}</span>
    </>
  );
  const className = "chip focus-ring gap-1.5 py-1 pl-1 pr-3";
  if (!company.website) {
    return <span className={className}>{inner}</span>;
  }
  return (
    <a className={className} href={company.website} rel="noreferrer">
      {inner}
    </a>
  );
}

export function CompanyMarks({
  slugs,
  size = "xs",
}: {
  slugs?: string[];
  size?: LogoSize;
}) {
  const companies = resolveCompanies(slugs);
  if (!companies.length) return null;
  return (
    <span className="inline-flex flex-wrap items-center gap-2">
      {companies.map((company) => (
        <CompanyChip key={company.slug} company={company} size={size} />
      ))}
    </span>
  );
}

export function CompaniesMentioned({ slugs }: { slugs?: string[] }) {
  const companies = resolveCompanies(slugs);
  if (!companies.length) return null;
  return (
    <section className="mt-8" aria-labelledby="companies-mentioned">
      <h2 id="companies-mentioned" className="font-semibold tracking-tight text-2xl">
        Companies mentioned
      </h2>
      <div className="mt-4">
        <CompanyMarks slugs={slugs} size="sm" />
      </div>
    </section>
  );
}

export function InlineCompanyText({ text }: { text: string }) {
  const parts = splitCompanyMentions(text);
  return (
    <>
      {parts.map((part, index) =>
        part.kind === "text" ? (
          <span key={index}>{part.text}</span>
        ) : (
          <span key={index} className="inline-flex items-center gap-1 align-middle whitespace-nowrap">
            <CompanyLogo
              name={part.company.name}
              src={part.company.logo}
              tile={part.company.tile}
              size={16}
            />
            {part.text}
          </span>
        ),
      )}
    </>
  );
}

export function SourceList({
  sources,
}: {
  sources: { title: string; url?: string; note?: string }[];
}) {
  return (
    <ol className="source-list">
      {sources.map((source, index) => {
        const company = sourceMark(source);
        const body = (
          <>
            <CompanyLogo
              name={company?.name ?? source.title}
              src={company?.logo}
              tile={company?.tile}
              size="xs"
            />
            <span>
              {source.title}
              {source.note ? <span className="text-[var(--muted)]"> — {source.note}</span> : null}
            </span>
          </>
        );
        return (
          <li key={`${source.title}-${source.url ?? ""}`}>
            <span className="source-index">{index + 1}</span>
            {source.url ? (
              <a className="source-link inline-flex items-start gap-2" href={source.url} rel="noreferrer">
                {body}
              </a>
            ) : (
              <span className="source-link inline-flex items-start gap-2">{body}</span>
            )}
          </li>
        );
      })}
    </ol>
  );
}
