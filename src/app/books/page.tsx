import Link from "next/link";
import { DemoBadge } from "@/components/DemoBadge";
import { StatusBadge } from "@/components/StatusBadge";
import { MOCK_BOOKS } from "@/lib/mock-data";

export default function BooksPage() {
  return (
    <div className="space-y-6 pb-8">
      <div className="flex items-center justify-between gap-3">
        <h1 className="text-xl sm:text-2xl font-black tracking-tight">
          <span className="text-cyan">▸</span> Books
        </h1>
        <DemoBadge />
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="search"
          placeholder="Search books…"
          className="flex-1 bg-navy-800/80 border border-[rgba(30,58,95,0.8)] px-4 py-3 text-sm placeholder:text-muted focus:outline-none"
        />
        <select className="bg-navy-800/80 border border-[rgba(30,58,95,0.8)] px-4 py-3 text-sm text-secondary min-h-[44px]">
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
            className="pixel-card p-5 hover:border-cyan/40 transition-colors block group"
          >
            <div className="flex items-start justify-between gap-2 mb-2">
              <div className="min-w-0">
                <div className="font-bold text-sm group-hover:text-cyan transition-colors truncate">
                  {book.name}
                </div>
                <div className="text-muted text-xs">${book.symbol}</div>
              </div>
              <StatusBadge status={book.status} />
            </div>
            <p className="text-secondary text-xs line-clamp-2 mb-4 leading-relaxed">
              {book.description}
            </p>
            <div className="grid grid-cols-2 gap-3 text-[11px]">
              <div>
                <span className="text-muted block text-[10px] uppercase tracking-wide">Seats</span>
                <span className="text-gold font-bold">
                  {book.seatsTaken}/{book.seatsTotal}
                </span>
              </div>
              <div>
                <span className="text-muted block text-[10px] uppercase tracking-wide">Liquidity</span>
                <span className="text-cyan font-bold">{book.liquidityEth} ETH</span>
              </div>
              <div>
                <span className="text-muted block text-[10px] uppercase tracking-wide">Seat price</span>
                <span className="text-primary font-medium">{book.seatPriceEth} ETH</span>
              </div>
              <div>
                <span className="text-muted block text-[10px] uppercase tracking-wide">24h vol</span>
                <span className="text-eth font-medium">{book.volume24h} ETH</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <p className="text-[10px] text-muted leading-relaxed">
        All books shown are <span className="text-coral font-semibold">DEMO</span>. Live data requires confirmed contracts + indexer.
      </p>
    </div>
  );
}
