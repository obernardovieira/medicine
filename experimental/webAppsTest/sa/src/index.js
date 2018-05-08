var path = require('path');
var fs = require('fs');
var net = require('net');
const express = require('express')
const app = express()
app.set('view engine', 'pug')
var Web3 = require('web3');
if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
} else {
    // set the provider you want from Web3.providers
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

var myAddress = "0xc6ed48Ca34517d7aFc13A66D64695cA62C53e41f";
console.log(`web3 version: ${web3.version}`)
var destAddress = "0xdECDE37b930289f9131830Df32376Ef2388e8B32";
var transferAmount = 5;
var abiArray = JSON.parse(fs.readFileSync(path.resolve(__dirname, './contract.json'), 'utf-8'));

var contractAddress = "0xF760E68E4F98aCE1F07D40d8C2c434C78dB97B28";
var contract = new web3.eth.Contract(abiArray, contractAddress, { from: myAddress });

function transfer(req, res) {

    var gasPriceGwei = 3;
    var gasLimit = 3000000;
    var chainId = 19952002;

    web3.eth.getTransactionCount(myAddress).then((count) => {
        console.log(`num transactions so far: ${count}`);

        var rawTransaction = {
            "from": myAddress,
            "nonce": "0x" + count.toString(16),
            "gasPrice": web3.utils.toHex(gasPriceGwei * 1e9),
            "gasLimit": web3.utils.toHex(gasLimit),
            "to": contractAddress,
            "value": "0x0",
            "data": contract.methods.transfer(req.body.to, req.body.ammount).encodeABI(),
            "chainId": chainId
        };
        console.log(`Raw of Transaction: \n${JSON.stringify(rawTransaction, null, '\t')}\n------------------------`);

        web3.eth.signTransaction(rawTransaction).then((receipt) => {
            console.log(receipt["raw"])
            web3.eth.sendSignedTransaction(receipt["raw"]).then((receipt) => {
                var response = '';
                if(receipt) {
                    response = "Tranfered with success!"
                }
                else {
                    response = 'Didn\'t worked!';
                }
                res.redirect('/');
            })
        });
    });
}


app.get('/', (req, res) => {
    contract.methods.balanceOf(myAddress).call().then((receipt) => {
        res.render('index', { balance: receipt })
    });
})
app.get('/balance', (req, res) => {
    contract.methods.balanceOf(myAddress).call().then((receipt) => {
        res.send(receipt)
    })
})
app.post('/transfer', (req, res) => transfer(req, res))

app.listen(3000, () => console.log('Example app listening on port 3000!'))


//web3.eth.personal.newAccount('!@superpassword').then(console.log);