import * as firebase from 'firebase';

var serviceAccount = require('./serviceAccountKey.json');

var config = {
  apiKey: "AIzaSyB4hNfQbmRWrujj31PfIS4BAWvZb-ma6QE",
  authDomain: "kofas-5bbf1.firebaseapp.com",
  databaseURL: "https://kofas-5bbf1.firebaseio.com",
  projectId: "kofas-5bbf1",
  storageBucket: "gs://kofas-5bbf1.appspot.com",
  messagingSenderId: "15475518446",
  appId: "1:15475518446:web:0f0f6888ae047079"
};

const admin = firebase.initializeApp(config);

export {admin};
