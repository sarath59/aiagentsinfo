-- Pre-pay leads for featured listings. Match Stripe payments manually.
-- RLS on, no policies: only SUPABASE_SECRET_KEY can read/write.

create table if not exists public.paid_listings (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  lead_token text not null unique,
  email text not null,
  tool_name text not null default '',
  tool_url text not null default '',
  tool_notes text not null default '',
  status text not null default 'pending_payment'
    check (status in ('pending_payment', 'paid', 'listed', 'abandoned', 'refunded', 'failed')),
  stripe_session_id text not null default '',
  stripe_payment_intent text not null default '',
  amount_cents integer,
  currency text not null default 'usd',
  listing_slug text not null default '',
  listed_at timestamptz,
  notes_internal text not null default '',
  eta_hours integer not null default 2
);

-- Migrate older webhook-shaped tables safely.
alter table public.paid_listings add column if not exists lead_token text;
alter table public.paid_listings add column if not exists tool_name text not null default '';
alter table public.paid_listings add column if not exists tool_url text not null default '';
alter table public.paid_listings add column if not exists tool_notes text not null default '';
alter table public.paid_listings add column if not exists notes_internal text not null default '';
alter table public.paid_listings add column if not exists listing_slug text not null default '';
alter table public.paid_listings add column if not exists listed_at timestamptz;
alter table public.paid_listings add column if not exists eta_hours integer not null default 2;
alter table public.paid_listings add column if not exists amount_cents integer;
alter table public.paid_listings add column if not exists currency text not null default 'usd';
alter table public.paid_listings add column if not exists stripe_session_id text not null default '';
alter table public.paid_listings add column if not exists stripe_payment_intent text not null default '';
alter table public.paid_listings add column if not exists updated_at timestamptz not null default now();

update public.paid_listings
set lead_token = coalesce(nullif(lead_token, ''), nullif(stripe_session_id, ''), gen_random_uuid()::text)
where lead_token is null or lead_token = '';

do $$
begin
  if not exists (
    select 1 from pg_constraint where conname = 'paid_listings_lead_token_key'
  ) then
    alter table public.paid_listings add constraint paid_listings_lead_token_key unique (lead_token);
  end if;
exception when others then
  null;
end $$;

-- Drop unique on stripe_session_id if present (empty strings collide for leads).
do $$
begin
  alter table public.paid_listings drop constraint if exists paid_listings_stripe_session_id_key;
exception when others then
  null;
end $$;

-- Widen status check to include pending_payment.
alter table public.paid_listings drop constraint if exists paid_listings_status_check;
alter table public.paid_listings
  add constraint paid_listings_status_check
  check (status in ('pending_payment', 'paid', 'listed', 'abandoned', 'refunded', 'failed'));

create index if not exists paid_listings_created_idx on public.paid_listings (created_at desc);
create index if not exists paid_listings_status_idx on public.paid_listings (status, created_at desc);
create index if not exists paid_listings_email_idx on public.paid_listings (email);

alter table public.paid_listings enable row level security;

create or replace view public.paid_listings_summary as
select
  status,
  count(*)::bigint as orders,
  coalesce(sum(amount_cents), 0)::bigint as amount_cents_total,
  max(created_at) as last_order_at
from public.paid_listings
group by status;
