import type { Abi } from "viem";

/**
 * Canonical interface expected from the Pool Pilot BookFactory.
 *
 * These are intentionally interfaces, not deployed-contract claims.
 * The production factory must implement these selectors before DATA_MODE=live.
 */
export const POOL_PILOT_BOOK_FACTORY_ABI = [
  {
    type: "function",
    name: "bookCount",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "uint256" }],
  },
  {
    type: "function",
    name: "getBook",
    stateMutability: "view",
    inputs: [{ name: "bookId", type: "uint256" }],
    outputs: [
      { name: "book", type: "address" },
      { name: "creator", type: "address" },
      { name: "token", type: "address" },
      { name: "seatVault", type: "address" },
      { name: "seatNft", type: "address" },
      { name: "pool", type: "address" },
      { name: "seatsTotal", type: "uint16" },
      { name: "seatsTaken", type: "uint16" },
    ],
  },
  {
    type: "function",
    name: "createBook",
    stateMutability: "payable",
    inputs: [
      { name: "name", type: "string" },
      { name: "symbol", type: "string" },
      { name: "minimumBid", type: "uint256" },
      { name: "seatCount", type: "uint16" },
      { name: "referrer", type: "address" },
    ],
    outputs: [{ name: "book", type: "address" }],
  },
] as const satisfies Abi;

export const POOL_PILOT_BOOK_ABI = [
  {
    type: "function",
    name: "token",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "address" }],
  },
  {
    type: "function",
    name: "seatVault",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "address" }],
  },
  {
    type: "function",
    name: "seatNft",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "address" }],
  },
  {
    type: "function",
    name: "pool",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "address" }],
  },
] as const satisfies Abi;
