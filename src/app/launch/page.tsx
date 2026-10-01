import Link from "next/link";

export default function LaunchPage() {
  return (
    <div className="space-y-6 pb-4 max-w-md mx-auto">
      <div>
        <h1 className="font-display text-xl font-bold mb-1">Launch</h1>
        <p className="text-secondary text-sm leading-relaxed">
          Create a token and thin Uniswap v3 pool. You keep the token. Friends sit up to 18 chairs.
        </p>
      </div>

      <div className="flex gap-2" aria-label="Launch progress">
        {[1, 2, 3].map((n) => (
          <div
            key={n}
            className={`h-1.5 flex-1 rounded-full ${n === 1 ? "bg-[var(--lime)]" : "bg-[var(--control)]"}`}
          />
        ))}
      </div>
      <p className="text-xs text-muted">Step 1 of 3 · Configure</p>

      <section className="card p-5 space-y-4">
        <div>
          <label className="text-xs text-muted block mb-1.5">Ticker</label>
          <input placeholder="e.g. MCFL" maxLength={10} />
        </div>
        <div>
          <label className="text-xs text-muted block mb-1.5">Min bid per seat (ETH)</label>
          <input type="number" placeholder="0.05" step="0.01" min="0.01" />
          <p className="text-[11px] text-muted mt-1.5">Typical range maps to about $10–$10,000.</p>
        </div>
      </section>

      <div className="card p-4 text-xs text-secondary space-y-1">
        <div className="flex justify-between"><span>Supply</span><span className="font-display">1,000,000,000</span></div>
        <div className="flex justify-between"><span>Seats</span><span className="font-display">18</span></div>
        <div className="flex justify-between"><span>You sign</span><span>Every step</span></div>
      </div>

      <Link href="/launch/create" className="btn btn-primary btn-full">
        Continue
      </Link>

      <p className="text-[11px] text-muted text-center leading-relaxed">
        No gas on Robinhood Chain?{" "}
        <Link href="/about" className="text-lime">
          How to arrive
        </Link>
        . Demo flow only — no live mint.
      </p>
    </div>
  );
}
