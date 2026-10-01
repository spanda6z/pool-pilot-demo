import type { BookStatus } from "@/lib/mock-data";

const map: Record<BookStatus, { label: string; className: string }> = {
  live: { label: "LIVE", className: "text-mint border-mint" },
  seats_available: { label: "SEATS OPEN", className: "text-gold border-gold" },
  full: { label: "FULL", className: "text-secondary border-secondary" },
  paused: { label: "PAUSED", className: "text-coral border-coral" },
  demo: { label: "DEMO", className: "text-coral border-coral" },
};

export function StatusBadge({ status }: { status: BookStatus }) {
  const s = map[status] ?? map.demo;
  return (
    <span
      className={`inline-block px-2 py-0.5 text-[10px] font-bold tracking-wider border ${s.className}`}
    >
      {s.label}
    </span>
  );
}
