import { createWeek } from "@/app/actions";
import { DayCard } from "@/components/DayCard";
import { SignOutButton } from "@/components/SignOutButton";
import { dayDate, homeWeekStart, weekLabel, weekRange } from "@/lib/week";
import { loadWeek } from "@/lib/weeks";

export default async function Home() {
    const start = homeWeekStart();
    const days = await loadWeek(start);

    return (
        <main className="mx-auto flex min-h-dvh max-w-[520px] flex-col px-6 pb-10">
            <header className="pt-10 pb-5">
                <h1 className="font-display text-[36px] leading-none">Menu</h1>
            </header>

            <div className="flex items-end justify-between py-4">
                <span className="text-lg">{weekLabel()}</span>
                <span className="text-sm text-faint">{weekRange(start)}</span>
            </div>

            {days === null ? (
                <div className="flex flex-1 flex-col items-center justify-center gap-2 text-center">
                    <p className="font-display text-[64px] leading-none">Oops!</p>
                    <p className="mb-5 leading-relaxed">
                        又要本喵幫你想
                        <br />
                        偶爾自己動腦好嗎⋯
                    </p>
                    <form action={createWeek}>
                        <button className="h-[55px] w-[126px] rounded-lg bg-accent font-display text-2xl text-on-accent">
                            Create
                        </button>
                    </form>
                </div>
            ) : (
                <div className="flex flex-col gap-3.5">
                    {days.map((day) => (
                        <DayCard key={day.key} day={day} date={dayDate(start, day.key)} />
                    ))}
                </div>
            )}

            <div className="mt-auto pt-10 text-center">
                <SignOutButton />
            </div>
        </main>
    );
}
