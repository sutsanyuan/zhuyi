"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { planFromRecipes } from "@/lib/plan";
import { loadRecipes } from "@/lib/recipes";
import { currentSeason } from "@/lib/season";
import type { DayKey, Portion } from "@/lib/types";
import { homeWeekStart } from "@/lib/week";
import { confirmWeek, loadWeek, saveWeek, updateDays } from "@/lib/weeks";

// Create／Regenerate：排一份新菜單 → 存起來（還沒確定）→ 到 01-2 調整
export async function createWeek() {
    const recipes = await loadRecipes();
    const days = planFromRecipes(recipes, { dislikes: [], recent: [], season: currentSeason() });
    await saveWeek(homeWeekStart(), days);
    redirect("/plan");
}

// 01-2 改某一天的份量（四人份／兩人份／不煮）
export async function setPortion(key: DayKey, portion: Portion) {
    const start = homeWeekStart();
    const week = await loadWeek(start);
    if (!week) return;
    const days = week.days.map((day) => (day.key === key ? { ...day, portion } : day));
    await updateDays(start, days);
    revalidatePath("/plan");
}

// 按下 Shopping：確定菜單 → 到採買清單
export async function confirm() {
    await confirmWeek(homeWeekStart());
    redirect("/shop");
}
