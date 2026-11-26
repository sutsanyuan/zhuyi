import { planFromRecipes } from "@/lib/plan";
import { loadRecipes } from "@/lib/recipes";
import { currentSeason } from "@/lib/season";

const DAY_NAMES = { sun: "週日", mon: "週一", tue: "週二", thu: "週四" };

export default async function PlanTestPage() {
    const recipes = await loadRecipes();
    const days = planFromRecipes(recipes, { dislikes: [], recent: [], season: currentSeason() });

    return (
        <main className="p-6">
            <h1 className="font-display text-xl">排菜測試</h1>
            <p className="mt-2 text-muted">從 {recipes.length} 道菜裡排出來的，重新整理會換一組</p>
            {days.map((day) => (
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
            ))}
        </main>
    );
}
