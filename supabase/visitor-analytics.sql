-- First-party human analytics (replaces DataFast pageviews + goals).
-- Paste into the Supabase SQL editor for the same project as bot_hits.
-- RLS on, no policies: only SUPABASE_SECRET_KEY can read/write.

create table if not exists public.visitor_events (
  id bigint generated always as identity primary key,
  seen_at timestamptz not null default now(),
  day date not null default ((timezone('utc', now()))::date),
  event_type text not null check (event_type in ('pageview', 'goal', 'click')),
  name text not null default '',
  path text not null default '',
  visitor_id text not null,
  session_id text not null,
  referrer_host text not null default '',
  utm_source text not null default '',
  utm_medium text not null default '',
  utm_campaign text not null default '',
  ai_referrer text not null default '',
  meta jsonb not null default '{}'::jsonb,
  ua text not null default ''
);

create index if not exists visitor_events_day_idx on public.visitor_events (day desc);
create index if not exists visitor_events_type_day_idx on public.visitor_events (event_type, day desc);
create index if not exists visitor_events_path_day_idx on public.visitor_events (path, day desc);
create index if not exists visitor_events_name_day_idx on public.visitor_events (name, day desc);
create index if not exists visitor_events_visitor_idx on public.visitor_events (visitor_id, seen_at desc);
create index if not exists visitor_events_session_idx on public.visitor_events (session_id, seen_at);
create index if not exists visitor_events_ai_ref_idx on public.visitor_events (ai_referrer, day desc)
  where ai_referrer <> '';

alter table public.visitor_events enable row level security;

-- Daily overview (pageviews / visitors / sessions / goals).
create or replace view public.visitor_daily as
select
  day,
  count(*) filter (where event_type = 'pageview')::bigint as pageviews,
  count(distinct visitor_id) filter (where event_type = 'pageview')::bigint as visitors,
  count(distinct session_id) filter (where event_type = 'pageview')::bigint as sessions,
  count(*) filter (where event_type = 'goal')::bigint as goals,
  count(*) filter (where event_type = 'click')::bigint as clicks,
  count(*) filter (where ai_referrer <> '')::bigint as ai_referral_events
from public.visitor_events
group by day;

create or replace view public.visitor_page_counts as
select
  path,
  count(*) filter (where event_type = 'pageview')::bigint as pageviews,
  count(distinct visitor_id) filter (where event_type = 'pageview')::bigint as visitors,
  count(*) filter (where event_type = 'goal')::bigint as goals,
  count(*) filter (where ai_referrer <> '')::bigint as ai_referral_hits,
  max(seen_at) as last_seen_at
from public.visitor_events
group by path;

create or replace view public.visitor_goal_counts as
select
  name,
  count(*)::bigint as hits,
  count(distinct visitor_id)::bigint as visitors,
  count(distinct session_id)::bigint as sessions,
  max(seen_at) as last_seen_at
from public.visitor_events
where event_type = 'goal'
group by name;

create or replace view public.visitor_referrer_counts as
select
  coalesce(nullif(referrer_host, ''), '(direct)') as referrer_host,
  count(*) filter (where event_type = 'pageview')::bigint as pageviews,
  count(distinct visitor_id) filter (where event_type = 'pageview')::bigint as visitors,
  max(seen_at) as last_seen_at
from public.visitor_events
group by 1;

create or replace view public.visitor_ai_referrals as
select
  ai_referrer,
  path,
  count(*) filter (where event_type = 'pageview')::bigint as pageviews,
  count(distinct visitor_id)::bigint as visitors,
  count(distinct session_id)::bigint as sessions,
  max(seen_at) as last_seen_at
from public.visitor_events
where ai_referrer <> ''
group by ai_referrer, path;

-- Pair answer-bot fetches with human AI-referrer landings on the same path/day.
create or replace view public.ai_answer_to_visit as
select
  coalesce(b.day, v.day) as day,
  coalesce(b.path, v.path) as path,
  coalesce(b.answer_bot, v.ai_referrer) as channel,
  coalesce(b.bot_fetches, 0)::bigint as answer_bot_fetches,
  coalesce(v.human_landings, 0)::bigint as human_landings
