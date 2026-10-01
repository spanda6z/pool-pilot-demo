import type { BookStatus } from "@/lib/mock-data";

const map: Record<BookStatus, { label: string; className: string }> = {
  live: { label: "LIVE", className: "text-mint bg-[rgba(52,211,153,0.12)] border-[rgba(52,211,153,0.35)]" },
  seats_available: { label: "SEATS OPEN", className: "text-gold bg-[rgba(251,191,36,0.12)] border-[rgba(251,191,36,0.35)]" },
  full: { label: "FULL", className: "text-secondary bg-[rgba(148,163,184,0.1)] border-[rgba(148,163,184,0.3)]" },
  paused: { label: "PAUSED", className: "text-coral bg-[rgba(248,113,113,0.12)] border-[rgba(248,113,113,0.35)]" },
  demo: { label: "DEMO", className: "text-coral bg-[rgba(248,113,113,0.12)] border-[rgba(248,113,113,0.35)]" },
};

export function StatusBadge({ status }: { status: BookStatus }) {
  const s = map[status] ?? map.demo;
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 text-[10px] font-bold tracking-wider border rounded ${s.className}`}
    >
      {s.label}
    </span>
  );
}
