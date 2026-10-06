import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-[var(--border)] mt-auto">
      <div className="max-w-lg md:max-w-3xl lg:max-w-5xl mx-auto px-4 py-5 text-[11px] text-muted flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
        <p>
          Built with McFlamingo · Ponte Vedra Beach, FL ·{" "}
          <a
            href="https://x.com/cheferikosol"
            target="_blank"
            rel="noopener noreferrer"
            className="text-secondary hover:underline"
          >
            @cheferikosol
          </a>
        </p>
        <nav className="flex flex-wrap gap-x-3 gap-y-1" aria-label="Footer">
          <Link href="/about" className="hover:text-secondary">
            About
          </Link>
          <Link href="/security" className="hover:text-secondary">
            Security
          </Link>
          <Link href="/leaderboard" className="hover:text-secondary">
            Leaderboard
          </Link>
          <Link href="/terms" className="hover:text-secondary">
            Terms
          </Link>
          <Link href="/privacy" className="hover:text-secondary">
            Privacy
          </Link>
          <a
            href="https://github.com/MCFLAMINGO/pool-pilot"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-secondary"
          >
            GitHub
          </a>
        </nav>
      </div>
    </footer>
  );
}
