require("./db/db.connect")
const mongoose = require("mongoose");
const fs = require("fs")
const express= require('express')
const app = express();
const Hotel = require("./models/hotel.model")

// const bodyParser = require("body-parser");

app.use(express.json());

// app.use(bodyParser.json());

const jsonData = fs.readFileSync("hotels.json", "utf-8")
const hotelsData = JSON.parse(jsonData);
 
 
 

// function to seed tthe data
function seedData(){
  for(const hotelData of hotelsData){
    try {
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
    } catch (error) {
      throw error;
    }
  }
}

// seedData();



//=========================================================================================================== 

 // Function to create a new hotel
async function createHotel(newHotel) {
  try {
    // Convert category to a string if it is provided as an array
    // if (Array.isArray(newHotel.category)) {
    //   newHotel.category = newHotel.category.join(", "); // Join the array into a comma-separated string
    // }
    const hotel = new Hotel(newHotel); // Create a new hotel instance
    const savedHotel = await hotel.save(); // Save the hotel to the database
    return { message: "Hotel created successfully", hotel: savedHotel };
  } catch (error) {
    throw new Error(`Error creating hotel: ${error.message}`);
  }
}

// data for body
// {

//   "name": "Lake View3",
//   "category": "Mid-Range",
//   "location": "124 Main Street, Anytown",
//   "rating": 3.2,
//   "website": "https://lake-view-example.com",
//   "phoneNumber": "+1234555890",
//   "checkInTime": "2:00 PM",
//   "checkOutTime": "12:00 PM",
//   "amenities": ["Laundry", "Boating"],
//   "priceRange": "$$$ (31-60)",
//   "reservationsNeeded": true,
//   "isParkingAvailable": false,
//   "isWifiAvailable": true,
//   "isPoolAvailable": false,
//   "isSpaAvailable": false,
//   "isRestaurantAvailable": false,
//   "photos": [
//     "https://example.com/hotel1-photo1.jpg",
//     "https://example.com/hotel1-photo2.jpg"
//   ]
// }
 
//1 Create an API with route '/hotels/create' to create a new hotel data in the Database. Test your API with Postman.
app.post("/hotels/create", async (req, res) => {
  const newHotel = req.body; // Extract hotel data from the request body 
  console.log(newHotel)
  try {
    const result = await createHotel(newHotel); // Call the createHotel function
    res.status(201).json(result); // Success response
  } catch (error) {
    console.error("Error in /hotels:", error.message); // Log the error
    res.status(500).json({ message: "Failed to create hotel", error: error.message }); // Error response
  }
});




//===================================================================================================== 

// Function to fetch all hotels
async function getAllHotels() {
  try {
    const hotels = await Hotel.find(); // Fetch all hotels from the database 
    return { message: "Hotels fetched successfully", hotels };
  } catch (error) {
    throw new Error(`Error fetching hotels: ${error.message}`);
  }
}

//2 Create an API with route '/hotels/fetchAll' to read all hotels from the Database. Test your API with Postman.
app.get("/hotels/fetchAll", async (req, res) => {
  try {
    const result = await getAllHotels(); // Call the function to get all hotels
    res.status(200).json(result); // Success response
  } catch (error) {
    console.error("Error in /hotels:", error.message); // Log the error
    res.status(500).json({ message: "Failed to fetch hotels", error: error.message }); // Error response
  }
});

//========================================================================================================
// Function to get hotel by name
async function getHotelByName(hotelName) {
  try {
    const hotel = await Hotel.findOne({ name: hotelName }); // Find hotel by name

    if (!hotel) {
      return { message: "Hotel not found", hotel: null }; // Handle case where hotel doesn't exist
    }

    return { message: "Hotel fetched successfully", hotel };
  } catch (error) {
    throw new Error(`Error fetching hotel: ${error.message}`);
  }
}

//3 Create an API with route '/hotels/fetchByName/:hotelName' to read a hotel by its name. Test your API with Postman.
app.get("/hotels/fetchByName/:hotelName", async (req, res) => {
  const { hotelName } = req.params; // Extract hotelName from the route parameter

  try {
    const result = await getHotelByName(hotelName);     
    if (!result.hotel) {
      return res.status(404).json(result); // Hotel not found
    }

    res.status(200).json(result); // Success response
  } catch (error) {
    console.error("Error in /hotels/:hotelName:", error.message); // Log the error
    res.status(500).json({ message: "Failed to fetch hotel by name", error: error.message }); // Error response
  }
});

//======================================================================================================================== 
// Function to get a hotel by phone number
async function getHotelByPhoneNumber(phoneNumber) {
  try {
    const hotel = await Hotel.findOne({ phoneNumber }); // Find hotel by phone number

    if (!hotel) {
      return { message: "Hotel not found with this phone number", hotel: null };
    }

    return { message: "Hotel fetched successfully", hotel };
  } catch (error) {
    throw new Error(`Error fetching hotel: ${error.message}`);
  }
}

//4 Create an API with route '/hotels/directory/:phoneNumber' to read a hotel by phone number. Test your API with Postman.
app.get("/hotels/directory/:phoneNumber", async (req, res) => {
  const { phoneNumber } = req.params; // Extract phoneNumber from the route parameter

  try {
    const result = await getHotelByPhoneNumber(phoneNumber); // Call the function to fetch the hotel

    if (!result.hotel) {
      return res.status(404).json(result); // Hotel not found
    }

    res.status(200).json(result); // Success response
  } catch (error) {
    console.error("Error in /hotels/directory/:phoneNumber:", error.message); // Log the error
    res.status(500).json({ message: "Failed to fetch hotel by phone number", error: error.message }); // Error response
  }
});


