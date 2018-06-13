import React, { Component } from 'react'
import { Input, Button, Card, Form } from 'semantic-ui-react'
import { userStore } from '../stores/userStore';

const Apiomat = window.Apiomat

export class Login extends Component{
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            submitting: false
        }
    }

    handleTextInput(event) {
        const { name, value } = event.target
        this.setState({ [name]: value })
    }

    /** handles the submit event from the login form */
    submit() {
        this.setState({ submitting: true })
        const { username, password } = this.state

        this.login(username, password)
    }

    /**
     * logs in the user via username:password
     * @param {string} username 
     * @param {string} password 
     */
    login(username, password) {
        /** Call this on successfull login */
        const successAction = (authenticatedUser) => {
            this.setState({ submitting: false })
            userStore.setUser(authenticatedUser)
            this.props.history.push('/')
        }

        /** Call this on unsuccessful login */
        const errorAction = (err) => {
            this.setState({ submitting: false })
            console.error(err)
        }


        /** Do your login action here */

        const user = new Apiomat.TankUser(username, password)
        Apiomat.Datastore.configureWithCredentials(user)

        user.loadMe({
            onOk: () => {
                user.requestSessionToken(true, {
                    onOk: (tokenMap) => successAction(user),
                    onError: (err) => errorAction(err)
                })
            },
            onError: (err) => errorAction(err)
        })
    }

    render() {
        return (
            <Card.Group centered>
                <Card>
                    <Card.Content>
                        <Form>
                            <Form.Field>
                                <Input 
                                    placeholder="Username" 
                                    name="username" 
                                    onChange={this.handleTextInput.bind(this)}/>
                            </Form.Field>
                            <Form.Field>
                                <Input 
                                    placeholder="Password" 
                                    type="password" 
                                    name="password" 
                                    onChange={this.handleTextInput.bind(this)}/>
                            </Form.Field>
                            <Form.Field>
                                <Button 
                                    primary 
                                    onClick={this.submit.bind(this)} 
                                    disabled={this.state.submitting} 
                                    loading={this.state.submitting}
                                    style={{width: '100%'}}>
                                    Log In
                                </Button>
                            </Form.Field>
                        </Form>    
                    </Card.Content>
                </Card>
            </Card.Group>
          )
    }
  
}
