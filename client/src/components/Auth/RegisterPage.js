import React, { Component } from 'react';
import Auth from '../Auth';
import './LoginPage.css';
import { Link } from 'react-router-dom';

class RegisterPage extends Component {
  constructor() {
    super();
    this.state = { email: '', password: '', error: null };
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePassChange = this.handlePassChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    document.body.classList.toggle('subpage', true);
  }
  handleEmailChange(e) {
    this.setState({email: e.target.value});
  }
  handlePassChange(e) {
    this.setState({password: e.target.value});
  }
  handleSubmit(e) {
      e.preventDefault();
      var a = this;
      // On submit of the form, send a POST request with the data to the server.
      fetch('/auth/register', {
        method: 'POST',
        body: JSON.stringify({
          email: this.state.email,
          password: this.state.password
        }),
        headers: { "Content-Type": "application/json" }
      }).then(function(response){
        if (!response.ok) {
          a.setState({error: "Error:" + response.statusText.toString()});
        } else {
          response.json().then(function(data) {
              Auth.authenticateUser(data.ses_token);
              a.props.history.push("/profile");
          });
        }
      })
  }
  render() {
    return (
        <div className="inner">
          <div className="form-width-constraint">
            <div className="errors">
              <p>{this.state.error != null ? this.state.error : ''}</p>
            </div>
            <form onSubmit={this.handleSubmit}>
              Email Address:<br/>
              <input type="text" onChange={this.handleEmailChange} name="email"/><br/>
              Password:<br/>
              <input type="password" onChange={this.handlePassChange} name="password"/><br/>
              <input type="submit" value="Register"/>
              <Link to="/login">Already have an account? Click here.</Link>
            </form>
          </div>
         </div>
    );
  }
}

export default RegisterPage;
