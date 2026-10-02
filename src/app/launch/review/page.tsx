"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function ReviewInner() {
  const params = useSearchParams();
  const ticker = params.get("ticker") || "TICKER";
  const bid = params.get("bid") || "0.05";

  return (
    <div className="max-w-md mx-auto space-y-6 pb-4">
      <Link
        href="/launch/create"
        className="text-muted text-sm hover:text-secondary min-h-[44px] inline-flex items-center"
      >
        ← Configure
      </Link>

      <div className="flex gap-2" aria-label="Launch progress">
        {[1, 2, 3].map((n) => (
          <div
            key={n}
            className={`h-1.5 flex-1 rounded-full ${n <= 2 ? "bg-[var(--lime)]" : "bg-[var(--control)]"}`}
          />
        ))}
      </div>
      <p className="text-xs text-muted">Step 2 of 3 · Review</p>

      <section className="card p-5 space-y-3">
        <h1 className="font-display text-xl font-bold">Review</h1>
        <div className="text-sm space-y-2">
          <div className="flex justify-between py-2 border-b border-[var(--divider)]">
            <span className="text-muted">Ticker</span>
            <span className="font-display font-bold">${ticker}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-[var(--divider)]">
            <span className="text-muted">Supply</span>
            <span className="font-display">1,000,000,000</span>
          </div>
          <div className="flex justify-between py-2 border-b border-[var(--divider)]">
            <span className="text-muted">Min bid / seat</span>
            <span className="font-display text-lime">{bid} ETH</span>
          </div>
          <div className="flex justify-between py-2 border-b border-[var(--divider)]">
            <span className="text-muted">Seats</span>
            <span className="font-display">18</span>
          </div>
          <div className="flex justify-between py-2">
            <span className="text-muted">Est. gas</span>
            <span className="text-secondary">Shown in wallet</span>
          </div>
        </div>
      </section>

      <p className="text-[11px] text-warn leading-relaxed">
        Creating a token and pool is irreversible once confirmed. Confirm every
        field in your wallet before you sign.
      </p>

      <Link
        href={`/launch/deploy?ticker=${encodeURIComponent(ticker)}&bid=${encodeURIComponent(bid)}`}
        className="btn btn-primary btn-full"
      >
        Create token and pool
      </Link>
    </div>
  );
}

export default function LaunchReviewPage() {
  return (
    <Suspense
      fallback={
        <div className="card p-8 text-center text-muted text-sm">Loading…</div>
      }
    >
      <ReviewInner />
    </Suspense>
  );
}
