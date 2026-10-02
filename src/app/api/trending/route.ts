import { NextResponse } from "next/server";
import { normalizeGeckoPool, type TrendingPair } from "@/lib/trending";

export const revalidate = 60;

const GT = "https://api.geckoterminal.com/api/v2";

async function fetchPools(path: string): Promise<TrendingPair[]> {
  const res = await fetch(`${GT}${path}`, {
    headers: { Accept: "application/json" },
    next: { revalidate: 60 },
  });
  if (!res.ok) {
    throw new Error(`GeckoTerminal ${res.status}`);
  }
  const json = await res.json();
  const rows = (json.data || []) as unknown[];
  return rows.map(normalizeGeckoPool);
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const tab = searchParams.get("tab") || "trending";

  try {
    let pairs: TrendingPair[] = [];

    if (tab === "new") {
      pairs = await fetchPools("/networks/robinhood/new_pools?page=1");
    } else if (tab === "volume") {
      pairs = await fetchPools(
        "/networks/robinhood/pools?page=1&sort=h24_volume_usd_desc"
      );
    } else {
      pairs = await fetchPools("/networks/robinhood/trending_pools?page=1");
    }

    const venue = searchParams.get("venue");
    if (venue === "uniswap") {
      pairs = pairs.filter((p) => p.dex.startsWith("uniswap"));
    } else if (venue === "pons") {
      pairs = pairs.filter((p) => p.dex === "pons");
    }

    return NextResponse.json({
      ok: true,
      chain: "robinhood",
      chainId: 4663,
      tab,
      updatedAt: new Date().toISOString(),
      source: "geckoterminal",
      pairs: pairs.slice(0, 30),
    });
  } catch (e) {
    const message = e instanceof Error ? e.message : "fetch failed";
    return NextResponse.json(
      { ok: false, error: message, pairs: [] },
      { status: 502 }
    );
  }
}
