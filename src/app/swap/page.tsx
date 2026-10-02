"use client";

import { useState } from "react";
import { Address } from "@/components/Address";
import { ConnectButton } from "@/components/ConnectButton";
import { CONTRACTS } from "@/lib/mock-data";
import { useRequireWallet } from "@/hooks/useRequireWallet";
import { useSwitchChain } from "wagmi";
import { TARGET_CHAIN_ID } from "@/lib/chains";

type TxState = "idle" | "quoting" | "awaiting_signature" | "pending" | "completed";

export default function SwapPage() {
  const { isConnected, wrongNetwork, ready } = useRequireWallet();
  const { switchChain } = useSwitchChain();
  const [amountIn, setAmountIn] = useState("0.1");
  const [state, setState] = useState<TxState>("idle");
  const quoteOut = (parseFloat(amountIn || "0") * 1420.5).toFixed(2);

  const handleSwap = async () => {
    if (!ready) return;
    setState("quoting");
    await new Promise((r) => setTimeout(r, 400));
    setState("awaiting_signature");
    await new Promise((r) => setTimeout(r, 800));
    setState("pending");
    await new Promise((r) => setTimeout(r, 1000));
    setState("completed");
  };

  return (
    <div className="max-w-md mx-auto space-y-5 pb-4">
      <h1 className="font-display text-xl font-bold">Swap</h1>
      <section className="card p-4 space-y-4">
        <div>
          <label className="text-xs text-muted block mb-1.5">You pay</label>
          <div className="flex gap-2">
            <input type="number" value={amountIn} onChange={(e) => setAmountIn(e.target.value)} className="font-display font-bold text-lg" />
            <span className="control px-4 flex items-center font-display font-bold text-sm shrink-0">ETH</span>
          </div>
        </div>
        <div className="text-center text-muted text-xs">↓</div>
        <div>
          <label className="text-xs text-muted block mb-1.5">You receive (est.)</label>
          <div className="flex gap-2">
            <div className="control flex-1 px-3 py-3 font-display font-bold text-lg text-lime tabular-nums">{quoteOut}</div>
            <span className="control px-4 flex items-center font-display font-bold text-sm shrink-0">MCFL</span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="control p-2.5"><span className="text-muted block text-[10px]">Price impact</span>~0.12%</div>
          <div className="control p-2.5"><span className="text-muted block text-[10px]">Slippage</span>0.5%</div>
        </div>
        <div className="text-[11px] text-muted flex justify-between gap-2">
          <span>Router</span>
          <Address value={CONTRACTS.swapRouter} />
        </div>
        <p className="text-[11px] text-warn leading-relaxed">
          Irreversible once confirmed on-chain. Confirm details in your wallet before you sign. Live swap calldata requires the production router ABI.
        </p>
        {!isConnected && (<div className="flex justify-center"><ConnectButton /></div>)}
        {wrongNetwork && (
          <button type="button" className="btn btn-full text-sm bg-[var(--warn)] text-[var(--lime-text)]" onClick={() => switchChain({ chainId: TARGET_CHAIN_ID })}>
            Switch to Robinhood Chain
          </button>
        )}
        {ready && (
          <button type="button" onClick={handleSwap} disabled={state !== "idle" && state !== "completed"} className="btn btn-primary btn-full">
            {state === "idle" && "Sign and swap"}
            {state === "quoting" && "Getting quote…"}
            {state === "awaiting_signature" && "Awaiting signature…"}
            {state === "pending" && "Pending…"}
            {state === "completed" && "Swap complete (preview)"}
          </button>
        )}
      </section>
    </div>
  );
}
