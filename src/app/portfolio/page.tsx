"use client";

import Link from "next/link";
import { useAccount } from "wagmi";
import { ConnectButton } from "@/components/ConnectButton";
import { MOCK_PORTFOLIO } from "@/lib/mock-data";
import { McflBalance } from "@/components/McflBalance";

export default function SeatsPage() {
  const { address, isConnected } = useAccount();

  if (!isConnected) {
    return (
      <div className="card p-8 text-center space-y-4 max-w-sm mx-auto mt-8">
        <h1 className="font-display text-2xl font-bold mt-2">Your seats</h1>
          <p className="text-secondary text-sm mt-1">Connect a wallet to view seats and on-chain MCFL balance.</p>
        </div>
        <div className="card p-6 text-center space-y-4">
          <div className="mx-auto w-12 h-12 rounded-full bg-[var(--control)] flex items-center justify-center text-lg">⌂</div>
          <div><div className="font-display font-bold">Connect to open your portfolio</div><p className="text-xs text-muted mt-1">Seat ownership will appear here once the indexer is connected.</p></div>
          <div className="flex justify-center"><ConnectButton /></div>
        </div>
      </div>
    );
  }

  const seats = MOCK_PORTFOLIO.seats;
  const totalValue = seats.reduce((s, x) => s + parseFloat(x.liquidity || "0"), 0);

  return (
    <div className="space-y-5 pb-4">
      <div>
        <h1 className="font-display text-xl font-bold">Seats</h1>
        {address && (
          <p className="text-xs text-muted font-mono mt-1">
            {address.slice(0, 6)}…{address.slice(-4)}
          </p>
        )}
      </div>

      <McflBalance />

      <div className="grid grid-cols-2 gap-3">
        <div className="card p-4"><div className="text-[11px] text-muted uppercase tracking-wide mb-1">Seat value</div><div className="font-display text-xl font-bold tabular-nums">{totalValue.toFixed(2)} ETH</div><div className="text-[11px] text-muted mt-1">Sample portfolio data</div></div>
        <div className="card p-4"><div className="text-[11px] text-muted uppercase tracking-wide mb-1">Seats held</div><div className="font-display text-xl font-bold tabular-nums">{seats.length}</div><div className="text-[11px] text-muted mt-1">Indexing coming soon</div></div>
      </div>

      <section className="space-y-3">
        <div className="flex items-end justify-between gap-3"><div><h2 className="font-display text-sm font-bold">Seat positions</h2><p className="text-xs text-muted mt-0.5">Your team allocations in one place.</p></div><span className="text-[10px] text-muted uppercase tracking-wide">Preview</span></div>

      {seats.length === 0 ? (
        <div className="card p-8 text-center space-y-3">
          <p className="text-secondary text-sm">
            No seats yet. Find a team to sit with.
          </p>
          <Link href="/books" className="btn btn-primary inline-flex">
            Explore books
          </Link>
        </div>
      ) : (
        <div className="card divide-y divide-[var(--divider)] overflow-hidden">
          {seats.map((s) => (
            <Link
              key={s.tokenId}
              href={`/portfolio/seats/${s.tokenId}`}
              className="group flex items-center gap-3 p-4 hover:bg-[var(--control)] focus-visible:bg-[var(--control)] min-h-[68px]"
            >
              <div className="flex-1 min-w-0">
                <div className="font-display font-bold text-sm truncate">
                  {s.bookName}
                </div>
                <div className="text-xs text-muted">Chair #{s.tokenId}</div>
              </div>
              <div className="text-right shrink-0">
                <div className="font-display text-sm font-bold tabular-nums">
                  {s.liquidity} ETH
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      <p className="text-[11px] text-muted">
        Seat list is placeholder until the seat NFT indexer is connected. MCFL
        balance above is a live on-chain read.
      </p>

      <Link href="/books" className="btn btn-secondary btn-full">
        Find a team to sit with
      </Link>
    </div>
  );
}
