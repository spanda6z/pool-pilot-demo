import { explorerAddress, shortAddress } from "@/lib/mock-data";

export function Address({
  value,
  full,
  className = "",
}: {
  value: string;
  full?: boolean;
  className?: string;
}) {
  const display = full ? value : shortAddress(value);
  return (
    <a
      href={explorerAddress(value)}
      target="_blank"
      rel="noopener noreferrer"
      className={`font-mono text-xs text-lime hover:underline break-all ${className}`}
      title={value}
    >
      {display}
    </a>
  );
}
