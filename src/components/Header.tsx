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
    <header className="sticky top-0 z-50 bg-navy-900/95 border-b-2 border-[var(--pixel-border)] backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-3 sm:px-4 flex items-center justify-between h-14">
        <Link href="/" className="flex items-center gap-2 font-bold tracking-tight">
          <span className="text-cyan text-lg">◈</span>
          <span className="text-sm sm:text-base">
            POOL<span className="text-gold">PILOT</span>
          </span>
          <DemoBadge />
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`px-3 py-1.5 text-xs font-bold tracking-wide transition-colors ${
                pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href))
                  ? "text-cyan bg-navy-800"
                  : "text-secondary hover:text-cyan"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setConnected(!connected)}
            className={`pixel-btn text-xs px-3 py-1.5 ${
              connected ? "btn-outline" : "btn-cyan"
            }`}
          >
            {connected ? "0xAb…Ef01" : "Connect"}
          </button>
          <button
            type="button"
            className="md:hidden text-cyan text-xl px-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="md:hidden border-t border-[var(--pixel-border)] bg-navy-900 px-3 py-2 flex flex-col gap-1">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className={`px-3 py-2 text-sm font-bold ${
                pathname === item.href ? "text-cyan" : "text-secondary"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
