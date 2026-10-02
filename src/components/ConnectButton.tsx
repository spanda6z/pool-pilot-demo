"use client";

import { useEffect, useState } from "react";
import {
  useAccount,
  useConnect,
  useDisconnect,
  useChainId,
  useSwitchChain,
} from "wagmi";
import { TARGET_CHAIN_ID } from "@/lib/chains";

function short(addr: string) {
  return `${addr.slice(0, 6)}…${addr.slice(-4)}`;
}

export function ConnectButton() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
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
          aria-expanded={open}
          aria-haspopup="menu"
        >
          {short(address)}
        </button>
        {open && (
          <>
            <button
              type="button"
              className="fixed inset-0 z-40 cursor-default"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
            />
            <div
              role="menu"
              className="absolute right-0 top-full mt-2 z-50 card p-2 min-w-[180px] shadow-none"
            >
              <p className="px-3 py-2 text-[10px] text-muted font-mono break-all">
                {address}
              </p>
              {wrongNetwork && (
                <p className="px-3 py-1 text-[11px] text-warn">
                  Wrong network — switch to Robinhood Chain (4663)
                </p>
              )}
              <button
                type="button"
                role="menuitem"
                className="btn btn-secondary btn-full text-sm min-h-[40px]"
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
          <button
            type="button"
            className="fixed inset-0 z-40 cursor-default"
            aria-label="Close wallet list"
            onClick={() => setOpen(false)}
          />
          <div className="absolute right-0 top-full mt-2 z-50 card p-2 min-w-[220px] space-y-1">
            <p className="px-2 py-1 text-[10px] text-muted">
              You sign. Pool Pilot never holds keys.
            </p>
            {connectors.map((c) => (
              <button
                key={c.uid}
                type="button"
                className="btn btn-secondary btn-full text-sm min-h-[44px] justify-start"
                disabled={isPending}
                onClick={() => {
                  connect({ connector: c, chainId: TARGET_CHAIN_ID });
                  setOpen(false);
                }}
              >
                {c.name}
              </button>
            ))}
            {error && (
              <p className="px-2 py-1 text-[11px] text-down break-words">
                {error.message}
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
}
