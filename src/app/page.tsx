import Link from "next/link";
import { DemoBadge } from "@/components/DemoBadge";
import { Address } from "@/components/Address";
import { MOCK_STATS, CONTRACTS, CHAIN } from "@/lib/mock-data";

export default function HomePage() {
  return (
    <div className="space-y-8 pb-8">
      <section className="pixel-card p-5 sm:p-8 relative overflow-hidden">
        <div className="absolute top-3 right-3 sm:top-4 sm:right-4">
          <DemoBadge />
        </div>
        <p className="text-cyan text-[10px] sm:text-xs tracking-[0.25em] font-bold mb-3 uppercase">
          Robinhood Chain · 4663
        </p>
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight mb-3 leading-tight">
          THE <span className="text-cyan">TRUST</span>{" "}
          <span className="text-gold">SPINE</span>
        </h1>
        <p className="text-secondary text-sm sm:text-base leading-relaxed mb-6 max-w-lg">
          Non-custodial Uniswap v3 launch · NFT liquidity seats · swaps.
          You connect your wallet. You sign every transaction. You own the seats.
          Everything is verifiable on-chain.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/launch"
            className="pixel-btn btn-gold px-6 py-3 text-sm w-full sm:w-auto"
          >
            Launch a Coin
          </Link>
          <Link
            href="/books"
            className="pixel-btn btn-cyan px-6 py-3 text-sm w-full sm:w-auto"
          >
            Browse Books
          </Link>
        </div>
      </section>

      <section className="grid grid-cols-2 gap-3">
        {[
          { label: "Books", value: MOCK_STATS.totalBooks, color: "text-cyan" },
          { label: "Seats Minted", value: MOCK_STATS.totalSeatsMinted, color: "text-gold" },
          { label: "Liquidity (ETH)", value: MOCK_STATS.totalLiquidityEth, color: "text-mint" },
          { label: "24h Vol (ETH)", value: MOCK_STATS.totalVolumeEth, color: "text-eth" },
        ].map((s) => (
          <div key={s.label} className="pixel-card p-4 text-center">
            <div className={`text-xl sm:text-2xl font-bold tabular-nums ${s.color}`}>
              {s.value}
            </div>
            <div className="text-[10px] text-muted tracking-wider mt-1.5 uppercase">
              {s.label}
            </div>
          </div>
        ))}
      </section>
      <p className="text-[10px] text-muted flex flex-wrap items-center gap-1.5 -mt-4">
        <span>
          Source: {MOCK_STATS.dataSource} · Block {MOCK_STATS.sourceBlock}
        </span>
        <span className="hidden sm:inline">·</span>
        <span>Updated {new Date(MOCK_STATS.lastUpdated).toLocaleString()}</span>
        <DemoBadge />
      </p>

      <section className="pixel-card p-5 sm:p-6">
        <h2 className="text-xs font-bold tracking-[0.2em] text-cyan mb-4 uppercase">
          Trust Spine Flow
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 sm:gap-1">
          {[
            { label: "Wallet", sub: "Connect" },
            { label: "Sign", sub: "You approve" },
            { label: "NFT Seat", sub: "You own" },
            { label: "Uniswap Pool", sub: "On-chain" },
            { label: "Explorer", sub: "Proof" },
          ].map((step, i) => (
            <div key={step.label} className="flex sm:flex-col items-center gap-2 sm:gap-0">
              <div className="flex-1 w-full pixel-border bg-navy-800/80 p-3 text-center rounded-lg">
                <div className="text-cyan text-xs font-bold">{step.label}</div>
                <div className="text-muted text-[10px] mt-0.5">{step.sub}</div>
              </div>
              {i < 4 && (
                <div className="sm:hidden text-gold text-xs shrink-0">↓</div>
              )}
            </div>
          ))}
        </div>
        <div className="trust-spine-line mt-5" />
        <p className="text-muted text-xs mt-3 leading-relaxed">
          Pool Pilot never holds your keys, seeds, or funds. Every write is signed by your wallet.
        </p>
      </section>

      <section className="pixel-card p-5 sm:p-6">
        <div className="flex items-center justify-between mb-4 gap-2">
          <h2 className="text-xs font-bold tracking-[0.2em] text-cyan uppercase">
            Contract Registry
          </h2>
          <Link href="/verify" className="text-xs text-gold hover:underline shrink-0">
            Full registry →
          </Link>
        </div>
        <div className="space-y-0">
          {Object.entries(CONTRACTS)
            .slice(0, 5)
            .map(([name, addr]) => (
              <div
                key={name}
                className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 py-2.5 border-b border-[rgba(30,58,95,0.5)] last:border-0"
              >
                <span className="text-secondary text-xs w-36 shrink-0 capitalize">
                  {name.replace(/([A-Z])/g, " $1")}
                </span>
                <Address value={addr} />
              </div>
            ))}
        </div>
        <p className="text-[10px] text-coral mt-4 leading-relaxed">
          DEMO addresses — replace with verified deployments before mainnet use.
        </p>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <Link
          href="/security"
          className="pixel-card p-5 hover:border-cyan/50 transition-colors block"
        >
          <div className="text-mint text-lg mb-1.5">⬡</div>
          <div className="font-bold text-sm">Security Model</div>
          <div className="text-muted text-xs mt-1">Non-custodial rules & disclosures</div>
        </Link>
        <Link
          href="/about"
          className="pixel-card p-5 hover:border-cyan/50 transition-colors block"
        >
          <div className="text-cyan text-lg mb-1.5">◈</div>
          <div className="font-bold text-sm">About Pool Pilot</div>
          <div className="text-muted text-xs mt-1">How seats & books work</div>
        </Link>
        <a
          href={CHAIN.explorer}
          target="_blank"
          rel="noopener noreferrer"
          className="pixel-card p-5 hover:border-cyan/50 transition-colors block"
        >
          <div className="text-gold text-lg mb-1.5">⧉</div>
          <div className="font-bold text-sm">Block Explorer</div>
          <div className="text-muted text-xs mt-1">robinhoodchain.blockscout.com</div>
        </a>
      </section>
    </div>
  );
}
