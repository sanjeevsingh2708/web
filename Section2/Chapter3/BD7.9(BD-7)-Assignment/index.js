require('./db/db.connect');
const Recipe = require('./model/recipe.model')
const fs = require('fs');
const jsonData = fs.readFileSync('recipe.json', 'utf-8');
const receipesData = JSON.parse(jsonData)
const express = require('express');
const { log } = require('console');
const app = express();

app.use(express.json());

//function to seed the data 
// Question 1 Create your db connection.
function seedData(){
  for(const receipeData of receipesData){
    try {
      const newReceipe = new Recipe({
        title: receipeData.title,
        author: receipeData.author,
        difficulty: receipeData.difficulty,
        prepTime: receipeData.prepTime,
        cookTime: receipeData.cookTime,
        ingredients: receipeData.ingredients,
        instructions: receipeData.instructions,
        imageUrl: receipeData.imageUrl,
      })
      newReceipe.save()
    } catch (error) {
      throw error
    }
  }
}

// seedData();
 
// Question 2 Create an API with route '/recipes' to create a new recipe in the recipes database. Make sure to handle errors properly. Test your API with Postman. Add the following recipe to db:

const newRecipe = {
  'title': 'Spaghetti Carbonara',
  'author': 'Sanjeev Kapoor',
  'difficulty': 'Intermediate',
  'prepTime': 20,
  'cookTime': 15,
  'ingredients': [
    '200g spaghetti',
    '100g guanciale or pancetta, diced',
    '2 large eggs',
    '50g grated Pecorino Romano cheese',
    'Salt and black pepper to taste'
  ],
  'instructions': [
    'Cook the spaghetti in boiling salted water until al dente.',
    'Meanwhile, sauté the guanciale or pancetta until crispy.',
    'In a bowl, whisk together eggs and grated cheese.',
    'Drain the spaghetti and immediately toss with the egg mixture and cooked guanciale/pancetta.',
    'Season with salt and pepper. Serve immediately.'
  ],
  'imageUrl': '<https://example.com/spaghetti_carbonara.jpg>'
}

//function to create new recipe 
async function createRecipe(newRecipe){
  try {
    const recipe = new Recipe(newRecipe);
    const savedRecipe = await recipe.save();
    if(!savedRecipe){
      return {message: "Recipe not created successfully", recipe: savedRecipe}
    }
    return {message: "Recipe created successfully", recipe: savedRecipe}
  } catch (error) {
    throw new Error(`Error creating receipe ${error}`)
  }
}

app.post("/recipes/create", async(req, res)=>{
  try {
    // Validate required fields
    if (!newRecipe.title || !newRecipe.author || !newRecipe.difficulty || !newRecipe.prepTime || !newRecipe.cookTime || !newRecipe.ingredients || !newRecipe.instructions || !newRecipe.imageUrl) {
      return res.status(400).json({ message: 'All fields are required.' });
    }
    const result = await createRecipe(newRecipe);
    if(!result.recipe){
      res.status(404).json(result)
    }
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({message: "Failed to add recipe", error: error.message})
  }
})
   

// Question 3 and 4 is simillar to question 2
//Question 5 Create an API to get all the recipes in the database as a response. Make sure to handle errors properly.

async function fetchAllRecipe(){
  try {
    const allRecipe = await Recipe.find();
    if(!allRecipe){
      return {message: "no recipe found", recipe: allRecipe}
    }
    return {message: "recipe fetched successfully", recipe: allRecipe}
  } catch (error) {
    
  }
}

app.get('/recipes/fetchAll', async(req, res)=>{
  try {
    const result = await fetchAllRecipe();
    if(!result.recipe){
      res.status(404).json(result)
    }
    res.status(200).json(result)
  } catch (error){
    res.status(500).json({message: "Failed to fetch all recipe", error: error.message})
  }
})


//Question 6  Create an API to get a recipe's details by its title. Make sure to handle errors properly.

async function recipeByTitle(title){
  try {
    const recipe = await Recipe.find({title: title})
    if(!recipe){
      return {message: "No recipe found for this title", recipe: recipe}
    }
    return {message: "recipe fetched successfully for this title", recipe: recipe}
  } catch (error) {
    throw new Error(`Error while fetching recipe by title ${error}`)
  }
}

app.get("/recipes/byTitle", async(req, res)=>{
  try {
    const title = req.body.title; 
    const result = await recipeByTitle(title);
    if(!result.recipe){
      res.status(404).json(result)
    }
    res.status(200).json(result)
  } catch (error) {
    res.status(500).json({message: "Failed to get receipe by title", error:error.message})
  }
})

//Question 7  Create an API to get details of all the recipes by an author. Make sure to handle errors properly.

async function recipeByAuthor(author){
  try {
    const recipe = await Recipe.find({author: author});    
    if(!recipe){
      return {message: "No recipe found by this author", recipe: recipe}
    }
    return {message: "recipe fetched successfully  ", recipe: recipe}
  } catch (error) {
    return {message: "Error fetching recipe", error: error.message}
  }
}

app.get("/recipes/byAuthor", async(req, res)=>{
  try {
    const author = req.body.author;   
    const result = await recipeByAuthor(author);
    if(!result.recipe){
      res.status(404).json(result)      
    }
    res.status(200).json(result)
  } catch (error) {
    res.status(500).json(`Failed to fetch recipe by author ${error.message}`)
  }
})

