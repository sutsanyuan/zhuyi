export type DayKey = "sun" | "mon" | "tue" | "thu";
export type Portion = "four" | "two" | "off";
export type Group = "肉類・海鮮" | "蔬菜" | "菇類" | "豆類與蛋" | "乾貨與調味料" | "其他";
export type Ingredient = {
    name: string;
    qty: number | string;
    unit: string;
    group: Group;
    freeze: boolean;
};
export type Dish = {
    id: string;
    name: string;
    type: "肉" | "海鮮" | "菜" | "蛋" | "豆" | "菇" | "湯" | "主食";
    challenge: boolean;
    minutes: number | null;
    ingredients: Ingredient[];
    note?: string;
};
export type Day = {
    key: DayKey;
    portion: Portion;
    dishes: Dish[];
};
export type Week = {
    id: string;
    start: string;
    days: Day[];
    saved: boolean;
};
// 採買清單上的一列
export type ShoppingItem = {
    name: string;
    unit: string;
    group: Group;
    qty: number | null; // 加總後的數量；「適量」這種沒有數字的是 null
    qtyLabel: string; // 畫面上顯示的文字，例如「1.5 斤」「適量」
    days: DayKey[]; // 哪幾天要用
};
