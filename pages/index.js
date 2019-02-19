import React, { Component } from 'react'
import factory from '../ethereum/factory'
import { Card, Button } from 'semantic-ui-react';
import Layout from '../components/Layout'

class CampaignIndex extends Component {

    // -- Next.js initial props --
    /// Used to fetch some information before rendering the page
    static async getInitialProps() {
        const campaigns = await factory.methods.getDeployedCampaigns().call()
        return { campaigns }
    }

    // -- Helper Functions --
    /// Build the campaigns array and pass it to the caller
    renderCampaigns() {
        const items = this.props.campaigns.map(address => {
            return {
                header: address,
                description: <a>View Campaign</a>,
                fluid: true
            }
        })

        return <Card.Group items= { items }/>
    }

    // -- Render --
    render() {
        return (
            <Layout>
                <div>
                    <link
                        rel="stylesheet"
                        href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css"
                    />
                    <h3>Open Campaigns</h3>
                    {this.renderCampaigns()}
                    <Button
                        content= 'Create Campaign'
                        icon= 'add'
                        primary
                    />
                </div>
            </Layout>
        )
    }
}

// -- Export --
// next.js requires that this file exports a component, otherwise it will throw an error
export default CampaignIndex