"use client";

import { SeatRing } from "@/components/SeatRing";
import { CopyButton } from "@/components/CopyButton";

export function ShareCard({
  symbol,
  seatsTaken = 1,
  seatsTotal = 18,
  shareUrl,
}: {
  symbol: string;
  seatsTaken?: number;
  seatsTotal?: number;
  shareUrl: string;
}) {
  const text = `$${symbol} on Pool Pilot — ${seatsTaken}/${seatsTotal} seats filled. ${shareUrl}`;
  const xIntent = `https://x.com/intent/tweet?text=${encodeURIComponent(text)}`;
  const qrSrc = `https://api.qrserver.com/v1/create-qr-code/?size=140x140&bgcolor=1d1719&color=c6f432&data=${encodeURIComponent(shareUrl)}`;

  return (
    <section className="card p-5 space-y-4">
      <div className="flex items-center gap-4">
        <SeatRing
          taken={seatsTaken}
          total={seatsTotal}
          size={96}
          label={`${seatsTaken} of ${seatsTotal} seats`}
        />
        <div className="min-w-0 flex-1">
          <div className="font-display text-lg font-bold">${symbol}</div>
          <div className="text-sm text-secondary mt-0.5">
            {seatsTaken}/{seatsTotal} seats filled
          </div>
          <p className="text-xs text-muted mt-2 leading-relaxed">
            Share with the team. They sit chairs in their own wallets.
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={qrSrc}
          width={120}
          height={120}
          alt={`QR code for ${symbol} book`}
          className="rounded-[12px] border border-[var(--border)] bg-[var(--card)]"
        />
        <div className="flex-1 w-full space-y-2">
          <div className="text-[10px] text-muted uppercase tracking-wide">
            Invite link
          </div>
          <div className="flex gap-2">
            <code className="control flex-1 px-3 py-2.5 text-xs break-all min-h-[44px] flex items-center">
              {shareUrl}
            </code>
            <CopyButton text={shareUrl} />
          </div>
          <div className="flex gap-2 pt-1">
            <a
              href={xIntent}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary flex-1 text-sm min-h-[40px]"
            >
              Share on X
            </a>
            <CopyButton text={text} label="Copy post" />
          </div>
        </div>
      </div>
    </section>
  );
}
