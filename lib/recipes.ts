import { createClient } from "@/lib/supabase/server";
import type { Recipe } from "@/lib/types";

// 從 Supabase 讀出整個料理資料庫（伺服器端用）
export async function loadRecipes(): Promise<Recipe[]> {
    const supabase = await createClient();
    const { data, error } = await supabase.from("recipes").select("*");
    if (error) throw new Error(`讀不到料理資料：${error.message}`);
    return data as Recipe[];
}
