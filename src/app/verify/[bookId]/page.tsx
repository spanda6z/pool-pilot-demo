import Link from "next/link";
import { notFound } from "next/navigation";
import { DemoBadge } from "@/components/DemoBadge";
import { Address } from "@/components/Address";
import { MOCK_BOOKS, CHAIN } from "@/lib/mock-data";

export default async function VerifyBookPage({
  params,
}: {
  params: Promise<{ bookId: string }>;
}) {
  const { bookId } = await params;
  const book = MOCK_BOOKS.find((b) => b.id === bookId);
  if (!book) notFound();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/verify" className="text-muted text-xs hover:text-cyan">
          ← Verify
        </Link>
        <DemoBadge />
      </div>

      <h1 className="text-xl font-black">{book.name} — Proof</h1>

      <section className="pixel-card p-5 space-y-3 text-xs">
        <Row label="Token" value={<Address value={book.tokenAddress} full />} />
        <Row label="Pool" value={<Address value={book.poolAddress} full />} />
        <Row label="Creator" value={<Address value={book.creator} full />} />
        <Row label="Status" value={book.status} />
        <Row label="Deployment" value={book.createdAt} />
        <Row label="Source block" value="demo / N/A" />
        <Row label="Owner / roles" value="Not disclosed (demo)" />
        <Row label="Pause authority" value="Unknown (demo)" />
        <Row label="Upgrade authority" value="Unknown (demo)" />
        <Row label="Fee authority" value="Unknown (demo)" />
        <Row label="Timelock" value="None (demo)" />
        <Row label="GitHub source" value="Not linked (demo)" />
        <Row label="Last refresh" value={new Date().toISOString()} />
        <Row label="Data source" value="demo" />
        <Row label="Methodology" value="Static mock registry only" />
      </section>

      <p className="text-[10px] text-coral">
        Confirm real contract addresses, permissions, and verification status on{" "}
        {CHAIN.explorer} before any mainnet use.
      </p>
    </div>
  );
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex flex-col sm:flex-row gap-1 py-1.5 border-b border-[var(--pixel-border)]">
      <span className="text-secondary w-40 shrink-0">{label}</span>
      <span className="text-primary break-all">{value}</span>
    </div>
  );
}
