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


export const PROTOCOL = {
  bookFactory: process.env.NEXT_PUBLIC_BOOK_FACTORY || "",
  seatVault: process.env.NEXT_PUBLIC_SEAT_VAULT || "",
  seatNft: process.env.NEXT_PUBLIC_SEAT_NFT || "",
  uniswapV3Factory: process.env.NEXT_PUBLIC_UNISWAP_V3_FACTORY || "",
  swapRouter: process.env.NEXT_PUBLIC_SWAP_ROUTER || "",
  protocolTreasury: process.env.NEXT_PUBLIC_PROTOCOL_TREASURY || "",
  positionManager: process.env.NEXT_PUBLIC_POSITION_MANAGER || "",
} as const;

export const PROTOCOL_READY = Object.values(PROTOCOL).every(Boolean);

export const PROTOCOL_STATUS = PROTOCOL_READY
  ? "configured"
  : "not_configured";
