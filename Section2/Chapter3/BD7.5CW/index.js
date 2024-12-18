const {initializeDatabase} = require('./db/db.connect');
const fs = require('fs');
const Movie = require('./models/movies.models')

initializeDatabase();

const jsonData = fs.readFileSync('movies.json');
const moviesData = JSON.parse(jsonData)

//function to seed the data
function seedData(){
    try {
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
                trailerUrl: movieData.trailerUrl,
              });
              newMovie.save();
        }
    } catch (error) {
        throw error
    }
}

// seedData();  // invoke the seedData function

// find a mvoie by its it and update the rating
async function updateMovie(moiveId, dataToUpdate){
    try {
        const updatedMovie = await Movie.findByIdAndUpdate(moiveId, dataToUpdate, {new :true})
        console.log(updatedMovie)
    } catch (error) {
        throw error
    }
}

// updateMovie('67626f9bfdaa3f3aba96437a', {rating:2, director: 'Sanjeev Singh'});  


// find one data and update its value
async function updateMovieDetails(movieTitle, dataToUpdate){
    try{
        // const updatedMovie = await Movie.findOneAndUpdate(movieTitle, dataToUpdate, {new :true});
        const updatedMovie = await Movie.findOneAndUpdate(
            { title: movieTitle }, // Filter by title
            dataToUpdate,          // Data to update
            { new: true }          // Return the updated document
        );
        console.log(updatedMovie)
    }catch(error){
        throw error;
    }
}

// updateMovieDetails("New Movie2", {releaseYear: 2050})





 