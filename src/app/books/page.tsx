"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { MOCK_BOOKS } from "@/lib/mock-data";
import type { BookStatus } from "@/lib/mock-data";

const FILTERS: { id: string; label: string; match?: (s: BookStatus) => boolean }[] = [
  { id: "all", label: "All" },
  { id: "trending", label: "Trending", match: () => true },
  { id: "new", label: "New", match: (s) => s === "demo" || s === "seats_available" },
  { id: "filling", label: "Filling", match: (s) => s === "seats_available" },
];

export default function ExplorePage() {
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState("all");

  const list = useMemo(() => {
    let rows = [...MOCK_BOOKS];
    const f = FILTERS.find((x) => x.id === filter);
    if (f?.match) rows = rows.filter((b) => f.match!(b.status));
    if (q.trim()) {
      const s = q.trim().toLowerCase();
      rows = rows.filter(
        (b) =>
          b.symbol.toLowerCase().includes(s) ||
          b.name.toLowerCase().includes(s) ||
          b.tokenAddress.toLowerCase().includes(s) ||
          b.id.toLowerCase().includes(s)
      );
    }
    if (filter === "trending") {
      rows.sort((a, b) => parseFloat(b.volume24h) - parseFloat(a.volume24h));
    }
    return rows;
  }, [q, filter]);

  return (
    <div className="space-y-5 pb-4">
      <h1 className="font-display text-xl font-bold">Explore</h1>

      <input
        type="search"
        placeholder="Search ticker or 0x address"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        aria-label="Search books"
      />

      <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
        {FILTERS.map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => setFilter(f.id)}
            className={`pill whitespace-nowrap min-h-[36px] px-3 cursor-pointer border ${
              filter === f.id
                ? "bg-[var(--lime)] text-[var(--lime-text)] border-transparent"
                : "pill-muted"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {list.length === 0 ? (
        <div className="card p-8 text-center space-y-3">
          <p className="text-secondary text-sm">No books match that search.</p>
          <Link href="/launch" className="btn btn-primary inline-flex">
            Launch a coin
          </Link>
        </div>
      ) : (
        <div className="card divide-y divide-[var(--divider)] overflow-hidden">
          {list.map((b) => {
            const seats = Math.min(b.seatsTaken, 18);
            const change = b.status === "full" ? 12.4 : b.status === "seats_available" ? 3.1 : -1.2;
            return (
              <Link
                key={b.id}
                href={`/books/${b.id}`}
                className="flex items-center gap-3 p-3.5 hover:bg-[var(--control)] min-h-[64px]"
              >
                <span className="w-10 h-10 rounded-full bg-[var(--control)] border border-[var(--border)] flex items-center justify-center font-display text-xs font-bold shrink-0">
                  {b.symbol.slice(0, 2)}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-display font-bold text-sm">${b.symbol}</span>
                    <span className="text-[10px] text-muted">{seats}/18</span>
                  </div>
                  <div className="text-xs text-muted">Vol {b.volume24h} ETH</div>
                </div>
                <div className="text-right shrink-0">
                  <div className="font-display text-sm font-bold tabular-nums">
                    {b.seatPriceEth} ETH
                  </div>
                  <div className={`text-xs font-medium tabular-nums ${change >= 0 ? "text-up" : "text-down"}`}>
                    {change >= 0 ? "+" : ""}
                    {change.toFixed(1)}%
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}

      <p className="text-[11px] text-muted">Demo list — replace with indexer feeds.</p>
    </div>
  );
}
