import type { Metadata } from "next";
import { Amatic_SC, Noto_Sans_TC } from "next/font/google";
import { TabBar } from "@/components/TabBar";
import "./globals.css";

const amatic = Amatic_SC({
    weight: ["700"],
    variable: "--font-amatic",
    subsets: ["latin"],
});

const notoTC = Noto_Sans_TC({
    weight: ["400", "500", "700"],
    subsets: ["latin"],
    variable: "--font-noto-tc",
    preload: false,
});

export const metadata: Metadata = {
    title: "貓有煮意",
    description: "每週備餐：四天晚餐和隔天便當，一次排好。",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="zh-Hant" className={`${amatic.variable} ${notoTC.variable}`}>
            <body className={"font-sans antialiased"}>
                {children}
                <TabBar />
            </body>
        </html>
    );
}
