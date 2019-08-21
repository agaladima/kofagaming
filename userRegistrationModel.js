const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create a schema
let userRegistrationSchema = new Schema({
  // You may need to add other fields like owner
  email: String,
  fname: String,
  lname: String,
  koyns: Number,
  system: String
});

module.exports = mongoose.model('User', userRegistrationSchema);
