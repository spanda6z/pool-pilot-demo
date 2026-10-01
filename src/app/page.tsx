import Link from "next/link";
import { SeatRing } from "@/components/SeatRing";
import { MOCK_BOOKS, MOCK_STATS } from "@/lib/mock-data";

export default function HomePage() {
  const featured = MOCK_BOOKS[0];
  const taken = featured ? Math.min(featured.seatsTaken, 18) : 0;

  return (
    <div className="space-y-8 pb-4">
      <div className="flex items-center gap-2">
        <span className="pill pill-live">Live on Robinhood Chain</span>
        <span className="pill pill-demo">Demo data</span>
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

      {featured && (
        <section className="card p-5 flex flex-col sm:flex-row items-center gap-5">
          <SeatRing taken={taken} total={18} size={128} label={`${taken} of 18 seats on ${featured.symbol}`} />
          <div className="flex-1 text-center sm:text-left w-full">
            <div className="text-xs text-muted uppercase tracking-wide mb-1">Featured book</div>
            <div className="font-display text-lg font-bold">${featured.symbol}</div>
            <p className="text-secondary text-sm mt-1">{featured.name}</p>
            <div className="flex flex-wrap justify-center sm:justify-start gap-4 mt-3 text-sm">
              <div>
                <span className="text-muted text-xs block">Seats</span>
                <span className="font-display font-bold text-lime">{taken}/18</span>
              </div>
              <div>
                <span className="text-muted text-xs block">24h vol</span>
                <span className="font-display font-bold">{featured.volume24h} ETH</span>
              </div>
              <div>
                <span className="text-muted text-xs block">Liquidity</span>
                <span className="font-display font-bold">{featured.liquidityEth} ETH</span>
              </div>
            </div>
            <Link href={`/books/${featured.id}`} className="btn btn-ghost text-sm mt-4 min-h-[40px]">
              Open book
            </Link>
          </div>
        </section>
      )}

      <section className="grid grid-cols-2 gap-3">
        <div className="card p-4">
          <div className="text-xs text-muted mb-1">24h volume</div>
          <div className="font-display text-xl font-bold">{MOCK_STATS.totalVolumeEth} ETH</div>
        </div>
        <div className="card p-4">
          <div className="text-xs text-muted mb-1">Coins launched</div>
          <div className="font-display text-xl font-bold">{MOCK_STATS.totalBooks}</div>
        </div>
      </section>

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

      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-display text-sm font-bold text-muted uppercase tracking-wide">
            Trending now
          </h2>
          <Link href="/books" className="text-xs text-lime font-medium">
            See all
          </Link>
        </div>
        <div className="card divide-y divide-[var(--divider)] overflow-hidden">
          {MOCK_BOOKS.slice(0, 5).map((b) => {
            const seats = Math.min(b.seatsTaken, 18);
            return (
              <Link
                key={b.id}
                href={`/books/${b.id}`}
                className="flex items-center gap-3 p-3.5 hover:bg-[var(--control)] transition-colors min-h-[56px]"
              >
                <span className="w-9 h-9 rounded-full bg-[var(--control)] border border-[var(--border)] flex items-center justify-center font-display text-xs font-bold shrink-0">
                  {b.symbol.slice(0, 2)}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="font-display font-bold text-sm">${b.symbol}</div>
                  <div className="text-xs text-muted truncate">{b.name}</div>
                </div>
                <div className="text-right shrink-0">
                  <div className="font-display text-sm font-bold tabular-nums">{b.volume24h} ETH</div>
                  <div className="text-xs text-muted">{seats}/18 seats</div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <p className="text-[11px] text-muted text-center leading-relaxed px-2">
        Non-custodial — you sign; Pool Pilot never holds funds.{" "}
        <Link href="/security" className="text-secondary underline-offset-2 hover:underline">
          Security
        </Link>
      </p>
    </div>
  );
}
