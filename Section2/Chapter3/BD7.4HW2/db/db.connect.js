const mongoose = require('mongoose');
require('dotenv').config();

const mongoUri = process.env.MONGODB;

const initializeDatabase = async()=>{
  await mongoose
    .connect(mongoUri)
    .then(()=>{
    console.log('connected to Database');
    })
    .catch((error)=> {
        console.error('Error connecting to Database', error);
    })
};

module.exports = {initializeDatabase}