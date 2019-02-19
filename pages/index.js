import React, { Component } from 'react'
import factory from '../ethereum/factory'

class CampaignIndex extends Component {

    // -- Life Cycle --
    async componentDidMount() {
        const campaigns = await factory.methods.getDeployedCampaigns().call()

        console.log(campaigns)
    }

    // -- Render --
    render() {
        return <div>Campaigns Index!</div>
    }
}

// -- Export --
// next.js requires that this file exports a component, otherwise it will throw an error
export default CampaignIndex