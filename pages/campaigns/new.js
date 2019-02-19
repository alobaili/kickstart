import React, { Component } from 'react'
import { Form, Button } from 'semantic-ui-react'
import Layout from '../../components/Layout'

class CampaignNew extends Component {
    

    // -- Render --
    render() {
        return(
            <Layout>
                <h3>Create a Campaign</h3>

                <Form>
                    <Form.Field>
                        <label>Minimum Contribution</label>
                        <input />
                    </Form.Field>
                    <Button primary>Create</Button>
                </Form>
            </Layout>
        )
    }
}

export default CampaignNew