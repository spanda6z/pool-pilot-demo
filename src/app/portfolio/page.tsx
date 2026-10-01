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
      <div className="max-w-md mx-auto pixel-card p-8 text-center space-y-4">
        <h1 className="text-xl font-black">Portfolio</h1>
        <p className="text-secondary text-sm">Connect wallet to view balances and seats.</p>
        <button
          type="button"
          onClick={() => setConnected(true)}
          className="pixel-btn btn-cyan px-6 py-2.5 text-sm"
        >
          Connect Wallet
        </button>
        <DemoBadge />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-black">
          <span className="text-cyan">▸</span> PORTFOLIO
        </h1>
        <DemoBadge />
      </div>

      <section className="pixel-card p-5">
        <div className="text-[10px] text-muted mb-1">CONNECTED</div>
        <Address value={MOCK_PORTFOLIO.address} full />
        <div className="mt-3 text-2xl font-bold text-cyan">
          {MOCK_PORTFOLIO.ethBalance} <span className="text-sm text-muted">ETH</span>
        </div>
      </section>

      <section className="pixel-card p-5">
        <h2 className="text-sm font-bold tracking-widest text-cyan mb-3">▸ TOKENS</h2>
        <div className="space-y-2">
          {MOCK_PORTFOLIO.tokens.map((t) => (
            <div key={t.symbol} className="flex justify-between items-center py-2 border-b border-[var(--pixel-border)]">
              <div>
                <div className="font-bold text-sm">{t.symbol}</div>
                <Address value={t.address} className="text-[10px]" />
              </div>
              <div className="text-right font-bold text-mint">{t.balance}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="pixel-card p-5">
        <h2 className="text-sm font-bold tracking-widest text-gold mb-3">▸ SEAT NFTs</h2>
        {MOCK_PORTFOLIO.seats.length === 0 ? (
          <p className="text-muted text-sm">No seats yet.</p>
        ) : (
          <div className="space-y-3">
            {MOCK_PORTFOLIO.seats.map((s) => (
              <Link
                key={s.tokenId}
                href={`/portfolio/seats/${s.tokenId}`}
                className="block bg-navy-800 pixel-border p-4 hover:border-gold transition-colors"
              >
                <div className="flex justify-between">
                  <div>
                    <div className="font-bold text-sm">{s.bookName}</div>
                    <div className="text-muted text-xs">Token ID #{s.tokenId}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-gold font-bold">{s.liquidity} ETH</div>
                    <div className="text-mint text-[10px] uppercase">{s.status}</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      <p className="text-[10px] text-muted">
        DEMO balances. Live data requires wallet + RPC + indexer.
      </p>
    </div>
  );
}
