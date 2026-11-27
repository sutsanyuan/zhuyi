import type { Day } from "@/lib/types";

const EN_DAY = { sun: "Sun", mon: "Mon", tue: "Tue", thu: "Thu" };

type Props = {
    day: Day; // 這一天的資料：key、portion（份量）、dishes（菜）
    date: string; // 這一天的日期，例如 "11/29"
};

// 首頁總覽的一天（Sherry 的 Figma：01-1 本週菜單｜Filled）
export function DayCard({ day, date }: Props) {
    const names = day.portion === "off" || day.dishes.length === 0 ? ["-"] : day.dishes.map((d) => d.name);

    return (
        <div className="flex bg-surface">
            {/* 左邊：橘色方塊，Sun + 日期 */}
            <div className="flex w-[86px] shrink-0 flex-col items-center justify-center gap-2 bg-accent p-5 text-on-accent">
                <span className="font-display text-[30px] leading-none">{EN_DAY[day.key]}</span>
                <span className="text-xs">{date}</span>
            </div>

            {/* 右邊：菜名清單 + 份量圓點 */}
            <div className="flex flex-1 items-center gap-2 p-5">
                <ul className="flex-1 divide-y divide-dashed divide-[#c6c6c6]">
                    {names.map((name) => (
                        <li key={name} className="py-2 text-[15px] leading-none first:pt-0 last:pb-0">
                            {name}
                        </li>
                    ))}
                </ul>
                <PortionDots portion={day.portion} />
            </div>
        </div>
    );
}

// 份量圓點：四人份 ●●、兩人份 ●○、不煮 ○○
function PortionDots({ portion }: { portion: Day["portion"] }) {
    const first = portion === "off" ? "bg-[#c6c6c6]" : "bg-accent";
    const second = portion === "four" ? "bg-accent" : "bg-[#c6c6c6]";
    const label = { four: "四人份", two: "兩人份", off: "不煮" }[portion];

    return (
        <span className="flex shrink-0 gap-1.5" aria-label={label}>
            <span className={`size-[11px] rounded-full ${first}`} />
            <span className={`size-[11px] rounded-full ${second}`} />
        </span>
    );
}
