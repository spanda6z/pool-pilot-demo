import Link from "next/link";
import { TrendingList } from "@/components/TrendingList";
import { PoolPilotLaunches } from "@/components/PoolPilotLaunches";

const tabs = ["Trending", "New", "Volume", "Filling"];

export default function MarketsPage() {
  return (
    <div className="space-y-6 pb-4">
      <div className="flex items-baseline justify-between">
        <h1 className="text-[28px]">Markets</h1>
        <span className="text-xs text-muted">Sample data</span>
      </div>
      <div className="grid grid-cols-2 border-y border-[var(--divider)]">
        <div className="py-3.5"><span className="text-xs text-secondary block">24h volume</span><b className="font-display text-[26px]">$191k</b></div>
        <div className="py-3.5 pl-4 border-l border-[var(--divider)]"><span className="text-xs text-secondary block">Active traders</span><b className="font-display text-[26px]">4,812</b></div>
      </div>
      <input placeholder="Search ticker or 0x address" aria-label="Search markets" />
      <div className="flex gap-1 border-b border-[var(--divider)] overflow-x-auto">
        {tabs.map((t,i)=><button key={t} className={"bg-transparent border-0 px-3 py-2.5 whitespace-nowrap " + (i===0 ? "text-[var(--text)] font-semibold border-b-2 border-[var(--lime)]" : "text-secondary")}>{t}</button>)}
      </div>
      <PoolPilotLaunches />
      <TrendingList title="Trending on Robinhood Chain" limit={20} />
      <p className="text-[11px] text-muted leading-relaxed border-t border-[var(--divider)] pt-5">Data from GeckoTerminal. Open DexScreener for charts. Pool Pilot does not custody funds — you trade in your own wallet.</p>
      <Link href="/launch" className="btn btn-primary btn-full">Launch on Pool Pilot</Link>
    </div>
  );
}
