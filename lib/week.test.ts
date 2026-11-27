import { describe, expect, it } from "vitest";
import { dayDate, homeWeekStart, weekLabel, weekRange } from "@/lib/week";

// 2026 年 11 月：22 日是週日，26 日週四，27 日週五，29 日週日
describe("homeWeekStart", () => {
    it("週日～週四：顯示本週（往回找週日）", () => {
        expect(homeWeekStart(new Date("2026-11-22T12:00:00+08:00"))).toBe("2026-11-22"); // 週日當天
        expect(homeWeekStart(new Date("2026-11-23T12:00:00+08:00"))).toBe("2026-11-22"); // 週一
        expect(homeWeekStart(new Date("2026-11-26T23:59:00+08:00"))).toBe("2026-11-22"); // 週四深夜
    });

    it("週五、週六：顯示下週（往後找週日）", () => {
        expect(homeWeekStart(new Date("2026-11-27T00:00:00+08:00"))).toBe("2026-11-29"); // 週五一到
        expect(homeWeekStart(new Date("2026-11-28T12:00:00+08:00"))).toBe("2026-11-29"); // 週六
    });

    it("跨月、跨年也算得對", () => {
        expect(homeWeekStart(new Date("2026-12-04T12:00:00+08:00"))).toBe("2026-12-06"); // 週五 → 下個月的週日
        expect(homeWeekStart(new Date("2027-01-01T12:00:00+08:00"))).toBe("2027-01-03"); // 元旦是週五 → 跨年
    });

    it("用台灣時間算：台灣週五凌晨，伺服器（UTC）還是週四", () => {
        // 台灣 11/27（五）00:30 = UTC 11/26（四）16:30
        expect(homeWeekStart(new Date("2026-11-26T16:30:00Z"))).toBe("2026-11-29");
    });
});

describe("dayDate、weekRange、weekLabel", () => {
    it("算出每一天的月/日，跨月也對", () => {
        expect(dayDate("2026-11-29", "sun")).toBe("11/29");
        expect(dayDate("2026-11-29", "thu")).toBe("12/3");
    });

    it("一週的範圍是週日到週四", () => {
        expect(weekRange("2026-11-29")).toBe("11/29 – 12/3");
    });

    it("週五、週六的標題是下週菜單", () => {
        expect(weekLabel(new Date("2026-11-26T23:59:00+08:00"))).toBe("本週菜單");
        expect(weekLabel(new Date("2026-11-27T00:00:00+08:00"))).toBe("下週菜單");
    });
});
