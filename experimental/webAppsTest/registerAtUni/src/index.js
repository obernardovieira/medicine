const express = require('express')
const app = express()
var Web3 = require('web3');

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


let ethereum_url = "http://localhost:8545";
web3 = new Web3(new Web3.providers.HttpProvider(ethereum_url));
var MyContract = web3.eth.contract(abi);
var myContractInstance = MyContract.at('0x9BA7a226294e9f4738Cd53AFf659663b45257250');



app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))