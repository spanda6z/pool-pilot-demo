# Pool Pilot (DEMO)

Non-custodial Uniswap v3 launch · NFT liquidity-seat · swap UI on Robinhood Chain (4663).

**This is a mock / demo build.** All on-chain data is fake and clearly labeled DEMO. No real contracts are called. No private keys are stored. No funds can be moved.

## Quick start

```bash
cd pool-pilot
npm install
npm run dev
```

Open http://localhost:3000

## Routes implemented

| Route | Status |
|-------|--------|
| `/` | Trust Spine home |
| `/books` | Browse books |
| `/books/[bookId]` | Book detail |
| `/sit/[bookId]` | Take a seat (mock tx flow) |
| `/swap` | Swap (mock quote + tx) |
| `/portfolio` | Portfolio + seats |
| `/portfolio/seats/[tokenId]` | Seat detail |
| `/verify` | Contract registry |
| `/verify/[bookId]` | Book proof |
| `/launch` → create → review → deploy | Creator wizard (mock) |
| `/about` `/security` `/terms` `/privacy` | Static |

## Design

- Dark navy pixel-art command center
- Cyan = liquidity / live reads
- Gold = seats
- ETH blue = swaps
- Mint = verified
- Coral = warnings / DEMO

## Non-custodial rules (enforced in UI)

1. Never custody keys or funds
2. Frontend only constructs calldata (mock here)
3. Every write shows target, amounts, fees, risk
4. DEMO badge whenever data is not live
5. Full addresses + explorer links

## Next steps for real product

1. Confirm smart-contract addresses & ABIs
2. Add wagmi + viem + real RPC
3. Wire indexer (Goldsky/Envio/Subsquid)
4. Replace mock data with API + RPC reads
5. Transaction simulation before signature
6. Production security review

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS v4
- Pixel design system in globals.css
- Mock data in src/lib/mock-data.ts
