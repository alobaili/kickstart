import Web3 from 'web3'
const keys = require('../keys')

// Create a new instance of we3 which uses the provider automatically injected to the browser by MetaMask
let web3

// If our code will run in the browser and MetaMask is available
if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
    // We are in the browser and MetaMask is running
    web3 = new Web3(window.web3.currentProvider)
} else {
    // We are in the server *OR* the user is not running MetaMask
    const provider = new Web3.providers.HttpProvider(
        keys.infuraRinkebyURL
    )
    web3 = new Web3(provider)
}

// Export the instance
export default web3