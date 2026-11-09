export const FOUNDER_READING_SLUGS = [
  "how-to-get-your-ai-tool-recommended-by-chatgpt-and-google",
  "how-do-ai-agents-work",
  "how-do-you-evaluate-an-ai-agent-harness",
] as const;

export type FollowupCard = {
  href: string;
  title: string;
  description: string;
  kicker: string;
};

const BLOG_KICKERS: Record<string, string> = {
  explainer: "Explainers",
  news: "News",
  guide: "Guides",
  tools: "Tools",
};

export const FOUNDER_TOOLS: FollowupCard[] = [
  {
    href: "/tools/agent-picker",
    kicker: "Picker",
    title: "Which AI agent fits me?",
    description: "Four questions, then three directory listings that match. No login.",
  },
  {
    href: "/agent-cost-calculator",
    kicker: "Calculator",
    title: "AI agent cost calculator",
    description: "A 30-day token bill from official per-token prices. No login.",
  },
  {
    href: "/agent-prompt-checker",
    kicker: "Checker",
    title: "Prompt and tool checker",
    description: "Paste a system prompt and tool JSON. The prompt is not stored.",
  },
];

export function founderReadingCards(
  posts: { slug: string; title: string; description: string; category: string }[],
): FollowupCard[] {
  const bySlug = new Map(posts.map((post) => [post.slug, post]));
  return FOUNDER_READING_SLUGS.flatMap((slug) => {
    const post = bySlug.get(slug);
    if (!post) return [];
    return [
      {
        href: `/blog/${post.slug}`,
        title: post.title,
        description: post.description,
        kicker: BLOG_KICKERS[post.category] ?? "Guides",
      },
    ];
  }).slice(0, 3);
}
