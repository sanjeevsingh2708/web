const { initializeDatabase } = require('./db/db.connect');
// const fs = require('fs');
const Movie = require('./models/movies.models');

initializeDatabase();

const newMovie = {
  title: "New Movie2",
  releaseYear: 1995,
  genre: ["Romance", "Drama"],
  director: "Aditya Chopra",
  actors: ["Shah Rukh Khan", "Kajol"],
  language: "Hindi",
  country: "India",
  rating: 9.1,
  plot: "A young man and woman fall in love on a Europe trip.",
  awards: "Multiple Filmfare Awards",
  posterUrl: "https://example.com/poster1.jpg",
  trailerUrl: "https://example.com/trailer1.mp4"
}

// function to add new movie in dataBase
async function createMovie(newMovie){
  try{
    const movie = new Movie(newMovie);
    const savedMovie = await movie.save();
    console.log(savedMovie);
  }catch(error){
    throw error;
  }
}


createMovie(newMovie)