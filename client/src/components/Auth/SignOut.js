import React, { Component } from 'react';
import Auth from '../Auth';

class SignOutPage extends Component {
  constructor() {
    super();
  }
  componentDidMount() {
    document.body.classList.toggle('subpage', true);
    Auth.deauthenticateUser();
    this.props.history.push("/login");
  }
  render() {
    return (
      <div>Signing Out!</div>
    );
  }
}

export default SignOutPage;
