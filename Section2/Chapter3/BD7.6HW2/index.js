const {initializeDatabase} = require('./db/db.connect');
const fs = require('fs');
const Hotel = require('./models/hotels.models')

initializeDatabase();

const jsonData = fs.readFileSync('hotel.json', 'utf-8');
const hotelsData = JSON.parse(jsonData);

//function to seed data
function seedData(){
    try {
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
                isRestaurantAvailable: hotelData.isRestaurantAvail,
                photos: hotelData.photos
            })
            newHotel.save()
        }
    } catch (error) {
        throw error
    }
}

// seedData();

// function to delete hotel by id
async function deleteHotelById(id){
    try {
        const deletedHotel = await Hotel.findByIdAndDelete(id, {new:true})
        console.log(deletedHotel)
    } catch (error) {
        throw error;
    }
}

 

// deleteHotelById('6763c23454fe0caa7731bd15')

// funciton to delete hotel by any field

async function deleteHotelByPhoneNumber({phoneNumber: phNumber}){
    try {
        const deletedHotel = await Hotel.findOneAndDelete({phoneNumber: phNumber}, {new:true})
        console.log(deletedHotel)
    } catch (error) {
        throw error
    }
}

deleteHotelByPhoneNumber({phoneNumber: "+1299655890"})