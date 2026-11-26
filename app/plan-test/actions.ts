"use server";

import { revalidatePath } from "next/cache";
import { planFromRecipes } from "@/lib/plan";
import { loadRecipes } from "@/lib/recipes";
import { currentSeason } from "@/lib/season";
import { homeWeekStart } from "@/lib/week";
import { saveWeek } from "@/lib/weeks";

// 按下按鈕時，在伺服器上執行：排菜 → 存進資料庫 → 叫頁面重新整理
export async function createWeek() {
    const recipes = await loadRecipes();
    const days = planFromRecipes(recipes, { dislikes: [], recent: [], season: currentSeason() });
    await saveWeek(homeWeekStart(), days);
    revalidatePath("/plan-test");
}
