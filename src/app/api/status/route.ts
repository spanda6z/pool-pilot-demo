import { NextResponse } from "next/server";
import { CONTRACT_ADDRESSES, contractsReady } from "@/lib/contracts";
import { MCFL } from "@/lib/tokens";
import { SITE, DATA_MODE } from "@/lib/config";

export async function GET() {
  return NextResponse.json({
    ok: true,
    site: SITE.name,
    chainId: SITE.chainId,
    dataMode: DATA_MODE,
    contractsReady: contractsReady(),
    mcfl: MCFL.address,
    addresses: {
      bookFactory: CONTRACT_ADDRESSES.bookFactory ?? null,
      seatNft: CONTRACT_ADDRESSES.seatNft ?? null,
      swapRouter: CONTRACT_ADDRESSES.swapRouter ?? null,
      mcflToken: CONTRACT_ADDRESSES.mcflToken ?? null,
    },
    time: new Date().toISOString(),
  });
}
