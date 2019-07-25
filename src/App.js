import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch, Link, NavLink } from 'react-router-dom';

import { admin } from './firebase.js';

import Navigation from './components/Navigation';
import Login from './components/Login';
import Home from './components/Home';
import Contact from './components/Contact';
import Dashboards from './components/Dashboards';
import Logout from './components/Logout';
import Register from './components/Register';
import LastTen from './components/LastTen';
import Events from './components/Events';
import ActiveGame from './components/ActiveGame';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user:{},
      authenticated: false,
      name: 'Arum',
      data: '',
    };
  }

  componentWillMount() {
    // lets us know whether the user is authenticated or not
    this.removeAuthListener = admin.auth().onAuthStateChanged((user) => {
      if(user) {
        this.setState({authenticated: true, loading: false});

      } else {
        this.setState({authenticated: false, loading: false});
        //console.log('state in unmount:', this.state.authenticated);
      }
    });
  }

  componentDidMount(){
    // this.authListener();
  }

  componentWillUnmount() {
    this.removeAuthListener();
  }

  authListener() {
    admin.auth().onAuthStateChanged((user) => {
      // console.log(user);
      if(user) {
        this.setState({user});
      //  localStorage.setItem('user', user.uid);
      } else {
        this.setState({user: null});
      //  localStorage.removeItem('user');
      }
    });
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navigation authenticated={this.state.authenticated} />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/contact" component={Contact} />
            <Route path="/dashboards" component={Dashboards} />
            <Route path="/logout" component={Logout} />
            <Route path="/register" component={Register} />
            <Route path="/lastten" component={LastTen} />
            <Route path="/events" component={Events} />
            <Route path="/activegame" component={ActiveGame} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
