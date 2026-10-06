import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";
import { TopBar } from "@/components/TopBar";
import { BottomTabs } from "@/components/BottomTabs";
import { SiteFooter } from "@/components/SiteFooter";
import { NetworkBanner } from "@/components/NetworkBanner";

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
  title: {
    default: "Pool Pilot — Meme with a team",
    template: "%s · Pool Pilot",
  },
  description:
    "Launch a coin, sit 18 seats with friends, trade on Uniswap on Robinhood Chain. Non-custodial — you sign every transaction.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://poolpilot.xyz"
  ),
  openGraph: {
    title: "Pool Pilot — Meme with a team",
    description:
      "Non-custodial launch and seats on Robinhood Chain. You sign every transaction.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Pool Pilot",
    description: "Meme with a team. Don't meme alone.",
  },
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
        <Providers>
          <TopBar />
          <NetworkBanner />
          <main className="flex-1 w-full max-w-lg mx-auto px-4 pt-4 pb-2 md:max-w-3xl lg:max-w-5xl">
            {children}
          </main>
          <SiteFooter />
          <div className="tab-spacer" aria-hidden />
          <BottomTabs />
        </Providers>
      </body>
    </html>
  );
}
