import type { Week } from "@/lib/types";

// 開發用的範例菜單，之後會換成 AI 排出來的真資料
export const sampleWeek: Week = {
    id: "sample",
    start: "2026-11-01",
    saved: false,
    days: [
        {
            key: "sun",
            portion: "four",
            dishes: [
                {
                    id: "d1",
                    name: "番茄燉牛腩",
                    type: "肉",
                    challenge: true,
                    minutes: 60,
                    ingredients: [
                        { name: "牛腩", qty: 1, unit: "斤", group: "肉類・海鮮", freeze: false },
                        { name: "番茄", qty: 3, unit: "顆", group: "蔬菜", freeze: false },
                        { name: "洋蔥", qty: 1, unit: "顆", group: "蔬菜", freeze: false },
                        { name: "醬油", qty: 2, unit: "匙", group: "乾貨與調味料", freeze: false },
                    ],
                },
            ],
        },
        {
            key: "mon",
            portion: "two",
            dishes: [
                {
                    id: "d2",
                    name: "洋蔥炒蛋",
                    type: "蛋",
                    challenge: false,
                    minutes: 15,
                    ingredients: [
                        { name: "洋蔥", qty: 2, unit: "顆", group: "蔬菜", freeze: false },
                        { name: "雞蛋", qty: 4, unit: "顆", group: "豆類與蛋", freeze: false },
                        { name: "蔥", qty: "適量", unit: "", group: "蔬菜", freeze: false },
                    ],
                },
            ],
        },
    ],
};
