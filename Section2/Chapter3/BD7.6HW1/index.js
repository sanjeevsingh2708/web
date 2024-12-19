const {initializedDatabase} = require("./db/db.connect")
const fs = require('fs')
const Restaurant = require("./models/restaurants.modles");

initializedDatabase();

const jsonData = fs.readFileSync('restaurant.json', 'utf-8');
const restaurantsData = JSON.parse(jsonData);

//function to seed the data
function seedData(){
    try {
        for(const restaurantData of restaurantsData){
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
    } catch (error) {
        throw error
    }
}

// seedData();

// functio nto delete Restaurant by id
async function deleteRestaurantById(id){
    try {
        const deletedRestaurant = await Restaurant.findByIdAndDelete(id, {new :true})
        console.log(deletedRestaurant)
    } catch (error) {
        throw error
    }
}

// deleteRestaurantById('6763baf3d821e3cfa5e8a1c3')

// function to delete restaurant by restaurantName
async function deleteRestaurantByName({name:restaurantName}) {
    try {
        const deletedRestaurant = await Restaurant.findOneAndDelete({name:restaurantName}, {new :true});
        console.log(deletedRestaurant)
    } catch (error) {
        throw error;
    }
}

deleteRestaurantByName({name: 'Zen Sushi'})

