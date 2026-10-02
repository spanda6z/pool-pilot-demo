import Link from "next/link";
import { MOCK_BOOKS } from "@/lib/mock-data";

export default function LeaderboardPage() {
  const bySeats = [...MOCK_BOOKS].sort(
    (a, b) => b.seatsTaken / b.seatsTotal - a.seatsTaken / a.seatsTotal
  );
  const byVolume = [...MOCK_BOOKS].sort(
    (a, b) => parseFloat(b.volume24h) - parseFloat(a.volume24h)
  );

  return (
    <div className="space-y-6 pb-4 max-w-lg">
      <div>
        <h1 className="font-display text-xl font-bold mb-1">Leaderboard</h1>
        <p className="text-secondary text-sm">
          Fastest to fill seats and top volume. Rankings update from the book
          index when live feeds are connected.
        </p>
      </div>

      <section>
        <h2 className="font-display text-sm font-bold text-muted uppercase tracking-wide mb-3">
          Seats filled
        </h2>
        <div className="card divide-y divide-[var(--divider)] overflow-hidden">
          {bySeats.map((b, i) => {
            const seats = Math.min(b.seatsTaken, 18);
            return (
              <Link
                key={b.id}
                href={`/books/${b.id}`}
                className="flex items-center gap-3 p-3.5 hover:bg-[var(--control)] min-h-[56px]"
              >
                <span className="font-display text-sm text-muted w-6 tabular-nums">
                  {i + 1}
                </span>
                <span className="w-9 h-9 rounded-full bg-[var(--control)] border border-[var(--border)] flex items-center justify-center font-display text-xs font-bold shrink-0">
                  {b.symbol.slice(0, 2)}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="font-display font-bold text-sm">${b.symbol}</div>
                  <div className="text-xs text-muted">{b.name}</div>
                </div>
                <div className="font-display text-sm font-bold text-lime tabular-nums">
                  {seats}/18
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <section>
        <h2 className="font-display text-sm font-bold text-muted uppercase tracking-wide mb-3">
          24h volume
        </h2>
        <div className="card divide-y divide-[var(--divider)] overflow-hidden">
          {byVolume.map((b, i) => (
            <Link
              key={b.id}
              href={`/books/${b.id}`}
              className="flex items-center gap-3 p-3.5 hover:bg-[var(--control)] min-h-[56px]"
            >
              <span className="font-display text-sm text-muted w-6 tabular-nums">
                {i + 1}
              </span>
              <span className="w-9 h-9 rounded-full bg-[var(--control)] border border-[var(--border)] flex items-center justify-center font-display text-xs font-bold shrink-0">
                {b.symbol.slice(0, 2)}
              </span>
              <div className="flex-1 min-w-0">
                <div className="font-display font-bold text-sm">${b.symbol}</div>
              </div>
              <div className="font-display text-sm font-bold tabular-nums">
                {b.volume24h} ETH
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
