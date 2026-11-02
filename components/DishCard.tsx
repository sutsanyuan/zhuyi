import type { Dish } from "@/lib/types";
// 這個元件收到的資料（props）
type Props = { dish: Dish };
export function DishCard({ dish }: Props) {
    // 只顯示前 3 樣食材
    const preview = dish.ingredients
        .slice(0, 3)
        .map((i) => `${i.name} ${i.qty} ${i.unit}`)
        .join("、");
    return (
        <div className="rounded-card border border-line bg-surface p-4">
            <div className="flex items-center gap-2">
                <p className="font-bold">{dish.name}</p>
                {dish.challenge && (
                    <span className="rounded-full bg-tag-bg px-2.5 py-0.5 text-xs text-tag-ink">
                        挑戰
                    </span>
                )}
            </div>
            <p className="text-sm text-muted">{preview}</p>
        </div>
    );
}
