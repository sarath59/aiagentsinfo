-- AI / crawler tracking for aiagentsinfo.com
-- Paste into the Supabase SQL editor (safe to re-run). RLS on, no policies:
-- only SUPABASE_SECRET_KEY can read/write. Query via BOT_TRACKING_API_KEY routes.

create table if not exists public.bot_hits (
  id bigint generated always as identity primary key,
  seen_at timestamptz not null default now(),
  day date not null default ((timezone('utc', now()))::date),
  bot_token text not null,
  operator text not null default '',
  purpose text not null default 'other'
    check (purpose in ('answer', 'search', 'training', 'agent', 'corpus', 'ads', 'other')),
  path text not null,
  kind text not null check (kind in ('view', 'interact', 'discover')),
  method text not null default 'GET',
  accept text not null default '',
  referer_host text not null default '',
  query_keys text not null default '',
  ua text not null default '',
  session_id text not null default '',
  status int not null default 0,
  ip_hash text not null default '',
  ip_verified text not null default 'unknown'
    check (ip_verified in ('verified', 'unverified', 'unknown')),
  accept_html boolean not null default false,
  accept_markdown boolean not null default false,
  accept_json boolean not null default false,
  known boolean not null default true
);

alter table public.bot_hits add column if not exists session_id text not null default '';
alter table public.bot_hits add column if not exists status int not null default 0;
alter table public.bot_hits add column if not exists ip_hash text not null default '';
alter table public.bot_hits add column if not exists ip_verified text not null default 'unknown';
alter table public.bot_hits add column if not exists accept_html boolean not null default false;
alter table public.bot_hits add column if not exists accept_markdown boolean not null default false;
alter table public.bot_hits add column if not exists accept_json boolean not null default false;
alter table public.bot_hits add column if not exists known boolean not null default true;

create index if not exists bot_hits_bot_day_idx on public.bot_hits (bot_token, day desc);
create index if not exists bot_hits_path_day_idx on public.bot_hits (path, day desc);
create index if not exists bot_hits_seen_at_idx on public.bot_hits (seen_at desc);
create index if not exists bot_hits_purpose_day_idx on public.bot_hits (purpose, day desc);
create index if not exists bot_hits_kind_day_idx on public.bot_hits (kind, day desc);
create index if not exists bot_hits_session_idx on public.bot_hits (session_id, seen_at);
create index if not exists bot_hits_known_idx on public.bot_hits (known, seen_at desc);
create index if not exists bot_hits_ip_verified_idx on public.bot_hits (ip_verified, day desc);

alter table public.bot_hits enable row level security;

create table if not exists public.bot_registry (
  bot_token text primary key,
  operator text not null default '',
  purpose text not null default 'other',
  first_seen_at timestamptz not null default now(),
  last_seen_at timestamptz not null default now(),
  hits bigint not null default 0,
  sample_path text not null default '',
  sample_ua text not null default ''
);

alter table public.bot_registry enable row level security;

create table if not exists public.bot_unknown_samples (
  ua_hash text primary key,
  ua text not null,
  first_seen_at timestamptz not null default now(),
  last_seen_at timestamptz not null default now(),
  hits bigint not null default 0,
  sample_path text not null default '',
  reviewed boolean not null default false
);

alter table public.bot_unknown_samples enable row level security;

create table if not exists public.bot_alerts (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  bot_token text not null,
  operator text not null default '',
  purpose text not null default '',
  sample_path text not null default '',
  sample_ua text not null default '',
  delivered boolean not null default false
);

create index if not exists bot_alerts_created_idx on public.bot_alerts (created_at desc);
alter table public.bot_alerts enable row level security;

-- Atomic insert + registry + unknown sampler + optional new-agent alert row.
create or replace function public.record_bot_hit(p_hit jsonb)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_token text := left(coalesce(p_hit->>'bot_token', ''), 80);
  v_is_new boolean := false;
  v_id bigint;
