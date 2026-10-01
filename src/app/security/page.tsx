import Link from "next/link";
import { SITE } from "@/lib/config";

export default function SecurityPage() {
  return (
    <div className="space-y-5 pb-4 max-w-lg">
      <h1 className="font-display text-xl font-bold">Security</h1>
      <p className="text-secondary text-sm leading-relaxed">
        Pool Pilot is non-custodial. You connect your own wallet and sign every
        transaction. We never hold funds, keys, or seed phrases.
      </p>
      <ul className="card p-4 space-y-3 text-sm text-secondary list-disc list-inside leading-relaxed">
        <li>Only your wallet can sign and broadcast transactions.</li>
        <li>The frontend builds calldata; it does not custody assets.</li>
        <li>
          Verify contract and pool addresses on the{" "}
          <a
            href={SITE.explorer}
            target="_blank"
            rel="noopener noreferrer"
            className="text-lime hover:underline"
          >
            explorer
          </a>{" "}
          before you sign.
        </li>
        <li>
          Coins can go to zero. Use only money you can afford to lose. This is a
          tool, not financial advice.
        </li>
      </ul>
      <div className="flex flex-wrap gap-3">
        <Link href="/about" className="btn btn-secondary">
          About and fees
        </Link>
        <Link href="/" className="btn btn-ghost">
          Home
        </Link>
      </div>
    </div>
  );
}
