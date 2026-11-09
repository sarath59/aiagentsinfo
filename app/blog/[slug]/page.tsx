import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleTemplate } from "@/components/ArticleTemplate";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SourceList } from "@/components/CompanyMarks";
import { ListYourAgent } from "@/components/ListYourAgent";
import { MarkdownBody } from "@/components/MarkdownBody";
import { NewsletterSignup } from "@/components/newsletter/NewsletterSignup";
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
          html={withTableDownloads(post.html, `/blog/${post.slug}/tables`, {
            title: post.title,
            updated: post.updated ?? post.date,
            path: `/blog/${post.slug}`,
            showCite: true,
          })}
        />
        <ToolCtas tools={toolsForPost(post.slug, post.category)} />
        {nextRead ? <ListYourAgent /> : null}
        <div className="mt-14">
          <NewsletterSignup id="article" />
        </div>
      </ArticleTemplate>
    </>
  );
}

function toolsForPost(slug: string, category: string) {
  const tools: ("calculator" | "checker" | "picker")[] = [];
  if (/pric|cost|token|harness|eval|chatgpt|recommended/.test(slug)) tools.push("calculator");
  if (/prompt|tool-json|harness|eval|chatgpt|recommended/.test(slug)) tools.push("checker");
  if (category === "guide" || /agent|employee|shopping|computer|chatgpt|recommended/.test(slug)) {
    tools.push("picker");
  }
  return tools;
}

function nextReadForPost(slug: string): { reads: NextReadItem[]; tool: NextReadItem } | null {
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
        href: "/agent-prompt-checker",
        title: "prompt checker",
        note: "counts tokens and checks tool JSON in the browser",
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
        href: "/agent-prompt-checker",
        title: "prompt checker",
        note: "tool JSON is part of the harness you are testing",
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
  return null;
}
