import type { Group, ShoppingItem, Week } from "@/lib/types";
// 份量倍數：食譜都以四人份計算
const PORTION_FACTOR = { four: 1, two: 0.5, off: 0 };
// 採買清單的分組順序（跟逛市場的順序一樣）
const GROUP_ORDER: Group[] = ["肉類・海鮮", "蔬菜", "菇類", "豆類與蛋", "乾貨與調味料", "其他"];
