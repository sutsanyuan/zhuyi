import type { PlanRules, Recipe } from "@/lib/types";

// 這道菜符不符合排菜單的條件？三條規則都過了才回傳 true
export function isAllowed(recipe: Recipe, rules: PlanRules): boolean {
    // ── 規則 1：不吃的食材 ──────────────────────────────
    // 讀法：「不吃清單裡有沒有任何一個字，出現在任何一個食材的名稱裡？」
    // 外層 some：一個一個看不吃清單裡的字（word）
    // 內層 some：一個一個看這道菜的食材（ing）
    // TODO：把 false 換成「ing.name 有沒有包含 word」
    //       提示：字串的 .includes()
    const hasDisliked = rules.dislikes.some((word) =>
        recipe.ingredients.some((ing) => {
            return ing.name.includes(word);
        })
    );
    if (hasDisliked) return false;

    // ── 規則 2：最近吃過（你上次寫好的）────────────────────
    if (rules.recent.includes(recipe.name)) return false;

    // ── 規則 3：當季 ─────────────────────────────────
    // seasons 是空陣列 → 四季都可以
    // 不是空的 → 要包含現在的季節（rules.season）
    // TODO：把 true 換成上面這句話
    //       提示：recipe.seasons.length === 0、陣列的 .includes()、「或」是 ||
    const inSeason = recipe.seasons.length === 0 || recipe.seasons.includes(rules.season);
    if (!inSeason) return false;

    return true;
}
