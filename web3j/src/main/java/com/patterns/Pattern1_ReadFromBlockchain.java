package com.patterns;

import org.json.JSONObject;
import org.web3j.protocol.Web3j;
import org.web3j.protocol.core.methods.response.EthGasPrice;
import org.web3j.protocol.core.methods.response.Web3ClientVersion;
import org.web3j.protocol.http.HttpService;
import java.io.FileReader;

public class Pattern1_ReadFromBlockchain {
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

        Web3j web3j = Web3j.build(new HttpService(endpoint));

        Web3ClientVersion web3ClientVersion = web3j.web3ClientVersion().send();
        System.out.println("clientVersion is " + web3ClientVersion.getWeb3ClientVersion());

        EthGasPrice ethGasPrice = web3j.ethGasPrice().send();
        System.out.println("gasPrice is " + ethGasPrice.getGasPrice());
    }
}

