import React, { Component } from 'react'
import { Form, Button, Message, Input } from 'semantic-ui-react'
import Campaign from '../../../ethereum/campaign'
import web3 from '../../../ethereum/web3'
import { Link, Router } from '../../../routes'
import Layout from '../../../components/Layout'

class RequestNew extends Component {
    state = {
        value: '',
        descroption: '',
        recipient: '',
        loading: false,
        errorMessage: ''
    }

    // -- Next.js initial props --
    /// Used to fetch some information before rendering the page
    static async getInitialProps(props) {
        const { address } = props.query

        return { address }
    }

    onSubmit = async event => {
        event.preventDefault()

        this.setState({ loading: true, errorMessage: ''})

        const campaign = Campaign(this.props.address)
        const { descroption, value, recipient } = this.state

        try {
            const accounts = await web3.eth.getAccounts()
            await campaign.methods.createRequest(
                descroption,
                web3.utils.toWei(value, 'ether'),
                recipient
            ).send({
                from: accounts[0],
                gas: '1000000'
            })

            Router.pushRoute(`/campaigns/${this.props.address}/requests`)
        } catch (err) {
            this.setState({ errorMessage: err.message })
        }

        this.setState({ loading: false })
    }

    // -- Render --
    render() {
        return (
            <Layout>
                <Link route={`/campaigns/${this.props.address}/requests`}>
                    <a>Back</a>
                </Link>
                <h3>Create a Request</h3>
                <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                    <Form.Field>
                        <label>Descroption</label>
                        <Input
                            value={this.state.descroption}
                            onChange={event => this.setState({ descroption: event.target.value })}
                        />
                    </Form.Field>

                    <Form.Field>
                        <label>Value in Ether</label>
                        <Input
                            value={this.state.value}
                            onChange={event => this.setState({ value: event.target.value })}
                        />
                    </Form.Field>

                    <Form.Field>
                        <label>Recipient</label>
                        <Input
                            value={this.state.recipient}
                            onChange={event => this.setState({ recipient: event.target.value })}
                        />
                    </Form.Field>
                    <Message error header='Oops!' content={this.state.errorMessage}/>
                    <Button primary loading={this.state.loading}>Create!</Button>
                </Form>
            </Layout>
        )
    }
}

export default RequestNew