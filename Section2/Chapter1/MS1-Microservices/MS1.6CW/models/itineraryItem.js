const { DataTypes, Model } = require("sequelize");
const { sequelize } = require(".");
const itinerary = require("./itinerary");

module.exports = (sequelize, DataTypes) => {
  const itineraryItem = sequelize.define(
    "itineraryItem",
    {
      itineraryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        reference: { model: "itinerary", key: "id" },
      },
      itemId: {
        type: DataTypes.INTEGER,
      },
      type: {
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: true,
    }
  );

  itineraryItem.associate = (models)=>{
    itineraryItem.belongsTo(models.itinerary, {foreighnKey: "itineraryId"})
  }
  return itineraryItem
};
