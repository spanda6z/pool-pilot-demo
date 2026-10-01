"use client";

import Link from "next/link";
import { useState } from "react";
import { DemoBadge } from "@/components/DemoBadge";
import { Address } from "@/components/Address";
import { MOCK_PORTFOLIO } from "@/lib/mock-data";

export default function PortfolioPage() {
  const [connected, setConnected] = useState(false);

  if (!connected) {
    return (
      <div className="max-w-md mx-auto pixel-card p-8 text-center space-y-5">
        <h1 className="text-xl font-black tracking-tight">Portfolio</h1>
        <p className="text-secondary text-sm leading-relaxed">
          Connect your wallet to view balances and seat NFTs.
        </p>
        <button
          type="button"
          onClick={() => setConnected(true)}
          className="pixel-btn btn-cyan px-8 py-3 text-sm w-full sm:w-auto"
        >
          Connect Wallet
        </button>
        <div className="flex justify-center">
          <DemoBadge />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-8">
      <div className="flex items-center justify-between gap-3">
        <h1 className="text-xl sm:text-2xl font-black tracking-tight">
          <span className="text-cyan">▸</span> Portfolio
        </h1>
        <DemoBadge />
      </div>

      <section className="pixel-card p-5">
        <div className="text-[10px] text-muted uppercase tracking-wide mb-1.5">Connected</div>
        <Address value={MOCK_PORTFOLIO.address} full />
        <div className="mt-4 text-2xl sm:text-3xl font-bold text-cyan tabular-nums">
          {MOCK_PORTFOLIO.ethBalance}{" "}
          <span className="text-sm text-muted font-medium">ETH</span>
        </div>
      </section>

      <section className="pixel-card p-5">
        <h2 className="text-xs font-bold tracking-[0.15em] text-cyan mb-3 uppercase">Tokens</h2>
        <div className="space-y-1">
          {MOCK_PORTFOLIO.tokens.map((t) => (
            <div
              key={t.symbol}
              className="flex justify-between items-center py-3 border-b border-[rgba(30,58,95,0.4)] last:border-0"
            >
              <div>
                <div className="font-bold text-sm">{t.symbol}</div>
                <Address value={t.address} className="text-[10px]" />
              </div>
              <div className="text-right font-bold text-mint tabular-nums">{t.balance}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="pixel-card p-5">
        <h2 className="text-xs font-bold tracking-[0.15em] text-gold mb-3 uppercase">Seat NFTs</h2>
        {MOCK_PORTFOLIO.seats.length === 0 ? (
          <p className="text-muted text-sm">No seats yet.</p>
        ) : (
          <div className="space-y-3">
            {MOCK_PORTFOLIO.seats.map((s) => (
              <Link
                key={s.tokenId}
                href={`/portfolio/seats/${s.tokenId}`}
                className="block bg-navy-800/50 pixel-border p-4 hover:border-gold/40 transition-colors"
              >
                <div className="flex justify-between gap-3">
                  <div className="min-w-0">
                    <div className="font-bold text-sm truncate">{s.bookName}</div>
                    <div className="text-muted text-xs mt-0.5">Token ID #{s.tokenId}</div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-gold font-bold tabular-nums">{s.liquidity} ETH</div>
                    <div className="text-mint text-[10px] uppercase mt-0.5">{s.status}</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      <p className="text-[10px] text-muted leading-relaxed">
        DEMO balances. Live data requires wallet + RPC + indexer.
      </p>
    </div>
  );
}
