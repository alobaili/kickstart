import React, { Component } from 'react'
import Layout from '../../components/Layout'
import Campaign from '../../ethereum/campaign'
import { Card, Grid, Button } from 'semantic-ui-react';
import web3 from '../../ethereum/web3'
import ContributeForm from '../../components/ContributeForm'
import { Link } from '../../routes'

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
            address: props.query.address,
            minimumContribution: summary[0],
            balance: summary[1],
            requestsCount: summary[2],
            approversCount: summary[3],
            manager: summary[4]
        }
    }

    // -- Helper Functions --
    // create card group
    renderCards() {
        const {
            minimumContribution,
            balance,
            requestsCount,
            approversCount,
            manager
        } = this.props

        const items = [
            {
                header: manager,
                meta: 'Address of Manager',
                description: 'The manager created this campaign and can create requests to withdraw money',
                style: {overflowWrap: 'break-word'}
            },
            {
                header: minimumContribution,
                meta: 'Minimum Contribution (wei)',
                description: 'You must contrubute at least this much wei to become an approver'
            },
            {
                header: requestsCount,
                meta: 'Number of Requests',
                description: 'A request tries to withdraw money from the contract. Requests must be approved by approvers'
            },
            {
                header: approversCount,
                meta: 'Number of Approvers',
                description: 'Number of people who have already donated to this campaign'
            },
            {
                header: web3.utils.fromWei(balance, 'ether'),
                meta: 'Campaign Balance (ether)',
                description: 'The balance is how much money this campaign has left to spend'
            }
        ]

        return <Card.Group items={items} />
    }


    // -- Render --
    render() {
        return (
            <Layout>
                <h3>Campaign Show</h3>
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={10}>
                            {this.renderCards()}
                        </Grid.Column>

                        <Grid.Column width={6}>
                            <ContributeForm address={this.props.address}/>
                        </Grid.Column>
                    </Grid.Row>

                    <Grid.Row>
                        <Grid.Column>
                            <Link route={`/campaigns/${this.props.address}/requests`}>
                                <a>
                                    <Button primary>View Requests</Button>
                                </a>
                            </Link>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Layout>
        )
    }
}

export default CampaignShow