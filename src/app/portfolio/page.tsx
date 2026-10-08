"use client";

import Link from "next/link";
import { useAccount } from "wagmi";
import { ConnectButton } from "@/components/ConnectButton";
import { McflBalance } from "@/components/McflBalance";

export default function SeatsPage() {
  const { address, isConnected } = useAccount();

  if (!isConnected) {
    return (
      <div className="space-y-5 pb-4">
        <div>
          <span className="pill pill-fill text-[10px]">Portfolio</span>
          <h1 className="font-display text-2xl font-bold mt-2">Your seats</h1>
          <p className="text-secondary text-sm mt-1">Connect a wallet to view your on-chain MCFL balance.</p>
        </div>
        <div className="card p-6 text-center space-y-4">
          <div className="mx-auto w-12 h-12 rounded-full bg-[var(--control)] flex items-center justify-center text-lg">⌂</div>
          <div>
            <div className="font-display font-bold">Connect to open your portfolio</div>
            <p className="text-xs text-muted mt-1">Seat ownership indexing is not connected yet.</p>
          </div>
          <div className="flex justify-center"><ConnectButton /></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5 pb-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <span className="pill pill-fill text-[10px]">Portfolio</span>
          <h1 className="font-display text-2xl font-bold mt-2">Your seats</h1>
          {address && <p className="text-xs text-muted font-mono mt-1" title={address}>{address.slice(0, 6)}…{address.slice(-4)}</p>}
        </div>
        <Link href="/books" className="btn btn-ghost text-xs min-h-[40px] px-3">Browse</Link>
      </div>

      <McflBalance />

      <section className="card p-6 text-center space-y-3">
        <div className="mx-auto w-12 h-12 rounded-full bg-[var(--control)] flex items-center justify-center text-lg">⌂</div>
        <div>
          <h2 className="font-display font-bold">Seat ownership is not indexed yet</h2>
          <p className="text-secondary text-sm mt-1">
            Pool Pilot reads your MCFL balance from Robinhood Chain, but it does not currently claim NFT seat ownership for this wallet.
          </p>
        </div>
        <span className="pill pill-fill text-[10px]">No ownership claims</span>
      </section>

      <section className="space-y-3">
        <div>
          <h2 className="font-display text-sm font-bold">Demo seat preview</h2>
          <p className="text-xs text-muted mt-0.5">Illustrative only — not connected to your wallet.</p>
        </div>
        <div className="card p-4 space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-[12px] bg-[var(--control)] flex items-center justify-center font-display text-xs font-bold shrink-0">#42</div>
            <div className="flex-1 min-w-0">
              <div className="font-display font-bold text-sm">McFlamingo</div>
              <div className="text-xs text-muted mt-0.5">Demo chair · ownership not verified</div>
            </div>
            <span className="text-[10px] text-muted uppercase tracking-wide">Preview</span>
          </div>
        </div>
      </section>

      <div className="card p-4 border border-dashed border-[var(--divider)]">
        <div className="flex gap-3">
          <div className="text-lime mt-0.5">●</div>
          <div>
            <div className="text-xs font-semibold">Transparent data status</div>
            <p className="text-[11px] text-muted mt-1 leading-relaxed">
              MCFL balance is read from chain. Seat positions are intentionally shown only as demo data until the seat NFT indexer and ownership reader are connected.
            </p>
          </div>
        </div>
      </div>

      <Link href="/books" className="btn btn-secondary btn-full">Find a team to sit with</Link>
    </div>
  );
}
