import Link from "next/link";
import { PoolPilotLaunches } from "@/components/PoolPilotLaunches";
import { MCFL } from "@/lib/tokens";

export default function ProjectsPage() {
  return (
    <div className="space-y-6 pb-4 max-w-lg">
      <div>
        <h1 className="font-display text-xl font-bold mb-1">Projects</h1>
        <p className="text-secondary text-sm leading-relaxed">
          Coins and books tied to Pool Pilot. Verify addresses on the explorer
          before you sign.
        </p>
      </div>

      <PoolPilotLaunches />

      <section className="card p-5 space-y-3">
        <h2 className="font-display text-sm font-bold">Verify on-chain</h2>
        <p className="text-xs text-secondary leading-relaxed">
          Token, pool, and seat contracts are public. Paste any address into
          Blockscout to confirm code and holders.
        </p>
        <a
          href={MCFL.explorer}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-secondary btn-full text-sm"
        >
          Open MCFL on explorer
        </a>
        <Link href="/about" className="btn btn-ghost btn-full text-sm">
          About and verified wallet
        </Link>
      </section>
    </div>
  );
}
