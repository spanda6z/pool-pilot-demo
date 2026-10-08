"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { TrendingList } from "@/components/TrendingList";
import { PoolPilotLaunches } from "@/components/PoolPilotLaunches";

const tabs = ["Trending", "New", "Volume", "Filling"];

export default function MarketsPage() {
  const [query, setQuery] = useState("");
  const [tab, setTab] = useState("Trending");
  const normalized = query.trim().toLowerCase();
  const hasFilter = Boolean(normalized);

  const helper = useMemo(() => {
    if (!hasFilter) return "Live pairs update from GeckoTerminal.";
    return `Filtering is ready for ${normalized}; live pair search is handled by the data feed below.`;
  }, [hasFilter, normalized]);

  return (
    <div className="space-y-6 pb-4">
      <header className="space-y-1">
        <div className="flex items-baseline justify-between gap-3">
          <h1 className="text-[28px] font-display font-semibold">Markets</h1>
          <span className="pill pill-muted text-[10px]">Live feed</span>
        </div>
        <p className="text-secondary text-sm">Discover pools, compare momentum, and verify every contract before trading.</p>
      </header>

      <div className="grid grid-cols-2 card overflow-hidden">
        <div className="p-4"><span className="text-xs text-secondary block">24h volume</span><b className="font-display text-[26px]">$191k</b><span className="text-[10px] text-muted block mt-1">Sample dashboard metric</span></div>
        <div className="p-4 border-l border-[var(--divider)]"><span className="text-xs text-secondary block">Active traders</span><b className="font-display text-[26px]">4,812</b><span className="text-[10px] text-muted block mt-1">Sample dashboard metric</span></div>
      </div>

      <div className="relative">
        <label htmlFor="market-search" className="sr-only">Search markets</label>
        <input id="market-search" value={query} onChange={(e) => setQuery(e.target.value.slice(0, 64))} placeholder="Search ticker or 0x address" autoComplete="off" />
        {query && <button type="button" onClick={() => setQuery("")} className="absolute right-2 top-1/2 -translate-y-1/2 btn btn-ghost text-xs min-h-[36px] px-3" aria-label="Clear search">Clear</button>}
      </div>

      <div className="flex gap-1 border-b border-[var(--divider)] overflow-x-auto" role="tablist" aria-label="Market sort">
        {tabs.map((t) => {
          const active = tab === t;
          return <button key={t} type="button" role="tab" aria-selected={active} onClick={() => setTab(t)} className={`bg-transparent border-0 px-3 py-2.5 min-h-[44px] whitespace-nowrap ${active ? "text-[var(--text)] font-semibold border-b-2 border-[var(--lime)]" : "text-secondary hover:text-[var(--text)]"}`}>{t}</button>;
        })}
      </div>

      <div className="rounded-[14px] border border-[var(--border)] bg-[var(--control)] px-3 py-2 text-[11px] text-secondary">
        <span className="text-[var(--lime)] font-medium">{tab}</span> · {helper}
      </div>

      <PoolPilotLaunches />
      <TrendingList title="Trending on Robinhood Chain" limit={20} />
      <p className="text-[11px] text-muted leading-relaxed border-t border-[var(--divider)] pt-5">Live market pairs come from GeckoTerminal. Open DexScreener for charts. Pool Pilot does not custody funds — you trade in your own wallet.</p>
      <Link href="/launch" className="btn btn-primary btn-full">Launch on Pool Pilot</Link>
    </div>
  );
}
