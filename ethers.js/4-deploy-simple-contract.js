const fs = require("fs");
const path = require("path");
const solc = require("solc");
const { ethers } = require("ethers");
const config = require('../config/config-self.json');

var CONTRACT_FILE = "../contracts/Greetings.sol";
var CONTRACT_NAME = path.parse(CONTRACT_FILE).name;
CONTRACT_ABI = "";
CONTRACT_BYTECODE = "";

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

function compileContract() {
    // Reading the file
    file = fs.readFileSync(CONTRACT_FILE).toString();

    // Input structure for solidity compiler
    var input = {
        language: "Solidity",
        sources: {
            [CONTRACT_FILE]: {
                content: file,
            },
        },
        settings: {
            outputSelection: {
                "*": {
                    "*": ["evm", "bytecode", "abi"],
                },
            },
        },
    }

    var output = JSON.parse(solc.compile(JSON.stringify(input)));
    CONTRACT_ABI = output.contracts[CONTRACT_FILE][CONTRACT_NAME].abi;
    CONTRACT_BYTECODE = output.contracts[CONTRACT_FILE][CONTRACT_NAME].evm.bytecode.object;
}

async function deployContract() {
    let factory = new ethers.ContractFactory(CONTRACT_ABI, CONTRACT_BYTECODE, wallet);
    let contract = await factory.deploy();

    await contract.deployed();
    console.log(`Successfully deployed ${CONTRACT_NAME} Contract at ${contract.address}`);
    
    return contract.address;
}


const main = async () => {
    compileContract();

    CONTRACT_ADDRESS = await deployContract();
    console.log(`${CONTRACT_NAME} Contract Address: ${CONTRACT_ADDRESS}`);

    const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);

    var greetingBefore;
    try {
        greetingBefore = await contract.getGreeting();
    } catch (err) {
        console.log(err);
    }
    console.log("\nDefault Greeting: ", greetingBefore);

    const contractWithWallet = contract.connect(wallet);

    var tx;
    try {
        tx = await contractWithWallet.setGreeting("Welcome to BuildEth 2023");
    } catch (err) {
        console.log(err);
    }
    
    rc = await tx.wait();
    console.log("Successfully updated the greeting");

    var greetingAfter = await contract.getGreeting();
        console.log("Greeting after update: ", greetingAfter);
}

main();