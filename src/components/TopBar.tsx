"use client";

import Link from "next/link";
import { DesktopNav } from "@/components/DesktopNav";
import { ConnectButton } from "@/components/ConnectButton";

export function TopBar() {
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--border)] bg-[color-mix(in_srgb,var(--bg)_92%,transparent)] backdrop-blur-xl">
      <div className="max-w-[440px] mx-auto px-[18px] h-[68px] flex items-center justify-between gap-3">
        <Link href="/" className="flex items-center gap-2.5 min-h-[44px] shrink-0 group" aria-label="Pool Pilot home">
          <span className="w-8 h-8 rounded-[10px] bg-[var(--lime)] text-white flex items-center justify-center font-display font-semibold text-sm shadow-sm transition-transform group-hover:scale-105" aria-hidden>P</span>
          <span className="font-display text-[19px] font-semibold tracking-tight">Pool Pilot</span>
        </Link>
        <div className="flex items-center gap-2 shrink-0">
          <Link href="/about" className="hidden sm:flex btn btn-secondary text-xs min-h-[36px] px-3">About</Link>
          <ConnectButton />
        </div>
      </div>
      <div className="hidden"><DesktopNav /></div>
    </header>
  );
}
