const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoClient = require("mongodb").MongoClient;
const objectID = require('mongodb').ObjectID;
// import User from 'userRegistrationModel';

const port = process.env.PORT || 5000;

const CONNECTION_URL = 'mongodb+srv://arum:luvrhater12@kofatest-uk4b3.mongodb.net/test?retryWrites=true&w=majority';
const DATABASE_NAME = 'kofa';

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// log that the server is up and running
app.listen(port, () => {
  mongoClient.connect(CONNECTION_URL, { useNewUrlParser: true }, function(error, client) {
    if(error) {
      console.log('Error occured whilst connecting to MongoDB Atlas...\n', error);
    }
    console.log('Connected...');
    console.log(`Listening on port ${port}`);
    const db = client.db(DATABASE_NAME);
    const collection = db.collection('users');

    // console.log('on line 29',userDups);
    // collection.insertOne({
    //   "email": "arum@kb.com",
    //   "fname": "AJ",
    //   "koyns": 17,
    //   "lname": "Bulus",
    //   "system": "Xbox1"
    // });
    // console.log(collection.find({}));
    client.close();
    // database = client.db(DATABASE_NAME);
    // collection = database.collection('people');
    // console.log(`Connected to ${DATABASE_NAME}!`);
  });
});

// This link is for sending data to mongodb from react https://stackoverflow.com/questions/42890055/insert-mongodb-document-with-react-js

// create a GET route
app.get('/express_backend', (req, res) => {
  res.send({ express: `YOUR EXPRESS BACKEND IS CONNECTED TO REACT on port ${port}  with ${email}`});
});

app.get('/register', (req, res) => {
  res.send({data: req.body});
});

// post route to add new registered user data to MongoDB
app.post('/register', (req, res) => {
  console.log('the data:',req.body);
  // Send user registration data to the DB if it doesn't exist already
  let data = {
    "email": req.body.email,
    "fname": req.body.fname,
    "lname": req.body.lname,
    "koyns": req.body.koyns,
    "koynsAvailable": req.body.koynsAvailable,
    "system": req.body.system,
    "gamerTag": req.body.gamerTag,
    "dateCreated": req.body.dateCreated,
    "promoCode": req.body.promoCode
  };

  // getting into the server
  mongoClient.connect(CONNECTION_URL, { useNewUrlParser: true }, function(error, client) {
    if(error) {
      console.log('Error occured whilst connecting to MongoDB Atlas...\n', error);
    }
    console.log('Connected...');
    console.log(`Listening on port ${port}`);
    const db = client.db(DATABASE_NAME);
    const collection = db.collection('users');


    // Count the number of documents that match. If none, send to the // DB
    collection.countDocuments({email: req.body.email})
      .then(numDocs => {
        // If there are any matches returned, we reject the submission and don't send to database
        if( numDocs < 1 ) {
          collection.insertOne(data);
        } else {
          console.log('Looks like that user is already in the DB!');
        }
        // console.log(`${numDocs} documents match the specified query.`)
      })
      .catch(err => console.error("Failed to count documents: ", err));
    // client.close();
  });
});

// Get email address when on page /dashboard
let email,
  koynsTot,
  wager;
let koynsAv = koynsTot-wager;

app.post('/dashboard', (req, res) => {
  // get an individuals data
  email = req.body.email;
  console.log('this is the current user', email);
});

// Get data from server to display on page /dashboard
app.get('/dashboard', (req, res) => {
  let data;
  // getting into the server
  mongoClient.connect(CONNECTION_URL, { useNewUrlParser: true }, function(error, client) {
    if(error) {
      console.log('Error occured whilst connecting to MongoDB Atlas...\n', error);
    }
    const db = client.db(DATABASE_NAME);
    const collection = db.collection('users');

    // Get data from server
    // I need to find all and add them together
    collection.findOne({email: email})
      .then(items => {
        console.log(`Number of koyns for this user ${items.koyns}`);
        console.log(items);
        // Put data in an object to send as a response to the client
        koynsTot = items.koyns;
        koynsAv = items.koynsAvailable;
        data = {
          email: items.email,
          fname: items.fname,
          lname: items.lname,
          koyns: items.koyns,
          koynsAvailable: items.koynsAvailable,
          system: items.system
        };
        // console.log(data);
        res.send({userData: data});
      })
      .catch(err => console.error("Failed to count documents: ", err));
    // client.close();
  });
});

// create a GET route
app.get('/activegame', (req, res) => {
  let data;
  // getting into the server
  mongoClient.connect(CONNECTION_URL, { useNewUrlParser: true }, function(error, client) {
    if(error) {
      console.log('Error occured whilst connecting to MongoDB Atlas...\n', error);
    }
    const db = client.db(DATABASE_NAME);
    const collection = db.collection('users');
    // console.log(email);
    // Get data from server
    collection.findOne({email: email})
      .then(items => {
        // console.log(`Number of koyns for this user ${items.koyns}`);
        console.log(items);
        // koynsAv = items.koynsAvailable;
        // console.log(koynsAv);
        // Put data in an object to send as a response to the client
        data = {
          email: items.email,
          fname: items.fname,
          lname: items.lname,
          koyns: items.koyns,
          system: items.system,
          koynsAvailable: items.koynsAvailable
        };
        // console.log(data);
        res.send({userData: data});
      })
      .catch(err => console.error("Failed to count documents: ", err));
    // client.close();
  });
});

