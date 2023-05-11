const Web3 = require("web3");
const Web3HttpProvider = require('web3-providers-http');
const config = require('../config/config-self.json');

// Setting up a JSON RPC Provider
var provider;
try {
  provider = new Web3HttpProvider(config.jsonrpc.endpoints.https);
  web3 = new Web3(provider);
} catch (err) {
  console.log("Cannot connect to Provider");
  console.log(err);
}

const main = async () => {
  var chainId = await web3.eth.getChainId();
  console.log(`Chain ID is: ${chainId}`);

  var gasPrice = await web3.eth.getGasPrice();
  console.log(`Gas Price is: ${BigInt(gasPrice).toString()} wei`);
}

main()