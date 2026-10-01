import Link from "next/link";

export default function SecurityPage() {
  return (
    <div className="space-y-5 pb-4 max-w-lg">
      <h1 className="font-display text-xl font-bold">Security</h1>
      <p className="text-secondary text-sm leading-relaxed">
        Pool Pilot is non-custodial. You connect your own wallet and sign every transaction.
        We never hold funds, keys, or seed phrases.
      </p>
      <ul className="card p-4 space-y-3 text-sm text-secondary list-disc list-inside leading-relaxed">
        <li>Only your wallet can sign and broadcast transactions.</li>
        <li>Frontend builds calldata; it does not custody assets.</li>
        <li>Verify contracts and pool addresses on the explorer before you sign.</li>
        <li>Demo builds use mock addresses — do not treat them as production.</li>
      </ul>
      <Link href="/" className="btn btn-secondary">
        Back home
      </Link>
    </div>
  );
}
