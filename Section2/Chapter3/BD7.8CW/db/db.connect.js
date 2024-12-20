const mongoose = require("mongoose");
require('dotenv').config(0)
const mongoUri = process.env.MONGODB


mongoose
    .connect(mongoUri)
    .then(()=>console.log("Connected to MongoDB"))
    .catch((error)=>console.log("Error connecting to database"))