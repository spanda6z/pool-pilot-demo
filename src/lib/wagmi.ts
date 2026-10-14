"use client";

import { http, createConfig } from "wagmi";
// Deep imports — NEVER use `wagmi/connectors` barrel (pulls baseAccount → Coinbase → @x402 and breaks Vercel).
import { injected } from "@wagmi/connectors/injected";
import { walletConnect } from "@wagmi/connectors/walletConnect";
import { robinhoodChain } from "@/lib/chains";

const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || "";

/**
 * Wagmi config — non-custodial. User wallet signs; we never hold keys.
 * Injected (MetaMask, Rabby, etc.) works without WalletConnect project id.
 * Coinbase / baseAccount intentionally not imported.
 */
export const wagmiConfig = createConfig({
  chains: [robinhoodChain],
  connectors: [
    injected({ shimDisconnect: true }),
    ...(projectId
      ? [
          walletConnect({
            projectId,
            metadata: {
              name: "Pool Pilot",
              description: "Non-custodial launch and seats on Robinhood Chain",
              url: process.env.NEXT_PUBLIC_SITE_URL || "https://poolpilot.xyz",
              icons: [],
            },
            showQrModal: true,
          }),
        ]
      : []),
  ],
  transports: {
    [robinhoodChain.id]: http(
      process.env.NEXT_PUBLIC_RPC_URL ||
        "https://rpc.mainnet.chain.robinhood.com"
    ),
  },
  ssr: true,
});

declare module "wagmi" {
  interface Register {
    config: typeof wagmiConfig;
  }
}
