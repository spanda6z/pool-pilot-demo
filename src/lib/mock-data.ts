// Placeholder book index until live indexer + RPC are connected.
// Set NEXT_PUBLIC_DATA_MODE=live when production feeds are ready.

export const CHAIN = {
  id: 4663,
  name: "Robinhood Chain",
  rpc: "https://rpc.mainnet.chain.robinhood.com",
  explorer: "https://robinhoodchain.blockscout.com",
  nativeCurrency: { name: "ETH", symbol: "ETH", decimals: 18 },
} as const;

export const CONTRACTS = {
  mcflToken: "0x21A91215fbFc4fc002B07cc87698A6fC01Aed523",
  bookFactory: "",
  seatVault: "",
  seatNft: "",
  uniswapV3Factory: "0x1f7d7550b1b028f7571e69a784071f0205fd2efa",
  swapRouter: "0xcaf681a66d020601342297493863e78c959e5cb2",
  protocolTreasury: "",
  positionManager: "0x73991a25c818bf1f1128deaab1492d45638de0d3",
} as const;

export type BookStatus = "live" | "seats_available" | "full" | "paused" | "demo";

export interface MockBook {
  id: string;
  name: string;
  symbol: string;
  description: string;
  status: BookStatus;
  seatsTotal: number;
  seatsTaken: number;
  seatPriceEth: string;
  tokenAddress: string;
  poolAddress: string;
  creator: string;
  createdAt: string;
  liquidityEth: string;
  volume24h: string;
  feeTier: number;
  tickLower: number;
  tickUpper: number;
  tags: string[];
}

export const MOCK_BOOKS: MockBook[] = [
  {
    id: "book-mcfl-001",
    name: "McFlamingo",
    symbol: "MCFL",
    description: "McFlamingo (MCFL) on Robinhood Chain.",
    status: "demo",
    seatsTotal: 18,
    seatsTaken: 7,
    seatPriceEth: "0.05",
    tokenAddress: CONTRACTS.mcflToken,
    poolAddress: "",
    creator: "",
    createdAt: "2026-07-15T12:00:00Z",
    liquidityEth: "12.4",
    volume24h: "3.2",
    feeTier: 3000,
    tickLower: -887220,
    tickUpper: 887220,
    tags: ["genesis", "mcfl"],
  },
  {
    id: "book-pilot-002",
    name: "Pilot Blue",
    symbol: "PILOT",
    description: "Community book for the Pilot Blue team.",
    status: "seats_available",
    seatsTotal: 18,
    seatsTaken: 11,
    seatPriceEth: "0.1",
    tokenAddress: "",
    poolAddress: "",
    creator: "",
    createdAt: "2026-08-01T09:30:00Z",
    liquidityEth: "5.8",
    volume24h: "1.1",
    feeTier: 500,
    tickLower: -200000,
    tickUpper: 200000,
    tags: ["demo", "mid"],
  },
  {
    id: "book-seat-003",
    name: "Seat Gold",
    symbol: "SGOLD",
    description: "Seat Gold — seats filled.",
    status: "full",
    seatsTotal: 18,
    seatsTaken: 18,
    seatPriceEth: "0.25",
    tokenAddress: "",
    poolAddress: "",
    creator: "",
    createdAt: "2026-08-20T15:00:00Z",
    liquidityEth: "22.0",
    volume24h: "8.7",
    feeTier: 10000,
    tickLower: -100000,
    tickUpper: 100000,
    tags: ["demo", "full"],
  },
];

export const MOCK_STATS = {
  totalBooks: 3,
  totalSeatsMinted: 36,
  totalLiquidityEth: "40.2",
  totalVolumeEth: "12.9",
  lastUpdated: new Date().toISOString(),
  sourceBlock: "2212972",
  dataSource: "placeholder" as const,
};

export function explorerAddress(addr: string) {
  return `${CHAIN.explorer}/address/${addr}`;
}

export function explorerTx(hash: string) {
  return `${CHAIN.explorer}/tx/${hash}`;
}

export function shortAddress(addr: string) {
  if (!addr || addr.length < 10) return addr;
  return `${addr.slice(0, 6)}…${addr.slice(-4)}`;
}
