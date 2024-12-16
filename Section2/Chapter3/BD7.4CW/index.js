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

// function to get all movies from the database

async function readAllMovies(){
  try{
    const allMovies = await Movie.find();
    console.log(allMovies);
  }catch(error){
    console.log(error);
  }
}

// readAllMovies()

// to get a movie by a director name

async function readMovieByDirector(directorName){
  try{
    const movieByDirector = await Movie.find({ director: directorName})
    console.log(movieByDirector);
  }catch(error){
    console.log(error);
  }
}

readMovieByDirector("S. S. Rajamouli")