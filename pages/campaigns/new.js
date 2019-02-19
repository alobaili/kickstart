import React, { Component } from 'react'
import { Form, Button, Input } from 'semantic-ui-react'
import Layout from '../../components/Layout'
import factory from '../../ethereum/factory'
import web3 from '../../ethereum/web3'

class CampaignNew extends Component {
    state= {
        minimumContribution: ''
    }

    // -- Actions --
    onSubmit = async (event) => {
        // Prevent default submit behaviour
        event.preventDefault()

        // Fetch the list of accounts
        const accounts = await web3.eth.getAccounts()

        // Attempt to create a campaign from the first account using the campaign factory
        await factory.methods
            .createCampaign(this.state.minimumContribution)
            .send({
                from: accounts[0]
            })
    }

    // -- Render --
    render() {
        return(
            <Layout>
                <h3>Create a Campaign</h3>

                <Form onSubmit= {this.onSubmit}>
                    <Form.Field>
                        <label>Minimum Contribution</label>
                        <Input
                            label= 'wei'
                            labelPosition= 'right'
                            value= {this.state.minimumContribution}
                            onChange= {event => this.setState({ minimumContribution: event.target.value })}
                        />
                    </Form.Field>
                    <Button primary>Create</Button>
                </Form>
            </Layout>
        )
    }
}

export default CampaignNew