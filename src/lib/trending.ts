/** Normalized pair from GeckoTerminal (Robinhood Chain). */

export type DexVenue =
  | "uniswap-v2"
  | "uniswap-v3"
  | "uniswap-v4"
  | "pons"
  | "other";

export interface TrendingPair {
  id: string;
  poolAddress: string;
  name: string;
  symbol: string;
  baseTokenAddress: string;
  quoteSymbol: string;
  priceUsd: number | null;
  change24h: number | null;
  volume24h: number | null;
  liquidityUsd: number | null;
  txns24h: number | null;
  dex: DexVenue;
  dexLabel: string;
  poolCreatedAt: string | null;
  dexscreenerUrl: string;
  geckoUrl: string;
  source: "geckoterminal";
}

export interface PoolPilotLaunch {
  symbol: string;
  name: string;
  tokenAddress: string;
  note: string;
  explorer: string;
}

/** Coins launched via Pool Pilot (expand as launches go live). */
export const POOL_PILOT_LAUNCHES: PoolPilotLaunch[] = [
  {
    symbol: "MCFL",
    name: "McFlamingo",
    tokenAddress: "0x21A91215fbFc4fc002B07cc87698A6fC01Aed523",
    note: "Launched on Pool Pilot",
    explorer:
      "https://robinhoodchain.blockscout.com/token/0x21A91215fbFc4fc002B07cc87698A6fC01Aed523",
  },
];

function mapDex(dexId: string | undefined): { dex: DexVenue; dexLabel: string } {
  const id = (dexId || "").toLowerCase();
  if (id.includes("pons")) return { dex: "pons", dexLabel: "Pons" };
  if (id.includes("uniswap-v4") || id.includes("v4"))
    return { dex: "uniswap-v4", dexLabel: "Uniswap v4" };
  if (id.includes("uniswap-v3") || id.includes("v3"))
    return { dex: "uniswap-v3", dexLabel: "Uniswap v3" };
  if (id.includes("uniswap-v2") || id.includes("v2"))
    return { dex: "uniswap-v2", dexLabel: "Uniswap v2" };
  if (id.includes("uniswap")) return { dex: "uniswap-v3", dexLabel: "Uniswap" };
  return { dex: "other", dexLabel: dexId?.replace(/-robinhood$/i, "") || "DEX" };
}

function parseSymbol(name: string): { symbol: string; quote: string } {
  const parts = name.split("/").map((s) => s.trim());
  const left = (parts[0] || "?").split(/\s+/)[0];
  const right = (parts[1] || "ETH").split(/\s+/)[0];
  return { symbol: left, quote: right };
}

function tokenAddressFromRel(id: string | undefined): string {
  if (!id) return "";
  const i = id.indexOf("0x");
  return i >= 0 ? id.slice(i) : "";
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function normalizeGeckoPool(p: any): TrendingPair {
  const a = p.attributes || {};
  const rel = p.relationships || {};
  const dexId = rel.dex?.data?.id as string | undefined;
  const { dex, dexLabel } = mapDex(dexId);
  const { symbol, quote } = parseSymbol(a.name || "?");
  const baseId = rel.base_token?.data?.id as string | undefined;
  const baseAddr = tokenAddressFromRel(baseId);
  const poolAddress = (a.address as string) || "";
  const vol = a.volume_usd?.h24 != null ? Number(a.volume_usd.h24) : null;
  const ch =
    a.price_change_percentage?.h24 != null
      ? Number(a.price_change_percentage.h24)
      : null;
  const tx = a.transactions?.h24
    ? Number(a.transactions.h24.buys || 0) + Number(a.transactions.h24.sells || 0)
    : null;
  const price =
    a.base_token_price_usd != null ? Number(a.base_token_price_usd) : null;
  const liq = a.reserve_in_usd != null ? Number(a.reserve_in_usd) : null;

  return {
    id: p.id || poolAddress,
    poolAddress,
    name: a.name || symbol,
    symbol,
    baseTokenAddress: baseAddr,
    quoteSymbol: quote,
    priceUsd: price,
    change24h: ch,
    volume24h: vol,
    liquidityUsd: liq,
    txns24h: tx,
    dex,
    dexLabel,
    poolCreatedAt: a.pool_created_at || null,
    dexscreenerUrl: `https://dexscreener.com/robinhood/${poolAddress}`,
    geckoUrl: `https://www.geckoterminal.com/robinhood/pools/${poolAddress}`,
    source: "geckoterminal",
  };
}

export function formatUsd(n: number | null): string {
  if (n == null || Number.isNaN(n)) return "—";
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(2)}M`;
  if (n >= 1_000) return `$${(n / 1_000).toFixed(1)}K`;
  if (n >= 1) return `$${n.toFixed(2)}`;
  if (n >= 0.0001) return `$${n.toFixed(4)}`;
  return `$${n.toExponential(2)}`;
}

export function formatPct(n: number | null): string {
  if (n == null || Number.isNaN(n)) return "—";
  const sign = n > 0 ? "+" : "";
  return `${sign}${n.toFixed(1)}%`;
}
