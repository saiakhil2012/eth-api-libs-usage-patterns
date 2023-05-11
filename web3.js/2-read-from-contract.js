const Web3 = require("web3");
const Web3HttpProvider = require('web3-providers-http');
const config = require('../config/config-self.json');
const contractArtifact = require('../artifacts/contracts/DemoToken.sol/DemoToken.json');

// Contract Address of DemoToken
const CONTRACT_ADDRESS = config.contractAddress;

// Acount 1 Private Key
const PRIVATE_KEY_ACC = config.mainAccountPrivateKey;

// Setting up a JSON RPC Provider
var web3;
try {
  provider = new Web3HttpProvider(config.jsonrpc.endpoints.https);
  web3 = new Web3(provider);
} catch (err) {
  console.log("Cannot connect to Provider");
  console.log(err);
}

const account = web3.eth.accounts.privateKeyToAccount(PRIVATE_KEY_ACC);

const contract = new web3.eth.Contract(contractArtifact.abi, CONTRACT_ADDRESS);

const main = async () => {
  var curBalance;
  try {
    curBalance = await contract.methods.balanceOf(account.address).call();
  } catch (err) {
    console.log("Error while calling contract view method");
    console.log(err);
  }

  console.log(`DemoToken balance of ${account.address}: ${curBalance}`);
}

main()