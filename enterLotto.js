var Web3 = require('web3');

var w3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545"));

console.log(w3.isConnected());

var player = w3.eth.accounts[5];

w3.eth.defaultAccount = player;

// Get our contract information.
var lotto_abi = JSON.parse('[{"constant":false,"inputs":[],"name":"bet","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[],"name":"endLottery","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getRandomNum","outputs":[{"name":"n","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getJackpot","outputs":[{"name":"t","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"}]');
var contract = w3.eth.contract(lotto_abi);
var Yolanda = contract.at("0x8cdaf0cd259887258bc13a92c0a6da92698644c0");

// Get our transaction together.
var transaction = {
    from: player,
    value: w3.toWei(80, "ether"),
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

// Yolanda.endLottery({from: w3.eth.accounts[0]}, function(error, receipt) {
//     console.log(error);
//     console.log(receipt);
// })