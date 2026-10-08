import Link from "next/link";
import { SeatRing } from "@/components/SeatRing";
import { TrendingList } from "@/components/TrendingList";
import { PoolPilotLaunches } from "@/components/PoolPilotLaunches";
import { TrustStrip } from "@/components/TrustStrip";
import { MCFL } from "@/lib/tokens";

export default function HomePage() {
  return (
    <div className="space-y-10 pb-6">
      <section className="space-y-5 pt-1">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="pill pill-live">Live on Robinhood Chain</span>
          <span className="pill pill-muted">Non-custodial</span>
        </div>

        <div className="space-y-3 max-w-xl">
          <h1 className="font-display text-[1.75rem] sm:text-3xl md:text-4xl leading-[1.15] tracking-tight">
            Launch with a team.
            <br />
            <span className="text-secondary">Trade on one pool.</span>
          </h1>
          <p className="text-secondary text-[15px] sm:text-base leading-relaxed">
            Pool Pilot is a non-custodial launchpad on Robinhood Chain. You name
            a coin, mint a thin Uniswap v3 pool, and fill up to{" "}
            <span className="text-[var(--text)] font-medium">18 seats</span> with
            friends. Your wallet signs every step. We never hold funds or keys.
          </p>
        </div>

        <TrustStrip />

        <div className="flex flex-col sm:flex-row gap-3 pt-1">
          <Link
            href="/launch"
            className="btn btn-primary btn-full sm:flex-1 sm:max-w-[220px]"
          >
            Launch a coin
          </Link>
          <Link
            href="/books"
            className="btn btn-secondary btn-full sm:flex-1 sm:max-w-[220px]"
          >
            Explore the chain
          </Link>
        </div>
      </section>

      <section aria-labelledby="how-heading">
        <h2
          id="how-heading"
          className="font-display text-xs font-bold text-muted uppercase tracking-wide mb-3"
        >
          How it works
        </h2>
        <ol className="grid gap-2 sm:grid-cols-3">
          {[
            {
              n: "1",
              t: "Name it",
              d: "Pick a ticker and a min bid per seat.",
            },
            {
              n: "2",
              t: "Mint",
              d: "You sign. Token and pool go on-chain.",
            },
            {
              n: "3",
              t: "Seat the team",
              d: "Up to 18 chairs. Friends sit in their wallets.",
            },
          ].map((s) => (
            <li
              key={s.n}
              className="card p-4 flex sm:flex-col gap-3 items-start"
            >
              <span className="w-7 h-7 rounded-full bg-[var(--lime)] text-[var(--lime-text)] flex items-center justify-center font-display text-xs font-bold shrink-0">
                {s.n}
              </span>
              <div>
                <div className="font-display font-bold text-sm">{s.t}</div>
                <p className="text-secondary text-xs mt-0.5 leading-relaxed">
                  {s.d}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="featured-heading">
        <h2
          id="featured-heading"
          className="font-display text-xs font-bold text-muted uppercase tracking-wide mb-3"
        >
          Featured on Pool Pilot
        </h2>
        <div className="card p-5 flex flex-col sm:flex-row items-center gap-5">
          <SeatRing taken={7} total={18} size={120} label="MCFL seats" />
          <div className="flex-1 text-center sm:text-left w-full min-w-0">
            <div className="flex items-center justify-center sm:justify-start gap-2 flex-wrap mb-1">
              <span className="font-display text-lg font-bold">${MCFL.symbol}</span>
              <span className="pill pill-fill text-[10px]">
                Launched on Pool Pilot
              </span>
            </div>
            <p className="text-secondary text-sm">{MCFL.name}</p>
            <p className="text-[11px] text-muted font-mono mt-1.5 break-all">
              {MCFL.address}
            </p>
            <div className="flex flex-wrap justify-center sm:justify-start gap-2 mt-4">
              <Link
                href="/books/book-mcfl-001"
                className="btn btn-primary text-sm min-h-[40px]"
              >
                Open book
              </Link>
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
            </div>
          </div>
        </div>
      </section>

      <PoolPilotLaunches />

      <TrendingList title="Trending on Robinhood Chain" limit={10} />

      <p className="text-[11px] text-muted text-center leading-relaxed px-2 border-t border-[var(--divider)] pt-6">
        Non-custodial — you sign; Pool Pilot never holds funds.{" "}
        <Link
          href="/security"
          className="text-secondary underline-offset-2 hover:underline"
        >
          Security
        </Link>
        {" · "}
        <Link
          href="/about"
          className="text-secondary underline-offset-2 hover:underline"
        >
          About
        </Link>
      </p>
    </div>
  );
}
