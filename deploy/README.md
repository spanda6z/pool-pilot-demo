# Pool Pilot testnet deployment

Robinhood Chain Testnet uses chain ID **46630** and the public RPC `https://rpc.testnet.chain.robinhood.com`. The testnet explorer is `https://explorer.testnet.chain.robinhood.com`.

Robinhood recommends deploying to testnet before mainnet. Never commit a private key; use a throwaway deployer key for testing.

## Deployment

Set deployment credentials only in your local shell or a secure CI secret store. Never commit them or expose them to the browser.

Install dependencies and run the local build/tests first:

    forge install OpenZeppelin/openzeppelin-contracts --no-commit
    forge install foundry-rs/forge-std --no-commit
    forge build
    forge test -vv

Then deploy `PoolPilotBookFactory` with Foundry using the Robinhood Chain Testnet RPC and a treasury address controlled by the project. After deployment, record the factory address and verify the factory and created child contracts with Blockscout before enabling frontend transaction flow.

## Production gate

The repository intentionally contains no deployment keys. The frontend remains fail-closed until deployed addresses are reviewed, verified, and configured.
