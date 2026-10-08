"use client";

import Link from "next/link";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { useAccount } from "wagmi";
import { TARGET_CHAIN_ID } from "@/lib/chains";
import { copyToClipboard } from "@/lib/copy";

type Profile = {
  displayName: string;
  bio: string;
  xHandle: string;
  website: string;
};

const EMPTY_PROFILE: Profile = { displayName: "", bio: "", xHandle: "", website: "" };

function short(address: string) {
  return `${address.slice(0, 6)}…${address.slice(-4)}`;
}

function initials(name: string, address?: string) {
  const source = name.trim() || address || "PP";
  const words = source.split(/\\s+/).filter(Boolean);
  return (words.length > 1 ? words[0][0] + words[1][0] : source.slice(0, 2)).toUpperCase();
}

function profileKey(address: string) {
  return `pool-pilot-profile:${address.toLowerCase()}`;
}

export default function ProfilePage() {
  const { address, isConnected, chainId } = useAccount();
  const [profile, setProfile] = useState<Profile>(EMPTY_PROFILE);
  const [saved, setSaved] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!address) {
      setProfile(EMPTY_PROFILE);
      return;
    }

    try {
      const raw = window.localStorage.getItem(profileKey(address));
      if (raw) setProfile({ ...EMPTY_PROFILE, ...JSON.parse(raw) });
    } catch {
      setProfile(EMPTY_PROFILE);
    }
  }, [address]);

  const avatar = useMemo(() => initials(profile.displayName, address), [profile.displayName, address]);

  const save = (event: FormEvent) => {
    event.preventDefault();
    if (!address) return;
    window.localStorage.setItem(profileKey(address), JSON.stringify(profile));
    setSaved(true);
    window.setTimeout(() => setSaved(false), 1800);
  };

  const copyAddress = async () => {
    if (!address) return;
    const ok = await copyToClipboard(address);
    if (ok) {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    }
  };

  if (!isConnected || !address) {
    return (
      <div className="py-8">
        <section className="card p-6 text-center">
          <div className="w-16 h-16 mx-auto rounded-full bg-[var(--lime)] text-white flex items-center justify-center font-display font-bold text-lg">
            P
          </div>
          <h1 className="font-display text-2xl font-bold mt-4">Your Pool Pilot profile</h1>
          <p className="text-sm text-muted mt-2 max-w-sm mx-auto">
            Connect your wallet to create a profile that travels with your wallet address.
          </p>
          <div className="mt-5">
            <Link href="/" className="btn btn-primary">Connect wallet</Link>
          </div>
          <p className="text-[11px] text-muted mt-4">
            Profile fields are stored locally in this browser. Pool Pilot does not custody your identity.
          </p>
        </section>
      </div>
    );
  }

  const wrongNetwork = chainId !== TARGET_CHAIN_ID;

  return (
    <div className="py-5 space-y-4">
      <section className="card p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-14 h-14 shrink-0 rounded-full bg-[var(--lime)] text-white flex items-center justify-center font-display font-bold text-lg shadow-sm">
              {avatar}
            </div>
            <div className="min-w-0">
              <p className="text-[10px] uppercase tracking-[.16em] text-muted">Wallet profile</p>
              <h1 className="font-display text-2xl font-bold truncate">
                {profile.displayName || "Anonymous Pilot"}
              </h1>
              <button
                type="button"
                onClick={copyAddress}
                className="text-xs text-muted font-mono hover:text-[var(--text)] transition-colors"
                title="Copy wallet address"
              >
                {copied ? "Copied" : short(address)}
              </button>
            </div>
          </div>
          <span className="badge shrink-0">{wrongNetwork ? "Wrong network" : "Connected"}</span>
        </div>

        {wrongNetwork && (
          <div className="mt-4 rounded-[14px] bg-[var(--warn)]/20 px-3 py-2 text-xs text-warn">
            Switch to Robinhood Chain (4663) before using on-chain features.
          </div>
        )}
      </section>

      <form onSubmit={save} className="card p-5 space-y-4">
        <div>
          <h2 className="font-display text-lg font-bold">Edit profile</h2>
          <p className="text-xs text-muted mt-1">
            Keep it simple. Your wallet remains the source of truth for on-chain actions.
          </p>
        </div>

        <label className="block">
          <span className="label">Display name</span>
          <input
            value={profile.displayName}
            onChange={(e) => setProfile((p) => ({ ...p, displayName: e.target.value.slice(0, 40) }))}
            placeholder="e.g. Bon"
            maxLength={40}
            className="input"
          />
        </label>

        <label className="block">
          <span className="label">Bio</span>
          <textarea
            value={profile.bio}
            onChange={(e) => setProfile((p) => ({ ...p, bio: e.target.value.slice(0, 160) }))}
            placeholder="What are you building?"
            maxLength={160}
            rows={3}
            className="input resize-none"
          />
          <span className="text-[10px] text-muted mt-1 block text-right">{profile.bio.length}/160</span>
        </label>

        <label className="block">
          <span className="label">X handle</span>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted text-sm">@</span>
            <input
              value={profile.xHandle.replace(/^@/, "")}
              onChange={(e) => setProfile((p) => ({ ...p, xHandle: e.target.value.replace(/\\s/g, "").slice(0, 30) }))}
              placeholder="yourhandle"
              maxLength={30}
              className="input pl-8"
            />
          </div>
        </label>

        <label className="block">
          <span className="label">Website</span>
          <input
            type="url"
            value={profile.website}
            onChange={(e) => setProfile((p) => ({ ...p, website: e.target.value.slice(0, 120) }))}
            placeholder="https://example.com"
            maxLength={120}
            className="input"
          />
        </label>

        <div className="flex items-center justify-between gap-3 pt-1">
          <p className="text-[10px] text-muted">Saved only on this device for now.</p>
          <button type="submit" className="btn btn-primary min-h-[44px] px-5">
            {saved ? "Saved" : "Save profile"}
          </button>
        </div>
      </form>

      <section className="card p-5">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2 className="font-display text-lg font-bold">Wallet identity</h2>
            <p className="text-xs text-muted mt-1">Used for signing and ownership checks.</p>
          </div>
          <span className="badge">Non-custodial</span>
        </div>
        <button
          type="button"
          onClick={copyAddress}
          className="mt-4 w-full text-left rounded-[14px] bg-[var(--control)] px-3 py-3 font-mono text-xs break-all hover:bg-[var(--control-strong)] transition-colors"
        >
          {address}
        </button>
        <div className="mt-4 flex gap-2">
          <Link href="/portfolio" className="btn btn-secondary flex-1">Portfolio</Link>
          <Link href="/security" className="btn btn-secondary flex-1">Security</Link>
        </div>
      </section>
    </div>
  );
}
