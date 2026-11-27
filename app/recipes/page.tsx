import { PageHeader } from "@/components/PageHeader";

export default function RecipesPage() {
    return (
        <main className="mx-auto max-w-[520px] px-6 pb-28">
            <PageHeader title="My Recipes" />
            <p className="text-muted">即將推出：收藏做過的菜，之後排到同一道菜會用你的版本。</p>
        </main>
    );
}
