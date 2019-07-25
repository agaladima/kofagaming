import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { admin } from '../firebase';

class Logout extends Component {
  constructor() {
    super()
    this.state = {
      redirect: false
    }
  }

  componentWillMount() {
      admin.auth().signOut().then((user) => {
        this.setState({ redirect: true});
      });
  }

  render() {
    if (this.state.redirect === true){
      return <Redirect to="/" />
    }
    return (
      <div>Logging Out</div>
    )
  }
}

export default Logout;
