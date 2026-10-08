import Link from "next/link";

const ITEMS = [
  { label: "You sign every tx" },
  { label: "No custody" },
  { label: "Robinhood Chain" },
  { label: "Uniswap v3 seats" },
] as const;

export function TrustStrip() {
  return (
    <div
      className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[11px] text-muted"
      role="list"
      aria-label="Trust points"
    >
      {ITEMS.map((item) => (
        <span key={item.label} className="flex items-center gap-1.5" role="listitem">
          <span
            className="w-1.5 h-1.5 rounded-full bg-[var(--lime)] shrink-0"
            aria-hidden
          />
          {item.label}
        </span>
      ))}
      <Link
        href="/security"
        className="text-lime hover:underline ml-auto min-h-[32px] flex items-center"
      >
        Security
      </Link>
    </div>
  );
}
