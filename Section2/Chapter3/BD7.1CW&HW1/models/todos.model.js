const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      requires: true,
    },
    description: {
      type: String,
      requires: true,
    },
    priority: {
      type: String,
      enum: ['Low', 'Medium', 'High'],
      required: true, // Priority is required
    },
    dueDate: {
      type: Date,
      required: true, // Due date is required
    },
    completed: {
      type: Boolean,
      default: false,
    },
    tage: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true, // Automatically adds 'createdAt' and 'updatedAt' fields
  }
);

// Create the Todo model
const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;
