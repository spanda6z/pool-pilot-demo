import Link from "next/link";
import { DemoBadge } from "@/components/DemoBadge";
import { Address } from "@/components/Address";
import { CONTRACTS, MOCK_BOOKS, CHAIN } from "@/lib/mock-data";

export default function VerifyPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-black">
          <span className="text-mint">▸</span> VERIFY
        </h1>
        <DemoBadge />
      </div>

      <p className="text-secondary text-sm max-w-2xl">
        Full contract registry. Every address is copyable and linked to the explorer.
        DEMO addresses — confirm real deployments before relying on them.
      </p>

      <section className="pixel-card p-5">
        <h2 className="text-sm font-bold tracking-widest text-cyan mb-4">
          ▸ PROTOCOL CONTRACTS
        </h2>
        <div className="space-y-3 text-xs">
          {Object.entries(CONTRACTS).map(([name, addr]) => (
            <div
              key={name}
              className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 py-2 border-b border-[var(--pixel-border)]"
            >
              <span className="text-secondary w-40 capitalize shrink-0">
                {name.replace(/([A-Z])/g, " $1")}
              </span>
              <Address value={addr} full />
            </div>
          ))}
        </div>
        <p className="text-[10px] text-muted mt-4">
          Chain {CHAIN.id} · Explorer: {CHAIN.explorer} · Source: static registry · Last refresh: demo
        </p>
      </section>

      <section className="pixel-card p-5">
        <h2 className="text-sm font-bold tracking-widest text-gold mb-4">
          ▸ BOOK PROOFS
        </h2>
        <div className="space-y-2">
          {MOCK_BOOKS.map((b) => (
            <Link
              key={b.id}
              href={`/verify/${b.id}`}
              className="block py-2 text-sm text-cyan hover:underline"
            >
              {b.name} (${b.symbol}) →
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
