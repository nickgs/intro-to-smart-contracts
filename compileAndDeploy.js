var Web3 = require('web3'); // Our web3 client.
var solc = require('solc'); // Our solidarity compiler
var fs = require('fs');

// Connect to our local testrpc node.
//var w3 = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/h687IkdLPTdPUsgUdKcx"));
var w3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545"));

// Make sure we are connected.
console.log("Making sure we are connected to a node.");
console.log(w3.isConnected());

// Grab the filename we passed in to compile.
var contractFile = process.argv[2];
var contractName = ":" + process.argv[3];

// Create some variables to hold our compiled contract AND its ABI.
var compiledContract = "";
var contractABI = "";

var compileContract = function(c) {
  // Compile the contract.
  compiledContract = solc.compile(c);
  //console.log(compiledContract);
  
  // Extract the ABI (Application Binary Interface)
  contractABI = JSON.parse(compiledContract.contracts[contractName].interface);
  console.log("--------------");
  console.log(compiledContract.contracts[contractName].interface);
  console.log("--------------");
  
  deployContract(compiledContract, contractABI);
}

var deployContract = function(contract, abi) {
  var contractFactory = w3.eth.contract(abi);

  
  var estimateGas = w3.eth.estimateGas({
    to: w3.eth.accounts[0],
    data: '0x' + contract.contracts[contractName].bytecode,
  });
 

  var gasPrice = w3.eth.gasPrice.toString();
  console.log("--------------");
  console.log("Deploying contract from: " + w3.eth.accounts[0]);
  console.log("The amount of gas estimated to be consumed is: " + estimateGas); 
  console.log("Gas price: " + gasPrice); 
  console.log("--------------");
  
  var deployed = contractFactory.new({
    from: w3.eth.accounts[0],
    data: '0x' + contract.contracts[contractName].bytecode,
    gas: 4712388,
    gasPrice: gasPrice
  });


  //console.log(deployed);
  
}

fs.readFile(contractFile, 'utf8', function(err, data) {
  if(err) {
    return console.error(err);
  }
  compileContract(data);
});


//[ { constant: true, inputs: [], name: 'displayMessage', outputs: [ [Object] ], payable: false, stateMutability: 'view', type: 'function' } ]