import type { Abi } from "viem";

/**
 * ABI generated from the initial Pool Pilot Solidity implementation in /contracts.
 * Keep this synchronized with deployed and verified bytecode before DATA_MODE=live.
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
    outputs: [{
      name: "info",
      type: "tuple",
      components: [
        { name: "book", type: "address" },
        { name: "creator", type: "address" },
        { name: "token", type: "address" },
        { name: "seatVault", type: "address" },
        { name: "seatNft", type: "address" },
        { name: "seatsTotal", type: "uint16" },
        { name: "seatsTaken", type: "uint16" },
      ],
    }],
  },
  {
    type: "function",
    name: "createBook",
    stateMutability: "nonpayable",
    inputs: [
      { name: "name", type: "string" },
      { name: "symbol", type: "string" },
      { name: "minimumBid", type: "uint256" },
      { name: "seatCount", type: "uint16" },
      { name: "referrer", type: "address" },
    ],
    outputs: [{ name: "bookAddress", type: "address" }],
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
    name: "minimumBid",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "uint256" }],
  },
  {
    type: "function",
    name: "seatCount",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "uint16" }],
  },
  {
    type: "function",
    name: "seatsTaken",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "uint16" }],
  },
  {
    type: "function",
    name: "buySeat",
    stateMutability: "payable",
    inputs: [],
    outputs: [{ name: "tokenId", type: "uint256" }],
  },
  {
    type: "function",
    name: "finalize",
    stateMutability: "nonpayable",
    inputs: [],
    outputs: [],
  },
] as const satisfies Abi;
