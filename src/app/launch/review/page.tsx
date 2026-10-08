"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function ReviewInner() {
  const params = useSearchParams();
  const ticker = params.get("ticker") || "TICKER";
  const bid = params.get("bid") || "0.05";

  return (
    <div className="max-w-md mx-auto space-y-5 pb-4">
      <Link href="/launch/create" className="text-muted text-sm hover:text-secondary min-h-[44px] inline-flex items-center">← Configure</Link>

      <div aria-label="Launch progress" className="space-y-2">
        <div className="flex gap-2">{[1, 2, 3].map((n) => <div key={n} className={`h-1.5 flex-1 rounded-full ${n <= 2 ? "bg-[var(--lime)]" : "bg-[var(--control)]"}`} />)}</div>
        <p className="text-xs text-muted">Step 2 of 3 · Review before signing</p>
      </div>

      <div className="card p-5 space-y-4">
        <div>
          <span className="pill pill-fill text-[10px]">Preview transaction</span>
          <h1 className="font-display text-2xl font-bold mt-2">Check every detail</h1>
          <p className="text-secondary text-sm mt-1">This page prepares the launch parameters. Nothing moves until a wallet transaction is explicitly signed.</p>
        </div>

        <div className="rounded-[14px] bg-[var(--control)] p-3 text-xs text-secondary">
          <div className="flex items-center justify-between"><span>Network</span><strong>Robinhood Chain · 4663</strong></div>
        </div>

        <div className="text-sm">
          {[
            ["Ticker", `$${ticker}`],
            ["Supply", "1,000,000,000"],
            ["Min bid / seat", `${bid} ETH`],
            ["Seats", "18"],
            ["Gas", "Shown in wallet"],
          ].map(([label, value], index) => (
            <div key={label} className={`flex justify-between gap-4 py-3 ${index < 4 ? "border-b border-[var(--divider)]" : ""}`}>
              <span className="text-muted">{label}</span>
              <span className={`font-display font-bold text-right ${label === "Min bid / seat" ? "text-lime" : ""}`}>{value}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="card p-4 border border-[var(--warn)]/40 bg-[var(--warn)]/5">
        <div className="text-xs font-semibold text-warn">Irreversible action</div>
        <p className="text-[11px] text-secondary mt-1 leading-relaxed">Only continue when the values above are correct. In production, token and pool creation cannot be undone after the transaction is confirmed.</p>
      </div>

      <Link href={`/launch/deploy?ticker=${encodeURIComponent(ticker)}&bid=${encodeURIComponent(bid)}`} className="btn btn-primary btn-full">Continue to launch preview</Link>
      <p className="text-[10px] text-muted text-center">You will review the wallet signing state on the next step.</p>
    </div>
  );
}

export default function LaunchReviewPage() {
  return <Suspense fallback={<div className="card p-8 text-center text-muted text-sm">Loading review…</div>}><ReviewInner /></Suspense>;
}
