require('./db/db.connect');
const fs = require('fs');
const express = require("express")
const app = express()
const Movie = require('./models/movies.models');
const jsonData = fs.readFileSync('movies.json', 'utf-8')
const moviesData = JSON.parse(jsonData);

app.use(express.json())

//function to seed data from json file
// function seeData(){
//     for(const movieData of moviesData){
//         try {

//             const newMovie = new Movie({
//                 title: movieData.title,
//                 releaseYear: movieData.releaseYear,
//                 genre: movieData.genre,
//                 director: movieData.director,
//                 actors: movieData.actors,
//                 language: movieData.language,
//                 country: movieData.country,
//                 rating: movieData.rating,
//                 plot: movieData.plot,
//                 awards: movieData.awards,
//                 posterUrl: movieData.posterUrl,
//                 trailerUrl: movieData.trailerUrl,
//             })
//             newMovie.save();
//         } catch (error) {
//             throw error
//         }
//     }
// }

// // seeData();

 
// function to add new movie in dataBase
async function createMovie(newMovie){
  try{
    const movie = new Movie(newMovie);
    const savedMovie = await movie.save();
    console.log(`Movie added sucessfully \n ${savedMovie}`);
  }catch(error){
    throw error;
  }
}


// api to create new movie in database.
app.post("/movies", async(req, res)=>{
    try {
        const savedMovie = await createMovie(req.body)
        console.log("I am in endpoint")
        res.status(201).json({message: "Movie added sucessfully", movie: savedMovie})
    } catch (error) {
        res.status(500).json({error: "Failed to add mvoie", error:error})
    }
})
 




const PORT = 3000;
app.listen(PORT, ()=>{
    console.log(`Server is running on ${PORT}`);
})

