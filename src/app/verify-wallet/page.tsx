import type { Metadata } from "next";
import Link from "next/link";
import { CopyButton } from "@/components/CopyButton";

export const metadata: Metadata = {
  title: "Pool Pilot wallet verification",
  description:
    "Verify the project wallet signature for Pool Pilot. Message and signature must match poolpilot.xyz/about.",
};

/** Stand-in page for mcflamingo.com/pool-pilot until that site is updated. */
const PROJECT_WALLET = "[TODO: 0x project wallet]";
const SIGNED_MESSAGE = "[TODO: exact signed message text]";
const SIGNATURE = "[TODO: 0x signature]";

export default function VerifyWalletPage() {
  return (
    <div className="space-y-6 pb-8 max-w-lg">
      <div>
        <h1 className="font-display text-xl font-bold mb-2">
          Pool Pilot wallet verification
        </h1>
        <p className="text-secondary text-sm leading-relaxed">
          This page is meant to live on mcflamingo.com. The owner of McFlamingo
          builds poolpilot.xyz. The signed message below must match{" "}
          <Link href="/about" className="text-lime hover:underline">
            poolpilot.xyz/about
          </Link>{" "}
          exactly.
        </p>
      </div>

      <section className="card p-5 space-y-4">
        <Field label="Project wallet" value={PROJECT_WALLET} />
        <Field label="Signed message" value={SIGNED_MESSAGE} />
        <Field label="Signature" value={SIGNATURE} />
      </section>

      <section className="card p-5 space-y-3">
        <h2 className="font-display text-sm font-bold">How to check</h2>
        <ol className="text-sm text-secondary space-y-2 list-decimal list-inside leading-relaxed">
          <li>Copy the signed message and the signature.</li>
          <li>
            Open a public verifier such as Etherscan → More → Verify Signature
            (or an equivalent tool for your chain).
          </li>
          <li>Paste the message, signature, and expected address.</li>
          <li>
            Confirm the recovered address matches the project wallet above.
          </li>
        </ol>
        <p className="text-xs text-muted leading-relaxed">
          Never enter a private key or seed phrase into any site. The signature
          is produced in the owner&apos;s wallet and only the text is published.
        </p>
      </section>

      <p className="text-sm text-secondary">
        Product site:{" "}
        <a href="https://poolpilot.xyz" className="text-lime hover:underline">
          poolpilot.xyz
        </a>
      </p>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="space-y-1.5">
      <div className="text-[10px] text-muted uppercase tracking-wide">{label}</div>
      <div className="flex gap-2 items-stretch">
        <code className="control flex-1 px-3 py-2.5 text-xs font-mono break-all flex items-center min-h-[44px]">
          {value}
        </code>
        <CopyButton text={value} />
      </div>
    </div>
  );
}
