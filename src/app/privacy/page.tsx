import Link from "next/link";

export default function PrivacyPage() {
  return (
    <div className="max-w-lg space-y-5 pb-4">
      <h1 className="font-display text-xl font-bold">Privacy</h1>
      <section className="card p-5 text-sm text-secondary space-y-3 leading-relaxed">
        <p>
          We do not collect private keys or seed phrases. Wallet addresses may
          appear in on-chain activity and public indexers when you use the
          product.
        </p>
        <p>
          Server logs are minimized. We do not sell personal data. Third-party
          RPCs and explorers have their own policies.
        </p>
        <p className="text-xs text-muted">
          Replace with a full policy before a public launch.
        </p>
      </section>
      <Link href="/" className="btn btn-secondary">
        Home
      </Link>
    </div>
  );
}
