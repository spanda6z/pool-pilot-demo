/**
 * Contract addresses + ABIs — plug in production artifacts here.
 * Until then, writeContract calls must not be enabled for mainnet funds.
 *
 * Non-custodial: only the connected wallet signs; no private keys here.
 */

export const CONTRACT_ADDRESSES = {
  bookFactory:
    (process.env.NEXT_PUBLIC_BOOK_FACTORY as `0x${string}`) ||
    undefined,
  seatNft:
    (process.env.NEXT_PUBLIC_SEAT_NFT as `0x${string}`) || undefined,
  swapRouter:
    (process.env.NEXT_PUBLIC_SWAP_ROUTER as `0x${string}`) || undefined,
  mcflToken:
    (process.env.NEXT_PUBLIC_MCFL_TOKEN as `0x${string}`) ||
    "0x21A91215fbFc4fc002B07cc87698A6fC01Aed523",
} as const;

/** Minimal placeholder ABI fragments — replace with verified ABIs */
export const bookFactoryAbi = [
  {
    type: "function",
    name: "createBook",
    stateMutability: "payable",
    inputs: [
      { name: "symbol", type: "string" },
      { name: "minBidWei", type: "uint256" },
    ],
    outputs: [{ name: "bookId", type: "bytes32" }],
  },
] as const;

export function contractsReady() {
  return Boolean(CONTRACT_ADDRESSES.bookFactory && CONTRACT_ADDRESSES.swapRouter);
}
