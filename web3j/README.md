# Web3j related Patterns

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
Get to the web3j related patterns and set it up
```sh
cd eth-api-libs-usage-patterns/web3j/
mvn clean install
```

### Reading from Blockchain
Simple reading of generic content from Blockchain
```sh
mvn exec:java -Dexec.mainClass=com.patterns.Pattern1_ReadFromBlockchain
```

### Reading from a deployed Contract
Read data from the DemoToken contract deployed above
```sh
mvn exec:java -Dexec.mainClass=com.patterns.Pattern2_ReadFromContract
```

### Write to a deployed Contract
Write data to a contract by performing a transaction
```sh
mvn exec:java -Dexec.mainClass=com.patterns.Pattern3_WriteToContract
```

### Deploy a simple Contract
Deploy a simple contract using web3j
```sh
mvn exec:java -Dexec.mainClass=com.patterns.Pattern4_DeploySimpleContract
```