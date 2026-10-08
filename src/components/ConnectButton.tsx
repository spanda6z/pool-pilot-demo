"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  useAccount,
  useConnect,
  useDisconnect,
  useChainId,
  useSwitchChain,
} from "wagmi";
import { TARGET_CHAIN_ID } from "@/lib/chains";
import { copyToClipboard } from "@/lib/copy";

function short(addr: string) {
  return `${addr.slice(0, 6)}…${addr.slice(-4)}`;
}

export function ConnectButton() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [copied, setCopied] = useState(false);
  const { address, isConnected, isConnecting } = useAccount();
  const { connectors, connect, isPending, error } = useConnect();
  const { disconnect } = useDisconnect();
  const chainId = useChainId();
  const { switchChain, isPending: isSwitching } = useSwitchChain();

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <button type="button" className="btn btn-primary text-sm min-h-[40px] px-4" disabled>
        Connect
      </button>
    );
  }

  if (isConnected && address) {
    const wrongNetwork = chainId !== TARGET_CHAIN_ID;

    const handleCopy = async () => {
      const ok = await copyToClipboard(address);
      if (ok) {
        setCopied(true);
        window.setTimeout(() => setCopied(false), 1600);
      }
    };

    return (
      <div className="relative flex items-center gap-2">
        {wrongNetwork && (
          <button
            type="button"
            onClick={() => switchChain({ chainId: TARGET_CHAIN_ID })}
            disabled={isSwitching}
            className="btn text-sm min-h-[40px] px-3 bg-[var(--warn)] text-[var(--lime-text)]"
          >
            {isSwitching ? "Switching…" : "Switch network"}
          </button>
        )}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="btn btn-ghost text-sm min-h-[40px] px-4 font-mono"
          aria-label={`Wallet ${short(address)}`}
          aria-expanded={open}
          aria-haspopup="menu"
        >
          {short(address)}
        </button>
        {open && (
          <>
            <button type="button" className="fixed inset-0 z-40 cursor-default" aria-label="Close menu" onClick={() => setOpen(false)} />
            <div role="menu" aria-label="Wallet menu" className="absolute right-0 top-full mt-2 z-50 card p-2 min-w-[220px]">
              <div className="px-3 py-2 text-[10px] text-muted font-mono break-all">{address}</div>
              <Link
                href="/profile"
                role="menuitem"
                onClick={() => setOpen(false)}
                className="block w-full text-left px-3 py-2.5 text-sm hover:bg-[var(--control)] rounded-[12px] min-h-[44px]"
              >
                Profile
              </Link>
              {wrongNetwork && (
                <p className="px-3 py-1 text-[11px] text-warn">Wrong network — switch to Robinhood Chain (4663)</p>
              )}
              <button
                type="button"
                role="menuitem"
                onClick={async () => {
                  await handleCopy();
                  setOpen(false);
                }}
                className="w-full text-left px-3 py-2.5 text-sm hover:bg-[var(--control)] rounded-[12px] min-h-[44px]"
              >
                {copied ? "Copied" : "Copy address"}
              </button>
              <button
                type="button"
                role="menuitem"
                className="w-full text-left px-3 py-2.5 text-sm text-down hover:bg-[var(--control)] rounded-[12px] min-h-[44px]"
                onClick={() => {
                  disconnect();
                  setOpen(false);
                }}
              >
                Disconnect
              </button>
            </div>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        disabled={isConnecting || isPending}
        className="btn btn-primary text-sm min-h-[40px] px-4"
      >
        {isConnecting || isPending ? "Connecting…" : "Connect"}
      </button>
      {open && (
        <>
          <button type="button" className="fixed inset-0 z-40 cursor-default" aria-label="Close menu" onClick={() => setOpen(false)} />
          <div role="menu" aria-label="Wallet connectors" className="absolute right-0 top-full mt-2 z-50 card p-2 min-w-[220px]">
            <div className="px-3 py-2">
              <div className="font-display font-bold text-sm">Connect wallet</div>
              <p className="text-[11px] text-muted mt-0.5">Choose an available wallet provider.</p>
            </div>
            {connectors.map((c) => (
              <button
                key={c.uid}
                type="button"
                role="menuitem"
                disabled={isPending}
                onClick={() => {
                  connect({ connector: c });
                  setOpen(false);
                }}
                className="w-full text-left px-3 py-2.5 text-sm hover:bg-[var(--control)] rounded-[12px] min-h-[44px]"
              >
                {c.name}
              </button>
            ))}
            {connectors.length === 0 && <p className="px-3 py-2 text-[11px] text-muted">No compatible wallet connectors are available.</p>}
            {error && <p className="px-3 py-2 mt-1 rounded-[10px] bg-[var(--down)]/10 text-[11px] text-down" role="alert">{error.message}</p>}
          </div>
        </>
      )}
    </div>
  );
}
