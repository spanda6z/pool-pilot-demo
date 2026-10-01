import Link from "next/link";
import { DemoBadge } from "@/components/DemoBadge";
import { Address } from "@/components/Address";
import { MOCK_STATS, CONTRACTS, CHAIN } from "@/lib/mock-data";

export default function HomePage() {
  return (
    <div className="space-y-10">
      <section className="pixel-card p-6 sm:p-8 scanline relative overflow-hidden">
        <div className="absolute top-3 right-3">
          <DemoBadge />
        </div>
        <p className="text-cyan text-xs tracking-[0.3em] font-bold mb-2">
          ROBINHOOD CHAIN · 4663
        </p>
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight mb-3">
          THE <span className="text-cyan">TRUST</span>{" "}
          <span className="text-gold">SPINE</span>
        </h1>
        <p className="text-secondary max-w-xl text-sm sm:text-base leading-relaxed mb-6">
          Non-custodial Uniswap v3 launch · NFT liquidity seats · swaps.
          You connect your wallet. You sign every transaction. You own the seats.
          Everything is verifiable on-chain.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link href="/launch" className="pixel-btn btn-gold px-5 py-2.5 text-sm">
            Launch a Coin
          </Link>
          <Link href="/books" className="pixel-btn btn-cyan px-5 py-2.5 text-sm">
            Browse Books
          </Link>
        </div>
      </section>

      <section className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Books", value: MOCK_STATS.totalBooks, color: "text-cyan" },
          { label: "Seats Minted", value: MOCK_STATS.totalSeatsMinted, color: "text-gold" },
          { label: "Liquidity (ETH)", value: MOCK_STATS.totalLiquidityEth, color: "text-mint" },
          { label: "24h Vol (ETH)", value: MOCK_STATS.totalVolumeEth, color: "text-eth" },
        ].map((s) => (
          <div key={s.label} className="pixel-card p-4 text-center">
            <div className={`text-xl sm:text-2xl font-bold ${s.color}`}>{s.value}</div>
            <div className="text-[10px] text-muted tracking-wider mt-1">{s.label}</div>
          </div>
        ))}
      </section>
      <p className="text-[10px] text-muted -mt-6">
        Source: {MOCK_STATS.dataSource} · Block {MOCK_STATS.sourceBlock} · Updated{" "}
        {new Date(MOCK_STATS.lastUpdated).toLocaleString()} · <DemoBadge />
      </p>

      <section className="pixel-card p-6">
        <h2 className="text-sm font-bold tracking-widest text-cyan mb-4">
          ▸ TRUST SPINE FLOW
        </h2>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-0 text-xs font-bold">
          {[
            { label: "Wallet", sub: "Connect" },
            { label: "Sign", sub: "You approve" },
            { label: "NFT Seat", sub: "You own" },
            { label: "Uniswap Pool", sub: "On-chain" },
            { label: "Explorer", sub: "Proof" },
          ].map((step, i) => (
            <div key={step.label} className="flex items-center flex-1">
              <div className="flex-1 pixel-border bg-navy-800 p-3 text-center">
                <div className="text-cyan">{step.label}</div>
                <div className="text-muted text-[10px] mt-0.5">{step.sub}</div>
              </div>
              {i < 4 && (
                <div className="hidden sm:block text-gold px-1">→</div>
              )}
            </div>
          ))}
        </div>
        <div className="trust-spine-line mt-4" />
        <p className="text-muted text-xs mt-3">
          Pool Pilot never holds your keys, seeds, or funds. Every write is signed by your wallet.
        </p>
      </section>

      <section className="pixel-card p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-bold tracking-widest text-cyan">
            ▸ CONTRACT REGISTRY (PREVIEW)
          </h2>
          <Link href="/verify" className="text-xs text-gold hover:underline">
            Full registry →
          </Link>
        </div>
        <div className="space-y-2 text-xs">
          {Object.entries(CONTRACTS)
            .slice(0, 5)
            .map(([name, addr]) => (
              <div
                key={name}
                className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 py-1.5 border-b border-[var(--pixel-border)]"
              >
                <span className="text-secondary w-36 shrink-0 capitalize">
                  {name.replace(/([A-Z])/g, " $1")}
                </span>
                <Address value={addr} />
              </div>
            ))}
        </div>
        <p className="text-[10px] text-coral mt-3">
          DEMO addresses — replace with verified deployments before mainnet use.
        </p>
      </section>

      <section className="grid sm:grid-cols-3 gap-4">
        <Link href="/security" className="pixel-card p-5 hover:border-cyan transition-colors">
          <div className="text-mint text-lg mb-1">⬡</div>
          <div className="font-bold text-sm">Security Model</div>
          <div className="text-muted text-xs mt-1">Non-custodial rules & disclosures</div>
        </Link>
        <Link href="/about" className="pixel-card p-5 hover:border-cyan transition-colors">
          <div className="text-cyan text-lg mb-1">◈</div>
          <div className="font-bold text-sm">About Pool Pilot</div>
          <div className="text-muted text-xs mt-1">How seats & books work</div>
        </Link>
        <a
          href={CHAIN.explorer}
          target="_blank"
          rel="noopener noreferrer"
          className="pixel-card p-5 hover:border-cyan transition-colors"
        >
          <div className="text-gold text-lg mb-1">⧉</div>
          <div className="font-bold text-sm">Block Explorer</div>
          <div className="text-muted text-xs mt-1">robinhoodchain.blockscout.com</div>
        </a>
      </section>
    </div>
  );
}
