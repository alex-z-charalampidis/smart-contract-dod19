function web3_interface(risk, hashP1, hashP2, dHashP1, dHashP2, Owner) {
    //Options
    var web3_provider = 'http://127.0.0.1:8545';
    //Assuming contract has already been deployed on the blockchain
    var result = 0;
    const contract_address = '0x2EAe8F4736390b33Fac1a636685F72F85C9469C1';
    const account = '0x7910b51e96Fb8e6AAafc28F437b1843F403DaD3d';
    const priv_key = new ethereumjs.Buffer.Buffer('53365a7aad3958d33bfac6bb053abd981a085ae29fbe3e9659c221b64005e599', 'hex');
    const contract_abi = [{
        "constant": true,
        "inputs": [],
        "name": "db_hash_part1",
        "outputs": [{
            "internalType": "bytes32",
            "name": "",
            "type": "bytes32"
        }],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }, {
        "constant": true,
        "inputs": [],
        "name": "db_hash_part2",
        "outputs": [{
            "internalType": "bytes32",
            "name": "",
            "type": "bytes32"
        }],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }, {
        "constant": true,
        "inputs": [],
        "name": "dev_hash_part1",
        "outputs": [{
            "internalType": "bytes32",
            "name": "",
            "type": "bytes32"
        }],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }, {
        "constant": true,
        "inputs": [],
        "name": "dev_hash_part2",
        "outputs": [{
            "internalType": "bytes32",
            "name": "",
            "type": "bytes32"
        }],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }, {
        "constant": true,
        "inputs": [],
        "name": "propertyOwner",
        "outputs": [{
            "internalType": "bytes32",
            "name": "",
            "type": "bytes32"
        }],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }, {
        "constant": false,
        "inputs": [{
            "internalType": "int256",
            "name": "data",
            "type": "int256"
        }],
        "name": "retrieveData",
        "outputs": [{
            "internalType": "bytes32",
            "name": "",
            "type": "bytes32"
        }],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "constant": true,
        "inputs": [],
        "name": "riskIndex",
        "outputs": [{
            "internalType": "uint64",
            "name": "",
            "type": "uint64"
        }],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }, {
        "constant": false,
        "inputs": [{
            "internalType": "uint64",
            "name": "risk",
            "type": "uint64"
        }, {
            "internalType": "bytes32",
            "name": "hashP1",
            "type": "bytes32"
        }, {
            "internalType": "bytes32",
            "name": "hashP2",
            "type": "bytes32"
        }, {
            "internalType": "bytes32",
            "name": "dHashP1",
            "type": "bytes32"
        }, {
            "internalType": "bytes32",
            "name": "dHashP2",
            "type": "bytes32"
        }, {
            "internalType": "bytes32",
            "name": "Owner",
            "type": "bytes32"
        }],
        "name": "setData",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "constant": false,
        "inputs": [{
            "internalType": "bool",
            "name": "consType",
            "type": "bool"
        }, {
            "internalType": "bool",
            "name": "fType",
            "type": "bool"
        }, {
            "internalType": "uint16",
            "name": "yOfConst",
            "type": "uint16"
        }],
        "name": "setExtra",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "constant": false,
        "inputs": [{
            "internalType": "bytes32",
            "name": "db_h1",
            "type": "bytes32"
        }, {
            "internalType": "bytes32",
            "name": "db_h2",
            "type": "bytes32"
        }, {
            "internalType": "bytes32",
            "name": "dev_h1",
            "type": "bytes32"
        }, {
            "internalType": "bytes32",
            "name": "dev_h2",
            "type": "bytes32"
        }],
        "name": "validateHashes",
        "outputs": [{
            "internalType": "bool",
            "name": "",
            "type": "bool"
        }],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    }]
    //Connect to the web3 provider
    var web3_cli = new Web3(new Web3.providers.HttpProvider(web3_provider));
    //Check if we are connected to the ethereum network
    var flag_connected = web3_cli.eth.net.isListening()
        .then(() => console.log('Web3 connected'))
        .catch(e => console.log('Error.Web3 not connected.Reason:' + e));
    //In case of connection failure exit scipt and throw error
    if (!flag_connected) {
        throw 'Exiting script due to web3 connection failure';
    };
    //Deploying 
    const contract = new web3_cli.eth.Contract(contract_abi, contract_address);
    //Formating variables for solidity compability
    for (var i = 0; i < arguments.length; i++) {
        arguments[i] = "|" + arguments[i] + "~";
        arguments[i] = web3_cli.utils.utf8ToHex(arguments[i]);
    }
    //Calling the setData function
    const data = contract.methods.setData(risk, hashP1, hashP2, dHashP1, dHashP2, Owner).encodeABI();
    //
    web3_cli.eth.getTransactionCount(account, (err, txCount) => {
        // Build the transaction
        const txObject = {
            nonce: web3_cli.utils.toHex(txCount),
            to: contract_address,
            value: web3_cli.utils.toHex(web3_cli.utils.toWei('0', 'ether')),
            gasLimit: web3_cli.utils.toHex(2100000),
            gasPrice: web3_cli.utils.toHex(web3_cli.utils.toWei('6', 'gwei')),
            data: data
        };
        // Sign the transaction
        var tx = new ethereumjs.Tx(ethereumjs.constructor(txObject));
        tx.sign(priv_key);

        const serializedTx = tx.serialize();
        const raw = '0x' + serializedTx.toString('hex');
        // Broadcast the transaction
        const transaction = web3_cli.eth.sendSignedTransaction(raw, (err, tx) => {
            console.log('Transaction hash:' + tx);
            
        });
    });
  return 1;
};


async function web3_retrieve(tx) {
    var web3_provider = 'http://127.0.0.1:8545';
    var web3_cli = new Web3(new Web3.providers.HttpProvider(web3_provider));
    var flag_connected = web3_cli.eth.net.isListening()
        .then(() => console.log('Web3 connected'))
        .catch(e => console.log('Error.Web3 not connected.Reason:' + e));
    const rslv = await web3_cli.eth.getTransaction(tx).then(value => {
        return value.input;
    });
    const contract_inp = await web3_cli.utils.hexToAscii(rslv);
    console.log(contract_inp);
    //String of the input field from the contract
    //Algorithm to decode data and store them in array
    var buffer = new Array();
    for (var i = 0; i < contract_inp.length; i++) {
        if (contract_inp[i] == '|') {
            var j = i;
            var temp = '';
            while (contract_inp[j] != '~' && j != contract_inp.length) {
                if (contract_inp[j] == '|') {
                    j++;
                } else {
                    temp += contract_inp[j];
                    j++;
                }
            }
            if (temp != '') {
                buffer.push(temp);
            }
        }
    }
    console.log(buffer);
    return buffer
};
