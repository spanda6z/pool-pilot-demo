"use client";

import Link from "next/link";
import { useState } from "react";

export function TopBar() {
  const [connected, setConnected] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--bg)]">
      <div className="max-w-lg md:max-w-2xl lg:max-w-3xl mx-auto px-4 h-14 flex items-center justify-between gap-3">
        <Link href="/" className="flex items-center gap-2 min-h-[44px]">
          <span
            className="w-8 h-8 rounded-full bg-[var(--lime)] text-[var(--lime-text)] flex items-center justify-center font-display font-bold text-sm"
            aria-label="Pool Pilot logo"
          >
            P
          </span>
          <span className="font-display font-bold text-base tracking-tight hidden xs:inline">
            Pool Pilot
          </span>
        </Link>

        <div className="flex items-center gap-2">
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
