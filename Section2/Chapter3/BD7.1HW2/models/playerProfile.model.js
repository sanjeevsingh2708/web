const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the player profile schema
const playerProfileSchema = new Schema(
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
      type: String, // First name of the player (optional)
    },
    lastName: {
      type: String, // Last name of the player (optional)
    },
    age: {
      type: Number, // Age of the player (optional)
    },
    gender: {
      type: String,
      enum: ['Male', 'Female', 'Other'], // Gender options
      required: true, // Gender is required
    },
    country: {
      type: String, // Country of origin (optional)
    },
    isActive: {
      type: Boolean,
      default: true, // Default is true if not specified
    },
    gamesPlayed: {
      type: Number,
      default: 0, // Default to 0 if not specified
    },
    level: {
      type: String,
      enum: ['Beginner', 'Intermediate', 'Advanced', 'Expert'], // Level options
      required: true, // Level is required
    },
    preferredGame: {
      type: String, // Preferred game or sport (optional)
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

// Create the Player Profile model
const PlayerProfile = mongoose.model('PlayerProfile', playerProfileSchema);

module.exports = PlayerProfile;
