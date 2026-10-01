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
    <div className="space-y-6 max-w-xl mx-auto">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-black">
          <span className="text-gold">▸</span> LAUNCH
        </h1>
        <DemoBadge />
      </div>

      <section className="pixel-card p-6">
        <p className="text-secondary text-sm mb-6">
          Create a new liquidity book. You configure, you review, you sign.
          Pool Pilot never holds keys or funds.
        </p>

        <ol className="space-y-2 text-xs mb-8">
          {STEPS.map((s, i) => (
            <li key={s} className="flex gap-3 items-start">
              <span className="text-gold font-bold w-5">{i + 1}.</span>
              <span className="text-secondary">{s}</span>
            </li>
          ))}
        </ol>

        <Link href="/launch/create" className="pixel-btn btn-gold w-full py-3 text-sm text-center block">
          Start Launch
        </Link>
      </section>
    </div>
  );
}
