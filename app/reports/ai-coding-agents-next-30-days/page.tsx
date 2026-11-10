import Link from "next/link";
import { ReportLayout } from "@/components/ReportLayout";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CiteOrEmbed } from "@/components/CiteOrEmbed";
import { SourceList } from "@/components/CompanyMarks";
import { FaqList } from "@/components/FaqList";
import { SortableTable } from "@/components/SortableTable";
import { categoryTitle, getBlogPost } from "@/lib/blog";
import {
  announcedAnswer,
  cadenceRows,
  cheapestAnswer,
  checkedLabel,
  dateCaption,
  dateColumns,
  dateTableRows,
  description,
  leftOutAnswer,
  likelyAnswer,
  path,
  priceAnswer,
  priceCaption,
  priceColumns,
  priceTableRows,
  readOn,
  readingMinutes,
  repoCaption,
  repoColumns,
  repoTableRows,
  reposAnswer,
  sources,
  title,
  toolsCompared,
  watchAnswer,
} from "@/lib/coding-agents-30-day";
import { categorySummaries } from "@/lib/directory-meta";
import { datasetJsonLd, datasetLicenseUrl, JsonLd, defaultMetadata, webPageJsonLd } from "@/lib/seo";
import { absoluteUrl, site } from "@/lib/site";
import { formatDate } from "@/lib/utils";

export const metadata = defaultMetadata(title, description, path);

