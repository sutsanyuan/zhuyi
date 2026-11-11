"use client";

import { useState, type SubmitEvent } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

const CODE_LENGTH = 8;

export default function LoginPage() {
    const supabase = createClient();
    const router = useRouter();

    const [step, setStep] = useState<"email" | "code">("email");
    const [email, setEmail] = useState("");
    const [code, setCode] = useState("");
    const [busy, setBusy] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function sendCode(e: SubmitEvent<HTMLFormElement>) {
        e.preventDefault();
        setBusy(true);
        setError(null);
        const { error } = await supabase.auth.signInWithOtp({ email });
        setBusy(false);
        if (error) setError(error.message);
        else setStep("code");
    }

    async function verifyCode(e: SubmitEvent<HTMLFormElement>) {
        e.preventDefault();
        setBusy(true);
        setError(null);
        const { error } = await supabase.auth.verifyOtp({ email, token: code, type: "email" });
        setBusy(false);
        if (error) setError(error.message);
        else router.push("/recipes-test");
    }

    return (
        <main className="mx-auto max-w-sm p-6">
            <h1 className="font-display text-2xl">登入貓有煮意</h1>
            {step === "email" ? (
                <form onSubmit={sendCode} className="mt-6 flex flex-col gap-3">
                    <label className="flex flex-col gap-1">
                        <span className="text-sm text-muted">Email</span>
                        <input
                            type="email"
                            required
                            autoComplete="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="rounded-lg border border-line bg-surface px-3 py-2"
                        />
                    </label>
                    <button
                        disabled={busy}
                        className="rounded-lg bg-leek px-3 py-2 text-on-leek disabled:opacity-50">
                        {busy ? "寄送中…" : "寄驗證碼給我"}
                    </button>
                </form>
            ) : (
                <form onSubmit={verifyCode} className="mt-6 flex flex-col gap-3">
                    <p className="text-sm text-muted">驗證碼已寄到 {email}</p>
                    <label className="flex flex-col gap-1">
                        <span className="text-sm text-muted">{CODE_LENGTH} 位數驗證碼</span>
                        <input
                            inputMode="numeric"
                            autoComplete="one-time-code"
                            required
                            maxLength={CODE_LENGTH}
                            value={code}
                            onChange={(e) => setCode(e.target.value.trim())}
                            className="rounded-lg border border-line bg-surface px-3 py-2 tracking-widest"
                        />
                    </label>
                    <button
                        disabled={busy}
                        className="rounded-lg bg-leek px-3 py-2 text-on-leek disabled:opacity-50">
                        {busy ? "確認中…" : "登入"}
                    </button>
                    <button
                        type="button"
                        onClick={() => setStep("email")}
                        className="text-sm text-muted underline">
                        換一個 Email
                    </button>
                </form>
            )}
            {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
        </main>
    );
}
