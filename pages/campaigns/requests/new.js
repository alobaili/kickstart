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
        recipient: ''
    }

    // -- Next.js initial props --
    /// Used to fetch some information before rendering the page
    static async getInitialProps(props) {
        const { address } = props.query

        return { address }
    }

    // -- Render --
    render() {
        return (
            <Layout>
                <h3>Create a Request</h3>
                <Form>
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

                    <Button primary>Create!</Button>
                </Form>
            </Layout>
        )
    }
}

export default RequestNew