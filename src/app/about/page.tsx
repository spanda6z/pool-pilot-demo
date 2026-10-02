import Link from "next/link";
import type { Metadata } from "next";
import { CopyButton } from "@/components/CopyButton";

export const metadata: Metadata = {
  title: "About — Pool Pilot",
  description:
    "Built by a real person. Non-custodial launch and seats on Robinhood Chain. You sign every transaction.",
};

const FEES: { label: string; receiver: string }[] = [
  { label: "[TODO: fee name]", receiver: "[TODO: who receives it]" },
];

const PROJECT_WALLET = "[TODO: 0x project wallet]";
const OWNER_NAME = "[TODO: your name]";
const X_HANDLE = "cheferikosol";
const GITHUB_REPO = "https://github.com/MCFLAMINGO/pool-pilot";
const MCFLAMINGO = "https://mcflamingo.com";
const VERIFY_PAGE = "https://mcflamingo.com/pool-pilot";
const SECURITY_DOC = "[TODO: link to SECURITY.md]";
const CONTACT_EMAIL = "[TODO: email]";
const MCFL_HOLDINGS = "[TODO: amount or “some”]";
const MCFL_RECEIVES_FEES = "[TODO: yes or no]";
const SIGNED_MESSAGE = "[TODO: exact signed message text]";
const SIGNATURE = "[TODO: 0x signature]";
const MCFL_TOKEN = "0x21A91215fbFc4fc002B07cc87698A6fC01Aed523";

