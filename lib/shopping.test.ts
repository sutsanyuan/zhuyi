import { describe, expect, it } from "vitest";
import { buildShoppingList } from "@/lib/shopping";
import type { Dish, Week } from "@/lib/types";

// 測試用的小工具：快速做出一道菜
function dish(name: string, ingredients: Dish["ingredients"]): Dish {
    return { id: name, name, type: "菜", challenge: false, minutes: 30, ingredients };
}

describe("buildShoppingList", () => {
    it("兩道菜都用到洋蔥時，數量會加總成一列", () => {
        // 1. 準備資料
        const week: Week = {
            id: "w1",
            start: "2026-11-01",
            saved: false,
            days: [
                {
                    key: "sun",
                    portion: "four",
                    dishes: [
                        dish("洋蔥炒蛋", [
                            { name: "洋蔥", qty: 1, unit: "顆", group: "蔬菜", freeze: false },
                        ]),
                    ],
                },
                {
                    key: "mon",
                    portion: "four",
                    dishes: [
                        dish("咖哩", [
                            { name: "洋蔥", qty: 2, unit: "顆", group: "蔬菜", freeze: false },
                        ]),
                    ],
                },
            ],
        };
        // 2. 執行
        const list = buildShoppingList(week, []);

        // 3. 檢查結果
        expect(list).toHaveLength(1); // 只有一列
        expect(list[0].qty).toBe(3); // 1 + 2 = 3
        expect(list[0].days).toEqual(["sun", "mon"]);
    });
});
