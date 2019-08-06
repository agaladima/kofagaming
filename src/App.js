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
      data: [],
      id: 0,
      message: null,
      intervalIsSet: false,
      idToDelete: null,
      idToUpdate: null,
      objectToUpdate: null,
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
    // when component mounts, first thing it does is fetch all existing data in our db
    // then we incorporate a polling logic so that we can easily see if our db has
    // changed and implement those changes into our UI
    componentDidMount() {
      this.getDataFromDb();
      if (!this.state.intervalIsSet) {
        let interval = setInterval(this.getDataFromDb, 1000);
        this.setState({ intervalIsSet: interval });
      }
  }

  componentWillUnmount() {
    this.removeAuthListener();
    if (this.state.intervalIsSet) {
      clearInterval(this.state.intervalIsSet);
      this.setState({ intervalIsSet: null });
    }
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

  // just a note, here, in the front end, we use the id key of our data object
  // in order to identify which we want to Update or delete.
  // for our back end, we use the object id assigned by MongoDB to modify
  // data base entries

  // our first get method that uses our backend api to
  // fetch data from our data base
  getDataFromDb = () => {
    fetch('http://localhost:3001/api/getData')
      .then((data) => data.json())
      .then((res) => this.setState({ data: res.data }));
  };

  // our put method that uses our backend api
  // to create new query into our data base
  putDataToDB = (message) => {
    let currentIds = this.state.data.map((data) => data.id);
    let idToBeAdded = 0;
    while (currentIds.includes(idToBeAdded)) {
      ++idToBeAdded;
    }

    axios.post('http://localhost:3001/api/putData', {
      id: idToBeAdded,
      message: message,
    });
  };

  // our delete method that uses our backend api
  // to remove existing database information
  deleteFromDB = (idTodelete) => {
    parseInt(idTodelete);
    let objIdToDelete = null;
    this.state.data.forEach((dat) => {
      if (dat.id == idTodelete) {
        objIdToDelete = dat._id;
      }
    });

    axios.delete('http://localhost:3001/api/deleteData', {
      data: {
        id: objIdToDelete,
      },
    });
  };

  // our update method that uses our backend api
  // to overwrite existing data base information
  updateDB = (idToUpdate, updateToApply) => {
    let objIdToUpdate = null;
    parseInt(idToUpdate);
    this.state.data.forEach((dat) => {
      if (dat.id == idToUpdate) {
        objIdToUpdate = dat._id;
      }
    });

    axios.post('http://localhost:3001/api/updateData', {
      id: objIdToUpdate,
      update: { message: updateToApply },
    });
  };

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
