export const TICKER_PATTERN = /^[A-Z0-9]{2,10}$/;
export const MIN_BID_MAX = 1000;

export function normalizeTicker(value: string | null | undefined) {
  return (value || "").trim().toUpperCase();
}

export function parseLaunchParams(
  tickerValue: string | null | undefined,
  bidValue: string | null | undefined,
) {
  const ticker = normalizeTicker(tickerValue);
  const bid = Number(bidValue);

  if (!TICKER_PATTERN.test(ticker)) {
    return { ok: false as const, error: "Ticker must be 2–10 letters or numbers." };
  }

  if (!Number.isFinite(bid) || bid <= 0 || bid > MIN_BID_MAX) {
    return { ok: false as const, error: "Minimum bid must be greater than 0 and no more than 1000 ETH." };
  }

  return { ok: true as const, ticker, bid };
}
