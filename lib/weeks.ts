import { createClient } from "@/lib/supabase/server";
import type { Day } from "@/lib/types";

// 讀出某一週（用那週的週日日期 start 來找）的菜單；還沒排過就回傳 null
// RLS 會自動只給「自己的」菜單，所以這裡不用寫 user_id
export async function loadWeek(start: string): Promise<Day[] | null> {
    const supabase = await createClient();
    const { data, error } = await supabase.from("weeks").select("days").eq("start", start).maybeSingle();
    if (error) throw new Error(`讀不到菜單：${error.message}`);
    return data ? (data.days as Day[]) : null;
}

// 把某一週的菜單存起來；同一週已經有了就覆蓋
export async function saveWeek(start: string, days: Day[]): Promise<void> {
    const supabase = await createClient();
    const { error } = await supabase.from("weeks").upsert({ start, days }, { onConflict: "user_id,start" });
    if (error) throw new Error(`存不了菜單：${error.message}`);
}
