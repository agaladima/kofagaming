// /backend/data.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// this will be our data base's data structure
const DataSchema = new Schema(
  {
    id: Number,
    message: String,
    game: String,
    wager: Number,
    date: Date,
    system: String,
    email: String,
    oppemail: String,
    reviewStatus: Number,
    eventID: Number,
    details: String
  },
  { timestamps: true }
);

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("Data", DataSchema);
