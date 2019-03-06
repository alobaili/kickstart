import React, { Component } from 'react'
import factory from '../ethereum/factory'
import { Card, Button } from 'semantic-ui-react';
import Layout from '../components/Layout'
import { Link } from '../routes'


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
                description: (
                    <Link route={`/campaigns/${address}`}>
                        <a>View Campaign</a>
                    </Link>
                ),
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
                    <h3>Open Campaigns</h3>
                    
                    <Link route='/campaigns/new'>
                        <a>
                            <Button
                                content= 'Create Campaign'
                                icon= 'add'
                                primary
                                floated= 'right'
                            />
                        </a>
                    </Link>

                    {this.renderCampaigns()}
                </div>
            </Layout>
        )
    }
}

// -- Export --
// next.js requires that this file exports a component, otherwise it will throw an error
export default CampaignIndex