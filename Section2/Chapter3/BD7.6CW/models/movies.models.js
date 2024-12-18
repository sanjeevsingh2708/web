const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema(
    {
        title: {
          type: String,
          required: true,
        },
        releaseYear: {
          type: Number,
          required: true,
        },
        genre: [
          {
            type: String,
            enum: [
              'Action',
              'Drama',
              'Romance',
              'Thriller',
              'Fantasy',
              'Sci-Fi',
              'Horror',
              'Sports',
              'Musical',
              'Comedy',
              'Others',
            ],
          },
        ],
        director: {
          type: String,
          required: true,
        },
        actor: [
          {
            type: String,
          },
        ],
        language: {
          type: String,
          required: true,
        },
        country: {
          type: String,
          default: 'India',
        },
        rating: {
          type: Number,
          min: 0,
          max: 10,
          default: 0,
        },
        plot: {
          type: String,
        },
        posterUrl: {
          type: String,
        },
        trailerUrl: {
          type: String,
        },

    },{
        timestamps: true,
    }
)

const Movie = mongoose.model("movie", movieSchema);

module.exports = Movie;