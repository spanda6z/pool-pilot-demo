import Link from "next/link";
import { DemoBadge } from "@/components/DemoBadge";
import { MOCK_PORTFOLIO } from "@/lib/mock-data";

export default async function SeatDetailPage({
  params,
}: {
  params: Promise<{ tokenId: string }>;
}) {
  const { tokenId } = await params;
  const seat = MOCK_PORTFOLIO.seats.find((s) => s.tokenId === tokenId) ?? MOCK_PORTFOLIO.seats[0];

  return (
    <div className="space-y-6 max-w-lg mx-auto">
      <div className="flex items-center gap-3">
        <Link href="/portfolio" className="text-muted text-xs hover:text-cyan">
          ← Portfolio
        </Link>
        <DemoBadge />
      </div>

      <section className="pixel-card p-6">
        <h1 className="text-xl font-black mb-1">Seat #{seat.tokenId}</h1>
        <p className="text-muted text-sm">{seat.bookName}</p>

        <div className="grid grid-cols-2 gap-3 mt-5 text-sm">
          <div className="bg-navy-800 p-3 pixel-border">
            <div className="text-[10px] text-muted">Liquidity</div>
            <div className="text-gold font-bold">{seat.liquidity} ETH</div>
          </div>
          <div className="bg-navy-800 p-3 pixel-border">
            <div className="text-[10px] text-muted">Status</div>
            <div className="text-mint font-bold uppercase">{seat.status}</div>
          </div>
          <div className="bg-navy-800 p-3 pixel-border col-span-2">
            <div className="text-[10px] text-muted">Tick range</div>
            <div className="text-cyan font-mono text-xs">
              {seat.tickLower} → {seat.tickUpper}
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          <button type="button" className="pixel-btn btn-outline px-4 py-2 text-xs" disabled>
            Collect Fees (demo)
          </button>
          <button type="button" className="pixel-btn btn-coral px-4 py-2 text-xs" disabled>
            Close Position (demo)
          </button>
        </div>
      </section>
    </div>
  );
}
