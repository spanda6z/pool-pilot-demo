import Link from "next/link";
import { SeatRing } from "@/components/SeatRing";

export default async function SeatDetailPage({
  params,
}: {
  params: Promise<{ tokenId: string }>;
}) {
  const { tokenId } = await params;

  return (
    <div className="max-w-md mx-auto space-y-5 pb-4">
      <Link href="/portfolio" className="text-muted text-sm hover:text-secondary min-h-[44px] inline-flex items-center">
        ← Seats
      </Link>

      <section className="card p-6 flex flex-col items-center text-center gap-4">
        <SeatRing taken={1} total={18} size={120} label={`Chair ${tokenId}`} />
        <div>
          <h1 className="font-display text-xl font-bold">Founding seat</h1>
          <p className="text-muted text-sm mt-1">Chair #{tokenId}</p>
        </div>

        <div className="w-full rounded-xl border border-[var(--divider)] p-4 text-left text-sm space-y-2">
          <p className="font-semibold">Seat details are not indexed yet.</p>
          <p className="text-muted">
            This page does not claim wallet ownership or invent book, liquidity,
            or tick data. Connect the production seat indexer before exposing
            live seat positions here.
          </p>
        </div>

        <Link href="/portfolio" className="btn btn-secondary btn-full">
          Back to portfolio
        </Link>
      </section>
    </div>
  );
}
