/**
 * Production config surface.
 * Placeholder mode is intentionally read-only until protocol contracts + indexer are wired.
 */
export const DATA_MODE =
  (process.env.NEXT_PUBLIC_DATA_MODE as "live" | "placeholder") || "placeholder";

export const IS_PLACEHOLDER = DATA_MODE !== "live";

export const SITE = {
  name: "Pool Pilot",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://poolpilot.xyz",
  chainId: 4663,
  chainName: "Robinhood Chain",
  explorer:
    process.env.NEXT_PUBLIC_EXPLORER || "https://robinhoodchain.blockscout.com",
  github: "https://github.com/spanda6z/pool-pilot-demo",
  x: "https://x.com/cheferikosol",
  mcflamingo: "https://mcflamingo.com",
  verifyWallet: "https://mcflamingo.com/pool-pilot",
} as const;
