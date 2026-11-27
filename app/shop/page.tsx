import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { ShopItem } from "@/components/ShopItem";
import { GROUP_ORDER, PANTRY, buildShoppingList } from "@/lib/shopping";
import { homeWeekStart, weekLabel, weekRange } from "@/lib/week";
import { loadWeek } from "@/lib/weeks";
import type { Day } from "@/lib/types";


export default async function ShopPage() {
    const start = homeWeekStart();
    const week = await loadWeek(start);

    return (
        <main className="mx-auto flex min-h-dvh max-w-[520px] flex-col px-6 pb-28">
            <PageHeader title="Shopping" />
            <div className="flex items-end justify-between py-4">
                <span className="text-lg">{weekLabel()}</span>
                <span className="text-sm text-faint">{weekRange(start)}</span>
            </div>

            {week === null || !week.confirmed ? (
                <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center">
                    <p className="text-muted">{week ? "菜單還沒確定，到 Menu 按「Shopping」就會產生清單。" : "還沒有菜單，先到 Menu 排這週的菜。"}</p>
                    <Link href="/" className="rounded-lg bg-accent px-6 py-3 font-display text-2xl text-on-accent">
                        Menu
                    </Link>
                </div>
            ) : (
                <ShoppingList days={week.days} start={start} />
            )}
        </main>
    );
}

function ShoppingList({ days, start }: { days: Day[]; start: string }) {
    const items = buildShoppingList({ id: start, start, days, saved: false }, PANTRY);

    return (
        <div>
            {GROUP_ORDER.map((group) => {
                const inGroup = items.filter((item) => item.group === group);
                if (inGroup.length === 0) return null; // 這一類沒有要買的，就不顯示
                return (
                    <section key={group}>
                        <h2 className="-mx-6 bg-[#ece7de] px-6 py-1.5 text-sm font-bold">{group}</h2>
                        {inGroup.map((item) => (
                            <ShopItem key={`${item.name}|${item.unit}`} item={item} />
                        ))}
                    </section>
                );
            })}
            <p className="mt-6 text-sm text-faint">已排除家裡常備的：{PANTRY.join("、")}</p>
        </div>
    );
}
