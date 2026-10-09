"use client";

import { useState } from "react";
import { ConnectButton } from "@/components/ConnectButton";
import { useRequireWallet } from "@/hooks/useRequireWallet";
import { useSwitchChain } from "wagmi";
import { TARGET_CHAIN_ID } from "@/lib/chains";

export default function SwapPage() {
  const { isConnected, wrongNetwork, ready } = useRequireWallet();
  const { switchChain } = useSwitchChain();
  const [amountIn, setAmountIn] = useState("0.1");

  const hasAmount = Number.isFinite(Number(amountIn)) && Number(amountIn) > 0;

  return (
    <div className="max-w-md mx-auto space-y-5 pb-4">
      <h1 className="font-display text-xl font-bold">Swap</h1>
      <section className="card p-4 space-y-4">
        <div>
          <label htmlFor="swap-amount" className="text-xs text-muted block mb-1.5">You pay</label>
          <div className="flex gap-2">
            <input
              id="swap-amount"
              type="number"
              min="0"
              step="any"
              inputMode="decimal"
              value={amountIn}
              onChange={(e) => setAmountIn(e.target.value)}
              className="font-display font-bold text-lg"
            />
            <span className="control px-4 flex items-center font-display font-bold text-sm shrink-0">ETH</span>
          </div>
        </div>

        <div className="text-center text-muted text-xs" aria-hidden="true">↓</div>

        <div>
          <span className="text-xs text-muted block mb-1.5">You receive</span>
          <div className="control p-3 font-display font-bold text-lg text-muted">
            Live quote unavailable
          </div>
          <p className="text-[11px] text-muted mt-1.5">
            Production routing is not connected, so Pool Pilot will not invent a price or estimated output.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="control p-2.5">
            <span className="text-muted block text-[10px]">Price impact</span>
            —
          </div>
          <div className="control p-2.5">
            <span className="text-muted block text-[10px]">Slippage</span>
            —
          </div>
        </div>

        <div className="rounded-[14px] border border-[var(--warn)]/40 bg-[var(--warn)]/5 p-3 text-xs text-warn leading-relaxed">
          Swapping is disabled until the production router, quote service, calldata, and receipt handling are configured. No transaction can be submitted from this page.
        </div>

        {!isConnected && (
          <div className="flex justify-center"><ConnectButton /></div>
        )}

        {wrongNetwork && (
          <button
            type="button"
            className="btn btn-full text-sm bg-[var(--warn)] text-[var(--lime-text)]"
            onClick={() => switchChain({ chainId: TARGET_CHAIN_ID })}
          >
            Switch to Robinhood Chain
          </button>
        )}

        {ready && (
          <button
            type="button"
            disabled={!hasAmount}
            className="btn btn-secondary btn-full"
            title="Production swap integration is not enabled"
          >
            Swap unavailable
          </button>
        )}
      </section>
    </div>
  );
}
