const {initializeDatabase } = require("./db/db.connect");
const Restaurant = require('./models/restaurants.models')
const fs = require('fs');

initializeDatabase();

const jsonData = fs.readFileSync("restaurant.json", 'utf-8');
const restaurantsData = JSON.parse(jsonData);

function seedData(){
    try{
        for(restaurantData of restaurantsData){
            const newRestaurant = new Restaurant({
                name:restaurantData.name,
                cuisine:restaurantData.cuisine,
                location:restaurantData.location,
                rating:restaurantData.rating,
                website:restaurantData.website,
                phoneNumber:restaurantData.phoneNumber,
                openHours:restaurantData.openHours,
                priceRange:restaurantData.priceRange,
                reservationsNeeded:restaurantData.reservationsNeeded,
                isDeliveryAvailable:restaurantData.isDeliveryAvailable,
                menuUrl:restaurantData.menuUrl,
                photos:restaurantData.photos
            })
            newRestaurant.save();
        }
    }catch(error){        
        console.log('Error seeding the data', error);
    }
}

seedData();

// Create a function that accepts a restaurant ID and an object with updated data, and updates the restaurant with the provided ID. Take the _id of the restaurant which has the name Yo China and update its  from 3.9 to 4.1. Console the updated restaurant.

// Create a function that accepts a restaurant name and an object with updated data, and updates the restaurant. Take the restaurant which has the name 'Somi' and update its name from 'Somi' to 'Som Sarovar'. Console the updated restaurant.

// Create a function that accepts a restaurant's phone number and an object with updated data, and updates the restaurant. Take the restaurant which has the phone number '+1288997392' and update isDeliveryAvailable option to true. Console the updated restaurant.



// function to update the restaurant by restaurant id 
async function updateRestaurant(restaurantId, datatoUpdate){
    try{
        const updateRestaurant = await Restaurant.findByIdAndUpdate(restaurantId, datatoUpdate, {new:true})
        console.log(updateRestaurant)
    }catch(error){
        throw error
    }
}

// updateRestaurant('67629cc138080a81e9c07ede', {rating:4.1})

// function to get one restarant by name and update the name

async function updateRestaurantDetails(restaurantName, dataToUpdate){
    try{
        const updatedRestaurant = await Restaurant.findOneAndUpdate(
            {name: restaurantName},
            dataToUpdate,
            {new: true},
        )
        console.log(updatedRestaurant)
    }catch(error){
        throw error;
    }
}
updateRestaurantDetails("Somi", {name: "Som Sarovar"})
