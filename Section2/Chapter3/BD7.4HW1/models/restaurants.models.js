const mongoose = require('mongoose');
const {Schema} = mongoose;

//Define the Restaurant schema
const restaurantSchema = new Schema({
  name:{
    type: String,
    required: true,
  },
  cuisine: {
    type: [String],
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
    required: true
  },
  location:{
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true
  },
  website: {
    type: String,
    requied: true
  }, 
  phoneNumber:{
    type: String,
    required: true
  },
  openHours: {
    type: String,
    rquired: true
  },
  priceRange: {
    type: String,
    rquired: true
  },
  reservationsNeeded: {
    type: String,
    rquired: true
  },
  isDeliveryAvailable: {
    type: String,
    rquired: true
  },
  menuUrl: {
    type: String,
    rquired: true
  },
  photos: {
    type: [String],
    required: true
  }
},{
  timestamps: true,
})

// Create the Restaurant model
const Restaurant = mongoose.model("Restaurant", restaurantSchema);

module.exports = Restaurant