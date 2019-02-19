import React, { Component } from 'react'
import { Form, Button, Input, Message } from 'semantic-ui-react'
import Layout from '../../components/Layout'
import factory from '../../ethereum/factory'
import web3 from '../../ethereum/web3'

class CampaignNew extends Component {
    state= {
        minimumContribution: '',
        errorMessage: '',
        loading: false
    }

    // -- Actions --
    onSubmit = async (event) => {
        // Prevent default submit behaviour
        event.preventDefault()

        this.setState({ loading: true , errorMessage: '' })

        try {
            // Fetch the list of accounts
            const accounts = await web3.eth.getAccounts()

            // Attempt to create a campaign from the first account using the campaign factory
            await factory.methods
                .createCampaign(this.state.minimumContribution)
                .send({
                    from: accounts[0]
                })
        } catch (error) {
            this.setState({ errorMessage: error.message })
        }

        this.setState({ loading: false })
    }

    // -- Render --
    render() {
        return(
            <Layout>
                <h3>Create a Campaign</h3>

                <Form onSubmit= {this.onSubmit} error={!!this.state.errorMessage}>
                    <Form.Field>
                        <label>Minimum Contribution</label>
                        <Input
                            label= 'wei'
                            labelPosition= 'right'
                            value= {this.state.minimumContribution}
                            onChange= {event => this.setState({ minimumContribution: event.target.value })}
                        />
                    </Form.Field>
                    <Message error header='Ooops!' content={this.state.errorMessage}/>
                    <Button loading={this.state.loading} primary>Create</Button>
                </Form>
            </Layout>
        )
    }
}

export default CampaignNew