const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the book schema
const bookSchema = new Schema({
  title: {
    type: String,
    required: true, // Title is required
  },
  author: {
    type: String,
    required: true, // Author is required
  },
  publishedYear: {
    type: Number, // The year the book was published
    required: true,
  },
  genre: {
    type: [String], // Array of genres (e.g., Fiction, Historical)
    required: true,
  },
  language: {
    type: String, // Language of the book
    required: true,
  },
  country: {
    type: String, // Country where the book was published
    default: 'United States', // Default value if not provided
  },
  rating: {
    type: Number, // Book's rating (e.g., 8.9)
    min: 0, // Minimum rating
    max: 10, // Maximum rating
    required: true,
  },
  summary: {
    type: String, // A brief summary of the book
  },
  coverImageUrl: {
    type: String, // URL to the cover image of the book
  },
}, {
  timestamps: true, // Automatically adds createdAt and updatedAt fields
});

// Create the Book model
const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
