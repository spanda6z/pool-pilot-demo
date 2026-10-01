import { DemoBadge } from "@/components/DemoBadge";
import Link from "next/link";

export default function SecurityPage() {
  return (
    <div className="max-w-2xl space-y-6">
      <div className="flex items-center gap-3">
        <h1 className="text-2xl font-black">Security</h1>
        <DemoBadge />
      </div>
      <section className="pixel-card p-6 space-y-3 text-sm text-secondary">
        <h2 className="text-cyan font-bold text-xs tracking-widest">NON-CUSTODIAL RULES</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>No private keys, seeds, or funds stored by Pool Pilot.</li>
          <li>Frontend builds calldata only; wallet signs and broadcasts.</li>
          <li>No API endpoint can move user funds.</li>
          <li>Every write screen shows target, amounts, fees, gas, and irreversible risk.</li>
          <li>All addresses are full-length, copyable, and linked to the explorer.</li>
          <li>Demo data is always labeled when live data is unavailable.</li>
        </ul>
        <Link href="/verify" className="text-cyan text-xs hover:underline block mt-4">
          View contract registry →
        </Link>
      </section>
    </div>
  );
}
