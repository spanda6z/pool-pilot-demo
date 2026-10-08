import type { ReactNode } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
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
    <div className="space-y-6 pb-4 max-w-lg">
      <div>
        <Link
          href="/verify"
          className="text-muted text-xs hover:text-secondary min-h-[44px] inline-flex items-center"
        >
          ← Projects
        </Link>
        <h1 className="font-display text-xl font-bold mt-2">
          {book.name} — proof
        </h1>
        <p className="text-secondary text-sm mt-1">
          On-chain references for this book. Confirm addresses on the explorer
          before you sign.
        </p>
      </div>

      <section className="card p-5 space-y-0 text-sm divide-y divide-[var(--divider)]">
        <Row label="Token" value={<Address value={book.tokenAddress} full />} />
        <Row label="Pool" value={<Address value={book.poolAddress} full />} />
        <Row label="Creator" value={<Address value={book.creator} full />} />
        <Row label="Status" value={book.status} />
        <Row label="Created" value={book.createdAt} />
        <Row label="Data source" value="Registry until indexer is live" />
      </section>

      <p className="text-[11px] text-muted leading-relaxed">
        Confirm contracts and permissions on{" "}
        <a
          href={CHAIN.explorer}
          target="_blank"
          rel="noopener noreferrer"
          className="text-lime"
        >
          {CHAIN.explorer.replace("https://", "")}
        </a>{" "}
        before mainnet use.
      </p>
    </div>
  );
}

function Row({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="flex flex-col sm:flex-row gap-1 py-3">
      <span className="text-muted text-xs w-32 shrink-0 uppercase tracking-wide">
        {label}
      </span>
      <span className="break-all">{value}</span>
    </div>
  );
}
