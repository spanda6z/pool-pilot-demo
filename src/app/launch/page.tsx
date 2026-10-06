"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getReferral } from "@/lib/referral";

export default function LaunchPage() {
  const router = useRouter();
  const [ticker, setTicker] = useState("");
  const [minBid, setMinBid] = useState("0.05");
  const [refCode, setRefCode] = useState("");
  const error =
    ticker.length > 0 && (ticker.length < 2 || ticker.length > 10)
      ? "Ticker must be 2–10 characters"
      : null;

  useEffect(() => {
    const r = getReferral();
    if (r) setRefCode(r);
  }, []);

  const go = () => {
    if (!ticker || error) return;
    const q = new URLSearchParams({
      ticker,
      bid: minBid,
    });
    if (refCode.trim()) q.set("ref", refCode.trim());
    router.push(`/launch/review?${q.toString()}`);
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
      <p className="text-xs text-muted">Step 1 of 3 · Name it</p>

      <div className="space-y-4">
        <div>
          <label htmlFor="ticker" className="text-xs text-muted block mb-1.5">
            Ticker
          </label>
          <input
            id="ticker"
            value={ticker}
            onChange={(e) =>
              setTicker(
                e.target.value
                  .toUpperCase()
                  .replace(/[^A-Z0-9]/g, "")
                  .slice(0, 10)
              )
            }
            placeholder="MCFL"
            autoComplete="off"
            maxLength={10}
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
            step="0.001"
            min="0"
            value={minBid}
            onChange={(e) => setMinBid(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="ref" className="text-xs text-muted block mb-1.5">
            Referral code (optional)
          </label>
          <input
            id="ref"
            value={refCode}
            onChange={(e) => setRefCode(e.target.value.slice(0, 32))}
            placeholder="friend-code"
            autoComplete="off"
          />
        </div>
      </div>

      <button
        type="button"
        onClick={go}
        disabled={!ticker || Boolean(error)}
        className="btn btn-primary btn-full"
      >
        Continue
      </button>

      <section id="fees" className="card p-4 space-y-2 scroll-mt-20">
        <h2 className="font-display text-sm font-bold">Fees</h2>
        <p className="text-xs text-secondary leading-relaxed">
          Platform fees are published on About before any fee is charged. Network
          gas is paid by you to the chain. Pool Pilot never holds your funds.
        </p>
        <Link href="/about" className="text-lime text-xs">
          Fee details on About
        </Link>
      </section>

      <p className="text-[11px] text-muted text-center">
        You sign every transaction.{" "}
        <Link href="/security" className="text-secondary hover:underline">
          Security
        </Link>
      </p>
    </div>
  );
}
