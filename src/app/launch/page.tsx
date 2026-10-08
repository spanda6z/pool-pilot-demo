"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { getReferral } from "@/lib/referral";

export default function LaunchPage() {
  const router = useRouter();
  const [ticker, setTicker] = useState("");
  const [minBid, setMinBid] = useState("0.05");
  const [refCode, setRefCode] = useState("");

  const tickerError = useMemo(() => {
    if (!ticker) return null;
    if (ticker.length < 2 || ticker.length > 10) return "Ticker must be 2–10 characters";
    return null;
  }, [ticker]);

  const bidNumber = Number(minBid);
  const bidError = useMemo(() => {
    if (!minBid) return "Enter a minimum bid";
    if (!Number.isFinite(bidNumber) || bidNumber <= 0) return "Minimum bid must be greater than 0";
    if (bidNumber > 1000) return "Minimum bid must be 1,000 ETH or less";
    return null;
  }, [minBid, bidNumber]);

  const canContinue = Boolean(ticker) && !tickerError && !bidError;

  useEffect(() => {
    const r = getReferral();
    if (r) setRefCode(r);
  }, []);

  const go = () => {
    if (!canContinue) return;
    const q = new URLSearchParams({
      ticker,
      bid: bidNumber.toString(),
    });
    if (refCode.trim()) q.set("ref", refCode.trim().slice(0, 32));
    router.push(`/launch/review?${q.toString()}`);
  };

  return (
    <div className="space-y-6 pb-4">
      <div>
        <h1 className="text-[28px] font-display mb-1">Launch</h1>
        <p className="text-secondary leading-relaxed">
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
            aria-invalid={Boolean(tickerError)}
            aria-describedby={tickerError ? "ticker-error" : undefined}
          />
          {tickerError && (
            <p id="ticker-error" role="alert" className="text-down text-xs mt-1.5">
              {tickerError}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="bid" className="text-xs text-muted block mb-1.5">
            Min bid per seat (ETH)
          </label>
          <input
            id="bid"
            type="number"
            inputMode="decimal"
            step="0.001"
            min="0.001"
            max="1000"
            value={minBid}
            onChange={(e) => setMinBid(e.target.value)}
            aria-invalid={Boolean(bidError)}
            aria-describedby={bidError ? "bid-error" : undefined}
          />
          {bidError && (
            <p id="bid-error" role="alert" className="text-down text-xs mt-1.5">
              {bidError}
            </p>
          )}
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
            maxLength={32}
          />
        </div>
      </div>

      <button
        type="button"
        onClick={go}
        disabled={!canContinue}
        className="btn btn-primary btn-full disabled:opacity-50 disabled:cursor-not-allowed"
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
