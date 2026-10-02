"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { SeatRing } from "@/components/SeatRing";
import { CopyButton } from "@/components/CopyButton";

function DeployInner() {
  const params = useSearchParams();
  const ticker = params.get("ticker") || "TICKER";
  const bid = params.get("bid") || "0.05";
  const [state, setState] = useState<"idle" | "signing" | "pending" | "done">(
    "idle"
  );

  const invitePath = `/books/book-mcfl-001`;
  const shareUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}${invitePath}`
      : `https://poolpilot.xyz${invitePath}`;

  const run = async () => {
    setState("signing");
    await new Promise((r) => setTimeout(r, 900));
    setState("pending");
    await new Promise((r) => setTimeout(r, 1200));
    setState("done");
  };

  if (state === "done") {
    return (
      <div className="max-w-md mx-auto space-y-6 pb-4">
        <div className="flex gap-2" aria-label="Launch progress">
          {[1, 2, 3].map((n) => (
            <div key={n} className="h-1.5 flex-1 rounded-full bg-[var(--lime)]" />
          ))}
        </div>
        <p className="text-xs text-muted">Step 3 of 3 · Invite</p>

        <section className="card p-6 flex flex-col items-center text-center gap-4">
          <SeatRing taken={1} total={18} size={120} label="1 of 18 seats" />
          <div>
            <h1 className="font-display text-xl font-bold">${ticker} is live</h1>
            <p className="text-secondary text-sm mt-1">
              Chair 1 is yours. Invite the team to sit the rest.
            </p>
          </div>
          <div className="w-full space-y-2 text-left">
            <div className="text-[10px] text-muted uppercase tracking-wide">
              Invite link
            </div>
            <div className="flex gap-2">
              <code className="control flex-1 px-3 py-2.5 text-xs break-all min-h-[44px] flex items-center">
                {shareUrl}
              </code>
              <CopyButton text={shareUrl} />
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 w-full">
            <Link href={invitePath} className="btn btn-primary btn-full">
              Open the book
            </Link>
            <Link href="/portfolio" className="btn btn-secondary btn-full">
              View seats
            </Link>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto space-y-6 pb-4">
      <Link
        href={`/launch/review?ticker=${encodeURIComponent(ticker)}&bid=${encodeURIComponent(bid)}`}
        className="text-muted text-sm hover:text-secondary min-h-[44px] inline-flex items-center"
      >
        ← Review
      </Link>

      <div className="flex gap-2" aria-label="Launch progress">
        {[1, 2, 3].map((n) => (
          <div
            key={n}
            className={`h-1.5 flex-1 rounded-full ${n <= 2 ? "bg-[var(--lime)]" : "bg-[var(--control)]"}`}
          />
        ))}
      </div>
      <p className="text-xs text-muted">Step 2 · Sign in wallet</p>

      <section className="card p-5 space-y-4 text-center">
        <h1 className="font-display text-xl font-bold">Create ${ticker}</h1>
        <p className="text-secondary text-sm">
          Min bid {bid} ETH · 18 seats · You sign the mint and pool tx
        </p>
        <button
          type="button"
          onClick={run}
          disabled={state !== "idle"}
          className="btn btn-primary btn-full"
        >
          {state === "idle" && "Sign in wallet"}
          {state === "signing" && "Awaiting signature…"}
          {state === "pending" && "Pending confirmation…"}
        </button>
        <p className="text-[11px] text-muted">
          Preview flow — connect live contracts before mainnet use.
        </p>
      </section>
    </div>
  );
}

export default function LaunchDeployPage() {
  return (
    <Suspense
      fallback={
        <div className="card p-8 text-center text-muted text-sm">Loading…</div>
      }
    >
      <DeployInner />
    </Suspense>
  );
}
