/**
 * Contract addresses + ABIs matching contracts/*.sol
 * Non-custodial: only the connected wallet signs; no private keys here.
 */

export const CONTRACT_ADDRESSES = {
  bookFactory:
    (process.env.NEXT_PUBLIC_BOOK_FACTORY as `0x${string}`) || undefined,
  seatNft:
    (process.env.NEXT_PUBLIC_SEAT_NFT as `0x${string}`) || undefined,
  seatVault:
    (process.env.NEXT_PUBLIC_SEAT_VAULT as `0x${string}`) || undefined,
  swapRouter:
    (process.env.NEXT_PUBLIC_SWAP_ROUTER as `0x${string}`) ||
    ("0xcaf681a66d020601342297493863e78c959e5cb2" as `0x${string}`),
  uniswapV3Factory:
    (process.env.NEXT_PUBLIC_UNISWAP_V3_FACTORY as `0x${string}`) ||
    ("0x1f7d7550b1b028f7571e69a784071f0205fd2efa" as `0x${string}`),
  positionManager:
    (process.env.NEXT_PUBLIC_POSITION_MANAGER as `0x${string}`) ||
    ("0x73991a25c818bf1f1128deaab1492d45638de0d3" as `0x${string}`),
  protocolTreasury:
    (process.env.NEXT_PUBLIC_PROTOCOL_TREASURY as `0x${string}`) || undefined,
  mcflToken:
    (process.env.NEXT_PUBLIC_MCFL_TOKEN as `0x${string}`) ||
    ("0x21A91215fbFc4fc002B07cc87698A6fC01Aed523" as `0x${string}`),
} as const;

/** PoolPilotBookFactory.createBook */
export const bookFactoryAbi = [
  {
    type: "function",
    name: "createBook",
    stateMutability: "nonpayable",
    inputs: [
      { name: "name_", type: "string" },
      { name: "symbol_", type: "string" },
      { name: "minimumBid_", type: "uint256" },
      { name: "seatCount_", type: "uint16" },
      { name: "referrer_", type: "address" },
    ],
    outputs: [{ name: "bookAddress", type: "address" }],
  },
  {
    type: "function",
    name: "getBook",
    stateMutability: "view",
    inputs: [{ name: "bookId", type: "uint256" }],
    outputs: [
      {
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
      },
    ],
  },
  {
    type: "function",
    name: "bookCount",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "uint256" }],
  },
  {
    type: "event",
    name: "BookCreated",
    inputs: [
      { name: "bookId", type: "uint256", indexed: true },
      { name: "book", type: "address", indexed: true },
      { name: "creator", type: "address", indexed: true },
      { name: "token", type: "address", indexed: false },
      { name: "seatVault", type: "address", indexed: false },
      { name: "seatNft", type: "address", indexed: false },
      { name: "seatsTotal", type: "uint16", indexed: false },
      { name: "minimumBid", type: "uint256", indexed: false },
      { name: "referrer", type: "address", indexed: false },
    ],
  },
] as const;

/** PoolPilotBook.buySeat — pays ETH, mints seat NFT */
export const bookAbi = [
  {
    type: "function",
    name: "buySeat",
    stateMutability: "payable",
    inputs: [],
    outputs: [{ name: "tokenId", type: "uint256" }],
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
    name: "seatCount",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "uint16" }],
  },
  {
    type: "function",
    name: "seatsRemaining",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "uint16" }],
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
    name: "finalized",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "bool" }],
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
    name: "token",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "address" }],
  },
  {
    type: "function",
    name: "creator",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "address" }],
  },
] as const;

/** PoolPilotSeatNFT (ERC-721) */
export const seatNftAbi = [
  {
    type: "function",
    name: "balanceOf",
    stateMutability: "view",
    inputs: [{ name: "owner", type: "address" }],
    outputs: [{ name: "", type: "uint256" }],
  },
  {
    type: "function",
    name: "ownerOf",
    stateMutability: "view",
    inputs: [{ name: "tokenId", type: "uint256" }],
    outputs: [{ name: "", type: "address" }],
  },
  {
    type: "function",
    name: "totalMinted",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "uint256" }],
  },
  {
    type: "function",
    name: "tokenURI",
    stateMutability: "view",
    inputs: [{ name: "tokenId", type: "uint256" }],
    outputs: [{ name: "", type: "string" }],
  },
] as const;

/** True when factory is configured for live createBook */
export function factoryReady() {
  return Boolean(CONTRACT_ADDRESSES.bookFactory);
}

/** True when a specific book contract address is available for buySeat */
export function bookReady(bookAddress?: string | null) {
  return Boolean(bookAddress && bookAddress.startsWith("0x") && bookAddress.length === 42);
}

export function contractsReady() {
  return factoryReady();
}
