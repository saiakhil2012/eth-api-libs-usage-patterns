package com.patterns;

import io.reactivex.Flowable;
import io.reactivex.functions.Function;
import java.math.BigInteger;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import org.web3j.abi.EventEncoder;
import org.web3j.abi.TypeReference;
import org.web3j.abi.datatypes.Address;
import org.web3j.abi.datatypes.Event;
import org.web3j.abi.datatypes.Type;
import org.web3j.abi.datatypes.Utf8String;
import org.web3j.crypto.Credentials;
import org.web3j.protocol.Web3j;
import org.web3j.protocol.core.DefaultBlockParameter;
import org.web3j.protocol.core.RemoteCall;
import org.web3j.protocol.core.RemoteFunctionCall;
import org.web3j.protocol.core.methods.request.EthFilter;
import org.web3j.protocol.core.methods.response.BaseEventResponse;
import org.web3j.protocol.core.methods.response.Log;
import org.web3j.protocol.core.methods.response.TransactionReceipt;
import org.web3j.tx.Contract;
import org.web3j.tx.TransactionManager;
import org.web3j.tx.gas.ContractGasProvider;

/**
 * <p>Auto generated code.
 * <p><strong>Do not modify!</strong>
 * <p>Please use the <a href="https://docs.web3j.io/command_line.html">web3j command line tools</a>,
 * or the org.web3j.codegen.SolidityFunctionWrapperGenerator in the 
 * <a href="https://github.com/web3j/web3j/tree/master/codegen">codegen module</a> to update.
 *
 * <p>Generated with web3j version 1.4.2.
 */
@SuppressWarnings("rawtypes")
public class Greetings extends Contract {
    public static final String BINARY = "60c0604052601e60809081527f44656661756c742d4772656574696e672d46726f6d2d536f6c6964697479000060a0525f9061003b90826100f2565b506001805461ffff19169055348015610052575f80fd5b506101ad565b634e487b7160e01b5f52604160045260245ffd5b600181811c9082168061008057607f821691505b60208210810361009e57634e487b7160e01b5f52602260045260245ffd5b50919050565b601f8211156100ed575f81815260208120601f850160051c810160208610156100ca5750805b601f850160051c820191505b818110156100e9578281556001016100d6565b5050505b505050565b81516001600160401b0381111561010b5761010b610058565b61011f81610119845461006c565b846100a4565b602080601f831160018114610152575f841561013b5750858301515b5f19600386901b1c1916600185901b1785556100e9565b5f85815260208120601f198616915b8281101561018057888601518255948401946001909101908401610161565b508582101561019d57878501515f19600388901b60f8161c191681555b5050505050600190811b01905550565b6104d8806101ba5f395ff3fe608060405234801561000f575f80fd5b5060043610610034575f3560e01c8063a413686214610038578063fe50cc721461004d575b5f80fd5b61004b610046366004610185565b61006b565b005b6100556100e2565b6040516100629190610273565b60405180910390f35b7fb1a5fc168c026acfb50d8684803199dc53422383d6635a074402b33c17b2ee38335f8360405161009e939291906102c4565b60405180910390a15f6100b182826103ba565b50600180545f906100c59061ffff16610476565b91906101000a81548161ffff021916908361ffff16021790555050565b60605f80546100f09061028c565b80601f016020809104026020016040519081016040528092919081815260200182805461011c9061028c565b80156101675780601f1061013e57610100808354040283529160200191610167565b820191905f5260205f20905b81548152906001019060200180831161014a57829003601f168201915b5050505050905090565b634e487b7160e01b5f52604160045260245ffd5b5f60208284031215610195575f80fd5b813567ffffffffffffffff808211156101ac575f80fd5b818401915084601f8301126101bf575f80fd5b8135818111156101d1576101d1610171565b604051601f8201601f19908116603f011681019083821181831017156101f9576101f9610171565b81604052828152876020848701011115610211575f80fd5b826020860160208301375f928101602001929092525095945050505050565b5f81518084525f5b8181101561025457602081850181015186830182015201610238565b505f602082860101526020601f19601f83011685010191505092915050565b602081525f6102856020830184610230565b9392505050565b600181811c908216806102a057607f821691505b6020821081036102be57634e487b7160e01b5f52602260045260245ffd5b50919050565b60018060a01b03841681525f60206060818401525f85546102e48161028c565b806060870152608060018084165f8114610305576001811461031f5761034a565b60ff1985168984015283151560051b89018301955061034a565b8a5f52865f205f5b858110156103425781548b8201860152908301908801610327565b8a0184019650505b505050505083810360408501526103618186610230565b979650505050505050565b601f8211156103b5575f81815260208120601f850160051c810160208610156103925750805b601f850160051c820191505b818110156103b15782815560010161039e565b5050505b505050565b815167ffffffffffffffff8111156103d4576103d4610171565b6103e8816103e2845461028c565b8461036c565b602080601f83116001811461041b575f84156104045750858301515b5f19600386901b1c1916600185901b1785556103b1565b5f85815260208120601f198616915b828110156104495788860151825594840194600190910190840161042a565b508582101561046657878501515f19600388901b60f8161c191681555b5050505050600190811b01905550565b5f61ffff80831681810361049857634e487b7160e01b5f52601160045260245ffd5b600101939250505056fea26469706673582212208269792ae2d86c6575b3d82b8c09eb861cc64febad8402d63f46a3681272f0c564736f6c63430008140033";

