import Link from "next/link";
import { ArticleTemplate } from "@/components/ArticleTemplate";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SourceList } from "@/components/CompanyMarks";
import { CiteOrEmbed } from "@/components/CiteOrEmbed";
import { FaqList } from "@/components/FaqList";
import { NewsletterSignup } from "@/components/newsletter/NewsletterSignup";
import { SortableTable } from "@/components/SortableTable";
import { ToolCtas } from "@/components/ToolCtas";
import { categoryTitle, getBlogPost } from "@/lib/blog";
import {
  description,
  faq,
  months,
  osworldColumns,
  osworldRows,
  path,
  productColumns,
  productRows,
  readOn,
  readingMinutes,
  sources,
  title,
} from "@/lib/browser-computer-report";
import { getGlossaryTerm } from "@/lib/glossary";
import { JsonLd, datasetJsonLd, defaultMetadata, faqPageJsonLd, webPageJsonLd } from "@/lib/seo";
import { absoluteUrl, site, topics } from "@/lib/site";
import { formatDate } from "@/lib/utils";

export const metadata = defaultMetadata(title, description, path, { absoluteTitle: true });

export default async function BrowserComputerUseReportPage() {
  const [guide, hy4, computerUse, browserUse] = await Promise.all([
    getBlogPost("can-an-ai-agent-use-your-computer"),
    getBlogPost("tencent-releases-hy4-with-computer-use"),
    getGlossaryTerm("computer-use"),
    getGlossaryTerm("browser-use"),
  ]);
  const taskTopic = topics.find((topic) => topic.slug === "task-performance");
  const related = [
    {
      href: "/reports/ai-agents-next-6-months",
      title: "AI agents, Nov 2026 to May 2027",
      description:
        "The general six-month outlook. It mentions computer use in passing and does not carry this product table.",
      kicker: "Report",
      date: "2026-11-05",
    },
    {
      href: "/reports/ai-agents-next-12-months",
      title: "AI agents, Nov 2026 to Nov 2027",
      description:
        "The 12-month flagship for coding agents, computer use, harnesses, and regulation. This page stops at May 9, 2027.",
      kicker: "Report",
      date: "2026-11-07",
    },
    {
      href: "/best/computer-use-agents",
      title: "Best computer use agents",
      description:
        "A sourced comparison of desktop, API, open-source, and Windows computer use. Last verified November 2026.",
      kicker: "Comparison",
    },
    guide
      ? {
          href: `/blog/${guide.slug}`,
          title: guide.title,
          description: guide.description,
          kicker: categoryTitle(guide.category),
          date: guide.date,
          readingMinutes: guide.readingMinutes,
        }
      : undefined,
    hy4
      ? {
          href: `/blog/${hy4.slug}`,
          title: hy4.title,
          description: hy4.description,
          kicker: categoryTitle(hy4.category),
          date: hy4.date,
          readingMinutes: hy4.readingMinutes,
        }
      : undefined,
    computerUse
      ? {
          href: "/glossary/computer-use",
          title: computerUse.term,
          description: computerUse.shortDefinition,
          kicker: "Glossary",
        }
      : undefined,
    browserUse
      ? {
          href: "/glossary/browser-use",
          title: browserUse.term,
          description: browserUse.shortDefinition,
          kicker: "Glossary",
        }
      : undefined,
    {
      href: "/directory/chatgpt",
      title: "ChatGPT",
      description: "The directory listing for ChatGPT, including Work and Codex.",
      kicker: "Directory",
    },
    {
      href: "/directory/claude",
      title: "Claude",
      description: "The directory listing for Claude.",
      kicker: "Directory",
    },
    {
      href: "/directory/gemini",
      title: "Gemini",
      description: "The directory listing for Gemini.",
      kicker: "Directory",
    },
    {
      href: "/directory/perplexity",
      title: "Perplexity",
      description: "The directory listing for Perplexity.",
      kicker: "Directory",
    },
    taskTopic
      ? {
          href: taskTopic.href,
          title: taskTopic.title,
          description: taskTopic.summary,
          kicker: "Topic",
        }
      : undefined,
  ].filter((item) => item !== undefined);
  const updatedLabel = formatDate(readOn);
  const pageUrl = absoluteUrl(path);
  const citation = `AI Agents Info. "${title}." Last updated ${updatedLabel}. ${pageUrl}.`;
  const embed = `<blockquote cite="${pageUrl}">
<p>${description}</p>
<footer><a href="${pageUrl}">${title}</a>, AI Agents Info, last updated ${updatedLabel}.</footer>
</blockquote>`;

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
      <JsonLd data={faqPageJsonLd(faq)} />
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Reports", path: "/reports" },
          { name: title, path },
        ]}
      />
      <ArticleTemplate
        category="Report"
        title={title}
        description={description}
        published={readOn}
        updated={readOn}
        readingMinutes={readingMinutes}
        byline={site.bylines.research}
        wide
        takeaways={[
          "November 18, 2026 is the only day these pages name between November 9, 2026 and May 9, 2027. That is when Enterprise ChatGPT dots leave a free preview and billing starts.",
          "Operator is not a product you can open. ChatGPT agent is no longer available. The browser that remains is ChatGPT Work’s cloud browser, which is off Free and Go.",
          "OSWorld 2.0’s own page prints 20.6 percent as the best 500-step completion, for Claude Opus 4.8. Browser Use’s 89.1 percent WebVoyager post is dated December 15, 2024.",
        ]}
        toc={[
          { id: "how-a-claim-is-sorted", text: "How is a claim sorted?", level: 2 },
          { id: "which-are-real", text: "Which products are real?", level: 2 },
          { id: "what-score", text: "What score can you quote?", level: 2 },
          { id: "announced", text: "What is already announced?", level: 2 },
          { id: "likely", text: "What is likely?", level: 2 },
          { id: "watch-for", text: "What should you watch for?", level: 2 },
          { id: "month-by-month", text: "Month by month", level: 2 },
          { id: "left-out", text: "What was left out?", level: 2 },
          { id: "sources", text: "Sources", level: 2 },
          { id: "faq", text: "FAQ", level: 2 },
          { id: "citation", text: "Cite or embed", level: 2 },
        ]}
        actions={
          <>
            <a className="btn-primary px-4 py-2 text-sm" href={`${path}/pdf`}>
              Download PDF
            </a>
            <a className="btn-ghost px-4 py-2 text-sm" href={`${path}/csv`}>
              Download CSV
            </a>
          </>
        }
        sources={<SourceList sources={sources} />}
        citation={
          <CiteOrEmbed
            citation={citation}
            embed={embed}
            note="Cite this report with the snippet below when you mention aiagentsinfo.com. It names AI Agents Info, this page, and November 9, 2026."
          />
        }
        related={related}
      >
        <div className="article-prose">
          <p>
            From November 9, 2026 through May 9, 2027, the public record for browser agents and computer-use agents is
            ten products you can already use, and one day a vendor has actually named. That day is November 18, 2026,
            when OpenAI says Enterprise{" "}
            <a className="text-[var(--link)] underline" href="https://help.openai.com/en/articles/20001530-getting-started-with-your-dot">
              dots
            </a>{" "}
            leave a free preview and billing starts. December through May have no launch day in the pages read for this
            report.
          </p>
          <p>
            Operator is not on that list. OpenAI’s{" "}
            <a className="text-[var(--link)] underline" href="https://help.openai.com/en/articles/11752874-chatgpt-agent">
              ChatGPT agent help page
            </a>
            , read November 9, says the agent is no longer available and that the Operator website is no longer
            accessible. The browser that remains is ChatGPT Work’s cloud browser. Claude’s desktop computer use is a
            beta for Pro, Max, and Ultra, and the help page says Team and Enterprise do not have it. Chrome auto browse
            is real, and it is limited to Google AI Pro and Ultra in the United States and India.
          </p>
          <p>
            This page is the computer-use and browser-agent brief. The{" "}
            <Link href="/reports/ai-agents-next-6-months">general six-month outlook</Link> mentions computer use in a
            few sentences and is not repeated here. Shopping checkout is the{" "}
            <Link href="/reports/ai-shopping-agents-next-6-months">shopping-agent report</Link>. A current product
            comparison, without this six-month split, is{" "}
            <Link href="/best/computer-use-agents">Best computer use agents</Link>. The walkthrough of the click loop is{" "}
            <Link href="/blog/can-an-ai-agent-use-your-computer">Can an AI agent use your computer?</Link>
          </p>
        </div>

        <section className="glass article-callout mt-10 rounded-3xl p-6 sm:p-8">
          <h2 id="how-a-claim-is-sorted" className="text-2xl font-semibold tracking-tight">
            How is a claim sorted?
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
            <strong className="font-semibold text-[var(--fg)]">Announced means a linked page names the fact.</strong>{" "}
            A date counts only when that page prints the day.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
            <strong className="font-semibold text-[var(--fg)]">Likely means the page aims the work at this stretch and does not name a day.</strong>{" "}
            The word means their phrase covers these months. It is not a new odds estimate from AI Agents Info.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
            <strong className="font-semibold text-[var(--fg)]">Watch for means a later check should confirm the item or drop it.</strong>{" "}
            The page withholds a number, two pages use different words, or a follow-up named earlier was not on the
            page read November 9, 2026.
          </p>
        </section>

        <section className="mt-12">
          <h2 id="which-are-real" className="text-2xl font-semibold tracking-tight">
            Which browser and computer-use agents are real on November 9, 2026?
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[var(--muted)]">
            <strong className="font-semibold text-[var(--fg)]">Ten products are on sale or in a documented beta. Operator and ChatGPT agent are not.</strong>{" "}
            A browser agent stays on the web. A computer-use agent can also drive other apps on a screen. Prices below
            are the figures on the linked page. A blank score means that page did not print one.
          </p>
          <div className="mt-5">
            <SortableTable
              columns={productColumns}
              rows={productRows()}
              defaultSort="vendor"
              defaultDirection="asc"
              caption="Ten browser and computer-use agents, read November 9, 2026"
              downloadHref={`${path}/csv`}
            />
          </div>
          <div className="mt-4 grid gap-4 text-sm leading-relaxed text-[var(--muted)]">
            <p>
              <a className="text-[var(--link)] underline" href="https://developers.openai.com/codex/computer-use">
                OpenAI’s Computer Use guide
              </a>{" "}
              says the ChatGPT desktop app can see and operate graphical apps on macOS or Windows, with ChatGPT Work
              and Codex. On Windows it takes the foreground of the active desktop. On a Mac it can keep working after
              the screen locks, and only if you turn locked use on. The guide does not mention Linux. It also does not
              add a computer-use fee on top of the plan.{" "}
              <a className="text-[var(--link)] underline" href="https://help.openai.com/en/articles/6950777-what-is-chatgpt-plus">
                Plus is $20 a month
              </a>
              .{" "}
              <a className="text-[var(--link)] underline" href="https://help.openai.com/en/articles/9793128-about-chatgpt-pro-tiers">
                Pro is $100, $200, or $500 a month
              </a>
              .
            </p>
            <p>
              <a className="text-[var(--link)] underline" href="https://help.openai.com/en/articles/20001280-using-cloud-browser-in-chatgpt">
                Cloud browser
              </a>{" "}
              is a different machine. It is ChatGPT Work’s own browser, on paid plans except Free and Go. It can keep
              going after you close your computer, and it pauses for a sign-in or for an action that is hard to undo,
              including a payment. The password you type in the secure form is not shown to the model. It does not use
              the cookies already stored in your own browser.
            </p>
            <p>
              A dot is the third OpenAI surface. The help page says it has its own cloud computer, that local access
              starts turned off, and that a connected computer can use your local browser when the cloud browser is
              blocked. Enterprise, Edu, and Healthcare workspaces are in an admin preview from November 4 through
              November 18, 2026. On November 18, billing starts and dots become available by default unless an admin
              opts out. The page describes flat rates or scaled consumption and does not print the dollars. Pro users
              have to be 18 or older, and the rollout excludes the European Economic Area, Switzerland, and the United
              Kingdom. Dots are not available for workspaces with UAE data or inference residency.
            </p>
            <p>
              <a className="text-[var(--link)] underline" href="https://support.claude.com/en/articles/14128542-let-claude-use-your-computer-in-cowork">
                Claude’s help center
              </a>{" "}
              says desktop computer use is in beta for Pro, Max, and Ultra, in Cowork and Claude Code, on macOS and
              Windows. Connectors come first, then a browser, then the screen. Team and Enterprise do not have it. The
              computer has to be awake and the desktop app has to be open. On macOS 15 or later, Claude can work in
              background windows.{" "}
              <a className="text-[var(--link)] underline" href="https://platform.claude.com/docs/en/agents-and-tools/tool-use/computer-use-tool">
                The API toolset
              </a>{" "}
              is separate. <code>computer_toolset_20260801</code> needs no beta header, gives Claude 17 member tools,
              and is not available in Claude Managed Agents. Declaring it adds about 4,500 input tokens to a request,
              about 4,590 on Claude Sonnet 5 and about 4,520 on the other supported models. There is no separate
              computer-use fee. You pay the tokens, and you run the screen.
            </p>
            <p>
              <a className="text-[var(--link)] underline" href="https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/computer-use">
                Google’s Cloud computer-use page
              </a>
              , last updated November 7, 2026, lists browser, mobile, and desktop. The default is the browser. Your
              code receives the click and runs it, usually with Playwright. The named models include Gemini 4 Argon
              and the Gemini 3.5 through 3.8 Flash line, plus Gemini 3 Flash preview and Gemini Robotics ER 2 preview.
              The page does not add a computer-use price on top of the model.{" "}
              <a className="text-[var(--link)] underline" href="https://blog.google/products-and-platforms/products/chrome/gemini-3-auto-browse/">
                Chrome auto browse
              </a>{" "}
              is the consumer product. Google introduced it on January 28, 2026 as a U.S. preview for AI Pro and Ultra.
              The{" "}
              <a className="text-[var(--link)] underline" href="https://one.google.com/about/google-ai-plans/">
                plans page read November 9
              </a>{" "}
              says it is available to Pro and Ultra users in the US and India.{" "}
              <a className="text-[var(--link)] underline" href="https://support.google.com/googleone/answer/16105039?hl=en">
                Google One’s restrictions
              </a>{" "}
              add age 18 or older, Chrome 144 or newer, and a signed-in browser. Pro is $19.99 a month. Ultra 5x is
              $99.99 a month. Ultra 20x is $199.99 a month. The plans table leaves Google AI Plus blank for auto browse.
            </p>
            <p>
              <a className="text-[var(--link)] underline" href="https://www.perplexity.ai/comet">
                Comet
              </a>{" "}
              is Perplexity’s browser. The product page lists Mac, Windows, iOS, and Android and does not print a
              price. The{" "}
              <a className="text-[var(--link)] underline" href="https://www.perplexity.ai/hub/pricing">
                pricing page
              </a>{" "}
              displayed US$0 a month and US$17 a month. The text that came back did not put the word Pro next to $17,
              so this report does not label that figure.{" "}
              <a className="text-[var(--link)] underline" href="https://www.perplexity.ai/help-center/en/articles/11680686-perplexity-max">
                Max
              </a>
              , last modified September 14, 2026, is $200 a month or $2,000 a year, and it says Max has the highest
              weekly limit on Comet browser-agent queries. The weekly number is not on the page.
            </p>
            <p>
              <a className="text-[var(--link)] underline" href="https://www.browserbase.com/pricing">
                Browserbase
              </a>{" "}
              sells the browsers, not a chat product. Free is $0, with 1 browser hour, 3 concurrent browsers, and 3
              agent runs. Developer is $20 a month, with 100 hours and then $0.12 an hour. Startup is $99 a month, with
              500 hours and then $0.10 an hour. Scale is custom. Stagehand, the SDK with act, extract, and observe, is
              Browserbase’s.{" "}
              <a className="text-[var(--link)] underline" href="https://browser-use.com/pricing">
                Browser Use
              </a>{" "}
              is the other infrastructure price that was on a public page: $0.02 per browser hour, billed by the
              minute with a one-minute minimum, no subscription, and a home-IP proxy at $5 a gigabyte. The library is
              MIT. The pricing FAQ says $100 in total payments unlocks 50 browsers at once, $1,000 unlocks 250, $5,000
              unlocks 500, and $25,000 unlocks 1,000. A one-time $1 signup credit is mentioned. The hero on the same
              page pairs dollar amounts with concurrency in a layout this read could not resolve, so the free-tier
              concurrency is left unknown.
            </p>
          </div>
        </section>

        <section className="mt-12">
          <h2 id="what-score" className="text-2xl font-semibold tracking-tight">
            What benchmark score can you quote?
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[var(--muted)]">
            <strong className="font-semibold text-[var(--fg)]">Quote 20.6 percent from OSWorld 2.0, and do not quote 89.1 percent as a 2026 result.</strong>{" "}
            The 20.6 percent figure is Claude Opus 4.8 on the benchmark’s own page. The 89.1 percent figure is Browser
            Use’s December 15, 2024 WebVoyager post.
          </p>
          <div className="mt-5">
            <SortableTable
              columns={osworldColumns}
              rows={osworldRows()}
              defaultSort="model"
              defaultDirection="asc"
              caption="Scores printed in the text of OSWorld 2.0, read November 9, 2026"
              downloadHref={`${path}/csv?table=osworld`}
            />
          </div>
          <div className="mt-4 grid gap-4 text-sm leading-relaxed text-[var(--muted)]">
            <p>
              <a className="text-[var(--link)] underline" href="https://osworld-v2.xlang.ai/">
                OSWorld 2.0
              </a>{" "}
              is 108 long computer-use tasks across 31 self-hosted websites. The page says a skilled person takes a
              median of about 1.6 hours, and that 69.6 percent of the tasks take more than an hour. It also says Claude
              Opus 4.7, at maximum thinking, averages 318 tool calls, against about 30 in OSWorld 1.0. Under the
              primary binary metric at 500 steps, Claude Opus 4.8 with maximum thinking and batched tool calls
              completes 20.6 percent of tasks, at a 54.8 percent partial score. The findings section puts that run at
              244,000 output tokens, Opus 4.7 at 18.2 percent and 150,000 tokens, and GPT-5.5 at about 14 percent and
              39,000 tokens. Above 163 minutes, binary completion falls to zero for every model kept in the plot.
            </p>
            <p>
              Those sentences are what this table copies. An interactive chart on the same page did not return rows in
              the read on November 9, so a higher score that lives only in that chart is not copied here. The older{" "}
              <a className="text-[var(--link)] underline" href="https://os-world.github.io/">
                OSWorld project page
              </a>{" "}
              says OSWorld 2.0 has been the current version since June 26, 2026. Its verified score table did not come
              through as text, so this report does not reprint a Verified leaderboard.
            </p>
            <p>
              <a className="text-[var(--link)] underline" href="https://browser-use.com/posts/sota-technical-report">
                Browser Use’s WebVoyager post
              </a>{" "}
              is dated December 15, 2024. It reports 89.1 percent on 586 tasks with gpt-4o. The authors say they
              removed 55 tasks, changed years in tasks that had gone stale, and manually corrected evaluations the
              automatic judge marked unknown or failed. That is a real post. It is not a current public score for the
              product in the table above, and it is not the original WebVoyager task count. No vendor page read on
              November 9 printed a current WebArena score, so WebArena is not given a number here.
            </p>
          </div>
        </section>

        <section className="mt-12">
          <h2 id="announced" className="text-2xl font-semibold tracking-tight">
            What is already announced through May 9, 2027?
          </h2>
          <div className="mt-4 grid gap-4 text-sm leading-relaxed text-[var(--muted)]">
            <p>
              <strong className="font-semibold text-[var(--fg)]">November 18, 2026, and the products already shipping. Nothing else has a day.</strong>
            </p>
            <p>
              The dot help page is the only forward date. Enterprise dots are free to preview from November 4 through
              November 18, 2026. Starting November 18, billing begins for every enabled dot, and dots become available
              by default unless an admin opts out. Work a dot hands to ChatGPT Work or Codex is billed at the ordinary
              rates. Each member can create one personal dot. Texting is in beta for a limited number of Pro users in
              the United States, and it is not in Business or Enterprise workspaces. The page says a dot cannot call
              you at launch, and that it cannot be given its own email address at launch.
            </p>
            <p>
              Everything else in the table is already in market or already in a named beta. That includes desktop
              Computer Use, the cloud browser, Claude’s desktop beta, the Claude API toolset, the Gemini computer-use
              API, Chrome auto browse, Comet, Browserbase, and Browser Use. “Already shipping” is not a promise about
              a later country, a later plan, or a later price. Those sit under Watch for when the page refused a date.
            </p>
          </div>
        </section>

        <section className="mt-12">
          <h2 id="likely" className="text-2xl font-semibold tracking-tight">
            What is likely, with the evidence under it?
          </h2>
          <div className="mt-4 grid gap-4 text-sm leading-relaxed text-[var(--muted)]">
            <p>
              <strong className="font-semibold text-[var(--fg)]">The undated rollouts can still land inside this window, because the pages have not closed them.</strong>{" "}
              That is a reading of their wording. It is not a forecast that they will.
            </p>
            <p>
              Pro dots and Business Premium dots are “rolling out gradually,” and “access may take several days.” Read
              on November 9, that sentence still covers the rest of this window if a given account does not have a dot
              yet. It does not prefer December over May.
            </p>
            <p>
              Texting “isn’t available for your account yet” is the help page’s instruction when the control is
              missing, with “try again later.” Later is not a month. U.S. Pro is the only group named.
            </p>
            <p>
              Chrome’s January 28, 2026 post said Personal Intelligence would come to Chrome “in the coming months.”
              That phrase is more than nine months old. The plans page read on November 9 lists early access to
              Personal Intelligence in AI Mode in the United States, which is Search, not a sentence about Chrome. This
              report does not treat the January phrase as a Chrome ship date inside the window. It is recorded so a
              later check can see whether Google replaced it.
            </p>
          </div>
        </section>

        <section className="mt-12">
          <h2 id="watch-for" className="text-2xl font-semibold tracking-tight">
            What should you watch for?
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[var(--muted)]">
            <strong className="font-semibold text-[var(--fg)]">Confirm these on a later read, or drop them.</strong>{" "}
            None of them has a day between now and May 9, 2027.
          </p>
          <ul className="mt-4 grid gap-3 text-sm leading-relaxed text-[var(--muted)]">
            <li>The Enterprise dot price. The help page describes flat rates or scaled consumption and does not print a dollar figure.</li>
            <li>Linux for OpenAI Computer Use. The desktop guide names macOS and Windows only.</li>
            <li>Claude computer use on Team and Enterprise. The help page says those plans do not have it.</li>
            <li>The Comet weekly browser-agent cap. Max is said to have the highest limit. The number is not printed.</li>
            <li>Whether the US$17 figure on Perplexity’s pricing page is the Pro plan. The retrieved text did not say so.</li>
            <li>Browser Use’s free-tier concurrency. The FAQ states the paid unlocks. The hero layout did not resolve to a sentence.</li>
            <li>A country for Chrome auto browse besides the United States and India. The plans page and the restrictions page stop at those two.</li>
            <li>A row-level OSWorld 2.0 chart that this read did not receive. Do not replace the printed 20.6 percent with a number from a third-party board.</li>
            <li>A current WebArena or WebVoyager score on a vendor page. The 89.1 percent post stays a 2024 self-report.</li>
          </ul>
        </section>

        <section className="mt-12">
          <h2 id="month-by-month" className="text-2xl font-semibold tracking-tight">
            What does each month from November 2026 to May 2027 contain?
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[var(--muted)]">
            <strong className="font-semibold text-[var(--fg)]">November has one date. The other six months are empty on purpose.</strong>{" "}
            An empty announcement means no linked source named that month. It is not a prediction that the month will
            be quiet.
          </p>
          <p className="mt-3 text-sm">
            <a className="text-[var(--link)] underline" href={`${path}/csv?table=months`}>
              Download the month table as CSV
            </a>
          </p>
          <div className="mt-5 grid gap-4">
            {months.map((item) => (
              <article key={item.month} className="glass rounded-3xl p-6">
                <h3 className="text-xl font-semibold tracking-tight">{item.month}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
                  <strong className="font-semibold text-[var(--fg)]">Announced. </strong>
                  {item.announced}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                  <strong className="font-semibold text-[var(--fg)]">Likely. </strong>
                  {item.likely}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                  <strong className="font-semibold text-[var(--fg)]">Watch for. </strong>
                  {item.watch}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-12">
          <h2 id="left-out" className="text-2xl font-semibold tracking-tight">
            What was left out?
          </h2>
          <ul className="mt-4 grid gap-3 text-sm leading-relaxed text-[var(--muted)]">
            <li>
              Project Mariner. A current Google status page for it did not load in this check, so this report does not
              date a shutdown or a successor.
            </li>
            <li>
              The October 2, 2025 Comet post that is often quoted as making the browser free. That post did not finish
              loading on November 9, so the date is not used. The Comet page and the pricing page are the sources
              instead.
            </li>
            <li>
              Claude’s product-page wording. The help center is the page this report uses for who can turn desktop
              computer use on. A separate product URL did not finish loading, so this report does not quote it.
            </li>
            <li>
              Dia, Fellou, Opera, Arc, Manus, and Skyvern. Their current price and availability were not read from the
              vendor on November 9, so they are not given a row.
            </li>
            <li>
              UI-TARS Desktop and MagenticLite. They are in{" "}
              <Link className="text-[var(--link)] underline" href="/best/computer-use-agents">
                Best computer use agents
              </Link>
              . This report did not re-read those repositories.
            </li>
            <li>
              Tencent Hy4. The computer-use sentence is in{" "}
              <Link className="text-[var(--link)] underline" href="/blog/tencent-releases-hy4-with-computer-use">
                the November 4 news note
              </Link>{" "}
              and in the general six-month outlook. This page does not re-check that post.
            </li>
            <li>
              Dollar prices for Claude Pro, Max, and Ultra. The help page names the plans and does not print the
              monthly price, and this report does not fill one in.
            </li>
            <li>
              Third-party OSWorld boards. If the number is not in the sentences on osworld-v2.xlang.ai, it is not in
              the table.
            </li>
          </ul>
        </section>

        <ToolCtas tools={["picker"]} />
        <FaqList
          heading="What else do people ask about browser and computer-use agents?"
          lead="Short answers from the same pages. A number that is not linked above is not added here."
          items={faq.map((item) => ({
            question: item.question,
            answer: <p>{item.answer}</p>,
          }))}
        />
        <div className="mt-12">
          <NewsletterSignup id="report-browser-computer" />
        </div>
      </ArticleTemplate>
    </>
  );
}
