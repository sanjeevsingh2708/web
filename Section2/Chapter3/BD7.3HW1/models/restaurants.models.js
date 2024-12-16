const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the Restaurant schema
const restaurantSchema = new Schema({
  name: {
    type: String,
    required: true, // Restaurant name is required
  },
  cuisine: {
    type: [String], // Array of cuisines offered
    enum: [
      'American',
      'Italian',
      'Chinese',
      'Indian',
      'Japanese',
      'Mexican',
      'Thai',
      'French',
      'Mediterranean',
      'Greek',
      'Spanish',
      'Other',
    ],
    required: true, // Cuisine is required
  },
  location: {
    type: String, // Location of the restaurant
    required: true,
  },
  rating: {
    type: Number, // Rating of the restaurant (0 to 5)
    min: 0,
    max: 5,
    default: 0, // Default rating is 0
  },
  website: {
    type: String, // URL of the restaurant's official website
  },
  phoneNumber: {
    type: String, // Contact phone number
    required: true,
  },
  openHours: {
    type: String, // Operating hours
  },
  priceRange: {
    type: String, // Price range of menu items
    enum: ['$ (0-10)', '$$ (11-30)', '$$$ (31-60)', '$$$$ (61+)', 'Other'],
  },
  reservationsNeeded: {
    type: Boolean,
    default: false, // Default is no reservations needed
  },
  isDeliveryAvailable: {
    type: Boolean,
    default: false, // Default is no delivery option
  },
  menuUrl: {
    type: String, // Link to the menu
    required: true,
  },
  photos: {
    type: [String], // URLs of photos showcasing the restaurant
  },
}, {
  timestamps: true, // Automatically adds createdAt and updatedAt fields
});

// Create the Restaurant model
const Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = Restaurant;
