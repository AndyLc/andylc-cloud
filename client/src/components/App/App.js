import React, { Component } from 'react';
import './App.css';
import LoginPage from '../Auth/LoginPage';
import { BrowserRouter, Link, Route } from 'react-router-dom';

class App extends Component {
  state = {users: []}
  componentDidMount() {
    document.body.classList.toggle('subpage', false);
  }
  render() {
    return (
        <div>
        <section id="banner">
            <div className="inner">
                <header>
                    <h1>Welcome to AndyLc Cloud</h1>
                </header>
                <div className="flex ">
                    <div>
                        <span className="icon fa-bar-chart"></span>
                        <h3>Analytics</h3>
                        <p>View real time data of your devices</p>
                    </div>

                    <div>
                        <span className="icon fa-cloud"></span>
                        <h3>Storage</h3>
                        <p>Store your device data in the cloud</p>
                    </div>

                    <div>
                        <span className="icon fa-wifi"></span>
                        <h3>Connectivity</h3>
                        <p>Communicate with your devices live</p>
                    </div>

                </div>

                <footer>
                    <Link to="/login" className="button">Log In</Link>
                </footer>
            </div>
        </section>
        <section id="three" className="wrapper align-center">
            <div className="inner">
                <div className="flex flex-2">
                    <article>
                        <header>
                            <h3><span className="icon large fa-youtube-play"></span></h3>
                        </header>
                        <p>My youtube channel that displays my projects</p>
                        <footer>
                            <a href="#" className="button">Youtube</a>{/* TODO: ADD LINK */}
                        </footer>
                    </article>
                    <article>
                        <header>
                            <h3><span className="icon large fa-github"></span></h3>
                        </header>
                        <p>My github where you can find the code for my projects</p>
                        <footer>
                            <a href="https://github.com/AndyLc/andylc-cloud" className="button">Github</a>
                        </footer>
                    </article>
                </div>
            </div>
        </section>
        </div>
    );
  }
}

export default App;
