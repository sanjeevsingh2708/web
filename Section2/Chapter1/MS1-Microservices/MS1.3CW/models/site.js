const { sequelize } = require(".");

module.exports = (sequelize, DataTransfer) =>{
    const site = sequelize.define(
        "site",
        {
          name: DataTypes.STRING,
          location: DataTypes.STRING,
          description: DataTypes.STRING,
           
        },
        {
          timestamps: true,
        }
      );
    return site
}