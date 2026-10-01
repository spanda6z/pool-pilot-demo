import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-auto border-t-2 border-[var(--pixel-border)] bg-navy-900">
      <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted">
        <div className="flex items-center gap-2">
          <span className="text-cyan">◈</span>
          <span>Pool Pilot — Non-custodial. You sign every tx.</span>
        </div>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/about" className="hover:text-cyan">About</Link>
          <Link href="/security" className="hover:text-cyan">Security</Link>
          <Link href="/verify" className="hover:text-cyan">Verify</Link>
          <Link href="/terms" className="hover:text-cyan">Terms</Link>
          <Link href="/privacy" className="hover:text-cyan">Privacy</Link>
        </div>
        <div className="text-muted">
          Chain 4663 · <span className="text-coral">DEMO MODE</span>
        </div>
      </div>
    </footer>
  );
}
