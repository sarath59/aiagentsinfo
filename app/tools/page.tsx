import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd, defaultMetadata, webPageJsonLd } from "@/lib/seo";
import { freeTools, toolCategories } from "@/lib/tools-catalog";

const path = "/tools";
const title = "Free AI agent tools";
const description =
  "Free tools for an AGENTS.md, an agent pick, a token bill, an ROI check, and a prompt or harness check. No login.";

export const metadata = defaultMetadata(title, description, path, { absoluteTitle: true });

export default function ToolsPage() {
  return (
    <>
      <JsonLd
        data={webPageJsonLd({
          title,
          description,
          path,
          datePublished: "2026-11-10",
          dateModified: "2026-11-11",
        })}
      />
      <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Tools", path }]} />
      <header className="mx-auto max-w-6xl px-4 pb-6 pt-10">
        <p className="kicker kicker-lead">Tools</p>
        <h1 className="display mt-3 text-4xl sm:text-5xl">{title}</h1>
        <p className="mt-4 max-w-3xl text-lg leading-relaxed text-[var(--muted)]">
          Each tool does one job, in the browser or with a request that is not stored. No account.
        </p>
      </header>
      <div className="mx-auto max-w-6xl px-4 pb-20">
        {toolCategories.map((category) => {
          const tools = freeTools.filter((tool) => tool.category === category);
          if (!tools.length) return null;
          return (
            <section key={category} className="mt-10" aria-labelledby={`tools-${category}`}>
              <h2 id={`tools-${category}`} className="text-2xl font-semibold tracking-tight">
                {category}
              </h2>
              <ul className="mt-4 grid gap-4 sm:grid-cols-2">
                {tools.map((tool) => (
                  <li key={tool.href} className="glass flex h-full flex-col rounded-3xl p-5">
                    <h3 className="text-lg font-semibold tracking-tight">{tool.title}</h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--muted)]">{tool.description}</p>
                    <Link href={tool.href} className="btn-primary mt-4 w-fit px-4 py-2 text-sm">
                      Use tool
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>
    </>
  );
}
