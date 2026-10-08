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
    <nav className="fixed bottom-0 inset-x-0 z-50 border-t border-[var(--border)] bg-[var(--card)]" aria-label="Main">
      <div className="max-w-[440px] mx-auto flex items-stretch justify-around px-1 pb-[env(safe-area-inset-bottom)]">
        {TABS.map((tab) => {
          const active = tab.href === "/" ? pathname === "/" : pathname.startsWith(tab.href);
          return (
            <Link key={tab.href} href={tab.href}
              className={`flex-1 flex flex-col items-center justify-center gap-0.5 py-2 min-h-[56px] text-[11px] font-medium ${active ? "text-[var(--lime)] font-semibold" : "text-[var(--text-muted)]"}`}>
              <span className="text-[21px] leading-none" aria-hidden>{tab.icon}</span>
              <span>{tab.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
