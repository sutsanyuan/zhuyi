import { createClient } from "@/lib/supabase/server";
import type { Day } from "@/lib/types";

// 資料庫裡的一週：菜單 + 確定了沒
export type SavedWeek = {
    days: Day[];
    confirmed: boolean; // false：還在調整（01-2）；true：已確定（顯示在主頁）
};

// 讀出某一週（用那週的週日日期 start 來找）的菜單；還沒排過就回傳 null
// RLS 會自動只給「自己的」菜單，所以這裡不用寫 user_id
export async function loadWeek(start: string): Promise<SavedWeek | null> {
    const supabase = await createClient();
    const { data, error } = await supabase.from("weeks").select("days, confirmed").eq("start", start).maybeSingle();
    if (error) throw new Error(`讀不到菜單：${error.message}`);
    return data ? { days: data.days as Day[], confirmed: data.confirmed as boolean } : null;
}

// 存一份新排好的菜單（還沒確定）；同一週已經有了就覆蓋
export async function saveWeek(start: string, days: Day[]): Promise<void> {
    const supabase = await createClient();
    const { error } = await supabase
        .from("weeks")
        .upsert({ start, days, confirmed: false }, { onConflict: "user_id,start" });
    if (error) throw new Error(`存不了菜單：${error.message}`);
}

// 只改菜單內容（例如改份量），不動「確定了沒」
export async function updateDays(start: string, days: Day[]): Promise<void> {
    const supabase = await createClient();
    const { error } = await supabase.from("weeks").update({ days }).eq("start", start);
    if (error) throw new Error(`存不了菜單：${error.message}`);
}

// 按下 Shopping：確定這週的菜單
export async function confirmWeek(start: string): Promise<void> {
    const supabase = await createClient();
    const { error } = await supabase.from("weeks").update({ confirmed: true }).eq("start", start);
    if (error) throw new Error(`存不了菜單：${error.message}`);
}
