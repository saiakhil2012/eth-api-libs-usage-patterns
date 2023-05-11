const { ethers } = require("ethers");
const config = require('../config/config-self.json');

// Setting up a JSON RPC Provider
var provider;
try {
  provider = new ethers.providers.JsonRpcProvider(config.jsonrpc.endpoints.https);
} catch (err) {
  console.log("Cannot connect to Provider");
  console.log(err);
}

const main = async () => {
  var chainId = await provider.send("eth_chainId", []);
  console.log(`Chain ID is: ${chainId}`);

  var gasPrice = await provider.send("eth_gasPrice");
  console.log(`Gas Price is: ${BigInt(gasPrice).toString()} wei`);
}

main()