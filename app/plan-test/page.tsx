import { homeWeekStart } from "@/lib/week";
import { loadWeek } from "@/lib/weeks";
import { createWeek } from "./actions";

const DAY_NAMES = { sun: "週日", mon: "週一", tue: "週二", thu: "週四" };

export default async function PlanTestPage() {
    const start = homeWeekStart();
    const days = await loadWeek(start);

    return (
        <main className="p-6">
            <h1 className="font-display text-xl">排菜測試</h1>
            <p className="mt-2 text-muted">{start} 那一週</p>

            {days === null ? (
                <p className="mt-4">這週還沒排菜。</p>
            ) : (
                days.map((day) => (
                    <section key={day.key} className="mt-4">
                        <h2 className="font-bold">{DAY_NAMES[day.key]}</h2>
                        <ul className="list-disc pl-5">
                            {day.dishes.map((dish) => (
                                <li key={dish.id}>
                                    {dish.name}
                                    {dish.ingredients.some((ing) => ing.freeze) && "（肉要先冷凍）"}
                                </li>
                            ))}
                        </ul>
                    </section>
                ))
            )}

            <form action={createWeek} className="mt-6">
                <button className="rounded-lg bg-accent px-4 py-2 text-on-accent">
                    {days === null ? "排這週的菜" : "重新排"}
                </button>
            </form>
        </main>
    );
}
