"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { ShareCard } from "@/components/ShareCard";
import { ConnectButton } from "@/components/ConnectButton";
import { useRequireWallet } from "@/hooks/useRequireWallet";
import { useSwitchChain } from "wagmi";
import { TARGET_CHAIN_ID } from "@/lib/chains";
import { parseLaunchParams } from "@/lib/launch-validation";

function DeployInner() {
  const params = useSearchParams();
  const parsed = parseLaunchParams(params.get("ticker"), params.get("bid"));
  const { isConnected, wrongNetwork, ready } = useRequireWallet();
  const { switchChain } = useSwitchChain();

  if (!parsed.ok) {
    return (
      <div className="max-w-md mx-auto space-y-5 pb-4">
        <Link href="/launch" className="text-muted text-sm hover:text-secondary min-h-[44px] inline-flex items-center">← Configure launch</Link>
        <section className="card p-6 space-y-3">
          <span className="pill pill-fill text-[10px]">Invalid launch</span>
          <h1 className="font-display text-2xl font-bold">Launch preview unavailable</h1>
          <p className="text-secondary text-sm">{parsed.error}</p>
          <Link href="/launch" className="btn btn-primary btn-full">Back to launch</Link>
        </section>
      </div>
    );
  }

  const { ticker, bid } = parsed;
  const invitePath = "/books/book-mcfl-001";
  const shareUrl = typeof window !== "undefined"
    ? window.location.origin + invitePath
    : "https://poolpilot.xyz" + invitePath;

  return (
    <div className="max-w-md mx-auto space-y-6 pb-4">
      <Link
        href={"/launch/review?ticker=" + encodeURIComponent(ticker) + "&bid=" + encodeURIComponent(String(bid))}
        className="text-muted text-sm hover:text-secondary min-h-[44px] inline-flex items-center"
      >← Review</Link>

      <div className="flex gap-2" aria-label="Launch progress">
        {[1,2,3].map((n) => (
          <div key={n} className={"h-1.5 flex-1 rounded-full " + (n <= 2 ? "bg-[var(--lime)]" : "bg-[var(--control)]")} />
        ))}
      </div>
      <p className="text-xs text-muted">Step 3 of 3 · Preview only</p>

      <section className="card p-5 space-y-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h1 className="font-display text-xl font-bold">Create {"$"}{ticker}</h1>
            <p className="text-secondary text-sm mt-1">{bid} ETH minimum · 18 seats</p>
          </div>
          <span className="pill pill-fill text-[10px]">Preview</span>
        </div>

        <div className="rounded-[14px] border border-[var(--warn)]/40 bg-[var(--warn)]/5 p-3 text-xs text-warn leading-relaxed">
          <strong>Transaction disabled.</strong> The production factory ABI and contract are not configured, so this page cannot open a wallet signature or claim that a token was created.
        </div>

        {!isConnected && <div className="flex justify-center"><ConnectButton /></div>}
        {wrongNetwork && (
          <button type="button" className="btn btn-full text-sm bg-[var(--warn)] text-[var(--lime-text)]" onClick={() => switchChain({ chainId: TARGET_CHAIN_ID })}>
            Switch to Robinhood Chain
          </button>
        )}

        {ready && (
          <div className="rounded-[14px] bg-[var(--control)] p-4 text-center space-y-2">
            <div className="font-display font-bold">Launch unavailable</div>
            <p className="text-xs text-muted">Wallet connected, but Pool Pilot is intentionally fail-closed until the real launch factory is wired.</p>
          </div>
        )}
      </section>

      <div className="card p-4">
        <div className="text-xs font-semibold">What will happen when production is enabled</div>
        <ol className="mt-2 space-y-2 text-[11px] text-muted list-decimal pl-4">
          <li>Review the factory calldata in your wallet.</li>
          <li>Sign the transaction yourself.</li>
          <li>Wait for an on-chain receipt before the launch is marked complete.</li>
        </ol>
      </div>

      <ShareCard symbol={ticker} seatsTaken={0} seatsTotal={18} shareUrl={shareUrl} />
      <Link href="/books" className="btn btn-secondary btn-full">Browse markets</Link>
    </div>
  );
}

export default function LaunchDeployPage() {
  return <Suspense fallback={<div className="card p-8 text-center text-muted text-sm">Loading…</div>}><DeployInner /></Suspense>;
}
