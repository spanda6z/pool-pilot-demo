import Link from "next/link";
import { SeatRing } from "@/components/SeatRing";
import { TrendingList } from "@/components/TrendingList";
import { PoolPilotLaunches } from "@/components/PoolPilotLaunches";
import { IS_PLACEHOLDER, SITE } from "@/lib/config";
import { MCFL } from "@/lib/tokens";

export default function HomePage() {
  return (
    <div className="space-y-8 pb-4">
      <div className="flex items-center gap-2 flex-wrap">
        <span className="pill pill-live">Live on {SITE.chainName}</span>
        {IS_PLACEHOLDER && (
          <span className="pill pill-muted">Trending is live on-chain</span>
        )}
      </div>

      <section>
        <h1 className="font-display text-2xl sm:text-3xl leading-tight mb-2">
          Meme with a team.
          <br />
          <span className="text-secondary">Don&apos;t meme alone.</span>
        </h1>
        <p className="text-secondary text-sm leading-relaxed max-w-md">
          Launch a coin, sit 18 seats with friends, trade on one Uniswap v3 pool.
          You sign every transaction.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 mt-5">
          <Link href="/launch" className="btn btn-primary btn-full sm:flex-1">
            Launch a coin
          </Link>
          <Link href="/books" className="btn btn-secondary btn-full sm:flex-1">
            Explore
          </Link>
        </div>
      </section>

      <section className="card p-5 flex flex-col sm:flex-row items-center gap-5">
        <SeatRing taken={7} total={18} size={128} label="MCFL seats" />
        <div className="flex-1 text-center sm:text-left w-full">
          <div className="text-xs text-muted uppercase tracking-wide mb-1">
            On Pool Pilot
          </div>
          <div className="font-display text-lg font-bold">${MCFL.symbol}</div>
          <p className="text-secondary text-sm mt-1">{MCFL.name}</p>
          <p className="text-[11px] text-muted font-mono mt-1 break-all">
            {MCFL.address}
          </p>
          <div className="flex flex-wrap justify-center sm:justify-start gap-2 mt-4">
            <a
              href={MCFL.explorer}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost text-sm min-h-[40px]"
            >
              Explorer
            </a>
            <a
              href={`https://dexscreener.com/robinhood/${MCFL.address}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary text-sm min-h-[40px]"
            >
              DexScreener
            </a>
            <Link href="/books/book-mcfl-001" className="btn btn-primary text-sm min-h-[40px]">
              Open book
            </Link>
          </div>
        </div>
      </section>

      <PoolPilotLaunches />

      <TrendingList title="Trending on Robinhood Chain" limit={10} />

      <section>
        <h2 className="font-display text-sm font-bold text-muted uppercase tracking-wide mb-3">
          How it works
        </h2>
        <div className="grid gap-2">
          {[
            { n: "1", t: "Name it", d: "Pick a ticker and set the min bid per seat." },
            { n: "2", t: "Mint", d: "You sign. Token and thin Uniswap v3 pool land on-chain." },
            { n: "3", t: "Seat the team", d: "Up to 18 friends sit chairs. They can sell the chair later." },
          ].map((s) => (
            <div key={s.n} className="card p-4 flex gap-3 items-start">
              <span className="w-7 h-7 rounded-full bg-[var(--lime)] text-[var(--lime-text)] flex items-center justify-center font-display text-xs font-bold shrink-0">
                {s.n}
              </span>
              <div>
                <div className="font-display font-bold text-sm">{s.t}</div>
                <p className="text-secondary text-xs mt-0.5 leading-relaxed">{s.d}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <p className="text-[11px] text-muted text-center leading-relaxed px-2">
        Non-custodial — you sign; Pool Pilot never holds funds.{" "}
        <Link href="/security" className="text-secondary underline-offset-2 hover:underline">
          Security
        </Link>
        {" · "}
        <Link href="/about" className="text-secondary underline-offset-2 hover:underline">
          About
        </Link>
      </p>
    </div>
  );
}
