-- Run this AFTER schema.sql if you're using the publishable (anon) key
-- from your Vercel functions instead of the service-role key.
--
-- Trade-off: the publishable key is world-readable, so RLS is the only
-- barrier. These policies let anyone who reaches the /api routes create,
-- read, and update rows in `orders`. DELETE is not permitted.
--
-- Order IDs are 8 hex characters (~4 billion combos) so enumeration is
-- impractical, but do not enable RLS-off pages that list all rows.

create policy "anon can insert orders"
    on public.orders
    for insert
    to anon
    with check (true);

create policy "anon can read orders"
    on public.orders
    for select
    to anon
    using (true);

create policy "anon can update orders"
    on public.orders
    for update
    to anon
    using (true)
    with check (true);
