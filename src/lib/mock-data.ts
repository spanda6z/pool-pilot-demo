// DEMO DATA — clearly labeled. Not live on-chain data.
// Replace with indexer + RPC when contracts are confirmed.

export const CHAIN = {
  id: 4663,
  name: "Robinhood Chain",
  rpc: "https://rpc.mainnet.chain.robinhood.com",
  explorer: "https://robinhoodchain.blockscout.com",
  nativeCurrency: { name: "ETH", symbol: "ETH", decimals: 18 },
} as const;

export const CONTRACTS = {
  mcflToken: "0x0000000000000000000000000000000000000001",
  bookFactory: "0x0000000000000000000000000000000000000002",
  seatVault: "0x0000000000000000000000000000000000000003",
  seatNft: "0x0000000000000000000000000000000000000004",
  uniswapV3Factory: "0x0000000000000000000000000000000000000005",
  swapRouter: "0x0000000000000000000000000000000000000006",
  protocolTreasury: "0x0000000000000000000000000000000000000007",
  positionManager: "0x0000000000000000000000000000000000000008",
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
    name: "MCFL Genesis",
    symbol: "MCFL",
    description: "First liquidity book on Pool Pilot. DEMO data only.",
    status: "demo",
    seatsTotal: 100,
    seatsTaken: 42,
    seatPriceEth: "0.05",
    tokenAddress: CONTRACTS.mcflToken,
    poolAddress: "0x00000000000000000000000000000000000000a1",
    creator: "0x1111111111111111111111111111111111111111",
    createdAt: "2026-07-15T12:00:00Z",
    liquidityEth: "12.4",
    volume24h: "3.2",
    feeTier: 3000,
    tickLower: -887220,
    tickUpper: 887220,
    tags: ["genesis", "demo"],
  },
  {
    id: "book-pilot-002",
    name: "Pilot Blue",
    symbol: "PILOT",
    description: "Mock mid-cap book for UI testing.",
    status: "seats_available",
    seatsTotal: 50,
    seatsTaken: 18,
    seatPriceEth: "0.1",
    tokenAddress: "0x00000000000000000000000000000000000000b2",
    poolAddress: "0x00000000000000000000000000000000000000b3",
    creator: "0x2222222222222222222222222222222222222222",
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
    description: "Full seats example — mock.",
    status: "full",
    seatsTotal: 25,
    seatsTaken: 25,
    seatPriceEth: "0.25",
    tokenAddress: "0x00000000000000000000000000000000000000c4",
    poolAddress: "0x00000000000000000000000000000000000000c5",
    creator: "0x3333333333333333333333333333333333333333",
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
  totalSeatsMinted: 85,
  totalLiquidityEth: "40.2",
  totalVolumeEth: "12.9",
  lastUpdated: new Date().toISOString(),
  sourceBlock: "2212972",
  dataSource: "demo" as const,
};

export const MOCK_PORTFOLIO = {
  address: "0xAbCdEf0123456789AbCdEf0123456789AbCdEf01",
  ethBalance: "1.234",
  tokens: [
    { symbol: "MCFL", balance: "1000.0", address: CONTRACTS.mcflToken },
    { symbol: "PILOT", balance: "250.5", address: "0x00000000000000000000000000000000000000b2" },
  ],
  seats: [
    {
      tokenId: "42",
      bookId: "book-mcfl-001",
      bookName: "MCFL Genesis",
      liquidity: "0.05",
      tickLower: -887220,
      tickUpper: 887220,
      status: "active" as const,
    },
  ],
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
