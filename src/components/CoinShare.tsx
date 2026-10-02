"use client";

import { ShareCard } from "@/components/ShareCard";

export function CoinShare({
  symbol,
  seatsTaken,
  bookId,
}: {
  symbol: string;
  seatsTaken: number;
  bookId: string;
}) {
  const path = `/books/${bookId}`;
  const shareUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}${path}`
      : `https://poolpilot.xyz${path}`;

  return (
    <ShareCard
      symbol={symbol}
      seatsTaken={Math.min(seatsTaken, 18)}
      seatsTotal={18}
      shareUrl={shareUrl}
    />
  );
}
