"use client";

import Link from "next/link";
import { useState } from "react";
import { DemoBadge } from "@/components/DemoBadge";

type State = "idle" | "signing" | "pending" | "done";

export default function LaunchDeployPage() {
  const [state, setState] = useState<State>("idle");

  const deploy = async () => {
    setState("signing");
    await new Promise((r) => setTimeout(r, 1000));
    setState("pending");
    await new Promise((r) => setTimeout(r, 1500));
    setState("done");
  };

  return (
    <div className="max-w-lg mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/launch/review" className="text-muted text-xs hover:text-cyan">
          ← Review
        </Link>
        <DemoBadge />
      </div>

      <h1 className="text-xl font-black">Step 7–9 · Deploy</h1>

      <section className="pixel-card p-6 text-center space-y-4">
        {state === "idle" && (
          <>
            <p className="text-secondary text-sm">
              Ready to sign deployment transaction (mock).
            </p>
            <button
              type="button"
              onClick={deploy}
              className="pixel-btn btn-gold w-full py-3 text-sm"
            >
              Sign & Deploy
            </button>
          </>
        )}
        {state === "signing" && <p className="text-gold">Awaiting wallet signature…</p>}
        {state === "pending" && <p className="text-cyan pulse-cyan">Deployment pending…</p>}
        {state === "done" && (
          <>
            <p className="text-mint font-bold text-lg">Book live (mock)</p>
            <p className="text-xs text-muted">Demo book ID: book-demo-new</p>
            <div className="flex flex-col gap-2">
              <Link href="/books/book-mcfl-001" className="pixel-btn btn-cyan py-2 text-sm">
                Open Book
              </Link>
              <Link href="/verify/book-mcfl-001" className="pixel-btn btn-outline py-2 text-sm">
                Verify Page
              </Link>
            </div>
          </>
        )}
      </section>
    </div>
  );
}
