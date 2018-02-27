var Web3 = require('web3');

var w3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545"));

console.log(w3.isConnected());

var player = w3.eth.accounts[3];

w3.eth.defaultAccount = player;

// Get our contract information.
var lotto_abi = JSON.parse('[{"constant":false,"inputs":[],"name":"bet","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[],"name":"endLottery","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getJackpot","outputs":[{"name":"t","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"}]');
var contract = w3.eth.contract(lotto_abi);
var Yolanda = contract.at("0xf12b5dd4ead5f743c6baa640b0216200e89b60da");

// Get our transaction together.
var transaction = {
    from: player,
    value: w3.toWei(50, "ether"),
    gasPrice: w3.eth.gasPrice.toString(),
    gas: 4712388
}


// Yolanda.bet(transaction, function(error, receipt) {
//     console.log(error);
//     console.log(receipt);
// });

// Yolanda.getJackpot(function(error,output) {
//     console.log(error);
//     console.log(output);
// });

Yolanda.endLottery({from: w3.eth.accounts[0]}, function(error, receipt) {
    console.log(error);
    console.log(receipt);
})