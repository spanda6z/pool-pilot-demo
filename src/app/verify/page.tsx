import Link from "next/link";
import { PoolPilotLaunches } from "@/components/PoolPilotLaunches";
import { MCFL } from "@/lib/tokens";

export default function ProjectsPage() {
  return (
    <div className="space-y-6 pb-4">
      <header className="space-y-1">
        <div className="flex items-baseline justify-between gap-3">
          <h1 className="font-display text-[28px] font-semibold">Projects</h1>
          <span className="pill pill-muted text-[10px]">Verify first</span>
        </div>
        <p className="text-secondary text-sm leading-relaxed">
          Explore launches associated with Pool Pilot. Always verify token and pool addresses before signing.
        </p>
      </header>

      <section className="card p-5 space-y-3">
        <div className="flex items-center gap-3">
          <span className="w-10 h-10 rounded-[12px] bg-[var(--lime)]/15 text-[var(--lime)] flex items-center justify-center font-display font-bold">✓</span>
          <div><h2 className="font-display font-bold">On-chain transparency</h2><p className="text-xs text-muted">Addresses and contracts stay public.</p></div>
        </div>
        <p className="text-xs text-secondary leading-relaxed">
          Pool Pilot does not custody your funds. Use the explorer to inspect contracts, holders, and transaction history before interacting.
        </p>
        <a href={MCFL.explorer} target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-full text-sm">Open verified explorer record</a>
      </section>

      <PoolPilotLaunches />

      <section className="card p-5 space-y-3">
        <h2 className="font-display text-sm font-bold">Need help verifying?</h2>
        <p className="text-xs text-secondary leading-relaxed">Check the contract address, network, transaction recipient, and requested token amount in your wallet. Never approve a transaction you do not understand.</p>
        <Link href="/security" className="btn btn-ghost btn-full text-sm">Read security guide</Link>
      </section>
    </div>
  );
}
