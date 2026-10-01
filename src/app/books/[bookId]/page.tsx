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
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-3">
        <Link href="/books" className="text-muted text-xs hover:text-cyan">
          ← Books
        </Link>
        <StatusBadge status={book.status} />
        <DemoBadge />
      </div>

      <section className="pixel-card p-6">
        <h1 className="text-2xl font-black">{book.name}</h1>
        <p className="text-muted text-sm">${book.symbol}</p>
        <p className="text-secondary text-sm mt-3 max-w-2xl">{book.description}</p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
          <div className="bg-navy-800 p-3 pixel-border">
            <div className="text-[10px] text-muted">Seats</div>
            <div className="text-gold font-bold text-lg">
              {book.seatsTaken}/{book.seatsTotal}
            </div>
          </div>
          <div className="bg-navy-800 p-3 pixel-border">
            <div className="text-[10px] text-muted">Liquidity</div>
            <div className="text-cyan font-bold text-lg">{book.liquidityEth} ETH</div>
          </div>
          <div className="bg-navy-800 p-3 pixel-border">
            <div className="text-[10px] text-muted">Seat price</div>
            <div className="text-primary font-bold text-lg">{book.seatPriceEth} ETH</div>
          </div>
          <div className="bg-navy-800 p-3 pixel-border">
            <div className="text-[10px] text-muted">24h volume</div>
            <div className="text-eth font-bold text-lg">{book.volume24h} ETH</div>
          </div>
        </div>
      </section>

      <section className="pixel-card p-6">
        <h2 className="text-sm font-bold tracking-widest text-cyan mb-3">
          ▸ POOL LIQUIDITY RANGE
        </h2>
        <div className="h-8 bg-navy-800 relative pixel-border overflow-hidden">
          <div
            className="absolute inset-y-0 bg-gradient-to-r from-cyan/40 to-gold/40"
            style={{ left: "15%", right: "15%" }}
          />
          <div className="absolute inset-0 flex items-center justify-center text-[10px] text-muted">
            tick {book.tickLower} → {book.tickUpper}
          </div>
        </div>
        <p className="text-[10px] text-muted mt-2">
          Mock visual. Live tick + liquidity from RPC when contracts are live.
        </p>
      </section>

      <section className="pixel-card p-6">
        <h2 className="text-sm font-bold tracking-widest text-cyan mb-3">
          ▸ CONTRACTS
        </h2>
        <div className="space-y-2 text-xs">
          <div className="flex flex-col sm:flex-row gap-1">
            <span className="text-secondary w-28">Token</span>
            <Address value={book.tokenAddress} />
          </div>
          <div className="flex flex-col sm:flex-row gap-1">
            <span className="text-secondary w-28">Pool</span>
            <Address value={book.poolAddress} />
          </div>
          <div className="flex flex-col sm:flex-row gap-1">
            <span className="text-secondary w-28">Creator</span>
            <Address value={book.creator} />
          </div>
        </div>
      </section>

      <section className="pixel-card p-6 border-coral/40">
        <h2 className="text-sm font-bold tracking-widest text-coral mb-2">
          ▸ RISKS
        </h2>
        <ul className="text-xs text-secondary space-y-1 list-disc list-inside">
          <li>Impermanent loss on concentrated liquidity positions.</li>
          <li>Smart contract risk — unaudited demo contracts.</li>
          <li>Seat NFT ownership does not guarantee profit.</li>
          <li>All transactions are irreversible once confirmed.</li>
        </ul>
      </section>

      <div className="flex flex-wrap gap-3">
        <Link href={`/sit/${book.id}`} className="pixel-btn btn-gold px-5 py-2.5 text-sm">
          Take a Seat
        </Link>
        <Link href="/swap" className="pixel-btn btn-eth px-5 py-2.5 text-sm">
          Swap
        </Link>
        <Link href={`/verify/${book.id}`} className="pixel-btn btn-outline px-5 py-2.5 text-sm">
          Verify
        </Link>
        <a
          href={explorerAddress(book.poolAddress)}
          target="_blank"
          rel="noopener noreferrer"
          className="pixel-btn btn-outline px-5 py-2.5 text-sm"
        >
          Explorer
        </a>
      </div>
    </div>
  );
}
