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
      <div className="pixel-card p-8 text-center max-w-md mx-auto">
        <p className="text-coral font-medium">Book not found</p>
        <Link href="/books" className="text-cyan text-sm mt-4 inline-block hover:underline">
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
    <div className="space-y-6 max-w-lg mx-auto pb-8">
      <div className="flex items-center gap-3">
        <Link href={`/books/${book.id}`} className="text-muted text-xs hover:text-cyan transition-colors">
          ← {book.name}
        </Link>
        <DemoBadge />
      </div>

      <section className="pixel-card p-5 sm:p-6">
        <h1 className="text-xl font-black tracking-tight mb-1">Take a Seat</h1>
        <p className="text-muted text-xs mb-5">${book.symbol} · {book.name}</p>

        <div className="space-y-3 text-sm mb-6">
          {[
            { label: "Seat price", value: `${book.seatPriceEth} ETH`, color: "text-gold font-bold" },
            { label: "Seats left", value: `${book.seatsTotal - book.seatsTaken} / ${book.seatsTotal}`, color: "text-cyan" },
            { label: "You receive", value: "1× Seat NFT", color: "text-mint" },
          ].map((row) => (
            <div key={row.label} className="flex justify-between items-center py-1.5 border-b border-[rgba(30,58,95,0.4)] last:border-0">
              <span className="text-secondary">{row.label}</span>
              <span className={row.color}>{row.value}</span>
            </div>
          ))}
          <div className="flex justify-between items-center text-xs pt-1">
            <span className="text-secondary">Target</span>
            <Address value={CONTRACTS.seatVault} />
          </div>
        </div>

        <div className="bg-[rgba(248,113,113,0.08)] border border-coral/25 rounded-lg p-3 text-xs text-secondary mb-5">
          <p className="font-bold text-coral mb-1.5 text-[11px]">⚠ Risk disclosure</p>
          <ul className="list-disc list-inside space-y-1 text-[11px] leading-relaxed">
            <li>Irreversible once confirmed on-chain.</li>
            <li>Impermanent loss possible.</li>
            <li>Demo mode — no real funds move.</li>
          </ul>
        </div>

        {!connected ? (
          <button
            type="button"
            onClick={() => setConnected(true)}
            className="pixel-btn btn-cyan w-full py-3.5 text-sm"
          >
            Connect Wallet
          </button>
        ) : state === "completed" ? (
          <div className="text-center space-y-3 py-2">
            <p className="text-mint font-bold text-lg">Seat acquired (mock)</p>
            <p className="text-xs text-muted">Token ID #42 · DEMO</p>
            <Link href="/portfolio" className="pixel-btn btn-gold px-6 py-3 text-sm inline-flex">
              View Portfolio
            </Link>
          </div>
        ) : (
          <button
            type="button"
            onClick={handleSit}
            disabled={state !== "idle" && state !== "user_rejected"}
            className="pixel-btn btn-gold w-full py-3.5 text-sm"
          >
            {state === "idle" && "Sign & Take Seat"}
            {state === "preparing" && "Preparing…"}
            {state === "awaiting_signature" && "Awaiting signature…"}
            {state === "pending" && "Pending confirmation…"}
            {state === "wallet_not_connected" && "Connect first"}
          </button>
        )}

        {state === "wallet_not_connected" && (
          <p className="text-coral text-xs mt-3 text-center">Connect wallet first</p>
        )}
      </section>

      <p className="text-[10px] text-muted text-center leading-relaxed">
        Network: Robinhood Chain (4663) · Non-custodial · You sign every tx
      </p>
    </div>
  );
}
