const express = require('express')
const app = express()


var abi = [{
    "constant": true,
    "inputs": [{
        "name": "user",
        "type": "address"
    }],
    "name": "getDept",
    "outputs": [{
        "name": "department",
        "type": "uint256",
        "value": "0"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
}, {
    "constant": false,
    "inputs": [{
        "name": "id",
        "type": "uint256"
    }],
    "name": "chooseDept",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "constant": false,
    "inputs": [{
        "name": "user",
        "type": "address"
    }, {
        "name": "department",
        "type": "uint256"
    }],
    "name": "College",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
}]

var Web3 = require('web3');



let ethereum_url = "http://localhost:8545";
web3 = new Web3(new Web3.providers.HttpProvider(ethereum_url));
console.log("Connected to Geth console", web3.version.node, "on block", web3.eth.blockNumber);
var value = web3.fromWei(web3.eth.getBalance('0xc6ed48ca34517d7afc13a66d64695ca62c53e41f').toNumber(), 'ether');
console.log(value);


// creation of contract object
var MyContract = web3.eth.contract(abi);

// initiate contract for an address
var myContractInstance = MyContract.at('0x9BA7a226294e9f4738Cd53AFf659663b45257250');

// call constant function
var result = myContractInstance.getDept('0xc6ed48Ca34517d7aFc13A66D64695cA62C53e41f');
console.log(result.toNumber());



app.get('/', (req, res) => res.send('Hello World!'))

app.listen(3000, () => console.log('Example app listening on port 3000!'))