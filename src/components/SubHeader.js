import React, { Component } from 'react';
import { Grid, Row, Col, Badge, ListGroup, ListGroupItem, Button } from 'react-bootstrap';

import {admin} from '../firebase.js';

// Initialize firestore
let db = admin.firestore();
// Disable deprecated features
db.settings({
  timestampsInSnapshots: true
});

class SubHeader extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: false,
      userEmail: '',
      modalIsOpen: false
    };
    this.resetEmail = this.resetEmail.bind(this);

    this.loadData = this.loadData.bind(this);
  }

  componentDidMount() {
    admin.auth().onAuthStateChanged((user) => {
      if(user === null) {
        this.setState({redirect: true});
      }
    this.setState({userEmail: user.email});
      var data = {
        name: user.displayName,
        email: user.email,
        dashboards: 'IT'
      };

      // Add a new document in collection "cities" with ID 'LA'
      var userRef = db.collection('users').doc(user.uid);

      var setWithOptions = userRef.set(data, {merge: true});
    });
  }

  // reset email
  resetEmail() {
    console.log('reset email is: ', this.state.userEmail);
    admin.auth().sendPasswordResetEmail(this.state.userEmail).then(function() {
      // Email sent.
      alert('A password reset email has been sent');
    }).catch(function(error) {
      // An error happened.
    });
    // console.log('useremail is: ', this.state.userEmail);
  }

  loadData() {
    console.log('clicked');
  }

  render() {
    return (
      <div>
        <Button bsStyle="link" onClick={this.resetEmail}>Reset Password</Button>
        <Button bsStyle="link" onClick={this.loadData}>Load Data</Button>
      </div>
    );
  }
}

export default SubHeader;
