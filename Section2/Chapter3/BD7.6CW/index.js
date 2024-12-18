const {initializeDatabase} =require('./db/db.connect');
const Movie = require("./models/movies.models");
const fs = require('fs');

initializeDatabase();

const jsonData = fs.readFileSync("movie.json", "utf-8");
const moviesData = JSON.parse(jsonData);

//function to seed the data
function seedData(){
    try{
        for(const movieData of moviesData){
            const newMovie = new Movie({
                title: movieData.title,
                releaseYear: movieData.releaseYear,
                genre: movieData.genre,
                director: movieData.director,
                actors: movieData.actors,
                language: movieData.language,
                country: movieData.country,
                rating: movieData.rating,
                plot: movieData.plot,
                awards: movieData.awards,
                posterUrl: movieData.posterUrl,
                trailerUrl: movieData.trailerUrl
            })
            newMovie.save();
        }
    }catch(error){
        throw error;
    }
}

// seedData();

//function to delete a movie by id
async function deleteMovieById(movieId){
    try{
        const deletedMovie = await Movie.findByIdAndDelete(movieId);
        console.log(deletedMovie)
    }catch(error){
        throw error
    }
}
// deleteMovieById("6762b50851b62f0a26ea7b57")

// function to delete a movie by any field(take an example title);
async function deleteMovieByTitle({title:movieTitle}){
    try {
        const deletedMovie = await Movie.findOneAndDelete({title:movieTitle})
        console.log(deletedMovie)
    } catch (error) {
        throw error
    }
}

// deleteMovieByTitle({title: "Kabhi Khushi Kabhie Gham"})

