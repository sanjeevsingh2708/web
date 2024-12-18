const mongoose = require('mongoose');
require('dotenv').config(); // Ensure this loads .env variables

const mongoUri = process.env.MONGODB; // Use the corrected environment variable name

const initializeDatabase = async () => {
  await mongoose
    .connect(mongoUri)
    .then(() => {
      console.log('Connected to Database');
    })
    .catch((error) => {
      console.error('Error connecting to Database', error);
    });
};


module.exports = { initializeDatabase };
