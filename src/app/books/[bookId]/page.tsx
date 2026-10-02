import Link from "next/link";
import { notFound } from "next/navigation";
import { SeatRing } from "@/components/SeatRing";
import { Address } from "@/components/Address";
import { MOCK_BOOKS, explorerAddress } from "@/lib/mock-data";
import { CoinShare } from "@/components/CoinShare";

export default async function CoinPage({
  params,
}: {
  params: Promise<{ bookId: string }>;
}) {
  const { bookId } = await params;
  const book = MOCK_BOOKS.find((b) => b.id === bookId);
  if (!book) notFound();

  const seats = Math.min(book.seatsTaken, 18);
  const change = book.status === "full" ? 12.4 : 3.1;

  return (
    <div className="space-y-5 pb-4">
      <div className="flex items-center gap-2 text-sm">
        <Link href="/books" className="text-muted hover:text-secondary min-h-[44px] flex items-center">
          ← Explore
        </Link>
      </div>

      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="font-display text-2xl font-bold">${book.symbol}</h1>
            <span className="pill pill-live">Live</span>
          </div>
          <p className="text-secondary text-sm mt-1">{book.name}</p>
        </div>
        <div className="text-right">
          <div className="font-display text-xl font-bold tabular-nums">{book.seatPriceEth}</div>
          <div className={`text-sm font-medium ${change >= 0 ? "text-up" : "text-down"}`}>
            {change >= 0 ? "+" : ""}
            {change.toFixed(1)}%
          </div>
        </div>
      </div>

      <section className="card p-4">
        <div className="flex gap-2 mb-3 overflow-x-auto">
          {["1m", "3m", "5m", "15m", "1d"].map((tf, i) => (
            <button
              key={tf}
              type="button"
              className={`pill min-h-[32px] px-2.5 text-[11px] ${
                i === 4 ? "bg-[var(--lime)] text-[var(--lime-text)] border-transparent" : "pill-muted"
              }`}
            >
              {tf}
            </button>
          ))}
        </div>
        <div
          className="h-36 rounded-[12px] bg-[var(--control)] border border-[var(--border)] flex items-center justify-center text-muted text-xs"
          role="img"
          aria-label="Price chart placeholder"
        >
          Chart
        </div>
      </section>

      <section className="card p-4 space-y-4">
        <div className="flex gap-2">
          <button type="button" className="btn btn-primary flex-1">Buy</button>
          <button type="button" className="btn btn-ghost flex-1">Sell</button>
        </div>
        <div className="flex gap-2">
          {["0.01", "0.05", "0.1"].map((a) => (
            <button key={a} type="button" className="btn btn-secondary flex-1 text-sm min-h-[40px]">
              {a} ETH
            </button>
          ))}
        </div>
        <div className="text-xs text-muted flex justify-between">
          <span>Est. tokens</span>
          <span className="font-display text-secondary tabular-nums">~1,420 ${book.symbol}</span>
        </div>
        <Link href="/swap" className="btn btn-primary btn-full">
          Open swap
        </Link>
      </section>

      <section className="card p-5 flex flex-col sm:flex-row items-center gap-4">
        <SeatRing taken={seats} total={18} size={110} />
        <div className="flex-1 w-full text-center sm:text-left space-y-2">
          <div className="font-display font-bold">Seats {seats}/18</div>
          <div className="text-sm text-secondary">
            Min bid <span className="text-lime font-display font-bold">{book.seatPriceEth} ETH</span>
          </div>
          <Link href={`/sit/${book.id}`} className="btn btn-primary btn-full sm:w-auto">
            Sit a chair
          </Link>
        </div>
      </section>

      <CoinShare symbol={book.symbol} seatsTaken={seats} bookId={book.id} />

      <details className="card overflow-hidden">
        <summary className="p-4 cursor-pointer text-sm font-medium text-secondary min-h-[44px] flex items-center list-none">
          Advanced tools
        </summary>
        <div className="px-4 pb-4 flex flex-wrap gap-2 border-t border-[var(--divider)] pt-3">
          {["Buy wall", "Sell wall", "Ladder", "Straddle", "Shepherd", "Directory", "Raise hand", "Mics"].map(
            (t) => (
              <span key={t} className="pill pill-muted">
                {t}
              </span>
            )
          )}
          <p className="w-full text-[11px] text-muted mt-2">
            Advanced desk tools attach here without changing how you sign.
          </p>
        </div>
      </details>

      <section className="card p-4 space-y-2 text-xs">
        <div className="flex justify-between gap-2">
          <span className="text-muted">Token</span>
          <Address value={book.tokenAddress} />
        </div>
        <div className="flex justify-between gap-2">
          <span className="text-muted">Pool</span>
          <Address value={book.poolAddress} />
        </div>
        <a
          href={explorerAddress(book.poolAddress)}
          target="_blank"
          rel="noopener noreferrer"
          className="text-lime text-xs inline-block mt-1"
        >
          View on explorer
        </a>
      </section>
    </div>
  );
}
