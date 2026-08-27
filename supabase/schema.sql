-- Run this in the Supabase SQL editor once, before deploying.
-- The API uses the service-role key, which bypasses RLS, so RLS stays enabled
-- for defense in depth against the anon key.

create table if not exists public.orders (
    id              text primary key,
    product         text        not null,
    email           text        not null,
    price_eur       numeric     not null,
    coin            text        not null check (coin in ('BTC','LTC','ETH','USDT','USDC')),
    address         text        not null,
    expected_amount text        not null,
    status          text        not null default 'pending'
                    check (status in ('pending','paid','delivered','expired','cancelled')),
    tx_hash         text,
    delivery_code   text,
    created_at      timestamptz not null default now(),
    expires_at      timestamptz not null,
    paid_at         timestamptz,
    delivered_at    timestamptz
);

create index if not exists orders_status_idx     on public.orders (status);
create index if not exists orders_created_at_idx on public.orders (created_at desc);
create index if not exists orders_email_idx      on public.orders (email);

alter table public.orders enable row level security;
-- No policies for anon/authenticated: only the service-role key can read/write.
