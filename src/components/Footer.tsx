import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-[rgba(30,58,95,0.6)] bg-[rgba(11,20,38,0.6)]">
      <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted">
        <div className="flex items-center gap-2">
          <span className="text-cyan">◈</span>
          <span>Pool Pilot — Non-custodial. You sign every tx.</span>
        </div>
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-2">
          <Link href="/about" className="hover:text-cyan transition-colors">About</Link>
          <Link href="/security" className="hover:text-cyan transition-colors">Security</Link>
          <Link href="/verify" className="hover:text-cyan transition-colors">Verify</Link>
          <Link href="/terms" className="hover:text-cyan transition-colors">Terms</Link>
          <Link href="/privacy" className="hover:text-cyan transition-colors">Privacy</Link>
        </div>
        <div>
          Chain 4663 · <span className="text-coral font-semibold">DEMO</span>
        </div>
      </div>
    </footer>
  );
}
