-- Richer submit funnel + submission goal rollups. Safe to re-run.

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

create or replace view public.submission_goal_counts as
select
  name,
  count(*)::bigint as hits,
  count(distinct visitor_id)::bigint as visitors,
  count(distinct session_id)::bigint as sessions,
  max(seen_at) as last_seen_at
from public.visitor_events
where event_type = 'goal'
  and name in (
    'submit_cta',
    'form_started',
    'submit_attempt',
    'submit_validation_error',
    'submit_rejected',
    'submit_fallback',
    'submit_success',
    'listing_submitted',
    'submit_spam_blocked',
    'submit_share_copy',
    'submit_share_download',
    'submit_open_listing',
    'submit_another'
  )
group by name;

create or replace view public.submission_reject_reasons as
select
  coalesce(meta->>'reject_reason', '(none)') as reject_reason,
  count(*)::bigint as hits,
  max(seen_at) as last_seen_at
from public.visitor_events
where event_type = 'goal'
  and name in ('submit_rejected', 'submit_validation_error', 'submit_fallback')
group by 1
order by hits desc;

create or replace view public.submission_by_category as
select
  coalesce(meta->>'category', '(unknown)') as category,
  count(*) filter (where name = 'submit_attempt')::bigint as attempts,
  count(*) filter (where name in ('listing_submitted', 'submit_success'))::bigint as submitted,
  max(seen_at) as last_seen_at
from public.visitor_events
where event_type = 'goal'
  and name in ('submit_attempt', 'listing_submitted', 'submit_success')
group by 1;
