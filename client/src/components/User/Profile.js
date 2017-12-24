import React, { Component } from 'react';
import Auth from '../Auth';
import './Profile.css';

class Profile extends Component {
  constructor() {
    super();
    this.state = { email: '', error: '', name: '', devices: []};
    this.handleNameChange = this.handleNameChange.bind(this);
    this.createDevice = this.createDevice.bind(this);
  }
  componentDidMount() {
    document.body.classList.toggle('subpage', true);
    var a = this;
    if (!Auth.isUserAuthenticated()) {
      this.props.history.push("/login");
    } else {
      fetch('/api/users/profile', {
        method: 'GET',
        headers: { "Authorization": Auth.getToken() }
      }).then(function(response) {
        if (!response.ok) {
          a.setState({error: "Error:" + response.statusText.toString()});
          a.props.history.push("/");
          Auth.deauthenticateUser();
        } else {
          response.json().then(function(data) {
            a.setState({email: data.user.email});
          });
        }
      })

      fetch('/api/devices', {
        method: 'GET',
        headers: { "Authorization": Auth.getToken() }
      }).then(function(response) {
        if (!response.ok) {
          console.log(response);
        } else {
          response.json().then(function(data) {
            var devices = data.devices.map(function(obj) {
               var rObj = {};
               rObj["id"] = obj.id;
               rObj["name"] = obj.name;
               rObj["data"] = JSON.stringify(obj.data);
               return rObj;
            });
            a.setState({devices: devices});
          });
        }
      })
    }
  }
  handleNameChange(e) {
    this.setState({name: e.target.value});
  }
  createDevice(e) {
    e.preventDefault();
    var a = this;
    var name = this.state.name;
    fetch('/api/devices/create', {
      method: 'POST',
      body: JSON.stringify({
        name: name
      }),
      headers: { "Content-Type": "application/json", "Authorization": Auth.getToken() }
    }).then(function(response) {
      if (!response.ok) {
        console.log(response);
      } else {
        response.json().then(function(data) {
          console.log(data);
          a.setState({devices: a.state.devices.concat({name: name, id: data.id})});
        });
      }
    })
  }
  render() {
    return (
        <div className="inner">
          <h3>Profile for {this.state.email}</h3>
          <div className="Devices">
          <h4>Your Devices</h4>
            <DeviceList devices={this.state.devices}/>
          </div>
          <hr/>
          <div className="newDevice">
          <h4>Create a New Device</h4>
            <form onSubmit={this.createDevice}>
              Device Name:<br/>
              <input type="text" onChange={this.handleNameChange} name="name"/><br/>
              <input type="submit" value="Create"/>
            </form>
          </div>
        </div>
    );
  }
}

class DeviceList extends Component {
    render() {
      return (
        <div>
          {this.props.devices.map(function(d){
            return <div key={d.id}>
                     <h5>{d.name}</h5>
                     <p>ID: {d.id}</p>
                     <p>Status: OFFLINE</p>
                     <p>Data: {d.data}</p>
                     <br/>
                   </div>;
          })}
        </div>
      )
    }
  };

export default Profile;
