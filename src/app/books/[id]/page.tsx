import Link from "next/link";
import { notFound } from "next/navigation";
import { MOCK_BOOKS } from "@/lib/mock-data";
import { SeatRing } from "@/components/SeatRing";

export default async function BookPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const book = MOCK_BOOKS.find((item) => item.id === id);

  if (!book) notFound();

  const isDemo = book.status === "demo" || !book.poolAddress;

  return (
    <div className="space-y-5 pb-4">
      <Link href="/books" className="text-muted text-sm hover:text-secondary min-h-[44px] inline-flex items-center">← Markets</Link>

      <section className="card p-5 space-y-4">
        <div className="flex items-start gap-3">
          <div className="w-12 h-12 rounded-full bg-[var(--lime)] text-[var(--lime-text)] flex items-center justify-center font-display font-bold shrink-0">{book.symbol.slice(0, 2)}</div>
          <div className="min-w-0 flex-1">
            <div className="flex gap-2 flex-wrap items-center">
              <span className="pill pill-fill text-[10px]">{isDemo ? "Preview" : book.status}</span>
              <span className="text-[10px] text-muted uppercase tracking-wide">{book.symbol}</span>
            </div>
            <h1 className="font-display text-2xl font-bold mt-1">{book.name}</h1>
            <p className="text-secondary text-sm mt-1">{book.description}</p>
          </div>
        </div>

        <div className="rounded-[14px] bg-[var(--control)] p-4">
          <SeatRing taken={book.seatsTaken} total={book.seatsTotal} />
          <div className="text-center mt-2">
            <div className="font-display font-bold">{book.seatsTaken}/{book.seatsTotal} seats filled</div>
            <div className="text-xs text-muted mt-1">{book.seatPriceEth} ETH demo seat price</div>
          </div>
        </div>

        {isDemo && (
          <div className="rounded-[14px] border border-[var(--warn)]/40 bg-[var(--warn)]/5 p-3 text-xs text-warn leading-relaxed">
            This book is a product preview. Pool Pilot has not verified a production pool, seat NFT, or launch contract for this entry.
          </div>
        )}

        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="control p-3"><span className="text-muted block text-[10px]">Liquidity</span>{isDemo ? "Demo" : book.liquidityEth + " ETH"}</div>
          <div className="control p-3"><span className="text-muted block text-[10px]">24h volume</span>{isDemo ? "Demo" : book.volume24h + " ETH"}</div>
        </div>
      </section>

      <div className="flex gap-2">
        <Link href="/portfolio" className="btn btn-secondary flex-1">Seats</Link>
        <Link href="/launch" className="btn btn-primary flex-1">Launch a coin</Link>
      </div>

      <p className="text-[10px] text-muted leading-relaxed">
        Verify contract addresses and pool state on-chain before trading. Demo books do not represent live ownership or liquidity.
      </p>
    </div>
  );
}
