// This file is used to fetch a campaign from the blockchain and export it for any cpmponent that requires it.

import web3 from './web3'
import Campaign from './build/Campaign.json'

// Recieve address, use the address to create a new contract, and return it.
export default (address) => {
    return new web3.eth.Contract(
        JSON.parse(Campaign.interface),
        address
    )
}