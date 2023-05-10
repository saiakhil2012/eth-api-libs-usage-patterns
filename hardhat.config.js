require("@nomiclabs/hardhat-waffle");
module.exports = {
  defaultNetwork: "testnet",
  networks: {
    testnet: {
      url: "https://127.0.0.1:8545",
    }
  },
  solidity: {
    version: "0.8.9",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  paths: {
    sources: "./contracts",
  },
  mocha: {
    timeout: 40000
  }
}
