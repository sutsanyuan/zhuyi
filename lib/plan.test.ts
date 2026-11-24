import { describe, expect, it } from "vitest";
import { isAllowed } from "@/lib/plan";
import type { PlanRules, Recipe } from "@/lib/types";

// 做一道測試用的料理；只想改某個欄位時，用 overrides 蓋掉
function makeRecipe(overrides: Partial<Recipe> = {}): Recipe {
    return {
        id: "t1",
        name: "番茄炒蛋",
        type: "蛋",
        cuisine: "中式",
        main: "蛋・豆",
        difficulty: 1,
        minutes: 15,
        bento: true,
        seasons: [],
        ingredients: [
            { name: "番茄", qty: 2, unit: "顆", group: "蔬菜" },
            { name: "雞蛋", qty: 4, unit: "顆", group: "豆類與蛋" },
        ],
        ...overrides,
    };
}

const rules: PlanRules = { dislikes: [], recent: [], season: "冬" };

describe("isAllowed", () => {
    it("沒有任何限制時可以排", () => {
        expect(isAllowed(makeRecipe(), rules)).toBe(true);
    });

    it("食材有不吃的東西就不能排", () => {
        expect(isAllowed(makeRecipe(), { ...rules, dislikes: ["番茄"] })).toBe(false);
    });

    it("食材名稱「包含」不吃的字也不能排", () => {
        const recipe = makeRecipe({
            ingredients: [{ name: "長茄子", qty: 2, unit: "條", group: "蔬菜" }],
        });
        expect(isAllowed(recipe, { ...rules, dislikes: ["茄子"] })).toBe(false);
    });

    it("最近吃過的菜不能排", () => {
        expect(isAllowed(makeRecipe(), { ...rules, recent: ["番茄炒蛋"] })).toBe(false);
    });

    it("不是當季的菜不能排", () => {
        expect(isAllowed(makeRecipe({ seasons: ["夏"] }), rules)).toBe(false);
    });

    it("當季的菜可以排", () => {
        expect(isAllowed(makeRecipe({ seasons: ["秋", "冬"] }), rules)).toBe(true);
    });
    it("不吃的東西沒出現在食材裡，就可以排", () => {
        expect(isAllowed(makeRecipe(), { ...rules, dislikes: ["茄子"] })).toBe(true);
    });
});
