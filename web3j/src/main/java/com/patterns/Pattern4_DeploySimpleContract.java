package com.patterns;

import org.json.JSONObject;
import org.web3j.crypto.Credentials;
import org.web3j.protocol.Web3j;
import org.web3j.protocol.core.methods.response.TransactionReceipt;
import org.web3j.protocol.http.HttpService;
import org.web3j.tx.gas.DefaultGasProvider;

import java.io.FileReader;
import java.math.BigInteger;

public class Pattern4_DeploySimpleContract {
    public static void main(String[] args) throws Exception {
        FileReader fileReader = new FileReader("../config/config-self-alchemy.json");
        StringBuilder stringBuilder = new StringBuilder();
        int character;
        while ((character = fileReader.read()) != -1) {
            stringBuilder.append((char) character);
        }
        String jsonString = stringBuilder.toString();
        fileReader.close();

        // Parse the JSON string into a JSONObject
        JSONObject jsonObject = new JSONObject(jsonString);

        String endpoint = jsonObject.getJSONObject("jsonrpc").getJSONObject("endpoints").getString("https");

        String contractAddress = jsonObject.getString("contractAddress");
        String mainAccountPrivateKey = jsonObject.getString("mainAccountPrivateKey");
        Credentials credentials = Credentials.create(mainAccountPrivateKey);

        Web3j web3j = Web3j.build(new HttpService(endpoint));

        // Deploy contract
        Greetings greetings = Greetings.deploy(web3j, credentials, new DefaultGasProvider()).send();
        System.out.println("Contract address of deployed Greetings contract is " + greetings.getContractAddress());

        System.out.println("Default Greeting: " + greetings.getGreeting().send());

        TransactionReceipt receipt = greetings.setGreeting("Welcome to BuildEth 2023").send();
        System.out.println("Successfully updated the greeting");

        System.out.println("Greeting after update: " + greetings.getGreeting().send());
    }
}

