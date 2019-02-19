import Web3 from 'web3'

// Create a new instance of we3 which uses the provider automatically injected to the browser by MetaMask
const web3 = new Web3(window.web3.currentProvider)

// Export the instance
export default web3