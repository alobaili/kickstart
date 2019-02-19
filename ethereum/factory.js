// This file has the sole purpose of retrieving the CampaignFactory contract that is already deployed.
// This will make an instance of the contract which can be easily accssessed from any part of the project using import.

import web3 from './web3'
import CampaignFactory from './build/CampaignFactory.json'
const keys = require('../keys')

const instance = new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface),
    keys.deployedFactoryAddress
)

export default instance