    public static final String FUNC_GETGREETING = "getGreeting";

    public static final String FUNC_SETGREETING = "setGreeting";

    public static final Event NEWGREETINGEVENT_EVENT = new Event("NewGreetingEvent", 
            Arrays.<TypeReference<?>>asList(new TypeReference<Address>() {}, new TypeReference<Utf8String>() {}, new TypeReference<Utf8String>() {}));
    ;

    @Deprecated
    protected Greetings(String contractAddress, Web3j web3j, Credentials credentials, BigInteger gasPrice, BigInteger gasLimit) {
        super(BINARY, contractAddress, web3j, credentials, gasPrice, gasLimit);
    }

    protected Greetings(String contractAddress, Web3j web3j, Credentials credentials, ContractGasProvider contractGasProvider) {
        super(BINARY, contractAddress, web3j, credentials, contractGasProvider);
    }

    @Deprecated
    protected Greetings(String contractAddress, Web3j web3j, TransactionManager transactionManager, BigInteger gasPrice, BigInteger gasLimit) {
        super(BINARY, contractAddress, web3j, transactionManager, gasPrice, gasLimit);
    }

    protected Greetings(String contractAddress, Web3j web3j, TransactionManager transactionManager, ContractGasProvider contractGasProvider) {
        super(BINARY, contractAddress, web3j, transactionManager, contractGasProvider);
    }

    public static List<NewGreetingEventEventResponse> getNewGreetingEventEvents(TransactionReceipt transactionReceipt) {
        List<Contract.EventValuesWithLog> valueList = staticExtractEventParametersWithLog(NEWGREETINGEVENT_EVENT, transactionReceipt);
        ArrayList<NewGreetingEventEventResponse> responses = new ArrayList<NewGreetingEventEventResponse>(valueList.size());
        for (Contract.EventValuesWithLog eventValues : valueList) {
            NewGreetingEventEventResponse typedResponse = new NewGreetingEventEventResponse();
            typedResponse.log = eventValues.getLog();
            typedResponse._sender = (String) eventValues.getNonIndexedValues().get(0).getValue();
            typedResponse._oldGreeting = (String) eventValues.getNonIndexedValues().get(1).getValue();
            typedResponse._newGreeting = (String) eventValues.getNonIndexedValues().get(2).getValue();
            responses.add(typedResponse);
        }
        return responses;
    }

