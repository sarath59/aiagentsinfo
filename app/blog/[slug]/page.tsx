import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleTemplate } from "@/components/ArticleTemplate";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SourceList } from "@/components/CompanyMarks";
import { ListYourAgent } from "@/components/ListYourAgent";
import { MarkdownBody } from "@/components/MarkdownBody";
import { NextRead, type NextReadItem } from "@/components/NextRead";
import { ToolCtas } from "@/components/ToolCtas";
import { categoryTitle, getBlogPost, getBlogPosts, relatedBlogPosts } from "@/lib/blog";
import { withTableDownloads } from "@/lib/html-tables";
import { JsonLd, articleJsonLd, datasetJsonLd, defaultMetadata, faqPageJsonLd } from "@/lib/seo";
import { site } from "@/lib/site";

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) return {};
  return defaultMetadata(post.title, post.description, `/blog/${post.slug}`, {
    openGraphType: "article",
    absoluteTitle: post.absoluteTitle === true,
  });
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [post, all] = await Promise.all([getBlogPost(slug), getBlogPosts()]);
  if (!post) notFound();
  const related = relatedBlogPosts(post, all);
  const nextRead = nextReadForPost(post.slug);
  const toc = [
    ...post.toc,
    ...(post.sources?.length ? [{ id: "sources", text: "Sources", level: 2 as const }] : []),
  ];

  return (
    <>
      <JsonLd
        data={articleJsonLd({
          title: post.title,
          description: post.description,
          path: `/blog/${post.slug}`,
          date: post.date,
          updated: post.updated,
          byline: post.byline ?? site.bylines.editorial,
          license: post.contentLicense === true,
        })}
      />
      {post.dataset ? (
        <JsonLd
          data={datasetJsonLd({
            title: post.dataset.title,
            description: post.dataset.description,
            path: `/blog/${post.slug}`,
            datePublished: post.date,
            dateModified: post.updated ?? post.date,
            isBasedOn: post.dataset.isBasedOn,
          })}
        />
      ) : null}
      {post.faq?.length ? <JsonLd data={faqPageJsonLd(post.faq)} /> : null}
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
          { name: post.title, path: `/blog/${post.slug}` },
        ]}
      />
      <ArticleTemplate
        category={categoryTitle(post.category)}
        title={post.title}
        description={post.description}
        published={post.date}
        updated={post.updated}
        readingMinutes={post.readingMinutes}
        byline={post.byline ?? site.bylines.editorial}
        companies={post.companies}
        takeaways={post.takeaways}
        toc={toc}
        sources={post.sources?.length ? <SourceList sources={post.sources} /> : undefined}
        related={related.map((item) => ({
          href: `/blog/${item.slug}`,
          title: item.title,
          description: item.description,
          kicker: categoryTitle(item.category),
          date: item.date,
          readingMinutes: item.readingMinutes,
        }))}
        actions={
          <Link className="btn-ghost px-4 py-2 text-sm" href="/editorial-policy">
            Editorial policy
          </Link>
        }
      >
        {nextRead ? <NextRead reads={nextRead.reads} tool={nextRead.tool} /> : null}
        <MarkdownBody
          sortable={
            post.slug === "claude-fable-5-2-vs-gpt-6-astra" || post.slug === "what-is-muse-ember"
          }
          html={withTableDownloads(post.html, `/blog/${post.slug}/tables`, {
            title: post.title,
            updated: post.updated ?? post.date,
            path: `/blog/${post.slug}`,
            showCite: true,
          })}
        />
        <ToolCtas tools={toolsForPost(post.slug, post.category)} />
        {nextRead ? <ListYourAgent /> : null}
      </ArticleTemplate>
    </>
  );
}

function toolsForPost(
  slug: string,
  category: string,
): ("calculator" | "roi" | "checker" | "picker" | "checklist" | "generator")[] {
  if (slug === "does-a-support-triage-agent-pay-back") return ["roi", "calculator"];
  if (slug === "how-much-does-an-ai-employee-cost") return ["roi", "calculator"];
  if (slug === "how-to-write-an-agents-md-coding-agents-follow") {
    return ["generator", "checklist", "checker", "picker"];
  }
  if (slug === "live-mcp-tool-json-token-counts") return ["checker", "calculator"];
  const tools: ("calculator" | "roi" | "checker" | "picker" | "checklist" | "generator")[] = [];
  if (/eval|harness|shopping/.test(slug)) tools.push("checklist");
  if (/pric|cost|token|harness|eval|chatgpt|recommended|fable-5-2|muse-ember/.test(slug)) {
    tools.push("calculator");
  }
  if (/prompt|tool-json|harness|eval|chatgpt|recommended/.test(slug)) tools.push("checker");
  if (category === "guide" || /agent|employee|shopping|computer|chatgpt|recommended/.test(slug)) {
    tools.push("picker");
  }
  return tools;
}

