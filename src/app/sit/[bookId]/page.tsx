"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import { SeatRing } from "@/components/SeatRing";
import { ConnectButton } from "@/components/ConnectButton";
import { MOCK_BOOKS } from "@/lib/mock-data";
import { useRequireWallet } from "@/hooks/useRequireWallet";
import { useSwitchChain } from "wagmi";
import { TARGET_CHAIN_ID } from "@/lib/chains";

type TxState = "idle" | "preparing" | "awaiting_signature" | "pending" | "completed";

export default function SitPage() {
  const params = useParams();
  const book = MOCK_BOOKS.find((b) => b.id === params.bookId);
  const { isConnected, wrongNetwork, ready } = useRequireWallet();
  const { switchChain } = useSwitchChain();
  const [state, setState] = useState<TxState>("idle");

  if (!book) {
    return (
      <div className="card p-8 text-center">
        <p className="text-down text-sm">Book not found</p>
        <Link href="/books" className="text-lime text-sm mt-3 inline-block">← Explore</Link>
      </div>
    );
  }

  const seats = Math.min(book.seatsTaken, 18);

  const sit = async () => {
    if (!ready) return;
    setState("preparing");
    await new Promise((r) => setTimeout(r, 500));
    setState("awaiting_signature");
    await new Promise((r) => setTimeout(r, 800));
    setState("pending");
    await new Promise((r) => setTimeout(r, 1000));
    setState("completed");
  };

  return (
    <div className="max-w-md mx-auto space-y-5 pb-4">
      <Link href={`/books/${book.id}`} className="text-muted text-sm hover:text-secondary">← ${book.symbol}</Link>
      <div className="card p-6 flex flex-col items-center text-center gap-4">
        <SeatRing taken={seats} total={18} size={140} />
        <div>
          <h1 className="font-display text-xl font-bold">Sit a chair</h1>
          <p className="text-secondary text-sm mt-1">${book.symbol} · {book.name}</p>
        </div>
        <div className="w-full space-y-2 text-sm text-left">
          <div className="flex justify-between py-2 border-b border-[var(--divider)]">
            <span className="text-muted">Min bid</span>
            <span className="font-display font-bold text-lime">{book.seatPriceEth} ETH</span>
          </div>
          <div className="flex justify-between py-2 border-b border-[var(--divider)]">
            <span className="text-muted">Seats left</span>
            <span className="font-display font-bold">{18 - seats}/18</span>
          </div>
          <div className="flex justify-between py-2">
            <span className="text-muted">You receive</span>
            <span>1 seat NFT</span>
          </div>
        </div>
        <p className="text-[11px] text-warn text-left w-full leading-relaxed">
          Irreversible once confirmed. Impermanent loss possible. Confirm in your wallet before you sign. Live seat mint requires the production seat contract ABI.
        </p>
        {state === "completed" ? (
          <div className="w-full space-y-3">
            <p className="text-up font-display font-bold">Seat acquired (preview)</p>
            <Link href="/portfolio" className="btn btn-primary btn-full">View seats</Link>
          </div>
        ) : (
          <>
            {!isConnected && <ConnectButton />}
            {wrongNetwork && (
              <button type="button" className="btn btn-full text-sm bg-[var(--warn)] text-[var(--lime-text)]" onClick={() => switchChain({ chainId: TARGET_CHAIN_ID })}>
                Switch to Robinhood Chain
              </button>
            )}
            {ready && (
              <button type="button" onClick={sit} disabled={state !== "idle"} className="btn btn-primary btn-full">
                {state === "idle" && "Sign and sit"}
                {state === "preparing" && "Preparing…"}
                {state === "awaiting_signature" && "Awaiting signature…"}
                {state === "pending" && "Pending…"}
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}
