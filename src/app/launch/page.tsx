import Link from "next/link";
import { DemoBadge } from "@/components/DemoBadge";

const STEPS = [
  "Token & book identity",
  "Seat configuration",
  "Pool configuration",
  "Fees & economics",
  "Risk & permissions review",
  "Deployment transaction review",
  "Wallet signature",
  "Deployment pending",
  "Live book URL + verify",
];

export default function LaunchPage() {
  return (
    <div className="space-y-6 max-w-xl mx-auto pb-8">
      <div className="flex items-center justify-between gap-3">
        <h1 className="text-xl sm:text-2xl font-black tracking-tight">
          <span className="text-gold">▸</span> Launch
        </h1>
        <DemoBadge />
      </div>

      <section className="pixel-card p-5 sm:p-6">
        <p className="text-secondary text-sm mb-6 leading-relaxed">
          Create a new liquidity book. You configure, you review, you sign.
          Pool Pilot never holds keys or funds.
        </p>

        <ol className="space-y-2.5 text-xs mb-8">
          {STEPS.map((s, i) => (
            <li key={s} className="flex gap-3 items-start">
              <span className="text-gold font-bold w-5 tabular-nums shrink-0">{i + 1}.</span>
              <span className="text-secondary leading-relaxed">{s}</span>
            </li>
          ))}
        </ol>

        <Link
          href="/launch/create"
          className="pixel-btn btn-gold w-full py-3.5 text-sm text-center"
        >
          Start Launch
        </Link>
      </section>
    </div>
  );
}
