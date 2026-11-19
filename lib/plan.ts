import type { PlanRules, Recipe } from "@/lib/types";

export function isAllowed(recipe: Recipe, rules: PlanRules): boolean {
    if (rules.recent.includes(recipe.name)) return false;
    return true;
}
