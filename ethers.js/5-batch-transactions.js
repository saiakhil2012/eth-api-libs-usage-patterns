const ethers = require("ethers");
const config = require('./config-self.json');

const CONTRACT_ABI = [
    "function totalSupply() public view returns (uint256)",
    "function balanceOf(address account) public view returns (uint256)",
    "function transfer(address to, uint256 amount) public returns (bool)"
];

// Contract Address of DemoToken
const CONTRACT_ADDRESS = config.contractAddress;

// Account 1
PRIVATE_KEY_ACC_1 = config.mainAccountPrivateKey;

// Setting up a JSON RPC Provider
var provider;
try {
  provider = new ethers.providers.JsonRpcBatchProvider(config.jsonrpc.endpoints.https);
} catch (err) {
  console.log(err);
}

const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);

const main = async () => {
    // Create wallet using the provided private key
    wallet1 = new ethers.Wallet(PRIVATE_KEY_ACC_1, provider);
    wallet3 = new ethers.Wallet(config.additionalAccountPrivateKey, provider);

    // Create 2 random wallets
    wallet2 = ethers.Wallet.createRandom();
    wallet4 = ethers.Wallet.createRandom();

    // Connect the wallet1 and wallet3 with contract
    contractWithWallet1 = contract.connect(wallet1);
    contractWithWallet3 = contract.connect(wallet3);

    // Setup Wallet3 with some DemoTokens
    const demoTokensToTransfer = 100;
    var tx = await contractWithWallet1.transfer(wallet3.address, demoTokensToTransfer);
    await tx.wait();
    console.log("Pre-setup successfull");

    // Checking DemoToken balances before transfer transactions
    promise1 = contract.balanceOf(wallet1.address);
    promise2 = contract.balanceOf(wallet2.address);
    promise3 = contract.balanceOf(wallet3.address);
    promise4 = contract.balanceOf(wallet4.address);

    const [oldBal1, oldBal2, oldBal3, oldBal4] = await Promise.all([promise1, promise2, promise3, promise4]);

    console.log(`Account1 ${wallet1.address} Balance before: ${oldBal1}`);
    console.log(`Account2 ${wallet2.address} Balance before: ${oldBal2}`);
    console.log(`Account3 ${wallet3.address} Balance before: ${oldBal3}`);
    console.log(`Account4 ${wallet4.address} Balance before: ${oldBal4}`);

    /*
        Transfer transactions of DemoTokens
        Transfer 100 Demo Tokens: acc1 --> acc2
        Transfer 10 Demo Tokens: acc3 --> acc4
    */
    var transferPromise1 = contractWithWallet1.transfer(wallet2.address, 100);
    var transferPromise2 = contractWithWallet3.transfer(wallet4.address, 10);

    var [tx1, tx2] = await Promise.all([transferPromise1, transferPromise2]);

    await tx1.wait();
    await tx2.wait();

    console.log(`Successfully Transferred 100 Demo Tokens from ${wallet1.address} to ${wallet2.address}`);
    console.log(`Successfully Transferred 10 Demo Tokens from ${wallet3.address} to ${wallet4.address}`);

    // Checking account balances after transfer transactions
    promise1 = contract.balanceOf(wallet1.address);
    promise2 = contract.balanceOf(wallet2.address);
    promise3 = contract.balanceOf(wallet3.address);
    promise4 = contract.balanceOf(wallet4.address);

    const [newBal1, newBal2, newBal3, newBal4] = await Promise.all([promise1, promise2, promise3, promise4]);

    console.log(`Account1 ${wallet1.address} Balance before: ${newBal1}`);
    console.log(`Account2 ${wallet2.address} Balance before: ${newBal2}`);
    console.log(`Account3 ${wallet3.address} Balance before: ${newBal3}`);
    console.log(`Account4 ${wallet4.address} Balance before: ${newBal4}`);
}

main();