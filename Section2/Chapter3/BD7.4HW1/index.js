const { initializeDatabase } = require('./db/db.connect');
// const fs = require('fs'); 
const Restaurant = require('./models/restaurants.models');


initializeDatabase();

const newRestaurant = {
  name: 'Somi',
  cuisine: ['Greek'],
  location: '11 Main Road, Gem',
  rating: 4.3,
  website: 'https://somi-example.com',
  phoneNumber: '+1234997390',
  openHours: 'Tue-Sun: 11:00 AM - 10:00 PM',
  priceRange: '$$ (11-30)',
  reservationsNeeded: false,
  isDeliveryAvailable: true,
  menuUrl: 'https://somi-example.com/menu',
  photos: ['https://example.com/somi-photo1.jpg', 'https://example.com/somi-photo2.jpg'],

};

const newRestaurant2 = {
    name: 'Yo China',
    cuisine: ['Chinese', 'Italian'],
    location: 'MG Road, Bangalore',
    rating: 3.9,
    website: 'https://yo-example.com',
    phoneNumber: '+1288997392',
    openHours: 'Tue-Sun: 10:00 AM - 11:00 PM',
    priceRange: '$$$ (31-60)',
    reservationsNeeded: true,
    isDeliveryAvailable: false,
    menuUrl: 'https://yo-example.com/menu',
    photos: ['https://example.com/yo-photo1.jpg', 'https://example.com/yo-photo2.jpg', 'https://example.com/yo-photo3.jpg']
  };

//Question (1 & 2) function to add new Restaurant in dataBase

async function createRestaurant(newRestaurant){
  try {
    const restaurant = new Restaurant(newRestaurant);
    const savedRestaurant = await restaurant.save();
    console.log(savedRestaurant);
  } catch (error) {
    throw error;
  }
}

// createRestaurant(newRestaurant)  // Add newRestaurant in database
// createRestaurant(newRestaurant2) // Add newRestaurant2 in database

//Question 3 function to read all the database.

async function getAllRestaurants(){
  try {
    const allRestaurants = await Restaurant.find();
    console.log(allRestaurants)
  } catch (error) {
    throw error
  }
}

// getAllRestaurants()  // function call to get all restaurants from database


//Question 4 function to read a restaurant by its name 
async function restaurantByName(restaurantName){
 
  try {
    const requiredRestaurant = await Restaurant.find({name: restaurantName})
    console.log(requiredRestaurant);
  } catch (error) {
    throw error;
  }
}

// restaurantByName("Yo China")  //Invoke function to get restaurant by it name

//Question 5 function to read all restaurant which offers reservations
async function getRestaurantsWithReservations(){
  try {
    const restaurant = await Restaurant.find({reservationsNeeded: true})
    console.log(restaurant)
  } catch (error) {
    throw error
  }
}

// getRestaurantsWithReservations()  //Invoke fundtion to get restaurant with reservations

//Question 6 Create a function to read all restaurants which offers delivery.

async function getRestaurantWithDelivery(){
  try {
    const restaurant = await Restaurant.find({isDeliveryAvailable: true})
    console.log(restaurant)
  } catch (error) {
    throw error;
  }
}

// getRestaurantWithDelivery() //Invoke fundtion to get restaurant which provies delivery


// Create a function to read a restaurant by phone number  . 

async function getRestaurantByPhoneNum(phNumber){
  try {
    const restaurant = await Restaurant.find({phoneNumber: phNumber})
    console.log(restaurant)
  } catch (error) {
    throw error
  }
}

// getRestaurantByPhoneNum("+1288997392") //Invoke fundtion to get restaurant by phone number(+1288997392)


// Create a function to read all restaurants by cuisine . 
async function getRestaurantByCuisine(cuisine){
  try {
    const restaurant = await Restaurant.find({cuisine: cuisine})
    console.log(restaurant)
  } catch (error) {
    throw error
  }
}

getRestaurantByCuisine("Italian") //Invoke fundtion to get restaurant by cuisine ('Italian')