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
    <div className="max-w-md mx-auto space-y-6 pb-8">
      <div className="flex items-center justify-between">
        <h1 className="text-xl sm:text-2xl font-black tracking-tight">
          <span className="text-eth">▸</span> Swap
        </h1>
        <DemoBadge />
      </div>

      <section className="pixel-card p-5 space-y-5">
        <div>
          <label className="text-[10px] text-muted tracking-wider uppercase">You pay</label>
          <div className="flex gap-2 mt-1.5">
            <input
              type="number"
              value={amountIn}
              onChange={(e) => setAmountIn(e.target.value)}
              className="flex-1 bg-navy-800/80 border border-[rgba(30,58,95,0.8)] px-4 py-3.5 text-lg font-bold tabular-nums focus:outline-none min-w-0"
            />
            <div className="bg-navy-700/80 border border-[rgba(30,58,95,0.8)] px-4 py-3.5 font-bold text-cyan text-sm flex items-center rounded-lg shrink-0">
              ETH
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="w-8 h-8 rounded-full bg-navy-800 border border-[rgba(30,58,95,0.8)] flex items-center justify-center text-muted text-sm">
            ↓
          </div>
        </div>

        <div>
          <label className="text-[10px] text-muted tracking-wider uppercase">You receive (est.)</label>
          <div className="flex gap-2 mt-1.5">
            <div className="flex-1 bg-navy-800/80 border border-[rgba(30,58,95,0.8)] px-4 py-3.5 text-lg font-bold text-mint tabular-nums min-w-0">
              {quoteOut}
            </div>
            <div className="bg-navy-700/80 border border-[rgba(30,58,95,0.8)] px-4 py-3.5 font-bold text-gold text-sm flex items-center rounded-lg shrink-0">
              MCFL
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs">
          {[
            { label: "Price impact", value: "~0.12%" },
            { label: "Slippage", value: null },
            { label: "Pool fee", value: "0.30%" },
            { label: "Protocol fee", value: "0.05%" },
          ].map((row) => (
            <div key={row.label} className="bg-navy-800/50 p-2.5 pixel-border">
              <span className="text-muted text-[10px] block">{row.label}</span>
              {row.value ? (
                <div className="text-secondary mt-0.5">{row.value}</div>
              ) : (
                <div className="flex items-center gap-1 mt-0.5">
                  <input
                    type="number"
                    value={slippage}
                    onChange={(e) => setSlippage(e.target.value)}
                    className="w-12 bg-transparent border-b border-muted text-secondary focus:outline-none"
                  />
                  %
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-[10px] text-muted space-y-1.5 pt-1">
          <div className="flex justify-between items-center gap-2">
            <span>Router</span>
            <Address value={CONTRACTS.swapRouter} />
          </div>
          <div className="flex justify-between">
            <span>Network</span>
            <span>Robinhood Chain (4663)</span>
          </div>
        </div>

        <div className="bg-[rgba(248,113,113,0.08)] border border-coral/25 rounded-lg p-3 text-[10px] text-coral leading-relaxed">
          ⚠ Irreversible once confirmed. Demo mode — no real funds move.
        </div>

        <button
          type="button"
          onClick={handleSwap}
          disabled={state !== "idle" && state !== "completed"}
          className="pixel-btn btn-eth w-full py-3.5 text-sm"
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
