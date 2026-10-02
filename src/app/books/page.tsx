import Link from "next/link";
import { TrendingList } from "@/components/TrendingList";
import { PoolPilotLaunches } from "@/components/PoolPilotLaunches";

export default function ExplorePage() {
  return (
    <div className="space-y-8 pb-4">
      <div>
        <h1 className="font-display text-xl font-bold">Explore</h1>
        <p className="text-secondary text-sm mt-1">
          Live pairs on Robinhood Chain from Uniswap, Pons, and other indexed DEXes.
        </p>
      </div>

      <PoolPilotLaunches />

      <TrendingList title="Chain trending" limit={20} />

      <p className="text-[11px] text-muted leading-relaxed">
        Data from GeckoTerminal. Open DexScreener for charts. Pool Pilot does not
        custody funds — you trade in your own wallet.{" "}
        <Link href="/launch" className="text-lime">
          Launch on Pool Pilot
        </Link>
      </p>
    </div>
  );
}
