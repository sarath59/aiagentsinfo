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
    <ul className="mt-4 grid gap-2">
      {sources.map((source) => {
        const company = sourceMark(source);
        const mark = (
          <CompanyLogo
            name={company?.name ?? source.title}
            src={company?.logo}
            tile={company?.tile}
            size="xs"
          />
        );
        const label = (
          <span className="min-w-0 text-left">
            {source.title}
            {source.note ? <span className="text-[var(--muted)]"> — {source.note}</span> : null}
          </span>
        );
        return (
          <li key={`${source.title}-${source.url ?? ""}`}>
            {source.url ? (
              <a className="chip focus-ring w-fit max-w-full gap-2 py-1.5 pl-1.5 pr-3" href={source.url} rel="noreferrer">
                {mark}
                {label}
              </a>
            ) : (
              <span className="chip w-fit max-w-full gap-2 py-1.5 pl-1.5 pr-3">
                {mark}
                {label}
              </span>
            )}
          </li>
        );
      })}
    </ul>
  );
}
