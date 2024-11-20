const cors = require("cors");
const express = require("express");
require("dotenv").config();

const {
  createItinerary,
  getItinerary,
} = require("./controllers/dataController");

const { getFlights, getHotels, getSites } = require("./controllers/itineraryController");
const { sequelize } = require("./models");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.post("/itinerary", createItinerary);
app.get("/itinerary/:id", getItinerary);

app.get("/data/flights", getFlights);
app.get("/data/hotels", getHotels);
app.get("/data/sites", getSites);

// Database Connection
sequelize
  .authenticate()
  .then(() => {
    console.log("Database connected");
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });

// Handle unknown routes
app.use((req, res) => {
  res.status(404).json({ error: "Endpoint not found" });
});

// Start Server
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
