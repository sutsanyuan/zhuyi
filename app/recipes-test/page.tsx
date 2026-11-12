import { createClient } from "@/lib/supabase/server";

export default async function RecipesTestPage() {
    const supabase = await createClient();
    const { data: rows, error } = await supabase.from("recipes").select("id, name").limit(5);
    if (error) return <p className="p-6 text-red-600">錯誤：{error.message}</p>;
    return (
        <main className="p-6">
            <h1 className="font-display text-xl">料理測試</h1>
            <p className="mt-2 text-muted">拿到 {rows.length} 筆</p>
            <ul className="mt-4 list-disc pl-5">
                {rows.map((r) => (
                    <li key={r.id}>{r.name}</li>
                ))}
            </ul>
        </main>
    );
}
