"use client";

import { useState, type MouseEvent } from "react";
import { copyToClipboard } from "@/lib/copy";

export function CopyButton({
  text,
  label = "Copy",
  className = "",
}: {
  text: string;
  label?: string;
  className?: string;
}) {
  const [status, setStatus] = useState<"idle" | "copied" | "failed">("idle");

  const onCopy = async (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const ok = await copyToClipboard(text);
    setStatus(ok ? "copied" : "failed");
    window.setTimeout(() => setStatus("idle"), 1600);
  };

  const display =
    status === "copied" ? "Copied" : status === "failed" ? "Failed" : label;

  return (
    <button
      type="button"
      onClick={onCopy}
      className={`btn btn-secondary text-xs min-h-[44px] px-3 shrink-0 ${className}`}
      aria-label={status === "copied" ? "Copied to clipboard" : `Copy ${label}`}
    >
      {display}
    </button>
  );
}
