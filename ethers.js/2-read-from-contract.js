const { ethers } = require("ethers");
const config = require('./config-self.json');

const CONTRACT_ABI = [
  "function totalSupply() public view returns (uint256)",
  "function balanceOf(address account) public view returns (uint256)"
];

// Contract Address of DemoToken
const CONTRACT_ADDRESS = config.contractAddress;

// Acount 1 Private Key
const PRIVATE_KEY_ACC = config.mainAccountPrivateKey;

const wallet = new ethers.Wallet(PRIVATE_KEY_ACC, provider);

// Setting up a JSON RPC Provider
var provider;
try {
  provider = new ethers.providers.JsonRpcProvider(config.jsonrpc.endpoints.https);
} catch (err) {
  console.log("Cannot connect to Provider");
  console.log(err);
}

const main = async () => {
  const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);

  var curBalance;
  try {
    curBalance = await contract.balanceOf(wallet.address);
  } catch (err) {
    console.log("Error while calling contract view method");
    console.log(err);
  }

  console.log(`DemoToken balance of ${wallet.address}: ${curBalance}`);
}

main()