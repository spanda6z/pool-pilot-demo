import Link from "next/link";
import { DemoBadge } from "@/components/DemoBadge";

export default function LaunchReviewPage() {
  return (
    <div className="max-w-lg mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/launch/create" className="text-muted text-xs hover:text-cyan">
          ← Edit
        </Link>
        <DemoBadge />
      </div>

      <h1 className="text-xl font-black">Step 5–6 · Review</h1>

      <section className="pixel-card p-5 space-y-3 text-sm">
        <Row label="Token name" value="Demo Token (mock)" />
        <Row label="Symbol" value="DEMO" />
        <Row label="Seats" value="50" />
        <Row label="Seat price" value="0.1 ETH" />
        <Row label="Est. gas" value="~0.002 ETH (demo)" />
        <Row label="Permissions" value="Creator retains no upgrade key (demo claim)" />
      </section>

      <section className="pixel-card p-4 border-coral/40">
        <p className="text-coral text-xs font-bold mb-1">⚠ RISK & PERMISSIONS</p>
        <ul className="text-[10px] text-secondary list-disc list-inside space-y-0.5">
          <li>Deployment is irreversible.</li>
          <li>Confirm all addresses on explorer after deploy.</li>
          <li>Demo mode — no real deployment occurs.</li>
        </ul>
      </section>

      <Link
        href="/launch/deploy"
        className="pixel-btn btn-gold w-full py-3 text-sm text-center block"
      >
        Proceed to Deploy
      </Link>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between py-1.5 border-b border-[var(--pixel-border)]">
      <span className="text-secondary">{label}</span>
      <span className="font-bold">{value}</span>
    </div>
  );
}
