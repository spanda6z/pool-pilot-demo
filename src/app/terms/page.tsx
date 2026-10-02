import Link from "next/link";

export default function TermsPage() {
  return (
    <div className="max-w-lg space-y-5 pb-4">
      <h1 className="font-display text-xl font-bold">Terms of use</h1>
      <section className="card p-5 text-sm text-secondary space-y-3 leading-relaxed">
        <p>
          Pool Pilot is non-custodial software. You connect your own wallet and
          sign every transaction. We never hold funds, keys, or seed phrases.
        </p>
        <p>
          You are solely responsible for your wallet, keys, and transactions.
          Coins launched or traded here can lose all their value. Use only money
          you can afford to lose.
        </p>
        <p>
          This software is provided as a tool, not financial advice. Nothing on
          the site is an offer to sell securities or a promise of returns.
        </p>
        <p className="text-xs text-muted">
          Have counsel review and replace this summary before a public launch.
        </p>
      </section>
      <Link href="/" className="btn btn-secondary">
        Home
      </Link>
    </div>
  );
}
