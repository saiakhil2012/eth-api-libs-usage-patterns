const ethers = require("ethers");
const config = require('../config/config-self.json');

const CONTRACT_ABI = [
  "function totalSupply() public view returns (uint256)",
  "function balanceOf(address account) public view returns (uint256)",
  "function mint(address account, uint amount) public"
];

// Contract Address of DemoToken
const CONTRACT_ADDRESS = config.contractAddress;

// Acount 1 Private Key
const PRIVATE_KEY_ACC = config.mainAccountPrivateKey;

// Setting up a JSON RPC Provider
var provider;
try {
  provider = new ethers.providers.JsonRpcProvider(config.jsonrpc.endpoints.https);
} catch (err) {
  console.log(err);
}

const wallet = new ethers.Wallet(PRIVATE_KEY_ACC, provider);

const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);

const main = async () => {
  var totalSupplyBefore;
  try {
    totalSupplyBefore = await contract.totalSupply();
  } catch (err) {
    console.log(err);
  }
  console.log(`Demo Token total supply before: ${totalSupplyBefore}`);

  const contractWithWallet = contract.connect(wallet);

  var tx;
  var newTokensToMint = 5000;
  try {
    tx = await contractWithWallet.mint(wallet.address, newTokensToMint);
  } catch (err) {
    console.log(err);
  }
  
  rc = await tx.wait();
  console.log(`Successfully minted ${newTokensToMint} new Demo Tokens`);

  var totalSupplyAfter = await contract.totalSupply();
  console.log(`Demo Token total supply after: ${totalSupplyAfter}`);
}

main()