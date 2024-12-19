const mongoose = require("mongoose");
require('dotenv').config(0)
const mongoUri = process.env.MONGODB

// const initializeDatabase = async()=>{
//     await mongoose
//         .connect(mongoUri)
//         .then(()=>console.log("Connected to MongoDB"))
//         .catch((error)=>console.log("Error connecting to database"))
// }

// module.exports = {initializeDatabase}


//new way to connect to mongodb

mongoose
    .connect(mongoUri)
    .then(()=>console.log("Connected to MongoDB"))
    .catch((error)=>console.log("Error connecting to database"))