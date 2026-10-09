# Pool Pilot

Pool Pilot launch, founding-seat, and swap UI for Robinhood Chain (4663).

## Solidity

The `contracts/` directory contains the initial Pool Pilot protocol implementation:
- PoolPilotBookFactory — creates and indexes launches
- PoolPilotBook — fixed-supply token and founding-seat lifecycle
- PoolPilotToken — 1B fixed supply
- PoolPilotSeatNFT — founding seat ERC-721
- PoolPilotSeatVault — ETH escrow and protocol-fee settlement

Install Foundry dependencies and run `forge test -vv`.

These contracts are unaudited. Do not deploy to mainnet or enable production launch transactions until the bytecode is reviewed, deployment parameters are finalized, and deployed contracts are verified.

## Frontend

The frontend remains fail-closed until Pool Pilot contract addresses are deployed and configured:
- NEXT_PUBLIC_BOOK_FACTORY
- NEXT_PUBLIC_SEAT_VAULT
- NEXT_PUBLIC_SEAT_NFT
- NEXT_PUBLIC_PROTOCOL_TREASURY

Never put private keys in client env.
