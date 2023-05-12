package com.patterns;

import java.io.FileReader;
import org.json.JSONObject;
import org.web3j.crypto.Credentials;
import org.web3j.protocol.Web3j;
import org.web3j.protocol.http.HttpService;
import org.web3j.tx.gas.DefaultGasProvider;
import org.web3j.utils.Numeric;
import org.web3j.protocol.core.methods.response.TransactionReceipt;
import java.math.BigInteger;


public class Pattern3_WriteToContract {

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

        DemoToken demoToken = DemoToken.load(contractAddress, web3j, credentials, new DefaultGasProvider());
        
        System.out.println("Demo Token total supply before: " + demoToken.totalSupply().send());

        Integer newTokensToMint = 5000;
        TransactionReceipt receipt = demoToken.mint(credentials.getAddress(), BigInteger.valueOf(newTokensToMint)).send();
        System.out.println("Successfully minted " + newTokensToMint + " new Demo Tokens");

        System.out.println("Demo Token total supply after: " + demoToken.totalSupply().send());
    }
}

