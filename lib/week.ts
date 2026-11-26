// 用台灣時間取出日期，格式是 "2026-11-27"
// （en-CA 這個地區的日期格式剛好就是 年-月-日）
function taipeiDate(date: Date): string {
    return new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Taipei" }).format(date);
}

// 這天是星期幾？0 = 週日、1 = 週一 … 4 = 週四、5 = 週五、6 = 週六
function weekday(isoDate: string): number {
    return new Date(`${isoDate}T00:00:00Z`).getUTCDay();
}

// 往後（正數）或往前（負數）加幾天
// 例如 addDays("2026-11-27", 2) → "2026-11-29"、addDays("2026-11-26", -4) → "2026-11-22"
function addDays(isoDate: string, days: number): string {
    const d = new Date(`${isoDate}T00:00:00Z`);
    d.setUTCDate(d.getUTCDate() + days);
    return d.toISOString().slice(0, 10);
}

// 主畫面要顯示哪一週？回傳那一週的週日
// 週日～週四 → 本週；週五、週六 → 下週
export function homeWeekStart(date: Date = new Date()): string {
    const today = taipeiDate(date); // 例如 "2026-11-26"
    const wd = weekday(today); // 例如 4（週四）

    if (wd >= 5) {
        return addDays(today, 7 - wd);
    }
    return addDays(today, -wd);
}
