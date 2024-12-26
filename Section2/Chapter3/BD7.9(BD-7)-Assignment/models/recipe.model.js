const mongoose = require('mongoose');


const recipeSchema = new mongoose.Schema({
  title:{
    type: String,
    required:true
  },
  author:{
    type: String,
    required:true
  },
  difficulty:{
    type: [String],
    enum: [ 'Easy', 'Intermediate', 'Difficult'],
    required: true
  },
  prepTime :{
    type: Number,
    required: true, // Preparation time is required
    min: 0, // Optional: Ensure non-negative value
  },
  cookTime :{
    type: Number,
    required: true, // Cooking time is required
    min: 0, // Optional: Ensure non-negative value
  },
  ingredients:{
    type: [String],
    required: true, // Ingredients are required
    validate: [array => array.length > 0, 'Ingredients must not be empty'], // Ensure at least one ingredient
  },
  instructions:{
    type: [String],
    required: true, // Instructions are required
    validate: [array => array.length > 0, 'Instructions must not be empty'], // Ensure at least one instruction
  },
  imageUrl :{
    type: String,
    required: true, // Image URL is required
    trim: true,

  }
},{
  timestamps: true
}
)

const Recipe = new mongoose.model("Recipe", recipeSchema)

module.exports = Recipe;