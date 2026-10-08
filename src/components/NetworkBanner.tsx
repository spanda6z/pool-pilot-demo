"use client";

import { useAccount, useChainId, useSwitchChain } from "wagmi";
import { TARGET_CHAIN_ID } from "@/lib/chains";

export function NetworkBanner() {
  const { isConnected } = useAccount();
  const chainId = useChainId();
  const { switchChain, isPending } = useSwitchChain();

  if (!isConnected || chainId === TARGET_CHAIN_ID) return null;

  return (
    <div
      className="border-b border-[var(--warn)]/40 bg-[var(--warn)]/10 px-4 py-2.5"
      role="status"
      aria-live="polite"
    >
      <span className="font-semibold">Wrong network</span><span className="hidden sm:inline"> · Robinhood Chain (4663) required</span>{" "}
      <button
        type="button"
        className="btn btn-ghost text-xs min-h-[34px] px-2.5 text-warn hover:bg-[var(--warn)]/10"
        disabled={isPending}
        onClick={() => switchChain({ chainId: TARGET_CHAIN_ID })}
      >
        {isPending ? "Switching…" : "Switch to Robinhood Chain"}
      </button>
    </div>
  );
}
