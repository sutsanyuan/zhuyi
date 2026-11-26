import { describe, expect, it } from "vitest";
import { currentSeason } from "@/lib/season";

describe("currentSeason", () => {
    it("3～5 月是春", () => {
        expect(currentSeason(new Date("2026-04-10T12:00:00+08:00"))).toBe("春");
    });

    it("6～8 月是夏", () => {
        expect(currentSeason(new Date("2026-07-01T12:00:00+08:00"))).toBe("夏");
    });

    it("9～11 月是秋", () => {
        expect(currentSeason(new Date("2026-10-20T12:00:00+08:00"))).toBe("秋");
    });

    it("12～2 月是冬（跨年的季節）", () => {
        expect(currentSeason(new Date("2026-12-15T12:00:00+08:00"))).toBe("冬");
        expect(currentSeason(new Date("2027-01-15T12:00:00+08:00"))).toBe("冬");
        expect(currentSeason(new Date("2027-02-28T12:00:00+08:00"))).toBe("冬");
    });

    it("季節交界的那天：2 月最後一天還是冬，3 月 1 日就是春", () => {
        expect(currentSeason(new Date("2027-02-28T23:59:00+08:00"))).toBe("冬");
        expect(currentSeason(new Date("2027-03-01T00:00:00+08:00"))).toBe("春");
    });

    it("用台灣時間算：台灣 12/1 凌晨，伺服器（UTC）還是 11/30", () => {
        // 台灣時間 12/1 00:30 = UTC 11/30 16:30
        expect(currentSeason(new Date("2026-11-30T16:30:00Z"))).toBe("冬");
    });
});
