import React, { Component } from 'react';
import AuthService from './AuthService';

export default function withAuth(AuthComponent) {
  console.log("Entering withAuth function")

  const Auth = new AuthService('http://localhost:3000');
  console.log(Auth.loggedIn())
  return class AuthWrapped extends Component {
    constructor() {
      super();
      this.state = {
          user: null
      }
    }

    componentDidMount() {
      console.log("Running componentDidMount");
      if (!Auth.loggedIn()) {
          console.log("Not logged in")
          this.props.history.replace('/login')
      }
      else {
          console.log("Hasn't logged in yet")
          try {
              const profile = Auth.getProfile()
              this.setState({
                  user: profile
              })
          }
          catch(err){
              console.log("Failed to decode token")
              Auth.logout()
              this.props.history.replace('/login')
          }
      }
    }

    render() {
      if (this.state.user) {
          return (
              <AuthComponent history={this.props.history} user={this.state.user} />
          )
      }
      else {
          return null
      }
    }
  }
}
