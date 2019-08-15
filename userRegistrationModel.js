const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// create a schema
const userRegistrationSchema = new Schema({
  // You may need to add other fields like owner
  email: String,
  fname: String,
  koyns: Number,
  lname: String,
  system: String
});
const User = mongoose.model('User', userRegistrationSchema);
module.exports = User;
