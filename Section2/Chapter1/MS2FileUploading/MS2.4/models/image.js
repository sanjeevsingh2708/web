
module.exports = (Sequelize, DataTypes) =>{
    Image.init(
        {
            url: DataTypes.STRING,
            secure_url: DataTypes.STRING,
            tags: DataTypes.STRING,
            uploadedAt: DataTypes.DATE,
            userId: DataTypes.INTEGER,
            isDeleted: DataTypes.BOOLEAN,
            createdAt: DataTypes.DATE,
            updatedAt: DataTypes.DATE,
        },
        {
            Sequelize,
            modelName: "Image",
        }
    )
}


// module.exports = (sequelize, DataTypes) => {
//     // Define the model class first
//     const Image = sequelize.define("Image", {
//         url: DataTypes.STRING,
//         secure_url: DataTypes.STRING,
//         tags: DataTypes.STRING,
//         uploadedAt: DataTypes.DATE,
//         USERID: DataTypes.INTEGER,
//         isDeleted: DataTypes.BOOLEAN,
//     }, {
//         timestamps: true,  // Sequelize will automatically handle createdAt and updatedAt
//         modelName: "Image",
//     });

//     return Image; // Return the model after defining it
// };
