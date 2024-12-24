require('./db/db.connect');
const fs = require("fs");
const express = require("express");
const app = express()
const Restaurant = require('./models/restaurant.model')
const jsonData = fs.readFileSync("restaurants.json", 'utf-8');
const restaurantsData = JSON.parse(jsonData);

app.use(express.json()) 
 
   

// function to seed data from json file
function seedData(){
  for(const restaurantData of restaurantsData){
    try {
      const newRestaurant = new Restaurant({
        name: restaurantData.name,
        cuisine: restaurantData.cuisine,
        location: restaurantData.location,
        rating: restaurantData.rating,
        website: restaurantData.website,
        phoneNumber: restaurantData.phoneNumber,
        openHours: restaurantData.openHours,
        priceRange: restaurantData.priceRange,
        reservationsNeeded: restaurantData.reservationsNeeded,
        isDeliveryAvailable: restaurantData.isDeliveryAvailable,
        menuUrl: restaurantData.menuUrl,
        photos: restaurantData.photos,
      })
      newRestaurant.save();
    } catch (error) {
      throw error;
    }
  }
}

// seedData();
 
 
// function to create new Restaurant 
async function createRestaurant(newRestaurant){
  try {
    const restaurant = new Restaurant(newRestaurant);
    const savedRestaurant = await restaurant.save();
    console.log(`restaurant added sucessfully \n ${savedRestaurant}`)
  } catch (error) {
    throw error
  }
}

// 1. Create an API with route '/restaurants' to create a new restaurant data in the Database. Test your API with Postman.

app.post("/restaurants", async(req, res)=>{
  try {
    const savedRestaurant = await createRestaurant(req.body);
    res.status(201).json({message: `Restaurant saved sucessfully ${savedRestaurant}`})
  } catch (error) {
    res.status(500).json({message: "Failed to add restaurant", error: error})
  }
})

// ===================================================================================================================================================================

async function getAllRestaurants(){
  try {
    const allRestaurant = await Restaurant.find(); 
    return allRestaurant
  } catch (error) {
    throw error
  }
}

//2. Create an API with route '/restaurants' to read all restaurants from the Database. Test your API with Postman.
app.get('/allRestaurants', async(req, res)=>{
  try { 
    const result = await getAllRestaurants();
    if(!result.allRestaurant){
      res.status(404).json({message: "No restaurant found"});
    }
    res.status(200).json({message: `All Restaurant get sucessfully,\n  restaurants: ${result}`})
  } catch (error) {
    res.status(500).json({message:"Failed to get all restaurants ", error:error})
  }
})
 
// ===================================================================================================================================================================

async function getRestaurantByName(restaurantName){
  try { 
    const restaurant = await Restaurant.findOne({name: restaurantName})  
    // console.log("I am in 2", restaurant)
    if(!restaurant){
      return {message: "Restaurant not found for this name", restaurant: null}
    }
    return {message: "Restaurant fetched successfully", restaurant}
  } catch (error) {
    throw new Error(`Error fetching restaurant: ${error.message}`);
  }
}

//3. Create an API with route '/restaurants/fetch/:restaurantName' to read a restaurant by its name. Test your API with Postman.
app.get("/restaurants/fetch/:restaurantName", async(req, res)=>{
  const {restaurantName} = req.params;   
  try {
    // console.log(restaurantName)
    const result = await getRestaurantByName(restaurantName);     
    if(!result.restaurant){
      return res.status(404).json(result)
    }
    return res.status(200).json(result)
  } catch (error) {
    res.status(500).json({message: "Failed to get restaurant by name", error:error.message})
  }
})

// ===================================================================================================================================================================

async function getRestaurantByPhoneNo(phNumber){
  try {
    const restaurant = await Restaurant.findOne({phoneNumber:phNumber})
    if(!restaurant){
      return {message: "Restaurant not found for this phone number", restaurant: null}
    }
    return {message:"Restaurant fetched successfully", restaurant}
  } catch (error) {
    throw new Error(`Error fetching restaurant: ${error.message}`)
  }
}

//4  Create an API with route '/restaurants/directory/:phoneNumber' to read a restaurant by phone number. Test your API with Postman.

app.get("/restaurants/directory/:phoneNumber", async(req, res)=>{
  const phoneNumber = req.params.phoneNumber; // Keep it as a string
  try {
    console.log(phoneNumber)
    const result = await getRestaurantByPhoneNo(phoneNumber);
    if(!result.restaurant){
      res.status(404).json(result)
    }
    res.status(200).json(result)
  } catch (error) {
    res.status(500).json({message: "Failed to get restaurant by phone no", error: error.message})
  }
})

