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
    it("家裡有的不用買", () => {
        const week: Week = {
            id: "w1",
            start: "2026-11-01",
            saved: false,
            days: [
                {
                    key: "sun",
                    portion: "four",
                    dishes: [
                        dish("紅燒肉", [
                            {
                                name: "醬油",
                                qty: 1,
                                unit: "瓶",
                                group: "乾貨與調味料",
                                freeze: false,
                            },
                            {
                                name: "五花肉",
                                qty: 1,
                                unit: "斤",
                                group: "肉類・海鮮",
                                freeze: false,
                            },
                        ]),
                    ],
                },
            ],
        };

        const list = buildShoppingList(week, ["醬油"]);

        expect(list).toHaveLength(1); // 只剩一樣
        expect(list[0].name).toBe("五花肉"); // 而且剩下的是五花肉，不是醬油
    });

    it("兩人份減半", () => {
        const week: Week = {
            id: "w1",
            start: "2026-11-01",
            saved: false,
            days: [
                {
                    key: "sun",
                    portion: "two",
                    dishes: [
                        dish("生牛腩", [
                            {
                                name: "牛腩",
                                qty: 1,
                                unit: "斤",
                                group: "肉類・海鮮",
                                freeze: false,
                            },
                        ]),
                    ],
                },
            ],
        };

        const list = buildShoppingList(week, []);
        expect(list[0].qty).toBe(0.5);
    });

    it("不煮那天不算", () => {
        const week: Week = {
            id: "w1",
            start: "2026-11-01",
            saved: false,
            days: [
                {
                    key: "sun",
                    portion: "off",
                    dishes: [
                        dish("生牛腩", [
                            {
                                name: "牛腩",
                                qty: 1,
                                unit: "斤",
                                group: "肉類・海鮮",
                                freeze: false,
                            },
                        ]),
                    ],
                },
                {
                    key: "mon",
                    portion: "two",
                    dishes: [
                        dish("有洋蔥", [
                            {
                                name: "洋蔥",
                                qty: 1,
                                unit: "顆",
                                group: "蔬菜",
                                freeze: false,
                            },
                        ]),
                    ],
                },
            ],
        };

        const list = buildShoppingList(week, []);
        expect(list).toHaveLength(1);
        expect(list[0].name).toBe("洋蔥");
    });
});
