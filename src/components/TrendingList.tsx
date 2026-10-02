"use client";

import { useCallback, useEffect, useState } from "react";
import {
  formatPct,
  formatUsd,
  type TrendingPair,
} from "@/lib/trending";

const TABS = [
  { id: "trending", label: "Trending" },
  { id: "volume", label: "Top volume" },
  { id: "new", label: "New" },
] as const;

const VENUES = [
  { id: "all", label: "All DEXes" },
  { id: "uniswap", label: "Uniswap" },
  { id: "pons", label: "Pons" },
] as const;

export function TrendingList({
  title = "Trending on Robinhood Chain",
  limit = 12,
}: {
  title?: string;
  limit?: number;
}) {
  const [tab, setTab] = useState<(typeof TABS)[number]["id"]>("trending");
  const [venue, setVenue] = useState<(typeof VENUES)[number]["id"]>("all");
  const [pairs, setPairs] = useState<TrendingPair[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updatedAt, setUpdatedAt] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const q = new URLSearchParams({ tab });
      if (venue !== "all") q.set("venue", venue);
      const res = await fetch(`/api/trending?${q}`, { cache: "no-store" });
      const json = await res.json();
      if (!json.ok) throw new Error(json.error || "Failed to load");
      setPairs(json.pairs || []);
      setUpdatedAt(json.updatedAt || null);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load");
      setPairs([]);
    } finally {
      setLoading(false);
    }
  }, [tab, venue]);

  useEffect(() => {
    load();
  }, [load]);

  const rows = pairs.slice(0, limit);

  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <h2 className="font-display text-sm font-bold text-muted uppercase tracking-wide">
          {title}
        </h2>
        <button type="button" onClick={load} className="text-[11px] text-lime min-h-[32px] px-2">
          Refresh
        </button>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={`pill whitespace-nowrap min-h-[36px] px-3 cursor-pointer border ${
              tab === t.id
                ? "bg-[var(--lime)] text-[var(--lime-text)] border-transparent"
                : "pill-muted"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
        {VENUES.map((v) => (
          <button
            key={v.id}
            type="button"
            onClick={() => setVenue(v.id)}
            className={`pill whitespace-nowrap min-h-[32px] px-2.5 text-[11px] cursor-pointer border ${
              venue === v.id
                ? "bg-[var(--control)] text-[var(--text)] border-[var(--lime)]"
                : "pill-muted"
            }`}
          >
            {v.label}
          </button>
        ))}
      </div>

      {loading && (
        <div className="card p-6 text-center text-muted text-sm">Loading live pairs…</div>
      )}
      {error && !loading && (
        <div className="card p-4 text-sm text-down space-y-2">
          <p>Could not load live data: {error}</p>
          <button type="button" onClick={load} className="btn btn-secondary text-sm">
            Retry
          </button>
        </div>
      )}
      {!loading && !error && rows.length === 0 && (
        <div className="card p-6 text-center text-secondary text-sm">
          No pairs for this filter right now.
        </div>
      )}
      {!loading && rows.length > 0 && (
        <div className="card divide-y divide-[var(--divider)] overflow-hidden">
          {rows.map((p) => (
            <a
              key={p.id}
              href={p.dexscreenerUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3.5 hover:bg-[var(--control)] min-h-[64px]"
            >
              <span className="w-10 h-10 rounded-full bg-[var(--control)] border border-[var(--border)] flex items-center justify-center font-display text-[10px] font-bold shrink-0">
                {p.symbol.slice(0, 3)}
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-display font-bold text-sm">${p.symbol}</span>
                  <span className="text-[10px] text-muted">{p.dexLabel}</span>
                </div>
                <div className="text-xs text-muted truncate">
                  Vol {formatUsd(p.volume24h)} · Liq {formatUsd(p.liquidityUsd)}
                </div>
              </div>
              <div className="text-right shrink-0">
                <div className="font-display text-sm font-bold tabular-nums">
                  {formatUsd(p.priceUsd)}
                </div>
                <div
                  className={`text-xs font-medium tabular-nums ${
                    (p.change24h ?? 0) >= 0 ? "text-up" : "text-down"
                  }`}
                >
                  {formatPct(p.change24h)}
                </div>
              </div>
            </a>
          ))}
        </div>
      )}
      {updatedAt && (
        <p className="text-[10px] text-muted">
          Live from GeckoTerminal · Robinhood Chain ·{" "}
          {new Date(updatedAt).toLocaleTimeString()}
        </p>
      )}
    </section>
  );
}
