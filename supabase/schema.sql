create table if not exists public.user_statuses (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade unique,
  status text not null check (char_length(status) between 1 and 180),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.user_statuses enable row level security;

drop policy if exists "Users can read their own status" on public.user_statuses;
create policy "Users can read their own status"
on public.user_statuses
for select
to authenticated
using (auth.uid() = user_id);

drop policy if exists "Users can insert their own status" on public.user_statuses;
create policy "Users can insert their own status"
on public.user_statuses
for insert
to authenticated
with check (auth.uid() = user_id);

drop policy if exists "Users can update their own status" on public.user_statuses;
create policy "Users can update their own status"
on public.user_statuses
for update
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists "Users can delete their own status" on public.user_statuses;
create policy "Users can delete their own status"
on public.user_statuses
for delete
to authenticated
using (auth.uid() = user_id);
