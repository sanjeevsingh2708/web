const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the book schema
const bookSchema = new Schema(
  {
    title: {
      type: String,
      required: true, // Title is required
    },
    author: {
      type: String,
      required: true, // Author is required
    },
    publishedYear: {
      type: Number,
      required: true, // Published year is required
    },
    genre: {
      type: [String],
      enum: [
        'Fiction',
        'Non-Fiction',
        'Mystery',
        'Thriller',
        'Science Fiction',
        'Fantasy',
        'Romance',
        'Historical',
        'Biography',
        'Self-help',
        'Other',
      ], // Limited genre values
      required: true, // Genre is required
    },
    language: {
      type: String,
      required: true, // Language is required
    },
    country: {
      type: String,
      default: 'United States', // Default to 'United States' if not specified
    },
    rating: {
      type: Number,
      min: 0,
      max: 10,
      default: 0, // Default rating is 0
    },
    summary: {
      type: String, // Brief description or summary of the book
    },
    awards: {
      type: String, // Any awards or recognitions the book has received
    },
    coverImageUrl: {
      type: String, // URL to the book's cover image
    },
    purchaseUrl: {
      type: String, // URL where the book can be purchased online
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

// Create the Book model
const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