// ===================================================================================================================================================================

async function restaurantByCuisine(cuisineName){
  try {
    const restaurant = await Restaurant.find({ cuisine: { $in: [cuisineName] } }); 
    if(!restaurant){
      return {message: "No restaurant found with this cusine name ", restaurant: null}
    }
    return {message:"Restaurant fetched successfully", restaurant}
  } catch (error) {
    throw new Error(`Error fetching restaurnant: ${error.message}`)
  }
}

//5 Create an API with route '/restaurants/cuisine/:cuisineName' to read all restaurants by cuisine. Test your API with Postman.

app.get("/restaurants/cuisine/:cuisineName", async(req, res)=>{
  const cuisineName = req.params.cuisineName;
  try { 
    const result = await restaurantByCuisine(cuisineName);
    if(!result.restaurant){
      return res.status(404).json(result)
    }
    return res.status(200).json(result)
  } catch (error) {
    res.status(500).json({message: "Failed to get restaurant by cusine Name", error : error.message})
  }
})


// ===================================================================================================================================================================

async function restaurantByLocation(location) {
  try {
    console.log(location)
    const restaurants = await Restaurant.find({ location: { $regex: location, $options: "i" } });
    if(!restaurants){
      return {message: "No restaurant found for this location", restaurants: null}
    }
    return { message: "Restaurant fetched successfully", restaurants}
  } catch (error) {

    throw new Error(`Error fetching restaurant ${error.message}`)
  }
}

//6  Create an API with route '/restaurants/location/:restaurantLocation' to read all restaurants by location. Test your API with Postman.  
app.get("/restaurants/location/:restaurantLocation", async(req, res)=>{
  const location = req.params.restaurantLocation;
  try {
    const result = await restaurantByLocation(location);
    if(!result.restaurants){
      return res.status(404).json(result)
    }
    return res.status(200).json(result)
  } catch (error) {
    res.status(500).json({message: "Failed to get restaurant by this location", error:error.message}) 
  }
})


// ===================================================================================================================================================================

async function deleteRestaurant(restaurantId) {
  try {
    const deleteRestaurant = await Restaurant.findByIdAndDelete(restaurantId);
    console.log(deleteRestaurant)
    if(!deleteRestaurant){
      return {message: "Restaurant not found", restaurant : null}
    }
    return {message: "Restaurant deleted succsessfully", restaurant:deleteRestaurant}
  } catch (error) {
    throw new Error(`Error deleting restaurant ${error.message}`)
  }
}

//7 Create an API with route '/restaurants/:restaurantId' to delete a restaurant data by their ID in the Database. Test your API with Postman.

app.delete("/restaurants/delete/:restaurantId", async(req, res)=>{
  const restaurantId = req.params.restaurantId
  try {
    console.log(restaurantId)
    const result = await deleteRestaurant(restaurantId);
    if(!restaurantId){
      return res.status(404).json(result)
    }
    return res.status(200).json(result)
  } catch (error) {
    res.status(500).jsons({message:"Failed to delete restaurant", error:error.message})
  }
})


// ===================================================================================================================================================================

async function updateRestaurant(restaurantId, newCuisine) {
  try {
    const updatedRestaurant = await Restaurant.findByIdAndUpdate(restaurantId, 
      { cuisine: newCuisine }, // Update only the cuisine field
      { new: true } // Return the updated document
    );
    console.log(updatedRestaurant)
    if(!updatedRestaurant){
      return {message: "Restaurant not found", restaurant : null}
    }
    return {message: "Restaurant updated succsessfully", restaurant:updatedRestaurant}
  } catch (error) {
    throw new Error(`Error updating restaurant ${error.message}`)
  }
}
    
//8 Create an API to update a restaurant data by their ID in the Database. Update the cuisine of an existing restaurant. Test your API with Postman.

app.put("/restaurants/update/:restaurantId", async(req, res)=>{

  const restaurantId = req.params.restaurantId
  const { cuisine } = req.body;
  console.log(restaurantId)
  try {
     
    const result = await updateRestaurant(restaurantId, cuisine);
    if(!restaurantId){
      return res.status(404).json(result)
    }
    return res.status(200).json(result)
  } catch (error) {
    res.status(500).jsons({message:"Failed to delete restaurant", error:error.message})
  }
})

const PORT = 3000;
app.listen(PORT, ()=>{
    console.log(`Server is running on ${PORT}`);
})

