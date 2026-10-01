import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { TopBar } from "@/components/TopBar";
import { BottomTabs } from "@/components/BottomTabs";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const space = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
  weight: ["500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Pool Pilot — Meme with a team",
  description:
    "Launch a coin, sit 18 seats with friends, trade on one Uniswap v3 pool. Non-custodial — you sign.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${space.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <TopBar />
        <main className="flex-1 w-full max-w-lg mx-auto px-4 pt-4 pb-2 md:max-w-2xl lg:max-w-3xl">
          {children}
        </main>
        <div className="tab-spacer" aria-hidden />
        <BottomTabs />
      </body>
    </html>
  );
}
