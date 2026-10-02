/**
 * On-chain tokens verified on Robinhood Chain (4663).
 * Source: Blockscout token page — do not invent decimals or symbols.
 */

export const MCFL = {
  address: "0x21A91215fbFc4fc002B07cc87698A6fC01Aed523" as const,
  name: "McFlamingo",
  symbol: "MCFL",
  decimals: 18,
  type: "ERC-20" as const,
  explorer:
    "https://robinhoodchain.blockscout.com/token/0x21A91215fbFc4fc002B07cc87698A6fC01Aed523",
} as const;

/** Minimal ERC-20 ABI for reads (balanceOf, decimals, symbol) */
export const erc20Abi = [
  {
    type: "function",
    name: "balanceOf",
    stateMutability: "view",
    inputs: [{ name: "account", type: "address" }],
    outputs: [{ name: "", type: "uint256" }],
  },
  {
    type: "function",
    name: "decimals",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "uint8" }],
  },
  {
    type: "function",
    name: "symbol",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "string" }],
  },
  {
    type: "function",
    name: "name",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "string" }],
  },
  {
    type: "function",
    name: "totalSupply",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "uint256" }],
  },
] as const;
