"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import { DemoBadge } from "@/components/DemoBadge";
import { Address } from "@/components/Address";
import { MOCK_BOOKS, CONTRACTS } from "@/lib/mock-data";

type TxState =
  | "idle"
  | "wallet_not_connected"
  | "preparing"
  | "awaiting_signature"
  | "pending"
  | "completed"
  | "user_rejected";

export default function SitPage() {
  const params = useParams();
  const bookId = params.bookId as string;
  const book = MOCK_BOOKS.find((b) => b.id === bookId);
  const [state, setState] = useState<TxState>("idle");
  const [connected, setConnected] = useState(false);

  if (!book) {
    return (
      <div className="pixel-card p-8 text-center">
        <p className="text-coral">Book not found</p>
        <Link href="/books" className="text-cyan text-sm mt-4 inline-block">
          ← Back to books
        </Link>
      </div>
    );
  }

  const handleSit = async () => {
    if (!connected) {
      setState("wallet_not_connected");
      return;
    }
    setState("preparing");
    await new Promise((r) => setTimeout(r, 800));
    setState("awaiting_signature");
    await new Promise((r) => setTimeout(r, 1200));
    setState("pending");
    await new Promise((r) => setTimeout(r, 1500));
    setState("completed");
  };

  return (
    <div className="space-y-6 max-w-lg mx-auto">
      <div className="flex items-center gap-3">
        <Link href={`/books/${book.id}`} className="text-muted text-xs hover:text-cyan">
          ← {book.name}
        </Link>
        <DemoBadge />
      </div>

      <section className="pixel-card p-6">
        <h1 className="text-xl font-black mb-1">Take a Seat</h1>
        <p className="text-muted text-xs mb-4">${book.symbol} · {book.name}</p>

        <div className="space-y-3 text-sm mb-6">
          <div className="flex justify-between">
            <span className="text-secondary">Seat price</span>
            <span className="text-gold font-bold">{book.seatPriceEth} ETH</span>
          </div>
          <div className="flex justify-between">
            <span className="text-secondary">Seats left</span>
            <span className="text-cyan">
              {book.seatsTotal - book.seatsTaken} / {book.seatsTotal}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-secondary">You receive</span>
            <span className="text-mint">1× Seat NFT</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-secondary">Target</span>
            <Address value={CONTRACTS.seatVault} />
          </div>
        </div>

        <div className="bg-navy-800 pixel-border p-3 text-xs text-secondary mb-4">
          <p className="font-bold text-coral mb-1">⚠ RISK DISCLOSURE</p>
          <ul className="list-disc list-inside space-y-0.5">
            <li>Irreversible once confirmed on-chain.</li>
            <li>Impermanent loss possible.</li>
            <li>Demo mode — no real funds move.</li>
          </ul>
        </div>

        {!connected ? (
          <button
            type="button"
            onClick={() => setConnected(true)}
            className="pixel-btn btn-cyan w-full py-3 text-sm"
          >
            Connect Wallet
          </button>
        ) : state === "completed" ? (
          <div className="text-center space-y-3">
            <p className="text-mint font-bold">Seat acquired (mock)</p>
            <p className="text-xs text-muted">Token ID #42 · DEMO</p>
            <Link href="/portfolio" className="pixel-btn btn-gold px-5 py-2 text-sm inline-block">
              View Portfolio
            </Link>
          </div>
        ) : (
          <button
            type="button"
            onClick={handleSit}
            disabled={state !== "idle" && state !== "user_rejected"}
            className="pixel-btn btn-gold w-full py-3 text-sm"
          >
            {state === "idle" && "Sign & Take Seat"}
            {state === "preparing" && "Preparing…"}
            {state === "awaiting_signature" && "Awaiting signature…"}
            {state === "pending" && "Pending confirmation…"}
            {state === "wallet_not_connected" && "Connect first"}
          </button>
        )}

        {state === "wallet_not_connected" && (
          <p className="text-coral text-xs mt-2 text-center">Connect wallet first</p>
        )}
      </section>

      <p className="text-[10px] text-muted text-center">
        Network: Robinhood Chain (4663) · Non-custodial · You sign every tx
      </p>
    </div>
  );
}
