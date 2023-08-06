const Movie = require("../models/movie-model");

const movies = [
    new Movie(1, "The Matrix", 1999, [1, 4]),
    new Movie(2, "Titanic", 1997, [5, 6]),
    new Movie(3, "The Avengers", 2012, [7]),
    new Movie(4, "Serenity", 2005, [8]),
    new Movie(5, "The Mummy", 1999, [9, 10, 1, 2])
]

class MoviesProvider {
    constructor() {}

    async getAllMovies() {
      return movies;
    }

    async getMovieById(movieId) {
      return movies.find(movie => movie.id === movieId);
    }

    async addMovie(movie) {
      movie.id = movies.length + 1;
      movies.push(movie);
      return movie;
    }

    async updateMovie(movie) {
        const index = movies.findIndex(m => m.id === movie.id);
        movies.splice(index, 1, new Movie(movie.id, movie.name, movie.year, movie.genreIds));
        return movie;
    }

    async deleteMovie(movieId) {
        const index = movies.findIndex(m => m.id === movieId);
        movies.splice(index, 1);
    }

    async searchMoviesByName(name) {
        return movies.filter(movie =>
          movie.name.toLowerCase().includes(name.toLowerCase())
        );
    }
}

module.exports = MoviesProvider;