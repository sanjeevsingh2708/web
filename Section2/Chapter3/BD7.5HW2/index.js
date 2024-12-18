const {initializeDatabase } = require('./db/db.connect');
const Hotel = require('./modles/hotels.models')
const fs = require('fs');

initializeDatabase()

const jsonData = fs.readFileSync("hotel.json","utf-8");
const hotelsData = JSON.parse(jsonData);

// function to seed the hotels
function seedData(){
    try{
        for(const hotelData of hotelsData){
            const newHotel = new Hotel({
                name: hotelData.name,
                category: hotelData.category,
                location: hotelData.location,
                rating: hotelData.rating,
                website: hotelData.website,
                phoneNumber: hotelData.phoneNumber,
                checkInTime: hotelData.checkInTime,
                checkOutTime: hotelData.checkOutTime,
                amenities: hotelData.amenities,
                priceRange: hotelData.priceRange,
                reservationsNeeded: hotelData.reservationsNeeded,
                isParkingAvailable: hotelData.isParkingAvailable,
                isWifiAvailable: hotelData.isWifiAvailable,
                isPoolAvailable: hotelData.isPoolAvailable,
                isSpaAvailable: hotelData.isSpaAvailable,
                isRestaurantAvailable: hotelData.isRestaurantAvailable,
                photos: hotelData.photos
            })
            newHotel.save();
        }
    }catch(error){
        throw error;
    }
}

// seedData();



// Create a function that accepts a hotel ID and an object with updated data, and updates the hotel data with the provided ID. Take the _id of the hotel from your database which has the name Lake View and update its checkOutTime to 11 AM. Console the updated hotel.

//function to update the hotel by hotel id
async function updateHotel(hotelId, dataToUpdate){
    try{
        const updateHotel = await Hotel.findByIdAndUpdate(hotelId, dataToUpdate, {new:true})
        console.log(updateHotel)
    }catch(error){
        throw error
    }
}

// updateHotel( "6762a5cc2c103187eca8c09f", {checkInTime:"11:00 AM"})


// Create a function that accepts a hotel name and an object with updated data, and updates the hotel data. Take the hotel which has the name 'Sunset Resort' and update its rating to 4.2. Console the updated hotel.

//function to get a hotel by name and update some details
async function updateHotleByName(hotelName, dataToUpdate){
    try{
        const updatedHotel = await Hotel.findOneAndUpdate(
            { name: hotelName },
            dataToUpdate,
            {new:true}
    )
    console.log(updatedHotel)
    }catch(error){
        throw error;
    }
}

// updateHotleByName("Sunset Resort", {rating:4})

// Create a function that accepts a hotel's phone number and an object with updated data, and updates the hotel data. Take the hotel which has the phone number '+1299655890' and update its phone number to '+1997687392'. Console the updated hotel details.

//function to get hotel by phone no and update some details
async function updateHotelByNumber(phNumber, dataToUpdate){
    try {
        const updatedHotel = await Hotel.findOneAndUpdate(
            {phoneNumber: phNumber},
            dataToUpdate,
            {new:true}
        )
        console.log(updatedHotel)
    } catch (error) {
        throw error;
    }
}

updateHotelByNumber('+1299655890', {phoneNumber:"+1997687392"})