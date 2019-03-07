import React, { Component } from 'react'
import Layout from '../../components/Layout'
import Campaign from '../../ethereum/campaign'

class CampaignShow extends Component {

    // -- Next.js initial props --
    /// Used to fetch some information before rendering the page
    static async getInitialProps(props) {
        // this gets the address property that is stored in the URL every time the user views a campaign. The address prop is set in routes.js to
        // recognize the campaign address from the URL, Then assign it to a new instance of the Campaign smart contract.
        const campaign = Campaign(props.query.address)

        // call getSummery
        const summary = await campaign.methods.getSummary().call()

        // the return statement required by the getInitialProps function. We set props for our component from the summary call.
        return {
            minimumContribution: summary[0],
            balance: summary[1],
            requestsCount: summary[2],
            approversCount: summary[3],
            manager: summary[4]
        }
    }


    // -- Render --
    render() {
        return (
            <Layout>
                <h3>Campaign Show</h3>
            </Layout>
        )
    }
}

export default CampaignShow