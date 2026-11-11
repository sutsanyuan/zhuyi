import { SignOutButton } from "@/components/SignOutButton";
import { createClient } from "@/lib/supabase/server";
import { DishCard } from "@/components/DishCard";
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

export default async function Home() {
    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();
    return (
        <main className="mx-auto flex max-w-[520px] flex-col gap-10 px-4 py-6">
            <header className="flex items-center justify-between text-sm text-muted">
                <span>{user?.email}</span>
                <SignOutButton />
            </header>
            <h1 className="font-display text-[28px] font-black">本週菜單</h1>
            <DishCard dish={sample} />
        </main>
    );
}
