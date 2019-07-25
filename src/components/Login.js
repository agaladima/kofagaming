import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { admin } from '../firebase.js';
import * as firebase from 'firebase';
import Alert from 'react-s-alert';


class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            redirect: false,
            loading: true
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.signin = this.signin.bind(this);
        this.googleSignin = this.googleSignin.bind(this);
        this.passwordReset = this.passwordReset.bind(this);
    }

    handleChange(e) {
      let target = e.target;
      let value = target.type === 'checkbox' ? target.checked : target.value;
      let name = target.name;

      this.setState({
        [name]: value
      });
    }

    componentDidMount(){
      admin.auth().onAuthStateChanged((user) => {
        // console.log(user);
        if(user != null) {
          this.setState({redirect: true});
        }
      });
    }

    signin(e){
      e.preventDefault();
      admin.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
      .then((user, error) => {
        if (user) {
          this.setState({redirect: true, loading: false});
          console.log('state in redirect:', this.state.redirect);
        } else {
          console.log(error);
        }
      })
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // [START_EXCLUDE]
        if (errorCode === 'auth/wrong-password') {
          alert('Wrong password.');
        } else {
          alert(errorMessage);
        }
      });
    }

    passwordReset() {
      admin.sendPasswordResetEmail(this.state.email).then(function() {
        // Success on password reset email
        Alert.success('Check your email for a link to reset your password', {
            position: 'bottom-right',
            effect: 'slide',
            timeout: 'none'
        });

      }).catch(function(error) {
        // Log error
      });
    }

    googleSignin(e) {
      e.preventDefault();
      var provider = new firebase.auth.GoogleAuthProvider();
      var userUser;
      firebase.auth().signInWithPopup(provider).then(function(result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        userUser = user.displayName;
        // ...
        if(userUser.length > 0) {
          this.setState({redirect: true, loading: false});
          console.log('state in redirect:', this.state.redirect);
        }
        console.log(user.displayName);
      }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
    }

    validateEmail(email) {
      var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if(re.test(email)){
        //Email valid. Procees to test if it's from the right domain (Second argument is to check that the string ENDS with this domain, and that it doesn't just contain it)
        if(email.indexOf("@jacobseye.com", email.length - "@jacobseye.com".length) !== -1){
          //VALID
          return true;
        } else {
          return false;
        }
      }
    }

    handleSubmit(e) {
      e.preventDefault();
      this.signin(e);
      // this.databaseRecord();
      console.log('The form was submitted with the following data:');
      // console.log(this.state);
    }

    render() {
      if(this.state.redirect === true) {
        return <Redirect to='/dashboards' />
      }
      return (
      <div className="FormCenter">
          <form onSubmit={this.handleSubmit} className="FormFields">
          <div className="FormField">
              <label className="FormField__Label" htmlFor="email">E-Mail Address</label>
              <input type="email" id="email" className="FormField__Input" placeholder="Enter your email" name="email" value={this.state.email} onChange={this.handleChange} />
            </div>

            <div className="FormField">
              <label className="FormField__Label" htmlFor="password">Password</label>
              <input type="password" id="password" className="FormField__Input" placeholder="Enter your password" name="password" value={this.state.password} onChange={this.handleChange} />
            </div>

            <div className="FormField">
              <button className="FormField__Button mr-20">Sign In</button><Link to="/register" className="FormField__Link">Register</Link><div onClick={this.googleSignin} className="FormField__Link">Sign In with Google</div>
            </div>
          </form>
        </div>
      );
    }
}

export default Login;
