import type { Group, ShoppingItem, Week } from "@/lib/types";
// 份量倍數：食譜都以四人份計算
const PORTION_FACTOR = { four: 1, two: 0.5, off: 0 };
// 採買清單的分組順序（跟逛市場的順序一樣）
const GROUP_ORDER: Group[] = ["肉類・海鮮", "蔬菜", "菇類", "豆類與蛋", "乾貨與調味料", "其他"];

export function buildShoppingList(week: Week, pantry: string[]): ShoppingItem[] {
    // 用「名稱|單位」當鑰匙，找出同一樣食材
    const map = new Map<string, ShoppingItem>();

    for (const day of week.days) {
        const factor = PORTION_FACTOR[day.portion];
        if (factor === 0) continue; //這天不煮，跳過
        for (const dish of day.dishes) {
            for (const ing of dish.ingredients) {
                if (pantry.includes(ing.name)) continue; // 家裡有，不用買

                const key = `${ing.name}|${ing.unit}`;
                const amount = typeof ing.qty === "number" ? ing.qty * factor : null;
                const existing = map.get(key);

                if (existing) {
                    // 已經有這樣食材：數量加上去，天數補上去
                    if (existing.qty !== null && amount !== null) existing.qty += amount;
                    if (!existing.days.includes(day.key)) existing.days.push(day.key);
                } else {
                    map.set(key, {
                        name: ing.name,
                        unit: ing.unit,
                        group: ing.group,
                        qty: amount,
                        qtyLabel: "",
                        days: [day.key],
                    });
                }
            }
        }
    }
    // 最後才產生顯示文字，並照市場分區排序
    return [...map.values()]
        .map((item) => ({
            ...item,
            qtyLabel: item.qty === null ? "適量" : `${item.qty} ${item.unit}`,
        }))
        .sort((a, b) => GROUP_ORDER.indexOf(a.group) - GROUP_ORDER.indexOf(b.group));
}
