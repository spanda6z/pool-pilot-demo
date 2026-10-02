# Pool Pilot

Non-custodial Uniswap v3 launch, 18-seat NFT liquidity, and swap UI for Robinhood Chain (4663).

**You sign every transaction. Pool Pilot never holds funds.**

## Stack

- Next.js App Router · TypeScript · Tailwind CSS v4
- Design: dark `#141012`, lime `#c6f432`, Space Grotesk + Inter
- Mobile-first bottom tabs

## Develop

```bash
npm install
npm run dev
```

## Data mode

| `NEXT_PUBLIC_DATA_MODE` | Behavior |
|-------------------------|----------|
| `placeholder` (default) | UI with sample books; quiet “Preview data” chip |
| `live` | Hide preview chip; wire indexer/RPC (not in this scaffold yet) |

See `.env.example`.

## Routes

| Path | Screen |
|------|--------|
| `/` | Home |
| `/books` | Explore |
| `/books/[id]` | Coin |
| `/sit/[id]` | Sit a chair |
| `/swap` | Swap |
| `/portfolio` | Seats |
| `/launch` → create → review → deploy | Launch flow |
| `/about` | Trust / built by |
| `/security` | Security model |
| `/verify-wallet` | Wallet verification template |

## Production checklist

1. Grant access to the live contract repo and ABIs
2. Connect wagmi + chain 4663
3. Fill About TODOs (name, wallet, signature, fees)
4. Replace logo mark `P` with brand asset
5. Set `NEXT_PUBLIC_DATA_MODE=live` when feeds are real
6. Counsel-approved terms and privacy

## Non-custodial rules

- No custody of keys, seeds, or funds
- Frontend builds calldata only
- User wallet signs and broadcasts
