import type { BookStatus } from "@/lib/mock-data";

const map: Record<BookStatus, { label: string; className: string }> = {
  live: { label: "Live", className: "pill-live" },
  seats_available: { label: "Filling", className: "pill-fill" },
  full: { label: "Full", className: "pill-muted" },
  paused: { label: "Paused", className: "pill-muted" },
  demo: { label: "Live", className: "pill-live" },
};

export function StatusBadge({ status }: { status: BookStatus }) {
  const s = map[status] ?? map.live;
  return <span className={`pill ${s.className}`}>{s.label}</span>;
}
