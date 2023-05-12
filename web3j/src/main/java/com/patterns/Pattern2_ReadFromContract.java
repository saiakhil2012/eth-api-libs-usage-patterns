package com.patterns;

import java.io.FileReader;
import org.json.JSONObject;
import org.web3j.crypto.Credentials;
import org.web3j.protocol.Web3j;
import org.web3j.protocol.http.HttpService;
import org.web3j.tx.gas.DefaultGasProvider;


public class Pattern2_ReadFromContract {

    public static void main(String[] args) throws Exception {
        FileReader fileReader = new FileReader("../config/config-self.json");
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
        System.out.println("Demo Token Balance of " + credentials.getAddress() + ": " + demoToken.balanceOf(credentials.getAddress()).send());
    }
}

