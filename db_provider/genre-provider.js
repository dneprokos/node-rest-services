const Genre = require('../models/genre-model.js');
const config = require('config');
const genreService = require('../mongo/services/genresMongoService.js');

const genresData = [
    new Genre(1, 'Action'),
    new Genre(2, 'Horror'),
    new Genre(3, 'Romance'),
    new Genre(4, 'Science Fiction'),
    new Genre(5, 'Disaster Film'),
    new Genre(6, 'Epic Romance'),
    new Genre(7, 'Superhero Film'),
    new Genre(8, 'Space Western'),
    new Genre(9, 'Comedy'),
    new Genre(10, 'Adventure'),
    new Genre(11, 'Western')
];

class GenreProvider {
    constructor() {
      this.useDatabase = config.get('useDatabase');
    }

    /**
     * @description Get all genres from the database or the genresData array
     * returns {Promise<Array>}
     * @example
     * [
     * {
     * "id": 1,
     * "name": "Action"
     * },
     * {
     * "id": 2,
     * "name": "Horror"
     * }
     * ]
     * */
    async getAllGenres() {
      if (this.useDatabase) {
          return await genreService.getAllGenres();
      }

      return genresData;
    }

    /**
     * @description Get a genre by id from the database or the genresData array
     * @param {number} genreId
     * @returns {Promise<Object>}
     * @example
     * {
     * "id": 1,
     * "name": "Action"
     * }
     * */
    async getGenreById(genreId) {
      if (this.useDatabase) {
        return await genreService.getGenreById(genreId);
      }

      return genresData.find(genre => genre.id === genreId);
    }

    /**
     * @description Add a genre to the database or the genresData array
     * @param {Object} genre
     * @returns {Promise<Object>}
     * @example
     * {
     * "name": "Action"
     * }
     * */
    async addGenre(genre) {
      if (this.useDatabase) {
          return await genreService.createGenre(genre.name);
      }

      genre.id = genresData.length + 1;
      genresData.push(genre);
      return genre;
    }

    /**
     * @description Add multiple genres
     * @param {Array} genres
     * @returns {Promise<Array>}
     * @example
     * [
     * {
     * "name": "Action"
     * },
     * {
     * "name": "Horror"
     * }
     * ]
    */
    async addGenres(genres) {
        if (!Array.isArray(genres)) {
            throw new Error('Genres must be an array');
        }

        if (this.useDatabase) {
            return await genreService.createGenres(genres);
        }

        genres.forEach(genre => {
            genre.id = genresData.length + 1;
            genresData.push(genre);
        });
        return genres;
    }

    /**
     * @description Update a genre in the database or the genresData array
     * @param {Object} genre
     * @returns {Promise<Object>}
     * @example
     * {
     * "id": 1,
     * "name": "Action"
     * }
     * */
    async updateGenre(genre) {
        if (this.useDatabase) {
            return await genreService.updateGenre(genre.id, genre.name);
        }

        const index = genresData.findIndex(g => g.id === genre.id);
        genresData.splice(index, 1, new Genre(genre.id, genre.name));
        return genre;
    }

    /**
     * @description Delete a genre from the database or the genresData array
     * @param {number} genreId
     * @returns {Promise<Object>}
     * @example
     * {
     * "id": 1,
     * "name": "Action"
     * }
     * */
    async deleteGenre(genreId) {
        if (this.useDatabase) {
            return await genreService.deleteGenre(genreId);
        }
      
        const index = genresData.findIndex(g => g.id === genreId);
        genresData.splice(index, 1);
    }

    /**
     * @description Search for genres by name
     * @param {string} name
     * @returns {Promise<Array>}
     * @example
     * [
     * {
     * "id": 1,
     * "name": "Action"
     * },
     * {
     * "id": 2,
     * "name": "Horror"
     * }
     * ]
     * */
    async searchGenresByName(name) {
      if (!name || name.trim() === "") {
        return genresData; // Return all genres
      }

      if (this.useDatabase) {
          return await genreService.searchGenresByName(name);
      }

      return genresData.filter(genre =>
        genre.name.toLowerCase().includes(name.toLowerCase())
      );
    }

    async getInvalidGenreIds(genreIds) {
        const existingGenreIds = genresData.map(genre => genre.id);
        return genreIds.filter(genreId => !existingGenreIds.includes(genreId));
    }
}

module.exports = GenreProvider;