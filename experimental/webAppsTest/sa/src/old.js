require('dotenv').config();
const express = require('express')
const app = express()
var Web3 = require('web3');
var Tx = require('ethereumjs-tx');

var abi = [{
    "constant": true,
    "inputs": [{
        "name": "",
        "type": "address"
    }],
    "name": "balanceOf",
    "outputs": [{
        "name": "",
        "type": "uint256",
        "value": "50"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
}, {
    "constant": false,
    "inputs": [{
        "name": "_to",
        "type": "address"
    }, {
        "name": "_value",
        "type": "uint256"
    }],
    "name": "transfer",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{
        "name": "initialSupply",
        "type": "uint256",
        "index": 0,
        "typeShort": "uint",
        "bits": "256",
        "displayName": "initial Supply",
        "template": "elements_input_uint",
        "value": "194"
    }],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "constructor"
}]

let ethereum_url = "http://localhost:8545";
web3 = new Web3(new Web3.providers.HttpProvider(ethereum_url));

var contractAddress = "0xF760E68E4F98aCE1F07D40d8C2c434C78dB97B28";
var contract =  web3.eth.contract(abi).at(contractAddress);

var myAddress = "0xc6ed48Ca34517d7aFc13A66D64695cA62C53e41f";
var destAddress = "0xdECDE37b930289f9131830Df32376Ef2388e8B32";
var transferAmount = 5;
var gasPrice = web3.eth.gasPrice;
var count = web3.eth.getTransactionCount(myAddress);
var gasPriceGwei = 3;
var gasLimit = 3000000;
// Chain ID of Ropsten Test Net is 3, replace it to 1 for Main Net
var chainId = 19952002;

var rawTransaction = {
    "from": "0xc6ed48Ca34517d7aFc13A66D64695cA62C53e41f",
    "nonce": "0x" + count.toString(16),
    "gasPrice": web3.toHex(gasPriceGwei * 1e9),
    "gasLimit": web3.toHex(gasLimit),
    "to": contractAddress,
    "value": "0x0",
    "data": contract.transfer(destAddress, transferAmount).encodeABI()
};
console.log("cenas")
var privKey = new Buffer(process.env["PRIVATE_KEY"], 'hex');
var tx = new Tx(rawTransaction);

tx.sign(privKey);
var serializedTx = tx.serialize();

web3.eth.sendRawTransaction('0x' + serializedTx.toString('hex'), function(err, hash) {
  if (!err)
      console.log(hash);
  else
      console.log(err);
});

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))