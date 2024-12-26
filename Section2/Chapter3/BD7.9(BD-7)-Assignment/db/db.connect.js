const mongoose = require("mongoose");
require('dotenv').config();
const mongoUri = process.env.MONGODB;


//new way to connect to mongodb

mongoose
    .connect(mongoUri)
    .then(()=>{console.log("Connected to database")})
    .catch((error)=> {console.log("Error connecting to database")})

 