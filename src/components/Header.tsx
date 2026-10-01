"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { DemoBadge } from "./DemoBadge";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/books", label: "Books" },
  { href: "/swap", label: "Swap" },
  { href: "/launch", label: "Launch" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/verify", label: "Verify" },
];

export function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [connected, setConnected] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[rgba(30,58,95,0.6)] bg-[rgba(11,20,38,0.92)] backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-14 gap-3">
        <Link href="/" className="flex items-center gap-2 font-bold tracking-tight shrink-0">
          <span className="text-cyan text-lg leading-none">◈</span>
          <span className="text-sm sm:text-base tracking-wide">
            POOL<span className="text-gold">PILOT</span>
          </span>
          <DemoBadge />
        </Link>

        <nav className="hidden md:flex items-center gap-0.5">
          {NAV.map((item) => {
            const active =
              pathname === item.href ||
              (item.href !== "/" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3 py-1.5 text-xs font-semibold tracking-wide rounded-md transition-colors ${
                  active
                    ? "text-cyan bg-[rgba(34,211,238,0.1)]"
                    : "text-secondary hover:text-cyan hover:bg-[rgba(34,211,238,0.05)]"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => setConnected(!connected)}
            className={`pixel-btn text-xs px-4 py-2 min-h-[36px] ${
              connected ? "btn-outline" : "btn-cyan"
            }`}
          >
            {connected ? "0xAb…Ef01" : "Connect"}
          </button>
          <button
            type="button"
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg text-cyan hover:bg-[rgba(34,211,238,0.1)]"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            <span className="text-xl leading-none">{menuOpen ? "✕" : "☰"}</span>
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="md:hidden border-t border-[rgba(30,58,95,0.5)] bg-[rgba(11,20,38,0.98)] px-4 py-3 flex flex-col gap-1">
          {NAV.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className={`px-4 py-3 text-sm font-semibold rounded-lg ${
                  active ? "text-cyan bg-[rgba(34,211,238,0.1)]" : "text-secondary"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      )}
    </header>
  );
}
