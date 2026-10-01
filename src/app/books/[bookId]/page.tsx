import Link from "next/link";
import { notFound } from "next/navigation";
import { DemoBadge } from "@/components/DemoBadge";
import { StatusBadge } from "@/components/StatusBadge";
import { Address } from "@/components/Address";
import { MOCK_BOOKS, explorerAddress } from "@/lib/mock-data";

export default async function BookDetailPage({
  params,
}: {
  params: Promise<{ bookId: string }>;
}) {
  const { bookId } = await params;
  const book = MOCK_BOOKS.find((b) => b.id === bookId);
  if (!book) notFound();

  return (
    <div className="space-y-6 pb-8">
      <div className="flex flex-wrap items-center gap-2 sm:gap-3">
        <Link href="/books" className="text-muted text-xs hover:text-cyan transition-colors">
          ← Books
        </Link>
        <StatusBadge status={book.status} />
        <DemoBadge />
      </div>

      <section className="pixel-card p-5 sm:p-6">
        <h1 className="text-xl sm:text-2xl font-black tracking-tight">{book.name}</h1>
        <p className="text-muted text-sm mt-0.5">${book.symbol}</p>
        <p className="text-secondary text-sm mt-3 max-w-2xl leading-relaxed">{book.description}</p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
          {[
            { label: "Seats", value: `${book.seatsTaken}/${book.seatsTotal}`, color: "text-gold" },
            { label: "Liquidity", value: `${book.liquidityEth} ETH`, color: "text-cyan" },
            { label: "Seat price", value: `${book.seatPriceEth} ETH`, color: "text-primary" },
            { label: "24h volume", value: `${book.volume24h} ETH`, color: "text-eth" },
          ].map((s) => (
            <div key={s.label} className="bg-navy-800/60 p-3 pixel-border">
              <div className="text-[10px] text-muted uppercase tracking-wide">{s.label}</div>
              <div className={`font-bold text-base sm:text-lg mt-0.5 ${s.color}`}>{s.value}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="pixel-card p-5 sm:p-6">
        <h2 className="text-xs font-bold tracking-[0.15em] text-cyan mb-3 uppercase">
          Pool liquidity range
        </h2>
        <div className="h-10 bg-navy-800/80 relative rounded-lg overflow-hidden border border-[rgba(30,58,95,0.6)]">
          <div
            className="absolute inset-y-0 bg-gradient-to-r from-cyan/30 to-gold/30"
            style={{ left: "15%", right: "15%" }}
          />
          <div className="absolute inset-0 flex items-center justify-center text-[10px] text-muted font-mono">
            tick {book.tickLower} → {book.tickUpper}
          </div>
        </div>
        <p className="text-[10px] text-muted mt-2">
          Mock visual. Live tick + liquidity from RPC when contracts are live.
        </p>
      </section>

      <section className="pixel-card p-5 sm:p-6">
        <h2 className="text-xs font-bold tracking-[0.15em] text-cyan mb-3 uppercase">Contracts</h2>
        <div className="space-y-2.5 text-xs">
          {[
            ["Token", book.tokenAddress],
            ["Pool", book.poolAddress],
            ["Creator", book.creator],
          ].map(([label, addr]) => (
            <div key={label} className="flex flex-col sm:flex-row sm:items-center gap-1 py-1.5 border-b border-[rgba(30,58,95,0.4)] last:border-0">
              <span className="text-secondary w-24 shrink-0">{label}</span>
              <Address value={addr as string} />
            </div>
          ))}
        </div>
      </section>

      <section className="pixel-card p-5 sm:p-6 border-coral/30">
        <h2 className="text-xs font-bold tracking-[0.15em] text-coral mb-2 uppercase">Risks</h2>
        <ul className="text-xs text-secondary space-y-1.5 list-disc list-inside leading-relaxed">
          <li>Impermanent loss on concentrated liquidity positions.</li>
          <li>Smart contract risk — unaudited demo contracts.</li>
          <li>Seat NFT ownership does not guarantee profit.</li>
          <li>All transactions are irreversible once confirmed.</li>
        </ul>
      </section>

      <div className="flex flex-col sm:flex-row flex-wrap gap-3">
        <Link href={`/sit/${book.id}`} className="pixel-btn btn-gold px-5 py-3 text-sm w-full sm:w-auto">
          Take a Seat
        </Link>
        <Link href="/swap" className="pixel-btn btn-eth px-5 py-3 text-sm w-full sm:w-auto">
          Swap
        </Link>
        <Link href={`/verify/${book.id}`} className="pixel-btn btn-outline px-5 py-3 text-sm w-full sm:w-auto">
          Verify
        </Link>
        <a
          href={explorerAddress(book.poolAddress)}
          target="_blank"
          rel="noopener noreferrer"
          className="pixel-btn btn-outline px-5 py-3 text-sm w-full sm:w-auto"
        >
          Explorer
        </a>
      </div>
    </div>
  );
}