    public Flowable<NewGreetingEventEventResponse> newGreetingEventEventFlowable(EthFilter filter) {
        return web3j.ethLogFlowable(filter).map(new Function<Log, NewGreetingEventEventResponse>() {
            @Override
            public NewGreetingEventEventResponse apply(Log log) {
                Contract.EventValuesWithLog eventValues = extractEventParametersWithLog(NEWGREETINGEVENT_EVENT, log);
                NewGreetingEventEventResponse typedResponse = new NewGreetingEventEventResponse();
                typedResponse.log = log;
                typedResponse._sender = (String) eventValues.getNonIndexedValues().get(0).getValue();
                typedResponse._oldGreeting = (String) eventValues.getNonIndexedValues().get(1).getValue();
                typedResponse._newGreeting = (String) eventValues.getNonIndexedValues().get(2).getValue();
                return typedResponse;
            }
        });
    }

    public Flowable<NewGreetingEventEventResponse> newGreetingEventEventFlowable(DefaultBlockParameter startBlock, DefaultBlockParameter endBlock) {
        EthFilter filter = new EthFilter(startBlock, endBlock, getContractAddress());
        filter.addSingleTopic(EventEncoder.encode(NEWGREETINGEVENT_EVENT));
        return newGreetingEventEventFlowable(filter);
    }

    public RemoteFunctionCall<String> getGreeting() {
        final org.web3j.abi.datatypes.Function function = new org.web3j.abi.datatypes.Function(FUNC_GETGREETING, 
                Arrays.<Type>asList(), 
                Arrays.<TypeReference<?>>asList(new TypeReference<Utf8String>() {}));
        return executeRemoteCallSingleValueReturn(function, String.class);
    }

    public RemoteFunctionCall<TransactionReceipt> setGreeting(String _newGreeting) {
        final org.web3j.abi.datatypes.Function function = new org.web3j.abi.datatypes.Function(
                FUNC_SETGREETING, 
                Arrays.<Type>asList(new org.web3j.abi.datatypes.Utf8String(_newGreeting)), 
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    @Deprecated
    public static Greetings load(String contractAddress, Web3j web3j, Credentials credentials, BigInteger gasPrice, BigInteger gasLimit) {
        return new Greetings(contractAddress, web3j, credentials, gasPrice, gasLimit);
    }

    @Deprecated
    public static Greetings load(String contractAddress, Web3j web3j, TransactionManager transactionManager, BigInteger gasPrice, BigInteger gasLimit) {
        return new Greetings(contractAddress, web3j, transactionManager, gasPrice, gasLimit);
    }

    public static Greetings load(String contractAddress, Web3j web3j, Credentials credentials, ContractGasProvider contractGasProvider) {
        return new Greetings(contractAddress, web3j, credentials, contractGasProvider);
    }

    public static Greetings load(String contractAddress, Web3j web3j, TransactionManager transactionManager, ContractGasProvider contractGasProvider) {
        return new Greetings(contractAddress, web3j, transactionManager, contractGasProvider);
    }

    public static RemoteCall<Greetings> deploy(Web3j web3j, Credentials credentials, ContractGasProvider contractGasProvider) {
        return deployRemoteCall(Greetings.class, web3j, credentials, contractGasProvider, BINARY, "");
    }

    @Deprecated
    public static RemoteCall<Greetings> deploy(Web3j web3j, Credentials credentials, BigInteger gasPrice, BigInteger gasLimit) {
        return deployRemoteCall(Greetings.class, web3j, credentials, gasPrice, gasLimit, BINARY, "");
    }

    public static RemoteCall<Greetings> deploy(Web3j web3j, TransactionManager transactionManager, ContractGasProvider contractGasProvider) {
        return deployRemoteCall(Greetings.class, web3j, transactionManager, contractGasProvider, BINARY, "");
    }

    @Deprecated
    public static RemoteCall<Greetings> deploy(Web3j web3j, TransactionManager transactionManager, BigInteger gasPrice, BigInteger gasLimit) {
        return deployRemoteCall(Greetings.class, web3j, transactionManager, gasPrice, gasLimit, BINARY, "");
    }

    public static class NewGreetingEventEventResponse extends BaseEventResponse {
        public String _sender;

        public String _oldGreeting;

        public String _newGreeting;
    }
}
