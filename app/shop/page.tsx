import { ShopItem } from "@/components/ShopItem";
import { sampleWeek } from "@/lib/sample";
import { buildShoppingList } from "@/lib/shopping";

export default function ShopPage() {
    const items = buildShoppingList(sampleWeek, ["醬油", "鹽"]);
    return (
        <main className="mx-auto flex max-w-[520px] flex-col gap-6 px-4 py-6">
            <h1 className="font-display text-[28px] font-black">採買清單</h1>
            <div>
                {items.map((item) => (
                    <ShopItem key={`${item.name}|${item.unit}`} item={item}></ShopItem>
                ))}
            </div>
        </main>
    );
}
