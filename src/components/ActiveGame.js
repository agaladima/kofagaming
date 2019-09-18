import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Select from 'react-select';
import { admin } from '../firebase.js';
import moment from 'moment';
// Initialize firestore
let db = admin.firestore();
// Disable deprecated features
db.settings({
  timestampsInSnapshots: true
});

// Get a reference to the storage service, which is used to create references in your storage bucket
let storage = admin.storage();

// Create a storage ref from our storage service
let storageRef = storage.ref();

// Create a child reference
var imagesRef = storageRef.child('images');

// const timestamp = snapshot.get('created_at');
// const date = timestamp.toDate();

class ActiveGame extends Component {
    constructor() {
        super();

        this.state = {
            game: '',
            wager: 0,
            date: moment().format(),
            details: '',
            system: '',
            email: '',
            oppemail: '',
            upload: '',
            reviewStatus: 0,
            koyn: 0,
            koynsAvailable: 0,
            eventID: moment().format('X'),
            redirect: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleChangeFile = this.handleChangeFile.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.signup = this.signup.bind(this);
        this.addCollection = this.addCollection.bind(this);
        this.screenshotValidation = this.screenshotValidation.bind(this);
        this.eventValidation = this.eventValidation.bind(this);
        this.fetchData = this.fetchData.bind(this);
        this.koynsAvbFunc = this.koynsAvbFunc.bind(this);
    }

    componentDidMount(){
      this.fetchData();
      console.log('Number of Koyns: ', this.state.koyn);
    }

    handleChange(e) {
      let target = e.target;
      let value = target.type === 'checkbox' ? target.checked : target.value;
      let name = target.name;

      this.setState({
        [name]: value,
      });
      // this.setState({team});
    }

    handleChangeFile(e) {
      this.setState({
        upload: e.target.files[0],
      });
    }

    addCollection(){
      db.collection('activeGame').doc(this.state.email).set({
        game: this.state.game,
        wager: this.state.wager,
        date: this.state.date,
        system: this.state.system,
        email: this.state.initEmail,
        oppemail: this.state.oppemail,
        reviewStatus: this.state.reviewStatus,
        eventID: this.state.eventID,
        details: this.state.details,
        upload: this.state.upload
      })
      .then(function(){
        console.log('Document successfully written.');
      })
      .catch(function(error){
        console.error('Error writing document: ', error);
      });
    }

    signup(e){
      e.preventDefault();
      this.addCollection();

      admin.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(function(user) {
        window.location = "/dashboards";
      }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode == 'auth/weak-password') {
         alert('The password is too weak.');
       } else {
         alert(errorMessage);
       }
       console.log(error);
      });
    }

    // This function is to get data from the databaseRecord
    async fetchData(){
      const currUserData = await fetch('http://localhost:5000/activegame');
      const jsonData = await currUserData.json();
      // console.log(jsonUser);
      this.setState({koyn: jsonData.userData.koyns});
      // This is to get the available koyns to subtract from available koyns and
      this.setState({koynsAvailable: jsonData.userData.koynsAvailable});
      console.log('FetchData: ', jsonData.userData.koyns);
    }

    screenshotValidation(idNum){
      let file = this.state.upload;
      let numID = idNum;
      this.setState({eventID: numID});
      let screenshotRef = storageRef.child('screenshot/'+numID+'.jpg');
      screenshotRef.put(file).then(function(snapshot) {
        // console.log('Uploaded a blob or file!', this.state.eventID);
      });
    }

    koynsAvbFunc(){
      let data = {data: "Not really significant"};
      fetch('http://localhost:5000/koynsavailable' , {
        method: "POST",
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      .then((result) => result.json())
      .then((info) => { console.log(info); });
    }

    eventValidation(data, eventID){
      // Add a new document in collection "cities" with ID 'LA'
      var eventRef = db.collection('activeGame').doc(eventID);

      var setWithOptions = eventRef.set(data, {merge: true});
    }

    handleSubmit(e) {
      e.preventDefault();
      //console.log(moment().format());

      // Need to make sure that the initiator email and opponent email are not the same
      if(this.state.email == this.state.oppemail) {
        window.alert("Hey hey now! You can't be your own opponent. That sorcery doesn't exist...");
      } else if (this.state.wager > this.state.koynsAvailable) {
        window.alert(`Oops! You can't wager your entire Koyn collection. You have ${this.state.koynsAvailable} Koyns!`);
      } else if(this.state.wager <= 0) {
        window.alert("Hey! Make sure you wager something kind person.")
      } else {
        this.screenshotValidation(this.state.eventID);
        let user = admin.auth().currentUser;
        let data = {
          game: this.state.game,
          wager: this.state.wager,
          date: this.state.date,
          system: this.state.system,
          email: user.email,
          oppemail: this.state.oppemail,
          reviewStatus: this.state.reviewStatus,
          eventID: this.state.eventID,
          details: this.state.details
        };
        fetch('http://localhost:5000/activegame' , {
          method: "POST",
          headers: {
            'Content-type': 'application/json'
          },
          body: JSON.stringify(data)
        })
        .then((result) => result.json())
        .then((info) => { console.log(info); });
        this.koynsAvbFunc();
      this.eventValidation(data, this.state.eventID);
      this.setState({redirect: true});
      }
    }

    render() {
      if(this.state.redirect === true){
        return <Redirect to='/' />
      }
        return (
        <div className="FormCenter">
            <form onSubmit={this.handleSubmit} className="FormFields">
              <div className="FormField">
                <label className="FormField__Label" htmlFor="fname">Game</label>
                <input type="text" id="game" className="FormField__Input" placeholder="What game are you playing?" name="game" value={this.state.game} onChange={this.handleChange} />
              </div>
              <div className="FormField">
                <label className="FormField__Label" htmlFor="system">Gaming System Preference</label>
                <input type="text" id="system" className="FormField__Input" placeholder="Enter your preferred system" name="system" value={this.state.system} onChange={this.handleChange} />
              </div>
              <div className="FormField">
                <label className="FormField__Label" htmlFor="details">Additional Details</label>
                <input type="text" id="details" className="FormField__Input" placeholder="Enter additional details of this match" name="details" value={this.state.details} onChange={this.handleChange} />
              </div>
              <div className="FormField">
                <label className="FormField__Label" htmlFor="oppemail">Opponent Email</label>
                <input type="email" id="oppemail" className="FormField__Input" placeholder="Enter your opponents email" name="oppemail" value={this.state.oppemail} onChange={this.handleChange} />
              </div>
              <div className="FormField">
                <label className="FormField__Label" htmlFor="wager">Wager Amount</label>
                <input type="number" id="wager" className="FormField__Input" placeholder="Enter a coin wager amount" name="wager" value={this.state.wager} onChange={this.handleChange} />
              </div>
              <div className="FormField">
                <label className="FormField__Label" htmlFor="upload">Upload Screenshot</label>
                <input type="file" id="upload" className="FormField__Input" placeholder="Upload the screenshot of your your game results" name="upload" onChange={this.handleChangeFile} />
              </div>
              <div className="FormField">
                  <button className="FormField__Button mr-20">Start</button>
              </div>
            </form>
          </div>
        );
    }
}
export default ActiveGame;
