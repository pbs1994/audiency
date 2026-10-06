-- Adds a stable variant code to order_items — distinct from service_id
-- whenever the customer's quality (Standard/Premium) and/or gender choice
-- makes it a different purchasable variant, e.g. "IG-02-PREM-F" vs the
-- base "IG-02". Quantity is intentionally NOT part of this code (it's a
-- continuous value, not a catalog option). See getVariantId() in
-- src/lib/platforms.ts for how it's built.

alter table public.order_items
  add column if not exists service_variant_id text;

create index if not exists order_items_service_variant_id_idx
  on public.order_items (service_variant_id);

-- Re-create place_order() to also store service_variant_id from each item.
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

  v_cashback := round(v_subtotal * 0.15, 2);
  insert into public.wallet_transactions (user_id, type, amount_eur, related_order_id, description)
  values (p_user_id, 'cashback', v_cashback, v_order_id, 'Cashback 15% — commande ' || v_order_id);

  return v_order_id;
end;
$$;

revoke all on function public.place_order(uuid, jsonb) from public, anon, authenticated;
