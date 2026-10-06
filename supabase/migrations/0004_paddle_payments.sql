-- Real payments via Paddle.
--
-- Orders are now created as 'pending_payment' and only flip to 'paid' (and
-- earn cashback) once Paddle's transaction.completed webhook calls
-- complete_order(). Before this migration place_order() marked every order
-- paid immediately (simulated checkout).

alter table public.orders
  add column if not exists paddle_transaction_id text;

create unique index if not exists orders_paddle_transaction_id_key
  on public.orders (paddle_transaction_id) where paddle_transaction_id is not null;

-- place_order(): same inputs, but status 'pending_payment' and no cashback yet.
create or replace function public.place_order(p_user_id uuid, items jsonb)
returns uuid
language plpgsql
as $$
declare
  v_order_id uuid;
  v_subtotal numeric(10, 2);
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
  values (p_user_id, 'pending_payment', 'EUR', v_subtotal, v_subtotal)
  returning id into v_order_id;

  for item in select * from jsonb_array_elements(items)
  loop
    insert into public.order_items (
      order_id, service_id, service_variant_id, platform_slug, service_slug,
      service_name, target_url, quantity, unit, unit_price_eur, line_total_eur
    )
    values (
      v_order_id,
      item ->> 'service_id',
      item ->> 'service_variant_id',
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

  return v_order_id;
end;
$$;

revoke all on function public.place_order(uuid, jsonb) from public, anon, authenticated;

-- complete_order(): called by the Paddle webhook. Idempotent — Paddle retries
-- webhooks, and only the first call (pending_payment -> paid) grants cashback.
create or replace function public.complete_order(p_order_id uuid, p_transaction_id text)
returns boolean
language plpgsql
as $$
declare
  v_user_id uuid;
  v_subtotal numeric(10, 2);
begin
  update public.orders
  set status = 'paid', paddle_transaction_id = p_transaction_id
  where id = p_order_id and status = 'pending_payment'
  returning user_id, subtotal_eur into v_user_id, v_subtotal;

  if not found then
    return false;
  end if;

  insert into public.wallet_transactions (user_id, type, amount_eur, related_order_id, description)
  values (v_user_id, 'cashback', round(v_subtotal * 0.15, 2), p_order_id,
          'Cashback 15% — commande ' || p_order_id);

  return true;
end;
$$;

revoke all on function public.complete_order(uuid, text) from public, anon, authenticated;
