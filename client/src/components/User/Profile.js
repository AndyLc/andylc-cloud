import React, { Component } from 'react';
import Auth from '../Auth';
import './Profile.css';
import update from 'immutability-helper';

class Profile extends Component {
  fetchAndSet(obj, a, data, i) {
    fetch(obj.code, {
      method: 'GET',
      headers: {
        'Authorization': process.env.DEVICE_SECRET,
      }
    }).then(function(resp) {
      resp.json().then(function(data) {
        for (var j = 0; j < data.length; j++) {
          console.log(data[j].device_name);
          console.log(obj["name"]);
          if (data[j].device_name == obj["name"]) {
            console.log("true");
            obj["data"] = data[j].device_data;
          }
        }
        a.setState(update(a.state.devices,
          { $splice: [[i, 1, obj]] }
        ));
      })
    }).catch(function(err) {
      for (var j = 0; j < data.length; j++) {
        if (data[j].device_name == obj["name"]) {
          obj["data"] = err.message;
        }
      }
      a.setState(update(a.state.devices,
        { $splice: [[i, 1, obj]] }
      ));
    })
  }
  constructor() {
    super();
    this.state = { email: '', code: '', error: '', name: '', devices: []};
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleCodeChange = this.handleCodeChange.bind(this);
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
              obj.data = "FETCHING...";
              return obj;
            })
            a.setState({devices: devices});
            for (var i = 0; i < a.state.devices.length; i++) {
              a.fetchAndSet(a.state.devices[i], a, data, i);
            }
          });
        }
      })
    }
  }
  handleNameChange(e) {
    this.setState({name: e.target.value});
  }
  handleCodeChange(e) {
    this.setState({code: e.target.value});
  }
  createDevice(e) {
    e.preventDefault();
    var a = this;
    var name = this.state.name;
    var code = this.state.code;
    fetch('/api/devices/create', {
      method: 'POST',
      body: JSON.stringify({
        name: name,
        code: code
      }),
      headers: {
        "Content-Type": "application/json",
        "Authorization": Auth.getToken()
      }
    }).then(function(response) {
      if (!response.ok) {
        console.log(response);
      } else {
        response.json().then(function(data) {
          console.log(data);
          a.setState({devices: a.state.devices.concat({name: name, id: data.id, code: code})});
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
              Device Code:<br/>
              <input type="text" onChange={this.handleCodeChange} name="code"/><br/>
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
                     <p>Code: {d.code}</p>
                     <p>Data: {d.data}</p>
                     <br/>
                   </div>;
          })}
        </div>
      )
    }
  };

export default Profile;
