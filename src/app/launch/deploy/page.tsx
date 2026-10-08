"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { ShareCard } from "@/components/ShareCard";
import { ConnectButton } from "@/components/ConnectButton";
import { useRequireWallet } from "@/hooks/useRequireWallet";
import { useSwitchChain } from "wagmi";
import { TARGET_CHAIN_ID } from "@/lib/chains";

function DeployInner() {
  const params = useSearchParams();
  const ticker = params.get("ticker") || "TICKER";
  const bid = params.get("bid") || "0.05";
  const { isConnected, wrongNetwork, ready } = useRequireWallet();
  const { switchChain } = useSwitchChain();
  const [state, setState] = useState<"idle" | "signing" | "pending" | "done">("idle");
  const invitePath = "/books/book-mcfl-001";
  const shareUrl = typeof window !== "undefined" ? `${window.location.origin}${invitePath}` : `https://poolpilot.xyz${invitePath}`;

  const run = async () => {
    if (!ready) return;
    setState("signing");
    await new Promise((r) => setTimeout(r, 900));
    setState("pending");
    await new Promise((r) => setTimeout(r, 1200));
    setState("done");
  };

  if (state === "done") return (
    <div className="max-w-md mx-auto space-y-6 pb-4">
      <div className="flex gap-2" aria-label="Launch progress">{[1,2,3].map((n) => <div key={n} className="h-1.5 flex-1 rounded-full bg-[var(--lime)]" />)}</div>
      <p className="text-xs text-muted">Step 3 of 3 · Invite your team</p>
      <div className="text-center space-y-1"><div className="mx-auto w-14 h-14 rounded-full bg-[var(--lime)]/15 text-[var(--lime)] flex items-center justify-center text-2xl" aria-hidden>✓</div><h1 className="font-display text-2xl font-bold">${ticker} is ready</h1><p className="text-secondary text-sm">Preview flow complete. The production factory transaction still needs to be wired.</p></div>
      <ShareCard symbol={ticker} seatsTaken={1} seatsTotal={18} shareUrl={shareUrl} />
      <div className="flex flex-col sm:flex-row gap-2"><Link href={invitePath} className="btn btn-primary btn-full">Open the book</Link><Link href="/portfolio" className="btn btn-secondary btn-full">View seats</Link></div>
    </div>
  );

  return (
    <div className="max-w-md mx-auto space-y-6 pb-4">
      <Link href={`/launch/review?ticker=${encodeURIComponent(ticker)}&bid=${encodeURIComponent(bid)}`} className="text-muted text-sm hover:text-secondary min-h-[44px] inline-flex items-center">← Review</Link>
      <div className="flex gap-2" aria-label="Launch progress">{[1,2,3].map((n) => <div key={n} className={`h-1.5 flex-1 rounded-full ${n <= 2 ? "bg-[var(--lime)]" : "bg-[var(--control)]"}`} />)}</div>
      <p className="text-xs text-muted">Step 3 of 3 · Confirm in wallet</p>
      <section className="card p-5 space-y-4">
        <div className="flex items-start justify-between gap-3"><div><h1 className="font-display text-xl font-bold">Create ${ticker}</h1><p className="text-secondary text-sm mt-1">{bid} ETH minimum · 18 seats</p></div><span className="pill pill-fill text-[10px]">Preview</span></div>
        <div className="rounded-[14px] border border-[var(--border)] bg-[var(--control)] p-3 text-xs text-secondary leading-relaxed">This demo walks through the signing UX but does not submit a blockchain transaction. No funds are moved by this button.</div>
        {!isConnected && <div className="flex justify-center"><ConnectButton /></div>}
        {wrongNetwork && <button type="button" className="btn btn-full text-sm bg-[var(--warn)] text-[var(--lime-text)]" onClick={() => switchChain({ chainId: TARGET_CHAIN_ID })}>Switch to Robinhood Chain</button>}
        {ready && <button type="button" onClick={run} disabled={state !== "idle"} className="btn btn-primary btn-full">{state === "idle" && "Preview signing flow"}{state === "signing" && "Opening wallet…"}{state === "pending" && "Waiting for confirmation…"}</button>}
        <p className="text-[11px] text-muted text-center">Production mint + pool ABI integration is intentionally not enabled in this demo.</p>
      </section>
    </div>
  );
}

export default function LaunchDeployPage() {
  return <Suspense fallback={<div className="card p-8 text-center text-muted text-sm">Loading…</div>}><DeployInner /></Suspense>;
}
