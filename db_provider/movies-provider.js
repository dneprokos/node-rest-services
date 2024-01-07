const Movie = require("../models/movie-model");
const movieService = require('../mongo/services/moviesMongoService.js');
const BaseProvider = require('./_base-provider'); // Import the 'BaseProvider' class

const movies = [
    new Movie(1, "The Matrix", 1999, [1, 4]),
    new Movie(2, "Titanic", 1997, [5, 6]),
    new Movie(3, "The Avengers", 2012, [7]),
    new Movie(4, "Serenity", 2005, [8]),
    new Movie(5, "The Mummy", 1999, [9, 10, 1, 2])
]

class MoviesProvider extends BaseProvider {
    constructor() {
      super();
    }

    /**
     * @description Get all movies from the database or the movies array
     * returns {Promise<Array>}
     * @example
     * [
     * {
     * "id": 1,
     * "name": "The Matrix",
     * "year": 1999,
     * "genreIds": [1, 4]
     * },
     * {
     * "id": 2,
     * "name": "Titanic",
     * "year": 1997,
     * "genreIds": [5, 6]
     * }
     * ]
     * */
    async getAllMovies() {
      if (this.useDatabase) {
          return await movieService.getAllMovies();
      }

      return movies;
    }

    /**
     * @description Get a movie by id from the database or the movies array
     * @param {number} movieId
     * @returns {Promise<Object>}
     * @example
     * {
     * "id": 1,
     * "name": "The Matrix",
     * "year": 1999,
     * "genreIds": [1, 4]
     * }
     * */
    async getMovieById(movieId) {
      if (this.useDatabase) {
        return await movieService.getMovieById(movieId);
      }

      return movies.find(movie => movie.id === movieId);
    }

    /**
     * @description Add a movie to the database or the movies array
     * @param {Object} movie
     * @returns {Promise<Object>}
     * @example
     * {
     * "name": "The Matrix",
     * "year": 1999,
     * "genreIds": [1, 4]
     * }
     * */
    async addMovie(movie) {
      if (this.useDatabase) {
        return await movieService.addMovie(movie);
      }

      movie.id = movies.length + 1;
      movies.push(movie);
      return movie;
    }

    /**
     * @description Update a movie in the database or the movies array
     * @param {Object} movie
     * @returns {Promise<Object>}
     * @example
     * {
     * "id": 1,
     * "name": "The Matrix",
     * "year": 1999,
     * "genreIds": [1, 4]
     * }
     * */
    async updateMovie(movie) {
      if (this.useDatabase) {
        return await movieService.updateMovie(movie);
      }

      const index = movies.findIndex(m => m.id === movie.id);
      movies.splice(index, 1, new Movie(movie.id, movie.name, movie.year, movie.genreIds));
      return movie;
    }

    /**
     * @description Delete a movie from the database or the movies array
     * @param {number} movieId
     * @returns {Promise<Object>}
     * @example
     * {
     * "id": 1,
     * "name": "The Matrix",
     * "year": 1999,
     * "genreIds": [1, 4]
     * }
     * */
    async deleteMovie(movieId) {
      if (this.useDatabase) {
        return await movieService.deleteMovie(movieId);
      }

      const index = movies.findIndex(m => m.id === movieId);
      movies.splice(index, 1);
    }

    /**
     * @description Search for movies by name
     * @param {string} name
     * @returns {Promise<Array>}
     * @example
     * [
     * {
     * "id": 1,
     * "name": "The Matrix",
     * "year": 1999,
     * "genreIds": [1, 4]
     * },
     * {
     * "id": 2,
     * "name": "Titanic",
     * "year": 1997,
     * "genreIds": [5, 6]
     * }
     * ]
     * */
    async searchMoviesByName(name) {
      if (this.useDatabase) {
        return await movieService.searchMoviesByName(name);
      }

      return movies.filter(movie =>
        movie.name.toLowerCase().includes(name.toLowerCase())
      );
    }
}

module.exports = MoviesProvider;