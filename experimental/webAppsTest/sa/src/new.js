console.log('Setting up...');
const express = require('express')
const app = express()
const solc = require ('solc');
const Web3 = require ('web3');
console.log('Reading abi');
const contractABI = require("./contract.json");

console.log('Connecting');
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

console.log('Creating contract instance');
const contract = web3.eth.contract(contractABI);
var contractInstance = contract.at("0xF760E68E4F98aCE1F07D40d8C2c434C78dB97B28");
console.log ('calling contract');

var tokenBalance = contractInstance.balanceOf(web3.eth.coinbase);
console.log('Your tokens balance is :' + tokenBalance);

var receiverAddress = '0xdECDE37b930289f9131830Df32376Ef2388e8B32';

function doTransfer() {
  var callData = contract.transfer.getData(receiverAddress, 2000);

  var gasEstimate = web3.eth.estimateGas({
      from: web3.eth.coinbase,
      to: "0x8caaa1f263ff14d0276ff1a1a6ed15c51159d6e0",
      data: callData
  });

  var gasPrice = web3.eth.gasPrice;

  console.log('gas Price: ' + gasPrice);
  console.log('Estimated Transaction gas: ' + gasEstimate);

  console.log('unlocking Coinbase account');
  const password = "your_password";
  try {
    web3.personal.unlockAccount(web3.eth.coinbase, password);
  } catch(e) {
    console.log(e);
    return;
  }

  console.log ('sending Transaction to the contract');

  // For Real this time: 

  const transaction = {
    from: web3.eth.coinbase,
    gas: gasEstimate + 1,
    gasPrice: gasPrice + 1
  }

  contract.transfer.sendTransaction(receiverAddress, 2000, transaction, function(err, txHash) {
    if (err != null) {
          console.error("Error while sending transaction: " + err);
        }
        else{
          console.log("Transaction Sent here's you  txHash: " + txHash);
        }
  });
}

app.get('/', (req, res) => res.send('Hello World!'))
app.get('/sim', (req, res) => doTransfer())

app.listen(3000, () => console.log('Example app listening on port 3000!'))