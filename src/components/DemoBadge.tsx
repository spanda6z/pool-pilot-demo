import { IS_PLACEHOLDER } from "@/lib/config";

export function DemoBadge({ className = "" }: { className?: string }) {
  if (!IS_PLACEHOLDER) return null;
  return (
    <span
      className={`pill text-[10px] border border-[var(--border)] text-muted bg-[var(--control)] ${className}`}
      title="Placeholder data until live indexer is connected"
    >
      Preview
    </span>
  );
}
