import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App';
import Auth from './components/Auth';
import LoginPage from './components/Auth/LoginPage';
import RegisterPage from './components/Auth/RegisterPage';
import SignOut from './components/Auth/SignOut';
import Profile from './components/User/Profile';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter, Link, Route } from 'react-router-dom';

function Nav() {
  const isLoggedIn = Auth.isUserAuthenticated();
  if (!isLoggedIn) {
    return <Link to="/login">Login</Link>;
  }
  return <div><Link to="/profile">Profile</Link><Link to="/signout">Sign Out</Link></div>;
}

ReactDOM.render((
    <BrowserRouter>
    <div>
    <header id="header">
        <div className="inner">
            <Link to="/" className="logo">AndyLc Cloud</Link>
            <nav id="nav">
                <Nav/>
            </nav>
            <a href="#navPanel" className="navPanelToggle"><span className="fa fa-bars"></span></a>
        </div>
    </header>
    <Route exact path="/" component={App}/>
    <Route path="/login" component={LoginPage}/>
    <Route path="/register" component={RegisterPage}/>
    <Route path="/profile" component={Profile}/>
    <Route path="/signout" component={SignOut}/>
    </div>
    </BrowserRouter>
), document.getElementById('root'));

registerServiceWorker();