begin
  if v_token = '' then
    return jsonb_build_object('ok', false, 'error', 'missing_bot_token');
  end if;

  insert into public.bot_hits (
    bot_token, operator, purpose, path, kind, method, accept, referer_host, query_keys, ua,
    session_id, status, ip_hash, ip_verified, accept_html, accept_markdown, accept_json, known
  ) values (
    v_token,
    left(coalesce(p_hit->>'operator', ''), 80),
    coalesce(nullif(p_hit->>'purpose', ''), 'other'),
    left(coalesce(p_hit->>'path', '/'), 500),
    coalesce(nullif(p_hit->>'kind', ''), 'view'),
    left(coalesce(p_hit->>'method', 'GET'), 16),
    left(coalesce(p_hit->>'accept', ''), 120),
    left(coalesce(p_hit->>'referer_host', ''), 120),
    left(coalesce(p_hit->>'query_keys', ''), 200),
    left(coalesce(p_hit->>'ua', ''), 180),
    left(coalesce(p_hit->>'session_id', ''), 64),
    coalesce((p_hit->>'status')::int, 0),
    left(coalesce(p_hit->>'ip_hash', ''), 64),
    coalesce(nullif(p_hit->>'ip_verified', ''), 'unknown'),
    coalesce((p_hit->>'accept_html')::boolean, false),
    coalesce((p_hit->>'accept_markdown')::boolean, false),
    coalesce((p_hit->>'accept_json')::boolean, false),
    coalesce((p_hit->>'known')::boolean, true)
  )
  returning id into v_id;

  select not exists (
    select 1 from public.bot_registry r where r.bot_token = v_token
  ) into v_is_new;

  insert into public.bot_registry as r (
    bot_token, operator, purpose, first_seen_at, last_seen_at, hits, sample_path, sample_ua
  ) values (
    v_token,
    left(coalesce(p_hit->>'operator', ''), 80),
    coalesce(nullif(p_hit->>'purpose', ''), 'other'),
    now(), now(), 1,
    left(coalesce(p_hit->>'path', '/'), 500),
    left(coalesce(p_hit->>'ua', ''), 180)
  )
  on conflict (bot_token) do update set
    last_seen_at = now(),
    hits = r.hits + 1,
    operator = excluded.operator,
    purpose = excluded.purpose;

  if coalesce((p_hit->>'known')::boolean, true) = false then
    insert into public.bot_unknown_samples as u (
      ua_hash, ua, first_seen_at, last_seen_at, hits, sample_path
    ) values (
      left(coalesce(nullif(p_hit->>'ua_hash', ''), p_hit->>'ip_hash', v_token), 64),
      left(coalesce(p_hit->>'ua', 'unknown'), 180),
      now(), now(), 1,
      left(coalesce(p_hit->>'path', '/'), 500)
    )
    on conflict (ua_hash) do update set
      last_seen_at = now(),
      hits = u.hits + 1,
      ua = excluded.ua,
      sample_path = excluded.sample_path;
  end if;

  if v_is_new then
    insert into public.bot_alerts (bot_token, operator, purpose, sample_path, sample_ua)
    values (
      v_token,
      left(coalesce(p_hit->>'operator', ''), 80),
      coalesce(nullif(p_hit->>'purpose', ''), 'other'),
      left(coalesce(p_hit->>'path', '/'), 500),
      left(coalesce(p_hit->>'ua', ''), 180)
    );
  end if;

  return jsonb_build_object('ok', true, 'id', v_id, 'is_new', coalesce(v_is_new, false));
end;
$$;

revoke all on function public.record_bot_hit(jsonb) from public;
-- Only the server secret key (service role) may call this. Do not expose to anon.
grant execute on function public.record_bot_hit(jsonb) to service_role;

create or replace view public.bot_counts as
select
  bot_token,
  operator,
  purpose,
  sum(case when kind in ('view', 'discover') then 1 else 0 end)::bigint as views,
  sum(case when kind = 'interact' then 1 else 0 end)::bigint as interacts,
  count(*)::bigint as hits,
  count(distinct path)::bigint as paths,
  count(*) filter (where ip_verified = 'verified')::bigint as ip_verified_hits,
  max(seen_at) as last_seen_at
from public.bot_hits
group by bot_token, operator, purpose;

