const {initializeDatabase} = require('./db/db.connect');

const Hotel = require('./models/hotels.models');

initializeDatabase();



const newHotel = {
  name: 'Lake View',
  category: 'Mid-Range',
  location: '124 Main Street, Anytown',
  rating: 3.2,
  website: 'https://lake-view-example.com',
  phoneNumber: '+1234555890',
  checkInTime: '2:00 PM',
  checkOutTime: '12:00 PM',
  amenities: ['Laundry', 'Boating'],
  priceRange: '$$$ (31-60)',
  reservationsNeeded: true,
  isParkingAvailable: false,
  isWifiAvailable: true,
  isPoolAvailable: false,
  isSpaAvailable: false,
  isRestaurantAvailable: false,
  photos: ['https://example.com/hotel1-photo1.jpg', 'https://example.com/hotel1-photo2.jpg'],
};

const newHotel1 = {
      name: 'Sunset Resort',
      category: 'Resort',
      location: '12 Main Road, Anytown',
      rating: 4.0,
      website: 'https://sunset-example.com',
      phoneNumber: '+1299655890',
      checkInTime: '2:00 PM',
      checkOutTime: '11:00 AM',
      amenities: ['Room Service', 'Horse riding', 'Boating', 'Kids Play Area', 'Bar'],
      priceRange: '$$$$ (61+)',
      reservationsNeeded: true,
      isParkingAvailable: true,
      isWifiAvailable: true,
      isPoolAvailable: true,
      isSpaAvailable: true,
      isRestaurantAvailable: true,
      photos: ['https://example.com/hotel2-photo1.jpg', 'https://example.com/hotel2-photo2.jpg'],
    };


// Question(1 & 2) function to add new hotel in database
async function createHotel(newHotel){
    try {
        const hotel = new Hotel(newHotel);
        const savedHotel = await hotel.save();
        console.log(savedHotel)
    } catch (error) {
        throw error;
    }
}

// createHotel(newHotel);
// createHotel(newHotel1);

//Question 3 Create a function to read all hotels from the database
async function getAllHotles(){
    try {
        const hotels = await Hotel.find()
        console.log(hotels);
    } catch (error) {
        throw error;
    }
}

// getAllHotles()

//Question 4 Create a function to read a hotel by its name
async function hotelByName(name){
    try {
        const hotel = await Hotel.find({name: name})
        console.log(hotel)
    } catch (error) {
        throw error;
    }
}

// hotelByName('Lake View')

//Question 5 Create a function to read all hotels which offers parking space
async function hotelWithParkingSpace(){
    try {
        const hotel = await Hotel.find({isSpaAvailable:true})
        console.log(hotel)
    } catch (error) {
        throw error
    }
}

// hotelWithParkingSpace();

// Question 6 Create a function to read all hotels which has restaurant available. 
async function hotelWithParkingSpcae(){
    try {
        const hotel = await Hotel.find({isParkingAvailable:true})
        console.log(hotel)
    } catch (error) {
        throw error;
    }
}

// hotelWithParkingSpcae()

//Question 7 Create a function to read all hotels by category ('Mid-Range')
async function hotelByCategory(){
 // what will be the range price for Mid Range category. It is not define 
}


//Question 8 Create a function to read all hotels by price range 

async function hotelByPriceRange(range){
    try {
        const hotel = await Hotel.find({priceRange: range})
        console.log(hotel);        
    } catch (error) {
        throw error
    }
}

// hotelByPriceRange('$$$$ (61+)')


//Question9 Create a function to read all hotels with  rating. 
async function hotelByRating(rating){
    try {
        const hotel = await Hotel.find({rating:rating})
        console.log(hotel);        
    } catch (error) {
        throw error;
    }
}
// hotelByRating("4.0")

//Question 10 Create a function to read a hotel by phone number 
async function hotelByPhoneNo(phNo){
    try {
        const hotel = await Hotel.find({phoneNumber:phNo})
        console.log(hotel);        
    } catch (error) {
        throw error;
    }
}

hotelByPhoneNo('+1299655890')