import Link from "next/link";
import { TrendingList } from "@/components/TrendingList";
import { PoolPilotLaunches } from "@/components/PoolPilotLaunches";

export default function LeaderboardPage() {
  return (
    <div className="space-y-6 pb-4 max-w-lg">
      <div>
        <h1 className="font-display text-xl font-bold mb-1">Leaderboard</h1>
        <p className="text-secondary text-sm leading-relaxed">
          Live volume and new pairs on Robinhood Chain. Pool Pilot launches are
          listed separately.
        </p>
      </div>

      <PoolPilotLaunches />

      <TrendingList title="Top volume on-chain" limit={15} />

      <p className="text-[11px] text-muted">
        Rankings come from GeckoTerminal.{" "}
        <Link href="/books" className="text-lime">
          Full explore
        </Link>
      </p>
    </div>
  );
}
