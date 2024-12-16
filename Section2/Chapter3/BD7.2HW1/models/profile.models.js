const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the profile schema
const profileSchema = new Schema({
  fullName: {
    type: String,
    required: true, // Full name is required
  },
  username: {
    type: String,
    required: true, // Username is required
    unique: true, // Ensure usernames are unique
  },
  bio: {
    type: String, // A short biography
  },
  profilePicUrl: {
    type: String, // URL to the profile picture
  },
  followingCount: {
    type: Number, // Number of accounts this user follows
    default: 0,
  },
  followerCount: {
    type: Number, // Number of followers this user has
    default: 0,
  },
  companyName: {
    type: String, // Company or organization name
  },
  location: {
    type: String, // User's location (city, state, etc.)
  },
  portfolioUrl: {
    type: String, // URL to the user's portfolio
  },
}, {
  timestamps: true, // Automatically add createdAt and updatedAt fields
});

// Create the Profile model
const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;
