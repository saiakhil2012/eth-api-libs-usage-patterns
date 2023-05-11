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
  var totalSupplyBefore;
  try {
    totalSupplyBefore = await contract.methods.totalSupply().call();
  } catch (err) {
    console.log(err);
  }
  console.log(`Demo Token total supply before: ${totalSupplyBefore}`);

  var tx;
  var newTokensToMint = 5000;
  try {
    tx = await contract.methods.mint(account.address, newTokensToMint);
    const txObject = {
      to: contract.options.address,
      data: tx.encodeABI(),
      gas: await tx.estimateGas({ from: account.address })
    };

    var signedTx = await web3.eth.accounts.signTransaction(txObject, account.privateKey)
    var txReceipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
    console.log(`Transaction receipt is: ${JSON.stringify(txReceipt)}`);
  } catch (err) {
    console.log(err);
  }
  
  console.log(`Successfully minted ${newTokensToMint} new Demo Tokens`);

  var totalSupplyAfter = await contract.methods.totalSupply().call();
  console.log(`Demo Token total supply after: ${totalSupplyAfter}`);
}

main()