function nextReadForPost(slug: string): { reads: NextReadItem[]; tool: NextReadItem } | null {
  if (slug === "does-a-support-triage-agent-pay-back") {
    return {
      reads: [
        {
          href: "/agent-cost-calculator",
          title: "AI agent cost calculator",
          note: "A 30-day token bill from official prices, read November 9, 2026.",
        },
        {
          href: "/blog/claude-code-vs-codex-pricing",
          title: "Claude Code vs Codex pricing",
          note: "Seat prices. They are not a payback period.",
        },
        {
          href: "/glossary/human-in-the-loop",
          title: "Human in the loop",
          note: "The review minutes are a person still on the task.",
        },
        {
          href: "/reports/ai-agents-next-12-months",
          title: "AI agents, the next 12 months",
          note: "Dated filings and deadlines. Not a cost model.",
        },
      ],
      tool: {
        href: "/tools/ai-agent-roi-calculator?tasks=2000&minutes=8&rate=45&agent=0.04&success=80&review=2&rework=8&setup=2000&platform=150",
        title: "AI agent ROI calculator",
        note: "the support-triage example already filled in",
      },
    };
  }
  if (slug === "live-mcp-tool-json-token-counts") {
    return {
      reads: [
        {
          href: "/agent-prompt-checker",
          title: "Prompt and tool checker",
          note: "Paste a tools/list array. The server counts tokens and checks the shape. Nothing is stored.",
        },
        {
          href: "/research/mcphallu-mcp-agent-hallucinations",
          title: "MCPHallu: why MCP agents fail on unreachable goals",
          note: "Correct tool only, 84.7% pass. Correct tool plus a confusion tool, 32.3%.",
        },
        {
          href: "/mcp",
          title: "This site's MCP server",
          note: "Seven read-only tools. 973 tokens in the November 10 tools/list count.",
        },
      ],
      tool: {
        href: "/agent-prompt-checker",
        title: "prompt and tool checker",
        note: "schema and token check for a prompt and its tools",
      },
    };
  }
  if (slug === "how-to-write-an-agents-md-coding-agents-follow") {
    return {
      reads: [
        {
          href: "/tools/agents-md-generator",
          title: "AGENTS.md generator",
          note: "The same rules, as a form. Copy or download. Nothing is stored.",
        },
        {
          href: "/trackers/agents-md",
          title: "AGENTS.md adoption tracker",
          note: "Live filename counts, next to the October 2026 census.",
        },
        {
          href: "/research/how-many-repos-use-agents-md",
          title: "How many repos use AGENTS.md?",
          note: "6,006 of 22,854 popular repositories on October 16, 2026.",
        },
        {
          href: "/blog/what-is-an-ai-agent-harness",
          title: "What is an AI agent harness?",
          note: "The loop that can read a file like this before it edits a repo.",
        },
      ],
      tool: {
        href: "/tools/agents-md-generator",
        title: "AGENTS.md generator",
        note: "writes the file in the browser from your commands",
      },
    };
  }
  if (slug === "how-do-you-evaluate-an-ai-agent-harness") {
    return {
      reads: [
        {
          href: "/blog/how-to-build-an-eval-harness-for-ai-agents",
          title: "How to build an eval harness for AI agents",
          note: "Tasks, isolated trials, and graders, including Harbor and pytest.",
        },
        {
          href: "/blog/what-is-an-ai-agent-harness",
          title: "What is an AI agent harness?",
          note: "The loop, tools, memory, and stop rules around a model.",
        },
        {
          href: "/reports/agent-harness-benchmark-november-2026",
          title: "November 2026 harness benchmark",
          note: "Official SWE-bench and Terminal-Bench rows, each with a date.",
        },
        {
          href: "/best/ai-agent-evaluation-tools",
          title: "Best AI agent evaluation tools",
          note: "Libraries and hosted stacks, with licence and list price.",
        },
      ],
      tool: {
        href: "/tools/ai-agent-harness-evaluation-checklist",
        title: "harness evaluation checklist",
        note: "twelve sourced checks, counted in the browser",
      },
    };
  }
  if (slug === "how-to-build-an-eval-harness-for-ai-agents") {
    return {
      reads: [
        {
          href: "/blog/how-do-you-evaluate-an-ai-agent-harness",
          title: "How to evaluate an AI agent harness",
          note: "Behavioral checks versus an end-to-end destination score.",
        },
        {
          href: "/blog/what-is-an-ai-agent-harness",
          title: "What is an AI agent harness?",
          note: "The workshop the eval harness is scoring.",
        },
        {
          href: "/reports/agent-harness-benchmark-november-2026",
          title: "November 2026 harness benchmark",
          note: "Public boards, not a substitute for your own tasks.",
        },
        {
          href: "/best/ai-agent-evaluation-tools",
          title: "Best AI agent evaluation tools",
          note: "Inspect, Promptfoo, and the hosted companions.",
        },
      ],
      tool: {
        href: "/tools/ai-agent-harness-evaluation-checklist",
        title: "harness evaluation checklist",
        note: "twelve sourced checks, counted in the browser",
      },
    };
  }
  if (slug === "how-to-get-your-ai-tool-recommended-by-chatgpt-and-google") {
    return {
      reads: [
        {
          href: "/submit",
          title: "Submit your tool",
          note: "No login. A valid listing is usually live in about two minutes.",
        },
        {
          href: "/blog/how-do-ai-agents-work",
          title: "How do AI agents work?",
          note: "The loop an assistant is running when it might cite you.",
        },
        {
          href: "/mcp",
          title: "Directory MCP server",
          note: "A public, read-only way for assistants to search this catalog.",
        },
        {
          href: "/editorial-policy#directory",
          title: "How listings are published",
          note: "Thin community blurbs stay out of the sitemap.",
        },
      ],
      tool: {
        href: "/tools/agent-picker",
        title: "agent picker",
        note: "four questions, then three directory listings",
      },
    };
  }
  if (slug === "what-is-an-ai-agent-harness") {
    return {
      reads: [
        {
          href: "/blog/how-do-you-evaluate-an-ai-agent-harness",
          title: "How to evaluate an AI agent harness",
          note: "One observable action, then the whole job.",
        },
        {
          href: "/blog/how-to-build-an-eval-harness-for-ai-agents",
          title: "How to build an eval harness for AI agents",
          note: "Isolate trials, grade the environment, keep a held-out set.",
        },
        {
          href: "/reports/agent-harness-benchmark-november-2026",
          title: "November 2026 harness benchmark",
          note: "Dated public scores with the harness named on the row.",
        },
        {
          href: "/best/ai-agent-harnesses",
          title: "Best AI agent harness",
          note: "Licence, list price, and platform from official pages.",
        },
      ],
      tool: {
        href: "/tools/agent-picker",
        title: "agent picker",
        note: "four questions, then three directory listings",
      },
    };
  }
  if (slug === "what-is-claude-fable-5-2") {
    return {
      reads: [
        {
          href: "/blog/claude-fable-5-2-vs-gpt-6-astra",
          title: "Claude Fable 5.2 vs GPT-6 Astra for coding agents",
          note: "Dated scores, prices, and context windows, with a verdict per job.",
        },
        {
          href: "/blog/how-to-use-claude-fable-5-2-in-an-agent-harness",
          title: "How to use Claude Fable 5.2 in an agent harness",
          note: "Claude Code, the Agent SDK, MCP, and a worked token bill.",
        },
        {
          href: "/directory/claude",
          title: "Claude in the directory",
          note: "The product page, separate from the model API rates.",
        },
        {
          href: "/best/ai-agent-harnesses",
          title: "Best AI agent harness",
          note: "Licence, list price, and platform from official pages.",
        },
      ],
      tool: {
        href: "/agent-cost-calculator",
        title: "cost calculator",
        note: "standard per-token rates, including Claude Fable 5.2",
      },
    };
  }
  if (slug === "claude-fable-5-2-vs-gpt-6-astra") {
    return {
      reads: [
        {
          href: "/blog/how-to-use-claude-fable-5-2-in-an-agent-harness",
          title: "How to use Claude Fable 5.2 in an agent harness",
          note: "The model id, effort defaults, and the $1.00 example turn.",
        },
        {
          href: "/blog/what-is-claude-fable-5-2",
          title: "What is Claude Fable 5.2?",
          note: "The 1,000-agent harness and the four API breaks.",
        },
        {
          href: "/blog/claude-code-vs-codex-pricing",
          title: "Claude Code vs Codex pricing",
          note: "Plan prices, separate from the API token rates.",
        },
        {
          href: "/best/ai-agent-harnesses",
          title: "Best AI agent harness",
          note: "The software around the model.",
        },
      ],
      tool: {
        href: "/agent-cost-calculator",
        title: "cost calculator",
        note: "multiply your own token counts by the standard rates",
      },
    };
  }
  if (slug === "what-is-muse-ember") {
    return {
      reads: [
        {
          href: "/directory/muse-ember",
          title: "Muse Ember in the directory",
          note: "Model id, token rates, and the API page.",
        },
        {
          href: "/blog/what-is-claude-fable-5-2",
          title: "What is Claude Fable 5.2?",
          note: "The other November 9 model, for long sessions at $8 and $40.",
        },
        {
          href: "/blog/what-is-an-ai-agent-harness",
          title: "What is an AI agent harness?",
          note: "The loop that would call Ember as the worker.",
        },
        {
          href: "/best/ai-agent-harnesses",
          title: "Best AI agent harness",
          note: "Licence, list price, and platform from official pages.",
        },
      ],
      tool: {
        href: "/agent-cost-calculator",
        title: "cost calculator",
        note: "Haiku 5.5 and GPT-6 Luna rates, next to Ember’s table",
      },
    };
  }
  if (slug === "voice-ai-agent-cost-per-call-november-2026") {
    return {
      reads: [
        {
          href: "/blog/what-is-elevenagents-campaign-manager",
          title: "What is ElevenAgents Campaign Manager?",
          note: "The outbound runner. The docs page does not add a separate fee.",
        },
        {
          href: "/directory/elevenlabs",
          title: "ElevenLabs in the directory",
          note: "The product under the $0.08 minute.",
        },
        {
          href: "/agent-cost-calculator",
          title: "AI agent cost calculator",
          note: "Token prices. Not a voice-minute invoice.",
        },
        {
          href: "/glossary/harness",
          title: "What a harness is",
          note: "The loop around the model a voice minute does not include.",
        },
      ],
      tool: {
        href: "/agent-cost-calculator",
        title: "cost calculator",
        note: "a 30-day token bill, with no voice-minute rate",
      },
    };
  }
  if (slug === "what-is-elevenagents-campaign-manager") {
    return {
      reads: [
        {
          href: "/blog/voice-ai-agent-cost-per-call-november-2026",
          title: "What a voice AI agent costs per call",
          note: "1,000 three-minute calls, with the model in or out of the sticker.",
        },
        {
          href: "/directory/elevenlabs",
          title: "ElevenLabs in the directory",
          note: "Plan prices last checked November 3, plus the November 9 campaign runner.",
        },
        {
          href: "/blog/how-do-ai-agents-work",
          title: "How do AI agents work?",
          note: "The loop a voice agent still has to run.",
        },
        {
          href: "/directory/category/voice",
          title: "Voice agents in the directory",
          note: "The audio listings, with each vendor’s own page.",
        },
        {
          href: "/glossary/guardrail",
          title: "What a guardrail is",
          note: "A check that allows, blocks, rewrites, or pauses one action.",
        },
      ],
      tool: {
        href: "/tools/agent-picker",
        title: "agent picker",
        note: "four questions, then three directory listings",
      },
    };
  }
  if (slug === "which-ai-agent-framework-do-people-install") {
    return {
      reads: [
        {
          href: "/trackers/downloads",
          title: "Framework downloads tracker",
          note: "The live PyPI and npm counts. A download is a file request.",
        },
        {
          href: "/reports/agent-harness-benchmark-november-2026",
          title: "November 2026 harness benchmark",
          note: "Public scores, which answer a different question from an install count.",
        },
        {
          href: "/blog/how-do-you-evaluate-an-ai-agent-harness",
          title: "How to evaluate an AI agent harness",
          note: "One observable action, then whether the job still finishes.",
        },
        {
          href: "/reports/ai-shopping-agents-next-6-months",
          title: "AI shopping agents, the next 6 months",
          note: "What six companies have dated for shopping agents.",
        },
      ],
      tool: {
        href: "/tools/ai-agent-harness-evaluation-checklist",
        title: "harness evaluation checklist",
        note: "twelve sourced checks, counted in the browser",
      },
    };
  }
  if (slug === "can-an-ai-shopping-agent-check-out-for-you") {
    return {
      reads: [
        {
          href: "/research/agentic-commerce-protocol-adoption-november-2026",
          title: "Which commerce protocol developers install",
          note: "@x402/core had 1,940,555 npm downloads. ACP and AP2 publish no package.",
        },
        {
          href: "/blog/how-to-make-your-store-readable-by-ai-shopping-agents",
          title: "How to make your store readable by AI shopping agents",
          note: "The feed fields and checkout flags a merchant publishes.",
        },
        {
          href: "/reports/ai-shopping-agents-next-6-months",
          title: "AI shopping agents, the next 6 months",
          note: "What six companies have dated through May 2027.",
        },
        {
          href: "/best/ai-agents-for-shopping",
          title: "Best AI agent for shopping",
          note: "Licence, list price, and checkout path from official pages.",
        },
      ],
      tool: {
        href: "/tools/ai-agent-harness-evaluation-checklist",
        title: "harness evaluation checklist",
        note: "twelve sourced checks, counted in the browser",
      },
    };
  }
  if (slug === "ucp-vs-acp-spec-versions-november-2026") {
    return {
      reads: [
        {
          href: "/research/agentic-commerce-protocol-adoption-november-2026",
          title: "Which commerce protocol developers install",
          note: "Stars, commits, and registry downloads, read November 11.",
        },
        {
          href: "/reports/ai-shopping-agents-next-6-months",
          title: "AI shopping agents, the next 6 months",
          note: "What six companies have dated through May 2027.",
        },
        {
          href: "/blog/can-an-ai-shopping-agent-check-out-for-you",
          title: "Can an AI shopping agent check out for you?",
          note: "Who can pay today, and who still sends you to the store.",
        },
        {
          href: "/glossary/agentic-checkout",
          title: "Agentic checkout",
          note: "The checkout path a spec version still has to implement.",
        },
      ],
      tool: {
        href: "/tools/ai-agent-harness-evaluation-checklist",
        title: "harness evaluation checklist",
        note: "twelve sourced checks, counted in the browser",
      },
    };
  }
  if (slug === "how-to-make-your-store-readable-by-ai-shopping-agents") {
    return {
      reads: [
        {
          href: "/reports/ai-shopping-agents-next-6-months",
          title: "AI shopping agents, the next 6 months",
          note: "The dated record for six companies, through May 2027.",
        },
        {
          href: "/blog/can-an-ai-shopping-agent-check-out-for-you",
          title: "Can an AI shopping agent check out for you?",
          note: "Who can pay today, and who still sends you to the store.",
        },
        {
          href: "/blog/how-do-you-evaluate-an-ai-agent-harness",
          title: "How to evaluate an AI agent harness",
          note: "How to test the software that calls the feed.",
        },
        {
          href: "/reports/agent-harness-benchmark-november-2026",
          title: "November 2026 harness benchmark",
          note: "Public coding scores, a different job from a product feed.",
        },
      ],
      tool: {
        href: "/tools/ai-agent-harness-evaluation-checklist",
        title: "harness evaluation checklist",
        note: "twelve sourced checks, counted in the browser",
      },
    };
  }
  if (slug === "how-to-use-claude-fable-5-2-in-an-agent-harness") {
    return {
      reads: [
        {
          href: "/blog/claude-fable-5-2-vs-gpt-6-astra",
          title: "Claude Fable 5.2 vs GPT-6 Astra for coding agents",
          note: "Which job the published scores actually pick.",
        },
        {
          href: "/blog/what-is-claude-fable-5-2",
          title: "What is Claude Fable 5.2?",
          note: "The release, the price table, and the 1,000-agent run.",
        },
        {
          href: "/blog/what-is-an-ai-agent-harness",
          title: "What is an AI agent harness?",
          note: "The loop, tools, memory, and stop rules around a model.",
        },
        {
          href: "/directory/claude-agent-sdk",
          title: "Claude Agent SDK",
          note: "The directory listing for the SDK this guide configures.",
        },
      ],
      tool: {
        href: "/agent-cost-calculator",
        title: "cost calculator",
        note: "standard rates for the token counts you measured",
      },
    };
  }
  return null;
}
