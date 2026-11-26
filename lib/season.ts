import type { Season } from "@/lib/types";

// 用台灣時間取出「幾月」（1～12）
// 伺服器在 Vercel 上用的是 UTC，比台灣慢 8 小時，所以要指定時區
function taipeiMonth(date: Date): number {
    const month = new Intl.DateTimeFormat("en-US", {
        timeZone: "Asia/Taipei",
        month: "numeric",
    }).format(date);
    return Number(month);
}

// 現在是什麼季節？3～5 春、6～8 夏、9～11 秋、12～2 冬
// date 沒有傳的話，就用「現在」
export function currentSeason(date: Date = new Date()): Season {
    const month = taipeiMonth(date);

    // TODO：依照 month 回傳 "春"、"夏"、"秋" 或 "冬"
    //   提示：
    //   - 「3 到 5 月」可以寫成 month >= 3 && month <= 5
    //   - 每一季一行：if (條件) return "春";
    //   - 冬天跨年（12、1、2 月），不好寫成一個範圍。
    //     想想看：前面三季都沒回傳的話，剩下的是什麼？
    if (month >= 3 && month <= 5) return "春";
    if (month >= 6 && month <= 8) return "夏";
    if (month >= 9 && month <= 11) return "秋";
    return "冬";
}
