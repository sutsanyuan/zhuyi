export type DayKey = "sun"|"mon"|"tue"|"thu";
export type Portion =  "four"|"two"|"off";
export type Group = "肉類・海鮮" | "蔬菜" | "菇類" | "豆類與蛋" | "乾貨與調味料" | "其他";
export type Ingredient = {
    name: string;
    qty: number | string;
    unit: string;
    group: Group;
    freeze: boolean;
};
export type Dish ={
    id: string;
    name: string;
    type: "肉"|"海鮮"|"菜"|"蛋"|"豆"|"菇"|"湯"|"主食";
    challenge: boolean;
    minutes: number|null;
    ingredients: Ingredient[];
    note?: string; 
}
export type Day={
    key: DayKey;
    portion: Portion;
    dishes: Dish[];
}
export type Week = {
    id: string;
    start: string;
    days: Day[];
    saved: boolean;
}