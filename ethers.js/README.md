# Ethers.js related Patterns

## Deploy Contract using Hardhat
Deploy an ERC20 based DemoToken
```sh
cd eth-api-labs-usage-patterns/
# Update the hardhat.config.js file with details of your Blockchain Network
npx hardhat run scripts/deploy.js
```
Note: Make a note of Contract Address of Greetings Smart Contract from the output of above command

---

## Update the dApp related config file
Update following parameters in the config file to run the patterns,
- `endpoints`: JSON RPC Endpoint
- `contractAddress`: Contract Address of the above deployed DemoToken
- `mainAccountPrivateKey`: Private key of an account which can afford some gas on the Blockchain Network
- `additionalAccountPrivateKey`: Private key of another account which can afford some gas on the Blockchain Network

---

## Patterns
Get to the ethers.js related patterns and set it up
```sh
cd eth-api-libs-usage-patterns/ethers.js/
npm install
```

### Reading from Blockchain
Simple reading of generic content from Blockchain
```sh
node 1-read-from-blockchain.js
```

### Reading from a deployed Contract
Read data from the DemoToken contract deployed above
```sh
node 2-read-from-contract.js
```

### Write to a deployed Contract
Write data to a contract by performing a transaction
```sh
node 3-write-to-contract.js
```

### Deploy a simple Contract
Deploy a simple contract using solc and ethers.js
```sh
node 4-deploy-simple-contract.js
```

### Perform Batch Transactions
Perform few batch transactions
```sh
node 5-batch-transactions.js
```