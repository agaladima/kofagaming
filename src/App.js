import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch, Link, NavLink } from 'react-router-dom';
import axios from 'axios';

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
      datas: null
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
    // Call our fetch function below once the component mounts
    this.callBackendAPI()
      .then(res => this.setState({datas: res.userData}))
      .catch(err => console.log(err));
  }

  // Fetches our GET route from the Express server. (Note the route we are fetching matches the GET route from server.js)
  callBackendAPI = async () => {
    const response = await fetch('/dashboard');
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message)
    }
    return body;
  };

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
            <Route path="/dashboards" render={(props) => <Dashboards {...props} dataSent={this.state.datas} />} />
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
