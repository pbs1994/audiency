-- BoostInflu — core account/order/wallet schema.
--
-- Scope: accounts, orders + order items, a ledger-based wallet balance
-- (cashback + manual credits), and a generic "fulfillment_requests" table
-- that only records that an order line is awaiting handling.
--
-- Out of scope, intentionally: nothing here calls any third-party
-- engagement/follower-delivery API. fulfillment_requests.status stays
-- 'pending' until updated by hand (SQL editor / table editor) or by a
-- future process you build and own.
--
-- Run this once in the Supabase SQL editor (or `supabase db push`) on a
-- fresh project. Safe to re-run: every statement is guarded.

-- ============================================================
-- profiles — 1:1 with auth.users
-- ============================================================
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text not null,
  display_name text,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

drop policy if exists "profiles_select_own" on public.profiles;
create policy "profiles_select_own" on public.profiles
  for select using (auth.uid() = id);

drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own" on public.profiles
  for update using (auth.uid() = id);

-- No insert/delete policy for regular users: rows are created only by the
-- handle_new_user() trigger below (which runs as the trigger owner and is
-- therefore not subject to RLS).

-- Auto-create a profile row whenever a new Supabase Auth user signs up.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, display_name)
  values (new.id, new.email, new.raw_user_meta_data ->> 'display_name')
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ============================================================
-- orders
-- ============================================================
create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  status text not null default 'paid'
    check (status in ('pending_payment', 'paid', 'cancelled', 'refunded')),
  currency text not null default 'EUR',
  subtotal_eur numeric(10, 2) not null check (subtotal_eur >= 0),
  total_eur numeric(10, 2) not null check (total_eur >= 0),
  created_at timestamptz not null default now()
);

create index if not exists orders_user_id_idx on public.orders (user_id, created_at desc);

alter table public.orders enable row level security;

drop policy if exists "orders_select_own" on public.orders;
create policy "orders_select_own" on public.orders
  for select using (auth.uid() = user_id);

-- No insert/update/delete policy: orders are only ever created by the
-- place_order() function below, called from trusted server-side code with
-- the service-role key (never from the browser).

-- ============================================================
-- order_items — one row per service/line in an order
-- ============================================================
create table if not exists public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders (id) on delete cascade,
  platform_slug text not null,
  service_slug text not null,
  service_name text not null, -- display label, snapshotted at order time
  target_url text, -- username or post URL the customer supplied
  quantity integer not null check (quantity > 0),
  unit text not null default 'unités',
  unit_price_eur numeric(10, 4) not null check (unit_price_eur >= 0),
  line_total_eur numeric(10, 2) not null check (line_total_eur >= 0),
  created_at timestamptz not null default now()
);

create index if not exists order_items_order_id_idx on public.order_items (order_id);

alter table public.order_items enable row level security;

drop policy if exists "order_items_select_own" on public.order_items;
create policy "order_items_select_own" on public.order_items
  for select using (
    exists (
      select 1 from public.orders o
      where o.id = order_items.order_id and o.user_id = auth.uid()
    )
  );

-- ============================================================
-- wallet_transactions — append-only ledger. Balance = sum(amount_eur).
-- Never update/delete a row; post an offsetting entry instead, so the
-- ledger stays a full audit trail for customer-service questions.
-- ============================================================
create table if not exists public.wallet_transactions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  type text not null
    check (type in ('signup_bonus', 'cashback', 'manual_topup', 'manual_adjustment', 'redeemed')),
  amount_eur numeric(10, 2) not null, -- positive = credit, negative = debit
  related_order_id uuid references public.orders (id) on delete set null,
  description text,
  created_at timestamptz not null default now()
);

create index if not exists wallet_transactions_user_id_idx
  on public.wallet_transactions (user_id, created_at desc);

alter table public.wallet_transactions enable row level security;

drop policy if exists "wallet_transactions_select_own" on public.wallet_transactions;
create policy "wallet_transactions_select_own" on public.wallet_transactions
  for select using (auth.uid() = user_id);

