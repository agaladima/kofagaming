import React, { Component } from 'react';
import { Grid, Row, Col, Badge, ListGroup, ListGroupItem, Button } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import {admin} from '../firebase.js';
import TableauReport from 'tableau-react';
import axios from 'axios';

import Dashes from '../Dashboards.json';
import SubHeader from './SubHeader.js';
import PrizeCarousel from './PrizeCarousel';

// Initialize firestore
let db = admin.firestore();
// Disable deprecated features
db.settings({
  timestampsInSnapshots: true
});

class Dashboards extends Component {
    constructor(props) {
        super(props);

        this.state = {
          redirect: false,
          userEmail: '',
          modalIsOpen: false,
          koyn: 0,
          koynsAvailable: 0
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.resetEmail = this.resetEmail.bind(this);

        this.loadData = this.loadData.bind(this);
        this.fetchData = this.fetchData.bind(this);

        // this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    handleChange(e) {
      let target = e.target;
      let value = target.type === 'checkbox' ? target.checked : target.value;
      let name = target.name;

      this.setState({
        [name]: value,
      });
    }

    componentDidMount(){
      // Get authenticated user's email address
      admin.auth().onAuthStateChanged((user) => {
        if(user === null) {
          this.setState({redirect: true});
        }
        this.setState({userEmail: user.email});
        this.loadData();
        this.fetchData();
        // this.setState({koyn: 13});
      });
    }

    async fetchData(){
      const currUserData = await fetch('http://localhost:5000/dashboard');
      const jsonUser = await currUserData.json();
      // console.log(jsonUser);
      this.setState({koyn: jsonUser.userData.koyns});
      this.setState({koynsAvailable: jsonUser.userData.koynsAvailable});
    }

    loadData() {
      console.log('clicked');
      var currUser = [];
      let theKoyns = 0;

      // var setWithOptions = userRef.set(data, {merge: true});
      //  Send user email address to retrieve appropriate data from server
      let data = {email: this.state.userEmail};
      fetch('http://localhost:5000/dashboard' , {
        method: "POST",
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      .then((result) => result.json())
      .then((info) => { console.log('info sent from dashboard',info); });

      db.collection("userData").where("email", "==", this.state.userEmail)
      .onSnapshot(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          currUser.push(doc.data());
          theKoyns = currUser[0].koyns;
          // this.setState({koyns: theKoyns});
          console.log(currUser[0].koyns);
          console.log(theKoyns);
          // this.setState({koyns: currUser[0].koyns});
        });
        // theKoyns = currUser[0].koyns;
        // console.log("Current Koyns:", currUser[0].koyns);
        console.log("Observe data:", currUser);
      });
      // this.setState({koyns: theKoyns});
      // this.setState({koyns: currUser[0].koyns});
      console.log(this.state.koyn);
      console.log(this.props.dataSent);
      console.log('koyns: ', currUser.length);
      console.log('Outside Auth', currUser);
      console.log('theKoyns', theKoyns);
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

    openModal() {
      this.setState({modalIsOpen: true});
    }

    afterOpenModal() {
      // references are now sync'd and can be accessed.
      this.subtitle.style.color = '#f00';
    }

    closeModal() {
      this.setState({modalIsOpen: false});
    }

    componentWillMount() {

    }
    componentWillUnmount() {

    }

    handleSubmit(e) {
      e.preventDefault();
      //on submit, set data in firebase equal to this new data
    }

    render() {
      if(this.state.redirect === true) {
        return <Redirect to='/login' />
      }
        return (
          <div>
            <div className="Dashboard">
              <div className="widgRow">
                <div className="WidgetItem">
                  <h4>KoynCount</h4>
                  <Badge>Koyns: {this.state.koyn}</Badge><br/>
                  <Badge>Koyns available: {this.state.koynsAvailable}</Badge>
                </div>
                <div className="WidgetItem">
                  <h4>TotalMatchesPlayed</h4>
                  <Badge>97</Badge>
                </div>
                <div className="WidgetItem">
                  <h4>CurrentMatchesOpened</h4>
                  <Link to="/activegame"><Badge>Start a match</Badge></Link>
                  <Badge>End a match</Badge>
                  <Badge>View all current matches</Badge>
                  <Badge>View match history</Badge>
                </div>
                <div className="WidgetItem">
                  <h4>WinLossRatio</h4>
                  <Badge>1.15</Badge>
                </div>
                <div className="WidgetItem">
                  <h4>EditAccount</h4>
                  <Badge>Edit email</Badge>
                  <Badge>Edit password</Badge>
                  <Badge>Edit address</Badge>
                  <Badge>Edit payment info</Badge>
                  <Badge>Edit preferred system</Badge>
                </div>
                <PrizeCarousel />
              </div>
            </div>
          </div>
        );
    }
}
export default Dashboards;
