"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/books", label: "Explore" },
  { href: "/portfolio", label: "Seats" },
  { href: "/verify", label: "Projects" },
  { href: "/launch", label: "Launch" },
  { href: "/swap", label: "Swap" },
];

export function DesktopNav() {
  const pathname = usePathname();

  return (
    <nav className="hidden md:flex items-center gap-1" aria-label="Main">
      {LINKS.map((l) => {
        const active =
          l.href === "/" ? pathname === "/" : pathname.startsWith(l.href);
        return (
          <Link
            key={l.href}
            href={l.href}
            className={`px-3 py-2 rounded-[12px] text-sm font-medium min-h-[40px] flex items-center transition-colors ${
              active
                ? "bg-[var(--lime)] text-[var(--lime-text)]"
                : "text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--control)]"
            }`}
          >
            {l.label}
          </Link>
        );
      })}
    </nav>
  );
}
