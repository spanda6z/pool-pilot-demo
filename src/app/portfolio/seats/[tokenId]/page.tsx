import Link from "next/link";
import { SeatRing } from "@/components/SeatRing";
import { MOCK_PORTFOLIO } from "@/lib/mock-data";

export default async function SeatDetailPage({
  params,
}: {
  params: Promise<{ tokenId: string }>;
}) {
  const { tokenId } = await params;
  const seat =
    MOCK_PORTFOLIO.seats.find((s) => s.tokenId === tokenId) ??
    MOCK_PORTFOLIO.seats[0];

  if (!seat) {
    return (
      <div className="card p-8 text-center space-y-3">
        <p className="text-secondary text-sm">Seat not found.</p>
        <Link href="/portfolio" className="btn btn-secondary inline-flex">
          Back to seats
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto space-y-5 pb-4">
      <Link
        href="/portfolio"
        className="text-muted text-sm hover:text-secondary min-h-[44px] inline-flex items-center"
      >
        ← Seats
      </Link>

      <section className="card p-6 flex flex-col items-center text-center gap-4">
        <SeatRing taken={1} total={18} size={120} label={`Chair ${seat.tokenId}`} />
        <div>
          <h1 className="font-display text-xl font-bold">{seat.bookName}</h1>
          <p className="text-muted text-sm mt-1">Chair #{seat.tokenId}</p>
        </div>
        <div className="w-full text-sm text-left space-y-2">
          <div className="flex justify-between py-2 border-b border-[var(--divider)]">
            <span className="text-muted">Liquidity</span>
            <span className="font-display font-bold text-lime">
              {seat.liquidity} ETH
            </span>
          </div>
          <div className="flex justify-between py-2 border-b border-[var(--divider)]">
            <span className="text-muted">Status</span>
            <span className="text-up capitalize">{seat.status}</span>
          </div>
          <div className="flex justify-between py-2">
            <span className="text-muted">Tick range</span>
            <span className="font-mono text-xs text-secondary">
              {seat.tickLower} → {seat.tickUpper}
            </span>
          </div>
        </div>
        <Link
          href={`/books/${seat.bookId}`}
          className="btn btn-primary btn-full"
        >
          Open book
        </Link>
      </section>
    </div>
  );
}
