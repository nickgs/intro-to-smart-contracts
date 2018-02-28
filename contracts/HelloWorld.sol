// Our version pragma
pragma solidity ^0.4.6;


// Define our contract.
contract HelloWorld {
  // Single simple method.
  function displayMessage() constant returns (string m) {
    return "Hello from a smart contract";
  }
}
