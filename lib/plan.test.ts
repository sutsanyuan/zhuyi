import { describe, expect, it } from "vitest";
import { isAllowed, planFromRecipes } from "@/lib/plan";
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

// ── 第 9 課（下）：排一週菜單 ──
// 測試用的小料理庫：5 道主菜、4 道蔬菜
const pool: Recipe[] = [
    makeRecipe({ id: "m1", name: "蔥爆牛肉", type: "肉", ingredients: [{ name: "牛肉片", qty: 1, unit: "斤", group: "肉類・海鮮" }] }),
    makeRecipe({ id: "m2", name: "三杯雞", type: "肉", ingredients: [{ name: "雞腿", qty: 2, unit: "隻", group: "肉類・海鮮" }] }),
    makeRecipe({ id: "m3", name: "鹽烤鯖魚", type: "海鮮", ingredients: [{ name: "鯖魚", qty: 2, unit: "片", group: "肉類・海鮮" }] }),
    makeRecipe({ id: "m4", name: "茄汁豬排", type: "肉", ingredients: [{ name: "豬排", qty: 4, unit: "片", group: "肉類・海鮮" }, { name: "茄子", qty: 1, unit: "條", group: "蔬菜" }] }),
    makeRecipe({ id: "m5", name: "照燒雞腿", type: "肉", ingredients: [{ name: "雞腿", qty: 3, unit: "隻", group: "肉類・海鮮" }] }),
    makeRecipe({ id: "v1", name: "炒高麗菜", type: "菜", ingredients: [{ name: "高麗菜", qty: 1, unit: "顆", group: "蔬菜" }] }),
    makeRecipe({ id: "v2", name: "蒜炒菠菜", type: "菜", ingredients: [{ name: "菠菜", qty: 2, unit: "把", group: "蔬菜" }] }),
    makeRecipe({ id: "v3", name: "奶油四季豆", type: "菜", ingredients: [{ name: "四季豆", qty: 1, unit: "斤", group: "蔬菜" }] }),
    makeRecipe({ id: "v4", name: "炒地瓜葉", type: "菜", ingredients: [{ name: "地瓜葉", qty: 1, unit: "把", group: "蔬菜" }] }),
];
const alwaysFirst = () => 0; // 測試時不要隨機：永遠挑第一個

describe("planFromRecipes", () => {
    it("排出週日、一、二、四四天", () => {
        const days = planFromRecipes(pool, rules, alwaysFirst);
        expect(days.map((d) => d.key)).toEqual(["sun", "mon", "tue", "thu"]);
    });

    it("每天一道主菜、一道蔬菜", () => {
        const days = planFromRecipes(pool, rules, alwaysFirst);
        for (const day of days) {
            expect(day.dishes.map((d) => d.type)).toEqual([expect.stringMatching(/肉|海鮮/), "菜"]);
        }
    });

    it("一週內不會重複", () => {
        const names = planFromRecipes(pool, rules, alwaysFirst).flatMap((d) => d.dishes.map((x) => x.name));
        expect(new Set(names).size).toBe(names.length);
    });

    it("不吃的食材不會被排進去", () => {
        const names = planFromRecipes(pool, { ...rules, dislikes: ["茄子"] }, alwaysFirst).flatMap((d) => d.dishes.map((x) => x.name));
        expect(names).not.toContain("茄汁豬排");
        expect(names).toContain("照燒雞腿"); // 對照組：被擋掉的位置由別道菜補上
    });

    it("週四的肉要提早冷凍，其他天不用", () => {
        const days = planFromRecipes(pool, rules, alwaysFirst);
        const meatOn = (key: string) => days.find((d) => d.key === key)!.dishes[0].ingredients[0];
        expect(meatOn("thu").freeze).toBe(true);
        expect(meatOn("sun").freeze).toBe(false);
    });

    it("菜不夠時不會壞掉，只是那天少一道", () => {
        const days = planFromRecipes([pool[0], pool[5]], rules, alwaysFirst);
        expect(days[0].dishes).toHaveLength(2);
        expect(days[1].dishes).toHaveLength(0);
    });
});
