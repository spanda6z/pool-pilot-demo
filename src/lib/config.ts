/**
 * Production config surface.
 * Set NEXT_PUBLIC_DATA_MODE=live when indexer + contracts are wired.
 * Until then, UI is production-styled with placeholder data — not fake volume claims.
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
  github: "https://github.com/MCFLAMINGO/pool-pilot",
  x: "https://x.com/cheferikosol",
  mcflamingo: "https://mcflamingo.com",
  verifyWallet: "https://mcflamingo.com/pool-pilot",
} as const;