from (
  select day, path,
    case
      when bot_token ilike '%chatgpt%' or bot_token = 'OAI-SearchBot' then 'chatgpt'
      when bot_token ilike '%claude%' then 'claude'
      when bot_token ilike '%perplexity%' then 'perplexity'
      when bot_token ilike '%google%' or bot_token ilike '%gemini%' then 'gemini'
      when bot_token ilike '%copilot%' or bot_token = 'Bingbot' then 'copilot'
      when bot_token ilike '%grok%' or bot_token ilike '%xai%' then 'grok'
      when bot_token ilike '%meta%' then 'meta'
      else lower(bot_token)
    end as answer_bot,
    count(*)::bigint as bot_fetches
  from public.bot_hits
  where purpose in ('answer', 'agent')
  group by 1, 2, 3
) b
full outer join (
  select day, path, ai_referrer, count(*)::bigint as human_landings
  from public.visitor_events
  where event_type = 'pageview' and ai_referrer <> ''
  group by 1, 2, 3
) v
  on b.day = v.day and b.path = v.path and b.answer_bot = v.ai_referrer;

-- Fixed funnels (pageview + goal steps), computed from visitor_events.
-- Prefer supabase/submission-analytics.sql for the latest submit funnel + rollups.
create or replace view public.visitor_funnel_submit as
with
cta as (
  select distinct session_id from public.visitor_events
  where event_type = 'goal' and name = 'submit_cta'
),
page as (
  select distinct session_id from public.visitor_events
  where event_type = 'pageview' and path = '/submit'
),
started as (
  select distinct session_id from public.visitor_events
  where event_type = 'goal' and name = 'form_started'
    and session_id in (select session_id from page)
),
attempted as (
  select distinct session_id from public.visitor_events
  where event_type = 'goal' and name = 'submit_attempt'
    and session_id in (select session_id from started)
),
submitted as (
  select distinct session_id from public.visitor_events
  where event_type = 'goal' and name in ('listing_submitted', 'submit_success')
    and session_id in (select session_id from attempted)
)
select * from (
  values
    (1, 'submit_cta', (select count(*) from cta)),
    (2, 'submit_page', (select count(*) from page)),
    (3, 'form_started', (select count(*) from started)),
    (4, 'submit_attempt', (select count(*) from attempted)),
    (5, 'listing_submitted', (select count(*) from submitted))
) as t(step_index, step_name, sessions);

create or replace view public.visitor_funnel_report_read as
with s1 as (
  select distinct session_id from public.visitor_events
  where event_type = 'goal' and name = 'report_view'
),
s2 as (
  select distinct session_id from public.visitor_events
  where event_type = 'goal' and name = 'report_read_50'
    and session_id in (select session_id from s1)
),
s3 as (
  select distinct session_id from public.visitor_events
  where event_type = 'goal' and name = 'report_read_complete'
    and session_id in (select session_id from s2)
)
select * from (
  values
    (1, 'report_view', (select count(*) from s1)),
    (2, 'report_read_50', (select count(*) from s2)),
    (3, 'report_read_complete', (select count(*) from s3))
) as t(step_index, step_name, sessions);

-- Citation monitoring scaffold (filled by a daily job when API keys exist).
create table if not exists public.ai_citation_prompts (
  id text primary key,
  prompt text not null,
  topic text not null default '',
  active boolean not null default true
);

create table if not exists public.ai_citation_checks (
  id bigint generated always as identity primary key,
  checked_at timestamptz not null default now(),
  day date not null default ((timezone('utc', now()))::date),
  prompt_id text not null references public.ai_citation_prompts(id),
  engine text not null check (engine in ('chatgpt', 'perplexity', 'gemini', 'claude')),
  cited boolean not null default false,
  position int,
  snippet text not null default '',
  competitors text not null default '',
  raw_ref text not null default ''
);

create index if not exists ai_citation_checks_day_idx on public.ai_citation_checks (day desc, engine);
alter table public.ai_citation_prompts enable row level security;
alter table public.ai_citation_checks enable row level security;

insert into public.ai_citation_prompts (id, prompt, topic) values
  ('best-ai-agent-directory', 'best AI agent directory', 'directory'),
  ('ai-agents-info', 'aiagentsinfo.com', 'brand'),
  ('ai-agent-frameworks', 'best AI agent frameworks 2026', 'frameworks'),
  ('devin-pricing', 'Devin pricing', 'pricing'),
  ('mcp-servers', 'best MCP servers for AI agents', 'mcp'),
  ('coding-agents', 'best AI coding agents', 'coding'),
  ('shopping-agents', 'AI shopping agents', 'shopping'),
  ('computer-use-agents', 'computer use AI agents', 'computer-use'),
  ('voice-agents', 'best AI voice agents', 'voice'),
  ('agent-cost-calculator', 'AI agent cost calculator', 'tools')
on conflict (id) do nothing;
