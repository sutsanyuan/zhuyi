"use client";

import { useState } from "react";
import type { ShoppingItem } from "@/lib/types";

type Props = { item: ShoppingItem };

export function ShopItem({ item }: Props) {
    // done：有沒有買到；setDone：用來改 done 的函式
    const [done, setDone] = useState(false);
    return (
        <label className="flex items-center gap-3 border-b border-line py-3">
            <input
                type="checkbox"
                checked={done}
                onChange={() => setDone(!done)}
                className="size-5 accent-leek"
            />
            <span className={done ? "flex-1 text-faint line-through" : "flex-1"}>{item.name}</span>
            <span className={`text-sm  ${done ? "text-faint" : "text-muted"}`}>
                {item.qtyLabel}
            </span>
        </label>
    );
}
