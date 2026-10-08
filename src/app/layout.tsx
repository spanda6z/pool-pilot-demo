import type { Metadata } from "next";
import type { ReactNode } from "react";
import { IBM_Plex_Sans, Source_Serif_4 } from "next/font/google";
import " ./globals.css";
import { Providers } from "@/components/Providers";
import { TopBar } from "@/components/TopBar";
import { BottomTabs } from "@/components/BottomTabs";
import { SiteFooter } from "@/components/SiteFooter";
import { NetworkBanner } from "@/components/NetworkBanner";
import { ReferralCapture } from "@/components/ReferralCapture";

const ibm = IBM_Plex_Sans({ variable: "--font-ibm", subsets: ["latin"], weight: ["400","500","600"], display: "swap" });
const serif = Source_Serif_4({ variable: "--font-serif", subsets: ["latin"], weight: ["600"], display: "swap" });

export const metadata: Metadata = {
  title: { default: "Pool Pilot — Launch a coin with your team", template: "%s · Pool Pilot" },
  description: "A non-custodial launch and trading desk on Robinhood Chain. Eighteen seats, one pool, and you sign every transaction.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://poolpilot.xyz"),
  openGraph: { title: "Pool Pilot", description: "Launch a coin with your team.", type: "website" },
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" className={`${ibm.variable} ${serif.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <Providers>
          <ReferralCapture />
          <TopBar />
          <NetworkBanner />
          <main className="flex-1 w-full max-w-[440px] mx-auto px-[18px] pt-1 pb-6">
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
