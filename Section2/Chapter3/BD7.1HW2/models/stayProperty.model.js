const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the stay property schema
const stayPropertySchema = new Schema(
  {
    title: {
      type: String,
      required: true, // Title is required
    },
    description: {
      type: String, // Detailed description of the property
    },
    location: {
      type: String, // The location or address of the property
    },
    pricePerNight: {
      type: Number, // The nightly rental price
      required: true, // Price per night is required
    },
    capacity: {
      type: Number, // Maximum number of guests the property can accommodate
      required: true, // Capacity is required
    },
    isPetFriendly: {
      type: Boolean,
      default: false, // Default is false, meaning pets are not allowed
    },
    hasWiFi: {
      type: Boolean,
      default: false, // Default is false, meaning Wi-Fi is not available
    },
    hasParking: {
      type: Boolean,
      default: false, // Default is false, meaning parking is not available
    },
    isActive: {
      type: Boolean,
      default: true, // Default is true, meaning the property is listed
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

// Create the Stay Property model
const StayProperty = mongoose.model('StayProperty', stayPropertySchema);

module.exports = StayProperty;
