"use client";

import Link from "next/link";
import { DesktopNav } from "@/components/DesktopNav";
import { ConnectButton } from "@/components/ConnectButton";

export function TopBar() {
  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--bg)]/95 backdrop-blur-sm">
      <div className="max-w-lg md:max-w-3xl lg:max-w-5xl mx-auto px-4 h-14 flex items-center justify-between gap-3">
        <div className="flex items-center gap-4 min-w-0">
          <Link href="/" className="flex items-center gap-2 min-h-[44px] shrink-0">
            <span
              className="w-8 h-8 rounded-full bg-[var(--lime)] text-[var(--lime-text)] flex items-center justify-center font-display font-bold text-sm"
              aria-label="Pool Pilot"
            >
              P
            </span>
            <span className="font-display font-bold text-base tracking-tight">
              Pool Pilot
            </span>
          </Link>
          <DesktopNav />
        </div>

        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
          <Link
            href="/security"
            className="text-xs text-[var(--text-muted)] hover:text-[var(--text-secondary)] px-2 py-2 min-h-[44px] flex items-center"
          >
            Security
          </Link>
          <ConnectButton />
        </div>
      </div>
    </header>
  );
}
