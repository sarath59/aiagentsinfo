import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ComparisonGuide } from "@/components/ComparisonGuide";
import { LinkedText } from "@/components/LinkedText";
import { COMPARISON_HUB } from "@/lib/comparisons";
import { smallBusinessComparison } from "@/lib/consumer-comparisons";
import { defaultMetadata } from "@/lib/seo";

export const metadata = defaultMetadata(
  smallBusinessComparison.metaTitle,
  smallBusinessComparison.metaDescription,
  smallBusinessComparison.path,
  { absoluteTitle: true },
);

const toc = [
  ...(smallBusinessComparison.sections ?? []).map((section) => ({
    id: section.id,
    text: section.heading,
    level: 2 as const,
  })),
  { id: "job-capabilities", text: "What can each small-business agent do?", level: 2 as const },
  { id: "comparison-table", text: smallBusinessComparison.tableHeading, level: 2 as const },
  { id: "best-for", text: smallBusinessComparison.bestForHeading, level: 2 as const },
  { id: "how-this-was-checked", text: smallBusinessComparison.methodHeading, level: 2 as const },
  { id: "faq", text: smallBusinessComparison.faqHeading, level: 2 as const },
];

export default function SmallBusinessComparisonPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: COMPARISON_HUB.title, path: COMPARISON_HUB.href },
          { name: smallBusinessComparison.title, path: smallBusinessComparison.path },
        ]}
      />
      <ComparisonGuide page={smallBusinessComparison} toc={toc}>
        {(smallBusinessComparison.sections ?? []).map((section) => (
          <section
            key={section.id}
            id={section.id}
            className={section.id === "direct-answer" ? "article-prose" : "mt-12"}
          >
            {section.id === "direct-answer" ? (
              <h2>{section.heading}</h2>
            ) : (
              <h2 className="text-2xl font-semibold tracking-tight">{section.heading}</h2>
            )}
            {section.paragraphs.map((paragraph) => (
              <p
                key={paragraph.slice(0, 48)}
                className={
                  section.id === "direct-answer"
                    ? undefined
                    : "mt-3 max-w-3xl text-sm leading-relaxed text-[var(--muted)]"
                }
              >
                <LinkedText text={paragraph} />
              </p>
            ))}
          </section>
        ))}
        <section id="job-capabilities" className="mt-12">
          <h2 className="text-2xl font-semibold tracking-tight">What can each small-business agent do?</h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[var(--muted)]">
            Documented capabilities from vendor pages, not scores. Limitations are also from vendor docs.
          </p>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[800px] border-collapse text-sm">
              <thead>
                <tr className="border-b border-[var(--stroke)]">
                  <th className="py-2 pr-4 text-left font-semibold">Job</th>
                  <th className="py-2 pr-4 text-left font-semibold">Product</th>
                  <th className="py-2 pr-4 text-left font-semibold">Documented capability</th>
                  <th className="py-2 pr-4 text-left font-semibold">Limitation</th>
                  <th className="py-2 text-left font-semibold">Primary source (date)</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-[var(--stroke)]">
                  <td className="py-2 pr-4">Shared team workspace</td>
                  <td className="py-2 pr-4">ChatGPT Business</td>
                  <td className="py-2 pr-4">ChatGPT Work and Codex for teams</td>
                  <td className="py-2 pr-4">Usually requires 2-seat minimum</td>
                  <td className="py-2">
                    <a
                      href="https://help.openai.com/en/articles/8542115-chatgpt-business-general-faq"
                      className="text-[var(--link)] underline"
                    >
                      help.openai.com
                    </a>{" "}
                    (Nov 8, 2026)
                  </td>
                </tr>
                <tr className="border-b border-[var(--stroke)]">
                  <td className="py-2 pr-4">Team assistant with background tasks</td>
                  <td className="py-2 pr-4">Claude Team</td>
                  <td className="py-2 pr-4">Cowork available on Team plan</td>
                  <td className="py-2 pr-4">Two-person minimum</td>
                  <td className="py-2">
                    <a href="https://claude.com/pricing" className="text-[var(--link)] underline">
                      claude.com/pricing
                    </a>{" "}
                    (Nov 2026)
                  </td>
                </tr>
                <tr className="border-b border-[var(--stroke)]">
                  <td className="py-2 pr-4">Copilot in Outlook and Word</td>
                  <td className="py-2 pr-4">Microsoft 365 Business Standard with Copilot</td>
                  <td className="py-2 pr-4">Copilot in Word, Excel, PowerPoint, Outlook, Teams</td>
                  <td className="py-2 pr-4">Usage-based for advanced features</td>
                  <td className="py-2">
                    <a
                      href="https://www.microsoft.com/en-us/microsoft-365/business/microsoft-365-business-standard-with-copilot"
                      className="text-[var(--link)] underline"
                    >
                      microsoft.com
                    </a>{" "}
                    (Nov 8, 2026)
                  </td>
                </tr>
                <tr>
                  <td className="py-2 pr-4">Website visitor assistant</td>
                  <td className="py-2 pr-4">ReplyCurrent</td>
                  <td className="py-2 pr-4">Answers from site, docs, files with source citations</td>
                  <td className="py-2 pr-4">Not a shared inbox or CRM</td>
                  <td className="py-2">
                    <a href="https://www.replycurrent.com" className="text-[var(--link)] underline">
                      replycurrent.com
                    </a>{" "}
                    (Nov 7, 2026)
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </ComparisonGuide>
    </>
  );
}
