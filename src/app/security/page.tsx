import Link from "next/link";
import { SITE } from "@/lib/config";

export default function SecurityPage() {
  return (
    <div className="space-y-5 pb-4 max-w-lg">
      <div>
        <span className="pill pill-fill text-[10px]">Safety</span>
        <h1 className="font-display text-2xl font-bold mt-2">Security first</h1>
        <p className="text-secondary text-sm mt-1 leading-relaxed">Pool Pilot is non-custodial: your wallet stays yours, and every transaction requires your explicit signature.</p>
      </div>

      <div className="card p-5 space-y-4">
        <div className="grid gap-3">
          {[
            ["1", "You control the wallet", "We never ask for seed phrases or private keys."],
            ["2", "You approve transactions", "The wallet is the final signing boundary."],
            ["3", "You verify addresses", "Check token and pool contracts in the explorer before signing."],
          ].map(([n, title, body]) => (
            <div key={n} className="flex gap-3">
              <span className="w-8 h-8 rounded-full bg-[var(--lime)] text-[var(--lime-text)] flex items-center justify-center font-display font-bold text-xs shrink-0">{n}</span>
              <div><div className="text-sm font-semibold">{title}</div><p className="text-[11px] text-muted mt-0.5 leading-relaxed">{body}</p></div>
            </div>
          ))}
        </div>
      </div>

      <div className="card p-4 border border-[var(--warn)]/40 bg-[var(--warn)]/5">
        <div className="text-xs font-semibold text-warn">Trading risk</div>
        <p className="text-[11px] text-secondary mt-1 leading-relaxed">Coins can go to zero and on-chain transactions may be irreversible. Use only funds you can afford to lose. Pool Pilot is a tool, not financial advice.</p>
      </div>

      <div className="flex flex-wrap gap-3">
        <Link href="/about" className="btn btn-secondary">About and fees</Link>
        <a href={SITE.explorer} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">Open explorer ↗</a>
        <Link href="/" className="btn btn-ghost">Home</Link>
      </div>
    </div>
  );
}
