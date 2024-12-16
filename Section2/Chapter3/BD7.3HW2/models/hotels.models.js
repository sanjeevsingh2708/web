const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the Hotel schema
const hotelSchema = new Schema({
  name: {
    type: String,
    required: true, // Hotel name is required
  },
  category: {
    type: [String], // Array of categories (e.g., Budget, Luxury)
    enum: ['Budget', 'Mid-Range', 'Luxury', 'Boutique', 'Resort', 'Other'],
    required: true, // Category is required
  },
  location: {
    type: String, // Location of the hotel
    required: true,
  },
  rating: {
    type: Number, // Hotel rating (0 to 5)
    min: 0,
    max: 5,
    default: 0, // Default rating is 0
  },
  website: {
    type: String, // URL of the hotel's official website
  },
  phoneNumber: {
    type: String, // Contact phone number
    required: true,
  },
  checkInTime: {
    type: String, // Check-in time
    required: true,
  },
  checkOutTime: {
    type: String, // Check-out time
    required: true,
  },
  amenities: {
    type: [String], // Array of amenities (e.g., Gym, Free Breakfast)
  },
  priceRange: {
    type: String, // Price range of the hotel
    enum: ['$$ (11-30)', '$$$ (31-60)', '$$$$ (61+)', 'Other'],
  },
  reservationsNeeded: {
    type: Boolean,
    default: false, // Default is no reservations needed
  },
  isParkingAvailable: {
    type: Boolean,
    default: false, // Default is no parking available
  },
  isWifiAvailable: {
    type: Boolean,
    default: false, // Default is no Wi-Fi available
  },
  isPoolAvailable: {
    type: Boolean,
    default: false, // Default is no pool available
  },
  isSpaAvailable: {
    type: Boolean,
    default: false, // Default is no spa available
  },
  isRestaurantAvailable: {
    type: Boolean,
    default: false, // Default is no restaurant available
  },
  photos: {
    type: [String], // Array of URLs showcasing the hotel
  },
}, {
  timestamps: true, // Automatically adds createdAt and updatedAt fields
});

// Create the Hotel model
const Hotel = mongoose.model('Hotel', hotelSchema);

module.exports = Hotel;
