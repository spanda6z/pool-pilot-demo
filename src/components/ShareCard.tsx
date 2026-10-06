"use client";

import { CopyButton } from "@/components/CopyButton";
import { SeatRing } from "@/components/SeatRing";
import { FoundingBadge } from "@/components/FoundingBadge";

interface ShareCardProps {
  symbol: string;
  seatsTaken: number;
  seatsTotal?: number;
  shareUrl: string;
  founding?: boolean;
}

export function ShareCard({
  symbol,
  seatsTaken,
  seatsTotal = 18,
  shareUrl,
  founding = true,
}: ShareCardProps) {
  const text = `$${symbol} on Pool Pilot — ${seatsTaken}/${seatsTotal} seats filled. Sit a chair with the team (you sign, non-custodial). ${shareUrl}`;
  const xIntent = `https://x.com/intent/tweet?text=${encodeURIComponent(text)}`;
  const tgIntent = `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(
    `$${symbol} on Pool Pilot — ${seatsTaken}/${seatsTotal} seats filled`
  )}`;
  const qrSrc = `https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(shareUrl)}`;

  return (
    <section className="card p-5 space-y-4" aria-label="Share card">
      <div className="flex flex-col sm:flex-row gap-5 items-center">
        <SeatRing
          taken={seatsTaken}
          total={seatsTotal}
          size={112}
          label={`${symbol} seats`}
        />
        <div className="flex-1 text-center sm:text-left space-y-1">
          <div className="flex items-center justify-center sm:justify-start gap-2 flex-wrap">
            <span className="font-display text-xl font-bold">${symbol}</span>
            {founding && <FoundingBadge />}
          </div>
          <div className="font-display text-sm text-secondary">
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
          <div className="flex flex-wrap gap-2 pt-1">
            <a
              href={xIntent}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary flex-1 text-sm min-h-[40px]"
            >
              Share on X
            </a>
            <a
              href={tgIntent}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary flex-1 text-sm min-h-[40px]"
            >
              Telegram
            </a>
            <CopyButton text={text} label="Copy post" />
          </div>
        </div>
      </div>
    </section>
  );
}
