const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    cuisine: {
      type: [String],
      denum: [
        'Italian',
        'Mexican',
        'Chinese',
        'Indian',
        'American',
        'French',
        'Japanese',
        'Mediterranean',
        'Thai',
        'Vegetarian',
        'Vegan',
        'Other',
      ],
      requied: true,
    },
    location: {
      type: String,
      required: true,
    },
    owner: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
    },
    website: {
      type: String,
    },
    openingYear: {
      type: Number,
      required: true,
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },
    specialDishes: {
      type: [String],
    },
    photoUrls: {
      type: [String],
    },
  },
  { timestamps: true }
);

// Create the Restaurant model
const Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = Restaurant;
