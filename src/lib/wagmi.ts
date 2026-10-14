"use client";

import { http, createConfig } from "wagmi";
import { robinhoodChain } from "@/lib/chains";
import { injectedConnector } from "@/lib/injectedConnector";

/**
 * Wagmi config — non-custodial. User wallet signs; we never hold keys.
 *
 * Uses a local injected connector only — does NOT import `wagmi/connectors`
 * or `@wagmi/connectors` (those barrels pull Coinbase baseAccount → @x402
 * and break the Vercel webpack build).
 */
export const wagmiConfig = createConfig({
  chains: [robinhoodChain],
  connectors: [injectedConnector({ shimDisconnect: true })],
  transports: {
    [robinhoodChain.id]: http(
      process.env.NEXT_PUBLIC_RPC_URL ||
        "https://rpc.mainnet.chain.robinhood.com"
    ),
  },
  ssr: true,
  multiInjectedProviderDiscovery: true,
});

declare module "wagmi" {
  interface Register {
    config: typeof wagmiConfig;
  }
}
