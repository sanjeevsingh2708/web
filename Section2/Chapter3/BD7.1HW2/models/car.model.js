const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the car schema
const carSchema = new Schema(
  {
    make: {
      type: String,
      required: true, // Make is required
    },
    model: {
      type: String,
      required: true, // Model is required
    },
    year: {
      type: Number, // Manufacturing year of the car
      required: true, // Year is required
    },
    mileage: {
      type: Number, // Mileage of the car in miles
      required: true, // Mileage is required
    },
    fuelType: {
      type: String,
      enum: ['Gasoline', 'Diesel', 'Electric', 'Hybrid'], // Predefined fuel types
      required: true, // Fuel type is required
    },
    transmission: {
      type: String,
      enum: ['Automatic', 'Manual'], // Predefined transmission types
      required: true, // Transmission type is required
    },
    bodyStyle: {
      type: String, // Body style (e.g., sedan, SUV, hatchback)
      required: true, // Body style is required
    },
    color: {
      type: String, // Color of the car
      required: true, // Color is required
    },
    isCertifiedPreOwned: {
      type: Boolean,
      default: false, // Default is false, indicating the car is not certified pre-owned
    },
    isFourWheelDrive: {
      type: Boolean,
      default: false, // Default is false, indicating the car does not have four-wheel drive
    },
    isLuxury: {
      type: Boolean,
      default: false, // Default is false, indicating the car is not a luxury vehicle
    },
    isActive: {
      type: Boolean,
      default: true, // Default is true, indicating the car is available in the inventory
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

// Create the Car model
const Car = mongoose.model('Car', carSchema);

module.exports = Car;
