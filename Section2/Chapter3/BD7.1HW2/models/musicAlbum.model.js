const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the music album schema
const musicAlbumSchema = new Schema(
  {
    title: {
      type: String,
      required: true, // Title is required
    },
    artist: {
      type: String,
      required: true, // Artist or band name is required
    },
    genre: {
      type: String,
      enum: [
        'Rock',
        'Pop',
        'Hip-Hop',
        'Jazz',
        'Classical',
        'Country',
        'Electronic',
        'R&B',
        'Reggae',
        'Indie',
      ], // Limit genre to predefined values
      required: true, // Genre is required
    },
    releaseYear: {
      type: Number, // The year when the music album was released
      required: true, // Release year is required
    },
    recordLabel: {
      type: String, // Record label associated with the album
    },
    format: {
      type: String, // Format of the music album (e.g., CD, Vinyl, Digital)
      enum: ['CD', 'Vinyl', 'Digital'], // Limit to these formats
      required: true, // Format is required
    },
    isExplicit: {
      type: Boolean,
      default: false, // Default to false if not specified
    },
    isAvailableOnStreaming: {
      type: Boolean,
      default: false, // Default to false if not specified
    },
    isFeatured: {
      type: Boolean,
      default: false, // Default to false if not specified
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

// Create the Music Album model
const MusicAlbum = mongoose.model('MusicAlbum', musicAlbumSchema);

module.exports = MusicAlbum;
