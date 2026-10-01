"use client";

import { useState } from "react";
import { DemoBadge } from "@/components/DemoBadge";
import { Address } from "@/components/Address";
import { CONTRACTS } from "@/lib/mock-data";

type TxState = "idle" | "quoting" | "awaiting_signature" | "pending" | "completed";

export default function SwapPage() {
  const [amountIn, setAmountIn] = useState("0.1");
  const [slippage, setSlippage] = useState("0.5");
  const [state, setState] = useState<TxState>("idle");
  const [connected, setConnected] = useState(false);

  const quoteOut = (parseFloat(amountIn || "0") * 1420.5).toFixed(2);

  const handleSwap = async () => {
    if (!connected) {
      setConnected(true);
      return;
    }
    setState("quoting");
    await new Promise((r) => setTimeout(r, 600));
    setState("awaiting_signature");
    await new Promise((r) => setTimeout(r, 1000));
    setState("pending");
    await new Promise((r) => setTimeout(r, 1500));
    setState("completed");
  };

  return (
    <div className="max-w-md mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-black">
          <span className="text-eth">▸</span> SWAP
        </h1>
        <DemoBadge />
      </div>

      <section className="pixel-card p-5 space-y-4">
        <div>
          <label className="text-[10px] text-muted tracking-wider">YOU PAY</label>
          <div className="flex gap-2 mt-1">
            <input
              type="number"
              value={amountIn}
              onChange={(e) => setAmountIn(e.target.value)}
              className="flex-1 bg-navy-800 border-2 border-[var(--pixel-border)] px-3 py-3 text-lg font-bold focus:outline-none focus:border-cyan"
            />
            <div className="bg-navy-700 border-2 border-[var(--pixel-border)] px-4 py-3 font-bold text-cyan">
              ETH
            </div>
          </div>
        </div>

        <div className="text-center text-muted text-xs">↓</div>

        <div>
          <label className="text-[10px] text-muted tracking-wider">YOU RECEIVE (est.)</label>
          <div className="flex gap-2 mt-1">
            <div className="flex-1 bg-navy-800 border-2 border-[var(--pixel-border)] px-3 py-3 text-lg font-bold text-mint">
              {quoteOut}
            </div>
            <div className="bg-navy-700 border-2 border-[var(--pixel-border)] px-4 py-3 font-bold text-gold">
              MCFL
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="bg-navy-800 p-2 pixel-border">
            <span className="text-muted">Price impact</span>
            <div className="text-secondary">~0.12%</div>
          </div>
          <div className="bg-navy-800 p-2 pixel-border">
            <span className="text-muted">Slippage</span>
            <div className="flex items-center gap-1">
              <input
                type="number"
                value={slippage}
                onChange={(e) => setSlippage(e.target.value)}
                className="w-12 bg-transparent border-b border-muted text-secondary focus:outline-none"
              />
              %
            </div>
          </div>
          <div className="bg-navy-800 p-2 pixel-border">
            <span className="text-muted">Pool fee</span>
            <div className="text-secondary">0.30%</div>
          </div>
          <div className="bg-navy-800 p-2 pixel-border">
            <span className="text-muted">Protocol fee</span>
            <div className="text-secondary">0.05%</div>
          </div>
        </div>

        <div className="text-[10px] text-muted space-y-1">
          <div className="flex justify-between">
            <span>Router</span>
            <Address value={CONTRACTS.swapRouter} />
          </div>
          <div className="flex justify-between">
            <span>Network</span>
            <span>Robinhood Chain (4663)</span>
          </div>
        </div>

        <div className="bg-navy-800 pixel-border p-2 text-[10px] text-coral">
          ⚠ Irreversible once confirmed. Demo mode — no real funds move.
        </div>

        <button
          type="button"
          onClick={handleSwap}
          disabled={state !== "idle" && state !== "completed"}
          className="pixel-btn btn-eth w-full py-3 text-sm"
        >
          {!connected && "Connect Wallet"}
          {connected && state === "idle" && "Sign & Swap"}
          {state === "quoting" && "Getting quote…"}
          {state === "awaiting_signature" && "Awaiting signature…"}
          {state === "pending" && "Pending…"}
          {state === "completed" && "Swap complete (mock) ✓"}
        </button>
      </section>
    </div>
  );
}
