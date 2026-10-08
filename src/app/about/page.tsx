import Link from "next/link";
import type { Metadata } from "next";
import { CopyButton } from "@/components/CopyButton";

export const metadata: Metadata = {
  title: "About — Pool Pilot",
  description:
    "Pool Pilot is a non-custodial launch and trading interface for Robinhood Chain.",
};

const GITHUB_REPO = "https://github.com/spanda6z/pool-pilot-demo";
const MCFLAMINGO = "https://mcflamingo.com";
const X_HANDLE = "cheferikosol";
const MCFL_TOKEN = "0x21A91215fbFc4fc002B07cc87698A6fC01Aed523";

export default function AboutPage() {
  return (
    <div className="space-y-7 pb-8 max-w-lg">
      <div>
        <div className="pill pill-live mb-3">Transparency</div>
        <h1 className="font-display text-2xl font-bold mb-1">About Pool Pilot</h1>
        <p className="text-secondary text-sm leading-relaxed">
          Pool Pilot is a non-custodial interface for launching and exploring
          team-funded coins on Robinhood Chain. Your wallet stays in control:
          you review and sign each transaction yourself.
        </p>
      </div>

      <section className="card p-5 space-y-4" aria-labelledby="control">
        <div>
          <h2 id="control" className="font-display text-base font-bold">
            What the app can and cannot do
          </h2>
          <p className="text-xs text-muted mt-1">
            The demo intentionally separates interface state from on-chain truth.
          </p>
        </div>
        <ul className="text-sm text-secondary space-y-2.5 leading-relaxed list-disc list-inside">
          <li>It never asks for or stores a private key or seed phrase.</li>
          <li>Wallet transactions require an explicit signature from you.</li>
          <li>Preview launch steps do not move funds or submit a factory transaction.</li>
          <li>Market data can come from third-party indexers and may lag or be incomplete.</li>
        </ul>
      </section>

      <section className="card p-5 space-y-4" aria-labelledby="verify">
        <div>
          <h2 id="verify" className="font-display text-base font-bold">
            Verify before you trust
          </h2>
          <p className="text-sm text-secondary leading-relaxed mt-1">
            Treat contract addresses, token balances, seat ownership, and
            transaction results as on-chain facts. Confirm them in an explorer
            rather than relying on a UI label.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link href="/security" className="btn btn-primary text-sm">
            Security guide
          </Link>
          <a
            href="https://robinhoodchain.blockscout.com"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary text-sm"
          >
            Open explorer
          </a>
        </div>
      </section>

      <section className="card p-5 space-y-4" aria-labelledby="operator">
        <h2 id="operator" className="font-display text-base font-bold">
          Project disclosure
        </h2>
        <p className="text-sm text-secondary leading-relaxed">
          This repository is the public demo implementation. Operator identity,
          production fee recipients, project wallet, and signed ownership proof
          are not asserted by this build and should be published and independently
          verifiable before production launch.
        </p>
        <div className="grid gap-2 text-xs">
          <div className="control p-3">
            <div className="text-[10px] uppercase tracking-wide text-muted mb-1">Source</div>
            <a
              href={GITHUB_REPO}
              target="_blank"
              rel="noopener noreferrer"
              className="text-lime break-all"
            >
              {GITHUB_REPO}
            </a>
          </div>
          <div className="control p-3">
            <div className="text-[10px] uppercase tracking-wide text-muted mb-1">Community identity</div>
            <div className="text-secondary">
              <a href={MCFLAMINGO} target="_blank" rel="noopener noreferrer" className="text-lime">
                mcflamingo.com
              </a>
              {" · "}
              <a href={`https://x.com/${X_HANDLE}`} target="_blank" rel="noopener noreferrer" className="text-lime">
                @{X_HANDLE}
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="card p-5 space-y-3" aria-labelledby="mcfl-token">
        <h2 id="mcfl-token" className="font-display text-base font-bold">
          MCFL token
        </h2>
        <p className="text-xs text-secondary leading-relaxed">
          Token address surfaced by the current application configuration. Always
          verify the address and network in the explorer before interacting.
        </p>
        <div className="flex gap-2 items-stretch">
          <code className="control flex-1 px-3 py-2.5 text-xs font-mono break-all flex items-center min-h-[44px]">
            {MCFL_TOKEN}
          </code>
          <CopyButton text={MCFL_TOKEN} label="Copy" />
        </div>
        <a
          href={`https://robinhoodchain.blockscout.com/token/${MCFL_TOKEN}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-lime text-sm"
        >
          View token on explorer ↗
        </a>
      </section>

      <section className="card p-4" aria-labelledby="risk">
        <h2 id="risk" className="font-display text-sm font-bold text-warn mb-2">
          Risk
        </h2>
        <p className="text-secondary text-xs leading-relaxed">
          Coins launched here can lose all their value. Use only money you can
          afford to lose. This is a software interface, not financial advice.
        </p>
      </section>

      <div className="flex flex-wrap gap-4 text-sm">
        <Link href="/terms" className="text-lime hover:underline min-h-[44px] flex items-center">
          Terms
        </Link>
        <Link href="/privacy" className="text-lime hover:underline min-h-[44px] flex items-center">
          Privacy
        </Link>
        <Link href="/security" className="text-lime hover:underline min-h-[44px] flex items-center">
          Security
        </Link>
      </div>
    </div>
  );
}
