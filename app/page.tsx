import { DishCard } from "@/components/DishCards";
import type { Dish } from "@/lib/types";
const sample: Dish = {
    id: "d1",
    name: "番茄燉牛腩",
    type: "肉",
    challenge: true,
    minutes: 60,
    ingredients: [
        { name: "牛腩", qty: 1, unit: "斤", group: "肉類・海鮮", freeze: false },
        { name: "番茄", qty: 3, unit: "顆", group: "蔬菜", freeze: false },
        { name: "洋蔥", qty: 1, unit: "顆", group: "蔬菜", freeze: false },
    ],
};

export default function Home() {
    return (
        <main className="mx-auto flex max-w-[520px] flex-col gap-10 px-4 py-6">
            <h1 className="font-display text-[28px] font-black">本週菜單</h1>
            <DishCard dish={sample} />
        </main>
    );
}
