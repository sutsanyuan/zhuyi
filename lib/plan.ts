import type { Day, DayKey, Dish, PlanRules, Recipe } from "@/lib/types";

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

// ════════════ 第 9 課（下）：排一週菜單 ════════════

const DAY_KEYS: DayKey[] = ["sun", "mon", "tue", "thu"];

// 資料庫的一道料理（Recipe）→ 菜單上的一道菜（Dish）
function toDish(recipe: Recipe, day: DayKey): Dish {
    return {
        id: recipe.id,
        name: recipe.name,
        type: recipe.type,
        challenge: recipe.difficulty === 3, // 難度 3 就是挑戰菜
        minutes: recipe.minutes,
        ingredients: recipe.ingredients.map((ing) => ({
            ...ing,
            // TODO 1：週四要煮的肉和海鮮，要提早冷凍
            //   條件有兩個，都要成立：「今天是週四」而且「這個食材是肉類・海鮮」
            //   提示：day === "thu"、ing.group、「而且」是 &&

            freeze: day === "thu" && ing.group === "肉類・海鮮",
        })),
    };
}

// 從料理資料庫排出一週四天的菜：每天一道主菜（肉或海鮮）＋一道蔬菜
// random 平常用 Math.random；測試時換成 alwaysFirst，結果才固定、能檢查
export function planFromRecipes(
    recipes: Recipe[],
    rules: PlanRules,
    random: () => number = Math.random
): Day[] {
    const pool = recipes.filter((r) => isAllowed(r, rules)); // 先用你寫的 isAllowed 過濾
    const used = new Set<string>(); // 這週已經排過的料理 id，避免重複

    // 從 pool 裡挑一道指定類型、還沒用過的菜；挑不到就回傳 null
    function pickOne(types: Recipe["type"][]): Recipe | null {
        // TODO 2：找出候選的菜。兩個條件都要成立：
        //   (1) 類型在 types 裡面　提示：types.includes(r.type)
        //   (2) 這週還沒用過　　　提示：used.has(r.id) 是「用過了」，前面加 ! 變成「還沒用過」
        const candidates = pool.filter((r) => types.includes(r.type) && !used.has(r.id));

        if (candidates.length === 0) return null;
        const chosen = candidates[Math.floor(random() * candidates.length)]; // 隨機挑一個
        used.add(chosen.id); // 記下來，之後就不會再挑到
        return chosen;
    }

    return DAY_KEYS.map((key) => {
        const main = pickOne(["肉", "海鮮"]);
        const veg = pickOne(["菜"]);
        const dishes = [main, veg].filter((r) => r !== null).map((r) => toDish(r, key));
        return { key, portion: "four", dishes };
    });
}
