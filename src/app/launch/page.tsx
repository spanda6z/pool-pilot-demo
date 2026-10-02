"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LaunchPage() {
  const router = useRouter();
  const [ticker, setTicker] = useState("");
  const [minBid, setMinBid] = useState("0.05");
  const error =
    ticker.length > 0 && (ticker.length < 2 || ticker.length > 10)
      ? "Ticker must be 2–10 characters"
      : null;

  const go = () => {
    if (!ticker || error) return;
    router.push(
      `/launch/review?ticker=${encodeURIComponent(ticker)}&bid=${encodeURIComponent(minBid)}`
    );
  };

  return (
    <div className="space-y-6 pb-4 max-w-md mx-auto">
      <div>
        <h1 className="font-display text-xl font-bold mb-1">Launch</h1>
        <p className="text-secondary text-sm leading-relaxed">
          Create a token and thin Uniswap v3 pool. You keep the token. Friends
          sit up to 18 chairs.
        </p>
      </div>

      <div className="flex gap-2" aria-label="Launch progress">
        {[1, 2, 3].map((n) => (
          <div
            key={n}
            className={`h-1.5 flex-1 rounded-full ${n === 1 ? "bg-[var(--lime)]" : "bg-[var(--control)]"}`}
          />
        ))}
      </div>
      <p className="text-xs text-muted">Step 1 of 3 · Configure</p>

      <section className="card p-5 space-y-4">
        <div>
          <label htmlFor="ticker" className="text-xs text-muted block mb-1.5">
            Ticker
          </label>
          <input
            id="ticker"
            value={ticker}
            onChange={(e) =>
              setTicker(e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, ""))
            }
            placeholder="e.g. MCFL"
            maxLength={10}
            autoComplete="off"
          />
          {error && <p className="text-down text-xs mt-1.5">{error}</p>}
        </div>
        <div>
          <label htmlFor="bid" className="text-xs text-muted block mb-1.5">
            Min bid per seat (ETH)
          </label>
          <input
            id="bid"
            type="number"
            value={minBid}
            onChange={(e) => setMinBid(e.target.value)}
            step="0.01"
            min="0.01"
          />
          <p className="text-[11px] text-muted mt-1.5">
            Typical range maps to about $10–$10,000.
          </p>
        </div>
      </section>

      <div className="card p-4 text-xs text-secondary space-y-1">
        <div className="flex justify-between">
          <span>Supply</span>
          <span className="font-display">1,000,000,000</span>
        </div>
        <div className="flex justify-between">
          <span>Seats</span>
          <span className="font-display">18</span>
        </div>
        <div className="flex justify-between">
          <span>You sign</span>
          <span>Every step</span>
        </div>
      </div>

      <button
        type="button"
        onClick={go}
        disabled={!ticker || !!error}
        className="btn btn-primary btn-full"
      >
        Continue to review
      </button>

      <p className="text-[11px] text-muted text-center leading-relaxed">
        No gas on Robinhood Chain?{" "}
        <Link href="/about" className="text-lime">
          How to arrive
        </Link>
        . You will review and sign in your wallet.
      </p>
    </div>
  );
}
