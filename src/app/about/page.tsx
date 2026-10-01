import { DemoBadge } from "@/components/DemoBadge";

export default function AboutPage() {
  return (
    <div className="max-w-2xl space-y-6">
      <div className="flex items-center gap-3">
        <h1 className="text-2xl font-black">About Pool Pilot</h1>
        <DemoBadge />
      </div>
      <section className="pixel-card p-6 space-y-4 text-sm text-secondary leading-relaxed">
        <p>
          Pool Pilot is a non-custodial Uniswap v3 launch, NFT liquidity-seat, and swap
          platform on Robinhood Chain (chain ID 4663).
        </p>
        <p>
          Users connect their own wallet, sign every transaction themselves, own their
          seats as NFTs, and can verify all contracts, liquidity, positions, fees, and
          transactions on-chain.
        </p>
        <p className="text-cyan font-bold">
          We never custody funds, keys, or seed phrases.
        </p>
        <p>
          This build is a UI mock with clearly labeled DEMO data. Live contracts and
          indexer are required before real use.
        </p>
      </section>
    </div>
  );
}