//Question 8  Create an API to get all the recipes that are of 'Easy' difficulty level.
async function recipesByDifficulty(difficulty) {
  try {
    const recipes = await Recipe.find({ difficulty: difficulty });
    console.log(`Fetched Recipes: ${recipes.length} recipes found with difficulty "${difficulty}"`);
    
    if (recipes.length === 0) {
      return { message: `No recipes found with difficulty "${difficulty}"`, recipes: [] };
    }
    return { message: `Recipes fetched successfully with difficulty "${difficulty}"`, recipes: recipes };
  } catch (error) {
    throw new Error(`Error while fetching recipes by difficulty: ${error.message}`);
  }
}

app.get("/recipes/byDifficulty/:difficulty", async (req, res) => {
  try {
    const difficulty = req.params.difficulty; // Get difficulty from the route parameter
    console.log(`Difficulty Parameter: ${difficulty}`);

    const result = await recipesByDifficulty(difficulty);

    if (result.recipes.length === 0) {
      return res.status(404).json(result); // Send 404 response if no recipes are found
    }
    return res.status(200).json(result); // Send 200 response with the list of recipes
  } catch (error) {
    console.error("Error in /recipes/byDifficulty/:difficulty:", error.message);
    return res.status(500).json({ message: "Failed to fetch recipes by difficulty", error: error.message });
  }
});

//Question 9 Create an API to update a recipe's difficulty level with the help of its id. Update the difficulty of 'Spaghetti Carbonara' from 'Intermediate' to 'Easy'. Send an error message 'Recipe not found' if the recipe is not found. Make sure to handle errors properly.

// Function to update the difficulty level of a recipe by its ID
async function updateRecipeDifficultyById(recipeId, newDifficulty) {
  try {
    const updatedRecipe = await Recipe.findByIdAndUpdate(
      recipeId, // Match the recipe by ID
      { difficulty: newDifficulty }, // Update the difficulty field
      { new: true, 
        runValidators: true // if we put newDifficulty = 'Super Easy' then The update will fail with a validation error because "Super Easy" is not a valid difficulty value as per the schema's enum rule.
      } // Return the updated document and validate input
    );
    console.log(updatedRecipe);
    if (!updatedRecipe) {
      return { message: "Recipe not found", recipe: null };
    }

    return { message: "Recipe difficulty updated successfully", recipe: updatedRecipe };
  } catch (error) {
    throw new Error(`Error while updating recipe difficulty: ${error.message}`);
  }
}

app.put("/recipes/update/difficulty/:id", async(req, res)=>{
  try {
    const recipeId = req.params.id;
    const {newDifficulty} = req.body;
    console.log(`Updating recipe ID: ${recipeId} to difficulty: ${newDifficulty}`);
    const result = await updateRecipeDifficultyById(recipeId, newDifficulty);
    if (!result.recipe) {
      return res.status(404).json(result); // Send 404 response if the recipe is not found
    }
    return res.status(200).json(result); // Send 200 response with the updated recipe
  } catch (error) {
    return res.status(500).json({message:"Failed to update recipe difficulty", error: error.message})
  }
})


//Question 10 Create an API to update a recipe's prep time and cook time with the help of its title. Update the details of the recipe 'Chicken Tikka Masala'. Send an error message 'Recipe not found' if the recipe is not found. Make sure to handle errors properly.  Updated recipe data: { 'prepTime': 40, 'cookTime': 45 }

async function updateRecipeTime(title, prepTime, cookTime){
  try { 
    const updatedRecipe = await Recipe.findOneAndUpdate(
      {title: title}, //matdch the recipe by title
      {prepTime: prepTime, cookTime: cookTime}, // update fields
      {new: true, runValidators : true} // Return the updated document and validate input
    )
    if (!updatedRecipe) {
      return { message: "Recipe not found", recipe: null };
    }
    return { message: "Recipe times updated successfully", recipe: updatedRecipe };
  } catch (error) {
    throw new Error(`Error while updating recipe prep and cook time: ${error.message}`);
  }
}

app.put('/recipes/update/preTime&cookTime/:title', async(req, res)=>{
  try {
    const title = req.params.title;
    const {prepTime, cookTime} = req.body;
    const result = await updateRecipeTime(title, prepTime, cookTime)
    if (!result.recipe) {
      return res.status(404).json(result); // Send 404 response if the recipe is not found
    }
    return res.status(200).json(result); // Send 200 response with the updated recipe
  } catch (error) {
    return res.status(500).json({message:"Failed to update recipe prep and cook time", error: error.message})
  }
})
  
 
//Question 12 Create an API to delete a recipe with the help of a recipe id. Send an error message 'Recipe not found' if the recipe does not exist. Make sure to handle errors properly.

async function deleteRecipeById(recipeId){
  try {
    const deletedRecipe = await Recipe.findByIdAndDelete(recipeId)
    if (!deletedRecipe) {
      return { message: "Recipe not found", recipe: null };
    }
    return { message: "Recipe deleted successfully", recipe: deletedRecipe };
  } catch (error) {
    throw new Error(`Error while deleting recipe prep and cook time: ${error.message}`);
  }
}

app.delete("/recipes/delete/byId/:id", async(req, res)=>{
  try {
    const id = req.params.id;
    const result = await deleteRecipeById(id);
    if (!result.recipe) {
      return res.status(404).json(result); // Send 404 response if the recipe is not found
    }
    return res.status(200).json(result); // Send 200 response with the updated recipe
  } catch (error) {
    res.status(500).json({message:"Failed to delete the recipe", error: error.message})
  }
})

const PORT = 3000;
app.listen(PORT, ()=>{
    console.log(`Server is running on ${PORT}`);
})
