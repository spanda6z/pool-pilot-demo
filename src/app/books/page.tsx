import Link from "next/link";
import { DemoBadge } from "@/components/DemoBadge";
import { StatusBadge } from "@/components/StatusBadge";
import { MOCK_BOOKS } from "@/lib/mock-data";

export default function BooksPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-black tracking-tight">
          <span className="text-cyan">▸</span> BOOKS
        </h1>
        <DemoBadge />
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="search"
          placeholder="Search books…"
          className="flex-1 bg-navy-800 border-2 border-[var(--pixel-border)] px-3 py-2 text-sm text-primary placeholder:text-muted focus:outline-none focus:border-cyan"
        />
        <select className="bg-navy-800 border-2 border-[var(--pixel-border)] px-3 py-2 text-sm text-secondary">
          <option>All statuses</option>
          <option>Seats open</option>
          <option>Full</option>
          <option>Demo</option>
        </select>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {MOCK_BOOKS.map((book) => (
          <Link
            key={book.id}
            href={`/books/${book.id}`}
            className="pixel-card p-5 hover:border-cyan transition-colors block"
          >
            <div className="flex items-start justify-between mb-2">
              <div>
                <div className="font-bold text-sm">{book.name}</div>
                <div className="text-muted text-xs">${book.symbol}</div>
              </div>
              <StatusBadge status={book.status} />
            </div>
            <p className="text-secondary text-xs line-clamp-2 mb-3">{book.description}</p>
            <div className="grid grid-cols-2 gap-2 text-[10px]">
              <div>
                <span className="text-muted">Seats</span>
                <div className="text-gold font-bold">
                  {book.seatsTaken}/{book.seatsTotal}
                </div>
              </div>
              <div>
                <span className="text-muted">Liquidity</span>
                <div className="text-cyan font-bold">{book.liquidityEth} ETH</div>
              </div>
              <div>
                <span className="text-muted">Seat price</span>
                <div className="text-primary">{book.seatPriceEth} ETH</div>
              </div>
              <div>
                <span className="text-muted">24h vol</span>
                <div className="text-eth">{book.volume24h} ETH</div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <p className="text-[10px] text-muted">
        All books shown are <span className="text-coral">DEMO</span>. Live data requires confirmed contracts + indexer.
      </p>
    </div>
  );
}
