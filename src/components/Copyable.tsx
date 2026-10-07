"use client";

import { useState } from "react";
import { copyToClipboard } from "@/lib/copy";

/**
 * Click the text itself to copy. Shows brief "Copied" feedback.
 */
export function Copyable({
  text,
  display,
  className = "",
  mono = true,
}: {
  text: string;
  display?: string;
  className?: string;
  mono?: boolean;
}) {
  const [status, setStatus] = useState<"idle" | "copied" | "failed">("idle");

  const onCopy = async () => {
    const ok = await copyToClipboard(text);
    setStatus(ok ? "copied" : "failed");
    window.setTimeout(() => setStatus("idle"), 1600);
  };

  return (
    <button
      type="button"
      onClick={onCopy}
      title={status === "copied" ? "Copied" : "Click to copy"}
      className={`text-left w-full min-h-[44px] px-3 py-2.5 rounded-[12px] border border-[var(--border)] bg-[var(--control)] hover:border-[var(--text-muted)] transition-colors ${
        mono ? "font-mono text-xs break-all" : "text-sm"
      } ${className}`}
      aria-label={status === "copied" ? "Copied" : `Copy ${text}`}
    >
      {status === "copied" ? (
        <span className="text-lime">Copied</span>
      ) : status === "failed" ? (
        <span className="text-down">Copy failed</span>
      ) : (
        display ?? text
      )}
    </button>
  );
}
