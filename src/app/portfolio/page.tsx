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
        <h1 className="font-display text-xl font-bold">Seats</h1>
        <p className="text-secondary text-sm">
          Connect your wallet to see chairs you hold.
        </p>
        <div className="flex justify-center">
          <ConnectButton />
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
        <div className="card p-4">
          <div className="text-xs text-muted mb-1">Total seat value</div>
          <div className="font-display text-xl font-bold tabular-nums">
            {totalValue.toFixed(2)} ETH
          </div>
        </div>
        <div className="card p-4">
          <div className="text-xs text-muted mb-1">Seats held</div>
          <div className="font-display text-xl font-bold">{seats.length}</div>
        </div>
      </div>

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
              className="flex items-center gap-3 p-4 hover:bg-[var(--control)] min-h-[64px]"
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
