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
      className="border-b border-[var(--warn)]/40 bg-[var(--warn)]/10 px-4 py-2 text-center text-xs text-warn"
      role="status"
    >
      Connected to the wrong network.{" "}
      <button
        type="button"
        className="underline font-medium min-h-[32px] px-1"
        disabled={isPending}
        onClick={() => switchChain({ chainId: TARGET_CHAIN_ID })}
      >
        {isPending ? "Switching…" : "Switch to Robinhood Chain"}
      </button>
    </div>
  );
}
