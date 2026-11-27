-- 第 12 課：菜單多一個「確定了沒」的狀態
-- false：剛排好，還在 01-2 調整；true：按了 Shopping，確定這週就吃這些
alter table public.weeks add column confirmed boolean not null default false;
