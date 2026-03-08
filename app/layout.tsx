import type { Metadata } from "next";
import {
    DM_Serif_Display,
    DM_Mono,
    Outfit,
    Syne,
    Inter,
} from "next/font/google";
import "./globals.css";

import { SessionProvider } from "next-auth/react";

const dmSerif = DM_Serif_Display({
    subsets: ["latin"],
    weight: ["400"],
    variable: "--font-dm-serif",
});
const dmMono = DM_Mono({
    subsets: ["latin"],
    weight: ["400", "500"],
    variable: "--font-dm-mono",
});
const outfit = Outfit({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600"],
    variable: "--font-outfit",
});
const syne = Syne({
    subsets: ["latin"],
    weight: ["400", "700", "800"],
    variable: "--font-syne",
});
const inter = Inter({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600"],
    variable: "--font-inter",
});

export const metadata: Metadata = {
    title: "makemyfolio",
    description: "Generate portfolio powered by AI!",
};

export default function RootLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <html
            lang="en"
            className={`${dmSerif.variable} ${dmMono.variable} ${outfit.variable} ${syne.variable} ${inter.variable}`}
        >
            <body className="antialiased">
                <SessionProvider>{children}</SessionProvider>
            </body>
        </html>
    );
}
