-- Extra citation prompts + summary view. Safe to re-run.

insert into public.ai_citation_prompts (id, prompt, topic) values
  ('best-ai-agents-2026', 'best AI agents for business 2026', 'directory'),
  ('agent-harness', 'best AI agent harnesses', 'harness'),
  ('openai-agents-sdk', 'OpenAI Agents SDK vs Claude Agent SDK', 'frameworks'),
  ('langgraph-vs-crewai', 'LangGraph vs CrewAI vs Autogen', 'frameworks'),
  ('ai-agent-benchmarks', 'AI agent benchmarks 2026', 'benchmarks'),
  ('llms-txt', 'what is llms.txt for AI crawlers', 'seo'),
  ('get-recommended-chatgpt', 'how to get your AI tool recommended by ChatGPT', 'seo'),
  ('mcp-config', 'MCP server config generator', 'tools'),
  ('web-search-api-agents', 'web search API prices for AI agents', 'pricing'),
  ('ai-shopping-agents', 'best AI shopping agents', 'shopping'),
  ('browser-use-agents', 'browser use AI agents', 'computer-use'),
  ('list-ai-agent', 'where to list my AI agent directory', 'directory'),
  ('ai-agents-info-reports', 'aiagentsinfo.com reports', 'brand'),
  ('enterprise-agent-platforms', 'enterprise AI agent platforms', 'enterprise'),
  ('voice-agent-platforms', 'best voice AI agent platforms', 'voice')
on conflict (id) do nothing;

create or replace view public.ai_citation_summary as
select
  day,
  engine,
  count(*)::bigint as checks,
  count(*) filter (where cited)::bigint as cited,
  round(100.0 * count(*) filter (where cited) / nullif(count(*), 0), 1) as cite_rate_pct,
  count(distinct prompt_id)::bigint as prompts
from public.ai_citation_checks
group by day, engine;

create or replace view public.ai_citation_by_prompt as
select
  prompt_id,
  engine,
  count(*)::bigint as checks,
  count(*) filter (where cited)::bigint as cited,
  round(avg(position) filter (where cited), 1) as avg_position,
  max(checked_at) as last_checked_at
from public.ai_citation_checks
group by prompt_id, engine;
