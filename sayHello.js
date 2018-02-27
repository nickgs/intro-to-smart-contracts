var Web3 = require('web3');

var w3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545"));

// Get our contract information.
var abi = JSON.parse('[{"constant":true,"inputs":[],"name":"displayMessage","outputs":[{"name":"m","type":"string"}],"payable":false,"stateMutability":"view","type":"function"}]');
var contract = w3.eth.contract(abi);
var Holler = contract.at("0x8cdaf0cd259887258bc13a92c0a6da92698644c0");

// Call our contract
Holler.displayMessage(function(error, result) {
    console.log(result);
});