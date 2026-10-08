import Link from "next/link";
import { POOL_PILOT_LAUNCHES } from "@/lib/trending";
import { CopyButton } from "@/components/CopyButton";
import { FoundingBadge } from "@/components/FoundingBadge";

export function PoolPilotLaunches() {
  return (
    <section className="space-y-3">
      <div className="flex items-end justify-between gap-3">
        <div className="min-w-0">
          <h2 className="font-display text-sm font-bold text-muted uppercase tracking-wide">Launched on Pool Pilot</h2>
          <p className="text-[11px] text-muted mt-0.5">Recognized launches from this interface.</p>
        </div>
        <Link href="/launch" className="text-xs text-lime font-medium whitespace-nowrap hover:underline">Launch a coin →</Link>
      </div>
      <div className="card divide-y divide-[var(--divider)] overflow-hidden">
        {POOL_PILOT_LAUNCHES.map((coin, index) => (
          <div key={coin.tokenAddress} className="group flex items-center gap-3 p-3.5 min-h-[68px] hover:bg-[var(--control)]">
            <span className="w-10 h-10 rounded-full bg-[var(--lime)] text-[var(--lime-text)] flex items-center justify-center font-display text-xs font-bold shrink-0" aria-hidden="true">
              {coin.symbol.slice(0, 2)}
            </span>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-display font-bold text-sm">${coin.symbol}</span>
                <span className="pill pill-fill text-[10px]">{coin.note}</span>
                {index < 10 && <FoundingBadge className="text-[10px]" />}
              </div>
              <div className="text-xs text-muted truncate mt-0.5">{coin.name}</div>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <CopyButton text={coin.tokenAddress} label="Copy" />
              <a href={coin.explorer} target="_blank" rel="noopener noreferrer" aria-label={`Open ${coin.symbol} in block explorer`} className="btn btn-ghost text-xs min-h-[40px] px-2.5">
                Explorer ↗
              </a>
            </div>
          </div>
        ))}
      </div>
      <p className="text-[10px] text-muted leading-relaxed">These entries are the app&apos;s recognized Pool Pilot launches. Verify contract addresses on-chain before trading.</p>
    </section>
  );
}
