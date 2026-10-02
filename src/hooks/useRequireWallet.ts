"use client";

import { useAccount, useChainId } from "wagmi";
import { TARGET_CHAIN_ID } from "@/lib/chains";

export function useRequireWallet() {
  const { address, isConnected, isConnecting } = useAccount();
  const chainId = useChainId();
  const wrongNetwork = isConnected && chainId !== TARGET_CHAIN_ID;

  return {
    address,
    isConnected,
    isConnecting,
    wrongNetwork,
    chainId,
    ready: isConnected && !wrongNetwork,
  };
}
