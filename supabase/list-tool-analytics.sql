-- Paid list-your-tool funnel rollups. Safe to re-run.

create or replace view public.visitor_funnel_list_tool as
with
cta as (
  select distinct session_id from public.visitor_events
  where event_type = 'goal' and name = 'list_tool_cta'
),
page as (
  select distinct session_id from public.visitor_events
  where event_type = 'goal' and name = 'list_tool_page_view'
),
dwell as (
  select distinct session_id from public.visitor_events
  where event_type = 'goal' and name = 'list_tool_dwell_30'
    and session_id in (select session_id from page)
),
buy as (
  select distinct session_id from public.visitor_events
  where event_type = 'goal' and name = 'list_tool_buy_click'
    and session_id in (select session_id from page)
)
select * from (
  values
    (1, 'list_tool_cta', (select count(*) from cta)),
    (2, 'list_tool_page_view', (select count(*) from page)),
    (3, 'list_tool_dwell_30', (select count(*) from dwell)),
    (4, 'list_tool_buy_click', (select count(*) from buy))
) as t(step_index, step_name, sessions);

create or replace view public.list_tool_goal_counts as
select
  name,
  count(*)::bigint as hits,
  count(distinct visitor_id)::bigint as visitors,
  count(distinct session_id)::bigint as sessions,
  max(seen_at) as last_seen_at
from public.visitor_events
where event_type = 'goal'
  and name in (
    'list_tool_cta',
    'list_tool_page_view',
    'list_tool_dwell_15',
    'list_tool_dwell_30',
    'list_tool_dwell_60',
    'list_tool_dwell_120',
    'list_tool_scroll_50',
    'list_tool_scroll_90',
    'list_tool_section',
    'list_tool_buy_click',
    'list_tool_buy_visible',
    'list_tool_free_click',
    'list_tool_exit',
    'hero_directory_click',
    'hero_tool_logo_click',
    'list_tool_lead',
    'list_tool_details_submit',
    'list_tool_details_ok'
  )
group by name;
