"use client";

import { useAccount, useReadContract } from "wagmi";
import { formatUnits } from "viem";
import { MCFL, erc20Abi } from "@/lib/tokens";

export function useMcflBalance() {
  const { address, isConnected } = useAccount();

  const { data, isLoading, isError, refetch } = useReadContract({
    address: MCFL.address,
    abi: erc20Abi,
    functionName: "balanceOf",
    args: address ? [address] : undefined,
    query: {
      enabled: Boolean(isConnected && address),
    },
  });

  const formatted =
    data !== undefined
      ? formatUnits(data as bigint, MCFL.decimals)
      : undefined;

  return {
    balance: data as bigint | undefined,
    formatted,
    isLoading,
    isError,
    refetch,
    token: MCFL,
  };
}
