const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the laptop schema
const laptopSchema = new Schema(
  {
    brand: {
      type: String,
      required: true, // Brand is required
    },
    model: {
      type: String,
      required: true, // Model is required
    },
    processor: {
      type: String, // Processor type or model used in the laptop
    },
    ramSizeGB: {
      type: Number, // RAM size in GB
      required: true, // RAM size is required
    },
    storageSizeGB: {
      type: Number, // Storage capacity in GB
      required: true, // Storage size is required
    },
    screenSizeInches: {
      type: Number, // Screen size in inches
      required: true, // Screen size is required
    },
    isTouchscreen: {
      type: Boolean,
      default: false, // Default is false, meaning the laptop does not have a touchscreen
    },
    hasSSD: {
      type: Boolean,
      default: false, // Default is false, meaning the laptop does not have an SSD
    },
    isSaleActive: {
      type: Boolean,
      default: false, // Default is false, meaning the laptop is not on sale
    },
    isActive: {
      type: Boolean,
      default: true, // Default is true, meaning the laptop is available for purchase
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

// Create the Laptop model
const Laptop = mongoose.model('Laptop', laptopSchema);

module.exports = Laptop;
