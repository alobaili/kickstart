import React, { Component } from 'react'
import factory from '../ethereum/factory'

class CampaignIndex extends Component {

    // -- Next.js initial props --
    /// Used to fetch some information before rendering the page
    static async getInitialProps() {
        const campaigns = await factory.methods.getDeployedCampaigns().call()
        return { campaigns }
    }

    // -- Render --
    render() {
        return <div>{this.props.campaigns[0]}</div>
    }
}

// -- Export --
// next.js requires that this file exports a component, otherwise it will throw an error
export default CampaignIndex