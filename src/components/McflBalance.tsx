"use client";

import { useAccount } from "wagmi";
import { useMcflBalance } from "@/hooks/useMcflBalance";
import { MCFL } from "@/lib/tokens";

export function McflBalance() {
  const { isConnected } = useAccount();
  const { formatted, isLoading, isError } = useMcflBalance();

  if (!isConnected) return null;

  return (
    <a
      href={MCFL.explorer}
      target="_blank"
      rel="noopener noreferrer"
      className="card p-4 flex items-center justify-between gap-3 hover:bg-[var(--control)] transition-colors min-h-[56px]"
    >
      <div>
        <div className="text-xs text-muted mb-0.5">Your {MCFL.symbol}</div>
        <div className="font-display text-lg font-bold tabular-nums">
          {isLoading && "…"}
          {isError && "—"}
          {!isLoading && !isError && formatted !== undefined
            ? Number(formatted).toLocaleString(undefined, {
                maximumFractionDigits: 4,
              })
            : null}
        </div>
      </div>
      <span className="text-[10px] text-lime">View on explorer</span>
    </a>
  );
}
