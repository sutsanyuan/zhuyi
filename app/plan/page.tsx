import { redirect } from "next/navigation";
import { confirm, createWeek, setPortion } from "@/app/actions";
import { PageHeader } from "@/components/PageHeader";
import { PANTRY, buildShoppingList } from "@/lib/shopping";
import type { Dish, Portion } from "@/lib/types";
import { dayDate, homeWeekStart, weekLabel, weekRange } from "@/lib/week";
import { loadWeek } from "@/lib/weeks";

const EN_DAY = { sun: "Sun", mon: "Mon", tue: "Tue", thu: "Thu" };
const PORTIONS: { value: Portion; label: string }[] = [
    { value: "four", label: "四人份" },
    { value: "two", label: "兩人份" },
    { value: "off", label: "不煮" },
];

// 01-2：排好後先在這裡調整，按 Shopping 才算確定
export default async function PlanPage() {
    const start = homeWeekStart();
    const week = await loadWeek(start);
    if (!week) redirect("/"); // 還沒排菜就回主頁按 Create

    const count = buildShoppingList({ id: start, start, days: week.days, saved: false }, PANTRY).length;

    return (
        <main className="mx-auto flex max-w-[520px] flex-col px-6 pb-48">
            <PageHeader title="Menu" />
            <div className="flex items-end justify-between py-4">
                <span className="text-lg">{weekLabel()}</span>
                <span className="text-sm text-faint">{weekRange(start)}</span>
            </div>

            <div className="flex flex-col gap-9">
                {week.days.map((day) => (
                    <section key={day.key} className="flex flex-col gap-2.5">
                        <h2 className="flex items-baseline gap-2">
                            <span className="font-display text-[30px] leading-none">{EN_DAY[day.key]}</span>
                            <span className="text-sm text-faint">{dayDate(start, day.key)}</span>
                        </h2>

                        {/* 份量切換：每個選項是一個小表單，按下就呼叫 setPortion */}
                        <div className="flex gap-1 rounded bg-surface p-1">
                            {PORTIONS.map((p) => {
                                const selected = day.portion === p.value;
                                const color = !selected ? "text-muted" : p.value === "off" ? "bg-ink text-bg" : "bg-accent text-on-accent";
                                return (
                                    <form key={p.value} action={setPortion.bind(null, day.key, p.value)} className="flex-1">
                                        <button aria-pressed={selected} className={`w-full rounded py-1.5 text-sm ${color}`}>
                                            {p.label}
                                        </button>
                                    </form>
                                );
                            })}
                        </div>

                        {day.portion === "off" ? (
                            <p className="rounded bg-surface px-4 py-3 text-sm text-muted">這天不煮，菜不會列入採買清單。</p>
                        ) : (
                            day.dishes.map((dish) => <DishRow key={dish.id} dish={dish} />)
                        )}
                    </section>
                ))}
            </div>

            {/* 底部固定的兩顆按鈕（在分頁列上面） */}
            <div className="fixed inset-x-0 bottom-[68px] bg-bg pb-[env(safe-area-inset-bottom)]">
                <div className="mx-auto flex max-w-[520px] flex-col gap-2 px-6 py-3">
                    <p className="text-center text-sm text-faint">確定{weekLabel().slice(0, 2)}菜單，生成採買清單</p>
                    <div className="flex gap-2">
                        <form action={createWeek} className="flex-1">
                            <button className="h-12 w-full rounded bg-[#8e8e8e] font-display text-2xl text-white">Regenerate</button>
                        </form>
                        <form action={confirm} className="flex-[1.6]">
                            <button className="h-12 w-full rounded bg-accent font-display text-2xl text-on-accent">
                                Shopping ({count})
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    );
}

// 一道菜：類型、菜名、挑戰、前三樣食材
function DishRow({ dish }: { dish: Dish }) {
    const meat = dish.type === "肉" || dish.type === "海鮮";
    return (
        <div className="rounded bg-surface px-3 py-3.5">
            <div className="flex flex-wrap items-center gap-1.5">
                <span className={`rounded-full px-1.5 text-[11px] font-bold ${meat ? "bg-ink text-bg" : "bg-sunk text-muted"}`}>
                    {dish.type}
                </span>
                <span className="font-bold">{dish.name}</span>
                {dish.challenge && <span className="rounded bg-tag-bg px-1.5 text-xs text-tag-ink">挑戰</span>}
            </div>
            <p className="mt-1 text-[13px] text-muted">
                {dish.ingredients
                    .slice(0, 3)
                    .map((ing) => ing.name)
                    .join("、")}
            </p>
        </div>
    );
}