export default async function CodingAgents30DayPage() {
  const [pricingPost, harnessPost] = await Promise.all([
    getBlogPost("claude-code-vs-codex-pricing"),
    getBlogPost("what-is-an-ai-agent-harness"),
  ]);
  const updatedLabel = formatDate(readOn);
  const pageUrl = absoluteUrl(path);
  const citation = `AI Agents Info. "${title}." Last updated ${updatedLabel}. ${pageUrl}.`;
  const embed = `<blockquote cite="${pageUrl}">
<p>${description}</p>
<footer><a href="${pageUrl}">${title}</a>, AI Agents Info, last updated ${updatedLabel}.</footer>
</blockquote>`;
  const related = [
    pricingPost
      ? {
          href: `/blog/${pricingPost.slug}`,
          title: pricingPost.title,
          description: pricingPost.description,
          kicker: categoryTitle(pricingPost.category),
          date: pricingPost.updated ?? pricingPost.date,
          readingMinutes: pricingPost.readingMinutes,
        }
      : undefined,
    harnessPost
      ? {
          href: `/blog/${harnessPost.slug}`,
          title: harnessPost.title,
          description: harnessPost.description,
          kicker: categoryTitle(harnessPost.category),
          date: harnessPost.date,
          readingMinutes: harnessPost.readingMinutes,
        }
      : undefined,
    {
      href: "/reports/agent-harness-benchmark-november-2026",
      title: "Harness benchmark, November 2026",
      description:
        "Public SWE-bench and Terminal-Bench scores for agent harnesses and coding agents, each with the date on the official source.",
      kicker: "Report",
      date: "2026-11-05",
    },
    {
      href: "/reports/ai-agents-next-12-months",
      title: "AI agents, Nov 2026 to Nov 2027",
      description:
        "The 12-month outlook for coding agents, computer use, harnesses, and regulation. This page does not repeat it.",
      kicker: "Report",
      date: "2026-11-07",
    },
    {
      href: "/reports/ai-agents-next-6-months",
      title: "AI agents, Nov 2026 to May 2027",
      description:
        "The six-month outlook. It stops at May 2027 and covers more than coding agents.",
      kicker: "Report",
      date: "2026-11-05",
    },
    {
      href: "/directory/category/coding-agents",
      title: "Coding agents in the directory",
      description: categorySummaries["coding-agents"],
      kicker: "Directory",
    },
  ].filter((item) => item !== undefined);

  return (
    <>
      <JsonLd data={webPageJsonLd({ title, description, path, datePublished: readOn, dateModified: readOn })} />
      <JsonLd
        data={datasetJsonLd({
          title,
          description,
          path,
          datePublished: readOn,
          dateModified: readOn,
        })}
      />
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Reports", path: "/reports" },
          { name: title, path },
        ]}
      />
      <ReportLayout
        category="Report"
        title={title}
        thesis="Eleven coding-agent list prices, checked November 8, 2026, and three dates the vendors have already set."
        description={description}
        published={readOn}
        readingMinutes={readingMinutes}
        byline={site.bylines.research}
        wide
        details={
          <>
            <p>
              Prices, limits, star counts, and dates were read from the linked pages on {checkedLabel}. A figure
              without a public source is not in the tables.
            </p>
            <p className="mt-2">
              The compilation is licensed{" "}
              <a className="text-[var(--link)] underline" href={datasetLicenseUrl}>
                CC BY 4.0
              </a>
              . Credit{" "}
              <a className="text-[var(--link)] underline" href={absoluteUrl("/")}>
                {site.name}
              </a>{" "}
              and link the vendor page you quote.
            </p>
          </>
        }
        takeaways={[
          announcedAnswer,
          cheapestAnswer,
          "Claude Code's changelog lists four versions from October 31 through November 6, 2026. The changelog does not name the next one.",
          "openai/codex, google-gemini/gemini-cli, and OpenHands/OpenHands were pushed on November 8, 2026. Aider's last push on that API read was May 22, 2026.",
          "The six-month and 12-month outlooks are a different assignment. This page stops on December 8, 2026, and it stays on coding agents.",
        ]}
        toc={[
          { id: "how-a-claim-is-sorted", text: "How a claim is sorted", level: 2 },
          { id: "what-is-already-dated", text: "What is already dated?", level: 2 },
          { id: "which-is-cheapest", text: "Which is cheapest?", level: 2 },
          { id: "what-do-plans-cost", text: "What do the plans cost?", level: 2 },
          { id: "which-repos-moved", text: "Which repositories moved?", level: 2 },
          { id: "what-is-likely", text: "What is likely?", level: 2 },
          { id: "what-to-watch", text: "What should you watch?", level: 2 },
          { id: "left-out", text: "What was left out?", level: 2 },
          { id: "faq", text: "FAQ", level: 2 },
          { id: "sources", text: "Sources", level: 2 },
          { id: "citation", text: "How to cite this", level: 2 },
        ]}
        sources={<SourceList sources={sources} />}
        citation={<CiteOrEmbed citation={citation} embed={embed} />}
        related={related}
      >
        <div className="article-prose">
          <p>
            From November 8 through December 8, 2026, official pages name three dates that a coding-agent reader can
            put on a calendar. They do not name a new product launch. The rest of this brief is the list price and
            the usage line printed today for {toolsCompared.length} tools: {toolsCompared.join(", ")}.
          </p>
          <p>
            The{" "}
            <Link href="/reports/ai-agents-next-6-months">six-month agents outlook</Link> and the{" "}
            <Link href="/reports/ai-agents-next-12-months">12-month outlook</Link> cover filings, computer use,
            harnesses, and regulation through May 2027 and November 2027. This page does not repeat that record.
            Scores stay in the{" "}
            <Link href="/reports/agent-harness-benchmark-november-2026">November harness benchmark</Link>. The
            software around a coding model is a harness. The longer guide is{" "}
            <Link href="/blog/what-is-an-ai-agent-harness">What is an AI agent harness?</Link>
          </p>
        </div>

        <section className="glass article-callout mt-10 rounded-3xl p-6 sm:p-8">
          <h2 id="how-a-claim-is-sorted" className="text-2xl font-semibold tracking-tight">
            How a claim is sorted
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
            <strong className="font-semibold text-[var(--fg)]">Announced</strong> means a linked company page, docs
            page, or changelog names the date.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
            <strong className="font-semibold text-[var(--fg)]">Likely</strong> means a follow-up the recent dates
            make reasonable, while no page names the day or the feature.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
            <strong className="font-semibold text-[var(--fg)]">Watch for</strong> means a later check should confirm
            the item or drop it: the page withholds a day, the tense is future, or a follow-up named earlier was not
            on the page read {checkedLabel}.
          </p>
        </section>

        <section className="mt-12">
          <h2 id="what-is-already-dated" className="text-2xl font-semibold tracking-tight">
            What is already dated for AI coding agents from 8 Nov to 8 Dec 2026?
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[var(--muted)]">
            <strong className="font-semibold text-[var(--fg)]">{announcedAnswer}</strong>
          </p>
          <div className="mt-5">
            <SortableTable
              caption={dateCaption}
              columns={dateColumns}
              rows={dateTableRows()}
              defaultSort="date"
              defaultDirection="asc"
              source={{ title, updated: readOn, path }}
            />
          </div>
          <div className="mt-4 grid gap-4 text-sm leading-relaxed text-[var(--muted)]">
            <p>
              <a className="text-[var(--link)] underline" href="https://claude.com/docs/third-party/claude-desktop/unified-claude">
                Anthropic&apos;s Unified Claude page
              </a>{" "}
              for Claude Desktop 3P, read {checkedLabel}, says Unified Claude is opt-in until November 10, 2026. When a current version of
              Claude Desktop starts after 12:00 PM Pacific Time that day, an unset <code>desktopHome</code> reads as{" "}
              <code>standard</code>, which turns Unified Claude on. Cowork is then on even where it had been turned
              off. The same page says Code stays separate.{" "}
              <a className="text-[var(--link)] underline" href="https://code.claude.com/docs/en/changelog">
                Claude Code 2.1.319
              </a>
              , dated November 6, already warns gateway operators about that desktop change.
            </p>
            <p>
              <a className="text-[var(--link)] underline" href="https://antigravity.google/docs/models">
                Antigravity&apos;s models page
              </a>{" "}
              marks Claude Sonnet 4.6 (thinking), Claude Opus 4.6 (thinking), and GPT-OSS-120b with one footnote:
              &quot;Will be removed on November 18, 2026.&quot; On the same table, Sonnet 4.6 and Opus 4.6 are
              available on Free and Google AI Plus and on Google AI Pro, and marked unavailable on Ultra and
              Enterprise. GPT-OSS-120b is available on Free and Google AI Plus, Pro, and Ultra, and marked unavailable
              on Enterprise. Gemini 3.8 Flash is available on every column of that table.
            </p>
            <p>
              <a className="text-[var(--link)] underline" href="https://learn.chatgpt.com/docs/pricing">
                The Codex pricing page
              </a>{" "}
              says GPT-5.6 Sol&apos;s promotional pricing is available at least through November 21, 2026. In the
              same credit table, GPT-5.6 Sol is 100 credits per million input tokens, 10 per million cached input
              tokens, and 500 per million output tokens, at Standard speed. The page does not print the price that
              applies after November 21.{" "}
              <code>developers.openai.com/codex/pricing</code> redirected to this page on {checkedLabel}.
            </p>
          </div>
        </section>

        <section className="mt-12">
          <h2 id="which-is-cheapest" className="text-2xl font-semibold tracking-tight">
            Which AI coding agent is cheapest in November 2026?
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[var(--muted)]">
            <strong className="font-semibold text-[var(--fg)]">{cheapestAnswer}</strong>
          </p>
          <div className="mt-4 grid gap-4 text-sm leading-relaxed text-[var(--muted)]">
            <p>
              The $0 plans are not the same product. Codex Free includes Codex for quick coding tasks. Cursor Free
              includes limited agent requests. GitHub Copilot Free includes agent mode and excludes Copilot in the
              cloud. Devin Free includes a light agent quota, limited model choice, unlimited inline edits, and
              unlimited Tab completions. Claude Code&apos;s pricing table marks the Free row as No and the Pro, Max,
              and Ultra rows as Yes.
            </p>
            <p>
              Among paid monthly stickers, Codex Go and Cursor Plus are both $8. Cursor Plus includes Grok models
              only. Third-party models in Cursor start on Premium at $30 a month and are billed at API list price
              from the first request. GitHub Copilot Pro is $10 a month and includes the cloud agent. The first
              Google subscriptions card that names Antigravity is Google AI Pro at $19.99 a month. Google AI Plus is
              $4.99 a month on that page, and that card does not name Antigravity.
            </p>
            <p>
              A side-by-side of the two subscription coding agents with matching $20, $100, and $200 rungs is{" "}
              <Link href="/blog/claude-code-vs-codex-pricing">Claude Code vs Codex pricing</Link>. This page rechecked
              those stickers on {checkedLabel}. The directory listings are{" "}
              <Link href="/directory/claude-code">Claude Code</Link>, <Link href="/directory/codex">Codex</Link>,{" "}
              <Link href="/directory/cursor">Cursor</Link>,{" "}
              <Link href="/directory/github-copilot">GitHub Copilot</Link>, and{" "}
              <Link href="/directory/devin">Devin</Link>.
            </p>
          </div>
        </section>

        <section className="mt-12">
          <h2 id="what-do-plans-cost" className="text-2xl font-semibold tracking-tight">
            What do AI coding agent plans cost on 8 Nov 2026?
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[var(--muted)]">
            <strong className="font-semibold text-[var(--fg)]">{priceAnswer}</strong>
          </p>
          <div className="mt-5">
            <SortableTable
              caption={priceCaption}
              columns={priceColumns}
              rows={priceTableRows()}
              defaultSort="price"
              defaultDirection="asc"
              source={{ title, updated: readOn, path }}
            />
          </div>
          <div className="mt-4 grid gap-4 text-sm leading-relaxed text-[var(--muted)]">
            <p>
              Prices exclude tax where the vendor says so. Anthropic says its prices can change. Cursor says prices
              exclude applicable taxes. Open-source repositories are absent from this table because the repository
              is the software. The model bill is separate, and it is in the next section.
            </p>
            <p>
              Claude Team standard seats are $20 per seat per month billed annually, or $25 billed monthly. Premium
              seats are $100 annually or $125 monthly. Enterprise is $20 per seat per month, billed annually, with a
              20-seat minimum, plus usage at API rates. The pricing FAQ says standard seats give more usage than Pro,
              and premium seats give 5 times more than standard. It does not print a number for the standard seat.
              Max and Ultra include monthly API credits.{" "}
              <a
                className="text-[var(--link)] underline"
                href="https://support.claude.com/en/articles/11145838-use-claude-code-with-your-pro-max-or-ultra-plan"
              >
                The Claude Code help page
              </a>{" "}
              says those credits cannot be used in Claude Code or the Claude apps.
            </p>
            <p>
              Codex Business is $20 per user per month for two or more users, billed annually, or $25 billed
              monthly. Enterprise and Edu are contact-sales. For Plus and Standard Business, the pricing page prints
              these local-message estimates per five hours: GPT-6 Astra 5–45, GPT-6.1 Sol 15–160, GPT-6.1 Terra
              35–285, GPT-6 Sol 15–150, and GPT-6 Luna 350–3,000. The page says those estimates are not fixed limits,
              that cloud tasks can use more of the allowance, and that Pro plans currently have no five-hour limit.
            </p>
            <p>
              Cursor Teams is shown as $30 and up per user per month on the pricing page. The{" "}
              <a className="text-[var(--link)] underline" href="https://cursor.com/docs/models-and-pricing">
                models and pricing docs
              </a>{" "}
              list Teams seats at $30, $100, or $200, matching Premium, Super, and Ultra, and annual individual
              prices of $80, $300, $1,000, and $2,000. The usage pool refreshes weekly and is shared with Grok.
            </p>
            <p>
              GitHub Copilot Business is $19 per granted seat per month with 1,900 AI credits per user, pooled.
              Copilot Enterprise is $39 per granted seat per month with 3,900 credits. Usage past the pool is $0.01
              per credit. Copilot access is $0 for a licensed GitHub Enterprise Cloud user, or $10 per user per
              month as Copilot Standalone, with no included credit allowance. Devin Teams is $80 a month plus $40 a
              month per full developer seat, for up to 200 users.{" "}
              <a className="text-[var(--link)] underline" href="https://windsurf.com/pricing">
                windsurf.com/pricing
              </a>{" "}
              returned HTTP 308 to devin.ai/pricing on {checkedLabel}.
            </p>
            <p>
              Jules prints task caps and model names, and the three plan cards do not print a dollar price. Gemini
              CLI&apos;s{" "}
              <a className="text-[var(--link)] underline" href="https://geminicli.com/docs/resources/quota-and-pricing/">
                quota page
              </a>{" "}
              still prints daily request caps, including 1,000 a day on Gemini Code Assist for individuals, 1,500 on
              Google AI Pro, and 2,000 on Google AI Ultra. The same site&apos;s banner says unpaid and Google One
              users moved to Antigravity CLI on June 18, 2026. Antigravity&apos;s{" "}
              <a className="text-[var(--link)] underline" href="https://antigravity.google/docs/plans">
                plans page
              </a>{" "}
              describes a weekly quota for people who are not on Pro or Ultra, a five-hour refresh for Pro and Ultra,
              and no request count.
            </p>
          </div>
        </section>

        <section className="mt-12">
          <h2 id="which-repos-moved" className="text-2xl font-semibold tracking-tight">
            Which open-source coding agents moved in the week of 8 Nov 2026?
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[var(--muted)]">
            <strong className="font-semibold text-[var(--fg)]">{reposAnswer}</strong>
          </p>
          <div className="mt-5">
            <SortableTable
              caption={repoCaption}
              columns={repoColumns}
              rows={repoTableRows()}
              defaultSort="stars"
              defaultDirection="desc"
              source={{ title, updated: readOn, path }}
            />
          </div>
          <div className="mt-4 grid gap-4 text-sm leading-relaxed text-[var(--muted)]">
            <p>
              Stars are GitHub&apos;s <code>stargazers_count</code>. Last push is <code>pushed_at</code>. The latest
              release is the tag and <code>published_at</code> from the releases API. Aider&apos;s releases call did
              not return a tag on this reading, so that cell stays empty of a version. The licence is the SPDX id
              GitHub returned. These counts are a reading at one time on {checkedLabel}.
            </p>
            <p>
              Claude Code&apos;s own changelog, which is the product record rather than a star count, lists four
              versions across seven days:
            </p>
            <ul>
              {cadenceRows.map((row) => (
                <li key={row.version}>
                  {row.version} on {row.date}
                </li>
              ))}
            </ul>
            <p>
              Cursor&apos;s changelog lists voice chat with agents on November 6 and live apps on November 5. The
              November 5 post says Cursor can deploy those apps from Cursor Origin and GitHub, and that support for
              other git providers such as GitLab is coming soon. It does not name a day.
            </p>
          </div>
        </section>

        <section className="mt-12">
          <h2 id="what-is-likely" className="text-2xl font-semibold tracking-tight">
            What is likely for AI coding agents in the next 30 days?
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[var(--muted)]">
            <strong className="font-semibold text-[var(--fg)]">{likelyAnswer}</strong>
          </p>
          <div className="mt-4 grid gap-4 text-sm leading-relaxed text-[var(--muted)]">
            <p>
              The evidence for another Claude Code point release is the changelog itself: 2.1.316 on October 31,
              2.1.317 on November 3, 2.1.318 on November 4, and 2.1.319 on November 6. Four versions in seven days
              is the recent pace. The changelog does not name 2.1.320, and it does not schedule a December feature.
              Treating the next version number as announced would go past the page.
            </p>
            <p>
              The evidence for more open-source commits is the push time. openai/codex, google-gemini/gemini-cli,
              and OpenHands/OpenHands were all pushed on November 8, after a release on November 4 or November 6.
              Cline was pushed on November 7. A commit is a smaller claim than a release. Aider has the opposite
              record: the API&apos;s last push is May 22, 2026, so a release inside this window would be a change
              from a five-month quiet stretch, not a continuation of one.
            </p>
            <p>
              Cursor&apos;s &quot;coming soon&quot; for GitLab is a vendor phrase with no day. It sits in Watch for.
              Putting it in this section would pretend the phrase names November or December.
            </p>
          </div>
        </section>

        <section className="mt-12">
          <h2 id="what-to-watch" className="text-2xl font-semibold tracking-tight">
            What should you watch for through 8 Dec 2026?
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[var(--muted)]">
            <strong className="font-semibold text-[var(--fg)]">{watchAnswer}</strong>
          </p>
          <div className="mt-4 grid gap-4 text-sm leading-relaxed text-[var(--muted)]">
            <p>
              On November 10, after 12:00 PM Pacific, check whether a current Claude Desktop 3P build with no{" "}
              <code>desktopHome</code> opens Unified Claude, and whether Code is still the separate surface the
              docs describe. On November 18, check whether Claude Sonnet 4.6, Claude Opus 4.6, and GPT-OSS-120b are
              gone from the Antigravity model table. After November 21, check whether the Codex page still calls
              GPT-5.6 Sol pricing promotional, and whether the printed credit rate has changed.
            </p>
            <p>
              The Claude Code help page says a small wrap-up allowance, so a response already in progress can finish
              after a limit, is rolling out gradually and may be absent on a given account. That is a rollout
              signal, not a date. Cursor&apos;s GitLab line is the undated one. Aider&apos;s repository is the quiet
              one. Cline&apos;s newest returned release is still v4.1.26 from October 26, while the repository was
              pushed on November 7, so the thing to watch is a release tag newer than that. Jules is the plan page
              that still has task caps and no dollar price.
            </p>
          </div>
        </section>

        <section className="mt-12">
          <h2 id="left-out" className="text-2xl font-semibold tracking-tight">
            What did this brief leave out?
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[var(--muted)]">
            <strong className="font-semibold text-[var(--fg)]">{leftOutAnswer}</strong>
          </p>
          <ul className="mt-4 grid list-disc gap-3 pl-5 text-sm leading-relaxed text-[var(--muted)]">
            <li>
              A December change to how Codex usage is metered. A secondary changelog mentioned one. The OpenAI help
              center did not return the article on this pass, and the Codex pricing page that did load does not
              state a December change. It is not used.
            </li>
            <li>
              Aider&apos;s latest release tag. The repository call returned stars and a last push of May 22, 2026.
              The releases call did not return a tag.
            </li>
            <li>
              Claude Code&apos;s GitHub star count. The product changelog loaded. The repository API call did not.
            </li>
            <li>
              A dollar price for Jules, and a request count for Antigravity. The pages that loaded do not print
              them. Gemini CLI&apos;s older daily caps are quoted above with the June 18 banner, because the quota
              page still prints both.
            </li>
            <li>
              Revenue, traffic, seat counts, and &quot;most popular&quot; rankings. None of the pages used here
              print those for this set of tools.
            </li>
            <li>
              SWE-bench and Terminal-Bench scores. They are in the{" "}
              <Link href="/reports/agent-harness-benchmark-november-2026">November harness benchmark</Link>, with the
              date on each source.
            </li>
          </ul>
        </section>

        <FaqList
          items={[
            {
              question: "What is already dated for AI coding agents from 8 Nov to 8 Dec 2026?",
              answer: <p>{announcedAnswer}</p>,
            },
            {
              question: "Which AI coding agent is cheapest in November 2026?",
              answer: <p>{cheapestAnswer}</p>,
            },
            {
              question: "What is likely for AI coding agents in the next 30 days?",
              answer: <p>{likelyAnswer}</p>,
            },
            {
              question: "How do you cite this brief?",
              answer: (
                <p>
                  {citation} The compilation is CC BY 4.0. Link the vendor page as well if you quote a price.
                </p>
              ),
            },
          ]}
        />
      </ReportLayout>
    </>
  );
}
