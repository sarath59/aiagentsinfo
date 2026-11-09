import assert from "node:assert/strict";
import {
  compareAgents,
  getAgent,
  listCategories,
  listComparisons,
  listFreeTools,
  mcpServerJson,
  mcpToolDocs,
  searchAgents,
  searchResearch,
} from "../lib/mcp";

function parse(result: { content: { type: string; text: string }[]; isError?: boolean }) {
  assert.equal(result.content[0]?.type, "text");
  return JSON.parse(result.content[0].text) as Record<string, unknown>;
}

async function main() {
  assert.equal(mcpServerJson.remotes[0]?.url, "https://www.aiagentsinfo.com/api/mcp");
  assert.ok(mcpServerJson.description.length <= 100);
  assert.equal(mcpToolDocs.length, 7);

  const categories = parse(await listCategories());
  assert.ok((categories.count as number) > 0);
  assert.ok(String(categories.directory_url).startsWith("https://www.aiagentsinfo.com/directory"));

  const search = parse(await searchAgents({ query: "langchain", limit: 5 }));
  assert.ok((search.total_matches as number) >= 1);
  const first = (search.listings as { slug: string; url: string }[])[0];
  assert.equal(first.slug, "langchain");
  assert.equal(first.url, "https://www.aiagentsinfo.com/directory/langchain");

  const agent = parse(await getAgent({ slug: "langchain" }));
  assert.equal(agent.slug, "langchain");
  assert.equal(agent.url, "https://www.aiagentsinfo.com/directory/langchain");
  assert.ok(Array.isArray(agent.features));

  const missing = await getAgent({ slug: "this-slug-does-not-exist" });
  assert.equal(missing.isError, true);

  const compared = parse(await compareAgents({ slugs: "langchain,crewai" }));
  const agents = compared.agents as { slug: string }[];
  assert.equal(agents.length, 2);

  const research = parse(await searchResearch({ query: "harness", limit: 3 }));
  assert.ok((research.count as number) >= 1);
  const note = (research.research as { url: string }[])[0];
  assert.ok(note.url.startsWith("https://www.aiagentsinfo.com/research/"));

  const free = parse(await listFreeTools({ limit: 10 }));
  assert.ok((free.count as number) >= 1);
  const siteTools = free.site_tools as { url: string }[];
  assert.ok(siteTools.some((tool) => tool.url.includes("/agent-cost-calculator")));

  const comparisons = parse(await listComparisons({ query: "coding" }));
  assert.ok((comparisons.count as number) >= 1);
  const page = (comparisons.comparisons as { url: string }[])[0];
  assert.ok(page.url.startsWith("https://www.aiagentsinfo.com/best/"));

  console.log("mcp-selftest: ok");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
