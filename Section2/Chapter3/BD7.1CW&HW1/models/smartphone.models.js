const mongoose = require('mongoose');

const smartphonesSchema = new mongoose.Schema(
  {
    brand: {
      type: String,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
    releaseYear: {
      type: Number,
      required: true,
    },
    operatingSysmte: {
      type: String,
      enum: ['iOS', 'Android', 'Windows', 'Other'],
    },
    displaySize: {
      type: String,
    },
    storage: {
      type: String,
    },
    ram: {
      type: String,
    },
    cameraSpecs: {
      megaPixel: {
        type: String,
      },
      lensType: {
        type: String,
      },
      additionalFeature: {
        type: String,
      },
    },
    batteryCapacity: {
      type: String,
    },
    connectivity: {
      type: [String],
    },
    price: {
      type: Number,
    },
    colorsAvailable: {
      type: [String],
    },
    features: {
      type: [String],
    },
  },
  { timestamps: true }
);

const Smartphone = mongoose.model('Smartphone', smartphonesSchema);

module.exports = Smartphone;
