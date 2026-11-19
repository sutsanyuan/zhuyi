"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

type Row = { id: string; name: string };

export default function RecipesTestPage() {
    const [rows, setRows] = useState<Row[] | null>(null);
    const [error, setError] = useState<string | null>(null);
    useEffect(() => {
        const supabase = createClient();
        supabase
            .from("recipes")
            .select("id,name")
            .limit(5)
            .then(({ data, error }) => {
                if (error) setError(error.message);
                else setRows(data);
            });
    }, []);

    if (error) return <p className="p-6 text-red-600">錯誤：{error}</p>;
    if (rows === null) return <p className="p-6 text-muted">讀取中...</p>;

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
