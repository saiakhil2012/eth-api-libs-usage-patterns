const Web3 = require("web3");
const Web3HttpProvider = require('web3-providers-http');
const config = require('../config/config-self.json');
const contractArtifact = require('../artifacts/contracts/DemoToken.sol/DemoToken.json');

// Contract Address of DemoToken
const CONTRACT_ADDRESS = config.contractAddress;

// Account 1
PRIVATE_KEY_ACC_1 = config.mainAccountPrivateKey;

// Setting up a JSON RPC Provider
var web3;
try {
  provider = new Web3HttpProvider(config.jsonrpc.endpoints.https);
  web3 = new Web3(provider);
} catch (err) {
  console.log("Cannot connect to Provider");
  console.log(err);
}

const contract = new web3.eth.Contract(contractArtifact.abi, CONTRACT_ADDRESS);

const main = async () => {
  // Create accounts using the provided private keys
  account1 = web3.eth.accounts.privateKeyToAccount(PRIVATE_KEY_ACC_1);
  account3 = web3.eth.accounts.privateKeyToAccount(config.additionalAccountPrivateKey);

  // Create 2 random accounts
  account2 = web3.eth.accounts.create();
  account4 = web3.eth.accounts.create();

  // Setup account3 with some DemoTokens
  const demoTokensToTransfer = 100;

  try {
    tx = await contract.methods.transfer(account3.address, demoTokensToTransfer);
    const txObject = {
      to: contract.options.address,
      data: tx.encodeABI(),
      gas: await tx.estimateGas({ from: account1.address })
    };

    var signedTx = await web3.eth.accounts.signTransaction(txObject, account1.privateKey)
    var txReceipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
    console.log("Pre-setup successful");
  } catch (err) {
    console.log(err);
  }

  // Checking account balances before transfer transactions
  var batch1 = new web3.BatchRequest();

  var balance1Request = contract.methods.balanceOf(account1.address).call.request((_, balance1) => {
    console.log(`Account1 ${account1.address} Balance before: ${balance1}`);
  });
  var balance2Request = contract.methods.balanceOf(account2.address).call.request((_, balance2) => {
    console.log(`Account2 ${account2.address} Balance before: ${balance2}`);
  });
  var balance3Request = contract.methods.balanceOf(account3.address).call.request((_, balance3) => {
    console.log(`Account3 ${account3.address} Balance before: ${balance3}`);
  });
  var balance4Request = contract.methods.balanceOf(account4.address).call.request((_, balance4) => {
    console.log(`Account4 ${account4.address} Balance before: ${balance4}`);
  });

  batch1.add(balance1Request);
  batch1.add(balance2Request);
  batch1.add(balance3Request);
  batch1.add(balance4Request);

  await batch1.execute();


  /*
      Transfer transactions of DemoTokens
      Transfer 100 Demo Tokens: acc1 --> acc2
      Transfer 10 Demo Tokens: acc3 --> acc4
  */
  var batch2 = new web3.BatchRequest();
  tx1 = await contract.methods.transfer(account2.address, 100);
  const tx1Object = {
    to: contract.options.address,
    data: tx1.encodeABI(),
    gas: await tx1.estimateGas({ from: account1.address })
  };
  var signedTx1 = await web3.eth.accounts.signTransaction(tx1Object, account1.privateKey)
  var tx1Request = web3.eth.sendSignedTransaction.request(signedTx1.rawTransaction, (_, tx1Hash) => {
    console.log(`Successfully Transferred 100 Demo Tokens from ${account1.address} to ${account2.address}`);
  });

  tx2 = await contract.methods.transfer(account4.address, 10);
  const tx2Object = {
    to: contract.options.address,
    data: tx2.encodeABI(),
    gas: await tx2.estimateGas({ from: account3.address })
  };
  var signedTx2 = await web3.eth.accounts.signTransaction(tx2Object, account3.privateKey)
  var tx2Request = web3.eth.sendSignedTransaction.request(signedTx2.rawTransaction, (_, tx1Hash) => {
    console.log(`Successfully Transferred 10 Demo Tokens from ${account3.address} to ${account4.address}`);
  });

  batch2.add(tx1Request);
  batch2.add(tx2Request);

  await batch2.execute();

  // Checking account balances after transfer transactions
  var batch3 = new web3.BatchRequest();

  var balance1Request = contract.methods.balanceOf(account1.address).call.request((_, balance1) => {
    console.log(`Account1 ${account1.address} Balance after: ${balance1}`);
  });
  var balance2Request = contract.methods.balanceOf(account2.address).call.request((_, balance2) => {
    console.log(`Account2 ${account2.address} Balance after: ${balance2}`);
  });
  var balance3Request = contract.methods.balanceOf(account3.address).call.request((_, balance3) => {
    console.log(`Account3 ${account3.address} Balance after: ${balance3}`);
  });
  var balance4Request = contract.methods.balanceOf(account4.address).call.request((_, balance4) => {
    console.log(`Account4 ${account4.address} Balance after: ${balance4}`);
  });

  batch3.add(balance1Request);
  batch3.add(balance2Request);
  batch3.add(balance3Request);
  batch3.add(balance4Request);

  await batch3.execute();
}

main();