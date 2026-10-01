import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-[var(--border)] mt-auto">
      <div className="max-w-lg md:max-w-2xl lg:max-w-3xl mx-auto px-4 py-4 text-[11px] text-muted flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-between">
        <p>
          Built by [TODO: your name] ·{" "}
          <a
            href="https://mcflamingo.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-secondary hover:underline"
          >
            McFlamingo
          </a>
          , Ponte Vedra Beach, FL
        </p>
        <div className="flex gap-3">
          <Link href="/about" className="hover:text-secondary">
            About
          </Link>
          <Link href="/security" className="hover:text-secondary">
            Security
          </Link>
          <a
            href="https://github.com/MCFLAMINGO/pool-pilot"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-secondary"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