//================================================================================================================== 
// Function to get hotels by rating
async function getHotelsByRating(hotelRating) {
  try {
    const hotels = await Hotel.find({ rating: hotelRating }); // Find hotels with the given rating

    if (hotels.length === 0) {
      return { message: "No hotels found with this rating", hotels: [] };
    }

    return { message: "Hotels fetched successfully", hotels };
  } catch (error) {
    throw new Error(`Error fetching hotels: ${error.message}`);
  }
}

//5 Create an API with route '/hotels/rating/:hotelRating' to read all hotels by rating. Test your API with Postman.
app.get("/hotels/rating/:hotelRating", async (req, res) => {
  const hotelRating = parseFloat(req.params.hotelRating); // Convert rating to a number

  try {
    const result = await getHotelsByRating(hotelRating);

    if (result.hotels.length === 0) {
      return res.status(404).json(result); // No hotels found
    }

    res.status(200).json(result); // Success response
  } catch (error) {
    console.error("Error in /hotels/rating/:hotelRating:", error.message); // Log the error
    res.status(500).json({ message: "Failed to fetch hotels by rating", error: error.message }); // Error response
  }
})
//======================================================================================================================= 
// Function to get hotels by category
async function getHotelsByCategory(hotelCategory) {
  try {
    const hotels = await Hotel.find({ category: hotelCategory }); // Find hotels by category

    if (hotels.length === 0) {
      return { message: "No hotels found in this category", hotels: [] };
    }

    return { message: "Hotels fetched successfully", hotels };
  } catch (error) {
    throw new Error(`Error fetching hotels: ${error.message}`);
  }
}
//6 Create an API with route '/hotels/category/:hotelCategory' to read all hotels by category. Test your API with Postman.
app.get("/hotels/category/:hotelCategory", async (req, res) => {
  const { hotelCategory } = req.params; // Extract hotelCategory from route parameters

  try {
    const result = await getHotelsByCategory(hotelCategory); // Call the function to fetch hotels

    if (result.hotels.length === 0) {
      return res.status(404).json(result); // No hotels found
    }

    res.status(200).json(result); // Success response
  } catch (error) {
    console.error("Error in /hotels/category/:hotelCategory:", error.message); // Log the error
    res.status(500).json({ message: "Failed to fetch hotels by category", error: error.message }); // Error response
  }
});

//============================================================================================================================
// Function to delete a hotel by ID
async function deleteHotelById(hotelId) {
  try {
    const deletedHotel = await Hotel.findByIdAndDelete(hotelId); // Delete hotel by ID

    if (!deletedHotel) {
      return { message: "Hotel not found", hotel: null };
    }

    return { message: "Hotel deleted successfully", hotel: deletedHotel };
  } catch (error) {
    throw new Error(`Error deleting hotel: ${error.message}`);
  }
}

//7 Create an API with route '/hotels/delete/:hotelId' to delete a hotel data by their ID in the Database. Test your API with Postman.
app.delete("/hotels/delete/:hotelId", async (req, res) => {
 
  
  const { hotelId } = req.params; // Extract hotelId from the route parameter

  try {
    const result = await deleteHotelById(hotelId); // Call the function to delete the hotel

    if (!result.hotel) {
      return res.status(404).json(result); // Hotel not found
    }

    res.status(200).json(result); // Success response
  } catch (error) {
    console.error("Error in /hotels/:hotelId:", error.message); // Log the error
    res.status(500).json({ message: "Failed to delete hotel", error: error.message }); // Error response
  }
});

 
//=======================================================================================================================================
// Function to update hotel rating by ID
async function updateHotelRatingById(hotelId, newRating) {
  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(
      hotelId, 
      { rating: newRating }, 
      { new: true } // This option returns the updated document
    );
    if (!updatedHotel) {
      return { message: "Hotel not found", hotel: null };
    }
    return { message: "Hotel updated successfully", hotel: updatedHotel };
  } catch (error) {
    throw new Error(`Error updating hotel: ${error.message}`);
  }
}

//8 Create an API to update a hotel data by their ID in the Database. Update the rating of an existing hotel. Test your API with Postman.

app.put('/hotels/update/:hotelId', async (req, res) => {
  const { hotelId } = req.params; // Extract hotelId from the route parameter
  const { rating } = req.body; // Extract the new rating from the request body

  if (!rating || typeof rating !== 'number' || rating < 0 || rating > 5) {
    return res.status(400).json({ error: 'Invalid rating. Rating must be a number between 0 and 5.' });
  }

  try {
    const result = await updateHotelRatingById(hotelId, rating); // Call the function to update the hotel rating

    if (!result.hotel) {
      return res.status(404).json(result); // Hotel not found
    }

    res.status(200).json(result); // Success response
  } catch (error) {
    console.error("Error in /hotels/update/:hotelId:", error.message); // Log the error
    res.status(500).json({ message: "Failed to update hotel", error: error.message }); // Error response
  }
});
 
 
const PORT = 3000;
app.listen(PORT, ()=>{
    console.log(`Server is running on ${PORT}`);
})


 
 
 
 
 