const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the user profile schema
const userProfileSchema = new Schema(
  {
    username: {
      type: String,
      required: true, // Username is required
      unique: true, // Ensure username is unique
    },
    email: {
      type: String,
      required: true, // Email is required
      unique: true, // Ensure email is unique
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'], // Email validation
    },
    firstName: {
      type: String, // First name of the user
    },
    lastName: {
      type: String, // Last name of the user
    },
    birthdate: {
      type: Date, // Birthdate of the user
    },
    isActive: {
      type: Boolean,
      default: true, // Default to true, meaning the user's account is active
    },
    isAdmin: {
      type: Boolean,
      default: false, // Default to false, meaning the user is not an admin
    },
    profilePictureUrl: {
      type: String, // URL to the user's profile picture
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

// Create the User Profile model
const UserProfile = mongoose.model('UserProfile', userProfileSchema);

module.exports = UserProfile;
