const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoClient = require("mongodb").MongoClient;
const objectID = require('mongodb').ObjectID;

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
    collection.insertOne({
      "email": "arum@kb.com",
      "fname": "AJ",
      "koyns": 17,
      "lname": "Bulus",
      "system": "Xbox1"
    });
    console.log(collection.find({}));
    client.close();
    // database = client.db(DATABASE_NAME);
    // collection = database.collection('people');
    // console.log(`Connected to ${DATABASE_NAME}!`);
  });
});

// This link is for sending data to mongodb from react https://stackoverflow.com/questions/42890055/insert-mongodb-document-with-react-js

// create a GET route
app.get('/express_backend', (req, res) => {
  res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT'});
});





// https://medium.com/@maison.moa/setting-up-an-express-backend-server-for-create-react-app-bc7620b20a61
