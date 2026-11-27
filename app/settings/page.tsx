import { PageHeader } from "@/components/PageHeader";
import { SignOutButton } from "@/components/SignOutButton";
import { createClient } from "@/lib/supabase/server";

export default async function SettingsPage() {
    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    return (
        <main className="mx-auto flex max-w-[520px] flex-col gap-6 px-6 pb-28">
            <PageHeader title="Setting" />
            <section className="flex items-center justify-between bg-surface p-5">
                <div>
                    <p className="text-sm text-muted">登入帳號</p>
                    <p>{user?.email}</p>
                </div>
                <SignOutButton />
            </section>
            <p className="text-sm text-faint">即將推出：不吃的食材、家裡常備品、每週幾道挑戰菜。</p>
        </main>
    );
}
