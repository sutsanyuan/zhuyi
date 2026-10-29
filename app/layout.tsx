import type { Metadata } from "next";
import { Zen_Maru_Gothic, Noto_Sans_TC } from "next/font/google";
import "./globals.css";

const zenMaru = Zen_Maru_Gothic({
    weight: ["700", "900"],
    variable: "--font-zen-maru", // 對應 globals.css 裡的 var(--font-zen-maru)
    subsets: ["latin"],
    preload: false, // 中日文字體很大，不預先載入
});

const notoTC = Noto_Sans_TC({
    weight: ["400", "500", "700"],
    subsets: ["latin"],
    variable: "--font-noto-tc",
    preload: false,
});

export const metadata: Metadata = {
    title: "煮意",
    description: "每週備餐：四天晚餐和隔天便當，一次排好。",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="zh-Hant" className={`${zenMaru.variable} ${notoTC.variable}`}>
            <body className={"font-sans antialiased"}>{children}</body>
        </html>
    );
}
