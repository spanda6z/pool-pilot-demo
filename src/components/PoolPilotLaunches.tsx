import Link from "next/link";
import { POOL_PILOT_LAUNCHES } from "@/lib/trending";
import { CopyButton } from "@/components/CopyButton";
import { FoundingBadge } from "@/components/FoundingBadge";

export function PoolPilotLaunches() {
  return (
    <section className="space-y-3">
      <div className="flex items-end justify-between gap-3">
        <h2 className="font-display text-sm font-bold text-muted uppercase tracking-wide">
          Launched on Pool Pilot
        </h2>
        <p className="text-[11px] text-muted">Recognized launches from this interface.</p>
        <Link href="/launch" className="text-xs text-lime font-medium whitespace-nowrap hover:underline">
          Launch a coin
        </Link>
      </div>
      <div className="card divide-y divide-[var(--divider)] overflow-hidden">
        {POOL_PILOT_LAUNCHES.map((c, i) => (
          <div
            key={c.tokenAddress}
            className="group flex items-center gap-3 p-3.5 min-h-[68px] hover:bg-[var(--control)]"
          >
            <span className="w-10 h-10 rounded-full bg-[var(--lime)] text-[var(--lime-text)] flex items-center justify-center font-display text-xs font-bold shrink-0">
              {c.symbol.slice(0, 2)}
            </span>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-display font-bold text-sm">${c.symbol}</span>
                <span className="pill pill-fill text-[10px]">{c.note}</span>
                {i < 10 && <FoundingBadge className="text-[10px]" />}
              </div>
              <div className="text-xs text-muted truncate">{c.name}</div>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <CopyButton text={c.tokenAddress} label="Copy" />
              <a
                href={c.explorer}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost text-xs min-h-[40px] px-3"
              >
                Explorer
              </a>
            </div>
          </div>
        ))}
      </div>
      <p className="text-[10px] text-muted">
        These entries are the app&apos;s recognized Pool Pilot launches. Verify contract addresses on-chain before trading.
      </p>
    </section>
  );
}
