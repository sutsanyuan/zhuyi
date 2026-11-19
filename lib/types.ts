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

// ── 第 9 課：料理資料庫 ──
export type Season = "春" | "夏" | "秋" | "冬";

// 資料庫裡的一道料理（對應 Supabase 的 recipes 表）
export type Recipe = {
    id: string;
    name: string;
    type: Dish["type"];
    cuisine: string;
    main: string;
    difficulty: 1 | 2 | 3;
    minutes: number;
    bento: boolean;
    seasons: Season[]; // 空陣列 = 四季都可以
    ingredients: Omit<Ingredient, "freeze">[];
};

// 排菜單時要遵守的條件
export type PlanRules = {
    dislikes: string[]; // 不吃的食材
    recent: string[]; // 最近吃過的菜名
    season: Season; // 現在的季節
};
