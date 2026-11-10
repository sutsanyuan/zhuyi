-- 貓有煮意：資料表 + 權限 + RLS
-- 在 Supabase SQL Editor 整段貼上執行一次即可

-- 1) 料理資料庫：大家共用、唯讀
create table public.recipes (
  id          text primary key,
  name        text not null,
  type        text not null check (type in ('肉','海鮮','菜','蛋','豆','菇','湯','主食')),
  cuisine     text not null,
  main        text not null,
  difficulty  smallint not null check (difficulty between 1 and 3),
  minutes     integer,
  bento       boolean not null default true,
  seasons     text[] not null default '{}',
  ingredients jsonb not null default '[]'
);
alter table public.recipes enable row level security;
grant select on public.recipes to anon, authenticated;            -- GRANT：能不能進這個房間
create policy "登入的人都能讀料理" on public.recipes
  for select to authenticated using (true);                       -- RLS：進來後看得到哪幾筆

-- 2) 每個人的設定（不吃清單、常備品）
create table public.settings (
  user_id    uuid primary key default auth.uid() references auth.users(id) on delete cascade,
  dislikes   jsonb not null default '[]',
  pantry     text[] not null default '{}',
  updated_at timestamptz not null default now()
);
alter table public.settings enable row level security;
grant select, insert, update, delete on public.settings to authenticated;
create policy "只能讀自己的設定" on public.settings
  for select to authenticated using ((select auth.uid()) = user_id);
create policy "只能新增自己的設定" on public.settings
  for insert to authenticated with check ((select auth.uid()) = user_id);
create policy "只能改自己的設定" on public.settings
  for update to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
create policy "只能刪自己的設定" on public.settings
  for delete to authenticated using ((select auth.uid()) = user_id);

-- 3) 每週菜單
create table public.weeks (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid not null default auth.uid() references auth.users(id) on delete cascade,
  start      date not null,
  days       jsonb not null,
  checks     jsonb not null default '{}',
  saved      boolean not null default false,
  created_at timestamptz not null default now(),
  unique (user_id, start)
);
alter table public.weeks enable row level security;
grant select, insert, update, delete on public.weeks to authenticated;
create policy "只能讀自己的菜單" on public.weeks
  for select to authenticated using ((select auth.uid()) = user_id);
create policy "只能新增自己的菜單" on public.weeks
  for insert to authenticated with check ((select auth.uid()) = user_id);
create policy "只能改自己的菜單" on public.weeks
  for update to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
create policy "只能刪自己的菜單" on public.weeks
  for delete to authenticated using ((select auth.uid()) = user_id);
