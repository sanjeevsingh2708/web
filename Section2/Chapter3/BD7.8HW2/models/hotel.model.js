const mongoose = require('mongoose');


const hotelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true, // Hotel name is required
      },
      category: {
        type: String, // Category of the hotel (e.g., Mid-Range, Luxury)
        enum: ['Budget', 'Mid-Range', 'Luxury', 'Boutique', 'Resort', 'Other'],
        required: true,
      },
      location: {
        type: String, // Address of the hotel
        required: true,
      },
      rating: {
        type: Number, // Rating (0 to 5)
        min: 0,
        max: 5,
        default: 0,
      },
      website: {
        type: String, // URL to the hotel's website
      },
      phoneNumber: {
        type: String, // Contact number
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
        type: [String], // List of amenities (e.g., Laundry, Boating)
      },
      priceRange: {
        type: String, // Price range (e.g., $$$ (31-60))
        enum: ['$$ (11-30)', '$$$ (31-60)', '$$$$ (61+)', 'Other'],
      },
      reservationsNeeded: {
        type: Boolean, // Is reservation needed?
        default: false,
      },
      isParkingAvailable: {
        type: Boolean, // Is parking available?
        default: false,
      },
      isWifiAvailable: {
        type: Boolean, // Is WiFi available?
        default: false,
      },
      isPoolAvailable: {
        type: Boolean, // Is a pool available?
        default: false,
      },
      isSpaAvailable: {
        type: Boolean, // Is a spa available?
        default: false,
      },
      isRestaurantAvailable: {
        type: Boolean, // Is a restaurant available?
        default: false,
      },
      photos: {
        type: [String], // List of photo URLs
      },
},{
    timestamps: true
}
)

const Hotel =  mongoose.model("Hotel", hotelSchema);

module.exports = Hotel;