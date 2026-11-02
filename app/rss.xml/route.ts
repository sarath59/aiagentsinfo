import { getBlogPosts } from "@/lib/blog";
import { getResearchDocs } from "@/lib/research";
import { absoluteUrl, site } from "@/lib/site";

function itemXml(input: {
  title: string;
  description: string;
  path: string;
  date: string;
}) {
  return `<item>
  <title><![CDATA[${input.title}]]></title>
  <link>${absoluteUrl(input.path)}</link>
  <guid>${absoluteUrl(input.path)}</guid>
  <pubDate>${new Date(input.date).toUTCString()}</pubDate>
  <description><![CDATA[${input.description}]]></description>
</item>`;
}

export async function GET() {
  const [posts, research] = await Promise.all([getBlogPosts(), getResearchDocs()]);
  const items = [
    ...posts.map((post) =>
      itemXml({
        title: post.title,
        description: post.description,
        path: `/blog/${post.slug}`,
        date: post.date,
      }),
    ),
    ...research.map((doc) =>
      itemXml({
        title: doc.title,
        description: doc.description,
        path: `/research/${doc.slug}`,
        date: doc.date,
      }),
    ),
  ].join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${site.name}</title>
    <link>${absoluteUrl("/")}</link>
    <description>${site.description}</description>
    <language>en-us</language>
    ${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  });
}
