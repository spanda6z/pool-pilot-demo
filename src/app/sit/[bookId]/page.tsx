"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { parseEther } from "viem";
import {
  useWaitForTransactionReceipt,
  useWriteContract,
  useReadContract,
  useSwitchChain,
} from "wagmi";
import { SeatRing } from "@/components/SeatRing";
import { ConnectButton } from "@/components/ConnectButton";
import { MOCK_BOOKS } from "@/lib/mock-data";
import { useRequireWallet } from "@/hooks/useRequireWallet";
import { TARGET_CHAIN_ID } from "@/lib/chains";
import { bookAbi, bookReady } from "@/lib/contracts";
import { CHAIN } from "@/lib/mock-data";

export default function SitPage() {
  const params = useParams();
  const book = MOCK_BOOKS.find((b) => b.id === params.bookId);
  const { isConnected, wrongNetwork, ready, address } = useRequireWallet();
  const { switchChain } = useSwitchChain();

  const bookAddress = book?.bookContract as `0x${string}` | undefined;
  const canMint = bookReady(bookAddress);

  const { data: seatsTakenOnChain } = useReadContract({
    address: bookAddress,
    abi: bookAbi,
    functionName: "seatsTaken",
    query: { enabled: canMint },
  });

  const { data: seatsTotalOnChain } = useReadContract({
    address: bookAddress,
    abi: bookAbi,
    functionName: "seatCount",
    query: { enabled: canMint },
  });

  const { data: minBidOnChain } = useReadContract({
    address: bookAddress,
    abi: bookAbi,
    functionName: "minimumBid",
    query: { enabled: canMint },
  });

  const {
    writeContract,
    data: txHash,
    isPending: isSigning,
    error: writeError,
    reset,
  } = useWriteContract();

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash: txHash,
  });

  useEffect(() => {
    reset();
  }, [bookAddress, reset]);

  if (!book) {
    return (
      <div className="card p-8 text-center">
        <p className="text-down text-sm">Book not found</p>
        <Link href="/books" className="text-lime text-sm mt-3 inline-block">
          ← Explore
        </Link>
      </div>
    );
  }

  const seatsTaken =
    seatsTakenOnChain !== undefined
      ? Number(seatsTakenOnChain)
      : Math.min(book.seatsTaken, 18);
  const seatsTotal =
    seatsTotalOnChain !== undefined ? Number(seatsTotalOnChain) : 18;
  const bidEth =
    minBidOnChain !== undefined
      ? (Number(minBidOnChain) / 1e18).toString()
      : book.seatPriceEth;
  const seatsLeft = Math.max(0, seatsTotal - seatsTaken);

  const sit = () => {
    if (!ready || !canMint || !bookAddress) return;
    const value =
      minBidOnChain !== undefined
        ? (minBidOnChain as bigint)
        : parseEther(book.seatPriceEth);
    writeContract({
      address: bookAddress,
      abi: bookAbi,
      functionName: "buySeat",
      value,
    });
  };

  return (
    <div className="max-w-md mx-auto space-y-5 pb-4">
      <Link
        href={`/books/${book.id}`}
        className="text-muted text-sm hover:text-secondary"
      >
        ← ${book.symbol}
      </Link>

      <div className="card p-6 flex flex-col items-center text-center gap-4">
        <SeatRing taken={seatsTaken} total={seatsTotal} size={140} />
        <div>
          <h1 className="font-display text-xl font-bold">Sit a chair</h1>
          <p className="text-secondary text-sm mt-1">
            ${book.symbol} · {book.name}
          </p>
        </div>

        <div className="w-full space-y-2 text-sm text-left">
          <div className="flex justify-between py-2 border-b border-[var(--divider)]">
            <span className="text-muted">Min bid</span>
            <span className="font-display font-bold text-lime">{bidEth} ETH</span>
          </div>
          <div className="flex justify-between py-2 border-b border-[var(--divider)]">
            <span className="text-muted">Seats left</span>
            <span className="font-display font-bold">
              {seatsLeft}/{seatsTotal}
            </span>
          </div>
          <div className="flex justify-between py-2">
            <span className="text-muted">You receive</span>
            <span>1 founding seat NFT</span>
          </div>
        </div>

        <p className="text-[11px] text-warn text-left w-full leading-relaxed">
          Irreversible once confirmed. One seat per wallet. Impermanent loss is
          possible. Confirm amount and contract in your wallet before you sign.
        </p>

        {!canMint && (
          <div className="w-full rounded-[14px] border border-[var(--warn)]/40 bg-[var(--warn)]/5 p-3 text-xs text-warn text-left leading-relaxed">
            <strong>Seat mint unavailable.</strong> This book has no live
            PoolPilotBook address yet. After you deploy the factory and create a
            book on-chain, set the book contract address and mint will open a
            real wallet signature for <code>buySeat()</code>.
          </div>
        )}

        {isSuccess && txHash ? (
          <div className="w-full space-y-3">
            <p className="text-up font-display font-bold">Seat minted</p>
            <a
              href={`${CHAIN.explorer}/tx/${txHash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-lime text-sm break-all"
            >
              View transaction
            </a>
            <Link href="/portfolio" className="btn btn-primary btn-full">
              View seats
            </Link>
          </div>
        ) : (
          <>
            {!isConnected && <ConnectButton />}
            {wrongNetwork && (
              <button
                type="button"
                className="btn btn-full text-sm bg-[var(--warn)] text-[var(--lime-text)]"
                onClick={() => switchChain({ chainId: TARGET_CHAIN_ID })}
              >
                Switch to Robinhood Chain
              </button>
            )}
            {ready && canMint && (
              <button
                type="button"
                onClick={sit}
                disabled={isSigning || isConfirming || seatsLeft === 0}
                className="btn btn-primary btn-full"
              >
                {isSigning && "Awaiting signature…"}
                {isConfirming && "Confirming…"}
                {!isSigning && !isConfirming && seatsLeft === 0 && "Sold out"}
                {!isSigning &&
                  !isConfirming &&
                  seatsLeft > 0 &&
                  `Sign and sit · ${bidEth} ETH`}
              </button>
            )}
            {ready && !canMint && (
              <div className="w-full rounded-[14px] bg-[var(--control)] p-4 text-center text-xs text-muted">
                Wallet connected. Mint stays closed until the book contract is
                live.
              </div>
            )}
            {writeError && (
              <p className="text-down text-xs text-left w-full">
                {writeError.message.slice(0, 200)}
              </p>
            )}
          </>
        )}

        {address && (
          <p className="text-[10px] text-muted font-mono">{address}</p>
        )}
      </div>

      <section className="card p-4 text-left space-y-2">
        <h2 className="font-display text-sm font-bold">How the seat NFT works</h2>
        <ol className="text-[11px] text-muted space-y-1.5 list-decimal pl-4 leading-relaxed">
          <li>
            You call <code className="text-secondary">buySeat()</code> on the
            book contract and send at least the minimum bid in ETH.
          </li>
          <li>
            ETH goes to the seat vault. The book mints one ERC-721 founding seat
            to your wallet (one seat per address).
          </li>
          <li>
            When seats fill (or the creator finalizes), the vault can settle
            funds to creator and protocol treasury.
          </li>
          <li>
            Pool Pilot never holds your keys. You sign in your own wallet.
          </li>
        </ol>
      </section>
    </div>
  );
}