create or replace view public.bot_page_counts as
select
  bot_token,
  operator,
  purpose,
  path,
  sum(case when kind in ('view', 'discover') then 1 else 0 end)::bigint as views,
  sum(case when kind = 'interact' then 1 else 0 end)::bigint as interacts,
  count(*)::bigint as hits,
  max(seen_at) as last_seen_at
from public.bot_hits
group by bot_token, operator, purpose, path;

create or replace view public.bot_daily_counts as
select
  day,
  bot_token,
  operator,
  purpose,
  sum(case when kind in ('view', 'discover') then 1 else 0 end)::bigint as views,
  sum(case when kind = 'interact' then 1 else 0 end)::bigint as interacts,
  count(*)::bigint as hits,
  count(distinct path)::bigint as paths
from public.bot_hits
group by day, bot_token, operator, purpose;

create or replace view public.bot_session_summary as
select
  session_id,
  bot_token,
  operator,
  purpose,
  min(seen_at) as started_at,
  max(seen_at) as ended_at,
  count(*)::bigint as hits,
  count(distinct path)::bigint as paths,
  bool_or(path = '/robots.txt') as hit_robots,
  bool_or(path in ('/llms.txt', '/llms-full.txt')) as hit_llms,
  bool_or(path = '/sitemap.xml') as hit_sitemap,
  bool_or(kind = 'interact') as hit_interact,
  bool_or(
    kind = 'view'
    and path not in ('/robots.txt', '/llms.txt', '/llms-full.txt', '/sitemap.xml', '/rss.xml', '/manifest.webmanifest', '/favicon.ico')
  ) as hit_content,
  bool_or(accept_markdown) as asked_markdown,
  bool_or(accept_json) as asked_json,
  bool_or(ip_verified = 'verified') as any_ip_verified,
  max(status) as max_status
from public.bot_hits
where session_id <> ''
group by session_id, bot_token, operator, purpose;

create or replace view public.bot_discovery_funnel as
select
  purpose,
  bot_token,
  count(*)::bigint as sessions,
  count(*) filter (where hit_robots)::bigint as with_robots,
  count(*) filter (where hit_llms)::bigint as with_llms,
  count(*) filter (where hit_sitemap)::bigint as with_sitemap,
  count(*) filter (where hit_content)::bigint as with_content,
  count(*) filter (where hit_robots and hit_llms)::bigint as robots_then_llms,
  count(*) filter (where hit_llms and hit_content)::bigint as llms_then_content,
  count(*) filter (where hit_robots and hit_content)::bigint as robots_then_content,
  count(*) filter (where hit_interact)::bigint as with_interact
from public.bot_session_summary
group by purpose, bot_token;

create or replace view public.bot_accept_stats as
select
  bot_token,
  operator,
  purpose,
  count(*)::bigint as hits,
  count(*) filter (where accept_html)::bigint as accept_html,
  count(*) filter (where accept_markdown)::bigint as accept_markdown,
  count(*) filter (where accept_json)::bigint as accept_json,
  count(*) filter (where accept = '' or accept = '*/*')::bigint as accept_empty_or_star
from public.bot_hits
group by bot_token, operator, purpose;

create or replace view public.bot_answer_vs_training as
select
  path,
  sum(case when purpose = 'answer' then 1 else 0 end)::bigint as answer_hits,
  sum(case when purpose = 'training' then 1 else 0 end)::bigint as training_hits,
  sum(case when purpose = 'search' then 1 else 0 end)::bigint as search_hits,
  sum(case when purpose = 'agent' then 1 else 0 end)::bigint as agent_hits,
  count(distinct bot_token) filter (where purpose = 'answer')::bigint as answer_bots,
  count(distinct bot_token) filter (where purpose = 'training')::bigint as training_bots,
  max(seen_at) filter (where purpose = 'answer') as last_answer_at,
  max(seen_at) filter (where purpose = 'training') as last_training_at
from public.bot_hits
where kind in ('view', 'discover')
group by path
having
  sum(case when purpose = 'answer' then 1 else 0 end) > 0
  or sum(case when purpose = 'training' then 1 else 0 end) > 0;
