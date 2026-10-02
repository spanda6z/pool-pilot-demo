# Pool Pilot

Non-custodial Uniswap v3 launch, 18-seat NFT liquidity, and swap UI for Robinhood Chain (4663).

**You sign every transaction. Pool Pilot never holds funds.**

## Stack

- Next.js App Router · TypeScript · Tailwind CSS v4
- **wagmi + viem + TanStack Query** — wallet connect on chain 4663
- Design: dark `#141012`, lime `#c6f432`, Space Grotesk + Inter

## Develop

```bash
npm install
cp .env.example .env.local
# optional: NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=...
npm run dev
```

## Wallet (wagmi)

| Piece | Path |
|-------|------|
| Chain | `src/lib/chains.ts` (id **4663**) |
| Config | `src/lib/wagmi.ts` (injected, Coinbase, optional WalletConnect) |
| Provider | `src/components/Providers.tsx` |
| Connect UI | `src/components/ConnectButton.tsx` |
| Wrong network | `src/components/NetworkBanner.tsx` |
| Guard hook | `src/hooks/useRequireWallet.ts` |
| ABI stubs | `src/lib/contracts.ts` |

**Connect works now** (MetaMask / injected / Coinbase).  
**On-chain mint / sit / swap** still need verified factory, seat, and router ABIs + addresses before `writeContract` is enabled.

## Env

See `.env.example`:

- `NEXT_PUBLIC_RPC_URL`
- `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` (optional)
- `NEXT_PUBLIC_BOOK_FACTORY` / `SEAT_NFT` / `SWAP_ROUTER` when live

Never put private keys in client env.

## Production checklist

1. `npm install` on Vercel (deps in package.json)
2. Add WalletConnect project id if you want mobile WC
3. Drop in verified ABIs + addresses in `src/lib/contracts.ts`
4. Replace preview `setTimeout` flows with `useWriteContract` / `useWaitForTransactionReceipt`
5. Fill About TODOs (name, signature, fees)
