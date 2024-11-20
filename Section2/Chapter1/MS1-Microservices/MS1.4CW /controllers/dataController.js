const { where, Model } = require("sequelize");
const {
  flight: flightModel,
  hotle: hotelModel,
  site: siteModel,
  itinerary: itineraryModel,
  itineraryItem: itineraryItemModel,
} = require("../models");

const createItinerary = async (req, res) => {
  try {
    const { flights, hotels, sites, name } = req.body;
    const newItinerary = await itineraryModel.create({ name });

    if (flights && flights.length > 0) {
      for (const flight of flights) {
        const savedFlight = await flightModel.create(flight);
        await itineraryItemModel.create({
          itineraryId: newItinerary.id,
          itemId: savedFlight.id,
          type: "flight",
        });
      }
    }

    if (hotels && hotels.length > 0) {
      for (const hotel of hotels) {
        const savedHotel = await hotelModel.create(hotel);
        await itineraryItemModel.create({
          itineraryId: newItinerary.id,
          itemId: savedHotel.id,
          type: "hotel",
        });
      }
    }

    if (sites && sites.length > 0) {
      for (const site of sites) {
        const savedSite = await siteModel.create(site);
        await itineraryItemModel.create({
          itineraryId: newItinerary.id,
          itemId: savedSite.id,
          type: "site",
        });
      }
    }

    res
      .status(201)
      .json({ message: "itinerary created", itinerary: newItinerary });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to create itinerary " });
  }
};

const getItinerary = async (req, res) => {
    try {
      // Find the itinerary by primary key
      const itinerary = await itineraryModel.findByPk(req.params.id);
      if (!itinerary) {
        return res.status(404).json({ error: "Itinerary not found" });
      }
  
      // Fetch related items
      const items = await itineraryItemModel.findAll({
        where: { itineraryId: itinerary.id },
      });
  
      // Initialize arrays for different types
      const flights = [];
      const hotels = [];
      const sites = [];
  
      // Process each item
      for (const item of items) {
        if (item.type === "flight") {
          const flight = await flightModel.findByPk(item.itemId);
          if (flight) flights.push(flight);
        } else if (item.type === "hotel") {
          const hotel = await hotelModel.findByPk(item.itemId);
          if (hotel) hotels.push(hotel);
        } else if (item.type === "site") {
          const site = await siteModel.findByPk(item.itemId);
          if (site) sites.push(site);
        }
      }
  
      // Respond with aggregated data
      res.status(200).json({ itinerary, flights, hotels, sites });
    } catch (error) {
      // Log and return the error
      console.error("Error fetching itinerary:", error);
      res.status(500).json({ error: "An error occurred while fetching the itinerary" });
    }
  };
  
  module.exports = { createItinerary, getItinerary}