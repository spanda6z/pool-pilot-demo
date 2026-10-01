"use client";

import { useState } from "react";
import { explorerAddress, shortAddress } from "@/lib/mock-data";

export function Address({
  value,
  full = false,
  className = "",
}: {
  value: string;
  full?: boolean;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <span className={`inline-flex items-center gap-1.5 address-mono ${className}`}>
      <a
        href={explorerAddress(value)}
        target="_blank"
        rel="noopener noreferrer"
        className="text-cyan hover:underline"
        title={value}
      >
        {full ? value : shortAddress(value)}
      </a>
      <button
        type="button"
        onClick={copy}
        className="text-muted hover:text-cyan text-xs px-1"
        title="Copy address"
      >
        {copied ? "✓" : "⎘"}
      </button>
    </span>
  );
}
