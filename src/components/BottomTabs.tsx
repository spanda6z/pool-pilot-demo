"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const TABS = [
  { href: "/", label: "Home", icon: "⌂" },
  { href: "/books", label: "Markets", icon: "⌁" },
  { href: "/portfolio", label: "Seats", icon: "▱" },
  { href: "/verify", label: "Projects", icon: "□" },
  { href: "/launch", label: "Launch", icon: "+" },
];

export function BottomTabs() {
  const pathname = usePathname();
  return (
    <nav className="fixed bottom-0 inset-x-0 z-50 border-t border-[var(--border)] bg-[color-mix(in_srgb,var(--card)_94%,transparent)] backdrop-blur-xl shadow-[0_-8px_24px_rgb(13_27_42_/_0.05)]" aria-label="Main navigation">
      <div className="max-w-[440px] mx-auto flex items-stretch justify-around px-1 pb-[env(safe-area-inset-bottom)]">
        {TABS.map((tab) => {
          const active = tab.href === "/" ? pathname === "/" : pathname.startsWith(tab.href);
          return (
            <Link key={tab.href} href={tab.href} aria-current={active ? "page" : undefined}
              className={"relative flex-1 flex flex-col items-center justify-center gap-1 py-2 min-h-[58px] text-[11px] font-medium transition-colors " + (active ? "text-[var(--lime)] font-semibold" : "text-[var(--text-muted)] hover:text-[var(--text-secondary)]")}>
              {active && <span className="absolute top-0 h-0.5 w-8 rounded-full bg-[var(--lime)]" aria-hidden />}
              <span className={"text-[21px] leading-none transition-transform " + (active ? "scale-105" : "")} aria-hidden>{tab.icon}</span>
              <span>{tab.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
