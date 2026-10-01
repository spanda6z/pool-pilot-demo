import Link from "next/link";
import { MOCK_BOOKS } from "@/lib/mock-data";

export default function ProjectsPage() {
  return (
    <div className="space-y-5 pb-4">
      <div className="flex items-center justify-between gap-3">
        <h1 className="font-display text-xl font-bold">Projects</h1>
        <Link href="/launch" className="btn btn-primary text-sm min-h-[40px] px-4">
          Start a book
        </Link>
      </div>

      <p className="text-secondary text-sm">
        Books you opened. Demo shows public books as a stand-in.
      </p>

      <div className="space-y-3">
        {MOCK_BOOKS.map((b) => {
          const seats = Math.min(b.seatsTaken, 18);
          const badge =
            seats >= 18 ? "pill-muted" : seats > 0 ? "pill-fill" : "pill-live";
          const label = seats >= 18 ? "Full" : seats > 0 ? "Filling" : "Live";
          return (
            <div key={b.id} className="card p-4 space-y-3">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-3 min-w-0">
                  <span className="w-10 h-10 rounded-full bg-[var(--control)] border border-[var(--border)] flex items-center justify-center font-display text-xs font-bold shrink-0">
                    {b.symbol.slice(0, 2)}
                  </span>
                  <div className="min-w-0">
                    <div className="font-display font-bold text-sm">${b.symbol}</div>
                    <div className="text-xs text-muted">{seats}/18 seats · Creator</div>
                  </div>
                </div>
                <span className={`pill ${badge}`}>{label}</span>
              </div>
              <div className="flex gap-2">
                <Link href={`/books/${b.id}`} className="btn btn-secondary flex-1 text-sm min-h-[40px]">
                  Open book
                </Link>
                <button type="button" className="btn btn-ghost flex-1 text-sm min-h-[40px]" disabled>
                  Invite
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
