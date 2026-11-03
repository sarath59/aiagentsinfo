import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CompanyLogo } from "@/components/CompanyLogo";
import { EmptyState } from "@/components/EmptyState";
import { defaultMetadata } from "@/lib/seo";
import { searchSite } from "@/lib/search";
import { normalizeQuery } from "@/lib/utils";

export const metadata = defaultMetadata(
  "Search",
  "Search the blog, research desk, glossary, and AI directory.",
  "/search",
);

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const q = normalizeQuery((await searchParams).q);
  const hits = q ? await searchSite(q) : [];

  return (
    <>
      <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Search", path: "/search" }]} />
      <div className="mx-auto max-w-3xl px-4 pb-20 pt-12">
        <h1 className="display text-5xl">Search</h1>
        <form action="/search" method="get" className="mt-8">
          <label htmlFor="q" className="sr-only">
            Query
          </label>
          <input
            id="q"
            name="q"
            defaultValue={q}
            className="focus-ring w-full rounded-full border border-[var(--stroke)] bg-transparent px-5 py-4"
            placeholder="Agents, harnesses, Claude, RAG…"
          />
        </form>
        {q ? (
          <p className="mt-6 text-sm text-[var(--muted)]">
            {hits.length} result{hits.length === 1 ? "" : "s"} for “{q}”
          </p>
        ) : (
          <p className="mt-6 text-[var(--muted)]">
            Type at least two characters. Try{" "}
            <span className="inline-flex items-center gap-1 align-middle">
              <CompanyLogo name="Claude" src="/logos/claude.png" size={16} />
              Claude
            </span>
            , harnesses, or RAG.
          </p>
        )}
        {q && hits.length === 0 ? (
          <div className="mt-6">
            <EmptyState
              title="No matches in this corpus"
              body="Try a broader word, or browse the directory and glossary."
              href="/directory"
              cta="Browse the directory"
            />
          </div>
        ) : (
          <ul className="mt-6 grid gap-3">
            {hits.map((hit) => (
              <li key={hit.href} className="glass rounded-2xl p-5">
                <p className="kicker">{hit.type}</p>
                <div className="mt-2 flex items-start gap-3">
                  {hit.marks.length === 1 ? (
                    <CompanyLogo
                      name={hit.marks[0].name}
                      src={hit.marks[0].src}
                      tile={hit.marks[0].tile}
                      size="md"
                    />
                  ) : null}
                  <div className="min-w-0">
                    <Link href={hit.href} className="block font-semibold tracking-tight text-2xl">
                      {hit.title}
                    </Link>
                    <p className="mt-2 text-sm text-[var(--muted)]">{hit.description}</p>
                  </div>
                </div>
                {hit.marks.length > 1 ? (
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {hit.marks.map((mark) => (
                      <li key={mark.name} className="chip gap-1.5 py-1 pl-1 pr-3">
                        <CompanyLogo name={mark.name} src={mark.src} tile={mark.tile} size="xs" />
                        <span>{mark.name}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
