"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

// 底部五個分頁（Sherry 的 Figma：Bottom Navigation）
const TABS = [
    { href: "/", label: "Menu", icon: "M4.5 6.5v6.2a2 2 0 0 0 2 2v12.8M4.5 6.5v5M8.5 6.5v6.2a2 2 0 0 1-2 2M29.5 6.5c-2 1.6-2.6 4.5-2.6 8.2h2.6v12.8M17 8.5a8.5 8.5 0 1 0 0 17a8.5 8.5 0 1 0 0-17M17 11.8a5.2 5.2 0 1 0 0 10.4a5.2 5.2 0 1 0 0-10.4" },
    { href: "/shop", label: "Shopping", icon: "M7 11.5h20l-1.6 16.2a1.6 1.6 0 0 1-1.6 1.4H10.2a1.6 1.6 0 0 1-1.6-1.4zM12.5 14.5V10a4.5 4.5 0 0 1 9 0v4.5" },
    { href: "/history", label: "History", icon: "M5 24.5h22M6.8 24.5a10.2 10.2 0 0 1 20.4 0M17 12.5V10.6M15.3 10.6h3.4" },
    { href: "/recipes", label: "My Recipes", icon: "M9 5.5h15.5a1.5 1.5 0 0 1 1.5 1.5v20.5H10.5A2.5 2.5 0 0 1 8 25V7a1.5 1.5 0 0 1 1-1.5zM8 25a2.5 2.5 0 0 1 2.5-2.5H26M13 10.5h8M13 14h5" },
    { href: "/settings", label: "Setting", icon: "M7.5 11h11M23.5 11h3M7.5 23h3M15.5 23h11M21 8.5a2.5 2.5 0 1 0 0 5a2.5 2.5 0 1 0 0-5M13 20.5a2.5 2.5 0 1 0 0 5a2.5 2.5 0 1 0 0-5" },
];

export function TabBar() {
    const pathname = usePathname();
    if (pathname.startsWith("/login")) return null; // 登入頁不顯示

    return (
        <nav className="fixed inset-x-0 bottom-0 z-10 bg-surface pb-[env(safe-area-inset-bottom)]">
            <ul className="mx-auto grid max-w-[520px] grid-cols-5">
                {TABS.map((tab) => {
                    const active = tab.href === "/" ? pathname === "/" : pathname.startsWith(tab.href);
                    return (
                        <li key={tab.href}>
                            <Link
                                href={tab.href}
                                aria-current={active ? "page" : undefined}
                                className={`flex flex-col items-center gap-1 py-2.5 font-display text-[15px] leading-none whitespace-nowrap ${active ? "text-ink" : "text-[#c6c6c6]"}`}
                            >
                                <svg viewBox="0 0 34 34" className="size-7" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                    <path d={tab.icon} />
                                </svg>
                                {tab.label}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}