// Activegame route to send data to server
app.post('/activegame', (req, res) => {
  console.log(req.body);
  let data = {
    game: req.body.game,
    wager: req.body.wager,
    date: req.body.date,
    system: req.body.system,
    email: req.body.email,
    oppemail: req.body.oppemail,
    reviewStatus: req.body.reviewStatus,
    eventID: req.body.eventID,
    details: req.body.details
  };
  // getting into the server and add activegame
  mongoClient.connect(CONNECTION_URL, { useNewUrlParser: true }, function(error, client) {
    if(error) {
      console.log('Error occured whilst connecting to MongoDB Atlas...\n', error);
    }
    console.log('Connected...');
    console.log(`Listening on port ${port}`);
    const db = client.db(DATABASE_NAME);
    const collection = db.collection('gameActivated');

    //send client side data from activate game to MongoDB
    collection.insertOne(data);

    // collection.insertOne(data);
  });
});

// route to edit koynsAvailable
app.post('/koynsavailable', (req, res) => {
  // getting into the server and add activegame
  mongoClient.connect(CONNECTION_URL, { useNewUrlParser: true }, function(error, client) {
    if(error) {
      console.log('Error occured whilst connecting to MongoDB Atlas...\n', error);
    }
    console.log('Connected...');
    console.log(`Listening on port ${port}`);
    const db = client.db(DATABASE_NAME);
    const collection = db.collection('users');
    // insert koynsAv-wager...if it's < 0 then you reject it else replace koynsAvailable in DB
    koynsAv = koynsTot-wager;

    // Find the document that has the current email
    const query = { "email": email };
    // Set some fields in that document
    // Return the updated document instead of the original document
    const options = { returnNewDocument: true };
    
    const update = {
      "$set": {
        "koynsAvailable": koynsAv
      }
    };
    // get the user and edit the koynsAvailable value
    collection.findOneAndUpdate(query, update, options)
    .then(updatedDocument => {
      if(updatedDocument) {
        console.log(`Successfully updated document: ${updatedDocument}.`)
      } else {
        console.log("No document matches the provided query.")
      }
      return updatedDocument
    })
    .catch(err => console.error(`Failed to find and update document: ${err}`))
  });
});

// create a GET route
app.get('/currentmatch', (req, res) => {
  let data;
  // getting into the server
  mongoClient.connect(CONNECTION_URL, { useNewUrlParser: true }, function(error, client) {
    if(error) {
      console.log('Error occured whilst connecting to MongoDB Atlas...\n', error);
    }
    const db = client.db(DATABASE_NAME);
    const collection = db.collection('gameActivated');
    // console.log(email);
    
    collection.find({email: email}).toArray()
      .then(items => {
        // console.log(`Number of koyns for this user ${items.koyns}`);
        console.log(items);
        // koynsAv = items.koynsAvailable;
        // console.log(koynsAv);
        // console.log(data);
        res.send({userData: items});
      })
      .catch(err => console.error("Failed to count documents: ", err));
    // client.close();
  });
});

// create a GET route for total wager amount
app.get('/getwager', (req, res) => {
  let data;
  // getting into the server
  mongoClient.connect(CONNECTION_URL, { useNewUrlParser: true }, function(error, client) {
    if(error) {
      console.log('Error occured whilst connecting to MongoDB Atlas...\n', error);
    }
    const db = client.db(DATABASE_NAME);
    const collection = db.collection('gameActivated');
    // console.log(email);
    // Get data from server { $and: [ { <expression1> }, { <expression2> } , ... , { <expressionN> } ] }
    let query = { $and: [{email: email}, {reviewStatus: 0}]}
    const options = {
      "projection": { "_id": 0 },
      "sort": { "name": 1 }
    };
    collection.find({ $and: [{email: email}, {reviewStatus: 0}]}).toArray()
      .then(items => {
        // console.log(`Number of koyns for this user ${items.koyns}`);
        console.log(items);
        let loopAdd = (array) => {
          let wagerAll=0;
          array.forEach(item => {
            wagerAll+=parseInt(item.wager);
          });
          return wagerAll
        }
        console.log('loopAdd function:', loopAdd(items));
        
        wager = loopAdd(items);
        // koynsAv = items.koynsAvailable;
        // console.log(koynsAv);
        // console.log(data);
        res.send({wager: wager});
      })
      .catch(err => console.error("Failed to count documents: ", err));
    // client.close();
  });
});

// https://medium.com/@maison.moa/setting-up-an-express-backend-server-for-create-react-app-bc7620b20a61