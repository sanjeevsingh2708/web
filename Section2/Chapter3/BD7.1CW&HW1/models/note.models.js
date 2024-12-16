const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the Note schema
const noteSchema = new Schema(
  {
    title: {
      type: String,
      required: true, // Title is required
    },
    content: {
      type: String, // Main content or body of the note
    },
    category: {
      type: String,
      enum: ['Personal', 'Work', 'Study', 'Ideas', 'Journal', 'Other'], // Enum for predefined categories
      required: true, // Category is required
    },
    tags: {
      type: [String], // Tags associated with the note (array of strings)
      default: [], // Default to an empty array if no tags are provided
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

// Create the Note model
const Note = mongoose.model('Note', noteSchema);

module.exports = Note;
