export function DemoBadge({ className = "" }: { className?: string }) {
  return (
    <span className={`demo-badge ${className}`} title="This is mock / demo data — not live on-chain">
      DEMO
    </span>
  );
}
