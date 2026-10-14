# Pool Pilot — Seat NFT process

## On-chain flow

1. **Deploy factory** `PoolPilotBookFactory` with a treasury address.
2. **Create book** — user calls `createBook(name, symbol, minimumBid, seatCount, referrer)`.
   - Deploys `PoolPilotToken`, `PoolPilotSeatNFT`, `PoolPilotSeatVault`, `PoolPilotBook`.
3. **Sit (mint seat)** — user calls `PoolPilotBook.buySeat()` with `msg.value >= minimumBid`.
   - ETH → seat vault
   - ERC-721 seat NFT minted to caller (one per address)
   - `seatsTaken++`
4. **Finalize** — creator or factory calls `finalize()` → vault `settle()` splits ETH to treasury (fee) + creator.

## Frontend wiring

| Action | Contract | Function | When enabled |
|--------|----------|----------|--------------|
| Launch | Factory | `createBook` | `NEXT_PUBLIC_BOOK_FACTORY` set |
| Sit | Book | `buySeat` | Book has live `bookContract` address |
| Read seats | Book | `seatsTaken`, `seatCount` | Same |
| Own seats | Seat NFT | `balanceOf`, `ownerOf` | After mint |

## Env after deploy

```
NEXT_PUBLIC_BOOK_FACTORY=0x...
NEXT_PUBLIC_PROTOCOL_TREASURY=0x...
```

Per-book: set `bookContract` on the book record (or index `BookCreated` events).

## Non-custodial rule

The app only builds calldata. The user wallet signs and broadcasts. No private keys in Pool Pilot.