-- Deliberately no insert policy for authenticated/anon: if a client could
-- insert its own rows here, it could credit itself unlimited balance via
-- the REST API directly. All credits go through place_order() (cashback)
-- or are inserted by you via the SQL/table editor (manual top-ups,
-- adjustments) using the service role.

create view public.wallet_balances
  with (security_invoker = true) as
select user_id, coalesce(sum(amount_eur), 0)::numeric(10, 2) as balance_eur
from public.wallet_transactions
group by user_id;

-- ============================================================
-- fulfillment_requests — provider-agnostic placeholder.
--
-- One row per order_item, created alongside the order. Nothing in this
-- project ever flips a row past 'pending' automatically — no code here
-- calls a follower/engagement-delivery API. Update status by hand, or
-- wire your own trusted process to do it later; that integration is a
-- separate decision outside this schema.
-- ============================================================
create table if not exists public.fulfillment_requests (
  id uuid primary key default gen_random_uuid(),
  order_item_id uuid not null references public.order_items (id) on delete cascade,
  status text not null default 'pending'
    check (status in ('pending', 'in_progress', 'completed', 'failed')),
  note text,
  updated_at timestamptz not null default now()
);

create index if not exists fulfillment_requests_order_item_id_idx
  on public.fulfillment_requests (order_item_id);

alter table public.fulfillment_requests enable row level security;

drop policy if exists "fulfillment_requests_select_own" on public.fulfillment_requests;
create policy "fulfillment_requests_select_own" on public.fulfillment_requests
  for select using (
    exists (
      select 1 from public.order_items oi
      join public.orders o on o.id = oi.order_id
      where oi.id = fulfillment_requests.order_item_id and o.user_id = auth.uid()
    )
  );

-- ============================================================
-- place_order() — the only way orders/items/cashback get created.
--
-- Not granted to anon/authenticated on purpose: it is callable only with
-- the service-role key, i.e. only from server-side code that has already
-- verified the caller's session and recomputed trusted prices. A browser
-- holding only the anon key cannot call this function.
-- ============================================================
create or replace function public.place_order(p_user_id uuid, items jsonb)
returns uuid
language plpgsql
as $$
declare
  v_order_id uuid;
  v_subtotal numeric(10, 2);
  v_cashback numeric(10, 2);
  v_item_id uuid;
  item jsonb;
begin
  if p_user_id is null then
    raise exception 'p_user_id is required';
  end if;

  if items is null or jsonb_array_length(items) = 0 then
    raise exception 'order must have at least one item';
  end if;

  select coalesce(sum((i ->> 'line_total_eur')::numeric), 0)
  into v_subtotal
  from jsonb_array_elements(items) i;

  if v_subtotal <= 0 then
    raise exception 'order total must be positive';
  end if;

  insert into public.orders (user_id, status, currency, subtotal_eur, total_eur)
  values (p_user_id, 'paid', 'EUR', v_subtotal, v_subtotal)
  returning id into v_order_id;

  for item in select * from jsonb_array_elements(items)
  loop
    insert into public.order_items (
      order_id, platform_slug, service_slug, service_name, target_url,
      quantity, unit, unit_price_eur, line_total_eur
    )
    values (
      v_order_id,
      item ->> 'platform_slug',
      item ->> 'service_slug',
      item ->> 'service_name',
      item ->> 'target_url',
      (item ->> 'quantity')::integer,
      coalesce(item ->> 'unit', 'unités'),
      (item ->> 'unit_price_eur')::numeric,
      (item ->> 'line_total_eur')::numeric
    )
    returning id into v_item_id;

    insert into public.fulfillment_requests (order_item_id, status)
    values (v_item_id, 'pending');
  end loop;

  v_cashback := round(v_subtotal * 0.15, 2);
  insert into public.wallet_transactions (user_id, type, amount_eur, related_order_id, description)
  values (p_user_id, 'cashback', v_cashback, v_order_id, 'Cashback 15% — commande ' || v_order_id);

  return v_order_id;
end;
$$;

revoke all on function public.place_order(uuid, jsonb) from public, anon, authenticated;
