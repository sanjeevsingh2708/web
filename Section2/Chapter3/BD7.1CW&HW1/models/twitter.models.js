const mongoose = require('mongoose');

const TwitterSchema = new mongoose.Schema({
  profilePic: String,
  fullName: String,
  userName: String,
  bio: String,
  companyName: String,
  city: String,
  porfolioLink: String,
  handle: String,
  folloerCount: Number,
  FolloingCount: String,
  isOnline: Boolean,
});

const Twitter = mongoose.model('Twitter', TwitterSchema);

module.exports = Twitter;
