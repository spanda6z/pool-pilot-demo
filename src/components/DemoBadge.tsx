export function DemoBadge({ className = "" }: { className?: string }) {
  return (
    <span
      className={`demo-badge ${className}`}
      title="Mock / demo data — not live on-chain"
    >
      DEMO
    </span>
  );
}
