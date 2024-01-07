const Movie = require('../models/genres-mongo-model');

async function getAllMovies() {
    const movies = await Movie.find().sort('id').select('-id title year genre_ids');
    return movies;
}

async function getMovieById(movieId) {
    const movie = await Movie.findById(movieId).select('-id title year genre_ids');
    return movie;
}

async function addMovie(movie) {
    const lastMovie = await Movie.find().sort({ id: -1 }).limit(1);
    const maxId = lastMovie.length === 0 ? 0 : lastMovie[0].id;

    const newMovie = new Movie({
        id: maxId + 1,
        title: movie.title,
        year: movie.year,
        genre_ids: movie.genre_ids
    });

    await newMovie.save();
    return newMovie;
}

async function deleteMovie(movieId) {
    const movie = await Movie.findByIdAndRemove(movieId).select('-_id id name');
    return movie ? { id: movie.id, name: movie.name, year: movie.year, genre_ids: movie.genre_ids } : null;
}

async function searchMoviesByName(name) {
    const movies = await Movie.find({ title: { $regex: name, $options: 'i' } }).select('-id title year genre_ids');
    return movies;
}

module.exports = {
    getAllMovies,
    getMovieById,
    addMovie,
    deleteMovie,
    searchMoviesByName
};