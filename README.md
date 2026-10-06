# Pool Pilot

Non-custodial launch, 18-seat NFT liquidity, and swap UI for **Robinhood Chain (4663)**.

**You sign every transaction. Pool Pilot never holds funds.**

## Stack

- Next.js App Router · TypeScript · Tailwind CSS v4
- wagmi + viem + TanStack Query
- Live trending via GeckoTerminal (`/api/trending`)
- Design: `#141012` · lime `#c6f432` · Space Grotesk + Inter

## Develop

```bash
npm install
cp .env.example .env.local
npm run dev
```

## Features

| Area | Status |
|------|--------|
| Wallet connect (chain 4663) | Live |
| MCFL token balance read | Live (`0x21A9…Aed523`) |
| Chain trending / Uniswap / new pairs | Live (GeckoTerminal) |
| Launched on Pool Pilot | MCFL listed |
| Launch / sit / swap txs | Preview until factory ABIs |

## Routes

`/` · `/books` · `/launch` · `/swap` · `/portfolio` · `/about` · `/security` · `/leaderboard` · `/verify`

## Env

See `.env.example`. Never put private keys in client env.

## Non-custodial

Frontend builds calldata only. The connected wallet signs and broadcasts.
