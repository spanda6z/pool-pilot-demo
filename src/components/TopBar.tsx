"use client";

import Link from "next/link";
import { useState } from "react";
import { SITE } from "@/lib/config";

export function TopBar() {
  const [connected, setConnected] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--bg)]/95 backdrop-blur-sm">
      <div className="max-w-lg md:max-w-2xl lg:max-w-3xl mx-auto px-4 h-14 flex items-center justify-between gap-3">
        <Link href="/" className="flex items-center gap-2 min-h-[44px]">
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

        <div className="flex items-center gap-1 sm:gap-2">
          <Link
            href="/about"
            className="text-xs text-[var(--text-muted)] hover:text-[var(--text-secondary)] px-2 py-2 min-h-[44px] hidden sm:flex items-center"
          >
            About
          </Link>
          <Link
            href="/security"
            className="text-xs text-[var(--text-muted)] hover:text-[var(--text-secondary)] px-2 py-2 min-h-[44px] flex items-center"
          >
            Security
          </Link>
          <button
            type="button"
            onClick={() => setConnected(!connected)}
            className={`btn text-sm min-h-[40px] px-4 ${
              connected ? "btn-ghost" : "btn-primary"
            }`}
          >
            {connected ? "0xAb…Ef01" : "Connect"}
          </button>
        </div>
      </div>
    </header>
  );
}
