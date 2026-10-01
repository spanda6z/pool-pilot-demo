"use client";

import { useState } from "react";

export function CopyButton({ text, label = "Copy" }: { text: string; label?: string }) {
  const [done, setDone] = useState(false);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setDone(true);
      setTimeout(() => setDone(false), 1500);
    } catch {
      setDone(false);
    }
  };

  return (
    <button
      type="button"
      onClick={onCopy}
      className="btn btn-secondary text-xs min-h-[44px] px-3 shrink-0"
      aria-label={done ? "Copied" : `Copy ${label}`}
    >
      {done ? "Copied" : label}
    </button>
  );
}
