export function FoundingBadge({ className = "" }: { className?: string }) {
  return (
    <span
      className={`pill pill-fill ${className}`}
      title="Early Pool Pilot launch"
    >
      Founding team
    </span>
  );
}
