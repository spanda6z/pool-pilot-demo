"use client";

import Link from "next/link";
import { useState } from "react";
import { DemoBadge } from "@/components/DemoBadge";

export default function LaunchCreatePage() {
  const [name, setName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [seats, setSeats] = useState("50");
  const [price, setPrice] = useState("0.1");

  return (
    <div className="max-w-lg mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/launch" className="text-muted text-xs hover:text-cyan">
          ← Launch
        </Link>
        <DemoBadge />
      </div>

      <h1 className="text-xl font-black">Step 1–4 · Configure</h1>

      <section className="pixel-card p-5 space-y-4">
        <div>
          <label className="text-[10px] text-muted tracking-wider">TOKEN NAME</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="My Token"
            className="w-full mt-1 bg-navy-800 border-2 border-[var(--pixel-border)] px-3 py-2 text-sm focus:outline-none focus:border-cyan"
          />
        </div>
        <div>
          <label className="text-[10px] text-muted tracking-wider">SYMBOL</label>
          <input
            value={symbol}
            onChange={(e) => setSymbol(e.target.value.toUpperCase())}
            placeholder="TKN"
            className="w-full mt-1 bg-navy-800 border-2 border-[var(--pixel-border)] px-3 py-2 text-sm focus:outline-none focus:border-cyan"
          />
        </div>
        <div>
          <label className="text-[10px] text-muted tracking-wider">NUMBER OF SEATS</label>
          <input
            type="number"
            value={seats}
            onChange={(e) => setSeats(e.target.value)}
            className="w-full mt-1 bg-navy-800 border-2 border-[var(--pixel-border)] px-3 py-2 text-sm focus:outline-none focus:border-cyan"
          />
        </div>
        <div>
          <label className="text-[10px] text-muted tracking-wider">SEAT PRICE (ETH)</label>
          <input
            type="number"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full mt-1 bg-navy-800 border-2 border-[var(--pixel-border)] px-3 py-2 text-sm focus:outline-none focus:border-cyan"
          />
        </div>

        <div className="flex gap-3 pt-2">
          <button type="button" className="pixel-btn btn-outline flex-1 py-2 text-xs">
            Save Draft
          </button>
          <Link
            href="/launch/review"
            className="pixel-btn btn-gold flex-1 py-2 text-xs text-center"
          >
            Continue →
          </Link>
        </div>
      </section>
    </div>
  );
}
