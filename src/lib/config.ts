/**
 * Production config surface.
 * Placeholder mode stays read-only until Pool Pilot contracts + indexer are wired.
 */
import { ROBINHOOD_UNISWAP_V3 } from "@/lib/uniswap-v3";

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
  uniswapV3Factory:
    process.env.NEXT_PUBLIC_UNISWAP_V3_FACTORY || ROBINHOOD_UNISWAP_V3.factory,
  swapRouter:
    process.env.NEXT_PUBLIC_SWAP_ROUTER || ROBINHOOD_UNISWAP_V3.swapRouter02,
  protocolTreasury: process.env.NEXT_PUBLIC_PROTOCOL_TREASURY || "",
  positionManager:
    process.env.NEXT_PUBLIC_POSITION_MANAGER ||
    ROBINHOOD_UNISWAP_V3.positionManager,
  quoterV2: ROBINHOOD_UNISWAP_V3.quoterV2,
  universalRouter: ROBINHOOD_UNISWAP_V3.universalRouter,
  permit2: ROBINHOOD_UNISWAP_V3.permit2,
} as const;

export const POOL_PILOT_CONTRACTS_READY =
  Boolean(PROTOCOL.bookFactory) &&
  Boolean(PROTOCOL.seatVault) &&
  Boolean(PROTOCOL.seatNft) &&
  Boolean(PROTOCOL.protocolTreasury);

export const PROTOCOL_READY =
  POOL_PILOT_CONTRACTS_READY &&
  Boolean(PROTOCOL.uniswapV3Factory) &&
  Boolean(PROTOCOL.swapRouter) &&
  Boolean(PROTOCOL.positionManager);

export const PROTOCOL_STATUS = PROTOCOL_READY
  ? "configured"
  : "pool_pilot_contracts_not_configured";