export default function AboutPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: OWNER_NAME.includes("TODO") ? undefined : OWNER_NAME,
    url: "https://poolpilot.xyz",
    sameAs: [MCFLAMINGO, `https://x.com/${X_HANDLE}`, GITHUB_REPO],
    jobTitle: "Owner",
    worksFor: {
      "@type": "Organization",
      name: "McFlamingo",
      url: MCFLAMINGO,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Ponte Vedra Beach",
        addressRegion: "FL",
        addressCountry: "US",
      },
    },
  };

  return (
    <div className="space-y-8 pb-8 max-w-lg">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div>
        <h1 className="font-display text-2xl font-bold mb-1">About</h1>
        <p className="text-secondary text-sm leading-relaxed">
          Pool Pilot is a non-custodial tool on Robinhood Chain. You sign every
          transaction. Pool Pilot never holds your funds.
        </p>
      </div>

      <section className="card p-5 space-y-4" aria-labelledby="built-by">
        <h2 id="built-by" className="font-display text-base font-bold">
          Built by a real person
        </h2>
        <div className="flex gap-4 items-start">
          <div
            className="w-16 h-16 rounded-[14px] bg-[var(--control)] border border-[var(--border)] flex items-center justify-center text-muted text-xs shrink-0"
            role="img"
            aria-label="Photo placeholder"
          >
            Photo
          </div>
          <div className="min-w-0 space-y-1">
            <div className="font-display font-bold text-sm">{OWNER_NAME}</div>
            <p className="text-secondary text-xs leading-relaxed">
              Owner of McFlamingo, Ponte Vedra Beach, Florida, open since 2019.
              Builds poolpilot.xyz.
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <a href={MCFLAMINGO} target="_blank" rel="noopener noreferrer" className="btn btn-secondary text-sm min-h-[40px]">
            mcflamingo.com
          </a>
          <a href={`https://x.com/${X_HANDLE}`} target="_blank" rel="noopener noreferrer" className="btn btn-ghost text-sm min-h-[40px]">
            @{X_HANDLE}
          </a>
          <a href={GITHUB_REPO} target="_blank" rel="noopener noreferrer" className="btn btn-ghost text-sm min-h-[40px]">
            GitHub
          </a>
        </div>
      </section>

      <section className="card p-5 space-y-4" aria-labelledby="money">
        <h2 id="money" className="font-display text-base font-bold">
          How Pool Pilot works with your money
        </h2>
        <ul className="text-sm text-secondary space-y-2 list-disc list-inside leading-relaxed">
          <li>You sign every transaction with your own wallet.</li>
          <li>Pool Pilot never holds funds, keys, or seed phrases.</li>
          <li>The frontend builds transactions; only your wallet can broadcast them.</li>
        </ul>
        <div>
          <h3 className="text-xs text-muted uppercase tracking-wide mb-2">Fees</h3>
          <div className="border border-[var(--border)] rounded-[12px] overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[var(--control)] text-left text-xs text-muted">
                  <th scope="col" className="p-3 font-medium">Fee</th>
                  <th scope="col" className="p-3 font-medium">Receives</th>
                </tr>
              </thead>
              <tbody>
                {FEES.map((row, i) => (
                  <tr key={i} className="border-t border-[var(--divider)]">
                    <td className="p-3 text-secondary">{row.label}</td>
                    <td className="p-3 text-secondary">{row.receiver}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="text-sm text-secondary leading-relaxed space-y-1">
          <p><span className="text-muted">MCFL holdings: </span>{MCFL_HOLDINGS}</p>
          <p><span className="text-muted">MCFL receives Pool Pilot fees: </span>{MCFL_RECEIVES_FEES}</p>
        </div>
      </section>

      <section className="card p-4" aria-labelledby="risk">
        <h2 id="risk" className="font-display text-sm font-bold text-warn mb-2">Risk</h2>
        <p className="text-secondary text-xs leading-relaxed">
          Coins launched here can lose all their value. Use only money you can
          afford to lose. This is a tool, not financial advice.
        </p>
      </section>

      <section className="card p-5 space-y-2" aria-labelledby="mcfl-token">
        <h2 id="mcfl-token" className="font-display text-base font-bold">
          MCFL token
        </h2>
        <p className="text-xs text-secondary leading-relaxed">
          McFlamingo (MCFL) is an ERC-20 on Robinhood Chain. Decimals: 18.
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
          View on explorer
        </a>
      </section>

      <section className="card p-5 space-y-3" aria-labelledby="wallet">
        <h2 id="wallet" className="font-display text-base font-bold">Verified wallet</h2>
        <p className="text-xs text-muted leading-relaxed">
          Project address. Check the signature on McFlamingo. The signed message
          must match exactly on both sites.
        </p>
        <div className="space-y-1.5">
          <div className="text-[10px] text-muted uppercase tracking-wide">Address</div>
          <div className="flex gap-2 items-stretch">
            <code className="control flex-1 px-3 py-2.5 text-xs font-mono break-all flex items-center min-h-[44px]">{PROJECT_WALLET}</code>
            <CopyButton text={PROJECT_WALLET} label="Copy" />
          </div>
        </div>
        <div className="space-y-1.5">
          <div className="text-[10px] text-muted uppercase tracking-wide">Signed message</div>
          <div className="flex gap-2 items-stretch">
            <code className="control flex-1 px-3 py-2.5 text-xs font-mono break-all flex items-center min-h-[44px]">{SIGNED_MESSAGE}</code>
            <CopyButton text={SIGNED_MESSAGE} label="Copy" />
          </div>
        </div>
        <div className="space-y-1.5">
          <div className="text-[10px] text-muted uppercase tracking-wide">Signature</div>
          <div className="flex gap-2 items-stretch">
            <code className="control flex-1 px-3 py-2.5 text-xs font-mono break-all flex items-center min-h-[44px]">{SIGNATURE}</code>
            <CopyButton text={SIGNATURE} label="Copy" />
          </div>
        </div>
        <a href={VERIFY_PAGE} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-full text-sm">
          Open verification on mcflamingo.com
        </a>
      </section>

      <section className="flex flex-wrap gap-4 text-sm">
        <Link href="/security" className="text-lime hover:underline min-h-[44px] flex items-center">Security</Link>
        <span className="text-muted min-h-[44px] flex items-center text-xs">Security doc: {SECURITY_DOC}</span>
        <span className="text-muted min-h-[44px] flex items-center text-xs">Contact: {CONTACT_EMAIL}</span>
      </section>

      <p className="text-[11px] text-muted leading-relaxed border-t border-[var(--divider)] pt-4">
        Built by {OWNER_NAME} ·{" "}
        <a href={MCFLAMINGO} target="_blank" rel="noopener noreferrer" className="text-secondary hover:underline">McFlamingo</a>
        {" "}· Ponte Vedra Beach, FL ·{" "}
        <a href={`https://x.com/${X_HANDLE}`} target="_blank" rel="noopener noreferrer" className="text-secondary hover:underline">@{X_HANDLE}</a>
      </p>
    </div>
  );
}
